package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func createRecommendation(c *gin.Context) {
	// 生成一个请求编号
	requestID, err := newRequestID()

	if err != nil {
		// request ID 生成失败时不能继续处理，避免后续响应带着空编号
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	var request RecommendationRequest

	// 是gin用来读取HTTP请求体里的JSON，并且把这个JSON解析到go结构体的方法
	if err := c.ShouldBindJSON(&request); err != nil {
		// JSON格式错误时返回统一的客户端错误，不把解析器细节暴露给客户端
		writeAPIError(c,
			http.StatusBadRequest,
			40001,
			"Invalid request body",
			requestID)

		return
	}

	if err := request.Validate(); err != nil {
		writeAPIError(c, http.StatusBadRequest, 40001, err.Error(), requestID)
		return
	}

	writeAPIError(
		c,
		http.StatusServiceUnavailable,
		50301,
		"Recommendation service is temporarily unavailable",
		requestID,
	)

}

func writeAPIError(
	c *gin.Context,
	status int,
	code int,
	message string,
	requestID string,
) {
	c.JSON(status, APIResponse{
		Code:      code,
		Message:   message,
		Data:      nil,
		RequestID: requestID,
	})

}
