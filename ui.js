/**
 * ui.js — DOM manipulation, event handling, and rendering for Pore Clogger Checker.
 *
 * Consumes:
 *   - window.analyzeIngredients(inputText, orderVerified)  from matcher.js
 *   - window.PORE_CLOGGER_DB                               from data.js
 *
 * Provides all interactive behavior for the single-page ingredient checker.
 */

// ─── State Management ──────────────────────────────────────────────────────────

const state = {
  lastAnalyzedText: "",
  currentResults: null,
  debounceTimer: null,
  orderVerified: true
};

// ─── DOM References (cached on load) ───────────────────────────────────────────

let textarea,
  analyzeBtn,
  clearBtn,
  orderCheckbox,
  resultsPanel,
  summaryBar,
  concernsList,
  safeList,
  staleOverlay,
  staleMessage,
  copyAllBtn;

// ─── Escape HTML ───────────────────────────────────────────────────────────────

function escapeHtml(str) {
  if (!str) return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ─── Format Category ───────────────────────────────────────────────────────────

function formatCategory(cat) {
  if (!cat) return "";
  return cat
    .replace(/_/g, " ")
    .replace(/\b\w/g, function (c) {
      return c.toUpperCase();
    });
}

// ─── Generate INCI Decoder URL ─────────────────────────────────────────────────

function incidecoderUrl(canonicalName) {
  const slug = canonicalName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return "https://incidecoder.com/ingredients/" + slug;
}

// ─── Generate SkinSort URL ─────────────────────────────────────────────────────

function skinsortUrl(canonicalName) {
  return "https://skinsort.com/ingredients/" + encodeURIComponent(canonicalName.toLowerCase());
}

// ─── Event Handlers ────────────────────────────────────────────────────────────

function getInputMessageEl() {
  return document.getElementById("input-message");
}

/**
 * Analyze clicked — validate input, run matcher, render results.
 */
function onAnalyzeClick() {
  const inputMessage = getInputMessageEl();
  const text = textarea.value.trim();

  if (!text) {
    if (inputMessage) {
      inputMessage.textContent = "Paste an ingredient list to begin";
    }
    return;
  }

  if (inputMessage) {
    inputMessage.textContent = "";
  }

  if (!orderCheckbox.checked) {
    if (inputMessage) {
      inputMessage.textContent =
        'Please confirm the ingredient order matches your product label before analyzing. Check the box above to continue.';
    }
    return;
  }

  const results = window.analyzeIngredients(text, orderCheckbox.checked);

  state.lastAnalyzedText = text;
  state.currentResults = results;

  renderResults(results);

  staleOverlay.style.display = "none";

  document.getElementById('empty-state').style.display = 'none';

  resultsPanel.scrollIntoView({ behavior: "smooth" });
}

/**
 * Textarea input — debounced re-analysis when content changes.
 */
function onTextareaInput() {
  clearTimeout(state.debounceTimer);

  state.debounceTimer = setTimeout(function () {
    const currentText = textarea.value.trim();

    // If textarea is now empty, show stale overlay on last results
    if (!currentText) {
      if (state.lastAnalyzedText && state.currentResults) {
        staleMessage.textContent =
          "Showing results from your last analysis. Paste new ingredients to re-analyze.";
        staleOverlay.style.display = "flex";
      }
      return;
    }

    // Check if input has actually changed from last analyzed text
    if (currentText !== state.lastAnalyzedText) {
      if (state.currentResults) {
        staleMessage.textContent =
          "Results may be stale — input has changed.";
        staleOverlay.style.display = "flex";

        // If order checkbox is checked, re-analyze automatically
        if (orderCheckbox.checked) {
          const results = window.analyzeIngredients(currentText, orderCheckbox.checked);
          state.lastAnalyzedText = currentText;
          state.currentResults = results;
          renderResults(results);
          staleOverlay.style.display = "none";
        }
      } else {
        // No previous results to show stale overlay on
        return;
      }
    }
    // If unchanged, do nothing
  }, 500);
}

/**
 * Clear button — reset everything.
 */
function onClearClick() {
  clearTimeout(state.debounceTimer);

  textarea.value = "";
  state.lastAnalyzedText = "";
  state.currentResults = null;

  resultsPanel.style.display = "none";
  staleOverlay.style.display = "none";
  document.getElementById('empty-state').style.display = '';

  const inputMessage = getInputMessageEl();
  if (inputMessage) {
    inputMessage.textContent = "";
  }
}

/**
 * Order checkbox change — toggle state, re-analyze if results exist.
 */
function onOrderCheckboxChange() {
  state.orderVerified = orderCheckbox.checked;

  if (state.currentResults && textarea.value.trim()) {
    const results = window.analyzeIngredients(
      textarea.value.trim(),
      orderCheckbox.checked
    );
    state.lastAnalyzedText = textarea.value.trim();
    state.currentResults = results;
    renderResults(results);
  }
}

/**
 * Dossier expand/collapse — delegated click on results panel.
 */
function onDossierClick(event) {
  const header = event.target.closest(".result-header");
  if (!header) return;

  const item = header.closest(".result-item");
  if (!item) return;

  const isExpanded = item.classList.contains("expanded");

  if (isExpanded) {
    item.classList.remove("expanded");
    header.setAttribute("aria-expanded", "false");
  } else {
    item.classList.add("expanded");
    header.setAttribute("aria-expanded", "true");
  }
}

/**
 * Safe list toggle — show/hide safe ingredients.
 */
function onSafeToggleClick(event) {
  const btn = event.currentTarget;
  const list = btn.nextElementSibling;

  if (!list) return;

  if (list.style.display === "none") {
    list.style.display = "block";
    const count = state.currentResults ? state.currentResults.safe.length : 0;
    btn.textContent =
      "▲ Hide " + count + " safe ingredient" + (count !== 1 ? "s" : "");
  } else {
    list.style.display = "none";
    const count = state.currentResults ? state.currentResults.safe.length : 0;
    btn.textContent =
      "▼ Show " + count + " safe ingredient" + (count !== 1 ? "s" : "");
  }
}

// ─── Copy Functions ────────────────────────────────────────────────────────────

/**
 * Copy a single ingredient's dossier to clipboard.
 * Attached to window so inline onclick handlers can find it.
 */
window.copyDossier = function (ingredientId) {
  if (!state.currentResults) return;

  const concern = state.currentResults.concerns.find(function (c) {
    return c.entry.id === ingredientId;
  });
  if (!concern) return;

  const entry = concern.entry;
  const parts = [
    entry.canonicalName + " (" + entry.category.replace(/_/g, " ") + ")",
    "Scientific Confidence: " + entry.scientificConfidence,
    entry.rationale,
    entry.disputedNote ? "Note: " + entry.disputedNote : "",
    "References: " +
      entry.references
        .map(function (r) {
          return r.url;
        })
        .join(", ")
  ];

  const text = parts.filter(Boolean).join("\n\n");

  navigator.clipboard.writeText(text).then(function () {
    // Find the button that was clicked and give visual feedback
    const btn = document.querySelector(
      '.copy-dossier-btn[data-ingredient-id="' + ingredientId + '"]'
    );
    if (btn) {
      const original = btn.textContent;
      btn.textContent = "✓ Copied!";
      setTimeout(function () {
        btn.textContent = original;
      }, 2000);
    }
  }).catch(function () {
    // Clipboard API not available — do nothing gracefully
  });
};

/**
 * Copy all results to clipboard in a formatted text summary.
 */
function copyAllResults() {
  const results = state.currentResults;
  if (!results) return;

  const lines = [
    "Pore-Clogger Ingredient Check Results",
    "=====================================",
    ""
  ];

  const red = results.concerns.filter(function (c) {
    return c.badge === "\uD83D\uDD34";
  });
  const yellow = results.concerns.filter(function (c) {
    return c.badge === "\uD83D\uDFE1";
  });
  const blue = results.concerns.filter(function (c) {
    return c.badge === "\u26A0\uFE0F";
  });

  if (red.length) {
    lines.push(
      "\uD83D\uDD34 LIKELY PORE-CLOGGERS (" + red.length + "):"
    );
    red.forEach(function (c) {
      lines.push(
        "  " +
          c.entry.canonicalName +
          " — Position " +
          c.position +
          " — " +
          (c.concentrationNote || "")
      );
    });
    lines.push("");
  }

  if (yellow.length) {
    lines.push(
      "\uD83D\uDFE1 POSSIBLE CONCERNS (" + yellow.length + "):"
    );
    yellow.forEach(function (c) {
      lines.push(
        "  " +
          c.entry.canonicalName +
          " — Position " +
          c.position +
          " — " +
          (c.concentrationNote || "")
      );
    });
    lines.push("");
  }

  if (blue.length) {
    lines.push(
      "\u26A0\uFE0F UNCERTAIN (" + blue.length + "):"
    );
    blue.forEach(function (c) {
      lines.push(
        "  " +
          c.entry.canonicalName +
          " — " +
          (c.entry.disputedNote || c.matchType + " match")
      );
    });
    lines.push("");
  }

  if (results.safe.length) {
    lines.push(
      "\u2705 SAFE (" + results.safe.length + "):"
    );
    lines.push(
      "  " +
        results.safe
          .map(function (s) {
            return s.raw;
          })
          .join(", ")
    );
    lines.push("");
  }

  lines.push("-------------------------------------");
  lines.push(
    "Disclaimer: Comedogenicity ratings come primarily from rabbit ear tests, which are more sensitive than human skin. Individual ingredients may behave differently in finished formulations."
  );

  navigator.clipboard.writeText(lines.join("\n")).catch(function () {
    // Clipboard API not available — do nothing gracefully
  });
}

// ─── Render Functions ──────────────────────────────────────────────────────────

/**
 * Render the full results panel from the analysis output.
 */
function renderResults(results) {
  // ── Summary Bar ──
  const total = results.summary.total;
  const concernCount = results.summary.concernCount;
  const uncertainCount = results.summary.uncertainCount;
  const safeCount = results.summary.safeCount;

  var summaryHtml = '<span>' + total + " " +
    (total === 1 ? "ingredient" : "ingredients") + " scanned</span>";

  if (concernCount > 0) {
    summaryHtml +=
      ' <span class="count-badge concern">' +
      concernCount +
      " potential concern" +
      (concernCount !== 1 ? "s" : "") +
      "</span>";
  }

  if (uncertainCount > 0) {
    summaryHtml +=
      ' <span class="count-badge uncertain">' +
      uncertainCount +
      " uncertain</span>";
  }

  summaryHtml +=
    ' <span class="count-badge safe">' +
    safeCount +
    " appear" +
    (safeCount === 1 ? "s" : "") +
    " safe</span>";

  summaryBar.innerHTML = summaryHtml;

  // ── Concerns List ──
  concernsList.innerHTML = "";

  if (results.concerns.length === 0) {
    concernsList.innerHTML =
      '<p class="empty-message">No pore-clogging concerns found. \uD83C\uDF89</p>';
  } else {
    for (var i = 0; i < results.concerns.length; i++) {
      concernsList.appendChild(renderConcernItem(results.concerns[i]));
      if (i < results.concerns.length - 1) {
        var sparkleDiv = document.createElement("div");
        sparkleDiv.className = "sparkle-divider";
        sparkleDiv.setAttribute("aria-hidden", "true");
        sparkleDiv.textContent = "✦ ✦ ✦";
        concernsList.appendChild(sparkleDiv);
      }
    }
  }

  // ── Safe List ──
  renderSafeList(results.safe);

  // ── Show results ──
  resultsPanel.style.display = "block";
}

/**
 * Render a single concern item as a DOM element.
 */
function renderConcernItem(concern) {
  const item = document.createElement("div");
  item.className = "result-item " + concern.tier;

  const badgeColors = {
    "\uD83D\uDD34": "badge-red",
    "\uD83D\uDFE1": "badge-orange",
    "\u26A0\uFE0F": "badge-blue",
    "\u2705": "badge-green"
  };
  const badgeColor = badgeColors[concern.badge] || "gray";

  const safeId = "dossier-" + concern.entry.id.replace(/[^a-zA-Z0-9-]/g, "");
  const safeBtnId =
    "dossier-btn-" + concern.entry.id.replace(/[^a-zA-Z0-9-]/g, "");

  var matchInfoHtml = "";
  if (concern.matchType !== "exact") {
    matchInfoHtml =
      "(" +
      concern.matchType +
      " match" +
      (concern.similarity
        ? ", " + Math.round(concern.similarity * 100) + "%"
        : "") +
      ")";
  }

  var referencesHtml = "";
  if (concern.entry.references && concern.entry.references.length > 0) {
    for (var r = 0; r < concern.entry.references.length; r++) {
      var ref = concern.entry.references[r];
      referencesHtml +=
        '<a href="' +
        escapeHtml(ref.url) +
        '" target="_blank" rel="noopener" class="ref-link">' +
        escapeHtml(ref.label) +
        "</a>";
    }
  }

  // Auto-generated external links
  var incidecoderHref = incidecoderUrl(concern.entry.canonicalName);
  var skinsortHref = skinsortUrl(concern.entry.canonicalName);

  var disputedHtml = "";
  if (concern.entry.disputedNote) {
    disputedHtml =
      '<p class="disputed-note">\u26A0\uFE0F ' +
      escapeHtml(concern.entry.disputedNote) +
      "</p>";
  }

  var escId = escapeHtml(concern.entry.id);

  var stars = '';
  switch (concern.entry.scientificConfidence) {
    case 'strong': stars = '★★★★☆'; break;
    case 'moderate': stars = '★★★☆☆'; break;
    case 'weak': stars = '★★☆☆☆'; break;
    case 'disputed': stars = '★☆☆☆☆'; break;
    default: stars = '☆☆☆☆☆';
  }

  item.innerHTML =
    '<button class="result-header" aria-expanded="false" aria-controls="' +
    safeId +
    '" id="' +
    safeBtnId +
    '">' +
    '<span class="tier-badge ' +
    badgeColor +
    '">' +
    concern.badge +
    " " +
    escapeHtml(concern.tierLabel) +
    "</span>" +
    '<span class="ingredient-name">' +
    escapeHtml(concern.entry.canonicalName) +
    "</span>" +
    '<span class="position-badge">Position ' +
    concern.position +
    "</span>" +
    '<span class="match-info">' +
    escapeHtml(matchInfoHtml) +
    "</span>" +
    '<span class="expand-icon">\u25B6</span>' +
    "</button>" +
    '<div class="dossier-content" id="' +
    safeId +
    '" role="region" aria-labelledby="' +
    safeBtnId +
    '">' +
    '<p class="concentration-note">' +
    escapeHtml(concern.concentrationNote || "") +
    "</p>" +
    '<div class="dossier-details">' +
    '<span class="category-badge">' +
    formatCategory(concern.entry.category) +
    "</span>" +
    '<div class="star-rating">' +
    '<span class="stars">' + stars + '</span>' +
    '<span class="star-label">Scientific confidence: ' + escapeHtml(concern.entry.scientificConfidence) + '</span>' +
    "</div>" +
    '<p class="rationale">' +
    escapeHtml(concern.entry.rationale) +
    "</p>" +
    disputedHtml +
    '<div class="references">' +
    referencesHtml +
    '<a href="' +
    incidecoderHref +
    '" target="_blank" rel="noopener" class="ref-link">INCIDecoder</a>' +
    '<a href="' +
    skinsortHref +
    '" target="_blank" rel="noopener" class="ref-link">SkinSort</a>' +
    "</div>" +
    "</div>" +
    '<button class="copy-dossier-btn" data-ingredient-id="' +
    escId +
    '">📋 Copy dossier</button>' +
    "</div>";

  return item;
}

/**
 * Render the safe ingredients list (collapsible).
 */
function renderSafeList(safe) {
  safeList.innerHTML = "";

  if (safe.length === 0) {
    safeList.style.display = "none";
    return;
  }

  var toggleBtn = document.createElement("button");
  toggleBtn.className = "safe-toggle";
  toggleBtn.textContent =
    "\u25BC Show " +
    safe.length +
    " safe ingredient" +
    (safe.length !== 1 ? "s" : "");
  toggleBtn.addEventListener("click", onSafeToggleClick);

  var list = document.createElement("div");
  list.className = "safe-ingredients";
  list.style.display = "none";

  var names = [];
  for (var i = 0; i < safe.length; i++) {
    names.push(safe[i].raw);
  }
  list.textContent = names.join(", ");

  safeList.appendChild(toggleBtn);
  safeList.appendChild(list);
  safeList.style.display = "block";
}

// ─── Initialization ────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", function () {
  // Cache DOM elements
  textarea = document.getElementById("ingredient-input");
  analyzeBtn = document.getElementById("analyze-btn");
  clearBtn = document.getElementById("clear-btn");
  orderCheckbox = document.getElementById("order-checkbox");
  resultsPanel = document.getElementById("results");
  summaryBar = document.getElementById("summary-bar");
  concernsList = document.getElementById("concerns-list");
  safeList = document.getElementById("safe-list");
  staleOverlay = document.getElementById("stale-overlay");
  staleMessage = document.getElementById("stale-message");
  copyAllBtn = document.getElementById("copy-all-btn");

  // Wire events
  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", onAnalyzeClick);
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", onClearClick);
  }

  if (textarea) {
    textarea.addEventListener("input", onTextareaInput);
  }

  if (orderCheckbox) {
    orderCheckbox.addEventListener("change", onOrderCheckboxChange);
  }

  if (copyAllBtn) {
    copyAllBtn.addEventListener("click", copyAllResults);
  }

  // Delegated dossier click on concerns list
  if (concernsList) {
    concernsList.addEventListener("click", function (e) {
      var header = e.target.closest(".result-header");
      if (header) {
        onDossierClick(e);
        return;
      }

      // Handle copy-dossier-btn clicks via delegation
      var copyBtn = e.target.closest(".copy-dossier-btn");
      if (copyBtn) {
        var ingredientId = copyBtn.dataset.ingredientId;
        window.copyDossier(ingredientId);
        return;
      }
    });
  }

  // Initial state
  if (resultsPanel) {
    resultsPanel.style.display = "none";
  }

  if (staleOverlay) {
    staleOverlay.style.display = "none";
  }
});
