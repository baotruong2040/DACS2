import React from 'react';
import style from './styles/Home.module.css'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sliders from '../components/Sliders'
import LogoSlider from '../components/LogoSlider';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <>
            <Header/>
            <div className={style.container}>
                <Sliders/>
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
                                <img src="https://www.tncstore.vn/media/product/11419-laptop-acer-swift-lite-14-ai-sfl14-51m-56hs--2-.jpg" alt="Laptop gaming" className={style['item-img']} />
                            </div>
                        </Link>
                        <Link to="/laptop-ai" className={style['category-item']}>
                            <div className={style.txt}>
                                <div className={style['main-name']}>LAPTOP AI</div>
                                <span className={style['sub-name']}>Trí Tuệ Nhân Tạo</span>
                                <img src="https://www.tncstore.vn/media/product/12743-tnc-store-laptop-asus-gaming-v16-k3607vj-rp106w--1-.jpg" alt="Laptop gaming" className={style['item-img']} />
                            </div>
                        </Link>
                        <Link to="/laptop-nhap-khau" className={style['category-item']}>
                            <div className={style.txt}>
                                <div className={style['main-name']}>LAPTOP NHẬP KHẨU</div>
                                <span className={style['sub-name']}>RẺ NHẤT VIỆT NAM</span>
                                <img src="https://www.tncstore.vn/static/assets/default/images/cat-laptop-van-phong-1.png" alt="Laptop gaming" className={style['item-img']} />
                            </div>
                        </Link>
                        <Link to="/pc-gaming" className={style['category-item']}>
                            <div className={style.txt}>
                                <div className={style['main-name']}>PC GAMING</div>
                                <span className={style['sub-name']}>RẺ NHẤT VIỆT NAM</span>
                                <img src="https://www.tncstore.vn/static/assets/default/images/cat-pc-gaming-miku.jpg" alt="Laptop gaming" className={style['item-img']} />
                            </div>
                        </Link>
                        <Link to="/nitendo-switch" className={style['category-item']}>
                            <div className={style.txt}>
                                <div className={style['main-name']}>NITENDO SWITCH</div>
                                <span className={style['sub-name']}>RẺ NHẤT VIỆT NAM</span>
                                <img src="https://www.tncstore.vn/static/assets/default/images/cat-pc-handheld-1.png" alt="Laptop gaming" className={style['item-img']} />
                            </div>
                        </Link>
                        <Link to="/man-hinh" className={style['category-item']}>
                            <div className={style.txt}>
                                <div className={style['main-name']}>MÀN HÌNH</div>
                                <span className={style['sub-name']}>RẺ NHẤT VIỆT NAM</span>
                                <img src="https://www.tncstore.vn/static/assets/default/images/cat-man-hinh-may-tinh-1.png" alt="Laptop gaming" className={style['item-img']} />
                            </div>
                        </Link>

                    </div>
                </div>
                <div className={style.logoSlide}><LogoSlider/></div>

            </div>
            <Footer/>

        </>
    )

};

export default Home;