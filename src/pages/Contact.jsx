import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, MapPin, Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import WhatsApp from '../components/WhatsApp';
import { useLanguage } from '../i18n';

const Contact = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/.netlify/functions/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          name:    formData.name,
          email:   formData.email,
          message: formData.message,
        }).toString(),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Error desconocido');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error enviando formulario:', error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 min-h-[80vh] flex items-center">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

        {/* — Info Column — */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Mail className="w-4 h-4 text-brand-yellow" aria-hidden="true" />
            <span className="text-xs font-jost tracking-[0.3em] uppercase text-white/60">{t('contact.badge')}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-reem font-bold mb-6 tracking-tighter leading-none">
            {t('contact.title')}
          </h1>
          <p className="text-white/60 font-light max-w-md mb-10 mx-auto md:mx-0">
            {t('contact.subtitle')}
          </p>

          <div className="space-y-5 text-left">
            <a
              href="mailto:3deseos.lab@gmail.com?subject=Consulta desde la web"
              className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
              aria-label="Enviar correo a 3deseos.lab@gmail.com"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-[#111111] group-hover:border-brand-yellow group-hover:text-brand-yellow transition-colors" aria-hidden="true">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-jost">3deseos.lab@gmail.com</span>
            </a>

            <a
              href="https://wa.me/573172575398"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
              aria-label="Contactar por WhatsApp"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-[#111111] group-hover:border-brand-green group-hover:text-brand-green transition-colors" aria-hidden="true">
                <WhatsApp className="w-5 h-5" />
              </div>
              <span className="font-jost">{t('contact.whatsapp')}</span>
            </a>

            <a
              href="https://www.instagram.com/3deseos.lab"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
              aria-label="Visitar Instagram de 3deseos.lab"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-[#111111] group-hover:border-brand-purple group-hover:text-brand-purple transition-colors" aria-hidden="true">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="font-jost">{t('contact.instagram')}</span>
            </a>

            <div className="flex items-center gap-4 text-white/70 cursor-default">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-[#111111]" aria-hidden="true">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="font-jost">{t('contact.location')}</span>
            </div>
          </div>
        </motion.div>

        {/* — Form Column — */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#111111] border border-white/10 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand-blue/10 blur-[80px] rounded-full pointer-events-none" aria-hidden="true" />

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
                role="status"
                aria-live="polite"
              >
                <div className="w-20 h-20 rounded-full bg-brand-green/20 flex items-center justify-center mb-6" aria-hidden="true">
                  <CheckCircle2 className="w-10 h-10 text-brand-green" />
                </div>
                <h3 className="text-2xl font-reem font-bold mb-4">{t('contact.formSuccess')}</h3>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-white/50 hover:text-white transition-colors underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] rounded"
                >
                  {t('checkout.confirmation.backHome')}
                </button>
              </motion.div>
            ) : (
              <form
                key="form"
                onSubmit={handleSubmit}
                aria-label={t('contact.title')}
                noValidate
                className="space-y-5 relative z-10"
              >
                <div>
                  <label htmlFor="contact-name" className="block text-sm text-white/50 mb-2">
                    {t('contact.formName')}
                  </label>
                  <input
                    required
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus-visible:border-brand-blue focus-visible:ring-1 focus-visible:ring-brand-blue transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm text-white/50 mb-2">
                    {t('contact.formEmail')}
                  </label>
                  <input
                    required
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus-visible:border-brand-blue focus-visible:ring-1 focus-visible:ring-brand-blue transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm text-white/50 mb-2">
                    {t('contact.formMessage')}
                  </label>
                  <textarea
                    required
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus-visible:border-brand-blue focus-visible:ring-1 focus-visible:ring-brand-blue transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    id="contact-error"
                    role="alert"
                    aria-live="assertive"
                    className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    <span>{t('contact.formError')}</span>
                  </motion.div>
                )}

                <button
                  disabled={status === 'loading'}
                  type="submit"
                  className="w-full py-4 rounded-xl bg-white text-[#050505] font-reem font-bold hover:bg-white/90 transition-all mt-2 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                      {t('contact.formSubmit')}…
                    </>
                  ) : (
                    t('contact.formSubmit')
                  )}
                </button>
              </form>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
