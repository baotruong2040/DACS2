import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./styles/Register.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axiosClient from "../config/axiosClient";
import { MdKeyboardArrowRight } from "react-icons/md";

const VerifyRegister = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: location.state?.email || "",
        full_name: location.state?.full_name || "",
        password: location.state?.password || "",
        code: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            setLoading(true);
            await axiosClient.post("/auth/verify", {
                email: formData.email,
                code: formData.code,
                full_name: formData.full_name,
                password: formData.password,
            });
            setSuccess("Xác thực thành công, hãy đăng nhập.");
            alert("Xác thực thành công!")
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Xác thực thất bại");
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
                    <p>Xác thực đăng ký</p>
                </span>
            </div>
            <div className={style.container}>
                <div className={style.login}>
                    <h2>Nhập mã xác thực</h2>
                    <form className={style["login-form"]} onSubmit={handleSubmit}>
                        <p>Mã đã được gửi tới email: <b>{formData.email}</b></p>
                        {error && <div className={style["error-text"]}>{error}</div>}
                        {success && <div className={style["success-text"]}>{success}</div>}
                        <label className={style["confirm-password-input"]}>
                            Mã xác thực
                            <input
                                type="text"
                                name="code"
                                placeholder="Nhập mã xác thực *"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                required
                            />
                        </label>
                        <button className={style.submit} type="submit" disabled={loading}>
                            <span>{loading ? "Đang xử lý..." : "XÁC THỰC"}</span>
                        </button>
                    </form>
                </div>
            </div>
            <div className={style.footer}><Footer /></div>
        </div>
    );
};

export default VerifyRegister;
