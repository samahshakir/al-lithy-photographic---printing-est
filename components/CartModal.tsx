import React from 'react';
import { useCart } from './CartContext';
import { useLanguage } from './LanguageContext';
import { UI_STRINGS } from '../constants';

interface CartModalProps {
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { language } = useLanguage();

  const WHATSAPP_NUMBER = '966531555016';

  const calculateCartSummary = () => {
    let totalWithPrice = 0;
    let itemsWithoutPrice = 0;

    cart.forEach(item => {
      if (item.product.price && item.product.price > 0) {
        totalWithPrice += item.product.price * item.quantity;
      } else {
        itemsWithoutPrice += item.quantity;
      }
    });

    return { totalWithPrice, itemsWithoutPrice };
  };

  const formatWhatsAppMessage = () => {
    const header = language === 'ar'
      ? 'مرحباً، أود طلب المنتجات التالية:\n\n'
      : 'Hello, I would like to order the following products:\n\n';

    const items = cart.map((item, idx) => {
      const title = language === 'ar' ? item.product.title_ar : item.product.title_en;
      const priceText = item.product.price && item.product.price > 0
        ? ` - ${item.product.price} ${language === 'ar' ? 'ر.س' : 'SAR'}`
        : ` - ${language === 'ar' ? 'السعر عند الاستفسار' : 'Price on request'}`;
      return `${idx + 1}. ${title}${priceText} - ${language === 'ar' ? 'الكمية' : 'Qty'}: ${item.quantity}`;
    }).join('\n');

    const summary = calculateCartSummary();
    const total = summary.totalWithPrice > 0
      ? `\n\n${language === 'ar' ? 'الإجمالي' : 'Total'}: ${summary.totalWithPrice.toFixed(2)} ${language === 'ar' ? 'ر.س' : 'SAR'}`
      : '';

    const footer = language === 'ar'
      ? '\n\nشكراً لكم!'
      : '\n\nThank you!';

    return encodeURIComponent(header + items + total + footer);
  };

  const handleSendWhatsApp = () => {
    const message = formatWhatsAppMessage();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="glass-dark rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {language === 'ar' ? 'سلة الطلبات' : 'Your Quote'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p>{language === 'ar' ? 'السلة فارغة' : 'Cart is empty'}</p>
            </div>
          ) : (
            cart.map(item => {
              const primaryImage = item.product.images?.[0] || item.product.image_url || '';
              return (
              <div key={item.product.id} className="glass rounded-2xl p-4 flex gap-4">
                <img
                  src={primaryImage}
                  alt={language === 'ar' ? item.product.title_ar : item.product.title_en}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm md:text-base">
                    {language === 'ar' ? item.product.title_ar : item.product.title_en}
                  </h3>
                  {item.product.category && (
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-indigo-600/20 text-indigo-300 rounded-full">
                      {item.product.category}
                    </span>
                  )}
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {language === 'ar' ? item.product.description_ar : item.product.description_en}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-400 hover:text-red-300 p-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            )})
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 space-y-3">
            {/* Price Summary */}
            {(() => {
              const summary = calculateCartSummary();
              return (
                <div className="space-y-2">
                  {summary.totalWithPrice > 0 && (
                    <div className="flex items-center justify-between text-lg font-bold border-b border-white/10 pb-3">
                      <span>{UI_STRINGS.total[language]}:</span>
                      <span className="text-indigo-400">
                        {summary.totalWithPrice.toFixed(2)} {language === 'ar' ? 'ر.س' : 'SAR'}
                      </span>
                    </div>
                  )}

                  {summary.itemsWithoutPrice > 0 && (
                    <div className="text-sm text-amber-400 flex items-center gap-2 pb-3">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>
                        {summary.itemsWithoutPrice} {language === 'ar'
                          ? UI_STRINGS.pricingConfirmation[language]
                          : `item${summary.itemsWithoutPrice > 1 ? 's' : ''} ${UI_STRINGS.pricingConfirmation[language]}`
                        }
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}

            <button
              onClick={handleSendWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {language === 'ar' ? 'إرسال الطلب عبر واتساب' : 'Send Quote via WhatsApp'}
            </button>
            <button
              onClick={clearCart}
              className="w-full text-red-400 hover:text-red-300 py-2 text-sm"
            >
              {language === 'ar' ? 'إفراغ السلة' : 'Clear Cart'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
