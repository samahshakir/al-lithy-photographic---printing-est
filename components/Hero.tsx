
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { UI_STRINGS } from '../constants';

const Hero: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="home" className="relative min-h-[80vh] flex items-center justify-center pt-28 pb-12 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
        <div className="space-y-6 lg:space-y-8 text-center lg:text-start">
          <div className="inline-block px-4 py-1.5 glass rounded-full text-indigo-300 text-[10px] md:text-sm font-semibold tracking-wide border-indigo-500/30">
            {language === 'ar' ? 'الجودة والموثوقية منذ سنوات' : 'Quality & Trust for Years'}
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold leading-[1.2] lg:leading-[1.1] tracking-tight text-white">
            {UI_STRINGS.heroTitle[language]}
          </h1>
          <p className="text-base md:text-xl text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            {UI_STRINGS.heroSubtitle[language]}
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
            <Link to="/products" className="px-6 md:px-10 py-3 md:py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl md:rounded-2xl text-sm md:text-base font-bold shadow-[0_0_30px_rgba(79,70,229,0.3)] transition-all hover:-translate-y-1 active:scale-95">
              {UI_STRINGS.exploreProducts[language]}
            </Link>
            <a href="#contact" className="px-6 md:px-10 py-3 md:py-4 glass hover:bg-white/10 text-white rounded-xl md:rounded-2xl text-sm md:text-base font-bold border border-white/20 transition-all active:scale-95">
              {UI_STRINGS.contactUs[language]}
            </a>
          </div>
        </div>

        <div className="relative group perspective-1000 mt-8 lg:mt-0">
          <div className="glass p-2 md:p-3 rounded-[1.5rem] md:rounded-[2.5rem] relative z-10 transform transition-all duration-700 lg:group-hover:rotate-y-12 lg:group-hover:rotate-x-6">
            <img 
              src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1200" 
              alt="Professional Imaging" 
              className="rounded-[1.25rem] md:rounded-[2rem] w-full h-[300px] md:h-[500px] object-cover shadow-2xl shadow-indigo-500/10"
            />
            
            {/* Overlay Floating Glass Cards - Scaled for Mobile */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 glass p-3 md:p-6 rounded-2xl md:rounded-3xl w-32 md:w-52 shadow-2xl border-indigo-500/20 backdrop-blur-xl animate-bounce-subtle">
              <div className="text-indigo-400 font-bold text-xl md:text-4xl">100%</div>
              <div className="text-[8px] md:text-xs text-slate-300 mt-1 md:mt-2 uppercase tracking-widest font-bold">
                {language === 'ar' ? 'أصالة المنتجات' : 'Genuine Products'}
              </div>
            </div>

            <div className="absolute -top-3 -right-3 md:-top-6 md:-right-6 glass p-2 md:p-5 rounded-xl md:rounded-2xl shadow-2xl border-white/20 backdrop-blur-xl animate-float">
               <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs md:text-base">✓</div>
                  <div className="text-[9px] md:text-sm font-bold">{language === 'ar' ? 'دعم فني' : 'Expert Support'}</div>
               </div>
            </div>
          </div>
          {/* Decorative Back Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] border border-white/5 rounded-full -z-10 animate-spin-slow hidden md:block" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
