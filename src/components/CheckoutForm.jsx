import React from 'react';
import { useLanguage } from '../i18n';

const CheckoutForm = ({ formData, setFormData }) => {
  const { t } = useLanguage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const inputClasses = "w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all";
  const labelClasses = "block text-xs font-medium text-white/40 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>{t('checkout.form.name')}</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label className={labelClasses}>{t('checkout.form.email')}</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>{t('checkout.form.phone')}</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label className={labelClasses}>{t('checkout.form.city')}</label>
          <input 
            type="text" 
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
      </div>

      <div>
        <label className={labelClasses}>{t('checkout.form.address')}</label>
        <input 
          type="text" 
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>

      <div>
        <label className={labelClasses}>{t('checkout.form.notes')}</label>
        <textarea 
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className={`${inputClasses} resize-none`}
        ></textarea>
      </div>
    </div>
  );
};

export default CheckoutForm;
