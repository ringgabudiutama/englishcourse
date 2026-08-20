import AkunForm from "@/components/AkunForm";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AkunPage() {
  const session = await getSession();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-forest-950">Akun Saya</h1>
        <p className="mt-1 text-sm text-ink-500">Ubah nama, email (username), dan password login admin</p>
      </div>
      <div className="max-w-2xl">
        <AkunForm
          initialData={{
            name: session?.name ?? "",
            email: session?.email ?? "",
          }}
        />
      </div>
    </div>
  );
}
