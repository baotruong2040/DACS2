// src/routes/orderRoutes.js
import express from 'express';
import { placeOrder, getMyOrders } from '../controllers/orderController.js';
import { protect } from '../src/middlewares/authMiddleware.js';

const orderRouter = express.Router();

// Các chức năng này đều yêu cầu đăng nhập -> Dùng middleware 'protect'
orderRouter.post('/', protect, placeOrder); // Tạo đơn hàng
orderRouter.get('/my-orders', protect, getMyOrders); // Xem lịch sử

export default orderRouter;