import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n.jsx';
import { Quote, Instagram, Sparkles, Users } from 'lucide-react';

const Community = () => {
  const { t, getRaw } = useLanguage();
  const testimonials = getRaw('community.testimonials') || [];
  const instagramCards = getRaw('instagram.cards') || [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      {/* Community Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-24"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
          <Users className="w-4 h-4 text-brand-blue" />
          <span className="text-xs font-jost tracking-[0.3em] uppercase text-white/60">{t('community.badge')}</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-reem font-bold mb-8 text-white tracking-tighter leading-none">
          {t('community.title')}
        </h1>
        <p className="text-white/50 font-light max-w-2xl mx-auto text-lg">
          {t('community.subtitle')}
        </p>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
        {testimonials.map((testi, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="group relative p-8 rounded-3xl bg-[#111111] border border-white/5 hover:border-brand-blue/30 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Quote className="w-12 h-12 text-white" />
            </div>
            <p className="text-white/80 font-light leading-relaxed mb-8 relative z-10 italic">
              "{testi.text}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center text-xs font-bold text-white uppercase">
                {testi.author[0]}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{testi.author}</h4>
                <p className="text-xs text-white/40">{testi.handle}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Instagram Section */}
      <div className="space-y-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex items-center gap-3 text-white/40 hover:text-white transition-colors cursor-pointer group">
            <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-jost tracking-widest">{t('instagram.handle')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {instagramCards.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="aspect-square relative rounded-3xl overflow-hidden bg-[#111111] border border-white/10 group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <Instagram className="w-8 h-8 text-white/20 group-hover:text-white transition-all duration-500 group-hover:scale-110" />
                <span className="text-[10px] tracking-[0.4em] text-white/20 group-hover:text-white transition-all duration-500 uppercase font-bold text-center px-4">
                  {card.label}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 flex items-center gap-2 opacity-0 group-hover:opacity-40 transition-opacity">
                <Instagram className="w-3 h-3" />
                <span className="text-[8px] tracking-widest font-bold">@3DESEOS.LAB</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
