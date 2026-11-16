import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useNavigation } from '../context/NavigationContext';
import { Search, Filter, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';

export const Shop: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useNavigation();

  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory || 'Todos');
  const [sortBy, setSortBy] = useState<string>('recientes');
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [filterCustomizableOnly, setFilterCustomizableOnly] = useState(false);
  const [filterOffersOnly, setFilterOffersOnly] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync when selectedCategory from context changes
  React.useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const allCategoryNames = useMemo(() => {
    return ['Todos', ...CATEGORIES.map((c) => c.name)];
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Category
    if (activeCategory !== 'Todos') {
      result = result.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));
    }

    // Max Price
    result = result.filter((p) => p.price <= maxPrice);

    // Customizable filter
    if (filterCustomizableOnly) {
      result = result.filter((p) => p.customizable);
    }

    // Offers filter
    if (filterOffersOnly) {
      result = result.filter((p) => p.isOffer);
    }

    // Sorting
    switch (sortBy) {
      case 'precio-menor':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'precio-mayor':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'valorados':
        result.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      case 'vendidos':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'recientes':
      default:
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [searchQuery, activeCategory, maxPrice, filterCustomizableOnly, filterOffersOnly, sortBy]);

  const handleResetFilters = () => {
    setActiveCategory('Todos');
    setSelectedCategory(null);
    setSearchQuery('');
    setMaxPrice(200);
    setFilterCustomizableOnly(false);
    setFilterOffersOnly(false);
    setSortBy('recientes');
  };

  const hasActiveFilters =
    activeCategory !== 'Todos' ||
    searchQuery.trim() !== '' ||
    maxPrice < 200 ||
    filterCustomizableOnly ||
    filterOffersOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header & Title */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Tienda de Regalos & Detalles
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm mt-1">
          Explora nuestro catálogo completo de flores, peluches, cajas sorpresa y detalles únicos en Ácora.
        </p>
      </div>

      {/* Main Layout: Filters Sidebar (Desktop) + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-stone-200">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 text-xs font-semibold text-stone-800"
          >
            <SlidersHorizontal className="w-4 h-4 text-rose-700" />
            <span>Filtros y Búsqueda</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-rose-600" />
            )}
          </button>
          <span className="text-xs text-stone-500 tabular-nums">
            {filteredProducts.length} productos
          </span>
        </div>

        {/* Sidebar Filters */}
        <aside
          className={`lg:block ${
            showMobileFilters ? 'block' : 'hidden'
          } bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-6 self-start`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-rose-700" />
              <span>Filtros</span>
            </h3>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-700 hover:text-rose-900 font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Limpiar</span>
              </button>
            )}
          </div>

          {/* Search Box */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Buscar
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-hidden focus:border-rose-400 focus:bg-white"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Categories Filter */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Categoría
            </label>
            <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
              {allCategoryNames.map((catName) => {
                const count =
                  catName === 'Todos'
                    ? PRODUCTS.length
                    : PRODUCTS.filter((p) => p.category.toLowerCase().includes(catName.toLowerCase()))
                        .length;
                const isSelected = activeCategory === catName;
                return (
                  <button
                    key={catName}
                    onClick={() => {
                      setActiveCategory(catName);
                      setSelectedCategory(catName === 'Todos' ? null : catName);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-rose-50 text-rose-800 font-bold'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span className="truncate">{catName}</span>
                    <span className="text-[11px] text-stone-400 tabular-nums">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                Precio Máximo
              </label>
              <span className="text-xs font-bold text-rose-800 tabular-nums">
                S/ {maxPrice.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>S/ 20</span>
              <span>S/ 200</span>
            </div>
          </div>

          {/* Checkbox Options */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700">
              <input
                type="checkbox"
                checked={filterCustomizableOnly}
                onChange={(e) => setFilterCustomizableOnly(e.target.checked)}
                className="rounded text-rose-600 focus:ring-rose-400"
              />
              <span>Solo personalizables</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700">
              <input
                type="checkbox"
                checked={filterOffersOnly}
                onChange={(e) => setFilterOffersOnly(e.target.checked)}
                className="rounded text-rose-600 focus:ring-rose-400"
              />
              <span>Solo promociones / ofertas</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3 space-y-6">
          {/* Top Sort & Count Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-600">
              Mostrando <strong className="text-stone-900 tabular-nums">{filteredProducts.length}</strong>{' '}
              {filteredProducts.length === 1 ? 'regalo disponible' : 'regalos disponibles'}
              {activeCategory !== 'Todos' && (
                <span className="ml-1 text-rose-700 font-semibold">en {activeCategory}</span>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label htmlFor="sort-select" className="text-xs text-stone-500 whitespace-nowrap">
                Ordenar por:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-800 font-medium focus:outline-hidden focus:border-rose-400 cursor-pointer"
              >
                <option value="recientes">Más recientes</option>
                <option value="precio-menor">Precio: menor a mayor</option>
                <option value="precio-mayor">Precio: mayor a menor</option>
                <option value="vendidos">Más vendidos</option>
                <option value="valorados">Mejor valorados</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-400 mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                No encontramos productos con esos filtros
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Prueba ajustando el rango de precio, borrando el término de búsqueda o cambiando de categoría.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 bg-rose-700 text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-rose-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer filtros</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
