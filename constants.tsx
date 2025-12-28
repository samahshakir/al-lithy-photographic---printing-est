
import { NavItem, Product, Translation } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
  { label: { ar: 'من نحن', en: 'About' }, href: '/#about' },
  { label: { ar: 'منتجاتنا', en: 'Products' }, href: '/products' },
  { label: { ar: 'تواصل معنا', en: 'Contact' }, href: '/#contact' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'photo-acc',
    title: { ar: 'إكسسوارات فوتوغرافية', en: 'Photographic Accessories' },
    description: { 
      ar: 'مجموعة شاملة من مستلزمات التصوير الفوتوغرافي الاحترافي ومعدات الاستوديو.', 
      en: 'A comprehensive range of professional photography essentials and studio equipment.' 
    },
    icon: '📸',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'print-mat',
    title: { ar: 'مواد الطباعة', en: 'Printing Materials' },
    description: { 
      ar: 'أحبار ومواد طباعة عالية الجودة لمختلف أنواع الطابعات الاحترافية.', 
      en: 'High-quality inks and printing substrates for various professional printer models.' 
    },
    icon: '🖨️',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'lamination',
    title: { ar: 'أفلام التغليف الحراري', en: 'Lamination Films' },
    description: { 
      ar: 'أفلام حماية وتغليف حراري للمستندات والصور بلمسات مطفية ولامعة.', 
      en: 'Protective lamination films for documents and photos in matte and glossy finishes.' 
    },
    icon: '📄',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'epson-paper',
    title: { ar: 'ورق صور (إبسون)', en: 'Photo Paper (EPSON)' },
    description: { 
      ar: 'ورق طباعة صور متخصص ومحسن لطابعات إبسون لضمان أفضل دقة ألوان.', 
      en: 'Specialized photo printing paper optimized for EPSON printers to ensure color accuracy.' 
    },
    icon: '🖼️',
    image: 'https://images.unsplash.com/photo-1603484477859-abe6a73f9366?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'stickers',
    title: { ar: 'لاصق بوجهين', en: 'Double-sided Stickers' },
    description: { 
      ar: 'لفائف لاصقة مزدوجة عالية القوة لتثبيت الصور واللوحات الفنية.', 
      en: 'High-strength double-sided adhesive rolls for mounting photos and artworks.' 
    },
    icon: '🎞️',
    image: '/dbs.webp'
  },
  {
    id: 'album-mat',
    title: { ar: 'مواد صناعة الألبومات', en: 'Album Making Materials' },
    description: { 
      ar: 'كل ما تحتاجه لصناعة ألبومات صور احترافية وفاخرة من الجلد والمخمل.', 
      en: 'Everything you need to craft professional luxury photo albums in leather and velvet.' 
    },
    icon: '📓',
    image: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'wedding-albums',
    title: { ar: 'ألبومات الأعراس الرقمية', en: 'Digital Wedding Albums' },
    description: { 
      ar: 'تصاميم ومواد حصرية لألبومات حفلات الزفاف الرقمية الحديثة.', 
      en: 'Exclusive designs and materials for modern digital wedding ceremony albums.' 
    },
    icon: '💍',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'photo-frames',
    title: { ar: 'إطارات الصور', en: 'Photo Frames' },
    description: { 
      ar: 'إطارات متنوعة كلاسيكية وحديثة تناسب جميع المقاسات والأذواق.', 
      en: 'Diverse classic and modern photo frames catering to all sizes and tastes.' 
    },
    icon: '🖼️',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800'
  }
];

export const UI_STRINGS: Translation = {
  companyName: {
    ar: 'مؤسسة عبدالله مهدر إبراهيم الليثي',
    en: 'Abdullah Mehdar Ibrahim Al Lithy'
  },
  heroTitle: {
    ar: 'رواد حلول التصوير والطباعة الاحترافية',
    en: 'Leaders in Professional Imaging & Printing Solutions'
  },
  heroSubtitle: {
    ar: 'نقدم أجود خامات التصوير ومواد الطباعة للجملة والتجزئة منذ سنوات. متخصصون في توفير الحلول المتكاملة للمصورين والمطابع.',
    en: 'Providing the finest photographic materials and printing supplies for wholesale & retail. We specialize in integrated solutions for photographers and print shops.'
  },
  exploreProducts: {
    ar: 'استكشف منتجاتنا',
    en: 'Explore Products'
  },
  contactUs: {
    ar: 'اتصل بنا',
    en: 'Contact Us'
  },
  aboutTitle: {
    ar: 'عن المؤسسة',
    en: 'About Us'
  },
  aboutText: {
    ar: 'مؤسسة عبدالله مهدر إبراهيم الليثي هي وجهتكم الأولى لجميع مستلزمات التصوير الفوتوغرافي ومواد الطباعة. نتخصص في توريد ورق الصور عالي الجودة، وأفلام التغليف، ومواد صناعة الألبومات الفاخرة، مع التركيز التام على تلبية احتياجات عملائنا في قطاع الجملة والتجزئة عبر تقديم منتجات رائدة مثل ورق إبسون واللاصق المزدوج الاحترافي.',
    en: 'Abdullah Mehdar Ibrahim Al Lithy Establishment is your premier destination for all photographic and printing supplies. We specialize in sourcing high-quality photo paper, lamination films, and luxury album-making materials, dedicated to serving wholesale and retail clients with industry-leading products like EPSON paper and professional double-sided adhesives.'
  },
  productsTitle: {
    ar: 'تخصصاتنا ومنتجاتنا',
    en: 'Our Specialties & Products'
  },
  formName: { ar: 'الاسم الكامل', en: 'Full Name' },
  formEmail: { ar: 'البريد الإلكتروني', en: 'Email Address' },
  formMessage: { ar: 'الرسالة', en: 'Your Message' },
  formSubmit: { ar: 'إرسال الطلب', en: 'Send Inquiry' },
  footerRights: {
    ar: 'جميع الحقوق محفوظة © ٢٠٢٤',
    en: 'All Rights Reserved © 2024'
  },
  cartTitle: {
    ar: 'سلة الطلبات',
    en: 'Your Quote'
  },
  cartEmpty: {
    ar: 'السلة فارغة',
    en: 'Cart is empty'
  },
  addToCart: {
    ar: 'أضف للسلة',
    en: 'Add to Cart'
  },
  sendWhatsApp: {
    ar: 'إرسال الطلب عبر واتساب',
    en: 'Send Quote via WhatsApp'
  },
  clearCart: {
    ar: 'إفراغ السلة',
    en: 'Clear Cart'
  },
  quantity: {
    ar: 'الكمية',
    en: 'Quantity'
  },
  // Explore page
  explorePage: {
    ar: 'استكشف جميع المنتجات',
    en: 'Explore All Products'
  },
  searchPlaceholder: {
    ar: 'ابحث عن المنتجات...',
    en: 'Search products...'
  },
  allCategories: {
    ar: 'جميع الفئات',
    en: 'All Categories'
  },
  noProductsFound: {
    ar: 'لم يتم العثور على منتجات',
    en: 'No products found'
  },
  searchTryDifferent: {
    ar: 'جرب البحث بكلمات مختلفة أو تغيير الفئة',
    en: 'Try searching with different keywords or change the category'
  },
  // Product detail
  backToProducts: {
    ar: 'العودة إلى المنتجات',
    en: 'Back to Products'
  },
  productDetails: {
    ar: 'تفاصيل المنتج',
    en: 'Product Details'
  },
  priceOnRequest: {
    ar: 'السعر عند الاستفسار',
    en: 'Price on Request'
  },
  loading: {
    ar: 'جاري التحميل...',
    en: 'Loading...'
  },
  productNotFound: {
    ar: 'المنتج غير موجود',
    en: 'Product Not Found'
  },
  // Cart
  total: {
    ar: 'الإجمالي',
    en: 'Total'
  },
  pricingConfirmation: {
    ar: 'منتج يتطلب تأكيد السعر - اتصل بنا',
    en: 'require pricing confirmation - Contact us'
  },
  addedToCart: {
    ar: 'تمت الإضافة إلى السلة!',
    en: 'Added to cart!'
  }
};
