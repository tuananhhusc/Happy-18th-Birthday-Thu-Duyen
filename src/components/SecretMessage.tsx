'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Waves } from 'lucide-react';

export default function SecretMessage() {
  const [isOpen, setIsOpen] = useState(false);

  const triggerSecret = () => {
    setIsOpen(true);
    // Ocean/Blue themed confetti 
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#0284c7', '#38bdf8', '#ffffff'] // Ocean shades
    });
  };

  return (
    <>
      <div className="w-full bg-black py-4 flex justify-center">
        {/* The tiny, barely visible button hidden in the footer */}
        <button 
          onClick={triggerSecret}
          className="text-gray-800 text-xs hover:text-white transition-colors"
        >
          .
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#e0f7fa] border-8 border-[#0284c7] p-6 md:p-12 max-w-2xl text-center relative shadow-[0_0_60px_rgba(2,132,199,0.6)] animate-in zoom-in duration-500 rounded-3xl w-full mx-2">
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute -top-4 -right-2 md:-top-6 md:-right-6 w-10 h-10 md:w-12 md:h-12 bg-black text-white font-black text-xl md:text-2xl border-4 border-[#0284c7] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              X
            </button>

            <div className="flex justify-center mb-4 md:mb-6 gap-2">
              <Waves size={40} color="#0284c7" className="animate-bounce md:w-[50px] md:h-[50px]" />
              <Heart size={40} fill="#38bdf8" color="#0284c7" className="animate-pulse md:w-[50px] md:h-[50px]" />
              <Waves size={40} color="#0284c7" className="animate-bounce md:w-[50px] md:h-[50px]" style={{ animationDelay: '0.2s' }} />
            </div>

            <h2 className="text-2xl md:text-5xl font-black mb-4 md:mb-6 text-[#0369a1] uppercase" style={{ textShadow: "2px 2px 0px #fff" }}>
              CÚ LỪA PHÚT CHÓT!
            </h2>
            
            <div className="font-sans text-base md:text-xl space-y-3 md:space-y-5 font-bold text-gray-800">
              <p>Troll nãy giờ mỏi tay rồi. Tới tiết mục sến súa nè... 🤫</p>
              
              <p className="italic text-[#0284c7]">
                "Biết bà chị thích biển xanh mây trắng nên tui đặc biệt đổi theme góc nhỏ này cho hợp phong thuỷ đó."
              </p>
              
              <p>
                Chúc chị ruột sinh nhật vui vẻ! Tuổi mới bớt cọc cằn, bớt "ảo tưởng", tiền vô như nước biển Đông, và sớm tìm được "bến đỗ" (nếu có ai dũng cảm dám rước). 
              </p>

              <p>
                Dù hay cãi nhau như chó với mèo, nhưng sâu thẳm trong thâm tâm, chị vẫn luôn là người chị tuyệt vời nhất <span className="text-xs md:text-sm font-normal">(trong cái nhà này thôi nha, đừng tự mãn quá)</span>.
              </p>
              
              <p className="font-black text-[#0369a1] text-2xl md:text-3xl pt-2 md:pt-4 drop-shadow-md">
                Happy Birthday! 🌊💙✨
              </p>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}
