import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import axios from 'axios';

import style from './styles/Products.module.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import NotFound from './NotFound';
import { PageLoading, SkeletonList, LoadingButton, InlineLoading } from "../components/Loading";

import { MdKeyboardArrowRight } from "react-icons/md";

import { categories } from "../assets/json/product_category_img.json";

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

    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    
    // Loading states
    const [pageLoading, setPageLoading] = useState(true);      // Loading toàn trang (lần đầu)
    const [filterLoading, setFilterLoading] = useState(false); // Loading khi filter
    const [loadMoreLoading, setLoadMoreLoading] = useState(false); // Loading khi xem thêm

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const { categorySlug } = useParams();
    const currentSearch = searchParams.get('search');

    let defaultCategory = 'laptop-all';
    const currentCategory = searchParams.get('category') || categorySlug;
    
    if (currentCategory) {
        defaultCategory = currentCategory;
    }
    
    const displayTitle = CATEGORY_MAP[currentCategory] || "Tất cả sản phẩm";

    let img_url = "/pictures/category-pictures/laptop-gaming.jpg";
    let foundItem = categories.find(item => item.category === defaultCategory);
    if (foundItem) {
        img_url = foundItem.img_src;
    } else {
        return <NotFound />;
    }

    const fetchProducts = async (pageNumber, isLoadMore = false, isFilter = false) => {
        // Set loading state tương ứng
        if (isLoadMore) {
            setLoadMoreLoading(true);
        } else if (isFilter) {
            setFilterLoading(true);
        } else {
            setPageLoading(true);
        }

        try {
            const params = new URLSearchParams(searchParams);
            params.set('limit', 20);
            params.set('page', pageNumber);

            if (currentSearch) {
                params.set('search', currentSearch);
            }

            if (currentCategory) {
                params.set('category', currentCategory);
            }

            const url = `${API_URL}/products?${params.toString()}`;
            console.log("Calling API:", url);

            // Đảm bảo loading hiển thị ít nhất 500ms
            const startTime = Date.now();
            const res = await axios.get(url);
            const elapsed = Date.now() - startTime;
            
            if (elapsed < 500) {
                await new Promise(resolve => setTimeout(resolve, 500 - elapsed));
            }

            const newData = res.data.data ? res.data.data : res.data;

            if (res.data.pagination) {
                setTotalCount(res.data.pagination.total_items);
            }

            if (isLoadMore) {
                setProducts(prev => [...prev, ...newData]);
            } else {
                setProducts(newData);
            }

            if (newData.length < 20) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        } catch (error) {
            console.error("Lỗi tải sản phẩm:", error);
        } finally {
            setPageLoading(false);
            setFilterLoading(false);
            setLoadMoreLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);
        setHasMore(true);
        fetchProducts(1, false, false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentCategory, searchParams.toString()]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProducts(nextPage, true, false);
    };

    const [sortOption, setSortOption] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleFilterChange = (newFilters) => {
        const { brand, price } = newFilters;
        const params = new URLSearchParams(searchParams);

        if (brand && brand.length > 0) {
            params.set('brand', brand.join(','));
        } else {
            params.delete('brand');
        }

        if (price) {
            params.set('price', price);
        } else {
            params.delete('price');
        }

        params.set('page', 1);
        
        // Trigger filter loading
        setFilterLoading(true);
        setSearchParams(params);
        setIsFilterOpen(false); // đóng filter sau khi chọn trên mobile
    };

    // Sắp xếp local (không gọi API)
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    // Tạo danh sách đã sắp xếp dựa trên sortOption
    const sortedProducts = useMemo(() => {
        const list = [...products];
        switch (sortOption) {
            case 'price_asc':
                return list.sort((a, b) => Number(a.price) - Number(b.price));
            case 'price_desc':
                return list.sort((a, b) => Number(b.price) - Number(a.price));
            case 'name_asc':
                return list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
            case 'name_desc':
                return list.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
            case 'rating_desc': {
                const getRating = (p) => Number(p.rating || p.average_rating || 0);
                return list.sort((a, b) => getRating(b) - getRating(a));
            }
            case 'newest': {
                const getTime = (p) => new Date(p.updated_at || p.created_at || 0).getTime() || Number(p.id) || 0;
                return list.sort((a, b) => getTime(b) - getTime(a));
            }
            default:
                return list;
        }
    }, [products, sortOption]);

    const [filterCounts, setFilterCounts] = useState({
        brandCounts: {},
        priceRangeCounts: {}
    });

    // Fetch counts cho bộ lọc (chỉ gọi 1 lần hoặc khi category/search thay đổi)
    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const res = await axios.get(`${API_URL}/products/filter-stats`, {
                    params: {
                        category: currentCategory || undefined,
                        search: currentSearch || undefined
                    }
                });
                setFilterCounts({
                    brandCounts: res.data?.brandCounts || {},
                    priceRangeCounts: res.data?.priceRangeCounts || {}
                });
            } catch (err) {
                console.error('Không lấy được filter counts:', err);
                setFilterCounts({ brandCounts: {}, priceRangeCounts: {} });
            }
        };
        fetchCounts();
    }, [API_URL, currentCategory, currentSearch, searchParams.toString()]);

    return (
        <>
            {/* Page Loading - Hiển thị khi load trang lần đầu */}
            <PageLoading isLoading={pageLoading} text="Đang tải sản phẩm..." />
            
            {/* Filter Loading Overlay */}
            <PageLoading isLoading={filterLoading} text="Đang lọc sản phẩm..." />

            <Header />
            <div className={style.breadcrumb}>
                <span className={style['trang-chu']}>
                    <a href="/">Trang chủ</a>
                    <MdKeyboardArrowRight size={20} />
                    <p>{displayTitle}</p>
                </span>
            </div>
            <div className={style.divBanner}></div>

            <div className={style.container}>
                <div className={style['product-container']}>
                    <div className={`${style.left} ${isFilterOpen ? style['left-open'] : ''}`}>
                        <span className={style['left-title']}>Bộ lọc sản phẩm</span>
                        <div className={style['box-filter']}>
                            <FilterSidebar
                                onFilterChange={handleFilterChange}
                                counts={filterCounts} // truyền counts xuống
                            />
                        </div>
                    </div>

                    <div className={style.right}>
                        <div className={style['right-heading']}>
                            <h1 className={style['right-title']}>{displayTitle}</h1>
                            <div className={style.sort}>
                                <div className={style['total-products']}>{totalCount} Sản phẩm</div>
                                <div className={style['content-sort']}>
                                    <p>Hiển thị theo:</p>
                                    <select
                                        className={style['sort-select']}
                                        value={sortOption}
                                        onChange={handleSortChange}
                                    >
                                        <option value="">Sắp xếp sản phẩm</option>
                                        <option value="newest">Mới nhất</option>
                                        <option value="price_asc">Giá tăng dần</option>
                                        <option value="price_desc">Giá giảm dần</option>
                                        <option value="rating_desc">Đánh giá</option>
                                        <option value="name_asc">Tên A-&gt;Z</option>
                                        <option value="name_desc">Tên Z-&gt;A</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Toggle bộ lọc cho mobile */}
                        <button
                            className={style['filter-toggle']}
                            onClick={() => setIsFilterOpen(prev => !prev)}
                        >
                            {isFilterOpen ? 'Đóng bộ lọc' : 'Bộ lọc'}
                        </button>

                        <div className={style['product-list']}>
                            {/* Skeleton Loading khi đang load trang */}
                            {pageLoading ? (
                                <SkeletonList count={8} />
                            ) : products.length > 0 ? (
                                sortedProducts.map((p) => (
                                    <div className={style['product-item']} key={p.id}>
                                        <ProductCard products={p} small={false} />
                                    </div>
                                ))
                            ) : (
                                <p>Không tìm thấy sản phẩm nào.</p>
                            )}
                        </div>

                        {/* Nút Xem thêm với Loading */}
                        {!pageLoading && hasMore && products.length > 0 && (
                            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                                <LoadingButton
                                    isLoading={loadMoreLoading}
                                    onClick={handleLoadMore}
                                    className="btn btn-outline"
                                    style={{ padding: '10px 50px', minWidth: '200px' }}
                                >
                                    Xem thêm sản phẩm
                                </LoadingButton>
                            </div>
                        )}

                        {/* Inline Loading khi đang load thêm */}
                        {loadMoreLoading && (
                            <InlineLoading isLoading={true} />
                        )}

                        {/* Thông báo hết hàng */}
                        {!pageLoading && !hasMore && products.length > 0 && (
                            <div style={{ textAlign: 'center', marginTop: '30px', color: '#999', fontSize: '13px' }}>
                                Bạn đã xem hết sản phẩm.
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Products;