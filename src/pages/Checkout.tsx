import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    shipping_address: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);
    setError('');

    const orderData = {
      ...formData,
      user_id: user ? user.id : undefined,
      total_amount: cartTotal,
      items: cart.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        unit_price: item.product.price
      }))
    };

    try {
      const res = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const json = await res.json();

      if (json.success) {
        clearCart();
        navigate('/success');
      } else {
        setError(json.message || 'Đặt hàng thất bại');
      }
    } catch (err: any) {
      setError('Lỗi kết nối đến máy chủ');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <>
      <Header />
      <div className="container" style={{ padding: '60px 20px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Thông tin giao hàng</h2>
          {error && <div style={{ background: '#fee2e2', color: '#ef4444', padding: '10px', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}>{error}</div>}
          
          <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Họ và tên *</label>
              <input type="text" name="customer_name" required value={formData.customer_name} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '1rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Số điện thoại *</label>
              <input type="text" name="customer_phone" required value={formData.customer_phone} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '1rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Địa chỉ giao hàng *</label>
              <input type="text" name="shipping_address" required value={formData.shipping_address} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '1rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Ghi chú đơn hàng (tuỳ chọn)</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '1rem', minHeight: '100px' }}></textarea>
            </div>
            <button type="submit" className="btn" style={{ padding: '15px', fontSize: '1.2rem', marginTop: '10px' }} disabled={loading || cart.length === 0}>
              {loading ? 'Đang xử lý...' : 'Xác nhận Đặt hàng (COD)'}
            </button>
          </form>
        </div>

        <div style={{ flex: '1 1 350px', background: 'var(--surface)', padding: '30px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', alignSelf: 'flex-start' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>Đơn hàng của bạn</h3>
          
          {cart.length === 0 ? (
            <p>Giỏ hàng đang trống. <Link to="/" style={{ color: 'var(--primary)' }}>Tiếp tục mua sắm</Link></p>
          ) : (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px', maxHeight: '400px', overflowY: 'auto' }}>
                {cart.map(item => (
                  <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <img src={item.product.image_url || 'https://via.placeholder.com/50'} alt={item.product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                      <div>
                        <div style={{ fontWeight: 500 }}>{item.product.name}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>SL: {item.quantity} x {formatPrice(item.product.price)}</div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 600 }}>{formatPrice(item.product.price * item.quantity)}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '2px solid var(--border)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                <span>Tổng cộng:</span>
                <span style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>{formatPrice(cartTotal)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
