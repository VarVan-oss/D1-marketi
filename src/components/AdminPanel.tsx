import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Package,
  FolderTree,
  FileText,
  MessageSquare,
  ShoppingBag,
  RotateCcw,
  Plus,
  Edit3,
  Trash2,
  Check,
  Save,
  ShieldAlert,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Category, Product, SiteContent } from '../types';

export const AdminPanel: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    isEditMode,
    setIsEditMode,
    products,
    deleteProduct,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    siteContent,
    updateSiteContent,
    reviews,
    deleteReview,
    orders,
    setEditingProduct,
    resetToDefaults,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'content' | 'reviews' | 'orders' | 'settings'>('products');
  const [productSearch, setProductSearch] = useState('');

  // Category Edit State
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catImage, setCatImage] = useState('');
  const [catIcon, setCatIcon] = useState('Sparkles');

  // Site Content State Copy for Editing
  const [tempContent, setTempContent] = useState<SiteContent>(siteContent);

  if (!isAdminModalOpen) return null;

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleOpenCatModal = (cat?: Category) => {
    if (cat) {
      setEditingCategory(cat);
      setCatName(cat.name);
      setCatDesc(cat.description);
      setCatImage(cat.image);
      setCatIcon(cat.icon);
    } else {
      setEditingCategory(null);
      setCatName('');
      setCatDesc('');
      setCatImage('https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80');
      setCatIcon('Sparkles');
    }
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    if (editingCategory) {
      updateCategory({
        ...editingCategory,
        name: catName.trim(),
        description: catDesc.trim(),
        image: catImage.trim(),
        icon: catIcon,
      });
    } else {
      addCategory({
        name: catName.trim(),
        slug: catName.toLowerCase().replace(/\s+/g, '-'),
        description: catDesc.trim(),
        image: catImage.trim(),
        icon: catIcon,
      });
    }
    setIsCategoryModalOpen(false);
  };

  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent(tempContent);
  };

  return (
    <div
      id="admin-panel-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
      onClick={() => setIsAdminModalOpen(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden border border-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-amber-950 flex items-center justify-center font-black">
              Д1
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-lg sm:text-xl">
                  Админ Панел — Д1 Маркет
                </h2>
                <span className="text-[10px] bg-amber-400 text-amber-950 font-bold px-2 py-0.5 rounded-full">
                  LIVE EDIT
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Управувајте со производи, содржини, рецензии и нарачки на страницата.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 flex gap-2 overflow-x-auto">
          {[
            { id: 'products', label: `Производи (${products.length})`, icon: <Package className="w-4 h-4" /> },
            { id: 'categories', label: `Категории (${categories.length})`, icon: <FolderTree className="w-4 h-4" /> },
            { id: 'content', label: 'Текстови & Инфо', icon: <FileText className="w-4 h-4" /> },
            { id: 'reviews', label: `Рецензии (${reviews.length})`, icon: <MessageSquare className="w-4 h-4" /> },
            { id: 'orders', label: `Нарачки (${orders.length})`, icon: <ShoppingBag className="w-4 h-4" /> },
            { id: 'settings', label: 'Поставки & Ресет', icon: <RotateCcw className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-[#0E5472] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Container */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#F8FBFC]">
          {/* TAB 1: PRODUCTS CRUD */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-3 items-stretch sm:items-center">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Пребарај производ по име или шифра..."
                    className="w-full pl-9 pr-3 py-2 bg-white text-xs rounded-xl border border-slate-200 outline-none"
                  />
                </div>

                <button
                  onClick={() => {
                    setEditingProduct(null);
                    // The ProductEditModal will open if we trigger it
                    // Let's use a sub-modal or global state
                    // We can close this or open edit modal
                    setIsAdminModalOpen(false);
                    useStore().setEditingProduct({
                      id: '',
                      name: '',
                      slug: '',
                      categoryId: categories[0]?.id || 'skin-care',
                      price: 450,
                      inStock: true,
                      rating: 5,
                      reviewCount: 0,
                      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
                      shortDescription: '',
                      fullDescription: '',
                      sku: `D1-${Math.floor(100 + Math.random() * 900)}`,
                      dateAdded: new Date().toISOString(),
                    });
                  }}
                  className="bg-[#1E7497] hover:bg-[#14536D] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Нов Производ</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-3">Слика & Име</th>
                        <th className="p-3">Категорија</th>
                        <th className="p-3">Цена</th>
                        <th className="p-3">Залиха</th>
                        <th className="p-3 text-right">Акции</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProducts.map((p) => {
                        const cat = categories.find((c) => c.id === p.categoryId)?.name || p.categoryId;
                        return (
                          <tr key={p.id} className="hover:bg-slate-50">
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-10 h-10 rounded-lg object-cover border shrink-0"
                                  referrerPolicy="no-referrer"
                                />
                                <div>
                                  <div className="font-bold text-slate-800">{p.name}</div>
                                  <div className="text-[10px] text-slate-400 font-mono">
                                    {p.sku} {p.brand ? `• ${p.brand}` : ''}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 font-medium text-slate-600">{cat}</td>
                            <td className="p-3 font-extrabold text-[#0E5472]">
                              {p.price} ден.
                              {p.originalPrice && (
                                <span className="text-[10px] text-slate-400 line-through block font-normal">
                                  {p.originalPrice} ден.
                                </span>
                              )}
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  p.inStock
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {p.inStock ? 'На залиха' : 'Распродадено'}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => {
                                    setIsAdminModalOpen(false);
                                    setEditingProduct(p);
                                  }}
                                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                                  title="Уреди"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Избриши „${p.name}“?`)) {
                                      deleteProduct(p.id);
                                    }
                                  }}
                                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg"
                                  title="Избриши"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CATEGORIES CRUD */}
          {activeTab === 'categories' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-sm text-slate-800">
                  Постоечки категории на производи
                </h3>
                <button
                  onClick={() => handleOpenCatModal()}
                  className="bg-[#1E7497] hover:bg-[#14536D] text-white px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Нова Категорија</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((c) => {
                  const count = products.filter((p) => p.categoryId === c.id).length;
                  return (
                    <div
                      key={c.id}
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-12 h-12 rounded-xl object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
                          <span className="text-xs text-slate-400">{count} производи</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                        {c.description}
                      </p>

                      <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => handleOpenCatModal(c)}
                          className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-semibold"
                        >
                          Уреди
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Избриши категорија „${c.name}“?`)) {
                              deleteCategory(c.id);
                            }
                          }}
                          className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-600 px-2.5 py-1.5 rounded-lg font-semibold"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SITE CONTENT EDIT */}
          {activeTab === 'content' && (
            <form onSubmit={handleSaveContent} className="space-y-6">
              {/* Hero Section Texts */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-extrabold text-sm text-[#0E5472]">
                  1. Насловна (Hero) Секција
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Главен Наслов (H1):
                    </label>
                    <input
                      type="text"
                      value={tempContent.heroTitle}
                      onChange={(e) => setTempContent({ ...tempContent, heroTitle: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Слоган на брендот:
                    </label>
                    <input
                      type="text"
                      value={tempContent.heroSlogan}
                      onChange={(e) => setTempContent({ ...tempContent, heroSlogan: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Ознака (Badge):
                    </label>
                    <input
                      type="text"
                      value={tempContent.heroBadge}
                      onChange={(e) => setTempContent({ ...tempContent, heroBadge: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Поднаслов (Опис):
                    </label>
                    <textarea
                      rows={2}
                      value={tempContent.heroSubtitle}
                      onChange={(e) => setTempContent({ ...tempContent, heroSubtitle: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Текст на главно копче (CTA):
                    </label>
                    <input
                      type="text"
                      value={tempContent.heroCtaText}
                      onChange={(e) => setTempContent({ ...tempContent, heroCtaText: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Слика во Hero (URL):
                    </label>
                    <input
                      type="url"
                      value={tempContent.heroImageUrl}
                      onChange={(e) => setTempContent({ ...tempContent, heroImageUrl: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Announcement Bar */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-[#0E5472]">
                    2. Горна Лента за Известувања / Промоции
                  </h4>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tempContent.isAnnouncementActive}
                      onChange={(e) =>
                        setTempContent({ ...tempContent, isAnnouncementActive: e.target.checked })
                      }
                      className="accent-[#2B96CB]"
                    />
                    <span>Прикажи лента</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={tempContent.announcementText}
                  onChange={(e) =>
                    setTempContent({ ...tempContent, announcementText: e.target.value })
                  }
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              {/* Contact & Store Info */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-extrabold text-sm text-[#0E5472]">
                  3. Контакт Податоци & Работно Време
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Телефон за нарачки:
                    </label>
                    <input
                      type="text"
                      value={tempContent.contactPhone}
                      onChange={(e) => setTempContent({ ...tempContent, contactPhone: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email адреса:
                    </label>
                    <input
                      type="email"
                      value={tempContent.contactEmail}
                      onChange={(e) => setTempContent({ ...tempContent, contactEmail: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Локација / Адреса:
                    </label>
                    <input
                      type="text"
                      value={tempContent.contactAddress}
                      onChange={(e) => setTempContent({ ...tempContent, contactAddress: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Работно време (Пон - Петок):
                    </label>
                    <input
                      type="text"
                      value={tempContent.workingHoursWeekdays}
                      onChange={(e) => setTempContent({ ...tempContent, workingHoursWeekdays: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Праг за бесплатна достава (во ден.):
                    </label>
                    <input
                      type="number"
                      value={tempContent.freeShippingThreshold}
                      onChange={(e) =>
                        setTempContent({ ...tempContent, freeShippingThreshold: Number(e.target.value) })
                      }
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="w-full bg-[#1E7497] hover:bg-[#14536D] text-white py-3.5 rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Зачувај ги сите текстуални измени</span>
              </button>
            </form>
          )}

          {/* TAB 4: REVIEWS MODERATION */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm text-slate-800">
                Модерација на рецензии од купувачи
              </h3>
              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{rev.authorName}</span>
                        <span className="text-xs text-slate-400">({rev.city})</span>
                        <span className="text-xs font-bold text-amber-500">★ {rev.rating}/5</span>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">„{rev.comment}“</p>
                      {rev.productName && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded mt-2 inline-block">
                          За производ: {rev.productName}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => deleteReview(rev.id)}
                      className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl"
                      title="Избриши рецензија"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ORDERS LIST */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm text-slate-800">
                Пристигнати нарачки од купувачи
              </h3>
              {orders.length > 0 ? (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <span className="font-mono text-xs font-bold text-[#0E5472] bg-[#EBF7FC] px-2.5 py-1 rounded-lg">
                            #{ord.id}
                          </span>
                          <span className="text-xs text-slate-500 ml-2">
                            {new Date(ord.createdAt).toLocaleString('mk-MK')}
                          </span>
                        </div>
                        <div className="text-sm font-extrabold text-[#0E5472]">
                          Вкупно: {ord.totalPrice} ден.
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                        <div>
                          <strong>Купувач:</strong> {ord.customerName}
                        </div>
                        <div>
                          <strong>Телефон:</strong> {ord.phone}
                        </div>
                        <div>
                          <strong>Адреса:</strong> {ord.city}, {ord.address}
                        </div>
                        <div>
                          <strong>Плаќање:</strong>{' '}
                          {ord.paymentMethod === 'cash_on_delivery'
                            ? 'Во готово при достава'
                            : 'Со картичка'}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <div className="text-[11px] font-bold text-slate-400 uppercase mb-1">
                          Производи ({ord.items.length}):
                        </div>
                        <ul className="text-xs space-y-1">
                          {ord.items.map((it, idx) => (
                            <li key={idx} className="text-slate-700">
                              • {it.product.name} × <strong>{it.quantity}</strong> ({it.product.price} ден.)
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-2xl text-center border border-slate-200 text-slate-400 text-xs">
                  Сè уште нема креирано нарачки во оваа сесија.
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SETTINGS & RESET */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-sm text-slate-900">
                  Режим на уредување (Edit Mode)
                </h4>
                <p className="text-xs text-slate-500">
                  Кога режимот на уредување е вклучен, на секоја картичка и секција се прикажуваат копчиња за брзо уредување и бришење.
                </p>
                <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs ${
                    isEditMode
                      ? 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                      : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  }`}
                >
                  {isEditMode ? 'Исклучи Режим на Уредување' : 'Вклучи Режим на Уредување'}
                </button>
              </div>

              <div className="bg-rose-50 p-6 rounded-2xl border border-rose-200 space-y-3">
                <h4 className="font-bold text-sm text-rose-900 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Ресетирање на фабрички податоци (Demo Reset)</span>
                </h4>
                <p className="text-xs text-rose-700 leading-relaxed">
                  Ова ќе ги избрише сите ваши локални измени и ќе ги врати оригиналните 9+ производи, категории и рецензии на Д1 Маркет.
                </p>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        'Дали сте сигурни дека сакате да ги ресетирате сите податоци на фабричка состојба?'
                      )
                    ) {
                      resetToDefaults();
                      setIsAdminModalOpen(false);
                    }
                  }}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs"
                >
                  Ресетирај сè на оригинални податоци
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Category Edit Submodal */}
      {isCategoryModalOpen && (
        <div
          className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsCategoryModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b">
              <h4 className="font-bold text-sm text-slate-900">
                {editingCategory ? 'Уреди Категорија' : 'Нова Категорија'}
              </h4>
              <button onClick={() => setIsCategoryModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Име на категорија *
                </label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Краток опис
                </label>
                <input
                  type="text"
                  value={catDesc}
                  onChange={(e) => setCatDesc(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Слика (URL)
                </label>
                <input
                  type="url"
                  value={catImage}
                  onChange={(e) => setCatImage(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="flex-1 py-2 bg-slate-100 rounded-xl text-xs font-bold"
                >
                  Откажи
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#1E7497] text-white rounded-xl text-xs font-bold"
                >
                  Зачувај
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
