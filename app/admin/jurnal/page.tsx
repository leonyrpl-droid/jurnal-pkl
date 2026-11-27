import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import TombolAksiJurnal from "./TombolAksiJurnal";

export default async function AdminJurnalPage() {
  const supabase = await createClient();

  const { data: dataJurnal, error } = await supabase
    .from("jurnal")
    .select(
      `
      id,
      tanggal,
      kegiatan,
      kompetensi,
      durasi_jam,
      status,
      siswa (
        nama,
        kelas
      )
    `,
    )
    .order("tanggal", { ascending: false });

  if (error) {
    throw new Error("Gagal mengambil data jurnal: " + error.message);
  }

  const jurnal = dataJurnal ?? [];

  const totalJurnal = jurnal.length;
  const diajukan = jurnal.filter((j) => j.status === "diajukan").length;
  const disetujui = jurnal.filter((j) => j.status === "disetujui").length;

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

        {/* Ringkasan jurnal */}
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Jurnal</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {totalJurnal}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Diajukan</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">{diajukan}</p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Disetujui</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {disetujui}
            </p>
          </div>
        </div>

        {/* Daftar jurnal */}
        <div className="space-y-5">
          {jurnal.length === 0 ? (
            <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
              Belum ada jurnal yang dikirim siswa.
            </div>
          ) : (
            jurnal.map((item) => {
              const siswa = Array.isArray(item.siswa)
                ? item.siswa[0]
                : item.siswa;

              const status =
                item.status.charAt(0).toUpperCase() + item.status.slice(1);

              return (
                <div
                  key={item.id}
                  className="rounded-xl border bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {siswa?.nama ?? "Siswa tidak ditemukan"}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {new Date(
                          item.tanggal + "T00:00:00",
                        ).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "disetujui"
                          ? "bg-green-100 text-green-700"
                          : item.status === "revisi"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-gray-700">Kegiatan</p>
                      <p className="mt-1 text-gray-600">{item.kegiatan}</p>
                    </div>

                    <div className="flex flex-wrap gap-8">
                      <div>
                        <p className="font-semibold text-gray-700">
                          Kompetensi
                        </p>
                        <p className="mt-1 text-gray-600">{item.kompetensi}</p>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-700">Durasi</p>
                        <p className="mt-1 text-gray-600">
                          {item.durasi_jam} jam
                        </p>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-700">Kelas</p>
                        <p className="mt-1 text-gray-600">
                          {siswa?.kelas ?? "-"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tombol aksi Admin */}
                  <div className="mt-5 border-t pt-4">
                    <p className="mb-4 text-sm text-gray-500">
                      ID Jurnal: {item.id}
                    </p>

                    <TombolAksiJurnal id={item.id} status={item.status} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
