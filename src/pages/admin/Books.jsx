// C:\laragon\www\Aplikasi-Peminjaman-Buku\frontend\src\pages\admin\Books.jsx
import React, { useState, useEffect } from "react";
import BookList from "../../components/BooksList"
import ModalAddBooks from "../../components/modals/ModalAddBooks";
import ModalEditBooks from "../../components/modals/ModalEditBooks";
import ModalDeleteBooks from "../../components/modals/ModalDeleteBooks";

export default function Books() {
  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Buku yang dipilih untuk edit / delete
  const [selectedBook, setSelectedBook] = useState(null);

  // fetchBooks akan dipassing ke BookList & modal supaya reload otomatis
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Manajemen Buku</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Add Book
          </button>
        </div>

        {/* Book List */}
        <BookList
          refresh={refresh}
          onEdit={(book) => {
            setSelectedBook(book);
            setShowEditModal(true);
          }}
          onDelete={(book) => {
            setSelectedBook(book);
            setShowDeleteModal(true);
          }}
        />

        {/* Modals */}
        <ModalAddBooks
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleRefresh}
        />
        <ModalEditBooks
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          book={selectedBook}
          onSuccess={handleRefresh}
        />
        <ModalDeleteBooks
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          book={selectedBook}
          onSuccess={handleRefresh}
        />
      </div>
    </div>
  );
}
