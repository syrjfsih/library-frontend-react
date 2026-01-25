// src/components/modals/ModalAddBooks.jsx
import React, { useState } from "react";
import ModalCardBooks from "./ModalCardBooks";
import { createBook } from "../../api/booksApi";

export default function ModalAddBooks({ show, onClose, onSuccess }) {
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

  if (!show) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCover(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm({
      judul: "",
      penulis: "",
      penerbit: "",
      tahun_terbit: "",
      stok: "",
    });
    setCover(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );

      if (cover) formData.append("cover", cover);

      await createBook(formData);

      // refresh list
      onSuccess();

      // tampilkan notifikasi
      setNotif("✅ Buku berhasil ditambahkan");

      // reset form
      resetForm();

      // auto close modal
      setTimeout(() => {
        setNotif(null);
        onClose();
      }, 1500);
    } catch (error) {
      console.error(error);
      setNotif("❌ Gagal menambahkan buku");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalCardBooks title="Tambah Buku" onClose={onClose}>
      <div className="space-y-4">
        {/* NOTIFIKASI */}
        {notif && (
          <div className="text-sm p-3 rounded-lg bg-green-100 text-green-700">
            {notif}
          </div>
        )}

        <input
          type="text"
          name="judul"
          placeholder="Judul Buku"
          value={form.judul}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="penulis"
          placeholder="Penulis"
          value={form.penulis}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="penerbit"
          placeholder="Penerbit"
          value={form.penerbit}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="tahun_terbit"
          placeholder="Tahun Terbit"
          value={form.tahun_terbit}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="stok"
          placeholder="Stok"
          value={form.stok}
          onChange={handleChange}
          className="w-full border p-2 rounded"
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
            <div className="mt-3">
              <img
                src={preview}
                alt="Preview"
                className="h-40 w-full object-cover rounded-lg border"
              />
              <p className="text-xs text-gray-500 mt-1">
                Preview cover buku
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan Buku"}
        </button>
      </div>
    </ModalCardBooks>
  );
}
