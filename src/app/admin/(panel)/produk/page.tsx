import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";
import DeleteProdukButton from "@/components/DeleteProdukButton";
import ToggleStatusButton from "@/components/ToggleStatusButton";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

type SearchParams = { q?: string; tab?: "semua" | "publish" | "draft" };

export default async function KelolaProdukPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const tab = sp.tab ?? "semua";

  const where: Prisma.ProdukWhereInput = {
    ...(sp.q ? { nama: { contains: sp.q, mode: "insensitive" } } : {}),
    ...(tab === "publish" ? { status: "PUBLISH" } : {}),
    ...(tab === "draft" ? { status: "DRAFT" } : {}),
  };

  const produk = await prisma.produk.findMany({ where, orderBy: { createdAt: "desc" } });

  const tabs: { key: SearchParams["tab"]; label: string }[] = [
    { key: "semua", label: "Semua" },
    { key: "publish", label: "Publish" },
    { key: "draft", label: "Draft" },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest-950">Kelola Produk</h1>
          <p className="mt-1 text-sm text-ink-500">Total {produk.length} produk</p>
        </div>
        <Link href="/admin/produk/tambah" className="btn-primary">+ Tambah Produk</Link>
      </div>

      <form method="GET" className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input name="q" defaultValue={sp.q} placeholder="Cari nama produk..." className="input-field sm:max-w-xs" />
        <input type="hidden" name="tab" value={tab} />
        <button type="submit" className="btn-outline shrink-0">Cari</button>
      </form>

      <div className="mb-4 flex gap-2">
        {tabs.map((t) => (
          <Link
            key={t.key}
            href={`/admin/produk?tab=${t.key}${sp.q ? `&q=${encodeURIComponent(sp.q)}` : ""}`}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${
              tab === t.key ? "bg-forest-900 text-white" : "bg-white text-ink-500 hover:bg-ink-100"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="border-b border-ink-100 bg-ink-100/60 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
            <tr>
              <th className="px-5 py-3">No</th>
              <th className="px-5 py-3">Produk</th>
              <th className="px-5 py-3">Harga</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {produk.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-ink-500">Belum ada produk yang cocok.</td>
              </tr>
            )}
            {produk.map((p, i) => (
              <tr key={p.id}>
                <td className="px-5 py-4 align-top text-ink-500">{i + 1}</td>
                <td className="px-5 py-4 align-top">
                  <p className="font-semibold text-ink-900">{p.nama}</p>
                  <p className="text-xs text-ink-500">{p.kategori}</p>
                </td>
                <td className="px-5 py-4 align-top text-ink-700">{formatRupiah(p.harga)}</td>
                <td className="px-5 py-4 align-top">
                  <ToggleStatusButton id={p.id} status={p.status} />
                </td>
                <td className="px-5 py-4 align-top">
                  <div className="flex flex-wrap gap-1.5">
                    <Link href={`/admin/produk/${p.id}`} className="rounded bg-ink-100 px-2.5 py-1 text-xs font-semibold text-ink-700 hover:bg-ink-100/70">
                      Detail
                    </Link>
                    <Link href={`/admin/produk/${p.id}?edit=1`} className="rounded bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-100">
                      Edit
                    </Link>
                    <DeleteProdukButton id={p.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
