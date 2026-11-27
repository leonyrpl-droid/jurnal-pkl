"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME } from "@/lib/siswa-session";

export async function keluarSiswa() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME);

  redirect("/masuk");
}