import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle2, Box, Truck, Instagram, MessageCircle } from 'lucide-react';
import { useLanguage } from '../i18n';

const CustomOrders = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: Lightbulb, title: t('custom.step1Title'), desc: t('custom.step1Desc') },
    { icon: CheckCircle2, title: t('custom.step2Title'), desc: t('custom.step2Desc') },
    { icon: Box, title: t('custom.step3Title'), desc: t('custom.step3Desc') },
    { icon: Truck, title: t('custom.step4Title'), desc: t('custom.step4Desc') }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h1 className="text-5xl font-reem font-bold mb-4">{t('custom.title')}</h1>
        <p className="text-white/60 font-light max-w-2xl mx-auto">
          {t('custom.subtitle')}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-8 mb-24">
        {steps.map((step, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="p-8 rounded-3xl bg-[#111111] border border-white/5 relative overflow-hidden group glow-brand"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 blur-[50px] rounded-full" />
            <step.icon className="w-10 h-10 text-brand-blue mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-reem mb-3 text-white">{step.title}</h3>
            <p className="text-white/50 text-sm font-light leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto p-1 border border-white/10 rounded-[2rem] bg-gradient-to-r from-brand-purple/20 via-brand-blue/20 to-brand-green/20"
      >
        <div className="bg-[#050505] p-8 rounded-[1.85rem] text-center">
          <h3 className="text-2xl font-reem mb-4">{t('custom.ctaTitle')}</h3>
          <div className="flex flex-col items-center gap-6 mt-8 pt-8 border-t border-white/5">
            <a 
              href="https://wa.me/573172575398?text=Hola!%20Estoy%20interesadx%20en%20hacer%20un%20pedido"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-full bg-white text-[#050505] font-reem font-bold hover:bg-white/90 transition-all"
            >
              {t('custom.ctaButton')}
            </a>
            
            <div className="flex gap-4">
              <a 
                href="https://wa.me/573172575398" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:border-brand-green hover:text-brand-green transition-all"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/3deseos.lab" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:border-brand-purple hover:text-brand-purple transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomOrders;
