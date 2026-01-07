// src/controllers/productController.js
import { 
    getAllProducts, 
    getProductById, 
    createProduct, 
    countProducts,
    updateProductById,
    getProductId
} from '../models/productModel.js';
import db from '../config/db.js';

// Hàm phụ trợ: Parse specs từ chuỗi sang JSON Object
const parseProductSpecs = (product) => {
    if (!product) return null;
    // Nếu specs là chuỗi, parse nó ra. Nếu đã là object thì giữ nguyên.
    if (product.specs && typeof product.specs === 'string') {
        try {
            product.specs = JSON.parse(product.specs);
        } catch (e) {
            console.error("Lỗi parse JSON specs:", e);
            product.specs = {}; // Fallback nếu lỗi
        }
    }
    return product;
};

// --- API 1: Lấy danh sách sản phẩm ---
export const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const searchKeyword = req.query.search || null;

        // Lấy slug category từ URL (VD: ?category=laptop-gaming)
        const categorySlug = req.query.category || null;
        const filters = {};
        if (req.query.brand) {
            filters.brands = req.query.brand.split(','); 
        }
        if (req.query.price) {
            const [min, max] = req.query.price.split('-');
            filters.minPrice = Number(min);
            if (max) filters.maxPrice = Number(max);
        }
        const products = await getAllProducts(limit, offset, filters, categorySlug, searchKeyword);
        const total = await countProducts(categorySlug, filters, searchKeyword);

        // DUYỆT QUA TỪNG SẢN PHẨM ĐỂ PARSE SPECS
        const parsedProducts = products.map(product => parseProductSpecs(product));

        res.json({
            message: 'Lấy danh sách thành công',
            data: parsedProducts, // Trả về dữ liệu đã xử lý
            pagination: {
                current_page: page,
                total_pages: Math.ceil(total / limit),
                total_items: total
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// --- API 2: Lấy chi tiết sản phẩm ---
export const getProductDetail = async (req, res) => {
    try {
        const id = req.params.id;
        const rawProduct = await getProductById(id);

        if (!rawProduct) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }

        // XỬ LÝ PARSE TRƯỚC KHI TRẢ VỀ
        const product = parseProductSpecs(rawProduct);

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

export const getProductIdBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const product_id = await getProductId(slug);
        if (!product_id) {
            return res.status(404).json({message: 'Không tìm tháy sản phẩm'})
        }

        res.json({product_id});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
}

// --- API 3: Tạo sản phẩm mới ---
export const createNewProduct = async (req, res) => {
    try {
        const { name, brand, old_price } = req.body;

        if (!name || !brand || !old_price) {
            return res.status(400).json({ message: 'Thiếu thông tin bắt buộc!' });
        }

        const newId = await createProduct(req.body);

        res.status(201).json({ 
            message: 'Tạo sản phẩm thành công', 
            productId: newId 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi tạo sản phẩm' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
        res.json({ message: 'Đã xóa sản phẩm' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi xoá sản phẩm' });
    }
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, brand, old_price } = req.body;

        // Validate cơ bản
        if (!name || !brand || !old_price) {
            return res.status(400).json({ message: 'Thiếu thông tin bắt buộc!' });
        }

        // Gọi Model
        await updateProductById(id, req.body);

        res.json({ message: 'Cập nhật sản phẩm thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi cập nhật sản phẩm' });
    }
};