import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { X, Upload, Image as ImageIcon, Sparkles, Check, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductEditModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_IMAGES = [
  { label: 'Серум за лице', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80' },
  { label: 'Крем / Тегла', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80' },
  { label: 'Маска за коса', url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Парфем женски', url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80' },
  { label: 'Парфем машки', url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80' },
  { label: 'Природен сапун', url: 'https://images.unsplash.com/photo-1607006314144-8cb8452ff998?auto=format&fit=crop&w=800&q=80' },
  { label: 'Бебешка крема', url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80' },
  { label: 'Детергент за дом', url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80' },
  { label: 'Лосион за тело', url: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80' },
];

export const ProductEditModal: React.FC<ProductEditModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { categories, addProduct, updateProduct } = useStore();

  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'skin-care');
  const [brand, setBrand] = useState('Д1 Маркет');
  const [price, setPrice] = useState(490);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);
  const [discountPercent, setDiscountPercent] = useState<number | undefined>(undefined);
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [volumeOrWeight, setVolumeOrWeight] = useState('50ml');
  const [usage, setUsage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [sku, setSku] = useState(`D1-${Math.floor(100 + Math.random() * 900)}`);
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [inStock, setInStock] = useState(true);
  const [isNew, setIsNew] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategoryId(product.categoryId);
      setBrand(product.brand || 'Д1 Маркет');
      setPrice(product.price);
      setOriginalPrice(product.originalPrice);
      setDiscountPercent(product.discountPercent);
      setShortDescription(product.shortDescription);
      setFullDescription(product.fullDescription);
      setVolumeOrWeight(product.volumeOrWeight || '');
      setUsage(product.usage || '');
      setIngredients(product.ingredients || '');
      setSku(product.sku);
      setImage(product.image);
      setInStock(product.inStock);
      setIsNew(product.isNew || false);
      setIsFeatured(product.isFeatured || false);
    } else {
      setName('');
      setCategoryId(categories[0]?.id || 'skin-care');
      setBrand('Д1 Маркет');
      setPrice(490);
      setOriginalPrice(undefined);
      setDiscountPercent(undefined);
      setShortDescription('');
      setFullDescription('');
      setVolumeOrWeight('50ml');
      setUsage('');
      setIngredients('');
      setSku(`D1-${Math.floor(100 + Math.random() * 900)}`);
      setImage(PRESET_IMAGES[0].url);
      setInStock(true);
      setIsNew(true);
      setIsFeatured(false);
    }
  }, [product, categories, isOpen]);

  if (!isOpen) return null;

  // Handle File Upload to Base64
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Auto calculate discount
  const handlePriceChange = (newPrice: number) => {
    setPrice(newPrice);
    if (originalPrice && originalPrice > newPrice) {
      const disc = Math.round(((originalPrice - newPrice) / originalPrice) * 100);
      setDiscountPercent(disc);
    } else {
      setDiscountPercent(undefined);
    }
  };

  const handleOriginalPriceChange = (newOrig: number | undefined) => {
    setOriginalPrice(newOrig);
    if (newOrig && newOrig > price) {
      const disc = Math.round(((newOrig - price) / newOrig) * 100);
      setDiscountPercent(disc);
    } else {
      setDiscountPercent(undefined);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || price <= 0) return;

    if (product) {
      updateProduct({
        ...product,
        name: name.trim(),
        categoryId,
        brand: brand.trim(),
        price,
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        discountPercent,
        shortDescription: shortDescription.trim(),
        fullDescription: fullDescription.trim(),
        volumeOrWeight: volumeOrWeight.trim(),
        usage: usage.trim(),
        ingredients: ingredients.trim(),
        sku: sku.trim(),
        image,
        inStock,
        isNew,
        isFeatured,
      });
    } else {
      addProduct({
        name: name.trim(),
        slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        categoryId,
        brand: brand.trim(),
        price,
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        discountPercent,
        shortDescription: shortDescription.trim(),
        fullDescription: fullDescription.trim(),
        volumeOrWeight: volumeOrWeight.trim(),
        usage: usage.trim(),
        ingredients: ingredients.trim(),
        sku: sku.trim(),
        image,
        inStock,
        isNew,
        isFeatured,
      });
    }

    onClose();
  };

  return (
    <div
      id="product-edit-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 relative p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-xl"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 pb-4 mb-6 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {product ? 'Уреди Производ' : 'Додај Нов Производ во Д1 Маркет'}
            </h3>
            <p className="text-xs text-slate-500">
              Пополнете ги информациите. Сликата можете да ја прикачите или изберете готова.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image Selection Section */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Слика на производот:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Preview */}
              <div className="sm:col-span-4 relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200">
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Upload & Presets */}
              <div className="sm:col-span-8 space-y-3">
                <div>
                  <label className="text-xs text-slate-500 font-semibold block mb-1">
                    Прикачи своја слика од уред:
                  </label>
                  <label className="flex items-center justify-center gap-2 p-3 bg-white border border-dashed border-[#5AB8D9] rounded-xl cursor-pointer hover:bg-[#EBF7FC] transition-colors text-xs font-bold text-[#0E5472]">
                    <Upload className="w-4 h-4" />
                    <span>Избери фајл од компјутер / телефон</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="text-xs text-slate-500 font-semibold block mb-1">
                    Или внеси директен линк (URL):
                  </label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 font-semibold block mb-1">
                    Или кликни готова слика од колекција:
                  </label>
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setImage(preset.url)}
                        className={`text-[10px] px-2 py-1 rounded-lg border whitespace-nowrap ${
                          image === preset.url
                            ? 'bg-[#1E7497] text-white border-[#1E7497]'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Име на производ *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="пр. Хидратантен Крем со Алое Вера"
                className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#2B96CB] focus:bg-white font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Категорија *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#2B96CB] focus:bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Бренд / Производител
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="пр. D1 Pure, Nivea, Garnier..."
                className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#2B96CB] focus:bg-white"
              />
            </div>
          </div>

          {/* Price & Discounts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#F2F9FC] rounded-2xl border border-[#D5EEF8]">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Цена (во МКД) *
              </label>
              <input
                type="number"
                required
                min={1}
                value={price}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                className="w-full text-sm font-extrabold text-[#0E5472] p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#2B96CB]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Стара цена (за попуст)
              </label>
              <input
                type="number"
                value={originalPrice || ''}
                onChange={(e) =>
                  handleOriginalPriceChange(e.target.value ? Number(e.target.value) : undefined)
                }
                placeholder="пр. 650"
                className="w-full text-xs sm:text-sm p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#2B96CB]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Попуст процент
              </label>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-bold text-rose-600 flex items-center justify-between">
                <span>{discountPercent ? `-${discountPercent}%` : 'Нема попуст'}</span>
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Краток опис (за картичка)
              </label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Кратко резиме во 1 реченица..."
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#2B96CB] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Целосен детален опис
              </label>
              <textarea
                rows={3}
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                placeholder="Детални предности на производот..."
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#2B96CB] focus:bg-white"
              />
            </div>
          </div>

          {/* Specs: Weight, Usage, INCI */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Пакување / Грамажа
              </label>
              <input
                type="text"
                value={volumeOrWeight}
                onChange={(e) => setVolumeOrWeight(e.target.value)}
                placeholder="пр. 50ml, 250ml, 100g"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Упатство за употреба
              </label>
              <input
                type="text"
                value={usage}
                onChange={(e) => setUsage(e.target.value)}
                placeholder="пр. Нанесете наутро..."
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Шифра (SKU)
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="D1-XX-001"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="w-4 h-4 accent-[#2B96CB]"
              />
              <span>На залиха</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
                className="w-4 h-4 accent-[#2B96CB]"
              />
              <span>Означи како „НОВО“</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 accent-[#2B96CB]"
              />
              <span>Истакни на Почетна</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-colors"
            >
              Откажи
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 bg-[#1E7497] hover:bg-[#14536D] text-white font-bold text-xs rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{product ? 'Зачувај Промени' : 'Креирај Производ'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
