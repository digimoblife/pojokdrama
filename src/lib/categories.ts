export type CategoryDef = {
    name: string;
    slug: string; // Ini yang muncul di URL browser (misal: /category/anime)
    action: string; // Ini parameter yang dikirim ke API
    color?: string; // Opsional: warna border/text kalau mau variasi
  };
  
  export const CATEGORIES: CategoryDef[] = [
    // 1. Trending
    { name: "Sedang Tren", slug: "trending", action: "trending" },
    
    // 2. Film Indonesia
    { name: "Film Indonesia", slug: "indo-movie", action: "indonesian-movies" },
    
    // 3. Drama Indonesia
    { name: "Drama Indonesia", slug: "indo-drama", action: "indonesian-drama" },
    
    // 4. K-Drama
    { name: "K-Drama", slug: "kdrama", action: "kdrama" },
    
    // 5. Short TV
    { name: "Short TV", slug: "short-tv", action: "short-tv" },
    
    // 6. Anime
    { name: "Anime", slug: "anime", action: "anime" },
  
    // --- KATEGORI BARU ---
    
    // 7. Canda Dewasa
    { name: "Canda Dewasa", slug: "canda-dewasa", action: "adult-comedy" }, 
  
    // 8. Western TV
    { name: "Western TV", slug: "western", action: "western-tv" },
  
    // 9. Indo Dub
    { name: "Indo Dub", slug: "indo-dub", action: "indo-dub" },
  ];
  
  export function getCategoryBySlug(slug: string) {
    return CATEGORIES.find(c => c.slug === slug);
  }