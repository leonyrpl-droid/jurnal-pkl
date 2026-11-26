import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-blue-700">
          Jurnal PKL
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-blue-700">
            Beranda
          </Link>

          <Link href="/masuk" className="hover:text-blue-700">
            Masuk Murid
          </Link>

          <Link href="/login" className="hover:text-blue-700">
            Login Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
