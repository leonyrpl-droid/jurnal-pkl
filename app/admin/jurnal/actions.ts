"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function ubahStatusJurnal(
  id: number,
  status: "disetujui" | "revisi",
) {
  const supabase = await createClient();

  // Periksa login
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      berhasil: false,
      pesan: "Silakan login terlebih dahulu.",
    };
  }

  // Periksa role admin
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

  // Perbarui status jurnal
  const { data, error } = await supabase
    .from("jurnal")
    .update({ status })
    .eq("id", id)
    .select("id")
    .single();

  if (error || !data) {
    return {
      berhasil: false,
      pesan: "Gagal mengubah status jurnal.",
    };
  }

  revalidatePath("/admin/jurnal");

  return {
    berhasil: true,
    pesan:
      status === "disetujui"
        ? "Jurnal berhasil disetujui."
        : "Jurnal berhasil diminta revisi.",
  };
}
