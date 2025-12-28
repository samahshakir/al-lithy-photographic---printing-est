import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { useCart } from '../components/CartContext';
import { useModal } from '../components/modal/ModalContext';
import { productsService } from '../services/productsService';
import { Product } from '../types';
import { UI_STRINGS } from '../constants';
import Navbar from '../components/Navbar';

const ProductsExplorePage: React.FC = () => {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const { showAlert } = useModal();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Apply filters whenever search/category changes
  useEffect(() => {
    applyFilters();
  }, [debouncedQuery, selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productsService.getProducts();
      setProducts(data);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(data.map(p => p.category).filter(Boolean) as string[])
      );
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Apply search filter
    if (debouncedQuery) {
      const query = debouncedQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title_ar.toLowerCase().includes(query) ||
        product.title_en.toLowerCase().includes(query) ||
        product.description_ar.toLowerCase().includes(query) ||
        product.description_en.toLowerCase().includes(query) ||
        (product.category?.toLowerCase().includes(query) || false)
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showAlert(UI_STRINGS.addedToCart[language], 'success');
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
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

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <Navbar />

      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full animate-float-delayed" />
      </div>

      {/* Header */}
      <div className="pt-28 p-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            {UI_STRINGS.explorePage[language]}
          </h1>

          {/* Search Bar */}
          <div className="relative mb-6">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={UI_STRINGS.searchPlaceholder[language]}
              className="w-full pl-12 pr-4 py-3 glass rounded-xl border border-white/10 focus:border-indigo-500 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category Filters */}
          {categories.length > 0 && (
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-64 px-4 py-3 glass rounded-xl border border-white/10 focus:border-indigo-500 focus:outline-none transition-all appearance-none cursor-pointer text-white bg-slate-900/50"
                style={{
                  colorScheme: 'dark'
                }}
              >
                <option value="" className="bg-slate-900 text-white">{UI_STRINGS.allCategories[language]}</option>
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-slate-900 text-white">
                    {category}
                  </option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto p-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-20 h-20 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-slate-400 mb-2">
              {UI_STRINGS.noProductsFound[language]}
            </h3>
            <p className="text-slate-500">
              {UI_STRINGS.searchTryDifferent[language]}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const primaryImage = product.images?.[0] || product.image_url || '';
              const showPrice = product.price && product.price > 0;

              return (
                <div key={product.id} className="glass-dark rounded-2xl overflow-hidden border border-white/5 group hover:border-indigo-500/30 transition-all">
                  {/* Product Image */}
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="h-48 relative overflow-hidden">
                      {primaryImage ? (
                        <img
                          src={primaryImage}
                          alt={language === 'ar' ? product.title_ar : product.title_en}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-900/50">
                          <svg className="w-16 h-16 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      {product.images && product.images.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded-full text-xs">
                          {product.images.length} {language === 'ar' ? 'صور' : 'images'}
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Product Details */}
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-bold text-sm hover:text-indigo-400 transition-colors">
                            {language === 'ar' ? product.title_ar : product.title_en}
                          </h3>
                          {product.category && (
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-indigo-600/20 text-indigo-300 rounded-full">
                              {product.category}
                            </span>
                          )}
                        </div>
                        <span className="text-xl ml-2">{product.icon}</span>
                      </div>
                    </Link>

                    {/* Price */}
                    {showPrice && (
                      <div className="text-lg font-bold text-indigo-400 mb-3">
                        {product.price} {language === 'ar' ? 'ر.س' : 'SAR'}
                      </div>
                    )}

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {UI_STRINGS.addToCart[language]}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsExplorePage;
