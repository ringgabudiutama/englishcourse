import Link from "next/link";
import Image from "next/image";
import { Clock, Star, BarChart3 } from "lucide-react";
import { LEVEL_LABEL } from "@/lib/categories";
import { formatRupiah, formatRupiahSingkat, diskonPersen } from "@/lib/utils";

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

const KATEGORI_COLOR: Record<string, string> = {
  Speaking: "bg-brand-600",
  Listening: "bg-sky-500",
  Vocabulary: "bg-purple-500",
  Grammar: "bg-forest-700",
  Writing: "bg-pink-500",
  Reading: "bg-sun-500",
  Conversation: "bg-brand-600",
  "TOEFL / IELTS Preparation": "bg-red-500",
  "Business English": "bg-forest-800",
  "English for Kids": "bg-pink-500",
};

export default function ProdukCard(props: Props) {
  const diskon = diskonPersen(props.harga, props.hargaCoret);
  const kategoriColor = KATEGORI_COLOR[props.kategori] ?? "bg-brand-600";

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
        <span className={`badge absolute left-3 top-3 ${kategoriColor} text-white`}>{props.kategori}</span>
        {props.populer && (
          <span className="badge absolute right-3 top-3 bg-sun-400 text-forest-950">
            <Star size={11} className="mr-1" fill="currentColor" /> Populer
          </span>
        )}

        {/* price badge, circular, bottom-right overlapping the image */}
        <div className="absolute -bottom-5 right-4 flex h-16 w-16 flex-col items-center justify-center rounded-full border-4 border-white bg-forest-900 text-center shadow-card-hover">
          {diskon ? (
            <span className="text-[10px] font-extrabold leading-none text-sun-300">-{diskon}%</span>
          ) : null}
          <span className="px-1 text-[10px] font-bold leading-tight text-white">
            {formatRupiahSingkat(props.harga)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 pt-6">
        <h3 className="font-display text-base font-bold text-ink-900 group-hover:text-brand-600">{props.nama}</h3>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
          <span className="flex items-center gap-1"><BarChart3 size={12} /> {LEVEL_LABEL[props.level] ?? props.level}</span>
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
