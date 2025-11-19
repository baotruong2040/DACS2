import bcrypt from 'bcrypt';
import { findUserByEmail, saveVerificationCode, getVerificationCode, deleteVerificationCode, createUser} from '../models/userModel.js';
import { sendEmail } from '../src/utils/mailer.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { email, password, full_name } = req.body;

        if (!email || !password || !full_name) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin!' });
        }

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Email này đã được sử dụng!' });
        }

        //random code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();


        await saveVerificationCode(email, verificationCode, 'register');

        const emailSubject = 'Mã xác thực đăng ký - Laptop Store';
        const emailBody = `
            <h3>Xin chào ${full_name},</h3>
            <p>Cảm ơn bạn đã đăng ký tài khoản.</p>
            <p>Mã xác thực của bạn là: <b style="font-size: 24px; color: blue;">${verificationCode}</b></p>
            <p>Mã này sẽ hết hạn sau 5 phút.</p>
        `;

        const isSent = await sendEmail(email, emailSubject, emailBody);

        if (!isSent) {
            return res.status(500).json({ message: 'Lỗi khi gửi email xác thực.' });
        }

        res.status(200).json({ 
            message: 'Mã xác thực đã được gửi đến email của bạn.',
            email: email
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
    
};
export const verifyRegister = async (req, res) => {
    try {
        const { email, code, full_name, password } = req.body;

        // 1.
        const validCode = await getVerificationCode(email, code, 'register');
        if (!validCode) {
            return res.status(400).json({ message: 'Mã xác thực không đúng hoặc đã hết hạn!' });
        }

        // 2.
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 3.
        await createUser({
            email,
            password_hash: passwordHash,
            full_name
        });

        // 4.
        await deleteVerificationCode(email, 'register');

        res.status(201).json({ message: 'Đăng ký tài khoản thành công! Hãy đăng nhập.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi xác thực', error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1.
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng!' });
        }

        // 2.
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng!' });
        }

        // 3.
        const payload = {
            id: user.id,
            role: user.role
        };
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN // Hết hạn sau 1 ngày
        });

        // 4.
        res.status(200).json({
            message: 'Đăng nhập thành công',
            token,
            user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                role: user.role,
                avatar: user.avatar_url
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi đăng nhập', error: error.message });
    }
};