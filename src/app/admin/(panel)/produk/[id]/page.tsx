import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProdukForm from "@/components/ProdukForm";
import DeleteProdukButton from "@/components/DeleteProdukButton";
import { formatRupiah, formatRelatif, diskonPersen, fiturList } from "@/lib/utils";
import { LEVEL_LABEL, STATUS_LABEL } from "@/lib/categories";
import { Eye, ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";

export default async function ProdukDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ edit?: string }>;
}) {
  const { id } = await params;
  const { edit } = await searchParams;

  const produk = await prisma.produk.findUnique({ where: { id } });
  if (!produk) notFound();

  if (edit === "1") {
    return (
      <div>
        <BackLink />
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-forest-950">Edit Produk</h1>
          <p className="mt-1 text-sm text-ink-500">{produk.nama}</p>
        </div>
        <div className="max-w-3xl">
          <ProdukForm
            mode="edit"
            produkId={produk.id}
            initialData={{
              kategori: produk.kategori,
              nama: produk.nama,
              deskripsi: produk.deskripsi,
              fitur: produk.fitur,
              level: produk.level,
              durasi: produk.durasi ?? "",
              harga: String(produk.harga),
              hargaCoret: produk.hargaCoret ? String(produk.hargaCoret) : "",
              pamfletUrl: produk.pamfletUrl ?? "",
              populer: produk.populer,
              status: produk.status,
            }}
          />
        </div>
      </div>
    );
  }

  const diskon = diskonPersen(produk.harga, produk.hargaCoret);
  const fitur = fiturList(produk.fitur);

  return (
    <div>
      <BackLink />

      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest-950">{produk.nama}</h1>
          <p className="mt-1 text-sm text-ink-500">{produk.kategori} · Ditambahkan {formatRelatif(produk.createdAt)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {produk.status === "PUBLISH" && (
            <Link href={`/program/${produk.id}`} target="_blank" className="btn-outline">
              <ExternalLink size={14} /> Lihat Publik
            </Link>
          )}
          <Link href={`/admin/produk/${produk.id}?edit=1`} className="btn-primary">Edit</Link>
          <DeleteProdukButton id={produk.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {produk.pamfletUrl && (
            <div className="card overflow-hidden">
              <Image src={produk.pamfletUrl} alt={produk.nama} width={800} height={600} className="h-auto w-full object-contain" />
            </div>
          )}
          <div className="card p-6">
            <h2 className="font-display text-base font-bold text-forest-950">Deskripsi</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-700">{produk.deskripsi}</p>
          </div>
          {fitur.length > 0 && (
            <div className="card p-6">
              <h2 className="font-display text-base font-bold text-forest-950">Fitur</h2>
              <ul className="mt-3 space-y-2">
                {fitur.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-brand-600" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="card grid grid-cols-2 divide-x divide-ink-100 p-5 text-center">
            <div>
              <p className="flex items-center justify-center gap-1.5 font-display text-xl font-extrabold text-forest-950"><Eye size={16} /> {produk.views}</p>
              <p className="mt-1 text-xs text-ink-500">Dilihat</p>
            </div>
            <div>
              <span className={`badge ${produk.status === "PUBLISH" ? "bg-brand-50 text-brand-700" : "bg-sun-400/15 text-sun-500"}`}>
                {STATUS_LABEL[produk.status]}
              </span>
            </div>
          </div>

          <div className="card space-y-3 p-6 text-sm">
            <h3 className="font-display font-bold text-forest-950">Ringkasan</h3>
            <Row label="Harga" value={formatRupiah(produk.harga)} />
            {diskon && <Row label="Diskon" value={`${diskon}%`} />}
            <Row label="Level" value={LEVEL_LABEL[produk.level]} />
            {produk.durasi && <Row label="Durasi" value={produk.durasi} />}
            <Row label="Populer" value={produk.populer ? "Ya" : "Tidak"} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BackLink() {
  return (
    <Link href="/admin/produk" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-600">
      <ArrowLeft size={15} /> Kembali ke Kelola Produk
    </Link>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-500">{label}</span>
      <span className="font-medium text-ink-900">{value}</span>
    </div>
  );
}
