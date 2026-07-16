import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Package, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', background: 'var(--surface)', borderRight: '1px solid var(--border)', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <LayoutDashboard size={24} />
          Admin Panel
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 15px', borderRadius: 'var(--radius-md)', textDecoration: 'none', color: 'var(--primary)', fontWeight: 600, border: '1px solid var(--primary)', marginBottom: '15px' }}>
            &larr; Về Cửa hàng
          </Link>
          <Link to="/admin/orders" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 15px', borderRadius: 'var(--radius-md)', textDecoration: 'none', color: 'var(--text-main)', background: 'rgba(37, 99, 235, 0.05)', fontWeight: 500 }}>
            <ShoppingBag size={20} /> Quản lý Đơn hàng
          </Link>
          <Link to="/admin/products" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 15px', borderRadius: 'var(--radius-md)', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 500 }}>
            <Package size={20} /> Quản lý Sản phẩm
          </Link>
        </nav>

        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 15px', background: 'transparent', border: 'none', color: '#ef4444', fontWeight: 500, cursor: 'pointer', textAlign: 'left', marginTop: 'auto' }}>
          <LogOut size={20} /> Đăng xuất
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
