import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../config/axiosClient';
import '../layout/styles/admin.css';

const AdminUserForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'customer' // Mặc định là khách
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post('/users', formData);
      alert('Tạo tài khoản thành công!');
      navigate('/admin/users'); // Quay về danh sách
    } catch (error) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <div className="admin-form-container" style={{maxWidth: '500px', margin: '0 auto'}}>
      <h2>Thêm Người Dùng Mới</h2>
      <form onSubmit={handleSubmit} className="admin-form" style={{display: 'block'}}>
        
        <div className="form-group">
            <label>Họ và tên</label>
            <input name="full_name" value={formData.full_name} onChange={handleChange} required />
        </div>

        <div className="form-group">
            <label>Email (Tên đăng nhập)</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="form-group">
            <label>Vai trò</label>
            <select name="role" value={formData.role} onChange={handleChange} style={{width:'100%', padding:'10px'}}>
                <option value="customer">Khách hàng</option>
                <option value="staff">Nhân viên</option>
            </select>
        </div>

        <button type="submit" className="btn btn-save" style={{width:'100%', marginTop:'20px'}}>
            TẠO USER
        </button>
      </form>
    </div>
  );
};

export default AdminUserForm;