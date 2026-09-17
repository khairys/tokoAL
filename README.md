# Toko AL - Official Website & Catalog

Website resmi **Toko AL** — Pusat penjualan sepeda, sparepart orisinil terlengkap, dan bengkel servis sepeda terpercaya di Cikande Permai, Serang, Banten.

🌐 **Domain Live**: [https://tokoal.id](https://tokoal.id)

---

## 🛠️ Tech Stack

- **Framework**: [Astro v5](https://astro.build/) (Static Site Generation)
- **Styling**: Tailwind CSS & Vanilla CSS Design System
- **Icons**: Font Awesome 6
- **Typography**: Poppins (Google Fonts)
- **Deployment**: GitHub Actions CI/CD via FTP Deploy to Production Web Server

---

## 📁 Struktur Proyek

```text
/
├── public/                # Static assets (favicon, robots.txt, sitemap.xml, llms.txt)
├── src/
│   ├── assets/            # Aset visual lokal (branding, gallery, hero, partners, products)
│   ├── components/        # Komponen UI Astro (Navbar, Hero, Services, Products, Testimonials, Partners, Contact, Footer)
│   ├── layouts/           # Layout utama & SEO metadata (Layout.astro)
│   └── pages/             # Routing Astro (index.astro)
├── .github/workflows/     # Pipeline otomatisasi CI/CD deploy.yml
└── package.json
```

---

## 🧞 Perintah Pengembangan

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server lokal di `http://localhost:4321` |
| `npm run build` | Mem-build bundle produksi ke folder `./dist/` |
| `npm run preview` | Meninjau hasil build produksi secara lokal |
