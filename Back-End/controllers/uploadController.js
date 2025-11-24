export const uploadFile = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Vui lòng chọn file!' });
        }

        // Tạo đường dẫn URL đầy đủ
        // Ví dụ: http://localhost:5000/uploads/avatar-123.jpg
        const protocol = req.protocol;
        const host = req.get('host');
        const folder = 'uploads';
        const filename = req.file.filename;

        const fileUrl = `${protocol}://${host}/${folder}/${filename}`;

        res.status(200).json({
            message: 'Upload thành công',
            url: fileUrl // Frontend sẽ dùng link này để lưu vào DB
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server khi upload ảnh' });
    }
};