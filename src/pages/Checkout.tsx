import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { STORE_CONFIG, buildWhatsAppLink } from '../config/storeConfig';
import { CustomerOrderInfo } from '../types';
import {
  ShieldCheck,
  Truck,
  Store,
  CreditCard,
  QrCode,
  Building,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Phone,
  Gift,
  Copy,
  Check,
} from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, subtotal, discountAmount, deliveryFee, total, appliedCoupon, clearCart, deliveryMethod, setDeliveryMethod } = useCart();
  const { navigateTo } = useNavigation();

  // Form state
  const [formData, setFormData] = useState<CustomerOrderInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    department: 'Puno',
    province: 'Puno',
    district: 'Ácora',
    address: '',
    reference: '',
    deliveryMethod: deliveryMethod,
    deliveryDate: '',
    deliveryTimeSlot: 'Mañana (9:00 AM - 12:00 PM)',
    paymentMethod: 'yape',
    orderNotes: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  // Sync deliveryMethod with cart context
  const handleDeliveryMethodChange = (method: 'delivery' | 'pickup') => {
    setDeliveryMethod(method);
    setFormData((prev) => ({ ...prev, deliveryMethod: method }));
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedAccount(label);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.firstName.trim()) errs.firstName = 'Por favor ingresa tu nombre.';
    if (!formData.lastName.trim()) errs.lastName = 'Por favor ingresa tus apellidos.';
    if (!formData.phone.trim() || formData.phone.length < 9) {
      errs.phone = 'Ingresa un teléfono válido de 9 dígitos.';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Ingresa un correo electrónico válido.';
    }
    if (formData.deliveryMethod === 'delivery' && !formData.address.trim()) {
      errs.address = 'Ingresa la dirección exacta de entrega.';
    }
    if (!formData.deliveryDate) {
      errs.deliveryDate = 'Selecciona la fecha para la entrega o recojo.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    if (cart.length === 0) {
      alert('Tu carrito está vacío. Agrega productos antes de continuar.');
      return;
    }

    // Generate simulated order receipt
    const orderNumber = `ES-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderNumber,
      date: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' }),
      customer: formData,
      items: [...cart],
      subtotal,
      discount: discountAmount,
      deliveryFee,
      total,
      paymentMethod: formData.paymentMethod,
    };

    setOrderConfirmed(newOrder);
    clearCart();
  };

  const handleSendOrderWhatsApp = () => {
    if (!orderConfirmed) return;
    let msg = `*¡Hola Edith Sandra! Acabo de registrar el pedido #${orderConfirmed.orderNumber} en su tienda web:*\n\n`;
    msg += `👤 *Cliente:* ${orderConfirmed.customer.firstName} ${orderConfirmed.customer.lastName}\n`;
    msg += `📱 *Teléfono:* ${orderConfirmed.customer.phone}\n`;
    msg += `📍 *Modalidad:* ${orderConfirmed.customer.deliveryMethod === 'delivery' ? 'Envío a Domicilio' : 'Recojo en Tienda Ácora'}\n`;
    if (orderConfirmed.customer.deliveryMethod === 'delivery') {
      msg += `   Dirección: ${orderConfirmed.customer.address} (${orderConfirmed.customer.district}, ${orderConfirmed.customer.province})\n`;
      if (orderConfirmed.customer.reference) {
        msg += `   Referencia: ${orderConfirmed.customer.reference}\n`;
      }
    }
    msg += `📅 *Fecha requerida:* ${orderConfirmed.customer.deliveryDate} (${orderConfirmed.customer.deliveryTimeSlot})\n`;
    msg += `💳 *Método de pago:* ${orderConfirmed.paymentMethod.toUpperCase()}\n\n`;
    msg += `*Detalle de regalos:*\n`;
    orderConfirmed.items.forEach((item: any, idx: number) => {
      msg += `• ${item.quantity}x ${item.product.name} (S/ ${(item.product.price * item.quantity).toFixed(2)})\n`;
      if (item.personalization?.recipientName) {
        msg += `   Para: ${item.personalization.recipientName}\n`;
      }
      if (item.personalization?.specialMessage) {
        msg += `   Dedicatoria: "${item.personalization.specialMessage}"\n`;
      }
    });
    msg += `\n*TOTAL A PAGAR: S/ ${orderConfirmed.total.toFixed(2)}*\n\n`;
    msg += `Adjunto mi comprobante o consulto disponibilidad para coordinar la entrega. ¡Muchas gracias!`;

    window.open(buildWhatsAppLink(msg), '_blank');
  };

  // If order was submitted, display confirmation view
  if (orderConfirmed) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-10 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              ¡Pedido Registrado con Éxito!
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Gracias, {orderConfirmed.customer.firstName}
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Tu orden <strong className="text-stone-900 font-mono">#{orderConfirmed.orderNumber}</strong> ha sido recibida y está siendo procesada en nuestro taller en Ácora.
            </p>
          </div>

          {/* Receipt Card */}
          <div className="bg-stone-50 rounded-2xl p-5 text-left border border-stone-200 text-xs space-y-3">
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500">Fecha del pedido:</span>
              <span className="font-medium text-stone-800">{orderConfirmed.date}</span>
            </div>
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500">Entrega programada:</span>
              <span className="font-medium text-stone-800">
                {orderConfirmed.customer.deliveryDate} ({orderConfirmed.customer.deliveryTimeSlot})
              </span>
            </div>
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500">Destino:</span>
              <span className="font-medium text-stone-800">
                {orderConfirmed.customer.deliveryMethod === 'delivery'
                  ? `${orderConfirmed.customer.address}, ${orderConfirmed.customer.district}`
                  : 'Recojo en Tienda (Ácora Centro)'}
              </span>
            </div>
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500">Método de pago:</span>
              <span className="font-bold text-rose-800 uppercase">
                {orderConfirmed.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-bold">
              <span>Total a pagar:</span>
              <span className="text-rose-800 tabular-nums">
                S/ {orderConfirmed.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* WhatsApp confirmation CTA */}
          <div className="space-y-3">
            <button
              onClick={handleSendOrderWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl text-sm shadow-md transition-all cursor-pointer"
            >
              <Phone className="w-5 h-5" />
              <span>Enviar constancia por WhatsApp a Edith Sandra</span>
            </button>

            <button
              onClick={() => navigateTo('tienda')}
              className="text-xs text-stone-500 hover:text-stone-800 font-semibold underline cursor-pointer"
            >
              Volver a la tienda
            </button>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-left text-[11px] text-amber-800">
            <strong>Nota del sistema:</strong> Esta tienda web cuenta con simulación interactiva completa de compra en frontend. En producción, se enlazará a tu API o base de datos.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 flex items-center gap-2">
        <button
          onClick={() => navigateTo('carrito')}
          className="text-stone-500 hover:text-rose-700 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al carrito</span>
        </button>
      </div>

      <div className="mb-6">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Finalizar Compra
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Completa tus datos para coordinar el empaque especial y la entrega de tus regalos en Ácora y Puno.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Customer & Delivery Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Información del Cliente */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-4">
              <h2 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-3">
                1. Información del Cliente
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nombre *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Ej: Edith"
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:border-rose-400 focus:outline-hidden"
                  />
                  {errors.firstName && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Apellidos *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Ej: Sandra Ramos"
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:border-rose-400 focus:outline-hidden"
                  />
                  {errors.lastName && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ej: 998 509 848"
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:border-rose-400 focus:outline-hidden"
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ejemplo@correo.com"
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:border-rose-400 focus:outline-hidden"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Método de Entrega & Dirección */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-4">
              <h2 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-3">
                2. Método y Lugar de Entrega
              </h2>

              {/* Delivery method toggle */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleDeliveryMethodChange('delivery')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    formData.deliveryMethod === 'delivery'
                      ? 'border-rose-600 bg-rose-50/60 text-rose-900 shadow-2xs'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <Truck className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-xs">Envío a Domicilio</span>
                    <span className="text-[11px] text-stone-500">Ácora y localidades</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleDeliveryMethodChange('pickup')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    formData.deliveryMethod === 'pickup'
                      ? 'border-rose-600 bg-rose-50/60 text-rose-900 shadow-2xs'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <Store className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-xs">Recojo en Tienda</span>
                    <span className="text-[11px] text-stone-500">Gratis · Ácora Centro</span>
                  </div>
                </button>
              </div>

              {formData.deliveryMethod === 'delivery' ? (
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Departamento
                      </label>
                      <input
                        type="text"
                        disabled
                        value={formData.department}
                        className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-xs text-stone-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Provincia
                      </label>
                      <input
                        type="text"
                        disabled
                        value={formData.province}
                        className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-xs text-stone-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Distrito
                      </label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:border-rose-400"
                      >
                        <option value="Ácora">Ácora</option>
                        <option value="Ilave">Ilave</option>
                        <option value="Chucuito">Chucuito</option>
                        <option value="Puno">Puno Ciudad</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Dirección exacta *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Calle, avenida, jirón o comunidad y número"
                      className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:border-rose-400 focus:outline-hidden"
                    />
                    {errors.address && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Referencia de entrega
                    </label>
                    <input
                      type="text"
                      value={formData.reference}
                      onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                      placeholder="Frente a la posta médica, portón verde, etc."
                      className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:border-rose-400 focus:outline-hidden"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                  <p className="font-semibold text-stone-900">Punto de recojo en Ácora:</p>
                  <p>{STORE_CONFIG.address}</p>
                  <p className="text-[11px] text-stone-400">{STORE_CONFIG.businessHours.weekdays}</p>
                </div>
              )}

              {/* Delivery Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-stone-100">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Fecha de entrega deseada *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:border-rose-400 focus:outline-hidden cursor-pointer"
                  />
                  {errors.deliveryDate && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.deliveryDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Horario preferido
                  </label>
                  <select
                    value={formData.deliveryTimeSlot}
                    onChange={(e) => setFormData({ ...formData, deliveryTimeSlot: e.target.value })}
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:border-rose-400 cursor-pointer"
                  >
                    <option value="Mañana (9:00 AM - 12:00 PM)">Mañana (9:00 AM - 12:00 PM)</option>
                    <option value="Tarde (12:00 PM - 3:00 PM)">Tarde (12:00 PM - 3:00 PM)</option>
                    <option value="Tarde/Noche (3:00 PM - 6:00 PM)">Tarde/Noche (3:00 PM - 6:00 PM)</option>
                    <option value="Desayuno temprano (7:30 AM - 8:30 AM)">Desayuno temprano (7:30 AM - 8:30 AM)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Método de Pago */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-4">
              <h2 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-3">
                3. Método de Pago
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'yape', label: 'Yape', icon: QrCode, highlight: 'text-purple-600' },
                  { id: 'plin', label: 'Plin', icon: QrCode, highlight: 'text-sky-600' },
                  { id: 'transfer', label: 'Transferencia BCP', icon: Building, highlight: 'text-amber-600' },
                  { id: 'cash_on_delivery', label: 'Contra Entrega', icon: Truck, highlight: 'text-emerald-600' },
                  { id: 'card', label: 'Tarjeta Crédito/Débito', icon: CreditCard, highlight: 'text-rose-600' },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = formData.paymentMethod === m.id;
                  return (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setFormData({ ...formData, paymentMethod: m.id as any })}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-rose-600 bg-rose-50/70 text-rose-950 font-bold shadow-2xs'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-2 ${m.highlight}`} />
                      <span className="text-xs">{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Instructions per payment method */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-2">
                {formData.paymentMethod === 'yape' && (
                  <div>
                    <p className="font-bold text-purple-900 mb-1">Paga fácil con Yape:</p>
                    <p>Número de Yape oficial: <strong>{STORE_CONFIG.paymentDetails.yape.number}</strong> (Titular: {STORE_CONFIG.paymentDetails.yape.holder})</p>
                    <button
                      type="button"
                      onClick={() => handleCopy(STORE_CONFIG.paymentDetails.yape.number, 'yape')}
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-stone-200 rounded-md text-[11px] font-semibold text-stone-700 hover:bg-stone-100 cursor-pointer"
                    >
                      {copiedAccount === 'yape' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedAccount === 'yape' ? '¡Número copiado!' : 'Copiar número de Yape'}</span>
                    </button>
                  </div>
                )}

                {formData.paymentMethod === 'plin' && (
                  <div>
                    <p className="font-bold text-sky-900 mb-1">Paga vía Plin:</p>
                    <p>Número Plin: <strong>{STORE_CONFIG.paymentDetails.plin.number}</strong> ({STORE_CONFIG.paymentDetails.plin.holder})</p>
                  </div>
                )}

                {formData.paymentMethod === 'transfer' && (
                  <div className="space-y-1">
                    <p className="font-bold text-amber-900">Cuentas Bancarias BCP & Interbank:</p>
                    <p>BCP Soles: <strong>{STORE_CONFIG.paymentDetails.bcp.accountNumber}</strong></p>
                    <p>CCI: {STORE_CONFIG.paymentDetails.bcp.cci}</p>
                    <p className="text-[11px] text-stone-500">Titular: {STORE_CONFIG.paymentDetails.bcp.holder}</p>
                  </div>
                )}

                {formData.paymentMethod === 'cash_on_delivery' && (
                  <div>
                    <p className="font-bold text-emerald-900 mb-1">Pago contra entrega:</p>
                    <p>Pagas en efectivo o Yape al momento de recibir tu pedido en Ácora centro.</p>
                  </div>
                )}

                {formData.paymentMethod === 'card' && (
                  <div className="space-y-2">
                    <p className="font-bold text-rose-900">Tarjeta de Crédito o Débito (Simulador seguro):</p>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="Número de tarjeta (simulado)"
                        maxLength={19}
                        defaultValue="4557 •••• •••• 1284"
                        className="px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs"
                      />
                      <input
                        type="text"
                        placeholder="MM/AA"
                        maxLength={5}
                        defaultValue="08/29"
                        className="px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs"
                      />
                    </div>
                    <p className="text-[10px] text-stone-400">
                      * PENDIENTE DE CONEXIÓN AL BACKEND: Pasarela de pagos con tokenización SSL para producción.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-4 sticky top-24">
              <h3 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center justify-between">
                <span>Resumen del Pedido</span>
                <span className="text-xs font-normal text-stone-500">
                  {cart.length} {cart.length === 1 ? 'producto' : 'productos'}
                </span>
              </h3>

              {/* Items preview */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-stone-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-stone-500 text-[11px]">
                        Cant: {item.quantity} · S/ {(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      {item.personalization?.recipientName && (
                        <p className="text-[10px] text-rose-700 truncate">
                          Para: {item.personalization.recipientName}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Numbers breakdown */}
              <div className="space-y-2 pt-3 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    S/ {subtotal.toFixed(2)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Descuento ({appliedCoupon?.code})</span>
                    <span className="font-bold tabular-nums">
                      -S/ {discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Envío ({formData.deliveryMethod === 'delivery' ? 'Domicilio' : 'Recojo'})</span>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    {deliveryFee === 0 ? 'Gratis' : `S/ ${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-stone-900">Total a pagar</span>
                  <span className="text-xl font-bold text-rose-800 tabular-nums">
                    S/ {total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirmar y Realizar Pedido</span>
              </button>

              <p className="text-[11px] text-stone-400 text-center leading-relaxed">
                Al confirmar, se generará tu hoja de pedido y podrás coordinar los detalles finales por WhatsApp con Edith Sandra.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
