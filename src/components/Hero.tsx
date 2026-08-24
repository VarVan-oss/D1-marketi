import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Edit2,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { siteContent, setActivePage, isEditMode, setIsAdminModalOpen, setSelectedProduct, products } = useStore();

  // Highlight featured product for hero showcase card
  const heroShowcaseProduct = products.find((p) => p.isFeatured) || products[0];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#F0F7FB] via-[#F7FAFC] to-[#F7FAFC] pt-8 pb-16 md:pt-14 md:pb-24 border-b border-slate-200/80 bg-grid-pattern">
      {/* Ambient geometric background shapes */}
      <div className="absolute -top-28 -left-28 w-96 h-96 bg-[#AEE3F0]/30 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute top-1/2 -right-28 w-[450px] h-[450px] bg-[#D6ECF7]/50 rounded-full blur-3xl pointer-events-none animate-float-reverse" />
      <div className="absolute bottom-6 left-1/4 w-64 h-64 bg-[#C3EBF8]/20 rounded-full blur-2xl pointer-events-none" />

      {/* Decorative Geometric Rings */}
      <div className="absolute top-12 right-1/3 w-40 h-40 rounded-full border border-[#2B96CB]/10 pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-56 h-56 rounded-full border border-[#5AB8D9]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#BCE1F1] text-[#0A5170] text-xs md:text-sm font-bold shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#2B96CB]" />
              <span>{siteContent.heroBadge}</span>
              {isEditMode && (
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="p-1 hover:bg-amber-100 rounded-md text-amber-800 ml-1"
                  title="Уреди содржина"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Slogan */}
            <div className="text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#2B96CB]">
              {siteContent.heroSlogan}
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {siteContent.heroTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {siteContent.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                id="hero-explore-btn"
                onClick={() => setActivePage('products')}
                className="bg-gradient-to-r from-[#218EB9] to-[#389CBF] hover:from-[#1A7C9F] hover:to-[#2B86A9] text-white px-7 py-4 rounded-2xl font-bold text-base shadow-lg shadow-[#2B96CB]/20 hover:shadow-xl hover:shadow-[#2B96CB]/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group"
              >
                <span>{siteContent.heroCtaText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-discounts-btn"
                onClick={() => setActivePage('products')}
                className="bg-white hover:bg-[#F0F8FB] text-[#1E7497] border border-slate-200 hover:border-[#85D2EC] px-6 py-4 rounded-2xl font-bold text-base shadow-2xs transition-all flex items-center justify-center gap-2"
              >
                <span className="text-[#FF7F50] font-extrabold">%</span>
                <span>Актуелни попусти</span>
              </button>
            </div>

            {/* Mini Trust Highlights */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-3 text-xs md:text-sm text-slate-700">
              <div className="flex items-center gap-2.5 bg-white/60 p-2.5 rounded-2xl border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-[#EBF7FC] flex items-center justify-center text-[#1E7497] shrink-0 font-bold">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="font-bold leading-tight">24-48ч достава</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/60 p-2.5 rounded-2xl border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-[#EBF7FC] flex items-center justify-center text-[#1E7497] shrink-0 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="font-bold leading-tight">100% Оригинали</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/60 p-2.5 rounded-2xl border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-[#EBF7FC] flex items-center justify-center text-[#1E7497] shrink-0 font-bold">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <span className="font-bold leading-tight">Лесна замена</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual & Interactive Product Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            {/* Layered Decorative Elements */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glow backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#85D2EC]/30 to-[#D6ECF7]/50 rounded-3xl filter blur-xl -rotate-2 transform scale-105" />

              {/* Main Image Frame */}
              <div className="relative bg-white p-3 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 overflow-hidden">
                <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={siteContent.heroImageUrl}
                    alt="Д1 Маркет козметички производи"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E3544]/65 via-transparent to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0E5472] shadow-2xs flex items-center gap-1.5 border border-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Дерматолошки проверено</span>
                  </div>

                  {/* Bottom Image Overlay Tag */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-bold text-[#AEE3F0] uppercase tracking-wider">
                      Врвен избор за семејна нега
                    </p>
                    <p className="text-base sm:text-lg font-extrabold leading-snug">
                      Нежно за вашата кожа, природно за вашиот дом
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Product Mini-Card */}
              {heroShowcaseProduct && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  onClick={() => setSelectedProduct(heroShowcaseProduct)}
                  className="absolute -bottom-6 -left-4 sm:-left-8 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-200 max-w-xs cursor-pointer hover:scale-105 transition-transform group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={heroShowcaseProduct.image}
                      alt={heroShowcaseProduct.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-100 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{heroShowcaseProduct.rating}</span>
                        <span className="text-slate-400 font-normal">
                          ({heroShowcaseProduct.reviewCount})
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#1E7497] truncate mt-0.5">
                        {heroShowcaseProduct.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-extrabold text-[#0E5472]">
                          {heroShowcaseProduct.price} ден.
                        </span>
                        {heroShowcaseProduct.originalPrice && (
                          <span className="text-[10px] text-slate-400 line-through">
                            {heroShowcaseProduct.originalPrice} ден.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Floating Trust Rating Pill */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -top-5 -right-4 sm:-right-6 bg-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 font-extrabold text-sm">
                  ★ 4.9
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900 leading-tight">
                    1000+ Рецензии
                  </div>
                  <div className="text-[10px] font-bold text-emerald-600">
                    99.4% Задоволни клиенти
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
