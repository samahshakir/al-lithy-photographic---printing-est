import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { productsService } from '../services/productsService';
import { uploadMultipleImages } from '../services/imgbbService';

interface ProductFormProps {
  onSuccess: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSuccess }) => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title_ar: '',
    title_en: '',
    description_ar: '',
    description_en: '',
    price: '',
    category: '',
    icon: '📦',
    images: [] as File[]
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 4) {
      alert(language === 'ar' ? 'يمكنك تحميل 4 صور كحد أقصى' : 'You can upload maximum 4 images');
      return;
    }

    setFormData(prev => ({ ...prev, images: files }));

    // Generate previews for all images
    const previews: string[] = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result as string);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Validate images
      if (formData.images.length === 0) {
        throw new Error('Please select at least one image');
      }

      if (formData.images.length > 4) {
        throw new Error('Maximum 4 images allowed');
      }

      // 2. Upload all images to ImgBB
      const imageUrls = await uploadMultipleImages(formData.images);

      // 3. Add product to Supabase
      await productsService.addProduct({
        title_ar: formData.title_ar,
        title_en: formData.title_en,
        description_ar: formData.description_ar,
        description_en: formData.description_en,
        price: formData.price ? parseFloat(formData.price) : undefined,
        category: formData.category || undefined,
        icon: formData.icon,
        images: imageUrls,
        active: true
      });

      // 4. Reset form for next product
      setFormData({
        title_ar: '',
        title_en: '',
        description_ar: '',
        description_en: '',
        price: '',
        category: '',
        icon: '📦',
        images: []
      });
      setImagePreviews([]);

      // Clear file input
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      onSuccess();

    } catch (error) {
      console.error('Error adding product:', error);
      alert(language === 'ar'
        ? 'حدث خطأ أثناء إضافة المنتج'
        : 'Error adding product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Arabic Title */}
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

        {/* English Title */}
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

      {/* Arabic Description */}
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

      {/* English Description */}
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
        {/* Price (Optional) */}
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

        {/* Category (Optional) */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {language === 'ar' ? 'الفئة (اختياري)' : 'Category (Optional)'}
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-indigo-500 focus:outline-none transition-all"
            placeholder={language === 'ar' ? 'مثال: طباعة' : 'e.g., printing'}
          />
        </div>

        {/* Icon */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {language === 'ar' ? 'الأيقونة (إيموجي)' : 'Icon (Emoji)'}
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

      {/* Multiple Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {language === 'ar' ? 'صور المنتج (حتى 4 صور)' : 'Product Images (up to 4)'}
        </label>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
            required
          />
          <label
            htmlFor="image-upload"
            className="block w-full px-4 py-8 glass rounded-xl border-2 border-dashed border-white/10 hover:border-indigo-500/50 cursor-pointer transition-all"
          >
            {imagePreviews.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreviews.map((preview, idx) => (
                  <div key={idx} className="relative">
                    <img src={preview} alt={`Preview ${idx + 1}`} className="w-full h-32 object-cover rounded-lg" />
                    <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                      {idx === 0 ? (language === 'ar' ? 'رئيسية' : 'Primary') : `${idx + 1}`}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center space-y-2">
                <svg className="w-12 h-12 mx-auto text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-slate-400">
                  {language === 'ar' ? 'اضغط لاختيار صور (حتى 4)' : 'Click to select images (up to 4)'}
                </p>
                <p className="text-slate-500 text-xs">
                  {language === 'ar' ? 'الصورة الأولى ستكون الرئيسية' : 'First image will be primary'}
                </p>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 text-white py-3 rounded-xl font-semibold transition-all"
      >
        {loading
          ? (language === 'ar' ? 'جاري الإضافة...' : 'Adding...')
          : (language === 'ar' ? 'إضافة المنتج' : 'Add Product')
        }
      </button>
    </form>
  );
};

export default ProductForm;
