import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Scissors, Flame, ShieldCheck, Heart, Home, ArrowRight, FolderPlus } from 'lucide-react';
import { motion } from 'motion/react';
import { Category } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5" />,
  Scissors: <Scissors className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Home: <Home className="w-5 h-5" />,
};

export const CategoryList: React.FC = () => {
  const { categories, products, setSelectedCategoryFilter, setActivePage, isEditMode, setIsAdminModalOpen } = useStore();

  const handleCategorySelect = (catId: string) => {
    setSelectedCategoryFilter(catId);
    setActivePage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-14 md:py-20 bg-[#F7FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#2B96CB] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Истражи по категорија</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Сè што ви треба за убавина и чистота
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-1 max-w-xl">
              Одберете категорија и откријте специјално селектирани производи со врвен европски квалитет.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isEditMode && (
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 px-4 py-2 rounded-xl font-bold transition-colors flex items-center gap-1.5"
              >
                <FolderPlus className="w-4 h-4" />
                <span>Уреди Категории</span>
              </button>
            )}
            <button
              onClick={() => {
                setSelectedCategoryFilter(null);
                setActivePage('products');
              }}
              className="text-xs sm:text-sm font-bold text-[#1E7497] hover:text-[#14536D] flex items-center gap-1 group bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-2xs hover:border-[#2B96CB] transition-all"
            >
              <span>Види ги сите производи</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#2B96CB]" />
            </button>
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const count = products.filter((p) => p.categoryId === cat.id).length;
            const icon = iconMap[cat.icon] || <Sparkles className="w-5 h-5" />;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => handleCategorySelect(cat.id)}
                className="group relative bg-white hover:bg-white rounded-3xl p-4 border border-slate-200/80 hover:border-[#2B96CB] shadow-2xs hover:shadow-xl hover:shadow-[#2B96CB]/10 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1.5"
              >
                <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-slate-100 border border-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#0E5472] flex items-center gap-1.5 shadow-2xs border border-white">
                    <span className="text-[#2B96CB]">{icon}</span>
                    <span>{count} {count === 1 ? 'производ' : 'производи'}</span>
                  </div>
                </div>

                <div className="px-2 pb-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#1E7497] transition-colors">
                      {cat.name}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-[#EBF7FC] group-hover:bg-[#2B96CB] group-hover:text-white text-[#1E7497] flex items-center justify-center transition-colors shrink-0">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
