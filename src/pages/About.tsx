import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { STORE_CONFIG } from '../config/storeConfig';
import { Heart, Sparkles, MapPin, Award, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      {/* 1. Hero / Intro */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Nuestra Historia & Pasión</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
            Creamos detalles que transmiten lo que las palabras no alcanzan
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            En <strong>Edith Sandra – Regalos & Detalles</strong>, creemos que cada regalo encierra una emoción genuina: gratitud, amor, orgullo, o un cálido abrazo a la distancia. Nacimos en el corazón de <strong>Ácora, Puno</strong> con el propósito de acercar detalles elegantes, modernos y hechos a mano a las familias del altiplano y visitantes.
          </p>

          <p className="text-stone-600 text-sm leading-relaxed">
            Desde nuestros primeros arreglos florales hasta las elaboradas cajas sorpresa personalizadas con grabado y fotos, cada creación se prepara con esmero artesanal, utilizando materiales de primera calidad, flores frescas y dedicatorias caligrafiadas con devoción.
          </p>

          <div className="pt-2">
            <button
              onClick={() => navigateTo('tienda')}
              className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs px-6 py-3 rounded-full transition-all cursor-pointer shadow-md"
            >
              <span>Explorar nuestras creaciones</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="/src/assets/images/category_box_amor_1792431743590.jpg"
              alt="Taller de regalos Edith Sandra en Ácora"
              referrerPolicy="no-referrer"
              className="w-full aspect-4/3 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent flex items-end p-6 text-white">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-rose-300">
                  Taller Creativo
                </p>
                <h3 className="font-serif text-lg font-bold">Ácora, Región Puno</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Nuestros Valores */}
      <div className="bg-stone-50 rounded-3xl p-8 sm:p-12 border border-stone-200/80">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Nuestros Pilares
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Lo que nos impulsa a cuidar cada detalle en cada entrega.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/70 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-stone-900 text-base">Cariño & Dedicación</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              No hacemos regalos masivos. Cada lazo se ata a mano, cada flor se selecciona fresca y cada tarjeta lleva el mensaje exacto que deseas transmitir.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/70 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-stone-900 text-base">Calidad Premium</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Trabajamos con chocolates finos, peluches hipoalergénicos de tacto ultrasuave, papeles importados y globos de alta densidad para asegurar máxima duración.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/70 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-stone-900 text-base">Compromiso Local</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Conocemos las rutas y comunidades de Ácora e Ilave, asegurando que tus sorpresas lleguen a tiempo con entrega cuidadosa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
