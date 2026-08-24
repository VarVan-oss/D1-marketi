import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Send,
  MessageSquare,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MACEDONIAN_CITIES } from '../data/initialData';

export const ProductModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isProductInWishlist,
    reviews,
    addReview,
    products,
    categories,
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Review Form State
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewCity, setReviewCity] = useState('Скопје');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  if (!selectedProduct) return null;

  const isFav = isProductInWishlist(selectedProduct.id);
  const currentImage = selectedImage || selectedProduct.image;
  const allImages = [
    selectedProduct.image,
    ...(selectedProduct.additionalImages || []),
  ];

  const productReviews = reviews.filter((r) => r.productId === selectedProduct.id);
  const categoryName = categories.find((c) => c.id === selectedProduct.categoryId)?.name || 'Козметика';
  const relatedProducts = products
    .filter((p) => p.categoryId === selectedProduct.categoryId && p.id !== selectedProduct.id)
    .slice(0, 3);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    addReview({
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      authorName: reviewAuthor.trim(),
      city: reviewCity,
      rating: reviewRating,
      comment: reviewComment.trim(),
      verifiedPurchase: true,
    });

    setReviewAuthor('');
    setReviewComment('');
    setReviewRating(5);
  };

  return (
    <AnimatePresence>
      <div
        id="product-modal-backdrop"
        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
        onClick={() => setSelectedProduct(null)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-slate-100 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 hover:bg-slate-100 text-slate-600 rounded-full flex items-center justify-center shadow-md transition-colors"
            aria-label="Затвори"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Image Gallery */}
              <div className="md:col-span-6 space-y-3">
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#F4FAFC] border border-[#E2F2F8]">
                  <img
                    src={currentImage}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  {selectedProduct.discountPercent && selectedProduct.discountPercent > 0 ? (
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                      -{selectedProduct.discountPercent}% ПОПУСТ
                    </span>
                  ) : null}
                </div>

                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                          currentImage === img
                            ? 'border-[#2B96CB] scale-105 shadow-sm'
                            : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt="Thumbnail"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Details & Actions */}
              <div className="md:col-span-6 space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#5AB8D9] uppercase tracking-wider mb-1">
                    <span>{categoryName}</span>
                    {selectedProduct.brand && (
                      <>
                        <span>•</span>
                        <span className="text-slate-400">{selectedProduct.brand}</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                    {selectedProduct.name}
                  </h2>

                  {/* Rating & SKU */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= Math.round(selectedProduct.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-700">
                      {selectedProduct.rating} ({selectedProduct.reviewCount || productReviews.length} рецензии)
                    </span>
                    <span className="text-xs text-slate-400 ml-auto">
                      Шифра: <strong className="text-slate-600">{selectedProduct.sku}</strong>
                    </span>
                  </div>
                </div>

                {/* Price Section */}
                <div className="p-4 bg-[#F7FAFC] rounded-2xl border border-slate-200/80 flex items-center justify-between shadow-2xs">
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#0E5472]">
                      {selectedProduct.price} <span className="text-sm font-semibold">ден.</span>
                    </div>
                    {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                      <div className="text-xs text-slate-400 line-through">
                        Редовна цена: {selectedProduct.originalPrice} ден.
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full inline-block ${
                        selectedProduct.inStock
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {selectedProduct.inStock ? '✓ На залиха' : 'Распродадено'}
                    </span>
                    {selectedProduct.volumeOrWeight && (
                      <div className="text-xs text-slate-500 font-medium mt-1">
                        Пакување: {selectedProduct.volumeOrWeight}
                      </div>
                    )}
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedProduct.shortDescription}
                </p>

                {/* Quantity & Add to Cart Controls */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex items-center border border-slate-200 rounded-2xl bg-white shadow-2xs">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3.5 py-2.5 text-slate-600 hover:text-slate-900 font-extrabold text-base"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm font-extrabold text-slate-800 min-w-[2rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3.5 py-2.5 text-slate-600 hover:text-slate-900 font-extrabold text-base"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(selectedProduct, quantity);
                      setSelectedProduct(null);
                    }}
                    disabled={!selectedProduct.inStock}
                    className="flex-1 bg-gradient-to-r from-[#218EB9] to-[#45ACD2] hover:from-[#1A7C9F] hover:to-[#389CBF] text-white py-3.5 px-6 rounded-2xl font-extrabold text-sm shadow-md shadow-[#389CBF]/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Додај во кошничка</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className={`p-3.5 rounded-2xl border transition-colors ${
                      isFav
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'border-slate-200 text-slate-400 hover:text-rose-500'
                    }`}
                    aria-label="Омилено"
                  >
                    <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Delivery Perks */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <Truck className="w-4 h-4 text-[#2B96CB]" />
                    <span>Достава за 24-48 часа</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-[#2B96CB]" />
                    <span>100% Оригинален производ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Tabs: Description, Ingredients, and Reviews */}
            <div className="mt-8 pt-8 border-t border-slate-100">
              <div className="flex border-b border-slate-200 gap-6">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-3 text-sm font-bold transition-colors relative ${
                    activeTab === 'details'
                      ? 'text-[#0E5472]'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Опис и Упатство за употреба
                  {activeTab === 'details' && (
                    <motion.div
                      layoutId="modalTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2B96CB]"
                    />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-3 text-sm font-bold transition-colors relative flex items-center gap-1.5 ${
                    activeTab === 'reviews'
                      ? 'text-[#0E5472]'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Рецензии ({productReviews.length})</span>
                  {activeTab === 'reviews' && (
                    <motion.div
                      layoutId="modalTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2B96CB]"
                    />
                  )}
                </button>
              </div>

              {/* Tab 1: Details */}
              {activeTab === 'details' && (
                <div className="pt-6 space-y-4 text-sm text-slate-700 leading-relaxed">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Детален опис:</h4>
                    <p>{selectedProduct.fullDescription}</p>
                  </div>

                  {selectedProduct.usage && (
                    <div className="bg-[#F8FBFC] p-4 rounded-2xl border border-[#E1F1F7]">
                      <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#2B96CB]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Начин на употреба:</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600">{selectedProduct.usage}</p>
                    </div>
                  )}

                  {selectedProduct.ingredients && (
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Состојки (INCI):</h4>
                      <p className="text-xs text-slate-500 font-mono bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {selectedProduct.ingredients}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Reviews */}
              {activeTab === 'reviews' && (
                <div className="pt-6 space-y-8">
                  {/* Reviews List */}
                  <div className="space-y-4">
                    {productReviews.length > 0 ? (
                      productReviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="bg-[#F8FBFC] p-4 rounded-2xl border border-slate-100 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900">
                                {rev.authorName}
                              </span>
                              <span className="text-xs text-slate-400">({rev.city})</span>
                              {rev.verifiedPurchase && (
                                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  <span>Потврден купувач</span>
                                </span>
                              )}
                            </div>
                            <div className="flex text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < rev.rating ? 'fill-amber-400' : 'text-slate-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {rev.comment}
                          </p>
                          <div className="text-[10px] text-slate-400">{rev.date}</div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500 italic">
                        Сè уште нема рецензии за овој производ. Бидете први што ќе остави коментар!
                      </p>
                    )}
                  </div>

                  {/* Add Review Form */}
                  <div className="bg-[#EDF8FC] p-5 sm:p-6 rounded-3xl border border-[#BCE1F1]">
                    <h4 className="font-extrabold text-base text-[#0E5472] mb-1">
                      Остави своја рецензија
                    </h4>
                    <p className="text-xs text-[#3E6C80] mb-4">
                      Споделете го вашето искуство со производот за да им помогнете на другите купувачи.
                    </p>

                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      {/* Star Picker */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Ваша оцена:
                        </label>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              onClick={() => setReviewRating(star)}
                              className="p-1 text-slate-300 hover:scale-110 transition-transform"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  star <= (hoverRating || reviewRating)
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-300'
                                }`}
                              />
                            </button>
                          ))}
                          <span className="text-xs font-bold text-slate-700 ml-2">
                            {reviewRating} / 5
                          </span>
                        </div>
                      </div>

                      {/* Name & City */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Ваше Име и Презиме:
                          </label>
                          <input
                            type="text"
                            required
                            value={reviewAuthor}
                            onChange={(e) => setReviewAuthor(e.target.value)}
                            placeholder="пр. Марија Јовановска"
                            className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#2B96CB]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Град:
                          </label>
                          <select
                            value={reviewCity}
                            onChange={(e) => setReviewCity(e.target.value)}
                            className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#2B96CB]"
                          >
                            {MACEDONIAN_CITIES.map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Comment */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Ваш Коментар:
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="Како ви се допаѓа производот, мирисот, ефектот..."
                          className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#2B96CB]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-[#1E7497] hover:bg-[#14536D] text-white px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Испрати Рецензија</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-10 pt-8 border-t border-slate-100">
                <h4 className="font-extrabold text-base text-slate-900 mb-4">
                  Слични производи што може да ви се допаднат
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedProducts.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => {
                        setSelectedProduct(rel);
                        setSelectedImage(null);
                      }}
                      className="p-3 bg-slate-50 hover:bg-[#F2F9FC] rounded-2xl border border-slate-200/70 cursor-pointer transition-colors flex items-center gap-3 group"
                    >
                      <img
                        src={rel.image}
                        alt={rel.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <h5 className="text-xs font-bold text-slate-800 group-hover:text-[#1E7497] truncate">
                          {rel.name}
                        </h5>
                        <div className="text-xs font-extrabold text-[#0E5472] mt-0.5">
                          {rel.price} ден.
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
