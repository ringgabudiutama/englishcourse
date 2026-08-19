"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, ListChecks, Settings } from "lucide-react";
import Logo from "@/components/Logo";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/produk/tambah", label: "Tambah Produk", icon: PlusCircle },
  { href: "/admin/produk", label: "Kelola Produk", icon: ListChecks },
  { href: "/admin/pengaturan", label: "Pengaturan", icon: Settings },
];

export default function Sidebar({
  logoUrl,
  namaBrand,
}: {
  logoUrl?: string | null;
  namaBrand?: string | null;
}) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-ink-100 bg-white lg:block">
      <div className="flex h-16 items-center gap-1.5 border-b border-ink-100 px-6">
        <Logo size="sm" logoUrl={logoUrl} namaBrand={namaBrand} />
        <span className="ml-auto rounded bg-ink-100 px-1.5 py-0.5 text-[10px] font-semibold text-ink-500">
          ADMIN
        </span>
      </div>
      <nav className="space-y-1 px-3 py-4">
        {links.map((link) => {
          const Icon = link.icon;
          let isActive = pathname === link.href;
          if (link.href === "/admin/produk") {
            isActive = pathname === "/admin/produk" || (pathname.startsWith("/admin/produk/") && pathname !== "/admin/produk/tambah");
          }
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive ? "bg-brand-50 text-brand-700" : "text-ink-700 hover:bg-ink-100"
              }`}
            >
              <Icon size={17} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
