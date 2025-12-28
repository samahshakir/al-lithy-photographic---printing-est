import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { useAuth } from '../components/AuthContext';
import { useModal } from '../components/modal/ModalContext';
import { productsService } from '../services/productsService';
import { uploadMultipleImages } from '../services/imgbbService';
import { Product } from '../types';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const { showAlert } = useModal();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title_ar: '',
    title_en: '',
    description_ar: '',
    description_en: '',
    price: '',
    category: '',
    icon: '📦',
    existingImages: [] as string[]
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/add');
      return;
    }

    if (!id) {
      navigate('/manage');
      return;
    }

    fetchProduct();
  }, [id, isAuthenticated, navigate]);

  const fetchProduct = async () => {
    if (!id) return;

    try {
      setLoadingProduct(true);
      const product = await productsService.getProductById(id);
      if (product) {
        setFormData({
          title_ar: product.title_ar,
          title_en: product.title_en,
          description_ar: product.description_ar,
          description_en: product.description_en,
          price: product.price?.toString() || '',
          category: product.category || '',
          icon: product.icon,
          existingImages: product.images || (product.image_url ? [product.image_url] : [])
        });
        setImagePreviews(product.images || (product.image_url ? [product.image_url] : []));
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      showAlert(
        language === 'ar' ? 'حدث خطأ في تحميل المنتج' : 'Error loading product',
        'error'
      );
      navigate('/manage');
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleNewImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages = formData.existingImages.length + files.length;

    if (totalImages > 4) {
      showAlert(
        language === 'ar' ? 'يمكنك تحميل 4 صور كحد أقصى' : 'You can upload maximum 4 images',
        'error'
      );
      return;
    }

    setNewImages(files);

    // Generate previews
    const previews: string[] = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result as string);
        if (previews.length === files.length) {
          setImagePreviews([...formData.existingImages, ...previews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveExistingImage = (index: number) => {
    const newExisting = formData.existingImages.filter((_, idx) => idx !== index);
    setFormData(prev => ({ ...prev, existingImages: newExisting }));
    setImagePreviews(newExisting);
    setNewImages([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setLoading(true);

    try {
      // Upload new images if any
      let allImages = [...formData.existingImages];
      if (newImages.length > 0) {
        const newImageUrls = await uploadMultipleImages(newImages);
        allImages = [...allImages, ...newImageUrls];
      }

      // Update product
      await productsService.updateProduct(id, {
        title_ar: formData.title_ar,
        title_en: formData.title_en,
        description_ar: formData.description_ar,
        description_en: formData.description_en,
        price: formData.price ? parseFloat(formData.price) : undefined,
        category: formData.category || undefined,
        icon: formData.icon,
        images: allImages
      });

      showAlert(
        language === 'ar' ? 'تم التحديث بنجاح!' : 'Updated successfully!',
        'success'
      );
      navigate('/manage');

    } catch (error) {
      console.error('Error updating product:', error);
      showAlert(
        language === 'ar' ? 'حدث خطأ أثناء التحديث' : 'Error updating product',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
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
      <div className="p-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {language === 'ar' ? 'تعديل المنتج' : 'Edit Product'}
          </h1>
          <button
            onClick={() => navigate('/manage')}
            className="px-4 py-2 glass rounded-xl text-sm hover:bg-white/10 transition-all"
          >
            {language === 'ar' ? 'رجوع' : 'Back'}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="glass-dark rounded-3xl p-8 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Similar fields as ProductForm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'ar' ? 'الاسم بالعربية' : 'Name (Arabic)'}
                </label>
                <input
                  type="text"
                  value={formData.title_ar}
                  onChange={(e) => setFormData(prev => ({ ...prev, title_ar: e.target.value }))}
                  className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-indigo-500 focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'ar' ? 'الاسم بالإنجليزية' : 'Name (English)'}
                </label>
                <input
                  type="text"
                  value={formData.title_en}
                  onChange={(e) => setFormData(prev => ({ ...prev, title_en: e.target.value }))}
                  className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-indigo-500 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {language === 'ar' ? 'الوصف بالعربية' : 'Description (Arabic)'}
              </label>
              <textarea
                value={formData.description_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, description_ar: e.target.value }))}
                className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-indigo-500 focus:outline-none transition-all"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {language === 'ar' ? 'الوصف بالإنجليزية' : 'Description (English)'}
              </label>
              <textarea
                value={formData.description_en}
                onChange={(e) => setFormData(prev => ({ ...prev, description_en: e.target.value }))}
                className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-indigo-500 focus:outline-none transition-all"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'ar' ? 'السعر (اختياري)' : 'Price (Optional)'}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-indigo-500 focus:outline-none transition-all"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'ar' ? 'الفئة (اختياري)' : 'Category (Optional)'}
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-indigo-500 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'ar' ? 'الأيقونة' : 'Icon'}
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-indigo-500 focus:outline-none transition-all text-center text-2xl"
                  maxLength={2}
                />
              </div>
            </div>

            {/* Current Images */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === 'ar' ? 'الصور الحالية' : 'Current Images'}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {formData.existingImages.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img src={img} alt={`Current ${idx + 1}`} className="w-full h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(idx)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    {idx === 0 && (
                      <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                        {language === 'ar' ? 'رئيسية' : 'Primary'}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add New Images */}
              {formData.existingImages.length < 4 && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleNewImagesChange}
                    className="hidden"
                    id="new-images"
                  />
                  <label
                    htmlFor="new-images"
                    className="block w-full px-4 py-8 glass rounded-xl border-2 border-dashed border-white/10 hover:border-indigo-500/50 cursor-pointer transition-all text-center"
                  >
                    <svg className="w-8 h-8 mx-auto text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="text-slate-400 text-sm">
                      {language === 'ar' ? 'إضافة صور جديدة' : 'Add new images'}
                    </p>
                  </label>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 text-white py-3 rounded-xl font-semibold transition-all"
            >
              {loading
                ? (language === 'ar' ? 'جاري التحديث...' : 'Updating...')
                : (language === 'ar' ? 'تحديث المنتج' : 'Update Product')
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
