/**
 * Extract Side Effects from CSV Import Data
 * 
 * Purpose: Convert side effect data stored as JSON arrays in ActiveSubstance fields
 * (veryCommonGIT, commonBlood, etc.) into normalized database tables.
 * 
 * Creates:
 * - SideEffect records (one per unique side effect name)
 * - MedicationSideEffect links (linking each side effect to active substance with frequency/bodySystem)
 * 
 * Run: npm run extract-side-effects
 */

import 'dotenv/config';
import { prisma } from '../src/lib/prisma';

// Mapping: Field Name → { frequency, bodySystem }
// 104 fields total: 16 veryCommon + 17 common + 18 uncommon + 18 rare + 18 veryRare + 17 unknown
const SIDE_EFFECT_FIELDS: Record<string, { frequency: string; bodySystem: string }> = {
  // ── VeryCommon (16 fields) ───────────────────────────────────────
  veryCommonGIT: { frequency: 'VeryCommon', bodySystem: 'GIT' },
  veryCommonBlood: { frequency: 'VeryCommon', bodySystem: 'Blood' },
  veryCommonVascular: { frequency: 'VeryCommon', bodySystem: 'Vascular' },
  veryCommonCardiac: { frequency: 'VeryCommon', bodySystem: 'Cardiac' },
  veryCommonMusculoskeletal: { frequency: 'VeryCommon', bodySystem: 'Musculoskeletal' },
  veryCommonNervousSystem: { frequency: 'VeryCommon', bodySystem: 'NervousSystem' },
  veryCommonEye: { frequency: 'VeryCommon', bodySystem: 'Eye' },
  veryCommonMetabolism: { frequency: 'VeryCommon', bodySystem: 'Metabolism' },
  veryCommonEar: { frequency: 'VeryCommon', bodySystem: 'Ear' },
  veryCommonRespiratory: { frequency: 'VeryCommon', bodySystem: 'Respiratory' },
  veryCommonSkin: { frequency: 'VeryCommon', bodySystem: 'Skin' },
  veryCommonInfection: { frequency: 'VeryCommon', bodySystem: 'Infection' },
  veryCommonPsychiatric: { frequency: 'VeryCommon', bodySystem: 'Psychiatric' },
  veryCommonRenal: { frequency: 'VeryCommon', bodySystem: 'Renal' },
  veryCommonHepatic: { frequency: 'VeryCommon', bodySystem: 'Hepatic' },
  veryCommonGeneral: { frequency: 'VeryCommon', bodySystem: 'General' },

  // ── Common (17 fields) ───────────────────────────────────────────
  commonGIT: { frequency: 'Common', bodySystem: 'GIT' },
  commonVascular: { frequency: 'Common', bodySystem: 'Vascular' },
  commonInfections: { frequency: 'Common', bodySystem: 'Infections' },
  commonRespiratory: { frequency: 'Common', bodySystem: 'Respiratory' },
  commonCardiac: { frequency: 'Common', bodySystem: 'Cardiac' },
  commonBlood: { frequency: 'Common', bodySystem: 'Blood' },
  commonSkin: { frequency: 'Common', bodySystem: 'Skin' },
  commonEye: { frequency: 'Common', bodySystem: 'Eye' },
  commonEar: { frequency: 'Common', bodySystem: 'Ear' },
  commonMetabolism: { frequency: 'Common', bodySystem: 'Metabolism' },
  commonGeneral: { frequency: 'Common', bodySystem: 'General' },
  commonHepatobiliary: { frequency: 'Common', bodySystem: 'Hepatobiliary' },
  commonImmunity: { frequency: 'Common', bodySystem: 'Immunity' },
  commonPsychiatric: { frequency: 'Common', bodySystem: 'Psychiatric' },
  commonNervousSystem: { frequency: 'Common', bodySystem: 'NervousSystem' },
  commonRenal: { frequency: 'Common', bodySystem: 'Renal' },
  commonMusculoskeletal: { frequency: 'Common', bodySystem: 'Musculoskeletal' },

  // ── Uncommon (18 fields) ────────────────────────────────────────
  uncommonNervous: { frequency: 'Uncommon', bodySystem: 'Nervous' },
  uncommonInfections: { frequency: 'Uncommon', bodySystem: 'Infections' },
  uncommonPsychiatric: { frequency: 'Uncommon', bodySystem: 'Psychiatric' },
  uncommonEye: { frequency: 'Uncommon', bodySystem: 'Eye' },
  uncommonRespiratory: { frequency: 'Uncommon', bodySystem: 'Respiratory' },
  uncommonSkin: { frequency: 'Uncommon', bodySystem: 'Skin' },
  uncommonRenal: { frequency: 'Uncommon', bodySystem: 'Renal' },
  uncommonHepatobiliary: { frequency: 'Uncommon', bodySystem: 'Hepatobiliary' },
  uncommonVascular: { frequency: 'Uncommon', bodySystem: 'Vascular' },
  uncommonGIT: { frequency: 'Uncommon', bodySystem: 'GIT' },
  uncommonMusculoskeletal: { frequency: 'Uncommon', bodySystem: 'Musculoskeletal' },
  uncommonMetabolism: { frequency: 'Uncommon', bodySystem: 'Metabolism' },
  uncommonEar: { frequency: 'Uncommon', bodySystem: 'Ear' },
  uncommonCardiac: { frequency: 'Uncommon', bodySystem: 'Cardiac' },
  uncommonBlood: { frequency: 'Uncommon', bodySystem: 'Blood' },
  uncommonImmunity: { frequency: 'Uncommon', bodySystem: 'Immunity' },
  uncommonGeneral: { frequency: 'Uncommon', bodySystem: 'General' },

  // ── Rare (18 fields) ────────────────────────────────────────────
  rareEar: { frequency: 'Rare', bodySystem: 'Ear' },
  rareBlood: { frequency: 'Rare', bodySystem: 'Blood' },
  rareGIT: { frequency: 'Rare', bodySystem: 'GIT' },
  rareHepatic: { frequency: 'Rare', bodySystem: 'Hepatic' },
  rareInfections: { frequency: 'Rare', bodySystem: 'Infections' },
  rareCardiac: { frequency: 'Rare', bodySystem: 'Cardiac' },
  rareVascular: { frequency: 'Rare', bodySystem: 'Vascular' },
  rareImmune: { frequency: 'Rare', bodySystem: 'Immune' },
  rareMetabolism: { frequency: 'Rare', bodySystem: 'Metabolism' },
  rareNervous: { frequency: 'Rare', bodySystem: 'Nervous' },
  rareMusculoskeletal: { frequency: 'Rare', bodySystem: 'Musculoskeletal' },
  rarePsychiatric: { frequency: 'Rare', bodySystem: 'Psychiatric' },
  rareEye: { frequency: 'Rare', bodySystem: 'Eye' },
  rareRenal: { frequency: 'Rare', bodySystem: 'Renal' },
  rareSkin: { frequency: 'Rare', bodySystem: 'Skin' },
  rareRespiratory: { frequency: 'Rare', bodySystem: 'Respiratory' },
  rareEndocrine: { frequency: 'Rare', bodySystem: 'Endocrine' },
  rareGeneral: { frequency: 'Rare', bodySystem: 'General' },

  // ── VeryRare (18 fields) ────────────────────────────────────────
  veryRareVascular: { frequency: 'VeryRare', bodySystem: 'Vascular' },
  veryRareEndocrine: { frequency: 'VeryRare', bodySystem: 'Endocrine' },
  veryRareNervous: { frequency: 'VeryRare', bodySystem: 'Nervous' },
  veryRarePsychiatric: { frequency: 'VeryRare', bodySystem: 'Psychiatric' },
  veryRareEye: { frequency: 'VeryRare', bodySystem: 'Eye' },
  veryRareMusculoskeletal: { frequency: 'VeryRare', bodySystem: 'Musculoskeletal' },
  veryRareBlood: { frequency: 'VeryRare', bodySystem: 'Blood' },
  veryRareCardiac: { frequency: 'VeryRare', bodySystem: 'Cardiac' },
  veryRareImmune: { frequency: 'VeryRare', bodySystem: 'Immune' },
  veryRareEar: { frequency: 'VeryRare', bodySystem: 'Ear' },
  veryRareRenal: { frequency: 'VeryRare', bodySystem: 'Renal' },
  veryRareGIT: { frequency: 'VeryRare', bodySystem: 'GIT' },
  veryRareHepatobiliary: { frequency: 'VeryRare', bodySystem: 'Hepatobiliary' },
  veryRareInfections: { frequency: 'VeryRare', bodySystem: 'Infections' },
  veryRareRespiratory: { frequency: 'VeryRare', bodySystem: 'Respiratory' },
  veryRareSkin: { frequency: 'VeryRare', bodySystem: 'Skin' },
  veryRareGeneral: { frequency: 'VeryRare', bodySystem: 'General' },
  veryRareMetabolism: { frequency: 'VeryRare', bodySystem: 'Metabolism' },

  // ── Unknown (17 fields) ─────────────────────────────────────────
  unknownNervous: { frequency: 'Unknown', bodySystem: 'Nervous' },
  unknownMusculoskeletal: { frequency: 'Unknown', bodySystem: 'Musculoskeletal' },
  unknownPsychiatric: { frequency: 'Unknown', bodySystem: 'Psychiatric' },
  unknownHepatobiliary: { frequency: 'Unknown', bodySystem: 'Hepatobiliary' },
  unknownRenal: { frequency: 'Unknown', bodySystem: 'Renal' },
  unknownSkin: { frequency: 'Unknown', bodySystem: 'Skin' },
  unknownRespiratory: { frequency: 'Unknown', bodySystem: 'Respiratory' },
  unknownImmune: { frequency: 'Unknown', bodySystem: 'Immune' },
  unknownVascular: { frequency: 'Unknown', bodySystem: 'Vascular' },
  unknownEar: { frequency: 'Unknown', bodySystem: 'Ear' },
  unknownGIT: { frequency: 'Unknown', bodySystem: 'GIT' },
  unknownGeneral: { frequency: 'Unknown', bodySystem: 'General' },
  unknownMetabolism: { frequency: 'Unknown', bodySystem: 'Metabolism' },
  unknownEye: { frequency: 'Unknown', bodySystem: 'Eye' },
  unknownBlood: { frequency: 'Unknown', bodySystem: 'Blood' },
  unknownCardiac: { frequency: 'Unknown', bodySystem: 'Cardiac' },
  unknownInfections: { frequency: 'Unknown', bodySystem: 'Infections' },
};

async function main() {
  console.log('🔄 Extracting side effects from ActiveSubstance fields...\n');

  try {
    // Query all active substances with all side effect fields
    const activeSubstances = await prisma.activeSubstance.findMany({
      select: {
        id: true,
        name: true,
        // Include all 104 side effect fields
        ...Object.fromEntries(Object.keys(SIDE_EFFECT_FIELDS).map(key => [key, true]))
      }
    });

    console.log(`📦 Found ${activeSubstances.length} active substances\n`);

    let totalSideEffectsCreated = 0;
    let totalLinksCreated = 0;
    let totalErrors = 0;

    // Process each substance
    for (const substance of activeSubstances) {
      console.log(`🔍 Processing: ${substance.name} (ID: ${substance.id})`);

      let substanceFieldCount = 0;

      // Loop through each field mapping
      for (const [fieldName, { frequency, bodySystem }] of Object.entries(SIDE_EFFECT_FIELDS)) {
        
        // Get the side effect array from this field
        const sideEffectArray = (substance as any)[fieldName];

        // Skip if empty
        if (!sideEffectArray || !Array.isArray(sideEffectArray) || sideEffectArray.length === 0) {
          continue;
        }

        substanceFieldCount++;
        console.log(`   📋 ${fieldName} (${frequency}, ${bodySystem}): ${sideEffectArray.length} effects`);

        // Process each side effect name in the array
        for (const sideEffectName of sideEffectArray) {
          if (!sideEffectName || String(sideEffectName).trim() === '') {
            continue;
          }

          try {
            const trimmedName = String(sideEffectName).trim();

            // Create or find SideEffect record
            const sideEffect = await prisma.sideEffect.upsert({
              where: { name: trimmedName },
              create: {
                name: trimmedName,
                status: 'Approved',
                createdBy: 'Admin'
              },
              update: {}
            });

            if (!sideEffect.id) {
              console.error(`      ❌ Failed to create/find side effect: ${trimmedName}`);
              totalErrors++;
              continue;
            }

            // Create or find MedicationSideEffect link
            await prisma.medicationSideEffect.upsert({
              where: {
                activeSubstanceId_sideEffectId: {
                  activeSubstanceId: substance.id,
                  sideEffectId: sideEffect.id
                }
              },
              create: {
                activeSubstanceId: substance.id,
                sideEffectId: sideEffect.id,
                frequency,
                bodySystem
              },
              update: {}
            });

            totalLinksCreated++;
            console.log(`      ✅ ${trimmedName} → ${frequency}`);
          } catch (error: any) {
            console.error(`      ❌ Error: ${error.message}`);
            totalErrors++;
          }
        }
      }

      console.log(`   ✓ Processed ${substanceFieldCount} fields\n`);
    }

    console.log('\n✨ Extraction Complete!');
    console.log(`   Total links created: ${totalLinksCreated}`);
    console.log(`   Total errors: ${totalErrors}`);
    console.log(`\n📝 Next step: Run 'npm run sync-side-effects' to populate TradeNameSideEffect table`);

  } catch (error: any) {
    console.error('❌ Error during extraction:', error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
