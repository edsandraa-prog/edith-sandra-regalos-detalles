import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { STORE_CONFIG, buildWhatsAppLink } from '../config/storeConfig';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  Tag,
  ArrowLeft,
  Phone,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    deliveryFee,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const { navigateTo } = useNavigation();
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; text: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponMsg({ success: res.success, text: res.message });
    if (res.success) setCouponCode('');
  };

  const handleWhatsAppOrder = () => {
    let msg = `*¡Hola Edith Sandra! Deseo realizar el siguiente pedido:*\n\n`;
    cart.forEach((item, index) => {
      msg += `*${index + 1}. ${item.product.name}* (x${item.quantity}) - S/ ${(item.product.price * item.quantity).toFixed(2)}\n`;
      if (item.personalization?.recipientName) {
        msg += `   Para: ${item.personalization.recipientName}\n`;
      }
      if (item.personalization?.specialMessage) {
        msg += `   Dedicatoria: "${item.personalization.specialMessage}"\n`;
      }
    });
    msg += `\nSubtotal: S/ ${subtotal.toFixed(2)}\n`;
    if (discountAmount > 0) {
      msg += `Descuento: -S/ ${discountAmount.toFixed(2)}\n`;
    }
    msg += `*Total: S/ ${total.toFixed(2)}*\n\n¿Podrían indicarme los pasos para el pago? Gracias.`;
    window.open(buildWhatsAppLink(msg), '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Tu carrito de regalos está vacío
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
          Aún no has agregado detalles especiales. Explora nuestras flores, peluches y cajas sorpresa.
        </p>
        <button
          onClick={() => navigateTo('tienda')}
          className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs px-6 py-3 rounded-full transition-all cursor-pointer shadow-md"
        >
          <span>Ir a la tienda</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Carrito de Compras
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Revisa tus artículos y personalizaciones antes de proceder al pago.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-stone-400 hover:text-rose-600 underline cursor-pointer"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200/80 p-6 shadow-2xs space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b border-stone-100 last:border-0"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 rounded-xl object-cover bg-stone-100 shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-stone-900 truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-rose-700 font-semibold tabular-nums">
                    S/ {item.product.price.toFixed(2)} c/u
                  </p>
                  {item.personalization?.recipientName && (
                    <p className="text-[11px] text-stone-500 mt-1 truncate">
                      <span className="font-medium text-stone-700">Para:</span> {item.personalization.recipientName}
                    </p>
                  )}
                  {item.personalization?.specialMessage && (
                    <p className="text-[11px] text-stone-400 italic truncate max-w-xs">
                      "{item.personalization.specialMessage}"
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2.5 py-1 text-stone-500 hover:text-stone-900 cursor-pointer text-sm"
                  >
                    -
                  </button>
                  <span className="px-2 text-xs font-bold tabular-nums text-stone-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2.5 py-1 text-stone-500 hover:text-stone-900 cursor-pointer text-sm"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-sm font-bold text-stone-900 tabular-nums">
                    S/ {(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg cursor-pointer"
                  title="Eliminar artículo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-4 flex justify-between items-center text-xs">
            <button
              onClick={() => navigateTo('tienda')}
              className="inline-flex items-center gap-1.5 text-stone-600 hover:text-rose-700 font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continuar comprando</span>
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-stone-200/80 p-6 shadow-2xs space-y-4">
          <h2 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-3">
            Resumen del Carrito
          </h2>

          {/* Coupon */}
          <div>
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs">
                <span className="text-emerald-800 font-semibold">
                  Cupón: {appliedCoupon.code}
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-stone-500 hover:text-rose-600 underline text-[11px]"
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
                  placeholder="Cupón de descuento"
                  className="flex-1 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs uppercase"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-stone-800 text-white rounded-xl text-xs font-semibold hover:bg-stone-900"
                >
                  Aplicar
                </button>
              </form>
            )}
            {couponMsg && (
              <p className={`text-[11px] mt-1 ${couponMsg.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                {couponMsg.text}
              </p>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-900 tabular-nums">S/ {subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Descuento</span>
                <span className="font-bold tabular-nums">-S/ {discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Envío estándar (Ácora y zonas cercanas)</span>
              <span className="font-semibold text-stone-900 tabular-nums">
                {deliveryFee === 0 ? 'Gratis' : `S/ ${deliveryFee.toFixed(2)}`}
              </span>
            </div>
            <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline text-sm">
              <span className="font-bold text-stone-900">Total</span>
              <span className="font-bold text-xl text-rose-800 tabular-nums">
                S/ {total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => navigateTo('checkout')}
              className="w-full flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <span>Ir al Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Pedir por WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
