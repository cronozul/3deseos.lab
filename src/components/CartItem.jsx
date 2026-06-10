import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, Paintbrush } from 'lucide-react';
import { useLanguage } from '../i18n';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { t, getRaw } = useLanguage();
  const { updateQuantity, removeFromCart } = useCart();
  const product = getRaw(`products.items.${item.productKey}`);

  if (!product) return null;

  // Opciones elegidas en la página de producto (color / pintado a mano).
  const opts = item.options || {};
  const colorLabel = opts.color
    ? t(`products.detail.options.colors.${opts.color}`)
    : product.color;
  const imageFile = (product.images && product.images[0]) || product.image;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-row items-center gap-3 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-surface/30 border border-white/5 hover:border-white/10 transition-colors mb-4"
    >
      <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl bg-[#0A0A0A] flex items-center justify-center border border-white/5 overflow-hidden shrink-0">
        {imageFile ? (
          <img
            src={new URL(`../images/${imageFile}`, import.meta.url).href}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-2"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20" />
        )}
      </div>

      <div className="flex-1 text-left min-w-0">
        <h3 className="font-reem text-sm sm:text-lg text-white mb-0.5 sm:mb-1 truncate">{product.name}</h3>
        <p className="text-[10px] sm:text-xs text-white/60 uppercase tracking-widest mb-1 sm:mb-2 truncate">{colorLabel} • {product.size}</p>
        {opts.painting && (
          <span className="inline-flex items-center gap-1 text-[11px] text-brand-purple bg-brand-purple/10 border border-brand-purple/25 rounded-full px-2 py-0.5 mb-2">
            <Paintbrush className="w-3 h-3" /> {t('products.detail.options.paintBadge')}
          </span>
        )}
        <div className="text-sm sm:text-base text-brand-blue font-jost">{product.priceStr}</div>
      </div>

      <div className="flex items-center gap-2 sm:gap-6 shrink-0">
        <div className="flex items-center gap-2 sm:gap-4 bg-background/50 border border-white/10 rounded-full px-2 sm:px-3 py-1">
          <button 
            onClick={() => updateQuantity(item.productKey, item.quantity - 1)}
            className="text-white/60 hover:text-white transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.productKey, item.quantity + 1)}
            className="text-white/60 hover:text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <button 
          onClick={() => removeFromCart(item.productKey)}
          className="p-2 rounded-full hover:bg-brand-red/10 text-white/55 hover:text-brand-red transition-all"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;
