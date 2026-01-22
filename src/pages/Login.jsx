import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);

      // redirect contoh
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Email atau password salah");
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
              🔐
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-indigo-700">
            Login Akun
          </h2>
          <p className="text-slate-600 mt-2 text-sm">
            Masuk untuk mengelola peminjaman buku
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full mt-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300 shadow-lg disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Login"}
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Belum punya akun?{" "}
          <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
