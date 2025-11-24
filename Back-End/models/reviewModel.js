// src/models/reviewModel.js
import db from '../config/db.js';

// 1. Kiểm tra điều kiện review
export const checkUserBoughtProduct = async (userId, productId) => {
    // Logic: Tìm trong bảng order_items, nối với bảng orders
    // Điều kiện: user_id đúng, product_id đúng, và status đơn hàng là 'delivered'
    const query = `
        SELECT oi.id 
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        WHERE o.user_id = ? 
          AND oi.product_id = ? 
          AND o.status = 'delivered'
        LIMIT 1
    `;
    const [rows] = await db.query(query, [userId, productId]);
    return rows.length > 0; // Trả về true nếu tìm thấy
};

// 2. Tạo review mới
export const createReview = async (userId, productId, rating, comment) => {
    const query = `
        INSERT INTO reviews (user_id, product_id, rating, comment)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [userId, productId, rating, comment]);
    return result.insertId;
};

// 3. Lấy danh sách review của 1 sản phẩm (Kèm thông tin người post)
export const getReviewsByProduct = async (productId) => {
    const query = `
        SELECT r.*, u.full_name, u.avatar_url 
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        WHERE r.product_id = ?
        ORDER BY r.created_at DESC
    `;
    const [rows] = await db.query(query, [productId]);
    return rows;
};