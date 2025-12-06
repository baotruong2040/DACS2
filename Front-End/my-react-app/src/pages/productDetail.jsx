import style from "./styles/productDetail.module.css"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from '../config/axiosClient';
import axios from "axios";
import Footer from '../components/Footer.jsx'
import Header from "../components/Header.jsx"
import NotFound from "./NotFound.jsx";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaGift } from "react-icons/fa6";

import {brands} from '../assets/json/logo.json'

const ProductDetail = () => {
    const {productSlug} = useParams();
    const [product, setProduct]= useState(null);
    const [loading, setLoading] = useState(true);
    const [syncImage, setSyncImage] = useState(null);
    const [logo, setlogo] = useState(null);
    const [showing, setShowing] = useState(false);

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
                    </div>
                 </div>
            </div>
        </div>
        <Footer/>
    </>
    )
};

export default ProductDetail;