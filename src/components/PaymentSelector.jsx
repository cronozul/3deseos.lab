import React from 'react';
import { CreditCard, Wallet, Landmark, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n';

const PaymentSelector = ({ selectedMethod, setSelectedMethod }) => {
  const { t } = useLanguage();

  const methods = [
    { id: 'pse', name: t('checkout.payment.pse'), icon: Landmark, desc: t('checkout.payment.pseDesc') },
    { id: 'wompi', name: t('checkout.payment.wompi'), icon: ShieldCheck, desc: t('checkout.payment.wompiDesc') },
    { id: 'mp', name: t('checkout.payment.mp'), icon: Wallet, desc: t('checkout.payment.mpDesc') },
    { id: 'card', name: t('checkout.payment.card'), icon: CreditCard, desc: 'Visa, Mastercard, Amex' }
  ];

  return (
    <div className="space-y-4">
      {methods.map((method) => (
        <button
          key={method.id}
          onClick={() => setSelectedMethod(method.id)}
          className={`w-full flex items-center gap-6 p-6 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group ${
            selectedMethod === method.id 
              ? 'bg-brand-blue/10 border-brand-blue shadow-lg shadow-brand-blue/10' 
              : 'bg-surface/30 border-white/5 hover:border-white/20'
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            selectedMethod === method.id ? 'bg-brand-blue text-white' : 'bg-background/50 text-white/40'
          }`}>
            <method.icon className="w-6 h-6" />
          </div>
          
          <div className="flex-1">
            <h4 className={`font-reem text-lg transition-colors ${
              selectedMethod === method.id ? 'text-white' : 'text-white/70'
            }`}>
              {method.name}
            </h4>
            <p className="text-sm text-white/30 font-light">{method.desc}</p>
          </div>

          <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
            selectedMethod === method.id 
              ? 'border-brand-blue bg-brand-blue text-white' 
              : 'border-white/10'
          }`}>
            {selectedMethod === method.id && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
          </div>
        </button>
      ))}

      {selectedMethod === 'card' && (
        <div className="mt-8 p-6 rounded-2xl bg-background/50 border border-white/5 space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <input 
            type="text" 
            placeholder="0000 0000 0000 0000"
            className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-all"
          />
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="MM/YY"
              className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-all"
            />
            <input 
              type="text" 
              placeholder="CVC"
              className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-all"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSelector;
