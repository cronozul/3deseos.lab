import React from 'react';
import { useLanguage } from '../i18n';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-[#050505] text-center relative z-10">
      <p className="font-reem text-white/40 text-sm tracking-widest uppercase">
        {t('footer.location')}
      </p>
    </footer>
  );
};

export default Footer;
