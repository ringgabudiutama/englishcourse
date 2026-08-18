"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, ListChecks, Settings } from "lucide-react";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/produk/tambah", label: "Tambah", icon: PlusCircle },
  { href: "/admin/produk", label: "Produk", icon: ListChecks },
  { href: "/admin/pengaturan", label: "Atur", icon: Settings },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-ink-100 bg-white lg:hidden">
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
            className={`flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium ${
              isActive ? "text-brand-600" : "text-ink-500"
            }`}
          >
            <Icon size={18} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
