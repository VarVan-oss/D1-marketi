import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Search,
  ShoppingBag,
  Heart,
  Edit3,
  Menu,
  X,
  Sparkles,
  Phone,
  Clock,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActivePage } from '../types';

export const Header: React.FC = () => {
  const {
    activePage,
    setActivePage,
    siteContent,
    cartCount,
    setIsCartOpen,
    wishlist,
    isEditMode,
    setIsEditMode,
    setIsAdminModalOpen,
    products,
    setSelectedProduct,
    setSelectedCategoryFilter,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when open
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Filtered products for live search
  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Announcement Bar */}
      {siteContent.isAnnouncementActive && (
        <div className="bg-gradient-to-r from-[#AEE3F0] via-[#D6F0F8] to-[#AEE3F0] text-[#0A3C52] text-xs md:text-sm font-semibold py-2 px-4 text-center border-b border-[#9DD4E6]/40 flex items-center justify-center gap-2 relative z-30 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#1E7497] shrink-0" />
          <span className="truncate">{siteContent.announcementText}</span>
          <div className="hidden lg:flex items-center gap-4 ml-4 pl-4 border-l border-[#0A3C52]/20 text-xs">
            <span className="flex items-center gap-1 font-medium">
              <Phone className="w-3 h-3 text-[#1E7497]" /> {siteContent.contactPhone}
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3 text-[#1E7497]" /> {siteContent.workingHoursWeekdays}
            </span>
          </div>
        </div>
      )}

      {/* Edit Mode Top Banner Alert */}
      {isEditMode && (
        <div className="bg-amber-500 text-amber-950 px-4 py-2 text-xs md:text-sm font-semibold flex items-center justify-between z-30 sticky top-0 shadow-md">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <ShieldAlert className="w-4 h-4 text-amber-950 animate-bounce" />
            <span>
              <strong>РЕЖИМ НА УРЕДУВАЊЕ Е АКТИВЕН:</strong> Сите промени веднаш се зачувуваат локално.
            </span>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="bg-amber-900 hover:bg-amber-950 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors shadow-2xs"
              >
                Админ Панел
              </button>
              <button
                onClick={() => setIsEditMode(false)}
                className="bg-white/90 text-amber-950 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-white transition-colors"
              >
                Исклучи
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Header */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Brand Logo */}
            <div className="flex items-center gap-8">
              <button
                id="brand-logo-btn"
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-3 group text-left"
              >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#2B96CB] via-[#5AB8D9] to-[#AEE3F0] p-0.5 shadow-sm shadow-[#2B96CB]/20 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                  <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                    <span className="font-extrabold text-xl text-[#1E7497] tracking-tighter">
                      Д1
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-[#1E7497] transition-colors">
                      Д1 МАРКЕТ
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#2B96CB]">
                    Козметика & Хигиена
                  </span>
                </div>
              </button>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
                {[
                  { id: 'home', label: 'Почетна' },
                  { id: 'products', label: 'Каталог' },
                  { id: 'about', label: 'За нас' },
                  { id: 'reviews', label: 'Рецензии' },
                  { id: 'contact', label: 'Контакт' },
                ].map((item) => {
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`nav-link-${item.id}`}
                      onClick={() => handleNavClick(item.id as ActivePage)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all relative ${
                        isActive
                          ? 'text-[#0E5472] bg-[#EBF7FC]'
                          : 'text-slate-600 hover:text-[#0E5472] hover:bg-slate-100/80'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#2B96CB] rounded-full"
                        />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Live Search Trigger Button */}
              <button
                id="search-toggle-btn"
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 text-slate-600 hover:text-[#0E5472] hover:bg-[#EBF7FC] rounded-2xl transition-colors relative border border-transparent hover:border-slate-200"
                aria-label="Пребарај производи"
                title="Пребарај"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Button */}
              <button
                id="wishlist-toggle-btn"
                onClick={() => setIsWishlistModalOpen(true)}
                className="p-2.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-colors relative border border-transparent hover:border-rose-100"
                aria-label="Омилени производи"
                title="Омилени"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                id="cart-toggle-btn"
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 bg-[#EBF7FC] hover:bg-[#2B96CB] text-[#0E5472] hover:text-white px-4 py-2.5 rounded-2xl transition-all font-bold text-sm border border-[#BCE1F1] hover:border-[#2B96CB] shadow-2xs group"
                aria-label="Отвори кошничка"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-[#1E7497] group-hover:text-white transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#FF7F50] text-white rounded-full text-[10px] font-extrabold w-4 h-4 flex items-center justify-center shadow-xs">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Кошничка</span>
              </button>

              {/* Edit Mode Toggle Switch Button */}
              <button
                id="admin-mode-toggle-btn"
                onClick={() => {
                  if (!isEditMode) {
                    setIsEditMode(true);
                  } else {
                    setIsAdminModalOpen(true);
                  }
                }}
                className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                  isEditMode
                    ? 'bg-amber-100 border-amber-300 text-amber-950 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-[#5AB8D9] hover:text-[#0E5472]'
                }`}
                title={isEditMode ? 'Отвори Админ Панел' : 'Вклучи Режим на Уредување'}
              >
                <Edit3 className={`w-4 h-4 ${isEditMode ? 'text-amber-700 animate-pulse' : 'text-slate-500'}`} />
                <span className="hidden lg:inline">
                  {isEditMode ? 'Уреди Сајт' : 'Edit Mode'}
                </span>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2.5 text-slate-700 hover:bg-slate-100 rounded-2xl"
                aria-label="Отвори мени"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-700" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-[#5AB8D9] text-white font-extrabold flex items-center justify-center">
                      Д1
                    </div>
                    <span className="font-bold text-lg text-slate-900">Д1 МАРКЕТ</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Nav Links */}
                <div className="py-6 flex flex-col gap-2">
                  {[
                    { id: 'home', label: 'Почетна' },
                    { id: 'products', label: 'Каталог на Производи' },
                    { id: 'about', label: 'За нас' },
                    { id: 'reviews', label: 'Искуства & Рецензии' },
                    { id: 'contact', label: 'Контакт & Локација' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id as ActivePage)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold text-left transition-colors ${
                        activePage === item.id
                          ? 'bg-[#EBF7FC] text-[#0E5472]'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Bottom Info */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <div className="text-xs text-slate-500 space-y-1">
                  <p className="font-medium text-slate-700">Д1 Маркет Скопје</p>
                  <p>{siteContent.contactPhone}</p>
                  <p>{siteContent.contactAddress}</p>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsEditMode(!isEditMode);
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 ${
                    isEditMode ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  {isEditMode ? 'Исклучи Режим на Уредување' : 'Вклучи Режим на Уредување'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Bar Input */}
              <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center gap-3">
                <Search className="w-6 h-6 text-[#5AB8D9]" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Пребарај крем, серум, парфем, шампон..."
                  className="w-full text-base sm:text-lg bg-transparent outline-none text-slate-800 placeholder-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-lg transition-colors font-medium ml-2"
                >
                  ESC
                </button>
              </div>

              {/* Quick Categories when search empty */}
              {!searchQuery.trim() && (
                <div className="p-6 bg-slate-50/70">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Популарни категории
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'skin-care', name: 'Нега на кожа' },
                      { id: 'hair-care', name: 'Нега на коса' },
                      { id: 'perfumes', name: 'Парфеми' },
                      { id: 'baby-care', name: 'Бебешка нега' },
                      { id: 'hygiene', name: 'Лична хигиена' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategoryFilter(cat.id);
                          setActivePage('products');
                          setIsSearchOpen(false);
                        }}
                        className="text-xs font-semibold px-3 py-2 bg-white hover:bg-[#EBF7FC] hover:text-[#0E5472] text-slate-700 rounded-xl border border-slate-200 shadow-2xs transition-colors"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results */}
              {searchQuery.trim() && (
                <div className="max-h-96 overflow-y-auto p-4 divide-y divide-slate-100">
                  {searchResults.length > 0 ? (
                    searchResults.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          setSelectedProduct(prod);
                          setIsSearchOpen(false);
                        }}
                        className="py-3 px-3 hover:bg-[#F2F9FC] rounded-2xl flex items-center gap-4 cursor-pointer transition-colors group"
                      >
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-14 h-14 rounded-xl object-cover border border-slate-100 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#1E7497] truncate">
                            {prod.name}
                          </h4>
                          <p className="text-xs text-slate-500 truncate mt-0.5">
                            {prod.shortDescription}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-extrabold text-sm text-[#0E5472]">
                            {prod.price} ден.
                          </span>
                          {prod.originalPrice && (
                            <div className="text-[10px] text-slate-400 line-through">
                              {prod.originalPrice} ден.
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center text-slate-500">
                      <p className="text-sm">Нема пронајдено производи за „{searchQuery}“.</p>
                      <button
                        onClick={() => {
                          setActivePage('products');
                          setIsSearchOpen(false);
                        }}
                        className="mt-3 text-xs text-[#1E7497] font-bold hover:underline"
                      >
                        Отвори го целиот каталог →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* View all in catalog footer */}
              {searchQuery.trim() && searchResults.length > 0 && (
                <div className="p-3 bg-slate-50 text-center border-t border-slate-100">
                  <button
                    onClick={() => {
                      setActivePage('products');
                      setIsSearchOpen(false);
                    }}
                    className="text-xs font-bold text-[#1E7497] hover:underline"
                  >
                    Погледни ги сите резултати во Каталог →
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wishlist Modal */}
      <AnimatePresence>
        {isWishlistModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsWishlistModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <h3 className="font-bold text-lg text-slate-800">
                    Омилени производи ({wishlistProducts.length})
                  </h3>
                </div>
                <button
                  onClick={() => setIsWishlistModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 overflow-y-auto flex-1 divide-y divide-slate-100">
                {wishlistProducts.length > 0 ? (
                  wishlistProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="py-3 flex items-center gap-4 first:pt-0 last:pb-0"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4
                          onClick={() => {
                            setSelectedProduct(prod);
                            setIsWishlistModalOpen(false);
                          }}
                          className="text-sm font-bold text-slate-800 hover:text-[#1E7497] cursor-pointer truncate"
                        >
                          {prod.name}
                        </h4>
                        <div className="text-sm font-extrabold text-[#0E5472] mt-1">
                          {prod.price} ден.
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            useStore().addToCart(prod, 1);
                          }}
                          className="text-xs bg-[#EBF7FC] hover:bg-[#D3EEF9] text-[#0E5472] px-3 py-2 rounded-xl font-bold transition-colors"
                        >
                          Во кошничка
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center text-slate-400">
                    <Heart className="w-12 h-12 mx-auto text-slate-200 mb-3" />
                    <p className="text-sm font-medium">Вашата листа на омилени е празна.</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Кликнете на срцето кај било кој производ за да го зачувате тука.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
