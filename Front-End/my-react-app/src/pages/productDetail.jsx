import style from "./styles/productDetail.module.css"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from '../config/axiosClient';
import { addToCart } from "../utils/cartUtils.js";
import Footer from '../components/Footer.jsx'
import Header from "../components/Header.jsx"
import NotFound from "./NotFound.jsx";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaGift } from "react-icons/fa6";

import {brands} from '../assets/json/logo.json'

const ProductDetail = () => {
    const {productSlug} = useParams();
    const navigate = useNavigate();
    //Main content
    const [product, setProduct]= useState(null);
    const [loading, setLoading] = useState(true);
    const [syncImage, setSyncImage] = useState(null);
    const [logo, setlogo] = useState(null);
    const [showing, setShowing] = useState(false);
    const [amount, setAmount] = useState(1);
    const [stock, setStock] = useState(0);

    //Description
    const [isExpanded, setIsExpanded] = useState(false);
    
    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            if (value === '') {
                setAmount('');
            } else {
                // Chặn nhập quá số lượng tồn kho
                let numValue = parseInt(value);
                if (numValue > stock) numValue = stock;
                if (numValue < 1) numValue = 1;
                
                setAmount(numValue);
            }
        }
    }

    const handleBlur = () => {
        if (amount === '' || amount < 1) {
            setAmount(1);
        }
    };

    const decreaseQuantity = () => {
        if (amount > 1) {
            setAmount(prev => parseInt(prev) - 1);
        }
    };

    const increaseQuantity = () => {
        if (amount < stock) {
            setAmount(prev => parseInt(prev) + 1);
        } else {
            alert('Đã đạt giới hạn số lượng trong kho!');
        }
    };

    const handleAddToCart = () => {
        if (!product) return;
        
        addToCart(product, amount);
        alert(`Đã thêm ${amount} sản phẩm vào giỏ hàng!`);
    };

    const handleBuyNow = () => {
        if (!product) return;

        addToCart(product, amount);
        navigate('/cart');
    };

    useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        let realId;

        if (productSlug) {
            console.log("Đang tìm ID từ slug:", productSlug);
            // Gọi API bước 1: Lấy ID
            const resId = await axiosClient.get(`/products/slug/${productSlug}`);
            realId = resId.product_id; 
        }

        if (realId) {
            console.log("Đang lấy chi tiết cho ID:", realId);
            const resDetail = await axiosClient.get(`/products/${realId}`);
            setProduct(resDetail);
            setSyncImage(resDetail.thumbnail_url);
            setlogo(resDetail.brand);
            setStock(resDetail.stock_quantity)
        }

      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
    window.scrollTo(0, 0);
  }, [productSlug]);

    if (loading) return <div>Đang tải...</div>;
    if (!product) return <NotFound/>;
    return (
    <>
        <Header/>
        <div className={style.container}>
            <div className={style.breadcrumb}>
                <span className={style['trang-chu']}>
                    <a href="/">Trang chủ</a>
                    <MdKeyboardArrowRight size={20}/>
                    <p>{product.name}</p>
                </span>
            </div>

            <div className={style['main-product-detail']}>
                 <div className={style.content}>
                    <div className={style['product-image-container']}>
                        <div className={style.thumbnail}>
                            <img src={syncImage} alt="" />
                        </div>
                        <div className={style['image-thumb']}>
                            <div className={`${style['thumb-item']} ${syncImage === product.thumbnail_url ? style.active : ''}`} onClick={() => setSyncImage(product.thumbnail_url)}>
                                <img src={product.thumbnail_url} alt="" />
                            </div>
                            {product.images && product.images.length > 0 && product.images.map((imgUrl, index) => (
                                <div key={index} className={`${style['thumb-item']} ${syncImage === imgUrl ? style.active : ''}`} onClick={() => setSyncImage(imgUrl)}>
                                    <img src={imgUrl} alt={`thumb-${index}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={style['product-main-detail']}>
                        <div className={style.logo}>
                            <img src="/pictures/logoBrand/acer.png" alt="" />
                        </div>
                        <h1 className={style.name}>{product.name} {product.specs.cpu}/ {product.specs.ram}/ {product.specs.ssd}/ {product.specs.vga}/ {product.specs.screen}</h1>
                        <div className={style.info}>
                            <div className={style.review}>
                                5.0
                                <i className={style['icon-star']}></i>
                            </div>
                            <div className={style['review-count']}>
                                <p>
                                    <span>0</span> Đánh Giá
                                </p>
                            </div>
                            <div className={style.sold}>
                                <p>
                                    Đã bán: <span>0</span>
                                </p>
                            </div>
                        </div>
                        <div className={style.specs}>
                            <ul>
                                <li>CPU: {product.specs.cpu}</li>
                                <li>Ram: {product.specs.ram}</li>
                                <li>Ổ cứng: {product.specs.ssd}</li>
                                <li>VGA: {product.specs.vga}</li>
                                <li>Màn Hình: {product.specs.screen}</li>
                                <li>Pin: 3Cell 56Wh</li>
                                <li>Cân nặng: 2.6 Kg</li>
                                <li>Màu sắc: Đen</li>
                                <li>OS: Window 11</li>
                            </ul>
                        </div>
                    </div>
                    <div className={style['product-main-right']}>
                        <div className={style.offer}>
                            <div className={style.title}>
                                <FaGift/>
                                <p>Khuyến mãi khi mua sản phẩm</p>
                            </div>
                            <div className={style['offer-content']}>
                                <p>
                                    <strong>Bộ quà tặng bao gồm:</strong> <br />
                                    <span>- Tặng 01 lượt xé <span>túi mù Laptop {product.brand}</span> đến hết 31/10/2025 (Số lượng quà có hạn)</span> <br />
                                    <span>- Gói vệ sinh dịch vụ Laptop trọn đời trị giá 500.000đ</span> <br />
                                    <span>- Dịch vụ cân màu màn hình trị giá 200.000đ</span> <br />
                                    <span>- Giảm thêm 5% tối đa 150K áp dụng cho KH mua Màn hình</span> <br />
                                    <span>- Giảm thêm 5% tối đa 150K áp dụng cho KH mua Phím, Chuột, Tai Nghe</span> <br />
                                </p>
                            </div>
                        </div>
                        <div className={style['main-price']}>
                            <div className={style.price}>
                                <div className={style['final-price']}>{Number(product.price).toLocaleString('vi-VN')}đ</div>
                                <div className={style['old-price']}>{Number(product.old_price).toLocaleString('vi-VN')}đ</div>
                                <div className={style.sale}>-{product.discount_percentage}%</div>
                            </div>
                            <div className={style['info-vat']}>
                                <div className={style.item}>Bảo hành 24 tháng</div>
                            </div>
                        </div>
                        <div className={style['add-product']}>
                            <div className={style['choose-quantity']}>
                                <span>Số lượng</span>
                                <div className={style['amount-control']}>
                                    <button onClick={decreaseQuantity}>-</button> <input type="text" value={amount} onChange={handleQuantityChange} onBlur={handleBlur}/> <button onClick={increaseQuantity}>+</button>
                                </div>
                            </div>
                            <div className={style['add-button']}>
                                <div className={style['add-cart']} onClick={handleAddToCart}> <p>Thêm Vào Giỏ Hàng</p> </div>
                                <div className={style['buy-now']} onClick={handleBuyNow}> <p>Mua Ngay</p> </div>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
            <div className={style['product-content']}>
                <div className={style['content-left']}>
                    <div className={style['product-description']}>
                        <h2>Mô tả sản phẩm</h2>
                        
                        <div className={`${style['description-content']} ${isExpanded ? style.expanded : style.collapsed}`} dangerouslySetInnerHTML={{ __html: product.description || "<p>Đang cập nhật...</p>" }} />
                        
                        {!isExpanded && <div className={style['gradient-overlay']}></div>}

                        <div>
                            <button className={style['button-toggle']} onClick={() => setIsExpanded(!isExpanded)}>
                                {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className={style['content-right']}>
                    <div className={style['specs-box']}>
                        <h2>THÔNG SỐ KĨ THUẬT</h2>
                        <div className={style['specs-content']}>
                            <table style={{width:559}}>
                                <tbody>
                                    <tr>
                                        <td>CPU</td>
                                        <td>{product.specs.cpu}</td>
                                    </tr>
                                    <tr>
                                        <td>RAM</td>
                                        <td>{product.specs.ram}</td>
                                    </tr>
                                    <tr>
                                        <td>Ổ Cứng</td>
                                        <td>{product.specs.ssd}</td>
                                    </tr>
                                    <tr>
                                        <td>VGA</td>
                                        <td>{product.specs.vga}</td>
                                    </tr>
                                    <tr>
                                        <td>Màn Hình</td>
                                        <td>{product.specs.screen}</td>
                                    </tr>
                                    <tr>
                                        <td>Pin</td>
                                        <td>{product.specs.battery}</td>
                                    </tr>
                                    <tr>
                                        <td>Cân Nặng</td>
                                        <td>{product.specs.weight}</td>
                                    </tr>
                                    <tr>
                                        <td>Màu Sắc</td>
                                        <td>{product.specs.color}</td>
                                    </tr>
                                    <tr>
                                        <td>Hệ Điều Hành</td>
                                        <td>{product.specs.os}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <Footer/>
    </>
    )
};

export default ProductDetail;