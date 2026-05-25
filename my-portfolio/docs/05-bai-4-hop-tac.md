---
title: "5. Nhiệm vụ 4: Hợp tác trực tuyến"
sidebar_position: 5
---

# Tối ưu hóa quy trình cộng tác trực tuyến thông qua công cụ quản trị

Phối hợp làm việc nhóm trực tuyến đòi hỏi tính minh bạch và khả năng theo dõi tiến độ theo thời gian thực (Real-time tracking) để giảm thiểu chi phí giao tiếp (Communication overhead). Tôi đã tích hợp hệ thống quản trị Kanban thông qua **GitHub Projects**.

## 1. Các tính năng nâng cao được áp dụng
* **Phân rã tác vụ (Task Breakdown):** Mỗi nhiệm vụ lớn được chia nhỏ thành các Issue cụ thể, gắn nhãn (Labels) phân loại độ ưu tiên (`High`, `Medium`, `Low`) và loại công việc (`Bug`, `Feature`, `Documentation`).
* **Ràng buộc trách nhiệm (Accountability):** Sử dụng tính năng `Assignees` để định danh chính xác cá nhân chịu trách nhiệm cho từng khối lượng công việc, loại bỏ hoàn toàn sự chồng chéo hoặc bỏ sót nhiệm vụ.
* **Tự động hóa luồng công việc (Workflow Automation):** Thiết lập trigger tự động chuyển trạng thái thẻ: Khi một Pull Request được tạo trên GitHub, thẻ tác vụ tương ứng sẽ tự động chuyển từ trạng thái `In Progress` sang `Review / QA`, và tự động chuyển về `Done` khi mã nguồn được merge thành công vào nhánh `main`.

## 2. Mô tả quy trình làm việc nhóm tối ưu
Quy trình phối hợp được chuẩn hóa qua 4 bước khép kín:
1. **Lập kế hoạch (Sprint Planning):** Họp trực tuyến ngắn để thống nhất các đầu việc, đưa toàn bộ vào cột `Todo`.
2. **Thực thi phân nhánh (Branching Strategy):** Thành viên kéo task về cột `In Progress`, tạo nhánh Git riêng biệt, tuyệt đối không code trực tiếp trên nhánh `main`.
3. **Đánh giá chéo (Code Review):** Khi hoàn thành, đẩy PR lên cột `Review`. Các thành viên khác tiến hành kiểm thử chéo và nhận xét trực tiếp trên dòng code.
4. **Tích hợp liên tục (CI):** Sau khi được duyệt, code được tích hợp vào hệ thống, Vercel tự động bắt sự kiện và deploy bản build mới nhất lên môi trường production.