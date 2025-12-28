
import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { UI_STRINGS } from '../constants';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');

    try {
      // EmailJS Configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_pc0lavq';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Template parameters that will be sent to the email
      const templateParams = {
        to_email: 'Newtech_newtech@yahoo.in',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        subject: `New Inquiry from ${formData.name}`,
      };

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      if (response.status === 200) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{UI_STRINGS.contactUs[language]}</h2>
              <p className="text-sm md:text-base text-slate-400">
                {language === 'ar' 
                  ? 'نسعد بتلقي استفساراتكم وطلباتكم. فريقنا جاهز لخدمتكم وتزويدكم بأفضل الأسعار.' 
                  : 'We are happy to receive your inquiries. Our team is ready to serve you with the best prices.'}
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 glass rounded-xl flex items-center justify-center text-indigo-400 shrink-0">
                   📍
                </div>
                <div>
                  <div className="font-bold text-sm md:text-base">{language === 'ar' ? 'الموقع' : 'Location'}</div>
                  <div className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    {language === 'ar' 
                      ? 'مركز الزيتونة، بجوار بنك الراجحي، طريق الأمير متعب بن عبد العزيز، حي الرحاب، جدة، المملكة العربية السعودية' 
                      : 'Zaitoona center, Near bank alrajhi, Prince mutaib bin abdul aziz rd, ar rihab district, Jeddah, Saudi arabia'}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 glass rounded-xl flex items-center justify-center text-indigo-400 shrink-0">
                   📞
                </div>
                <div>
                  <div className="font-bold text-sm md:text-base">{language === 'ar' ? 'الهاتف' : 'Phone'}</div>
                  <div className="text-slate-400 text-xs md:text-sm" dir="ltr">+966 531555016</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 glass rounded-xl flex items-center justify-center text-indigo-400 shrink-0">
                   📧
                </div>
                <div>
                  <div className="font-bold text-sm md:text-base">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</div>
                  <div className="text-slate-400 text-xs md:text-sm flex flex-col gap-1">
                    <a href="mailto:Hkm6666@hotmail.com" className="hover:text-indigo-400 transition-colors">Hkm6666@hotmail.com</a>
                    <a href="mailto:Newtech_newtech@yahoo.in" className="hover:text-indigo-400 transition-colors">Newtech_newtech@yahoo.in</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-dark p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="space-y-1 md:space-y-2">
                <label className="text-xs md:text-sm font-medium text-slate-300">{UI_STRINGS.formName[language]}</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                />
              </div>
              <div className="space-y-1 md:space-y-2">
                <label className="text-xs md:text-sm font-medium text-slate-300">{UI_STRINGS.formEmail[language]}</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-1 md:space-y-2">
                <label className="text-xs md:text-sm font-medium text-slate-300">{UI_STRINGS.formMessage[language]}</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                  placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                />
              </div>
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full py-3 md:py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg md:rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all text-sm md:text-base disabled:opacity-50"
              >
                {status === 'loading' 
                  ? (language === 'ar' ? 'جاري الإرسال...' : 'Sending...') 
                  : UI_STRINGS.formSubmit[language]}
              </button>
              
              {status === 'success' && (
                <p className="text-green-400 text-sm font-medium text-center animate-pulse">
                  {language === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 'Your message has been sent successfully!'}
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm font-medium text-center">
                  {language === 'ar' ? 'حدث خطأ ما. حاول مرة أخرى.' : 'Something went wrong. Please try again.'}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
