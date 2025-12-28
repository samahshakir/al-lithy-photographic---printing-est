import React, { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { AlertVariant } from '../../types';

interface AlertModalProps {
  message: string;
  variant: AlertVariant;
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ message, variant, onClose }) => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  const variantConfig = {
    info: {
      icon: '🔵',
      bgColor: 'bg-blue-600/20',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    success: {
      icon: '✅',
      bgColor: 'bg-green-600/20',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-400',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    error: {
      icon: '❌',
      bgColor: 'bg-red-600/20',
      borderColor: 'border-red-500/30',
      textColor: 'text-red-400',
      buttonColor: 'bg-red-600 hover:bg-red-700'
    }
  };

  const config = variantConfig[variant];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`glass-dark rounded-3xl max-w-md w-full border ${config.borderColor} transform transition-all duration-200 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${config.bgColor} rounded-t-3xl p-6 flex items-center justify-center`}>
          <div className="text-6xl">{config.icon}</div>
        </div>

        <div className="p-6 text-center">
          <p className={`text-lg ${config.textColor} leading-relaxed`}>
            {message}
          </p>
        </div>

        <div className="p-6 pt-0">
          <button
            onClick={handleClose}
            className={`w-full ${config.buttonColor} text-white py-3 rounded-xl font-semibold transition-all`}
          >
            {language === 'ar' ? 'حسناً' : 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
