import React from "react";
import Slider from "react-slick";
import style from './styles/Slider.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Sliders = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false,
        arrows: false
    };
    return (
        <>
        <Slider {...settings}>
                    <div className={style.image}>
                        <a href="/laptop-gaming"><img src="/pictures/slide-pictures/banner-trang-chu-asus-hiku.jpg" alt="" /></a>
                    </div>
                    <div className={style.image}>
                        <a href="/pc-gaming"><img src="/pictures/slide-pictures/banner-black-friday-pc-1.jpg" alt="" /></a>
                    </div>
                    <div className={style.image}>
                        <a href="/laptop-ai"><img src="/pictures/slide-pictures/laptop-1758247902.png" alt="" /></a>
                    </div>
                    <div className={style.image}>
                        <a href="/laptop-van-phong"><img src="/pictures/slide-pictures/macbook-1759221641.png" alt="" /></a>
                    </div>
        </Slider>
        </>
    );
}

export default Sliders;