import React, { useState } from 'react';
import { FAQS, PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { STORE_CONFIG } from '../config/storeConfig';
import { ChevronDown, ChevronUp, Shield, FileText, HelpCircle, Sparkles } from 'lucide-react';

interface LegalPageProps {
  type: 'faq' | 'politicas' | 'terminos' | 'ofertas';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (type === 'ofertas') {
    const offerProducts = PRODUCTS.filter((p) => p.isOffer);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Precios Especiales</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Ofertas y Promociones
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Detalles seleccionados con descuentos exclusivos por tiempo limitado en Ácora.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'faq') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Respuestas Claras</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Preguntas Frecuentes
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Todo lo que necesitas saber sobre pedidos, envíos en Ácora y personalizaciones.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200/80 shadow-2xs overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-stone-900 hover:text-rose-700 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-rose-700 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (type === 'politicas') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>Protección de Datos</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Políticas de Privacidad
          </h1>
          <p className="text-xs text-stone-400">Última actualización: Enero 2026</p>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-10 shadow-2xs prose prose-stone text-xs sm:text-sm leading-relaxed space-y-4">
          <h3 className="font-serif text-base font-bold text-stone-900">1. Compromiso de Privacidad</h3>
          <p>
            En <strong>{STORE_CONFIG.brandName}</strong> respetamos la privacidad y la confidencialidad de nuestros clientes en Ácora, Puno y todo el Perú. Esta política describe cómo recopilamos y resguardamos la información proporcionada al realizar consultas o compras.
          </p>

          <h3 className="font-serif text-base font-bold text-stone-900">2. Información que recopilamos</h3>
          <p>
            Para procesar tus pedidos y personalizar los regalos, solicitamos datos esenciales como tu nombre, número de teléfono/WhatsApp, correo electrónico, dirección de entrega y los nombres o dedicatorias para los agasajados.
          </p>

          <h3 className="font-serif text-base font-bold text-stone-900">3. Uso de la Información</h3>
          <p>
            Los datos proporcionados se emplean exclusivamente para:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Coordinar la entrega puntual y elaboración de los regalos.</li>
            <li>Brindar atención posventa y confirmación fotográfica por WhatsApp.</li>
            <li>Mejorar tu experiencia de compra personalizada.</li>
          </ul>

          <h3 className="font-serif text-base font-bold text-stone-900">4. No almacenamiento de datos de pago</h3>
          <p>
            No almacenamos números de tarjetas de crédito ni claves bancarias. Todas las operaciones se coordinan de forma segura a través de canales directos como Yape, Plin o transferencias bancarias oficiales.
          </p>
        </div>
      </div>
    );
  }

  // Términos y condiciones
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>Términos del Servicio</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Términos y Condiciones
        </h1>
        <p className="text-xs text-stone-400">Vigente para el año 2026</p>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-10 shadow-2xs text-xs sm:text-sm leading-relaxed space-y-4">
        <h3 className="font-serif text-base font-bold text-stone-900">1. Ámbito de Aplicación</h3>
        <p>
          Las presentes condiciones regulan la compra y entrega de regalos, flores, chocolates y detalles personalizados ofrecidos por <strong>{STORE_CONFIG.brandName}</strong> en el distrito de Ácora, departamento de Puno, Perú.
        </p>

        <h3 className="font-serif text-base font-bold text-stone-900">2. Pedidos y Confirmación</h3>
        <p>
          Un pedido se considera confirmado una vez validado el comprobante de pago o coordinada la modalidad de contra entrega con el cliente a través de nuestros canales oficiales.
        </p>

        <h3 className="font-serif text-base font-bold text-stone-900">3. Personalizaciones</h3>
        <p>
          Los nombres, textos y dedicatorias serán impresos o grabados tal como el cliente los ingrese en los formularios o WhatsApp. Recomendamos revisar con detenimiento la ortografía antes de enviar.
        </p>

        <h3 className="font-serif text-base font-bold text-stone-900">4. Entregas y Horarios</h3>
        <p>
          Las entregas a domicilio en Ácora y alrededores se realizan dentro del rango horario seleccionado por el cliente. En caso de ausencia del receptor, el equipo coordinará inmediatamente por vía telefónica.
        </p>
      </div>
    </div>
  );
};
