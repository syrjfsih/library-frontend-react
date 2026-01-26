// frontend/src/components/user/Navbar.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-blue-700 text-white shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/home"
          className="text-xl font-extrabold tracking-wide"
        >
          Perpustakaan
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6">
          <Link
            to="/home"
            className={`text-base font-semibold transition ${
              location.pathname === "/home"
                ? "text-white border-b-2 border-white pb-1"
                : "text-indigo-100 hover:text-white"
            }`}
          >
            Beranda
          </Link>

          <button
            onClick={handleLogout}
            className="bg-white text-indigo-700 text-base font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-50 transition shadow"
          >
            Keluar
          </button>
        </div>
      </div>
    </nav>
  );
}
