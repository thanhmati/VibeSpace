# Tài liệu Yêu cầu Sản phẩm (PRD): VibeSpace

## 1. Project Overview (Tổng quan dự án)
**VibeSpace** là một ứng dụng web (web application) cá nhân hóa, tối giản và có tính thẩm mỹ cao, được thiết kế để giúp user tập trung, học tập và thư giãn. Đây là một workspace không cần thiết lập (zero-setup): user có thể mở trang web và ngay lập tức sử dụng mọi tính năng mà không cần đăng ký hay đăng nhập tài khoản.

Mục tiêu là tạo ra một môi trường liền mạch (seamless), không gây xao nhãng, kết hợp giữa âm thanh (Lofi & White Noise), hình ảnh (background thư giãn) và các công cụ tối ưu năng suất (Pomodoro Timer & Daily Todo List).

---

## 2. Target Audience (Đối tượng mục tiêu)
- Học sinh, sinh viên cần môi trường học tập.
- Remote worker, developer và writer đang tìm kiếm một không gian làm việc tập trung (focus space).
- Bất kỳ ai đang tìm kiếm một dashboard đơn giản, thư giãn để quản lý công việc hàng ngày trong khi nghe các âm thanh ambient.

---

## 3. Product Principles (Nguyên tắc sản phẩm)
- **Instant Gratification (Trải nghiệm tức thì):** Không có rào cản đăng ký/đăng nhập. Tải trang (load) và sử dụng ngay lập tức.
- **Aesthetic Excellence (Thẩm mỹ vượt trội):** Giao diện người dùng (UI) theo phong cách Glassmorphism cao cấp, hiện đại với các hiệu ứng chuyển cảnh (transitions) mượt mà và hình ảnh được chọn lọc kỹ lưỡng.
- **Local-First (Ưu tiên lưu trữ cục bộ):** Tất cả tùy chọn của user, playlist tùy chỉnh và các todo item đều được lưu cục bộ trong trình duyệt của user (`localStorage`).
- **Simplicity (Sự tối giản):** Giảm thiểu sự lộn xộn của UI. Các control panel có thể tự động ẩn đi (fade out) hoặc dễ dàng bật/tắt (toggle) để user tập trung hoàn toàn vào công việc.

---

## 4. Feature Requirements (Yêu cầu tính năng)

### 4.1. YouTube Lofi Music Player (Trình phát nhạc YouTube Lofi)
- **Core Functionality (Tính năng cốt lõi):** Tích hợp trình phát nhạc YouTube sử dụng YouTube Iframe API.
- **Default Playlists (Playlist mặc định):** Hệ thống tự động chọn sẵn một danh sách các luồng livestream/playlist Lofi chất lượng cao (ví dụ: Lofi Girl, Chillhop, Cozy Coffee Shop).
- **Search & Customization (Tìm kiếm & Tùy biến):**
  - User có thể copy và paste trực tiếp bất kỳ URL Video hoặc Playlist nào từ YouTube để load và phát nhạc.
- **Controls (Bộ điều khiển):**
  - Play, Pause, Next, Previous track (nếu là playlist).
  - Điều chỉnh âm lượng (volume control) riêng biệt cho trình phát (độc lập với âm lượng hệ thống).
  - Bật/tắt hiển thị metadata của track (Title, Channel).

### 4.2. Ambient White Noise Mixer (Bộ trộn âm thanh nền Ambient)
- **Core Functionality (Tính năng cốt lõi):** Một panel dạng floating để phát và mix đồng thời nhiều vòng lặp âm thanh (sound loops).
- **Sound Catalog (Danh mục âm thanh - Tối thiểu 5 loại):**
  - Tiếng mưa rơi / Bão sấm sét (Rain / Thunderstorm)
  - Tiếng lửa trại tách bách (Crackling Campfire)
  - Tiếng gió / Gió thổi rừng thông (Wind / Forest Breeze)
  - Tiếng sóng biển / Bờ biển (Ocean Waves / Sea Shore)
  - Không gian quán cà phê (Coffee Shop Ambience)
- **Controls (Bộ điều khiển):**
  - Nút Master Mute/Unmute.
  - Bật/tắt (Toggle ON/OFF) cho từng loại âm thanh.
  - Thanh trượt âm lượng (volume slider) riêng cho từng âm thanh để user tự mix theo sở thích.
- **Audio Delivery (Phương thức truyền tải âm thanh):** Tải file từ các CDN trực tuyến tốc độ cao chứa các file ambient sound lặp (looping) miễn phí bản quyền để giữ cho mã nguồn (repository) siêu nhẹ.

### 4.3. Aesthetic Background Switcher (Bộ chuyển đổi ảnh nền thẩm mỹ)
- **Core Functionality (Tính năng cốt lõi):** Thay đổi vibe không gian làm việc bằng các hình nền chất lượng cao, đậm chất thư giãn.
- **Visual Options (Tùy chọn hình ảnh):**
  - Bộ sưu tập hình nền phong cảnh độ phân giải cao được chọn lọc (Rừng thông, Đại dương, Căn phòng ấm cúng, Núi non).
  - Hỗ trợ tải ảnh nền từ URL tùy chỉnh của user.
- **Visual Style (Phong cách hiển thị):** Lớp phủ (overlay) phong cách Glassmorphism với độ mờ (opacity) có thể tùy chỉnh.

### 4.4. Pomodoro Timer (Đồng hồ Pomodoro)
- **Core Functionality (Tính năng cốt lõi):** Trung tâm của Zen dashboard. Hiển thị đồng hồ đếm ngược kỹ thuật số trực quan.
- **Cycles (Chu kỳ hoạt động):**
  - Focus Session (Mặc định: 25 phút)
  - Short Break (Mặc định: 5 phút)
  - Long Break (Mặc định: 15 phút)
- **Controls (Bộ điều khiển):** Start, Pause, Reset, Skip.
- **Notifications (Thông báo):** Âm thanh chime nhẹ nhàng khi kết thúc một chu kỳ, kết hợp hiệu ứng nhấp nháy (flashing) tiêu đề tab trên trình duyệt.
- **Settings (Cài đặt):** Cho phép tùy chỉnh thời gian của Focus, Short Break và Long Break.

### 4.5. Daily Todo List (Danh sách công việc hàng ngày)
- **Core Functionality (Tính năng cốt lõi):** Một checklist công việc hàng ngày.
- **Interaction (Tương tác):** Add task, toggle completion (đánh dấu hoàn thành), delete.
- **Daily Reset Logic (Logic tự động reset theo ngày):**
  - Tự động xóa sạch/reset danh sách khi hệ thống phát hiện sang ngày mới dựa trên múi giờ địa phương (local timezone) của user khi họ mở hoặc reload trang web.

### 4.6. Zen Layout & Floating UI Widgets (Bố cục Zen & Các widget nổi)
- **Zen Focus Layout (Bố cục tập trung):** Theo mặc định, giao diện cực kỳ trống trải và sạch sẽ, chỉ hiển thị đồng hồ Pomodoro lớn ở chính giữa và hình nền thư giãn.
- **Floating Controls (Điều khiển dạng nổi):** Các widget phụ (Music Player, Sound Mixer, Todo List) được truy cập thông qua các nút floating action buttons (FABs) tối giản. Khi click vào một button sẽ mở ra một panel overlay mờ ảo dạng Glassmorphism để user thao tác.

---

## 5. Non-Functional Requirements (Yêu cầu phi chức năng)
- **Performance (Hiệu năng):** Thời gian tải trang ban đầu cực nhanh (LCP < 1.5 giây). Các luồng âm thanh phải được tối ưu hóa/nén để tải nhanh nhất.
- **Responsiveness (Giao diện đáp ứng):** Responsive tốt từ màn hình desktop cho đến màn hình mobile (mặc dù desktop là use-case chính).
- **Browser Compatibility (Độ tương thích trình duyệt):** Hoạt động tốt trên tất cả các trình duyệt hiện đại (Chrome, Safari, Firefox, Edge).
- **Reliability (Độ tin cậy):** Âm thanh phải loop mượt mà, không có khoảng dừng ngắt quãng dễ nhận thấy hoặc gây rò rỉ bộ nhớ (memory leaks).

---

## 6. Out of Scope (V1) (Nằm ngoài phạm vi phiên bản 1)
- Tài khoản người dùng (user accounts), đồng bộ hóa đám mây (cloud sync) và biểu đồ lịch sử làm việc.
- Không gian làm việc chung (collaborative workspaces - phòng học tập chung).
- Tích hợp trực tiếp Spotify/Apple Music (do giới hạn API và yêu cầu xác thực người dùng).
