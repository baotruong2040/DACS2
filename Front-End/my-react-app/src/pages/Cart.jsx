import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, removeFromCart, getCartTotal, updateCartQuantity } from '../utils/cartUtils';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './styles/Cart.module.css'; // Import CSS Module

import { FaTrashAlt, FaGift } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleRemove = (id) => {
    if(window.confirm('Xóa sản phẩm này khỏi giỏ?')) {
        removeFromCart(id);
        setCartItems(getCart()); 
    }
  };

  const handleQuantity = (id, newQty) => {
      updateCartQuantity(id, newQty);
      setCartItems(getCart());
  };

  const totalAmount = getCartTotal();

  if (cartItems.length === 0) {
      return (
          <div className={styles.wrapper}>
              <Header />
              <div className={styles.container} style={{textAlign:'center', padding:'50px'}}>
                  <h2>Giỏ hàng trống</h2>
                  <Link to="/" style={{color:'blue'}}>Quay lại mua sắm</Link>
              </div>
              <Footer />
          </div>
      )
  }

  return (
    <>
    <Header />
    <div className={styles.wrapper}>
      
      
      {/* Breadcrumb giả */}
      <div className={styles.container} style={{padding:'10px 15px', fontSize:'13px', color:'#666'}}>
         Home {'>'} <b>Giỏ hàng</b>
      </div>

      <div className={styles.container}>
        <div className={styles.gridContainer}>
            
            {/* CỘT TRÁI: LIST SẢN PHẨM */}
            <div className={styles.cartSection}>
                <div className={styles.headerTitle}>
                    <span>Thông tin sản phẩm</span>
                </div>

                {cartItems.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                        <img src={item.thumbnail_url} alt="" className={styles.productImg} />
                        
                        <div className={styles.productInfo}>
                            <Link to={`/product/${item.id}`} className={styles.productName}>{item.name}</Link>
                            {/* <div className={styles.sku}>Mã SP: {item.id}</div> */}
                            
                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginTop:'10px'}}>
                                <div className={styles.price}>{Number(item.price).toLocaleString()}đ</div>
                                
                                {/* Bộ chỉnh số lượng */}
                                <div style={{textAlign:'center'}}>
                                    <div className={styles.quantityControl}>
                                        <input type="text" value={item.quantity} readOnly className={styles.qtyInput} />
                                        <button className={styles.qtyBtn} onClick={() => handleQuantity(item.id, item.quantity + 1)}>+</button>
                                        <button className={styles.qtyBtn} onClick={() => handleQuantity(item.id, item.quantity - 1)}>-</button>
                                    </div>
                                    <button className={styles.removeBtn} onClick={() => handleRemove(item.id)}>Xóa</button>
                                </div>
                            </div>

                            {/* Khung Khuyến Mãi (Giống ảnh) */}
                            <div className={styles.promoBox}>
                                <div className={styles.promoHeader}>
                                    <FaGift /> Khuyến mãi áp dụng
                                </div>
                                <ul className={styles.promoList}>
                                    <li>Tặng 01 lượt xé túi mù Laptop Dell đến hết 30/11</li>
                                    <li>Gói vệ sinh dịch vụ Laptop trọn đời trị giá 500.000đ</li>
                                    <li>Dịch vụ cân màu màn hình trị giá 200.000đ</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CỘT PHẢI: VOUCHER & TỔNG TIỀN */}
            <div className={styles.rightSection}>
                
                {/* Voucher Box */}
                <div className={styles.whiteBox}>
                    <div className={styles.boxHeader}>Nhập mã voucher</div>
                    <div className={styles.voucherInputGroup}>
                        <input type="text" placeholder="Nhập mã khuyến mãi" className={styles.voucherInput} />
                    </div>
                    <div className={styles.voucherEmpty}>Chưa nhập mã voucher nào</div>
                    <div className={styles.voucherNote}>Mã giảm giá sẽ không thể dùng lại sau khi đặt hàng</div>
                </div>

                {/* Summary Box */}
                <div className={styles.whiteBox}>
                    <div className={styles.boxHeader}>Thông tin giỏ hàng</div>
                    
                    {cartItems.map(item => (
                        <div key={item.id} style={{display:'flex', justifyContent:'space-between', fontSize:'13px', marginBottom:'5px'}}>
                            <span style={{maxWidth:'70%'}}>{item.name}</span>
                            <b>x{item.quantity}</b>
                        </div>
                    ))}
                    <hr style={{margin:'15px 0', border:'0', borderTop:'1px dashed #eee'}}/>

                    <div className={styles.summaryRow}>
                        <span>Tổng số lượng sản phẩm</span>
                        <strong>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</strong>
                    </div>
                    <div className={styles.summaryRow}>
                        <span className={styles.totalText}>Tổng chi phí</span>
                        <span className={styles.totalPrice}>{totalAmount.toLocaleString()}đ</span>
                    </div>
                    <div className={styles.vatText}>Đã bao gồm VAT (nếu có)</div>

                    <button className={styles.btnCheckout} onClick={() => navigate('/checkout')}>
                        Tiến hành thanh toán
                    </button>
                </div>
            </div>

        </div>
      </div>
      
    </div>
    <Footer/>
    </>
  );
};

export default Cart;