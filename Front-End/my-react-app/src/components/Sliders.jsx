import React from "react";
import Slider from "react-slick";
import style from './styles/Slider.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
    { href: "/laptop-gaming", img: "/pictures/slide-pictures/banner-trang-chu-asus-hiku.jpg", alt: "Laptop Gaming" },
    { href: "/pc-gaming", img: "/pictures/slide-pictures/banner-black-friday-pc-1.jpg", alt: "PC Gaming" },
    { href: "/laptop-ai", img: "/pictures/slide-pictures/laptop-1758247902.png", alt: "Laptop AI" },
    { href: "/laptop-van-phong", img: "/pictures/slide-pictures/macbook-1759221641.png", alt: "Laptop Văn Phòng" },
];

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
        arrows: false,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    autoplaySpeed: 3000,
                }
            }
        ]
    };

    return (
        <div className={style.sliderContainer}>
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className={style.image}>
                        <a href={slide.href}>
                            <img src={slide.img} alt={slide.alt} />
                        </a>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Sliders;