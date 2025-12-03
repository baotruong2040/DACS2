import React from 'react';
import style from './styles/Header.module.css';
import { FaBars } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {

  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      <header className={style.header}>
        <div className={style['header-top']}>
          <div className={style['header-top-component']}><a href='/laptop-all'>Tất cả sản phẩm</a></div>
          <div className={style['header-top-component']}><a>(081) 903.106</a></div>
          <div className={style['header-top-component']}><a>laphupstore.dev.test@gmail.com</a></div>
        </div>
        <div className={style['header-mid']}>
          <div className={style['container']}>
            <div className={style['header-mid-containter']}>
              <a href="/" className={style.logo}>
                <img src="pictures/logo.png" alt="logo" width={165} height={80}/>
              </a>

              <div className={style.dropbox}>
                <FaBars className={style.farBars}/>
                <span className={`${style['dropbox-text']} ${style['txt-hover']}`}>DANH MỤC SẢN PHẨM</span>
                <RiArrowDropDownLine size={18}/>
              </div>

              <div className={style['search-bar']}>
                <div className={style['search-container']}>
                  <input type="text" className={style['search-input']} placeholder='Nhập sản phẩm cần tìm...'/>
                  <button type='submit' className={style['search-button']}>
                    <span>Tìm kiếm</span>
                    <FaSearch className={style.FaSearch} color='white' width={20} height={20}/>
                  </button>
                </div>
              </div>

              <div className={style['header-mid-right']}>
                {isAuthenticated ? (
                  <a href="/profile" className={style.users}>
                    <FaUser color='white'/>
                    <span className={`${style['users-span']} ${style['txt-hover']}`}>{user.full_name}</span>
                  </a>
                ) : (
                  <a href="/login" className={style.users}>
                  <FaUser color='white'/>
                  <span className={`${style['users-span']} ${style['txt-hover']}`}>Tài Khoản</span>
                </a>
                )}

                <a href="/" className={style.cart}>
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