import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n.jsx';
import { Code, PenTool, Music, Heart, MapPin } from 'lucide-react';
import WishesBackground from '../components/WishesBackground';

const About = () => {
  const { t, getRaw } = useLanguage();
  const features = getRaw('about.features') || [];

  const iconMap = {
    Code:    Code,
    PenTool: PenTool,
    Music:   Music,
    Heart:   Heart,
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-jost">
      {/* Background */}
      <WishesBackground />
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10" aria-hidden="true" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-20 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left Column: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <Heart className="w-4 h-4 text-brand-red" aria-hidden="true" />
                <span className="text-xs font-jost tracking-[0.3em] uppercase text-white/60">{t('about.badge')}</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-reem font-bold text-white tracking-tighter leading-tight">
                  {t('about.title')}
                </h1>
                <p className="text-xl md:text-2xl text-brand-blue font-medium italic">
                  {t('about.subtitle')}
                </p>
              </div>
            </div>

            <div className="space-y-6 text-white/70 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              <p>{t('about.desc1')}</p>
              <p>{t('about.desc2')}</p>
              <p>{t('about.desc3')}</p>
            </div>

            <div className="flex items-center gap-3 text-white/60 pt-4 border-t border-white/5 w-fit mx-auto lg:mx-0">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span className="text-[10px] tracking-[0.4em] font-bold uppercase">{t('about.location')}</span>
            </div>
          </motion.div>

          {/* Right Column: 3D Hub Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex items-center justify-center min-h-[360px] sm:min-h-[440px] lg:min-h-0 py-8 lg:py-0"
            aria-hidden="true"
          >
            {/* Central 3D Circle */}
            <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)] group">
              <div className="absolute inset-0 bg-brand-blue/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-xl sm:text-2xl font-reem font-bold text-white tracking-widest relative z-10">3D</span>
            </div>

            {/* Connecting Lines */}
            <div className="absolute w-[80%] h-[80%] border border-white/5 rounded-full pointer-events-none" />
            <div className="absolute w-[60%] h-[60%] border border-white/[0.02] rounded-full pointer-events-none" />

            {/* Cards Grid */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4 lg:gap-8">
              {features.map((item, idx) => {
                const IconComponent = iconMap[item.icon] || Heart;

                const colors = [
                  { text: 'text-brand-blue',   hover: 'group-hover:text-brand-blue',   bg: 'group-hover:bg-brand-blue/10'   },
                  { text: 'text-brand-purple',  hover: 'group-hover:text-brand-purple', bg: 'group-hover:bg-brand-purple/10' },
                  { text: 'text-brand-yellow',  hover: 'group-hover:text-brand-yellow', bg: 'group-hover:bg-brand-yellow/10' },
                  { text: 'text-brand-red',     hover: 'group-hover:text-brand-red',    bg: 'group-hover:bg-brand-red/10'    },
                ][idx];

                const alignClasses = [
                  'justify-self-end self-end',   // TL
                  'justify-self-start self-end',  // TR
                  'justify-self-end self-start',  // BL
                  'justify-self-start self-start', // BR
                ][idx];

                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className={`${alignClasses} w-[46%] max-w-[192px] p-3 sm:p-5 lg:p-8 rounded-[1.2rem] sm:rounded-[1.5rem] bg-white/[0.01] border border-white/5 backdrop-blur-sm flex flex-col items-center justify-center text-center gap-2 sm:gap-4 transition-all duration-300 group hover:border-white/20 hover:bg-white/[0.03]`}
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-white/5 flex items-center justify-center transition-colors ${colors.bg}`}>
                      <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-colors ${colors.text}`} />
                    </div>
                    <span className={`text-[8px] sm:text-[10px] lg:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] font-bold uppercase transition-colors leading-tight ${colors.hover} text-white/60`}>
                      {item.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Decorative Glows */}
      <div className="fixed top-0 left-0 w-full h-full bg-radial-gradient from-brand-blue/5 to-transparent pointer-events-none" aria-hidden="true" />
    </div>
  );
};

export default About;
