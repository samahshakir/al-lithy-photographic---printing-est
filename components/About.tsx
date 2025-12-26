
import React from 'react';
import { useLanguage } from './LanguageContext';
import { UI_STRINGS } from '../constants';

const About: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 glass-dark rounded-3xl p-8 relative">
             <div className="grid grid-cols-2 gap-4">
               <img src="https://picsum.photos/seed/about1/400/400" alt="Work" className="rounded-xl aspect-square object-cover" />
               <img src="https://picsum.photos/seed/about2/400/400" alt="Materials" className="rounded-xl aspect-square object-cover mt-8" />
             </div>
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-4xl font-bold text-white relative inline-block">
              {UI_STRINGS.aboutTitle[language]}
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-indigo-600/50 rounded-full"></span>
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed font-light">
              {UI_STRINGS.aboutText[language]}
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="space-y-2">
                <div className="text-indigo-500 font-bold text-lg">{language === 'ar' ? 'الجودة' : 'Quality'}</div>
                <div className="text-sm text-slate-400">{language === 'ar' ? 'أجود الخامات المعتمدة عالمياً' : 'Best internationally certified materials'}</div>
              </div>
              <div className="space-y-2">
                <div className="text-indigo-500 font-bold text-lg">{language === 'ar' ? 'التوريد' : 'Supply'}</div>
                <div className="text-sm text-slate-400">{language === 'ar' ? 'دقة في المواعيد وسرعة التوصيل' : 'On-time precision and fast delivery'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
