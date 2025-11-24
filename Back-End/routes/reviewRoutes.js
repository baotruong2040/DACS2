// src/routes/reviewRoutes.js
import express from 'express';
import { addReview, getProductReviews } from '../controllers/reviewController.js';
import { protect } from '../src/middlewares/authMiddleware.js';

const reviewRoute = express.Router();

// Public: Ai cũng xem được review
reviewRoute.get('/:productId', getProductReviews);

// Private: Phải đăng nhập mới được viết review
reviewRoute.post('/', protect, addReview);

export default reviewRoute;