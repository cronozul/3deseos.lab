import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../i18n.jsx';
import ProductCard from '../components/ProductCard';
import { Sparkles, Home, Zap, ChevronRight } from 'lucide-react';

const collectionMeta = {
  tornasol: { 
    id: 'tornasol', 
    icon: Sparkles,
    gradient: 'from-[#402C5A] to-[#316DBC]', 
    accent: '#A78BFA',
    items: ['t-carita', 't-amigos', 't-ballenita', 't-florero', 't-trex', 't-sardinas'] 
  },
  geek: { 
    id: 'geek', 
    icon: Zap,
    gradient: 'from-[#316DBC] to-[#92DE8B]', 
    accent: '#92DE8B',
    items: ['g-spiderman', 'g-gow', 'g-jinx', 'g-hollow', 'g-dados'] 
  },
  hogar: { 
    id: 'hogar', 
    icon: Home,
    gradient: 'from-[#EAE0D5] to-[#C6AC8F]', 
    accent: '#C6AC8F',
    items: ['h-latas', 'h-waffle', 'h-angel', 'h-llaves', 'h-ovejita'] 
  }
};

const Products = () => {
  const { t, getRaw, lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const containerRef = useRef(null);

  // Performance optimization: simplified scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const blobY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const filteredCollections = useMemo(() => {
    return Object.keys(collectionMeta).filter(key => activeFilter === 'all' || activeFilter === key);
  }, [activeFilter]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#050505] overflow-x-hidden">
      {/* Optimized Background Blobs */}
      <motion.div 
        style={{ y: blobY }}
        className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-brand-purple/10 blur-[100px] rounded-full pointer-events-none will-change-transform" 
      />
      <motion.div 
        style={{ y: blob2Y }}
        className="absolute bottom-[5%] right-[-5%] w-[350px] h-[350px] bg-brand-blue/5 blur-[100px] rounded-full pointer-events-none will-change-transform" 
      />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        
        {/* Immersive Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 mt-12 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-brand-yellow" />
            <span className="text-xs font-jost tracking-[0.3em] uppercase text-white/60">Artesanía Digital</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-reem font-bold mb-8 tracking-tighter leading-none text-white">
            {t('products.title').split(' ')[0]} <br />
            <span className="text-transparent bg-clip-text bg-brand-gradient">
              {t('products.title').split(' ').slice(1).join(' ')}
            </span>
          </h1>
          <p className="text-white/40 font-light max-w-2xl text-lg md:text-xl leading-relaxed mx-auto md:mx-0">
            {t('products.subtitle')}
          </p>
        </motion.div>

        {/* Collection Navigator */}
        <div className="sticky top-24 z-50 mb-20 flex justify-center md:justify-start">
          <div className="flex p-1.5 bg-[#050505]/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-x-auto no-scrollbar max-w-full">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-3 rounded-xl text-sm font-reem transition-all whitespace-nowrap ${activeFilter === 'all' ? 'bg-white text-black font-bold' : 'text-white/40 hover:text-white'}`}
            >
              {lang === 'es' ? 'Todos' : 'All'}
            </button>
            {Object.keys(collectionMeta).map((key) => {
              const meta = collectionMeta[key];
              const Icon = meta.icon;
              return (
                <button 
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`px-6 py-3 rounded-xl text-sm font-reem transition-all flex items-center gap-2 whitespace-nowrap ${activeFilter === key ? 'bg-white text-black font-bold' : 'text-white/40 hover:text-white'}`}
                >
                  <Icon className={`w-4 h-4 ${activeFilter === key ? 'text-brand-blue' : 'text-inherit'}`} />
                  {getRaw(`products.collections.${key}.title`)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Sections */}
        <div className="space-y-40">
          <AnimatePresence mode="wait">
            {filteredCollections.map((key) => {
              const meta = collectionMeta[key];
              const cData = getRaw(`products.collections.${key}`);
              
              if (!cData) return null;

              return (
                <motion.section
                  key={key}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* Subtle Gradient Glow */}
                  <div className={`absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br ${meta.gradient} blur-[200px] opacity-10 pointer-events-none`} />

                  {/* Section Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative z-10">
                    <div className="max-w-2xl">
                      <div className="h-0.5 bg-gradient-to-r from-brand-blue/50 to-transparent mb-8 w-24" />
                      <h2 className="text-4xl md:text-5xl font-reem font-bold mb-4 text-white uppercase tracking-tighter">{cData.title}</h2>
                      <p className="text-white/40 font-light leading-relaxed">{cData.desc}</p>
                    </div>
                    <div className="flex items-center gap-3 group cursor-pointer border-b border-white/5 pb-2">
                      <span className="text-sm font-jost tracking-widest text-white/50 group-hover:text-white transition-colors uppercase">
                        {lang === 'es' ? 'Explorar' : 'Explore'}
                      </span>
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Product Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    {meta.items.map((productKey, pIdx) => (
                      <motion.div
                        key={productKey}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: pIdx * 0.05 }}
                      >
                        <ProductCard productKey={productKey} collectionData={{ ...cData, gradient: meta.gradient }} />
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-60 p-12 md:p-20 rounded-[3rem] bg-[#111111] border border-white/5 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-brand-gradient opacity-[0.02] blur-3xl" />
          <h2 className="text-4xl md:text-6xl font-reem font-bold mb-8 relative z-10 text-white">
            {lang === 'es' ? '¿Tienes un diseño en mente?' : 'Have a design in mind?'}
          </h2>
          <p className="text-white/50 mb-12 max-w-xl mx-auto relative z-10 text-lg">
            {lang === 'es' 
              ? 'Realizamos impresiones personalizadas con la misma calidad y acabado de nuestras colecciones exclusivas.'
              : 'We perform custom prints with the same quality and finish as our exclusive collections.'}
          </p>
          <motion.a 
            href="/custom"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-5 rounded-full bg-white text-black font-reem font-bold shadow-xl relative z-10 transition-transform"
          >
            {lang === 'es' ? 'Pedido Personalizado' : 'Custom Order'}
          </motion.a>
        </motion.div>

      </div>
    </div>
  );
};

export default Products;
