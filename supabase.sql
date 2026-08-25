-- ==============================================================================
-- FILE CÀI ĐẶT DATABASE CHO DỰ ÁN HAPPY BIRTHDAY
-- Copy toàn bộ nội dung file này và chạy trong mục SQL Editor của Supabase
-- ==============================================================================

-- 1. TẠO BẢNG 'wishes'
-- Bảng này lưu trữ lời chúc với các cột: id, ngày tạo, tên người gửi, lời nhắn, và link ảnh (nếu có)
CREATE TABLE IF NOT EXISTS public.wishes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    author TEXT NOT NULL,
    message TEXT NOT NULL,
    image_url TEXT,
    is_hidden BOOLEAN DEFAULT false -- Cột dùng cho trang Admin (ẩn lời chúc)
);

-- Bật tính năng bảo mật Row Level Security (RLS) cho bảng wishes
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

-- Tạo Policy cho phép BẤT KỲ AI cũng có thể XEM (SELECT) lời chúc
DROP POLICY IF EXISTS "Cho phép mọi người xem lời chúc" ON public.wishes;
CREATE POLICY "Cho phép mọi người xem lời chúc" 
ON public.wishes FOR SELECT 
USING (true);

-- Tạo Policy cho phép BẤT KỲ AI cũng có thể THÊM (INSERT) lời chúc mới
DROP POLICY IF EXISTS "Cho phép mọi người gửi lời chúc" ON public.wishes;
CREATE POLICY "Cho phép mọi người gửi lời chúc" 
ON public.wishes FOR INSERT 
WITH CHECK (true);


-- ==============================================================================
-- 2. TẠO STORAGE BUCKET 'wishes_images'
-- Đây là nơi lưu trữ các hình ảnh người dùng upload lên
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('wishes_images', 'wishes_images', true)
ON CONFLICT (id) DO NOTHING;

-- Bật RLS cho Storage
DROP POLICY IF EXISTS "Cho phép mọi người xem ảnh" ON storage.objects;
CREATE POLICY "Cho phép mọi người xem ảnh" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'wishes_images');

DROP POLICY IF EXISTS "Cho phép mọi người upload ảnh" ON storage.objects;
CREATE POLICY "Cho phép mọi người upload ảnh" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'wishes_images');
