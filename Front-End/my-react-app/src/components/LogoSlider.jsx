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
        swipeToSlide: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: { slidesToShow: 5 }
            },
            {
                breakpoint: 992,
                settings: { slidesToShow: 4 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 576,
                settings: { slidesToShow: 2 }
            }
        ]
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