import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { Instagram, MapPin } from 'lucide-react';
import WhatsApp from './WhatsApp';
import LampAnimation from './LampAnimation';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="relative z-10 bg-[#050505] pt-24 pb-12 px-6 overflow-hidden">
      {/* Decorative Gradient Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
        
        {/* Brand & Tagline */}
        <div className="md:col-span-5 space-y-6">
          <Link to="/" className="flex items-center gap-3 group relative inline-flex">
            <LampAnimation isNavbar={true} />
            <span className="font-reem text-2xl font-medium tracking-wider text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-brand-gradient">
              3deseos<span>.lab</span>
            </span>
          </Link>
          <p className="text-white/40 font-light text-lg leading-relaxed max-w-sm">
            {t('footer.tagline')}
          </p>
        </div>

        {/* Navigation */}
        <div className="md:col-span-3 space-y-6">
          <h4 className="font-reem text-white/80 font-bold text-lg">{t('footer.explore')}</h4>
          <ul className="space-y-4">
            {[
              { to: "/products", label: t('nav.products') },
              { to: "/custom", label: t('nav.custom') },
              { to: "/community", label: t('nav.community') },
              { to: "/about", label: t('nav.about') }
            ].map(link => (
              <li key={link.to}>
                <Link to={link.to} className="text-white/30 hover:text-brand-blue transition-colors font-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials & Contact */}
        <div className="md:col-span-4 space-y-6">
          <h4 className="font-reem text-white/80 font-bold text-lg">{t('footer.social')}</h4>
          <div className="flex gap-4">
            <a 
              href="https://wa.me/573172575398" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center hover:border-brand-green hover:text-brand-green transition-all group"
            >
              <WhatsApp className="w-5 h-5 transition-transform group-hover:scale-110" />
            </a>
            <a 
              href="https://www.instagram.com/3deseos.lab" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center hover:border-brand-purple hover:text-brand-purple transition-all group"
            >
              <Instagram className="w-5 h-5 transition-transform group-hover:scale-110" />
            </a>
          </div>
          <div className="pt-4 flex items-center gap-3 text-white/20">
             <MapPin className="w-4 h-4" />
             <span className="text-sm font-light tracking-wide">{t('footer.location')}</span>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-white/10 tracking-widest font-light">
        <span>© {new Date().getFullYear()} 3DESEOS.LAB</span>
             </div>
    </footer>
  );
};

export default Footer;
