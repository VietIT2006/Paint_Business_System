import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Đăng ký auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // Cập nhật thông tin profile cơ bản (Tên) vào bảng profiles
      // Lưu ý: bảng profiles đã được setup RLS và trigger tự động tạo row, 
      // ta có thể update lại tên hoặc chèn tuỳ cấu hình. 
      // Tạm thời hiển thị alert thành công
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');
    }
  };

  return (
    <>
      <Header />
      <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '60px 20px' }}>
        <div style={{ background: 'var(--surface)', padding: '40px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '400px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>Tạo Tài Khoản</h2>
          
          {error && <div style={{ background: '#fee2e2', color: '#ef4444', padding: '10px', borderRadius: 'var(--radius-md)', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}
          
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Họ và tên</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'inherit' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'inherit' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Mật khẩu</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'inherit' }}
              />
            </div>
            
            <button type="submit" className="btn" style={{ width: '100%', padding: '14px', fontSize: '1.1rem', marginTop: '10px' }} disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Đăng Ký'}
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)' }}>
            Đã có tài khoản? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 500, textDecoration: 'none' }}>Đăng nhập</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
