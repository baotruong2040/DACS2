import React from 'react';
// Import CSS Module
import styles from './styles/Footer.module.css';
// Import Icons (Cài: npm install react-icons)
import { FaFacebookF, FaInstagram, FaYoutube, FaShopify } from 'react-icons/fa';

// Dữ liệu mẫu cho các cột link (Giúp code HTML gọn hơn)
const footerLinks = [
  {
    title: "Danh Mục Sản Phẩm",
    links: [
      { name: "PC Gaming", url: "/gaming-pc.html" },
      { name: "Laptop Gaming", url: "/gaming-laptop.html" },
      { name: "VGA NVidia Rtx 5070", url: "/vga-nvidia-rtx-5070.html" },
      { name: "Ps5 Rẻ nhất Việt Nam", url: "/may-play-station-5.html" },
      { name: "VGA NVidia Rtx 5060", url: "/vga-rtx-5060.html" },
    ]
  },
  {
    title: "Thông Tin Chung",
    links: [
      { name: "Giới Thiệu", url: "/gioi-thieu" },
      { name: "Tuyển Dụng", url: "#" },
      { name: "Tin Tức", url: "/tin-tuc" },
      { name: "Ý Kiến Khách Hàng", url: "#" },
      { name: "Liên Hệ Hợp Tác", url: "/lien-he" },
    ]
  },
  {
    title: "Chính Sách",
    links: [
      { name: "Quy Định Chung", url: "#" },
      { name: "Chính Sách Vận Chuyển", url: "/chinh-sach-van-chuyen" },
      { name: "Chính Sách Bảo Hành", url: "/chinh-sach-bao-hanh" },
      { name: "Chính Sách Đổi Trả", url: "/chinh-sach-doi-tra" },
      { name: "Chính Sách Doanh Nghiệp", url: "/chinh-sach-doanh-nghiep" },
    ]
  },
  {
    title: "Thông Tin Hữu Ích",
    links: [
      { name: "Build PC", url: "/buildpc" },
      { name: "Hướng dẫn Build PC", url: "/huong-dan" },
      { name: "Tips Build PC", url: "/tips" },
      { name: "Sửa máy tại cửa hàng", url: "/cach-sua" },
    ]
  }
];

const Footer = () => {
  return (
    <footer className={styles.footer}>

      {/* --- Phần giữa: Main Links & Map --- */}
      <div className={styles.mainFooter}>
        <div className={styles.container}>
          <div className={styles.linkGrid}>
            {/* Render các cột Link từ dữ liệu mảng */}
            {footerLinks.map((col, index) => (
              <div key={index} className={styles.linkItem}>
                <h3 className={styles.title}>{col.title}</h3>
                <div className={styles.content}>
                  {col.links.map((link, idx) => (
                    <a key={idx} href={link.url}>{link.name}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>          
        </div>
      </div>

      <div className={styles.bottomFooter}>
        <div className={styles.container}>
          <div className={styles.flexBetween}>
            <p>© 2025 - Bản quyền của LapHub Store</p>
            <div className={styles.certs}>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;