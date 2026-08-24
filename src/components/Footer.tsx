import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  Lock,
  Edit3,
  ShieldCheck,
  Truck,
  Sparkles,
} from 'lucide-react';
import { ActivePage } from '../types';

export const Footer: React.FC = () => {
  const {
    setActivePage,
    setSelectedCategoryFilter,
    siteContent,
    categories,
    isEditMode,
    setIsEditMode,
    setIsAdminModalOpen,
  } = useStore();

  const handleNav = (page: ActivePage, catId?: string) => {
    if (catId !== undefined) {
      setSelectedCategoryFilter(catId);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0D212C] text-slate-300 pt-16 pb-12 border-t border-[#1C3E4F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1A3848]">
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2B96CB] to-[#AEE3F0] p-0.5 flex items-center justify-center shadow-md shadow-[#2B96CB]/10">
                <div className="w-full h-full bg-[#0D212C] rounded-[14px] flex items-center justify-center">
                  <span className="font-extrabold text-lg text-[#5AB8D9]">Д1</span>
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Д1 МАРКЕТ
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Вашата доверлива дестинација за квалитетна козметика, нега на лице и тело, парфеми и хигиена за домот во Македонија.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-[#AEE3F0] bg-[#163647] px-3.5 py-1.5 rounded-xl border border-[#234A5F]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5AB8D9]" />
                <span>100% Оригинали</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#AEE3F0] bg-[#163647] px-3.5 py-1.5 rounded-xl border border-[#234A5F]">
                <Truck className="w-3.5 h-3.5 text-[#5AB8D9]" />
                <span>Брза достава</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Брза навигација
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { id: 'home', label: 'Почетна страна' },
                { id: 'products', label: 'Каталог производи' },
                { id: 'about', label: 'За Д1 Маркет' },
                { id: 'reviews', label: 'Искуства и рецензии' },
                { id: 'contact', label: 'Контакт и локација' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id as ActivePage)}
                    className="hover:text-white transition-colors text-slate-400"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Категории
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleNav('products', cat.id)}
                    className="hover:text-white transition-colors text-slate-400"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Контакт информации
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#5AB8D9] shrink-0 mt-0.5" />
                <span>{siteContent.contactPhone}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#5AB8D9] shrink-0 mt-0.5" />
                <span>{siteContent.contactEmail}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#5AB8D9] shrink-0 mt-0.5" />
                <span>{siteContent.contactAddress}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#5AB8D9] shrink-0 mt-0.5" />
                <span>{siteContent.workingHoursWeekdays}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Mode Access */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Д1 Маркет. Сите права се задржани. Изработено со грижа за Македонија.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (!isEditMode) {
                  setIsEditMode(true);
                } else {
                  setIsAdminModalOpen(true);
                }
              }}
              className="hover:text-[#5AB8D9] transition-colors flex items-center gap-1.5 text-[11px] font-semibold bg-[#1A3848] px-3 py-1.5 rounded-lg border border-[#275066]"
            >
              <Lock className="w-3 h-3 text-[#5AB8D9]" />
              <span>{isEditMode ? 'Отвори Админ Панел' : 'Администраторски Пристап'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
