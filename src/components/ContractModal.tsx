'use client';

import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

export default function ContractModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState<'CHOICE' | 'PASSWORD' | 'CONTRACT'>('CHOICE');
  const [password, setPassword] = useState('');
  
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
      
      {step === 'CHOICE' && (
        <div className="relative bg-[#fffee0] w-full max-w-md border-4 md:border-8 border-black p-6 md:p-8 shadow-[8px_8px_0_0_#ff107a] flex flex-col items-center animate-in zoom-in duration-300">
          <h2 className="text-2xl md:text-3xl font-black uppercase text-center mb-6 border-b-4 border-black pb-4 w-full">
            XÁC MINH DANH TÍNH
          </h2>
          <p className="font-bold mb-6 text-center text-sm md:text-base">
            Trang web này có khu vực cần ký cam kết rủi ro. Bạn là ai?
          </p>
          <div className="flex flex-col gap-4 w-full">
            <button 
              onClick={() => {
                setIsOpen(false);
                toast.success("Chào mừng bạn đến với trang web! 🎉");
              }}
              className="bg-blue-400 text-black font-black text-sm md:text-lg py-3 px-4 border-4 border-black hover:bg-black hover:text-blue-400 transition-colors shadow-[4px_4px_0_0_#000]"
            >
              🧑‍🤝‍🧑 KHÁCH QUA ĐƯỜNG
              <div className="text-xs font-normal mt-1">(Vào xem web luôn)</div>
            </button>

            <button 
              onClick={() => setStep('PASSWORD')}
              className="bg-neon-pink text-white font-black text-sm md:text-lg py-3 px-4 border-4 border-black hover:bg-black hover:text-neon-pink transition-colors shadow-[4px_4px_0_0_#000]"
            >
              👸 TÔI LÀ THU DUYÊN
              <div className="text-xs font-normal mt-1">(Chị gái nhân vật chính)</div>
            </button>
          </div>
        </div>
      )}

      {step === 'PASSWORD' && (
        <div className="relative bg-[#fffee0] w-full max-w-md border-4 md:border-8 border-black p-6 md:p-8 shadow-[8px_8px_0_0_#ff107a] flex flex-col items-center animate-in zoom-in duration-300">
          <h2 className="text-2xl md:text-3xl font-black uppercase text-center mb-6 border-b-4 border-black pb-4 w-full">
            NHẬP MẬT KHẨU
          </h2>
          <p className="font-bold mb-4 text-center text-sm md:text-base">
            Để tránh người lạ ký bậy, vui lòng nhập mật khẩu:
          </p>
          <div className="w-full text-xs font-bold text-gray-600 mb-4 italic text-center">
            (Gợi ý: Tên của chị viết liền không dấu, vd: thuduyen)
          </div>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (password.toLowerCase() === 'thuduyen') {
                setStep('CONTRACT');
                toast.success("Xác nhận thân phận thành công! Mời ký cam kết.");
              } else {
                toast.error("Sai mật khẩu! Nghĩ kỹ lại xem tên mình là gì? 🤡");
              }
            }} 
            className="w-full flex flex-col gap-5"
          >
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-4 border-black p-3 text-lg font-bold text-center focus:outline-none focus:bg-bright-yellow transition-colors"
              placeholder="***"
              autoFocus
            />
            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => setStep('CHOICE')}
                className="flex-1 bg-gray-300 text-black font-black py-3 border-4 border-black hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0_0_#000]"
              >
                QUAY LẠI
              </button>
              <button 
                type="submit"
                className="flex-1 bg-green-500 text-white font-black py-3 border-4 border-black hover:bg-black hover:text-green-500 transition-colors shadow-[4px_4px_0_0_#000]"
              >
                XÁC NHẬN
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 'CONTRACT' && (
        <div className="relative bg-[#fffee0] w-full max-w-2xl border-4 md:border-8 border-black p-3 md:p-5 shadow-[8px_8px_0_0_#ff107a] flex flex-col items-center max-h-[98vh] overflow-hidden font-sans animate-in zoom-in duration-300">
        
        {/* Fake Seal */}
        <div className="absolute top-2 right-2 w-14 h-14 md:w-20 md:h-20 border-2 md:border-4 border-red-600 rounded-full flex flex-col items-center justify-center text-red-600 rotate-[15deg] opacity-80 pointer-events-none hidden sm:flex">
          <span className="font-bold text-[8px] md:text-[10px] tracking-widest text-center leading-none mb-0.5 uppercase">Đã Kiểm Duyệt</span>
          <span className="font-black text-lg md:text-2xl">★</span>
        </div>
        
        {/* Formal Header */}
        <div className="text-center w-full mb-2 md:mb-3 border-b-2 border-black pb-2">
          <h3 className="font-black text-[11px] md:text-sm uppercase mb-0.5">
            Cộng hòa Xã hội Chủ nghĩa Troll Người Nhà
          </h3>
          <p className="font-bold text-[9px] md:text-xs underline underline-offset-2 decoration-2">
            Độc lập - Tự do - Xin Vui Lòng Bao Nuôi
          </p>
        </div>
        
        <h2 className="text-lg md:text-2xl font-black uppercase text-black mb-3 md:mb-4 text-center tracking-tight">
          HỢP ĐỒNG KÝ KẾT TUỔI MỚI
        </h2>
        
        <div className="w-full font-medium text-[11px] md:text-sm mb-3 md:mb-4 text-justify flex-1 overflow-y-auto min-h-0 pr-1">
          <p className="mb-2 leading-snug">
            Hôm nay, vào thời khắc bước sang tuổi mới của <strong>Người Chị Gái Vĩ Đại</strong>, hợp đồng này được lập ra nhằm đảm bảo quyền lợi (của em) và nghĩa vụ (của chị). Cụ thể như sau:
          </p>
          <ul className="list-none space-y-1.5 md:space-y-2 pl-1 leading-snug">
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

        <div className="w-full text-center italic font-bold mb-4 md:mb-5 text-[10px] md:text-xs border-t-2 border-dashed border-black pt-2 md:pt-3">
          Bằng việc nhấn "Ký Xác Nhận", bên A cam kết thực hiện đầy đủ các điều khoản trên.
        </div>

        {/* Buttons layout with placeholders to prevent shifting */}
        <div className="w-full flex justify-center items-center gap-2 md:gap-6 mt-auto relative z-50">
          
          <div className="w-1/2 flex justify-end">
            <button 
              onClick={() => {
                setIsOpen(false);
                toast.success("Bản hợp đồng đã được lưu trữ vào hệ thống! 🎉");
              }}
              className="bg-green-600 text-white font-black text-[11px] md:text-sm py-2 md:py-2.5 px-2 md:px-4 border-2 md:border-[3px] border-black hover:bg-black hover:text-green-500 transition-colors shadow-[2px_2px_0_0_#000] md:shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-[1px_1px_0_0_#000] w-full max-w-[160px] md:max-w-[160px]"
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
              className={`bg-red-500 text-white font-black text-[11px] md:text-sm py-2 md:py-2.5 px-2 md:px-4 border-2 md:border-[3px] border-black shadow-[2px_2px_0_0_#000] md:shadow-[4px_4px_0_0_#000] w-full max-w-[160px] md:max-w-[160px] ${isMoved ? 'transition-all duration-300 ease-out' : ''}`}
            >
              HỦY BỎ ❌
            </button>
          </div>

        </div>
      </div>
      )}
    </div>
  );
}
