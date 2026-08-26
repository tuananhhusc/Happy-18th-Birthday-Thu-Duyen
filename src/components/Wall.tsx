'use client';

import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

type Wish = {
  id: string;
  author: string;
  message: string;
  image_url: string | null;
  created_at: string;
  hahas?: number;
  react_like?: number;
  react_love?: number;
  react_haha?: number;
  react_wow?: number;
  react_sad?: number;
  react_angry?: number;
  audio_url?: string | null;
};

export default function Wall() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  
  // Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(0); // start from page 0
  const [hasMore, setHasMore] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const ITEMS_PER_PAGE = 6;

  // Fetch on mount
  useEffect(() => {
    fetchWishes(0);
  }, []);

  const handleTitleClick = () => {
    setClickCount(prev => {
      const next = prev + 1;
      if (next === 6) {
        setIsAdmin(true);
        toast.success("Đã bật chế độ Admin!");
        return 0;
      }
      return next;
    });
  };

  const fetchWishes = async (pageNumber: number) => {
    setLoading(true);
    const from = pageNumber * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error(error);
    } else if (data) {
      if (pageNumber === 0) {
        setWishes(data as Wish[]);
      } else {
        setWishes(prev => [...prev, ...(data as Wish[])]);
      }
      setHasMore(data.length === ITEMS_PER_PAGE);
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchWishes(nextPage);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioURL(URL.createObjectURL(blob));
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      toast.error('Không thể truy cập micro! Vui lòng cấp quyền.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const removeAudio = () => {
    setAudioBlob(null);
    setAudioURL(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !message) {
      toast.error('Nhập đủ tên và lời bóc phốt nha bạn êi! 🙄');
      return;
    }

    setSubmitting(true);
    let uploadedImageUrl = null;
    let uploadedAudioUrl = null;

    // Upload Image
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `public/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('wishes_images')
        .upload(filePath, file);
        
      if (uploadError) {
        toast.error('Lỗi upload ảnh! Bạn đã tạo bucket "wishes_images" trên Supabase chưa? 😅');
        setSubmitting(false);
        return;
      }
      
      const { data: publicUrlData } = supabase.storage
        .from('wishes_images')
        .getPublicUrl(filePath);
        
      uploadedImageUrl = publicUrlData.publicUrl;
    }

    // Upload Audio
    if (audioBlob) {
      const fileName = `audio_${Math.random()}.webm`;
      const filePath = `public/${fileName}`;
      
      const { error: audioUploadError } = await supabase.storage
        .from('wishes_images')
        .upload(filePath, audioBlob, { contentType: 'audio/webm' });
        
      if (audioUploadError) {
        toast.error('Lỗi upload ghi âm!');
        setSubmitting(false);
        return;
      }
      
      const { data: audioUrlData } = supabase.storage
        .from('wishes_images')
        .getPublicUrl(filePath);
        
      uploadedAudioUrl = audioUrlData.publicUrl;
    }

    // Insert into database
    const { data, error } = await supabase
      .from('wishes')
      .insert([{ 
        author, 
        message, 
        image_url: uploadedImageUrl,
        audio_url: uploadedAudioUrl
      }])
      .select();
      
    if (!error && data) {
      toast.success('Bóc phốt thành công! Đã dán lên tường! 📌');
      setAuthor('');
      setMessage('');
      setFile(null);
      removeAudio();
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      // Prepend to current state to avoid refetching everything
      setWishes(prev => [data[0] as Wish, ...prev]);
    } else {
      console.error(error);
      toast.error('Lỗi lưu dữ liệu. Hãy kiểm tra console hoặc chạy SQL tạo cột audio_url.');
    }
    setSubmitting(false);
  };

  const handleReact = async (id: string, reactType: string) => {
    const field = `react_${reactType}` as keyof Wish;

    // Optimistic UI update
    setWishes(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, [field]: ((w[field] as number) || 0) + 1 };
      }
      return w;
    }));
    
    // Close the menu after clicking
    setOpenMenuId(null);

    // Getting current value to send to DB
    const currentWish = wishes.find(w => w.id === id);
    const currentValue = (currentWish?.[field] as number) || 0;

    // DB update
    const { data, error } = await supabase
      .from('wishes')
      .update({ [field]: currentValue + 1 })
      .eq('id', id)
      .select();

    if (error || !data || data.length === 0) {
      console.error("Lỗi cập nhật react (thường do thiếu cột hoặc lỗi RLS)", error);
      toast.error("Lỗi lưu cảm xúc! Có thể Supabase chưa cấp quyền UPDATE (RLS) hoặc chưa có cột.");
      
      // Revert optimistic update
      setWishes(prev => prev.map(w => {
        if (w.id === id) {
          return { ...w, [field]: currentValue }; // Revert to old value
        }
        return w;
      }));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Chắc chắn xoá bóc phốt này?")) return;
    
    setWishes(prev => prev.filter(w => w.id !== id));
    await supabase.from('wishes').delete().eq('id', id);
    toast.success("Đã xoá!");
  };

  const rotations = ['rotate-[-3deg]', 'rotate-[2deg]', 'rotate-[-2deg]', 'rotate-[4deg]', 'rotate-[0deg]', 'rotate-[3deg]', 'rotate-[-4deg]'];
  const cardColors = [
    'bg-[#ffde00]', // Vàng tươi
    'bg-[#ff107a] text-white', // Hồng neon
    'bg-[#00f0ff]', // Xanh cyan
    'bg-[#00ff00]', // Xanh lá mạ
    'bg-[#b28dff]', // Tím pastel
    'bg-[#ff9c5b]', // Cam
    'bg-white' // Trắng
  ];

  return (
    <section className="w-full py-20 px-4 flex flex-col items-center bg-[#ffe4e6] border-b-8 border-tabloid-red relative z-10">
      
      <div 
        onClick={handleTitleClick}
        className="bg-black text-white px-8 py-3 mb-12 font-black text-3xl md:text-4xl uppercase rotate-[-2deg] shadow-[8px_8px_0_0_#ffde00] select-none cursor-pointer"
      >
        BỨC TƯỜNG DÌM HÀNG
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Section */}
        <div className="col-span-1">
          <form 
            onSubmit={handleSubmit} 
            className="bg-white border-8 border-black p-6 shadow-[12px_12px_0_0_rgba(0,0,0,1)] sticky top-8 z-30"
          >
            <h3 className="text-2xl font-black mb-6 uppercase border-b-4 border-black pb-2 text-tabloid-red">
              Gửi lời chúc bá đạo
            </h3>
            
            <div className="mb-4">
              <label className="block font-bold text-lg mb-2">Tên người chúc:</label>
              <input 
                type="text" 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="w-full border-4 border-black p-3 text-lg font-sans focus:outline-none focus:bg-bright-yellow transition-colors"
                placeholder="VD: Kẻ thù truyền kiếp"
              />
            </div>
            
            <div className="mb-4">
              <label className="block font-bold text-lg mb-2">Lời chúc / Bóc phốt:</label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full border-4 border-black p-3 text-lg font-sans focus:outline-none focus:bg-bright-yellow transition-colors"
                placeholder="Chúc bả bớt khùng đi..."
              />
            </div>
            
            <div className="mb-6 border-4 border-black p-4 bg-gray-50 flex flex-col gap-4">
              <label className="block font-bold text-lg">Đính kèm ảnh & Ghi âm (Tuỳ chọn):</label>
              
              {/* Image Input */}
              <input 
                type="file" 
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full border-2 border-black p-2 text-sm font-sans focus:outline-none focus:bg-bright-yellow transition-colors bg-white cursor-pointer"
              />

              {/* Audio Record Button */}
              <div className="flex flex-col gap-2">
                {!audioURL ? (
                  <button 
                    type="button"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`border-2 border-black font-black px-2 md:px-4 py-2 text-sm md:text-base flex items-center justify-center gap-2 transition-colors ${
                      isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-white hover:bg-bright-yellow text-black'
                    }`}
                  >
                    {isRecording ? '🛑 ĐANG THU (BẤM ĐỂ DỪNG)' : '🎙️ GHI ÂM CHỬI MẮNG'}
                  </button>
                ) : (
                  <div className="flex items-center gap-2 border-2 border-black bg-white p-2">
                    <audio src={audioURL} controls className="h-10 flex-1 min-w-0 w-full" />
                    <button type="button" onClick={removeAudio} className="text-xl hover:scale-125 transition-transform shrink-0 px-2" title="Xoá ghi âm">
                      🗑️
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={submitting}
              className="w-full bg-neon-pink text-white font-black text-xl py-4 border-4 border-black hover:bg-black hover:text-neon-pink transition-colors shadow-[6px_6px_0_0_#000] active:translate-y-1 active:shadow-[2px_2px_0_0_#000] uppercase disabled:opacity-50"
            >
              {submitting ? 'ĐANG TẢI LÊN...' : 'DÁN LÊN TƯỜNG! 📌'}
            </button>
          </form>
        </div>

        {/* Masonry Grid Section */}
        <div className="col-span-1 lg:col-span-2">
          {loading && wishes.length === 0 ? (
            <div className="bg-white border-4 border-dashed border-black p-10 text-center font-bold text-xl rotate-1">
              Đang tải bóc phốt... 🤡
            </div>
          ) : wishes.length === 0 ? (
            <div className="bg-white border-4 border-dashed border-black p-10 text-center font-bold text-xl rotate-1">
              Chưa ai dám bóc phốt. Hãy là người mở bát! 🤡
            </div>
          ) : (
            <>
              <div className="masonry-grid">
                {wishes.map((wish, i) => {
                  const rotation = rotations[i % rotations.length];
                  const color = cardColors[i % cardColors.length];
                  
                  return (
                    <div key={wish.id} className={`masonry-item ${rotation} transition-transform hover:rotate-0 hover:z-20 hover:scale-105 duration-200 cursor-default relative w-full overflow-hidden`}>
                      <div className={`${color} border-4 border-black p-4 md:p-5 shadow-[4px_4px_0_0_rgba(0,0,0,1)] md:shadow-[6px_6px_0_0_rgba(0,0,0,1)] relative`}>
                        
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-4 bg-[rgba(255,255,255,0.5)] border-2 border-black rotate-[-5deg]"></div>

                        {isAdmin && (
                          <button 
                            onClick={() => handleDelete(wish.id)}
                            className="absolute -top-4 -right-4 w-10 h-10 bg-red-600 text-white border-2 border-black flex items-center justify-center rounded-full z-30 font-black hover:scale-110"
                            title="Xoá bài này"
                          >
                            X
                          </button>
                        )}

                        {wish.image_url && (
                          <div className="border-4 border-black mb-4 bg-white p-2 pb-6 shadow-sm group">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src={wish.image_url} 
                              alt="Ảnh dìm" 
                              className="w-full h-auto object-cover max-h-64 border-2 border-black grayscale group-hover:grayscale-0 transition-all duration-300"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        
                        <p className="font-bold text-lg md:text-xl mb-4 leading-snug whitespace-pre-wrap break-words">
                          "{wish.message}"
                        </p>

                        {/* Audio Player if audio exists */}
                        {wish.audio_url && (
                          <div className="mb-4 w-full">
                            <audio controls src={wish.audio_url} className="w-full h-10 border-2 border-black min-w-0" />
                          </div>
                        )}
                        
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t-2 border-black border-dashed pt-2 mt-2 gap-2">
                          <div className="relative">
                            <button 
                              onClick={() => setOpenMenuId(openMenuId === wish.id ? null : wish.id)}
                              className="bg-white text-black border-2 border-black px-3 py-1 rounded-full text-sm hover:bg-gray-200 font-black flex items-center gap-1 active:scale-90 transition-all"
                            >
                              👍 Thả Cảm Xúc
                            </button>
                            
                            {openMenuId === wish.id && (
                              <div className="absolute bottom-full left-0 mb-2 flex items-center gap-2 bg-white border-4 border-black p-2 rounded-full shadow-[4px_4px_0_0_#000] z-[100] animate-in fade-in zoom-in duration-200">
                                {[
                                  { id: 'like', icon: '👍', label: 'Thích' },
                                  { id: 'love', icon: '❤️', label: 'Yêu' },
                                  { id: 'haha', icon: '😂', label: 'Haha' },
                                  { id: 'wow', icon: '😮', label: 'Wow' },
                                  { id: 'sad', icon: '😢', label: 'Buồn' },
                                  { id: 'angry', icon: '😡', label: 'Phẫn nộ' }
                                ].map(r => (
                                  <button 
                                    key={r.id} 
                                    onClick={() => handleReact(wish.id, r.id)}
                                    className="text-2xl hover:scale-125 transition-transform origin-bottom"
                                    title={r.label}
                                  >
                                    {r.icon}
                                  </button>
                                ))}
                              </div>
                            )}

                            <div className="flex gap-1 mt-2 flex-wrap">
                              {[
                                { id: 'like', icon: '👍' },
                                { id: 'love', icon: '❤️' },
                                { id: 'haha', icon: '😂' },
                                { id: 'wow', icon: '😮' },
                                { id: 'sad', icon: '😢' },
                                { id: 'angry', icon: '😡' }
                              ].map(r => {
                                // For haha, include legacy 'hahas' count
                                const val = (wish[`react_${r.id}` as keyof Wish] as number) || 0;
                                const count = r.id === 'haha' ? val + (wish.hahas || 0) : val;
                                
                                if (count > 0) {
                                  return (
                                    <span key={r.id} className="text-sm font-bold bg-white/70 border border-black px-1 rounded-full flex items-center gap-1">
                                      {r.icon} {count}
                                    </span>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          </div>
                          <p className="font-black text-right uppercase text-sm w-full md:w-auto mt-2 md:mt-0">
                            - {wish.author} -
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center mt-8">
                  <button 
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="bg-black text-white font-black px-8 py-3 border-4 border-black shadow-[4px_4px_0_0_#00f0ff] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#00f0ff] transition-all disabled:opacity-50"
                  >
                    {loading ? 'ĐANG TẢI...' : 'TẢI THÊM PHỐT 🤡'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        
      </div>
    </section>
  );
}
