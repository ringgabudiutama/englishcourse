import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { getSiteConfig } from "@/lib/siteConfig";
import { LEVEL_LABEL } from "@/lib/categories";
import { formatRupiah, diskonPersen, fiturList, waLink } from "@/lib/utils";
import { CheckCircle2, Clock, BarChart3, MessageCircle, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const produk = await prisma.produk.findUnique({ where: { id } });
  if (!produk || produk.status !== "PUBLISH") notFound();

  prisma.produk.update({ where: { id }, data: { views: { increment: 1 } } }).catch(() => {});

  const config = await getSiteConfig();
  const diskon = diskonPersen(produk.harga, produk.hargaCoret);
  const fitur = fiturList(produk.fitur);
  const pesanWa = `Halo, saya tertarik dengan program *${produk.nama}* di ${config.namaBrand}. Bisa minta info lebih lanjut?`;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Link href="/program" className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-600">
          <ArrowLeft size={15} /> Kembali ke Program Kursus
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="card overflow-hidden">
              <div className="relative aspect-video w-full bg-brand-50">
                {produk.pamfletUrl ? (
                  <Image src={produk.pamfletUrl} alt={produk.nama} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-brand-300">
                    <span className="font-display text-5xl font-extrabold">{produk.nama.slice(0, 2).toUpperCase()}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <span className="badge bg-brand-50 text-brand-700">{produk.kategori}</span>
              <h1 className="mt-3 font-display text-2xl font-bold text-forest-950 sm:text-3xl">{produk.nama}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-500">
                <span className="flex items-center gap-1"><BarChart3 size={14} /> {LEVEL_LABEL[produk.level]}</span>
                {produk.durasi && <span className="flex items-center gap-1"><Clock size={14} /> {produk.durasi}</span>}
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-display text-base font-bold text-forest-950">Deskripsi Program</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-700">{produk.deskripsi}</p>
            </div>

            {fitur.length > 0 && (
              <div className="card p-6">
                <h2 className="font-display text-base font-bold text-forest-950">Yang Kamu Dapatkan</h2>
                <ul className="mt-3 space-y-2.5">
                  {fitur.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-ink-700">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-600" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-5 lg:sticky lg:top-20 lg:self-start">
            <div className="card p-6">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-extrabold text-forest-900">{formatRupiah(produk.harga)}</span>
                {diskon && <span className="badge bg-red-50 text-red-600">-{diskon}%</span>}
              </div>
              {produk.hargaCoret && produk.hargaCoret > produk.harga && (
                <p className="mt-1 text-sm text-ink-300 line-through">{formatRupiah(produk.hargaCoret)}</p>
              )}

              <a
                href={waLink(config.whatsappAdmin, pesanWa)}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-5 w-full"
              >
                <MessageCircle size={16} /> Daftar Sekarang via WhatsApp
              </a>
              <p className="mt-3 text-center text-xs text-ink-500">
                Konsultasi gratis, tanpa komitmen di awal.
              </p>
            </div>

            {config.jamOperasional && (
              <div className="card p-6 text-sm">
                <h3 className="font-display font-bold text-forest-950">Jam Layanan</h3>
                <p className="mt-2 text-ink-700">{config.jamOperasional}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
