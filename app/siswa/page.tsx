import Link from "next/link";
import { redirect } from "next/navigation";
import { getSiswaSession } from "@/lib/get-siswa-session";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { keluarSiswa } from "./logout";

export const instant = false;

export default async function SiswaPage() {
  const siswaId = await getSiswaSession();

  if (!siswaId) {
    redirect("/masuk");
  }

  const { data: siswa, error: errorSiswa } = await supabaseAdmin
    .from("siswa")
    .select("nama, kelas, tempat_pkl, pembimbing")
    .eq("id", siswaId)
    .maybeSingle();

  if (errorSiswa || !siswa) {
    redirect("/masuk");
  }

  const { data: jurnal, error: errorJurnal } = await supabaseAdmin
    .from("jurnal")
    .select("id, tanggal, kegiatan, kompetensi, durasi_jam, status")
    .eq("siswa_id", siswaId)
    .order("tanggal", { ascending: false });

  if (errorJurnal) {
    throw new Error("Gagal mengambil data jurnal.");
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header Dashboard */}
        <div className="mb-8 rounded-2xl bg-blue-700 p-8 text-white shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-blue-100">
                DASHBOARD SISWA
              </p>

              <h1 className="mt-2 text-3xl font-bold">
                Selamat Datang, {siswa.nama}!
              </h1>

              <p className="mt-2 text-blue-100">
                Pantau kegiatan Praktik Kerja Lapangan kamu di sini.
              </p>
            </div>

            <form action={keluarSiswa}>
              <button
                type="submit"
                className="rounded-lg bg-white px-5 py-2 font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Keluar
              </button>
            </form>
          </div>
        </div>

        {/* Informasi Siswa */}
        <section className="mb-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Nama Siswa</p>
            <p className="mt-2 text-lg font-bold text-gray-900">{siswa.nama}</p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Kelas</p>
            <p className="mt-2 text-lg font-bold text-gray-900">
              {siswa.kelas}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Tempat PKL</p>
            <p className="mt-2 text-lg font-bold text-gray-900">
              {siswa.tempat_pkl}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Pembimbing</p>
            <p className="mt-2 text-lg font-bold text-gray-900">
              {siswa.pembimbing}
            </p>
          </div>
        </section>

        {/* Riwayat Jurnal */}
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Riwayat Jurnal PKL
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Daftar kegiatan PKL yang sudah kamu catat.
              </p>
            </div>

            <span className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {jurnal.length} Jurnal
            </span>
          </div>

          {/* Tombol Tambah Jurnal */}
          <div className="mb-6">
            <Link
              href="/siswa/tambah"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              <span className="text-xl">+</span>
              Tambah Jurnal
            </Link>
          </div>

          {jurnal.length === 0 ? (
            <p className="rounded-lg bg-gray-50 p-6 text-center text-gray-500">
              Belum ada jurnal PKL yang dibuat.
            </p>
          ) : (
            <div className="space-y-4">
              {jurnal.map((item) => (
                <article key={item.id} className="rounded-lg border p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold text-gray-900">
                      {item.tanggal}
                    </p>

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-3 text-gray-700">{item.kegiatan}</p>

                  <p className="mt-2 text-sm text-gray-500">
                    Kompetensi: {item.kompetensi}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Durasi: {item.durasi_jam} jam
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
