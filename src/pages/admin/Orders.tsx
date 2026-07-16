import React, { useEffect, useState } from 'react';

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  total_amount: number;
  status: string;
  created_at: string;
  order_items: any[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/admin/orders');
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

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/admin/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const json = await res.json();
      if (json.success) {
        fetchOrders();
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
      <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Quản lý Đơn hàng</h1>
      
      <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--background)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '15px' }}>Mã ĐH</th>
              <th style={{ padding: '15px' }}>Khách hàng</th>
              <th style={{ padding: '15px' }}>Tổng tiền</th>
              <th style={{ padding: '15px' }}>Ngày đặt</th>
              <th style={{ padding: '15px' }}>Trạng thái</th>
              <th style={{ padding: '15px' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '15px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{order.id.split('-')[0]}</td>
                <td style={{ padding: '15px' }}>
                  <div style={{ fontWeight: 500 }}>{order.customer_name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{order.customer_phone}</div>
                </td>
                <td style={{ padding: '15px', fontWeight: 600 }}>{formatPrice(order.total_amount)}</td>
                <td style={{ padding: '15px' }}>{new Date(order.created_at).toLocaleDateString('vi-VN')}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ 
                    padding: '5px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem', 
                    fontWeight: 500,
                    background: order.status === 'pending' ? '#fef3c7' : order.status === 'delivered' ? '#dcfce7' : '#e0e7ff',
                    color: order.status === 'pending' ? '#d97706' : order.status === 'delivered' ? '#15803d' : '#4338ca'
                  }}>
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: '15px' }}>
                  <select 
                    value={order.status} 
                    onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                    style={{ padding: '5px', borderRadius: '5px', border: '1px solid var(--border)' }}
                  >
                    <option value="pending">Chờ xử lý</option>
                    <option value="processing">Đang đóng gói</option>
                    <option value="shipped">Đang giao</option>
                    <option value="delivered">Đã giao</option>
                    <option value="cancelled">Hủy bỏ</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>Chưa có đơn hàng nào.</div>}
      </div>
    </div>
  );
};

export default Orders;
