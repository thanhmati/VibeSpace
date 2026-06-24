# Kế hoạch Dự án: VibeSpace

## Overview (Tổng quan)
Kế hoạch này phác thảo lộ trình (timeline), các cột mốc (milestones) và các bước phát triển để xây dựng VibeSpace từ con số 0. Quy trình tuân thủ nghiêm ngặt theo luồng công việc mà user yêu cầu:
**Planning** $\rightarrow$ **Design (Google Stitch)** $\rightarrow$ **Coding (React + CSS Components)**.

---

## Roadmap & Milestones (Lộ trình & Các cột mốc)

### Milestone 1: Planning (Giai đoạn hiện tại)
- [x] Tạo tài liệu Product Requirements Document ([PRD.md](file:///Users/tanthanh/Documents/Project/vibe-space/docs/PRD.md)).
- [x] Định nghĩa kiến trúc kỹ thuật ([TECH_ARCHITECTURE.md](file:///Users/tanthanh/Documents/Project/vibe-space/docs/TECH_ARCHITECTURE.md)).
- [x] Thiết lập kế hoạch dự án ([PLAN.md](file:///Users/tanthanh/Documents/Project/vibe-space/docs/PLAN.md)).
- [ ] Thống nhất với User về các lựa chọn và yêu cầu chính (thông qua session `/grill-me` hiện tại).

### Milestone 2: Design Phase (Thiết kế trên Google Stitch)
- [x] Tạo một Stitch project mới: `VibeSpace` (ID: `5942734363798515577`).
- [x] Thiết lập file token cho Design System ([design_system.md](file:///Users/tanthanh/Documents/Project/vibe-space/docs/design_system.md)) chứa bảng màu (dark mode, các biến glassmorphic, typography, thông số styling cho các component) (Stitch Asset ID: `eb37f2ef7dd641d9b216d9cb69a640d4`).
- [x] Tạo các bản vẽ UI mockups và các biến thể (variants) cho màn hình VibeSpace trên Google Stitch:
  - **Screen 1:** Focus Board (Dashboard chính, ID: `0cae0fea5b914313bcb3742b95fc663c`).
  - **Screen 2:** Collapsed Workspace Mode (Chế độ tối giản siêu sạch, ID: `8d8ae15942894609bceeb82e42c569bd`).
- [x] Thiết kế chi tiết các Component / Popups tương tác cụ thể:
  - **Component 1 (Lofi Music Panel):** Giao diện chọn bài nhạc & nhập URL phát nhạc (ID: `61586832d28a45a3ac8d4b1a95c7bb2e`).
  - **Component 2 (Ambient Mixer Panel):** Bộ trộn âm thanh nền có thanh trượt kéo volume độc lập (ID: `39f2b7f0279244e0ab65345b70e6768a`).
  - **Component 3 (Todo List Panel):** Thẻ checklist hiển thị tiến độ % và chức năng Add Task (ID: `cf5d5e4a1d4a40a689b44db03b974d80`).
  - **Component 4 (Background Switcher Panel):** Bộ đổi ảnh nền và chỉnh độ mờ đục card (ID: `ed178fc6296340eda145bf05f0b021ee`).
- [x] Lấy feedback của user để cải tiến thiết kế trên Stitch (Đã chốt phong cách Glassmorphism Zen Focus và hoàn thiện chi tiết các thành phần).


### Milestone 3: Project Setup & Core Styles (Thiết lập dự án & CSS lõi)
- [x] Khởi tạo (scaffold) ứng dụng React sử dụng Vite và TypeScript.
- [x] Triển khai các CSS căn bản trong `index.css` (định nghĩa các CSS variables cho ảnh nền, tỷ lệ font chữ, hiệu ứng mờ kính glassmorphic panel và layout cho trạng thái focus).
- [x] Cài đặt các package cơ bản (ví dụ: `lucide-react` làm thư viện icon chính).

### Milestone 4: Widget Implementation (Hiện thực hóa các Widget - Coding)
- [ ] **Background Switcher Module:** Lập danh sách các ảnh phong cảnh mặc định, xử lý logic chọn ảnh, nhập URL tùy chỉnh và đồng bộ hóa với localStorage.
- [ ] **Pomodoro Timer Module:** Viết custom hook timer chính xác (có cơ chế hiệu chỉnh sai số khi tab chạy ẩn), cho phép cấu hình thời gian linh hoạt, phát chime khi hoàn thành chu kỳ, và vẽ vòng tròn countdown SVG đồng tâm.
- [ ] **YouTube Lofi Player Module:** Xử lý việc load async script YouTube iframe player, quản lý trạng thái play/pause, volume control, và input dán link nhạc.
- [ ] **White Noise Mixer Module:** Điều khiển phát đa kênh các file âm thanh HTML5 loop từ các CDN với thanh trượt chỉnh volume độc lập cho từng kênh.
- [ ] **Daily Todo List Module:** Quản lý CRUD các tác vụ hàng ngày, đi kèm logic tự động dọn dẹp và reset danh sách dựa vào việc so sánh ngày hiện tại với timestamp cũ.

### Milestone 5: Integration & Polish (Tích hợp & Tối ưu)
- [ ] Lắp ráp các widget riêng lẻ vào dashboard theo dạng grid linh hoạt, responsive tốt.
- [ ] Tạo các hiệu ứng transition (fade-in, slide-out cho panel nổi khi đóng mở).
- [ ] Test ứng dụng trên nhiều kích thước màn hình (Mobile, Tablet, Desktop viewports).
- [ ] Tối ưu hóa cuối cùng: kiểm tra nén file audio và thiết lập cơ chế lazy loading.

---

## Detailed Task Breakdown (Chi tiết công việc - Coding Phase)

| Task ID | Description (Mô tả công việc) | Estimated Effort (Ước lượng thời gian) |
| :--- | :--- | :--- |
| **CODE-01** | Khởi tạo dự án Vite React TS và dọn dẹp các file boilerplate thừa | 1 hr |
| **CODE-02** | Xây dựng baseline styling và định nghĩa CSS variables (Glassmorphism theme) | 1.5 hrs |
| **CODE-03** | Phát triển Pomodoro widget (Precision timers & vẽ đường viền SVG tròn) | 2 hrs |
| **CODE-04** | Phát triển Ambient audio mixer (preload, loop, quản lý volume đa kênh) | 2 hrs |
| **CODE-05** | Phát triển Lofi Player (YouTube API, dán link & volume controls) | 2.5 hrs |
| **CODE-06** | Phát triển Daily Todo List (lưu localStorage, layout mờ, reset ngày mới) | 1.5 hrs |
| **CODE-07** | Tích hợp giao diện Dashboard, xử lý cơ chế floating panel trượt | 2 hrs |
| **CODE-08** | Hiệu ứng phản hồi thị giác và tương tác nhỏ (hover effect, custom scrollbars) | 1.5 hrs |
| **CODE-09** | Verification (Kiểm thử chức năng) & kiểm tra tương thích đa trình duyệt | 1 hr |
