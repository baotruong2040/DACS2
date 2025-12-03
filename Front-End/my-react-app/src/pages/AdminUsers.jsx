import React, { useEffect, useState } from 'react';
import axiosClient from '../config/axiosClient';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Gọi API lấy danh sách user
    axiosClient.get('/users') // Cần bổ sung API này ở Backend
      .then(res => setUsers(res.data || res)) // Tùy cấu trúc trả về
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 style={{marginBottom: '20px'}}>Quản Lý Người Dùng</h2>
      
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>#{user.id}</td>
              <td>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                   {user.full_name}
                </div>
              </td>
              <td>{user.email}</td>
              <td>
                <span style={{
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    background: user.role === 'admin' ? '#dcfce7' : '#e0f2fe',
                    color: user.role === 'admin' ? '#166534' : '#0369a1',
                    fontSize: '12px'
                }}>
                    {user.role}
                </span>
              </td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>
                <button className="action-btn btn-edit">Sửa</button>
                <button className="action-btn btn-delete">Khóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;