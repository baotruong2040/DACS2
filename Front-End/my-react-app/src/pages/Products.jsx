import React from "react";
import style from './styles/Products.module.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MdKeyboardArrowRight } from "react-icons/md";

import {categories} from "../assets/json/product_category_img.json"
import {data} from "../assets/json/data-test.json"
import ProductCard from "../components/ProductCard";
const Products = ({category}) => {
    let foundItem = categories.find(item => item.category === category);
    let img_url = "/pictures/category-pictures/laptop-gaming.jpg";
    let total_products = 0;
    let producs_category = "";
    let slug_category = "LAPTOP";
    if (foundItem) {
        img_url = foundItem.img_src;
        producs_category = foundItem.category;
    }
    
    
    return (
    <>
        <Header/>
        <div className={style.breadcrumb}>
                <span className={style['trang-chu']}>
                    <a href="/">Trang chủ</a>
                    <MdKeyboardArrowRight size={20}/>
                </span>

        </div>
        <img src={img_url} alt="" className={style.banner}/>
        
        <div className={style.container}>
            <div className={style['product-container']}>
                <div className={style.left}>
                    <span className={style['left-title']}>Bộ lọc sản phẩm</span>
                </div>

                <div className={style.right}>
                    <div className={style['right-heading']}>
                        <h1 className={style['right-title']}>{slug_category}</h1>
                        <div className={style.sort}>
                            <div className={style['total-products']}>{total_products} Sản phẩm</div>
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
                        {data.map((product, index) => {
                            return (<ProductCard products={product} small={true}/>)
                        })}
                        
                        
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>
    )
}

export default Products;