// Lấy giỏ hàng từ LocalStorage
export const getCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

// Thêm sản phẩm vào giỏ
export const addToCart = (product, quantity = 1) => {
    const cart = getCart();
    
    // Kiểm tra xem sản phẩm đã có trong giỏ chưa
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
        // Nếu có rồi -> Cộng dồn số lượng
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Nếu chưa -> Thêm mới
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price, // Giá bán thực tế (đã giảm)
            thumbnail_url: product.thumbnail_url,
            quantity: quantity
        });
    }

    // Lưu ngược lại vào LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Để cập nhật Header
    window.dispatchEvent(new Event('storage'));
};

// Xóa 1 sản phẩm
export const removeFromCart = (productId) => {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
};

// Tính tổng tiền
export const getCartTotal = () => {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const clearCart = () => {
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('storage'));
};

export const updateCartQuantity = (productId, newQuantity) => {
    const cart = getCart();
    const idx = cart.findIndex(item => item.id === productId);
    if (idx > -1) {
        cart[idx].quantity = Math.max(1, newQuantity); // không dưới 1
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
};