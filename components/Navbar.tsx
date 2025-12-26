
import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { NAV_ITEMS, UI_STRINGS } from '../constants';

const Navbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-8">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/llz.png" alt="Company Logo" className="w-10 h-10 rounded-lg shadow-lg shadow-indigo-500/20" />
          <div className="block">
            <h1 className="text-xs md:text-sm font-bold leading-tight uppercase tracking-wider">
              {UI_STRINGS.companyName[language]}
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {item.label[language]}
            </a>
          ))}
          <button
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold hover:bg-white/10 transition-all"
          >
            {language === 'ar' ? 'English' : 'العربية'}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
           <button
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="px-3 py-1 rounded-full border border-white/20 text-xs font-semibold"
          >
            {language === 'ar' ? 'EN' : 'AR'}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 glass rounded-2xl overflow-hidden animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-4 gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium p-2 text-slate-300 border-b border-white/5 last:border-0"
              >
                {item.label[language]}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
