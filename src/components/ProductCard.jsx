import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';

const ProductCard = ({ id, productKey, collectionData }) => {
  const { getRaw } = useLanguage();
  const product = getRaw(`products.items.${productKey}`);
  
  if (!product) return null;

  // Dynamic price color based on collection
  let priceColorClass = 'text-brand-green';
  if (product.collection === 'tornasol') priceColorClass = 'text-[#C084FC]';
  else if (product.collection === 'geek') priceColorClass = 'text-brand-green';
  else if (product.collection === 'hogar') priceColorClass = 'text-blue-300';

  return (
    <Link to={`/products/${productKey}`}>
      <motion.div 
        whileHover={{ y: -10, scale: 1.02 }}
        className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-[#050505] transition-all duration-300 shadow-2xl glow-hover"
      >
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${collectionData.gradient} opacity-20 group-hover:opacity-40 transition-all duration-1000`} />
        
        {/* Animated Glow (Light Curtain) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none z-10" />

        {/* Center: Image with Floating Animation */}
        <div className="absolute inset-0 flex items-center justify-center p-10 md:p-14 pointer-events-none">
          {product.image ? (
            <motion.img 
              animate={{ 
                y: [0, -12, 0],
                rotate: [0, 1, 0, -1, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              src={new URL(`../images/${product.image}`, import.meta.url).href}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 relative z-20"
              style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5)) drop-shadow(0 0-10px rgba(255,255,255,0.1))" }}
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-md border border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-700" />
          )}
        </div>

        {/* Name: Upper Left */}
        <div className="absolute top-0 left-0 p-6 z-30">
          <h3 className="text-xl font-reem font-bold text-white/90 group-hover:text-white transition-colors leading-tight max-w-[150px]">
            {product.name}
          </h3>
        </div>

        {/* Footer info */}
        <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end z-30">
          <div className="flex flex-col gap-0">
            <p className="text-[10px] text-white/20 tracking-[0.2em] uppercase font-light">Collection</p>
            <p className="text-sm text-white/50 font-jost uppercase tracking-widest group-hover:text-white/80 transition-colors">{collectionData.title}</p>
          </div>
          
          <div className="text-right">
            <span className={`text-2xl font-bold font-jost ${priceColorClass} tracking-tighter drop-shadow-sm`}>
              $ {product.price.toLocaleString('es-CO')}
            </span>
          </div>
        </div>
        
        {/* Grain overlay - NOW ON TOP for integration */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.08] mix-blend-overlay pointer-events-none z-40"></div>

        {/* Dark readability gradients */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#050505]/40 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#050505]/60 to-transparent pointer-events-none z-10" />
      </motion.div>
    </Link>
  );
};

export default ProductCard;
