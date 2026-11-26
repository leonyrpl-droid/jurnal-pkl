import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-blue-700">
            PANEL ADMINISTRATOR
          </p>

          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>

          <p className="mt-2 text-gray-500">
            Kelola data siswa dan pantau jurnal kegiatan PKL.
          </p>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Siswa</p>
            <p className="mt-3 text-3xl font-bold text-blue-700">0</p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Jurnal</p>
            <p className="mt-3 text-3xl font-bold text-gray-900">0</p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Menunggu Pemeriksaan</p>
            <p className="mt-3 text-3xl font-bold text-amber-600">0</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-bold text-gray-800">Data Siswa</h2>

            <p className="mb-5 text-sm text-gray-500">
              Lihat dan kelola informasi siswa yang mengikuti kegiatan PKL.
            </p>

            <Link
              href="/admin/siswa"
              className="inline-block rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Kelola Siswa →
            </Link>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-bold text-gray-800">
              Pemeriksaan Jurnal
            </h2>

            <p className="mb-5 text-sm text-gray-500">
              Periksa catatan kegiatan siswa dan berikan persetujuan atau
              revisi.
            </p>

            <Link
              href="/admin/jurnal"
              className="inline-block rounded-lg bg-indigo-700 px-5 py-3 font-semibold text-white hover:bg-indigo-800"
            >
              Periksa Jurnal →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
