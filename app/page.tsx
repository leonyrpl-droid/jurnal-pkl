import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 font-semibold text-blue-200">
            APLIKASI JURNAL PKL
          </p>

          <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Catat Kegiatan Praktik Kerja Lapangan dengan Mudah
          </h1>

          <p className="mb-8 max-w-2xl text-lg text-blue-100">
            Dokumentasikan kegiatan harian, pantau perkembangan kompetensi, dan
            kelola jurnal PKL secara praktis dalam satu aplikasi.
          </p>

          <Link
            href="/masuk"
            className="inline-block rounded-lg bg-white px-7 py-3 font-semibold text-blue-700 shadow hover:bg-blue-50"
          >
            Mulai Isi Jurnal →
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-bold text-gray-800">
            Catat Kegiatan
          </h2>
          <p className="text-gray-600">
            Tulis kegiatan PKL setiap hari dengan mudah dan teratur.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-bold text-gray-800">
            Pantau Jurnal
          </h2>
          <p className="text-gray-600">
            Lihat riwayat dan status persetujuan jurnal PKL.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-bold text-gray-800">
            Penilaian Pembimbing
          </h2>
          <p className="text-gray-600">
            Pembimbing dapat memeriksa dan memberikan catatan pada jurnal.
          </p>
        </div>
      </section>
    </div>
  );
}
