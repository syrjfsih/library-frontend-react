import axios from "axios";

// Ambil semua buku untuk user
export const getBooksUser = async (token) => {
  const response = await axios.get("http://localhost:8000/api/books", {
    headers: { Authorization: `Bearer ${token}` },
  });
  // Sesuaikan dengan format backend { success, data }
  return response.data;
};

// Pinjam buku (sementara bisa di-comment kalau belum buat backend)
export const borrowBook = async (id, token) => {
  const response = await axios.post(
    `http://localhost:8000/api/books/${id}/borrow`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
