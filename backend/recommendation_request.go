package main

import (
	"errors"
	"strings"
	"unicode/utf8"
)

type RecommendationRequest struct {
	SessionID *string `json:"session_id"`
	Message   string  `json:"message"`
}

// Validate 对于空情况的校验
func (request RecommendationRequest) Validate() error {

	// 如果message为空
	if strings.TrimSpace(request.Message) == "" {
		return errors.New("message must not be empty")
	}

	if utf8.RuneCountInString(request.Message) > 2000 {
		return errors.New("message must not exceed 2000 characters")
	}

	return nil
}
