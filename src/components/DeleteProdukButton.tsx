"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

export default function DeleteProdukButton({ id }: { id: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const res = await fetch(`/api/produk/${id}`, { method: "DELETE" });
    setLoading(false);
    if (!res.ok) {
      toast.error("Gagal menghapus produk");
      return;
    }
    toast.success("Produk dihapus");
    router.refresh();
  }

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <button onClick={handleDelete} disabled={loading} className="rounded bg-red-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-700">
          {loading ? "..." : "Yakin?"}
        </button>
        <button onClick={() => setConfirming(false)} className="rounded border border-ink-100 px-2.5 py-1 text-xs font-semibold text-ink-500">
          Batal
        </button>
      </span>
    );
  }

  return (
    <button onClick={() => setConfirming(true)} className="rounded bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-100">
      <Trash2 size={12} className="inline -mt-0.5 mr-1" /> Hapus
    </button>
  );
}
