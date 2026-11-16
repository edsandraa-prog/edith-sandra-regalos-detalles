import React from 'react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { useNavigation } from '../context/NavigationContext';
import { ArrowRight, Gift } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Nuestras Categorías de Regalos
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Encuentra el detalle perfecto clasificado según la ocasión, temática y tipo de detalle.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {CATEGORIES.map((cat) => {
          const categoryProducts = PRODUCTS.filter((p) =>
            p.category.toLowerCase().includes(cat.name.toLowerCase())
          );
          return (
            <div
              key={cat.id}
              onClick={() => navigateTo('tienda', { category: cat.name })}
              className="group bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-2xs hover:shadow-lg hover:border-rose-300 transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="aspect-4/3 w-full bg-stone-100 overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-stone-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {cat.itemCount} modelos
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 group-hover:text-rose-800 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed mt-1.5">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-rose-700">
                  <span>Explorar categoría</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
