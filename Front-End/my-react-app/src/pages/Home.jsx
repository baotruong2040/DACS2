import React from 'react';
import style from './styles/Home.module.css'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <>
            <Header/>
            <div className={style.container}>
                <img src="/pictures/slide-pictures/banner-trang-chu-asus-hiku.jpg" alt="slider" className={style.slider} />
                <div className={style.category}>
                    <h2 className={style.title}>DANH MỤC NỔI BẬT</h2>
                    
                    <div className={style['category-grid']}>
                        <Link to="/laptop-gaming" className={style['category-item']}>
                            <div className={style.txt}>
                                <div className={style['main-name']}>LAPTOP GAMING</div>
                                <span className={style['sub-name']}>Chiến Game Đỉnh Cao</span>
                                <img src="https://www.tncstore.vn/static/assets/default/images/cat-laptop-gaming-1.png" alt="Laptop gaming" className={style['item-img']} />
                            </div>
                        </Link>
                        <Link to="/laptop-sinh-vien" className={style['category-item']}>
                            <div className={style.txt}>
                                <div className={style['main-name']}>LAPTOP SINH VIÊN</div>
                                <span className={style['sub-name']}>Giá Tốt</span>
                                <img src="https://www.tncstore.vn/static/assets/default/images/cat-laptop-gaming-1.png" alt="Laptop gaming" className={style['item-img']} />
                            </div>
                        </Link>
                        <Link to={'/laptop-van-phong'} className={style['category-item']}>
                            <div className={style.txt}>
                                <div className={style['main-name']}>LAPTOP VĂN PHÒNG</div>
                                <span className={style['sub-name']}>Mỏng Nhẹ</span>
                                <img src="https://www.tncstore.vn/static/assets/default/images/cat-laptop-gaming-1.png" alt="Laptop gaming" className={style['item-img']} />
                            </div>
                        </Link>
                        <Link to="/laptop-ai" className={style['category-item']}>
                            <div className={style.txt}>
                                <div className={style['main-name']}>LAPTOP AI</div>
                                <span className={style['sub-name']}>Trí Tuệ Nhân Tạo</span>
                                <img src="https://www.tncstore.vn/static/assets/default/images/cat-laptop-gaming-1.png" alt="Laptop gaming" className={style['item-img']} />
                            </div>
                        </Link>
                        <Link to="/laptop-nhap-khau" className={style['category-item']}>
                            <div className={style.txt}>
                                <div className={style['main-name']}>LAPTOP NHẬP KHẨU</div>
                                <span className={style['sub-name']}>RẺ NHẤT VIỆT NAM</span>
                                <img src="https://www.tncstore.vn/static/assets/default/images/cat-laptop-gaming-1.png" alt="Laptop gaming" className={style['item-img']} />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer/>

        </>
    )

};

export default Home;