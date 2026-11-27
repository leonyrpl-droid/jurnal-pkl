"use server";

import { revalidatePath } from "next/cache";
import { getSiswaSession } from "@/lib/get-siswa-session";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { validasiJurnal } from "@/lib/validasi";

export async function tambahJurnal(formData: FormData) {
  // Periksa sesi login siswa
  const siswaId = await getSiswaSession();

  if (!siswaId) {
    return {
      berhasil: false,
      pesan: "Sesi login berakhir. Silakan masuk kembali.",
    };
  }

  // Ambil data dari formulir
  const tanggal = String(formData.get("tanggal") ?? "").trim();
  const kegiatan = String(formData.get("kegiatan") ?? "").trim();
  const kompetensi = String(formData.get("kompetensi") ?? "").trim();
  const durasi_jam = Number(formData.get("durasi_jam"));

  // Validasi data jurnal
  const pesanValidasi = validasiJurnal({
    tanggal,
    kegiatan,
    kompetensi,
    durasi_jam,
  });

  if (pesanValidasi) {
    return {
      berhasil: false,
      pesan: pesanValidasi,
    };
  }

  // Simpan jurnal ke database
  const { error } = await supabaseAdmin.from("jurnal").insert({
    siswa_id: siswaId,
    tanggal,
    kegiatan,
    kompetensi,
    durasi_jam,
    status: "diajukan",
  });

  // Periksa kesalahan penyimpanan
  if (error) {
    console.error("ERROR TAMBAH JURNAL:", error);

    if (error.code === "23505") {
      return {
        berhasil: false,
        pesan: "Kamu sudah mengisi jurnal untuk tanggal tersebut.",
      };
    }

    return {
      berhasil: false,
      pesan: "Gagal menyimpan jurnal. Silakan coba lagi.",
    };
  }

  // Perbarui halaman dashboard siswa
  revalidatePath("/siswa");

  return {
    berhasil: true,
    pesan: "Jurnal berhasil disimpan dan menunggu persetujuan admin.",
  };
}
