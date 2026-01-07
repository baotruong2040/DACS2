import express from 'express';
import { getUserProfile, updateUserProfile, getAllUsers, createUser, changeUserRole, adminResetPassword, deleteUser } from '../controllers/userController.js';
import { protect, adminOnly } from '../src/middlewares/authMiddleware.js';

const router = express.Router();

// Đường dẫn này được BẢO VỆ bởi middleware 'protect'
// Client phải gửi Token mới vào được đây
router.get('/', protect, adminOnly, getAllUsers);
router.get('/profile', protect, getUserProfile);
router.put('/updateProfile', protect, updateUserProfile);


router.get('/', protect, adminOnly, getAllUsers);           // Xem list
router.post('/', protect, adminOnly, createUser);           // Thêm mới
router.put('/:id/role', protect, adminOnly, changeUserRole); // Đổi quyền
router.put('/:id/password', protect, adminOnly, adminResetPassword);
router.delete('/:id', protect, adminOnly, deleteUser);

export default router;