import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { useAuth } from './AuthContext';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { language } = useLanguage();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (login(password)) {
      setPassword('');
      setError('');
    } else {
      setError(language === 'ar' ? 'كلمة المرور غير صحيحة' : 'Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="glass-dark rounded-3xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">
            {language === 'ar' ? 'تسجيل الدخول' : 'Admin Login'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              {language === 'ar' ? 'كلمة المرور' : 'Password'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-indigo-500 focus:outline-none transition-all"
              placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter password'}
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all"
          >
            {language === 'ar' ? 'دخول' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
