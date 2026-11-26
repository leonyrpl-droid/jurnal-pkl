"use client";

import Link from "next/link";
import { useState } from "react";

export default function UbahJurnalPage() {
  const [tanggal, setTanggal] = useState("");
  const [kegiatan, setKegiatan] = useState("");
  const [kompetensi, setKompetensi] = useState("");
  const [durasi, setDurasi] = useState("1");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    alert(
      "Form edit sudah siap. Fitur mengambil dan memperbarui data akan kita hubungkan berikutnya.",
    );
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/jurnal"
          className="mb-6 inline-block text-sm font-medium text-blue-700 hover:underline"
        >
          ← Kembali ke Jurnal
        </Link>

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-blue-700">
            JURNAL HARIAN
          </p>

          <h1 className="text-3xl font-bold text-gray-900">Edit Jurnal PKL</h1>

          <p className="mt-2 text-gray-500">
            Perbarui informasi kegiatan praktik kerja lapangan kamu.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Tanggal Kegiatan
            </label>

            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Kegiatan yang Dilakukan
            </label>

            <textarea
              value={kegiatan}
              onChange={(e) => setKegiatan(e.target.value)}
              minLength={30}
              maxLength={500}
              required
              rows={5}
              placeholder="Jelaskan kegiatan PKL (30–500 karakter)..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />

            <p className="mt-1 text-xs text-gray-500">
              {kegiatan.length}/500 karakter.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Kompetensi yang Dipelajari
            </label>

            <input
              type="text"
              value={kompetensi}
              onChange={(e) => setKompetensi(e.target.value)}
              minLength={3}
              maxLength={60}
              required
              placeholder="Contoh: Perawatan mesin"
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Durasi Kegiatan
            </label>

            <select
              value={durasi}
              onChange={(e) => setDurasi(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((jam) => (
                <option key={jam} value={jam}>
                  {jam} jam
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 border-t pt-5">
            <Link
              href="/jurnal"
              className="rounded-lg border px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Batal
            </Link>

            <button
              type="submit"
              className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
