---
name: ripepick-context-management
description: Preserve RipePick product positioning, MVP boundaries, and healthy-eating safety rules while designing or implementing fruit recommendation features.
---

# RipePick Product Context

Apply this skill when a task changes RipePick product behavior, user experience, recommendation logic, data, AI behavior, or related documentation.

## Required Product Documents

Before making a product, design, architecture, or implementation decision, read:

- `PRODUCT.md` for the long-term product vision and future phases.
- `MVP_BRIEF.md` for the current implementation boundary.

Use `MVP_BRIEF.md` as the implementation boundary when it differs from future plans in `PRODUCT.md`.

## Product Positioning

RipePick is an AI-first personal healthy-eating decision assistant centered on fruits. It helps people make practical fruit and breakfast choices based on their current eating situation, time, season, location, and personal goals.

RipePick is not a shopping platform and does not provide medical diagnosis, treatment, or medical-grade nutrition prescriptions.

## MVP Boundary

The MVP validates this flow:

```text
User describes a current eating situation or healthy-eating goal
  -> RipePick recommends a fruit and a suitable breakfast pairing
  -> Response gives a concise rationale, practical portion guidance,
     an alternative, and relevant cautions
```

Recommendations must be grounded in structured fruit and pairing data. The model may interpret intent and organize the response, but it must not invent facts absent from the data.

Do not expand MVP work into accounts, long-term health profiles, community features, price tracking, e-commerce, medical advice, or a complete diet planner without an explicit product decision.

## Health and Safety Rules

- Do not diagnose diseases or medical conditions.
- Do not prescribe treatment or a medical diet.
- Do not claim that fruit detoxes, cancels out a heavy meal, or guarantees a health effect.
- Do not present general guidance as individualized medical advice.
- Do not invent nutrition, seasonality, pairing, allergy, or safety data.
- Use careful language such as "may be suitable" and "general guidance" when certainty or individual context is limited.
- Mention relevant cautions and suggest consulting a qualified professional when appropriate.
- Make missing or uncertain data explicit.
