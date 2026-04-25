import test from 'node:test';
import assert from 'node:assert/strict';
import { isAdrQuestionFieldType } from '../constants/adrQuestionFieldType';

test('isAdrQuestionFieldType validates known enums', () => {
  assert.equal(isAdrQuestionFieldType('DATE'), true);
  assert.equal(isAdrQuestionFieldType('TEXTAREA'), true);
  assert.equal(isAdrQuestionFieldType('BAD'), false);
});
