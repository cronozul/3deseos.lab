import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';

const ProductCard = ({ id, productKey, collectionData }) => {
  const { getRaw } = useLanguage();
  const product = getRaw(`products.items.${productKey}`);
  
  if (!product) return null;

  return (
    <Link to={`/products/${productKey}`}>
      <motion.div 
        whileHover={{ y: -10, scale: 1.02 }}
        className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-[#111111] transition-all glow-hover"
      >
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${collectionData.gradient} transition-opacity`} 
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
        
        {/* Grain overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-20 mix-blend-overlay"></div>

        {/* Product Image */}
        <div className="absolute inset-0 flex items-center justify-center p-8 z-10 pointer-events-none">
          {product.image ? (
            <motion.div
              className="w-full h-full pointer-events-auto"
              animate={{ 
                y: [-4, 4, -4],
                rotate: [-1, 1, -1]
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <img 
                src={new URL(`../images/${product.image}`, import.meta.url).href}
                alt={product.name}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 relative z-10 drop-shadow-2xl"
              />
            </motion.div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-md border border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-700 pointer-events-auto" />
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#050505] to-transparent">
          <p className="text-xs text-white/50 tracking-widest uppercase mb-1">{collectionData.title}</p>
          <div className="flex justify-between items-end">
            <h3 className="text-xl font-reem text-white">{product.name}</h3>
            <span className="text-sm font-jost text-brand-green">{product.price}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
