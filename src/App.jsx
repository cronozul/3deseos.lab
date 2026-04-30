import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import CustomOrders from './pages/CustomOrders';
import Contact from './pages/Contact';
import Community from './pages/Community';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-background text-white font-jost noise-bg">
      <Navbar />
      
      <main className="relative z-10 pt-20 min-h-[calc(100vh-80px)]">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/custom" element={<CustomOrders />} />
          <Route path="/community" element={<Community />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
