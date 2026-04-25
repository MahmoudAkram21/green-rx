import { prisma } from '../lib/prisma';

/**
 * Maps each ActiveSubstance side-effect field name to its frequency tier
 * and body system. Mirrors the SIDE_EFFECT_FIELDS map in
 * backend/scripts/extract-side-effects-from-import.ts (104 fields total).
 *
 * All values stored in these fields are string[] (as written by the import
 * controller's parseArrayField helper).
 */
type SideEffectFieldMeta = { frequency: string; bodySystem: string };

const SIDE_EFFECT_FIELDS: Record<string, SideEffectFieldMeta> = {
  // ── VeryCommon (16 fields) ───────────────────────────────────────
  veryCommonGIT:             { frequency: 'VeryCommon', bodySystem: 'GIT' },
  veryCommonBlood:           { frequency: 'VeryCommon', bodySystem: 'Blood' },
  veryCommonVascular:        { frequency: 'VeryCommon', bodySystem: 'Vascular' },
  veryCommonCardiac:         { frequency: 'VeryCommon', bodySystem: 'Cardiac' },
  veryCommonMusculoskeletal: { frequency: 'VeryCommon', bodySystem: 'Musculoskeletal' },
  veryCommonNervousSystem:   { frequency: 'VeryCommon', bodySystem: 'NervousSystem' },
  veryCommonEye:             { frequency: 'VeryCommon', bodySystem: 'Eye' },
  veryCommonMetabolism:      { frequency: 'VeryCommon', bodySystem: 'Metabolism' },
  veryCommonEar:             { frequency: 'VeryCommon', bodySystem: 'Ear' },
  veryCommonRespiratory:     { frequency: 'VeryCommon', bodySystem: 'Respiratory' },
  veryCommonSkin:            { frequency: 'VeryCommon', bodySystem: 'Skin' },
  veryCommonInfection:       { frequency: 'VeryCommon', bodySystem: 'Infection' },
  veryCommonPsychiatric:     { frequency: 'VeryCommon', bodySystem: 'Psychiatric' },
  veryCommonRenal:           { frequency: 'VeryCommon', bodySystem: 'Renal' },
  veryCommonHepatic:         { frequency: 'VeryCommon', bodySystem: 'Hepatic' },
  veryCommonGeneral:         { frequency: 'VeryCommon', bodySystem: 'General' },

  // ── Common (17 fields) ───────────────────────────────────────────
  commonGIT:             { frequency: 'Common', bodySystem: 'GIT' },
  commonVascular:        { frequency: 'Common', bodySystem: 'Vascular' },
  commonInfections:      { frequency: 'Common', bodySystem: 'Infections' },
  commonRespiratory:     { frequency: 'Common', bodySystem: 'Respiratory' },
  commonCardiac:         { frequency: 'Common', bodySystem: 'Cardiac' },
  commonBlood:           { frequency: 'Common', bodySystem: 'Blood' },
  commonSkin:            { frequency: 'Common', bodySystem: 'Skin' },
  commonEye:             { frequency: 'Common', bodySystem: 'Eye' },
  commonEar:             { frequency: 'Common', bodySystem: 'Ear' },
  commonMetabolism:      { frequency: 'Common', bodySystem: 'Metabolism' },
  commonGeneral:         { frequency: 'Common', bodySystem: 'General' },
  commonHepatobiliary:   { frequency: 'Common', bodySystem: 'Hepatobiliary' },
  commonImmunity:        { frequency: 'Common', bodySystem: 'Immunity' },
  commonPsychiatric:     { frequency: 'Common', bodySystem: 'Psychiatric' },
  commonNervousSystem:   { frequency: 'Common', bodySystem: 'NervousSystem' },
  commonRenal:           { frequency: 'Common', bodySystem: 'Renal' },
  commonMusculoskeletal: { frequency: 'Common', bodySystem: 'Musculoskeletal' },

  // ── Uncommon (18 fields) ────────────────────────────────────────
  uncommonNervous:         { frequency: 'Uncommon', bodySystem: 'Nervous' },
  uncommonInfections:      { frequency: 'Uncommon', bodySystem: 'Infections' },
  uncommonPsychiatric:     { frequency: 'Uncommon', bodySystem: 'Psychiatric' },
  uncommonEye:             { frequency: 'Uncommon', bodySystem: 'Eye' },
  uncommonRespiratory:     { frequency: 'Uncommon', bodySystem: 'Respiratory' },
  uncommonSkin:            { frequency: 'Uncommon', bodySystem: 'Skin' },
  uncommonRenal:           { frequency: 'Uncommon', bodySystem: 'Renal' },
  uncommonHepatobiliary:   { frequency: 'Uncommon', bodySystem: 'Hepatobiliary' },
  uncommonVascular:        { frequency: 'Uncommon', bodySystem: 'Vascular' },
  uncommonGIT:             { frequency: 'Uncommon', bodySystem: 'GIT' },
  uncommonMusculoskeletal: { frequency: 'Uncommon', bodySystem: 'Musculoskeletal' },
  uncommonMetabolism:      { frequency: 'Uncommon', bodySystem: 'Metabolism' },
  uncommonEar:             { frequency: 'Uncommon', bodySystem: 'Ear' },
  uncommonCardiac:         { frequency: 'Uncommon', bodySystem: 'Cardiac' },
  uncommonBlood:           { frequency: 'Uncommon', bodySystem: 'Blood' },
  uncommonImmunity:        { frequency: 'Uncommon', bodySystem: 'Immunity' },
  uncommonGeneral:         { frequency: 'Uncommon', bodySystem: 'General' },

  // ── Rare (18 fields) ────────────────────────────────────────────
  rareEar:             { frequency: 'Rare', bodySystem: 'Ear' },
  rareBlood:           { frequency: 'Rare', bodySystem: 'Blood' },
  rareGIT:             { frequency: 'Rare', bodySystem: 'GIT' },
  rareHepatic:         { frequency: 'Rare', bodySystem: 'Hepatic' },
  rareInfections:      { frequency: 'Rare', bodySystem: 'Infections' },
  rareCardiac:         { frequency: 'Rare', bodySystem: 'Cardiac' },
  rareVascular:        { frequency: 'Rare', bodySystem: 'Vascular' },
  rareImmune:          { frequency: 'Rare', bodySystem: 'Immune' },
  rareMetabolism:      { frequency: 'Rare', bodySystem: 'Metabolism' },
  rareNervous:         { frequency: 'Rare', bodySystem: 'Nervous' },
  rareMusculoskeletal: { frequency: 'Rare', bodySystem: 'Musculoskeletal' },
  rarePsychiatric:     { frequency: 'Rare', bodySystem: 'Psychiatric' },
  rareEye:             { frequency: 'Rare', bodySystem: 'Eye' },
  rareRenal:           { frequency: 'Rare', bodySystem: 'Renal' },
  rareSkin:            { frequency: 'Rare', bodySystem: 'Skin' },
  rareRespiratory:     { frequency: 'Rare', bodySystem: 'Respiratory' },
  rareEndocrine:       { frequency: 'Rare', bodySystem: 'Endocrine' },
  rareGeneral:         { frequency: 'Rare', bodySystem: 'General' },

  // ── VeryRare (18 fields) ────────────────────────────────────────
  veryRareVascular:        { frequency: 'VeryRare', bodySystem: 'Vascular' },
  veryRareEndocrine:       { frequency: 'VeryRare', bodySystem: 'Endocrine' },
  veryRareNervous:         { frequency: 'VeryRare', bodySystem: 'Nervous' },
  veryRarePsychiatric:     { frequency: 'VeryRare', bodySystem: 'Psychiatric' },
  veryRareEye:             { frequency: 'VeryRare', bodySystem: 'Eye' },
  veryRareMusculoskeletal: { frequency: 'VeryRare', bodySystem: 'Musculoskeletal' },
  veryRareBlood:           { frequency: 'VeryRare', bodySystem: 'Blood' },
  veryRareCardiac:         { frequency: 'VeryRare', bodySystem: 'Cardiac' },
  veryRareImmune:          { frequency: 'VeryRare', bodySystem: 'Immune' },
  veryRareEar:             { frequency: 'VeryRare', bodySystem: 'Ear' },
  veryRareRenal:           { frequency: 'VeryRare', bodySystem: 'Renal' },
  veryRareGIT:             { frequency: 'VeryRare', bodySystem: 'GIT' },
  veryRareHepatobiliary:   { frequency: 'VeryRare', bodySystem: 'Hepatobiliary' },
  veryRareInfections:      { frequency: 'VeryRare', bodySystem: 'Infections' },
  veryRareRespiratory:     { frequency: 'VeryRare', bodySystem: 'Respiratory' },
  veryRareSkin:            { frequency: 'VeryRare', bodySystem: 'Skin' },
  veryRareGeneral:         { frequency: 'VeryRare', bodySystem: 'General' },
  veryRareMetabolism:      { frequency: 'VeryRare', bodySystem: 'Metabolism' },

  // ── Unknown (17 fields) ─────────────────────────────────────────
  unknownNervous:        { frequency: 'Unknown', bodySystem: 'Nervous' },
  unknownMusculoskeletal:{ frequency: 'Unknown', bodySystem: 'Musculoskeletal' },
  unknownPsychiatric:    { frequency: 'Unknown', bodySystem: 'Psychiatric' },
  unknownHepatobiliary:  { frequency: 'Unknown', bodySystem: 'Hepatobiliary' },
  unknownRenal:          { frequency: 'Unknown', bodySystem: 'Renal' },
  unknownSkin:           { frequency: 'Unknown', bodySystem: 'Skin' },
  unknownRespiratory:    { frequency: 'Unknown', bodySystem: 'Respiratory' },
  unknownImmune:         { frequency: 'Unknown', bodySystem: 'Immune' },
  unknownVascular:       { frequency: 'Unknown', bodySystem: 'Vascular' },
  unknownEar:            { frequency: 'Unknown', bodySystem: 'Ear' },
  unknownGIT:            { frequency: 'Unknown', bodySystem: 'GIT' },
  unknownGeneral:        { frequency: 'Unknown', bodySystem: 'General' },
  unknownMetabolism:     { frequency: 'Unknown', bodySystem: 'Metabolism' },
  unknownEye:            { frequency: 'Unknown', bodySystem: 'Eye' },
  unknownBlood:          { frequency: 'Unknown', bodySystem: 'Blood' },
  unknownCardiac:        { frequency: 'Unknown', bodySystem: 'Cardiac' },
  unknownInfections:     { frequency: 'Unknown', bodySystem: 'Infections' },
};

const BODY_SYSTEM_ALIASES: Record<string, string> = {
  Nervous: 'NervousSystem',
  NervousSystem: 'NervousSystem',
  Infection: 'Infections',
  Infections: 'Infections',
  Immunity: 'Immune',
  Immune: 'Immune',
};

export function normalizeBodySystem(rawBodySystem: string): string {
  const trimmed = rawBodySystem.trim();
  if (!trimmed) return 'Other';
  return BODY_SYSTEM_ALIASES[trimmed] ?? trimmed;
}

export interface SideEffectEntry {
  name: string;
  frequency: string;
}

export interface ExtractedSideEffects {
  activeSubstanceId: number;
  sideEffects: Record<string, SideEffectEntry[]>;
}

/** Build a Prisma select object that includes only the side-effect fields + id + name. */
const SIDE_EFFECT_SELECT = {
  id:   true,
  name: true,
  ...Object.fromEntries(Object.keys(SIDE_EFFECT_FIELDS).map((f) => [f, true])),
} as const;

/**
 * Reads the side-effect JSON array fields directly from the ActiveSubstance
 * record and returns them grouped by normalized organ/body system.
 *
 * No data is written to the database — this is a pure read and transform.
 * Returns null when the active substance does not exist.
 */
export async function extractSideEffects(
  activeSubstanceId: number,
): Promise<ExtractedSideEffects | null> {
  const substance = await prisma.activeSubstance.findUnique({
    where: { id: activeSubstanceId },
    select: SIDE_EFFECT_SELECT as any,
  });

  if (!substance) return null;

  const grouped: ExtractedSideEffects['sideEffects'] = {};

  for (const [fieldName, { frequency, bodySystem }] of Object.entries(SIDE_EFFECT_FIELDS)) {
    const raw = (substance as Record<string, unknown>)[fieldName];
    if (!raw || !Array.isArray(raw) || raw.length === 0) continue;

    const normalizedBodySystem = normalizeBodySystem(bodySystem);
    if (!grouped[normalizedBodySystem]) {
      grouped[normalizedBodySystem] = [];
    }

    for (const item of raw) {
      const name = String(item).trim();
      if (name) {
        grouped[normalizedBodySystem].push({ name, frequency });
      }
    }
  }

  return { activeSubstanceId, sideEffects: grouped };
}
