
export type Language = 'ar' | 'en';

export interface NavItem {
  label: { ar: string; en: string };
  href: string;
}

export interface Product {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  price?: number;
  category?: string;
  icon: string;
  images: string[];  // Array of image URLs (up to 4)
  image_url?: string;  // Keep for backward compatibility
  active?: boolean;
  created_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Translation {
  [key: string]: {
    ar: string;
    en: string;
  };
}

export type ModalType = 'alert' | 'confirm';

export type AlertVariant = 'info' | 'success' | 'error';

export interface AlertModalConfig {
  type: 'alert';
  message: string;
  variant?: AlertVariant;
  onClose?: () => void;
}

export interface ConfirmModalConfig {
  type: 'confirm';
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel?: () => void;
}

export type ModalConfig = AlertModalConfig | ConfirmModalConfig;
