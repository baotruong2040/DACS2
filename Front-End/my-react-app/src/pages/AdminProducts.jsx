import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../config/axiosClient';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Hàm load dữ liệu
  const fetchProducts = async () => {
    try {
      const res = await axiosClient.get('/products?limit=100');
      setProducts(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Hàm xóa sản phẩm (Cần API Delete ở Backend)
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      try {
        await axiosClient.delete(`/products/${id}`);
        alert('Xóa thành công!');
        fetchProducts(); // Load lại bảng
      } catch (error) {
        alert('Lỗi khi xóa!');
      }
    }
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
         <h2>Quản Lý Sản Phẩm</h2>
         <button className="action-btn" onClick={() => navigate('/admin/products/new')}>Thêm sản phẩm mới</button>
      </div>
      
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá bán</th>
            <th>Kho</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>#{p.id}</td>
              <td>
                <img src={p.thumbnail_url} style={{width: '50px', height: '50px', objectFit: 'cover'}} />
              </td>
              <td style={{maxWidth: '300px'}}>{p.name}</td>
              <td style={{color: 'red', fontWeight: 'bold'}}>
                {Number(p.price).toLocaleString()} đ
              </td>
              <td>{p.stock_quantity}</td>
              <td>
                <button className="action-btn btn-edit" onClick={() => navigate(`/admin/products/edit/${p.id}`)}>Sửa</button>
                <button className="action-btn btn-delete" onClick={() => handleDelete(p.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;