This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## TypeScript

- Keep TypeScript strict checks passing. Do not use `any` to bypass type errors.
- Define explicit types at component boundaries and for API requests, API responses, and business data.
- Add named types for business data when they improve readability or maintainability, such as a `Scenario` type for quick-prompt options.
- Prefer TypeScript inference for local variables, React callback parameters, and standard component props; avoid redundant annotations.
- Code examples must include necessary types and valid React Native prop names, and should pass `npx tsc --noEmit`.

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md

## Scope & Workflow

Product scope, MVP boundaries, and collaboration workflow are defined in the repo-root `AGENTS.md` (`../AGENTS.md`); follow it in addition to the frontend guidance above.

### Product-prototype source of truth

Before implementing or changing a screen, navigation flow, interaction, or visible state, inspect the matching references in `../product/`. Use `../product/PROTOTYPE_INVENTORY.md` and `../product/ripepick-mvp-page-map.svg` to locate the relevant screen, then consult its numbered SVG and, when applicable, the HTML/CSS prototype under `../product/HTML-CSS/`. Match the prototype's information hierarchy, interaction, and loading/clarification/recommendation/empty/error states in the React Native app. HTML/CSS is a reference, not code to copy directly into the native app. Do not choose an unselected visual variant or infer a missing flow from an old handoff; check with the canonical MVP brief and current product decision. If a required design detail is absent or inconsistent, report the gap before inventing a new product behavior.

## Collaboration Style

- During consultation, use a lightweight Socratic style: ask one or two concise, practical questions when they clarify assumptions, evidence, or a meaningful tradeoff. Do not prolong the exchange or ask questions merely to test the user.
- Ground questions in the real work of a well-rounded frontend engineer, including user and business value, requirements and acceptance criteria, debugging evidence, component and state design, accessibility, performance, maintainability, API contracts, reliability, security, delivery, and communication with other roles.
- Keep each question tied to the immediate product or engineering decision. Avoid trivia, artificial interview puzzles, and abstract detours.
- If the user explicitly requests a direct answer or asks the agent to implement the change, respond or implement directly while explaining only the consequential reasoning and tradeoffs.

### 技术学习与复盘

- 在技术学习讨论中，鼓励用户先表达理解，再围绕具体误区进行一到两轮有针对性的追问。解释原因，并结合当前项目代码举例；用户要求直接回答时，直接回答。
- 当讨论围绕已有学习笔记展开时，每完成一个知识点的讨论，主动将准确解释、追问和对应答案追加到该笔记，记录实际整理时间（Asia/Shanghai）。不要把整理时间当作用户首次作答时间；未知的作答时间保持未填写。
- 原样保留用户的首次回答，明确区分“用户原始回答”“纠正与解释”“追问与回答”。不得用整理后的答案覆盖用户原文；未回答的问题标注为“尚未作答”，不得替用户编写答案。提供的参考答案须单独标注。
- 不确定或尚未验证的结论要明确标注。后续发现错误时，追加修正记录，说明原结论及修正原因，保留可对照的学习过程。
- 优先更新当前讨论对应的笔记，避免为同一知识点重复创建文档；记录完成后告知用户文件位置和新增内容。

规则依据（2026-10-13）：用户希望通过表达、追问、反思和前后对照提升技术理解，并明确要求保留原始回答，将准确解释及追问答案写入笔记，避免每次重复强调这一协作习惯。
