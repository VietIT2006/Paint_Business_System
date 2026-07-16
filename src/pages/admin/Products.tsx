import React, { useEffect, useState } from 'react';
import ProductFormModal from '../../components/ProductFormModal';

const ProductsAdmin: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('http://localhost:3000/api/admin/products'),
        fetch('http://localhost:3000/api/categories')
      ]);
      const [productsJson, categoriesJson] = await Promise.all([
        productsRes.json(),
        categoriesRes.json()
      ]);
      if (productsJson.success) setProducts(productsJson.data);
      if (categoriesJson.success) setCategories(categoriesJson.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: any) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc muốn ẩn sản phẩm này không?')) return;
    try {
      const res = await fetch(`http://localhost:3000/api/admin/products/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveProduct = async (productData: any) => {
    const url = editingProduct 
      ? `http://localhost:3000/api/admin/products/${editingProduct.id}`
      : 'http://localhost:3000/api/admin/products';
    const method = editingProduct ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchData();
      } else {
        alert('Lỗi: ' + json.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem' }}>Quản lý Sản phẩm</h1>
        <button className="btn" onClick={handleOpenAdd}>+ Thêm sản phẩm mới</button>
      </div>
      
      <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--background)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '15px' }}>Ảnh</th>
              <th style={{ padding: '15px' }}>Tên sản phẩm</th>
              <th style={{ padding: '15px' }}>Danh mục</th>
              <th style={{ padding: '15px' }}>Mã màu</th>
              <th style={{ padding: '15px' }}>Giá bán</th>
              <th style={{ padding: '15px' }}>Trạng thái</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '15px' }}>
                  <img src={product.image_url || 'https://via.placeholder.com/50'} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                </td>
                <td style={{ padding: '15px', fontWeight: 500 }}>{product.name}</td>
                <td style={{ padding: '15px' }}>{product.categories?.name}</td>
                <td style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {product.color_code && <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: product.color_code, border: '1px solid #ccc' }}></div>}
                    {product.color_code || 'N/A'}
                  </div>
                </td>
                <td style={{ padding: '15px', fontWeight: 600 }}>{formatPrice(product.price)}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ 
                    padding: '5px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem', 
                    fontWeight: 500,
                    background: product.is_active ? '#dcfce7' : '#fee2e2',
                    color: product.is_active ? '#15803d' : '#b91c1c'
                  }}>
                    {product.is_active ? 'Đang bán' : 'Ngừng bán'}
                  </span>
                </td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <button onClick={() => handleOpenEdit(product)} style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '5px 10px', borderRadius: '5px', marginRight: '5px', cursor: 'pointer' }}>Sửa</button>
                  <button onClick={() => handleDelete(product.id)} style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Ẩn</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProductFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={editingProduct} 
        categories={categories} 
        onSave={handleSaveProduct} 
      />
    </div>
  );
};

export default ProductsAdmin;
