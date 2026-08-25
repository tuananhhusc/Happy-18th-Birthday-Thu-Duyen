# 🚨 Cảnh Báo: Chị Tôi Già Thêm 1 Tuổi! 🚨

Một dự án trang web chúc mừng sinh nhật (kiêm "dìm hàng" và bóc phốt) mang phong cách **Neo-brutalism** cực kỳ hài hước, sinh động và độc đáo dành tặng người chị gái. 

Được xây dựng với Next.js 14, Tailwind v4 và Supabase, dự án này không chỉ là một trang tĩnh mà còn là một ứng dụng full-stack với tính năng Tường tương tác, Mini-game và rất nhiều Easter Eggs ẩn.

---

## ✨ Tính Năng Nổi Bật (Features)

*   💻 **Fake Hacking Loading Screen:** Màn hình mô phỏng dòng lệnh terminal "xâm nhập não bộ" cực ngầu trước khi vỡ oà vào trang chủ.
*   🎨 **Giao diện Neo-brutalism:** Sử dụng các màu sắc rực rỡ, viền đen dày, bóng đổ lệch (offset shadows) mang lại phong cách Tabloid giật gân, siêu nổi bật.
*   🎵 **Trình Phát Nhạc Nền (BGM):** Tích hợp nút phát/tạm dừng nhạc nền quẩy sinh nhật siêu cháy.
*   📜 **Thanh Marquee Kịch Tính:** Dòng chữ chạy ngang đan xen những lời khen thảo mai và những lời bóc phốt xát muối.
*   🎮 **Mini-Game "Góc Bóc Phốt":** Quiz 16 câu hỏi trắc nghiệm đo độ hiểu chị gái. 
    * Trả lời sai bị chửi thẳng mặt kèm âm thanh báo lỗi.
    * Trả lời đúng 16/16 sẽ mở khóa Kho Ảnh Dìm Hàng Tuyệt Mật.
    * Tích hợp Web Share API để khoe điểm số lên Facebook.
*   🧱 **Bức Tường Dìm Hàng (Guestbook SSR):** 
    * Hiển thị lời chúc dưới dạng lưới Masonry đa sắc màu (Server-Side Rendering).
    * Upload ảnh dìm hàng lên **Supabase Storage**.
    * Nút **Thả Cảm Xúc** (👍, ❤️, 😂, 😮, 😢, 😡) y hệt Facebook.
*   🕵️ **Chế Độ Admin Ẩn (Easter Egg):** Nhấn liên tục 6 lần vào tiêu đề "BỨC TƯỜNG DÌM HÀNG" để kích hoạt nút Xóa (Trash) dành cho Admin.
*   🌊 **Hộp Thư Sến Súa (Easter Egg):** Một dấu chấm `.` siêu nhỏ ở góc màn hình mở ra thông điệp chân thành, cảm động mang vibe Biển cả.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

*   **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Components).
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Inline Theme).
*   **Animations:** [Framer Motion](https://www.framer.com/motion/), CSS Animations.
*   **Database & Storage:** [Supabase](https://supabase.com/).
*   **UI Components & Icons:** [Lucide React](https://lucide.dev/), [Sonner](https://sonner.emilkowal.ski/) (Toasts), Canvas-Confetti.

---

## 🚀 Hướng Dẫn Cài Đặt (Installation)

### Bước 1: Clone dự án và cài thư viện
```bash
git clone <your-repo-url>
cd happy-birthday
npm install
```

### Bước 2: Thiết lập Supabase (Database)
Tạo một dự án trên Supabase, sau đó vào phần **SQL Editor** và chạy đoạn mã sau để tạo bảng dữ liệu:

```sql
-- 1. Tạo bảng wishes
CREATE TABLE wishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author TEXT NOT NULL,
  message TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  react_like INTEGER DEFAULT 0,
  react_love INTEGER DEFAULT 0,
  react_haha INTEGER DEFAULT 0,
  react_wow INTEGER DEFAULT 0,
  react_sad INTEGER DEFAULT 0,
  react_angry INTEGER DEFAULT 0
);

-- 2. Cho phép Public truy cập bảng (Tắt RLS hoặc tạo Policy cho phép Insert/Select/Update/Delete public)
ALTER TABLE wishes DISABLE ROW LEVEL SECURITY; 
```

### Bước 3: Thiết lập Supabase (Storage)
Vào phần **Storage** trên Supabase:
1. Tạo một bucket mới tên là `wishes_images`.
2. Đánh dấu bucket này là **Public**.
3. Cấu hình Policies cho phép người dùng ẩn danh (anon) được quyền `INSERT` và `SELECT`.

### Bước 4: Khai báo Biến Môi Trường
Tạo file `.env.local` ở thư mục gốc của dự án và thêm key Supabase của bạn vào:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

### Bước 5: Chạy dự án
```bash
npm run dev
```
Truy cập `http://localhost:3000` để xem kết quả.

---

## 🎨 Tùy Biến Thêm (Customization)
*   **Đổi Ảnh:** Thay thế các file ảnh trong thư mục `public/` (VD: `anh-trang-chu.jpg`, `anh-dim-may-bay.jpg`).
*   **Đổi Nhạc Nền:** Thay thế file `public/background-music.mp3` bằng bài hát yêu thích.
*   **Thay Đổi Câu Hỏi Quiz:** Vào `src/components/Quiz.tsx`, tìm mảng `QUESTIONS` để tự do tùy biến câu hỏi.

---
*Made with ❤️, 🤡, and lots of 💩 for the best sister!*
