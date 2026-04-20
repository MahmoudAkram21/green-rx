/**
 * ActiveSubstance columns used for lifestyle-based drug warnings.
 * Single source of truth: Prisma enum `ActiveSubstanceLifestyleField` in schema.prisma.
 */
import { ActiveSubstanceLifestyleField } from '../../generated/client/client';

export { ActiveSubstanceLifestyleField };

export function getActiveSubstanceLifestyleFieldValues(): ActiveSubstanceLifestyleField[] {
  return Object.values(ActiveSubstanceLifestyleField) as ActiveSubstanceLifestyleField[];
}
