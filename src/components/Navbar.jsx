import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n.jsx';
import { useCart } from '../context/CartContext.jsx';
import { ShoppingCart, Menu, X, Globe } from 'lucide-react';
import LampAnimation from './LampAnimation';

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { getItemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { to: "/products", label: t('nav.products') },
    { to: "/custom", label: t('nav.custom') },
    { to: "/community", label: t('nav.community') },
    { to: "/about", label: t('nav.about') },
    { to: "/contact", label: t('nav.contact') },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group relative z-50">
          <LampAnimation isNavbar={true} />
          <span className="font-reem text-2xl md:text-3xl font-bold tracking-wider text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-brand-gradient">
            3deseos<span className="transition-colors">.lab</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/70">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link 
                key={link.to} 
                to={link.to} 
                className="transition-colors duration-200 relative py-2 group"
                style={{ color: isActive ? '#F5C00C' : 'rgba(255,255,255,0.7)' }}
                onMouseEnter={e => { 
                  e.currentTarget.style.color = '#F5C00C'; 
                  const line = e.currentTarget.querySelector('.nav-line');
                  if (line) line.style.width = '100%';
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.color = isActive ? '#F5C00C' : 'rgba(255,255,255,0.7)'; 
                  const line = e.currentTarget.querySelector('.nav-line');
                  if (line && !isActive) line.style.width = '0';
                }}
              >
                {link.label}
                <span 
                  className="nav-line absolute bottom-0 left-0 h-px transition-all duration-300" 
                  style={{ 
                    width: isActive ? '100%' : '0',
                    background: '#F5C00C'
                  }} 
                />
              </Link>
            );
          })}
          
          <div className="flex items-center gap-6 border-l border-white/10 pl-8 ml-4">
            <Link to="/cart" className="relative group p-2">
              <ShoppingCart className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              {getItemCount() > 0 && (
                <span className="absolute top-0 right-0 bg-brand-purple text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center animate-pulse border-2 border-[#050505]">
                  {getItemCount()}
                </span>
              )}
            </Link>

            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 border border-white/5">
              <button 
                onClick={() => setLang('es')}
                className="text-[10px] font-bold tracking-tighter transition-colors duration-200"
                style={{ color: lang === 'es' ? '#F5C00C' : 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#F5C00C'}
                onMouseLeave={e => e.currentTarget.style.color = lang === 'es' ? '#F5C00C' : 'rgba(255,255,255,0.4)'}
              >
                ES
              </button>
              <span className="w-px h-2 bg-white/10" />
              <button 
                onClick={() => setLang('en')}
                className="text-[10px] font-bold tracking-tighter transition-colors duration-200"
                style={{ color: lang === 'en' ? '#F5C00C' : 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#F5C00C'}
                onMouseLeave={e => e.currentTarget.style.color = lang === 'en' ? '#F5C00C' : 'rgba(255,255,255,0.4)'}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-4 lg:hidden relative z-50">
          <Link to="/cart" className="relative p-2">
            <ShoppingCart className="w-6 h-6 text-white/70" />
            {getItemCount() > 0 && (
              <span className="absolute top-1 right-1 bg-brand-purple text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-[#050505]">
                {getItemCount()}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10"
          >
            {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050505]/95 backdrop-blur-2xl z-[45] lg:hidden overflow-hidden h-screen"
          >
            {/* Grain/Noise Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.03] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full pt-32 px-8">
              <div className="flex flex-col gap-8">
                {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                    >
                      <Link 
                        to={link.to} 
                        className="text-4xl font-reem font-bold transition-colors duration-200 flex items-center justify-between"
                        style={{ color: isActive ? '#F5C00C' : 'white' }}
                        onMouseEnter={e => { 
                          e.currentTarget.style.color = '#F5C00C'; 
                          const span = e.currentTarget.querySelector('.mobile-nav-line'); 
                          if(span) span.style.width = '48px'; 
                        }}
                        onMouseLeave={e => { 
                          if (!isActive) e.currentTarget.style.color = 'white'; 
                          const span = e.currentTarget.querySelector('.mobile-nav-line'); 
                          if(span && !isActive) span.style.width = '0'; 
                        }}
                      >
                        {link.label}
                        <span 
                          className="mobile-nav-line h-px transition-all duration-500" 
                          style={{ 
                            width: isActive ? '48px' : '0', 
                            background: '#F5C00C' 
                          }} 
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-auto mb-12 flex flex-col gap-8">
                <div className="h-px w-full bg-white/5" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-white/60">
                    <Globe className="w-5 h-5" />
                    <span className="text-sm font-medium uppercase tracking-widest">{t('nav.language') || 'Language'}</span>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setLang('es')}
                      className="px-4 py-2 rounded-lg border text-xs font-bold transition-all duration-200"
                      style={lang === 'es' ? { background: '#F5C00C', color: '#050505', borderColor: '#F5C00C' } : { borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
                      onMouseEnter={e => { if (lang !== 'es') e.currentTarget.style.borderColor = '#F5C00C'; }}
                      onMouseLeave={e => { if (lang !== 'es') e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                    >
                      ES
                    </button>
                    <button 
                      onClick={() => setLang('en')}
                      className="px-4 py-2 rounded-lg border text-xs font-bold transition-all duration-200"
                      style={lang === 'en' ? { background: '#F5C00C', color: '#050505', borderColor: '#F5C00C' } : { borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
                      onMouseEnter={e => { if (lang !== 'en') e.currentTarget.style.borderColor = '#F5C00C'; }}
                      onMouseLeave={e => { if (lang !== 'en') e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
