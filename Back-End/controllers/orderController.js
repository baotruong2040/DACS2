// src/controllers/orderController.js
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