export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  discount?: number; // e.g., 20 for 20%
  rating: number;
  reviews: number;
  image: string;
  secondaryImage?: string;
  description: string;
  longDescription?: string;
  stock: number;
  customizable: boolean;
  featured?: boolean;
  isOffer?: boolean;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  iconName?: string;
}

export interface CartItem {
  id: string; // unique item instance id (productId + personalizations hash)
  productId: number;
  product: Product;
  quantity: number;
  personalization?: {
    recipientName?: string;
    specialMessage?: string;
    deliveryDate?: string;
    selectedColor?: string;
  };
}

export interface CustomerOrderInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  department: string;
  province: string;
  district: string;
  address: string;
  reference: string;
  deliveryMethod: 'delivery' | 'pickup';
  deliveryDate: string;
  deliveryTimeSlot: string;
  paymentMethod: 'yape' | 'plin' | 'transfer' | 'cash_on_delivery' | 'card';
  orderNotes?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  occasion: string;
  comment: string;
  rating: number;
  date: string;
  isDemo?: boolean;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export type PageView =
  | 'inicio'
  | 'tienda'
  | 'categorias'
  | 'producto'
  | 'carrito'
  | 'checkout'
  | 'nosotros'
  | 'personalizados'
  | 'ofertas'
  | 'blog'
  | 'contacto'
  | 'faq'
  | 'politicas'
  | 'terminos';
