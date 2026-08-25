'use client';

import { useState, useRef } from 'react';
import { Music, Play, Pause } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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
