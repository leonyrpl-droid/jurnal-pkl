import "server-only";

import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "siswa_session";
const MASA_BERLAKU = 60 * 60 * 8;

function buatTandaTangan(payload: string) {
  const secret = process.env.SISWA_SESSION_SECRET;

  if (!secret) {
    throw new Error("SISWA_SESSION_SECRET belum diatur.");
  }

  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function buatTokenSiswa(siswaId: number) {
  const data = {
    siswaId,
    exp: Math.floor(Date.now() / 1000) + MASA_BERLAKU,
  };

  const payload = Buffer.from(JSON.stringify(data)).toString("base64url");
  const signature = buatTandaTangan(payload);

  return `${payload}.${signature}`;
}

export function periksaTokenSiswa(token: string) {
  try {
    const [payload, signature] = token.split(".");

    if (!payload || !signature) return null;

    const tandaTanganBenar = buatTandaTangan(payload);

    const signatureBuffer = Buffer.from(signature, "hex");
    const benarBuffer = Buffer.from(tandaTanganBenar, "hex");

    if (
      signatureBuffer.length !== benarBuffer.length ||
      !timingSafeEqual(signatureBuffer, benarBuffer)
    ) {
      return null;
    }

    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));

    if (
      !Number.isInteger(data.siswaId) ||
      data.siswaId <= 0 ||
      data.exp < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return data.siswaId as number;
  } catch {
    return null;
  }
}

export { COOKIE_NAME, MASA_BERLAKU };
