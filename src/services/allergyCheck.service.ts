/**
 * Shared Allergy Gate Service
 *
 * One function — checkAllergyConflicts() — covers all conflict types:
 *   - active substance FK match
 *   - trade name FK match (and same active substance via trade name)
 *   - classification ID match
 *   - excipient match (via ExcipientTradeName join)
 *   - catalog allergen keyword fallback (name substring match)
 *
 * Call this before persisting any patient medicine or prescription medicine
 * to ensure blocked patients receive a warning and the action is rejected.
 */

import { prisma } from '../lib/prisma';

// ─── Public Types ────────────────────────────────────────────────────────────

export type AllergyConflictType =
  | 'active_substance'
  | 'trade_name'
  | 'classification'
  | 'excipient'
  | 'catalog_allergen';

export interface AllergyConflict {
  type: AllergyConflictType;
  matchedId: number | null;
  matchedName: string;
  reaction: string | null;
  reason: string;
}

export interface AllergyGateResult {
  /** true when at least one conflict was found — the calling controller should NOT persist and should return 409. */
  blocked: boolean;
  conflicts: AllergyConflict[];
  warnings: string[];
}

export interface AllergyCheckInput {
  patientId: number;
  /** Optional: resolved trade name ID from DB. */
  tradeNameId?: number | null;
  /** Optional: resolved active substance ID from DB. */
  activeSubstanceId?: number | null;
}

// ─── Helpers: load patient allergy graph ─────────────────────────────────────

async function loadPatientAllergyReport(patientId: number) {
  return prisma.patientAllergyReport.findUnique({
    where: { patientId },
    include: {
      patientAllergies: {
        include: {
          allergen: {
            include: {
              allergenActiveSubstances: {
                include: { activeSubstance: { select: { id: true, name: true } } },
              },
              allergenExcipients: {
                include: { excipient: { select: { id: true, name: true } } },
              },
            },
          },
        },
      },
      activeSubstancePatientAllergies: {
        include: { activeSubstance: { select: { id: true, name: true } } },
      },
      excipientPatientAllergies: {
        include: { excipient: { select: { id: true, name: true } } },
      },
      classificationPatientAllergies: {
        include: { classification: { select: { id: true, name: true } } },
      },
      tradeName: {
        include: {
          tradeName: {
            include: {
              activeSubstance: { select: { id: true, name: true, classificationId: true } },
            },
          }
        }
      },
    },
  });
}

// ─── Helpers: load drug graph ─────────────────────────────────────────────────

async function loadDrugGraph(tradeNameId?: number | null, activeSubstanceId?: number | null) {
  let resolvedTradeNameId = tradeNameId ?? null;
  let resolvedActiveSubstanceId = activeSubstanceId ?? null;

  type TradeNameGraph = {
    id: number;
    title: string;
    activeSubstanceId: number;
    activeSubstance: {
      id: number;
      name: string;
      classificationId: number | null;
    };
    excipientTradeName: Array<{
      excipient: { id: number; name: string };
    }>;
  };

  let tradeName: TradeNameGraph | null = null;
  let activeSubstance: {
    id: number;
    name: string;
    classificationId: number | null;
  } | null = null;

  if (resolvedTradeNameId) {
    tradeName = await prisma.tradeName.findUnique({
      where: { id: resolvedTradeNameId },
      include: {
        activeSubstance: { select: { id: true, name: true, classificationId: true } },
        excipientTradeName: {
          include: { excipient: { select: { id: true, name: true } } },
        },
      },
    }) as TradeNameGraph | null;

    if (tradeName) {
      resolvedActiveSubstanceId = tradeName.activeSubstanceId;
      activeSubstance = tradeName.activeSubstance;
    }
  }

  if (!activeSubstance && resolvedActiveSubstanceId) {
    activeSubstance = await prisma.activeSubstance.findUnique({
      where: { id: resolvedActiveSubstanceId },
      select: { id: true, name: true, classificationId: true },
    });
  }

  return { tradeName, activeSubstance, resolvedTradeNameId, resolvedActiveSubstanceId };
}

// ─── Main Entry Point ─────────────────────────────────────────────────────────

/**
 * Checks whether adding a medicine would conflict with the patient's documented
 * allergies across all four dimensions (active substance, trade name,
 * classification, excipient) plus catalog allergen keyword fallback.
 *
 * @returns AllergyGateResult with `blocked` = true when any conflict is found.
 */
export async function checkAllergyConflicts(input: AllergyCheckInput): Promise<AllergyGateResult> {
  const { patientId, tradeNameId, activeSubstanceId } = input;

  if (!tradeNameId && !activeSubstanceId) {
    return { blocked: false, conflicts: [], warnings: [] };
  }

  const [report, { tradeName, activeSubstance, resolvedTradeNameId }] = await Promise.all([
    loadPatientAllergyReport(patientId),
    loadDrugGraph(tradeNameId, activeSubstanceId),
  ]);

  if (!report) {
    return { blocked: false, conflicts: [], warnings: [] };
  }

  const conflicts: AllergyConflict[] = [];

  // ── 1. Active substance FK match ────────────────────────────────────────────
  if (activeSubstance) {
    for (const aspa of report.activeSubstancePatientAllergies) {
      if (aspa.activeSubstanceId === activeSubstance.id) {
        conflicts.push({
          type: 'active_substance',
          matchedId: aspa.activeSubstanceId,
          matchedName: aspa.activeSubstance?.name ?? `AS#${aspa.activeSubstanceId}`,
          reaction: report.reaction,
          reason: `Patient has a documented allergy to active substance "${aspa.activeSubstance?.name}".`,
        });
      }
    }
  }

  // ── 2. Trade name FK match ───────────────────────────────────────────────────
  if (resolvedTradeNameId && report.tradeNameId) {



    // Direct trade name match
    report.tradeName.forEach(tn => {
      if (tn.id  === resolvedTradeNameId) {
        conflicts.push({
          type: 'trade_name',
          matchedId: tn.id,
          matchedName: tn.tradeName.title ?? `TN#${tn.id}`,
          reaction: report.reaction,
          reason: `Patient has a documented allergy to trade name "${tn.tradeName.title}".`,
        });
      }else if (
        activeSubstance &&
        tn.tradeName.activeSubstance?.id === activeSubstance.id
      ) {
        conflicts.push({
          type: 'trade_name',
          matchedId: tn.id,
          matchedName: tn.tradeName.title ?? `TN#${report.tradeNameId}`,
          reaction: report.reaction,
          reason: `Patient has a documented allergy to "${tn.tradeName.title}" which contains the same active substance.`,
        });
      }
    })
  }2
    // Same active substance via a different recorded trade name

  // ── 3. Classification match ──────────────────────────────────────────────────
  if (activeSubstance?.classificationId) {
    for (const cpa of report.classificationPatientAllergies) {
      if (cpa.classificationId === activeSubstance.classificationId) {
        conflicts.push({
          type: 'classification',
          matchedId: cpa.classificationId,
          matchedName: cpa.classification?.name ?? `Classification#${cpa.classificationId}`,
          reaction: report.reaction,
          reason: `Patient has a documented allergy to drug classification "${cpa.classification?.name}".`,
        });
      }
    }
  }

  // ── 4. Excipient match ───────────────────────────────────────────────────────
  if (tradeName?.excipientTradeName?.length && report.excipientPatientAllergies?.length) {
    const drugExcipientIds = new Set(tradeName.excipientTradeName.map((e) => e.excipient.id));
    for (const epa of report.excipientPatientAllergies) {
      if (drugExcipientIds.has(epa.excipientId)) {
        conflicts.push({
          type: 'excipient',
          matchedId: epa.excipientId,
          matchedName: epa.excipient?.name ?? `Excipient#${epa.excipientId}`,
          reaction: report.reaction,
          reason: `Patient has a documented allergy to excipient "${epa.excipient?.name}" found in this medicine.`,
        });
      }
    }
  }

  // ── 5. Catalog allergen keyword fallback ─────────────────────────────────────
  if (activeSubstance) {
    const substanceLower = activeSubstance.name.toLowerCase();
    const tradeNameLower = (tradeName?.title ?? '').toLowerCase();

    for (const pa of report.patientAllergies) {
      const allergenName = pa.allergen?.name ?? '';
      const allergenLower = allergenName.toLowerCase();
      if (!allergenLower) continue;

      // Check name overlap
      const nameMatch =
        substanceLower.includes(allergenLower) ||
        allergenLower.includes(substanceLower) ||
        (tradeNameLower && tradeNameLower.includes(allergenLower));

      // Check if this allergen is directly linked to the same active substance
      const directActiveSubstanceLink = pa.allergen?.allergenActiveSubstances?.some(
        (aas) => aas.activeSubstance?.id === activeSubstance.id
      );

      // Check if this allergen is linked to any excipient in this drug
      const excipientIds = new Set(tradeName?.excipientTradeName?.map((e) => e.excipient.id) ?? []);
      const directExcipientLink = pa.allergen?.allergenExcipients?.some(
        (ae) => excipientIds.has(ae.excipient?.id ?? -1)
      );

      if (nameMatch || directActiveSubstanceLink || directExcipientLink) {
        conflicts.push({
          type: 'catalog_allergen',
          matchedId: pa.allergen?.id ?? null,
          matchedName: allergenName,
          reaction: report.reaction,
          reason: `Patient has a documented allergy to catalog allergen "${allergenName}" which matches this medicine.`,
        });
      }
    }
  }

  const blocked = conflicts.length > 0;

  const warnings = conflicts.map(
    (c) => `⚠️ ALLERGY CONFLICT [${c.type.toUpperCase()}]: ${c.reason}${c.reaction ? ` Documented reaction: ${c.reaction}.` : ''}`
  );

  return { blocked, conflicts, warnings };
}
