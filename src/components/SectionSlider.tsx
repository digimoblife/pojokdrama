'use client';

// Menggunakan nama asli yang ada di file kamu: MovieItem
import { MovieItem } from '@/types/movie'; 
import MovieCard from './MovieCard';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronRight as ChevronIcon } from 'lucide-react';
import Link from 'next/link';

interface SectionSliderProps {
  title: string;
  items: MovieItem[]; // Sesuaikan di sini juga
  linkHref?: string; 
}

export default function SectionSlider({ title, items, linkHref }: SectionSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="py-8 px-4 md:px-8 relative group/section">
      <div className="flex items-center justify-between mb-4 text-white">
        <h2 className="text-xl md:text-2xl font-bold border-l-4 border-red-600 pl-3 uppercase tracking-tight">
            {title}
        </h2>
        
        {linkHref && (
            <Link 
                href={linkHref}
                className="flex items-center gap-1 text-xs md:text-sm font-semibold text-red-500 hover:text-white transition-colors group/link"
            >
                Lihat Semua 
                <ChevronIcon className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
        )}
      </div>

      <div className="relative">
        <button 
          onClick={() => scroll('left')} 
          className="absolute left-0 top-0 bottom-0 z-10 bg-black/50 hover:bg-black/80 p-2 opacity-0 group-hover/section:opacity-100 transition-opacity hidden md:flex items-center justify-center w-12"
        >
          <ChevronLeft className="text-white w-8 h-8" />
        </button>

        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          {items.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex-none w-[160px] md:w-[220px]">
              <MovieCard movie={item} />
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')} 
          className="absolute right-0 top-0 bottom-0 z-10 bg-black/50 hover:bg-black/80 p-2 opacity-0 group-hover/section:opacity-100 transition-opacity hidden md:flex items-center justify-center w-12"
        >
          <ChevronRight className="text-white w-8 h-8" />
        </button>
      </div>
    </section>
  );
}