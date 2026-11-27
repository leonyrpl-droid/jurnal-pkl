import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const { data: profil, error: errorProfil } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (errorProfil || profil?.role !== "admin") {
    redirect("/login");
  }

  return <>{children}</>;
}
