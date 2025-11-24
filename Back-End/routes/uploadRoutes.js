import express from 'express';
import upload from '../src/middlewares/uploadMiddleware.js';
import { uploadFile } from '../controllers/uploadController.js';

const router = express.Router();

// Route dùng chung cho cả User và Product
// Key gửi lên form-data là 'image'
router.post('/', upload.single('image'), uploadFile);

export default router;