import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';
import ProductCard from '../components/ProductCard';

const collectionMeta = {
  tornasol: { id: 'tornasol', gradient: 'from-[#402C5A] to-[#316DBC]', items: ['t-carita', 't-amigos', 't-ballenita', 't-florero', 't-trex', 't-sardinas'] },
  geek: { id: 'geek', gradient: 'from-[#316DBC] to-[#92DE8B]', items: ['g-spiderman', 'g-gow', 'g-jinx', 'g-hollow', 'g-dados'] },
  hogar: { id: 'hogar', gradient: 'from-[#EAE0D5] to-[#C6AC8F]', items: ['h-latas', 'h-waffle', 'h-angel', 'h-llaves', 'h-ovejita'] }
};

const Products = () => {
  const { t, getRaw } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-24"
      >
        <h1 className="text-5xl font-reem font-bold mb-4">{t('products.title')}</h1>
        <p className="text-white/60 font-light max-w-xl">{t('products.subtitle')}</p>
      </motion.div>

      <div className="space-y-32">
        {Object.keys(collectionMeta).map((key) => {
          const meta = collectionMeta[key];
          const cData = getRaw(`products.collections.${key}`);
          
          if (!cData) return null;

          return (
            <section key={key} className="relative">
              <div className={`absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br ${meta.gradient} blur-[200px] opacity-20 pointer-events-none`} />
              
              <div className="relative z-10 mb-12">
                <h2 className="text-4xl font-reem font-bold mb-2">{cData.title}</h2>
                <p className="text-white/50">{cData.desc}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {meta.items.map((productKey, pIdx) => (
                  <motion.div
                    key={productKey}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: pIdx * 0.1 }}
                  >
                    <ProductCard productKey={productKey} collectionData={{ ...cData, gradient: meta.gradient }} />
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
