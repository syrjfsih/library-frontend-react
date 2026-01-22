import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200">
      
      {/* Card */}
      <div className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center text-slate-800">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-indigo-100 text-4xl shadow-md">
            📚
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold mb-3 tracking-tight text-indigo-700">
          Aplikasi Peminjaman Buku
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 mb-8 leading-relaxed">
          Kelola data buku, peminjaman, dan pengembalian
          dengan cepat, rapi, dan efisien.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 font-semibold shadow-lg hover:scale-105"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 rounded-xl border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-all duration-300 font-semibold shadow-md hover:scale-105"
          >
            Register
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-8 text-sm text-slate-500">
          © {new Date().getFullYear()} Sistem Informasi Perpustakaan <br />
          <span className="font-medium">by syrjfsih_</span>
        </p>
      </div>
    </div>
  );
}
