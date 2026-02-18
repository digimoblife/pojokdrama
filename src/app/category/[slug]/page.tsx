import Navbar from '@/components/Navbar';
import MovieCard from '@/components/MovieCard';
import { movieApi } from '@/lib/api';
import { getCategoryBySlug } from '@/lib/categories';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default async function CategoryPage({ 
  params, 
  searchParams 
}: { 
  params: { slug: string };
  searchParams: { page?: string }; 
}) {
  const category = getCategoryBySlug(params.slug);
  if (!category) return notFound();

  // Ambil halaman dari URL, default ke 1
  const currentPage = Number(searchParams.page) || 1;
  const data = await movieApi.getByCategory(category.action, currentPage);

  // Logika Pagination
  const hasNextPage = data.items?.length > 0;
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = hasNextPage ? currentPage + 1 : null;

  return (
    <main className="min-h-screen bg-[#141414] text-white">
      <Navbar />
      <div className="pt-24"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 mb-20">
        <div className="flex items-end justify-between mb-8 border-l-4 border-red-600 pl-4">
            <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                    {category.name}
                </h1>
                <p className="text-gray-400 text-sm mt-1">Halaman {currentPage}</p>
            </div>
        </div>
        
        {data.items?.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-6 min-h-[50vh]">
              {data.items.map((item, idx) => (
                <MovieCard key={`${item.id}-${idx}`} movie={item} />
              ))}
            </div>

            {/* NAVIGASI HALAMAN */}
            <div className="flex justify-center items-center gap-4 mt-16 border-t border-gray-800 pt-8">
              {prevPage ? (
                <Link
                  href={`/category/${params.slug}?page=${prevPage}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 hover:bg-red-600 text-white transition-all font-bold"
                >
                  <ChevronLeft className="w-5 h-5" /> Prev
                </Link>
              ) : (
                <button disabled className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-gray-600 cursor-not-allowed font-bold">
                  <ChevronLeft className="w-5 h-5" /> Prev
                </button>
              )}

              <span className="text-gray-500 font-mono text-lg px-4">Page {currentPage}</span>

              {nextPage && (
                <Link
                  href={`/category/${params.slug}?page=${nextPage}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 hover:bg-red-600 text-white transition-all font-bold"
                >
                  Next <ChevronRight className="w-5 h-5" />
                </Link>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-40 text-gray-500">
            <p>Tidak ada film di halaman ini.</p>
            {prevPage && (
               <Link href={`/category/${params.slug}?page=1`} className="text-red-500 underline mt-2 block">
                 Kembali ke Halaman 1
               </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
}