
import React from 'react';
import { useLanguage } from './LanguageContext';
import { UI_STRINGS, NAV_ITEMS } from '../constants';

const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="py-12 border-t border-white/5 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <img src="/llz.png" alt="Company Logo" className="w-8 h-8 rounded" />
              <h2 className="font-bold text-lg tracking-wide uppercase">{UI_STRINGS.companyName[language]}</h2>
            </div>
            <p className="text-slate-400 max-w-lg text-sm leading-relaxed">
              {language === 'ar' 
                ? 'متخصصون في توريد مواد التصوير الفوتوغرافي والطباعة وصناعة الألبومات بأعلى معايير الجودة العالمية.' 
                : 'Specialized in supplying photographic, printing, and album-making materials with the highest international quality standards.'}
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-6">{language === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h3>
            <ul className="space-y-4">
              {NAV_ITEMS.map(item => (
                <li key={item.href}>
                  <a href={item.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {item.label[language]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>{UI_STRINGS.footerRights[language]}</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">{language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
            <a href="#" className="hover:text-white">{language === 'ar' ? 'الشروط والأحكام' : 'Terms of Service'}</a>
            <a href="/manage" className="hover:text-white opacity-50 hover:opacity-100 transition-opacity">
              {language === 'ar' ? 'إدارة' : 'Admin'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
