import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 10);

  const admin = await prisma.admin.upsert({
    where: { email: "admin@englishku.com" },
    update: {},
    create: {
      name: "Admin EnglishKu",
      email: "admin@englishku.com",
      passwordHash: password,
    },
  });

  await prisma.siteConfig.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      namaBrand: "EnglishKu",
      tagline: "Kuasai Bahasa Inggris Bersama Mentor Berpengalaman",
      whatsappAdmin: "6281234567890",
      email: "halo@englishku.com",
      alamat: "Jl. Pendidikan No. 10, Jombang, Jawa Timur",
      jamOperasional: "Senin - Sabtu, 09.00 - 20.00",
      instagram: "@englishku.id",
      totalSiswa: "500+",
      totalMentor: "15+",
      tahunPengalaman: "8+",
    },
  });

  const produk = [
    {
      kategori: "Speaking",
      nama: "Speaking Confidence Class",
      deskripsi: "Program intensif untuk membangun kepercayaan diri berbicara Bahasa Inggris dalam situasi sehari-hari, kerja, maupun akademik. Fokus pada praktik langsung dengan mentor native-level.",
      fitur: "Kelas kecil maksimal 6 orang\nSesi speaking practice 2x seminggu\nFeedback pronunciation personal\nSertifikat kelulusan\nAkses grup diskusi eksklusif",
      level: "MENENGAH" as const,
      durasi: "8 pertemuan / 4 minggu",
      harga: 750000,
      hargaCoret: 950000,
      populer: true,
      status: "PUBLISH" as const,
    },
    {
      kategori: "Listening",
      nama: "Listening Mastery",
      deskripsi: "Latih kemampuan mendengar dan memahami Bahasa Inggris dari berbagai aksen melalui podcast, film, dan materi otentik.",
      fitur: "Materi audio otentik mingguan\nLatihan dictation terpandu\nDiskusi kelompok\nModul digital seumur hidup",
      level: "SEMUA_LEVEL" as const,
      durasi: "6 pertemuan / 3 minggu",
      harga: 600000,
      populer: true,
      status: "PUBLISH" as const,
    },
    {
      kategori: "Vocabulary",
      nama: "Vocabulary Booster",
      deskripsi: "Perkaya kosakata Bahasa Inggris secara sistematis dengan metode spaced repetition, cocok untuk persiapan ujian maupun percakapan sehari-hari.",
      fitur: "1000+ kosakata terkurasi\nFlashcard digital interaktif\nKuis mingguan\nTracking progress belajar",
      level: "PEMULA" as const,
      durasi: "4 pertemuan / 2 minggu",
      harga: 350000,
      populer: true,
      status: "PUBLISH" as const,
    },
    {
      kategori: "Grammar",
      nama: "Grammar Fundamentals",
      deskripsi: "Kuasai struktur tata bahasa Inggris dari dasar hingga tingkat lanjut dengan pendekatan praktis dan contoh nyata.",
      fitur: "Modul grammar lengkap\nLatihan soal interaktif\nKonsultasi 1-on-1\nSertifikat resmi",
      level: "PEMULA" as const,
      durasi: "10 pertemuan / 5 minggu",
      harga: 650000,
      status: "PUBLISH" as const,
    },
    {
      kategori: "TOEFL / IELTS Preparation",
      nama: "TOEFL ITP Preparation",
      deskripsi: "Persiapan intensif menghadapi tes TOEFL ITP dengan strategi mengerjakan soal, latihan simulasi, dan pembahasan detail.",
      fitur: "Simulasi tes lengkap\nStrategi per section\nPembahasan soal detail\nTarget skor terukur\nGaransi mengulang gratis",
      level: "MAHIR" as const,
      durasi: "12 pertemuan / 6 minggu",
      harga: 1250000,
      hargaCoret: 1500000,
      status: "PUBLISH" as const,
    },
    {
      kategori: "Business English",
      nama: "Business English Professional",
      deskripsi: "Kelas Bahasa Inggris untuk profesional — email bisnis, presentasi, negosiasi, dan komunikasi lintas budaya di dunia kerja.",
      fitur: "Studi kasus dunia kerja nyata\nLatihan presentasi\nTemplate email profesional\nSesi mock meeting",
      level: "MENENGAH" as const,
      durasi: "8 pertemuan / 4 minggu",
      harga: 900000,
      status: "DRAFT" as const,
    },
    {
      kategori: "English for Kids",
      nama: "Fun English for Kids",
      deskripsi: "Kelas Bahasa Inggris menyenangkan untuk anak usia 6-12 tahun dengan metode bermain sambil belajar.",
      fitur: "Metode belajar sambil bermain\nModul bergambar interaktif\nLaporan progress untuk orang tua\nKelas kecil maksimal 8 anak",
      level: "PEMULA" as const,
      durasi: "12 pertemuan / 6 minggu",
      harga: 550000,
      status: "PUBLISH" as const,
    },
  ];

  for (const p of produk) {
    await prisma.produk.create({ data: { ...p, adminId: admin.id } });
  }

  console.log("Seed selesai:");
  console.log("- Admin: admin@englishku.com / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
