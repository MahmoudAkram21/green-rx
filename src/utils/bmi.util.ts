/**
 * Compute body mass index from weight (kg) and height (cm).
 * Formula: BMI = weight / (height_m)^2 where height_m = height_cm / 100.
 * Returns null if weight or height is missing, invalid, or height <= 0.
 */
export function computeBmi(weight: unknown, height: unknown): number | null {
    const w = weight != null ? Number(weight) : NaN;
    const h = height != null ? Number(height) : NaN; // expect cm
    if (!Number.isFinite(w) || !Number.isFinite(h) || h <= 0) return null;
    const heightM = h / 100;
    return Math.round((w / (heightM * heightM)) * 100) / 100;
}
