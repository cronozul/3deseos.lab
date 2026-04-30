import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const { t } = useLanguage();
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-24 h-24 rounded-full bg-surface/50 border border-white/5 flex items-center justify-center mb-8"
        >
          <ShoppingBag className="w-10 h-10 text-white/20" strokeWidth={1} />
        </motion.div>
        <h1 className="text-4xl font-reem mb-4">{t('cart.empty')}</h1>
        <Link 
          to="/products"
          className="text-brand-blue hover:text-brand-green transition-colors font-medium flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('cart.keepShopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-reem font-bold mb-4">{t('cart.title')}</h1>
        <Link to="/products" className="text-white/40 hover:text-white transition-colors text-sm flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          {t('cart.keepShopping')}
        </Link>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-16 items-start">
        <div className="lg:col-span-2">
          <AnimatePresence>
            {cart.map(item => (
              <CartItem key={item.productKey} item={item} />
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CartSummary />
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
