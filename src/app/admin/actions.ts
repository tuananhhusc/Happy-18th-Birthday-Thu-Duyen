'use server';

import { createClient } from '@supabase/supabase-js';

// Khởi tạo Supabase client dùng Service Role Key (để có quyền xóa/sửa)
// Nếu người dùng không cài đặt SERVICE_ROLE_KEY, sẽ fallback dùng ANON_KEY (cần config RLS)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

// Đọc mật khẩu từ biến môi trường
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '123456';

export async function deleteWishAction(id: string, password: string) {
  if (password !== ADMIN_PASSWORD) {
    return { success: false, message: 'Sai mật khẩu admin!' };
  }

  try {
    const { error } = await supabaseAdmin
      .from('wishes')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Delete error:', error);
    return { success: false, message: error.message };
  }
}

export async function toggleWishVisibilityAction(id: string, is_hidden: boolean, password: string) {
  if (password !== ADMIN_PASSWORD) {
    return { success: false, message: 'Sai mật khẩu admin!' };
  }

  try {
    const { error } = await supabaseAdmin
      .from('wishes')
      .update({ is_hidden })
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Update error:', error);
    return { success: false, message: error.message };
  }
}
