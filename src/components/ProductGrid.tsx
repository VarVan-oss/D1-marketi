import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import {
  SlidersHorizontal,
  Search,
  Check,
  ChevronDown,
  X,
  Sparkles,
  Layers,
  ArrowUpDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  filterFeaturedOnly?: boolean;
  limit?: number;
  showFilters?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  title = 'Каталог на Производи',
  subtitle = 'Истражете ја нашата сеопфатна понуда за нега, убавина и чистота.',
  filterFeaturedOnly = false,
  limit,
  showFilters = true,
}) => {
  const {
    products,
    categories,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    setEditingProduct,
    setIsAdminModalOpen,
  } = useStore();

  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'discount'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyDiscounts, setOnlyDiscounts] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState<number>(limit || 12);

  // Highest price in catalog
  const highestPrice = useMemo(() => {
    return Math.max(...products.map((p) => p.price), 3000);
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (filterFeaturedOnly && !p.isFeatured) return false;
      if (selectedCategoryFilter && p.categoryId !== selectedCategoryFilter) return false;
      if (onlyInStock && !p.inStock) return false;
      if (onlyDiscounts && (!p.discountPercent || p.discountPercent <= 0)) return false;
      if (p.price > maxPrice) return false;
      if (searchFilter.trim()) {
        const query = searchFilter.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          (p.brand && p.brand.toLowerCase().includes(query));
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0);
      // default 'featured'
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [products, filterFeaturedOnly, selectedCategoryFilter, onlyInStock, onlyDiscounts, maxPrice, searchFilter, sortBy]);

  const visibleProducts = filteredProducts.slice(0, displayCount);
  const hasMore = filteredProducts.length > displayCount;

  const handleEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setIsAdminModalOpen(true);
  };

  const resetAllFilters = () => {
    setSelectedCategoryFilter(null);
    setSearchFilter('');
    setMaxPrice(highestPrice);
    setOnlyInStock(false);
    setOnlyDiscounts(false);
    setSortBy('featured');
  };

  const activeFiltersCount =
    (selectedCategoryFilter ? 1 : 0) +
    (searchFilter ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (onlyDiscounts ? 1 : 0) +
    (maxPrice < highestPrice ? 1 : 0);

  return (
    <section className="py-12 md:py-16 bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#2B96CB] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Д1 Маркет Селекција</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-1 max-w-2xl">
              {subtitle}
            </p>
          </div>

          {/* Quick Category Chips if not in full filter view */}
          {!showFilters && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedCategoryFilter(null)}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
                  selectedCategoryFilter === null
                    ? 'bg-[#1E7497] text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-[#EBF7FC] hover:text-[#0E5472] border border-slate-200'
                }`}
              >
                Сите
              </button>
              {categories.slice(0, 4).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryFilter(cat.id)}
                  className={`text-xs font-bold px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
                    selectedCategoryFilter === cat.id
                      ? 'bg-[#1E7497] text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-[#EBF7FC] hover:text-[#0E5472] border border-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Layout: Filters Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Filter Sidebar (Desktop) */}
          {showFilters && (
            <div className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-6 sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#1E7497]" />
                  <h3 className="font-extrabold text-base text-slate-900">Филтри</h3>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetAllFilters}
                    className="text-xs text-rose-600 hover:underline font-semibold"
                  >
                    Ресетирај ({activeFiltersCount})
                  </button>
                )}
              </div>

              {/* Search Inside Catalog */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Пребарај
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Име или бренд..."
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#5AB8D9] focus:bg-white transition-all"
                  />
                  {searchFilter && (
                    <button
                      onClick={() => setSearchFilter('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Категории
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategoryFilter(null)}
                    className={`w-full text-xs font-bold px-3 py-2 rounded-xl text-left flex items-center justify-between transition-colors ${
                      selectedCategoryFilter === null
                        ? 'bg-[#EBF7FC] text-[#0E5472] font-extrabold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>Сите категории</span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      {products.length}
                    </span>
                  </button>
                  {categories.map((cat) => {
                    const count = products.filter((p) => p.categoryId === cat.id).length;
                    const isSelected = selectedCategoryFilter === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategoryFilter(cat.id)}
                        className={`w-full text-xs font-bold px-3 py-2 rounded-xl text-left flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-[#EBF7FC] text-[#0E5472] font-extrabold'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[11px] text-slate-400 font-normal">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  <span>Макс. цена</span>
                  <span className="text-[#0E5472] font-extrabold text-sm">{maxPrice} ден.</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={3000}
                  step={50}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#2B96CB] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                  <span>100 ден.</span>
                  <span>3.000 ден.</span>
                </div>
              </div>

              {/* Toggles: In Stock & Discounts */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 select-none">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-4 h-4 rounded text-[#2B96CB] accent-[#2B96CB] cursor-pointer"
                  />
                  <span>Само производи на залиха</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 select-none">
                  <input
                    type="checkbox"
                    checked={onlyDiscounts}
                    onChange={(e) => setOnlyDiscounts(e.target.checked)}
                    className="w-4 h-4 rounded text-[#FF7F50] accent-[#FF7F50] cursor-pointer"
                  />
                  <span className="text-[#FF7F50] font-bold">Само производи со попуст %</span>
                </label>
              </div>
            </div>
          )}

          {/* Products Grid Area */}
          <div className={showFilters ? 'lg:col-span-9' : 'lg:col-span-12'}>
            {/* Top Bar on Mobile/Desktop for Sorting and Mobile Filter Button */}
            <div className="bg-white p-3.5 sm:p-4 rounded-3xl border border-slate-200/80 mb-6 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
              <div className="text-xs sm:text-sm text-slate-500 font-medium">
                Прикажани се <strong className="text-slate-800">{filteredProducts.length}</strong> од вкупно {products.length} производи
              </div>

              <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                {/* Mobile Filter Toggle */}
                {showFilters && (
                  <button
                    onClick={() => setIsMobileFiltersOpen(true)}
                    className="lg:hidden text-xs bg-[#EBF7FC] text-[#0E5472] px-3.5 py-2 rounded-xl font-bold border border-[#BCE1F1] flex items-center gap-1.5"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Филтри ({activeFiltersCount})</span>
                  </button>
                )}

                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
                  <span className="hidden sm:inline font-medium">Сортирај:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#5AB8D9] cursor-pointer"
                  >
                    <option value="featured">Препорачани</option>
                    <option value="newest">Најнови производи</option>
                    <option value="price-asc">Цена: Ниска → Висока</option>
                    <option value="price-desc">Цена: Висока → Ниска</option>
                    <option value="rating">Највисока оцена ★</option>
                    <option value="discount">Најголем попуст %</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Grid Rendering */}
            {visibleProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                {visibleProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onEdit={handleEditProduct}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-2xs">
                <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800">
                  Не се пронајдени производи
                </h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  Обидете се да ги промените филтрите или терминот за пребарување.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="mt-4 bg-[#EBF7FC] hover:bg-[#D5F0FA] text-[#0E5472] px-5 py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  Ресетирај ги сите филтри
                </button>
              </div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setDisplayCount((prev) => prev + 6)}
                  className="bg-white hover:bg-[#EBF7FC] text-[#0E5472] border border-slate-200 hover:border-[#2B96CB] px-8 py-3.5 rounded-2xl text-sm font-bold shadow-2xs hover:shadow-md transition-all"
                >
                  Вчитај уште производи ({filteredProducts.length - displayCount} преостанати)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm lg:hidden flex justify-end"
            onClick={() => setIsMobileFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="w-4/5 max-w-md bg-white h-full p-6 overflow-y-auto flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h3 className="font-extrabold text-lg text-slate-900">Филтрирај</h3>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Категории
                  </h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategoryFilter(null)}
                      className={`w-full text-xs font-bold p-2.5 rounded-xl text-left flex justify-between ${
                        selectedCategoryFilter === null ? 'bg-[#EBF7FC] text-[#0E5472]' : 'text-slate-700'
                      }`}
                    >
                      <span>Сите</span>
                      <span>{products.length}</span>
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategoryFilter(cat.id)}
                        className={`w-full text-xs font-bold p-2.5 rounded-xl text-left flex justify-between ${
                          selectedCategoryFilter === cat.id ? 'bg-[#EBF7FC] text-[#0E5472]' : 'text-slate-700'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span>{products.filter((p) => p.categoryId === cat.id).length}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>Макс. цена</span>
                    <span className="text-[#0E5472]">{maxPrice} ден.</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={3000}
                    step={50}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#2B96CB]"
                  />
                </div>

                {/* In Stock and Discounts */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={onlyInStock}
                      onChange={(e) => setOnlyInStock(e.target.checked)}
                      className="w-4 h-4 accent-[#2B96CB]"
                    />
                    <span>Само на залиха</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-rose-600">
                    <input
                      type="checkbox"
                      checked={onlyDiscounts}
                      onChange={(e) => setOnlyDiscounts(e.target.checked)}
                      className="w-4 h-4 accent-rose-500"
                    />
                    <span>Само производи со попуст</span>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-3">
                <button
                  onClick={resetAllFilters}
                  className="flex-1 py-3 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl"
                >
                  Ресетирај
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-1 py-3 text-xs font-bold text-white bg-[#1E7497] rounded-xl shadow-md"
                >
                  Примени
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
