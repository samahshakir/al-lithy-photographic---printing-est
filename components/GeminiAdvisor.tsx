
import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { getProductAdvice } from '../services/geminiService';

const GeminiAdvisor: React.FC = () => {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    const advice = await getProductAdvice(query, language);
    setResponse(advice);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 glass p-8 rounded-3xl border-indigo-500/20 border-2">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center text-2xl">
          ✨
        </div>
        <div>
          <h3 className="text-xl font-bold">
            {language === 'ar' ? 'المستشار الذكي' : 'Smart Product Advisor'}
          </h3>
          <p className="text-xs text-slate-400">
            {language === 'ar' ? 'مدعوم بالذكاء الاصطناعي لاختيار المنتج الأنسب' : 'AI-powered to help you pick the perfect product'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={language === 'ar' ? 'اسألني عن أفضل نوع ورق لطباعة الصور الشخصية...' : 'Ask me about the best paper for portraits...'}
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
        />
        <button
          disabled={loading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl font-bold transition-all"
        >
          {loading ? (language === 'ar' ? 'جاري التفكير...' : 'Thinking...') : (language === 'ar' ? 'استشارة الذكاء الاصطناعي' : 'Consult AI Advisor')}
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-white/5 rounded-2xl text-sm leading-relaxed border-l-4 border-indigo-500 animate-in fade-in slide-in-from-bottom-2">
          {response}
        </div>
      )}
    </div>
  );
};

export default GeminiAdvisor;
