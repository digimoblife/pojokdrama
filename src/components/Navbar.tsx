'use client';

import Link from 'next/link';
import { Search, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = useDebouncedCallback((term: string) => {
    if (term) router.push(`/search?q=${term}`);
    else router.push('/');
  }, 500);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'} py-4`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-red-600 font-bold text-2xl tracking-tighter hover:scale-105 transition flex items-center gap-1">
          POJOK<span className="text-white">DRAMA</span>
        </Link>
        
        {/* SEARCH BAR */}
        <div className="flex items-center gap-4">
          <div className={`flex items-center ${isScrolled ? 'bg-black border border-gray-700' : 'bg-black/40 border border-white/20 backdrop-blur'} rounded-full px-3 py-1.5 transition-all focus-within:border-white focus-within:bg-black`}>
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Cari film..." 
              className="bg-transparent border-none focus:ring-0 text-sm text-white px-2 w-28 md:w-56 placeholder-gray-400 focus:outline-none transition-all"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="w-8 h-8 rounded bg-gradient-to-br from-red-600 to-purple-600 hidden md:flex items-center justify-center font-bold text-xs shadow-lg">
            DM
          </div>
        </div>
      </div>
    </nav>
  );
}