import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../config/axiosClient';
import ImageUploader from '../components/ImageUploader';
import '../layout/styles/admin.css';

const AdminProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // --- 1. STATE QUẢN LÝ FORM ---
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    categoryId: '',
    old_price: 0,
    discount_percentage: 0,
    stock_quantity: 0,
    thumbnail_url: '',
    badge: false, // Checkbox HOT/Best Choice
    description: '',
    // Các trường Specs (Làm phẳng để dễ bind vào input)
    cpu: '', ram: '', vga: '', ssd: '', screen: ''
  });

  // State riêng cho mảng ảnh chi tiết (Gallery)
  const [gallery, setGallery] = useState([]); 
  
  // Dữ liệu danh mục để đổ vào Select box
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- 2. LOAD DỮ LIỆU BAN ĐẦU ---
  useEffect(() => {
    // Lấy danh sách danh mục
    axiosClient.get('/categories').then(res => setCategories(res));

    // Nếu đang Sửa -> Gọi API lấy thông tin sản phẩm cũ đắp vào form
    if (isEditMode) {
      axiosClient.get(`/products/${id}`).then(res => {
        const p = res.data || res;
        
        setFormData({
          name: p.name,
          brand: p.brand,
          categoryId: p.category_id,
          old_price: Number(p.old_price),
          discount_percentage: p.discount_percentage,
          stock_quantity: p.stock_quantity,
          thumbnail_url: p.thumbnail_url,
          badge: p.badge === 1 || p.badge === true,
          description: p.description || '',
          // Bung specs JSON ra các ô input
          cpu: p.specs?.cpu || '',
          ram: p.specs?.ram || '',
          vga: p.specs?.vga || '',
          ssd: p.specs?.ssd || '',
          screen: p.specs?.screen || ''
        });

        // Load Gallery
        if (p.images && Array.isArray(p.images)) {
            setGallery(p.images);
        }
      });
    }
  }, [id, isEditMode]);

  // --- 3. CÁC HÀM XỬ LÝ SỰ KIỆN ---

  // Xử lý nhập liệu text/number/checkbox
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Xử lý upload ảnh thumbnail
  const handleThumbnailUpload = (url) => {
    setFormData(prev => ({ ...prev, thumbnail_url: url }));
  };

  // Xử lý thêm ảnh vào Album
  const handleAddGalleryImage = (url) => {
    setGallery(prev => [...prev, url]);
  };

  // Xử lý xóa ảnh khỏi Album (Xóa trên giao diện client)
  const handleRemoveGalleryImage = (indexToRemove) => {
    setGallery(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  // --- 4. SUBMIT FORM (LƯU) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Chuẩn bị dữ liệu gửi đi
      const productPayload = {
        ...formData,
        // Gom các trường lẻ thành object specs
        specs: {
          cpu: formData.cpu,
          ram: formData.ram,
          vga: formData.vga,
          ssd: formData.ssd,
          screen: formData.screen
        },
        // Gửi mảng ảnh
        images: gallery 
      };

      if (isEditMode) {
        // Gọi API Cập nhật
        await axiosClient.put(`/products/${id}`, productPayload);
        alert('Cập nhật sản phẩm thành công!');
      } else {
        // Gọi API Tạo mới
        await axiosClient.post('/products', productPayload);
        alert('Thêm sản phẩm mới thành công!');
      }
      
      // Lưu xong thì quay về trang danh sách
      navigate('/admin/products');

    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi lưu sản phẩm!');
    } finally {
      setLoading(false);
    }
  };

  // --- 5. GIAO DIỆN ---
  return (
    <div className="admin-form-container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
        <h2>{isEditMode ? `Chỉnh sửa sản phẩm #${id}` : 'Thêm sản phẩm mới'}</h2>
        <button className="btn btn-outline" onClick={() => navigate('/admin/products')} style={{padding:'5px 15px', height:'auto'}}>
            Quay lại
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="admin-form">
        
        {/* --- CỘT TRÁI: THÔNG TIN CHUNG --- */}
        <div className="form-section">
          <div className="form-group">
            <label>Tên sản phẩm <span style={{color:'red'}}>*</span></label>
            <input name="name" value={formData.name} onChange={handleChange} required placeholder="Ví dụ: Asus ROG Strix..." />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Thương hiệu</label>
              <select name="brand" value={formData.brand} onChange={handleChange} required>
                <option value="">-- Chọn --</option>
                {['Asus', 'Dell', 'MSI', 'Acer', 'Lenovo', 'Apple', 'HP', 'Gigabyte', 'LG'].map(b => (
                    <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Danh mục</label>
              <select name="categoryId" value={formData.categoryId} onChange={handleChange} required>
                <option value="">-- Chọn --</option>
                {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Giá niêm yết (VNĐ)</label>
              <input type="number" name="old_price" value={formData.old_price} onChange={handleChange} placeholder="0" />
            </div>
            <div className="form-group">
              <label>% Giảm giá</label>
              <input type="number" name="discount_percentage" value={formData.discount_percentage} onChange={handleChange} placeholder="0" />
            </div>
            <div className="form-group">
              <label>Tồn kho</label>
              <input type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} placeholder="0" />
            </div>
          </div>

          {/* Hiển thị giá bán dự kiến */}
          <div style={{marginTop:'16px', marginBottom:'16px', fontSize:'14px', color:'green', fontWeight:'bold'}}>
             ➔ Giá bán thực tế: {Number(formData.old_price * (1 - formData.discount_percentage/100)).toLocaleString()} đ
          </div>

          <div className="form-group">
             <label style={{cursor:'pointer', display:'flex', alignItems:'center', gap:'10px'}}>
               <input type="checkbox" name="badge" checked={formData.badge} onChange={handleChange} style={{width:'20px', height:'20px'}} />
               Best Choice
             </label>
          </div>

          <div className="form-group">
            <label>Mô tả sản phẩm (HTML)</label>
            <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows="8" 
                placeholder="Nhập mã HTML hoặc văn bản mô tả..." 
            ></textarea>
          </div>
        </div>

        {/* --- CỘT PHẢI: HÌNH ẢNH & CẤU HÌNH --- */}
        <div className="form-section">
          
          {/* 1. Ảnh đại diện */}
          <div className="form-group">
            <label>Thumbnail</label>
            <ImageUploader onUpload={handleThumbnailUpload} initialImage={formData.thumbnail_url} />
          </div>

          {/* 2. Album ảnh */}
          <div className="form-group" style={{background: '#f8f9fa', padding: '15px', borderRadius: '8px', border:'1px solid #eee'}}>
            <label style={{marginBottom:'10px', display:'block', fontWeight:'bold'}}>Album ảnh({gallery.length})</label>
            
            {/* Grid hiển thị ảnh đã up */}
            <div style={{display: 'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: '10px', marginBottom: '15px'}}>
                {gallery.map((img, index) => (
                    <div key={index} style={{position: 'relative', aspectRatio:'1/1'}}>
                        <img src={img} alt="" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd'}} />
                        <button 
                            type="button"
                            onClick={() => handleRemoveGalleryImage(index)}
                            style={{
                                position: 'absolute', top: '-5px', right: '-5px', 
                                background: 'red', color: 'white', border: 'none', 
                                borderRadius: '50%', width: '20px', height: '20px', 
                                cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px'
                            }}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            {/* Nút thêm ảnh */}
            <div style={{fontSize: '13px'}}>
                <span style={{display:'block', marginBottom:'5px'}}>+ Thêm ảnh vào album:</span>
                <ImageUploader onUpload={handleAddGalleryImage} />
            </div>
          </div>

          <hr style={{margin:'20px 0', border:'0', borderTop:'1px solid #eee'}} />

          {/* 3. Thông số kỹ thuật */}
          <h4 style={{marginBottom:'15px', color:'var(--color-primary)'}}>Thông số kỹ thuật</h4>
          <div className="form-group">
              <label>CPU (Vi xử lý)</label>
              <input name="cpu" value={formData.cpu} onChange={handleChange} placeholder="VD: Intel Core i7 13700H" />
          </div>
          <div className="form-group">
              <label>RAM</label>
              <input name="ram" value={formData.ram} onChange={handleChange} placeholder="VD: 16GB DDR5 4800MHz" />
          </div>
          <div className="form-group">
              <label>VGA (Card đồ họa)</label>
              <input name="vga" value={formData.vga} onChange={handleChange} placeholder="VD: NVIDIA RTX 4060 8GB" />
          </div>
          <div className="form-group">
              <label>Ổ cứng (SSD)</label>
              <input name="ssd" value={formData.ssd} onChange={handleChange} placeholder="VD: 512GB NVMe PCIe Gen4" />
          </div>
          <div className="form-group">
              <label>Màn hình</label>
              <input name="screen" value={formData.screen} onChange={handleChange} placeholder="VD: 15.6 inch FHD 144Hz" />
          </div>
        </div>

        {/* Nút Submit */}
        <button type="submit" className="btn btn-save" disabled={loading}>
          {loading ? 'Đang xử lý...' : (isEditMode ? 'CẬP NHẬT SẢN PHẨM' : 'TẠO SẢN PHẨM MỚI')}
        </button>

      </form>
    </div>
  );
};

export default AdminProductForm;