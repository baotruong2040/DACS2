import React from "react";
import { useState } from "react";
import style from './styles/LoginStyle.module.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from '../config/axiosClient';
import { FaGoogle } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useAuth } from '../context/AuthContext'; // 1. Import hook

const Login = () => {
    const {login} = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Hàm xử lý khi nhập liệu
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Chặn load lại trang
        setLoading(true);
        setError('');
        try {
            // 1. Gọi API Login
            const res = await axiosClient.post('/auth/login', formData);
            
            // Backend trả về: { message: "...", token: "...", user: {...} }
            console.log("Login Success:", res);

            login(res.token, res.user);

            // 3. Thông báo & Chuyển hướng
            alert("Đăng nhập thành công!");
            if (res.user.role === 'admin') {
                navigate('/admin');
            }else {
                navigate('/');
            }
            window.location.reload();

        } catch (err) {
            console.error(err);
            // Hiển thị lỗi từ backend trả về (VD: Sai mật khẩu)
            setError(err.response?.data?.message || "Đăng nhập thất bại");
        } finally {
            setLoading(false);
        }
    };

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
                            <div className={style['email-input']}> Email <input type="text" name="email" placeholder="Nhập email *" value={formData.email} onChange={handleChange}/></div>
                            <div className={style['password-input']}> Mật khẩu <input type="password" name="password" placeholder="Nhập mật khẩu *" value={formData.password} onChange={handleChange}/></div>
                            
                            
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