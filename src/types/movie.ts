export interface MovieItem {
  id: string;
  title: string;
  poster: string;
  rating?: number | string;
  year?: string;
  type?: 'movie' | 'tv';
  genre?: string;
  detailPath: string;
}

export interface ApiResponse {
  success: boolean;
  items: MovieItem[];
  page: number;
  hasMore: boolean;
}

export interface Episode {
  episode: number | string;
  title: string;
  playerUrl: string; // Ternyata namanya playerUrl, bukan url
}

export interface Season {
  season: number;
  episodes: Episode[];
}

export interface MovieDetail extends MovieItem {
  description?: string;
  playerUrl?: string;
  seasons?: Season[]; // Kita tambah support untuk seasons
  trailerUrl?: string;
}