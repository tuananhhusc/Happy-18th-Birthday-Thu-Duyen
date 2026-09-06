'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.6; // Đặt âm lượng vừa phải

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        // Trình duyệt chặn autoplay, chờ người dùng tương tác
        console.log("Autoplay blocked. Waiting for interaction...");
      }
    };

    // Thử phát nhạc ngay lập tức
    playAudio();

    // Nếu trình duyệt chặn, phát ngay khi người dùng click bất cứ đâu
    const handleInteraction = () => {
      if (audio.paused) {
        playAudio();
      }
      // Sau khi tương tác thì gỡ event để tối ưu
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('scroll', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2">
      <audio 
        ref={audioRef} 
        loop
        src="/background-music.mp3" 
      />
      
      <button 
        onClick={togglePlay}
        className="w-14 h-14 bg-bright-yellow border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] active:translate-y-1 active:shadow-[2px_2px_0_0_#000] transition-all"
        title="Bật nhạc quẩy"
      >
        {isPlaying ? <Pause size={28} fill="black" /> : <Play size={28} fill="black" className="ml-1" />}
      </button>

      {isPlaying && (
        <div className="bg-white border-4 border-black px-4 py-2 font-black shadow-[4px_4px_0_0_#ff107a] animate-jiggle text-sm">
          Đang quẩy nhạc... 🎵
        </div>
      )}
    </div>
  );
}
