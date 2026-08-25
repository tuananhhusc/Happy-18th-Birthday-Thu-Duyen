'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { deleteWishAction, toggleWishVisibilityAction } from './actions';

type Wish = {
  id: string;
  author: string;
  message: string;
  image_url: string | null;
  created_at: string;
  is_hidden: boolean;
};

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      setIsAuthenticated(true);
      // Wait a tick for state to update, then fetch
      setTimeout(() => fetchWishes(), 0);
    }
  };

  const fetchWishes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Lỗi khi tải danh sách: ' + error.message);
    } else {
      setWishes(data || []);
    }
    setLoading(false);
  };

  const handleToggleHide = async (id: string, currentStatus: boolean) => {
    const res = await toggleWishVisibilityAction(id, !currentStatus, password);
    if (res.success) {
      toast.success(currentStatus ? 'Đã cho phép hiển thị lại!' : 'Đã ẩn lời chúc!');
      fetchWishes(); // Tải lại danh sách
    } else {
      toast.error(res.message || 'Có lỗi xảy ra!');
      if (res.message === 'Sai mật khẩu admin!') setIsAuthenticated(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa vĩnh viễn lời chúc này?')) return;
    
    const res = await deleteWishAction(id, password);
    if (res.success) {
      toast.success('Đã xóa thành công!');
      fetchWishes();
    } else {
      toast.error(res.message || 'Có lỗi xảy ra!');
      if (res.message === 'Sai mật khẩu admin!') setIsAuthenticated(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 border-8 border-tabloid-red max-w-md w-full shadow-[12px_12px_0_0_#ff107a]">
          <h1 className="text-3xl font-black mb-6 uppercase text-center">Khu Vực Tuyệt Mật 🚫</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu admin..."
            className="w-full border-4 border-black p-3 mb-6 text-xl focus:bg-bright-yellow outline-none"
            required
          />
          <button type="submit" className="w-full bg-black text-white font-black text-xl py-3 border-4 border-black hover:bg-neon-pink transition-colors">
            ĐĂNG NHẬP
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffe4e6] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-black text-white p-4 rotate-1 shadow-[8px_8px_0_0_#ffde00]">
          <h1 className="text-3xl font-black uppercase">Quản lý Bức Tường</h1>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="bg-tabloid-red px-4 py-2 font-bold border-2 border-white hover:bg-white hover:text-tabloid-red transition-colors"
          >
            Đăng xuất
          </button>
        </div>

        {loading ? (
          <div className="text-center font-black text-2xl py-20 animate-pulse">Đang tải dữ liệu...</div>
        ) : (
          <div className="overflow-x-auto bg-white border-8 border-black shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bright-yellow border-b-4 border-black">
                  <th className="p-4 border-r-4 border-black font-black uppercase">Người gửi</th>
                  <th className="p-4 border-r-4 border-black font-black uppercase">Nội dung</th>
                  <th className="p-4 border-r-4 border-black font-black uppercase">Ảnh</th>
                  <th className="p-4 border-r-4 border-black font-black uppercase">Ngày gửi</th>
                  <th className="p-4 border-r-4 border-black font-black uppercase">Trạng thái</th>
                  <th className="p-4 font-black uppercase">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {wishes.map((wish) => (
                  <tr key={wish.id} className="border-b-4 border-black hover:bg-gray-100 transition-colors">
                    <td className="p-4 border-r-4 border-black font-bold">{wish.author}</td>
                    <td className="p-4 border-r-4 border-black max-w-xs truncate">{wish.message}</td>
                    <td className="p-4 border-r-4 border-black">
                      {wish.image_url ? (
                        <a href={wish.image_url} target="_blank" rel="noreferrer" className="text-blue-600 underline font-bold">Xem ảnh</a>
                      ) : '-'}
                    </td>
                    <td className="p-4 border-r-4 border-black whitespace-nowrap">
                      {new Date(wish.created_at).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="p-4 border-r-4 border-black">
                      {wish.is_hidden ? (
                        <span className="bg-black text-white px-2 py-1 font-bold text-sm">ĐÃ ẨN</span>
                      ) : (
                        <span className="bg-[#00ff00] text-black px-2 py-1 font-bold border-2 border-black text-sm">HIỂN THỊ</span>
                      )}
                    </td>
                    <td className="p-4 flex gap-2">
                      <button 
                        onClick={() => handleToggleHide(wish.id, wish.is_hidden)}
                        className="bg-blue-500 text-white font-bold px-3 py-1 border-2 border-black hover:bg-blue-600 shadow-[2px_2px_0_0_#000]"
                      >
                        {wish.is_hidden ? 'Hiện lại' : 'Ẩn đi'}
                      </button>
                      <button 
                        onClick={() => handleDelete(wish.id)}
                        className="bg-tabloid-red text-white font-bold px-3 py-1 border-2 border-black hover:bg-red-700 shadow-[2px_2px_0_0_#000]"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
                
                {wishes.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center font-black text-xl">Chưa có dữ liệu nào!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
