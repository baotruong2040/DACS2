import React from "react";
import style from './styles/NotFound.module.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    const navToHome = () => {
        navigate('/')
    }

    return (
        <>
            <Header/>
            <div className={style.container}>
                <div><img src="/pictures/category-pictures/notFound.png" alt="" /></div>
                <div><h1>LẠC ĐƯỜNG RỒI!</h1></div>
                <p>Nội dung bạn đang tìm có vẻ như không tồn tại</p>
                <button onClick={navToHome}><p>Về trang chủ</p></button>
            </div>
            <div className={style.notFoundFooter}><Footer/></div>
        </>
    );
}

export default NotFound;