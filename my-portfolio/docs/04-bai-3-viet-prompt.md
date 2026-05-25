---
title: "4. Nhiệm vụ 3: Viết Prompt hiệu quả"
sidebar_position: 4
---

# Kỹ nghệ Prompt (Prompt Engineering) và Cơ chế Hoạt động của AI

Trong nhiệm vụ này, tôi thực hiện tối ưu hóa câu lệnh tương tác với LLM thông qua việc chuyển đổi từ một Prompt ngây ngô sang một Prompt áp dụng kỹ thuật Prompt Engineering nâng cao.

## 1. Bảng so sánh hiệu năng Prompt

| Tiêu chí | Phiên bản Prompt ban đầu (Ngây ngô) | Phiên bản Prompt cải tiến (Nâng cao) |
| :--- | :--- | :--- |
| **Nội dung cấu trúc** | "Viết cho tao thuật toán Dijkstra bằng C++." | "Bạn là một Chuyên gia Thuật toán cao cấp. Hãy tối ưu mã nguồn thuật toán Dijkstra tìm đường đi ngắn nhất từ một đỉnh nguồn trên đồ thị có trọng số không âm sử dụng `std::priority_queue` trong C++. Định dạng đầu ra: Chỉ cung cấp khối mã nguồn chuẩn Google Coding Convention, tên biến kết quả đặt là `ans`. Thực hiện giải thích thuật toán từng bước theo cơ chế Chain-of-Thought trước khi xuất code." |
| **Kết quả đầu ra** | Trả về đoạn code chung chung, không tối ưu cấu trúc dữ liệu, sử dụng mảng kề thay vì danh sách kề, giải thích sơ sài. | Trả về cấu trúc code tối ưu với độ phức tạp thời gian `O((E + V) log V)`. Code sạch sẽ, tên biến chuẩn cấu trúc hạ tầng dữ liệu và tuân thủ định dạng yêu cầu một cách tuyệt đối. |

## 2. Phân tích sâu sắc về cơ chế hoạt động của mô hình AI
Sự khác biệt vượt trội của Prompt cải tiến nằm ở việc áp dụng ba kỹ thuật nền tảng:
* **Thiết lập vai trò (Role Assignment):** Ép mô hình thu hẹp vùng không gian vector xác suất (Probability vector space) của các từ tiếp theo (tokens), tập trung vào phân vùng dữ liệu chứa các thuật ngữ chuyên gia và mã nguồn chất lượng cao.
* **Cung cấp ràng buộc biên (Boundary Constraints):** Quy định cụ thể về thư viện (`std::priority_queue`), cấu trúc đồ thị (trọng số không âm), định dạng tên biến (`ans`), giúp triệt tiêu hiện tượng sinh từ ngẫu nhiên không kiểm soát.
* **Kích hoạt Chain-of-Thought (Chuỗi tư duy):** Bằng cách bắt AI giải thích từng bước trước khi viết code, ta ép mô hình phân bổ thêm tài nguyên tính toán vào các token trung gian. Điều này giúp giảm thiểu tối đa hiện tượng "ảo tưởng" (hallucination) thường gặp ở các mạng transformer lớn khi phải xử lý các tác vụ logic phức tạp một cách trực tiếp.