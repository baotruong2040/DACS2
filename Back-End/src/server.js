import express from 'express';
import cors from 'cors';
import db from '../config/db.js';
import dotenv from 'dotenv';
import authRoutes from '../routes/authRoutes.js';
import userRoutes from '../routes/userRoutes.js';
import productRoutes from '../routes/productRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Test Route ---
app.get('/', (req, res) => {
    res.send('Server is running');
});

// --- Route ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// --- Test Database Connection ---
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