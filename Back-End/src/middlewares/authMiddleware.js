import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const protect = (req, res, next) => {
    // 1. Lấy token từ Header (Authorization: Bearer <token>)
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Tách lấy phần token phía sau chữ "Bearer "
            token = req.headers.authorization.split(' ')[1];

            // 2. Kiểm tra Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Nếu ngon lành, lưu thông tin user vào biến req.user
            // Để các hàm phía sau (Controller) biết ai đang gọi API
            req.user = decoded; 
            
            // Cho phép đi tiếp
            next(); 
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Bạn chưa đăng nhập (Không có Token)!' });
    }
};

// Middleware phân quyền Admin (Dùng cho sau này)
export const adminOnly = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'staff')) {
        next();
    } else {
        res.status(403).json({ message: 'Bạn không có quyền truy cập (Admin only)!' });
    }
};