package main

// APIResponse is the common JSON envelope for API responses.
type APIResponse struct {
	Code      int    `json:"code"`
	Message   string `json:"message"`
	Data      any    `json:"data"`
	RequestID string `json:"request_id"`
}
