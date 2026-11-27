"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { tambahSiswa } from "./actions";

export default function TambahSiswaForm() {
  const router = useRouter();

  const [terbuka, setTerbuka] = useState(false);
  const [pesan, setPesan] = useState("");
  const [berhasil, setBerhasil] = useState(false);
  const [memuat, setMemuat] = useState(false);

  async function handleSubmit(formData: FormData) {
    setMemuat(true);
    setPesan("");

    try {
      const hasil = await tambahSiswa(formData);

      setPesan(hasil.pesan);
      setBerhasil(hasil.berhasil);

      if (hasil.berhasil) {
        router.refresh();
        setTerbuka(false);
      }
    } catch {
      setPesan("Terjadi kesalahan. Silakan coba lagi.");
      setBerhasil(false);
    } finally {
      setMemuat(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setTerbuka(!terbuka);
          setPesan("");
        }}
        className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
      >
        {terbuka ? "Tutup Formulir" : "+ Tambah Siswa"}
      </button>

      {terbuka && (
        <form
          action={handleSubmit}
          className="mt-6 rounded-xl border bg-white p-6 shadow-sm"
        >
          <h2 className="mb-5 text-xl font-bold text-gray-900">
            Formulir Tambah Siswa
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nama Siswa
              </label>
              <input
                name="nama"
                type="text"
                required
                placeholder="Masukkan nama siswa"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Kelas
              </label>
              <input
                name="kelas"
                type="text"
                required
                placeholder="Contoh: XI RPL 1"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tempat PKL
              </label>
              <input
                name="tempat_pkl"
                type="text"
                required
                placeholder="Masukkan tempat PKL"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Pembimbing
              </label>
              <input
                name="pembimbing"
                type="text"
                required
                placeholder="Masukkan nama pembimbing"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Kode Siswa
              </label>
              <input
                name="kode"
                type="text"
                required
                minLength={6}
                maxLength={12}
                placeholder="Contoh: PKL004"
                className="w-full rounded-lg border px-4 py-3 uppercase outline-none focus:border-blue-600"
              />
              <p className="mt-1 text-xs text-gray-500">
                Kode harus terdiri dari 6 sampai 12 karakter huruf atau angka.
              </p>
            </div>
          </div>

          {pesan && (
            <p
              className={`mt-5 rounded-lg p-3 text-sm ${
                berhasil
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {pesan}
            </p>
          )}

          <button
            type="submit"
            disabled={memuat}
            className="mt-6 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
          >
            {memuat ? "Menyimpan..." : "Simpan Siswa"}
          </button>
        </form>
      )}
    </div>
  );
}
