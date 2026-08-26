'use client';

import { useEffect, useState } from 'react';

export default function FakeLoading() {
  const [loading, setLoading] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    "Khởi tạo liên kết an toàn...",
    "Đang xâm nhập hệ thống bảo mật não bộ...",
    "Trích xuất dữ liệu ảnh dìm...",
    "Vượt qua tường lửa liêm sỉ...",
    "Giải mã mật khẩu...",
    "Truy cập thành công! Khởi động web..."
  ];

  useEffect(() => {
    // Sequence of text changes
    const interval = setInterval(() => {
      setTextIndex(prev => {
        if (prev < texts.length - 1) return prev + 1;
        return prev;
      });
    }, 1200);

    // Hide loading screen after 8 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [texts.length]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center font-mono p-4">
      <div className="w-full max-w-2xl bg-black border-2 border-[#00ff00] p-6 shadow-[0_0_20px_#00ff00]">
        <div className="flex items-center gap-2 mb-4 border-b border-[#00ff00] pb-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-[#00ff00] ml-2 text-sm">terminal - root@birthday-hack</span>
        </div>
        
        <div className="space-y-2 text-[#00ff00] text-sm md:text-base h-40 flex flex-col justify-end">
          {texts.slice(0, textIndex + 1).map((t, i) => (
            <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <span className="text-white mr-2">&gt;</span>
              {t}
            </div>
          ))}
          {textIndex < texts.length - 1 && (
            <div className="animate-pulse">
              <span className="text-white mr-2">&gt;</span>_
            </div>
          )}
        </div>
        
        <div className="mt-6 w-full bg-gray-800 h-2">
          <div 
            className="bg-[#00ff00] h-full transition-all duration-[8000ms] ease-linear"
            style={{ width: loading ? '100%' : '0%' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
