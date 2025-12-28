import React, { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';

interface ConfirmModalProps {
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  confirmText,
  cancelText,
  variant,
  onConfirm,
  onCancel
}) => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleConfirm = () => {
    setIsVisible(false);
    setTimeout(onConfirm, 200);
  };

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(onCancel, 200);
  };

  const variantConfig = {
    danger: {
      icon: '⚠️',
      confirmBg: 'bg-red-600 hover:bg-red-700',
      iconBg: 'bg-red-600/20'
    },
    warning: {
      icon: '⚡',
      confirmBg: 'bg-amber-600 hover:bg-amber-700',
      iconBg: 'bg-amber-600/20'
    },
    info: {
      icon: 'ℹ️',
      confirmBg: 'bg-blue-600 hover:bg-blue-700',
      iconBg: 'bg-blue-600/20'
    }
  };

  const config = variantConfig[variant];
  const defaultConfirmText = language === 'ar' ? 'نعم' : 'Yes';
  const defaultCancelText = language === 'ar' ? 'إلغاء' : 'Cancel';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleCancel}
    >
      <div
        className={`glass-dark rounded-3xl max-w-md w-full border border-white/10 transform transition-all duration-200 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${config.iconBg} rounded-t-3xl p-6 flex items-center justify-center`}>
          <div className="text-6xl">{config.icon}</div>
        </div>

        <div className="p-6 text-center">
          <p className="text-lg text-slate-300 leading-relaxed">
            {message}
          </p>
        </div>

        <div className="p-6 pt-0 flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 glass hover:bg-white/10 text-white py-3 rounded-xl font-semibold transition-all border border-white/10"
          >
            {cancelText || defaultCancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 ${config.confirmBg} text-white py-3 rounded-xl font-semibold transition-all`}
          >
            {confirmText || defaultConfirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
