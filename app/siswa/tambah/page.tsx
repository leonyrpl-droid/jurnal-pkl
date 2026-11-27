"use client";

import { useState } from "react";
import Link from "next/link";
import { tambahJurnal } from "./actions";

export default function TambahJurnalPage() {
  const [pesan, setPesan] = useState("");
  const [berhasil, setBerhasil] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setPesan("");
    setBerhasil(false);

    const formData = new FormData(e.currentTarget);

    try {
      const hasil = await tambahJurnal(formData);

      setPesan(hasil.pesan);
      setBerhasil(hasil.berhasil);

      if (hasil.berhasil) {
        e.currentTarget.reset();
      }
    } catch {
      setPesan("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-10">
      <Link
        href="/siswa"
        className="mb-6 inline-block text-sm font-medium text-blue-700 hover:underline"
      >
        ← Kembali ke Dashboard
      </Link>

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Tambah Jurnal PKL</h1>

        <p className="mt-2 text-sm text-gray-500">
          Catat kegiatan praktik kerja lapangan yang kamu lakukan hari ini.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Tanggal Kegiatan
            </label>
            <input
              type="date"
              name="tanggal"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Kegiatan PKL
            </label>
            <textarea
              name="kegiatan"
              required
              minLength={30}
              maxLength={500}
              rows={5}
              placeholder="Jelaskan kegiatan yang kamu lakukan (30–500 karakter)..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
            />
            <p className="mt-1 text-xs text-gray-500">
              Minimal 30 dan maksimal 500 karakter.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Kompetensi yang Dipelajari
            </label>
            <input
              type="text"
              name="kompetensi"
              required
              minLength={3}
              maxLength={60}
              placeholder="Contoh: Perawatan mesin kendaraan"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Durasi Kegiatan
            </label>
            <select
              name="durasi_jam"
              required
              defaultValue=""
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
            >
              <option value="" disabled>
                Pilih durasi
              </option>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((jam) => (
                <option key={jam} value={jam}>
                  {jam} jam
                </option>
              ))}
            </select>
          </div>

          {pesan && (
            <div
              className={`rounded-lg p-4 text-sm ${
                berhasil
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {pesan}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
            >
              {loading ? "Menyimpan..." : "Simpan Jurnal"}
            </button>

            <Link
              href="/siswa"
              className="rounded-lg border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
