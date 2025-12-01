import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import db from '../config/db.js';
import dotenv from 'dotenv';
import authRoutes from '../routes/authRoutes.js';
import userRoutes from '../routes/userRoutes.js';
import productRoutes from '../routes/productRoutes.js';
import orderRouter from '../routes/orderRoutes.js';
import reviewRoute from '../routes/reviewRoutes.js';
import uploadRoutes from '../routes/uploadRoutes.js';
import categoryRoutes from '../routes/categoryRoutes.js'

dotenv.config();
//STUFF IDK
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//EXPRESS
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send('Server is running');
});

//Public thư mục ảnh
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Route
app.use('/api/auth', authRoutes);           //Login, Register
app.use('/api/users', userRoutes);          //Profile, Change info
app.use('/api/products', productRoutes);    //CRUD Products
app.use("/api/orders", orderRouter);        //Make order, Get order history
app.use("/api/reviews", reviewRoute);       //User make review, Show star
app.use('/api/upload', uploadRoutes);       //Upload images
app.use('/api/categories', categoryRoutes);   //Get All Categories 

// Test Database Connection
app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        res.json({ 
            message: 'Database connected!', 
            calculation: rows[0].result 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in db connection', error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is runing at: http://localhost:${PORT}`);
});