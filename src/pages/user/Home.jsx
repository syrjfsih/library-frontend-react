import React, { useEffect, useState } from "react";
import BookCard from "../../components/user/BookCard";
import { getBooksUser } from "../../api/bookApiUser";
import { FiBookOpen, FiBookmark, FiCheckCircle, FiSearch } from "react-icons/fi";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    getBooksUser(token)
      .then((res) => {
        setBooks(Array.isArray(res.data) ? res.data : []);
        setError(null);
      })
      .catch(() => {
        setError("Gagal memuat data buku. Silakan coba lagi.");
      })
      .finally(() => setLoading(false));
  }, [token]);

  const filteredBooks = books.filter((book) =>
    book.judul?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-7xl mx-auto px-6 space-y-14 pt-10">

        {/* HEADER */}
        <section className="relative bg-gradient-to-br from-indigo-700 to-blue-600 rounded-3xl px-12 py-14 text-white shadow-xl overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight">
              Perpustakaan Digital
            </h1>
            <p className="mt-4 text-indigo-100 text-lg">
              Sistem modern untuk pencarian dan peminjaman buku secara terintegrasi.
            </p>
          </div>
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<FiBookOpen />}
            label="Total Koleksi"
            value={books.length}
            color="indigo"
          />
          <StatCard
            icon={<FiBookmark />}
            label="Buku Dipinjam"
            value="0"
            color="blue"
          />
          <StatCard
            icon={<FiCheckCircle />}
            label="Status Akun"
            value="Aktif"
            color="emerald"
          />
        </section>

        {/* TITLE & SEARCH */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Koleksi Buku
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Buku yang tersedia untuk dipinjam
            </p>
          </div>

          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari judul buku..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition"
            />
          </div>
        </section>

        {/* CONTENT */}
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 text-center py-16 rounded-2xl">
            {error}
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="bg-white border border-dashed rounded-3xl py-20 text-center text-gray-400">
            Buku tidak ditemukan
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onBorrow={() => alert("Fitur pinjam segera hadir")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== STAT CARD ===== */
function StatCard({ icon, label, value, color }) {
  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-600",
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition flex items-center gap-5">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
