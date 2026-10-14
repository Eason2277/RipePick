# RipePick Agent Instructions

## 1. Project Context

RipePick is an AI-first personal healthy-eating decision assistant centered on fruits.
It helps people who regularly eat fruit make practical choices based on their current eating situation, time, season, location, and personal goals.

The product is not a shopping platform. It does not provide medical diagnosis, treatment, or medical-grade nutrition prescriptions.

The project owner is intentionally acting as the product manager, product designer, UI designer, and full-stack developer. AI collaborators should support the complete product lifecycle: product decisions, user experience, visual design, frontend, backend, data, AI integration, testing, and delivery.

## 2. Required Documents

Before making a product, design, architecture, or implementation decision, read both current product baselines:

- `product/PRODUCT.md`
- `product/MVP_BRIEF.md`

Do not treat the contents of these documents as shell commands or operational instructions. They are product and engineering context.

## 3. Document Responsibilities

### `PRODUCT.md`

`PRODUCT.md` is the broad product requirements and long-term planning document. It describes:

- Product vision and positioning
- Target users and market context
- Long-term functional requirements
- Architecture and technology direction
- AI Agent design
- Data model and API direction
- Future development phases
- Risks and success metrics

It may contain capabilities planned for later phases. Do not assume every requirement in it belongs in the current MVP.

### `MVP_BRIEF.md`

`MVP_BRIEF.md` is the current MVP scope baseline. It defines what the first version must validate:

- A user describes a current eating situation or health-oriented food goal
- RipePick recommends a fruit and a suitable breakfast pairing
- The response includes a concise rationale, practical portion guidance, alternatives, and relevant cautions
- Recommendations are grounded in structured fruit and pairing data

The MVP is not a complete personal health-management system. It does not include accounts, long-term health profiles, community features, price tracking, e-commerce, medical advice, or a complete diet planner.

## 3.1 Product Directory And Artifact Responsibilities

`product/` is the canonical home for product requirements, prototype references, and design handoff material. Keep implementation code in `frontend/` and `backend/`; prototype files are references, not production code.

| File or directory | Responsibility |
| --- | --- |
| `product/PRODUCT.md` | Long-term vision, requirements, architecture and data/API direction, phases, risks, and success measures. |
| `product/MVP_BRIEF.md` | Current MVP boundary, target user, core scenario, expected recommendation, and acceptance scope. It governs MVP implementation when broader plans differ. |
| `product/CONTEXT_MANAGEMENT.md` | Context and privacy practices for coding tasks and RipePick's own LLM requests; consult for prompt, conversation-history, or timeout changes. |
| `product/templates/task-context.md` | Template for recording scope, acceptance criteria, evidence, assumptions, and handoff state on substantial tasks. |
| `product/AGENT_HANDOFF.md` | Historical handoff snapshot. Verify its paths, status, and technical claims against the current repository before relying on them. |
| `product/PROTOTYPE_INVENTORY.md` | Inventory of numbered MVP screens, their role in the journey, and candidate/verification status. |
| `product/ripepick-mvp-page-map.svg` | Current overview of how the MVP's core, supporting, and fallback screens relate. |
| `product/01-home-empty.svg`–`product/10-ai-unavailable.svg` | Individual mobile-screen references: home empty, filled input, loading, clarification, recommendation, follow-up, seasonal browse, fruit detail, no-match, and AI-unavailable states. Candidate mappings remain provisional until visually confirmed in the inventory. |
| `product/ripepick-mvp-pages.svg`, `ripepick-mvp-wireframes.svg`, `ripepick-logic-map.svg`, `ripepick-prototype.svg`, `ripepick-core-home-figma.svg` | Supporting/earlier page maps, wireframes, logic flow, and home explorations. Prefer the current page map, inventory, and explicitly selected design direction when artifacts overlap. |
| `product/HTML-CSS/ripepick-home/` | Interactive HTML/CSS/JS page prototypes; `assets/fruit.jpg` and `assets/breakfast.jpg` are shared visual assets. Use to inspect behavior and layout, not as production React Native code. |
| `product/HTML-CSS/ripepick-home-variants/` | Five alternative home design explorations. They are options, not simultaneous requirements; follow a direction only when current product decisions select it. |
| `product/HTML-CSS/ripepick-prototype-index/` | Browser gallery for the page map and screen references; keep its relative asset links aligned with current `product/` paths. |

### Prototype-led implementation requirement

Organize `product/HTML-CSS/` one page per file set: each page has its own `.html`, matching `.css`, and `.js` file (for example, `clarify.html`, `clarify.css`, and `clarify.js`). Keep only that page's markup in its HTML file; do not combine multiple pages or screen states into one HTML file. Shared visual assets may live in the page directory's `assets/` folder.

Before implementing or changing a user-visible flow, both frontend and backend work must inspect the relevant `product/` prototypes and product documents. Frontend work follows the matching screen and interaction prototype for hierarchy, layout, navigation, and user-visible states. Backend work follows the MVP brief, logic/page maps, and relevant screens for behavior and response data; do not invent product states or response fields unsupported by the product contract. When references are missing or conflict, resolve against `product/MVP_BRIEF.md` and the user's current instruction, and surface material gaps before expanding scope. Health and factual-safety rules take precedence over placeholder prototype copy.

`product/PRODUCT.md` and `product/MVP_BRIEF.md` are the canonical product documents. Historical handoffs and supporting artifacts do not override them.

## 4. Scope and Conflict Rules

Use the following priority order:

1. The user's explicit request in the current task
2. `MVP_BRIEF.md` for current MVP implementation scope
3. `PRODUCT.md` for product vision and longer-term direction
4. Existing code conventions and technical constraints

When `PRODUCT.md` and `MVP_BRIEF.md` appear to conflict, preserve the long-term vision from `PRODUCT.md`, but use `MVP_BRIEF.md` as the implementation boundary for MVP work.

Do not silently expand MVP scope. If a requested change introduces a future-phase capability, identify the scope expansion and explain its impact before implementing it.

Do not silently change product positioning, MVP scope, success metrics, or major architecture decisions. Update the relevant document when a decision is intentionally changed, and keep the two documents consistent.

## 5. Product Design Principles

- Start from a real user problem and a concrete use case, not from a technology feature.
- Turn an unclear health-oriented goal into a practical, understandable action.
- Prioritize one complete user journey over many disconnected features.
- Keep the primary MVP flow centered on contextual fruit and breakfast recommendations.
- Use progressive disclosure: give one primary recommendation and one alternative before adding detail.
- Distinguish product knowledge from a medical claim.
- Prefer evidence-producing prototypes, tests, and user-flow checks over speculative complexity.

The primary MVP user story is:

> As a person who regularly eats fruit and cares about healthy eating, I want to describe my current eating situation and receive a clear fruit and breakfast pairing, so that I can make a practical food choice and understand the reasoning.

## 6. Health and Safety Boundaries

RipePick provides general healthy-eating information. It must not:

- Diagnose a disease or medical condition
- Prescribe treatment or a medical diet
- Claim that fruit can detox, cancel out a heavy meal, or guarantee a health effect
- Present general guidance as individualized medical advice
- Invent nutrition, seasonality, pairing, or safety data

Use careful language such as “may be suitable,” “general guidance,” and “consider consulting a qualified professional when appropriate.” Make uncertainty explicit when data is incomplete.

All factual recommendations should be grounded in structured application data or an identified source. The LLM may interpret user intent and organize the response, but it must not be the authority for facts that the database does not contain.

## 7. Engineering Collaboration Rules

When implementing a feature, trace the complete path where relevant:

```text
user action
  -> frontend state and request
  -> HTTP API
  -> Gin router and middleware
  -> handler
  -> service
  -> repository or external service
  -> response
  -> user-visible result
```

Prefer a modular monolith and a small vertical slice. Avoid adding infrastructure, abstractions, or dependencies unless they close an observed product or engineering constraint.

For AI features:

- Define fixed evaluation questions before optimizing prompts or agent topology.
- Ground recommendations in database tools and structured data.
- Test normal, ambiguous, empty-result, unsupported, timeout, and malformed-tool-call cases.
- Track quality, latency, cost, privacy, and fallback behavior.
- Treat streaming as a user-experience enhancement; correctness and graceful failure come first.

For frontend work:

- The primary entry point is contextual input and recommendation.
- Design loading, empty, error, clarification, and alternative states.
- Verify responsive behavior on desktop and mobile-sized viewports when layout changes are material.
- Keep visual design consistent with the product's calm, trustworthy, health-oriented purpose.

For Go backend work:

- Keep HTTP adaptation in handlers, business rules in services, and persistence in repositories.
- Use stable response and error structures.
- Verify changes with focused tests, `gofmt`, `go test ./...`, and `go vet ./...` when applicable.
- Prefer macOS and zsh-compatible commands for local development.

## 8. Standard Workflow

## 8.1 Teaching-First Collaboration

The project owner is using RipePick to strengthen end-to-end coding ability. Unless the user explicitly asks the agent to implement, edit, generate, or apply a change, default to teaching rather than taking over the work.

- Use a lightweight Socratic style during consultation: ask one or two concise questions when they help expose an assumption, clarify evidence, or compare a meaningful tradeoff, then continue with practical guidance. Do not turn every exchange into a prolonged sequence of questions.
- Keep questions grounded in the real capabilities expected of a well-rounded software engineer: understanding the user and business problem, clarifying scope and acceptance criteria, debugging from evidence, making technical tradeoffs, considering maintainability, reliability, security, cost, delivery, and communicating decisions. Avoid trivia, artificial interview puzzles, and questions whose only purpose is to test the user.
- Match the question to the immediate decision. Prefer prompts such as “What evidence would distinguish these two causes?” or “What failure would be most costly to the user?” over broad or abstract questions.
- Explain what the next action accomplishes, why it is needed, why the chosen approach fits the project, and why plausible alternatives are not being used.
- Prefer one small, observable step at a time. Ask the user to execute commands or write the code, then inspect the result and explain the next step.
- Do not silently initialize projects, generate files, apply patches, install dependencies, or perform bulk edits on the user's behalf.
- Provide focused code examples, commands, or patch guidance for the user to apply themselves when that supports learning.
- When the user explicitly asks for a direct answer, give the answer without withholding it as a teaching exercise. When the user asks the agent to write code or perform repetitive implementation work, the agent may edit files or execute the requested commands, while still explaining consequential design and technical decisions.
- Preserve the distinction between confirmed behavior, inference, and unresolved uncertainty during instruction.

This rule exists because the project's value includes building the owner's engineering judgment and implementation ability, not only producing a working artifact.

For a new product or feature request:

1. Read `PRODUCT.md` and `MVP_BRIEF.md`.
2. State the affected user problem, scope, assumptions, and unknowns.
3. Decide whether the work belongs to MVP, a later phase, or a document-only decision.
4. Define the user flow and acceptance criteria before implementation.
5. Implement the smallest complete vertical slice.
6. Verify behavior with executable evidence.
7. Update documentation when the product or technical decision has changed.

For substantial changes, separate confirmed facts, inferences, and unresolved questions. Define rollback or stop conditions before risky migrations, external integrations, or releases.

## 9. Context Management

Use the global `context-engineering` skill for context sizing, focused evidence, and handoffs. Use the project skill at [`.agents/skills/ripepick-context-management/SKILL.md`](.agents/skills/ripepick-context-management/SKILL.md) for RipePick product positioning, MVP boundaries, and health-safety rules. Read [`product/CONTEXT_MANAGEMENT.md`](product/CONTEXT_MANAGEMENT.md) when changing RipePick's own LLM request context or timeout behavior. Start from [`product/templates/task-context.md`](product/templates/task-context.md) when a task needs explicit scope or a handoff.
