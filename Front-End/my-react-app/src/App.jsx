import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Sliders from './components/Sliders';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import LogoSlider from './components/LogoSlider';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyRegister from './pages/VerifyRegister';
import AdminLayout from './layout/AdminLayout';
import AdminProducts from './pages/AdminProducts';
import AdminUsers from './pages/AdminUsers';
import AdminProductForm from './pages/AdminProductForm';
import AdminUserForm from './pages/AdminUserForm';
import AdminOrders from './pages/AdminOrders';
import AdminOrderDetail from './pages/AdminOrderDetail';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<Header />} />
        <Route path="/laptop-all" element={<Products />} />
        
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/verify' element={<VerifyRegister/>}/>

        <Route path="/:categorySlug" element={<Products />} />

        <Route path='/laptop/:productSlug' element={<ProductDetail/>} />

        <Route path='/cart' element={<Cart/>}/>\
        <Route path='/checkout' element={<Checkout/>}/>

        <Route path="*" element={<NotFound/>} />
      
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminProducts />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path='users/new' element={<AdminUserForm/>}/>

          <Route path="products/new" element={<AdminProductForm />} />
          <Route path="products/edit/:id" element={<AdminProductForm />} />

          <Route path='orders' element={<AdminOrders/>} />
          <Route path='orders/:id' element={<AdminOrderDetail/>}/>
        </Route>
      </Routes>

    </>
  );
}

export default App;