import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle2, Box, Truck, Instagram, MessageCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n';

const CustomOrders = () => {
  const { t } = useLanguage();

  const steps = [
    { 
      icon: Lightbulb, 
      title: t('custom.step1Title'), 
      desc: t('custom.step1Desc'),
      color: '#A855F7', // Purple
      glow: 'shadow-[0_0_30px_rgba(168,85,247,0.15)]'
    },
    { 
      icon: CheckCircle2, 
      title: t('custom.step2Title'), 
      desc: t('custom.step2Desc'),
      color: '#3B82F6', // Blue
      glow: 'shadow-[0_0_30px_rgba(59,130,246,0.15)]'
    },
    { 
      icon: Box, 
      title: t('custom.step3Title'), 
      desc: t('custom.step3Desc'),
      color: '#22C55E', // Green
      glow: 'shadow-[0_0_30px_rgba(34,197,94,0.15)]'
    },
    { 
      icon: Truck, 
      title: t('custom.step4Title'), 
      desc: t('custom.step4Desc'),
      color: '#F5C00C', // Yellow
      glow: 'shadow-[0_0_30px_rgba(245,192,12,0.15)]'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-[90vh] flex items-center">
      <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
        
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-reem font-bold leading-tight tracking-tighter text-white">
              Pedidos <br />
              <span className="text-gradient">Personalizados</span>
            </h1>
            <p className="text-xl text-white/50 font-light max-w-lg leading-relaxed">
              {t('custom.subtitle')}
            </p>
          </div>

          <div className="space-y-8">
            <motion.a
              href="https://wa.me/573172575398?text=Hola!%20Estoy%20interesadx%20en%20hacer%20un%20pedido"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-[#050505] font-reem font-bold text-lg hover:bg-white/90 transition-all"
            >
              {t('custom.ctaButton') || 'Iniciar Pedido'}
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <div className="flex gap-4">
              <motion.a 
                href="https://wa.me/573172575398" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, borderColor: '#22C55E' }}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-white/40 hover:text-[#22C55E] transition-all"
              >
                <MessageCircle className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/3deseos.lab" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, borderColor: '#A855F7' }}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-white/40 hover:text-[#A855F7] transition-all"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Features Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
              whileHover={{ 
                y: -8,
                borderColor: step.color + '40',
              }}
              className={`p-8 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 transition-all duration-500 group relative overflow-hidden ${step.glow}`}
            >
              {/* Subtle background glow */}
              <div 
                className="absolute -top-12 -right-12 w-24 h-24 blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: step.color }}
              />

              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500"
                style={{ backgroundColor: step.color + '15' }}
              >
                <step.icon 
                  className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" 
                  style={{ color: step.color }}
                />
              </div>

              <h3 
                className="text-xl font-reem font-bold mb-3 transition-colors duration-500"
                style={{ color: 'white' }}
                onMouseEnter={e => e.currentTarget.style.color = step.color}
                onMouseLeave={e => e.currentTarget.style.color = 'white'}
              >
                {step.title}
              </h3>
              
              <p className="text-white/40 text-sm font-light leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CustomOrders;
