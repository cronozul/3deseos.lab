import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle2, Box, Truck, Instagram, ArrowRight } from 'lucide-react';
import WhatsApp from '../components/WhatsApp';
import { useLanguage } from '../i18n';

const CustomOrders = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: Lightbulb,    title: t('custom.step1Title'), desc: t('custom.step1Desc'), color: 'text-brand-yellow', hoverColor: 'group-hover:text-brand-yellow' },
    { icon: CheckCircle2, title: t('custom.step2Title'), desc: t('custom.step2Desc'), color: 'text-brand-blue',   hoverColor: 'group-hover:text-brand-blue'   },
    { icon: Box,          title: t('custom.step3Title'), desc: t('custom.step3Desc'), color: 'text-brand-purple', hoverColor: 'group-hover:text-brand-purple' },
    { icon: Truck,        title: t('custom.step4Title'), desc: t('custom.step4Desc'), color: 'text-brand-green',  hoverColor: 'group-hover:text-brand-green'  },
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] flex items-center justify-center px-4 sm:px-6 py-24 md:py-0">
      {/* Background Elements */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />

      {/* Frame Border (desktop only) */}
      <div className="fixed inset-4 md:inset-8 border border-white/[0.03] rounded-[2rem] pointer-events-none hidden md:block" aria-hidden="true" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

        {/* Left Side: Information */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 sm:gap-8 text-center lg:text-left"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-5 sm:mb-6 backdrop-blur-md">
              <Lightbulb className="w-4 h-4 text-brand-yellow" aria-hidden="true" />
              <span className="text-xs font-jost tracking-[0.3em] uppercase text-white/60">{t('custom.badge')}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-reem font-bold mb-4 md:mb-8 tracking-tighter leading-none">
              {t('custom.title')}
            </h1>
            <p className="text-white/60 font-light text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              {t('custom.subtitle')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 sm:gap-6">
            <a
              href="https://wa.me/573172575398?text=Hola!%20Estoy%20interesadx%20en%20hacer%20un%20pedido"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hacer un pedido personalizado por WhatsApp"
              className="group relative px-8 sm:px-10 py-4 sm:py-5 rounded-full overflow-hidden transition-all active:scale-95 bg-white text-black font-reem font-bold text-base sm:text-lg shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              <div className="absolute inset-0 bg-brand-blue translate-y-full group-hover:translate-y-0 transition-transform duration-500" aria-hidden="true" />
              <span className="relative z-10 flex items-center gap-3 sm:gap-4 group-hover:text-white transition-colors">
                {t('custom.ctaButton')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
            </a>

            <div className="flex gap-4" role="list" aria-label="Canales de contacto">
              <a
                href="https://wa.me/573172575398"
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                aria-label="Contactar por WhatsApp"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:border-brand-green hover:text-brand-green transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                <WhatsApp className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/3deseos.lab"
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                aria-label="Visitar Instagram de 3deseos.lab"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:border-brand-purple hover:text-brand-purple transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
              className="p-5 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] bg-[#111111]/50 border border-white/[0.05] backdrop-blur-xl group hover:border-white/10 transition-all hover:bg-[#111111]/80"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform" aria-hidden="true">
                <step.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${step.color}`} />
              </div>
              <h3 className={`text-base sm:text-xl font-reem mb-2 text-white transition-colors ${step.hoverColor}`}>{step.title}</h3>
              <p className="text-white/60 text-sm font-light leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Bottom Footer Accent */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] text-white/50 uppercase font-light pointer-events-none whitespace-nowrap" aria-hidden="true">
        Layer by Layer • 3deseos.lab
      </div>
    </div>
  );
};

export default CustomOrders;
