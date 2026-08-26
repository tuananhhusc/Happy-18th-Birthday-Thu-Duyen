'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Hero() {
  useEffect(() => {
    // Massive confetti explosion on load
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff107a', '#ffde00', '#00f0ff']
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff107a', '#ffde00', '#00f0ff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background border-b-8 border-tabloid-red pb-10">
      
      {/* Breaking News Ticker */}
      <div className="absolute top-0 left-0 w-full bg-tabloid-red text-white font-black py-2 flex overflow-hidden z-20 text-xl border-b-4 border-black border-dashed">
        <div className="animate-marquee whitespace-nowrap flex-shrink-0 min-w-full flex justify-around">
          <span className="mx-4">🎉 NGƯỜI CHỊ VĨ ĐẠI NHẤT HỆ MẶT TRỜI ĐÃ THÊM TUỔI!</span>
          <span className="mx-4 text-bright-yellow">🚨 CẢNH BÁO: TÍNH KHÍ VẪN THẤT THƯỜNG NHƯ THỜI TIẾT!</span>
          <span className="mx-4">💖 BÊN NGOÀI XINH ĐẸP, BÊN TRONG NHIỀU TIỀN!</span>
          <span className="mx-4 text-bright-yellow">😠 BÊN NÀY THÌ MỖI LẦN CÁU LÀ CẢ NHÀ KHIẾP SỢ!</span>
          <span className="mx-4">✨ CHÚC CHỊ MÃI TRẺ TRUNG VÀ HẠNH PHÚC BÌNH AN!</span>
          <span className="mx-4 text-bright-yellow">🛌 NHƯNG LÀM ƠN BỚT NGỦ NƯỚNG LẠI DÙM CÁI!</span>
          <span className="mx-4">💸 TIỀN TÀI VÀO NHƯ NƯỚC SÔNG ĐÀ!</span>
          <span className="mx-4 text-bright-yellow">📦 LƯU Ý: VUI LÒNG HẠN CHẾ CHỐT ĐƠN SHOPEE!</span>
        </div>
        <div className="animate-marquee whitespace-nowrap flex-shrink-0 min-w-full flex justify-around" aria-hidden="true">
          <span className="mx-4">🎉 NGƯỜI CHỊ VĨ ĐẠI NHẤT HỆ MẶT TRỜI ĐÃ THÊM TUỔI!</span>
          <span className="mx-4 text-bright-yellow">🚨 CẢNH BÁO: TÍNH KHÍ VẪN THẤT THƯỜNG NHƯ THỜI TIẾT!</span>
          <span className="mx-4">💖 BÊN NGOÀI XINH ĐẸP, BÊN TRONG NHIỀU TIỀN!</span>
          <span className="mx-4 text-bright-yellow">😠 BÊN NÀY THÌ MỖI LẦN CÁU LÀ CẢ NHÀ KHIẾP SỢ!</span>
          <span className="mx-4">✨ CHÚC CHỊ MÃI TRẺ TRUNG VÀ HẠNH PHÚC BÌNH AN!</span>
          <span className="mx-4 text-bright-yellow">🛌 NHƯNG LÀM ƠN BỚT NGỦ NƯỚNG LẠI DÙM CÁI!</span>
          <span className="mx-4">💸 TIỀN TÀI VÀO NHƯ NƯỚC SÔNG ĐÀ!</span>
          <span className="mx-4 text-bright-yellow">📦 LƯU Ý: VUI LÒNG HẠN CHẾ CHỐT ĐƠN SHOPEE!</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-20 text-center max-w-5xl px-4 flex flex-col items-center z-10 relative">
        
        {/* Fake Tag */}
        <div className="bg-bright-yellow text-black border-4 border-black px-4 md:px-8 py-2 mb-6 font-black text-2xl md:text-4xl uppercase rotate-[-3deg] shadow-[8px_8px_0_0_rgba(0,0,0,1)] animate-jiggle">
          SỰ KIỆN TRỌNG ĐẠI !!!
        </div>
        
        {/* Main Headline */}
        <h1 
          className="text-4xl md:text-7xl font-black text-tabloid-red mb-6 drop-shadow-md leading-tight uppercase px-2"
          style={{ textShadow: "3px 3px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000" }}
        >
          CHÚC MỪNG SINH NHẬT <span className="text-neon-pink">NGƯỜI CHỊ</span> TUYỆT VỜI NHẤT!
        </h1>
        
        {/* Sub-headline */}
        <h2 className="text-lg md:text-3xl font-bold bg-black text-white px-4 md:px-6 py-3 mb-12 rotate-2 shadow-[6px_6px_0_0_#ffde00] max-w-[95%]">
          "Nhan sắc thăng hạng, tài năng xuất chúng, tấm lòng bao dung!"
        </h2>

        {/* Jiggle Image Placeholder */}
        <motion.div 
          whileHover={{ scale: 1.05, rotate: [0, -5, 5, -5, 5, 0], transition: { duration: 0.5 } }}
          className="relative w-full max-w-sm md:max-w-md bg-white border-8 border-neon-pink p-4 shadow-[12px_12px_0_0_#00f0ff] cursor-pointer group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/anh-trang-chu.jpg" 
            alt="Ảnh Xinh Đẹp Của Chị" 
            className="w-full h-auto border-4 border-black"
          />
          
          {/* Reaction Sticker */}
          <div className="absolute -bottom-8 -right-8 bg-bright-yellow text-black font-black p-4 border-4 border-black rotate-[-15deg] animate-bounce-fast text-2xl shadow-[4px_4px_0_0_#000] z-10">
            XUẤT SẮC!
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
