import React from "react";
import style from './styles/ProductCard.module.css'



const ProductCard = ({products, small}) => {
    let img_src = products.thumbnail_url;
    let name = products.name;
    let old_price = 0;
    let price = Number(products.price).toLocaleString('vi-VN');
    let discount = 0;
    let bestchoice = true;
    
    return (
    <>
        <div className={`${small ? style['container-small'] : style.container}`}>
            <div className={style['product-item']}>
                <a href="/" className={style['product-img']}>
                    <img src={img_src} alt="" />
                    <span className={`${style['box-sale']} ${bestchoice ? '' : style.hidden}`}>Best Choice</span>
                </a>

                <div className={style['product-info']}>
                    <a href="/" className={style['product-name']}>{name}</a>
                    <div className={style['info-review']}>
                        <i className={style['icon-star']}></i>
                        <span>0 đánh giá</span> 
                    </div>
                    <div className={style['product-price']}>
                        <div className={style['old-price']}>{old_price}đ</div>
                        <div className={style['new-price']}>
                            <b className={style.price}>{price}đ</b>
                            <div className={style['sale-off']}>{discount}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default ProductCard;