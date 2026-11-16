import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG, buildWhatsAppLink } from '../config/storeConfig';
import {
  Sparkles,
  Upload,
  Heart,
  Calendar,
  Gift,
  Check,
  Phone,
  Image as ImageIcon,
  Palette,
  Send,
} from 'lucide-react';

export const CustomGifts: React.FC = () => {
  const { addToCart } = useCart();

  // Customization builder state
  const [baseType, setBaseType] = useState('Box Sorpresa con Peluche y Chocolates');
  const [recipientName, setRecipientName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [selectedColor, setSelectedColor] = useState('Rosa Romántico & Dorado');
  const [occasion, setOccasion] = useState('Amor & Aniversario');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [simulatedPhotoName, setSimulatedPhotoName] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [customSubmitted, setCustomSubmitted] = useState(false);

  const customizableProducts = PRODUCTS.filter((p) => p.customizable);

  const colors = [
    { name: 'Rosa Romántico & Dorado', hex: '#be185d', accent: '#fbcfe8' },
    { name: 'Blanco & Dorado Champagne', hex: '#c59b27', accent: '#fef3c7' },
    { name: 'Rojo Pasión & Terciopelo', hex: '#991b1b', accent: '#fecaca' },
    { name: 'Crema & Pastel Nude', hex: '#78350f', accent: '#fef3c7' },
    { name: 'Azul Noche & Plata', hex: '#1e3a8a', accent: '#dbeafe' },
  ];

  const occasions = [
    'Cumpleaños',
    'Amor & Aniversario',
    'San Valentín',
    'Graduación & Logro',
    'Baby Shower & Nacimiento',
    'Agradecimiento / Corporativo',
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSimulatedPhotoName(file.name);
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const handleWhatsAppCustomOrder = () => {
    let msg = `*¡Hola Edith Sandra! Deseo solicitar un Regalo Personalizado a medida:*\n\n`;
    msg += `🎁 *Tipo de detalle:* ${baseType}\n`;
    msg += `🎀 *Ocasión:* ${occasion}\n`;
    msg += `🎨 *Gama de color:* ${selectedColor}\n`;
    if (recipientName.trim()) {
      msg += `👤 *Nombre a personalizar:* ${recipientName.trim()}\n`;
    }
    if (customMessage.trim()) {
      msg += `💌 *Dedicatoria especial:* "${customMessage.trim()}"\n`;
    }
    if (simulatedPhotoName) {
      msg += `📸 *Foto personalizada:* Sí (tengo ${simulatedPhotoName} lista para enviar)\n`;
    }
    if (deliveryDate) {
      msg += `📅 *Fecha de entrega requerida:* ${deliveryDate}\n`;
    }
    msg += `\n¿Podrían enviarme cotización y opciones de diseño para Ácora? ¡Muchas gracias!`;

    window.open(buildWhatsAppLink(msg), '_blank');
  };

  const handleAddToCartCustom = () => {
    // Find base matching product
    const baseProduct = PRODUCTS.find((p) => p.id === 1) || PRODUCTS[0];
    addToCart(
      baseProduct,
      1,
      {
        recipientName: recipientName.trim() || 'Regalo personalizado a medida',
        specialMessage: customMessage.trim() || undefined,
        deliveryDate: deliveryDate || undefined,
        selectedColor,
      },
      true
    );
    setCustomSubmitted(true);
    setTimeout(() => setCustomSubmitted(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* 1. Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 text-rose-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Taller de personalización exclusiva</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
          Haz que tu regalo sea único
        </h1>
        <p className="text-stone-500 text-xs sm:text-base leading-relaxed">
          Diseñamos cajas, arreglos florales, tazas y detalles impresos con tu toque personal. Elige cada detalle y nosotros lo convertimos en un recuerdo inolvidable.
        </p>
      </div>

      {/* 2. Interactive Customizer Studio */}
      <div className="bg-white rounded-3xl border border-rose-200/80 shadow-md p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-100 pb-3">
              Configura tu Detalle Especial
            </h2>

            {/* Base Product Type */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-2 uppercase tracking-wider">
                1. Selecciona el Tipo de Regalo Base
              </label>
              <select
                value={baseType}
                onChange={(e) => setBaseType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:border-rose-400"
              >
                <option value="Box Sorpresa con Peluche y Chocolates">Box Sorpresa con Peluche y Chocolates (S/ 79.90)</option>
                <option value="Taza Personalizada de Cerámica con Caja de Regalo">Taza Personalizada de Cerámica con Caja de Regalo (S/ 39.90)</option>
                <option value="Ramo de Rosas Selectas con Envoltorio de Lujo">Ramo de Rosas Selectas con Envoltorio de Lujo (S/ 89.90)</option>
                <option value="Bandeja de Desayuno Sorpresa Artesanal">Bandeja de Desayuno Sorpresa Artesanal (S/ 119.90)</option>
                <option value="Globo Burbuja Personalizado con Luces Led">Globo Burbuja Personalizado con Luces Led (S/ 54.90)</option>
                <option value="Placa de Acrílico con Grabado de Graduación">Placa de Acrílico con Grabado de Graduación (S/ 99.90)</option>
                <option value="Llavero Acrílico con Foto y Canción Spotify">Llavero Acrílico con Foto y Canción Spotify (S/ 24.90)</option>
              </select>
            </div>

            {/* Occasion Selection */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-2 uppercase tracking-wider">
                2. Ocasión Especial
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {occasions.map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setOccasion(occ)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all cursor-pointer border ${
                      occasion === occ
                        ? 'border-rose-600 bg-rose-50 text-rose-900 font-bold'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-2 uppercase tracking-wider">
                3. Paleta de Colores & Lazos
              </label>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all border cursor-pointer ${
                      selectedColor === c.name
                        ? 'border-rose-600 bg-rose-50 text-rose-900 font-bold'
                        : 'border-stone-200 text-stone-600'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Name & Dedication */}
            <div className="space-y-4 pt-2 border-t border-stone-100">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nombre de la persona homenajeada
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Ej: Lucía, Mi Amor, Papá, etc."
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Mensaje o dedicatoria para la tarjeta
                </label>
                <textarea
                  rows={3}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Escribe el texto que caligrafiaremos en la dedicatoria..."
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:border-rose-400 resize-none"
                />
              </div>
            </div>

            {/* Photo Upload (Simulated) */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                ¿Deseas incluir una fotografía impresa o grabada?
              </label>
              <label className="flex items-center justify-center gap-2 border-2 border-dashed border-stone-300 hover:border-rose-400 p-4 rounded-xl cursor-pointer bg-stone-50/50 hover:bg-rose-50/30 transition-colors">
                <Upload className="w-5 h-5 text-rose-600" />
                <span className="text-xs text-stone-600">
                  {simulatedPhotoName ? (
                    <strong className="text-rose-700">{simulatedPhotoName}</strong>
                  ) : (
                    'Haz clic para cargar tu foto (JPG, PNG)'
                  )}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Delivery Date */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Fecha deseada de entrega
              </label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:border-rose-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Real-Time Preview Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4 sticky top-24">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                Vista Previa de tu Detalle
              </span>

              {/* Simulated Card Artwork */}
              <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-sm space-y-3">
                <div className="aspect-4/3 rounded-xl overflow-hidden bg-stone-100 relative">
                  <img
                    src={
                      photoPreview ||
                      (baseType.includes('Taza')
                        ? '/src/assets/images/category_custom_mug_1792431742190.jpg'
                        : baseType.includes('Flores')
                        ? '/src/assets/images/category_flowers_roses_1792431741978.jpg'
                        : '/src/assets/images/category_box_amor_1792431743590.jpg')
                    }
                    alt="Preview de personalización"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded">
                    {occasion}
                  </div>
                </div>

                <div>
                  <h4 className="font-serif text-sm font-bold text-stone-900">
                    {baseType}
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Paleta: <strong>{selectedColor}</strong>
                  </p>
                </div>

                <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-xs space-y-1">
                  <p>
                    <span className="font-semibold text-stone-700">Para:</span>{' '}
                    {recipientName || 'Nombre por definir'}
                  </p>
                  <p className="italic text-stone-600 line-clamp-2">
                    "{customMessage || 'Tu mensaje emotivo aparecerá impreso aquí...'}"
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleWhatsAppCustomOrder}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Solicitar personalización por WhatsApp</span>
                </button>

                <button
                  onClick={handleAddToCartCustom}
                  className="w-full flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <Gift className="w-4 h-4" />
                  <span>{customSubmitted ? '¡Agregado al Carrito!' : 'Agregar diseño al Carrito'}</span>
                </button>
              </div>

              <p className="text-[11px] text-stone-400 text-center">
                Te enviaremos fotos del avance por WhatsApp para tu aprobación previa.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Catálogo de Artículos Personalizables */}
      <div>
        <div className="mb-6">
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Modelos Listos para Personalizar
          </h2>
          <p className="text-xs text-stone-500">
            Selecciona un modelo de nuestra colección para añadir tu nombre y dedicatoria.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {customizableProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
