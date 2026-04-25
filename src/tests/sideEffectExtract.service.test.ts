import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeBodySystem } from '../services/sideEffectExtract.service';

test('normalizeBodySystem collapses configured aliases', () => {
  assert.equal(normalizeBodySystem('Nervous'), 'NervousSystem');
  assert.equal(normalizeBodySystem('NervousSystem'), 'NervousSystem');
  assert.equal(normalizeBodySystem('Infection'), 'Infections');
  assert.equal(normalizeBodySystem('Immunity'), 'Immune');
});

test('normalizeBodySystem keeps unknown non-empty values', () => {
  assert.equal(normalizeBodySystem('Hematology'), 'Hematology');
});

test('normalizeBodySystem falls back to Other for empty values', () => {
  assert.equal(normalizeBodySystem('   '), 'Other');
});
