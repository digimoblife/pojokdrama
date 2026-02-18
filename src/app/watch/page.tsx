import Navbar from '@/components/Navbar';
import { movieApi } from '@/lib/api';
import { Calendar, Star, PlayCircle, Film, AlertTriangle, Play } from 'lucide-react';
import Link from 'next/link';
import { Episode } from '@/types/movie';

const safeEncode = (str: string) => encodeURIComponent(str);

// Komponen Client Kecil untuk Video Player (Supaya bisa fetch di sisi client)
// Kita pisah biar rapi
import VideoContainer from '@/components/VideoContainer'; 

export default async function WatchPage({ 
  searchParams 
}: { 
  searchParams: { path: string; play?: string } 
}) {
  const detailPath = searchParams.path;
  const playUrl = searchParams.play;

  if (!detailPath) return <div className="text-white pt-20 text-center">Data tidak ditemukan</div>;

  const movie = await movieApi.getDetail(detailPath);

  // Normalisasi Episode
  let allEpisodes: Episode[] = [];
  if (movie.seasons && movie.seasons.length > 0) {
    movie.seasons.forEach(season => {
      allEpisodes = [...allEpisodes, ...season.episodes];
    });
  }

  // Tentukan URL Target (Entah itu movie atau episode)
  let targetUrl = playUrl;
  if (!targetUrl) {
    if (allEpisodes.length > 0) targetUrl = allEpisodes[0].playerUrl;
    else targetUrl = movie.playerUrl;
  }

  return (
    <main className="min-h-screen bg-[#141414] text-gray-200 font-sans">
      <Navbar />
      
      {/* KITA PANGGIL KOMPONEN PLAYER YANG BARU */}
      <div className="w-full bg-black pt-16 relative group">
         <VideoContainer originalUrl={targetUrl} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-400">
                <span className="flex items-center gap-1 text-green-500"><Star className="w-4 h-4 fill-current"/> {movie.rating || 'N/A'}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {movie.year || 'TBA'}</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full text-xs text-white border border-gray-700 uppercase">{movie.genre || 'Film'}</span>
              </div>
            </div>
            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800/50 shadow-xl">
              <h3 className="text-white font-bold mb-3 border-l-4 border-red-600 pl-3 text-lg">Sinopsis</h3>
              <p className="leading-relaxed text-gray-300">{movie.description || "Tidak ada deskripsi."}</p>
            </div>
          </div>

          {allEpisodes.length > 0 ? (
            <div className="lg:col-span-1">
              <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden flex flex-col h-[500px]">
                <div className="p-4 border-b border-gray-700 bg-[#222] flex justify-between items-center sticky top-0 z-10">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Film className="w-4 h-4 text-red-600" /> 
                    <span>{allEpisodes.length} Episodes</span>
                  </h3>
                </div>
                <div className="overflow-y-auto p-2 space-y-1 custom-scrollbar flex-1">
                  {allEpisodes.map((eps, idx) => {
                    const isActive = targetUrl === eps.playerUrl;
                    return (
                      <Link 
                        key={idx} 
                        href={`/watch?path=${safeEncode(detailPath)}&play=${safeEncode(eps.playerUrl)}`}
                        scroll={false} 
                        className={`block p-3 rounded-lg transition-all duration-200 group border ${isActive ? 'bg-red-900/20 border-red-600/50' : 'hover:bg-gray-800 border-transparent hover:border-gray-700'}`}
                      >
                         <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <PlayCircle className={`w-8 h-8 shrink-0 ${isActive ? 'text-red-500 fill-red-500/20' : 'text-gray-500 group-hover:text-white'}`} />
                            <span className={`text-sm font-medium truncate ${isActive ? 'text-red-400' : 'text-gray-300 group-hover:text-white'}`}>{eps.title || `Episode ${idx + 1}`}</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}