import { Link, useLocation } from "react-router-dom";
import { FiHome, FiBook, FiRepeat, FiUsers } from "react-icons/fi";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: FiHome },
    { name: "Data Buku", path: "/books", icon: FiBook },
    { name: "Peminjaman", path: "/loans", icon: FiRepeat },
    { name: "Pengguna", path: "/users", icon: FiUsers },
  ];

  return (
    <aside className="w-64 bg-white shadow-xl flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold text-sm">
            AD
          </div>

          <div className="leading-tight">
            <h1 className="text-sm font-semibold">
              <span className="text-slate-900">Sistem</span>{" "}
              <span className="text-indigo-600">Perpustakaan</span>
            </h1>
            <p className="text-xs text-slate-500">Admin Dashboard</p>
            <p className="text-xs text-indigo-600 font-medium">
              Syirajfasih Al Budiman
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="px-4 py-4 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${active
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <Icon className="text-lg" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
