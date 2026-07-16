import React from 'react';
import { useCart } from './../context/CartContext';

interface Category {
  name: string;
}

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  categories?: Category | null;
}

const ProductCard: React.FC<{ product: ProductProps }> = ({ product }) => {
  const { addToCart } = useCart();
  
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(product.price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.image_url || 'https://via.placeholder.com/300?text=Chưa+có+ảnh'}
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <span className="product-category">
          {product.categories?.name || 'Sơn không xác định'}
        </span>
        <h3 className="product-title">{product.name}</h3>
        <div className="product-footer">
          <span className="product-price">{formattedPrice}</span>
          <button className="btn" onClick={handleAddToCart}>Mua Ngay</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
