// src/components/BooksList.jsx
import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiBookOpen } from "react-icons/fi";
import { getBooks } from "../api/booksApi"; // sesuaikan path

export default function BooksList({ refresh, onEdit, onDelete }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, [refresh]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Gagal mengambil data buku:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading books...</p>;
  }

  if (books.length === 0) {
    return (
      <div className="text-center text-gray-500 py-16">
        📚 Belum ada data buku
      </div>
    );
  }

  return (
    <div className="bg-slate-50 p-4 rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition"
          >
            {/* Cover */}
            <div className="relative h-72">
              <img
                src={
                  book.cover
                    ? `http://localhost:8000/storage/${book.cover}`
                    : "https://via.placeholder.com/400x600?text=No+Image"
                }
                alt={book.judul}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />

              {/* Actions */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => onEdit(book)}
                  className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm"
                >
                  <FiEdit /> Edit
                </button>
                <button
                  onClick={() => onDelete(book)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm"
                >
                  <FiTrash2 /> Hapus
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
                {book.judul}
              </h3>
              <p className="text-sm text-gray-500">{book.penulis}</p>

              <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                <span>{book.tahun_terbit}</span>
                <span className="flex items-center gap-1">
                  <FiBookOpen /> Stok: {book.stok}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
