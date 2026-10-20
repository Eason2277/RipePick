package main

type RecommendationStatus string

const StatusRecommended RecommendationStatus = "recommended"

// FruitReference 对应 OpenAPI 中的
type FruitReference struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

// EvidenceReference 标记推荐事实来自哪条结构化资料
type EvidenceReference struct {
	SourceID string `json:"source_id"`
	Label    string `json:"label"`
}

// RecommendedResult 表示 data.status == "recommended" 时返回的 data。
type RecommendedResult struct {
	SessionID      string               `json:"session_id"`
	Status         RecommendationStatus `json:"status"`
	Recommendation RecommendationDetail `json:"recommendation"`
}

// RecommendationDetail 是推荐内容本身。
type RecommendationDetail struct {
	Fruit            FruitReference      `json:"fruit"`
	BreakfastPairing string              `json:"breakfast_pairing"`
	Rationale        string              `json:"rationale"`
	PortionGuidance  string              `json:"portion_guidance"`
	Alternative      RecommendationAlt   `json:"alternative"`
	Cautions         []string            `json:"cautions"`
	Evidence         []EvidenceReference `json:"evidence"`
}

// RecommendationAlt 是备选水果和早餐搭配。
type RecommendationAlt struct {
	Fruit            FruitReference `json:"fruit"`
	BreakfastPairing string         `json:"breakfast_pairing"`
}

const StatusClarificationRequired RecommendationStatus = "clarification_required"

type ClarificationResult struct {
	SessionID     string               `json:"session_id"`
	Status        RecommendationStatus `json:"status"`
	Clarification ClarificationDetail  `json:"clarification"`
}

type ClarificationDetail struct {
	ContextSummary string                `json:"context_summary"`
	Question       string                `json:"question"`
	Options        []ClarificationOption `json:"options"`
}

type ClarificationOption struct {
	Label string `json:"label"`
	Value string `json:"value"`
}

const StatusNoMatch RecommendationStatus = "no_match"

type NoMatchResult struct {
	SessionID string               `json:"session_id"`
	Status    RecommendationStatus `json:"status"`
	NoMatch   NoMatchDetail        `json:"no_match"`
}

type NoMatchDetail struct {
	Explanation string   `json:"explanation"`
	Suggestions []string `json:"suggestions"`
}
