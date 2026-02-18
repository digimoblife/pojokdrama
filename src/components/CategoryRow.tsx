'use client';

import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';
import { LayoutGrid } from 'lucide-react';

const GRADIENTS = [
  // HAPUS warna pertama (Trending) karena akan kita skip
  'from-blue-600 to-indigo-600',    // Indo
  'from-emerald-600 to-teal-600',   // Drama Indo
  'from-purple-600 to-fuchsia-600', // K-Drama
  'from-orange-500 to-red-500',     // Short TV
  'from-cyan-500 to-blue-500',      // Anime
  'from-rose-600 to-pink-600',      // Canda Dewasa
  'from-slate-600 to-slate-500',    // Western
  'from-violet-600 to-purple-600',  // Indo Dub
];

export default function CategoryRow() {
  // FILTER: Ambil semua kategori KECUALI 'trending'
  const displayCategories = CATEGORIES.filter(cat => cat.slug !== 'trending');

  return (
    <section className="py-8 px-4 md:px-8 mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-red-600/20 to-purple-600/20 rounded-lg border border-white/5">
           <LayoutGrid className="w-5 h-5 text-red-500" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">Jelajahi Kategori</h2>
      </div>
      
      {/* GRID 4 KOLOM (Desktop)
          - Mobile: 2 Kolom
          - Tablet: 3 Kolom
          - Desktop: 4 Kolom (Pas 2 Baris x 4 Kotak = 8 Item)
      */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {displayCategories.map((cat, idx) => {
          const gradient = GRADIENTS[idx % GRADIENTS.length];
          
          return (
            <Link 
              key={cat.slug} 
              href={`/category/${cat.slug}`}
              className="relative group h-[80px] md:h-[100px] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-red-500/10"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30 group-hover:opacity-90 transition-opacity duration-300`}></div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300"></div>
              <div className="absolute inset-0 border border-white/10 group-hover:border-white/40 rounded-xl transition-colors"></div>

              <div className="absolute inset-0 flex items-center justify-center p-2 z-10">
                <span className="font-bold text-sm md:text-lg text-gray-100 group-hover:text-white tracking-wide text-center drop-shadow-lg transition-transform group-hover:-translate-y-1">
                  {cat.name}
                </span>
              </div>
              
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-white rounded-t-full group-hover:w-12 transition-all duration-300 opacity-80"></div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}