import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../config/axiosClient';
import '../layout/styles/admin.css';

const AdminOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [orderData, setOrderData] = useState(null); // Chứa { order, items }
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(''); // State để đổi trạng thái

  // Load dữ liệu
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axiosClient.get(`/orders/admin/${id}`);
        setOrderData(res); // res = { order: {...}, items: [...] }
        setStatus(res.order.status);
      } catch (error) {
        console.error("Lỗi:", error);
        alert("Không tìm thấy đơn hàng!");
        navigate('/admin/orders');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id, navigate]);

  // Xử lý cập nhật trạng thái
  const handleUpdateStatus = async () => {
    if(!window.confirm('Bạn chắc chắn muốn cập nhật trạng thái?')) return;
    try {
      await axiosClient.put(`/orders/${id}/status`, { status });
      // Reload lại data để chắc chắn
      window.location.reload();
    } catch (error) {
      alert("Lỗi cập nhật!");
    }
  };

  if (loading || !orderData) return <div style={{padding:'20px'}}>Đang tải...</div>;

  const { order, items } = orderData;

  return (
    <div>
      <div style={{display:'flex', alignItems:'center', gap:'15px', marginBottom:'20px'}}>
        <button className="btn-outline" onClick={() => navigate('/admin/orders')}>
          Quay lại
        </button>
        <h2>Chi Tiết Đơn Hàng #{order.id}</h2>
      </div>

      <div className="admin-detail-grid">
        
        {/* CỘT TRÁI: THÔNG TIN CHUNG */}
        <div className="detail-card">
          <h3>Thông tin khách hàng</h3>
          <div className="info-row">
            <strong>Họ tên:</strong> <span>{order.full_name}</span>
          </div>
          <div className="info-row">
            <strong>SĐT:</strong> <span>{order.phone_number}</span>
          </div>
          <div className="info-row">
            <strong>Email:</strong> <span>{order.email || 'Không có'}</span>
          </div>
          <div className="info-row">
            <strong>Địa chỉ:</strong> <span>{order.address}</span>
          </div>
          <div className="info-row">
            <strong>Ghi chú:</strong> <span style={{color:'blue'}}>{order.note || 'Không có'}</span>
          </div>
          <div className="info-row">
            <strong>Ngày đặt:</strong> <span>{new Date(order.created_at).toLocaleString('vi-VN')}</span>
          </div>

          <hr style={{margin:'20px 0', border:'0', borderTop:'1px solid #eee'}} />

          <h3>Cập nhật trạng thái</h3>
          <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
             <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                className="status-select"
                disabled={order.status === 'delivered' || order.status === 'cancelled'}
             >
                <option value="pending">Chờ xử lý</option>
                <option value="processing">Đang đóng gói</option>
                <option value="shipping">Đang giao hàng</option>
                <option value="delivered">Đã giao thành công</option>
                <option value="cancelled">Đã hủy</option>
             </select>
             
             {status !== order.status && (
                 <button className="btn-order" onClick={handleUpdateStatus}>Lưu</button>
             )}
          </div>
        </div>

        {/* CỘT PHẢI: DANH SÁCH SẢN PHẨM */}
        <div className="detail-card">
          <h3>Sản phẩm ({items.length})</h3>
          <table className="admin-table" style={{marginTop:'10px'}}>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Giá mua</th>
                <th>SL</th>
                <th>Tổng</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td style={{display:'flex', alignItems:'center', gap:'10px'}}>
                    <img src={item.thumbnail_url} style={{width:'40px', height:'40px', objectFit:'cover', borderRadius:'4px'}} />
                    <span style={{fontSize:'13px'}}>{item.product_name}</span>
                  </td>
                  <td>{Number(item.price).toLocaleString()}</td>
                  <td>x{item.quantity}</td>
                  <td style={{fontWeight:'bold'}}>{Number(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
               <tr>
                 <td colSpan="3" style={{textAlign:'right', fontWeight:'bold', padding:'15px'}}>TỔNG TIỀN:</td>
                 <td style={{color:'#d70018', fontSize:'18px', fontWeight:'bold'}}>
                    {Number(order.total_money).toLocaleString()} đ
                 </td>
               </tr>
            </tfoot>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminOrderDetail;