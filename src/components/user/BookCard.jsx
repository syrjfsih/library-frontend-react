// frontend/src/components/user/BookCard.jsx
import React from "react";

export default function BookCard({ book, onBorrow }) {
  if (!book) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col h-[420px]">
      {/* COVER */}
      <div className="h-44 bg-gray-100 overflow-hidden">
        {book.cover ? (
          <img
            src={`http://localhost:8000/storage/${book.cover}`}
            alt={book.judul}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            Tidak ada cover
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-4">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 min-h-[3rem]">
            {book.judul}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-1">
            Penulis: {book.penulis}
          </p>

          <p className="text-sm text-gray-500 line-clamp-1">
            Penerbit: {book.penerbit}
          </p>

          <p className="text-sm text-gray-500">
            Tahun: {book.tahun_terbit}
          </p>

          <p
            className={`text-sm font-medium ${
              book.stok > 0 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {book.stok > 0
              ? `Stok tersedia: ${book.stok}`
              : "Tidak tersedia"}
          </p>
        </div>

        <div className="mt-auto pt-4">
          <button
            onClick={() => onBorrow(book.id)}
            disabled={book.stok === 0}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${
              book.stok === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700"
            }`}
          >
            Pinjam Buku
          </button>
        </div>
      </div>
    </div>
  );
}
