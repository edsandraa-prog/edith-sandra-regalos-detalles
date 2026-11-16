import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { STORE_CONFIG } from '../config/storeConfig';
import {
  Gift,
  MapPin,
  Phone,
  Mail,
  Heart,
  Instagram,
  Facebook,
  MessageCircle,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-rose-600 flex items-center justify-center text-white">
                <Gift className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                Edith Sandra
              </span>
            </div>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Regalos y detalles diseñados con amor para convertir momentos en recuerdos inolvidables. Especialistas en cajas personalizadas, ramos florales y sorpresas en Ácora y el altiplano de Puno.
            </p>

            <div className="pt-2">
              <h5 className="text-xs uppercase tracking-wider font-semibold text-rose-300 mb-2.5">
                Síguenos en redes sociales
              </h5>
              <div className="flex items-center gap-3">
                <a
                  href={STORE_CONFIG.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-stone-800 hover:bg-rose-600 hover:text-white flex items-center justify-center text-stone-400 transition-colors"
                  aria-label="Instagram de Edith Sandra"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={STORE_CONFIG.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-stone-800 hover:bg-blue-600 hover:text-white flex items-center justify-center text-stone-400 transition-colors"
                  aria-label="Facebook de Edith Sandra"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={STORE_CONFIG.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 hover:text-white flex items-center justify-center text-stone-400 transition-colors"
                  aria-label="TikTok de Edith Sandra"
                >
                  <span className="font-bold text-xs">TT</span>
                </a>
                <a
                  href={STORE_CONFIG.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-stone-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-stone-400 transition-colors"
                  aria-label="WhatsApp de Edith Sandra"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Tienda Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider mb-4">
              Tienda
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('inicio')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('tienda')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Catálogo Completo
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('categorias')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Categorías
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('ofertas')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Ofertas Especiales
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('personalizados')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Regalos Personalizados
                </button>
              </li>
            </ul>
          </div>

          {/* Ayuda & Empresa */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider mb-4">
              Ayuda & Empresa
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('faq')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Preguntas Frecuentes
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('nosotros')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Sobre Nosotros
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('blog')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Blog & Consejos
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contacto')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Contacto Directo
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('politicas')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('terminos')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Términos y Condiciones
                </button>
              </li>
            </ul>
          </div>

          {/* Contacto Oficial */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider mb-4">
              Contacto
            </h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {STORE_CONFIG.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                <a
                  href={`mailto:${STORE_CONFIG.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {STORE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment icons */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Edith Sandra – Regalos & Detalles. Todos los derechos reservados.</p>
          <div className="flex items-center gap-3 text-stone-400">
            <span className="text-[11px] font-medium text-stone-500">Pagos Seguros:</span>
            <span className="px-2 py-0.5 bg-stone-800 rounded font-bold text-[10px] text-purple-300">
              YAPE
            </span>
            <span className="px-2 py-0.5 bg-stone-800 rounded font-bold text-[10px] text-sky-300">
              PLIN
            </span>
            <span className="px-2 py-0.5 bg-stone-800 rounded font-bold text-[10px] text-amber-300">
              BCP
            </span>
            <span className="px-2 py-0.5 bg-stone-800 rounded font-bold text-[10px] text-emerald-300">
              INTERBANK
            </span>
            <span className="px-2 py-0.5 bg-stone-800 rounded font-bold text-[10px] text-stone-300">
              CONTRA ENTREGA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
