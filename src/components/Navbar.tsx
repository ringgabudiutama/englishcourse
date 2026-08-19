import Link from "next/link";
import { Phone, Mail, Instagram, MessageCircle } from "lucide-react";
import Logo from "@/components/Logo";
import { getSiteConfig } from "@/lib/siteConfig";
import { waLink } from "@/lib/utils";

export default async function Navbar() {
  const config = await getSiteConfig();
  const phoneDisplay = config.whatsappAdmin
    ? "+" + config.whatsappAdmin.replace(/\D/g, "").replace(/^0/, "62")
    : null;

  return (
    <header className="sticky top-0 z-40 bg-white">
      {(phoneDisplay || config.email || config.instagram) && (
        <div className="hidden border-b border-ink-100 bg-forest-950 sm:block">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs text-brand-100 sm:px-6">
            <div className="flex items-center gap-5">
              {phoneDisplay && (
                <span className="flex items-center gap-1.5"><Phone size={12} /> {phoneDisplay}</span>
              )}
              {config.email && (
                <span className="flex items-center gap-1.5"><Mail size={12} /> {config.email}</span>
              )}
            </div>
            {config.instagram && (
              <span className="flex items-center gap-1.5"><Instagram size={12} /> {config.instagram}</span>
            )}
          </div>
        </div>
      )}

      <div className="border-b border-ink-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link href="/">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <Link href="/" className="text-sm font-medium text-ink-700 hover:text-brand-600">
              Beranda
            </Link>
            <Link href="/program" className="text-sm font-medium text-ink-700 hover:text-brand-600">
              Program Kursus
            </Link>
            <Link href="/#tentang" className="text-sm font-medium text-ink-700 hover:text-brand-600">
              Tentang Kami
            </Link>
          </nav>

          <a
            href={waLink(config.whatsappAdmin, "Halo, saya ingin tanya-tanya soal kursus di EnglishKu.")}
            target="_blank"
            rel="noreferrer"
            className="btn-primary !px-4 !py-2 text-sm"
          >
            <MessageCircle size={15} /> <span className="hidden sm:inline">Konsultasi Gratis</span>
            <span className="sm:hidden">WA</span>
          </a>
        </div>
      </div>
    </header>
  );
}
