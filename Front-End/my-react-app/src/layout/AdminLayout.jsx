// src/layouts/AdminLayout.jsx
import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './styles/admin.css'; // Chúng ta sẽ tạo file này sau
import { useState } from 'react';

const AdminLayout = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/login');
      } else if (user?.role !== 'admin' && user?.role !== 'staff') {
        alert("Bạn không có quyền truy cập trang này!");
        navigate('/');
      }
      if (user?.role === 'admin') {
        setIsAdmin(true);
      }else {
        setIsAdmin(false);
      }
    }
  }, [isAuthenticated, user, loading, navigate]);

  if (loading || !user) return <div className="admin-loading">Đang kiểm tra quyền...</div>;

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="admin-logo">LAPHUB MANAGER</div>
        <nav className="admin-nav">
          <Link to="/admin/products" className="nav-item">Sản phẩm</Link>
          {isAdmin && (
            <Link to="/admin/users" className="nav-item">Người dùng</Link>
          )}
          <Link to="/admin/orders" className="nav-item">Đơn hàng</Link>
          <Link to="/" className="nav-item">Về trang chủ</Link>
        </nav>
      </aside>

      <main className="admin-content">
        <header className="admin-header">
          <span>Xin chào, {user.full_name} (Admin)</span>
        </header>
        <div className="admin-body">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;