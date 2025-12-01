import React from "react";
import style from './styles/LogoSlider.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {brands} from '../assets/json/logo.json'

const LogoSlider = () => {    
    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        pauseOnHover: false,
        arrows: false,
        cssEase: "linear",
        swipeToSlide: false
    }
    
    return (
        <>  
            <div className={style.container}>
                <Slider {...settings}>
                    {brands.map((item) => (
                        <div className={style.logo}>
                            <img src={item.img_src} alt={item.name} />
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
}

export default LogoSlider;