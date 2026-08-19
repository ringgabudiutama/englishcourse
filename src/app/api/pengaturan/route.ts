import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const schema = z.object({
  namaBrand: z.string().min(2),
  tagline: z.string().min(2),
  whatsappAdmin: z.string().min(8),
  email: z.string().optional().or(z.literal("")),
  alamat: z.string().optional().or(z.literal("")),
  jamOperasional: z.string().optional().or(z.literal("")),
  instagram: z.string().optional().or(z.literal("")),
  heroFotoUrl: z.string().optional().or(z.literal("")),
  totalSiswa: z.string().min(1),
  totalMentor: z.string().min(1),
  tahunPengalaman: z.string().min(1),
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

  await prisma.siteConfig.upsert({
    where: { id: "main" },
    update: {
      namaBrand: d.namaBrand,
      tagline: d.tagline,
      whatsappAdmin: d.whatsappAdmin,
      email: d.email || null,
      alamat: d.alamat || null,
      jamOperasional: d.jamOperasional || null,
      instagram: d.instagram || null,
      heroFotoUrl: d.heroFotoUrl || null,
      totalSiswa: d.totalSiswa,
      totalMentor: d.totalMentor,
      tahunPengalaman: d.tahunPengalaman,
    },
    create: {
      id: "main",
      namaBrand: d.namaBrand,
      tagline: d.tagline,
      whatsappAdmin: d.whatsappAdmin,
      email: d.email || null,
      alamat: d.alamat || null,
      jamOperasional: d.jamOperasional || null,
      instagram: d.instagram || null,
      heroFotoUrl: d.heroFotoUrl || null,
      totalSiswa: d.totalSiswa,
      totalMentor: d.totalMentor,
      tahunPengalaman: d.tahunPengalaman,
    },
  });

  return NextResponse.json({ ok: true });
}
