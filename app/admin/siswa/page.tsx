import Link from "next/link";

const dataSiswa = [
  {
    nama: "Andi Saputra",
    kelas: "XI RPL 1",
    tempat: "Bengkel Maju",
    kode: "PKL001",
  },
  {
    nama: "Siti Rahma",
    kelas: "XI RPL 1",
    tempat: "PT Teknologi",
    kode: "PKL002",
  },
  {
    nama: "Dimas Pratama",
    kelas: "XI RPL 2",
    tempat: "Bengkel Jaya",
    kode: "PKL003",
  },
];

export default function SiswaAdminPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin"
          className="mb-6 inline-block text-sm font-medium text-blue-700 hover:underline"
        >
          ← Kembali ke Dashboard
        </Link>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold text-blue-700">
              PANEL ADMIN
            </p>
            <h1 className="text-3xl font-bold text-gray-900">
              Manajemen Siswa
            </h1>
            <p className="mt-2 text-gray-500">
              Daftar siswa yang mengikuti praktik kerja lapangan.
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
          >
            + Tambah Siswa
          </button>
        </div>

        <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Siswa</p>
          <p className="mt-2 text-3xl font-bold text-blue-700">
            {dataSiswa.length}
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-blue-50 text-gray-700">
              <tr>
                <th className="px-5 py-4">No.</th>
                <th className="px-5 py-4">Nama Siswa</th>
                <th className="px-5 py-4">Kelas</th>
                <th className="px-5 py-4">Tempat PKL</th>
                <th className="px-5 py-4">Kode Siswa</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {dataSiswa.map((siswa, index) => (
                <tr key={siswa.kode} className="hover:bg-gray-50">
                  <td className="px-5 py-4">{index + 1}</td>
                  <td className="px-5 py-4 font-semibold text-gray-800">
                    {siswa.nama}
                  </td>
                  <td className="px-5 py-4">{siswa.kelas}</td>
                  <td className="px-5 py-4">{siswa.tempat}</td>
                  <td className="px-5 py-4 font-medium text-blue-700">
                    {siswa.kode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
