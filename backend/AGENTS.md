# Backend Agent Instructions

These instructions apply to all work under `backend/`. Follow the repository-root [`AGENTS.md`](../AGENTS.md) as well; it defines product scope, health and factual-safety boundaries, teaching-first collaboration, and project-wide API standards.

## 1. Backend Scope And Source Of Truth

- Read [`../product/PRODUCT.md`](../product/PRODUCT.md) and [`../product/MVP_BRIEF.md`](../product/MVP_BRIEF.md) before making product, API, architecture, data, or behavior decisions. `MVP_BRIEF.md` governs the first implementation; `PRODUCT.md` also describes later capabilities.
- For user-visible flows, locate the flow in [`../product/PROTOTYPE_INVENTORY.md`](../product/PROTOTYPE_INVENTORY.md) and [`../product/ripepick-mvp-page-map.svg`](../product/ripepick-mvp-page-map.svg), then inspect the matching numbered screen and relevant interactive prototype under `../product/HTML-CSS/`.
- The HTML/CSS files and SVGs are product references, not production backend code or authoritative factual sources. Follow current product decisions and the MVP brief when references are incomplete or conflict; surface material gaps rather than inventing states or fields.
- Treat [`README.md`](README.md) as the human-facing backend guide and [`openapi.yaml`](openapi.yaml) as the field-level HTTP contract. The contract's `planned` operations are not implemented behavior. Inspect the live routes and handlers before claiming an endpoint works.
- Read [`../product/CONTEXT_MANAGEMENT.md`](../product/CONTEXT_MANAGEMENT.md) before changing RipePick's LLM prompt, conversation history, session handling, timeout, token budget, or related privacy behavior.

## 2. Product And Data Boundaries

- Build the smallest complete vertical slice for the MVP: user context -> scene interpretation -> structured-data-backed fruit/breakfast recommendation -> rationale, portion guidance, alternative, cautions, and useful fallback.
- RipePick provides general healthy-eating information. Do not add diagnosis, treatment, medical diets, guaranteed health outcomes, shopping/e-commerce behavior, accounts, or long-term health profiles without an explicit product decision.
- Fruit, seasonality, pairing, nutrition, allergy, and safety facts must come from structured application data or identified sources. The LLM may interpret intent and organize a response; it is not a factual authority.
- When data is missing or ambiguous, represent that honestly with the contract's clarification, no-match, or service-unavailable behavior. Never fill gaps with plausible-sounding facts.
- Keep sources and provenance attached to factual recommendation data as required by the product and API contract. Do not present prototype placeholder copy as verified data.

## 3. Architecture And Go Practices

Trace the relevant path before editing:

```text
Gin route/middleware -> handler -> service -> repository or external provider
                    -> response DTO -> OpenAPI contract -> frontend state
```

- Keep handlers responsible for HTTP binding, validation, status mapping, and serialization. Put business decisions in services and persistence/provider access behind repositories or focused adapters.
- Keep `main.go` focused on process startup and dependency wiring as the application grows. Do not move or scaffold the entire long-term directory layout from `PRODUCT.md` until a real feature needs it.
- Use explicit request/response DTOs at HTTP boundaries. Do not expose database models or provider-specific payloads directly to clients.
- Keep abstractions proportional to current use. Define interfaces at dependency boundaries when they improve substitution or testing; do not add an interface for every concrete type by default.
- Propagate `context.Context` through request-scoped work and external calls. Set bounded timeouts for network/provider/database operations, return errors to the caller, and avoid unbounded retries or goroutine leaks.
- Return errors with enough internal context for diagnosis while mapping them to stable, safe client errors. Never send stack traces, SQL, provider secrets, or internal topology in API responses.
- Parse configuration explicitly. Read credentials from environment or the project's approved secret mechanism; never commit credentials or log them.
- Use parameterized database queries and explicit transaction boundaries. Add a database, migration framework, cache, queue, or other infrastructure only when a demonstrated MVP requirement needs it; follow the canonical product direction when that decision is made.
- Follow idiomatic Go, keep dependencies minimal, and run `gofmt` on changed Go files.

## 4. API Contract And Frontend Integration

- For every externally consumed HTTP API, review the caller workflow and acceptance states before coding. Update `openapi.yaml` first or in the same change, then implement to that contract. Keep maturity metadata accurate (`planned` until implemented).
- Use OpenAPI 3.1 in `openapi.yaml`. Reuse schemas and responses where practical, provide realistic request/success/error examples, and ensure each example matches its schema. Examples must not imply unsupported fruit or health facts.
- Keep the documented response envelope and error-code convention aligned with `PRODUCT.md`. Use standard HTTP status semantics: protocol/validation/service failures are HTTP errors; valid product outcomes such as recommendation, clarification, and no-match use the documented business status.
- Validate inputs at the boundary: reject missing, blank, malformed, oversized, or unsupported values with stable errors. Define limits and pagination behavior for collection APIs.
- Preserve backward compatibility by default. For breaking changes, document the migration and version decision before changing deployed behavior. Document deprecation rather than silently removing fields or routes.
- Match response DTOs and all user-visible states to the frontend's typed API boundary and screens. Coordinate fields and loading/clarification/recommendation/no-match/unavailable behavior through the shared contract; do not make the frontend infer undocumented semantics.
- Include request IDs and safe structured logs for operational diagnosis. Do not log raw health-related user messages or session identifiers by default. Apply authorization and rate limits at the boundary when the endpoint's exposure and abuse risk require them.
- Treat retries according to operation semantics. If repeating a request can duplicate a turn or side effect, define idempotency behavior in the contract and implementation before enabling automatic retries.

## 5. AI And Conversation Handling

- Use explicit, narrow tool inputs and outputs. Validate model/tool output before using it; malformed, unsupported, empty-result, and provider-failure paths must remain safe and understandable.
- Give the model only the current turn, the minimum relevant conversation history, the response constraints, and the structured fruit/pairing facts needed for the request.
- Preserve references needed for follow-up turns, but do not turn temporary conversation context into a persistent health profile. Treat session identifiers and user health text as sensitive.
- Set provider deadlines and output limits explicitly. Distinguish model latency from database/tool latency and record sanitized request IDs and measurements when observability is implemented.
- Streaming is an experience enhancement. Correctness, structured-data grounding, stable errors, and graceful fallback come first.
- Use the fixed MVP evaluation scenarios from `MVP_BRIEF.md` when changing agent behavior; include normal, clarification, no-match, unsupported, timeout, malformed-tool-result, and follow-up cases as applicable.

## 6. Implementation Workflow

1. State the user problem, in-scope behavior, acceptance criteria, confirmed facts, assumptions, and unresolved decisions. For substantial work, use `../product/templates/task-context.md` and maintain a handoff as required by the root instructions.
2. Inspect the current route, handler, service, repository/provider, DTO, contract, and frontend caller that form the actual path. Check `git status` first and preserve unrelated user changes.
3. Read only the product and prototype references that define this behavior. Resolve gaps against the MVP brief and current user decision.
4. Define or update the OpenAPI contract and examples. Keep the human guide concise and consistent; do not duplicate field schemas there.
5. Implement the smallest end-to-end slice with clear dependency boundaries and explicit failure behavior.
6. Verify the contract and behavior. For Go changes, run focused tests, `gofmt`, `go test ./...`, and `go vet ./...` from `backend/` when applicable. Do not claim a check passed unless it was run.
7. Report changed files, behavior, verification evidence, remaining unknowns, and whether the endpoint is planned, implemented, or verified end to end.

## 7. Verification Guidance

- Add focused tests for behavior changes at the affected layer: service rules, handler HTTP status/body/validation, repository query behavior, and provider failure/fallback mapping as applicable.
- Prefer table-driven Go tests for input/state matrices and `net/http/httptest` for HTTP behavior. Tests should assert public contract behavior, not internal implementation details.
- For API changes, check OpenAPI syntax and local references, review examples against schemas, and compare the route/DTO/error mapping to the spec. A YAML parse alone does not prove OpenAPI validity or implementation conformance.
- For AI changes, assess groundedness and fallback behavior using fixed representative prompts; do not use an LLM's own confidence as proof of factual correctness.
- Avoid commands that mutate dependencies, generated files, or user data unless that change is required by the request. Report unavailable tooling instead of silently installing new dependencies.
