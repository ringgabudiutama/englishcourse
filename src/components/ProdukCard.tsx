import Link from "next/link";
import Image from "next/image";
import { Clock, Star, BarChart3, ArrowUpRight } from "lucide-react";
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
  Listening: "bg-forest-700",
  Vocabulary: "bg-sun-500",
  Grammar: "bg-brand-800",
  Writing: "bg-forest-800",
  Reading: "bg-sun-600",
  Conversation: "bg-brand-500",
  "TOEFL / IELTS Preparation": "bg-forest-950",
  "Business English": "bg-brand-900",
  "English for Kids": "bg-sun-400",
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
            <span className="font-display text-base font-extrabold sm:text-3xl">{props.nama.slice(0, 2).toUpperCase()}</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/55 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        <span className={`badge absolute left-1 top-1 px-1.5 py-0.5 text-[8px] sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs ${kategoriColor} text-white`}>{props.kategori}</span>
        {props.populer && (
          <span className="badge absolute right-1 top-1 px-1.5 py-0.5 text-[8px] sm:right-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs bg-sun-400 text-white">
            <Star size={9} className="mr-0.5 sm:hidden" fill="currentColor" />
            <Star size={11} className="mr-1 hidden sm:inline" fill="currentColor" />
            <span className="hidden sm:inline">Populer</span>
          </span>
        )}

        {/* arrow button, appears on hover like a "view detail" affordance */}
        <span className="absolute bottom-1.5 right-1.5 hidden h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-brand-600 opacity-0 shadow-card-hover transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
          <ArrowUpRight size={16} />
        </span>

        {/* price badge, circular, bottom-right overlapping the image */}
        <div className="absolute -bottom-3 left-1.5 flex h-9 w-9 flex-col items-center justify-center rounded-full border-2 border-white bg-forest-950 text-center shadow-card-hover sm:-bottom-5 sm:left-4 sm:h-16 sm:w-16 sm:border-4">
          {diskon ? (
            <span className="text-[6px] font-extrabold leading-none text-sun-300 sm:text-[10px]">-{diskon}%</span>
          ) : null}
          <span className="px-0.5 text-[6px] font-bold leading-tight text-white sm:px-1 sm:text-[10px]">
            {formatRupiahSingkat(props.harga)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-1.5 pt-4 sm:gap-2 sm:p-4 sm:pt-6">
        <h3 className="font-display text-[10px] font-bold leading-tight text-ink-900 line-clamp-2 sm:text-base sm:leading-normal sm:line-clamp-none group-hover:text-brand-600">{props.nama}</h3>

        <div className="hidden flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500 sm:flex">
          <span className="flex items-center gap-1"><BarChart3 size={12} /> {LEVEL_LABEL[props.level] ?? props.level}</span>
          {props.durasi && (
            <span className="flex items-center gap-1"><Clock size={12} /> {props.durasi}</span>
          )}
        </div>

        <div className="mt-auto flex items-baseline gap-1 border-t border-ink-100 pt-1.5 sm:gap-2 sm:pt-3">
          <span className="font-display text-[10px] font-extrabold text-forest-900 sm:text-lg">{formatRupiah(props.harga)}</span>
          {props.hargaCoret && props.hargaCoret > props.harga && (
            <span className="hidden text-xs text-ink-300 line-through sm:inline">{formatRupiah(props.hargaCoret)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
