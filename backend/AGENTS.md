# Backend Agent Instructions

Follow the repository-root [`AGENTS.md`](../AGENTS.md) for product positioning, MVP scope, health and factual-safety rules, and the complete product-artifact map. Read [`../product/PRODUCT.md`](../product/PRODUCT.md) and [`../product/MVP_BRIEF.md`](../product/MVP_BRIEF.md) before making product, API, architecture, data, or behavior decisions.

## Product-prototype alignment

Backend work that implements or changes a user-visible capability must be grounded in the corresponding product references before implementation:

1. Use `../product/PROTOTYPE_INVENTORY.md` and `../product/ripepick-mvp-page-map.svg` to locate the relevant user flow and state.
2. Read the matching numbered screen prototype and inspect the HTML/CSS prototype when its interaction clarifies the expected behavior.
3. Derive API behavior and response data from the MVP brief and the information the relevant flow needs to display. Keep transport structures consistent with the user-visible states, including clarification, no-match, and AI-unavailable behavior when those are in scope.
4. Do not create backend states, fields, or claims merely because they are convenient to implement. If product references do not define behavior or conflict, resolve the question against the canonical MVP brief and current user decision before expanding the contract.

Prototype copy and illustrative data are not authoritative sources for nutrition, seasonality, pairing, allergy, or safety facts. Ground factual recommendations in structured application data or identified sources, and follow the root health-safety rules.

## Backend structure and verification

- Keep HTTP adaptation in handlers, business rules in services, and persistence in repositories.
- Use stable response and error structures, and preserve graceful behavior for unavailable AI or missing structured data.
- For applicable Go changes, run focused tests, `gofmt`, `go test ./...`, and `go vet ./...` from `backend/`, as directed by the root workflow.
