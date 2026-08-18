import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProdukCard from "@/components/ProdukCard";
import { prisma } from "@/lib/prisma";
import { KATEGORI_PRODUK, LEVEL_LABEL } from "@/lib/categories";
import { SearchX } from "lucide-react";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

type SearchParams = { q?: string; kategori?: string; level?: string };

export default async function ProgramPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const where: Prisma.ProdukWhereInput = {
    status: "PUBLISH",
    ...(sp.q ? { nama: { contains: sp.q, mode: "insensitive" } } : {}),
    ...(sp.kategori ? { kategori: sp.kategori } : {}),
    ...(sp.level ? { level: sp.level as Prisma.ProdukWhereInput["level"] } : {}),
  };

  const produk = await prisma.produk.findMany({ where, orderBy: { createdAt: "desc" } });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-brand-50/60 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-2xl font-bold text-forest-950 sm:text-3xl">Program Kursus</h1>
          <p className="mt-1 text-sm text-ink-500">{produk.length} program ditemukan</p>

          <form method="GET" className="mt-6 grid grid-cols-1 gap-2 rounded-xl2 border border-brand-100 bg-white p-3 sm:grid-cols-[1fr_auto_auto_auto]">
            <input name="q" defaultValue={sp.q} placeholder="Cari nama program..." className="input-field sm:!border-none" />
            <select name="kategori" defaultValue={sp.kategori} className="input-field sm:w-52">
              <option value="">Semua Kategori</option>
              {KATEGORI_PRODUK.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
            <select name="level" defaultValue={sp.level} className="input-field sm:w-40">
              <option value="">Semua Level</option>
              {Object.entries(LEVEL_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <button type="submit" className="btn-primary">Terapkan</button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {produk.length === 0 ? (
          <div className="card flex flex-col items-center gap-3 p-14 text-center">
            <SearchX size={28} className="text-ink-300" />
            <p className="text-sm text-ink-500">Tidak ada program yang cocok dengan pencarianmu.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {produk.map((p) => <ProdukCard key={p.id} {...p} />)}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
