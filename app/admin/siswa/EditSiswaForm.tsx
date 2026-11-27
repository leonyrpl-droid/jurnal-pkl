"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ubahSiswa } from "./actions";

type DataSiswa = {
  id: number;
  nama: string;
  kelas: string;
  tempat_pkl: string;
  pembimbing: string;
  kode: string;
};

export default function EditSiswaForm({ siswa }: { siswa: DataSiswa }) {
  const router = useRouter();

  const [terbuka, setTerbuka] = useState(false);
  const [pesan, setPesan] = useState("");
  const [berhasil, setBerhasil] = useState(false);
  const [memuat, setMemuat] = useState(false);

  async function handleSubmit(formData: FormData) {
    setMemuat(true);
    setPesan("");

    try {
      const hasil = await ubahSiswa(siswa.id, formData);

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
        className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-600"
      >
        {terbuka ? "Tutup" : "Edit"}
      </button>

      {terbuka && (
        <form
          action={handleSubmit}
          className="mt-3 min-w-64 space-y-3 rounded-lg border bg-white p-4 text-left shadow-sm"
        >
          <h3 className="font-bold text-gray-800">Edit Data Siswa</h3>

          <input
            name="nama"
            defaultValue={siswa.nama}
            required
            placeholder="Nama siswa"
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />

          <input
            name="kelas"
            defaultValue={siswa.kelas}
            required
            placeholder="Kelas"
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />

          <input
            name="tempat_pkl"
            defaultValue={siswa.tempat_pkl}
            required
            placeholder="Tempat PKL"
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />

          <input
            name="pembimbing"
            defaultValue={siswa.pembimbing}
            required
            placeholder="Pembimbing"
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />

          <input
            name="kode"
            defaultValue={siswa.kode}
            required
            minLength={6}
            maxLength={12}
            placeholder="Kode siswa"
            className="w-full rounded-lg border px-3 py-2 text-sm uppercase"
          />

          {pesan && (
            <p
              className={`rounded-lg p-2 text-sm ${
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
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
          >
            {memuat ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </form>
      )}
    </div>
  );
}
