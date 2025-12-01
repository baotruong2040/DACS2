import React from "react";
import { useState } from "react";
import style from './styles/LoginStyle.module.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = () => {
        console.log(email);
        console.log(password);
    }

    //Giao diện
    return (
        <>
            <div className={style.wraper}>
                <div className={style.header}><Header/></div>
                <div className={style.breadcrumb}>
                    <span className={style['trang-chu']}>
                        <a href="/">Trang chủ</a>
                        <MdKeyboardArrowRight size={20}/>
                        <p>Đăng nhập</p>
                    </span>        
                </div>
                <div className={style.container}>
                    
                    <div className={style.login}>
                        <h2>Đăng nhập tài khoản</h2>
                        <div className={style['login-form']}>
                            <p>Thông tin đăng nhập</p>
                            <div className={style['email-input']}> Email <input type="text" name="email" placeholder="Nhập email *" value={email} onChange={handleEmail}/></div>
                            <div className={style['password-input']}> Mật khẩu <input type="password" name="password" placeholder="Nhập mật khẩu *" value={password} onChange={handlePassword}/></div>
                            
                            
                            <button className={style.submit} onClick={handleSubmit}><span>ĐĂNG NHẬP</span></button>
                            <button className={style.google}><span><FaGoogle size={12}/> Đăng nhập bằng tài khoản Google</span></button>
                            
                            <Link to={'/forgot-password'}><div className={style['forgot-password']}> Quên mật khẩu? </div></Link>

                            <Link to={'/register'}><div className={style.register}>Bạn chưa có tài khoản? <span>Đăng ký ngày</span> </div></Link>
                        </div>
                    </div>

                </div>

                <div className={style.footer}><Footer/></div>
            </div>
        </>
    );
}

export default Login;