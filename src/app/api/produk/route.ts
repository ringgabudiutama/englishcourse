import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const schema = z.object({
  kategori: z.string().min(2),
  nama: z.string().min(3),
  deskripsi: z.string().min(10),
  fitur: z.string().min(3),
  level: z.enum(["PEMULA", "MENENGAH", "MAHIR", "SEMUA_LEVEL"]),
  durasi: z.string().optional().or(z.literal("")),
  harga: z.number().int().nonnegative(),
  hargaCoret: z.number().int().nonnegative().optional().nullable(),
  pamfletUrl: z.string().optional().or(z.literal("")),
  populer: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISH"]),
});

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Data tidak valid" }, { status: 400 });
  }
  const d = parsed.data;

  const produk = await prisma.produk.create({
    data: {
      adminId: session.userId,
      kategori: d.kategori,
      nama: d.nama,
      deskripsi: d.deskripsi,
      fitur: d.fitur,
      level: d.level,
      durasi: d.durasi || null,
      harga: d.harga,
      hargaCoret: d.hargaCoret || null,
      pamfletUrl: d.pamfletUrl || null,
      populer: d.populer ?? false,
      status: d.status,
    },
  });

  return NextResponse.json({ ok: true, id: produk.id });
}
