import Navbar from "../components/user/Navbar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-50 shadow-sm bg-white">
        <Navbar />
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="w-full py-4 text-center text-sm text-gray-500 border-t">
        &copy; {new Date().getFullYear()} Aplikasi Peminjaman Buku
      </footer>
    </div>
  );
}
