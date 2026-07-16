import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { cartCount } = useCart();
  const { user, signOut } = useAuth();

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">PaintLuxury</Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Xin chào, <strong>{user.email}</strong>
              </span>
              <Link to="/my-orders" className="btn" style={{ background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', textDecoration: 'none' }}>
                Đơn hàng của tôi
              </Link>
              <Link to="/admin/orders" className="btn" style={{ background: 'transparent', color: 'var(--primary)', border: '1px solid var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', textDecoration: 'none' }}>
                Trang Quản trị
              </Link>
              <button onClick={signOut} className="btn" style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px' }} title="Đăng xuất">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn" style={{ background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} />
              Đăng nhập
            </Link>
          )}
          <Link to="/checkout" className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative', textDecoration: 'none' }}>
            <ShoppingCart size={18} />
            Giỏ hàng
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
