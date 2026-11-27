"use client";

import { useState } from "react";
import { masukSiswa } from "./actions";

export default function MasukPage() {
  const [kode, setKode] = useState("");
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setPesan("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.set("kode", kode);

      const hasil = await masukSiswa(formData);

      if (!hasil.berhasil) {
        setPesan(hasil.pesan);
      }
    } catch {
      setPesan("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Masuk Siswa</h1>

        <p className="mb-8 text-sm text-gray-500">
          Masukkan kode siswa untuk membuka jurnal PKL kamu.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Kode Siswa
            </label>

            <input
              type="text"
              name="kode"
              value={kode}
              onChange={(e) => setKode(e.target.value)}
              placeholder="Contoh: PKL001"
              required
              minLength={6}
              maxLength={12}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {pesan && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {pesan}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Memeriksa Kode..." : "Masuk Sekarang"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          Gunakan kode siswa yang diberikan oleh admin.
        </p>
      </div>
    </main>
  );
}
