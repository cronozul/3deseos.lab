import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, ShoppingBag, Check, Paintbrush, Palette, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, getRaw } = useLanguage();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState('white');
  const [wantsPainting, setWantsPainting] = useState(false);

  const product = getRaw(`products.items.${id}`);
  const [[currentSlide, direction], setSlide] = useState([0, 0]);
  const totalSlides = 3;

  useEffect(() => {
    if (!product) {
      navigate('/products');
    } else {
      // Default to product's default color if it's in the list
      if (product.color?.toLowerCase().includes('tornasol')) {
        setSelectedColor('tornasol');
      }
    }
  }, [product, navigate]);

  const paginate = (newDirection) => {
    const nextSlide = (currentSlide + newDirection + totalSlides) % totalSlides;
    setSlide([nextSlide, newDirection]);
  };

  const goToSlide = (index) => {
    const newDirection = index > currentSlide ? 1 : -1;
    setSlide([index, newDirection]);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 45 : -45
    })
  };

  const availableColors = [
    { id: 'white', code: '#FFFFFF' },
    { id: 'black', code: '#1A1A1A' },
    { id: 'red', code: '#E53E3E' },
    { id: 'blue', code: '#3182CE' },
    { id: 'gold', code: '#D4AF37' },
    { id: 'gray', code: '#718096' },
    { id: 'tornasol', code: 'linear-gradient(135deg, #402C5A, #316DBC)' }
  ];

  const handleAddToCart = () => {
    addToCart(id, qty, { color: selectedColor, painting: wantsPainting });
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
        
        <div className="relative group">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square rounded-[3rem] border border-white/5 bg-transparent overflow-hidden shadow-2xl"
          >
            {/* Animated Glow (Light Curtain) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none z-20" />
            
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.05] mix-blend-overlay" />
            
            <div className="absolute inset-0 flex items-center justify-center p-0 overflow-hidden">
              {product.image ? (
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.img 
                    key={currentSlide}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                      rotateY: { duration: 0.4 }
                    }}
                    src={new URL(`../images/${product.image}`, import.meta.url).href}
                    alt={product.name}
                    className="w-full h-full object-contain relative z-10 drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] scale-110"
                    style={{ perspective: 1000 }}
                  />
                </AnimatePresence>
              ) : (
                <Box className="w-48 h-48 text-white/10" strokeWidth={1} />
              )}
            </div>

            {/* Carousel Arrows */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
              <button 
                onClick={() => paginate(-1)}
                className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-90"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => paginate(1)}
                className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-90"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Carousel Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
              {[...Array(totalSlides)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === i 
                    ? 'w-10 h-2 bg-white' 
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-10"
        >
          <div>
            <p className="text-sm text-brand-blue tracking-[0.2em] uppercase mb-4 font-medium opacity-60">
              {t(`products.collections.${product.collection}.title`)}
            </p>
            <h1 className="text-5xl md:text-6xl font-reem font-bold mb-4 tracking-tighter">{product.name}</h1>
            <p className="text-3xl font-jost font-bold text-white tracking-tight">${product.price.toLocaleString('es-CO')}</p>
          </div>

          <div className="space-y-8">
            <p className="text-white/50 font-light leading-relaxed text-lg">{product.desc}</p>
            
            {/* Customization Options */}
            <div className="space-y-8 pt-8 border-t border-white/5">
              
              {/* Color Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-white/40 uppercase tracking-widest">
                  <Palette className="w-4 h-4" />
                  {t('products.detail.options.color')}
                </div>
                <div className="flex flex-wrap gap-3">
                  {availableColors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`relative w-10 h-10 rounded-full transition-all duration-300 ${
                        selectedColor === color.id 
                        ? 'ring-2 ring-white ring-offset-4 ring-offset-[#050505] scale-110' 
                        : 'opacity-40 hover:opacity-100 scale-100'
                      }`}
                      style={{ background: color.code, border: color.id === 'white' ? '1px solid rgba(255,255,255,0.1)' : 'none' }}
                      title={t(`products.detail.options.colors.${color.id}`)}
                    >
                      {selectedColor === color.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check className={`w-4 h-4 ${color.id === 'white' ? 'text-black' : 'text-white'}`} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-white/30 font-medium italic">
                  {t(`products.detail.options.colors.${selectedColor}`)}
                </p>
              </div>

              {/* Painting Option */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-white/40 uppercase tracking-widest">
                  <Paintbrush className="w-4 h-4" />
                  {t('products.detail.options.paint')}
                </div>
                <div className="flex gap-4">
                  {[
                    { val: true, label: t('products.detail.options.yes') },
                    { val: false, label: t('products.detail.options.no') }
                  ].map((option) => (
                    <button
                      key={option.label}
                      onClick={() => setWantsPainting(option.val)}
                      className={`px-6 py-3 rounded-xl border text-sm font-reem transition-all duration-300 ${
                        wantsPainting === option.val
                        ? 'bg-white text-black border-white shadow-xl'
                        : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Specs */}
            <ul className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5">
              <li className="flex flex-col">
                <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] mb-1">{t('products.detail.dimensions')}</span>
                <span className="text-sm text-white/80 font-medium">{product.size}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] mb-1">{t('products.detail.material')}</span>
                <span className="text-sm text-white/80 font-medium">{product.material}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] mb-1">{t('products.detail.finish')}</span>
                <span className="text-sm text-white/80 font-medium">{product.color}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] mb-1">{t('products.detail.weight')}</span>
                <span className="text-sm text-white/80 font-medium">{product.weight}</span>
              </li>
            </ul>
          </div>

          <div className="pt-8 border-t border-white/5">
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm font-bold text-white/40 uppercase tracking-[0.2em]">{t('products.detail.qty')}</span>
              <div className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-2xl px-6 py-3">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-white/40 hover:text-white transition-colors text-xl">-</button>
                <span className="w-8 text-center text-white font-bold text-xl">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="text-white/40 hover:text-white transition-colors text-xl">+</button>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full py-6 rounded-2xl font-reem font-bold text-lg transition-all duration-500 flex items-center justify-center gap-4 ${
                isAdded ? 'bg-brand-green text-[#050505]' : 'bg-white text-black hover:bg-brand-blue hover:text-white shadow-2xl'
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
                    <Check className="w-6 h-6" />
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
                    <ShoppingBag className="w-6 h-6" />
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
