import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import axios from 'axios';

import style from './styles/Products.module.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import NotFound from './NotFound';

import { MdKeyboardArrowRight } from "react-icons/md";

import {categories} from "../assets/json/product_category_img.json"

const Products = () => {
    const CATEGORY_MAP = {
        'laptop-moi': "Tất cả sản phẩm",
        'laptop-ai': 'Laptop AI - Trí Tuệ Nhân Tạo',
        'laptop-gaming': 'Laptop Gaming - Chiến Game Đỉnh Cao',
        'laptop-sinh-vien': 'Laptop Sinh Viên - Giá Tốt',
        'laptop-van-phong': 'Laptop Văn Phòng - Mỏng Nhẹ',
        'laptop-nhap-khau': 'Laptop Nhập Khẩu'
    };

    const API_URL = 'http://localhost:5000/api';

    
    //1
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    //2
    // const { categorySlug } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const {categorySlug} = useParams();
    
    //lấy category
    let defaultCategory = 'laptop-all';
    const currentCategory = searchParams.get('category') || categorySlug;
    console.log(currentCategory);
    if (currentCategory) {
        defaultCategory = currentCategory;
    }    
    //tên hiển thị
    const displayTitle = CATEGORY_MAP[currentCategory] || "Tất cả sản phẩm";
    
    let img_url = "/pictures/category-pictures/laptop-gaming.jpg";
    let foundItem = categories.find(item => item.category === defaultCategory);
    if (foundItem) {
        img_url = foundItem.img_src;
    }else {
        return <NotFound/>
    }

    const fetchProducts = async (pageNumber, isLoadMore = false) => {
            setLoading(true);
            try {
                // BƯỚC 1: Tạo đối tượng URLSearchParams từ params hiện tại trên URL
                // Nó sẽ tự động lấy: ?brand=Asus&price=...
                const params = new URLSearchParams(searchParams);

                // BƯỚC 2: Bổ sung thêm các tham số bắt buộc
                params.set('limit', 20);
                params.set('page', pageNumber);

                // Nếu có category (từ useParams hoặc URL), đảm bảo nó được gửi đi
                if (currentCategory) {
                    params.set('category', currentCategory);
                }

                // BƯỚC 3: Tạo URL hoàn chỉnh
                const url = `${API_URL}/products?${params.toString()}`;

                console.log("Calling API:", url); // <--- Check log xem đúng chưa

                const res = await axios.get(url);
                
                // Fix lấy dữ liệu an toàn
                const newData = res.data.data ? res.data.data : res.data;
                
                if (res.data.pagination) {
                    setTotalCount(res.data.pagination.total_items);
                }

                if (isLoadMore) {
                    // Nếu là Xem thêm -> Nối mảng cũ (prev) với mảng mới (newData)
                    setProducts(prev => [...prev, ...newData]);
                } else {
                    // Nếu là Lọc/Load lần đầu -> Thay thế hoàn toàn
                    setProducts(newData);
                }

            // Kiểm tra xem đã hết hàng chưa (nếu trả về ít hơn 20 thì là hết)
                if (newData.length < 20) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
            } catch (error) {
                console.error("Lỗi tải sản phẩm:", error);
            }finally {
                setLoading(false);
            }
        };
    
    //gọi API
    useEffect(() => {
        
        setPage(1);       // Reset về trang 1
        setHasMore(true); // Reset trạng thái còn hàng
        fetchProducts(1, false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentCategory, searchParams.toString()]); 

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProducts(nextPage, true); // isLoadMore = true
    };

    //SideBar
    const handleFilterChange = (newFilters) => {
        const { brand, price } = newFilters;
        
        // Tạo params mới từ cái cũ (để giữ lại các tham số khác nếu có)
        const params = new URLSearchParams(searchParams);

        // Xử lý Brand
        if (brand && brand.length > 0) {
            params.set('brand', brand.join(',')); // Asus,Dell
        } else {
            params.delete('brand');
        }

        // Xử lý Price
        if (price) {
            params.set('price', price);
        } else {
            params.delete('price');
        }

        // Reset về trang 1 mỗi khi lọc
        params.set('page', 1);

        // Đẩy lên URL -> Kích hoạt useEffect chạy lại
        setSearchParams(params);
    };

    //Giao diện
    return (
    <>
        <Header/>
        <div className={style.breadcrumb}>
                <span className={style['trang-chu']}>
                    <a href="/">Trang chủ</a>
                    <MdKeyboardArrowRight size={20}/>
                    <p>{displayTitle}</p>
                </span>

        </div>
        <img src={img_url} alt="" className={style.banner}/>
        
        <div className={style.container}>
            <div className={style['product-container']}>
                <div className={style.left}>
                    <span className={style['left-title']}>Bộ lọc sản phẩm</span>

                    <div className={style['box-filter']}>
                        <FilterSidebar onFilterChange={handleFilterChange}/>    
                    </div>
                </div>

                <div className={style.right}>
                    <div className={style['right-heading']}>
                        <h1 className={style['right-title']}>{displayTitle}</h1>
                        <div className={style.sort}>
                            <div className={style['total-products']}>{totalCount} Sản phẩm</div>
                            <div className={style['content-sort']}>
                                <p>Hiển thị theo:</p>
                                <select className={style['sort-select']}>
                                    <option value="">Sắp xếp sản phẩm</option>
                                    <option value="">Mới nhất</option>
                                    <option value="">Giá tăng dần</option>
                                    <option value="">Giá giảm dần</option>
                                    <option value="">Đánh giá</option>
                                    <option value="">Tên A-&gt;Z</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={style['product-list']}>
                        {products.length > 0 ? (
                            products.map((p) => (
                                <div className={style['product-item']}><ProductCard key={p.id} products={p} small={false}/></div>
                            ))
                        ) : (
                            <p>Không tìm thấy sản phẩm nào.</p>
                        )}
                    </div>
                    {!loading && hasMore && products.length > 0 && (
                            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                                <button 
                                    className="btn btn-outline" 
                                    onClick={handleLoadMore}
                                    style={{ padding: '10px 50px', minWidth: '200px' }}
                                >
                                    Xem thêm sản phẩm
                                </button>
                            </div>
                        )}
                        
                        {/* Thông báo hết hàng */}
                        {!loading && !hasMore && products.length > 0 && (
                             <div style={{ textAlign: 'center', marginTop: '30px', color: '#999', fontSize: '13px' }}>
                                Bạn đã xem hết sản phẩm.
                            </div>
                        )}
                </div>
            </div>
        </div>
        <Footer/>
    </>
    )
}

export default Products;