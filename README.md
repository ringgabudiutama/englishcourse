# EnglishKu

Website kursus Bahasa Inggris — landing page publik + panel admin untuk kelola produk kursus (Speaking, Listening, Vocabulary, dst), harga, pamflet, dan status Draft/Publish. Dibangun dengan Next.js 15 (App Router), Prisma, PostgreSQL, dan Vercel Blob.

## Fitur

**Publik**
- Landing page hijau-putih profesional dengan statistik, kategori program, program populer
- Halaman semua program kursus + filter (kategori, level, pencarian)
- Detail program lengkap: deskripsi, fitur, harga (dengan diskon jika ada), pamflet
- Tombol "Daftar via WhatsApp" — otomatis terisi pesan template, nomor WA diambil dari Pengaturan

**Admin** (login di `/admin/login`, akun dibuat lewat seed — tidak ada pendaftaran publik)
- Dashboard: statistik produk, grafik tren 6 bulan terakhir, gauge persentase publish
- Tambah Produk: form lengkap + upload pamflet, simpan sebagai **Draft** atau langsung **Publikasikan**
- Kelola Produk: tabel cari/filter status, toggle cepat Draft↔Publish, edit, hapus
- Pengaturan: ubah nomor WhatsApp, nama brand, tagline, statistik landing page, info kontak — tanpa perlu deploy ulang

## Stack

Sama seperti KarirKu: Next.js 15 + TypeScript + Tailwind, Prisma + PostgreSQL, Vercel Blob untuk file, auth custom JWT (jose) + bcrypt.

## Setup Lokal

```bash
npm install
cp .env.example .env
```

Isi `.env`:
```
DATABASE_URL="postgres://...?sslmode=require"
DATABASE_URL_UNPOOLED="postgres://...?sslmode=require"
AUTH_SECRET="<hasil openssl rand -base64 32>"
BLOB_READ_WRITE_TOKEN=""
```

Lalu:
```bash
npx prisma generate
npx prisma db push
npm run seed
npm run dev
```

Login admin setelah seed: **admin@englishku.com** / **admin123** — segera ganti password/email lewat database setelah live, atau buat akun baru manual lalu hapus yang lama.

## Deploy ke Vercel

Langkah sama persis seperti KarirKu:

1. Push ke GitHub, import project di Vercel.
2. Tab **Storage** → buat **Postgres** → connect ke project → env var `DATABASE_URL` & `DATABASE_URL_UNPOOLED` otomatis terisi (skema project ini sudah pakai nama itu, tidak perlu diubah).
3. Tab **Storage** → buat **Blob** → connect ke project → `BLOB_READ_WRITE_TOKEN` otomatis terisi.
4. Set `AUTH_SECRET` manual (generate string acak).
5. Setelah deploy pertama sukses, jalankan migrasi:
   ```bash
   npx prisma db push
   npm run seed
   ```
   (jalankan dari lokal setelah `vercel env pull .env`, atau lewat koneksi DB production langsung)
6. **Penting:** setelah login pertama kali di `/admin/login`, langsung buka **Pengaturan** dan ganti nomor WhatsApp ke nomor asli — nomor default di seed cuma placeholder.

## Struktur Folder

```
prisma/schema.prisma            # schema database
src/lib/                        # prisma client, auth, kategori, utils, siteConfig
src/middleware.ts                # proteksi route /admin (kecuali /admin/login)
src/app/(public pages)/          # landing, program, program/[id]
src/app/admin/login/             # login (tanpa sidebar)
src/app/admin/(panel)/           # dashboard, produk, pengaturan (dengan sidebar admin)
src/components/                  # form, card, sidebar, chart, dll
```
