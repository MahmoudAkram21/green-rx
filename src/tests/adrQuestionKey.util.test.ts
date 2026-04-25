import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidAdrQuestionKey } from '../utils/adrQuestionKey.util';

test('isValidAdrQuestionKey accepts camelCase keys', () => {
  assert.equal(isValidAdrQuestionKey('adrStartDate'), true);
  assert.equal(isValidAdrQuestionKey('a1'), true);
});

test('isValidAdrQuestionKey rejects invalid keys', () => {
  assert.equal(isValidAdrQuestionKey(''), false);
  assert.equal(isValidAdrQuestionKey('1bad'), false);
  assert.equal(isValidAdrQuestionKey('bad-key'), false);
  assert.equal(isValidAdrQuestionKey('_bad'), false);
});
