# Backend Recommendation API Handoff

Updated: 2026-10-19

## Goal
Teach the project owner to implement the MVP recommendation API in small, reviewable steps, while keeping the implementation aligned with the existing OpenAPI contract.

## Scope
### In
- Implement `POST /api/v1/recommendations` as a synchronous JSON endpoint.
- Learn the Gin request path: bind JSON, validate input, map errors into the response envelope, and call a service.
- Preserve clarification, recommendation, no-match, and unavailable-service semantics in the contract.

### Out
- Do not invent fruit, pairing, nutrition, seasonal, allergy, or safety facts.
- Do not add accounts, persistent health profiles, streaming, or other future-phase capabilities.
- Do not take over code edits unless the user explicitly switches from guided implementation to direct implementation.

## Acceptance Criteria
- The endpoint matches `backend/openapi.yaml` and `backend/README.md`.
- Success and error responses use `code`, `message`, `data`, and `request_id`.
- User-visible recommendations are grounded in structured data or identified sources; absent data yields an honest clarification/no-match/unavailable result.
- The user understands each small code change and can inspect it before moving on.

## Relevant Files or Evidence
- `backend/main.go` — Gin startup, ping route, and registered `POST /api/v1/recommendations` route.
- `backend/recommendation_request.go` — request DTO and message validation.
- `backend/api_response.go` — common response envelope.
- `backend/recommendation_handler.go` — request ID creation, JSON binding, validation, and current unavailable-service placeholder.
- `backend/recommendation_response.go` — recommendation response DTOs in progress.
- `backend/request_id.go` — UUID v4 request ID helper.
- `backend/openapi.yaml` — field-level contract; recommendation operation is marked `planned`.
- `backend/README.md` — endpoint workflow, business states, and maintenance rules.
- `product/MVP_BRIEF.md` and `product/PRODUCT.md` — product scope and health/factual-safety constraints.

## Confirmed Facts
- The contract defines `POST /api/v1/recommendations`; first request omits `session_id`, and later turns carry the server-issued temporary session ID.
- HTTP 200 business statuses are `recommended`, `clarification_required`, and `no_match`; service unavailability is HTTP 503, and unknown/expired session is HTTP 404.
- The request `message` must be nonblank and at most 2000 characters.
- `main.go` registers `POST /api/v1/recommendations` before starting Gin.
- Current `recommendation_request.go` validates blank and over-2000-character messages. Session UUID validation, strict unknown-field rejection, JSON body limits, and handler error mapping remain unimplemented.
- `api_response.go` currently has the correct JSON tags, including `data`.
- The handler currently returns HTTP 503 for valid requests because the recommendation service/data path is not implemented yet.
- `recommendation_response.go` currently defines the recommended-result shape; clarification and no-match DTOs remain to be added.
- `request_id.go` contains a `crypto/rand`-based UUID v4 helper. `go build ./...` passed for the current backend tree; behavior has not been covered by tests.

## Assumptions and Unknowns
- Structured fruit/pairing data and a recommendation provider are not yet visible in the backend. Inspect the live repository before deciding the first valid business response.
- Session storage and retention/expiration policy are not yet implemented or decided; do not add persistent user profiles.

## Constraints
- Follow root `AGENTS.md` and `backend/AGENTS.md`.
- Keep comments concise and add them at useful points because the user is learning backend development.
- Preserve unrelated frontend, product, and root instruction changes when committing backend work.
- A local `backend/ripepick` executable is a build artifact and should not be committed.
- No tests have been run for the current backend code; `go build ./...` passed after formatting.

## Current Status
- Completed: request DTO; basic message validation; common response-envelope type; UUID v4 request ID helper drafted by the user.
- Verified: Go formatting was applied and `go build ./...` passed. Request ID behavior is not yet covered by tests.
- Implemented as a first draft: recommendation route registration and a handler that binds/validates input and returns an unavailable-service placeholder.
- Not yet implemented: successful recommendation response, structured data/service path, session behavior, and several contract details such as strict unknown-field rejection and request-ID error-envelope consistency.

## Next Action
Continue the teaching flow by finishing and reviewing the response DTOs in `backend/recommendation_response.go` (the user is currently adding the clarification and no-match outcomes). Then connect typed results to a service boundary and structured data. Keep the OpenAPI maturity as `planned` until successful behavior is implemented and verified end to end.
