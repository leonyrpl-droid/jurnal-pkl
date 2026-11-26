
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/lib/components/Navbar";

export const metadata: Metadata = {
  title: "Jurnal PKL",
  description: "Aplikasi Jurnal Harian Praktik Kerja Lapangan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
