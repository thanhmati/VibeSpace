# Design System: VibeSpace

## 1. Visual Theme & Atmosphere (Chủ đề trực quan & Không gian)
VibeSpace tuân theo phong cách **Minimalist Glassmorphism (Kính mờ tối giản)** với triết lý thiết kế **Zen Focus (Tập trung thiền định)**. Giao diện được thiết kế để ẩn mình vào nền, giảm thiểu tối đa các chi tiết thừa thãi để người dùng tập trung hoàn toàn vào công việc.

Các widget điều khiển xuất hiện dưới dạng các thẻ kính mờ ảo (glassmorphic cards) lơ lửng trên các ảnh nền thiên nhiên động/tĩnh, tạo cảm giác về chiều sâu không gian vô hạn (infinite depth). Khi không tương tác, các panel điều khiển sẽ tự động trượt ẩn hoặc có thể đóng hoàn toàn, chỉ để lại đồng hồ Pomodoro đếm giờ chạy êm ái ở trung tâm màn hình.

- **Mật độ hiển thị (Density):** Art Gallery Airy (Mức 3/10) - Không gian thoáng đãng, cực kỳ nhiều khoảng trống để tăng sự thư giãn thị giác.
- **Độ biến động layout (Variance):** Centered Zen Layout (Mức 2/10) - Cấu trúc đối xứng hoàn hảo quanh tâm (Pomodoro) để tạo cảm giác cân bằng, tĩnh tại.
- **Chuyển động (Motion):** Fluid CSS Spring (Mức 6/10) - Các chuyển động xuất hiện/thu nhỏ của panel trượt sử dụng hiệu ứng đàn hồi (spring physics) đầm tay, mượt mà.

---

## 2. Color Palette & Roles (Bảng màu & Vai trò)
Hệ thống sử dụng tông màu tối nocturne làm nền tảng, kết hợp với một accent màu xanh bạc hà (Mint/Teal) dịu nhẹ để làm điểm nhấn chức năng.

- **Canvas Base (Nền tối):** `#090d10` (Màu lam tối đen, dùng làm lớp nền cơ sở dưới các ảnh phong cảnh).
- **Glass Surface (Bề mặt kính):** `rgba(15, 23, 42, 0.45)` (Nền thẻ mờ đục với `backdrop-filter: blur(24px) saturate(180%)`).
- **Glow Accent (Điểm nhấn):** `#4ade80` (Màu xanh Mint tươi mát, dùng cho trạng thái active, thanh chạy Pomodoro và điểm nhấn quan trọng).
- **Text Primary (Chữ chính):** `#f8fafc` (Slate-50, dùng cho các tiêu đề, chữ nổi bật trên nền tối).
- **Text Secondary (Chữ phụ):** `#94a3b8` (Slate-400, dùng cho metadata, mô tả phụ, nhãn đơn vị).
- **Whisper Border (Đường viền mờ):** `rgba(255, 255, 255, 0.08)` (Đường viền 1px bao quanh các thẻ kính để định hình khối mà không gây cứng nhắc).
- **Active Glow Shadow:** `rgba(74, 222, 128, 0.15)` (Hiệu ứng phát sáng nhẹ xung quanh các thành phần đang hoạt động).

*Lưu ý nghiêm ngặt:* Bấm cấm hoàn toàn màu tím/xanh neon phát sáng chói lọi (Cyberpunk style) để tránh làm mỏi mắt khi sử dụng trong thời gian dài.

---

## 3. Typography Rules (Quy tắc Font chữ)
- **Display & UI Headings:** `Outfit` - Phông chữ Sans-Serif hiện đại, bo tròn nhẹ nhàng, tạo cảm giác thân thiện và cao cấp.
- **Pomodoro Digital Clock:** `JetBrains Mono` - Phông chữ Monospace giúp các chữ số đếm ngược không bị dịch chuyển vị trí (layout shift) khi thay đổi số giây từ `9` về `0`.
- **Body Text:** `Outfit` - Căn chỉnh khoảng cách dòng (leading) thoáng rộng, độ dài tối đa mỗi dòng không quá 60 ký tự để dễ đọc.
- **Bị cấm:** Hoàn toàn cấm sử dụng font `Inter` (quá phổ thông) và các font Serif cổ điển (`Times New Roman`, `Georgia`) trong giao diện ứng dụng.

---

## 4. Component Stylings (Định dạng Component)

### 4.1. Buttons & Interactive Elements (Nút & Thành phần tương tác)
- **Floating Action Buttons (FABs):** Thiết kế dạng hình tròn hoàn toàn, kích thước chuẩn 48px x 48px để đảm bảo touch target tốt. Sử dụng nền glass mờ, khi hover sẽ chuyển màu nền sáng hơn và có hiệu ứng glow nhẹ ở đường viền.
- **Primary Buttons:** Nút có nền đặc màu Accent `#4ade80`, chữ đen tối `#090d10` đậm. Khi click, nút thụt xuống 1px (`active:translate-y-[1px]`) để tạo phản hồi vật lý chân thực.
- **Volume Sliders / Progress Bars:** Đường chạy mờ, phần đã chạy có màu Accent. Nút kéo (thumb) dạng tròn nhỏ chỉ xuất hiện khi hover vào thanh trượt để tránh xao nhãng thị giác.

### 4.2. Glassmorphic Panels (Các bảng điều khiển nổi)
- Tất cả các panel phụ (Music Player, Audio Mixer, Todo) đều sử dụng thuộc tính:
  ```css
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.25rem (20px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  ```
- Không sử dụng góc vuông sắc nhọn. Đường bo góc chuẩn là `20px` (`rounded-2xl`).

### 4.3. Inputs / Text Fields (Trường nhập dữ liệu)
- Nhãn (label) luôn nằm phía trên input.
- Input sử dụng nền tối mờ `rgba(0, 0, 0, 0.3)` với viền mỏng. Khi focus, viền chuyển sang màu Accent `#4ade80` kèm hiệu ứng glow mờ.

### 4.4. Pomodoro Clock Display (Màn hình đếm giờ)
- Hiển thị chữ số đếm ngược kích thước lớn (`text-6xl` hoặc `text-7xl`) sử dụng `JetBrains Mono`.
- Có một đường tròn tiến độ (radial SVG progress ring) bao quanh chữ số để biểu thị trực quan lượng thời gian đã trôi qua.

---

## 5. Layout & Spacing Principles (Nguyên tắc bố cục & Khoảng cách)
- **Bố cục màn hình:** Định vị tuyệt đối ở trung tâm (absolute center) cho Pomodoro Timer. Các Floating Action Buttons điều khiển nằm ở khu vực phía dưới màn hình (bottom center).
- **Tránh xếp chồng chồng chéo:** Các panel trượt lên từ phía dưới hoặc từ bên cạnh phải chiếm các không gian riêng biệt, không đè lên các nút điều khiển chính.
- **Container Constraints:** Các widget nổi có độ rộng cố định tối đa (ví dụ: Music widget rộng `360px`, Todo widget rộng `400px`) để duy trì tính gọn gàng.
- **Responsive:** Trên các thiết bị di động (`< 768px`), Pomodoro timer sẽ tự động thu nhỏ kích thước chữ số; các panel nổi khi mở ra sẽ hiển thị ở dạng drawer trượt lên toàn màn hình từ cạnh dưới đáy (bottom sheet) để dễ thao tác bằng một tay.

---

## 6. Motion & Animation (Chuyển động & Hiệu ứng)
- **Spring Physics:** Hiệu ứng đóng mở các drawer/panel sử dụng lò xo CSS (Spring) để tạo cảm giác cơ học cao cấp:
  - Transition mặc định: `all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)`.
- **Perpetual Micro-Interactions (Hoạt họa lặp nhẹ nhàng):**
  - **Trạng thái đếm giờ:** Đường viền tròn Pomodoro có hiệu ứng thở nhẹ (breathing pulse: phóng to thu nhỏ cực chậm ~1.02x trong 4 giây).
  - **Trạng thái phát nhạc:** Hiển thị 3-4 cột sóng âm nhỏ nhảy đều đặn (audio visualizer bars animation) bên cạnh nút nhạc để báo hiệu đang phát nhạc.

---

## 7. Anti-Patterns (Các hành vi bị cấm - AI Tells)
- KHÔNG sử dụng emoji trong UI text.
- KHÔNG sử dụng màu đen tuyệt đối (`#000000`) cho bề mặt các panel.
- KHÔNG tạo hiệu ứng viền bóng phát sáng chói (neon shadows) vượt quá 10px.
- KHÔNG sử dụng các hình ảnh background bị vỡ hạt, chất lượng thấp.
- KHÔNG tạo bố cục cột cố định cứng nhắc trên màn hình chính của chế độ Zen Focus.
