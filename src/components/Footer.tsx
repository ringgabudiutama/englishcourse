import Link from "next/link";
import { MapPin, Mail, Clock, Instagram } from "lucide-react";
import Logo from "@/components/Logo";
import { getSiteConfig } from "@/lib/siteConfig";

export default async function Footer() {
  const config = await getSiteConfig();

  return (
    <footer className="relative overflow-hidden bg-forest-950 text-ink-300">
      <div className="bg-drift pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Logo onDark url={config.logoUrl} name={config.namaBrand} />
            <p className="mt-3 text-sm leading-relaxed text-white/60">{config.tagline}</p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-white">Navigasi</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="transition hover:text-brand-300">Beranda</Link></li>
              <li><Link href="/program" className="transition hover:text-brand-300">Program Kursus</Link></li>
              <li><Link href="/#tentang" className="transition hover:text-brand-300">Tentang Kami</Link></li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-2">
            <p className="mb-3 text-sm font-semibold text-white">Kontak</p>
            <ul className="space-y-2.5 text-sm">
              {config.alamat && (
                <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0 text-brand-300" /> {config.alamat}</li>
              )}
              {config.jamOperasional && (
                <li className="flex items-center gap-2"><Clock size={15} className="shrink-0 text-brand-300" /> {config.jamOperasional}</li>
              )}
              {config.email && (
                <li className="flex items-center gap-2"><Mail size={15} className="shrink-0 text-brand-300" /> {config.email}</li>
              )}
              {config.instagram && (
                <li className="flex items-center gap-2"><Instagram size={15} className="shrink-0 text-brand-300" /> {config.instagram}</li>
              )}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {config.namaBrand}. Seluruh hak cipta dilindungi.</p>
          <Link href="/admin/login" className="transition hover:text-brand-300">Login Admin</Link>
        </div>
      </div>
    </footer>
  );
}
