import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, MapPin, Mail, CheckCircle2, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import WhatsApp from '../components/WhatsApp';
import { useLanguage } from '../i18n';

/*
 * FORMULARIO DE CONTACTO — Web3Forms
 * ────────────────────────────────────────────────────────────
 * Servicio gratuito (250 envíos/mes) que no depende de Netlify.
 *
 * SETUP (solo una vez):
 *  1. Entra a https://web3forms.com e ingresa tu correo.
 *  2. Copia la Access Key que te envían por correo.
 *  3. En Netlify: Site → Environment variables → Add variable:
 *       VITE_WEB3FORMS_KEY = <tu_access_key>
 *  4. Redespliega el sitio. ¡Listo!
 *
 * Para pruebas locales:
 *  Crea un archivo .env en la raíz del proyecto:
 *       VITE_WEB3FORMS_KEY=<tu_access_key>
 * ────────────────────────────────────────────────────────────
 */

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

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

    // Si no hay Access Key configurada, redirige al correo directo
    if (!WEB3FORMS_KEY) {
      window.location.href = `mailto:3deseos.lab@gmail.com?subject=Consulta desde la web&body=Nombre: ${encodeURIComponent(formData.name)}%0ACorreo: ${encodeURIComponent(formData.email)}%0A%0A${encodeURIComponent(formData.message)}`;
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nuevo mensaje desde 3deseos.lab — ${formData.name}`,
          from_name: '3deseos.lab Web',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          // Honeypot anti-spam (Web3Forms lo soporta)
          botcheck: '',
          // Respuesta de confirmación al visitante
          redirect: false,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Error desconocido');
      }
    } catch (err) {
      console.error('Error al enviar el formulario:', err);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isKeyMissing = !WEB3FORMS_KEY;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 min-h-[80vh] flex items-center">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

        {/* ── Left: canales de contacto ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Mail className="w-4 h-4 text-brand-yellow" aria-hidden="true" />
            <span className="text-xs font-jost tracking-[0.3em] uppercase text-white/60">{t('contact.badge')}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-reem font-bold mb-6 md:mb-8 tracking-tight leading-none">
            {t('contact.title')}
          </h1>
          <p className="text-white/60 font-light max-w-md mb-10 md:mb-12 text-base md:text-lg leading-relaxed">
            {t('contact.subtitle')}
          </p>

          <nav aria-label="Canales de contacto" className="space-y-5">
            <a
              href="mailto:3deseos.lab@gmail.com?subject=Consulta desde la web"
              className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
            >
              <div className="w-12 h-12 flex-shrink-0 rounded-full border border-white/10 flex items-center justify-center bg-[#111111] group-hover:border-brand-yellow group-hover:text-brand-yellow transition-colors">
                <Mail className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="font-jost">3deseos.lab@gmail.com</span>
            </a>

            <a
              href="https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
            >
              <div className="w-12 h-12 flex-shrink-0 rounded-full border border-white/10 flex items-center justify-center bg-[#111111] group-hover:border-brand-green group-hover:text-brand-green transition-colors">
                <WhatsApp className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="font-jost">{t('contact.whatsapp')}</span>
            </a>

            <a
              href="https://www.instagram.com/3deseos.lab"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
            >
              <div className="w-12 h-12 flex-shrink-0 rounded-full border border-white/10 flex items-center justify-center bg-[#111111] group-hover:border-brand-purple group-hover:text-brand-purple transition-colors">
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="font-jost">{t('contact.instagram')}</span>
            </a>

            <div className="flex items-center gap-4 text-white/50">
              <div className="w-12 h-12 flex-shrink-0 rounded-full border border-white/10 flex items-center justify-center bg-[#111111]">
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="font-jost">{t('contact.location')}</span>
            </div>
          </nav>
        </motion.div>

        {/* ── Right: formulario ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#111111] border border-white/10 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand-blue/10 blur-[80px] rounded-full pointer-events-none" aria-hidden="true" />

          <AnimatePresence mode="wait">

            {/* ── Estado: éxito ── */}
            {status === 'success' ? (
              <motion.div
                key="success"
                role="alert"
                aria-live="polite"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-brand-green/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-brand-green" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-reem font-bold mb-2">{t('contact.formSuccess')}</h2>
                <p className="text-white/50 text-sm mb-6">Revisaremos tu mensaje y te responderemos pronto.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-white/50 hover:text-white transition-colors underline underline-offset-4"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>

            ) : (
              /* ── Formulario ── */
              <form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-5 relative z-10"
                noValidate
              >
                {/* Banner si la clave no está configurada */}
                {isKeyMissing && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 text-sm text-brand-yellow mb-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      Formulario no configurado aún. Al enviar abrirá tu correo directamente.{' '}
                      <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
                        Obtén tu clave en web3forms.com
                      </a>
                    </span>
                  </div>
                )}

                {/* Nombre */}
                <div>
                  <label htmlFor="contact-name" className="block text-sm text-white/50 mb-2">
                    {t('contact.formName')} <span aria-hidden="true" className="text-brand-yellow">*</span>
                  </label>
                  <input
                    id="contact-name"
                    required
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors placeholder:text-white/20"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-sm text-white/50 mb-2">
                    {t('contact.formEmail')} <span aria-hidden="true" className="text-brand-yellow">*</span>
                  </label>
                  <input
                    id="contact-email"
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors placeholder:text-white/20"
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="contact-message" className="block text-sm text-white/50 mb-2">
                    {t('contact.formMessage')} <span aria-hidden="true" className="text-brand-yellow">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos tu idea o diseño..."
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors resize-none placeholder:text-white/20"
                  />
                </div>

                {/* Error */}
                {status === 'error' && (
                  <motion.div
                    role="alert"
                    aria-live="assertive"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm"
                  >
                    <div className="flex items-center gap-3 text-red-400">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                      <span>{t('contact.formError')}</span>
                    </div>
                    <a
                      href={`mailto:3deseos.lab@gmail.com?subject=Consulta desde la web&body=Nombre: ${encodeURIComponent(formData.name)}%0ACorreo: ${encodeURIComponent(formData.email)}%0A%0A${encodeURIComponent(formData.message)}`}
                      className="inline-flex items-center gap-2 text-brand-yellow hover:underline text-xs font-semibold"
                    >
                      <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                      Enviar por correo directamente
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  </motion.div>
                )}

                {/* Submit */}
                <button
                  disabled={status === 'loading'}
                  type="submit"
                  className="w-full py-4 rounded-xl bg-white text-[#050505] font-reem font-bold hover:bg-white/90 transition-all mt-2 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                      <span>Enviando…</span>
                    </>
                  ) : (
                    t('contact.formSubmit')
                  )}
                </button>

                <p className="text-white/30 text-xs text-center">
                  O escríbenos a{' '}
                  <a
                    href="mailto:3deseos.lab@gmail.com"
                    className="text-white/50 hover:text-white underline underline-offset-2 transition-colors"
                  >
                    3deseos.lab@gmail.com
                  </a>
                </p>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
