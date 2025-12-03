// src/components/ImageUploader.jsx
import React, { useState } from 'react';
import axiosClient from '../config/axiosClient';

const ImageUploader = ({ onUpload, initialImage = '' }) => {
  const [preview, setPreview] = useState(initialImage);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log(file);
    
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axiosClient.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      // Backend trả về { url: "..." } hoặc { imageUrl: "..." }
      const url = res.url || res.imageUrl; 
      setPreview(url);
      onUpload(url); // Trả URL về cho form cha
    } catch (error) {
      alert("Hãy chọn ảnh nhỏ hơn 5 MB!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ border: '1px dashed #ccc', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#f9f9f9', marginBottom: '5px' }}>
        {preview ? (
          <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{color:'#ccc'}}>No Img</span>
        )}
      </div>
      <input type="file" onChange={handleFileChange} disabled={uploading} style={{fontSize: '12px'}} />
      {uploading && <span style={{fontSize: '12px', color: 'blue'}}> Đang tải...</span>}
    </div>
  );
};

export default ImageUploader;