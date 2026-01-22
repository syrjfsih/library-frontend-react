import { Link, useLocation } from "react-router-dom";
import {
    FiHome,
    FiBook,
    FiRepeat,
    FiUsers,
    FiLogOut,
} from "react-icons/fi";

export default function Dashboard() {
    const location = useLocation();

    const menu = [
        { name: "Dashboard", path: "/dashboard", icon: FiHome },
        { name: "Data Buku", path: "/books", icon: FiBook },
        { name: "Peminjaman", path: "/loans", icon: FiRepeat },
        { name: "Pengguna", path: "/users", icon: FiUsers },
    ];

    return (
        <div className="min-h-screen flex bg-slate-50">

            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-xl flex flex-col">
                {/* Header / Profile */}
                <div className="px-6 py-5 border-b bg-slate-50">
                    <div className="flex items-center gap-3">

                        {/* Admin Avatar */}
                        <div className="w-11 h-11 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold text-sm shadow-sm">
                            AD
                        </div>

                        {/* Title & User */}
                        <div className="leading-tight">
                            <h1 className="text-sm font-semibold">
                                <span className="text-slate-900">Sistem</span>{" "}
                                <span className="text-indigo-600">Perpustakaan</span>
                            </h1>

                            <p className="text-xs text-slate-500">
                                Admin Dashboard
                            </p>

                            <p className="text-xs text-indigo-600 font-medium mt-0.5">
                                {/* Ganti dengan nama user dari API */}
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
                                        ? "bg-indigo-600 text-white shadow-sm"
                                        : "text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                <Icon
                                    className={`text-lg ${active ? "text-white" : "text-slate-500"
                                        }`}
                                />
                                <span className="text-sm font-medium">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main */}
            <main className="flex-1 flex flex-col">

                {/* Topbar */}
                <header className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-5 flex justify-between items-center shadow-lg">
                    <div>
                        <h2 className="text-white text-lg font-semibold">
                            Dashboard
                        </h2>
                        <p className="text-indigo-100 text-sm">
                            Sistem Perpustakaan
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-red-600/80 text-white text-sm font-medium transition"
                    >
                        <FiLogOut />
                        Logout
                    </button>
                </header>

                {/* Content */}
                <section className="p-8 space-y-8">

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: "Total Buku", value: 120 },
                            { label: "Buku Dipinjam", value: 35 },
                            { label: "Pengguna", value: 18 },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="bg-white rounded-2xl shadow-sm p-6 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 h-full w-1 bg-indigo-600" />
                                <p className="text-sm text-slate-500 mb-2">
                                    {item.label}
                                </p>
                                <h3 className="text-3xl font-bold text-slate-800">
                                    {item.value}
                                </h3>
                            </div>
                        ))}
                    </div>

                    {/* Welcome */}
                    <div className="bg-white rounded-2xl shadow-sm p-8">
                        <h3 className="text-xl font-semibold text-slate-800 mb-3">
                            Selamat Datang di Sistem Perpustakaan
                        </h3>
                        <p className="text-slate-600 leading-relaxed max-w-2xl">
                            Dashboard ini digunakan untuk mengelola data buku,
                            peminjaman, serta pengguna secara terpusat dengan
                            tampilan modern, aman, dan mudah digunakan.
                        </p>
                    </div>

                </section>
            </main>
        </div>
    );
}
