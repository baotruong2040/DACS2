import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../config/axiosClient';
import '../layout/styles/admin.css';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 1. Load danh sách đơn hàng
    const fetchOrders = async () => {
    setLoading(true);
    try {
        const res = await axiosClient.get('/orders/admin/all');
        setOrders(res.data || res);
        } catch (error) {
            console.error("Lỗi tải đơn hàng:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
    fetchOrders();
    }, []);

    // 2. Xử lý đổi trạng thái
    const handleStatusChange = async (orderId, newStatus) => {
    // Xác nhận trước khi đổi
    if (!window.confirm(`Bạn muốn chuyển đơn hàng #${orderId} sang trạng thái "${newStatus}"?`)) return;

    try {
        await axiosClient.put(`/orders/${orderId}/status`, { status: newStatus });
        alert('Cập nhật thành công!');
        fetchOrders(); // Load lại dữ liệu để thấy màu sắc thay đổi
    } catch (error) {
        alert('Lỗi cập nhật!');
    }
    };

    // 3. Helper: Chọn màu sắc cho trạng thái
    const getStatusColor = (status) => {
    switch (status) {
        case 'pending': return '#f59e0b';
        case 'processing': return '#3b82f6';
        case 'shipping': return '#8b5cf6';
        case 'delivered': return '#22c55e';
        case 'cancelled': return '#ef4444'; 
        default: return '#9ca3af';
    }
    };

    // 4. Helper: Dịch tên trạng thái sang tiếng Việt
    const getStatusLabel = (status) => {
    const labels = {
        pending: 'Chờ xử lý',
        processing: 'Đang chuẩn bị',
        shipping: 'Đang giao hàng',
        delivered: 'Giao thành công',
        cancelled: 'Đã hủy'
    };
    return labels[status] || status;
    };

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Quản Lý Đơn Hàng</h2>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Khách hàng</th>
              <th>Địa chỉ giao hàng</th>
              <th>Tổng tiền</th>
              <th>Ngày đặt</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>
                  <div><strong>{order.full_name}</strong></div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{order.phone_number}</div>
                  {/* Hiển thị email tài khoản để dễ liên hệ */}
                  <div style={{ fontSize: '11px', color: '#999' }}>{order.email}</div>
                </td>
                <td style={{ maxWidth: '200px', fontSize: '13px' }}>
                    {order.address}
                    <div style={{color: 'blue', fontSize: '11px', marginTop: '4px'}}>Ghi chú: {order.note}</div>
                </td>
                <td style={{ fontWeight: 'bold', color: '#d70018' }}>
                  {Number(order.total_money).toLocaleString()} đ
                </td>
                <td>{new Date(order.created_at).toLocaleDateString('vi-VN')}</td>
                
                {/* Cột hiển thị trạng thái hiện tại (Badge màu) */}
                <td>
                  <span style={{
                    padding: '5px 10px',
                    borderRadius: '15px',
                    backgroundColor: getStatusColor(order.status),
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap'
                  }}>
                    {getStatusLabel(order.status)}
                  </span>
                </td>

                {/* Cột thao tác (Dropdown) */}
                <td>
                    <button className="action-btn" style={{backgroundColor: '#3b82f6', color: 'white'}} onClick={() => navigate(`/admin/orders/${order.id}`)}>
                        Xem chi tiết
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;