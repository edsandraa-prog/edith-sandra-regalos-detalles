import React, { useState } from 'react';
import { STORE_CONFIG, buildWhatsAppLink } from '../config/storeConfig';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [bubbleOpen, setBubbleOpen] = useState(true);

  const defaultMessage = `Hola Edith Sandra, estoy navegando en su tienda y quisiera información sobre regalos y entregas en Ácora.`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
      {bubbleOpen && (
        <div className="bg-white rounded-2xl shadow-xl border border-rose-100 p-3 max-w-xs relative animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setBubbleOpen(false)}
            className="absolute top-1.5 right-1.5 text-stone-400 hover:text-stone-700 p-1"
            aria-label="Cerrar globo"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="text-xs font-semibold text-stone-900 pr-4">
            ¿Buscas un regalo para hoy? 🎁
          </p>
          <p className="text-[11px] text-stone-500 mt-0.5">
            Escríbenos directamente a WhatsApp y te ayudamos a personalizar tu detalle.
          </p>
          <a
            href={buildWhatsAppLink(defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 hover:underline"
          >
            <span>Iniciar chat ({STORE_CONFIG.whatsappDisplay})</span>
          </a>
        </div>
      )}

      <a
        href={buildWhatsAppLink(defaultMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-108 cursor-pointer group"
        aria-label="Contactar a Edith Sandra por WhatsApp"
        title="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};
