# API Documentation

**Base URL:** `http://localhost:5000/api`

## **1. Authentication (`/auth`)**
Defined in: `routes/authRoutes.js` & `controllers/authController.js`

### **Register (Step 1)**
Sends a verification code to the user's email.
*   **Endpoint:** `POST /auth/register`
*   **Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "password123",
      "full_name": "Nguyen Van A"
    }
    ```
*   **Response:**
    ```json
    {
      "message": "Mã xác thực đã được gửi đến email của bạn.",
      "email": "user@example.com"
    }
    ```

### **Verify & Create Account (Step 2)**
Verifies the email code and actually creates the user in the database.
*   **Endpoint:** `POST /auth/verify`
*   **Body:**
    ```json
    {
      "email": "user@example.com",
      "code": "123456",
      "full_name": "Nguyen Van A",
      "password": "password123"
    }
    ```
*   **Response:**
    ```json
    { "message": "Đăng ký tài khoản thành công! Hãy đăng nhập." }
    ```

### **Login**
*   **Endpoint:** `POST /auth/login`
*   **Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
*   **Response:**
    ```json
    {
      "message": "Đăng nhập thành công",
      "token": "eyJhbGciOiJIUzI1NiIsInR...",
      "user": {
        "id": 1,
        "email": "user@example.com",
        "full_name": "Nguyen Van A",
        "role": "customer",
        "avatar": null
      }
    }
    ```

---

## **2. Users (`/users`)**
Defined in: `routes/userRoutes.js`
**Auth Required:** Yes (Header: `Authorization: Bearer <token>`)

### **Get Profile**
*   **Endpoint:** `GET /users/profile`
*   **Response:**
    ```json
    {
      "message": "Lấy thông tin thành công",
      "user": {
        "id": 1,
        "email": "...",
        "full_name": "...",
        "phone_number": null,
        "address": null,
        "avatar_url": null,
        "role": "customer"
      }
    }
    ```

> **Note:** Your `userRoutes.js` currently has a bug. The route `/updateProfile` is defined as a `GET` request and points to `getUserProfile` instead of `updateUserProfile`. You should fix it to `router.put('/profile', protect, updateUserProfile)` to use the logic in `controllers/userController.js`.

---

## **3. Products (`/products`)**
Defined in: `routes/productRoutes.js` & `controllers/productController.js`

### **Get All Products**
*   **Endpoint:** `GET /products`
*   **Query Params:**
    *   `page`: Page number (default 1)
    *   `limit`: Items per page (default 10)
*   **Response:**
    ```json
    {
      "message": "Lấy danh sách thành công",
      "data": [ ... ],
      "pagination": {
        "current_page": 1,
        "total_pages": 5,
        "total_items": 50
      }
    }
    ```

### **Get Product Detail**
*   **Endpoint:** `GET /products/:id`
*   **Response:** Returns product object with `specs` parsed as JSON and an `images` array.

### **Create Product**
**Auth Required:** Yes
*   **Endpoint:** `POST /products`
*   **Body:**
    ```json
    {
      "name": "Laptop Gaming X",
      "brand": "Asus",
      "price": 20000000,
      "description": "Mô tả sản phẩm...",
      "stock_quantity": 10,
      "thumbnail_url": "http://localhost:5000/uploads/thumb.jpg",
      "specs": { "cpu": "i7", "ram": "16GB" },
      "images": [
        "http://localhost:5000/uploads/img1.jpg",
        "http://localhost:5000/uploads/img2.jpg"
      ]
    }
    ```

---

## **4. Orders (`/orders`)**
Defined in: `routes/orderRoutes.js` & `controllers/orderController.js`
**Auth Required:** Yes

### **Place Order**
*   **Endpoint:** `POST /orders`
*   **Body:**
    ```json
    {
      "fullName": "Nguyen Van A",
      "phone": "0901234567",
      "address": "123 Street, City",
      "note": "Giao giờ hành chính",
      "items": [
        { "productId": 1, "quantity": 1 },
        { "productId": 5, "quantity": 2 }
      ]
    }
    ```
*   **Response:**
    ```json
    {
      "message": "Đặt hàng thành công!",
      "orderId": 10,
      "totalMoney": 50000000
    }
    ```

### **Get My Orders**
*   **Endpoint:** `GET /orders/my-orders`
*   **Response:** Array of order objects belonging to the logged-in user.

---

## **5. Reviews (`/reviews`)**
Defined in: `routes/reviewRoutes.js`

### **Get Reviews for Product**
*   **Endpoint:** `GET /reviews/:productId`
*   **Response:**
    ```json
    {
      "data": [ ...reviews ],
      "stats": {
        "total_reviews": 10,
        "average_rating": 4.5
      }
    }
    ```

### **Add Review**
**Auth Required:** Yes (User must have bought the product and order status must be 'delivered').
*   **Endpoint:** `POST /reviews`
*   **Body:**
    ```json
    {
      "productId": 1,
      "rating": 5,
      "comment": "Sản phẩm rất tốt!"
    }
    ```

---

## **6. Uploads (`/upload`)**
Defined in: `routes/uploadRoutes.js`

### **Upload Image**
*   **Endpoint:** `POST /upload`
*   **Content-Type:** `multipart/form-data`
*   **Form Data:**
    *   `image`: (File object - jpg, jpeg, png, webp)
*   **Response:**
    ```json
    {
      "message": "Tải lên thành công",
      "imageUrl": "http://localhost:5000/uploads/abc123.jpg"
    }
    ```