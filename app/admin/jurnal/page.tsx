import Link from "next/link";

const dataJurnal = [
  {
    nama: "Andi Saputra",
    tanggal: "26 November 2026",
    kegiatan:
      "Melakukan pemeriksaan kondisi mesin dan membersihkan area kerja bengkel.",
    kompetensi: "Perawatan mesin",
    durasi: 4,
    status: "Diajukan",
  },
  {
    nama: "Siti Rahma",
    tanggal: "26 November 2026",
    kegiatan:
      "Mempelajari penggunaan komputer dan membantu mengelola data perusahaan.",
    kompetensi: "Pengelolaan data",
    durasi: 5,
    status: "Disetujui",
  },
  {
    nama: "Dimas Pratama",
    tanggal: "26 November 2026",
    kegiatan: "Membantu mekanik melakukan pemeriksaan dan perawatan kendaraan.",
    kompetensi: "Perawatan kendaraan",
    durasi: 6,
    status: "Revisi",
  },
];

export default function AdminJurnalPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin"
          className="mb-6 inline-block text-sm font-medium text-blue-700 hover:underline"
        >
          ← Kembali ke Dashboard
        </Link>

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-blue-700">
            PANEL ADMIN
          </p>
          <h1 className="text-3xl font-bold text-gray-900">
            Pemeriksaan Jurnal
          </h1>
          <p className="mt-2 text-gray-500">
            Periksa dan pantau laporan kegiatan PKL siswa.
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Jurnal</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {dataJurnal.length}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Diajukan</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">
              {dataJurnal.filter((j) => j.status === "Diajukan").length}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Disetujui</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {dataJurnal.filter((j) => j.status === "Disetujui").length}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {dataJurnal.map((jurnal, index) => (
            <div
              key={index}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {jurnal.nama}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">{jurnal.tanggal}</p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    jurnal.status === "Disetujui"
                      ? "bg-green-100 text-green-700"
                      : jurnal.status === "Revisi"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {jurnal.status}
                </span>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-gray-700">Kegiatan</p>
                  <p className="mt-1 text-gray-600">{jurnal.kegiatan}</p>
                </div>

                <div className="flex flex-wrap gap-8">
                  <div>
                    <p className="font-semibold text-gray-700">Kompetensi</p>
                    <p className="mt-1 text-gray-600">{jurnal.kompetensi}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-700">Durasi</p>
                    <p className="mt-1 text-gray-600">{jurnal.durasi} jam</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3 border-t pt-4">
                <button
                  type="button"
                  disabled={jurnal.status === "Disetujui"}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Setujui
                </button>

                <button
                  type="button"
                  disabled={jurnal.status === "Disetujui"}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Minta Revisi
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
