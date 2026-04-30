import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, ShoppingBag, Check } from 'lucide-react';
import { useLanguage } from '../i18n';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, getRaw } = useLanguage();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const product = getRaw(`products.items.${id}`);

  useEffect(() => {
    if (!product) {
      navigate('/products');
    }
  }, [product, navigate]);

  const handleAddToCart = () => {
    addToCart(id, qty);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const getCollectionGradient = (collectionId) => {
    const gradients = {
      tornasol: 'from-[#402C5A] to-[#316DBC]',
      geek: 'from-[#316DBC] to-[#92DE8B]',
      hogar: 'from-[#EAE0D5] to-[#C6AC8F]'
    };
    return gradients[collectionId] || 'from-brand-purple/20 to-brand-blue/20';
  };

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 min-h-[80vh] flex items-center">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square rounded-[2rem] border border-white/10 bg-[#111111] overflow-hidden group glow-brand flex flex-col justify-between"
        >
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-br ${getCollectionGradient(product.collection)}`} 
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-30 mix-blend-overlay" />
          
          <div className="relative z-20 p-6 md:p-8 flex justify-start">
            <h1 className="text-3xl md:text-4xl font-reem font-bold text-white drop-shadow-lg">
              {product.name}
            </h1>
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-12 md:p-20 z-10 pointer-events-none">
            {product.image ? (
              <motion.div
                className="w-full h-full pointer-events-auto"
                animate={{ 
                  y: [-8, 8, -8],
                  rotate: [-1.5, 1.5, -1.5]
                }}
                transition={{
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <img 
                  src={new URL(`../images/${product.image}`, import.meta.url).href}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 relative z-10 drop-shadow-[0_20px_50px_rgba(255,255,255,0.15)]"
                />
              </motion.div>
            ) : (
              <Box className="w-48 h-48 text-white/20 group-hover:scale-105 transition-transform duration-700 pointer-events-auto" strokeWidth={1} />
            )}
          </div>

          <div className="relative z-20 p-6 md:p-8 flex justify-between items-center mt-auto">
            <p className="text-sm md:text-base text-brand-green tracking-widest uppercase font-medium drop-shadow-lg">
              {t(`products.collections.${product.collection}.title`)}
            </p>
            <p className="text-4xl md:text-5xl font-jost font-bold text-white drop-shadow-lg">
              ${product.price.toLocaleString('en-US')}
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-8"
        >
          <div className="space-y-4 text-white/70 font-light leading-relaxed">
            <p>{product.desc}</p>
            
            <ul className="space-y-3 text-sm border-t border-white/10 pt-6 mt-6">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/50">{t('products.detail.dimensions')}</span>
                <span className="text-white">{product.size}</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/50">{t('products.detail.material')}</span>
                <span className="text-white">{product.material}</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/50">{t('products.detail.finish')}</span>
                <span className="text-white">{product.color}</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/50">{t('products.detail.weight')}</span>
                <span className="text-white">{product.weight}</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium text-white/50">{t('products.detail.qty')}</span>
              <div className="flex items-center gap-4 bg-[#111111] border border-white/10 rounded-full px-4 py-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-white/50 hover:text-white transition-colors">-</button>
                <span className="w-8 text-center text-white">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="text-white/50 hover:text-white transition-colors">+</button>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full py-4 rounded-full font-reem font-bold transition-all flex items-center justify-center gap-3 ${
                isAdded ? 'bg-brand-green text-[#050505]' : 'bg-white text-[#050505] hover:bg-brand-blue hover:text-white'
              }`}
            >
              <AnimatePresence mode="wait">
                {isAdded ? (
                  <motion.div
                    key="added"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    {t('products.detail.addedBtn')}
                  </motion.div>
                ) : (
                  <motion.div
                    key="add"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {t('products.detail.orderBtn')}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <p className="text-center text-xs text-white/30 mt-4 font-light">
              {t('products.detail.shippingInfo')}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
