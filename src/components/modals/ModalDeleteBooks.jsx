// src/components/modals/ModalDeleteBooks.jsx
import React, { useState } from "react";
import ModalCardBooks from "./ModalCardBooks";
import { deleteBook } from "../../api/booksApi";
import Swal from "sweetalert2";

export default function ModalDeleteBooks({ show, book, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  if (!show || !book) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteBook(book.id);

      onSuccess();
      onClose();

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: `Buku "${book.judul}" berhasil dihapus`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat menghapus buku",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalCardBooks title="Hapus Buku" onClose={onClose}>
      <p className="mb-5 text-sm text-gray-700">
        Apakah kamu yakin ingin menghapus buku:
        <br />
        <b className="text-red-600">{book.judul}</b>?
      </p>

      <div className="flex gap-3">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded transition disabled:opacity-50"
        >
          {loading ? "Menghapus..." : "Ya, Hapus"}
        </button>

        <button
          onClick={onClose}
          disabled={loading}
          className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded transition"
        >
          Batal
        </button>
      </div>
    </ModalCardBooks>
  );
}
