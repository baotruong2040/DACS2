import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../config/axiosClient';
import { useAuth } from '../context/AuthContext';
import { getCart, getCartTotal, clearCart } from '../utils/cartUtils';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './styles/Checkout.module.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  // 1. Cập nhật State: Thêm email, Bỏ city
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    note: '',
    paymentMethod: 'bank_transfer'
  });

  useEffect(() => {
    const items = getCart();
    if (items.length === 0) {
        navigate('/products');
        return;
    }
    setCartItems(items);
    setTotalAmount(getCartTotal());

    // Auto-fill thông tin nếu đã đăng nhập
    if (isAuthenticated && user) {
        setFormData(prev => ({
            ...prev,
            fullName: user.full_name || '',
            phone: user.phone_number || '',
            email: user.email || '', 
            address: user.address || ''
        }));
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
        const payload = {
            fullName: formData.fullName,
            phone: formData.phone, 
            address: formData.address, 
            note: formData.note,
            items: cartItems.map(item => ({ productId: item.id, quantity: item.quantity }))
        };

        const res = await axiosClient.post('/orders', payload);
        alert(`Đặt hàng thành công! Mã đơn: #${res.orderId}`);
        clearCart();
        navigate('/my-orders');

    } catch (error) {
        if (error.response?.status === 401) {
            alert("Vui lòng đăng nhập!");
            navigate('/login');
        } else {
            alert("Đặt hàng thất bại!");
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container} style={{padding: '15px 15px', fontSize: '13px', color: '#666'}}>
         Home {'>'} Giỏ hàng {'>'} <b>Xác nhận mua hàng</b>
      </div>

      <div className={styles.container}>
        <div className={styles.gridContainer}>
            
            <div className={styles.leftSection}>
                <div className={styles.whiteBox}>
                    <div className={styles.boxHeader}>
                        Thông tin giao hàng
                    </div>

                    <div className={styles.formRow2}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Họ và tên người nhận <span>*</span></label>
                            <input 
                                name="fullName" 
                                value={formData.fullName} 
                                onChange={handleChange} 
                                className={styles.input} 
                                placeholder="Nguyễn Văn A" 
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Số điện thoại <span>*</span></label>
                            <input 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleChange} 
                                className={styles.input} 
                                placeholder="09xxxx..." 
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email <span>*</span></label>
                        <input 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className={styles.input} 
                            placeholder="email@example.com" 
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Địa chỉ nhận hàng <span>*</span></label>
                        <input type='text' 
                            name="address" 
                            value={formData.address} 
                            onChange={handleChange} 
                            className={styles.input} 
                            rows="2" 
                            placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
                        ></input>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Ghi chú đơn hàng (Tùy chọn)</label>
                        <input type='text' 
                            name="note" 
                            value={formData.note} 
                            onChange={handleChange} 
                            className={styles.input} 
                            rows="2" 
                            placeholder="Ví dụ: Giao hàng giờ hành chính, gọi trước khi giao..."
                        ></input>
                    </div>

                    <div>
                        <label style={{display:'flex', alignItems:'center', gap:'5px', fontSize:'14px'}}>
                            <input type="checkbox" /> Xuất hóa đơn công ty
                        </label>
                    </div>
                </div>

                <div className={styles.whiteBox}>
                    <div className={styles.boxHeader}>Hình thức thanh toán</div>
                    
                    <div className={styles.paymentOption}>
                        <label className={styles.radioLabel}>
                            <input type="radio" name="paymentMethod" value="bank_transfer" checked={formData.paymentMethod === 'bank_transfer'} onChange={handleChange} />
                            Thanh toán bằng chuyển khoản
                        </label>
                        {formData.paymentMethod === 'bank_transfer' && (
                            <div className={styles.bankInfo}>
                                <b>Ngân hàng MB Bank</b><br/>
                                STK: <b>282468888</b><br/>
                                Chủ TK: CT TNHH TM VA TIN HOC TU NGUYET
                            </div>
                        )}
                    </div>

                    <div className={styles.paymentOption}>
                        <label className={styles.radioLabel}>
                            <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} />
                            Thanh toán khi nhận hàng
                        </label>
                    </div>
                </div>
            </div>

            {/* CỘT PHẢI: SUMMARY (Giữ nguyên) */}
            <div className={styles.rightSection}>
                <div className={styles.whiteBox}>
                    <div className={styles.boxHeader}>Thông tin giỏ hàng</div>
                    
                    <div style={{maxHeight:'200px', overflowY:'auto', marginBottom:'15px'}}>
                        {cartItems.map(item => (
                            <div key={item.id} className={styles.miniItem}>
                                <img src={item.thumbnail_url} alt="" className={styles.miniImg} />
                                <div className={styles.miniInfo}>
                                    <div className={styles.miniName}>{item.name}</div>
                                    <div style={{display:'flex', justifyContent:'space-between', fontSize:'13px'}}>
                                        <span>x{item.quantity}</span>
                                        <span className={styles.miniPrice}>{Number(item.price).toLocaleString()}đ</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.summaryRow}>
                        <span className={styles.totalText}>Tổng chi phí</span>
                        <span className={styles.totalPrice}>{totalAmount.toLocaleString()}đ</span>
                    </div>
                    
                    <button className={styles.btnConfirm} onClick={handlePlaceOrder} disabled={loading}>
                        {loading ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN MUA HÀNG'}
                    </button>
                </div>
            </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;