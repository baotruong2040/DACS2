import db from '../config/db.js';

// 1. Lấy tất cả sản phẩm
export const getAllProducts = async (limit = 12, offset = 0) => {
    // Lấy thêm tổng số dòng để làm phân trang
    const query = `
        SELECT * FROM products 
        ORDER BY created_at DESC 
        LIMIT ? OFFSET ?
    `;
    const [rows] = await db.query(query, [limit, offset]);
    return rows;
};

// 2. Đếm tổng số sản phẩm (Để tính số trang)
export const countProducts = async () => {
    const [rows] = await db.query('SELECT COUNT(*) as total FROM products');
    return rows[0].total;
};

// 3. Lấy chi tiết 1 sản phẩm theo ID
export const getProductById = async (id) => {
    // 1. Lấy thông tin chính
    const [productRows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    const product = productRows[0];

    if (!product) return null;

    // 2. Lấy danh sách ảnh gallery
    const [imageRows] = await db.query('SELECT image_url FROM product_images WHERE product_id = ? ORDER BY display_order ASC', [id]);
    
    // Gộp vào object product
    // Kết quả sẽ có dạng: product.images = ["url1.jpg", "url2.jpg"]
    product.images = imageRows.map(row => row.image_url); //ko hiu lam

    return product;
};

// Hàm tạo slug đơn giản (Tiếng Việt -> Không dấu -> Gạch nối)
const slugify = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Thay khoảng trắng bằng dấu gạch ngang
        .replace(/[^\w\-]+/g, '')       // Xóa các ký tự đặc biệt (trừ gạch ngang)
        .replace(/\-\-+/g, '-')         // Xóa gạch ngang kép
        .replace(/^-+/, '')             // Cắt gạch ngang đầu
        .replace(/-+$/, '');            // Cắt gạch ngang cuối
};

export const createProduct = async (product) => {
    const { 
        name, brand, price, description, 
        specs, stock_quantity, thumbnail_url,
        images // <--- Mảng chứa các URL ảnh phụ: ["url1", "url2"]
    } = product;

    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction();

        // 1. Insert bảng products
        const specsJson = JSON.stringify(specs);

        const slug = slugify(name) + '-' + Date.now();

        const queryProduct = `
            INSERT INTO products (name, slug, brand, price, description, specs, stock_quantity, thumbnail_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await connection.query(queryProduct, [
            name, slug, brand, price, description, specsJson, stock_quantity, thumbnail_url
        ]);
        const newProductId = result.insertId;

        // 2. Insert bảng product_images
        if (images && images.length > 0) {
            const imageValues = images.map((url, index) => [newProductId, url, index]);
            // Insert nhiều dòng một lúc
            await connection.query(
                'INSERT INTO product_images (product_id, image_url, display_order) VALUES ?', 
                [imageValues]
            );
        }

        await connection.commit(); // Lưu tất cả thay đổi
        connection.release();      // Trả kết nối về pool
        
        return newProductId;

    } catch (error) {
        await connection.rollback(); // Nếu lỗi thì hủy hết (không tạo sản phẩm rác)
        connection.release();
        throw error;
    }
};
