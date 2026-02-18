export type CategoryDef = {
    name: string;
    slug: string; // Ini yang muncul di URL browser (misal: /category/anime)
    action: string; // Ini parameter yang dikirim ke API
    color?: string; // Opsional: warna border/text kalau mau variasi
  };
  
  export const CATEGORIES: CategoryDef[] = [
    { name: "Sedang Tren", slug: "trending", action: "trending" },
    { name: "Film Indonesia", slug: "indo-movie", action: "indonesian-movies" },
    { name: "Drama Indonesia", slug: "indo-drama", action: "indonesian-drama" },
    { name: "K-Drama", slug: "kdrama", action: "kdrama" },
    { name: "Short TV", slug: "short-tv", action: "short-tv" },
    { name: "Anime", slug: "anime", action: "anime" },
    // Kategori tambahan dari screenshot (Cuma tebakan endpoint, sesuaikan jika error)
    // { name: "Western TV", slug: "western", action: "western-series" }, 
  ];
  
  export function getCategoryBySlug(slug: string) {
    return CATEGORIES.find(c => c.slug === slug);
  }