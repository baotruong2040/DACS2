import React from 'react';
import './styles/Header.css';

// Icon mũi tên phải (Chevron Right) dùng cho từng item trong menu
const IconChevronRight = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
);

// ... (Giữ nguyên các Icon cũ: IconSearch, IconUser, IconCart, IconMenu) ...
const IconSearch = () => (<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>);
const IconUser = () => (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>);
const IconCart = () => (<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>);
const IconMenu = () => (<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>);

const Header = () => {
  // Danh sách danh mục giống trong ảnh
  const categories = [
    "Xây dựng cấu hình PC",
    "PC Gaming",
    "PC Đồ Họa - Thiết Kế - Edit video",
    "Core Ultra (CPU, PC và Laptop)",
    "PC AMD",
    "PC AI",
    "Laptop - Máy Tính Xách Tay",
    "Màn Hình Máy Tính",
    "Máy chơi game - Console",
    "Tay Cầm Chơi Game",
    "VGA - Card màn hình",
    "Linh kiện máy tính",
    "Gaming Gears"
  ];

  return (
    <header className="header-wrapper">
      <div className="container">
        
        {/* 1. LOGO */}
        <div className="logo">LHT</div>

        {/* 2. CATEGORY DROPDOWN */}
        <div className="category-dropdown">
          <div className="cat-btn">
            <IconMenu />
            <span>Danh mục sản phẩm</span>
            <span style={{fontSize: '10px'}}>▼</span>
          </div>
          
          {/* Dropdown Content mới */}
          <div className="dropdown-menu">
            {categories.map((cat, index) => (
              <a href="#" className="dropdown-item" key={index}>
                <span>{cat}</span>
                <IconChevronRight />
              </a>
            ))}
          </div>
        </div>

        {/* 3. SEARCH BOX */}
        <div className="search-box">
          <input type="text" className="search-input" placeholder="Nhập sản phẩm cần tìm..." />
          <button className="search-btn">Tìm kiếm <IconSearch /></button>
        </div>

        {/* 4. ACTIONS */}
        <div className="header-actions">
          <div className="action-item">
            <IconUser />
            <span>Tài khoản</span>
          </div>
          <div className="action-item">  
            <span className='icon-cart'><IconCart /></span>
            <span className="cart-badge">0</span>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;