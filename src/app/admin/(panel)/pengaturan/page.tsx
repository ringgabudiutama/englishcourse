import { prisma } from "@/lib/prisma";
import PengaturanForm from "@/components/PengaturanForm";

export const dynamic = "force-dynamic";

export default async function PengaturanPage() {
  const config = await prisma.siteConfig.findUnique({ where: { id: "main" } });

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-forest-950">Pengaturan</h1>
        <p className="mt-1 text-sm text-ink-500">Ubah info yang tampil di website — nomor WhatsApp, nama brand, dan statistik</p>
      </div>
      <div className="max-w-2xl">
        <PengaturanForm
          initialData={{
            namaBrand: config?.namaBrand ?? "EnglishKu",
            tagline: config?.tagline ?? "Kuasai Bahasa Inggris Bersama Mentor Berpengalaman",
            whatsappAdmin: config?.whatsappAdmin ?? "",
            email: config?.email ?? "",
            alamat: config?.alamat ?? "",
            jamOperasional: config?.jamOperasional ?? "",
            instagram: config?.instagram ?? "",
            totalSiswa: config?.totalSiswa ?? "500+",
            totalMentor: config?.totalMentor ?? "15+",
            tahunPengalaman: config?.tahunPengalaman ?? "8+",
          }}
        />
      </div>
    </div>
  );
}
