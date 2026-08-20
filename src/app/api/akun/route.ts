import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession, verifyPassword, hashPassword, createSessionCookie } from "@/lib/auth";

const schema = z
  .object({
    name: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    currentPassword: z.string().min(1, "Password saat ini wajib diisi"),
    newPassword: z.string().optional().or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine((d) => !d.newPassword || d.newPassword.length >= 6, {
    message: "Password baru minimal 6 karakter",
    path: ["newPassword"],
  })
  .refine((d) => !d.newPassword || d.newPassword === d.confirmPassword, {
    message: "Konfirmasi password baru tidak cocok",
    path: ["confirmPassword"],
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

  const admin = await prisma.admin.findUnique({ where: { id: session.userId } });
  if (!admin) return NextResponse.json({ error: "Akun tidak ditemukan" }, { status: 404 });

  const validPassword = await verifyPassword(d.currentPassword, admin.passwordHash);
  if (!validPassword) {
    return NextResponse.json({ error: "Password saat ini salah" }, { status: 401 });
  }

  if (d.email !== admin.email) {
    const taken = await prisma.admin.findUnique({ where: { email: d.email } });
    if (taken) {
      return NextResponse.json({ error: "Email sudah dipakai akun lain" }, { status: 400 });
    }
  }

  const updated = await prisma.admin.update({
    where: { id: admin.id },
    data: {
      name: d.name,
      email: d.email,
      ...(d.newPassword ? { passwordHash: await hashPassword(d.newPassword) } : {}),
    },
  });

  // refresh session cookie so the new name/email show immediately without re-login
  await createSessionCookie({ userId: updated.id, name: updated.name, email: updated.email });

  return NextResponse.json({ ok: true });
}
