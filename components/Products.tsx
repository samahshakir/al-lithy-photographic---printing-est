
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { useCart } from './CartContext';
import { UI_STRINGS } from '../constants';
import { Product } from '../types';
import { productsService } from '../services/productsService';

const Products: React.FC = () => {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productsService.getProducts();
        setProducts(data.slice(0, 4)); // Show only 4 latest products
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(language === 'ar'
          ? 'حدث خطأ في تحميل المنتجات'
          : 'Error loading products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [language]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  if (loading) {
    return (
      <section id="products" className="py-20 lg:py-32 relative bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-white/5 rounded w-64 mx-auto"></div>
              <div className="h-4 bg-white/5 rounded w-48 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="py-20 lg:py-32 relative bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-red-400">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 lg:py-32 relative bg-slate-900/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-20 space-y-4 lg:space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {language === 'ar' ? 'تخصصاتنا ومنتجاتنا' : 'Our Specialties & Products'}
          </h2>
          <div className="w-16 lg:w-24 h-1 lg:h-1.5 bg-indigo-600 mx-auto rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]"></div>
          <p className="text-sm md:text-base text-slate-400">
            {language === 'ar'
              ? 'نختار خاماتنا بعناية لضمان جودة استثنائية في كل طباعة وصورة.'
              : 'We select our materials carefully to ensure exceptional quality in every print and photo.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product, idx) => {
            const images = product.images || (product.image_url ? [product.image_url] : []);
            const primaryImage = images[0] || '';
            const showPrice = product.price && product.price > 0;

            return (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group glass-dark rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden hover:-translate-y-1 lg:hover:-translate-y-2 transition-all duration-500 border border-white/5 hover:border-indigo-500/30 flex flex-col"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="h-44 md:h-56 relative overflow-hidden shrink-0">
                <ProductImageGallery images={images} alt={language === 'ar' ? product.title_ar : product.title_en} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 lg:group-hover:opacity-40 transition-opacity"></div>

                {/* Image indicators */}
                {images.length > 1 && (
                  <div className="absolute top-2 right-2 flex gap-1">
                    {images.map((_, imgIdx) => (
                      <div key={imgIdx} className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                    ))}
                  </div>
                )}

                <div className="absolute bottom-4 left-5 right-5 flex items-center gap-2 lg:gap-3">
                   <div className="p-1.5 md:p-2 glass rounded-lg text-lg md:text-2xl lg:group-hover:bg-indigo-600 transition-colors">
                      {product.icon}
                   </div>
                   <h3 className="text-sm md:text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                    {language === 'ar' ? product.title_ar : product.title_en}
                   </h3>
                </div>
              </div>
              <div className="p-5 lg:p-7 space-y-3 lg:space-y-4 flex-grow flex flex-col">
                {/* Title */}
                <h3 className="text-sm md:text-base font-bold text-white">
                  {language === 'ar' ? product.title_ar : product.title_en}
                </h3>

                {product.category && (
                  <span className="inline-block self-start px-2 py-1 text-xs bg-indigo-600/20 text-indigo-300 rounded-full">
                    {product.category}
                  </span>
                )}
                {showPrice && (
                  <div className="text-lg font-bold text-indigo-400">
                    {product.price} {language === 'ar' ? 'ر.س' : 'SAR'}
                  </div>
                )}
                <div className="pt-3 border-t border-white/5">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>{language === 'ar' ? 'أضف للسلة' : 'Add to Cart'}</span>
                  </button>
                </div>
              </div>
            </Link>
          )})}
        </div>

        {/* See More Button */}
        <div className="flex justify-center mt-12">
          <Link
            to="/products"
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-[0_0_30px_rgba(79,70,229,0.3)] transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2"
          >
            {language === 'ar' ? 'عرض المزيد' : 'See More'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Image Gallery Component with auto-rotate on hover
const ProductImageGallery: React.FC<{ images: string[], alt: string }> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 2000); // Change image every 2 seconds on hover

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return <div className="w-full h-full bg-slate-800/50 flex items-center justify-center text-slate-400">No image</div>;
  }

  return (
    <>
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`${alt} - ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${
            idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}
    </>
  );
};

export default Products;
