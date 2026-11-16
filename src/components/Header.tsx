import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../config/storeConfig';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Gift,
  Phone,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

interface HeaderProps {
  onOpenUserModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenUserModal }) => {
  const { currentPage, navigateTo, searchQuery, setSearchQuery, setIsWishlistModalOpen } =
    useNavigation();
  const { cartCount, wishlist, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    navigateTo('tienda', { search: localSearch });
  };

  const navLinks = [
    { label: 'Inicio', page: 'inicio' as const },
    { label: 'Tienda', page: 'tienda' as const },
    { label: 'Categorías', page: 'categorias' as const },
    { label: 'Personalizados', page: 'personalizados' as const },
    { label: 'Ofertas', page: 'ofertas' as const },
    { label: 'Nosotros', page: 'nosotros' as const },
    { label: 'Contacto', page: 'contacto' as const },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-rose-100/80 shadow-xs transition-all">
      {/* 1. Top Informative Banner */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-rose-950 text-rose-100 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4 text-center sm:text-left">
          <p className="font-medium tracking-wide">
            🚚 Envíos en Ácora y alrededores &nbsp;|&nbsp; 🎁 Personalizamos tus regalos &nbsp;|&nbsp; 💳 Pagos seguros con Yape y Plin
          </p>
          <div className="hidden md:flex items-center gap-4 text-rose-200">
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-rose-300" />
              <span>WhatsApp: {STORE_CONFIG.whatsappDisplay}</span>
            </a>
            <span className="text-rose-400">·</span>
            <span>Ácora, Puno</span>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 md:gap-8">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-stone-700 hover:text-rose-800 focus:outline-hidden"
          aria-label="Abrir menú de navegación"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo & Name */}
        <button
          onClick={() => navigateTo('inicio')}
          className="text-left group flex items-center gap-2.5 cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 border border-rose-300 flex items-center justify-center text-rose-800 shadow-xs group-hover:scale-105 transition-transform">
            <Gift className="w-5 h-5 text-rose-700" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-900 group-hover:text-rose-800 transition-colors">
              Edith Sandra
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium tracking-widest uppercase text-rose-600">
              Regalos & Detalles
            </span>
          </div>
        </button>

        {/* Search Bar (Center Desktop) */}
        <div className="hidden md:flex flex-1 max-w-lg mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="¿Qué estás buscando? (flores, peluches, tazas...)"
              className="w-full pl-10 pr-24 py-2 bg-stone-50 border border-stone-200 rounded-full text-sm text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100 transition-all"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              Buscar
            </button>
          </form>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* User button */}
          <button
            onClick={onOpenUserModal}
            className="p-2 text-stone-700 hover:text-rose-800 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
            title="Mi Cuenta"
            aria-label="Abrir opciones de cuenta"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Favorites Button with Badge */}
          <button
            onClick={() => setIsWishlistModalOpen(true)}
            className="relative p-2 text-stone-700 hover:text-rose-800 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
            title="Mis Favoritos"
            aria-label={`Favoritos, ${wishlist.length} artículos guardados`}
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button with Count Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 px-3.5 py-1.5 rounded-full transition-all cursor-pointer group"
            aria-label={`Carrito de compras, ${cartCount} productos`}
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-rose-700 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-700 text-white text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-semibold">Carrito</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="¿Qué estás buscando?"
            className="w-full pl-9 pr-20 py-2 bg-stone-50 border border-stone-200 rounded-full text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-rose-400"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-rose-700 text-white text-[11px] font-semibold px-3 py-1 rounded-full"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* 3. Navigation Bar (Desktop) */}
      <div className="hidden lg:block border-t border-stone-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center gap-8 py-2.5 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => navigateTo(link.page)}
                  className={`relative py-1 cursor-pointer transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-rose-800 font-semibold'
                      : 'text-stone-600 hover:text-rose-700'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col p-6 z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-rose-700" />
                <span className="font-serif font-bold text-stone-900">Edith Sandra</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 py-4 flex flex-col gap-1 overflow-y-auto">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => {
                    navigateTo(link.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                    currentPage === link.page
                      ? 'bg-rose-50 text-rose-800 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              ))}
            </nav>

            <div className="pt-4 border-t border-stone-100 space-y-3">
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-xl text-sm font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Pedir por WhatsApp</span>
              </a>
              <p className="text-[11px] text-center text-stone-400">
                📍 Ácora, Puno, Perú · Envíos locales
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
