export default function Dashboard() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Buku</p>
          <h2 className="text-2xl font-bold">120</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Buku Dipinjam</p>
          <h2 className="text-2xl font-bold">35</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Pengguna</p>
          <h2 className="text-2xl font-bold">18</h2>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">
          Selamat Datang di Sistem Perpustakaan
        </h2>
        <p className="text-gray-600">
          Dashboard ini digunakan untuk mengelola data buku, peminjaman,
          serta pengguna secara terpusat.
        </p>
      </div>
    </div>
  );
}
