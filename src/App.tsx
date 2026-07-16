import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Success from './pages/Success';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Router>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
