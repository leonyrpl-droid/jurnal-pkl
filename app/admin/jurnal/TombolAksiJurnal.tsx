"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ubahStatusJurnal } from "./actions";

type Props = {
  id: number;
  status: string;
};

export default function TombolAksiJurnal({ id, status }: Props) {
  const router = useRouter();
  const [loading, startTransition] = useTransition();
  const [pesan, setPesan] = useState("");

  function prosesStatus(statusBaru: "disetujui" | "revisi") {
    setPesan("");

    startTransition(async () => {
      const hasil = await ubahStatusJurnal(id, statusBaru);

      setPesan(hasil.pesan);

      if (hasil.berhasil) {
        router.refresh();
      }
    });
  }

  if (status === "disetujui") {
    return (
      <p className="text-sm font-medium text-green-700">
        Jurnal sudah disetujui.
      </p>
    );
  }

  return (
    <div className="mt-5 border-t pt-4">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={loading}
          onClick={() => prosesStatus("disetujui")}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Setujui"}
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => prosesStatus("revisi")}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Minta Revisi"}
        </button>
      </div>

      {pesan && <p className="mt-3 text-sm text-gray-600">{pesan}</p>}
    </div>
  );
}
