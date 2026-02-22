# Project Plan

This document is a rolling implementation plan for backend improvements across the project.
It is intentionally generic so we can append additional tracks over time.

## Track 1: Mobile Identity and Authorization Hardening

### Goal
Ensure doctor/patient mobile APIs rely on authenticated identity (`req.user`) instead of trusting client-sent IDs for self-scope operations.

### Scope
- Route protection
- Controller identity derivation
- Ownership checks
- Mobile API contract cleanup
- Test coverage

### Work Items
1. Standardize authenticated identity usage
- Use `req.user.userId` and `req.user.role` consistently.
- Add helpers to resolve current doctor/patient profile IDs from `userId`.

2. Protect all sensitive mobile endpoints
- Add `authenticate` where missing.
- Add role checks (`authorize`) where required.

3. Introduce self-scope endpoints
- Add `GET /patients/me` and `GET /doctors/me`.
- Keep admin cross-user endpoints separate.

4. Enforce ownership on param-based routes
- Add middleware for `:patientId` and `:doctorId` ownership validation.
- Allow privileged bypass for `Admin`/`SuperAdmin`.
- Require doctor-patient relationship checks where applicable.

5. Refactor controllers away from client-provided self IDs
- Replace body/path IDs with IDs resolved from JWT for self actions.
- Keep explicit admin workflows for cross-account operations.

6. Fix auth payload mismatches
- Replace all `req.user.id` references with `req.user.userId`.
- Remove assumptions like `req.user.patientId` unless explicitly populated.

7. Harden risky endpoints
- Restrict import and admin-like operations.
- Restrict or redesign user CRUD exposure.

8. Update API collections and docs
- Remove required self `doctorId/patientId` usage for mobile flows.
- Document `/me` first bootstrap pattern.

9. Add integration tests
- Auth required checks
- Self-only enforcement
- Forbidden cross-user access
- Admin allowed override

10. Rollout strategy
- Temporary backward-compatible behavior if needed.
- Deprecate ID-based self routes over one release cycle.

### Definition of Done
- Mobile self-scope endpoints no longer require client-sent self IDs.
- Sensitive endpoints are authenticated and role/ownership enforced.
- Tests cover auth and ownership regressions.

## Future Tracks
Add additional project questions/tasks here as new tracks.

## Track 2: Clinical Warning Intelligence and Notification Pipeline

### Goal
Provide consistent, explainable drug safety warnings and user-facing notifications across Low/Medium/High/Critical severities based on patient profile data (medical history + family history + active conditions + current medications).

### Scope
- Warning rules and severity model
- Family-history and medical-history risk evaluation
- Prescription-time decisioning (inform vs block)
- Notification delivery by severity
- Auditability and explainability of warnings

### Work Items
1. Unify warning engines into one source of truth
- Consolidate overlap between `warningService` and `drugInteraction.service`.
- Define one canonical warning result contract used by all endpoints.

2. Formalize severity behavior policy
- `Critical`: block prescription by default and require explicit override workflow (if enabled).
- `High`: require prescriber acknowledgement and notify patient immediately.
- `Medium`: notify patient and prescriber with monitoring guidance.
- `Low`: informational warning shown in timeline/history without blocking.

3. Strengthen medical-history and active-disease checks
- Use `PatientDisease` active records and `MedicalHistory` (Active/Chronic) consistently.
- Expand `DiseaseWarningRule` usage for rule types and `requiredMonitoring`.
- Add deterministic matching for disease-to-drug-class and active-substance constraints.

4. Improve family-history risk logic
- Replace simple keyword heuristic with rule-driven mappings.
- Add configurable family risk templates (e.g., severe allergy lineage, hereditary cardiac risk).
- Assign default severities and escalation paths per family-risk category.

5. Build notification pipeline for all severities
- Create notification events from canonical warning output.
- Persist notifications with severity metadata and reason codes.
- Ensure patient receives status explanation: why this drug is risky for them.
- Add doctor-facing structured summary with actionable recommendations.

6. Add explainability payload
- Return `reasonCodes`, `sourceData` (which history/rule triggered), and `recommendedAction`.
- Include rule references (e.g., rule id/type) in response for traceability.

7. Expand persistence and observability
- Store warning snapshots on prescription creation/update.
- Add audit logs for acknowledge/override/block actions.
- Add admin analytics for severity counts and common triggers.

8. API and UX contract update
- Define standard warning response schema for mobile/web.
- Ensure message text is clean and user-readable.
- Add localization-ready message keys where possible.

9. Testing strategy
- Unit tests for rule matching and severity outcomes.
- Integration tests for prescription blocking and notification generation.
- Regression tests for family-history and medical-history edge cases.

10. Rollout and migration
- Backfill or migrate existing warning records if schema changes.
- Release behind a feature flag if needed.
- Monitor false positives/negatives and tune rule thresholds.

### Definition of Done
- Warning outcomes are consistent across all endpoints.
- Patients receive severity-appropriate drug status notifications.
- Family-history and medical-history effects are explicitly explainable in API responses.
- Blocking/acknowledgement behavior is enforced and tested.

### Current Scan Baseline (As-Is)
- `generateWarnings(patientId, tradeNameId)` is the primary path used during prescription creation and batch creation.
- Blocking currently happens when returned warnings set `blocked = true` (critical path), and prescription is rejected.
- Warning input starts from `tradeNameId`, then resolves to `activeSubstance` for most risk checks.
- Medical risk checks currently use:
  - `PatientDisease` with `status = Active`.
  - `MedicalHistory` entries filtered to `status in (Active, Chronic)`.
  - `DiseaseWarningRule` matching by `ruleType`, optional `targetActiveSubstanceId`, and `autoBlock`.
- Family-history logic is currently heuristic and narrow:
  - Only checks family disease names containing `allergy` or `anaphylaxis` with severe family severity.
  - Produces `FamilyHistoryRisk` with Low severity (informational), not block.
- Drug interaction severities already exist in code mapping (High/Medium/Low), but patient-facing severity-specific notification behavior is not fully implemented yet.
- Current notification generation is not consistently tied to warning severity outcomes across all prescribing flows.

### Immediate Gaps To Close (From Scan)
1. Replace family-history keyword heuristic with structured, configurable rule mapping.
2. Standardize one warning engine output and route all warning endpoints through it.
3. Implement deterministic notification policy by severity:
- Low: info notification
- Medium: caution notification + monitoring advice
- High: urgent warning + acknowledgement required
- Critical: block + urgent alert + override workflow if enabled
4. Add explicit explainability fields to each warning:
- source (`patientDisease`, `medicalHistory`, `familyHistory`, `interaction`)
- matched rule id/type
- matched drug key (`tradeNameId`, `activeSubstanceId`)
- actionable recommendation

## Track 3: API Documentation and Swagger Governance

### Goal
Establish and maintain reliable API documentation through OpenAPI/Swagger for backend consumers (mobile, web, admin).

### Scope
- OpenAPI generation and hosting
- Security scheme documentation (Bearer JWT)
- Endpoint contract coverage for core modules
- Documentation quality gate in delivery workflow

### Work Items
1. Integrate Swagger runtime
- Serve OpenAPI JSON at `/api/openapi.json`.
- Serve Swagger UI at `/api/docs`.

2. Define baseline spec structure
- Add API info, server configuration, tags, security schemes, and shared schemas.
- Include warning-related schemas and response examples.

3. Cover critical endpoints first
- Auth
- Prescriptions and warning flow
- Drug interaction checks
- Patient/doctor self-scope endpoints (`/me`) once implemented

4. Add endpoint-level annotations incrementally
- Document request/response DTOs and error contracts.
- Include role/auth requirements per endpoint.

5. Keep spec aligned with code changes
- Update docs in same PR when endpoint behavior changes.
- Add simple CI validation for OpenAPI build correctness.

### Definition of Done
- `/api/docs` and `/api/openapi.json` are available and current.
- Core mobile-critical endpoints are documented.
- Auth and warning behaviors are explicitly documented in the spec.

### Track 3 Progress Update (Implemented)
- Swagger UI endpoint is live at `/api/docs`.
- OpenAPI JSON endpoint is live at `/api/openapi.json`.
- Baseline warning documentation added for:
  - `POST /prescriptions`
  - `POST /prescriptions/batch`
  - `POST /drug-interactions/check`
- Added shared schemas for warning severity, warning objects, warning results, and notification policy.
- Added severity-focused OpenAPI examples (Low/Medium/High/Critical) for warning-related endpoints.
- Extended patient-facing Swagger examples for prescription timelines and notifications with severity states.
- Swagger now groups and documents doctor/patient mobile endpoints under dedicated tags and includes all current route endpoints used by mobile flows.
