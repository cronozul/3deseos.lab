import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n.jsx';
import { Code, PenTool, Music, Heart, MapPin } from 'lucide-react';
import WishesBackground from '../components/WishesBackground';

const About = () => {
  const { t, getRaw } = useLanguage();
  const features = getRaw('about.features') || [];

  const iconMap = {
    Code: Code,
    PenTool: PenTool,
    Music: Music,
    Heart: Heart
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-jost">
      {/* Background Atmosphere */}
      <WishesBackground />
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="space-y-6">
              {/* Accent Line */}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-[2px] bg-brand-blue" 
              />
              
              <div className="space-y-2">
                <h1 className="text-7xl md:text-8xl font-reem font-bold text-white tracking-tighter leading-tight">
                  {t('about.title')}
                </h1>
                <p className="text-xl md:text-2xl text-brand-blue font-medium italic">
                  {t('about.subtitle')}
                </p>
              </div>
            </div>

            <div className="space-y-8 text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              <p>{t('about.desc1')}</p>
              <p>{t('about.desc2')}</p>
              <p>{t('about.desc3')}</p>
            </div>

            <div className="flex items-center gap-3 text-white/30 pt-4 border-t border-white/5 w-fit">
              <MapPin className="w-4 h-4" />
              <span className="text-[10px] tracking-[0.4em] font-bold uppercase">{t('about.location')}</span>
            </div>
          </motion.div>

          {/* Right Column: 3D Hub Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex items-center justify-center py-12 lg:py-0"
          >
            {/* Central 3D Circle */}
            <div className="relative z-10 w-24 h-24 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)] group">
               <div className="absolute inset-0 bg-brand-blue/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
               <span className="text-2xl font-reem font-bold text-white tracking-widest relative z-10">3D</span>
            </div>

            {/* Connecting Lines (Circular background) */}
            <div className="absolute w-[80%] h-[80%] border border-white/5 rounded-full pointer-events-none" />
            <div className="absolute w-[60%] h-[60%] border border-white/[0.02] rounded-full pointer-events-none" />

            {/* Cards Grid */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 lg:gap-8">
              {features.map((item, idx) => {
                const IconComponent = iconMap[item.icon] || Heart;
                
                // Color mapping based on label/index
                const colors = [
                  { text: 'text-brand-blue', hover: 'group-hover:text-brand-blue', bg: 'group-hover:bg-brand-blue/10' },
                  { text: 'text-brand-purple', hover: 'group-hover:text-brand-purple', bg: 'group-hover:bg-brand-purple/10' },
                  { text: 'text-brand-yellow', hover: 'group-hover:text-brand-yellow', bg: 'group-hover:bg-brand-yellow/10' },
                  { text: 'text-brand-red', hover: 'group-hover:text-brand-red', bg: 'group-hover:bg-brand-red/10' }
                ][idx];

                // Alignment classes based on index
                const alignClasses = [
                  "justify-self-end self-end", // TL
                  "justify-self-start self-end", // TR
                  "justify-self-end self-start", // BL
                  "justify-self-start self-start" // BR
                ][idx];

                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className={`${alignClasses} w-40 lg:w-48 p-6 lg:p-8 rounded-[1.5rem] bg-white/[0.01] border border-white/5 backdrop-blur-sm flex flex-col items-center justify-center text-center gap-4 transition-all duration-300 group hover:border-white/20 hover:bg-white/[0.03]`}
                  >
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white/5 flex items-center justify-center transition-colors ${colors.bg}`}>
                      <IconComponent className={`w-5 h-5 lg:w-6 lg:h-6 transition-colors ${colors.text}`} />
                    </div>
                    <span className={`text-[9px] lg:text-[10px] tracking-[0.2em] font-bold uppercase transition-colors leading-tight ${colors.hover} text-white/40`}>
                      {item.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Decorative Fixed Glows */}
      <div className="fixed top-0 left-0 w-full h-full bg-radial-gradient from-brand-blue/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default About;
