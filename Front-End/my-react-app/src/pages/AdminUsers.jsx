import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Dùng để chuyển sang trang thêm mới
import axiosClient from '../config/axiosClient';
import '../layout/styles/admin.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axiosClient.get('/users');
      setUsers(res.data || res);
    } catch (err) { console.error(err); }
  };

  // --- 1. ĐỔI QUYỀN ---
  const handleChangeRole = async (userId, newRole) => {
    if(!window.confirm(`Đổi quyền thành ${newRole}?`)) return;
    try {
      await axiosClient.put(`/users/${userId}/role`, { role: newRole });
      // Cập nhật state để giao diện đổi ngay lập tức
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
      alert("Đã đổi quyền!");
    } catch (e) { alert('Lỗi!'); }
  };

  // --- 2. ĐỔI MẬT KHẨU ---
  const handleResetPassword = async (userId) => {
    const newPass = window.prompt("Nhập mật khẩu mới cho user này:");
    if (newPass) {
        try {
            await axiosClient.put(`/users/${userId}/password`, { newPassword: newPass });
            alert("Đã đổi mật khẩu thành công!");
        } catch (error) {
            alert("Lỗi đổi mật khẩu!");
        }
    }
  };
  


  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom: '20px'}}>
          <h2>Quản Lý Người Dùng</h2>
          <button className="action-btn" onClick={() => navigate('/admin/users/new')}>Thêm Tài Khoản</button>
      </div>
      
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên / Email</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>#{user.id}</td>
              <td>
                 <div style={{fontWeight:'bold'}}>{user.full_name}</div>
                 <div style={{color:'#666', fontSize:'12px'}}>{user.email}</div>
              </td>
              <td>
                <select 
                   value={user.role} 
                   onChange={(e) => handleChangeRole(user.id, e.target.value)}
                   style={{padding: '6px', borderRadius: '4px', border: '1px solid #ddd'}}
                >
                    <option value="customer">Khách hàng</option>
                    <option value="staff">Nhân viên</option>
                    <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button className="action-btn" style={{background:'#3b82f6', color:'white'}} onClick={() => handleResetPassword(user.id)}>
                    Đổi Pass
                </button>
                <button className="action-btn" style={{background:'red', color:'white'}} onClick={() => {alert('Đã xoá')}}>
                    Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;