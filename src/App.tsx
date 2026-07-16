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
import MyOrders from './pages/MyOrders';
import SplashScreen from './components/SplashScreen';
import AIAssistant from './pages/AIAssistant';

// Admin
import AdminLayout from './layouts/AdminLayout';
import OrdersAdmin from './pages/admin/Orders';
import ProductsAdmin from './pages/admin/Products';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <SplashScreen />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/my-orders" element={<MyOrders />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="orders" element={<OrdersAdmin />} />
            <Route path="products" element={<ProductsAdmin />} />
          </Route>
        </Routes>
        <AIAssistant />
      </Router>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
