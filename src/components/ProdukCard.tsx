import Link from "next/link";
import Image from "next/image";
import { Clock, Star } from "lucide-react";
import { LEVEL_LABEL } from "@/lib/categories";
import { formatRupiah, diskonPersen } from "@/lib/utils";

type Props = {
  id: string;
  nama: string;
  kategori: string;
  level: string;
  durasi?: string | null;
  harga: number;
  hargaCoret?: number | null;
  pamfletUrl?: string | null;
  populer?: boolean;
};

export default function ProdukCard(props: Props) {
  const diskon = diskonPersen(props.harga, props.hargaCoret);

  return (
    <Link href={`/program/${props.id}`} className="card group flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-50">
        {props.pamfletUrl ? (
          <Image
            src={props.pamfletUrl}
            alt={props.nama}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-brand-300">
            <span className="font-display text-3xl font-extrabold">{props.nama.slice(0, 2).toUpperCase()}</span>
          </div>
        )}
        {props.populer && (
          <span className="badge absolute left-3 top-3 bg-sun-400 text-forest-950">
            <Star size={11} className="mr-1" fill="currentColor" /> Populer
          </span>
        )}
        {diskon && (
          <span className="badge absolute right-3 top-3 bg-red-500 text-white">-{diskon}%</span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="badge w-fit bg-brand-50 text-brand-700">{props.kategori}</span>
        <h3 className="font-display text-base font-bold text-ink-900 group-hover:text-brand-600">{props.nama}</h3>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
          <span>{LEVEL_LABEL[props.level] ?? props.level}</span>
          {props.durasi && (
            <span className="flex items-center gap-1"><Clock size={12} /> {props.durasi}</span>
          )}
        </div>

        <div className="mt-auto flex items-baseline gap-2 border-t border-ink-100 pt-3">
          <span className="font-display text-lg font-extrabold text-forest-900">{formatRupiah(props.harga)}</span>
          {props.hargaCoret && props.hargaCoret > props.harga && (
            <span className="text-xs text-ink-300 line-through">{formatRupiah(props.hargaCoret)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
