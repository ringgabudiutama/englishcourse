import { Mic, Headphones, BookOpen, Star, CheckCircle2 } from "lucide-react";

export default function HeroVisual() {
  return (
    <div className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
      <div className="absolute inset-0 rounded-full bg-brand-200/30 blur-3xl" />

      {/* main mock card: lesson progress */}
      <div className="absolute inset-x-6 top-8 bottom-20 rounded-2xl border border-forest-800/10 bg-white p-5 shadow-card-hover">
        <div className="flex items-center justify-between">
          <span className="badge bg-brand-50 text-brand-700">Speaking Class</span>
          <div className="flex gap-0.5 text-sun-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} fill="currentColor" />
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {[
            { icon: Mic, label: "Pronunciation", w: 88 },
            { icon: Headphones, label: "Listening", w: 72 },
            { icon: BookOpen, label: "Vocabulary", w: 95 },
          ].map((row, i) => (
            <div key={i} className="rounded-xl border border-ink-100 bg-ink-100/40 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-ink-700">
                <row.icon size={14} className="text-brand-600" /> {row.label}
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400" style={{ width: `${row.w}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2 text-[11px] text-ink-500">
          <CheckCircle2 size={13} className="text-brand-600" /> Progress belajar minggu ini
        </div>
      </div>

      {/* floating: kelas selesai */}
      <div className="absolute -left-4 top-6 flex items-center gap-2.5 rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 shadow-card-hover">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle2 size={16} />
        </span>
        <div>
          <p className="text-xs font-semibold text-ink-900">Kelas Selesai</p>
          <p className="text-[10px] text-ink-500">Sertifikat otomatis</p>
        </div>
      </div>

      {/* floating: rating */}
      <div className="absolute -right-3 bottom-6 max-w-[190px] rounded-xl border border-ink-100 bg-white px-4 py-3 shadow-card-hover">
        <div className="flex gap-0.5 text-sun-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={11} fill="currentColor" />
          ))}
        </div>
        <p className="mt-1.5 text-xs leading-snug text-ink-700">
          &ldquo;Speaking makin lancar cuma dalam 2 bulan.&rdquo;
        </p>
      </div>
    </div>
  );
}
