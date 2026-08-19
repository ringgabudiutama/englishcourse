import { prisma } from "@/lib/prisma";

export async function getSiteConfig() {
  const config = await prisma.siteConfig.findUnique({ where: { id: "main" } });
  if (config) return config;

  // fallback defaults if the admin hasn't saved settings yet (or before first seed)
  return {
    id: "main",
    namaBrand: "EnglishKu",
    tagline: "Kuasai Bahasa Inggris Bersama Mentor Berpengalaman",
    whatsappAdmin: "6281234567890",
    email: null as string | null,
    alamat: null as string | null,
    jamOperasional: "Senin - Sabtu, 09.00 - 20.00",
    instagram: null as string | null,
    logoUrl: null as string | null,
    heroFotoUrl: null as string | null,
    totalSiswa: "500+",
    totalMentor: "15+",
    tahunPengalaman: "8+",
    updatedAt: new Date(),
  };
}
