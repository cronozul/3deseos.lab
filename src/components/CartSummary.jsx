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
    <div className="w-full min-w-0 box-border bg-surface/30 border border-white/5 rounded-3xl p-5 sm:p-8 backdrop-blur-sm sm:sticky sm:top-32 h-fit overflow-hidden">
      <h2 className="text-xl font-reem mb-6 text-white">{t('cart.summary')}</h2>

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-2 gap-2 items-center text-white/50">
          <span>{t('cart.subtotal')}</span>
          <span className="font-jost text-white text-right">{formatCurrency(subtotal)}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 items-center text-white/50">
          <span>{t('cart.shipping')}</span>
          <span className="font-jost text-brand-green text-right truncate">{t('cart.shippingValue')}</span>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 mb-6">
        <div className="grid grid-cols-2 gap-2 items-center">
          <span className="text-lg font-reem text-white">{t('cart.total')}</span>
          <span className="text-xl sm:text-2xl font-jost text-brand-blue font-bold text-right">{formatCurrency(subtotal)}</span>
        </div>
      </div>

      <p className="text-xs text-white/55 leading-relaxed mb-8">{t('cart.madeToOrder')}</p>

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
