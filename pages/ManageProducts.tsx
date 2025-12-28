import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { useAuth } from '../components/AuthContext';
import { useModal } from '../components/modal/ModalContext';
import { productsService } from '../services/productsService';
import { Product } from '../types';

const ManageProducts: React.FC = () => {
  const { language } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const { showAlert, showConfirm } = useModal();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/add');
      return;
    }

    fetchProducts();
  }, [isAuthenticated, navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productsService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirm(
      language === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?',
      { variant: 'danger' }
    );

    if (!confirmed) return;

    try {
      await productsService.deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      showAlert(
        language === 'ar' ? 'حدث خطأ أثناء الحذف' : 'Error deleting product',
        'error'
      );
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-indigo-500 selection:text-white">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full animate-float-delayed" />
      </div>

      {/* Header */}
      <div className="p-4 md:p-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="text-lg md:text-2xl font-bold">
            {language === 'ar' ? 'إدارة المنتجات' : 'Manage Products'}
          </h1>
          <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate('/add')}
              className="flex-1 sm:flex-none px-3 md:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg md:rounded-xl text-xs md:text-sm transition-all"
            >
              {language === 'ar' ? '+ إضافة منتج' : '+ Add Product'}
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 sm:flex-none px-3 md:px-4 py-2 glass rounded-lg md:rounded-xl text-xs md:text-sm hover:bg-white/10 transition-all"
            >
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </button>
            <button
              onClick={handleLogout}
              className="px-3 md:px-4 py-2 text-red-400 hover:text-red-300 text-xs md:text-sm transition-all"
            >
              {language === 'ar' ? 'خروج' : 'Logout'}
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.map((product) => {
            const primaryImage = product.images?.[0] || product.image_url || '';
            return (
              <div key={product.id} className="glass-dark rounded-2xl overflow-hidden border border-white/5">
                <div className="h-48 relative">
                  <img
                    src={primaryImage}
                    alt={language === 'ar' ? product.title_ar : product.title_en}
                    className="w-full h-full object-cover"
                  />
                  {!product.active && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="text-red-400 font-bold">
                        {language === 'ar' ? 'محذوف' : 'Deleted'}
                      </span>
                    </div>
                  )}
                  {product.images && product.images.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded-full text-xs">
                      {product.images.length} {language === 'ar' ? 'صور' : 'images'}
                    </div>
                  )}
                </div>
                <div className="p-3 md:p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-xs md:text-sm">
                        {language === 'ar' ? product.title_ar : product.title_en}
                      </h3>
                      {product.category && (
                        <span className="inline-block mt-1 px-1.5 md:px-2 py-0.5 text-xs bg-indigo-600/20 text-indigo-300 rounded-full">
                          {product.category}
                        </span>
                      )}
                    </div>
                    <span className="text-lg md:text-xl">{product.icon}</span>
                  </div>
                  <p className="text-slate-400 text-xs mb-3 md:mb-4 line-clamp-2">
                    {language === 'ar' ? product.description_ar : product.description_en}
                  </p>
                  {product.price && (
                    <p className="text-green-400 font-semibold mb-3 md:mb-4 text-sm md:text-base">
                      {product.price} {language === 'ar' ? 'ر.س' : 'SAR'}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/edit/${product.id}`)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-all"
                    >
                      {language === 'ar' ? 'تعديل' : 'Edit'}
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-all"
                    >
                      {language === 'ar' ? 'حذف' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p>{language === 'ar' ? 'لا توجد منتجات' : 'No products found'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
