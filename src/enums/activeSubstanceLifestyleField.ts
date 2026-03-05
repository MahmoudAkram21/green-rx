/**
 * ActiveSubstance field names used for lifestyle-based drug warnings.
 * When a patient has a lifestyle question set to true, we check the corresponding
 * field on ActiveSubstance when adding a medicine and show a warning if it's set.
 * Keep in sync with ActiveSubstance model in prisma/schema.prisma (interaction* and ironChelator).
 */
export const ACTIVE_SUBSTANCE_LIFESTYLE_FIELDS = [
  'interactionVitaminsFood',
  'interactionBisphosphonates',
  'interactionAlcohol',
  'interactionMuscleRelaxant',
  'interactionRetinoids',
  'interactionCorticosteroids',
  'interactionXanthines',
  'interactionSympathomimetics',
  'interactionAnticholinergic',
  'interactionChemotherapy',
  'interactionAntibiotics',
  'interactionHormones',
  'interactionStatins',
  'interactionAntihypertensive',
  'interactionAntidiuretics',
  'interactionAntidepressant',
  'interactionAntidiabetic',
  'interactionLowBloodSugarAgents',
  'interactionDigoxin',
  'interactionAnticoagulant',
  'interactionNSAIDs',
  'interactionImmunosuppressive',
  'interactionAntacids',
  'interactionUricosurics',
  'interactionProtectants',
  'interactionAntiParkinson',
  'interactionHIVProtease',
  'ironChelator',
  'interactionBloodProduct',
  'interactionVaccines',
  'interactionAnthelmintics',
  'interactionPDE5Inhibitors',
] as const;

export type ActiveSubstanceLifestyleField = (typeof ACTIVE_SUBSTANCE_LIFESTYLE_FIELDS)[number];
