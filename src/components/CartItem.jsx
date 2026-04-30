import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useLanguage } from '../i18n';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { t, getRaw } = useLanguage();
  const { updateQuantity, removeFromCart } = useCart();
  const product = getRaw(`products.items.${item.productKey}`);

  if (!product) return null;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-surface/30 border border-white/5 hover:border-white/10 transition-colors mb-4"
    >
      <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 flex items-center justify-center border border-white/5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-20 mix-blend-overlay"></div>
        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 group-hover:scale-110 transition-transform duration-500" />
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-reem text-lg text-white mb-1">{product.name}</h3>
        <p className="text-xs text-white/40 uppercase tracking-widest mb-2">{product.color} • {product.size}</p>
        <div className="text-brand-blue font-jost">{product.priceStr}</div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 bg-background/50 border border-white/10 rounded-full px-3 py-1">
          <button 
            onClick={() => updateQuantity(item.productKey, item.quantity - 1)}
            className="text-white/40 hover:text-white transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.productKey, item.quantity + 1)}
            className="text-white/40 hover:text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <button 
          onClick={() => removeFromCart(item.productKey)}
          className="p-2 rounded-full hover:bg-brand-red/10 text-white/20 hover:text-brand-red transition-all"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;
