import db from '../config/db.js';

// Tạo đơn hàng mới
export const createOrder = async (orderData) => {
    const { userId, fullName, phone, address, totalMoney, items, note } = orderData;
    
    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction(); // Bắt đầu giao dịch

        // 1. Tạo dòng trong bảng orders
        const queryOrder = `
            INSERT INTO orders (user_id, full_name, phone_number, address, total_money, note)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [orderResult] = await connection.query(queryOrder, [
            userId, fullName, phone, address, totalMoney, note
        ]);
        const orderId = orderResult.insertId;

        // 2. Tạo các dòng trong bảng order_items
        // items là mảng: [{ productId: 1, quantity: 2, price: 20000 }, ...]
        const orderItemsData = items.map(item => [
            orderId, item.productId, item.quantity, item.price
        ]);

        const queryItems = `
            INSERT INTO order_items (order_id, product_id, quantity, price)
            VALUES ?
        `;
        await connection.query(queryItems, [orderItemsData]);

        // 3. (Tùy chọn) Trừ tồn kho (Stock)
        // Đoạn này hơi nâng cao, có thể làm sau nếu muốn đơn giản
        for (const item of items) {
            await connection.query(
                'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
                [item.quantity, item.productId]
            );
        }

        await connection.commit(); // Lưu lại
        connection.release();
        return orderId;

    } catch (error) {
        await connection.rollback(); // Hủy nếu lỗi
        connection.release();
        throw error;
    }
};

// Lấy lịch sử đơn hàng của 1 user
export const getOrdersByUserId = async (userId) => {
    const query = `
        SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC
    `;
    const [rows] = await db.query(query, [userId]);
    return rows;
};
