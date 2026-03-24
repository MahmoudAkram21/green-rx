/**
 * Shared Prisma include for PatientAllergy.
 * Includes all three possible allergy target types:
 *  - allergen (catalog: Food, Respiratory, Skin, Insect Stings, Medication catalog entries)
 *  - activeSubstance (Medication: patient chose from active-substance search)
 *  - tradeName (Medication: patient chose from trade-name search)
 */
export const patientAllergyInclude = {
  allergen: { include: { allergenCategory: { select: { id: true, name: true } } } },
  activeSubstance: { select: { id: true, activeSubstance: true, concentration: true, classification: true } },
  tradeName: {
    select: {
      id: true,
      title: true,
      activeSubstanceId: true,
      activeSubstance: { select: { id: true, activeSubstance: true } },
    },
  },
} as const;
