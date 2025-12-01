import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/productDetail';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/laptop-moi" element={<Products />} />

        <Route path="/:categorySlug" element={<Products />} />

        
        {/* Trang 404 (Nếu nhập linh tinh) */}
        <Route path="*" element={<div>Trang không tồn tại</div>} />
      </Routes>

      {/* <Footer /> */}
    </>
  );
}

export default App;