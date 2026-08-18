import ProdukForm from "@/components/ProdukForm";

export default function TambahProdukPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-forest-950">Tambah Produk</h1>
        <p className="mt-1 text-sm text-ink-500">Lengkapi data di bawah — simpan sebagai draft atau langsung publikasikan</p>
      </div>
      <div className="max-w-3xl">
        <ProdukForm mode="create" />
      </div>
    </div>
  );
}
