export type DataJurnal = {
  tanggal: string;
  kegiatan: string;
  kompetensi: string;
  durasi_jam: number;
};

export function validasiJurnal(data: DataJurnal): string | null {
  if (!data.tanggal) {
    return "Tanggal wajib diisi.";
  }

  const tanggalDipilih = new Date(`${data.tanggal}T00:00:00`);
  const hariIni = new Date();
  hariIni.setHours(0, 0, 0, 0);

  const batasTanggal = new Date(hariIni);
  batasTanggal.setDate(batasTanggal.getDate() - 7);

  if (tanggalDipilih > hariIni) {
    return "Tanggal tidak boleh melebihi hari ini.";
  }

  if (tanggalDipilih < batasTanggal) {
    return "Tanggal tidak boleh lebih dari 7 hari yang lalu.";
  }

  if (data.kegiatan.trim().length < 30 || data.kegiatan.trim().length > 500) {
    return "Kegiatan harus terdiri dari 30 sampai 500 karakter.";
  }

  if (data.kompetensi.trim().length < 3 || data.kompetensi.trim().length > 60) {
    return "Kompetensi harus terdiri dari 3 sampai 60 karakter.";
  }

  if (
    !Number.isInteger(data.durasi_jam) ||
    data.durasi_jam < 1 ||
    data.durasi_jam > 10
  ) {
    return "Durasi harus antara 1 sampai 10 jam.";
  }

  return null;
}
