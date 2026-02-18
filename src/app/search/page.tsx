import Navbar from '@/components/Navbar';
import MovieCard from '@/components/MovieCard';
import { movieApi } from '@/lib/api';

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q || '';
  // Kalau kosong, return array kosong biar gak error
  const result = query ? await movieApi.search(query) : { items: [] };

  return (
    <main className="min-h-screen bg-[#141414] text-white">
      <Navbar />
      
      <div className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-600 pl-4">
          Hasil pencarian: <span className="text-gray-400 italic">"{query}"</span>
        </h2>
        
        {result.items?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {result.items.map((item, idx) => (
              <MovieCard key={`${item.id}-${idx}`} movie={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <p className="text-lg">Tidak ditemukan film dengan kata kunci tersebut.</p>
            <p className="text-sm">Coba cari judul lain...</p>
          </div>
        )}
      </div>
    </main>
  );
}