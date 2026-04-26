/** @format */

/**
 * Shared helpers for reading ActiveSubstance string / Json fields in warnings
 * (lifestyle checks, disease checks, pharma engine).
 */

export function hasContent(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  let text: string;
  if (typeof value === "object") {
    text = (value as Record<string, string>).en ?? JSON.stringify(value);
  } else {
    text = String(value);
  }
  const normalized = text.trim().toUpperCase();
  return (
    normalized !== "" &&
    normalized !== "NA" &&
    normalized !== "N/A" &&
    normalized !== "NIL" &&
    normalized !== "NONE" &&
    normalized !== "-"
  );
}

export function extractText(value: unknown): string {
  if (!value) return "";
  if (typeof value === "object") {
    return (value as Record<string, string>).en ?? JSON.stringify(value);
  }
  return String(value);
}
