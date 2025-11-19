import db from '../config/db.js';

export const getUserProfile = async (req, res) => {
    try {
        // req.user.id có được nhờ middleware 'protect'
        const userId = req.user.id;

        // Query DB
        const query = `
            SELECT id, email, full_name, phone_number, address, avatar_url, role, created_at 
            FROM users 
            WHERE id = ?
        `;
        const [rows] = await db.query(query, [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        res.json({
            message: 'Lấy thông tin thành công',
            user: rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};