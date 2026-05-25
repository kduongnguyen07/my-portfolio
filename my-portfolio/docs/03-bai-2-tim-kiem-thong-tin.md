---
title: "3. Nhiệm vụ 2: Tìm kiếm & Đánh giá thông tin"
sidebar_position: 3
---

# Kỹ thuật tìm kiếm thông tin nâng cao và bộ lọc đánh giá học thuật

Để thu thập tài liệu chất lượng cao phục vụ các bài toán thuật toán và nghiên cứu AI, việc sử dụng từ khóa thông thường là không đủ hiệu quả vì tỷ lệ nhiễu thông tin lớn. Tôi áp dụng chiến lược khai thác thông tin chuyên sâu thông qua các toán tử của Google Search.

## 1. Thực thi chuỗi toán tử tìm kiếm phức hợp
Dưới đây là cú pháp lệnh tìm kiếm được thiết kế để lọc bỏ hoàn toàn các nguồn blog cá nhân, chỉ giữ lại các tài liệu đặc tả thuật toán hoặc mã nguồn chính thống từ các tổ chức lớn:

```text
"dynamic programming" site:edu.vn OR site:github.com filetype:pdf intitle:optimization -course