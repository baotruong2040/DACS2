import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Sliders from './components/Sliders';
import Products from './pages/Products';
import ProductDetail from './pages/productDetail';
import NotFound from './pages/NotFound';
import LogoSlider from './components/LogoSlider';
import Login from './pages/Login';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/laptop-all" element={<Products />} />
        
        <Route path="/login" element={<Login />} />


        <Route path="/:categorySlug" element={<Products />} />

        
        {/* Trang 404 (Nếu nhập linh tinh) */}
        <Route path="*" element={<NotFound/>} />
      </Routes>

      {/* <Footer /> */}
    </>
  );
}

export default App;