import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../src/middlewares/authMiddleware.js';

const router = express.Router();

// Đường dẫn này được BẢO VỆ bởi middleware 'protect'
// Client phải gửi Token mới vào được đây
router.get('/profile', protect, getUserProfile);
router.post('/updateProfile', protect, getUserProfile);

export default router;