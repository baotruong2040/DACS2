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
import AdminLayout from './layout/AdminLayout';
import AdminProducts from './pages/AdminProducts';
import AdminUsers from './pages/AdminUsers';
import AdminProductForm from './pages/AdminProductForm';
import AdminUserForm from './pages/AdminUserForm';

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
      
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminProducts />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path='users/new' element={<AdminUserForm/>}/>

          <Route path="products/new" element={<AdminProductForm />} />
          <Route path="products/edit/:id" element={<AdminProductForm />} />
        </Route>
      </Routes>

      {/* <Footer /> */}
    </>
  );
}

export default App;