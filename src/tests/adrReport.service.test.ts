import test from 'node:test';
import assert from 'node:assert/strict';
import { buildAnonymizedAdrEmailText, getAdrQuestionTemplate } from '../services/adrReport.service';

test('getAdrQuestionTemplate returns required bilingual questions', async () => {
  const template = await getAdrQuestionTemplate('en');
  const keys = new Set(template.map((q) => q.key));

  assert.ok(keys.has('adrStartDate'));
  assert.ok(keys.has('hospitalVisit'));
  assert.ok(keys.has('currentStatus'));

  const requiredCount = template.filter((q) => q.required).length;
  assert.ok(requiredCount > 0);

  const start = template.find((q) => q.key === 'adrStartDate');
  assert.ok(start);
  assert.equal(start?.fieldType, 'DATE');
});

test('buildAnonymizedAdrEmailText contains only report context', () => {
  const text = buildAnonymizedAdrEmailText({
    referenceCode: 'ADR-20260421-AB12CD34',
    tradeNameTitle: 'Crestor 5mg',
    submittedAt: new Date('2026-04-21T10:00:00.000Z'),
    sideEffects: [
      {
        name: 'Headache',
        answers: [
          {
            questionKey: 'adrStartDate',
            answerValue: '2026-04-20',
            displayLabel: 'Date of ADR started',
          },
          {
            questionKey: 'hospitalVisit',
            answerValue: 'No',
            displayLabel: 'Hospital visit',
          },
        ],
      },
    ],
  });

  assert.match(text, /Reference: ADR-20260421-AB12CD34/);
  assert.match(text, /Trade Name: Crestor 5mg/);
  assert.match(text, /Headache/);
  assert.doesNotMatch(text, /patientId|email|phone|national/i);
});
