'use client';

import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

export default function ContractModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [noPosition, setNoPosition] = useState({ top: 0, left: 0 });
  const [isMoved, setIsMoved] = useState(false);
  
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
    if (!btnRef.current) return;
    
    const btn = btnRef.current.getBoundingClientRect();
    
    // Jump anywhere on the viewport
    const maxTop = window.innerHeight - btn.height - 20;
    const maxLeft = window.innerWidth - btn.width - 20;
    
    const newTop = Math.max(20, Math.random() * maxTop);
    const newLeft = Math.max(20, Math.random() * maxLeft);
    
    setNoPosition({ top: newTop, left: newLeft });
    setIsMoved(true);
    
    toast.error("Không được từ chối! Ký hợp đồng mau! 😡");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4">
      {/* The Contract Paper */}
      <div className="relative bg-[#fffee0] w-full max-w-2xl border-4 md:border-8 border-black p-3 md:p-8 shadow-[8px_8px_0_0_#ff107a] flex flex-col items-center max-h-[98vh] overflow-hidden font-sans">
        
        {/* Fake Seal */}
        <div className="absolute top-2 right-2 w-14 h-14 md:w-24 md:h-24 border-2 md:border-4 border-red-600 rounded-full flex flex-col items-center justify-center text-red-600 rotate-[15deg] opacity-80 pointer-events-none hidden sm:flex">
          <span className="font-bold text-[8px] md:text-xs tracking-widest text-center leading-none mb-0.5 uppercase">Đã Kiểm Duyệt</span>
          <span className="font-black text-lg md:text-3xl">★</span>
        </div>
        
        {/* Formal Header */}
        <div className="text-center w-full mb-2 md:mb-4 border-b-2 border-black pb-2">
          <h3 className="font-black text-[11px] md:text-lg uppercase mb-0.5">
            Cộng hòa Xã hội Chủ nghĩa Troll Người Nhà
          </h3>
          <p className="font-bold text-[9px] md:text-sm underline underline-offset-2 decoration-2">
            Độc lập - Tự do - Xin Vui Lòng Bao Nuôi
          </p>
        </div>
        
        <h2 className="text-lg md:text-3xl font-black uppercase text-black mb-3 md:mb-5 text-center tracking-tight">
          HỢP ĐỒNG KÝ KẾT TUỔI MỚI
        </h2>
        
        <div className="w-full font-medium text-[11px] md:text-base mb-3 md:mb-6 text-justify flex-1 overflow-hidden">
          <p className="mb-2 leading-snug">
            Hôm nay, vào thời khắc bước sang tuổi mới của <strong>Người Chị Gái Vĩ Đại</strong>, hợp đồng này được lập ra nhằm đảm bảo quyền lợi (của em) và nghĩa vụ (của chị). Cụ thể như sau:
          </p>
          <ul className="list-none space-y-1.5 md:space-y-3 pl-1 leading-snug">
            <li className="flex items-start gap-1.5">
              <span className="shrink-0 font-bold">Điều 1.</span>
              <span>Phải luôn giữ tâm trạng vui vẻ, cấm tuyệt đối hành vi cọc cằn, cáu gắt vô cớ với người nhà.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="shrink-0 font-bold">Điều 2.</span>
              <span>Có trách nhiệm và nghĩa vụ bao em đi ăn uống sập sàn ít nhất 01 lần/tháng.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="shrink-0 font-bold">Điều 3.</span>
              <span>Tiền bạc phân minh, ái tình dứt khoát. Nhưng những lúc em kẹt tiền, yêu cầu hỗ trợ tài chính với mức lãi suất 0%.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="shrink-0 font-bold">Điều 4.</span>
              <span>Công nhận và tuyên dương người thiết kế trang web này là thiên tài.</span>
            </li>
          </ul>
        </div>

        <div className="w-full text-center italic font-bold mb-4 md:mb-8 text-[10px] md:text-sm border-t-2 border-dashed border-black pt-2 md:pt-4">
          Bằng việc nhấn "Ký Xác Nhận", bên A cam kết thực hiện đầy đủ các điều khoản trên.
        </div>

        {/* Buttons layout with placeholders to prevent shifting */}
        <div className="w-full flex justify-center items-center gap-2 md:gap-8 mt-auto relative z-50">
          
          <div className="w-1/2 flex justify-end">
            <button 
              onClick={() => {
                setIsOpen(false);
                toast.success("Bản hợp đồng đã được lưu trữ vào hệ thống! 🎉");
              }}
              className="bg-green-600 text-white font-black text-[11px] md:text-xl py-2 md:py-4 px-2 md:px-8 border-2 md:border-4 border-black hover:bg-black hover:text-green-500 transition-colors shadow-[2px_2px_0_0_#000] md:shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-[1px_1px_0_0_#000] w-full max-w-[160px] md:max-w-[200px]"
            >
              KÝ XÁC NHẬN ✍️
            </button>
          </div>

          <div className="w-1/2 flex justify-start">
            <button 
              ref={btnRef}
              onMouseEnter={moveButton}
              onTouchStart={(e) => {
                e.preventDefault(); // Prevent accidental clicking when touched
                moveButton();
              }}
              style={isMoved ? { position: 'fixed', top: noPosition.top, left: noPosition.left, zIndex: 9999 } : { position: 'relative' }}
              className={`bg-red-500 text-white font-black text-[11px] md:text-xl py-2 md:py-4 px-2 md:px-8 border-2 md:border-4 border-black shadow-[2px_2px_0_0_#000] md:shadow-[4px_4px_0_0_#000] w-full max-w-[160px] md:max-w-[200px] ${isMoved ? 'transition-all duration-300 ease-out' : ''}`}
            >
              HỦY BỎ ❌
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
