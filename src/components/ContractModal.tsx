'use client';

import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

export default function ContractModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [noPosition, setNoPosition] = useState({ top: 0, left: 0 });
  const [isMoved, setIsMoved] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const moveButton = () => {
    if (!containerRef.current || !btnRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const btn = btnRef.current.getBoundingClientRect();
    
    // Calculate random position within container bounds
    const maxTop = container.height - btn.height;
    const maxLeft = container.width - btn.width;
    
    const newTop = Math.random() * maxTop;
    const newLeft = Math.random() * maxLeft;
    
    setNoPosition({ top: newTop, left: newLeft });
    setIsMoved(true);
    
    toast.error("Không được từ chối! Đọc lại điều khoản đi! 😡");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div 
        ref={containerRef}
        className="relative bg-white w-full max-w-2xl border-[6px] md:border-8 border-black p-4 md:p-10 shadow-[8px_8px_0_0_#ff107a] md:shadow-[12px_12px_0_0_#ff107a] flex flex-col items-center max-h-[90vh]"
      >
        <div className="absolute -top-4 -right-2 md:-top-6 md:-right-6 bg-bright-yellow border-4 border-black p-2 md:p-4 rotate-12 shadow-[4px_4px_0_0_#000] font-black text-sm md:text-xl animate-bounce-fast">
          BẮT BUỘC!
        </div>
        
        <h2 className="text-2xl md:text-5xl font-black uppercase text-tabloid-red mb-4 md:mb-6 border-b-4 border-black pb-2 md:pb-4 text-center mt-4 md:mt-0">
          BẢN CAM KẾT TUỔI MỚI
        </h2>
        
        <div className="w-full space-y-4 font-bold text-sm md:text-xl mb-6 md:mb-12 overflow-y-auto pr-2">
          <p className="flex items-start gap-2">
            <span className="text-xl md:text-2xl shrink-0">📝</span>
            <span>Điều 1: Phải luôn vui vẻ, không được cọc cằn vô cớ với người nhà.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-xl md:text-2xl shrink-0">🍔</span>
            <span>Điều 2: Có trách nhiệm bao ăn uống ít nhất 1 lần/tháng.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-xl md:text-2xl shrink-0">💸</span>
            <span>Điều 3: Tiền bạc phân minh nhưng lúc em kẹt thì phải cho mượn không lãi suất.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-xl md:text-2xl shrink-0">😌</span>
            <span>Điều 4: Phải công nhận người làm trang web này vô cùng tâm lý và vĩ đại!</span>
          </p>
        </div>

        <p className="text-center italic font-bold mb-6 text-xs md:text-base">
          Vui lòng nhấn "ĐỒNG Ý" để xác nhận và truy cập trang web.
        </p>

        <div className="w-full flex justify-center gap-4 md:gap-8 mt-auto h-16 md:h-20 relative">
          <button 
            onClick={() => {
              setIsOpen(false);
              toast.success("Ngoan lắm! Chào mừng đến với trang web! 🎉");
            }}
            className="bg-green-500 text-white font-black text-lg md:text-2xl py-2 md:py-4 px-6 md:px-8 border-4 border-black hover:bg-black hover:text-green-500 transition-colors shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-[2px_2px_0_0_#000] z-10"
          >
            ĐỒNG Ý ✔️
          </button>

          <button 
            ref={btnRef}
            onMouseEnter={moveButton}
            onTouchStart={(e) => {
              e.preventDefault();
              moveButton();
            }}
            style={isMoved ? { position: 'absolute', top: noPosition.top, left: noPosition.left } : {}}
            className={`bg-red-500 text-white font-black text-sm md:text-xl py-2 md:py-4 px-4 md:px-8 border-4 border-black shadow-[4px_4px_0_0_#000] z-50 ${isMoved ? 'transition-all duration-200' : ''}`}
          >
            TỪ CHỐI ❌
          </button>
        </div>
      </div>
    </div>
  );
}
