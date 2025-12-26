
export type Language = 'ar' | 'en';

export interface NavItem {
  label: { ar: string; en: string };
  href: string;
}

export interface Product {
  id: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  icon: string;
  image: string;
}

export interface Translation {
  [key: string]: {
    ar: string;
    en: string;
  };
}
