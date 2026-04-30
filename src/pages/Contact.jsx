import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 min-h-[80vh] flex items-center">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-reem font-bold mb-6">{t('contact.title')}</h1>
          <p className="text-white/60 font-light max-w-md mb-12">
            {t('contact.subtitle')}
          </p>

          <div className="space-y-6">
            <a 
              href="https://wa.me/573172575398" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-[#111111] group-hover:border-brand-green group-hover:text-brand-green transition-colors">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="font-jost">{t('contact.whatsapp')}</span>
            </a>
            
            <a 
              href="https://www.instagram.com/3deseos.lab" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-[#111111] group-hover:border-brand-purple group-hover:text-brand-purple transition-colors">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="font-jost">{t('contact.instagram')}</span>
            </a>
            
            <div className="flex items-center gap-4 text-white/70 group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-[#111111]">
                <MapPin className="w-5 h-5 text-brand-blue" />
              </div>
              <span className="font-jost">{t('contact.location')}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#111111] border border-white/10 rounded-[2rem] p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand-blue/10 blur-[80px] rounded-full pointer-events-none" />
          
          <form className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm text-white/50 mb-2">{t('contact.formName')}</label>
              <input 
                type="text" 
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-2">{t('contact.formEmail')}</label>
              <input 
                type="email" 
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-2">{t('contact.formMessage')}</label>
              <textarea 
                rows={4}
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors resize-none"
              ></textarea>
            </div>
            <button className="w-full py-4 rounded-xl bg-white text-[#050505] font-reem font-bold hover:bg-white/90 transition-all mt-4">
              {t('contact.formSubmit')}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
