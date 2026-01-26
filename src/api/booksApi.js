import axios from "axios";

// Base URL API admin
const API_URL = "http://localhost:8000/api/admin/books";

// Buat instance Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

// Interceptor untuk attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===== GET ALL BOOKS =====
export const getBooks = async () => {
  try {
    const res = await api.get("/");
    return res.data.data; // sesuai response backend
  } catch (error) {
    handleError(error);
  }
};

// ===== GET BOOK BY ID =====
export const getBookById = async (id) => {
  try {
    const res = await api.get(`/${id}`);
    return res.data.data;
  } catch (error) {
    handleError(error);
  }
};

// ===== CREATE BOOK =====
export const createBook = async (formData) => {
  try {
    const res = await api.post("/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  } catch (error) {
    handleError(error);
  }
};

// ===== UPDATE BOOK =====
export const updateBook = async (id, formData) => {
  try {
    const res = await api.post(`/${id}?_method=PUT`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  } catch (error) {
    handleError(error);
  }
};

// ===== DELETE BOOK =====
export const deleteBook = async (id) => {
  try {
    const res = await api.delete(`/${id}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// ===== ERROR HANDLER =====
const handleError = (error) => {
  if (error.response) {
    // Error dari server
    const status = error.response.status;
    if (status === 401) {
      alert("Anda belum login atau token expired.");
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else if (status === 403) {
      alert("Akses ditolak. Anda bukan admin.");
      window.location.href = "/";
    } else {
      alert(error.response.data.message || "Terjadi kesalahan pada server.");
    }
  } else {
    // Error network
    alert("Tidak bisa terhubung ke server.");
  }
  throw error; // supaya bisa catch di component jika perlu
};
