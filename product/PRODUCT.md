# RipePick — Product Requirement Document

**Document Version**: 1.1  
**Status**: Draft  
**Last Updated**: 2026-08-30  
**Author**: Friday  
**License**: MIT (planned)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Market Analysis](#2-market-analysis)
3. [Target Users](#3-target-users)
4. [Functional Requirements](#4-functional-requirements)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [System Architecture](#6-system-architecture)
7. [AI Agent Design](#7-ai-agent-design)
8. [Data Model](#8-data-model)
9. [API Specification](#9-api-specification)
10. [Frontend Specification](#10-frontend-specification)
11. [Development Phases](#11-development-phases)
12. [Risk Assessment](#12-risk-assessment)
13. [Success Metrics](#13-success-metrics)

---

## 1. Executive Summary

### 1.1 Product Vision

RipePick is an **AI-first personal healthy-eating decision assistant centered on fruits**. It helps people who regularly eat fruit make practical choices based on their current eating situation, time, season, location, and personal goals. A user describes a situation such as "I had a heavy meal last night. What should I eat for breakfast this morning?" and RipePick returns a fruit recommendation with a suitable breakfast pairing, explanation, portion guidance, alternatives, and relevant cautions.

RipePick is not a shopping platform and does not provide medical diagnosis or treatment. The MVP validates whether users find this kind of contextual, actionable guidance more useful than general search or a static fruit encyclopedia.

### 1.2 Core Value Proposition

| For | Value |
|-----|-------|
| **Consumers** | Turn a vague healthy-eating goal into a clear, practical fruit and breakfast plan through a simple conversation. |
| **Developers** | A production-grade, open-source reference implementation of Go + Gin + React Native + AI Agent architecture. |
| **Open Source Community** | A well-documented, modern full-stack project demonstrating real-world AI integration patterns. |

### 1.3 Elevator Pitch

> "Not sure what fruit to eat today? Tell RipePick about your situation. It helps you choose a fruit and breakfast pairing that fits your goal, explains why, and shows you how to make a better everyday choice."

---

## 2. Market Analysis

### 2.1 Market Context

The global fresh fruits market was valued at approximately $580 billion in 2024 and continues to grow. Chinese consumers increasingly prioritize food quality and seasonal eating, driven by health consciousness and food safety concerns. However, most consumers lack reliable, accessible seasonal produce knowledge — they rely on fragmented WeChat articles, Baidu searches, or word of mouth.

### 2.2 Competitive Landscape

#### Tier 1: Direct Competitors (Same problem space)

| Product | Platform | Coverage | Interaction Model | AI Capability | Pricing | Rating |
|---------|----------|----------|-------------------|---------------|---------|--------|
| **Seasonal Food Guide** | iOS, Android, Web | 140+ produce (US) | Search → List → Detail | None | Free | 4.7★ |
| **果蔬百科 (GuoShuWiki)** | iOS, Android | 87 fruits, 98 veg, 15 nuts (CN) | Category Browse → Detail | None | Free | 4.5★ |
| **果识 (GuoShi)** | iOS, WeChat Mini Program | 165 produce (CN) | Search → Detail | None | Free | N/A |
| **Fruit Scout** | iOS | 68 fruits (US) | Browse → Detail | None | Free | N/A |
| **In Season: Produce Calendar** | iOS | Limited (US) | Calendar → List | None | Free | New |

#### Tier 2: Indirect Competitors (Overlapping problem space)

| Product | Overlap | Weakness |
|---------|---------|----------|
| **下厨房 / 豆果美食** | Recipe apps with seasonal tags | Produce info is secondary; no purchasing guidance |
| **小红书** | User-generated seasonal fruit content | Unstructured, unverifiable, not queryable |
| **叮咚买菜 / 盒马** | E-commerce with seasonal labels | Commercial bias toward stocked items; no independent guidance |

### 2.3 Competitive Gap Analysis

| Capability | Existing Products | RipePick |
|------------|-------------------|----------|
| Seasonal lookup by month | ✅ | ✅ |
| Fruit detail (nutrition, tips) | ✅ | ✅ |
| Regional seasonality | ✅ (SFG only) | ✅ |
| Conversational query | ❌ | ✅ (core differentiator) |
| Taste-based recommendation | ❌ | ✅ |
| Multi-constraint query (e.g., "sour + July + budget-friendly") | ❌ | ✅ |
| Personalized preferences | ❌ | ✅ (Phase 2) |
| Open source | ❌ | ✅ |
| AI-powered data enrichment | ❌ | ✅ (Phase 2) |

### 2.4 Why Now

1. **LLM commoditization**: DeepSeek, Qwen, and other cost-effective Chinese LLMs make AI features economically viable for independent developers.
2. **Function-calling maturity**: LLMs now reliably support structured tool calling, enabling natural language → database query pipelines.
3. **Health & food consciousness wave**: Post-pandemic Chinese consumers are more invested in food quality and nutrition.
4. **Open-source AI boom**: Developer community hungry for practical, real-world AI integration examples beyond toy demos.

---

## 3. Target Users

### 3.1 Primary Persona: "The Daily Fruit Eater"

| Attribute | Detail |
|-----------|--------|
| **Name** | 小王 |
| **Age** | 25-35 |
| **Location** | Tier 1-2 Chinese cities (北上广深杭) |
| **Occupation** | Office worker, some cooking at home |
| **Tech literacy** | High — uses apps for everything |
| **Pain point** | Eats fruit regularly but does not know how to choose fruit for a specific meal, time, season, or recent eating situation. |
| **Behavior** | Opens the app when planning breakfast or making a daily food choice. Describes the situation in natural language and wants a practical answer. |
| **Goal** | Make healthier everyday choices with less uncertainty and gradually build personal food-management knowledge. |

### 3.2 Secondary Persona: "The Health-Conscious Planner"

| Attribute | Detail |
|-----------|--------|
| **Name** | 李姐 |
| **Age** | 30-45 |
| **Location** | Any Chinese city |
| **Pain point** | Wants to plan simple, balanced meals but lacks time to compare fruit, nutrition, seasonality, and pairings. |
| **Behavior** | Plans breakfasts or family meals and looks for clear, trustworthy general guidance. |
| **Goal** | Make sensible food choices for the household without needing specialist nutrition knowledge. |

### 3.3 Tertiary Persona: "The Developer / Tech Enthusiast"

| Attribute | Detail |
|-----------|--------|
| **Pain point** | Wants to learn Go backend + AI Agent patterns through a real project. |
| **Behavior** | Stars the GitHub repo, reads the architecture docs, maybe contributes. |
| **Goal** | Reference implementation for their own projects; portfolio piece. |

---

## 4. Functional Requirements

### 4.1 FR-1: Seasonal Fruit Browsing

**Priority**: P1 (supporting MVP capability)  
**Description**: Users shall be able to browse fruits by seasonal availability. This capability supports discovery and provides a static fallback for the AI assistant; it is not the primary MVP value proposition.

**Detailed Requirements**:
- **FR-1.1** — Display a calendar grid showing which fruits are in season for each month
- **FR-1.2** — Users can select a specific month to view all in-season fruits
- **FR-1.3** — Fruits shall indicate peak season vs. available season with visual distinction
- **FR-1.4** — Default view shows current month on page load

**Acceptance Criteria**:
- Current month auto-selected on page load
- Clicking a month filters the fruit list immediately (< 300ms perceived latency)
- Peak-season fruits display a "Best Now" badge

### 4.2 FR-2: Fruit Detail Page

**Priority**: P1 (supporting MVP capability)  
**Description**: Each fruit shall have a focused detail page with the information needed to understand and act on an AI recommendation.

**Detailed Requirements**:
- **FR-2.1** — Display fruit name (Chinese + English), high-quality image, and category tag
- **FR-2.2** — Display seasonality chart (which months, peak months highlighted)
- **FR-2.3** — Display taste profile (sweetness, sourness, bitterness scores on 0-10 scale)
- **FR-2.4** — Display nutritional highlights (calories, vitamin C, fiber per 100g)
- **FR-2.5** — Display picking tips: what to look for when buying (color, firmness, smell, weight)
- **FR-2.6** — Display storage tips: how to store, shelf life, refrigeration guidance
- **FR-2.7** — Display common origins/regions

**Acceptance Criteria**:
- Page loads in under 1 second
- All data fields populated for at least 30 fruits at launch
- Picking tips are specific and actionable (not generic "pick the firm ones")

### 4.3 FR-3: Fruit Filtering & Search

**Priority**: P1 (supporting MVP capability)  
**Description**: Users shall be able to search and apply basic filters to the fruit database when exploring or validating an AI recommendation.

**Detailed Requirements**:
- **FR-3.1** — Filter by category: citrus, berry, tropical, stone fruit, melon, pome, exotic
- **FR-3.2** — Filter by taste profile range (e.g., sweetness > 7, sourness < 3)
- **FR-3.3** — Filter by current season (toggle: show only in-season fruits)
- **FR-3.4** — Full-text search by fruit name (Chinese + English)
- **FR-3.5** — Combined filters work additively (AND logic)

**Acceptance Criteria**:
- Filters respond within 200ms
- Search supports fuzzy matching for Chinese characters
- Empty state gracefully handled with suggestions

### 4.4 FR-4: AI Conversational Assistant

**Priority**: P0 (MVP, core differentiator)  
**Description**: Users shall be able to describe a current eating situation or health-oriented food goal in natural language and receive a practical fruit and breakfast pairing recommendation.

**Detailed Requirements**:
- **FR-4.1** — Chat interface with message history within a session
- **FR-4.2** — Agent understands and processes the following intent categories:

  | Intent | Example Queries | Tools Required |
  |--------|----------------|----------------|
  | Contextual breakfast recommendation | "昨晚吃得比较油腻，今天早上吃什么？" | `recommend_fruit_breakfast(context, goal)` |
  | Seasonal query | "七月有什么当季水果？" | `get_seasonal_fruits(month, region)` |
  | Taste-based query | "有没有酸酸甜甜、适合早餐的水果？" | `search_by_taste(sweetness, sourness, texture)` |
  | Nutritional query | "哪些水果富含维生素 C？" | `search_by_nutrition(nutrient, range)` |
  | Pairing query | "这个水果适合搭配什么早餐？" | `get_fruit_pairings(name, meal)` |
  | Detail inquiry | "怎么挑西瓜？" "榴莲怎么保存？" | `get_fruit_detail(name)` |
  | Comparison | "桃子和李子哪个更适合今天的早餐？" | Multiple `get_fruit_detail` + reasoning |
  | General chitchat | "你好" "谢谢" | No tool calls needed |

- **FR-4.3** — Agent responses shall cite specific fruit and pairing data from the database when making factual claims
- **FR-4.4** — Agent shall gracefully handle out-of-scope questions ("今天天气怎么样？" → polite redirection)
- **FR-4.5** — The assistant shall show a clear loading state; streaming response is an experience enhancement for the MVP
- **FR-4.6** — Agent maintains conversation context within a session and remembers the current recommendation context
- **FR-4.7** — Agent shall provide a practical recommendation, not only a list of fruit facts
- **FR-4.8** — Agent shall avoid medical diagnosis and claims such as "detox" or guaranteed effects from a food choice

**Acceptance Criteria**:
- Agent correctly understands and routes at least 90% of the fixed MVP evaluation queries
- Response time < 3 seconds for simple queries, < 8 seconds for complex multi-tool queries
- Agent never fabricates fruit data not present in the database
- Agent handles empty result sets and ambiguous context gracefully, asking only necessary follow-up questions or suggesting alternatives

### 4.5 FR-5: Regional Seasonality (Phase 2)

**Priority**: P1  
**Description**: Season data shall be region-specific, recognizing that the same fruit has different seasons in Hainan vs. Heilongjiang.

### 4.6 FR-6: User Accounts & Personalization (Phase 2)

**Priority**: P1  
**Description**: Users can create accounts, set taste preferences, and receive personalized recommendations.

### 4.7 FR-7: Community Contributions (Phase 3)

**Priority**: P2  
**Description**: Users can submit price observations, fruit photos, and local availability data.

---

## 5. Non-Functional Requirements

### 5.1 Performance

| Metric | Target |
|--------|--------|
| API response time (p95) | < 200ms (non-AI endpoints) |
| AI chat first-token time | < 1.5s |
| Page load time (LCP) | < 2.5s |
| Database query time (p95) | < 50ms |
| Concurrent users supported | 100 (MVP) → 1,000 (Phase 2) |

### 5.2 Security

| Requirement | Implementation |
|-------------|---------------|
| API rate limiting | Token bucket, 60 req/min per IP for AI endpoint |
| Input sanitization | All user inputs validated and sanitized; SQL injection prevention via parameterized queries |
| LLM prompt injection prevention | System prompt hardening; user input treated as data, never instructions |
| CORS policy | Whitelist frontend origin only |
| Authentication (Phase 2) | JWT with refresh tokens, bcrypt password hashing |

### 5.3 Reliability

| Requirement | Target |
|-------------|--------|
| Uptime | 99.5% (MVP) |
| Graceful degradation | AI chat unavailable → fall back to static browse/search |
| Data backup | Daily PostgreSQL dumps |
| Error handling | All API errors return structured JSON with error codes |

### 5.4 Maintainability

| Requirement | Implementation |
|-------------|---------------|
| Code style | `gofmt` enforced for Go; ESLint + Prettier for React/TypeScript |
| Testing | Unit tests for business logic; integration tests for API endpoints |
| Documentation | OpenAPI/Swagger for REST API; GoDoc for packages; README for project setup |
| Git workflow | Conventional Commits; feature branches; PR reviews |

### 5.5 Observability

| Requirement | Implementation |
|-------------|---------------|
| Logging | Structured logging (JSON format) with request IDs |
| Error tracking | All 5xx errors logged with stack traces |
| LLM call monitoring | Token usage, latency, tool call success rate logged per request |

---

## 6. System Architecture

### 6.1 Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                         Client Layer                              │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │        React Native App (iOS + Android, Expo)             │   │
│  │        TypeScript + native navigation and UI              │   │
│  └────────────────────────┬──────────────────────────────────┘   │
│                           │ HTTP/HTTPS (REST + SSE)               │
└───────────────────────┼──────────────────────────────────────────┘
                        │
┌───────────────────────┼──────────────────────────────────────────┐
│                  API Gateway Layer                                 │
│  ┌────────────────────▼──────────────────────────────────────┐   │
│  │              Gin Router (Go)                                │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │   │
│  │  │  CORS    │  │  Logger  │  │  Rate    │  │  Recovery │  │   │
│  │  │Middleware │  │Middleware│  │ Limiter  │  │Middleware │  │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │   │
│  └───────────────────────────────────────────────────────────┘   │
└───────────────────────┬──────────────────────────────────────────┘
                        │
┌───────────────────────┼──────────────────────────────────────────┐
│                   Service Layer (Go)                              │
│  ┌────────────────────┼──────────────────────────────────────┐   │
│  │                                                             │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │   │
│  │  │ FruitService │  │SeasonService │  │ Pairing      │     │   │
│  │  │              │  │              │  │ Service      │     │   │
│  │  │              │  │              │  │              │     │   │
│  │  │ - List()     │  │ - GetByMonth │  │ - GetByFruit │     │   │
│  │  │ - GetByID()  │  │ - Calendar() │  │ - ByMeal()   │     │   │
│  │  │ - Search()   │  │ - ByRegion() │  │              │     │   │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │   │
│  │         │                 │                 │               │   │
│  │         └─────────────────┼─────────────────┘               │   │
│  │                           │                                  │   │
│  │  ┌────────────────────────▼──────────────────────────┐     │   │
│  │  │              AgentService                          │     │   │
│  │  │                                                    │     │   │
│  │  │  - Chat(userMessage) → AgentResponse (SSE stream) │     │   │
│  │  │  - Tool definitions registry                       │     │   │
│  │  │  - Function-calling loop (LLM ↔ Tool ↔ LLM)       │     │   │
│  │  │  - Conversation context management                 │     │   │
│  │  │                                                    │     │   │
│  │  │  Dependencies:                                     │     │   │
│  │  │    • LLM Provider (DeepSeek / OpenAI-compatible)   │     │   │
│  │  │    • FruitService, SeasonService, PairingService    │     │   │
│  │  └────────────────────────────────────────────────────┘     │   │
│  │                                                              │   │
│  └──────────────────────────────────────────────────────────────┘   │
└───────────────────────┬──────────────────────────────────────────┘
                        │
┌───────────────────────┼──────────────────────────────────────────┐
│                 Repository Layer (Go)                             │
│  ┌────────────────────┼──────────────────────────────────────┐   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │   │
│  │  │ FruitRepo    │  │SeasonRepo    │  │  TipRepo     │     │   │
│  │  │ (PostgreSQL) │  │(PostgreSQL)  │  │ (PostgreSQL) │     │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘     │   │
│  └──────────────────────────────────────────────────────────────┘   │
└───────────────────────┬──────────────────────────────────────────┘
                        │
┌───────────────────────┼──────────────────────────────────────────┐
│                   Data Layer                                      │
│  ┌────────────────────▼──────────────────────────────────────┐   │
│  │              PostgreSQL 16+                                 │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │   │
│  │  │ fruits   │ │fruit_    │ │fruit_    │ │ users    │     │   │
│  │  │          │ │seasons   │ │tips      │ │ (Phase2) │     │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘     │   │
│  └───────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

### 6.2 Technology Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| **Backend Runtime** | Go | 1.22+ | Performance, single binary deployment, excellent concurrency model |
| **HTTP Framework** | Gin | 1.10+ | Most popular Go web framework; extensive middleware ecosystem |
| **Database** | PostgreSQL | 16+ | JSONB support for flexible attributes; consistent with developer's tech stack |
| **Database Driver** | pgx | 5+ | Fastest PostgreSQL driver for Go |
| **LLM Provider** | DeepSeek API | V3 | Cost-effective, strong Chinese language capability |
| **Frontend Framework** | React Native | 0.8x+ | Native iOS and Android UI with React's component model |
| **Frontend Toolchain** | Expo | SDK 5x+ | Simplified development, device testing, and app builds |
| **Frontend Language** | TypeScript | 5+ | Type safety for API contracts |
| **Navigation** | Expo Router | 4+ | File-based navigation for native screens |
| **HTTP Client** | fetch | - | Standard REST client available in React Native |
| **UI Styling** | React Native StyleSheet | - | Platform-aware native styling without a WebView |
| **Deployment** | Docker + Docker Compose | - | Consistent dev/prod parity |

### 6.3 Directory Structure

```
RipePick/
├── PRODUCT.md                   # This document
├── README.md                    # GitHub landing page
├── LICENSE                      # MIT
├── docker-compose.yml           # PostgreSQL + app containers
│
├── backend/
│   ├── main.go                  # Entry point
│   ├── go.mod
│   ├── go.sum
│   ├── cmd/
│   │   └── server/
│   │       └── main.go          # Server bootstrap
│   ├── internal/
│   │   ├── config/
│   │   │   └── config.go        # Env-based configuration
│   │   ├── handler/
│   │   │   ├── fruit.go         # Fruit CRUD handlers
│   │   │   ├── season.go        # Season query handlers
│   │   │   ├── tip.go           # Tip handlers
│   │   │   └── agent.go         # AI chat handler (SSE)
│   │   ├── service/
│   │   │   ├── fruit.go         # Fruit business logic
│   │   │   ├── season.go        # Season business logic
│   │   │   ├── tip.go           # Tip business logic
│   │   │   └── agent/
│   │   │       ├── agent.go     # Agent orchestration
│   │   │       ├── tools.go     # Tool definitions
│   │   │       ├── llm.go       # LLM client wrapper
│   │   │       └── prompts.go   # System prompts
│   │   ├── repository/
│   │   │   ├── fruit.go         # Fruit DB queries
│   │   │   ├── season.go        # Season DB queries
│   │   │   └── tip.go           # Tip DB queries
│   │   ├── model/
│   │   │   ├── fruit.go         # Fruit struct + DTOs
│   │   │   ├── season.go        # Season struct + DTOs
│   │   │   ├── tip.go           # Tip struct + DTOs
│   │   │   └── agent.go         # Agent request/response types
│   │   ├── middleware/
│   │   │   ├── cors.go
│   │   │   ├── logger.go
│   │   │   └── ratelimit.go
│   │   └── router/
│   │       └── router.go        # Route definitions
│   ├── migrations/
│   │   ├── 001_create_fruits.up.sql
│   │   ├── 001_create_fruits.down.sql
│   │   └── ...
│   └── seed/
│       └── fruits.sql           # Initial data
│
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── app.json
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx             # Home screen
│   │   ├── browse.tsx            # Browse screen
│   │   ├── fruit/
│   │   │   └── [id].tsx          # Fruit detail screen
│   │   └── assistant.tsx         # AI assistant screen
│   └── src/
│       ├── api/
│       │   ├── client.ts        # API client
│       │   ├── fruits.ts        # Fruit API calls
│       │   ├── seasons.ts       # Season API calls
│       │   └── agent.ts         # Agent chat API (SSE)
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Header.tsx
│       │   │   ├── Footer.tsx
│       │   │   └── Layout.tsx
│       │   ├── fruit/
│       │   │   ├── FruitCard.tsx
│       │   │   ├── FruitGrid.tsx
│       │   │   ├── FruitDetail.tsx
│       │   │   ├── SeasonBadge.tsx
│       │   │   └── TasteChart.tsx
│       │   ├── season/
│       │   │   ├── SeasonCalendar.tsx
│       │   │   └── MonthSelector.tsx
│       │   ├── search/
│       │   │   ├── SearchBar.tsx
│       │   │   └── FilterPanel.tsx
│       │   └── chat/
│       │       ├── ChatWindow.tsx
│       │       ├── ChatMessage.tsx
│       │       ├── ChatInput.tsx
│       │       └── FruitRecommendCard.tsx
│       ├── screens/              # Shared screen-level UI where needed
│       ├── hooks/
│       │   ├── useFruits.ts
│       │   ├── useSeasons.ts
│       │   └── useAgentChat.ts  # SSE stream hook
│       ├── types/
│       │   ├── fruit.ts
│       │   ├── season.ts
│       │   └── agent.ts
│       └── utils/
│           ├── formatters.ts
│           └── constants.ts
│
└── docs/
    ├── api/
    │   └── openapi.yaml        # OpenAPI 3.0 spec
    └── architecture.md         # Architecture decisions record
```

---

## 7. AI Agent Design

### 7.1 Architecture Overview

The AI Agent follows the **ReAct (Reasoning + Acting)** pattern with a function-calling loop:

```
┌─────────────────────────────────────────────────────────┐
│                    Agent Loop                             │
│                                                           │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────┐   │
│  │  User    │───▶│   LLM    │───▶│  Decision        │   │
│  │  Message │    │  (Chat)  │    │  │                │   │
│  └──────────┘    └──────────┘    │  ├─ Respond ────▶ User
│       ▲                          │  └─ Call Tool ──▶ │   │
│       │                          └──────────────────┘   │
│       │                                    │              │
│       │                          ┌─────────▼────────┐   │
│       │                          │  Tool Execution   │   │
│       │                          │  (REST API call)  │   │
│       │                          └─────────┬────────┘   │
│       │                                    │              │
│       │                          ┌─────────▼────────┐   │
│       └──────────────────────────│  Tool Result → LLM│   │
│                                  └──────────────────┘   │
│                                                           │
│  Max iterations: 5 (prevents infinite loops)              │
└─────────────────────────────────────────────────────────┘
```

### 7.2 Tool Definitions

The Agent exposes the following functions as LLM-callable tools:

```json
// 1. Get fruits in season for a given month
{
  "name": "get_seasonal_fruits",
  "description": "Get all fruits that are in season for a given month. Returns fruit names, peak season indicators, and categories.",
  "parameters": {
    "month": { "type": "integer", "description": "Month number, 1-12" },
    "region": { "type": "string", "description": "Optional region filter, e.g. '华南', '全国'. Default: '全国'" }
  }
}

// 2. Search fruits by taste profile
{
  "name": "search_by_taste",
  "description": "Search fruits by taste attributes. All parameters are optional ranges.",
  "parameters": {
    "min_sweetness": { "type": "integer", "description": "Minimum sweetness (0-10)" },
    "max_sourness": { "type": "integer", "description": "Maximum sourness (0-10)" },
    "texture": { "type": "string", "enum": ["crisp", "soft", "juicy", "firm", "creamy"] },
    "in_season_only": { "type": "boolean", "description": "If true, only return currently in-season fruits" }
  }
}

// 3. Search fruits by nutritional criteria
{
  "name": "search_by_nutrition",
  "description": "Search fruits by nutritional content. Specify a nutrient and its target range.",
  "parameters": {
    "nutrient": { "type": "string", "enum": ["vitamin_c", "fiber", "calories", "sugar", "potassium"] },
    "min_value": { "type": "number" },
    "max_value": { "type": "number" },
    "unit": { "type": "string", "description": "Per 100g" }
  }
}

// 4. Get detailed information about a specific fruit
{
  "name": "get_fruit_detail",
  "description": "Get comprehensive details about a specific fruit: seasonality, taste, nutrition, picking tips, storage tips.",
  "parameters": {
    "name": { "type": "string", "description": "Fruit name in Chinese or English" }
  }
}

// 5. Recommend a fruit-centered breakfast for a user's context
{
  "name": "recommend_fruit_breakfast",
  "description": "Recommend one primary fruit-centered breakfast pairing based on the user's eating context, time, goal, season, and known constraints. Return structured recommendation candidates grounded in database facts.",
  "parameters": {
    "context": { "type": "string", "description": "Recent eating situation or current context" },
    "goal": { "type": "string", "description": "User's immediate food goal" },
    "meal": { "type": "string", "description": "Meal or time of day, e.g. breakfast" },
    "region": { "type": "string", "description": "Optional region; default: 全国" },
    "constraints": { "type": "array", "items": { "type": "string" }, "description": "Known allergies, dietary restrictions, or preferences" }
  }
}

// 6. Get pairing suggestions for a fruit and meal
{
  "name": "get_fruit_pairings",
  "description": "Get curated, general fruit pairing suggestions for a meal from the pairing dataset.",
  "parameters": {
    "name": { "type": "string", "description": "Fruit name in Chinese or English" },
    "meal": { "type": "string", "description": "Meal or eating occasion" }
  }
}

// 7. Get monthly calendar overview
{
  "name": "get_monthly_calendar",
  "description": "Get a calendar overview of all fruits organized by month. Useful for 'what's available year-round' type questions.",
  "parameters": {}
}
```

### 7.3 System Prompt

```
You are RipePick, a friendly and knowledgeable fruit-centered healthy-eating assistant.
Your goal is to help users make practical everyday food choices, especially fruit and breakfast pairings.

IDENTITY:
- You work at RipePick, an app that helps people make informed fruit and breakfast choices.
- You speak Chinese (Simplified) by default. Use a warm, approachable tone — like a friendly fruit vendor who knows their craft.
- Keep responses concise but informative. Give one primary plan and one alternative before adding detail.

CAPABILITIES:
- You have access to a fruit database with seasonal data, taste profiles, nutrition facts, pairing guidance, and selection/storage tips.
- Use the available functions to retrieve accurate data. NEVER fabricate fruit information.
- If you cannot find a fruit in the database, honestly tell the user instead of guessing.

GUIDELINES:
- For a contextual recommendation, address the user's situation, goal, meal, recommended fruit, breakfast pairing, and practical portion guidance.
- Explain the recommendation using data retrieved from tools, not unsupported health claims.
- Include a relevant alternative when the user may not have the recommended fruit.
- For nutritional queries, cite specific numbers.
- For comparisons, present pros and cons side by side.
- If the user asks about medical diagnosis, treatment, or a guaranteed health effect, explain that you only provide general food information and recommend consulting a qualified professional when appropriate.
- If the user asks about non-fruit food planning, you may discuss a simple breakfast pairing only when it supports the fruit-centered use case. Otherwise, politely redirect.

LIMITATIONS:
- Your core knowledge is fruit and simple fruit-centered meal pairings. Do not pretend to provide a complete diet or medical plan.
- Your knowledge comes from the database. Do not invent fruits, seasons, or nutrition data.
- If data is insufficient to answer a query, say so and suggest what you CAN help with.
- Do not claim that fruit can detox, cancel out a heavy meal, cure disease, or produce guaranteed effects.
```

### 7.4 Conversation Context Management

- **Window**: Keep last 10 messages (user + assistant) as context
- **Tool results**: Include in context but label clearly as "system / data"
- **Session**: In-memory map with TTL (1 hour). Phase 2: persisted to PostgreSQL.

### 7.5 Fallback Strategy

| Scenario | Behavior |
|----------|----------|
| LLM API timeout | Return error message with suggestion to use static browse |
| LLM returns malformed tool call | Retry once; if still malformed, return generic error |
| Tool execution fails (DB error) | LLM receives error message; formulates apology and alternative suggestion |
| Rate limit exceeded | Return 429 with retry-after header |
| No tool results found | LLM formulates helpful "no results" message with suggestions |

---

## 8. Data Model

### 8.1 Entity Relationship Diagram

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│    fruits    │       │  fruit_seasons   │       │  fruit_tips  │
├──────────────┤       ├──────────────────┤       ├──────────────┤
│ id (PK)      │──┐    │ id (PK)          │       │ id (PK)      │
│ name         │  │    │ fruit_id (FK) ───┼──────▶│ fruit_id (FK)│──┐
│ name_en      │  │    │ region           │   │   │ tip_type     │  │
│ category     │  ├───▶│ start_month      │   │   │ content      │  │
│ description  │  │    │ end_month        │   │   │ sort_order   │  │
│ image_url    │  │    │ peak_start       │   │   └──────────────┘  │
│ taste_profile│  │    │ peak_end         │   │                      │
│ texture      │  │    └──────────────────┘   │   ┌──────────────┐  │
│ nutrition    │  │                            │   │    users     │  │
│ origins      │  │                            │   │  (Phase 2)   │  │
│ created_at   │  │                            │   └──────────────┘  │
│ updated_at   │  │                            │                      │
└──────────────┘  │                            └──────────────────────┘
                  │
    (one fruit has many seasons, many tips)
```

### 8.2 Table Definitions

#### 8.2.1 fruits

```sql
CREATE TABLE fruits (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(100)  NOT NULL,
    name_en       VARCHAR(100),
    category      VARCHAR(50)   NOT NULL CHECK (category IN (
                      'citrus', 'berry', 'tropical', 'stone_fruit',
                      'melon', 'pome', 'exotic', 'dried_fruit'
                  )),
    description   TEXT,
    image_url     VARCHAR(500),
    taste_profile JSONB NOT NULL DEFAULT '{}',
        -- {"sweetness": 8, "sourness": 3, "bitterness": 0, "umami": 1}
    texture       VARCHAR(50) CHECK (texture IN (
                      'crisp', 'soft', 'juicy', 'firm', 'creamy', 'chewy'
                  )),
    nutrition     JSONB NOT NULL DEFAULT '{}',
        -- {"calories": 52, "vitamin_c": 53, "fiber": 2.4, "sugar": 10, "potassium": 200}
        -- All values per 100g edible portion
    origins       JSONB DEFAULT '[]',
        -- ["新疆", "山东", "陕西", "进口"]
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_fruits_category ON fruits(category);
CREATE INDEX idx_fruits_name ON fruits USING gin(to_tsvector('simple', name));
CREATE INDEX idx_fruits_taste ON fruits USING gin(taste_profile);
```

#### 8.2.2 fruit_seasons

```sql
CREATE TABLE fruit_seasons (
    id          SERIAL PRIMARY KEY,
    fruit_id    INTEGER NOT NULL REFERENCES fruits(id) ON DELETE CASCADE,
    region      VARCHAR(100) NOT NULL DEFAULT '全国',
        -- Region identifier: "全国", "华南", "华北", "新疆", etc.
    start_month INTEGER NOT NULL CHECK (start_month BETWEEN 1 AND 12),
    end_month   INTEGER NOT NULL CHECK (end_month BETWEEN 1 AND 12),
    peak_start  INTEGER CHECK (peak_start BETWEEN 1 AND 12),
        -- NULL if no distinct peak (fruit is consistent across its season)
    peak_end    INTEGER CHECK (peak_end BETWEEN 1 AND 12),
    notes       TEXT,
        -- e.g., "温室种植可全年供应"

    CONSTRAINT chk_month_order CHECK (
        -- Allow cross-year seasons (e.g., Nov-Feb for citrus)
        (end_month >= start_month AND peak_start IS NULL)
        OR (end_month >= start_month AND peak_start BETWEEN start_month AND end_month)
        OR (end_month < start_month)  -- cross-year: valid regardless
    )
);

CREATE INDEX idx_seasons_fruit ON fruit_seasons(fruit_id);
CREATE INDEX idx_seasons_month ON fruit_seasons(start_month, end_month);
CREATE INDEX idx_seasons_region ON fruit_seasons(region);
```

#### 8.2.3 fruit_tips

```sql
CREATE TABLE fruit_tips (
    id          SERIAL PRIMARY KEY,
    fruit_id    INTEGER NOT NULL REFERENCES fruits(id) ON DELETE CASCADE,
    tip_type    VARCHAR(20) NOT NULL CHECK (tip_type IN ('picking', 'storage')),
    content     TEXT NOT NULL,
    sort_order  INTEGER DEFAULT 0
);

CREATE INDEX idx_tips_fruit_type ON fruit_tips(fruit_id, tip_type);
```

#### 8.2.4 fruit_pairings

```sql
CREATE TABLE fruit_pairings (
    id          SERIAL PRIMARY KEY,
    fruit_id    INTEGER NOT NULL REFERENCES fruits(id) ON DELETE CASCADE,
    meal_type   VARCHAR(30) NOT NULL,
    pairing     TEXT NOT NULL,
    rationale   TEXT,
    cautions    TEXT,
    source      VARCHAR(500),
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_pairings_fruit_meal ON fruit_pairings(fruit_id, meal_type);
```

Pairing records are curated general food guidance. They must not be represented as medical prescriptions or guaranteed health effects.

#### 8.2.5 users (Phase 2)

```sql
CREATE TABLE users (
    id                SERIAL PRIMARY KEY,
    username          VARCHAR(50) UNIQUE NOT NULL,
    email             VARCHAR(200) UNIQUE,
    password_hash     VARCHAR(255) NOT NULL,
    taste_preferences JSONB DEFAULT '{}',
        -- {"sweetness": 8, "sourness": 3, "preferred_textures": ["crisp", "juicy"]}
    created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 9. API Specification

### 9.1 Base URL

```
Development: http://localhost:8080/api/v1
Production:  https://ripepick.app/api/v1
```

### 9.2 Response Envelope

All responses follow a consistent format:

```json
{
  "code": 0,
  "message": "success",
  "data": { ... },
  "request_id": "uuid-v4"
}
```

Error responses:

```json
{
  "code": 40401,
  "message": "Fruit not found",
  "data": null,
  "request_id": "uuid-v4"
}
```

**Error Code Convention**:
- `0`: Success
- `400xx`: Client error (validation, not found)
- `500xx`: Server error (database, internal)
- `429xx`: Rate limit

### 9.3 Endpoints

#### 9.3.1 GET /fruits

List fruits with optional filters.

**Query Parameters**:

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `month` | integer | No | Filter by in-season month (1-12) |
| `category` | string | No | citrus, berry, tropical, stone_fruit, melon, pome, exotic |
| `min_sweetness` | integer | No | 0-10 |
| `max_sourness` | integer | No | 0-10 |
| `texture` | string | No | crisp, soft, juicy, firm, creamy |
| `in_season` | boolean | No | If true, only currently in-season fruits |
| `search` | string | No | Full-text search on name |
| `page` | integer | No | Default: 1 |
| `page_size` | integer | No | Default: 20, Max: 50 |

**Response**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      {
        "id": 1,
        "name": "西瓜",
        "name_en": "Watermelon",
        "category": "melon",
        "description": "夏季消暑佳品...",
        "image_url": "/images/fruits/watermelon.jpg",
        "taste_profile": { "sweetness": 8, "sourness": 1, "bitterness": 0 },
        "texture": "juicy",
        "nutrition": { "calories": 30, "vitamin_c": 8, "fiber": 0.4, "sugar": 6 },
        "is_in_season": true,
        "peak_season": true
      }
    ],
    "pagination": {
      "page": 1,
      "page_size": 20,
      "total": 45,
      "total_pages": 3
    }
  }
}
```

#### 9.3.2 GET /fruits/:id

Get a single fruit with full details including seasons and tips.

**Response**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 1,
    "name": "西瓜",
    "name_en": "Watermelon",
    "category": "melon",
    "description": "...",
    "image_url": "...",
    "taste_profile": { ... },
    "texture": "juicy",
    "nutrition": { ... },
    "origins": ["新疆", "山东", "宁夏"],
    "seasons": [
      {
        "region": "全国",
        "start_month": 5,
        "end_month": 9,
        "peak_start": 7,
        "peak_end": 8,
        "notes": null
      }
    ],
    "tips": [
      { "type": "picking", "content": "拍打听声音，声音清脆为熟瓜，沉闷为生瓜..." },
      { "type": "storage", "content": "整瓜常温保存即可，切开后需冷藏并在2天内食用..." }
    ]
  }
}
```

#### 9.3.3 GET /seasons

Get seasonal calendar.

**Query Parameters**:

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `month` | integer | No | Filter to specific month (1-12) |
| `region` | string | No | Default: "全国" |

**Response**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "month": 7,
    "region": "全国",
    "fruits": [
      { "id": 1, "name": "西瓜", "peak": true },
      { "id": 5, "name": "桃子", "peak": true },
      { "id": 8, "name": "荔枝", "peak": false }
    ]
  }
}
```

#### 9.3.4 POST /agent/chat

AI chat endpoint. Returns Server-Sent Events (SSE) stream.

**Request**:

```json
{
  "message": "七月有什么酸酸甜甜的水果推荐吗？",
  "session_id": "optional-existing-session-uuid"
}
```

**Response** (SSE stream):

```
event: message
data: {"delta": "七月"}

event: message
data: {"delta": "正当季"}

event: message
data: {"delta": "的酸酸甜甜"}

event: tool_call
data: {"name": "get_seasonal_fruits", "args": {"month": 7}, "status": "called"}

event: tool_result
data: {"name": "get_seasonal_fruits", "result": {"count": 8}}

event: message
data: {"delta": "水果有这些：\n\n"}

event: message
data: {"delta": "🍑 **桃子** — 正当季巅峰，..."}

event: done
data: {"session_id": "uuid", "tokens_used": 450}
```

#### 9.3.5 GET /fruits/:id/tips

Get tips for a specific fruit.

**Query Parameters**:

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | No | "picking" or "storage" |

---

## 10. Frontend Specification

### 10.1 Screen Structure

```
/                    → Home screen (context input + quick healthy-eating scenarios)
/browse              → Browse screen (grid + filters)
/fruit/:id           → Fruit detail screen
/assistant           → AI assistant screen (fruit and breakfast recommendations)
```

The primary entry point for the MVP is contextual input and recommendation. Seasonal browsing and fruit details are supporting discovery surfaces and static fallbacks.

### 10.2 Key UI Components

| Component | Description | States |
|-----------|-------------|--------|
| **ContextPrompt** | Natural-language input with quick scenario suggestions | Empty, focused, submitting, validation error |
| **RecommendationCard** | Fruit-centered breakfast plan | Loading, complete, alternative, caution |
| **SeasonCalendar** | 12-month horizontal scrollable calendar | Current month highlighted; peak months in bold; loading skeleton |
| **FruitCard** | Compact fruit card for grid display | Default, in-season badge, peak badge, loading skeleton |
| **FruitDetail** | Full fruit detail view | Tabs: Overview / Tips; loading, error, not found |
| **ChatWindow** | Scrollable message list with auto-scroll | Empty state (suggestions), loading (typing indicator), streaming |
| **ChatMessage** | Single message bubble | User (right), Assistant (left), tool calls (collapsed) |
| **FilterPanel** | Expandable filter controls | Collapsed, expanded, applied filters count badge |
| **TasteChart** | Radar/spider chart for taste profile | Color-coded by attribute |

### 10.3 Platform Layouts

| Breakpoint | Target | Layout |
|------------|--------|--------|
| iPhone | Phone | Single column, native stack navigation |
| iPad / Android tablet | Tablet | Wider content area, adaptive grid |
| Android variants | Phone/tablet | Platform-aware spacing and safe-area handling |

---

## 11. Development Phases

### Phase 1: MVP Foundation (Weeks 1-2)

**Goal**: Establish trustworthy fruit data and the basic browsing and recommendation foundations.

| Task | Priority | Est. Hours |
|------|----------|------------|
| Go project scaffolding + Gin Hello World | P0 | 2 |
| PostgreSQL setup + Docker Compose | P0 | 2 |
| Database migration scripts | P0 | 2 |
| Seed data: 30 fruits with seasons + tips | P0 | 4 |
| Fruit CRUD API (GET /fruits, GET /fruits/:id) | P0 | 4 |
| Season API (GET /seasons) | P0 | 2 |
| Tips API (GET /fruits/:id/tips) | P0 | 1 |
| React Native + Expo project init + navigation | P0 | 2 |
| Home screen with season calendar | P0 | 4 |
| Fruit browse screen with filters | P0 | 6 |
| Fruit detail screen | P0 | 4 |
| Recommendation output contract and fixed evaluation questions | P0 | 2 |

**Phase 1 Total**: ~33 hours

### Phase 2: MVP Core Assistant (Weeks 2-3)

**Goal**: Deliver and evaluate the core fruit-centered breakfast recommendation loop.

| Task | Priority | Est. Hours |
|------|----------|------------|
| LLM client integration (DeepSeek API) | P0 | 3 |
| Agent loop implementation (ReAct) | P0 | 6 |
| Tool definitions + mapping to services | P0 | 3 |
| Context-to-recommendation tool and pairing data | P0 | 4 |
| System prompt engineering + testing | P0 | 3 |
| Assistant loading state; SSE streaming | P1 | 3 |
| Chat UI component | P0 | 6 |
| Agent chat page | P0 | 4 |
| Error handling & fallback | P0 | 3 |

**Phase 2 Total**: ~31 hours

### Phase 3: MVP Validation & Launch (Week 4)

**Goal**: Production-ready, documented, open-sourced.

| Task | Priority | Est. Hours |
|------|----------|------------|
| UI polish (animations, transitions) | P1 | 4 |
| Mobile responsive optimization | P1 | 3 |
| API documentation (OpenAPI spec) | P1 | 2 |
| README + CONTRIBUTING + ARCHITECTURE docs | P1 | 3 |
| Docker Compose for full-stack dev | P1 | 2 |
| GitHub repository setup | P1 | 1 |
| MVP launch blog post / Show HN | P1 | 2 |

**Phase 3 Total**: ~17 hours

### Future Phases

- **Phase 4**: User accounts, personalization
- **Phase 5**: iOS App Store release (React Native + Expo)
- **Phase 6**: Community features, price data
- **Phase 7**: Multi-language (English), international fruit database

---

## 12. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| LLM API cost exceeds budget | Medium | High | Use DeepSeek (cost-effective); cache common queries; rate limit |
| LLM hallucinates fruit or health claims | High | High | Ground responses in fruit and pairing data; fixed evaluation set; prohibit medical claims |
| Seed data quality insufficient | Medium | Medium | Manual curation + cross-reference multiple sources |
| Agent recommendation is too generic | Medium | High | Require context, fruit, pairing, rationale, portion guidance, and alternative in the output contract |
| Agent latency unacceptable | Medium | High | Loading state first; streaming responses as an enhancement; cache common queries |
| App Store rejection (Phase 5) | Low | Medium | Research guidelines early; provide native navigation, useful app-specific behavior, and complete review metadata |
| Open source burnout (solo dev) | High | Medium | Set clear scope; say no to feature creep; build for learning first |

---

## 13. Success Metrics

### 13.1 Product Metrics (MVP Validation)

| Metric | 1 Month Target | 3 Month Target |
|--------|---------------|----------------|
| Core scenario completion rate | To be baselined | Improving after iteration |
| Users who rate a recommendation as helpful | To be baselined | Improving after iteration |
| Follow-up or refinement rate | To be baselined | Shows recommendation engagement |
| Grounded response rate in fixed evaluation set | >= 90% | >= 95% |
| Unsafe or unsupported health claims | 0 tolerated in release set | 0 tolerated in release set |

### 13.2 Learning Metrics (Personal)

| Metric | Target |
|--------|--------|
| Go proficiency | Comfortable building REST APIs independently |
| Gin framework mastery | Understand middleware, routing, error handling |
| PostgreSQL design | Confident with schema design, migrations, JSONB queries |
| AI Agent development | Understand function-calling loop, prompt engineering for tools |
| Full-stack integration | Ship a working product end-to-end |
| Open source | Maintain a public GitHub project with contributors |

---

## Appendix A: Seed Data Scope

The initial seed dataset shall include **30 fruits** covering all categories:

**Citrus** (5): 橙子、橘子、柚子、柠檬、金桔  
**Berry** (5): 草莓、蓝莓、葡萄、桑葚、樱桃  
**Tropical** (5): 芒果、榴莲、荔枝、龙眼、菠萝  
**Stone Fruit** (5): 桃子、李子、杏、杨梅、枣  
**Melon** (3): 西瓜、哈密瓜、甜瓜  
**Pome** (4): 苹果、梨、山楂、枇杷  
**Exotic** (3): 火龙果、百香果、猕猴桃

Each fruit shall have:
- Full taste profile (sweetness, sourness, bitterness scores)
- Nutritional data per 100g (calories, vitamin C, fiber, sugar)
- At least 2 season records (by region)
- At least 2 picking tips
- At least 2 storage tips

## Appendix B: Glossary

| Term | Definition |
|------|------------|
| **ReAct** | Reasoning + Acting: an AI pattern where the model alternates between thinking and calling tools |
| **Function Calling / Tool Use** | LLM's ability to output structured JSON to invoke predefined functions |
| **SSE** | Server-Sent Events: a standard for server-to-client streaming over HTTP |
| **JSONB** | PostgreSQL's binary JSON format, supporting indexing and querying |
| **Expo** | React Native tooling for development, device testing, and app builds |
| **LCP** | Largest Contentful Paint: a Core Web Vital measuring loading performance |

---

*Document version 1.0. To be updated as the project evolves.*
