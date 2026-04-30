import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { Sparkles, Quote, Instagram } from 'lucide-react';
import WishesBackground from '../components/WishesBackground';
import StarCursor from '../components/StarCursor';

const Home = () => {
  const { t, getRaw } = useLanguage();
  const heroRef = useRef(null);
  const testimonials = getRaw('community.testimonials') || [];
  const instagramCards = getRaw('instagram.cards') || [];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Interactive Smoke Background */}
      <WishesBackground />

      {/* Star Cursor (hero only) */}
      <StarCursor heroRef={heroRef} />

      {/* Hero section */}
      <section
        ref={heroRef}
        className="relative z-10 px-6 min-h-screen flex items-center justify-center"
        style={{ cursor: 'none' }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center gap-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs tracking-[0.2em] text-white/60 uppercase"
            >
              <Sparkles className="w-3 h-3 text-brand-purple" />
              {t('home.heroSubtitle') || 'Diseño de Vanguardia'}
            </motion.div>

            <h1 className="text-6xl md:text-9xl font-reem font-bold leading-[1.05] tracking-tight">
              <span className="text-white block" style={{ textShadow: '0 0 40px rgba(0,0,0,0.9)' }}>
                {t('home.heroTitle')}
              </span>
              <span className="text-gradient block mt-2">{t('home.heroHighlight')}</span>
            </h1>

            <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl leading-relaxed mx-auto">
              {t('home.heroDesc')}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 mt-12">
              <Link 
                to="/products"
                style={{ cursor: 'pointer' }}
                className="group relative px-10 py-5 rounded-full overflow-hidden transition-all active:scale-95"
              >
                <div className="absolute inset-0 bg-white group-hover:bg-brand-blue transition-all duration-300 group-hover:scale-105" />
                <span className="relative flex items-center gap-3 text-[#050505] group-hover:text-white font-reem font-bold text-lg transition-colors duration-300">
                  {t('home.explore')}
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Sparkles className="w-5 h-5 text-brand-purple group-hover:text-white transition-colors" />
                  </motion.div>
                </span>
              </Link>

              <Link 
                to="/custom"
                style={{ cursor: 'pointer' }}
                className="px-10 py-5 rounded-full border border-white/10 hover:border-white/30 backdrop-blur-md transition-all text-white font-reem font-bold text-lg active:scale-95"
              >
                {t('home.customOrder') || 'Pedido Personalizado'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Section */}
      <section className="relative z-10 py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] tracking-[0.3em] text-brand-blue uppercase mb-6">
              <Sparkles className="w-3 h-3" />
              {t('community.badge')}
            </div>
            <h2 className="text-4xl md:text-6xl font-reem font-bold mb-6 text-white">
              {t('community.title')}
            </h2>
            <p className="text-white/40 font-light max-w-2xl mx-auto">
              {t('community.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testi, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-brand-blue/20 transition-all group"
              >
                <Quote className="w-8 h-8 text-brand-blue/20 mb-6 group-hover:text-brand-blue/40 transition-colors" />
                <p className="text-white/70 font-light leading-relaxed mb-8 italic">
                  "{testi.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 flex items-center justify-center text-xs font-bold text-white">
                    {testi.author[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{testi.author}</h4>
                    <p className="text-xs text-white/30">{testi.handle}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 text-white/40 hover:text-white transition-colors cursor-pointer group"
            >
              <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-xl font-jost tracking-widest">{t('instagram.handle')}</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {instagramCards.map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="aspect-square relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-brand-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <Instagram className="w-8 h-8 text-white/10 group-hover:text-white transition-all duration-500 group-hover:scale-110" />
                  <span className="text-[10px] tracking-[0.4em] text-white/10 group-hover:text-white transition-all duration-500 uppercase font-bold text-center px-4">
                    {card.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating geometric decorations */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <motion.div 
          animate={{ y: [0, -40, 0], x: [0, 20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-[15%] w-32 h-32 border border-white/10 rounded-3xl rotate-12" 
        />
        <motion.div 
          animate={{ y: [0, 40, 0], x: [0, -20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-[10%] w-48 h-48 border border-white/10 rounded-full" 
        />
      </div>
    </div>
  );
};

export default Home;
