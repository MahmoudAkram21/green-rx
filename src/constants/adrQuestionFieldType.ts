/** Mirrors Prisma enum `AdrQuestionFieldType` — keep in sync with schema. */

export const ADR_QUESTION_FIELD_TYPES = [
  'TEXT',
  'TEXTAREA',
  'DATE',
  'BOOLEAN',
  'NUMBER',
  'SINGLE_CHOICE',
] as const;

export type AdrQuestionFieldTypeCode = (typeof ADR_QUESTION_FIELD_TYPES)[number];

export function isAdrQuestionFieldType(value: unknown): value is AdrQuestionFieldTypeCode {
  return typeof value === 'string' && (ADR_QUESTION_FIELD_TYPES as readonly string[]).includes(value);
}
