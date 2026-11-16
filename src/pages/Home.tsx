import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { CATEGORIES, PRODUCTS, TESTIMONIALS } from '../data/products';
import { STORE_CONFIG } from '../config/storeConfig';
import { ProductCard } from '../components/ProductCard';
import {
  Gift,
  Truck,
  HeartHandshake,
  ShieldCheck,
  ArrowRight,
  Clock,
  Sparkles,
  Instagram,
  Mail,
  Check,
  Star,
  ExternalLink,
} from 'lucide-react';

export const Home: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Countdown timer for special offer section (simulating 8 hours 42 mins)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 6);
  const offerProducts = PRODUCTS.filter((p) => p.isOffer).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Principal */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 via-stone-50/40 to-transparent pt-8 sm:pt-14 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>Tienda de regalos & florería boutique en Ácora</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15] text-balance">
                Regalos que convierten <span className="text-rose-700 italic font-serif">momentos</span> en recuerdos
              </h1>

              <p className="text-stone-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
                {STORE_CONFIG.subtagline} Arreglos florales frescos, cajas sorpresa personalizadas y detalles exclusivos preparados con dedicación.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => navigateTo('tienda')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Ver regalos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateTo('personalizados')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-rose-50 text-stone-800 border border-stone-200 hover:border-rose-300 font-semibold text-sm px-7 py-3.5 rounded-full transition-all cursor-pointer shadow-2xs"
                >
                  <Gift className="w-4 h-4 text-rose-600" />
                  <span>Personalizar mi regalo</span>
                </button>
              </div>

              {/* Trust markers */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-stone-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Envíos puntuales a domicilio</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Dedicatorias caligrafiadas</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-stone-100">
                <img
                  src="/src/assets/images/hero_gift_box_flowers_1792431741285.jpg"
                  alt="Caja de regalo con flores y chocolates Edith Sandra"
                  referrerPolicy="no-referrer"
                  className="w-full h-full aspect-4/3 object-cover hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs uppercase tracking-widest font-semibold text-rose-200">
                    Colección Romance & Celebración
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold">
                    Box Amor Eterno & Flores Frescas
                  </h3>
                  <p className="text-xs text-stone-200 mt-1">
                    Preparado a mano en nuestro taller de Ácora
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Por Qué Elegirnos (4 Bloques) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/70 shadow-2xs hover:border-rose-200 transition-all">
            <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700 mb-4">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900 mb-1.5">
              Regalos únicos
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Productos cuidadosamente seleccionados con materiales duraderos y presentaciones elegantes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/70 shadow-2xs hover:border-rose-200 transition-all">
            <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700 mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900 mb-1.5">
              Entrega rápida
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Entregamos tus regalos de forma segura y puntual en Ácora y localidades de Puno.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/70 shadow-2xs hover:border-rose-200 transition-all">
            <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700 mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900 mb-1.5">
              Atención personalizada
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Te ayudamos a elegir el regalo perfecto por WhatsApp con fotos y sugerencias directas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/70 shadow-2xs hover:border-rose-200 transition-all">
            <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900 mb-1.5">
              Compra segura
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Protegemos tus datos y ofrecemos opciones de pago transparentes: Yape, Plin o contra entrega.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Categorías: "Encuentra el regalo perfecto" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Encuentra el regalo perfecto
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Explora detalles pensados para cada celebración y persona especial.
            </p>
          </div>
          <button
            onClick={() => navigateTo('categorias')}
            className="text-xs font-semibold text-rose-700 hover:text-rose-900 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Ver todas las categorías</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('tienda', { category: cat.name })}
              className="group relative bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-2xs hover:shadow-md hover:border-rose-300 transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="aspect-4/3 w-full bg-stone-100 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-stone-900 group-hover:text-rose-800 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                    {cat.description}
                  </p>
                </div>
                <div className="pt-2 mt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-rose-700 font-semibold">
                  <span>Ver colección</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Productos Destacados: "Nuestros favoritos" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Nuestros favoritos
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Los regalos más elegidos por nuestros clientes para emocionar.
            </p>
          </div>
          <button
            onClick={() => navigateTo('tienda')}
            className="text-xs font-semibold text-rose-700 hover:text-rose-900 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Banner Promocional: Ofertas Especiales con Temporizador */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 text-rose-300 text-xs font-semibold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Ofertas Especiales
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-balance">
                Hasta un 20% OFF en detalles de temporada
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-md">
                Aprovecha nuestros precios de promoción en arreglos seleccionados. Solo por tiempo limitado.
              </p>

              {/* Timer */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
                <div className="bg-white/10 backdrop-blur-md rounded-xl px-3.5 py-2 text-center border border-white/10">
                  <span className="text-lg sm:text-xl font-bold tabular-nums">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] text-stone-300 uppercase tracking-wider">Horas</span>
                </div>
                <span className="text-xl font-bold text-rose-400">:</span>
                <div className="bg-white/10 backdrop-blur-md rounded-xl px-3.5 py-2 text-center border border-white/10">
                  <span className="text-lg sm:text-xl font-bold tabular-nums">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] text-stone-300 uppercase tracking-wider">Min</span>
                </div>
                <span className="text-xl font-bold text-rose-400">:</span>
                <div className="bg-white/10 backdrop-blur-md rounded-xl px-3.5 py-2 text-center border border-white/10">
                  <span className="text-lg sm:text-xl font-bold tabular-nums">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] text-stone-300 uppercase tracking-wider">Seg</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo('ofertas')}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs px-6 py-3 rounded-full shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Explorar todas las promociones</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Offer Mini Cards */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {offerProducts.slice(0, 2).map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigateTo('producto', { productId: p.id })}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 hover:bg-white/15 transition-all cursor-pointer group"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full aspect-square object-cover rounded-xl mb-2.5 group-hover:scale-102 transition-transform"
                  />
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-white truncate">
                    {p.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs sm:text-sm font-bold text-rose-300 tabular-nums">
                      S/ {p.price.toFixed(2)}
                    </span>
                    {p.oldPrice && (
                      <span className="text-[11px] text-stone-400 line-through tabular-nums">
                        S/ {p.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Sección de Personalización Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-rose-50/70 border border-rose-200/80 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="text-xs uppercase tracking-widest font-bold text-rose-700">
              Detalles a medida
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Haz que tu regalo sea único e irrepetible
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Elige el nombre, dedicatoria especial, fotografía o diseño de la tarjeta. En nuestro taller artesanal personalizamos tazas, cajas de madera, globos y arreglos para que tu detalle transmita exactamente lo que sientes.
            </p>
          </div>
          <button
            onClick={() => navigateTo('personalizados')}
            className="bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-md transition-all cursor-pointer shrink-0 inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Crear mi regalo personalizado</span>
          </button>
        </div>
      </section>

      {/* 7. Testimonios: "Lo que dicen nuestros clientes" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-wider font-semibold text-rose-700">
            Confianza & Experiencias
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Historias reales de personas que compartieron alegría y sonrisas con nosotros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed italic mb-4">
                  "{t.comment}"
                </p>
              </div>
              <div className="pt-3 border-t border-stone-100">
                <h4 className="font-semibold text-xs text-stone-900">{t.name}</h4>
                <div className="flex items-center justify-between text-[11px] text-stone-400 mt-0.5">
                  <span>{t.location}</span>
                  <span>{t.occasion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-center text-stone-400 mt-4">
          * Testimonios representativos de clientes de demostración en Ácora y Puno.
        </p>
      </section>

      {/* 8. Instagram Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <Instagram className="w-5 h-5 text-rose-700" />
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Síguenos en Instagram
              </h2>
              <p className="text-xs text-stone-500">
                Inspírate con nuestras entregas diarias y nuevos arreglos
              </p>
            </div>
          </div>
          <a
            href={STORE_CONFIG.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-rose-700 hover:text-rose-900 inline-flex items-center gap-1.5"
          >
            <span>Visitar Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            '/src/assets/images/category_flowers_roses_1792431741978.jpg',
            '/src/assets/images/category_box_amor_1792431743590.jpg',
            '/src/assets/images/category_breakfast_tray_1792431743650.jpg',
            '/src/assets/images/product_teddy_bear_1792431762467.jpg',
          ].map((src, idx) => (
            <a
              key={idx}
              href={STORE_CONFIG.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-2xs cursor-pointer"
            >
              <img
                src={src}
                alt="Foto de detalle en Instagram"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-rose-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Instagram className="w-6 h-6" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 9. Newsletter: "Recibe ideas y promociones" */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <div className="w-12 h-12 bg-stone-800 rounded-full flex items-center justify-center text-rose-400 mx-auto">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Recibe ideas y promociones exclusivas
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto">
            Suscríbete y recibe novedades, promociones y nuevas ideas para regalar en fechas especiales.
          </p>

          {newsletterSubscribed ? (
            <div className="inline-flex items-center gap-2 bg-emerald-900/60 border border-emerald-500/50 text-emerald-200 px-6 py-3 rounded-full text-xs font-semibold animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>¡Gracias por suscribirte! Te enviaremos novedades con cariño.</span>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 bg-stone-800 border border-stone-700 rounded-full text-xs text-white placeholder-stone-400 focus:outline-hidden focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
              />
              <button
                type="submit"
                className="bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs px-6 py-3 rounded-full transition-all cursor-pointer shadow-xs shrink-0"
              >
                Suscribirme
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
