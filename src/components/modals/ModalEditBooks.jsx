// src/components/modals/ModalEditBooks.jsx
import React, { useEffect, useState } from "react";
import ModalCardBooks from "./ModalCardBooks";
import { updateBook } from "../../api/booksApi";

export default function ModalEditBooks({ show, book, onClose, onSuccess }) {
  const [form, setForm] = useState({
    judul: "",
    penulis: "",
    penerbit: "",
    tahun_terbit: "",
    stok: "",
  });

  const [cover, setCover] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState(null);

  // isi form saat modal dibuka
  useEffect(() => {
    if (book) {
      setForm({
        judul: book.judul,
        penulis: book.penulis,
        penerbit: book.penerbit,
        tahun_terbit: book.tahun_terbit,
        stok: book.stok,
      });

      // cover dari backend (jika ada)
      if (book.cover) {
        setPreview(book.cover);
      }
    }
  }, [book]);

  if (!show || !book) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCover(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );

      if (cover) formData.append("cover", cover);

      await updateBook(book.id, formData);

      onSuccess();

      setNotif("✅ Buku berhasil diperbarui");

      setTimeout(() => {
        setNotif(null);
        onClose();
      }, 1500);
    } catch (error) {
      console.error(error);
      setNotif("❌ Gagal memperbarui buku");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalCardBooks title="Edit Buku" onClose={onClose}>
      <div className="space-y-4">
        {/* NOTIF */}
        {notif && (
          <div className="p-3 rounded-lg text-sm bg-green-100 text-green-700">
            {notif}
          </div>
        )}

        <input
          type="text"
          name="judul"
          value={form.judul}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Judul Buku"
        />

        <input
          type="text"
          name="penulis"
          value={form.penulis}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Penulis"
        />

        <input
          type="text"
          name="penerbit"
          value={form.penerbit}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Penerbit"
        />

        <input
          type="number"
          name="tahun_terbit"
          value={form.tahun_terbit}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Tahun Terbit"
        />

        <input
          type="number"
          name="stok"
          value={form.stok}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Stok"
        />

        {/* COVER */}
        <div>
          <label className="text-sm text-gray-600">Cover Buku</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="w-full"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 h-40 w-full object-cover rounded-lg border"
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded transition disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Update Buku"}
        </button>
      </div>
    </ModalCardBooks>
  );
}
