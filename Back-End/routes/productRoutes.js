import express from 'express';
import { getProducts, getProductDetail, createNewProduct, deleteProduct, updateProduct, getProductIdBySlug } from '../controllers/productController.js';
import { protect } from '../src/middlewares/authMiddleware.js';

const productRoutes = express.Router();

productRoutes.get('/', getProducts); 
productRoutes.get('/:id', getProductDetail);
productRoutes.get('/slug/:slug', getProductIdBySlug);

productRoutes.post('/', protect, createNewProduct);
productRoutes.put('/:id', protect, updateProduct)
productRoutes.delete('/:id', protect, deleteProduct);
export default productRoutes;