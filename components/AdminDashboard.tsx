import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import ProductForm from './ProductForm';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [productsAdded, setProductsAdded] = useState(0);

  const handleProductAdded = () => {
    setProductsAdded(prev => prev + 1);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 pb-12 md:pb-20">
      {/* Success notification */}
      {showSuccess && (
        <div className="fixed top-20 right-4 md:right-6 glass-dark border border-green-500/30 rounded-xl p-3 md:p-4 animate-in slide-in-from-right z-50 max-w-[calc(100%-2rem)]">
          <div className="flex items-center gap-2 md:gap-3">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-400 font-medium text-sm md:text-base">
              {language === 'ar' ? 'تمت الإضافة بنجاح!' : 'Product added successfully!'}
            </span>
          </div>
        </div>
      )}

      <div className="glass-dark rounded-2xl md:rounded-3xl p-4 md:p-8 border border-white/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h2 className="text-lg md:text-2xl font-bold">
              {language === 'ar' ? 'إضافة منتجات' : 'Add Products'}
            </h2>
            {productsAdded > 0 && (
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                {language === 'ar'
                  ? `تمت إضافة ${productsAdded} ${productsAdded === 1 ? 'منتج' : 'منتجات'}`
                  : `${productsAdded} product${productsAdded === 1 ? '' : 's'} added`
                }
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate('/manage')}
              className="flex-1 sm:flex-none px-3 md:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg md:rounded-xl text-xs md:text-sm transition-all"
            >
              {language === 'ar' ? 'إدارة المنتجات' : 'Manage Products'}
            </button>
            <button
              onClick={onLogout}
              className="flex-1 sm:flex-none px-3 md:px-4 py-2 text-xs md:text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
            </button>
          </div>
        </div>

        <ProductForm onSuccess={handleProductAdded} />
      </div>
    </div>
  );
};

export default AdminDashboard;
