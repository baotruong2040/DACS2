// src/layouts/AdminLayout.jsx
import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './styles/admin.css'; // Chúng ta sẽ tạo file này sau

const AdminLayout = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Bảo vệ trang Admin: Nếu chưa login hoặc không phải admin -> Đá ra ngoài
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/login');
      } else if (user?.role !== 'admin') {
        alert("Bạn không có quyền truy cập trang này!");
        navigate('/');
      }
    }
  }, [isAuthenticated, user, loading, navigate]);

  if (loading || !user) return <div className="admin-loading">Đang kiểm tra quyền...</div>;

  return (
    <div className="admin-container">
      {/* SIDEBAR BÊN TRÁI */}
      <aside className="admin-sidebar">
        <div className="admin-logo">ADMIN PANEL</div>
        <nav className="admin-nav">
          <Link to="/admin/products" className="nav-item">Sản phẩm</Link>
          <Link to="/admin/users" className="nav-item">Người dùng</Link>
          <Link to="/admin/orders" className="nav-item">Đơn hàng</Link>
          <Link to="/" className="nav-item">Về trang chủ</Link>
        </nav>
      </aside>

      {/* NỘI DUNG CHÍNH BÊN PHẢI */}
      <main className="admin-content">
        <header className="admin-header">
          <span>Xin chào, {user.full_name} (Admin)</span>
        </header>
        <div className="admin-body">
          <Outlet /> {/* Nơi các trang con (Products, Users) hiện ra */}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;