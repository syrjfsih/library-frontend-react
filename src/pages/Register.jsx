import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validate = () => {
    if (!form.name.trim()) {
      return "Nama lengkap wajib diisi";
    }
    if (!form.email.trim()) {
      return "Email wajib diisi";
    }
    if (form.password.length < 8) {
      return "Password minimal 8 karakter";
    }
    return "";
  };

  const submit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await api.post("/register", form);

      setSuccess("Registrasi berhasil, mengarahkan ke halaman login...");

      // redirect ke login setelah 1.5 detik
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      // jika backend kirim pesan error
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Registrasi gagal, email mungkin sudah terdaftar");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200">
      
      {/* Card */}
      <div className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-slate-800">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 text-3xl shadow-md">
              📝
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-indigo-700">
            Registrasi Akun
          </h2>
          <p className="text-slate-600 mt-2 text-sm">
            Buat akun baru untuk mulai meminjam buku
          </p>
        </div>

        {/* Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-sm">
            {success}
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Nama lengkap"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Minimal 8 karakter"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-slate-500 mt-1">
              Password minimal 8 karakter
            </p>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full mt-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300 shadow-lg disabled:opacity-50"
        >
          {loading ? "Mendaftarkan..." : "Register"}
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
