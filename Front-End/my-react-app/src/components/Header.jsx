import React from 'react';
import { useState } from 'react';
import style from './styles/Header.module.css';
import { FaBars, FaTimes } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdArrowForwardIos } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const categories = [
    {
      id: 1,
      name: "Laptop Gaming",
      slug: "/laptop-gaming",
      subCategories: ["Acer", "Asus", "Dell", "Lenovo", "MSI"]
    },
    {
      id: 2,
      name: "Laptop Sinh Viên",
      slug: "/laptop-sinh-vien",
      subCategories: ["Acer", "Asus", "Dell", "Lenovo", "MSI"]
    },
    {
      id: 3,
      name: "Laptop Văn Phòng",
      slug: "/laptop-van-phong",
      subCategories: ["Acer", "Asus", "Dell", "Lenovo", "MSI"]
    },
    {
      id: 3,
      name: "Laptop AI",
      slug: "/laptop-ai",
      subCategories: ["Acer", "Asus", "Dell", "Lenovo", "MSI"]
    },
    {
      id: 3,
      name: "Laptop Nhập Khẩu",
      slug: "/laptop-nhap-khau",
      subCategories: ["Acer", "Asus", "Dell", "Lenovo", "MSI"]
    }
  ];
  const handleSearch = () => {
    if (keyword.trim()) {
      // Chuyển hướng sang trang products kèm query search
      navigate(`/laptop-all?search=${encodeURIComponent(keyword)}`);
      setKeyword(''); // Xóa ô tìm kiếm sau khi enter (tùy chọn)
    }
  };

  // Xử lý khi nhấn Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className={style.header}>
        <div className={style['header-top']}>
          <div className={style['header-top-component']}><a href='/laptop-all' className={style['txt-hover']}>Tất cả sản phẩm</a></div>
          <div className={style['header-top-component']}><a className={style['txt-hover']}>(081) 903.106</a></div>
          <div className={style['header-top-component']}><a className={style['txt-hover']}>laphupstore.dev.test@gmail.com</a></div>
        </div>
        <div className={style['header-mid']}>
          <div className={style['container']}>
            <div className={style['header-mid-containter']}>
              <button className={style['menu-toggle']} onClick={toggleMenu}>
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>

              <a href="/" className={style.logo}>
                <img src="\public\pictures\logo.png" alt="logo" width={165} height={80}/>
              </a>

              <div className={`${style.dropbox} ${menuOpen ? style.active : ''}`}>
                <FaBars className={style.farBars}/>
                <span className={`${style['dropbox-text']} ${style['txt-hover']}`}>DANH MỤC SẢN PHẨM</span>
                <RiArrowDropDownLine size={18}/>

                <div className={style.dropdown}>
                  <ul>
                    {categories.map((item => (
                      <li key={item.id} onClick={() => { navigate(item.slug); setMenuOpen(false); }} className={style['dropdown-li']}> <p className={style['txt-hover']}>{item.name}</p> <span><MdArrowForwardIos/></span></li>
                    )))}
                  </ul>
                </div>
              </div>

              <div className={`${style.overlay} ${menuOpen ? style.active : ''}`} onClick={() => setMenuOpen(false)}></div>

              <div className={style['search-bar']}>
                <div className={style['search-container']}>
                  <input type="text" className={style['search-input']} placeholder='Nhập sản phẩm cần tìm...'onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyPress}/>
                  <button type='submit' className={style['search-button']} onClick={handleSearch}>
                    <span>Tìm kiếm</span>
                    <FaSearch className={style.FaSearch} color='white' width={20} height={20}/>
                  </button>
                </div>
              </div>

              <div className={style['header-mid-right']}>
                {isAuthenticated ? (
                  <a href="/profile" className={style.users}>
                    <FaUser color='white'/>
                    <span className={`${style['users-span']} ${style['txt-hover']}`}> <p>{user.full_name}</p> </span>
                  </a>
                ) : (
                  <a href="/login" className={style.users}>
                  <FaUser color='white'/>
                  <span className={`${style['users-span']} ${style['txt-hover']}`}>Tài Khoản</span>
                </a>
                )}

                <a href="/cart" className={style.cart}>
                  <FaShoppingCart color='white'/>
                  <span className={style['cart-counter']}>0</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;