import Link from "next/link";
import { prisma } from "@/lib/prisma";
import StatCard from "@/components/StatCard";
import ProdukTrendChart, { type TrendPoint } from "@/components/charts/ProdukTrendChart";
import PublishGauge from "@/components/charts/PublishGauge";
import { ListChecks, Eye, CheckCircle2, FileEdit, ArrowRight } from "lucide-react";
import { STATUS_LABEL } from "@/lib/categories";
import { formatRelatif, formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

const BULAN_LABEL = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

export default async function AdminDashboardPage() {
  const [total, publish, draft, agg, recent, semuaProduk] = await Promise.all([
    prisma.produk.count(),
    prisma.produk.count({ where: { status: "PUBLISH" } }),
    prisma.produk.count({ where: { status: "DRAFT" } }),
    prisma.produk.aggregate({ _sum: { views: true } }),
    prisma.produk.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.produk.findMany({ select: { createdAt: true } }),
  ]);

  const now = new Date();
  const trend: TrendPoint[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const count = semuaProduk.filter((p) => {
      const c = new Date(p.createdAt);
      return c.getFullYear() === d.getFullYear() && c.getMonth() === d.getMonth();
    }).length;
    trend.push({ bulan: BULAN_LABEL[d.getMonth()], total: count });
  }

  const persenPublish = total > 0 ? (publish / total) * 100 : 0;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest-950">Dashboard</h1>
          <p className="mt-1 text-sm text-ink-500">Ringkasan performa produk kursus</p>
        </div>
        <Link href="/admin/produk/tambah" className="btn-primary hidden sm:inline-flex">
          + Tambah Produk
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={ListChecks} label="Total Produk" value={total} tone="forest" />
        <StatCard icon={CheckCircle2} label="Publish" value={publish} tone="brand" />
        <StatCard icon={FileEdit} label="Draft" value={draft} tone="sun" />
        <StatCard icon={Eye} label="Total Dilihat" value={agg._sum.views ?? 0} tone="brand" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <h2 className="font-display text-base font-bold text-forest-950">Tren Produk · 6 Bulan Terakhir</h2>
          <p className="mt-0.5 text-xs text-ink-500">Jumlah produk yang ditambahkan per bulan</p>
          <div className="mt-3">
            <ProdukTrendChart data={trend} />
          </div>
        </div>
        <div className="card flex flex-col items-center justify-center p-5">
          <h2 className="self-start font-display text-base font-bold text-forest-950">Status Produk</h2>
          <p className="self-start mt-0.5 text-xs text-ink-500">Persentase yang sudah publish</p>
          <div className="mt-2">
            <PublishGauge percent={persenPublish} label={`${publish} dari ${total} produk publish`} />
          </div>
        </div>
      </div>

      <div className="card mt-6 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-forest-950">Produk Terbaru</h2>
          <Link href="/admin/produk" className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline">
            Lihat semua <ArrowRight size={12} />
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="py-8 text-center text-sm text-ink-500">
            Belum ada produk. <Link href="/admin/produk/tambah" className="font-semibold text-brand-600">Tambah produk pertamamu</Link>.
          </p>
        ) : (
          <div className="divide-y divide-ink-100">
            {recent.map((p) => (
              <Link key={p.id} href={`/admin/produk/${p.id}`} className="flex items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-semibold text-ink-900">{p.nama}</p>
                  <p className="mt-0.5 text-xs text-ink-500">{formatRelatif(p.createdAt)} · {formatRupiah(p.harga)}</p>
                </div>
                <span className={`badge shrink-0 ${p.status === "PUBLISH" ? "bg-brand-50 text-brand-700" : "bg-sun-400/15 text-sun-500"}`}>
                  {STATUS_LABEL[p.status]}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
