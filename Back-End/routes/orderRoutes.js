// src/routes/orderRoutes.js
import express from 'express';
import { placeOrder, getMyOrders, getAllOrders, updateOrderStatus, getOrderById } from '../controllers/orderController.js';
import { protect, adminOnly } from '../src/middlewares/authMiddleware.js';

const orderRouter = express.Router();

// User
orderRouter.post('/', protect, placeOrder); // Tạo đơn hàng
orderRouter.get('/my-orders', protect, getMyOrders); // Xem lịch sử

// Admin
orderRouter.get('/admin/all', protect, getAllOrders);
orderRouter.get('/admin/:id', protect, getOrderById);
orderRouter.put('/:id/status', protect, updateOrderStatus);

export default orderRouter;