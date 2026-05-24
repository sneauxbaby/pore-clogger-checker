/**
 * matcher.js — 10-layer ingredient matching engine for Pore Clogger Checker.
 *
 * Consumes window.PORE_CLOGGER_DB and window.COMMON_WORDS (loaded from data.js).
 * Exports functions used by ui.js via the window object.
 *
 * Layers:
 *   1  – Input parsing
 *   2  – Normalization
 *   3  – Exact match
 *   4-5 – Synonym / Common↔Latin (handled by alias arrays in Layer 3)
 *   6  – Combined-ingredient splitting (6a mixture / 6b compound / 6c slash)
 *   7  – Spelling normalization
 *   8  – Fuzzy matching (Levenshtein)
 *   9  – Substring matching
 *   10 – Deduplication + classification
 */

// ─── Constants ────────────────────────────────────────────────────────────────

/** Minimum similarity ratio for any fuzzy match to be considered. */
const FUZZY_THRESHOLD = 0.80;

/** Maximum recursion depth for trySplitCompound. */
const MAX_COMPOUND_DEPTH = 2;

// ─── Layer 1: Input Parsing ───────────────────────────────────────────────────

/**
 * Split raw ingredient-list text into individual ingredient objects.
 *
 * Splits on: commas, line breaks, semicolons, bullet points (•, -, *),
 * and numbered prefixes (1., 2., etc.).
 *
 * Does NOT split on slashes (/).
 * Preserves input order (array index = position).
 * Each ingredient is normalised into one or more search candidates.
 *
 * @param {string} rawText  The pasted ingredient list.
 * @returns {{ raw: string, originalIndex: number, candidates: string[] }[]}
 */
function parseIngredients(rawText) {
  const lines = rawText.split(/\n/);
  const ingredients = [];

  for (const rawLine of lines) {
    let cleaned = rawLine.trim();
    if (!cleaned) continue;

    // Strip leading bullet markers:
    //   "1. " "12. " "• " "- " "* " etc.
    cleaned = cleaned
      .replace(/^[\s]*[•\-\*\d]+\.[\s]*/, '')
      .replace(/^[\s]*[•\-\*][\s]+/, '')
      .trim();

    if (!cleaned) continue;

    // Split on commas and semicolons within the cleaned line.
    const parts = cleaned.split(/[,;]+/);

    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed) {
        ingredients.push({
          raw: trimmed,
          originalIndex: ingredients.length,
          candidates: normalizeIngredient(trimmed)
        });
      }
    }
  }

  return ingredients;
}


// ─── Layer 2: Normalization ───────────────────────────────────────────────────

/**
 * Normalize a raw ingredient string into one or more search candidates.
 *
 * Rules:
 *   - Trim whitespace, lowercase, strip trailing periods.
 *   - Primary candidate: the full text with all parenthetical groups removed,
 *     EXCEPT INCI-notation "(and)" / "(or)" groups, which must survive so
 *     the Layer-6a mixture splitter can process them.
 *   - Secondary candidate(s): for each non-INCI parenthetical group, the
 *     inner text replaces everything before it, yielding a shorter alternative.
 *
 * Example:
 *   "Cocos Nucifera (Coconut) Oil"
 *   → ["cocos nucifera oil", "coconut oil"]
 *
 * @param {string} rawText
 * @returns {string[]}  Normalized candidate strings (always at least one).
 */
function normalizeIngredient(rawText) {
  let text = rawText.trim().toLowerCase().replace(/\.$/, '');
  const candidates = [];

  // Primary: strip parenthetical groups, but preserve INCI "(and)" / "(or)".
  // \s*\((?!(?:and|or)\))[^)]*\)\s*   matches a parenthetical whose content
  // is NOT exactly "and" or "or" (case-insensitive).
  const nonInciParen = /\s*\((?!(?:and|or)\))[^)]*\)\s*/gi;
  const stripped = text.replace(nonInciParen, ' ').replace(/\s+/g, ' ').trim();
  candidates.push(stripped);

  // Additional candidates from non-INCI parenthetical content.
  const parenRegex = /\(([^)]+)\)/g;
  let m;
  while ((m = parenRegex.exec(text)) !== null) {
    const inner = m[1].toLowerCase();

    // Skip INCI notation — these are handled by mixture splitting.
    if (inner === 'and' || inner === 'or') continue;

    const after = text.substring(m.index + m[0].length);
    // Build candidate: inner content + everything after this paren,
    // with any remaining non-INCI parentheticals stripped.
    const alt = (inner + after)
      .replace(nonInciParen, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (alt && alt !== stripped && !candidates.includes(alt)) {
      candidates.push(alt);
    }
  }

  return candidates;
}


// ─── Layer 3: Exact Match ─────────────────────────────────────────────────────

/**
 * Try to find an exact match for a normalised candidate in the ingredient DB.
 *
 * Checks against every entry's canonicalName (lowercased) and every alias
 * (lowercased).  Synonym and common↔Latin mappings live in the aliases array,
 * so they are automatically covered by this function (Layers 4–5).
 *
 * @param {string} normalizedText  Lowercased, stripped candidate.
 * @returns {{ matched: true, entry: object, matchType: 'exact' } | null}
 */
function tryExactMatch(normalizedText) {
  const db = window.PORE_CLOGGER_DB;
  for (let i = 0; i < db.length; i++) {
    const entry = db[i];

    // Check canonicalName.
    if (entry.canonicalName.toLowerCase() === normalizedText) {
      return { matched: true, entry, matchType: 'exact' };
    }

    // Check every alias.
    const aliases = entry.aliases;
    for (let j = 0; j < aliases.length; j++) {
      if (aliases[j].toLowerCase() === normalizedText) {
        return { matched: true, entry, matchType: 'exact' };
      }
    }
  }
  return null;
}


// ─── Layer 6a: INCI Mixture Notation ──────────────────────────────────────────

/**
 * Split a raw ingredient string on INCI mixture notation.
 *
 * Recognised patterns (case-insensitive):
 *   " (and) ", "(and)", " (and)", "(and) ",
 *   " (or) ",  "(or)",  " (or)",  "(or) "
 *
 * @param {string} rawText  The raw (unnormalized) ingredient text.
 * @returns {string[] | null}  Array of split parts, or null if no splits found.
 */
function trySplitMixture(rawText) {
  const pattern = /\s*\((and|or)\)\s*/gi;
  // Use a test-first approach to find matches.
  pattern.lastIndex = 0;
  if (!pattern.test(rawText)) return null;

  pattern.lastIndex = 0;
  const parts = rawText.split(pattern).filter(Boolean);
  // Parts alternate: text, separator, text, separator, …
  // The separator matching groups produce "and"/"or" which we filter out.
  const ingredients = [];
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i].trim();
    if (p && p.toLowerCase() !== 'and' && p.toLowerCase() !== 'or') {
      ingredients.push(p);
    }
  }

  return ingredients.length > 0 ? ingredients : null;
}


// ─── Layer 6b: Concatenated Compounds ─────────────────────────────────────────

/**
 * Attempt to split a normalised text into individually-matched DB entries
 * by trying every word-boundary split from right to left.
 *
 * Algorithm:
 *   - Split on spaces.  Requires at least 3 words (a 2-word text is unlikely
 *     to be a concatenated compound — it would already work via exact match).
 *   - For each boundary i (right-to-left):
 *       prefix = words[0..i-1],  suffix = words[i..end]
 *       If BOTH match the DB → return both.
 *       If ONLY prefix matches → recursively try to split suffix (max depth 2).
 *         If recursive split succeeds → return prefix + sub-matches.
 *         If recursive split FAILS → still return the prefix only if it is
 *           multi-word (single-word prefix + non-matching suffix is a false
 *           positive — let fuzzy matching handle it instead).
 *       If prefix doesn't match → continue.
 *
 * @param {string} normalizedText  Lowercased candidate already failing exact match.
 * @param {number} [depth=0]       Current recursion depth.
 * @returns {object[]}  Array of matched DB entry objects, or empty array.
 */
function trySplitCompound(normalizedText, depth) {
  if (depth === undefined) depth = 0;
  if (depth > MAX_COMPOUND_DEPTH) return [];

  const words = normalizedText.split(/\s+/).filter(Boolean);
  // Require at least 3 words: a 2-word text is almost certainly a single
  // ingredient with a typo or extra qualifier, not a compound.
  if (words.length < 3) return [];

  // Iterate split boundaries from right to left.
  for (let i = words.length - 1; i >= 1; i--) {
    const prefix = words.slice(0, i).join(' ');
    const suffix = words.slice(i).join(' ');

    const prefixResult = tryExactMatch(prefix);
    const suffixResult = tryExactMatch(suffix);

    // Both match → perfect split.
    if (prefixResult && suffixResult) {
      return [prefixResult.entry, suffixResult.entry];
    }

    // Only prefix matches — try to recursively split the suffix.
    if (prefixResult) {
      const subMatches = trySplitCompound(suffix, depth + 1);
      if (subMatches.length > 0) {
        return [prefixResult.entry, ...subMatches];
      }
      // Recursive split failed.  Only keep the prefix if it is multi-word.
      // A single-word prefix matching an alias (e.g. "shea" → Shea Butter)
      // is too aggressive — the caller should fall through to fuzzy matching.
      if (words.slice(0, i).length >= 2) {
        return [prefixResult.entry];
      }
    }

    // Prefix doesn't match — continue to next boundary.
  }

  return [];
}


// ─── Layer 6c: Slash-Separated Synonyms ────────────────────────────────────────

/**
 * Handle ingredients separated by "/" (e.g. "Ethylhexyl Palmitate/Octyl Palmitate").
 *
 *   - Try exact match of the full string first (unlikely to hit).
 *   - If no match, split on "/" and try each variant with exact match.
 *   - FIRST variant that matches is returned.
 *
 * @param {string} rawText  The raw ingredient text (may contain "/").
 * @returns {{ matched: true, entry: object, matchedVia: string } | null}
 */
function trySplitSlash(rawText) {
  // Try full string first.
  const fullNorm = rawText.trim().toLowerCase();
  const fullMatch = tryExactMatch(fullNorm);
  if (fullMatch) {
    return { matched: true, entry: fullMatch.entry, matchedVia: 'slash-full' };
  }

  // Split and try each variant.
  const variants = rawText.split('/');
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i].trim().toLowerCase();
    if (!variant) continue;
    const result = tryExactMatch(variant);
    if (result) {
      return { matched: true, entry: result.entry, matchedVia: 'slash-variant' };
    }
  }

  return null;
}


// ─── Layer 7: Spelling Normalization ──────────────────────────────────────────

/**
 * Apply deterministic spelling transforms so that UK/US variants and
 * inconsistent hyphenation don't prevent matches.
 *
 * Transforms:
 *   "sulphate"  → "sulfate"
 *   "aluminium" → "aluminum"
 *   "laureth 4" → "laureth-4"  (and similar <prefix> <number> patterns)
 *
 * @param {string} text
 * @returns {string}
 */
function normalizeSpelling(text) {
  let result = text.toLowerCase();

  // UK → US spelling.
  result = result.replace(/\bsulphate\b/g, 'sulfate');
  result = result.replace(/\baluminium\b/g, 'aluminum');

  // Hyphenate space-separated prefix+number patterns.
  // Handles: laureth 4, peg 16, peg 100, ppg 2, steareth 10, ceteareth 20, etc.
  result = result.replace(/\b([a-z]+)\s+(\d+)\b/gi, '$1-$2');

  return result;
}


// ─── Layer 8: Fuzzy Matching (Levenshtein) ────────────────────────────────────

/**
 * Compute the Levenshtein (edit) distance between two strings using the
 * Wagner-Fischer algorithm with a 1-D array (O(n) space).
 *
 * Includes early termination: if the distance exceeds maxDistance at any
 * point, Infinity is returned immediately.
 *
 * @param {string} a  First string.
 * @param {string} b  Second string.
 * @returns {number}  Edit distance, or Infinity if it exceeds the budget.
 */
function levenshteinDistance(a, b) {
  const maxLen = Math.max(a.length, b.length);
  const maxDistance = Math.floor(maxLen * (1 - FUZZY_THRESHOLD));

  // If the length difference alone exceeds the budget, bail early.
  if (Math.abs(a.length - b.length) > maxDistance) return Infinity;

  let prev = new Array(b.length + 1);
  let curr = new Array(b.length + 1);

  for (let j = 0; j <= b.length; j++) prev[j] = j;

  for (let i = 0; i < a.length; i++) {
    curr[0] = i + 1;
    let rowMin = curr[0];

    for (let j = 0; j < b.length; j++) {
      const cost = a[i] === b[j] ? 0 : 1;
      curr[j + 1] = Math.min(
        prev[j + 1] + 1,   // deletion
        curr[j] + 1,       // insertion
        prev[j] + cost     // substitution
      );
      if (curr[j + 1] < rowMin) rowMin = curr[j + 1];
    }

    if (rowMin > maxDistance) return Infinity;

    // Swap arrays for next row.
    const temp = prev;
    prev = curr;
    curr = temp;
  }

  return prev[b.length];
}


/**
 * Try to find a fuzzy (typo-tolerant) match for a candidate text.
 *
 * Applies spelling normalisation to the candidate first.
 * Skips candidates shorter than 5 characters.
 *
 * Confidence tiers:
 *   similarity >= 0.95  → "high"
 *   similarity >= 0.85  → "moderate"
 *   similarity >= 0.80  → "low"
 *
 * @param {string} normalizedText   Already-lowercased candidate.
 * @param {string} [spellingNormalized]  Pre-computed spelling-normalised form (unused; recomputed).
 * @returns {{ matched: true, entry: object, matchType: 'fuzzy',
 *             matchConfidence: string, similarity: number, matchedVia: string } | null}
 */
function tryFuzzyMatch(normalizedText, spellingNormalized) {
  const candidate = normalizeSpelling(normalizedText);

  // Minimum length guard: short strings must match exactly or via synonym.
  if (candidate.length < 5) return null;

  const db = window.PORE_CLOGGER_DB;
  let best = null;
  let bestSimilarity = 0;

  for (let i = 0; i < db.length; i++) {
    const entry = db[i];

    // Check canonicalName.
    const canonNorm = normalizeSpelling(entry.canonicalName.toLowerCase());
    const canonDist = levenshteinDistance(candidate, canonNorm);
    if (canonDist !== Infinity) {
      const sim = 1 - (canonDist / Math.max(candidate.length, canonNorm.length));
      if (sim > bestSimilarity) {
        bestSimilarity = sim;
        best = { entry, matchedVia: entry.canonicalName, similarity: sim };
      }
    }

    // Check each alias.
    const aliases = entry.aliases;
    for (let j = 0; j < aliases.length; j++) {
      const aliasNorm = normalizeSpelling(aliases[j].toLowerCase());
      const aliasDist = levenshteinDistance(candidate, aliasNorm);
      if (aliasDist !== Infinity) {
        const sim = 1 - (aliasDist / Math.max(candidate.length, aliasNorm.length));
        if (sim > bestSimilarity) {
          bestSimilarity = sim;
          best = { entry, matchedVia: aliases[j], similarity: sim };
        }
      }
    }
  }

  if (!best) return null;

  // Determine confidence tier.
  let confidence;
  if (bestSimilarity >= 0.95) {
    confidence = 'high';
  } else if (bestSimilarity >= 0.85) {
    confidence = 'moderate';
  } else if (bestSimilarity >= FUZZY_THRESHOLD) {
    confidence = 'low';
  } else {
    return null;  // Below minimum threshold.
  }

  return {
    matched: true,
    entry: best.entry,
    matchType: 'fuzzy',
    matchConfidence: confidence,
    similarity: bestSimilarity,
    matchedVia: best.matchedVia
  };
}


// ─── Layer 9: Substring Matching ──────────────────────────────────────────────

/**
 * Try to match a candidate by checking if it is a substring of (or contains)
 * any DB name.
 *
 * Rules:
 *   - Minimum candidate length: 5 characters.
 *   - If the candidate (after trimming) is exactly one of the COMMON_WORDS,
 *     skip it.  BUT if it CONTAINS a common word PLUS additional text, still
 *     proceed.
 *
 * @param {string} normalizedText
 * @returns {{ entry: object, matchType: 'substring' }[]}
 */
function trySubstringMatch(normalizedText) {
  if (normalizedText.length < 5) return [];

  // Exclusion: exact common-word match.
  const commonWords = window.COMMON_WORDS;
  if (commonWords.includes(normalizedText)) return [];

  const db = window.PORE_CLOGGER_DB;
  const seen = new Set();
  const matches = [];

  for (let i = 0; i < db.length; i++) {
    const entry = db[i];

    // Check canonicalName.
    const canonLower = entry.canonicalName.toLowerCase();
    if (canonLower.includes(normalizedText) || normalizedText.includes(canonLower)) {
      if (!seen.has(entry.id)) {
        seen.add(entry.id);
        matches.push({ entry, matchType: 'substring' });
      }
      continue;
    }

    // Check aliases.
    const aliases = entry.aliases;
    for (let j = 0; j < aliases.length; j++) {
      const aliasLower = aliases[j].toLowerCase();
      if (aliasLower.includes(normalizedText) || normalizedText.includes(aliasLower)) {
        if (!seen.has(entry.id)) {
          seen.add(entry.id);
          matches.push({ entry, matchType: 'substring' });
        }
        break;
      }
    }
  }

  return matches;
}


// ─── Layer 10: Result Deduplication ───────────────────────────────────────────

/**
 * Deduplicate a collection of match results.
 *
 * Groups by the composite key `${originalIndex}-${canonicalId}`, then keeps
 * the highest-confidence match in each group and merges the `matchedVia`
 * information.
 *
 * @param {object[]} matches
 * @returns {object[]}  Deduplicated results.
 */
function deduplicateResults(matches) {
  const groups = {};

  for (const match of matches) {
    const key = match.originalIndex + '-' + match.entry.id;
    if (!groups[key]) {
      groups[key] = match;
      // Ensure matchedVia is an array.
      if (!Array.isArray(groups[key].matchedVia)) {
        groups[key].matchedVia = [groups[key].matchedVia || groups[key].entry.canonicalName];
      }
    } else {
      const existing = groups[key];

      // Merge matchedVia.
      const viaArray = Array.isArray(match.matchedVia)
        ? match.matchedVia
        : [match.matchedVia || match.entry.canonicalName];
      for (const v of viaArray) {
        if (!existing.matchedVia.includes(v)) {
          existing.matchedVia.push(v);
        }
      }

      // Keep the higher-confidence match.
      const confOrder = { high: 3, moderate: 2, low: 1, undefined: 0 };
      const newConf = confOrder[match.matchConfidence] || 0;
      const oldConf = confOrder[existing.matchConfidence] || 0;
      if (newConf > oldConf) {
        // Promote, but preserve accumulated matchedVia.
        const savedVia = existing.matchedVia;
        Object.assign(existing, match);
        existing.matchedVia = savedVia;
      }
    }
  }

  return Object.values(groups);
}


// ─── Helper: Process a Split Part ─────────────────────────────────────────────

/**
 * Process a single ingredient piece produced by Layer 6a/6b splitting.
 * Runs the normalisation → exact → fuzzy → substring pipeline (no further
 * compound/mixture splitting, to avoid infinite recursion).
 *
 * @param {string} rawText     The raw text of the split part.
 * @param {number} originalIndex  Original position of the parent ingredient.
 * @returns {{ matched: boolean, entry?: object, matchType?: string,
 *             matchConfidence?: string, similarity?: number,
 *             matchedVia?: string | string[] } | null}
 */
function processIngredient(rawText, originalIndex) {
  const candidates = normalizeIngredient(rawText);
  let result = null;

  for (const candidate of candidates) {
    // Layer 3: Exact.
    result = tryExactMatch(candidate);
    if (result) break;

    // Layer 6c: Slash (on raw split-part text).
    if (rawText.includes('/')) {
      result = trySplitSlash(rawText);
      if (result) break;
    }

    // Layers 7-8: Fuzzy.
    result = tryFuzzyMatch(candidate);
    if (result) break;

    // Layer 9: Substring.
    const subMatches = trySubstringMatch(candidate);
    if (subMatches.length > 0) {
      result = {
        matched: true,
        entry: subMatches[0].entry,
        matchType: 'substring',
        matchConfidence: 'low'
      };
      break;
    }
  }

  if (result && result.matched) {
    return {
      entry: result.entry,
      originalIndex: originalIndex,
      position: originalIndex + 1,
      matchConfidence: result.matchConfidence || 'high',
      matchType: result.matchType || 'exact',
      matchedVia: result.matchedVia || result.entry.canonicalName,
      similarity: result.similarity || null
    };
  }

  return null;
}


// ─── Two-Axis Classification ─────────────────────────────────────────────────

/**
 * Classify a match result into a concern badge and tier using the
 * two-axis confidence matrix.
 *
 *       | sci=strong     sci=moderate  sci=weak/disputed
 *  ─────┼──────────────────────────────────────────────
 *  high  | 🔴/🟡(conc.)  🟡            ⚠️ uncertain
 *  mod   | —             —             ⚠️ uncertain
 *  low   | —             —             ⚠️ uncertain
 *
 * @param {object} match
 * @param {number} totalIngredients  Total ingredient count.
 * @param {boolean} orderVerified    Whether user confirmed label order.
 * @returns {object}  The match object extended with badge/tier/tierLabel fields.
 */
function classifyMatch(match, totalIngredients, orderVerified) {
  const { entry, matchConfidence } = match;
  const sci = entry.scientificConfidence;

  var result;

  // Strong science + high match confidence → concentration-tiered.
  if (matchConfidence === 'high' && sci === 'strong') {
    result = getConcentrationTier(match, totalIngredients, orderVerified);
  } else if (matchConfidence === 'high' && sci === 'moderate') {
    result = { ...match, badge: '\uD83D\uDFE1', tier: 'possible', tierLabel: 'Possible Concern' };
  } else {
    result = { ...match, badge: '\u26A0\uFE0F', tier: 'uncertain', tierLabel: 'Uncertain' };
  }

  // Add ruleOf7 to ALL concern tiers (not just RED)
  result.ruleOf7 = (match.position <= 7 && match.position <= totalIngredients);

  return result;
}


// ─── Concentration Tiering ────────────────────────────────────────────────────

/**
 * Given a high-confidence / strong-science match, determine the concentration
 * tier based on its position in the ingredient list.
 *
 * Rules:
 *   - Must have orderVerified = true; otherwise fall back to 🟡.
 *   - For lists of ≤ 2 ingredients, treat as high-concern (can't claim <1%).
 *   - Position / total in top 20%   → 🔴 High concern.
 *   - Position / total in 20%–50%   → 🟡 Moderate.
 *   - Position / total in 50%+      → 🟡 Low concentration likely.
 *
 * @param {object} match
 * @param {number} totalIngredients
 * @param {boolean} orderVerified
 * @returns {object}
 */
function getConcentrationTier(match, totalIngredients, orderVerified) {
  // DEFENSIVE: guard against division by zero.
  if (!totalIngredients || totalIngredients <= 0) {
    return {
      ...match,
      badge: '\uD83D\uDFE1',
      tier: 'possible',
      tierLabel: 'Possible Concern',
      concentrationNote: 'Concentration cannot be assessed (unknown ingredient count).'
    };
  }

  if (!orderVerified) {
    return {
      ...match,
      badge: '\uD83D\uDFE1',
      tier: 'possible',
      tierLabel: 'Possible Concern',
      concentrationNote: 'Concentration unknown \u2014 ingredient order was not verified as label order.'
    };
  }

  const percentile = match.position / totalIngredients;

  // DEFENSIVE: for very short lists (1-2 ingredients), don't claim <1%.
  if (totalIngredients <= 2) {
    return {
      ...match,
      badge: '\uD83D\uDD34',
      tier: 'likely',
      tierLabel: 'Likely Pore-Clogger',
      concentrationNote: `Present in a very short ingredient list (${totalIngredients} total). This ingredient likely makes up a significant portion of the product.`
    };
  }

  if (percentile <= 0.20) {
    return {
      ...match,
      badge: '\uD83D\uDD34',
      tier: 'likely',
      tierLabel: 'Likely Pore-Clogger',
      concentrationNote: 'High concentration concern \u2014 among the top 20% of ingredients by proportion.'
    };
  } else if (percentile <= 0.50) {
    return {
      ...match,
      badge: '\uD83D\uDFE1',
      tier: 'possible',
      tierLabel: 'Possible Concern',
      concentrationNote: `Moderate concern \u2014 appears at position ${match.position} of ${totalIngredients}. Would be below the top-tier concentration zone.`
    };
  } else {
    return {
      ...match,
      badge: '\uD83D\uDFE1',
      tier: 'possible',
      tierLabel: 'Possible Concern',
      concentrationNote: `Low concentration likely \u2014 at position ${match.position} of ${totalIngredients}. Likely <1% concentration; dilute amounts may not cause issues.`
    };
  }
}


// ─── Main Entry Point ─────────────────────────────────────────────────────────

/**
 * Analyze a pasted ingredient list and return pore-clogging concerns.
 *
 * @param {string}  inputText      Raw ingredient list text.
 * @param {boolean} orderVerified  Whether the user confirmed the label order.
 * @returns {{
 *   summary: { total: number, concernCount: number, uncertainCount: number, safeCount: number },
 *   concerns: object[],
 *   safe: object[]
 * }}
 */
function analyzeIngredients(inputText, orderVerified) {
  const parsed = parseIngredients(inputText);
  const allMatches = [];
  const allSafe = [];

  for (const ingredient of parsed) {
    let found = false;

    for (const candidate of ingredient.candidates) {
      // Layer 3: Exact match.
      let result = tryExactMatch(candidate);

      // Layer 6c: Slash (on raw text before normalisation).
      if (!result && ingredient.raw.includes('/')) {
        result = trySplitSlash(ingredient.raw);
      }

      // Layer 6a: INCI mixture notation.
      if (!result) {
        const mixtureParts = trySplitMixture(ingredient.raw);
        if (mixtureParts) {
          for (const part of mixtureParts) {
            const partResult = processIngredient(part, ingredient.originalIndex);
            if (partResult) {
              allMatches.push(partResult);
              found = true;
            }
          }
          if (found) break;
        }
      }

      // Layer 6b: Compound split (only if still no match).
      if (!result) {
        const compoundMatches = trySplitCompound(candidate);
        if (compoundMatches.length > 0) {
          for (const dbEntry of compoundMatches) {
            allMatches.push({
              entry: dbEntry,
              originalIndex: ingredient.originalIndex,
              position: ingredient.originalIndex + 1,
              matchConfidence: 'high',
              matchType: 'compound-split',
              matchedVia: [dbEntry.canonicalName]
            });
            found = true;
          }
          if (found) break;
        }
      }

      // Layers 7–8: Fuzzy matching.
      if (!result) {
        result = tryFuzzyMatch(candidate);
      }

      // Layer 9: Substring matching.
      if (!result) {
        const substringMatches = trySubstringMatch(candidate);
        if (substringMatches.length > 0) {
          for (const sm of substringMatches) {
            allMatches.push({
              entry: sm.entry,
              originalIndex: ingredient.originalIndex,
              position: ingredient.originalIndex + 1,
              matchConfidence: 'low',
              matchType: 'substring',
              matchedVia: [sm.entry.canonicalName]
            });
            found = true;
          }
          if (found) break;
        }
      }

      // If we got a result from any layer, push and break the candidate loop.
      if (result) {
        allMatches.push({
          entry: result.entry,
          originalIndex: ingredient.originalIndex,
          position: ingredient.originalIndex + 1,
          matchConfidence: result.matchConfidence || 'high',
          matchType: result.matchType || 'exact',
          matchedVia: [result.matchedVia || result.entry.canonicalName],
          similarity: result.similarity || null
        });
        found = true;
        break;
      }
    }

    // If no match was found for this ingredient across all candidates, it's safe.
    if (!found) {
      allSafe.push({
        raw: ingredient.raw,
        originalIndex: ingredient.originalIndex,
        position: ingredient.originalIndex + 1
      });
    }
  }

  // Layer 10: Deduplicate.
  const deduped = deduplicateResults(allMatches);

  // Classify each match using the two-axis matrix.
  const concerns = deduped.map(function (match) {
    return classifyMatch(match, parsed.length, orderVerified);
  });
  concerns.sort(function (a, b) { return a.position - b.position; });

  const total = parsed.length;
  const concernCount = concerns.filter(function (c) {
    return c.badge === '\uD83D\uDD34' || c.badge === '\uD83D\uDFE1';
  }).length;
  const uncertainCount = concerns.filter(function (c) {
    return c.badge === '\u26A0\uFE0F';
  }).length;
  const safeCount = allSafe.length;

  const productScore = calculateProductScore(concerns, total);

  return {
    summary: { total: total, concernCount: concernCount, uncertainCount: uncertainCount, safeCount: safeCount },
    score: productScore,
    concerns: concerns,
    safe: allSafe
  };
}


// ─── Product Score ────────────────────────────────────────────────────────────

/**
 * Calculate a 1-10 product score based on flagged ingredients.
 *
 * Penalties:
 *   🔴 (red/high concern):
 *     - Short list (≤2 ingredients): 6 points
 *     - Top 20% of list: 3 points
 *     - 20-50%: 2 points
 *     - Bottom 50%: 1 point
 *   🟡 (yellow/moderate):
 *     - Short list: 3 points
 *     - Top 20%: 2 points
 *     - 20-50%: 1 point
 *     - Bottom 50%: 0.5 points
 *   ⚠️ (uncertain): 0.25 points each
 *
 * @param {object[]} concerns        Classified concern objects.
 * @param {number} totalIngredients  Total ingredient count.
 * @returns {{ score: number, label: string, penalty: number } | null}
 */
function calculateProductScore(concerns, totalIngredients) {
  if (!totalIngredients || totalIngredients <= 0) return null;

  var penalty = 0;
  var isShortList = totalIngredients <= 2;

  for (var i = 0; i < concerns.length; i++) {
    var concern = concerns[i];
    var posRatio = concern.position / totalIngredients;
    var ingredientPenalty = 0;

    if (concern.badge === '\uD83D\uDD34') {
      if (isShortList) ingredientPenalty = 6;
      else if (posRatio <= 0.20) ingredientPenalty = 3;
      else if (posRatio <= 0.50) ingredientPenalty = 2;
      else ingredientPenalty = 1;
    } else if (concern.badge === '\uD83D\uDFE1') {
      if (isShortList) ingredientPenalty = 3;
      else if (posRatio <= 0.20) ingredientPenalty = 2;
      else if (posRatio <= 0.50) ingredientPenalty = 1;
      else ingredientPenalty = 0.5;
    } else { // ⚠️
      ingredientPenalty = 0.25;
    }

    penalty += ingredientPenalty;
  }

  var rawScore = 10 - penalty;
  var score = Math.max(1, Math.min(10, Math.round(rawScore)));

  var label;
  if (score >= 9) label = 'Excellent';
  else if (score >= 7) label = 'Good';
  else if (score >= 5) label = 'Fair';
  else if (score >= 3) label = 'Caution';
  else label = 'High Risk';

  return { score: score, label: label, penalty: penalty };
}

// ─── Inline Test Cases ────────────────────────────────────────────────────────

/**
 * Run a battery of self-tests.  Logs results to the console.
 * Returns { passed, failed, total } so the caller can inspect.
 *
 * Accessible as window.runMatcherTests().
 */
window.runMatcherTests = function () {
  var tests = [
    // ── Exact match ──
    {
      name: 'Exact INCI match',
      input: 'Isopropyl Myristate',
      check: function (r) { return r.concerns.some(function (c) { return c.entry.id === 'isopropyl-myristate'; }); }
    },
    {
      name: 'Synonym match (IPM)',
      input: 'IPM',
      check: function (r) { return r.concerns.some(function (c) { return c.entry.id === 'isopropyl-myristate'; }); }
    },
    {
      name: 'Common name match',
      input: 'Coconut Oil',
      check: function (r) { return r.concerns.some(function (c) { return c.entry.id === 'coconut-oil'; }); }
    },
    {
      name: 'INCI match for common',
      input: 'Cocos Nucifera Oil',
      check: function (r) { return r.concerns.some(function (c) { return c.entry.id === 'coconut-oil'; }); }
    },

    // ── Fuzzy matching ──
    {
      name: 'Fuzzy typo',
      input: 'Cocnut Oil',
      check: function (r) { return r.concerns.some(function (c) { return c.entry.id === 'coconut-oil' && c.matchConfidence !== 'high'; }); }
    },
    {
      name: 'Fuzzy close variant',
      input: 'Shea Buter',
      check: function (r) { return r.concerns.some(function (c) { return c.entry.id === 'shea-butter' && c.matchConfidence !== 'high'; }); }
    },

    // ── Short string guard ──
    {
      name: 'Short string not fuzzy matched',
      input: 'ALS',
      check: function (r) { return r.concerns.length === 0; }
    },

    // ── Disputed ingredients ──
    {
      name: 'Disputed: SLS shows uncertain',
      input: 'SLS',
      check: function (r) { return r.concerns.some(function (c) { return c.entry.id === 'sls-sles' && c.badge === '\u26A0\uFE0F'; }); }
    },
    {
      name: 'Disputed: Sodium Chloride uncertain',
      input: 'Sodium Chloride',
      check: function (r) { return r.concerns.some(function (c) { return c.entry.id === 'sodium-chloride' && c.badge === '\u26A0\uFE0F'; }); }
    },
    {
      name: 'Disputed: Tocopherol uncertain',
      input: 'Tocopherol',
      check: function (r) { return r.concerns.some(function (c) { return c.entry.id === 'tocopherol-vitamin-e' && c.badge === '\u26A0\uFE0F'; }); }
    },

    // ── Parenthetical deduplication ──
    {
      name: 'Parenthetical dedup',
      input: 'Cocos Nucifera (Coconut) Oil',
      check: function (r) { return r.concerns.filter(function (c) { return c.entry.id === 'coconut-oil'; }).length === 1; }
    },

    // ── Slash handling ──
    {
      name: 'Slash INCI synonym',
      input: 'Water/Aqua/Eau',
      check: function (r) { return r.concerns.length === 0; }
    },
    {
      name: 'Slash comedogenic match',
      input: 'Ethylhexyl Palmitate/Octyl Palmitate',
      check: function (r) { return r.concerns.some(function (c) { return c.entry.id === 'ethylhexyl-palmitate'; }); }
    },

    // ── INCI mixture notation ──
    {
      name: 'INCI (and) split',
      input: 'Cetearyl Alcohol (and) Ceteareth 20',
      check: function (r) { return r.concerns.length >= 2; }
    },
    {
      name: 'INCI (and) no spaces',
      input: 'Glyceryl Stearate(and)PEG-100 Stearate',
      check: function (r) { return r.concerns.length >= 1; }
    },

    // ── Spelling normalization ──
    {
      name: 'UK spelling',
      input: 'Sodium Sulphate',
      check: function (r) { return true; }   // at least runs without error
    },
    {
      name: 'PEG spacing',
      input: 'PEG 16 Lanolin',
      check: function (r) { return r.concerns.some(function (c) { return c.entry.id === 'lanolin-oil'; }); }
    },

    // ── Substring guard ──
    {
      name: 'Common word excluded',
      input: 'Oil',
      check: function (r) { return r.concerns.length === 0; }
    },

    // ── Negative (safe) ──
    {
      name: 'Safe ingredient',
      input: 'Hyaluronic Acid',
      check: function (r) { return r.concerns.length === 0; }
    },
    {
      name: 'Water safe',
      input: 'Water',
      check: function (r) { return r.concerns.length === 0; }
    },

    // ── Multi-ingredient parse ──
    {
      name: 'Multi-ingredient parse',
      input: 'Water, Isopropyl Myristate, Glycerin',
      check: function (r) { return r.summary.total >= 3; }
    },

    // ── Compound split ──
    // NOTE: "Cetearyl Alcohol Ceteareth 20" is a full alias in the DB,
    // so exact match fires first.  Use separate ingredients that do not
    // appear as a combined alias.
    {
      name: 'Compound split',
      input: 'Coconut Oil Isopropyl Myristate',
      check: function (r) { return r.concerns.length >= 2; }
    },

    // ── Product score tests ──
    { name: 'Score: no concerns = 10 Excellent', input: 'Water, Glycerin', check: function (r) { return r.score && r.score.score === 10 && r.score.label === 'Excellent'; } },
    { name: 'Score: single RED short list = low', input: 'Coconut Oil', check: function (r) { return r.score && r.score.score <= 4; } },
    { name: 'Score: RED at bottom position = moderate penalty', input: 'Water, Glycerin, Dimethicone, Tocopherol, Phenoxyethanol, Silica, Coconut Oil', check: function (r) { return r.score && r.score.score >= 7; } },
    { name: 'Score: multi-concern accumulated penalty', input: 'Isopropyl Myristate, Coconut Oil, Isopropyl Palmitate, Water, Tocopherol', check: function (r) { return r.score && r.score.score <= 5; } },
    { name: 'Score: uncertain only = minor penalty', input: 'Water, Tocopherol, Glycerin', check: function (r) { return r.score && r.score.score >= 9; } }
  ];

  var passed = 0;
  var failed = 0;

  for (var t = 0; t < tests.length; t++) {
    var test = tests[t];
    try {
      var result = analyzeIngredients(test.input, true);
      if (test.check(result)) {
        console.log('\u2705 PASS: ' + test.name);
        passed++;
      } else {
        console.error('\u274C FAIL: ' + test.name, result);
        failed++;
      }
    } catch (e) {
      console.error('\uD83D\uDCA5 ERROR: ' + test.name, e);
      failed++;
    }
  }

  console.log('\n' + passed + '/' + tests.length + ' passed, ' + failed + ' failed');
  return { passed: passed, failed: failed, total: tests.length };
};


// ─── Exports ──────────────────────────────────────────────────────────────────

window.analyzeIngredients = analyzeIngredients;
window.getConcentrationTier = getConcentrationTier;
window.classifyMatch = classifyMatch;
window.calculateProductScore = calculateProductScore;
