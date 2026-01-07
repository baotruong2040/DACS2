import React, { useState } from "react";
import style from "./styles/Register.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import { MdKeyboardArrowRight } from "react-icons/md";

const Register = () => {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu xác nhận không khớp");
            return;
        }
        try {
            setLoading(true);
            const payload = {
                full_name: formData.full_name,
                email: formData.email,
                password: formData.password,
            };
            const res = await axiosClient.post("/auth/register", payload);
            setSuccess(res.message || "Mã xác thực đã được gửi tới email của bạn.");
            navigate("/verify", { state: payload });
        } catch (err) {
            setError(err.response?.data?.message || "Đăng ký thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={style.wraper}>
            <div className={style.header}><Header /></div>
            <div className={style.breadcrumb}>
                <span className={style["trang-chu"]}>
                    <a href="/">Trang chủ</a>
                    <MdKeyboardArrowRight size={20} />
                    <p>Đăng ký</p>
                </span>
            </div>
            <div className={style.container}>
                <div className={style.login}>
                    <h2>Đăng ký tài khoản</h2>
                    <form className={style["login-form"]} onSubmit={handleSubmit}>
                        <p>Thông tin đăng ký</p>
                        {error && <div className={style["error-text"]}>{error}</div>}
                        {success && <div className={style["success-text"]}>{success}</div>}
                        <label className={style["name-input"]}>
                            Họ và tên
                            <input
                                type="text"
                                name="full_name"
                                placeholder="Nhập họ và tên *"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className={style["email-input"]}>
                            Email
                            <input
                                type="email"
                                name="email"
                                placeholder="Nhập email *"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className={style["password-input"]}>
                            Mật khẩu
                            <input
                                type="password"
                                name="password"
                                placeholder="Nhập mật khẩu *"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className={style["confirm-password-input"]}>
                            Xác nhận mật khẩu
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Nhập lại mật khẩu *"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <button className={style.submit} type="submit" disabled={loading}>
                            <span>{loading ? "Đang xử lý..." : "ĐĂNG KÝ"}</span>
                        </button>
                        <Link to="/login">
                            <div className={style.register}>
                                Bạn đã có tài khoản? <span>Đăng nhập ngay</span>
                            </div>
                        </Link>
                    </form>
                </div>
            </div>
            <div className={style.footer}><Footer /></div>
        </div>
    );
};

export default Register;
