import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';

const About = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 min-h-[80vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-reem font-bold mb-8 text-gradient">
          {t('about.title')}
        </h1>
        
        <div className="space-y-8 text-lg md:text-xl text-white/70 font-light leading-relaxed">
          <p>{t('about.desc1')}</p>
          <p>{t('about.desc2')}</p>
          <p>{t('about.desc3')}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
