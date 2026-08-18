"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export type TrendPoint = { bulan: string; total: number };

export default function ProdukTrendChart({ data }: { data: TrendPoint[] }) {
  const allZero = data.every((d) => d.total === 0);

  return (
    <div className="h-56 w-full">
      {allZero ? (
        <div className="flex h-full items-center justify-center text-sm text-ink-400">
          Belum ada data produk untuk ditampilkan.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="trendFillGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#059669" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#F1F5F2" />
            <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: "#616E80" }} axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#616E80" }} axisLine={false} tickLine={false} width={28} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 10, border: "1px solid #F1F5F2", boxShadow: "0 8px 24px -8px rgba(11,18,32,0.15)" }}
              labelStyle={{ fontWeight: 600, color: "#0B1220" }}
              formatter={(value: number) => [`${value} produk`, "Total"]}
            />
            <Area type="monotone" dataKey="total" stroke="#059669" strokeWidth={2.5} fill="url(#trendFillGreen)" />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
