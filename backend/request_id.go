package main

import (
	"crypto/rand"
	"encoding/hex"
)

// 为每个HTTP请求生成一个唯一的追踪编号
// 这个编号后续有很大用处
func newRequestID() (string, error) {
	var raw [16]byte

	// 用安全随机数填充16个字节
	// 失败的时候把错误交给调用方处理
	if _, err := rand.Read(raw[:]); err != nil {
		return "", err
	}

	// 设置 UUID v4 要求的版本位和变体位。
	raw[6] = (raw[6] & 0x0f) | 0x40
	raw[8] = (raw[8] & 0x3f) | 0x80

	// 先把 16 个字节转为 32 个十六进制字符，再插入 UUID 的连字符。
	id := hex.EncodeToString(raw[:])
	return id[:8] + "-" +
		id[8:12] + "-" +
		id[12:16] + "-" +
		id[16:20] + "-" +
		id[20:], nil

}
