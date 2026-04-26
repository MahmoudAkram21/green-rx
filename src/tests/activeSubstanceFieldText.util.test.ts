/** @format */

import test from "node:test";
import assert from "node:assert/strict";
import { hasContent, extractText } from "../utils/activeSubstanceFieldText.util";

test("hasContent rejects empty and placeholder strings", () => {
  assert.equal(hasContent(null), false);
  assert.equal(hasContent(undefined), false);
  assert.equal(hasContent(""), false);
  assert.equal(hasContent("   "), false);
  assert.equal(hasContent("N/A"), false);
  assert.equal(hasContent("-"), false);
});

test("hasContent accepts meaningful string", () => {
  assert.equal(hasContent("Avoid alcohol"), true);
});

test("hasContent accepts translation object with en", () => {
  assert.equal(hasContent({ en: "Caution", ar: "تحذير" }), true);
});

test("extractText prefers en on object", () => {
  assert.equal(extractText({ en: "Hello", ar: "مرحبا" }), "Hello");
});
