"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { buatTokenSiswa, COOKIE_NAME, MASA_BERLAKU } from "@/lib/siswa-session";

export async function masukSiswa(formData: FormData) {
  // Ambil dan rapikan kode siswa
  const kode = String(formData.get("kode") ?? "")
    .trim()
    .toUpperCase();

  // Validasi format kode
  if (!/^[A-Z0-9]{6,12}$/.test(kode)) {
    return {
      berhasil: false,
      pesan: "Format kode siswa tidak valid.",
    };
  }

  // Cari kode siswa di database Supabase
  const { data: siswa, error } = await supabaseAdmin
    .from("siswa")
    .select("id")
    .eq("kode", kode)
    .maybeSingle();

  // Jika terjadi kesalahan database
  if (error) {
    console.error("ERROR LOGIN SISWA:", error);

    return {
      berhasil: false,
      pesan: "Terjadi kesalahan koneksi database. Periksa terminal.",
    };
  }

  // Jika kode tidak ditemukan
  if (!siswa) {
    return {
      berhasil: false,
      pesan: "Kode siswa tidak ditemukan.",
    };
  }

  // Buat token sesi siswa
  const token = buatTokenSiswa(Number(siswa.id));

  // Simpan token ke cookie
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MASA_BERLAKU,
  });

  // Arahkan siswa ke halaman dashboard
  redirect("/siswa");
}
