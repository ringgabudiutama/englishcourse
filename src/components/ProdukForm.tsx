"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ImagePlus, Loader2 } from "lucide-react";
import { KATEGORI_PRODUK, LEVEL_LABEL } from "@/lib/categories";

export type ProdukFormData = {
  kategori: string;
  nama: string;
  deskripsi: string;
  fitur: string;
  level: string;
  durasi: string;
  harga: string;
  hargaCoret: string;
  pamfletUrl: string;
  populer: boolean;
  status: string;
};

const empty: ProdukFormData = {
  kategori: "", nama: "", deskripsi: "", fitur: "", level: "SEMUA_LEVEL", durasi: "",
  harga: "", hargaCoret: "", pamfletUrl: "", populer: false, status: "DRAFT",
};

export default function ProdukForm({
  mode,
  produkId,
  initialData,
}: {
  mode: "create" | "edit";
  produkId?: string;
  initialData?: Partial<ProdukFormData>;
}) {
  const router = useRouter();
  const [data, setData] = useState<ProdukFormData>({ ...empty, ...initialData });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function set<K extends keyof ProdukFormData>(key: K, value: ProdukFormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("folder", "pamflet");
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const result = await res.json();
    setUploading(false);
    if (!res.ok) {
      toast.error(result.error ?? "Gagal mengunggah foto");
      return;
    }
    set("pamfletUrl", result.url);
    toast.success("Pamflet berhasil diunggah");
  }

  async function submitWithStatus(status: "DRAFT" | "PUBLISH") {
    if (!data.kategori) {
      toast.error("Pilih kategori produk");
      return;
    }
    if (!data.harga) {
      toast.error("Isi harga produk");
      return;
    }
    setSubmitting(true);

    const payload = {
      kategori: data.kategori,
      nama: data.nama,
      deskripsi: data.deskripsi,
      fitur: data.fitur,
      level: data.level,
      durasi: data.durasi,
      harga: Number(data.harga),
      hargaCoret: data.hargaCoret ? Number(data.hargaCoret) : null,
      pamfletUrl: data.pamfletUrl,
      populer: data.populer,
      status,
    };

    const res = await fetch(mode === "create" ? "/api/produk" : `/api/produk/${produkId}`, {
      method: mode === "create" ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      toast.error(result.error ?? "Gagal menyimpan produk");
      return;
    }

    toast.success(status === "PUBLISH" ? "Produk dipublikasikan" : "Draft disimpan");
    const targetId = mode === "create" ? result.id : produkId;
    router.push(`/admin/produk/${targetId}`);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="font-display text-base font-bold text-forest-950">Informasi Produk</h2>
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Kategori" required>
              <select required value={data.kategori} onChange={(e) => set("kategori", e.target.value)} className="input-field">
                <option value="">-- Pilih Kategori --</option>
                {KATEGORI_PRODUK.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </Field>
            <Field label="Level" required>
              <select required value={data.level} onChange={(e) => set("level", e.target.value)} className="input-field">
                {Object.entries(LEVEL_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Nama Produk / Kelas" required>
            <input required value={data.nama} onChange={(e) => set("nama", e.target.value)} className="input-field" placeholder="Contoh: Speaking Confidence Class" />
          </Field>

          <Field label="Durasi">
            <input value={data.durasi} onChange={(e) => set("durasi", e.target.value)} className="input-field" placeholder="Contoh: 8 pertemuan / 4 minggu" />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Harga (Rp)" required>
              <input required type="number" min={0} value={data.harga} onChange={(e) => set("harga", e.target.value)} className="input-field" placeholder="500000" />
            </Field>
            <Field label="Harga Coret (opsional)">
              <input type="number" min={0} value={data.hargaCoret} onChange={(e) => set("hargaCoret", e.target.value)} className="input-field" placeholder="750000" />
            </Field>
          </div>

          <Field label="Deskripsi Program" required>
            <textarea required rows={5} value={data.deskripsi} onChange={(e) => set("deskripsi", e.target.value)} className="input-field resize-none" placeholder="Jelaskan program kursus ini secara lengkap..." />
          </Field>

          <Field label="Fitur / Yang Didapat" required>
            <textarea required rows={5} value={data.fitur} onChange={(e) => set("fitur", e.target.value)} className="input-field resize-none" placeholder={"Satu poin per baris, contoh:\nModul belajar digital\nSertifikat resmi\nSesi konsultasi gratis"} />
            <p className="mt-1 text-xs text-ink-500">Tulis satu poin per baris, akan tampil sebagai daftar centang.</p>
          </Field>

          <Field label="Pamflet / Foto Produk">
            <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-ink-100 px-4 py-8 text-center hover:border-brand-300">
              {uploading ? <Loader2 size={22} className="animate-spin text-brand-500" /> : <ImagePlus size={22} className="text-ink-300" />}
              <span className="text-xs text-ink-500">
                {data.pamfletUrl ? "Foto terunggah — klik untuk ganti" : "Klik untuk unggah pamflet (maks 8MB)"}
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
            </label>
            {data.pamfletUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.pamfletUrl} alt="Preview pamflet" className="mt-3 max-h-56 rounded-lg border border-ink-100 object-contain" />
            )}
          </Field>

          <label className="flex items-center gap-2.5 text-sm text-ink-700">
            <input type="checkbox" checked={data.populer} onChange={(e) => set("populer", e.target.checked)} className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500" />
            Tandai sebagai program populer (tampil di landing page)
          </label>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={() => router.back()} className="btn-outline">Batal</button>
        <button type="button" onClick={() => submitWithStatus("DRAFT")} disabled={submitting || uploading} className="btn-outline">
          {submitting ? "Menyimpan..." : "Simpan sebagai Draft"}
        </button>
        <button type="button" onClick={() => submitWithStatus("PUBLISH")} disabled={submitting || uploading} className="btn-primary">
          {submitting ? "Menyimpan..." : "Publikasikan"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="label-field">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
