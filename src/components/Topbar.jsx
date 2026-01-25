import { FiLogOut } from "react-icons/fi";
import { useLocation } from "react-router-dom";

export default function Topbar() {
  const location = useLocation();

  const titleMap = {
    "/dashboard": "Dashboard",
    "/books": "Data Buku",
    "/loans": "Peminjaman",
    "/users": "Pengguna",
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-5 flex justify-between items-center shadow-lg">
      <div>
        <h2 className="text-white text-lg font-semibold">
          {titleMap[location.pathname] || "Dashboard"}
        </h2>
        <p className="text-indigo-100 text-sm">Sistem Perpustakaan</p>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-red-600/80 text-white text-sm font-medium"
      >
        <FiLogOut />
        Logout
      </button>
    </header>
  );
}
