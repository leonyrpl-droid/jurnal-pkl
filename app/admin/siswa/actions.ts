"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// ==========================================
// TAMBAH SISWA
// ==========================================
export async function tambahSiswa(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      berhasil: false,
      pesan: "Silakan login terlebih dahulu.",
    };
  }

  const { data: profil, error: errorProfil } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (errorProfil || profil?.role !== "admin") {
    return {
      berhasil: false,
      pesan: "Kamu tidak memiliki akses admin.",
    };
  }

  const nama = String(formData.get("nama") ?? "").trim();
  const kelas = String(formData.get("kelas") ?? "").trim();
  const tempat_pkl = String(formData.get("tempat_pkl") ?? "").trim();
  const pembimbing = String(formData.get("pembimbing") ?? "").trim();
  const kode = String(formData.get("kode") ?? "")
    .trim()
    .toUpperCase();

  if (!nama || !kelas || !tempat_pkl || !pembimbing || !kode) {
    return {
      berhasil: false,
      pesan: "Semua kolom wajib diisi.",
    };
  }

  if (!/^[A-Z0-9]{6,12}$/.test(kode)) {
    return {
      berhasil: false,
      pesan: "Kode siswa harus 6 sampai 12 karakter huruf atau angka.",
    };
  }

  const { error } = await supabase.from("siswa").insert({
    nama,
    kelas,
    tempat_pkl,
    pembimbing,
    kode,
  });

  if (error) {
    console.error("ERROR TAMBAH SISWA:", error);

    if (error.code === "23505") {
      return {
        berhasil: false,
        pesan: "Kode siswa sudah digunakan.",
      };
    }

    return {
      berhasil: false,
      pesan: "Gagal menyimpan data siswa.",
    };
  }

  revalidatePath("/admin/siswa");

  return {
    berhasil: true,
    pesan: "Siswa berhasil ditambahkan.",
  };
}

// ==========================================
// EDIT SISWA
// ==========================================
export async function ubahSiswa(id: number, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      berhasil: false,
      pesan: "Silakan login terlebih dahulu.",
    };
  }

  const { data: profil, error: errorProfil } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (errorProfil || profil?.role !== "admin") {
    return {
      berhasil: false,
      pesan: "Kamu tidak memiliki akses admin.",
    };
  }

  if (!Number.isInteger(id) || id <= 0) {
    return {
      berhasil: false,
      pesan: "ID siswa tidak valid.",
    };
  }

  const nama = String(formData.get("nama") ?? "").trim();
  const kelas = String(formData.get("kelas") ?? "").trim();
  const tempat_pkl = String(formData.get("tempat_pkl") ?? "").trim();
  const pembimbing = String(formData.get("pembimbing") ?? "").trim();
  const kode = String(formData.get("kode") ?? "")
    .trim()
    .toUpperCase();

  if (!nama || !kelas || !tempat_pkl || !pembimbing || !kode) {
    return {
      berhasil: false,
      pesan: "Semua kolom wajib diisi.",
    };
  }

  if (!/^[A-Z0-9]{6,12}$/.test(kode)) {
    return {
      berhasil: false,
      pesan: "Kode siswa harus 6 sampai 12 karakter huruf atau angka.",
    };
  }

  const { data, error } = await supabase
    .from("siswa")
    .update({
      nama,
      kelas,
      tempat_pkl,
      pembimbing,
      kode,
    })
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("ERROR UBAH SISWA:", error);

    if (error.code === "23505") {
      return {
        berhasil: false,
        pesan: "Kode siswa sudah digunakan.",
      };
    }

    return {
      berhasil: false,
      pesan: "Gagal memperbarui data siswa.",
    };
  }

  if (!data) {
    return {
      berhasil: false,
      pesan: "Data siswa tidak ditemukan.",
    };
  }

  revalidatePath("/admin/siswa");

  return {
    berhasil: true,
    pesan: "Data siswa berhasil diperbarui.",
  };
}
