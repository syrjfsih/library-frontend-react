import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/admin/Dashboard";
import Books from "./pages/admin/Books";
import Home from "./pages/user/Home";

import ProtectedRoute from "./routers/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";   // layout ADMIN
import UserLayout from "./layouts/UserLayout";   // layout USER

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes */}
        <Route
          element={
            <ProtectedRoute role="admin">
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
        </Route>

        {/* User routes */}
        <Route
          element={
            <ProtectedRoute role="user">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
