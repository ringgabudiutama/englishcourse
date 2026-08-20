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
  Briefcase, Baby, FileCheck, ArrowRight, ArrowUpRight, ShieldCheck, Users, Award, Sparkles,
  Star,
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

const LAYANAN = [
  {
    icon: Mic,
    kategori: "Speaking",
    title: "Speaking Intensif",
    desc: "Latihan berbicara aktif setiap sesi supaya kamu terbiasa merespons dalam Bahasa Inggris tanpa ragu.",
  },
  {
    icon: FileCheck,
    kategori: "TOEFL / IELTS Preparation",
    title: "Persiapan TOEFL / IELTS",
    desc: "Strategi mengerjakan soal, simulasi ujian, dan target skor yang dikawal langsung oleh mentor.",
    highlight: true,
  },
  {
    icon: Briefcase,
    kategori: "Business English",
    title: "Business English",
    desc: "Email, presentasi, hingga meeting kerja dalam Bahasa Inggris yang rapi dan profesional.",
  },
  {
    icon: PenLine,
    kategori: "Grammar",
    title: "Grammar & Writing",
    desc: "Fondasi tata bahasa yang kuat dibarengi latihan menulis supaya makin percaya diri.",
  },
];

const TICKER_A = ["Speaking", "Listening", "Vocabulary", "Grammar", "Writing", "Reading", "Conversation"];
const TICKER_B = ["Mentor Bersertifikat", "Kelas Interaktif", "Sertifikat Resmi", "Harga Terjangkau", "Jadwal Fleksibel"];

const AVATAR_INIT = [
  { text: "AS", bg: "bg-brand-600" },
  { text: "RN", bg: "bg-forest-700" },
  { text: "DP", bg: "bg-sun-500" },
  { text: "MI", bg: "bg-brand-800" },
];

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
      <section className="relative overflow-hidden bg-white px-4 pb-14 pt-10 sm:px-6 sm:pt-14">
        <div className="absolute inset-0 bg-dot-grid bg-dot-sm opacity-40" />
        {/* moving ambient blobs — the hero's soft "breathing" background */}
        <div className="bg-blob -left-24 -top-24 h-72 w-72 animate-blob bg-brand-200/60" />
        <div className="bg-blob -right-16 top-10 h-80 w-80 animate-blob-slow bg-sun-200/50" />
        <div className="bg-blob bottom-0 left-1/3 h-64 w-64 animate-blob bg-brand-100/60" style={{ animationDelay: "3s" }} />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="badge border border-brand-200 bg-white text-brand-700">
              <Sparkles size={12} className="mr-1" /> Kursus Online & Tatap Muka
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] text-ink-900 sm:text-5xl">
              Belajar Bahasa Inggris Jadi <span className="text-brand-600">Lebih Percaya Diri.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-500">
              {config.tagline}. Kelas Speaking, Listening, Vocabulary, hingga persiapan
              TOEFL/IELTS bersama {config.totalSiswa} siswa yang sudah bergabung.
            </p>

            <form action="/program" method="GET" className="mt-7 flex flex-col gap-2 rounded-full bg-white p-2 shadow-card-hover ring-1 ring-ink-100 sm:flex-row">
              <input
                name="q"
                placeholder="Cari kelas, contoh: Speaking..."
                className="flex-1 rounded-full border-none bg-transparent px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none"
              />
              <button type="submit" className="btn-primary shrink-0">Cari Kelas</button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold uppercase tracking-wide text-ink-500">Populer:</span>
              {["Speaking", "Listening", "Vocabulary", "TOEFL / IELTS Preparation"].map((k) => (
                <Link
                  key={k}
                  href={`/program?kategori=${encodeURIComponent(k)}`}
                  className="rounded-full border border-ink-100 bg-white px-3 py-1.5 font-medium text-ink-700 transition hover:border-brand-300 hover:text-brand-600"
                >
                  {k.split(" / ")[0]}
                </Link>
              ))}
            </div>

            {/* trust row, mirrors the reference hero's logo + avatar strip */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-2.5">
                {AVATAR_INIT.map((a) => (
                  <span
                    key={a.text}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white ${a.bg}`}
                  >
                    {a.text}
                  </span>
                ))}
              </div>
              <div className="text-xs">
                <p className="font-bold text-ink-900">{config.totalSiswa} siswa aktif</p>
                <p className="flex items-center gap-1 text-ink-500">
                  <Star size={12} className="fill-sun-400 text-sun-400" />
                  <Star size={12} className="fill-sun-400 text-sun-400" />
                  <Star size={12} className="fill-sun-400 text-sun-400" />
                  <Star size={12} className="fill-sun-400 text-sun-400" />
                  <Star size={12} className="fill-sun-400 text-sun-400" />
                  <span className="ml-1">dipercaya alumni kami</span>
                </p>
              </div>
            </div>
          </div>

          <HeroVisual
            fotoUrl={config.heroFotoUrl}
            totalSiswa={config.totalSiswa}
            totalMentor={config.totalMentor}
            tahunPengalaman={config.tahunPengalaman}
          />
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">— Program Unggulan —</span>
          <h2 className="mt-2 text-2xl font-bold text-ink-900 sm:text-3xl">Kelas yang Dirancang untuk Hasil Nyata</h2>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-5 lg:grid-cols-4">
          {LAYANAN.map((l) => (
            <Link
              key={l.title}
              href={`/program?kategori=${encodeURIComponent(l.kategori)}`}
              className={`group flex flex-col rounded-lg p-2.5 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover sm:rounded-xl2 sm:p-6 ${
                l.highlight ? "bg-brand-600 text-white" : "bg-brand-50/60 text-ink-900"
              }`}
            >
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg sm:h-11 sm:w-11 sm:rounded-xl ${l.highlight ? "bg-white/15 text-white" : "bg-white text-brand-600"}`}>
                <l.icon size={14} className="sm:hidden" />
                <l.icon size={20} className="hidden sm:block" />
              </span>
              <h3 className="mt-2 font-display text-[11px] font-bold leading-tight sm:mt-4 sm:text-base">{l.title}</h3>
              <p className={`mt-1 line-clamp-2 text-[10px] leading-snug sm:mt-1.5 sm:line-clamp-none sm:text-sm sm:leading-relaxed ${l.highlight ? "text-white/80" : "text-ink-500"}`}>{l.desc}</p>
              <span className={`mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold sm:mt-4 sm:text-xs ${l.highlight ? "text-white" : "text-brand-600"}`}>
                Selengkapnya <ArrowRight size={11} className="transition group-hover:translate-x-1 sm:hidden" />
                <ArrowRight size={13} className="hidden transition group-hover:translate-x-1 sm:block" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-full border border-ink-100 px-6 py-3.5 sm:flex-row">
          <p className="text-sm font-medium text-ink-700">Kami memastikan kualitas pengajaran terbaik untuk setiap siswa</p>
          <Link href="/program" className="flex items-center gap-1 text-sm font-bold text-brand-600 hover:underline">
            Lihat Semua Program <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* MOVING TICKER — signature animated background band */}
      <div aria-hidden="true" className="select-none">
        <div className="marquee-row bg-brand-600 py-3.5">
          <div className="marquee-track animate-marquee-left">
            {[...TICKER_A, ...TICKER_A].map((t, i) => (
              <span key={i} className="flex items-center gap-8 text-sm font-bold uppercase tracking-wide text-white">
                {t} <span className="text-white/60">✦</span>
              </span>
            ))}
          </div>
        </div>
        <div className="marquee-row bg-white py-3.5">
          <div className="marquee-track animate-marquee-right">
            {[...TICKER_B, ...TICKER_B].map((t, i) => (
              <span key={i} className="flex items-center gap-8 text-sm font-bold uppercase tracking-wide text-brand-700">
                {t} <span className="text-brand-300">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <section className="bg-forest-950">
        <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-white/15 px-4 py-6 text-center sm:px-6">
          <Stat value={config.totalSiswa} label="Siswa Aktif" />
          <Stat value={config.totalMentor} label="Mentor Berpengalaman" />
          <Stat value={config.tahunPengalaman} label="Tahun Pengalaman" />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Program Kursus</span>
          <h2 className="mt-2 text-2xl font-bold text-ink-900">Pilih Kategori untuk Belajar</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {KATEGORI_PRODUK.slice(0, 10).map((kat, i) => {
            const Icon = ICONS[kat] ?? BookOpen;
            const ringColors = ["ring-brand-200", "ring-sun-200", "ring-forest-100", "ring-brand-100", "ring-sun-100"];
            const iconColors = ["text-brand-600 bg-brand-50", "text-sun-600 bg-sun-50", "text-forest-700 bg-forest-50", "text-brand-700 bg-brand-100", "text-sun-500 bg-sun-100"];
            const c = i % 5;
            return (
              <Link key={kat} href={`/program?kategori=${encodeURIComponent(kat)}`} className="group flex flex-col items-center gap-2.5 text-center">
                <span className={`flex h-16 w-16 items-center justify-center rounded-full ring-4 ${ringColors[c]} ${iconColors[c]} transition group-hover:scale-105`}>
                  <Icon size={24} />
                </span>
                <span className="text-xs font-semibold leading-tight text-ink-900 sm:text-sm">{kat}</span>
                <span className="text-[11px] text-ink-500">{kategoriCountMap[kat] ?? 0} kelas</span>
              </Link>
            );
          })}
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/program" className="btn-primary">
            Lihat Semua Kategori <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ABOUT */}
      <section id="tentang" className="relative overflow-hidden bg-brand-50/40 py-16">
        <div className="absolute inset-0 bg-dot-grid bg-dot-sm opacity-30" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600">— Tentang Kami —</span>
              <h2 className="mt-2 max-w-lg text-2xl font-bold text-ink-900 sm:text-3xl">
                Metode Belajar yang Terbukti Efektif untuk Semua Kalangan
              </h2>
            </div>
            <div className="flex shrink-0 items-center gap-3 rounded-2xl bg-white px-5 py-3.5 shadow-card">
              <span className="font-display text-3xl font-extrabold text-brand-600">{config.tahunPengalaman}</span>
              <span className="text-xs font-semibold leading-tight text-ink-700">
                Tahun<br />Pengalaman
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 items-stretch gap-2.5 sm:mt-10 sm:gap-4 lg:grid-cols-[1fr_1.1fr_1fr] lg:items-center lg:gap-8">
            {/* illustrative panel, left */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 shadow-card sm:rounded-xl2">
              <div className="absolute inset-0 bg-dot-grid bg-dot-sm opacity-20" />
              <div className="flex h-full flex-col items-center justify-center gap-1 p-1.5 text-center text-white sm:gap-3 sm:p-6">
                <MessageSquare size={16} className="opacity-90 sm:hidden" />
                <MessageSquare size={40} className="hidden opacity-90 sm:block" />
                <p className="font-display text-[10px] font-bold leading-tight sm:text-lg">Praktik Langsung</p>
                <p className="hidden text-xs text-white/75 sm:block">Latihan percakapan nyata setiap sesi</p>
              </div>
            </div>

            {/* feature list, middle */}
            <div className="flex flex-col gap-1.5 sm:gap-5">
              <FeatureRow icon={GraduationCap} color="bg-brand-600" title="Mentor Bersertifikat" desc="Dibimbing mentor berpengalaman dan bersertifikat resmi di bidangnya." />
              <FeatureRow icon={Users} color="bg-sun-500" title="Kelas Kecil & Interaktif" desc="Fokus pada praktik langsung dengan jumlah siswa terbatas per kelas." />
              <FeatureRow icon={Award} color="bg-forest-800" title="Sertifikat Resmi" desc="Dapatkan sertifikat setelah menyelesaikan setiap program kursus." />
              <a
                href={waLink(config.whatsappAdmin, "Halo, saya ingin konsultasi kursus di EnglishKu.")}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-1.5 sm:mt-2 sm:gap-3"
              >
                <span className="btn-primary hidden sm:inline-flex">Hubungi Kami</span>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-950 text-white transition group-hover:bg-brand-600 sm:h-11 sm:w-11">
                  <ArrowUpRight size={12} className="sm:hidden" />
                  <ArrowUpRight size={18} className="hidden sm:block" />
                </span>
              </a>
            </div>

            {/* illustrative panel, right */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gradient-to-br from-forest-800 to-forest-950 shadow-card sm:rounded-xl2">
              <div className="absolute inset-0 bg-dot-grid bg-dot-sm opacity-20" />
              <div className="flex h-full flex-col items-center justify-center gap-1 p-1.5 text-center text-white sm:gap-3 sm:p-6">
                <GraduationCap size={16} className="opacity-90 sm:hidden" />
                <GraduationCap size={40} className="hidden opacity-90 sm:block" />
                <p className="font-display text-[10px] font-bold leading-tight sm:text-lg">Bimbingan Personal</p>
                <p className="hidden text-xs text-white/75 sm:block">Progres belajar dipantau tiap minggu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR / LATEST PROGRAMS */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600">— Program Kami —</span>
              <h2 className="mt-2 text-2xl font-bold text-ink-900 sm:text-3xl">Program Terpopuler</h2>
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
            <div className="grid grid-cols-3 gap-2.5 sm:gap-5">
              {ditampilkan.map((p) => (
                <ProdukCard key={p.id} {...p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-forest-950">
        <div className="bg-drift pointer-events-none absolute inset-0 animate-drift-bg opacity-50" />
        <div className="bg-blob left-1/4 top-0 h-72 w-72 animate-blob bg-brand-700/30" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <ShieldCheck size={32} className="mx-auto text-brand-400" />
          <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
            Siap Mulai Belajar Bahasa Inggris?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/70">
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
            <Link href="/program" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
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

function FeatureRow({
  icon: Icon,
  color,
  title,
  desc,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-1.5 rounded-lg bg-white p-1.5 shadow-card sm:gap-4 sm:rounded-xl2 sm:p-4">
      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-white sm:h-11 sm:w-11 sm:rounded-xl ${color}`}>
        <Icon size={12} className="sm:hidden" />
        <Icon size={20} className="hidden sm:block" />
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-[10px] font-bold leading-tight text-ink-900 sm:text-sm">{title}</h3>
        <p className="mt-1 hidden text-sm leading-relaxed text-ink-500 sm:block">{desc}</p>
      </div>
    </div>
  );
}
