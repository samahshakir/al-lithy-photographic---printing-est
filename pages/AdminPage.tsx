import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { useAuth } from '../components/AuthContext';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';

const AdminPage: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-indigo-500 selection:text-white">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full animate-float-delayed" />
      </div>

      {/* Header */}
      <div className="p-6 flex items-center justify-between max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">
          {language === 'ar' ? 'لوحة التحكم' : 'Admin Panel'}
        </h1>
        <button
          onClick={handleBackToHome}
          className="px-4 py-2 glass rounded-xl text-sm hover:bg-white/10 transition-all"
        >
          {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
        </button>
      </div>

      {/* Content */}
      {isAuthenticated ? (
        <AdminDashboard onLogout={logout} />
      ) : (
        <AdminLogin />
      )}
    </div>
  );
};

export default AdminPage;
