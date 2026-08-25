'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

const QUESTIONS = [
  {
    id: 1,
    question: "Câu cửa miệng của bả mỗi khi đói là gì?",
    options: [
      { text: "Nay ăn gì nhỉ?", isCorrect: false },
      { text: "Tao ăn luôn mày bây giờ!", isCorrect: true },
      { text: "Đói xỉu...", isCorrect: false },
      { text: "Nhịn giảm cân vậy", isCorrect: false }
    ]
  },
  {
    id: 2,
    question: "Tật xấu khó bỏ nhất của bả là gì?",
    options: [
      { text: "Ngủ trương thây đến trưa", isCorrect: false },
      { text: "Mua cả đống đồ rồi không mặc", isCorrect: false },
      { text: "Chuyên môn seen không rep", isCorrect: false },
      { text: "Tất cả các ý trên (quá chuẩn)", isCorrect: true }
    ]
  },
  {
    id: 3,
    question: "Kỹ năng sinh tồn siêu việt nhất của bả?",
    options: [
      { text: "Nấu ăn thần sầu", isCorrect: false },
      { text: "Lật mặt nhanh hơn lật bánh tráng", isCorrect: true },
      { text: "Kiếm tiền như nước", isCorrect: false },
      { text: "Thức đêm chạy deadline", isCorrect: false }
    ]
  },
  {
    id: 4,
    question: "Lý do củ chuối nhất khiến bả nổi quạu?",
    options: [
      { text: "Đang ngủ ngon bị gọi dậy", isCorrect: false },
      { text: "Đói bụng nhưng không biết ăn gì", isCorrect: false },
      { text: "Thở thôi cũng quạu", isCorrect: true },
      { text: "Tủ đầy đồ nhưng than 'không có đồ mặc'", isCorrect: false }
    ]
  },
  {
    id: 5,
    question: "Mức độ 'ảo tưởng sức mạnh' của bả ở cấp độ nào?",
    options: [
      { text: "Vừa phải, tự biết mình là ai", isCorrect: false },
      { text: "Hơi cao xíu thôi", isCorrect: false },
      { text: "Chạm nóc vũ trụ", isCorrect: false },
      { text: "Vượt ngoài tầm kiểm soát của khoa học", isCorrect: true }
    ]
  },
  {
    id: 6,
    question: "Bả có thể làm gì liên tục trong 12 tiếng không chán?",
    options: [
      { text: "Ngủ", isCorrect: false },
      { text: "Lướt Tiktok vô tri", isCorrect: false },
      { text: "Nói xấu thiên hạ", isCorrect: false },
      { text: "Cả 3 cái trên gộp lại", isCorrect: true }
    ]
  },
  {
    id: 7,
    question: "Khi bả nói 'Đợi xíu tao ra liền', thời gian thực tế là?",
    options: [
      { text: "5 phút", isCorrect: false },
      { text: "30 phút", isCorrect: false },
      { text: "2 tiếng rưỡi", isCorrect: false },
      { text: "Đợi tới kiếp sau", isCorrect: true }
    ]
  },
  {
    id: 8,
    question: "Món đồ nào bả hay vứt lung tung và không bao giờ tìm thấy?",
    options: [
      { text: "Chìa khoá xe", isCorrect: false },
      { text: "Dây thun buộc tóc", isCorrect: false },
      { text: "Lương tâm", isCorrect: false },
      { text: "Liêm sỉ", isCorrect: true }
    ]
  },
  {
    id: 9,
    question: "Câu nào bả hay nói dối trắng trợn nhất?",
    options: [
      { text: "Tao bắt đầu giảm cân từ ngày mai", isCorrect: false },
      { text: "Tao không có tiền", isCorrect: false },
      { text: "Đang đi tới rồi (đang ở trên giường)", isCorrect: false },
      { text: "Tất cả các câu trên", isCorrect: true }
    ]
  },
  {
    id: 10,
    question: "Style ăn mặc ở nhà của bả giống hình tượng nào nhất?",
    options: [
      { text: "Nàng công chúa kiêu kỳ", isCorrect: false },
      { text: "Bà thím U50", isCorrect: false },
      { text: "Bang chủ Cái Bang", isCorrect: true },
      { text: "Rich kid sang chảnh", isCorrect: false }
    ]
  },
  {
    id: 11,
    question: "Lý do cốt lõi khiến bả ế (FA) đến bây giờ?",
    options: [
      { text: "Tiêu chuẩn quá cao trên trời", isCorrect: false },
      { text: "Không có thời gian yêu đương", isCorrect: false },
      { text: "Do cái nết quá xấu!", isCorrect: true },
      { text: "Ý trời định vậy", isCorrect: false }
    ]
  },
  {
    id: 12,
    question: "Nếu bả biến thành một con vật, bả sẽ là con gì?",
    options: [
      { text: "Thiên nga lộng lẫy", isCorrect: false },
      { text: "Heo lười tham ăn", isCorrect: true },
      { text: "Chó Shiba ngáo", isCorrect: false },
      { text: "Sư tử Hà Đông", isCorrect: false }
    ]
  },
  {
    id: 13,
    question: "Lúc thất tình/buồn bã bả sẽ làm gì?",
    options: [
      { text: "Ngồi khóc lóc ỉ ôi một mình", isCorrect: false },
      { text: "Đăng story deep deep xàm xí", isCorrect: false },
      { text: "Ăn gấp 3 lần bình thường", isCorrect: true },
      { text: "Đi chùa tu tập", isCorrect: false }
    ]
  },
  {
    id: 14,
    question: "Bả tiêu tiền nhiều nhất vào cái gì?",
    options: [
      { text: "Đầu tư học hành", isCorrect: false },
      { text: "Báo hiếu cha mẹ", isCorrect: false },
      { text: "Trà sữa và chốt đơn đồ Shopee rác", isCorrect: true },
      { text: "Tiết kiệm mua nhà", isCorrect: false }
    ]
  },
  {
    id: 15,
    question: "Lời khuyên chân thành nhất dành cho tương lai của bả?",
    options: [
      { text: "Bớt nghiệp lại cho đời bớt khổ", isCorrect: true },
      { text: "Cố gắng kiếm thật nhiều tiền", isCorrect: false },
      { text: "Tắm nhiều hơn đi", isCorrect: false },
      { text: "Nhanh chóng lấy chồng đi cho khuất mắt", isCorrect: false }
    ]
  },
  {
    id: 16,
    question: "Chốt lại, bả trong mắt bạn là người thế nào?",
    options: [
      { text: "Người chị tuyệt vời hoàn hảo", isCorrect: false },
      { text: "Thiên thần mỏng manh dễ vỡ", isCorrect: false },
      { text: "ATM sống (có thể bòn rút tiền)", isCorrect: false },
      { text: "Cục nợ của cuộc đời!", isCorrect: true }
    ]
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const wrongSoundRef = useRef<HTMLAudioElement>(null);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback("Chuẩn cmnr! Tiếp tục bóc phốt nào!");
      toast.success("Giỏi lắm! Đúng bong luôn! 🎉");
    } else {
      setFeedback("Sai bét! Trình độ soi bả chưa đủ đô đâu!");
      toast.error("Ó e ó e! Trả lời sai rồi! 🤡");
      
      // Play funny sound (make sure to add a real file later if needed)
      if (wrongSoundRef.current) {
        wrongSoundRef.current.currentTime = 0;
        wrongSoundRef.current.play().catch(e => console.log("Audio play blocked by browser", e));
      }
    }

    // Wait a sec before moving to next question
    setTimeout(() => {
      setFeedback(null);
      if (currentQuestion + 1 < QUESTIONS.length) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setShowResult(true);
        if (score + (isCorrect ? 1 : 0) === QUESTIONS.length) {
          // Trigger win confetti
          confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        }
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  const handleShare = async () => {
    const text = score === QUESTIONS.length 
      ? `Tôi đã đạt ${score}/${QUESTIONS.length} điểm độ hiểu bà chị ác ma! Kéo xuống để xem ảnh dìm siêu cấp! 🤡`
      : `Tôi chỉ được ${score}/${QUESTIONS.length} điểm hiểu bà chị thôi... Vào thử sức coi được mấy điểm? 😈`;
      
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Góc Bóc Phốt Chị Gái',
          text: text,
          url: window.location.href,
        });
        toast.success("Chia sẻ thành công!");
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      toast.success("Đã copy link để chia sẻ!");
    }
  };

  return (
    <section className="w-full py-16 md:py-20 px-4 flex flex-col items-center bg-electric-blue border-b-8 border-tabloid-red relative z-10">
      
      <audio ref={wrongSoundRef} src="https://www.soundjay.com/buttons/sounds/beep-03.mp3" />

      {/* Sassy Transition */}
      <div className="mb-6 font-black text-sm md:text-xl text-center uppercase bg-white border-4 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] max-w-[95%]">
        ...À khoan, đó là thảo mai thôi. Giờ mới là con người thật nè! 😈
      </div>

      <div className="bg-bright-yellow text-black border-4 border-black px-4 md:px-6 py-2 mb-8 font-black text-2xl md:text-3xl uppercase rotate-2 shadow-[8px_8px_0_0_#ff107a]">
        GÓC BÓC PHỐT
      </div>

      <div className="w-full max-w-2xl bg-white border-8 border-black p-4 md:p-10 shadow-[8px_8px_0_0_rgba(0,0,0,1)] md:shadow-[12px_12px_0_0_rgba(0,0,0,1)] relative">
        
        {showResult ? (
          <div className="text-center flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase text-tabloid-red">
              KẾT QUẢ BÓC PHỐT
            </h2>
            <p className="text-xl md:text-2xl font-bold mb-6">
              Bạn đúng được: {score} / {QUESTIONS.length} câu!
            </p>

            {score === QUESTIONS.length ? (
              <div className="flex flex-col items-center w-full">
                <p className="text-lg md:text-xl font-bold text-neon-pink bg-black px-4 py-2 mb-6 w-full">
                  🎉 CHÚC MỪNG! BẠN ĐÃ MỞ KHÓA KHO ẢNH DÌM HÀNG TUYỆT MẬT! 🎉
                </p>
                
                <motion.div 
                  animate={{ rotate: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="w-full max-w-sm bg-white border-8 border-tabloid-red p-2 md:p-4 shadow-[8px_8px_0_0_#000] md:shadow-[12px_12px_0_0_#000] relative cursor-pointer group mb-6"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/anh-dim-may-bay.jpg" 
                    alt="Ảnh dìm hàng"
                    className="w-full h-auto border-4 border-black group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -top-4 -right-2 md:-right-4 bg-bright-yellow border-4 border-black font-black p-2 rotate-12 text-sm md:text-xl shadow-[4px_4px_0_0_#000] animate-bounce-fast z-10 text-black">
                    BỊ BẮT QUẢ TANG!
                  </div>
                  <p className="mt-4 text-center font-black text-sm md:text-xl uppercase font-sans text-black">
                    Ánh mắt ngỡ ngàng khi nhận ra mình đã già! 🤡
                  </p>
                </motion.div>

                <button 
                  onClick={handleShare}
                  className="bg-[#1877F2] text-white font-black text-lg md:text-xl py-3 px-6 md:px-8 border-4 border-black hover:bg-black transition-colors shadow-[6px_6px_0_0_#000] active:translate-y-1 active:shadow-[2px_2px_0_0_#000] mt-4"
                >
                  KHOE CHIẾN TÍCH LÊN FACEBOOK! 📢
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-lg md:text-xl font-bold mb-6 text-black bg-bright-yellow border-2 border-black px-4 py-2">
                  Bạn chưa đủ hiểu bả rồi! Về tu luyện thêm đi! 🤡
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={restartQuiz}
                    className="bg-neon-pink text-white font-black text-lg md:text-xl py-3 px-6 border-4 border-black hover:bg-black hover:text-neon-pink transition-colors shadow-[6px_6px_0_0_#000] active:translate-y-1 active:shadow-[2px_2px_0_0_#000]"
                  >
                    CHƠI LẠI
                  </button>
                  <button 
                    onClick={handleShare}
                    className="bg-electric-blue text-black font-black text-lg md:text-xl py-3 px-6 border-4 border-black hover:bg-black hover:text-electric-blue transition-colors shadow-[6px_6px_0_0_#000] active:translate-y-1 active:shadow-[2px_2px_0_0_#000]"
                  >
                    CHIA SẺ KẾT QUẢ
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6 border-b-4 border-dashed border-black pb-4">
              <span className="font-black text-lg md:text-xl">Câu {currentQuestion + 1}/{QUESTIONS.length}</span>
              <span className="font-black text-lg md:text-xl text-neon-pink border-2 border-black px-2 py-1 bg-black">
                Điểm: {score}
              </span>
            </div>

            <h3 className="text-xl md:text-3xl font-bold mb-8 leading-tight">
              {QUESTIONS[currentQuestion].question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {QUESTIONS[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.isCorrect)}
                  disabled={feedback !== null}
                  className="bg-white border-4 border-black p-3 md:p-4 text-base md:text-lg font-bold hover:bg-bright-yellow hover:-translate-y-1 transition-all shadow-[4px_4px_0_0_#000] text-left disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-white"
                >
                  {String.fromCharCode(65 + index)}. {option.text}
                </button>
              ))}
            </div>

            {feedback && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-3 md:p-4 font-black text-lg md:text-xl text-center border-4 border-black uppercase ${
                  feedback.includes("Chuẩn") 
                    ? "bg-[#00ff00] text-black" 
                    : "bg-tabloid-red text-white animate-jiggle"
                }`}
              >
                {feedback}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
