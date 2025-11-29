import React from 'react';
import style from './styles/Home.module.css'
import Header from '../components/Header';
import Footer from '../components/Footer';
const Home = () => {
    return (
        <>
            <Header/>
            <div className={style.container}>
                <img src="/pictures/slide-pictures/banner-trang-chu-asus-hiku.jpg" alt="slider" className={style.slider} />
                <div className={style.category}>
                    <h2 className={style.title}>DANH MỤC NỔI BẬT</h2>
                    
                    <div className={style['category-grid']}>
                        <a href="/" className={style['category-item']}>
                            <div className={style.txt}>
                                <div className={style['main-name']}>PC GAMING</div>
                                <span className={style['sub-name']}>Rẻ nhât Hà Nội</span>
                                <img src="https://www.tncstore.vn/static/assets/default/images/cat-laptop-gaming-1.png" alt="Laptop gaming" className={style['item-img']} />
                            </div>
                        </a>
                        <a href="/" className={style['category-item']}>
                            <div className={style.txt}>
                                <div className={style['main-name']}>PC GAMING</div>
                                <span className={style['sub-name']}>Rẻ nhât Hà Nội</span>
                                <img src="https://www.tncstore.vn/static/assets/default/images/cat-laptop-gaming-1.png" alt="Laptop gaming" className={style['item-img']} />
                            </div>
                        </a>
                        <a href="/" className={style['category-item']}>
                            <div className={style.txt}>
                                <div className={style['main-name']}>PC GAMING</div>
                                <span className={style['sub-name']}>Rẻ nhât Hà Nội</span>
                                <img src="https://www.tncstore.vn/static/assets/default/images/cat-laptop-gaming-1.png" alt="Laptop gaming" className={style['item-img']} />
                            </div>
                        </a>
                        <a href="/" className={style['category-item']}>
                            <div className={style.txt}>
                                <div className={style['main-name']}>PC GAMING</div>
                                <span className={style['sub-name']}>Rẻ nhât Hà Nội</span>
                                <img src="https://www.tncstore.vn/static/assets/default/images/cat-laptop-gaming-1.png" alt="Laptop gaming" className={style['item-img']} />
                            </div>
                        </a>
                        <a href="/" className={style['category-item']}>
                            <div className={style.txt}>
                                <div className={style['main-name']}>PC GAMING</div>
                                <span className={style['sub-name']}>Rẻ nhât Hà Nội</span>
                                <img src="https://www.tncstore.vn/static/assets/default/images/cat-laptop-gaming-1.png" alt="Laptop gaming" className={style['item-img']} />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <Footer/>

        </>
    )

};

export default Home;