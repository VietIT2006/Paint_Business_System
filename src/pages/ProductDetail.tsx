import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import type { Product } from '../context/CartContext';
import RichTextWithTOC from '../components/RichTextWithTOC';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        const json = await res.json();
        if (json.success) {
          setProduct(json.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '60px' }}>Đang tải...</div>;
  if (!product) return <div style={{ textAlign: 'center', padding: '60px' }}>Không tìm thấy sản phẩm.</div>;

  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(product.price);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`Đã thêm ${quantity} thùng ${product.name} vào giỏ hàng!`);
  };

  return (
    <>
      <Header />
      <div className="container" style={{ padding: '40px 20px' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
          &larr; Quay lại trang chủ
        </Link>
        
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginTop: '20px' }}>
          <div style={{ flex: '1 1 400px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            <img 
              src={product.image_url || 'https://via.placeholder.com/600?text=No+Image'} 
              alt={product.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
            />
          </div>
          
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {product.categories?.name}
            </span>
            <h1 style={{ fontSize: '2.5rem', marginTop: '10px', marginBottom: '20px' }}>{product.name}</h1>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '20px' }}>
              {formattedPrice}
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px', marginTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '10px 15px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                >-</button>
                <span style={{ padding: '0 20px', fontSize: '1.2rem', fontWeight: 500 }}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '10px 15px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                >+</button>
              </div>
              <button className="btn" style={{ flexGrow: 1, padding: '15px' }} onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </button>
            </div>
            
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', color: 'var(--text-muted)' }}>
              <p><strong>Mã màu:</strong> {/* @ts-ignore */} {product.color_code || 'N/A'}</p>
              <p><strong>Dung tích:</strong> {/* @ts-ignore */} {product.volume_liters} Lít</p>
            </div>
          </div>
        </div>

        {/* Bổ sung phần Mô tả chi tiết với MỤC LỤC */}
        <RichTextWithTOC htmlContent={(product as any).description || ''} />

      </div>
    </>
  );
};

export default ProductDetail;
