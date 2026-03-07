/**
 * Sync side effects from Active Substance to Trade Names.
 * For each trade name, copies its active substance's medication side effects
 * into TradeNameSideEffect so the medicine detail page shows side effects.
 * Run: npm run sync-side-effects
 */
import 'dotenv/config';
import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Syncing side effects from active substances to trade names...');

  const tradeNames = await prisma.tradeName.findMany({
    include: {
      activeSubstance: {
        include: {
          medicationSideEffects: true,
        },
      },
    },
  });

  const toCreate: Array<{ tradeNameId: number; sideEffectId: number; frequency: string | null; bodySystem: string | null }> = [];
  for (const tn of tradeNames) {
    const list = tn.activeSubstance?.medicationSideEffects ?? [];
    for (const ms of list) {
      toCreate.push({
        tradeNameId: tn.id,
        sideEffectId: ms.sideEffectId,
        frequency: ms.frequency ?? 'Unknown',
        bodySystem: ms.bodySystem ?? null,
      });
    }
  }

  const result = await prisma.tradeNameSideEffect.createMany({
    data: toCreate,
    skipDuplicates: true,
  });

  console.log(`Done. Added ${result.count} trade-name side effect links (${toCreate.length} total from active substances).`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
