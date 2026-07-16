import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { CheckCircle } from 'lucide-react';

const Success: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '100px 20px' }}>
        <div style={{ background: 'var(--surface)', padding: '50px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', textAlign: 'center', maxWidth: '500px', width: '100%' }}>
          <CheckCircle size={80} color="var(--secondary)" style={{ margin: '0 auto 20px' }} />
          <h1 style={{ fontSize: '2.5rem', marginBottom: '15px', color: 'var(--text-main)' }}>Đặt Hàng Thành Công!</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '30px', lineHeight: '1.6' }}>
            Cảm ơn bạn đã tin tưởng và mua sơn tại PaintLuxury. Đơn hàng của bạn đã được ghi nhận và chúng tôi sẽ sớm liên hệ để giao hàng.
          </p>
          <Link to="/" className="btn" style={{ textDecoration: 'none', display: 'inline-block', padding: '12px 30px', fontSize: '1.1rem' }}>
            Quay Về Trang Chủ
          </Link>
        </div>
      </div>
    </>
  );
};

export default Success;
