import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageView } from '../types';

interface NavigationOptions {
  productId?: number;
  category?: string;
  search?: string;
  blogId?: number;
}

interface NavigationContextType {
  currentPage: PageView;
  navigateTo: (page: PageView, options?: NavigationOptions) => void;
  selectedProductId: number | null;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedBlogId: number | null;
  isWishlistModalOpen: boolean;
  setIsWishlistModalOpen: (open: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('inicio');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);

  const navigateTo = (page: PageView, options?: NavigationOptions) => {
    setCurrentPage(page);
    if (options?.productId !== undefined) {
      setSelectedProductId(options.productId);
    }
    if (options?.category !== undefined) {
      setSelectedCategory(options.category);
    }
    if (options?.search !== undefined) {
      setSearchQuery(options.search);
    }
    if (options?.blogId !== undefined) {
      setSelectedBlogId(options.blogId);
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync hash changes if user uses browser back button
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '') as PageView;
      if (hash && ['inicio', 'tienda', 'categorias', 'producto', 'carrito', 'checkout', 'nosotros', 'personalizados', 'ofertas', 'blog', 'contacto', 'faq', 'politicas', 'terminos'].includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        navigateTo,
        selectedProductId,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedBlogId,
        isWishlistModalOpen,
        setIsWishlistModalOpen,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
