// src/controllers/reviewController.js
import { checkUserBoughtProduct, createReview, getReviewsByProduct } from '../models/reviewModel.js';

// --- POST: Gửi đánh giá ---
export const addReview = async (req, res) => {
    try {
        const userId = req.user.id; // Lấy từ Token
        const { productId, rating, comment } = req.body;

        // 1. Validate dữ liệu
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Điểm đánh giá phải từ 1 đến 5' });
        }

        // 2. Kiểm tra quyền đánh giá (Logic nghiệp vụ quan trọng)
        const canReview = await checkUserBoughtProduct(userId, productId);
        if (!canReview) {
            return res.status(403).json({ 
                message: 'Bạn chưa mua sản phẩm này hoặc đơn hàng chưa được giao thành công!' 
            });
        }

        // 3. Lưu đánh giá (Có thể check thêm: 1 user chỉ được review 1 lần/sản phẩm nếu muốn)
        await createReview(userId, productId, rating, comment);

        res.status(201).json({ message: 'Cảm ơn bạn đã đánh giá sản phẩm!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server khi đánh giá' });
    }
};

// --- GET: Xem đánh giá của sản phẩm ---
export const getProductReviews = async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviews = await getReviewsByProduct(productId);
        
        // Tính điểm trung bình (VD: 4.5 sao) để Frontend hiển thị
        // (Nếu mảng rỗng thì trả về 0)
        const totalRating = reviews.reduce((sum, item) => sum + item.rating, 0);
        const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;

        res.json({
            data: reviews,
            stats: {
                total_reviews: reviews.length,
                average_rating: parseFloat(averageRating)
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi lấy đánh giá' });
    }
};