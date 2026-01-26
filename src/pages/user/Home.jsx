import React, { useEffect, useState } from "react";
import BookCard from "../../components/user/BookCard";
import { getBooksUser } from "../../api/bookApiUser";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    getBooksUser(token)
      .then((res) => {
        const bookList = Array.isArray(res.data) ? res.data : [];
        setBooks(bookList);
        setTotalBooks(bookList.length);
      })
      .catch(() => {
        setBooks([]);
        setTotalBooks(0);
      });
  }, [token]);

  return (
    <div className="w-full">
      {/* CONTAINER UTAMA */}
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* HEADER */}
        <section className="relative bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl px-10 py-12 text-white shadow-lg">
          <div className="absolute inset-0 bg-white/10 rounded-3xl pointer-events-none" />

          <div className="relative max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight">
              Perpustakaan Digital
            </h1>
            <p className="mt-3 text-indigo-100 leading-relaxed">
              Akses koleksi buku dan layanan peminjaman dalam satu sistem modern
              dan terintegrasi.
            </p>
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto w-full">
          <div className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition">
            <p className="text-sm text-gray-500">Total Buku</p>
            <p className="text-2xl font-semibold text-gray-900 mt-2">
              {totalBooks}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition">
            <p className="text-sm text-gray-500">Buku Dipinjam</p>
            <p className="text-2xl font-semibold text-gray-900 mt-2">
              0
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition">
            <p className="text-sm text-gray-500">Status Akun</p>
            <p className="text-sm font-medium text-emerald-600 mt-3">
              Aktif
            </p>
          </div>
        </section>

        {/* BOOK LIST */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Koleksi Buku
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Buku tersedia untuk dipinjam
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border p-8">
            {books.length === 0 ? (
              <div className="py-20 text-center text-gray-500">
                Data buku belum tersedia
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onBorrow={() => {}}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
