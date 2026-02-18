import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SectionSlider from '@/components/SectionSlider';
import CategoryRow from '@/components/CategoryRow';
import { movieApi } from '@/lib/api';

export default async function Home() {
  const [trending, indoMovies, kdrama, anime] = await Promise.all([
    movieApi.getTrending(),
    movieApi.getIndonesianMovies(),
    movieApi.getKdrama(),
    movieApi.getByCategory('anime'),
  ]);

  const featuredMovie = trending.items?.[0];

  return (
    <main className="bg-[#141414] min-h-screen pb-20 overflow-x-hidden">
      <Navbar />
      
      {/* KEMBALI NORMAL: Langsung Hero Banner tanpa jarak aneh-aneh */}
      {featuredMovie && <Hero item={featuredMovie} />}

      <div className="relative z-20 space-y-4 -mt-10 md:-mt-20">
      <CategoryRow />
      </div>
      
      <div className="relative z-20 space-y-8 -mt-10 md:-mt-20">
        <SectionSlider title="Sedang Trending" items={trending.items} linkHref="/category/trending" />
        <SectionSlider title="Film Indonesia Terbaru" items={indoMovies.items} />
        <SectionSlider title="Drama Korea Pilihan" items={kdrama.items} />
        <SectionSlider title="Anime Populer" items={anime.items} />
      </div>

      <footer className="text-center text-gray-700 text-xs py-10 mt-20 border-t border-gray-900/50">
        <p>© 2026 POJOK DRAMA - Made for Digimob</p>
      </footer>
    </main>
  );
}