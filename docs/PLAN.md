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
- [x] Thống nhất với User về các lựa chọn và yêu cầu chính (thông qua session `/grill-me` hiện tại).

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

### Milestone 4: Widget Implementation & Design Alignment (Hiện thực hóa & Đồng bộ thiết kế)

#### Phase 1: Convert Stitch Design to Code (Chuyển đổi thiết kế Google Stitch thành mã nguồn)
- [x] Tải xuống các tài nguyên thiết kế từ Google Stitch bao gồm các màn hình HTML và tệp mockups PNG lưu trữ trong thư mục `.stitch/designs/` để phân tích trực quan.
- [x] Phân tích cấu trúc giao diện HTML tĩnh và hệ thống tokens màu sắc, kiểu dáng (glassmorphism, layout) từ Google Stitch.
- [x] Chuyển đổi cấu trúc HTML tĩnh thành các React Component TypeScript tương ứng.
- [x] Thiết lập hệ thống style tokens và các class dùng chung (preset-grid-stitch, preset-thumb-btn-stitch...) bằng Vanilla CSS trong `index.css` để bảo đảm độ chính xác giao diện 100%.
- [x] Đồng nhất hoàn toàn giao diện của các component với Google Stitch:
  - **Background Switcher Panel:** Căn chỉnh lưới ảnh preset, thiết kế vùng nhập URL tùy biến xếp dọc linh hoạt, vẽ các lớp phủ mờ tối trên ảnh và căn giữa chính xác icon checkmark khi ảnh được chọn.
  - **Lofi Music Panel:** Thiết kế lại cụm nút điều khiển phát nhạc (Play/Pause, Skip), bỏ slider volume trùng lặp, thêm danh sách kênh kèm dấu tròn trạng thái hoạt động động, và dựng thanh visualizer hoạt cảnh 3 cột sóng động.
  - **Ambient Mixer Panel:** Định hình kích thước chuẩn 400px với viền bo tròn 20px, tối ưu hóa thanh trượt âm lượng với dải màu gradient đầy thanh, cấu hình nút Master Mute dạng toggle switch lớn, và map các biểu tượng Lucide tương thích từng sound track.
  - **Todo List Panel & Pomodoro Widget:** Đồng bộ hóa form input, button, biểu đồ SVG vòng tròn đếm ngược với phong cách Glassmorphism Zen của Google Stitch.
- [x] Khắc phục các lỗi về vỡ bố cục trên Mobile/Tablet bằng cách chuyển đổi Responsive Layout (sử dụng Drawer ở Mobile và Absolute Position ở Desktop).
- [x] Giải quyết cảnh báo (warning) và lỗi phân tích SVG trong developer console do lỗi cú pháp gốc của icon `Leaf` (thay thế bằng icon `Sprout` từ `lucide-react`).

#### Phase 2: Functionality & Third-Party Integration (Hiện thực hóa logic API và Tích hợp bên thứ ba)
- [x] **Background Switcher Logic:** Cấu hình danh sách ảnh nền mặc định, thiết lập lưu ảnh được chọn/URL ảnh tùy biến vào `localStorage` để tự động khôi phục khi load lại trang.
- [x] **Pomodoro Timer Precision Hooks:** Xây dựng hook đếm ngược chính xác cao vượt qua cơ chế background throttling của trình duyệt khi chạy ẩn tab, hỗ trợ cấu hình tùy biến thời gian các chu kỳ, phát âm thanh chime báo hiệu (sử dụng giải pháp tổng hợp tần số Web Audio API để tránh lỗi Access Denied và CORS từ link ngoài) và nhấp nháy tab browser.
- [x] **YouTube Lofi Player Integration:** Tích hợp YouTube Iframe Player API bất đồng bộ, quản lý play/pause/skip, dán link tùy chỉnh.
  - **[FIX]** Error handling cho YouTube error codes (100/101/150), loading/unavailable state UI, auto-play khi đổi stream.
  - **[FIX]** Volume slider + mute toggle UI.
  - **[FIX]** YouTube thumbnail tự động (`img.youtube.com`) + Unsplash fallback ngẫu nhiên nếu không tải được.
  - **[FIX]** Validation video qua `noembed.com` API trước khi load — trạng thái checking/valid/invalid rõ ràng.
  - **[FIX]** `durationKnown` flag để phân biệt "đang chờ load duration" vs "video là live stream thực" — tránh hiển thị `● LIVE` sai cho regular video.
  - **[FIX]** Kiến trúc Always-mount: `LofiPlayer` luôn mounted trong DOM, chỉ ẩn bằng CSS — nhạc không tắt khi đóng panel hoặc mở widget khác.
  - **[FIX]** Mở rộng danh sách curated streams từ 3 lên 6 với Video IDs đáng tin cậy hơn.
- [x] **Ambient Sound Mixer Engine:** Nạp đa kênh và lặp vô hạn các tệp âm thanh HTML5 từ CDN công cộng, hỗ trợ điều chỉnh volume riêng biệt từng track và nút Master Mute nhanh.
  - **[FIX]** Kiến trúc Always-mount: `AmbientMixer` luôn mounted — white noise không tắt khi đóng panel.
- [x] **Daily Todo List CRUD:** Xây dựng quản lý tác vụ (thêm, xóa, check hoàn thành), tính toán tiến trình % hoàn thành trực quan, và lập logic tự động xóa danh sách khi phát hiện chuyển sang ngày mới.

#### Phase 3: Architecture Refactor — Persistent Audio State
- [x] **WorkspaceContext refactor:** Tách `activePanel` thành `musicPanelOpen` (boolean) + `mixerPanelOpen` (boolean) độc lập nhau. Cho phép Music và Ambient Mixer mở đồng thời mà không đóng nhau.
- [x] **Multi-panel support:** Music panel và Mixer panel có thể mở song song cùng lúc. Todo/Background vẫn exclusive với nhau nhưng không ảnh hưởng tới audio.
- [x] **utils/youtube.ts mở rộng:** Thêm `getYouTubeThumbnail()`, `getRandomFallbackImage()`, `validateYouTubeVideo()` (noembed.com, không cần API key). Sửa regex playlist để lọc Mix/Watch Later tự động.

### Milestone 5: Integration & Polish (Tích hợp & Tối ưu)
- [x] Lắp ráp các widget riêng lẻ vào dashboard theo dạng grid linh hoạt, responsive tốt.
- [x] Tạo các hiệu ứng transition (fade-in, slide-out cho panel nổi khi đóng mở).
- [x] Test ứng dụng trên nhiều kích thước màn hình (Mobile, Tablet, Desktop viewports).
- [x] Chạy thử nghiệm và khắc phục hoàn toàn lỗi hiển thị vỡ UI trên môi trường phát triển cục bộ (`http://localhost:5175/`).
- [ ] Tối ưu hóa cuối cùng: kiểm tra nén file audio và thiết lập cơ chế lazy loading.

---

## Detailed Task Breakdown (Chi tiết công việc - Coding Phase)

| Task ID | Description (Mô tả công việc) | Estimated Effort (Ước lượng thời gian) |
| :--- | :--- | :--- |
| **STITCH-01** | Tải tài nguyên màn hình thiết kế (HTML/PNG) từ Google Stitch về dự án | 0.5 hr |
| **STITCH-02** | Phân tích cấu trúc layout, màu sắc và CSS tokens từ thiết kế Google Stitch | 1 hr |
| **STITCH-03** | Chuyển đổi cấu trúc HTML tĩnh sang các React TS components và style class CSS | 2.5 hrs |
| **CODE-01** | Khởi tạo dự án Vite React TS và dọn dẹp các file boilerplate thừa | 1 hr |
| **CODE-02** | Xây dựng baseline styling và định nghĩa CSS variables (Glassmorphism theme) | 1.5 hrs |
| **CODE-03** | Phát triển Pomodoro widget (Precision timers & vẽ đường viền SVG tròn) | 2 hrs |
| **CODE-04** | Phát triển Ambient audio mixer (preload, loop, quản lý volume đa kênh) | 2 hrs |
| **CODE-05** | Phát triển Lofi Player (YouTube API, dán link & volume controls) | 2.5 hrs |
| **CODE-06** | Phát triển Daily Todo List (lưu localStorage, layout mờ, reset ngày mới) | 1.5 hrs |
| **CODE-07** | Tích hợp giao diện Dashboard, xử lý cơ chế floating panel trượt | 2 hrs |
| **CODE-08** | Hiệu ứng phản hồi thị giác và tương tác nhỏ (hover effect, custom scrollbars) | 1.5 hrs |
| **CODE-09** | Verification (Kiểm thử chức năng) & kiểm tra tương thích đa trình duyệt | 1 hr |
| **FIX-01** | Đồng bộ giao diện 100% theo thiết kế Stitch và sửa lỗi console, vỡ layout | 3 hrs |
| **FIX-02** | Fix Music feature: error handling, volume UI, thumbnail, video validation | 1.5 hrs |
| **FIX-03** | Fix LIVE duration bug: `durationKnown` flag để tránh nhầm regular video thành live | 0.5 hr |
| **FIX-04** | Refactor kiến trúc: Always-mount audio panels, persistent playback state | 1 hr |
