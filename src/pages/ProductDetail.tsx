import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { STORE_CONFIG, buildWhatsAppLink, buildProductWhatsAppMessage } from '../config/storeConfig';
import { ProductCard } from '../components/ProductCard';
import {
  Heart,
  ShoppingBag,
  Phone,
  Truck,
  ShieldCheck,
  Star,
  Sparkles,
  Calendar,
  User,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  Share2,
} from 'lucide-react';

interface ProductDetailProps {
  productId?: number;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const { selectedProductId, navigateTo } = useNavigation();
  const { addToCart, isWishlisted, toggleWishlist } = useCart();

  const id = productId ?? selectedProductId ?? 1;
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [quantity, setQuantity] = useState(1);
  const [recipientName, setRecipientName] = useState('');
  const [specialMessage, setSpecialMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'reviews'>('details');
  const [copiedLink, setCopiedLink] = useState(false);

  // Gallery thumbnails
  const galleryImages = useMemo(() => {
    const list = [product.image];
    if (product.secondaryImage) list.push(product.secondaryImage);
    // Add extra sample perspectives
    list.push('/src/assets/images/hero_gift_box_flowers_1792431741285.jpg');
    return list;
  }, [product]);

  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  // Keep selected image in sync if product changes
  React.useEffect(() => {
    setSelectedImage(product.image);
    setQuantity(1);
  }, [product]);

  const isFav = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(
      product,
      quantity,
      {
        recipientName: recipientName.trim() || undefined,
        specialMessage: specialMessage.trim() || undefined,
        deliveryDate: deliveryDate || undefined,
      },
      true
    );
  };

  const handleBuyNow = () => {
    addToCart(
      product,
      quantity,
      {
        recipientName: recipientName.trim() || undefined,
        specialMessage: specialMessage.trim() || undefined,
        deliveryDate: deliveryDate || undefined,
      },
      false
    );
    navigateTo('checkout');
  };

  const handleWhatsAppOrder = () => {
    const message = buildProductWhatsAppMessage(product.name, quantity, product.price, {
      recipientName: recipientName.trim() || undefined,
      specialMessage: specialMessage.trim() || undefined,
      deliveryDate: deliveryDate || undefined,
    });
    window.open(buildWhatsAppLink(message), '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Mira este hermoso regalo: ${product.name} en Edith Sandra`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb / Back Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigateTo('tienda')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-rose-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al catálogo</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
          title="Compartir enlace del producto"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copiedLink ? '¡Enlace copiado!' : 'Compartir'}</span>
        </button>
      </div>

      {/* Main 2-Column Split: Sticky Gallery Left + Contiguous Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Product Images Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-md">
            <img
              src={selectedImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.discount && product.discount > 0 && (
              <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                -{product.discount}% OFF
              </div>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                isFav
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-white/80 text-stone-700 hover:text-rose-600'
              }`}
              title="Guardar en favoritos"
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  selectedImage === img
                    ? 'border-rose-600 scale-102 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Miniatura ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Trust Guarantees Box */}
          <div className="grid grid-cols-2 gap-3 pt-4 text-xs text-stone-600">
            <div className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-100 flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-rose-700 shrink-0" />
              <div>
                <p className="font-semibold text-stone-900">Envíos en Ácora</p>
                <p className="text-[11px] text-stone-500">Puntual y con cuidado</p>
              </div>
            </div>
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-stone-700 shrink-0" />
              <div>
                <p className="font-semibold text-stone-900">Garantía de Satisfacción</p>
                <p className="text-[11px] text-stone-500">Fotos antes del despacho</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="text-rose-700 font-bold uppercase tracking-wider text-[11px]">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-stone-800 tabular-nums">{product.rating.toFixed(1)}</span>
                <span className="text-stone-400 text-xs">({product.reviews} reseñas)</span>
              </div>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              {product.name}
            </h1>

            {/* Price section */}
            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                S/ {product.price.toFixed(2)}
              </span>
              {product.oldPrice && product.oldPrice > product.price && (
                <span className="text-sm text-stone-400 line-through tabular-nums">
                  S/ {product.oldPrice.toFixed(2)}
                </span>
              )}
              {product.discount && (
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                  Ahorras {product.discount}%
                </span>
              )}
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2 mt-3 text-xs text-emerald-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Disponible en taller ({product.stock} unidades en stock)</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-b border-stone-100 py-3">
            {product.description}
          </p>

          {/* Personalization Section */}
          <div className="bg-rose-50/50 p-4 sm:p-5 rounded-2xl border border-rose-100 space-y-3.5">
            <div className="flex items-center gap-2 text-rose-900 font-serif font-bold text-sm">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span>Personaliza tu regalo</span>
            </div>

            {/* Recipient Name */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Escribe el nombre que deseas colocar en el producto o dedicatoria:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Ej: Para María, con amor"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-rose-400"
                />
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Special Dedication Message */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Mensaje especial para la tarjeta:
              </label>
              <div className="relative">
                <textarea
                  rows={2}
                  value={specialMessage}
                  onChange={(e) => setSpecialMessage(e.target.value)}
                  placeholder="Escribe tu dedicatoria especial aquí..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-rose-400 resize-none"
                />
                <MessageSquare className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>

            {/* Delivery Date */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Fecha de entrega deseada:
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 cursor-pointer"
                />
                <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-stone-700">Cantidad:</span>
            <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-stone-600 hover:text-stone-900 cursor-pointer font-bold text-sm"
                aria-label="Disminuir cantidad"
              >
                -
              </button>
              <span className="px-3 text-xs font-bold tabular-nums text-stone-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-1.5 text-stone-600 hover:text-stone-900 cursor-pointer font-bold text-sm"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
            <span className="text-xs font-semibold text-stone-500 tabular-nums">
              Subtotal: S/ {(product.price * quantity).toFixed(2)}
            </span>
          </div>

          {/* Purchase CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 py-3 px-4 rounded-2xl text-xs font-bold transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Agregar al carrito</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white py-3 px-4 rounded-2xl text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Comprar ahora</span>
              </button>
            </div>

            {/* Direct WhatsApp Purchase Button */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Comprar por WhatsApp ({STORE_CONFIG.whatsappDisplay})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs: Details / Shipping / Reviews */}
      <div className="mt-14 bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex border-b border-stone-200 gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 transition-colors cursor-pointer border-b-2 ${
              activeTab === 'details'
                ? 'border-rose-600 text-rose-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Descripción Detallada
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 transition-colors cursor-pointer border-b-2 ${
              activeTab === 'shipping'
                ? 'border-rose-600 text-rose-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Envíos en Ácora & Puno
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 transition-colors cursor-pointer border-b-2 ${
              activeTab === 'reviews'
                ? 'border-rose-600 text-rose-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Opiniones ({product.reviews})
          </button>
        </div>

        <div className="pt-6 text-xs sm:text-sm text-stone-600 leading-relaxed">
          {activeTab === 'details' && (
            <div className="space-y-4">
              <p>{product.longDescription || product.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="font-semibold text-stone-900 block mb-0.5">Categoría:</span>
                  <span>{product.category}</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="font-semibold text-stone-900 block mb-0.5">Personalización:</span>
                  <span>
                    {product.customizable
                      ? 'Nombre, tarjeta y dedicatoria personalizada incluida'
                      : 'Arreglo pre-armado de alta calidad'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-3">
              <p>
                Realizamos entregas programadas en toda la zona urbana de Ácora y comunidades aledañas. También coordinamos entregas hacia Chucuito, Ilave y la ciudad de Puno.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Horario regular de entrega: Lunes a Sábado de 9:00 AM a 6:00 PM.</li>
                <li>Desayunos sorpresa: Entregas desde las 7:30 AM previa reserva.</li>
                <li>Envío estándar: S/ {STORE_CONFIG.shipping.standardDeliveryFee.toFixed(2)} (Gratis a partir de S/ {STORE_CONFIG.shipping.freeDeliveryThreshold.toFixed(2)}).</li>
                <li>Recojo en tienda sin costo: Jr. Puno s/n (Frente a la Plaza de Armas), Ácora.</li>
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                <span className="font-serif text-3xl font-bold text-stone-900">
                  {product.rating.toFixed(1)}
                </span>
                <div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Basado en {product.reviews} opiniones verificadas
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 border border-stone-100 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-900">Yulissa C.</span>
                    <span className="text-stone-400">Hace 1 semana</span>
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-600">
                    Excelente calidad, los colores y las flores llegaron muy frescos. ¡Muchas gracias Edith!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              También te podría encantar
            </h3>
            <button
              onClick={() => navigateTo('tienda', { category: product.category })}
              className="text-xs font-semibold text-rose-700 hover:text-rose-900 cursor-pointer"
            >
              Ver más de {product.category}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
