import Navbar from '@/components/Navbar';
import MovieCard from '@/components/MovieCard';
import { movieApi } from '@/lib/api';
import { getCategoryBySlug } from '@/lib/categories';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  // 1. Validasi Slug
  const category = getCategoryBySlug(params.slug);
  if (!category) return notFound();

  // 2. Fetch Data
  const data = await movieApi.getByCategory(category.action);

  return (
    <main className="min-h-screen bg-[#141414] text-white">
      <Navbar />
      
      {/* --- STICKY HEADER --- */}
      {/* top-16 artinya dia nempel pas di bawah Navbar (karena navbar tingginya sktr 16 unit) */}
      <div className="pt-20 sticky top-0 z-30 bg-[#141414]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl">
        <div className="py-2">
        </div>
      </div>

      {/* --- KONTEN GRID --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 min-h-[80vh]">
        <div className="flex items-end justify-between mb-8 border-l-4 border-red-600 pl-4">
            <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                    {category.name}
                </h1>
                <p className="text-gray-400 text-sm mt-1">Menampilkan film dan series terpopuler</p>
            </div>
            <span className="bg-gray-800 text-xs px-3 py-1 rounded-full border border-gray-700">
                Page {data.page}
            </span>
        </div>
        
        {data.items?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-6">
            {data.items.map((item, idx) => (
              <MovieCard key={`${item.id}-${idx}`} movie={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 text-gray-500 bg-gray-900/30 rounded-2xl border border-gray-800 border-dashed">
            <p className="text-xl font-medium">Belum ada konten di kategori ini</p>
            <p className="text-sm">Silakan coba kategori lain</p>
          </div>
        )}
      </div>
    </main>
  );
}