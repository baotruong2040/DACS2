// src/controllers/orderController.js
import db from '../config/db.js';
import { createOrder, getOrdersByUserId } from '../models/orderModel.js';
import { getProductById } from '../models/productModel.js'; // Tái sử dụng hàm lấy sản phẩm

// --- API: Đặt hàng (Checkout) ---
export const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id; // Lấy từ Token
        const { fullName, phone, address, items, note } = req.body;
        // items dạng: [{ productId: 1, quantity: 2 }, { productId: 5, quantity: 1 }]

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'Giỏ hàng đang trống!' });
        }

        let calculatedTotal = 0;
        const orderItems = [];

        // 1. Duyệt qua từng món để lấy giá gốc từ DB (Bảo mật giá)
        for (const item of items) {
            const product = await getProductById(item.productId);
            
            if (!product) {
                return res.status(404).json({ message: `Sản phẩm ID ${item.productId} không tồn tại` });
            }
            
            if (product.stock_quantity < item.quantity) {
                return res.status(400).json({ message: `Sản phẩm ${product.name} đã hết hàng hoặc không đủ số lượng` });
            }

            const itemTotal = Number(product.price) * item.quantity;
            calculatedTotal += itemTotal;

            // Chuẩn bị dữ liệu để lưu
            orderItems.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.price // Lưu giá tại thời điểm mua
            });
        }

        // 2. Gọi Model để tạo đơn hàng
        const orderId = await createOrder({
            userId,
            fullName,
            phone,
            address,
            totalMoney: calculatedTotal,
            items: orderItems,
            note
        });

        res.status(201).json({
            message: 'Đặt hàng thành công!',
            orderId: orderId,
            totalMoney: calculatedTotal
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi đặt hàng', error: error.message });
    }
};

// --- API: Xem lịch sử đơn hàng ---
export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await getOrdersByUserId(userId);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi lấy danh sách đơn hàng' });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        // Join bảng orders với users để lấy email người mua
        // Join bảng order_items để đếm số lượng món (tùy chọn)
        const query = `
            SELECT o.*, u.email, u.full_name as account_name
            FROM orders o
            LEFT JOIN users u ON o.user_id = u.id
            ORDER BY o.created_at DESC
        `;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body; 

        // Danh sách trạng thái hợp lệ
        const validStatuses = ['pending', 'processing', 'shipping', 'delivered', 'cancelled'];
        
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Trạng thái không hợp lệ' });
        }

        await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);

        res.json({ message: 'Cập nhật trạng thái thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;

        // 1. Lấy thông tin chung của đơn hàng + thông tin user
        const queryOrder = `
            SELECT o.*, u.email, u.full_name as user_name
            FROM orders o
            LEFT JOIN users u ON o.user_id = u.id
            WHERE o.id = ?
        `;
        const [orders] = await db.query(queryOrder, [orderId]);

        if (orders.length === 0) {
            return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
        }

        // 2. Lấy danh sách sản phẩm trong đơn hàng (Join với bảng products để lấy tên, ảnh)
        const queryItems = `
            SELECT oi.*, p.name as product_name, p.thumbnail_url
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ?
        `;
        const [items] = await db.query(queryItems, [orderId]);

        // 3. Trả về kết quả gộp
        res.json({
            order: orders[0],
            items: items
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};