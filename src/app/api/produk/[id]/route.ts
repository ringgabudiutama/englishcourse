import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import type { Prisma } from "@prisma/client";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });

  const existing = await prisma.produk.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const allowed = [
    "kategori", "nama", "deskripsi", "fitur", "level", "durasi", "harga",
    "hargaCoret", "pamfletUrl", "populer", "status",
  ];
  const data: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) data[key] = body[key];
  }

  await prisma.produk.update({ where: { id }, data: data as Prisma.ProdukUpdateInput });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });

  const existing = await prisma.produk.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });

  await prisma.produk.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
