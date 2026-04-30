import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../i18n';

const StepIndicator = ({ currentStep }) => {
  const { t } = useLanguage();
  const steps = [
    { id: 1, label: t('checkout.step1') },
    { id: 2, label: t('checkout.step2') },
    { id: 3, label: t('checkout.step3') }
  ];

  return (
    <div className="flex items-center justify-between max-w-md mx-auto mb-16 relative">
      <div className="absolute top-5 left-0 w-full h-[1px] bg-white/5 -z-10" />
      {steps.map((step, idx) => (
        <div key={step.id} className="flex flex-col items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${
            currentStep >= step.id 
              ? 'bg-brand-blue border-brand-blue text-white shadow-lg shadow-brand-blue/20' 
              : 'bg-[#050505] border-white/10 text-white/30'
          }`}>
            {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
          </div>
          <span className={`text-[10px] uppercase tracking-widest transition-colors duration-500 ${
            currentStep >= step.id ? 'text-white' : 'text-white/20'
          }`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
