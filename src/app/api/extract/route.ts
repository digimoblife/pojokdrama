import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    // 1. Server kamu menyamar jadi Browser untuk membuka player.php
    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://foodcash.com.br/' // Pura-pura datang dari website mereka
      },
    });

    const html = await res.text();

    // 2. LOGIKA DETEKTIF (Regex)
    // Mencari pola teks yang berakhiran .mp4 atau .m3u8 di dalam kodingan HTML
    // Pola: file: "https://..." atau src: "https://..."
    
    // Pola 1: Mencari file: "URL" (Biasanya dipakai player JWPlayer/Clappr)
    const fileMatch = html.match(/file\s*:\s*["']([^"']+\.(?:mp4|m3u8))["']/i);
    
    // Pola 2: Mencari src="URL" (HTML5 Video biasa)
    const srcMatch = html.match(/src\s*=\s*["']([^"']+\.(?:mp4|m3u8))["']/i);

    // Pola 3: Mencari string apapun yang http...mp4 (Brute force)
    const rawMatch = html.match(/(https?:\/\/[^"']+\.(?:mp4|m3u8))/i);

    // Ambil hasil yang ketemu duluan
    const directLink = fileMatch?.[1] || srcMatch?.[1] || rawMatch?.[1];

    if (directLink) {
      return NextResponse.json({ 
        success: true, 
        quality: 'Original', 
        url: directLink 
      });
    } else {
      // Kalau gagal nemu, kita kasih error biar frontend pakai cara iframe biasa
      return NextResponse.json({ success: false, error: 'Source not found' }, { status: 404 });
    }

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Extraction failed' }, { status: 500 });
  }
}