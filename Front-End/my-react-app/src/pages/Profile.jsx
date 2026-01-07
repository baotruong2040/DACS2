import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axiosClient from "../config/axiosClient";
import styles from "./styles/Profile.module.css";

const provinces = [
  { value: "", label: "Tỉnh / Thành Phố" },
  { value: "1", label: "Hà Nội" },
  { value: "2", label: "TP HCM" },
  { value: "5", label: "Hải Phòng" },
  { value: "4", label: "Đà Nẵng" },
  { value: "6", label: "An Giang" },
  { value: "7", label: "Bà Rịa-Vũng Tàu" },
  { value: "13", label: "Bình Dương" },
  { value: "15", label: "Bình Phước" },
  { value: "16", label: "Bình Thuận" },
  { value: "14", label: "Bình Định" },
  { value: "8", label: "Bạc Liêu" },
  { value: "10", label: "Bắc Giang" },
  { value: "9", label: "Bắc Kạn" },
  { value: "11", label: "Bắc Ninh" },
  { value: "12", label: "Bến Tre" },
  { value: "18", label: "Cao Bằng" },
  { value: "17", label: "Cà Mau" },
  { value: "3", label: "Cần Thơ" },
  { value: "24", label: "Gia Lai" },
  { value: "25", label: "Hà Giang" },
  { value: "26", label: "Hà Nam" },
  { value: "27", label: "Hà Tĩnh" },
  { value: "30", label: "Hòa Bình" },
  { value: "28", label: "Hải Dương" },
  { value: "29", label: "Hậu Giang" },
  { value: "31", label: "Hưng Yên" },
  { value: "32", label: "Khánh Hòa" },
  { value: "33", label: "Kiên Giang" },
  { value: "34", label: "Kon Tum" },
  { value: "35", label: "Lai Châu" },
  { value: "38", label: "Lào Cai" },
  { value: "36", label: "Lâm Đồng" },
  { value: "37", label: "Lạng Sơn" },
  { value: "39", label: "Long An" },
  { value: "40", label: "Nam Định" },
  { value: "41", label: "Nghệ An" },
  { value: "42", label: "Ninh Bình" },
  { value: "43", label: "Ninh Thuận" },
  { value: "44", label: "Phú Thọ" },
  { value: "45", label: "Phú Yên" },
  { value: "46", label: "Quảng Bình" },
  { value: "47", label: "Quảng Nam" },
  { value: "48", label: "Quảng Ngãi" },
  { value: "49", label: "Quảng Ninh" },
  { value: "50", label: "Quảng Trị" },
  { value: "51", label: "Sóc Trăng" },
  { value: "52", label: "Sơn La" },
  { value: "53", label: "Tây Ninh" },
  { value: "56", label: "Thanh Hóa" },
  { value: "54", label: "Thái Bình" },
  { value: "55", label: "Thái Nguyên" },
  { value: "57", label: "Thừa Thiên-Huế" },
  { value: "58", label: "Tiền Giang" },
  { value: "59", label: "Trà Vinh" },
  { value: "60", label: "Tuyên Quang" },
  { value: "61", label: "Vĩnh Long" },
  { value: "62", label: "Vĩnh Phúc" },
  { value: "63", label: "Yên Bái" },
  { value: "19", label: "Đắk Lắk" },
  { value: "22", label: "Đồng Nai" },
  { value: "23", label: "Đồng Tháp" },
  { value: "21", label: "Điện Biên" },
  { value: "20", label: "Đăk Nông" },
];

const Profile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    mobile: "",
    province: "",
    district: "",
    ward: "",
    address: "",
  });

  // Kiểm tra token & lấy profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await axiosClient.get("/users/profile");
        const u = res.user;
        setForm({
          fullname: u.full_name || "",
          email: u.email || "",
          mobile: u.phone || "",
          province: u.province || "",
          district: u.district || "",
          ward: u.ward || "",
          address: u.address || "",
        });
      } catch (err) {
        console.error(err);
        navigate("/");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call API update profile
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <>
      <Header />
      <div className={styles.page}>
        <div className={`${styles.boxAccount} ${styles.backgroundWhite} ${styles.dFlex}`}>
          <div className={styles.accountLeft}>
            <h2 className={styles.title}>Tài khoản</h2>
            <div className={styles.listAction}>
              <a className={`${styles.item} ${styles.active}`}>
                {/* <div className={styles.icon}>
                  <img src="/static/assets/default/images/bx_user-circle.png" alt="user" />
                </div> */}
                <span className={styles.txt}>Thông tin tài khoản</span>
              </a>
              <a className={styles.item}>
                {/* <div className={styles.icon}>
                  <img src="/static/assets/default/images/bx_detail.png" alt="bx_detail" />
                </div> */}
                <span className={styles.txt}>Quản lý đơn hàng</span>
              </a>
              {/* <a className={`${styles.item} ${styles.pass}`}>
                <div className={styles.icon}>
                  <img src="/static/assets/default/images/box-change-pass.png" alt="change-pass" />
                </div>
                <span className={styles.txt}>Thay đổi mật khẩu</span>
              </a> */}
              <a className={styles.item} onClick={handleLogout}>
                {/* <div className={styles.icon}>
                  <img src="/static/assets/default/images/bx_log-out.png" alt="log-out" />
                </div> */}
                <span className={styles.txt}>Đăng xuất</span>
              </a>
            </div>
          </div>

          <div className={styles.accountRight}>
            <div className={styles.boxRight}>
              <div className={`${styles.titleRow} ${styles.dFlex} ${styles.spaceBetween}`}>
                <h2>Thông tin tài khoản</h2>
                <a className={styles.moreAll}>
                  <i className="fa-solid fa-wrench"></i>
                  &nbsp;Sửa đổi nội dung
                </a>
              </div>

              <form className={`${styles.dFlex} ${styles.flexWrap} ${styles.formInfo}`} onSubmit={handleSubmit}>
                <div className={`${styles.formInput} ${styles.w5}`}>
                  <div className={styles.label}>Họ và tên <span style={{ color: "red" }}>*</span></div>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Nhập tên của bạn"
                    value={form.fullname}
                    onChange={handleChange}
                  />
                  <div className={styles.noteError}></div>
                </div>

                <div className={`${styles.formInput} ${styles.w5}`}>
                  <div className={styles.label}>Email <span style={{ color: "red" }}>*</span></div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Nhập Email của bạn"
                    value={form.email}
                    onChange={handleChange}
                  />
                  <div className={styles.noteError}></div>
                </div>

                <div className={`${styles.formInput} ${styles.w5}`}>
                  <div className={styles.label}>Điện thoại <span style={{ color: "red" }}>*</span></div>
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Nhập số điện thoại của bạn"
                    value={form.mobile}
                    onChange={handleChange}
                  />
                  <div className={styles.noteError}></div>
                </div>

                <div className={`${styles.formInput} ${styles.w5}`}>
                  <div className={styles.label}>Tỉnh/Thành phố <span style={{ color: "red" }}>*</span></div>
                  <select name="province" value={form.province} onChange={handleChange}>
                    {provinces.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                  <div className={styles.noteError}></div>
                </div>

                {/* <div className={`${styles.formInput} ${styles.w5}`}>
                  <div className={styles.label}>Quận/Huyện <span style={{ color: "red" }}>*</span></div>
                  <select name="district" value={form.district} onChange={handleChange}>
                    <option value="">Chọn quận/Huyện</option>
                  </select>
                  <div className={styles.noteError}></div>
                </div>

                <div className={`${styles.formInput} ${styles.w5}`}>
                  <div className={styles.label}>Phường/Xã <span style={{ color: "red" }}>*</span></div>
                  <select name="ward" value={form.ward} onChange={handleChange}>
                    <option value="">Chọn Phường/Xã</option>
                  </select>
                  <div className={styles.noteError}></div>
                </div> */}

                <div className={`${styles.formInput} ${styles.address}`}>
                  <div className={styles.label}>Địa chỉ <span style={{ color: "red" }}>*</span></div>
                  <textarea
                    name="address"
                    rows="2"
                    placeholder="Nhập địa chỉ của bạn"
                    value={form.address}
                    onChange={handleChange}
                  ></textarea>
                  <div className={styles.noteError}></div>
                </div>

                <button type="submit" className={styles.btnSubmit}>
                  <span className={styles.txt}>Lưu thông tin</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;