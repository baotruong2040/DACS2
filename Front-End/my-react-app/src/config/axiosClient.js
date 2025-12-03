import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/api', // URL gốc của Backend
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

// Tự động gắn Token vào mọi request nếu đã đăng nhập
axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token'); // Lấy token từ bộ nhớ
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Giúp lấy dữ liệu gọn gàng hơn
axiosClient.interceptors.response.use(
    (response) => {
        // Axios mặc định trả về object gồm: { data, status, headers... }
        // Chúng ta chỉ cần cái 'data' (là cái backend gửi về)
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        // Xử lý lỗi chung (Ví dụ: Token hết hạn 401 thì đá ra trang login)
        if (error.response && error.response.status === 401) {
            // localStorage.removeItem('token');
            // window.location.href = '/login';
            console.error("Hết phiên đăng nhập hoặc chưa đăng nhập.");
        }
        throw error; // Ném lỗi ra để Component tự xử lý tiếp (hiện thông báo đỏ...)
    }
);

export default axiosClient;