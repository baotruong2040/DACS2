import db from '../config/db.js';
import bcrypt from 'bcrypt';

export const getUserProfile = async (req, res) => {
    try {
        // req.user.id có được nhờ middleware 'protect'
        const userId = req.user.id;

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

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { full_name, phone_number, address, avatar_url } = req.body;

        const query = `
            UPDATE users 
            SET full_name = ?, phone_number = ?, address = ?, avatar_url = ?
            WHERE id = ?
        `;

        await db.query(query, [full_name, phone_number, address, avatar_url, userId]);

        res.json({ message: 'Cập nhật thông tin thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const query = `SELECT id, full_name, email, role, avatar_url, created_at, is_locked FROM users WHERE is_deleted = FALSE ORDER BY created_at DESC`;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// [ADMIN] TẠO USER
export const createUser = async (req, res) => {
    try {
        const { full_name, email, password, role } = req.body;

        // Check email trùng
        const [exists] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (exists.length > 0) return res.status(400).json({ message: 'Email đã tồn tại' });

        // Hash mật khẩu
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const query = `
            INSERT INTO users (full_name, email, password_hash, role, is_verified) 
            VALUES (?, ?, ?, ?, 1)
        `;
        await db.query(query, [full_name, email, passwordHash, role || 'customer']);

        res.status(201).json({ message: 'Tạo tài khoản thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// 3. [ADMIN] ĐỔI ROLE
export const changeUserRole = async (req, res) => {
    try {
        const userId = req.params.id;
        const { role } = req.body; // 'admin', 'staff', 'customer'

        if (req.user.id == userId) return res.status(400).json({ message: 'Không được tự đổi quyền chính mình' });

        await db.query('UPDATE users SET role = ? WHERE id = ?', [role, userId]);
        res.json({ message: 'Cập nhật quyền thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// 4. [ADMIN] ĐỔI MẬT KHẨU CHO USER
export const adminResetPassword = async (req, res) => {
    try {
        const userId = req.params.id;
        const { newPassword } = req.body;

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ message: 'Mật khẩu phải từ 6 ký tự' });
        }

        // Mã hóa mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newPassword, salt);

        await db.query('UPDATE users SET password_hash = ? WHERE id = ?', [passwordHash, userId]);
        res.json({ message: 'Đổi mật khẩu thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};