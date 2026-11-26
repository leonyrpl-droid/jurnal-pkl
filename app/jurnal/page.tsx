import Link from "next/link";

export default function JurnalPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold text-blue-700">
              AREA SISWA
            </p>

            <h1 className="text-3xl font-bold text-gray-900">
              Jurnal Harian PKL
            </h1>

            <p className="mt-2 text-gray-500">
              Kelola dan pantau catatan kegiatan praktik kerja lapangan.
            </p>
          </div>

          <Link
            href="/jurnal/baru"
            className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm hover:bg-blue-800"
          >
            + Tambah Jurnal
          </Link>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Jurnal</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Disetujui</p>
            <p className="mt-2 text-3xl font-bold text-green-600">0</p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Menunggu Pemeriksaan</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">0</p>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
          <div className="mb-4 text-5xl">📔</div>

          <h2 className="text-xl font-bold text-gray-800">Belum Ada Jurnal</h2>

          <p className="mx-auto mt-2 max-w-md text-gray-500">
            Catatan kegiatan PKL kamu akan muncul di halaman ini setelah
            berhasil dibuat.
          </p>

          <Link
            href="/jurnal/baru"
            className="mt-6 inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Buat Jurnal Pertama
          </Link>
        </div>
      </div>
    </main>
  );
}
