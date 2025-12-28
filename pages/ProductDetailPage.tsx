import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { useCart } from '../components/CartContext';
import { useModal } from '../components/modal/ModalContext';
import { productsService } from '../services/productsService';
import ProductImageCarousel from '../components/ProductImageCarousel';
import { Product } from '../types';
import { UI_STRINGS } from '../constants';
import Navbar from '../components/Navbar';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const { showAlert } = useModal();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate('/products');
      return;
    }

    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(false);
      const data = await productsService.getProductById(id);
      if (data) {
        setProduct(data);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      showAlert(UI_STRINGS.addedToCart[language], 'success');
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">{UI_STRINGS.loading[language]}</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center selection:bg-indigo-500 selection:text-white">
        {/* Animated background */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[120px] rounded-full animate-float" />
          <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full animate-float-delayed" />
        </div>

        <div className="text-center">
          <svg className="w-20 h-20 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold mb-2">
            {UI_STRINGS.productNotFound[language]}
          </h2>
          <p className="text-slate-400 mb-6">
            {language === 'ar' ? 'عذراً، لم نتمكن من العثور على هذا المنتج' : 'Sorry, we could not find this product'}
          </p>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold transition-all"
          >
            {UI_STRINGS.exploreProducts[language]}
          </button>
        </div>
      </div>
    );
  }

  const showPrice = product.price && product.price > 0;

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <Navbar />

      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full animate-float-delayed" />
      </div>

      {/* Header with Back Button */}
      <div className="pt-28 p-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 glass rounded-xl hover:bg-white/10 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {language === 'ar' ? 'رجوع' : 'Back'}
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div>
            <ProductImageCarousel
              images={product.images || (product.image_url ? [product.image_url] : [])}
              altText={language === 'ar' ? product.title_ar : product.title_en}
            />
          </div>

          {/* Product Details */}
          <div className="glass-dark rounded-3xl p-8 border border-white/10 flex flex-col">
            {/* Icon and Title */}
            <div className="flex items-start gap-4 mb-4">
              <div className="text-5xl">{product.icon}</div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">
                  {language === 'ar' ? product.title_ar : product.title_en}
                </h1>
                {product.category && (
                  <span className="inline-block px-3 py-1 text-sm bg-indigo-600/20 text-indigo-300 rounded-full">
                    {product.category}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 flex-1">
              <h3 className="text-lg font-semibold mb-2 text-slate-300">
                {language === 'ar' ? 'الوصف' : 'Description'}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {language === 'ar' ? product.description_ar : product.description_en}
              </p>
            </div>

            {/* Price */}
            {showPrice ? (
              <div className="mb-6">
                <div className="text-3xl font-bold text-indigo-400">
                  {product.price} {language === 'ar' ? 'ر.س' : 'SAR'}
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <div className="text-lg text-amber-400 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {UI_STRINGS.priceOnRequest[language]}
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {UI_STRINGS.addToCart[language]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
