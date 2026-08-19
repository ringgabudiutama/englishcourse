export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
    value
  );
}

export function formatRupiahSingkat(value: number) {
  if (value >= 1_000_000) {
    const jt = value / 1_000_000;
    return `${jt % 1 === 0 ? jt : jt.toFixed(1)}jt`;
  }
  if (value >= 1_000) {
    return `${Math.round(value / 1_000)}rb`;
  }
  return String(value);
}

export function formatTanggal(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export function formatRelatif(date: Date | string) {
  const d = new Date(date);
  const diffMs = Date.now() - d.getTime();
  const diffHari = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffHari <= 0) return "Hari ini";
  if (diffHari === 1) return "1 hari lalu";
  if (diffHari < 30) return `${diffHari} hari lalu`;
  return formatTanggal(date);
}

export function waLink(nomor: string, pesan?: string) {
  const cleaned = nomor.replace(/\D/g, "").replace(/^0/, "62");
  const text = pesan ? `?text=${encodeURIComponent(pesan)}` : "";
  return `https://wa.me/${cleaned}${text}`;
}

export function diskonPersen(harga: number, hargaCoret?: number | null) {
  if (!hargaCoret || hargaCoret <= harga) return null;
  return Math.round(((hargaCoret - harga) / hargaCoret) * 100);
}

export function fiturList(fitur: string) {
  return fitur
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);
}
