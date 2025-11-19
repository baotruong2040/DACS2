// src/controllers/productController.js
import { 
    getAllProducts, 
    getProductById, 
    createProduct, 
    countProducts 
} from '../models/productModel.js';

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

        const products = await getAllProducts(limit, offset);
        const total = await countProducts();

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

// --- API 3: Tạo sản phẩm mới ---
// (Giữ nguyên logic, nhưng bạn nên thêm reload lại trang danh sách để test)
export const createNewProduct = async (req, res) => {
    try {
        const { name, brand, price } = req.body;

        if (!name || !brand || !price) {
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