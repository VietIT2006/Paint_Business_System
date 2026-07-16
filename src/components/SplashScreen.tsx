import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const [show, setShow] = useState(true);
  const [hide, setHide] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Reset state để hiện lại màn hình Splash mỗi khi đổi trang
    setShow(true);
    setHide(false);

    // Bắt đầu hiệu ứng fade out sau 0.8s (đủ nhanh để không gây bực mình khi chuyển trang)
    const timer = setTimeout(() => {
      setHide(true);
    }, 800);

    // Gỡ khỏi DOM hoàn toàn sau 1.4s (đợi fade out 0.6s xong)
    const cleanup = setTimeout(() => {
      setShow(false);
    }, 1400);

    return () => {
      clearTimeout(timer);
      clearTimeout(cleanup);
    };
  }, [location.pathname]); // Kích hoạt lại mỗi khi pathname thay đổi

  if (!show) return null;

  return (
    <>
      <style>
        {`
          @keyframes splashFadeOut {
            from { opacity: 1; visibility: visible; }
            to { opacity: 0; visibility: hidden; }
          }
          @keyframes splashRainbow {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
          .splash-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: #ffffff;
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }
          .splash-overlay.hide {
            animation: splashFadeOut 0.6s ease forwards;
          }
          .splash-title {
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: splashRainbow 2s linear infinite;
            margin-bottom: 20px;
          }
          .splash-progress-bg {
            width: 200px;
            height: 4px;
            background-color: #e2e8f0;
            border-radius: 4px;
            overflow: hidden;
            position: relative;
          }
          .splash-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #ff0000, #00ff00, #0000ff); /* Có thể đổi màu khác nếu muốn */
            width: 0%;
            border-radius: 4px;
            animation: splashFill 0.8s ease-out forwards;
          }
          @keyframes splashFill {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}
      </style>
      <div className={`splash-overlay ${hide ? 'hide' : ''}`}>
        <div className="splash-title">Paintluxury</div>
        <div className="splash-progress-bg">
          <div className="splash-progress-bar"></div>
        </div>
      </div>
    </>
  );
};

export default SplashScreen;
