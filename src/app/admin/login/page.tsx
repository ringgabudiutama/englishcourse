"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Logo from "@/components/Logo";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      toast.error(data.error ?? "Gagal masuk");
      return;
    }
    toast.success("Selamat datang kembali!");
    router.push(params.get("redirect") || "/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50/60 px-4">
      <div className="w-full max-w-sm rounded-xl2 border border-brand-100 bg-white p-8 shadow-card-hover">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center font-display text-xl font-bold text-forest-950">Login Admin</h1>
        <p className="mt-1 text-center text-sm text-ink-500">Khusus untuk pengelola EnglishKu</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="label-field">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="admin@englishku.com" />
          </div>
          <div>
            <label className="label-field">Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="Password kamu" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
