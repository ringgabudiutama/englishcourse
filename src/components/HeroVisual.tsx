import Image from "next/image";
import { Users, Globe2, Languages, Sparkles } from "lucide-react";

const BADGES = [
  { icon: Users, label: "Siswa Aktif", color: "bg-brand-600", position: "left-0 top-6 -translate-x-[8%] sm:-translate-x-1/4" },
  { icon: Sparkles, label: "Kelas Interaktif", color: "bg-sun-400", position: "right-0 top-24 translate-x-[8%] sm:translate-x-1/4" },
  { icon: Globe2, label: "Mentor Berpengalaman", color: "bg-forest-700", position: "left-0 bottom-28 -translate-x-[10%] sm:-translate-x-1/3" },
  { icon: Languages, label: "Materi Lengkap", color: "bg-brand-800", position: "right-2 bottom-6 translate-x-[5%]" },
];

export default function HeroVisual({
  fotoUrl,
  totalSiswa,
  totalMentor,
  tahunPengalaman,
}: {
  fotoUrl?: string | null;
  totalSiswa: string;
  totalMentor: string;
  tahunPengalaman: string;
}) {
  const values = [totalSiswa, tahunPengalaman + " Th", totalMentor];

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm sm:max-w-md">
      {/* decorative angular shapes, echoing a poster-style silhouette backdrop */}
      <div
        className="absolute right-[6%] top-[6%] -z-10 h-[78%] w-[62%] rounded-[2.5rem] bg-forest-950"
        style={{ clipPath: "polygon(18% 0%, 100% 0%, 82% 100%, 0% 100%)" }}
      />
      <div
        className="absolute -right-2 top-10 -z-10 h-24 w-24 rounded-2xl bg-sun-400 opacity-90"
        style={{ clipPath: "polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)" }}
      />
      {/* decorative rings */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[85%] w-[85%] animate-pulse-soft rounded-full border-2 border-dashed border-brand-200" />
      </div>
      <div className="absolute inset-6 -z-10 rounded-full bg-brand-100/60" />

      {/* photo or fallback */}
      <div className="relative mx-auto h-full w-full">
        {fotoUrl ? (
          <Image src={fotoUrl} alt="Siswa EnglishKu" fill className="object-contain object-bottom" priority />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-forest-800 text-white shadow-card-hover">
              <span className="font-display text-5xl font-extrabold">EK</span>
            </div>
          </div>
        )}
      </div>

      {/* floating stat badges */}
      {BADGES.slice(0, 3).map((b, i) => (
        <div
          key={b.label}
          className={`absolute ${b.position} flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-card-hover`}
        >
          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${b.color} text-white`}>
            <b.icon size={15} />
          </span>
          <div>
            <p className="text-xs font-extrabold text-ink-900">{values[i]}</p>
            <p className="text-[10px] text-ink-500">{b.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
