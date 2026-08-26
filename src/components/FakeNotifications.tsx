'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

const TROLL_NOTIFICATIONS = [
  {
    title: "Ngân hàng ACB",
    msg: "Tài khoản -5,000,000 VND. Nội dung: Tra no an choi.",
    icon: "💸",
    color: "bg-blue-100"
  },
  {
    title: "Mẹ yêu",
    msg: "Trưa rồi vẫn chưa dậy à con? Xuống ăn cơm!",
    icon: "👩‍👧",
    color: "bg-pink-100"
  },
  {
    title: "Shopee Express",
    msg: "Đơn hàng 'Quần đùi hoa lá hẹ' đang được giao đến bạn.",
    icon: "📦",
    color: "bg-orange-100"
  },
  {
    title: "Người yêu cũ",
    msg: "Dạo này em khoẻ không? Anh chuẩn bị lấy vợ rồi...",
    icon: "💔",
    color: "bg-gray-100"
  },
  {
    title: "Hệ thống báo động",
    msg: "Cảnh báo! Có người đang bóc phốt bạn trên mạng xã hội!",
    icon: "🚨",
    color: "bg-red-100"
  },
  {
    title: "Tinder",
    msg: "Bạn có 1 tương hợp mới! Nhắn tin ngay thôi.",
    icon: "🔥",
    color: "bg-rose-100"
  }
];

export default function FakeNotifications() {
  useEffect(() => {
    // Start interval after 15 seconds to let user read the site first
    const timeout = setTimeout(() => {
      
      const interval = setInterval(() => {
        // Randomly pick a notification
        const notif = TROLL_NOTIFICATIONS[Math.floor(Math.random() * TROLL_NOTIFICATIONS.length)];
        
        // Show custom toast resembling a push notification
        toast.custom((t) => (
          <div className={`${notif.color} w-[calc(100vw-32px)] sm:w-full max-w-sm border-4 border-black p-4 shadow-[6px_6px_0_0_#000] flex gap-3 md:gap-4 items-start animate-in slide-in-from-right duration-300 mx-auto`}>
            <div className="text-2xl md:text-3xl bg-white border-2 border-black rounded-full p-2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0">
              {notif.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-black text-base md:text-lg uppercase mb-1 truncate">{notif.title}</h4>
              <p className="font-bold text-xs md:text-sm leading-tight text-gray-800 break-words">{notif.msg}</p>
            </div>
            <button 
              onClick={() => toast.dismiss(t)} 
              className="text-black font-black text-xl hover:scale-125 transition-transform px-2 shrink-0"
            >
              ×
            </button>
          </div>
        ), { duration: 5000 });

      }, 15000); // Every 15 seconds

      return () => clearInterval(interval);
      
    }, 12000);

    return () => clearTimeout(timeout);
  }, []);

  return null; // This component doesn't render any static UI
}
