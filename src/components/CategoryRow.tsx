'use client';

import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';
import { LayoutGrid } from 'lucide-react';

const GRADIENTS = [
  'from-pink-500 via-red-500 to-yellow-500',
  'from-blue-400 via-indigo-500 to-purple-500',
  'from-green-400 via-emerald-500 to-teal-500',
  'from-orange-400 via-pink-500 to-purple-600',
  'from-yellow-400 via-orange-500 to-red-500',
  'from-cyan-400 via-blue-500 to-indigo-600',
  'from-fuchsia-500 via-purple-600 to-pink-500',
];

export default function CategoryRow() {
  return (
    // UPDATED: Tambahkan 'mb-20' (80px) biar ada jarak jauh ke bawah
    <section className="py-6 px-4 md:px-8 mb-20">
      
      <div className="flex items-center gap-2 mb-4 text-white">
        <LayoutGrid className="w-5 h-5 text-red-600" />
        <h2 className="text-lg md:text-xl font-bold">Browse by Category</h2>
      </div>
      
      {/* LAYOUT LOGIC:
         - Mobile: 'flex' (Scroll samping)
         - Desktop (md): 'grid' (Bagi 6 kolom rata, fix tanpa scroll)
      */}
      <div className="flex md:grid md:grid-cols-6 gap-3 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide snap-x">
        {CATEGORIES.map((cat, idx) => {
          const gradient = GRADIENTS[idx % GRADIENTS.length];
          
          return (
            <Link 
              key={cat.slug} 
              href={`/category/${cat.slug}`}
              // UPDATED: Mobile w-[130px] (kecil), Desktop w-auto (ikut grid)
              className="snap-start group relative shrink-0 w-[130px] h-[70px] md:w-auto md:h-[100px] transition-transform duration-300 hover:scale-105"
            >
              {/* Layer Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-lg blur-[2px] opacity-70 group-hover:opacity-100 group-hover:blur-md transition-all duration-500`}></div>
              
              {/* Layer Content */}
              <div className="absolute inset-[1.5px] bg-[#1a1a1a] rounded-[7px] flex flex-col items-center justify-center p-2 z-10 group-hover:bg-[#222] transition-colors">
                {/* UPDATED: Hapus teks Explore, pertebal font nama kategori */}
                <span className={`font-bold text-sm md:text-lg text-transparent bg-clip-text bg-gradient-to-br ${gradient} text-center leading-tight drop-shadow-sm`}>
                  {cat.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}