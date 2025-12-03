import express from 'express';
import { getUserProfile, updateUserProfile, getAllUsers } from '../controllers/userController.js';
import { protect, adminOnly } from '../src/middlewares/authMiddleware.js';

const router = express.Router();

// Đường dẫn này được BẢO VỆ bởi middleware 'protect'
// Client phải gửi Token mới vào được đây
router.get('/', protect, adminOnly, getAllUsers);
router.get('/profile', protect, getUserProfile);
router.put('/updateProfile', protect, updateUserProfile);

export default router;