import db from '../config/db.js';

// 1. Lấy tất cả sản phẩm
export const getAllProducts = async (limit, offset, filters = {}, categorySlug = null, searchKeyword = null) => {
    const { brands, minPrice, maxPrice } = filters || {};    
    
    let query = `
        SELECT p.*, c.name as category_name 
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE 1=1 
    `;
    const params = [];

    // Lọc theo Từ khóa tìm kiếm
    if (searchKeyword) {
        query += ` AND p.name LIKE ? `;
        params.push(`%${searchKeyword}%`);
    }

    // Lọc theo danh mục
    if (categorySlug) {
        query += ` AND c.slug = ? `;
        params.push(categorySlug);
    }

    // Lọc theo Hãng
    if (brands && brands.length > 0) {
        const placeholders = brands.map(() => '?').join(',');
        query += ` AND p.brand IN (${placeholders}) `;
        params.push(...brands);
    }

    // Lọc theo Giá
    if (minPrice !== undefined && maxPrice !== undefined) {
        query += ` AND p.price BETWEEN ? AND ? `;
        params.push(minPrice, maxPrice);
    } else if (minPrice !== undefined) {
        query += ` AND p.price >= ? `;
        params.push(minPrice);
    }

    query += ` ORDER BY p.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [rows] = await db.query(query, params);
    return rows;
};

// 2. Đếm sản phẩm
export const countProducts = async (categorySlug, filters = {}, searchKeyword = null) => {
    const { brands, minPrice, maxPrice } = filters || {};
    
    let query = `
        SELECT COUNT(*) as total 
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE 1=1 
    `;
    const params = [];

    // Lọc theo Từ khóa tìm kiếm
    if (searchKeyword) {
        query += ` AND p.name LIKE ? `;
        params.push(`%${searchKeyword}%`);
    }

    if (categorySlug) {
        query += ` AND c.slug = ? `;
        params.push(categorySlug);
    }

    // Copy logic lọc hãng/giá xuống đây như cũ...
    if (brands && brands.length > 0) {
        const placeholders = brands.map(() => '?').join(',');
        query += ` AND p.brand IN (${placeholders}) `;
        params.push(...brands);
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
        query += ` AND p.price BETWEEN ? AND ? `;
        params.push(minPrice, maxPrice);
    } else if (minPrice !== undefined) {
        query += ` AND p.price >= ? `;
        params.push(minPrice);
    }

    const [rows] = await db.query(query, params);
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
        name, brand, description, 
        specs, stock_quantity, thumbnail_url, images, 
        categoryId, 
        old_price, discount_percentage, badge
    } = product;

    let finalPrice = old_price;
    if (discount_percentage > 0) {
        finalPrice = old_price * (1 - discount_percentage / 100);
    }

    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction();

        // 1. Insert bảng products
        const specsJson = JSON.stringify(specs);

        const slug = slugify(name) + '-' + Date.now();

        const queryProduct = `
            INSERT INTO products (
                name, slug, brand, 
                price, old_price, discount_percentage, badge,
                description, specs, stock_quantity, thumbnail_url, 
                category_id -- <--- THÊM CỘT NÀY VÀO SQL
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const [result] = await connection.query(queryProduct, [
            name, slug, brand, 
            finalPrice, old_price, discount_percentage, badge,
            description, specsJson, stock_quantity, thumbnail_url, 
            categoryId // <--- THÊM GIÁ TRỊ VÀO CUỐI
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

export const updateProductById = async (id, product) => {
    const { 
        name, brand, description, specs, stock_quantity, thumbnail_url, 
        categoryId, old_price, discount_percentage, badge,
        images // Mảng ảnh mới từ frontend
    } = product;

    // 1. Tính toán lại giá bán
    let finalPrice = old_price;
    if (discount_percentage > 0) {
        finalPrice = old_price * (1 - discount_percentage / 100);
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // 2. Cập nhật bảng products
        const specsJson = JSON.stringify(specs);
        // Logic slug: Tên mới -> Slug mới (để SEO tốt hơn)
        const slugify = (text) => text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
        const slug = slugify(name) + '-' + Date.now();

        const queryUpdate = `
            UPDATE products 
            SET name=?, slug=?, brand=?, price=?, old_price=?, discount_percentage=?, badge=?, 
                description=?, specs=?, stock_quantity=?, thumbnail_url=?, category_id=?
            WHERE id=?
        `;
        
        await connection.query(queryUpdate, [
            name, slug, brand, finalPrice, old_price, discount_percentage, badge, 
            description, specsJson, stock_quantity, thumbnail_url, categoryId, 
            id
        ]);

        // 3. Cập nhật bảng product_images (Gallery)
        // Cách xử lý: Nếu có gửi mảng images lên, ta Xóa hết ảnh cũ -> Thêm ảnh mới
        if (images && Array.isArray(images)) {
            // Xóa cũ
            await connection.query('DELETE FROM product_images WHERE product_id = ?', [id]);

            // Thêm mới (nếu mảng không rỗng)
            if (images.length > 0) {
                const imageValues = images.map((url, index) => [id, url, index]);
                await connection.query(
                    'INSERT INTO product_images (product_id, image_url, display_order) VALUES ?', 
                    [imageValues]
                );
            }
        }

        await connection.commit();
        connection.release();
        return true;

    } catch (error) {
        await connection.rollback();
        connection.release();
        throw error;
    }
};

export const getProductId = async (slug) => {
    const [productRows] = await db.query('SELECT * FROM products WHERE slug = ?', [slug]);
    const product = productRows[0];

    if (!product) return null;

    const product_id = product.id;

    return product_id;
};