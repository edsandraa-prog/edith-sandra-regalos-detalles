import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { Heart, ShoppingBag, Star, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isWishlisted, toggleWishlist } = useCart();
  const { navigateTo } = useNavigation();
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const isFav = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1, undefined, true);
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleCardClick = () => {
    navigateTo('producto', { productId: product.id });
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl border border-stone-200/80 overflow-hidden hover:border-rose-300 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-rose-50/50 p-4 text-center">
            <Sparkles className="w-8 h-8 text-rose-300 mb-2" />
            <span className="text-xs font-serif text-rose-800">{product.name}</span>
          </div>
        )}

        {/* Discount Tag */}
        {product.discount && product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-rose-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs tracking-wider">
            -{product.discount}%
          </div>
        )}

        {/* Customizable label */}
        {product.customizable && (
          <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-sm">
            Personalizable
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          aria-label={isFav ? "Quitar de favoritos" : "Guardar en favoritos"}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            isFav
              ? 'bg-rose-500 text-white shadow-md scale-105'
              : 'bg-white/80 text-stone-600 hover:text-rose-600 hover:bg-white shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Details Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-medium text-rose-700/80 tracking-wide uppercase text-[11px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-semibold text-stone-700 tabular-nums text-xs">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-stone-400 text-[11px] tabular-nums">
                ({product.reviews})
              </span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 group-hover:text-rose-800 transition-colors line-clamp-1 mb-2">
            {product.name}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-bold text-stone-900 tabular-nums">
                S/ {product.price.toFixed(2)}
              </span>
              {product.oldPrice && product.oldPrice > product.price && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  S/ {product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-600 text-rose-800 hover:text-white px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer shrink-0"
            title="Agregar al carrito"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{isAdding ? 'Agregando...' : 'Agregar'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
