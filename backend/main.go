package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/api/v1/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"code": 0, "message": "pong"})
	})

	r.POST("/api/v1/recommendations", createRecommendation)
	r.Run(":8080")

}
