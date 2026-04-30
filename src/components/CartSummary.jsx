import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartSummary = ({ isCheckout = false }) => {
  const { t, getRaw } = useLanguage();
  const { cart } = useCart();
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const product = getRaw(`products.items.${item.productKey}`);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const subtotal = calculateSubtotal();

  return (
    <div className="bg-surface/30 border border-white/5 rounded-3xl p-8 backdrop-blur-sm sticky top-32 h-fit">
      <h2 className="text-xl font-reem mb-6 text-white">{t('cart.summary')}</h2>
      
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center text-white/50">
          <span>{t('cart.subtotal')}</span>
          <span className="font-jost text-white">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between items-center text-white/50">
          <span>Envío</span>
          <span className="font-jost text-brand-green">Gratis (Bogotá)</span>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 mb-8">
        <div className="flex justify-between items-center">
          <span className="text-lg font-reem text-white">{t('cart.total')}</span>
          <span className="text-2xl font-jost text-brand-blue font-bold">{formatCurrency(subtotal)}</span>
        </div>
      </div>

      {!isCheckout && (
        <button 
          onClick={() => navigate('/checkout')}
          className="w-full py-4 rounded-full bg-white text-[#050505] font-reem font-bold hover:bg-brand-blue hover:text-white transition-all shadow-xl shadow-brand-blue/10"
        >
          {t('cart.checkout')}
        </button>
      )}
    </div>
  );
};

export default CartSummary;
