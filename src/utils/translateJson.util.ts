import { Request } from "express";

/**
 * All ActiveSubstance fields that are stored as bilingual JSON objects
 * { en: string; ar?: string } and should be flattened to a plain string
 * before being sent to the client.
 *
 * Side-effect array fields (veryCommon*, common*, etc.) are intentionally
 * excluded — they remain as string arrays.
 */
export const TRANSLATION_JSON_FIELDS: string[] = [
  "contraindications",
  "interactionVitaminsFood",
  "interactionBisphosphonates",
  "interactionAlcohol",
  "interactionMuscleRelaxant",
  "interactionRetinoids",
  "interactionCorticosteroids",
  "interactionXanthines",
  "interactionSympathomimetics",
  "interactionAnticholinergic",
  "interactionChemotherapy",
  "interactionAntibiotics",
  "interactionHormones",
  "interactionStatins",
  "interactionAntihypertensive",
  "interactionAntidiuretics",
  "interactionAntidepressant",
  "interactionAntidiabetic",
  "interactionLowBloodSugarAgents",
  "interactionDigoxin",
  "interactionAnticoagulant",
  "interactionNSAIDs",
  "interactionImmunosuppressive",
  "interactionAntacids",
  "interactionUricosurics",
  "interactionProtectants",
  "interactionAntiParkinson",
  "interactionHIVProtease",
  "interactionBloodProduct",
  "interactionVaccines",
  "interactionAnthelmintics",
  "interactionPDE5Inhibitors",
];

export type SupportedLang = "en" | "ar";

/**
 * Reads the requested language from the `lang` query parameter.
 * Accepts "en" or "ar"; defaults to "en" for anything else.
 */
export function extractLang(req: Request): SupportedLang {
  const lang = req.query.lang;
  if (lang === "ar") return "ar";
  return "en";
}

/**
 * Converts a single translation JSON value to a plain string.
 *
 * - null / undefined          → null
 * - { en, ar } object         → value[lang] ?? value.en ?? null
 * - plain string              → returned as-is
 * - legacy string array       → joined with ", "
 */
export function extractTranslation(
  value: unknown,
  lang: SupportedLang
): string | null {
  if (value === null || value === undefined) return null;

  if (Array.isArray(value)) {
    const joined = value
      .filter((v) => v != null && String(v).trim() !== "")
      .join(", ");
    return joined || null;
  }

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const text =
      (obj[lang] as string | undefined) ?? (obj["en"] as string | undefined);
    return text?.trim() || null;
  }

  if (typeof value === "string") {
    return value.trim() || null;
  }

  return String(value);
}

/**
 * Shallow-clones an object and replaces every translation JSON field with
 * its plain-string equivalent for the requested language.
 */
export function serializeActiveSubstance<T extends object>(
  sub: T,
  lang: SupportedLang
): T {
  const result = { ...sub } as Record<string, unknown>;
  for (const field of TRANSLATION_JSON_FIELDS) {
    if (field in result) {
      result[field] = extractTranslation(result[field], lang);
    }
  }
  return result as T;
}
