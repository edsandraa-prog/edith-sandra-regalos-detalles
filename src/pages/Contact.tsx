import React, { useState } from 'react';
import { STORE_CONFIG, buildWhatsAppLink } from '../config/storeConfig';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    let msg = `Hola Edith Sandra, me gustaría realizar una consulta sobre sus regalos:`;
    if (formData.name) msg += `\nMi nombre: ${formData.name}`;
    if (formData.subject) msg += `\nAsunto: ${formData.subject}`;
    if (formData.message) msg += `\nMensaje: ${formData.message}`;
    window.open(buildWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Contáctanos
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Estamos listos para ayudarte a preparar la sorpresa perfecta en Ácora y localidades de Puno.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-2xs space-y-6">
            <h2 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
              Información de la Tienda
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-stone-600">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 text-xs">Ubicación</h4>
                  <p className="text-stone-500 text-xs mt-0.5">{STORE_CONFIG.address}</p>
                  <p className="text-[11px] text-rose-700 font-medium">Ácora, Puno, Perú</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700 shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 text-xs">Teléfono / WhatsApp</h4>
                  <p className="text-stone-500 text-xs mt-0.5">{STORE_CONFIG.whatsappDisplay}</p>
                  <a
                    href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-emerald-700 font-semibold hover:underline inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>Escribir por WhatsApp ahora</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700 shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 text-xs">Correo Electrónico</h4>
                  <p className="text-stone-500 text-xs mt-0.5 break-all">{STORE_CONFIG.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700 shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 text-xs">Horarios de Atención</h4>
                  <p className="text-stone-500 text-xs mt-0.5">{STORE_CONFIG.businessHours.weekdays}</p>
                  <p className="text-[11px] text-stone-400">{STORE_CONFIG.businessHours.deliveryHours}</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action */}
            <div className="pt-2">
              <button
                onClick={handleWhatsAppDirect}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar directamente por WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-2xs">
          <h2 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 mb-6">
            Envíanos un Mensaje
          </h2>

          {submitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                ¡Mensaje recibido con éxito!
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
                Gracias por escribirnos. Nuestro equipo en Ácora se comunicará contigo a la brevedad posible.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-semibold text-rose-700 hover:text-rose-900 underline cursor-pointer"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Tu Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej: Lucía Mamani"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:border-rose-400 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ej: 998 509 848"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:border-rose-400 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:border-rose-400 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Motivo de la consulta
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:border-rose-400"
                  >
                    <option value="Consulta sobre regalo">Consulta sobre regalo</option>
                    <option value="Pedido para evento corporativo">Pedido para evento corporativo</option>
                    <option value="Cotización arreglo personalizado">Cotización arreglo personalizado</option>
                    <option value="Horarios y cobertura de envíos">Horarios y cobertura de envíos</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Tu Mensaje *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Escribe aquí los detalles del regalo o tu consulta..."
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:border-rose-400 focus:outline-hidden resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Consulta</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
