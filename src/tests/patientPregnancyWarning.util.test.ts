/** @format */

import test from "node:test";
import assert from "node:assert/strict";
import { shouldApplyPregnancyDrugWarnings } from "../utils/patientPregnancyWarning.util";

test("shouldApplyPregnancyDrugWarnings is false for non-female", () => {
  assert.equal(
    shouldApplyPregnancyDrugWarnings({
      gender: "Male",
      pregnancyStatus: true,
      pregnancyWarning: true,
    }),
    false,
  );
});

test("female + pregnant status true applies even without pregnancyWarning", () => {
  assert.equal(
    shouldApplyPregnancyDrugWarnings({
      gender: "Female",
      pregnancyStatus: true,
    }),
    true,
  );
});

test("female + pregnancyWarning true applies", () => {
  assert.equal(
    shouldApplyPregnancyDrugWarnings({
      gender: "Female",
      pregnancyWarning: true,
      pregnancyStatus: false,
    }),
    true,
  );
});

test("female + not pregnant and no warning flag does not apply", () => {
  assert.equal(
    shouldApplyPregnancyDrugWarnings({
      gender: "Female",
      pregnancyStatus: false,
      pregnancyWarning: false,
    }),
    false,
  );
});
