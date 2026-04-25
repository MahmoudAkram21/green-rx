/** Stable API keys for ADR answers; must stay aligned with admin create validation. */
const ADR_QUESTION_KEY_PATTERN = /^[a-zA-Z][a-zA-Z0-9]*$/;

export function isValidAdrQuestionKey(key: string): boolean {
  return ADR_QUESTION_KEY_PATTERN.test(key.trim());
}
