import { MovieItem } from '@/types/movie';
import Link from 'next/link';
import { Play, Info } from 'lucide-react';

export default function Hero({ item }: { item: MovieItem }) {
  if (!item) return null;
  const encodedPath = encodeURIComponent(item.detailPath);

  return (
    <div className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden">
      {/* Background Blur */}
      <div className="absolute inset-0">
        <img src={item.poster} className="w-full h-full object-cover blur-3xl opacity-40 scale-125" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/80 to-transparent" />
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-center pb-12 md:pb-0">
        <div className="flex flex-col md:flex-row md:items-end gap-8">
            {/* Poster Asli */}
            <div className="hidden md:block w-[220px] shrink-0 rounded-lg overflow-hidden shadow-2xl border border-white/10 rotate-2 hover:rotate-0 transition duration-500">
                <img src={item.poster} className="w-full" />
            </div>

            <div className="max-w-2xl space-y-4">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Trending #1</span>
                <h1 className="text-4xl md:text-6xl font-black text-white leading-none drop-shadow-xl">{item.title}</h1>
                <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
                    <span className="text-green-400">98% Match</span>
                    <span>{item.year}</span>
                    <span className="border border-white/30 px-1 rounded text-xs">{item.type || 'TV'}</span>
                </div>
                <p className="text-gray-300 line-clamp-3 md:text-lg">Tonton sekarang {item.title} di Pojok Drama. Streaming lancar server lokal Indonesia.</p>
                
                <div className="flex gap-3 pt-2">
                    <Link href={`/watch?path=${encodedPath}`} className="bg-white text-black px-6 py-2.5 rounded font-bold flex items-center gap-2 hover:bg-gray-200 transition">
                        <Play className="fill-black w-4 h-4" /> Play
                    </Link>
                    <button className="bg-gray-500/40 text-white px-6 py-2.5 rounded font-bold flex items-center gap-2 hover:bg-gray-500/60 transition backdrop-blur-sm">
                        <Info className="w-4 h-4" /> Detail
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}