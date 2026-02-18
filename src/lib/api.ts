import { ApiResponse, MovieDetail } from "@/types/movie";

const BASE_URL = "https://foodcash.com.br/sistema/apiv4/api.php";

async function fetchAPI<T>(params: Record<string, string | number>): Promise<T> {
  const url = new URL(BASE_URL);
  Object.keys(params).forEach(key => url.searchParams.append(key, String(params[key])));
  
  try {
    const res = await fetch(url.toString(), { 
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      next: { revalidate: 0 } 
    });
    
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("API Error:", error);
    return { items: [] } as unknown as T;
  }
}

export const movieApi = {
  getTrending: (page = 1) => fetchAPI<ApiResponse>({ action: 'trending', page }),
  getIndonesianMovies: (page = 1) => fetchAPI<ApiResponse>({ action: 'indonesian-movies', page }),
  getKdrama: (page = 1) => fetchAPI<ApiResponse>({ action: 'kdrama', page }),
  search: (keyword: string) => fetchAPI<ApiResponse>({ action: 'search', q: keyword }),
  getByCategory: (action: string, page = 1) => fetchAPI<ApiResponse>({ action, page }),
  
  // FIX FINAL: Ambil data dari property 'data'
  getDetail: async (detailPath: string): Promise<MovieDetail> => {
    const res = await fetchAPI<any>({ action: 'detail', detailPath });
    // Berdasarkan JSON kamu: Data ada di res.data
    return res.data || res; 
  }
};