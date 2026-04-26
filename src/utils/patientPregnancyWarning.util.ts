/** @format */

/**
 * Whether pregnancy-related **drug** warnings should run for this patient.
 * Mobile can omit `pregnancyWarning` when `pregnancyStatus` is true for a female patient.
 */
export function shouldApplyPregnancyDrugWarnings(patient: {
  gender: string;
  pregnancyWarning?: boolean | null;
  pregnancyStatus?: boolean | null;
}): boolean {
  if (String(patient.gender) !== "Female") return false;
  if (patient.pregnancyWarning === true) return true;
  if (patient.pregnancyStatus === true) return true;
  return false;
}
