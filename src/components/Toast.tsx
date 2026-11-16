import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, setToastMessage, setIsCartOpen } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-stone-900 text-white px-4 py-3 rounded-lg shadow-xl border border-stone-800 transition-all transform animate-in fade-in slide-in-from-bottom-3 duration-200 max-w-sm">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      <span className="text-sm font-medium flex-1">{toastMessage}</span>
      <button
        onClick={() => setIsCartOpen(true)}
        className="text-xs font-semibold text-rose-300 hover:text-white underline cursor-pointer shrink-0"
      >
        Ver carrito
      </button>
      <button
        onClick={() => setToastMessage(null)}
        className="text-stone-400 hover:text-white ml-1 cursor-pointer"
        aria-label="Cerrar notificación"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
