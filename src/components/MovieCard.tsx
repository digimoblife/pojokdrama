import { MovieItem } from '@/types/movie';
import Link from 'next/link';
import { Star } from 'lucide-react';

export default function MovieCard({ movie }: { movie: MovieItem }) {
  const encodedPath = encodeURIComponent(movie.detailPath);

  return (
    <Link href={`/watch?path=${encodedPath}`} className="group relative block bg-[#181818] rounded overflow-hidden transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-xl hover:shadow-black">
      <div className="aspect-[2/3] relative">
        <img 
          src={movie.poster} 
          alt={movie.title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
        {/* Rating Badge */}
        <div className="absolute top-1 right-1 bg-black/70 px-1.5 py-0.5 rounded text-[10px] font-bold text-yellow-400 flex items-center gap-1 backdrop-blur-sm">
          <Star className="w-2.5 h-2.5 fill-yellow-400" /> {movie.rating || '?'}
        </div>
      </div>
      <div className="p-2">
        <h3 className="text-xs font-semibold truncate text-gray-200 group-hover:text-white">{movie.title}</h3>
        <div className="flex justify-between items-center mt-1">
            <span className="text-[10px] text-gray-500">{movie.year || 'N/A'}</span>
            <span className="text-[9px] border border-gray-700 text-gray-400 px-1 rounded uppercase">{movie.type || 'MOV'}</span>
        </div>
      </div>
    </Link>
  );
}