import express from 'express';
import { getUserProfile } from '../controllers/userController.js';
import { protect } from '../src/middlewares/authMiddleware.js'; // Import middleware

const router = express.Router();

// Đường dẫn này được BẢO VỆ bởi middleware 'protect'
// Client phải gửi Token mới vào được đây
router.get('/profile', protect, getUserProfile);

export default router;