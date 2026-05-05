import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, ChevronRight, Check, Plus, Minus } from 'lucide-react';
import { useLanguage } from '../i18n';
import { useCart } from '../context/CartContext';

const ProductCard = ({ productKey, collectionData }) => {
  const { t, getRaw } = useLanguage();
  const { addToCart } = useCart();
  const [[currentSlide, direction], setSlide] = useState([0, 0]);
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const product = getRaw(`products.items.${productKey}`);
  
  if (!product) return null;

  const totalSlides = 3;

  const paginate = (newDirection) => {
    const nextSlide = (currentSlide + newDirection + totalSlides) % totalSlides;
    setSlide([nextSlide, newDirection]);
  };

  const nextSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    paginate(1);
  };

  const prevSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    paginate(-1);
  };

  const goToSlide = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    const newDirection = index > currentSlide ? 1 : -1;
    setSlide([index, newDirection]);
  };

  const updateQty = (e, delta) => {
    e.preventDefault();
    e.stopPropagation();
    setQty(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(productKey, qty);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Price formatting
  const formattedPrice = product.price.toLocaleString('es-CO');

  // Dynamic collection colors for specific hover states
  const collectionColors = {
    tornasol: {
      bg: 'hover:bg-brand-purple',
      border: 'hover:border-brand-purple',
      text: 'hover:text-brand-purple'
    },
    geek: {
      bg: 'hover:bg-brand-green',
      border: 'hover:border-brand-green',
      text: 'hover:text-brand-green'
    },
    hogar: {
      bg: 'hover:bg-[#C6AC8F]',
      border: 'hover:border-[#C6AC8F]',
      text: 'hover:text-[#C6AC8F]'
    }
  };

  const colors = collectionColors[product.collection] || collectionColors.geek;

  // Pan variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    })
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group bg-[#0A0A0A] rounded-[2.5rem] overflow-hidden border border-white/5 transition-all duration-500 hover:border-white/10 shadow-2xl flex flex-col h-full"
    >
      <Link to={`/products/${productKey}`} className="flex flex-col h-full">
        {/* Top: Image Section */}
        <div className="relative aspect-square overflow-hidden bg-transparent">
          {/* Animated Glow (Light Curtain) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none z-20" />
          
          {/* Carousel Arrows */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-90"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Product Image - Full Width */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
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
                    opacity: { duration: 0.2 }
                  }}
                  src={new URL(`../images/${product.image}`, import.meta.url).href}
                  alt={product.name}
                  className="w-full h-full object-contain relative z-10"
                  style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" }}
                />
              </AnimatePresence>
            ) : (
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 shadow-2xl" />
            )}
          </div>

          {/* Carousel Dots - Only show on hover */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {[...Array(totalSlides)].map((_, i) => (
              <button
                key={i}
                onClick={(e) => goToSlide(e, i)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === i 
                  ? 'w-6 h-1.5 bg-white' 
                  : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Grain overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.05] mix-blend-overlay pointer-events-none"></div>
        </div>

        {/* Bottom: Content Section */}
        <div className="p-8 flex flex-col gap-5 flex-grow">
          <div className="space-y-1">
            <p className="text-[10px] text-white/30 tracking-[0.3em] uppercase font-light">
              {collectionData.title}
            </p>
            <h3 className={`text-xl font-reem font-bold text-white ${colors.text} transition-colors duration-300`}>
              {product.name}
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-jost font-bold text-white tracking-tighter">
              $ {formattedPrice}
            </p>
            
            {/* Collection-specific Swatches */}
            <div className="flex gap-1.5">
              {product.collection === 'tornasol' ? (
                <>
                  <div className={`w-3 h-3 rounded-full border border-white/10 ${collectionData.gradient} bg-gradient-to-br`} />
                  <div className="w-3 h-3 rounded-full border border-white/10 bg-white shadow-inner" />
                  <div className="w-3 h-3 rounded-full border border-white/10 bg-[#1A1A1A] shadow-inner" />
                </>
              ) : (
                <>
                  <div className="w-3 h-3 rounded-full border border-white/10 bg-white shadow-inner" />
                  <div className="w-3 h-3 rounded-full border border-white/10 bg-[#1A1A1A] shadow-inner" />
                  <div className="w-3 h-3 rounded-full border border-white/10 bg-[#E53E3E] shadow-inner" />
                </>
              )}
            </div>
          </div>

          {/* Action Bar (Quantity + Button) */}
          <div className="mt-auto flex items-center gap-3 z-20">
            {/* Minimal Quantity Selector */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1">
              <button 
                onClick={(e) => updateQty(e, -1)}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs text-white font-bold w-6 text-center">{qty}</span>
              <button 
                onClick={(e) => updateQty(e, 1)}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Compact Add Button */}
            <button 
              onClick={handleAddToCart}
              className={`flex-grow h-10 rounded-2xl border flex items-center justify-center gap-2 px-4 transition-all duration-500 text-white ${
                isAdded 
                ? 'bg-brand-green border-brand-green text-[#050505]' 
                : `bg-white/5 border-white/10 ${colors.bg} ${colors.border} hover:text-[#050505]`
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                {isAdded ? (
                  <Check className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                )}
                <span className="text-[10px] font-reem font-bold uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis">
                  {isAdded ? t('products.detail.addedBtn') : t('products.detail.orderBtn')}
                </span>
              </div>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
