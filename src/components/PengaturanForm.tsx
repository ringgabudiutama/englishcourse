"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export type PengaturanData = {
  namaBrand: string;
  tagline: string;
  whatsappAdmin: string;
  email: string;
  alamat: string;
  jamOperasional: string;
  instagram: string;
  totalSiswa: string;
  totalMentor: string;
  tahunPengalaman: string;
};

export default function PengaturanForm({ initialData }: { initialData: PengaturanData }) {
  const router = useRouter();
  const [data, setData] = useState<PengaturanData>(initialData);
  const [submitting, setSubmitting] = useState(false);

  function set<K extends keyof PengaturanData>(key: K, value: PengaturanData[K]) {
    setData((d) => ({ ...d, [key]: value }));
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
        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? "Menyimpan..." : "Simpan Pengaturan"}
        </button>
      </div>
    </form>
  );
}
