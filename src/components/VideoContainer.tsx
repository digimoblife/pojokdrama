'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

export default function VideoContainer({ originalUrl }: { originalUrl?: string }) {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [mode, setMode] = useState<'loading' | 'direct' | 'iframe' | 'error'>('loading');

  useEffect(() => {
    if (!originalUrl) {
      setMode('error');
      return;
    }

    // Reset state kalau URL berubah (ganti episode)
    setMode('loading');
    setVideoSrc(null);

    const extractVideo = async () => {
      try {
        // Panggil Mata-mata (API Route) kita
        const res = await fetch(`/api/extract?url=${encodeURIComponent(originalUrl)}`);
        const data = await res.json();

        if (data.success && data.url) {
          console.log("Berhasil bongkar player! Link asli:", data.url);
          setVideoSrc(data.url);
          setMode('direct'); // Hore! Dapat link asli
        } else {
          console.log("Gagal bongkar, fallback ke iframe.");
          setMode('iframe'); // Gagal, pakai cara lama
        }
      } catch (err) {
        console.error("Error extraction:", err);
        setMode('iframe');
      }
    };

    extractVideo();
  }, [originalUrl]);

  return (
    <div className="aspect-video w-full md:h-[85vh] md:aspect-auto relative mx-auto max-w-[1600px] bg-black">
      {/* STATE LOADING */}
      {mode === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-red-600" />
          <p className="text-sm font-medium animate-pulse">Sedang mencari link video terbaik...</p>
        </div>
      )}

      {/* STATE DIRECT (VIDEO ASLI TANPA IKLAN) */}
      {mode === 'direct' && videoSrc && (
        <video 
          src={videoSrc} 
          controls 
          autoPlay 
          className="w-full h-full object-contain"
          controlsList="nodownload" // Sedikit mempersulit download
        />
      )}

      {/* STATE IFRAME (SANDBOX - CARA LAMA) */}
      {mode === 'iframe' && (
        <iframe 
          src={originalUrl} 
          className="w-full h-full border-0" 
          allowFullScreen 
          // Tetap pasang sandbox buat jaga-jaga
          sandbox="allow-forms allow-scripts allow-same-origin allow-presentation"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      )}

      {/* STATE ERROR */}
      {mode === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-3">
          <AlertTriangle className="w-12 h-12 text-yellow-500" />
          <p>Video tidak tersedia</p>
        </div>
      )}
    </div>
  );
}