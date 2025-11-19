import express from 'express';
import { getProducts, getProductDetail, createNewProduct } from '../controllers/productController.js';
import { protect } from '../src/middlewares/authMiddleware.js';

const productRoutes = express.Router();

// Ai cũng xem được
productRoutes.get('/', getProducts); 
productRoutes.get('/:id', getProductDetail);

// Chỉ người đăng nhập mới được tạo (Tạm thời chưa check role Admin, chỉ check login)
productRoutes.post('/', protect, createNewProduct);

export default productRoutes;