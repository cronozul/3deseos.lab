import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { useCart } from '../context/CartContext';
import StepIndicator from '../components/StepIndicator';
import CheckoutForm from '../components/CheckoutForm';
import PaymentSelector from '../components/PaymentSelector';
import CartSummary from '../components/CartSummary';
import { ArrowLeft, ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';

const Checkout = () => {
  const { t } = useLanguage();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('pse');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Bogotá',
    address: '',
    notes: ''
  });

  const isFormValid = () => {
    return formData.name && formData.email && formData.phone && formData.city && formData.address;
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleFinish = () => {
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
          className="w-24 h-24 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center mb-8 shadow-2xl shadow-brand-blue/20"
        >
          <Sparkles className="w-10 h-10 text-brand-blue" />
        </motion.div>
        <h1 className="text-5xl font-reem mb-4 text-gradient">{t('checkout.confirmation.title')}</h1>
        <p className="text-xl text-white font-medium mb-2">{t('checkout.confirmation.subtitle')}</p>
        <p className="text-white/50 max-w-md mb-12 leading-relaxed">{t('checkout.confirmation.desc')}</p>
        
        <div className="bg-surface/30 border border-white/5 p-6 rounded-2xl mb-12 w-full max-w-sm">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1">{t('checkout.confirmation.orderNumber')}</p>
          <p className="text-2xl font-mono text-brand-green">#3D-{(Math.random() * 100000).toFixed(0)}</p>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="px-10 py-4 rounded-full bg-white text-[#050505] font-reem font-bold hover:bg-brand-blue hover:text-white transition-all"
        >
          {t('checkout.confirmation.backHome')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-reem font-bold mb-4">{t('checkout.title')}</h1>
        <StepIndicator currentStep={step} />
      </header>

      <div className="grid lg:grid-cols-3 gap-16 items-start">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="bg-surface/20 border border-white/5 p-8 rounded-[2rem] backdrop-blur-sm mb-12">
                  <h3 className="text-2xl font-reem mb-8 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple text-sm">1</span>
                    {t('checkout.step1')}
                  </h3>
                  <CheckoutForm formData={formData} setFormData={setFormData} />
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={nextStep}
                    disabled={!isFormValid()}
                    className="flex items-center gap-2 px-10 py-4 rounded-full bg-white text-[#050505] font-reem font-bold hover:bg-brand-blue hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
                  >
                    {t('checkout.form.next')} <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="bg-surface/20 border border-white/5 p-8 rounded-[2rem] backdrop-blur-sm mb-12">
                  <h3 className="text-2xl font-reem mb-8 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple text-sm">2</span>
                    {t('checkout.step2')}
                  </h3>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-8 pb-8 border-b border-white/10">
                      <div>
                        <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Destinatario</p>
                        <p className="font-medium">{formData.name}</p>
                        <p className="text-white/50 text-sm">{formData.email}</p>
                        <p className="text-white/50 text-sm">{formData.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Dirección de Envío</p>
                        <p className="font-medium">{formData.city}</p>
                        <p className="text-white/50 text-sm">{formData.address}</p>
                      </div>
                    </div>
                    <div className="pt-2">
                       <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Artículos en Proceso</p>
                       <div className="flex flex-wrap gap-4">
                          {cart.map(item => (
                            <div key={item.productKey} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs flex items-center gap-2">
                              <ShoppingBag className="w-3 h-3 text-brand-blue" />
                              {item.quantity}x {item.productKey}
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button 
                    onClick={prevStep}
                    className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white font-reem hover:bg-white/5 transition-all"
                  >
                    <ArrowLeft className="w-5 h-5" /> {t('checkout.form.back')}
                  </button>
                  <button 
                    onClick={nextStep}
                    className="flex items-center gap-2 px-10 py-4 rounded-full bg-white text-[#050505] font-reem font-bold hover:bg-brand-blue hover:text-white transition-all"
                  >
                    {t('checkout.form.next')} <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="bg-surface/20 border border-white/5 p-8 rounded-[2rem] backdrop-blur-sm mb-12">
                  <h3 className="text-2xl font-reem mb-8 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple text-sm">3</span>
                    {t('checkout.payment.title')}
                  </h3>
                  <PaymentSelector selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} />
                </div>
                <div className="flex justify-between">
                  <button 
                    onClick={prevStep}
                    className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white font-reem hover:bg-white/5 transition-all"
                  >
                    <ArrowLeft className="w-5 h-5" /> {t('checkout.form.back')}
                  </button>
                  <button 
                    onClick={handleFinish}
                    className="flex items-center gap-2 px-10 py-4 rounded-full bg-brand-green text-[#050505] font-reem font-bold hover:scale-105 transition-all shadow-xl shadow-brand-green/10"
                  >
                    {t('checkout.payment.pay')} <Sparkles className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
