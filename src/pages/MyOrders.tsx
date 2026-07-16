import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const MyOrders: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/orders/my-orders/${user.id}`);
        const json = await res.json();
        if (json.success) {
          setOrders(json.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const translateStatus = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'processing': return 'Đang đóng gói';
      case 'shipped': return 'Đang giao hàng';
      case 'delivered': return 'Đã giao hàng';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return { bg: '#fef3c7', text: '#d97706' };
      case 'processing': return { bg: '#e0e7ff', text: '#4338ca' };
      case 'shipped': return { bg: '#dbeafe', text: '#1d4ed8' };
      case 'delivered': return { bg: '#dcfce7', text: '#15803d' };
      case 'cancelled': return { bg: '#fee2e2', text: '#b91c1c' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>
        <p>Đang tải dữ liệu đơn hàng...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Lịch sử Đơn hàng của tôi</h1>

      {orders.length === 0 ? (
        <div style={{ background: 'var(--surface)', padding: '40px', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '15px' }}>Bạn chưa có đơn hàng nào!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Hãy khám phá các loại sơn chất lượng cao của chúng tôi nhé.</p>
          <Link to="/" className="btn">Mua sắm ngay</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map(order => {
            const colors = getStatusColor(order.status);
            return (
              <div key={order.id} style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '15px', marginBottom: '15px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Đơn hàng #{order.id.split('-')[0]}</h3>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      Ngày đặt: {new Date(order.created_at).toLocaleString('vi-VN')}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                      {formatPrice(order.total_amount)}
                    </div>
                    <span style={{ padding: '5px 12px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600, background: colors.bg, color: colors.text }}>
                      {translateStatus(order.status)}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Chi tiết sản phẩm:</h4>
                  {order.order_items?.map((item: any) => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'var(--background)', padding: '10px 15px', borderRadius: 'var(--radius-md)' }}>
                      <img src={item.products?.image_url || 'https://via.placeholder.com/60'} alt={item.products?.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{item.products?.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '5px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            Màu: <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: item.products?.color_code, border: '1px solid #ccc', display: 'inline-block' }}></span>
                          </span>
                          <span>Đơn giá: {formatPrice(item.unit_price)}</span>
                          <span>Số lượng: {item.quantity}</span>
                        </div>
                      </div>
                      <div style={{ fontWeight: 'bold' }}>
                        {formatPrice(item.total_price)}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
