import React, { useState } from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { X, User, Phone, MapPin, Package, Check, HelpCircle } from 'lucide-react';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'help'>('profile');
  const [userName, setUserName] = useState('Cliente Amigo');
  const [userPhone, setUserPhone] = useState('');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl z-10 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-rose-700" />
            <h3 className="font-serif text-lg font-bold text-stone-900">Mi Cuenta & Pedidos</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-100 bg-stone-50/60 px-5 pt-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-rose-600 text-rose-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Mis Datos
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-rose-600 text-rose-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Seguimiento de Pedidos
          </button>
          <button
            onClick={() => setActiveTab('help')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'help'
                ? 'border-rose-600 text-rose-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Ayuda en Ácora
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <p className="text-xs text-stone-500">
                Tus datos se guardan de forma local para rellenar tus pedidos y facilitar tus compras por WhatsApp.
              </p>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Nombre y Apellidos</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:bg-white focus:border-rose-400 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Teléfono / WhatsApp</label>
                <input
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="Ej: 998 123 456"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:bg-white focus:border-rose-400 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Ubicación de entrega habitual</label>
                <input
                  type="text"
                  defaultValue="Ácora, Puno"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:bg-white focus:border-rose-400 focus:outline-hidden"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                {saved ? <Check className="w-4 h-4" /> : null}
                <span>{saved ? 'Datos guardados' : 'Guardar preferencias'}</span>
              </button>
            </form>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-3">
              <p className="text-xs text-stone-500">
                Historial de pedidos recientes realizados desde este dispositivo:
              </p>
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-900">Pedido Demo #ES-1042</span>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                    Entregado
                  </span>
                </div>
                <p className="text-xs text-stone-600">Box Amor Eterno + Taza Personalizada</p>
                <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-200/60">
                  <span>Entrega en Ácora Centro</span>
                  <span className="font-bold text-stone-700 tabular-nums">S/ 119.80</span>
                </div>
              </div>
              <p className="text-[11px] text-stone-400 text-center pt-2">
                * Para consultar el estado en tiempo real de cualquier pedido, escríbenos directamente a WhatsApp con tu nombre o comprobante.
              </p>
            </div>
          )}

          {activeTab === 'help' && (
            <div className="space-y-3 text-xs text-stone-600">
              <div className="p-3 bg-rose-50 rounded-lg border border-rose-100">
                <h5 className="font-semibold text-rose-900 mb-1">Atención personalizada en tienda</h5>
                <p className="text-rose-800 leading-relaxed">
                  Estamos ubicados en Ácora, Puno. Con gusto preparamos tus arreglos florales y regalos para sorprender a tus seres queridos.
                </p>
              </div>
              <div className="space-y-2 pt-2">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-rose-700" />
                  <span>WhatsApp directo: <strong>{STORE_CONFIG.whatsappDisplay}</strong></span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-700" />
                  <span>{STORE_CONFIG.address}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
