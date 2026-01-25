// src/api/booksApi.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/admin/books";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

// Token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// GET all
export const getBooks = async () => {
  const res = await api.get("/");
  return res.data.data;
};

// GET by id
export const getBookById = async (id) => {
  const res = await api.get(`/${id}`);
  return res.data.data;
};

// CREATE
export const createBook = async (formData) => {
  const res = await api.post("/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// UPDATE
export const updateBook = async (id, formData) => {
  const res = await api.post(`/${id}?_method=PUT`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// DELETE
export const deleteBook = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};
