import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistModal: React.FC = () => {
  const { wishlist, addToCart, toggleWishlist } = useCart();
  const { isWishlistModalOpen, setIsWishlistModalOpen, navigateTo } = useNavigation();

  if (!isWishlistModalOpen) return null;

  const favoriteProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl z-10 flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h3 className="font-serif text-lg font-bold text-stone-900">Mis Regalos Favoritos</h3>
            <span className="text-xs text-stone-500 tabular-nums">
              ({favoriteProducts.length})
            </span>
          </div>
          <button
            onClick={() => setIsWishlistModalOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full cursor-pointer"
            aria-label="Cerrar favoritos"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-400 mx-auto mb-3">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-base font-semibold text-stone-800 mb-1">
                Aún no tienes favoritos guardados
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto mb-5">
                Haz clic en el corazón de cualquier regalo para guardarlo aquí y revisarlo cuando quieras.
              </p>
              <button
                onClick={() => {
                  setIsWishlistModalOpen(false);
                  navigateTo('tienda');
                }}
                className="bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold px-5 py-2.5 rounded-full cursor-pointer"
              >
                Explorar catálogo
              </button>
            </div>
          ) : (
            favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-stone-100 hover:border-rose-200 transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-lg object-cover bg-stone-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-rose-600 font-medium uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h5 className="text-sm font-semibold text-stone-900 truncate">
                    {product.name}
                  </h5>
                  <p className="text-xs font-bold text-stone-800 tabular-nums">
                    S/ {product.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      addToCart(product, 1, undefined, true);
                      setIsWishlistModalOpen(false);
                    }}
                    className="p-2 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white rounded-lg transition-colors cursor-pointer"
                    title="Mover al carrito"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 rounded-lg cursor-pointer"
                    title="Quitar"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
