import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Pagination from '../components/Pagination';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  categories?: { name: string } | null;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/products?page=${currentPage}&limit=12`);
        const json = await res.json();
        
        if (json.success) {
          setProducts(json.data);
          setTotalPages(json.pagination.totalPages);
        } else {
          setError(json.message);
        }
      } catch (err: any) {
        setError('Không thể kết nối đến máy chủ.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  return (
    <>
      <Header />
      <div className="container">
        <main style={{ padding: '60px 0' }}>
          <h1 className="section-title">Sản phẩm nổi bật</h1>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Đang tải dữ liệu...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', color: 'red', padding: '40px' }}>{error}</div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              Hiện chưa có sản phẩm nào. Xin vui lòng thêm sản phẩm vào DB.
            </div>
          ) : (
            <>
              <div className="product-grid">
                {products.map(product => (
                  <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ProductCard product={product} />
                  </Link>
                ))}
              </div>
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo(0, 0);
                }} 
              />
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
