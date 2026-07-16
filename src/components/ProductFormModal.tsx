import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface Category {
  id: string;
  name: string;
}

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  categories: Category[];
  onSave: (product: any) => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, product, categories, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    description: '',
    color_code: '#FFFFFF',
    volume_liters: 5,
    price: 0,
    stock_quantity: 100,
    image_url: '',
    is_active: true
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category_id: product.category_id || '',
        description: product.description || '',
        color_code: product.color_code || '#FFFFFF',
        volume_liters: product.volume_liters || 5,
        price: product.price || 0,
        stock_quantity: product.stock_quantity || 100,
        image_url: product.image_url || '',
        is_active: product.is_active !== undefined ? product.is_active : true
      });
    } else {
      setFormData({
        name: '',
        category_id: categories.length > 0 ? categories[0].id : '',
        description: '',
        color_code: '#FFFFFF',
        volume_liters: 5,
        price: 0,
        stock_quantity: 100,
        image_url: '/images/interior_paint.png',
        is_active: true
      });
    }
  }, [product, categories]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let finalValue: any = value;
    
    if (type === 'number') {
      finalValue = Number(value);
    } else if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    }

    setFormData({ ...formData, [name]: finalValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: 'var(--surface)', padding: '30px', borderRadius: 'var(--radius-lg)', width: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
        <h2 style={{ marginBottom: '20px' }}>{product ? 'Chỉnh sửa Sản phẩm' : 'Thêm Sản phẩm mới'}</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Tên sản phẩm</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Danh mục</label>
            <select name="category_id" value={formData.category_id} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Giá bán (VNĐ)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Dung tích (Lít)</label>
              <input type="number" name="volume_liters" value={formData.volume_liters} onChange={handleChange} required min="1" style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Mã màu (Hex)</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input type="color" name="color_code" value={formData.color_code} onChange={handleChange} style={{ width: '50px', height: '40px', padding: 0, border: 'none' }} />
                <input type="text" name="color_code" value={formData.color_code} onChange={handleChange} required style={{ flex: 1, padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Tồn kho</label>
              <input type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} required min="0" style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Đường dẫn ảnh (URL)</label>
            <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Mô tả chi tiết (Rich Text)</label>
            <ReactQuill 
              theme="snow" 
              value={formData.description} 
              onChange={(content) => setFormData({ ...formData, description: content })}
              style={{ background: 'var(--surface)', borderRadius: 'var(--radius-sm)' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" name="is_active" id="is_active" checked={formData.is_active} onChange={handleChange} />
            <label htmlFor="is_active">Đang kinh doanh</label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="button" onClick={onClose} className="btn" style={{ background: 'var(--surface)', color: 'var(--text-main)', border: '1px solid var(--border)' }}>Hủy</button>
            <button type="submit" className="btn">Lưu lại</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
