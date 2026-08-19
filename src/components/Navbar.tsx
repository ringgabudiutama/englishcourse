import Link from "next/link";
import { MessageCircle, Search, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";
import { getSiteConfig } from "@/lib/siteConfig";
import { waLink } from "@/lib/utils";

export default async function Navbar() {
  const config = await getSiteConfig();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur">
      <div className="border-b border-ink-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link href="/">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1.5 rounded-full border border-ink-100 bg-white px-1.5 py-1.5 md:flex">
            <Link href="/" className="rounded-full px-4 py-1.5 text-sm font-medium text-ink-700 transition hover:bg-brand-50 hover:text-brand-600">
              Beranda
            </Link>
            <Link href="/program" className="rounded-full px-4 py-1.5 text-sm font-medium text-ink-700 transition hover:bg-brand-50 hover:text-brand-600">
              Program Kursus
            </Link>
            <Link href="/#tentang" className="rounded-full px-4 py-1.5 text-sm font-medium text-ink-700 transition hover:bg-brand-50 hover:text-brand-600">
              Tentang Kami
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/program"
              aria-label="Cari program kursus"
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-100 text-ink-700 transition hover:border-brand-300 hover:text-brand-600 sm:flex"
            >
              <Search size={16} />
            </Link>
            <a
              href={waLink(config.whatsappAdmin, "Halo, saya ingin tanya-tanya soal kursus di EnglishKu.")}
              target="_blank"
              rel="noreferrer"
              className="btn-primary !px-4 !py-2 text-sm"
            >
              <MessageCircle size={15} /> <span className="hidden sm:inline">Konsultasi Gratis</span>
              <span className="sm:hidden">WA</span>
            </a>
            <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-950 text-white lg:flex">
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
