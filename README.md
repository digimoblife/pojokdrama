# 🎬 PojokDrama - AI-Powered Streaming Platform

PojokDrama adalah platform streaming film dan drama modern yang dibangun dengan **Next.js 14**. Project ini mengutamakan kecepatan akses, antarmuka pengguna yang bersih (Netflix-inspired), serta navigasi kategori yang intuitif.

---

## 🚀 Fitur Utama

* **9 Kategori Dinamis**: Menampilkan konten mulai dari Film Indonesia, K-Drama, Anime, hingga Western TV.
* **Sistem Pagonasi**: Mendukung navigasi multi-halaman untuk menjelajahi ribuan konten melalui API.
* **Hybrid Video Player**: Pemutar video yang dioptimalkan untuk mengurangi gangguan iklan pop-up dari provider pihak ketiga.
* **Desain Solid Glass**: Antarmuka kategori menggunakan efek *Glassmorphism* yang modern dan responsif di semua perangkat.
* **SEO Optimized**: Dibangun dengan Server-Side Rendering (SSR) untuk indeks pencarian yang lebih baik.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Deployment**: [Ubuntu VPS](https://ubuntu.com/) dengan [Nginx](https://www.nginx.com/)
* **Process Manager**: [PM2](https://pm2.keymetrics.io/)

---

## 💻 Cara Menjalankan Secara Lokal

1. **Clone Repositori**
   git clone [https://github.com/username/pojok-drama.git](https://github.com/username/pojok-drama.git)
   cd pojok-drama

2. Install Dependensi
   npm install

3. Jalankan Mode Development
   npm run dev

   Buka http://localhost:3000 di browser Anda.

4. Build untuk Production
   npm run build