'use client';

import { useEffect, useState } from 'react';

export default function FakeLoading() {
  const [loading, setLoading] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [barWidth, setBarWidth] = useState('0%');

  const texts = [
    "Khởi tạo liên kết an toàn...",
    "Đang xâm nhập hệ thống bảo mật não bộ...",
    "Trích xuất dữ liệu ảnh dìm...",
    "Vượt qua tường lửa liêm sỉ...",
    "Giải mã mật khẩu...",
    "Truy cập thành công! Khởi động web..."
  ];

  useEffect(() => {
    // Start smooth CSS bar animation
    const initialTick = setTimeout(() => {
      setBarWidth('100%');
    }, 50);

    // Sequence of text changes
    const textInterval = setInterval(() => {
      setTextIndex(prev => {
        if (prev < texts.length - 1) return prev + 1;
        return prev;
      });
    }, 1200);

    // Progress bar numeric tick (100% in 7.5 seconds)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 75);

    // Hide loading screen after 8 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 8000);

    return () => {
      clearTimeout(initialTick);
      clearInterval(textInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [texts.length]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-[#ffb6c1] flex flex-col items-center justify-center font-mono p-4">
      <div className="w-full max-w-2xl bg-[#fffee0] border-4 md:border-8 border-black shadow-[10px_10px_0_0_#000]">
        
        {/* Retro Window Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b-4 md:border-b-8 border-black bg-bright-yellow">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border-2 border-black rounded-full"></div>
            <div className="w-4 h-4 bg-white border-2 border-black rounded-full"></div>
            <div className="w-4 h-4 bg-white border-2 border-black rounded-full"></div>
          </div>
          <span className="font-black text-xs md:text-sm uppercase tracking-widest">
            HACK_TUỔI_MỚI.exe
          </span>
          <div className="w-4 h-4"></div> {/* Spacer for alignment */}
        </div>
        
        {/* Terminal Content */}
        <div className="p-4 md:p-6">
          <div className="space-y-3 text-black font-bold text-xs md:text-base h-48 md:h-56 flex flex-col justify-end">
            {texts.slice(0, textIndex + 1).map((t, i) => (
              <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <span className="text-neon-pink mr-2 text-lg">▶ </span>
                {t}
              </div>
            ))}
            {textIndex < texts.length - 1 && (
              <div className="animate-pulse mt-2">
                <span className="text-neon-pink mr-2 text-lg">▶ </span>
                <span className="bg-black w-3 h-5 inline-block align-middle"></span>
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6 md:mt-8 w-full bg-white border-4 border-black h-8 relative overflow-hidden p-1 shadow-[inset_4px_4px_0_0_rgba(0,0,0,0.1)]">
            <div 
              className="bg-neon-pink h-full border-r-4 border-black transition-all ease-linear"
              style={{ width: barWidth, transitionDuration: '7500ms' }}
            ></div>
          </div>
          <div className="text-center font-black text-xs mt-2 uppercase">
            Đang tải dữ liệu tấu hài... {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}
