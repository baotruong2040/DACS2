import express from 'express';
import { register, verifyRegister, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify', verifyRegister);
router.post('/login', login);


export default router;