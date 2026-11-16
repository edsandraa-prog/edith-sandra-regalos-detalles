import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { STORE_CONFIG, buildWhatsAppLink } from '../config/storeConfig';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  Phone,
  Sparkles,
  Truck,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    discountAmount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const { navigateTo } = useNavigation();
  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success?: boolean; text?: string } | null>(
    null
  );

  if (!isCartOpen) return null;

  const freeShippingThreshold = STORE_CONFIG.shipping.freeDeliveryThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponFeedback({ success: res.success, text: res.message });
    if (res.success) {
      setCouponCode('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  const handleWhatsAppCheckout = () => {
    let msg = `*¡Hola Edith Sandra! Quiero realizar el siguiente pedido:*\n\n`;
    cart.forEach((item, index) => {
      msg += `*${index + 1}. ${item.product.name}* (x${item.quantity})\n`;
      msg += `   Precio unitario: S/ ${item.product.price.toFixed(2)}\n`;
      if (item.personalization?.recipientName) {
        msg += `   Destinatario: ${item.personalization.recipientName}\n`;
      }
      if (item.personalization?.specialMessage) {
        msg += `   Dedicatoria: "${item.personalization.specialMessage}"\n`;
      }
      if (item.personalization?.deliveryDate) {
        msg += `   Fecha de entrega: ${item.personalization.deliveryDate}\n`;
      }
      msg += `\n`;
    });

    msg += `--------------------------\n`;
    msg += `Subtotal: S/ ${subtotal.toFixed(2)}\n`;
    if (discountAmount > 0) {
      msg += `Descuento (${appliedCoupon?.code}): -S/ ${discountAmount.toFixed(2)}\n`;
    }
    msg += `Envío estimado: S/ ${deliveryFee.toFixed(2)}\n`;
    msg += `*TOTAL: S/ ${total.toFixed(2)}*\n\n`;
    msg += `¿Podrían confirmarme la disponibilidad y datos de pago? Gracias.`;

    window.open(buildWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-700" />
            <h2 className="font-serif text-lg font-bold text-stone-900">Tu Carrito de Regalos</h2>
            <span className="text-xs text-stone-500 font-medium tabular-nums">
              ({cart.length} {cart.length === 1 ? 'artículo' : 'artículos'})
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-50 rounded-full cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Indicator */}
        <div className="bg-rose-50/70 p-3.5 border-b border-rose-100 text-xs">
          <div className="flex items-center justify-between gap-2 mb-1.5 font-medium text-stone-800">
            <span className="flex items-center gap-1.5 text-rose-800">
              <Truck className="w-4 h-4" />
              {remainingForFreeShipping > 0
                ? `¡Agrega S/ ${remainingForFreeShipping.toFixed(2)} más para Envío Gratis!`
                : '¡Felicidades! Calificas para Envío Gratis 🎉'}
            </span>
            <span className="text-stone-500 tabular-nums">
              {freeShippingProgress.toFixed(0)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-rose-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-rose-600 rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-400 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-stone-800 mb-1">
                Tu carrito está vacío
              </h3>
              <p className="text-xs text-stone-500 max-w-xs mb-6">
                Descubre flores frescas, peluches y hermosos detalles personalizados listos para entregar.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('tienda');
                }}
                className="bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-all cursor-pointer shadow-xs"
              >
                Explorar regalos
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3.5 p-3 rounded-xl border border-stone-100 bg-stone-50/40 relative group"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 rounded-lg object-cover bg-white shrink-0 border border-stone-200/60"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold text-stone-900 truncate">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Eliminar artículo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs font-semibold text-rose-700 tabular-nums my-1">
                    S/ {(item.product.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Personalization details preview */}
                  {item.personalization && (
                    <div className="text-[11px] text-stone-500 space-y-0.5 mb-2 bg-white/70 p-1.5 rounded-md border border-stone-200/50">
                      {item.personalization.recipientName && (
                        <p className="truncate">
                          <span className="font-medium text-stone-700">Para:</span>{' '}
                          {item.personalization.recipientName}
                        </p>
                      )}
                      {item.personalization.deliveryDate && (
                        <p className="truncate">
                          <span className="font-medium text-stone-700">Fecha:</span>{' '}
                          {item.personalization.deliveryDate}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-stone-200 rounded-md bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold tabular-nums text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Calculations */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-stone-100 bg-stone-50/50 space-y-4">
            {/* Coupon input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      Cupón <strong>{appliedCoupon.code}</strong> aplicado
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-500 hover:text-rose-600 text-[11px] underline cursor-pointer"
                  >
                    Quitar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Código de cupón (Ej: EDITH10)"
                    className="flex-1 px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs uppercase focus:outline-hidden focus:border-rose-400"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white text-xs font-medium rounded-lg cursor-pointer transition-colors"
                  >
                    Aplicar
                  </button>
                </form>
              )}
              {couponFeedback && (
                <p
                  className={`text-[11px] mt-1 ${
                    couponFeedback.success ? 'text-emerald-700' : 'text-rose-600'
                  }`}
                >
                  {couponFeedback.text}
                </p>
              )}
            </div>

            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900 tabular-nums">
                  S/ {subtotal.toFixed(2)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Descuento aplicado</span>
                  <span className="font-semibold tabular-nums">
                    -S/ {discountAmount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Envío estimado (Ácora y alrededores)</span>
                <span className="font-medium text-stone-900 tabular-nums">
                  {deliveryFee === 0 ? 'Gratis' : `S/ ${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline text-sm">
                <span className="font-bold text-stone-900">Total</span>
                <span className="font-bold text-lg text-rose-800 tabular-nums">
                  S/ {total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2">
              <button
                onClick={handleCheckoutClick}
                className="w-full flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white py-3 px-4 rounded-xl text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <span>Proceder al Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Pedir todo por WhatsApp ({STORE_CONFIG.whatsappDisplay})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
