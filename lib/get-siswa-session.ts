import "server-only";

import { cookies } from "next/headers";
import { COOKIE_NAME, periksaTokenSiswa } from "@/lib/siswa-session";

export async function getSiswaSession(): Promise<number | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return periksaTokenSiswa(token);
}
