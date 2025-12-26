
import React from 'react';
import { useLanguage } from './LanguageContext';
import { PRODUCTS, UI_STRINGS } from '../constants';

const Products: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="products" className="py-20 lg:py-32 relative bg-slate-900/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-20 space-y-4 lg:space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{UI_STRINGS.productsTitle[language]}</h2>
          <div className="w-16 lg:w-24 h-1 lg:h-1.5 bg-indigo-600 mx-auto rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]"></div>
          <p className="text-sm md:text-base text-slate-400">
            {language === 'ar' 
              ? 'نختار خاماتنا بعناية لضمان جودة استثنائية في كل طباعة وصورة.' 
              : 'We select our materials carefully to ensure exceptional quality in every print and photo.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {PRODUCTS.map((product, idx) => (
            <div 
              key={product.id}
              className="group glass-dark rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden hover:-translate-y-1 lg:hover:-translate-y-2 transition-all duration-500 border border-white/5 hover:border-indigo-500/30 flex flex-col"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="h-44 md:h-56 relative overflow-hidden shrink-0">
                <img 
                  src={product.image} 
                  alt={product.title[language]} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 lg:group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute bottom-4 left-5 right-5 flex items-center gap-2 lg:gap-3">
                   <div className="p-1.5 md:p-2 glass rounded-lg text-lg md:text-2xl lg:group-hover:bg-indigo-600 transition-colors">
                      {product.icon}
                   </div>
                   <h3 className="text-sm md:text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                    {product.title[language]}
                   </h3>
                </div>
              </div>
              <div className="p-5 lg:p-7 space-y-3 lg:space-y-4 flex-grow flex flex-col">
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed flex-grow">
                  {product.description[language]}
                </p>
                <div className="pt-3 border-t border-white/5">
                  <button className="text-indigo-400 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2 group/btn">
                    <span>{language === 'ar' ? 'اطلب الآن' : 'Inquire Now'}</span>
                    <svg className={`w-3 h-3 md:w-4 md:h-4 transition-transform group-hover/btn:translate-x-1 ${language === 'ar' ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
