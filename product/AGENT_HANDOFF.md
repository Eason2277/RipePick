# RipePick Agent Handoff

> Updated: 2026-10-07
> Purpose: preserve the current product, design, and frontend decisions so the next conversation can continue without replaying the prior discussion.

> Historical snapshot: this handoff predates the current repository layout and frontend initialization. Its `docs/` paths and status statements may be stale; use `../AGENTS.md`, `PRODUCT.md`, `MVP_BRIEF.md`, and the current source tree as authoritative.

## Current Objective

Begin the real RipePick frontend implementation. The first implementation slice should turn the homepage design direction into a runnable React Native + TypeScript screen, while keeping iOS, iPadOS, and macOS compatibility in view.

## Product Baseline

RipePick is an AI-first personal healthy-eating decision assistant centered on fruit. It helps a user choose a fruit and suitable breakfast pairing based on the current eating situation, time, season, location, and personal goals.

The MVP core flow is:

```text
describe current eating scene
  -> understand the scene
  -> ask one clarification when necessary
  -> recommend one fruit + breakfast pairing
  -> show concise rationale, portion guidance, alternative, and cautions
  -> support a follow-up question
```

The primary scenario is: “昨晚吃得比较油腻，今天早上吃什么比较好？”

Product boundaries:

- This is not a shopping platform.
- Do not add accounts, long-term health profiles, community features, price tracking, e-commerce, a complete diet planner, or medical advice to the MVP.
- Do not diagnose, prescribe treatment, claim that fruit detoxes or cancels a meal, or present general guidance as individualized medical advice.
- Factual recommendations must come from structured fruit and pairing data. The LLM may interpret intent and organize the response, but must not invent facts.
- Design and implementation must cover loading, clarification, no-match, and AI-unavailable states.

Read `PRODUCT.md` and `MVP_BRIEF.md` before making new product, design, architecture, or implementation decisions.

## Confirmed Technical Direction

- The user is a frontend engineer and wants to start the frontend now.
- The user accepts React Native and TypeScript as the frontend direction.
- iOS and iPadOS are first-class targets.
- macOS should remain a technical compatibility target, including for a test build.
- `PRODUCT.md` currently specifies React Native + Expo + TypeScript + Expo Router. This is the existing product-document direction, not yet an initialized frontend project.
- React Native on iOS/iPadOS can share most business logic, state, API, and components. macOS requires the `react-native-macos` platform/project and may need platform-specific navigation, window behavior, permissions, native modules, and styling.
- Do not silently rewrite the product documents until the actual toolchain decision is made.

Open platform decision:

1. Expo-first for iOS/iPadOS, then validate macOS compatibility.
2. React Native CLI plus `react-native-macos` from the beginning for stronger macOS alignment.

Before scaffolding, inspect the local Node, package manager, Xcode, CocoaPods, and React Native environment. Resolve Expo versus React Native CLI based on the macOS build requirement and the installed toolchain. The goal is not to over-architect; it is to get one small native vertical slice running.

## Design Direction

Five homepage variants were created in `HTML-CSS/ripepick-home-variants/`:

1. Calm chat
2. Open canvas
3. Native iOS
4. Context cards
5. Quiet night

The recommended starting direction is **03 - Native iOS**:

- Calm, spacious, low-density layout.
- Simple top navigation and a bottom input/action area.
- One prominent contextual prompt instead of a dashboard full of controls.
- RipePick's green palette, with native iOS-like interaction hierarchy.
- Keep the main action easy to reach and use progressive disclosure for details.

The HTML/CSS versions are visual exploration and should not be treated as the production frontend. Use them as reference when implementing the native screen.

## Existing Artifacts

Product and scope:

- `PRODUCT.md` - broad product requirements, architecture, API direction, and long-term phases.
- `MVP_BRIEF.md` - current MVP boundary and acceptance baseline.
- `docs/CONTEXT_MANAGEMENT.md` - context rules for LLM request construction and timeout work.
- `.agents/skills/ripepick-context-management/SKILL.md` - RipePick positioning and safety guidance.

Prototype documentation:

- `docs/PROTOTYPE_INVENTORY.md` - current prototype page inventory and status.
- `docs/ripepick-mvp-page-map.svg` - page relationship map intended for the first Figma page.
- `docs/01-home-empty.svg`
- `docs/02-home-filled-candidate.svg`
- `docs/03-assistant-loading-candidate.svg`
- `docs/04-assistant-clarify.svg`
- `docs/05-recommendation-candidate.svg`
- `docs/06-follow-up-candidate.svg`
- `docs/07-seasonal-browse-candidate.svg`
- `docs/08-fruit-detail-candidate.svg`
- `docs/09-no-match-candidate.svg`
- `docs/10-ai-unavailable.svg`

Static design explorations:

- `HTML-CSS/ripepick-home-variants/index.html`
- `HTML-CSS/ripepick-home-variants/styles.css`
- `HTML-CSS/ripepick-home-variants/main.js`
- `HTML-CSS/ripepick-prototype-index/index.html` - prototype index and relationship view.

Existing backend:

- `backend/` contains a Go module and `backend/main.go`; it is not yet a complete recommendation feature backend.
- There is currently no formal mobile frontend project or `package.json` for the app.

## Completed Work

- Reviewed the product requirements and MVP boundary.
- Identified that the original prototype was more confusing in information architecture than in visual quality because the flow map, screens, support states, and fallback states were mixed together.
- Added a page relationship map and prototype inventory.
- Renamed and supplemented prototype SVGs so the main, assistant, browse, detail, no-match, and unavailable states are represented.
- Created five homepage design variants and identified `03 - Native iOS` as the best initial implementation baseline.
- Confirmed React Native + TypeScript is acceptable to the user.
- Confirmed iOS/iPadOS/macOS are desired technical targets, with macOS needing explicit validation rather than being assumed automatically supported.

## Proposed First Frontend Slice

Keep the first slice narrow and end-to-end:

1. Create a native frontend directory and initialize the chosen React Native + TypeScript toolchain.
2. Implement the home screen from the `Native iOS` variant.
3. Add the contextual input, quick prompt examples, send action, loading state, and a mocked recommendation response.
4. Model the recommendation response so it can later map to the Go API without rewriting the UI.
5. Add platform seams using `Platform` or `.ios.tsx` / `.macos.tsx` only where behavior actually differs.
6. Run the screen on an iOS simulator first, then validate iPad layout and the macOS target or record the exact environment blocker.

An API such as `POST /api/v1/recommendations` is a reasonable future contract proposal, but it is not implemented or frozen yet. Do not build a large client data layer before the response shape and first vertical slice are agreed.

## Acceptance Criteria For The Next Conversation

- The frontend project exists and its framework choice is explicit.
- The home screen renders on iOS or has a clearly documented environment blocker.
- The user can enter a current eating scene and submit it.
- Loading, successful recommendation, empty input, and unavailable/error behavior are visible and understandable.
- The recommendation UI preserves the MVP response structure: one primary choice, pairing, rationale, portion guidance, alternative, and caution when applicable.
- iPad layout is considered rather than treating it as a stretched phone screen.
- macOS support status is verified, not assumed.
- TypeScript checks and the most relevant project tests or build checks pass.

## Next Conversation Prompt

The original next-step prompt was:

```text
AGENT_HANDOFF.md
PRODUCT.md
MVP_BRIEF.md
```

Then inspect the local frontend toolchain and initialize the smallest React Native + TypeScript project that can implement the first homepage slice. Use the `Native iOS` design direction, preserve the MVP safety boundaries, and keep iOS/iPadOS/macOS compatibility explicit throughout the implementation.

## Unresolved Risks

- `react-native-macos` and Expo module compatibility may constrain the final scaffold choice.
- The local Xcode, CocoaPods, Node, package manager, and simulator state has not yet been verified in this handoff.
- The backend recommendation contract and structured fruit/pairing data schema are not frozen.
- The static variants have not yet been translated into a real native component system.
- Do not treat a successful iOS build as proof that the macOS target works.
