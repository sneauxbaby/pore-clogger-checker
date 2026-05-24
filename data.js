/**
 * PORE_CLOGGER_DB — Comprehensive pore-clogging (comedogenic) ingredient database.
 *
 * Each entry in the array has this schema:
 * {
 *   id: string,                // kebab-case unique identifier
 *   canonicalName: string,     // primary display name
 *   aliases: string[],         // alternate names / INCI variants
 *   category: string,          // one of: oil_butter, algae_seaweed, synthetic_ester, fatty_acid,
 *                              //   fatty_alcohol, sulfate_surfactant, dye_pigment, salt_mineral,
 *                              //   botanical_extract, silicone, other
 *   scientificConfidence: string, // "strong" | "moderate" | "weak" | "disputed"
 *   rationale: string,         // explanation of the comedogenicity evidence
 *   disputedNote: string|null, // required (non-null) for weak/disputed entries
 *   references: { label: string, url: string }[]
 * }
 *
 * Scientific confidence tiers:
 *   strong   — Consistently rated 3+ in rabbit ear assays AND supported by clinical consensus
 *   moderate — Rated 2+ in at least one study but limited corroboration
 *   weak     — Single study, unclear mechanism, or primarily anecdotal
 *   disputed — On the Acne Specialists list but contradicted by published evidence
 */

window.PORE_CLOGGER_DB = [
  // ═══════════════════════════════════════════════════════════════════
  // A – B
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "acetylated-lanolin",
    canonicalName: "Acetylated Lanolin",
    aliases: [
      "Acetylated Lanolin",
      "Acetylated Lanolin Alcohol"
    ],
    category: "oil_butter",
    scientificConfidence: "strong",
    rationale: "Consistently rated as comedogenic (score 4–5/5) in Fulton 1989 study. Acetylated lanolin alcohol is one of the most comedogenic lanolin derivatives; its waxy, occlusive nature blocks follicle openings.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/acetylated-lanolin" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/acetylated%20lanolin" }
    ]
  },
  {
    id: "algae",
    canonicalName: "Algae",
    aliases: [
      "Ahnfeltia Concinna",
      "Alaria Esculenta",
      "Algae",
      "Algae Extract",
      "Arthrospira Platensis",
      "Ascophyllum",
      "Ascophyllum Nodosum",
      "Black Kelp",
      "Bladderwrack",
      "Blue Algae",
      "Blue Green Algae",
      "Brown Algae",
      "Chlorella",
      "Chlorella Vulgaris Extract",
      "Chondrus Crispus",
      "Codium Fragile Extract",
      "Corallina Officinalis Extract",
      "Dulse",
      "Ecklonia",
      "Enteromorpha Compressa",
      "Haematococcus Pluvialis Extract",
      "Himanthalia Elongata",
      "Irish Moss",
      "Kelp",
      "Laminaria",
      "Laminaria Digitata Extract",
      "Laminaria Longicruris",
      "Laminaria Saccharina",
      "Lola Implexa",
      "Macroalgae",
      "Marine Algae",
      "Mastocarpus Stellatus",
      "Microcystis Aeruginosa",
      "Norwegian Kelp",
      "Phytessence Wakame",
      "Plankton",
      "Plankton Extract",
      "Porphyra",
      "Red Algae",
      "Rockweed",
      "Sargassum",
      "Sea Grass",
      "Seaweed",
      "Spirulina",
      "Undaria",
      "Wakame"
    ],
    category: "algae_seaweed",
    scientificConfidence: "weak",
    rationale: "Appears on some pore-clogging lists, but scientific evidence is limited. Algae and seaweed extracts are diverse — some are rich in iodides and lipids that could theoretically clog pores, but no rabbit ear assay or controlled human study has established a consistent comedogenicity rating for algae as a category. Individual species vary widely in composition.",
    disputedNote: "No standardized comedogenicity studies exist for algae as a category. Most algae extracts are water-soluble and unlikely to clog pores in typical formulation concentrations. The concern likely stems from specific lipid-rich species rather than the entire category.",
    references: [
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/algae" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/algae" }
    ]
  },
  {
    id: "argan-oil",
    canonicalName: "Argan Oil",
    aliases: [
      "Argan Oil",
      "Argania Spinosa Kernel Oil",
      "Moroccan Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in some studies but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Argan oil has a moderate oleic acid content (43–49%) which may contribute to potential comedogenicity in acne-prone individuals.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/argan-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/argan%20oil" }
    ]
  },
  {
    id: "avocado-butter",
    canonicalName: "Avocado Butter",
    aliases: [
      "Avocado Butter",
      "Avocado Oil",
      "Persea Gratissima Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Avocado oil contains oleic acid (~63%) which is moderately comedogenic in isolation.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/avocado-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/avocado%20oil" }
    ]
  },
  {
    id: "apricot-kernel-oil",
    canonicalName: "Apricot Kernel Oil",
    aliases: [
      "Apricot Kernel Oil",
      "Apricot Oil",
      "Prunus Armeniaca Kernel Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2 at 100%) but with limited corroboration. Evidence is suggestive but not conclusive. Apricot kernel oil has a moderate oleic acid content (~60%) similar to other moderately comedogenic oils.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/apricot-kernel-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/apricot%20kernel%20oil" }
    ]
  },
  {
    id: "andiroba-seed-oil",
    canonicalName: "Andiroba Seed Oil",
    aliases: [
      "Andiroba Seed Oil",
      "Carapa Guaianensis Seed Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "weak",
    rationale: "Appears on some pore-clogging lists, but scientific evidence is limited. Andiroba oil is traditionally used for its anti-inflammatory properties in Amazonian medicine, and no published comedogenicity study has tested it in a rabbit ear assay. Its inclusion on pore-clogging lists appears to be precautionary rather than evidence-based.",
    disputedNote: "No published comedogenicity study exists for andiroba seed oil. It is traditionally used as an anti-inflammatory remedy, which is inconsistent with a pore-clogging mechanism. Its inclusion on comedogenic lists is likely based on its fatty acid profile rather than direct testing.",
    references: [
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/andiroba-seed-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/andiroba%20seed%20oil" }
    ]
  },
  {
    id: "astrocaryum-murumuru-seed-butter",
    canonicalName: "Astrocaryum Murumuru Seed Butter",
    aliases: [
      "Astrocaryum Murumuru Seed Butter",
      "Murumuru Butter"
    ],
    category: "oil_butter",
    scientificConfidence: "weak",
    rationale: "Appears on some pore-clogging lists, but scientific evidence is limited. Murumuru butter is rich in lauric and myristic acids, which are individually comedogenic, but the whole butter has not been directly tested in comedogenicity assays. The concern is extrapolated from its fatty acid profile rather than direct evidence.",
    disputedNote: "No direct comedogenicity testing has been published for murumuru butter. The concern is based solely on its high content of lauric and myristic acids, which are comedogenic in isolation. The whole butter may behave differently in formulation.",
    references: [
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/astrocaryum-murumuru-seed-butter" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/astrocaryum%20murumuru%20seed%20butter" }
    ]
  },
  {
    id: "brazil-nut-oil",
    canonicalName: "Brazil Nut Oil",
    aliases: [
      "Brazil Nut Oil",
      "Bertholletia Excelsa Seed Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "weak",
    rationale: "Appears on some pore-clogging lists, but scientific evidence is limited. No published comedogenicity study has specifically tested brazil nut oil in a rabbit ear assay. Its inclusion appears to be based on extrapolation from its fatty acid composition rather than direct evidence.",
    disputedNote: "No published comedogenicity study exists for brazil nut oil. The ingredient is rich in selenium and unsaturated fats but has not been directly tested for pore-clogging potential. Its presence on comedogenic lists is speculative.",
    references: [
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/brazil-nut-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/brazil%20nut%20oil" }
    ]
  },
  {
    id: "buriti-oil",
    canonicalName: "Buriti Oil",
    aliases: [
      "Buriti Oil",
      "Mauritia Flexuosa Fruit Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "weak",
    rationale: "Appears on some pore-clogging lists, but scientific evidence is limited. Buriti oil is rich in beta-carotene and oleic acid, but no published comedogenicity study has tested it. The concern is based on its high oleic acid content (~70%) rather than direct evidence of pore-clogging.",
    disputedNote: "No published comedogenicity study exists for buriti oil. It is primarily used for its high beta-carotene and vitamin A content. The concern is extrapolated from its oleic acid profile.",
    references: [
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/buriti-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/buriti%20oil" }
    ]
  },
  {
    id: "butyl-stearate",
    canonicalName: "Butyl Stearate",
    aliases: [
      "Butyl Stearate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "strong",
    rationale: "Consistently rated as comedogenic (score 3–4/5) in Fulton 1989 study. Butyl stearate is a synthetic ester used as an emollient; its molecular structure allows it to penetrate and occlude follicles.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/butyl-stearate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/butyl%20stearate" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // C – F
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "cocoa-butter",
    canonicalName: "Cocoa Butter",
    aliases: [
      "Cocoa Butter",
      "Cacao Butter",
      "Cacao Seed Butter",
      "Theobroma Butter",
      "Theobroma Oil",
      "Theobroma Cocoa Seed Butter"
    ],
    category: "oil_butter",
    scientificConfidence: "strong",
    rationale: "Consistently rated 4–5 on rabbit ear assay in Kligman & Kwong 1979 and Fulton 1989 studies. One of the most reliably comedogenic natural ingredients tested.",
    disputedNote: null,
    references: [
      { label: "Kligman AM, Kwong T (1979). An improved rabbit ear model for assessing comedogenic substances. Br J Dermatol.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/cocoa-butter" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/cocoa%20butter" }
    ]
  },
  {
    id: "coconut-oil",
    canonicalName: "Coconut Oil",
    aliases: [
      "Coconut Oil",
      "Cocos Nucifera Oil",
      "Cocos Nucifera",
      "Coconut Acid",
      "Coconut Alkanes",
      "Coconut Butter",
      "Coconut Extract",
      "Copra Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "strong",
    rationale: "Consistently rated 4–5 on rabbit ear assay in Fulton 1989 study. Highly comedogenic due to its fatty acid profile and occlusive properties.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/coconut-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/coconut%20oil" }
    ]
  },
  {
    id: "canola-oil",
    canonicalName: "Canola Oil",
    aliases: [
      "Canola Oil",
      "Rapeseed Oil",
      "Brassica Campestris Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Canola oil's comedogenicity likely stems from its oleic acid and erucic acid content.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/canola-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/canola%20oil" }
    ]
  },
  {
    id: "carrageenan",
    canonicalName: "Carrageenan",
    aliases: [
      "Carrageenan",
      "Carrageenan Moss",
      "Chondrus Crispus Extract"
    ],
    category: "botanical_extract",
    scientificConfidence: "weak",
    rationale: "Appears on some pore-clogging lists, but scientific evidence is limited. Carrageenan is a water-soluble polysaccharide derived from red seaweed used as a thickener. It is not an oil and has no known mechanism for obstructing follicles. One study (Fulton 1989) gave it a score of 3 at 100%, but this has not been replicated.",
    disputedNote: "Only one study (Fulton 1989) rated carrageenan as comedogenic at 100% concentration. As a water-soluble polysaccharide used at low concentrations (typically under 1%) in formulations, the practical pore-clogging risk is negligible. Subsequent studies have not confirmed the finding.",
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/carrageenan" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/carrageenan" }
    ]
  },
  {
    id: "carrot-seed-oil",
    canonicalName: "Carrot Seed Oil",
    aliases: [
      "Carrot Seed Oil",
      "Daucus Carota Sativa Seed Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "weak",
    rationale: "Appears on some pore-clogging lists, but scientific evidence is limited. No published comedogenicity study has specifically tested carrot seed oil in a rabbit ear assay. The concern may stem from its essential oil components or confusion with carrot root oil.",
    disputedNote: "No published comedogenicity study exists for carrot seed oil. It is an essential oil used at very low concentrations (typically under 0.5%) in formulations, making practical pore-clogging risk negligible. It is distinct from carrot root oil used in cooking.",
    references: [
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/carrot-seed-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/carrot%20seed%20oil" }
    ]
  },
  {
    id: "ceteareth-20",
    canonicalName: "Ceteareth-20",
    aliases: [
      "Ceteareth 20",
      "Ceteareth-20"
    ],
    category: "other",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Ceteareth-20 is an ethoxylated fatty alcohol emulsifier; at typical formulation concentrations (under 5%), comedogenicity risk is substantially lower.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/ceteareth-20" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/ceteareth-20" }
    ]
  },
  {
    id: "cetearyl-alcohol",
    canonicalName: "Cetearyl Alcohol",
    aliases: [
      "Cetearyl Alcohol",
      "Cetearyl Alcohol Ceteareth 20",
      "Cetostearyl Alcohol"
    ],
    category: "fatty_alcohol",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2 at 100%) but with limited corroboration. Evidence is suggestive but not conclusive. Cetearyl alcohol is a blend of cetyl and stearyl alcohols; individual fatty alcohols have low to moderate comedogenicity that is concentration-dependent.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/cetearyl-alcohol" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/cetearyl%20alcohol" }
    ]
  },
  {
    id: "cetyl-acetate",
    canonicalName: "Cetyl Acetate",
    aliases: [
      "Cetyl Acetate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Cetyl acetate is a waxy ester used as an emollient; its occlusive properties contribute to comedogenicity risk.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/cetyl-acetate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/cetyl%20acetate" }
    ]
  },
  {
    id: "cherry-seed-oil",
    canonicalName: "Cherry Seed Oil",
    aliases: [
      "Cherry Seed Oil",
      "Prunus Cerasus Seed Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "weak",
    rationale: "Appears on some pore-clogging lists, but scientific evidence is limited. Cherry seed oil has a high oleic acid content (~45%) but no published comedogenicity study has specifically tested it. The concern is extrapolated from its fatty acid profile.",
    disputedNote: "No published comedogenicity study exists for cherry seed oil. The concern is based solely on its oleic acid content. At typical formulation concentrations, the practical risk is low.",
    references: [
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/cherry-seed-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/cherry%20seed%20oil" }
    ]
  },
  {
    id: "coal-tar",
    canonicalName: "Coal Tar",
    aliases: [
      "Coal Tar"
    ],
    category: "dye_pigment",
    scientificConfidence: "disputed",
    rationale: "Appears on some pore-clogging lists, but published evidence contradicts this. Historically listed but no standard comedogenicity rating exists. Mechanism of pore-clogging is unclear.",
    disputedNote: "Historically listed but no standard comedogenicity rating exists. Mechanism of pore-clogging is unclear.",
    references: [
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/coal-tar" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/coal%20tar" }
    ]
  },
  {
    id: "colloidal-sulfur",
    canonicalName: "Colloidal Sulfur",
    aliases: [
      "Colloidal Sulfur",
      "Sulfur"
    ],
    category: "salt_mineral",
    scientificConfidence: "disputed",
    rationale: "Appears on some pore-clogging lists, but published evidence contradicts this. Sulfur is primarily used as an acne treatment, not a cause. No credible comedogenicity evidence.",
    disputedNote: "Sulfur is primarily used as an acne treatment, not a cause. No credible comedogenicity evidence.",
    references: [
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/colloidal-sulfur" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/colloidal%20sulfur" }
    ]
  },
  {
    id: "corn-oil",
    canonicalName: "Corn Oil",
    aliases: [
      "Corn Oil",
      "Zea Mays Oil",
      "Maize Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Corn oil has a high linoleic acid content (~55%) but its comedogenicity may stem from minor lipid components.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/corn-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/corn%20oil" }
    ]
  },
  {
    id: "cotton-seed-oil",
    canonicalName: "Cotton Seed Oil",
    aliases: [
      "Cotton Seed Oil",
      "Gossypium Herbaceum Seed Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Cotton seed oil has a moderate oleic and linoleic acid content.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/cotton-seed-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/cotton%20seed%20oil" }
    ]
  },
  {
    id: "dc-red-17",
    canonicalName: "D&C Red 17",
    aliases: [
      "D&C Red 17",
      "D&C Red 21",
      "D&C Red 3",
      "D&C Red 30",
      "D&C Red 36",
      "CI 26100",
      "CI 45380",
      "CI 73360"
    ],
    category: "dye_pigment",
    scientificConfidence: "weak",
    rationale: "Listed as comedogenic in Fulton 1989 study (score 3–5), but these are pigments that sit on the skin surface. Mechanism of pore-clogging is unclear. Dyes are particulate materials and may physically obstruct follicles at very high concentrations, but typical cosmetic use levels are far below the tested concentrations.",
    disputedNote: "Listed as comedogenic in Fulton 1989 study (score 3–5), but these are pigments that sit on the skin surface. Dyes are tested at 100% in rabbit ear assays, which does not reflect actual cosmetic use concentrations (typically under 1%). The mechanism of pore-clogging for surface pigments is unclear.",
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/dc-red-17" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/d%26c%20red%2017" }
    ]
  },
  {
    id: "decyl-oleate",
    canonicalName: "Decyl Oleate",
    aliases: [
      "Decyl Oleate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "strong",
    rationale: "Consistently rated as comedogenic (score 3–4/5) in Fulton 1989 study. Decyl oleate is a synthetic ester combining decyl alcohol with oleic acid — both components with established comedogenic potential. Its small molecular size allows follicle penetration.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/decyl-oleate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/decyl%20oleate" }
    ]
  },
  {
    id: "dioctyl-succinate",
    canonicalName: "Dioctyl Succinate",
    aliases: [
      "Dioctyl Succinate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Dioctyl succinate is a lightweight ester that can penetrate follicles at higher concentrations.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/dioctyl-succinate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/dioctyl%20succinate" }
    ]
  },
  {
    id: "ethylhexyl-palmitate",
    canonicalName: "Ethylhexyl Palmitate",
    aliases: [
      "Ethylhexyl Palmitate",
      "Octyl Palmitate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "strong",
    rationale: "Consistently rated 2–4 on comedogenicity scales. Octyl palmitate (older name) rated 2–3 at 100% in Fulton 1989. Concentration-dependent: drops to non-comedogenic below 10%.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/ethylhexyl-palmitate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/ethylhexyl%20palmitate" }
    ]
  },
  {
    id: "ethylhexyl-stearate",
    canonicalName: "Ethylhexyl Stearate",
    aliases: [
      "Ethylhexyl Stearate",
      "Octyl Stearate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Similar in structure to ethylhexyl palmitate but with a longer fatty acid chain.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/ethylhexyl-stearate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/ethylhexyl%20stearate" }
    ]
  },
  {
    id: "evening-primrose-oil",
    canonicalName: "Evening Primrose Oil",
    aliases: [
      "Evening Primrose Oil",
      "Oenothera Biennis Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Evening primrose oil is rich in gamma-linolenic acid (GLA), which some studies suggest may actually benefit acne-prone skin, creating conflicting evidence.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/evening-primrose-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/evening%20primrose%20oil" }
    ]
  },
  {
    id: "flaxseed-oil",
    canonicalName: "Flaxseed Oil",
    aliases: [
      "Flaxseed Oil",
      "Linseed Oil",
      "Linum Usitatissimum Seed Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Flaxseed oil has a very high alpha-linolenic acid (omega-3) content, which gives it a unique fatty acid profile that may influence comedogenicity differently than other oils.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/flaxseed-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/flaxseed%20oil" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // G – K
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "glyceryl-monostearate",
    canonicalName: "Glyceryl Monostearate",
    aliases: [
      "Glyceryl Monostearate",
      "GMS",
      "Glyceryl Stearate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Glyceryl monostearate is a common emulsifier; at typical use levels (under 5%), the comedogenicity risk is substantially reduced.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/glyceryl-stearate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/glyceryl%20stearate" }
    ]
  },
  {
    id: "glyceryl-stearate-se",
    canonicalName: "Glyceryl Stearate SE",
    aliases: [
      "Glyceryl Stearate SE"
    ],
    category: "synthetic_ester",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. The SE (self-emulsifying) grade contains a small amount of potassium stearate or sodium stearate; comedogenicity is similar to glyceryl monostearate.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/glyceryl-stearate-se" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/glyceryl%20stearate%20se" }
    ]
  },
  {
    id: "hydrogenated-vegetable-oil",
    canonicalName: "Hydrogenated Vegetable Oil",
    aliases: [
      "Hydrogenated Vegetable Oil",
      "Hydrogenated Olive Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Hydrogenation increases the melting point and occlusivity of vegetable oils, which may contribute to comedogenicity.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/hydrogenated-vegetable-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/hydrogenated%20vegetable%20oil" }
    ]
  },
  {
    id: "isocetyl-stearate",
    canonicalName: "Isocetyl Stearate",
    aliases: [
      "Isocetyl Stearate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "strong",
    rationale: "Consistently rated as comedogenic (score 4–5/5) in Fulton 1989 study. Isocetyl stearate is a branched-chain ester with high occlusive potential; its molecular structure allows it to penetrate and obstruct follicles effectively.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/isocetyl-stearate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/isocetyl%20stearate" }
    ]
  },
  {
    id: "isodecyl-oleate",
    canonicalName: "Isodecyl Oleate",
    aliases: [
      "Isodecyl Oleate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "strong",
    rationale: "Consistently rated as comedogenic (score 4/5) in Fulton 1989 study. Isodecyl oleate combines a branched alcohol with oleic acid, producing an ester with strong comedogenic properties.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/isodecyl-oleate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/isodecyl%20oleate" }
    ]
  },
  {
    id: "isopropyl-isostearate",
    canonicalName: "Isopropyl Isostearate",
    aliases: [
      "Isopropyl Isostearate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "strong",
    rationale: "Consistently rated as comedogenic (score 3–5/5) in Fulton 1989 study. Isopropyl isostearate is part of the isopropyl ester family, which consistently shows high comedogenicity due to small molecular size and branched structure.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/isopropyl-isostearate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/isopropyl%20isostearate" }
    ]
  },
  {
    id: "isopropyl-lanolate",
    canonicalName: "Isopropyl Lanolate",
    aliases: [
      "Isopropyl Lanolate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "strong",
    rationale: "Consistently rated as comedogenic (score 4–5/5) in Fulton 1989 study. Isopropyl lanolate is a lanolin-derived ester combining the comedogenic properties of both lanolin and isopropyl esters. Highly occlusive.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/isopropyl-lanolate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/isopropyl%20lanolate" }
    ]
  },
  {
    id: "isopropyl-myristate",
    canonicalName: "Isopropyl Myristate",
    aliases: [
      "Isopropyl Myristate",
      "IPM",
      "Isopropyl Tetradecanoate",
      "Myristic Acid Isopropyl Ester"
    ],
    category: "synthetic_ester",
    scientificConfidence: "strong",
    rationale: "Consistently rated 3–5 on rabbit ear assay in Fulton 1989 study. One of the most well-documented comedogenic ingredients. Concentration-dependent: drops to non-comedogenic below 10% in some studies.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/isopropyl-myristate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/isopropyl%20myristate" }
    ]
  },
  {
    id: "isopropyl-palmitate",
    canonicalName: "Isopropyl Palmitate",
    aliases: [
      "Isopropyl Palmitate",
      "IPP"
    ],
    category: "synthetic_ester",
    scientificConfidence: "strong",
    rationale: "Consistently rated 3–4 on rabbit ear assay. Closely related to isopropyl myristate with similar comedogenic properties.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/isopropyl-palmitate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/isopropyl%20palmitate" }
    ]
  },
  {
    id: "isostearic-acid",
    canonicalName: "Isostearic Acid",
    aliases: [
      "Isostearic Acid"
    ],
    category: "fatty_acid",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Isostearic acid is a branched-chain fatty acid with properties that differ from linear stearic acid.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/isostearic-acid" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/isostearic%20acid" }
    ]
  },
  {
    id: "isostearyl-isostearate",
    canonicalName: "Isostearyl Isostearate",
    aliases: [
      "Isostearyl Isostearate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. This ester combines isostearyl alcohol with isostearic acid; both components have moderate individual comedogenicity.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/isostearyl-isostearate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/isostearyl%20isostearate" }
    ]
  },
  {
    id: "isostearyl-neopentanoate",
    canonicalName: "Isostearyl Neopentanoate",
    aliases: [
      "Isostearyl Neopentanoate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. A branched ester with moderate occlusive properties.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/isostearyl-neopentanoate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/isostearyl%20neopentanoate" }
    ]
  },
  {
    id: "jojoba-butter",
    canonicalName: "Jojoba Butter",
    aliases: [
      "Jojoba Butter",
      "Hydrogenated Jojoba Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "weak",
    rationale: "Appears on some pore-clogging lists, but scientific evidence is limited. Jojoba oil is often considered non-comedogenic (rated 0–2), but the butter form may behave differently due to hydrogenation, which increases occlusivity. Evidence is mixed.",
    disputedNote: "Jojoba oil is often considered non-comedogenic (rated 0–2), but the butter form may behave differently. Evidence is mixed.",
    references: [
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/jojoba-butter" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/jojoba%20butter" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // L – O
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "lanolic-acid",
    canonicalName: "Lanolic Acid",
    aliases: [
      "Lanolic Acid",
      "Lanolin Acid"
    ],
    category: "fatty_acid",
    scientificConfidence: "strong",
    rationale: "Consistently rated as comedogenic (score 4–5/5) in Fulton 1989 study. Lanolin derivatives consistently rate as comedogenic. Acetylated lanolin alcohol rated 4–5 in Fulton 1989.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/lanolic-acid" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/lanolic%20acid" }
    ]
  },
  {
    id: "lanolin-oil",
    canonicalName: "Lanolin Oil",
    aliases: [
      "Lanolin Oil",
      "PEG 16 Lanolin",
      "PEG-16 Lanolin"
    ],
    category: "oil_butter",
    scientificConfidence: "strong",
    rationale: "Consistently rated as comedogenic (score 4–5/5) in Fulton 1989 study. Lanolin oil is the liquid fraction of lanolin and retains the comedogenic wax esters present in whole lanolin. The PEG derivatives still carry comedogenic risk.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/lanolin-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/lanolin%20oil" }
    ]
  },
  {
    id: "laureth-4",
    canonicalName: "Laureth-4",
    aliases: [
      "Laureth 4",
      "Laureth-4"
    ],
    category: "other",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Laureth-4 is an ethoxylated lauryl alcohol surfactant; comedogenicity is concentration-dependent.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/laureth-4" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/laureth-4" }
    ]
  },
  {
    id: "laureth-23",
    canonicalName: "Laureth-23",
    aliases: [
      "Laureth 23",
      "Laureth-23"
    ],
    category: "other",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Laureth-23 has a longer PEG chain than Laureth-4, which increases water solubility and may reduce comedogenicity at typical use levels.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/laureth-23" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/laureth-23" }
    ]
  },
  {
    id: "lauric-acid",
    canonicalName: "Lauric Acid",
    aliases: [
      "Lauric Acid",
      "Dodecyl Acid",
      "Laurostearic Acid"
    ],
    category: "fatty_acid",
    scientificConfidence: "strong",
    rationale: "Rated 4 on rabbit ear assay. A saturated fatty acid found in coconut oil that contributes to its comedogenicity.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/lauric-acid" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/lauric%20acid" }
    ]
  },
  {
    id: "lauroyl-lysine",
    canonicalName: "Lauroyl Lysine",
    aliases: [
      "Lauroyl Lysine"
    ],
    category: "other",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in some studies but with limited corroboration. Evidence is suggestive but not conclusive. Lauroyl lysine is an amino acid derivative with a lauric acid moiety; the lauric acid component may contribute to its comedogenicity rating.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/lauroyl-lysine" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/lauroyl%20lysine" }
    ]
  },
  {
    id: "lauryl-sulfate",
    canonicalName: "Lauryl Sulfate",
    aliases: [
      "Lauryl Sulfate"
    ],
    category: "sulfate_surfactant",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study but with limited corroboration. Evidence is suggestive but not conclusive. Lauryl sulfate (the anion, distinct from the full SLS molecule) was tested at high concentrations. As a surfactant, its irritancy may confound comedogenicity assessments.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/lauryl-sulfate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/lauryl%20sulfate" }
    ]
  },
  {
    id: "mango-butter",
    canonicalName: "Mango Butter",
    aliases: [
      "Mango Butter",
      "Mangifera Indica Seed Butter"
    ],
    category: "oil_butter",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Mango butter is rich in stearic and oleic acids, similar to cocoa butter in composition.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/mango-butter" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/mango%20butter" }
    ]
  },
  {
    id: "marula-oil",
    canonicalName: "Marula Oil",
    aliases: [
      "Marula Oil",
      "Sclerocarya Birrea Seed Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "weak",
    rationale: "Appears on some pore-clogging lists, but scientific evidence is limited. Marula oil has a high oleic acid content (~70–78%), but no published comedogenicity study has specifically tested it in a rabbit ear assay. The concern is extrapolated from its fatty acid profile.",
    disputedNote: "No published comedogenicity study exists for marula oil. The concern is based on its high oleic acid content. Some sources rate it as low-comedogenic (0–1). The fatty acid profile alone is an unreliable predictor of comedogenicity.",
    references: [
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/marula-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/marula%20oil" }
    ]
  },
  {
    id: "mink-oil",
    canonicalName: "Mink Oil",
    aliases: [
      "Mink Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "strong",
    rationale: "Consistently rated as comedogenic (score 3–4/5) in Fulton 1989 study. Mink oil is an animal-derived oil with a fatty acid composition that closely resembles human sebum, allowing it to penetrate and obstruct follicles effectively.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/mink-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/mink%20oil" }
    ]
  },
  {
    id: "moringa-oil",
    canonicalName: "Moringa Oil",
    aliases: [
      "Moringa Oil",
      "Moringa Oleifera Seed Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "weak",
    rationale: "Appears on some pore-clogging lists, but scientific evidence is limited. Moringa oil has a high oleic acid content (~70%), but no published comedogenicity study has specifically tested it. The concern is extrapolated from its fatty acid profile rather than direct evidence.",
    disputedNote: "No published comedogenicity study exists for moringa oil. It is rich in oleic acid, which is comedogenic in isolation, but the whole oil may behave differently. Some sources rate it as low-comedogenic.",
    references: [
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/moringa-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/moringa%20oil" }
    ]
  },
  {
    id: "myreth-3-myristate",
    canonicalName: "Myreth-3 Myristate",
    aliases: [
      "Myreth-3 Myristate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. This ethoxylated myristyl ester has moderate comedogenic potential due to its myristate backbone.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/myreth-3-myristate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/myreth-3%20myristate" }
    ]
  },
  {
    id: "myristic-acid",
    canonicalName: "Myristic Acid",
    aliases: [
      "Myristic Acid",
      "Myristate"
    ],
    category: "fatty_acid",
    scientificConfidence: "strong",
    rationale: "Rated 3–4 on rabbit ear assay. A saturated fatty acid common in coconut and palm oils.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/myristic-acid" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/myristic%20acid" }
    ]
  },
  {
    id: "myristyl-alcohol",
    canonicalName: "Myristyl Alcohol",
    aliases: [
      "Myristyl Alcohol",
      "Myristyl"
    ],
    category: "fatty_alcohol",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Myristyl alcohol is a 14-carbon fatty alcohol with moderate occlusive properties.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/myristyl-alcohol" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/myristyl%20alcohol" }
    ]
  },
  {
    id: "myristyl-lactate",
    canonicalName: "Myristyl Lactate",
    aliases: [
      "Myristyl Lactate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Myristyl lactate is an ester of myristyl alcohol and lactic acid; the myristyl component drives the comedogenicity rating.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/myristyl-lactate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/myristyl%20lactate" }
    ]
  },
  {
    id: "myristyl-myristate",
    canonicalName: "Myristyl Myristate",
    aliases: [
      "Myristyl Myristate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "strong",
    rationale: "Rated 3–5 on rabbit ear assay in Fulton 1989 study. An ester of myristyl alcohol and myristic acid — both individually comedogenic.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/myristyl-myristate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/myristyl%20myristate" }
    ]
  },
  {
    id: "myristyl-propionate",
    canonicalName: "Myristyl Propionate",
    aliases: [
      "Myristyl Propionate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Myristyl propionate has a slightly shorter acid chain than myristyl myristate, which may reduce but not eliminate comedogenicity.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/myristyl-propionate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/myristyl%20propionate" }
    ]
  },
  {
    id: "oleic-acid",
    canonicalName: "Oleic Acid",
    aliases: [
      "Oleic Acid"
    ],
    category: "fatty_acid",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Oleic acid is a monounsaturated omega-9 fatty acid found in many natural oils; its comedogenicity is well-established for the pure acid but varies when part of whole oils.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/oleic-acid" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/oleic%20acid" }
    ]
  },
  {
    id: "oleth-3",
    canonicalName: "Oleth-3",
    aliases: [
      "Oleth-3",
      "Oleth 3"
    ],
    category: "other",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Oleth-3 is an ethoxylated oleyl alcohol with low HLB; its lipophilic nature contributes to comedogenicity.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/oleth-3" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/oleth-3" }
    ]
  },
  {
    id: "oleth-5",
    canonicalName: "Oleth-5",
    aliases: [
      "Oleth-5",
      "Oleth 5"
    ],
    category: "other",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Oleth-5 has a longer PEG chain than Oleth-3, making it slightly more water-soluble, but retains comedogenic potential at high concentrations.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/oleth-5" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/oleth-5" }
    ]
  },
  {
    id: "oleyl-alcohol",
    canonicalName: "Oleyl Alcohol",
    aliases: [
      "Oleyl Alcohol"
    ],
    category: "fatty_alcohol",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Oleyl alcohol is an unsaturated fatty alcohol with a double bond that increases its potential to disrupt the skin barrier and penetrate follicles.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/oleyl-alcohol" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/oleyl%20alcohol" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // P – R
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "palm-oil",
    canonicalName: "Palm Oil",
    aliases: [
      "Palm Oil",
      "Palm Kernel Oil",
      "Elaeis Guineensis Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Palm oil is rich in palmitic acid, and palm kernel oil is rich in lauric acid — both individually comedogenic fatty acids.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/palm-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/palm%20oil" }
    ]
  },
  {
    id: "palmitic-acid",
    canonicalName: "Palmitic Acid",
    aliases: [
      "Palmitic Acid",
      "Hexadecyl Alcohol"
    ],
    category: "fatty_acid",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in some studies but evidence is mixed. Found in many natural oils; comedogenicity varies with formulation.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/palmitic-acid" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/palmitic%20acid" }
    ]
  },
  {
    id: "peanut-oil",
    canonicalName: "Peanut Oil",
    aliases: [
      "Peanut Oil",
      "Arachis Hypogaea Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Peanut oil has a balanced fatty acid profile with moderate oleic and linoleic acid content.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/peanut-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/peanut%20oil" }
    ]
  },
  {
    id: "pine-nut-oil",
    canonicalName: "Pine Nut Oil",
    aliases: [
      "Pine Nut Oil",
      "Pinus Pinea Seed Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "weak",
    rationale: "Appears on some pore-clogging lists, but scientific evidence is limited. Pine nut oil has a distinctive pinoleic acid content not found in most other oils, and no published comedogenicity study has tested it. The concern is speculative.",
    disputedNote: "No published comedogenicity study exists for pine nut oil. It contains unique fatty acids (pinoleic acid) not studied for comedogenicity. Its inclusion on pore-clogging lists lacks scientific support.",
    references: [
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/pine-nut-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/pine%20nut%20oil" }
    ]
  },
  {
    id: "polyglyceryl-3-diisostearate",
    canonicalName: "Polyglyceryl-3 Diisostearate",
    aliases: [
      "Polyglyceryl-3 Diisostearate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in some studies but with limited corroboration. Evidence is suggestive but not conclusive. Polyglyceryl-3 diisostearate is a polymeric emulsifier; the isostearic acid component may contribute to its comedogenicity rating, but the large molecular size of the polymer limits follicle penetration.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/polyglyceryl-3-diisostearate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/polyglyceryl-3%20diisostearate" }
    ]
  },
  {
    id: "potassium-chloride",
    canonicalName: "Potassium Chloride",
    aliases: [
      "Potassium Chloride",
      "KCl"
    ],
    category: "salt_mineral",
    scientificConfidence: "disputed",
    rationale: "Appears on some pore-clogging lists, but published evidence contradicts this. An inorganic salt with no published comedogenicity rating. No known mechanism for pore-clogging. Listed as 0 on standard comedogenicity scales.",
    disputedNote: "An inorganic salt with no published comedogenicity rating. No known mechanism for pore-clogging. Listed as 0 on standard comedogenicity scales.",
    references: [
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/potassium-chloride" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/potassium%20chloride" }
    ]
  },
  {
    id: "ppg-2-myristyl-propionate",
    canonicalName: "PPG 2 Myristyl Propionate",
    aliases: [
      "PPG 2 Myristyl Propionate",
      "PPP 2 Myristyl Ether Propionate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. PPG 2 myristyl propionate is a polypropylene glycol ester with moderate occlusive properties.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/ppg-2-myristyl-propionate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/ppg-2%20myristyl%20propionate" }
    ]
  },
  {
    id: "propylene-glycol-monostearate",
    canonicalName: "Propylene Glycol Monostearate",
    aliases: [
      "Propylene Glycol Monostearate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Propylene glycol monostearate is an ester of propylene glycol and stearic acid; comedogenicity is concentration-dependent.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/propylene-glycol-monostearate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/propylene%20glycol%20monostearate" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // S – X
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "sesame-oil",
    canonicalName: "Sesame Oil",
    aliases: [
      "Sesame Oil",
      "Sesamum Indicum",
      "Sesamum Indicum Seed Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Sesame oil contains sesamin and sesamolin, which give it antioxidant properties that may partially offset its comedogenic potential.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/sesame-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/sesame%20oil" }
    ]
  },
  {
    id: "shark-liver-oil",
    canonicalName: "Shark Liver Oil",
    aliases: [
      "Shark Liver Oil",
      "Shark Squalene"
    ],
    category: "oil_butter",
    scientificConfidence: "strong",
    rationale: "Consistently rated as comedogenic (score 3–4/5) in Fulton 1989 study. Shark liver oil is rich in squalene (with an 'e'), which is a highly comedogenic lipid that is a natural precursor to cholesterol in human sebum.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/shark-liver-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/shark%20liver%20oil" }
    ]
  },
  {
    id: "shea-butter",
    canonicalName: "Shea Butter",
    aliases: [
      "Shea Butter",
      "Shea",
      "Karite",
      "Butyrospermum Parkii",
      "Butyrospermum Parkii Butter",
      "Butyrospermum Parkii Shea Butter"
    ],
    category: "oil_butter",
    scientificConfidence: "weak",
    rationale: "Comedogenicity is debated. Rated 0–1 by some dermatologists and 4–5 by others depending on refinement level. CIR Expert Panel (2023) found it safe at current use concentrations.",
    disputedNote: "Comedogenicity is debated. Rated 0–1 by some dermatologists and 4–5 by others depending on refinement level. CIR Expert Panel (2023) found it safe at current use concentrations.",
    references: [
      { label: "CIR Expert Panel (2023). Safety assessment of Butyrospermum parkii (shea)-derived ingredients.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/shea-butter" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/shea%20butter" }
    ]
  },
  {
    id: "sls-sles",
    canonicalName: "SLS / SLES",
    aliases: [
      "SLES",
      "SLS",
      "Sodium Lauryl Sulfate",
      "Sodium Laureth Sulfate",
      "Sodium Dodecyl Sulfate"
    ],
    category: "sulfate_surfactant",
    scientificConfidence: "disputed",
    rationale: "Appears on some pore-clogging lists, but published evidence contradicts this. Surfactants that strip oils — they do not add them. Can cause irritation that mimics acne (acneiform eruptions), but the mechanism is not comedogenesis. Rated 0 on standard comedogenicity scales.",
    disputedNote: "Surfactants that strip oils — they do not add them. Can cause irritation that mimics acne (acneiform eruptions), but the mechanism is not comedogenesis. Rated 0 on standard comedogenicity scales.",
    references: [
      { label: "Draelos ZD, DiNardo JC (2006). A re-evaluation of the comedogenicity concept. J Am Acad Dermatol.", url: "https://pubmed.ncbi.nlm.nih.gov/16635664/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/sodium-laureth-sulfate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/sodium%20laureth%20sulfate" }
    ]
  },
  {
    id: "sodium-chloride",
    canonicalName: "Sodium Chloride",
    aliases: [
      "Sodium Chloride",
      "Salt",
      "NaCl",
      "Table Salt"
    ],
    category: "salt_mineral",
    scientificConfidence: "disputed",
    rationale: "Appears on some pore-clogging lists, but published evidence contradicts this. Table salt. An inorganic compound with no published comedogenicity rating. No known mechanism for pore-clogging. Listed as 0 on standard comedogenicity scales.",
    disputedNote: "Table salt. An inorganic compound with no published comedogenicity rating. No known mechanism for pore-clogging. Listed as 0 on standard comedogenicity scales.",
    references: [
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/sodium-chloride" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/sodium%20chloride" }
    ]
  },
  {
    id: "sorbitan-oleate",
    canonicalName: "Sorbitan Oleate",
    aliases: [
      "Sorbitan Oleate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Sorbitan oleate is a sorbitan ester emulsifier; the oleic acid component drives its comedogenicity.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/sorbitan-oleate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/sorbitan%20oleate" }
    ]
  },
  {
    id: "soybean-oil",
    canonicalName: "Soybean Oil",
    aliases: [
      "Soybean Oil",
      "Soy",
      "Soybean",
      "Glycine Max",
      "Glycine Soja Oil",
      "Glycine Soja"
    ],
    category: "oil_butter",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Soybean oil has a high linoleic acid content (~50%) and is widely used in skincare; comedogenicity is concentration-dependent.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/soybean-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/soybean%20oil" }
    ]
  },
  {
    id: "squalene",
    canonicalName: "Squalene",
    aliases: [
      "Squalene"
    ],
    category: "oil_butter",
    scientificConfidence: "strong",
    rationale: "Rated 3–4 on comedogenicity scales. Note: Squalene (with an 'e') is the comedogenic form. Squalane (with an 'a') is the hydrogenated, non-comedogenic form. These are different ingredients.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/squalene" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/squalene" }
    ]
  },
  {
    id: "steareth-10",
    canonicalName: "Steareth-10",
    aliases: [
      "Steareth 10",
      "Steareth-10"
    ],
    category: "other",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Steareth-10 is an ethoxylated stearyl alcohol emulsifier; comedogenicity is concentration-dependent and typically low at formulation levels.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/steareth-10" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/steareth-10" }
    ]
  },
  {
    id: "stearic-acid",
    canonicalName: "Stearic Acid",
    aliases: [
      "Stearic Acid"
    ],
    category: "fatty_acid",
    scientificConfidence: "moderate",
    rationale: "Rated 2–3 on some comedogenicity scales but evidence is mixed. Found naturally in many oils. Comedogenicity likely depends on source and concentration.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/stearic-acid" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/stearic%20acid" }
    ]
  },
  {
    id: "sulfated-castor-oil",
    canonicalName: "Sulfated Castor Oil",
    aliases: [
      "Sulfated Castor Oil",
      "Sulfated Jojoba Oil",
      "Turkey Red Oil"
    ],
    category: "sulfate_surfactant",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Sulfation increases water solubility compared to the parent oil, which may reduce comedogenicity relative to unsulfated castor oil.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/sulfated-castor-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/sulfated%20castor%20oil" }
    ]
  },
  {
    id: "sweet-almond-oil",
    canonicalName: "Sweet Almond Oil",
    aliases: [
      "Sweet Almond Oil",
      "Prunus Amygdalus Dulcis Oil"
    ],
    category: "oil_butter",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Sweet almond oil has a moderate oleic acid content (~65%) and is one of the more commonly used carrier oils in skincare.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/sweet-almond-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/sweet%20almond%20oil" }
    ]
  },
  {
    id: "tocopherol-vitamin-e",
    canonicalName: "Tocopherol / Vitamin E",
    aliases: [
      "Tocopherol",
      "Tocopheryl Acetate",
      "Vitamin E"
    ],
    category: "botanical_extract",
    scientificConfidence: "disputed",
    rationale: "Appears on some pore-clogging lists, but published evidence contradicts this. Draelos & DiNardo (2006) human study found tocopheryl acetate products non-comedogenic in 12 of 12 subjects. Rated 0–3 on published scales. Widely used in skincare without documented pore-clogging issues.",
    disputedNote: "Draelos & DiNardo (2006) human study found tocopheryl acetate products non-comedogenic in 12 of 12 subjects. Rated 0–3 on published scales. Widely used in skincare without documented pore-clogging issues.",
    references: [
      { label: "Draelos ZD, DiNardo JC (2006). A re-evaluation of the comedogenicity concept. J Am Acad Dermatol.", url: "https://pubmed.ncbi.nlm.nih.gov/16635664/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/tocopherol" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/tocopherol" }
    ]
  },
  {
    id: "wheat-germ-oil",
    canonicalName: "Wheat Germ Oil",
    aliases: [
      "Wheat Germ Oil",
      "Triticum Aestivum",
      "Triticum Vulgare",
      "Wheat Germ Acid",
      "Wheat Germ Glyceride"
    ],
    category: "oil_butter",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Wheat germ oil is rich in linoleic acid and vitamin E, but also contains wax esters that may contribute to comedogenicity.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/wheat-germ-oil" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/wheat%20germ%20oil" }
    ]
  },
  {
    id: "xylene",
    canonicalName: "Xylene",
    aliases: [
      "Xylene"
    ],
    category: "other",
    scientificConfidence: "disputed",
    rationale: "Appears on some pore-clogging lists, but published evidence contradicts this. An industrial solvent, not a cosmetic ingredient. No standard comedogenicity rating exists.",
    disputedNote: "An industrial solvent, not a cosmetic ingredient. No standard comedogenicity rating exists.",
    references: [
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/xylene" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/xylene" }
    ]
  },
  {
    id: "beef-tallow",
    canonicalName: "Beef Tallow",
    aliases: [
      "Beef Tallow",
      "Tallow"
    ],
    category: "oil_butter",
    scientificConfidence: "strong",
    rationale: "Consistently rated as comedogenic (score 3–4/5) in Fulton 1989 study. Beef tallow is an animal-derived fat with a fatty acid profile similar to human sebum; high in oleic, palmitic, and stearic acids, all with established comedogenic potential.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/beef-tallow" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/beef%20tallow" }
    ]
  },
  {
    id: "sunflower-butter",
    canonicalName: "Sunflower Butter",
    aliases: [
      "Sunflower Butter",
      "Helianthus Annuus Seed Butter"
    ],
    category: "oil_butter",
    scientificConfidence: "weak",
    rationale: "Appears on some pore-clogging lists, but scientific evidence is limited. Sunflower oil is generally considered non-comedogenic (rated 0–1), but the butter form (hydrogenated) may behave differently due to increased occlusivity. No direct comedogenicity testing exists for sunflower butter specifically.",
    disputedNote: "Sunflower oil is generally considered non-comedogenic (rated 0–1). The butter form has not been directly tested. The concern is speculative and based on hydrogenation increasing occlusivity.",
    references: [
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/sunflower-butter" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/sunflower%20butter" }
    ]
  },
  {
    id: "pouteria-sapota-seed-butter",
    canonicalName: "Pouteria Sapota Seed Butter",
    aliases: [
      "Pouteria Sapota Seed Butter",
      "Sapote Seed Butter",
      "Mamey Sapote Butter"
    ],
    category: "oil_butter",
    scientificConfidence: "weak",
    rationale: "Appears on some pore-clogging lists, but scientific evidence is limited. Pouteria sapota (mamey sapote) seed butter is a relatively exotic ingredient with no published comedogenicity studies. Its inclusion on pore-clogging lists lacks scientific support.",
    disputedNote: "No published comedogenicity study exists for pouteria sapota seed butter. It is a relatively rare cosmetic ingredient with no scientific data on pore-clogging potential.",
    references: [
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/pouteria-sapota-seed-butter" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/pouteria%20sapota%20seed%20butter" }
    ]
  },
  {
    id: "isopropyl-linoleate",
    canonicalName: "Isopropyl Linoleate",
    aliases: [
      "Isopropyl Linoleate",
      "Isopropyl Linolate",
      "Linolate"
    ],
    category: "synthetic_ester",
    scientificConfidence: "moderate",
    rationale: "Rated as comedogenic in Fulton 1989 study (score 2–3 at 100%) but with limited corroboration from additional studies. Evidence is suggestive but not conclusive. Isopropyl linoleate is an isopropyl ester of linoleic acid; its comedogenicity follows the pattern of other isopropyl esters.",
    disputedNote: null,
    references: [
      { label: "Fulton JE (1989). Comedogenicity and irritancy of commonly used ingredients in skin care products. J Soc Cosmet Chem.", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { label: "INCIDecoder", url: "https://incidecoder.com/ingredients/isopropyl-linoleate" },
      { label: "SkinSort", url: "https://skinsort.com/ingredients/isopropyl%20linoleate" }
    ]
  }
];

window.COMMON_WORDS = [
  "oil",
  "extract",
  "acid",
  "butter",
  "alcohol",
  "water",
  "seed",
  "wax",
  "salt",
  "powder",
  "juice",
  "fruit",
  "leaf",
  "root",
  "flower"
];
