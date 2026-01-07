import db from '../config/db.js';

export const findUserByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

export const saveVerificationCode = async (email, code, type) => {
    await db.query('DELETE FROM verification_codes WHERE email = ? AND type = ?', [email, type]);
    
    const query = `
        INSERT INTO verification_codes (email, code, type, expires_at) 
        VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 5 MINUTE))
    `;
    await db.query(query, [email, code, type]);
};

export const getVerificationCode = async (email, code, type) => {
    const query = `
        SELECT * FROM verification_codes 
        WHERE email = ? AND code = ? AND type = ? AND expires_at > NOW()
    `;
    const [rows] = await db.query(query, [email, code, type]);
    return rows[0];
};

export const deleteVerificationCode = async (email, type) => {
    await db.query('DELETE FROM verification_codes WHERE email = ? AND type = ?', [email, type]);
};

export const createUser = async (user) => {
    const { email, password_hash, full_name } = user;
    const query = `
        INSERT INTO users (email, password_hash, full_name, is_verified, role, is_locked) 
        VALUES (?, ?, ?, TRUE, 'customer', FALSE)
    `;
    const [result] = await db.query(query, [email, password_hash, full_name]);
    return result.insertId; // Trả về ID của user vừa tạo
};