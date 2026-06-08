import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { useCart } from '../context/CartContext';
import CheckoutForm from '../components/CheckoutForm';
import CartSummary from '../components/CartSummary';
import WhatsApp from '../components/WhatsApp';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

// Número de WhatsApp — se define como variable de entorno (no se sube a GitHub)
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

const Checkout = () => {
  const { t, getRaw } = useLanguage();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isFinished, setIsFinished] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Bogotá',
    address: '',
    notes: ''
  });

  // El correo es opcional: el canal real es WhatsApp / teléfono.
  const isFormValid = () => {
    return formData.name && formData.phone && formData.city && formData.address;
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount);

  const calculateTotal = () =>
    cart.reduce((sum, item) => {
      const product = getRaw(`products.items.${item.productKey}`);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);

  // Arma el mensaje pre-llenado de WhatsApp con el pedido y los datos del cliente.
  const buildMessage = () => {
    const lines = cart.map((item) => {
      const product = getRaw(`products.items.${item.productKey}`);
      const name = product?.name || item.productKey;
      const lineTotal = product ? product.price * item.quantity : 0;
      const opts = item.options || {};
      const extras = [];
      if (opts.color) extras.push(t(`products.detail.options.colors.${opts.color}`));
      if (opts.painting) extras.push(t('products.detail.options.paintBadge'));
      const extrasStr = extras.length ? ` (${extras.join(', ')})` : '';
      return `• ${item.quantity}× ${name}${extrasStr} — ${formatCurrency(lineTotal)}`;
    });

    const parts = [
      t('checkout.whatsapp.greeting'),
      '',
      ...lines,
      '',
      `*${t('cart.total')}: ${formatCurrency(calculateTotal())}*`,
      t('checkout.whatsapp.shipping'),
      '',
      `👤 ${formData.name}`,
      `📱 ${formData.phone}`,
      `📍 ${formData.address}, ${formData.city}`
    ];
    if (formData.email) parts.push(`✉️ ${formData.email}`);
    if (formData.notes) parts.push(`📝 ${formData.notes}`);

    return parts.join('\n');
  };

  const handleFinish = () => {
    if (!isFormValid()) return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
    setWhatsappUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsFinished(true);
    clearCart();
  };

  if (cart.length === 0 && !isFinished) {
    navigate('/cart');
    return null;
  }

  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-24 h-24 rounded-full bg-brand-green/20 border border-brand-green/30 flex items-center justify-center mb-8 shadow-2xl shadow-brand-green/20"
        >
          <WhatsApp className="w-10 h-10 text-brand-green" />
        </motion.div>
        <h1 className="text-5xl font-reem mb-4 text-gradient">{t('checkout.confirmation.title')}</h1>
        <p className="text-xl text-white font-medium mb-2">{t('checkout.confirmation.subtitle')}</p>
        <p className="text-white/50 max-w-md mb-12 leading-relaxed">{t('checkout.confirmation.desc')}</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-brand-green text-[#050505] font-reem font-bold hover:scale-105 transition-all shadow-xl shadow-brand-green/10"
          >
            <WhatsApp className="w-5 h-5" /> {t('checkout.confirmation.openWhatsapp')}
          </a>
          <button
            onClick={() => navigate('/')}
            className="px-10 py-4 rounded-full border border-white/10 text-white font-reem font-bold hover:bg-white/5 transition-all"
          >
            {t('checkout.confirmation.backHome')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-reem font-bold mb-4">{t('checkout.title')}</h1>
        <p className="text-white/50 max-w-xl mx-auto leading-relaxed">{t('checkout.subtitle')}</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-16 items-start">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-surface/20 border border-white/5 p-8 rounded-[2rem] backdrop-blur-sm mb-8">
              <h3 className="text-2xl font-reem mb-8">{t('checkout.step1')}</h3>
              <CheckoutForm formData={formData} setFormData={setFormData} />
            </div>

            {/* Cómo funciona el pedido (transparencia: sin pagos en línea) */}
            <div className="flex items-start gap-3 px-6 py-5 mb-8 rounded-2xl bg-brand-green/5 border border-brand-green/15 text-sm text-white/60 leading-relaxed">
              <ShieldCheck className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
              <p>{t('checkout.whatsapp.howItWorks')}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                onClick={() => navigate('/cart')}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white font-reem hover:bg-white/5 transition-all order-2 sm:order-1"
              >
                <ArrowLeft className="w-5 h-5" /> {t('checkout.form.back')}
              </button>
              <button
                onClick={handleFinish}
                disabled={!isFormValid()}
                className="flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-brand-green text-[#050505] font-reem font-bold hover:scale-[1.02] transition-all shadow-xl shadow-brand-green/10 disabled:opacity-30 disabled:pointer-events-none order-1 sm:order-2"
              >
                <WhatsApp className="w-5 h-5" /> {t('checkout.whatsapp.cta')}
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CartSummary isCheckout={true} />
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
