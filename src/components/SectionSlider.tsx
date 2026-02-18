import { MovieItem } from '@/types/movie';
import MovieCard from './MovieCard';

export default function SectionSlider({ title, items }: { title: string, items: MovieItem[] }) {
  if (!items?.length) return null;

  return (
    <section className="py-6 pl-4 md:pl-8">
      <h2 className="text-lg md:text-xl font-bold mb-3 text-white hover:text-red-500 transition cursor-pointer inline-block">{title} &gt;</h2>
      <div className="flex overflow-x-auto gap-3 pb-4 pr-4 snap-x scrollbar-hide">
        {items.map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="snap-start shrink-0 w-[130px] md:w-[160px]">
            <MovieCard movie={item} />
          </div>
        ))}
      </div>
    </section>
  );
}