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
    <div className="relative h-[100dvh] overflow-hidden bg-[#050505]">
      {/* Interactive Background */}
      <WishesBackground />

      {/* Star Cursor (hero only) */}
      <StarCursor heroRef={heroRef} />

      {/* Main Frame */}
      <section
        ref={heroRef}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        style={{ cursor: 'none' }}
      >
        {/* Subtle Decorative Frame */}
        <div className="absolute inset-4 md:inset-8 border border-white/[0.03] rounded-[2rem] pointer-events-none" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] text-white/20 uppercase font-light pointer-events-none">
          3deseos.lab • Sueños en 3D
        </div>

        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] tracking-[0.3em] text-white/50 uppercase"
            >
              <Sparkles className="w-3 h-3 text-brand-purple" />
              {t('home.heroSubtitle')}
            </motion.div>

            {/* Title */}
            <h1 className="text-6xl md:text-[10rem] font-reem font-bold leading-[0.9] tracking-tighter">
              <span className="text-white block opacity-90">
                {t('home.heroTitle')}
              </span>
              <span className="text-transparent bg-clip-text bg-brand-gradient block">
                {t('home.heroHighlight')}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-white/40 font-light max-w-xl leading-relaxed mx-auto mt-4">
              {t('home.heroDesc')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
              <Link
                to="/products"
                style={{ cursor: 'pointer' }}
                className="group relative px-10 py-5 rounded-full overflow-hidden transition-all active:scale-95 bg-white text-black font-reem font-bold text-lg"
              >
                <div className="absolute inset-0 bg-brand-blue translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors">
                  {t('home.explore')}
                  <Sparkles className="w-4 h-4" />
                </span>
              </Link>

              <Link
                to="/custom"
                style={{ cursor: 'pointer' }}
                className="px-10 py-5 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 backdrop-blur-md transition-all text-white font-reem font-bold text-lg active:scale-95"
              >
                {t('home.customOrder')}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Status Bar */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-[10px] tracking-widest text-white/20 font-light uppercase pointer-events-none">
          <div className="flex gap-4">
            <span>PLA</span>
            <span>Est. 2026</span>
          </div>
        </div>
      </section>

      {/* Floating corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-brand-purple/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-blue/10 blur-3xl pointer-events-none" />
    </div>
  );
};

export default Home;
