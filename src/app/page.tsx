import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroVisual from "@/components/HeroVisual";
import ProdukCard from "@/components/ProdukCard";
import { prisma } from "@/lib/prisma";
import { getSiteConfig } from "@/lib/siteConfig";
import { KATEGORI_PRODUK } from "@/lib/categories";
import { waLink } from "@/lib/utils";
import {
  Mic, Headphones, BookOpen, PenLine, BookMarked, MessageSquare, GraduationCap,
  Briefcase, Baby, FileCheck, ArrowRight, ShieldCheck, Users, Award, Sparkles,
} from "lucide-react";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Speaking: Mic,
  Listening: Headphones,
  Vocabulary: BookOpen,
  Grammar: PenLine,
  Writing: PenLine,
  Reading: BookMarked,
  Conversation: MessageSquare,
  "TOEFL / IELTS Preparation": FileCheck,
  "Business English": Briefcase,
  "English for Kids": Baby,
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [config, kategoriCounts, populer, terbaru] = await Promise.all([
    getSiteConfig(),
    prisma.produk.groupBy({
      by: ["kategori"],
      where: { status: "PUBLISH" },
      _count: { kategori: true },
    }),
    prisma.produk.findMany({
      where: { status: "PUBLISH", populer: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.produk.findMany({
      where: { status: "PUBLISH" },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  const kategoriCountMap = Object.fromEntries(kategoriCounts.map((k) => [k.kategori, k._count.kategori]));
  const ditampilkan = populer.length > 0 ? populer : terbaru.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-50/60 px-4 pb-14 pt-14 sm:px-6 sm:pt-20">
        <div className="absolute inset-0 bg-grid-fade-light" />
        <div className="absolute inset-0 bg-dot-grid bg-dot-sm opacity-40" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="badge border border-brand-200 bg-white text-brand-700">
              <Sparkles size={12} className="mr-1" /> {config.totalSiswa} siswa telah bergabung
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] text-forest-950 sm:text-5xl">
              Kuasai <span className="text-brand-600">Bahasa Inggris</span> Bersama {config.namaBrand}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-500">
              {config.tagline}. Kelas Speaking, Listening, Vocabulary, hingga persiapan TOEFL/IELTS
              dengan mentor berpengalaman.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/program" className="btn-primary">
                Lihat Semua Program <ArrowRight size={16} />
              </Link>
              <a
                href={waLink(config.whatsappAdmin, "Halo, saya ingin konsultasi kursus di EnglishKu.")}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                Konsultasi Gratis via WhatsApp
              </a>
            </div>
          </div>

          <HeroVisual />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-forest-900">
        <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-white/15 px-4 py-6 text-center sm:px-6">
          <Stat value={config.totalSiswa} label="Siswa Aktif" />
          <Stat value={config.totalMentor} label="Mentor Berpengalaman" />
          <Stat value={config.tahunPengalaman} label="Tahun Pengalaman" />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-forest-950">Program Kursus Kami</h2>
          <p className="mt-1 text-sm text-ink-500">Pilih kelas sesuai kebutuhan dan tujuan belajarmu</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {KATEGORI_PRODUK.map((kat) => {
            const Icon = ICONS[kat] ?? BookOpen;
            return (
              <Link
                key={kat}
                href={`/program?kategori=${encodeURIComponent(kat)}`}
                className="card flex flex-col items-center gap-2.5 p-5 text-center"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={20} />
                </span>
                <span className="text-sm font-semibold text-ink-900">{kat}</span>
                <span className="text-xs text-ink-500">{kategoriCountMap[kat] ?? 0} kelas</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* POPULAR / LATEST PROGRAMS */}
      <section className="bg-ink-100/60 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-forest-950">Program Terpopuler</h2>
              <p className="mt-1 text-sm text-ink-500">Paling banyak diminati siswa kami</p>
            </div>
            <Link href="/program" className="hidden items-center gap-1 text-sm font-semibold text-brand-600 hover:underline sm:flex">
              Lihat semua <ArrowRight size={14} />
            </Link>
          </div>

          {ditampilkan.length === 0 ? (
            <div className="card p-10 text-center text-sm text-ink-500">
              Belum ada program yang dipublikasikan.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ditampilkan.map((p) => (
                <ProdukCard key={p.id} {...p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WHY US */}
      <section id="tentang" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-forest-950">Kenapa Belajar di {config.namaBrand}?</h2>
          <p className="mt-1 text-sm text-ink-500">Metode belajar yang terbukti efektif dan menyenangkan</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <WhyCard icon={GraduationCap} title="Mentor Berpengalaman" desc="Dibimbing mentor bersertifikat dengan pengalaman mengajar bertahun-tahun." />
          <WhyCard icon={Users} title="Kelas Kecil & Interaktif" desc="Fokus pada praktik langsung dengan jumlah siswa terbatas per kelas." />
          <WhyCard icon={Award} title="Sertifikat Resmi" desc="Dapatkan sertifikat setelah menyelesaikan setiap program kursus." />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-950">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <ShieldCheck size={32} className="mx-auto text-brand-400" />
          <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
            Siap Mulai Belajar Bahasa Inggris?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-ink-300">
            Konsultasi gratis dengan tim kami untuk menemukan program yang paling sesuai untukmu.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={waLink(config.whatsappAdmin, "Halo, saya ingin konsultasi kursus di EnglishKu.")}
              target="_blank"
              rel="noreferrer"
              className="btn-sun"
            >
              Konsultasi Gratis via WhatsApp
            </a>
            <Link href="/program" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
              Lihat Semua Program
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-2">
      <p className="font-display text-2xl font-extrabold text-white sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs font-medium text-brand-200 sm:text-sm">{label}</p>
    </div>
  );
}

function WhyCard({ icon: Icon, title, desc }: { icon: React.ComponentType<{ size?: number; className?: string }>; title: string; desc: string }) {
  return (
    <div className="card p-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <Icon size={20} />
      </span>
      <h3 className="mt-4 font-display text-base font-bold text-ink-900">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{desc}</p>
    </div>
  );
}
