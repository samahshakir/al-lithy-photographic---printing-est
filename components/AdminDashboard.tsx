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
    <div className="max-w-4xl mx-auto px-6 pb-20">
      {/* Success notification */}
      {showSuccess && (
        <div className="fixed top-20 right-6 glass-dark border border-green-500/30 rounded-xl p-4 animate-in slide-in-from-right z-50">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-400 font-medium">
              {language === 'ar' ? 'تمت الإضافة بنجاح!' : 'Product added successfully!'}
            </span>
          </div>
        </div>
      )}

      <div className="glass-dark rounded-3xl p-8 border border-white/10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">
              {language === 'ar' ? 'إضافة منتجات' : 'Add Products'}
            </h2>
            {productsAdded > 0 && (
              <p className="text-sm text-slate-400 mt-1">
                {language === 'ar'
                  ? `تمت إضافة ${productsAdded} ${productsAdded === 1 ? 'منتج' : 'منتجات'}`
                  : `${productsAdded} product${productsAdded === 1 ? '' : 's'} added`
                }
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/manage')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-sm transition-all"
            >
              {language === 'ar' ? 'إدارة المنتجات' : 'Manage Products'}
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
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
