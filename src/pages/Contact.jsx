import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, MapPin, Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import WhatsApp from '../components/WhatsApp';
import { useLanguage } from '../i18n';

const Contact = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    'bot-field': ''
  });

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...formData })
    })
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error(error);
        setStatus('error');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 min-h-[80vh] flex items-center">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md self-start">
            <Mail className="w-4 h-4 text-brand-green" />
            <span className="text-xs font-jost tracking-[0.3em] uppercase text-white/60">{t('contact.badge')}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-reem font-bold mb-8 tracking-tighter leading-none">{t('contact.title')}</h1>
          <p className="text-white/60 font-light max-w-md mb-12">
            {t('contact.subtitle')}
          </p>

          <div className="space-y-6">
            <a
              href="mailto:3deseos.lab@gmail.com"
              className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-[#111111] group-hover:border-brand-blue group-hover:text-brand-blue transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-jost">3deseos.lab@gmail.com</span>
            </a>

            <a
              href="https://wa.me/573172575398"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-[#111111] group-hover:border-brand-green group-hover:text-brand-green transition-colors">
                <WhatsApp className="w-5 h-5" />
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

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-brand-green/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-brand-green" />
                </div>
                <h3 className="text-2xl font-reem font-bold mb-4">{t('contact.formSuccess')}</h3>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-white/50 hover:text-white transition-colors underline underline-offset-4"
                >
                  {t('checkout.confirmation.backHome')}
                </button>
              </motion.div>
            ) : (
              <form
                key="form"
                onSubmit={handleSubmit}
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                className="space-y-6 relative z-10"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>Don't fill this out if you're human: <input name="bot-field" onChange={handleChange} /></label>
                </p>

                <div>
                  <label className="block text-sm text-white/50 mb-2">{t('contact.formName')}</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-2">{t('contact.formEmail')}</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-2">{t('contact.formMessage')}</label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors resize-none"
                  ></textarea>
                </div>

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{t('contact.formError')}</span>
                  </motion.div>
                )}

                <button
                  disabled={status === 'loading'}
                  type="submit"
                  className="w-full py-4 rounded-xl bg-white text-[#050505] font-reem font-bold hover:bg-white/90 transition-all mt-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('contact.formSubmit')}...
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
