import React, { useState } from 'react';
import './styles/FilterSidebar.css';

const FilterSidebar = ({ onFilterChange }) => {
  // State lưu trữ các lựa chọn
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const brands = [
    { id: 'Asus', label: 'ASUS'},
    { id: 'Dell', label: 'DELL'},
    { id: 'MSI', label: 'MSI'},
    { id: 'Lenovo', label: 'Lenovo'},
    { id: 'Acer', label: 'ACER'},
  ];

  const prices = [
    { id: '0-15000000', label: 'Dưới 15 triệu'},
    { id: '15000000-25000000', label: '15 triệu - 25 triệu'},
    { id: '25000000-35000000', label: '25 triệu - 35 triệu'},
    { id: '35000000-1000000000', label: 'Trên 35 triệu'},
  ];

  // Xử lý khi bấm Brand
  const handleBrandChange = (brandId) => {
    let newBrands;
    if (selectedBrands.includes(brandId)) {
      newBrands = selectedBrands.filter(id => id !== brandId); // Bỏ chọn
    } else {
      newBrands = [...selectedBrands, brandId]; // Thêm chọn
    }
    setSelectedBrands(newBrands);
    onFilterChange({ brand: newBrands, price: selectedPrice }); // Gửi ra cha
  };

  // Xử lý khi bấm Giá
  const handlePriceChange = (priceId) => {
    // Nếu bấm lại cái đang chọn thì bỏ chọn, ngược lại thì chọn cái mới
    const newPrice = selectedPrice === priceId ? null : priceId;
    setSelectedPrice(newPrice);
    onFilterChange({ brand: selectedBrands, price: newPrice });
  };

  return (
    <div className="filter-sidebar">
      {/* --- PHẦN HÃNG --- */}
      <div className="filter-group">
        <h4 className="filter-header">HÃNG SẢN XUẤT</h4>
        <div className="filter-list">
          {brands.map((brand) => (
            <label key={brand.id} className="filter-item">
              <input 
                type="checkbox" 
                checked={selectedBrands.includes(brand.id)}
                onChange={() => handleBrandChange(brand.id)}
              />
              <span className="checkmark"></span>
              <span className="filter-label">{brand.label}</span>
              <span className="filter-count">({brand.count})</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="filter-divider" />

      {/* --- PHẦN GIÁ --- */}
      <div className="filter-group">
        <h4 className="filter-header">KHOẢNG GIÁ (VNĐ)</h4>
        <div className="filter-list">
          {prices.map((price) => (
            <label key={price.id} className="filter-item">
              <input 
                type="checkbox" 
                checked={selectedPrice === price.id} // Chỉ chọn 1 ô giá
                onChange={() => handlePriceChange(price.id)}
              />
              <span className="checkmark"></span>
              <span className="filter-label">{price.label}</span>
              <span className="filter-count">({price.count})</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;