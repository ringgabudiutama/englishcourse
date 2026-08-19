"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ImagePlus, Loader2 } from "lucide-react";

export type PengaturanData = {
  namaBrand: string;
  tagline: string;
  whatsappAdmin: string;
  email: string;
  alamat: string;
  jamOperasional: string;
  instagram: string;
  logoUrl: string;
  heroFotoUrl: string;
  totalSiswa: string;
  totalMentor: string;
  tahunPengalaman: string;
};

export default function PengaturanForm({ initialData }: { initialData: PengaturanData }) {
  const router = useRouter();
  const [data, setData] = useState<PengaturanData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  function set<K extends keyof PengaturanData>(key: K, value: PengaturanData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    const form = new FormData();
    form.append("file", file);
    form.append("folder", "logo");
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const result = await res.json();
    setUploadingLogo(false);
    if (!res.ok) {
      toast.error(result.error ?? "Gagal mengunggah logo");
      return;
    }
    set("logoUrl", result.url);
    toast.success("Logo berhasil diunggah");
  }

  async function handleFotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("folder", "hero");
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const result = await res.json();
    setUploading(false);
    if (!res.ok) {
      toast.error(result.error ?? "Gagal mengunggah foto");
      return;
    }
    set("heroFotoUrl", result.url);
    toast.success("Foto hero berhasil diunggah");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/pengaturan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setSubmitting(false);
    if (!res.ok) {
      toast.error(result.error ?? "Gagal menyimpan pengaturan");
      return;
    }
    toast.success("Pengaturan disimpan");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card p-6">
        <h2 className="font-display text-base font-bold text-forest-950">Kontak WhatsApp</h2>
        <p className="mt-1 text-xs text-ink-500">Nomor ini dipakai untuk semua tombol &ldquo;Daftar / Konsultasi via WhatsApp&rdquo; di website.</p>
        <div className="mt-4">
          <label className="label-field">Nomor WhatsApp Admin</label>
          <input required value={data.whatsappAdmin} onChange={(e) => set("whatsappAdmin", e.target.value)} className="input-field" placeholder="08xx atau 62xx" />
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-display text-base font-bold text-forest-950">Identitas Brand</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="label-field">Nama Brand</label>
            <input required value={data.namaBrand} onChange={(e) => set("namaBrand", e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="label-field">Tagline</label>
            <input required value={data.tagline} onChange={(e) => set("tagline", e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="label-field">Logo</label>
            <p className="mb-2 text-xs text-ink-500">
              Dipakai di header, footer, dan panel admin. Kosongkan untuk pakai logo bawaan EnglishKu.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-ink-100 bg-ink-100/40 p-2">
                {data.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={data.logoUrl} alt="Preview logo" className="h-full w-full object-contain" />
                ) : (
                  <span className="text-[10px] text-ink-300">Bawaan</span>
                )}
              </div>
              <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-ink-100 px-4 py-3 text-center hover:border-brand-300">
                {uploadingLogo ? <Loader2 size={18} className="animate-spin text-brand-500" /> : <ImagePlus size={18} className="text-ink-300" />}
                <span className="text-xs text-ink-500">
                  {data.logoUrl ? "Klik untuk ganti logo" : "Klik untuk unggah logo (PNG/SVG transparan)"}
                </span>
                <input type="file" accept="image/png,image/svg+xml,image/webp" className="hidden" onChange={handleLogoUpload} disabled={uploadingLogo} />
              </label>
              {data.logoUrl && (
                <button
                  type="button"
                  onClick={() => set("logoUrl", "")}
                  className="shrink-0 text-xs font-medium text-ink-500 hover:text-red-600"
                >
                  Hapus
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-display text-base font-bold text-forest-950">Statistik di Landing Page</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="label-field">Total Siswa</label>
            <input required value={data.totalSiswa} onChange={(e) => set("totalSiswa", e.target.value)} className="input-field" placeholder="500+" />
          </div>
          <div>
            <label className="label-field">Total Mentor</label>
            <input required value={data.totalMentor} onChange={(e) => set("totalMentor", e.target.value)} className="input-field" placeholder="15+" />
          </div>
          <div>
            <label className="label-field">Tahun Pengalaman</label>
            <input required value={data.tahunPengalaman} onChange={(e) => set("tahunPengalaman", e.target.value)} className="input-field" placeholder="8+" />
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-display text-base font-bold text-forest-950">Foto Hero (Landing Page)</h2>
        <p className="mt-1 text-xs text-ink-500">
          Pakai foto PNG dengan background transparan (background sudah dihapus) supaya menyatu bagus dengan halaman.
        </p>
        <div className="mt-4">
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-ink-100 px-4 py-8 text-center hover:border-brand-300">
            {uploading ? <Loader2 size={22} className="animate-spin text-brand-500" /> : <ImagePlus size={22} className="text-ink-300" />}
            <span className="text-xs text-ink-500">
              {data.heroFotoUrl ? "Foto terunggah — klik untuk ganti" : "Klik untuk unggah foto (PNG transparan, maks 8MB)"}
            </span>
            <input type="file" accept="image/png,image/webp" className="hidden" onChange={handleFotoUpload} disabled={uploading} />
          </label>
          {data.heroFotoUrl && (
            <div className="mt-3 flex justify-center rounded-lg bg-brand-50/60 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.heroFotoUrl} alt="Preview foto hero" className="max-h-64 object-contain" />
            </div>
          )}
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-display text-base font-bold text-forest-950">Info Kontak Tambahan</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="label-field">Alamat</label>
            <input value={data.alamat} onChange={(e) => set("alamat", e.target.value)} className="input-field" placeholder="Jl. Contoh No. 123, Kota" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field">Jam Operasional</label>
              <input value={data.jamOperasional} onChange={(e) => set("jamOperasional", e.target.value)} className="input-field" placeholder="Senin - Sabtu, 09.00 - 20.00" />
            </div>
            <div>
              <label className="label-field">Email</label>
              <input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} className="input-field" placeholder="halo@englishku.com" />
            </div>
          </div>
          <div>
            <label className="label-field">Instagram</label>
            <input value={data.instagram} onChange={(e) => set("instagram", e.target.value)} className="input-field" placeholder="@englishku" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={submitting || uploading || uploadingLogo} className="btn-primary">
          {submitting ? "Menyimpan..." : "Simpan Pengaturan"}
        </button>
      </div>
    </form>
  );
}
