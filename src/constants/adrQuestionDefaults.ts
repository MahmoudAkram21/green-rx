/** Default ADR questionnaire rows (DB seed + service fallback when table is empty). */

import type { AdrQuestionFieldTypeCode } from './adrQuestionFieldType';

export type AdrQuestionDefaultItem = {
  key: string;
  labelEn: string;
  labelAr: string;
  required: boolean;
  /** Mobile UI hint — must match Prisma `AdrQuestionFieldType`. */
  fieldType: AdrQuestionFieldTypeCode;
};

export const DEFAULT_ADR_QUESTION_TEMPLATE: AdrQuestionDefaultItem[] = [
  { key: 'adrStartDate', labelEn: 'Date of ADR started', labelAr: 'تاريخ بدء الأثار الجانبية للدواء', required: true, fieldType: 'DATE' },
  { key: 'adrStopDate', labelEn: 'Date of ADR stopped / not stopped yet', labelAr: 'تاريخ توقف الأثار الجانبية للدواء / لم يتوقف بعد', required: true, fieldType: 'DATE' },
  { key: 'hospitalVisit', labelEn: 'Did you feel that you should go to hospital due to pain or uncomfortable feeling?', labelAr: 'هل شعرت بضرورة الذهاب إلى المستشفى بسبب ألم أو شعور بعدم الراحة؟', required: true, fieldType: 'BOOLEAN' },
  { key: 'initialDescription', labelEn: 'If you want to describe more', labelAr: 'اعطِ وصف أكثر لما تعرضت له بسبب الدواء', required: false, fieldType: 'TEXTAREA' },
  { key: 'initialFollowUpConsent', labelEn: 'Do you like to follow up with you more?', labelAr: 'هل ترغب في متابعتك أكثر؟', required: true, fieldType: 'BOOLEAN' },
  { key: 'currentStatus', labelEn: 'Based on your previous complain about the ADR (Please select your Current Status)', labelAr: 'بناءً على شكواك السابقة بشأن الآثار الجانبية للدواء (يرجى تحديد حالتك الحالية)', required: true, fieldType: 'SINGLE_CHOICE' },
  { key: 'stoppedMedicationDate', labelEn: 'Stopped the medication date', labelAr: 'توقفت عن تناول الدواء (التاريخ)', required: false, fieldType: 'DATE' },
  { key: 'hcpChangedMedicationDate', labelEn: 'HCP changed the medication date', labelAr: 'قام مقدم الرعاية الصحية بتغيير الدواء (التاريخ)', required: false, fieldType: 'DATE' },
  { key: 'followUpConsentAfterAgreement', labelEn: 'Do you like to follow up with you more (after agreed)?', labelAr: 'هل ترغب في متابعتك أكثر (بعد الموافقة)؟', required: false, fieldType: 'BOOLEAN' },
  { key: 'finalDescription', labelEn: 'If you want to describe more', labelAr: 'اعطِ ملاحظاتك أكثر', required: false, fieldType: 'TEXTAREA' },
];
