
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ToggleStatusButton({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isPublish = status === "PUBLISH";

  async function toggle() {
    setLoading(true);
    const res = await fetch(`/api/produk/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: isPublish ? "DRAFT" : "PUBLISH" }),
    });
    setLoading(false);
    if (!res.ok) {
      toast.error("Gagal mengubah status");
      return;
    }
    toast.success(isPublish ? "Diubah ke Draft" : "Dipublikasikan");
    router.refresh();
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`badge ${isPublish ? "bg-brand-50 text-brand-700 hover:bg-brand-100" : "bg-sun-400/15 text-sun-500 hover:bg-sun-400/25"}`}
    >
      {loading ? "..." : isPublish ? "Publish" : "Draft"}
    </button>
  );
}
