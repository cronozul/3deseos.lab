import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n.jsx';
import { Code, PenTool, Box, Music, Heart, MapPin } from 'lucide-react';

const About = () => {
  const { t, getRaw } = useLanguage();
  const features = getRaw('about.features') || [];

  const iconMap = {
    Code: Code,
    PenTool: PenTool,
    Box: Box,
    Music: Music,
    Heart: Heart
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-12 md:mt-24">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-reem font-bold text-white tracking-tighter">
              {t('about.title')}
            </h1>
            <p className="text-brand-purple font-jost tracking-[0.3em] uppercase text-sm font-bold">
              {t('about.subtitle')}
            </p>
          </div>

          <div className="space-y-8 text-white/60 font-light text-lg leading-relaxed max-w-xl">
            <p>{t('about.desc1')}</p>
            <p>{t('about.desc2')}</p>
            <p>{t('about.desc3')}</p>
          </div>

          <div className="flex items-center gap-4 text-white/40 pt-4 border-t border-white/5 w-fit">
            <MapPin className="w-5 h-5 text-brand-blue" />
            <span className="text-xs tracking-[0.4em] font-bold uppercase">{t('about.location')}</span>
          </div>
        </motion.div>

        {/* Features/Icons Grid */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 gap-6"
        >
          {features.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Box;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm flex flex-col items-center justify-center text-center gap-4 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 flex items-center justify-center group">
                  <IconComponent className="w-6 h-6 text-white transition-transform group-hover:rotate-12" />
                </div>
                <span className="text-[10px] tracking-[0.2em] font-bold text-white/40 uppercase">
                  {item.label}
                </span>
              </motion.div>
            );
          })}
          
          {/* Custom element for branding */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-purple/10 to-brand-blue/10 border border-white/5 flex items-center justify-center overflow-hidden relative group">
             <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
            <span className="font-reem text-xl font-bold text-white opacity-20 rotate-[-15deg] tracking-widest uppercase transition-transform group-hover:scale-110">
              3deseos.lab
            </span>
          </div>
        </motion.div>
      </div>

      {/* Background Signature Text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="mt-32 text-center"
      >
        <span className="text-[60px] sm:text-[100px] lg:text-[160px] font-reem font-bold text-white/[0.02] select-none uppercase tracking-tighter block whitespace-nowrap overflow-hidden">
          Jessica & Gabriel
        </span>
      </motion.div>
    </div>
  );
};

export default About;
