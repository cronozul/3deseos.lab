import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';
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
    items: ['h-osito', 'h-latas', 'h-waffle', 'h-angel', 'h-llaves', 'h-ovejita'] 
  }
};

const Products = () => {
  const { t, getRaw } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedCollections, setExpandedCollections] = useState({});

  const toggleCollection = (key) => {
    setExpandedCollections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="relative min-h-screen bg-[#050505]">
      {/* Background Glows (Static for performance) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-purple/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-brand-blue/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        
        {/* Immersive Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-brand-yellow" />
            <span className="text-xs font-jost tracking-[0.3em] uppercase text-white/60">{t('products.badge')}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-reem font-bold mb-8 tracking-tighter leading-none">
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
          <div className="flex p-1.5 bg-[#111111]/80 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl overflow-x-auto no-scrollbar max-w-full">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-3 rounded-xl text-sm font-reem transition-all whitespace-nowrap ${activeFilter === 'all' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
            >
              {t('products.all')}
            </button>
            {Object.keys(collectionMeta).map((key) => {
              const meta = collectionMeta[key];
              const Icon = meta.icon;
              return (
                <button 
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`px-6 py-3 rounded-xl text-sm font-reem transition-all flex items-center gap-2 whitespace-nowrap ${activeFilter === key ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                >
                  <Icon className={`w-4 h-4 ${activeFilter === key ? 'text-brand-blue' : 'text-inherit'}`} />
                  {getRaw(`products.collections.${key}.title`)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Sections */}
        <div>
          <AnimatePresence mode="wait">
            {Object.keys(collectionMeta)
              .filter(key => activeFilter === 'all' || activeFilter === key)
              .map((key) => {
                const meta = collectionMeta[key];
                const cData = getRaw(`products.collections.${key}`);
                const isExpanded = expandedCollections[key];
                const displayedItems = isExpanded ? meta.items : meta.items.slice(0, 4);
                
                if (!cData) return null;
                return (
                  <motion.section 
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative mb-40 last:mb-0"
                  >
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                      <div className="max-w-2xl">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: 100 }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-1 bg-gradient-to-r from-brand-blue to-transparent mb-8"
                        />
                        <h2 className="text-4xl md:text-5xl font-reem font-bold mb-4">{cData.title}</h2>
                        <p className="text-white/40 font-light leading-relaxed">{cData.desc}</p>
                      </div>
                      {meta.items.length > 4 && (
                        <div 
                          onClick={() => toggleCollection(key)}
                          className="flex items-center gap-3 group cursor-pointer border-b border-white/5 pb-2"
                        >
                          <span className="text-sm font-jost tracking-widest text-white/50 group-hover:text-white transition-colors uppercase">
                            {isExpanded ? t('products.showless') : t('products.exploreMore')}
                          </span>
                          <ChevronRight className={`w-4 h-4 text-white/30 group-hover:text-white transition-all transform ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                        </div>
                      )}
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                      {displayedItems.map((productKey, pIdx) => (
                        <motion.div
                          key={productKey}
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.8, delay: pIdx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <ProductCard productKey={productKey} collectionData={{ ...cData, gradient: meta.gradient }} />
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Dynamic Ambient Light for Section */}
                    <div className={`absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br ${meta.gradient} blur-[250px] opacity-[0.05] pointer-events-none rounded-full`} />
                  </motion.section>
                );
              })}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-60 p-12 md:p-24 rounded-[4rem] bg-[#0A0A0A] border border-white/5 text-center relative overflow-hidden group/cta shadow-2xl"
        >
          {/* Decorative Gradients */}
          <div className="absolute inset-0 bg-brand-gradient opacity-[0.02] group-hover/cta:opacity-[0.05] transition-opacity duration-1000" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-purple/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-blue/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-reem font-bold mb-8 tracking-tighter leading-none">
              {t('products.customCTA.title')}
            </h2>
            <p className="text-white/40 text-lg md:text-xl font-light mb-12 leading-relaxed">
              {t('products.customCTA.desc')}
            </p>
            
            <Link to="/custom" className="inline-block">
              <motion.div 
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 rounded-full overflow-hidden transition-all bg-white text-black font-reem font-bold text-xl shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
              >
                <div className="absolute inset-0 bg-brand-blue translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-4 group-hover:text-white transition-colors">
                  {t('products.customCTA.button')}
                  <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
                </span>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Products;
