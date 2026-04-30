import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { Sparkles } from 'lucide-react';
import WishesBackground from '../components/WishesBackground';
import StarCursor from '../components/StarCursor';

const Home = () => {
  const { t } = useLanguage();
  const heroRef = useRef(null);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col justify-center">
      {/* Interactive Smoke Background */}
      <WishesBackground />

      {/* Star Cursor (hero only) */}
      <StarCursor heroRef={heroRef} />

      {/* Hero section — custom cursor scoped here */}
      <section
        ref={heroRef}
        className="relative z-10 px-6 pt-20 min-h-screen flex items-center justify-center"
        style={{ cursor: 'none' }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center gap-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs tracking-[0.2em] text-white/60 uppercase"
            >
              <Sparkles className="w-3 h-3 text-brand-purple" />
              {t('home.heroSubtitle') || 'Diseño de Vanguardia'}
            </motion.div>

            {/* Title */}
            <h1 className="text-6xl md:text-9xl font-reem font-bold leading-[1.05] tracking-tight">
              <span className="text-white block" style={{ textShadow: '0 0 40px rgba(0,0,0,0.9)' }}>
                {t('home.heroTitle')}
              </span>
              <span className="text-gradient block mt-2">{t('home.heroHighlight')}</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl leading-relaxed mx-auto">
              {t('home.heroDesc')}
            </p>

            {/* CTAs — restore default cursor on interactive elements */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-12">
              <Link 
                to="/products"
                style={{ cursor: 'pointer' }}
                className="group relative px-10 py-5 rounded-full overflow-hidden transition-all active:scale-95"
              >
                <div className="absolute inset-0 bg-white transition-transform group-hover:scale-105" />
                <span className="relative flex items-center gap-3 text-[#050505] font-reem font-bold text-lg">
                  {t('home.explore')}
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Sparkles className="w-5 h-5 text-brand-purple" />
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

      {/* Floating geometric decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
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
