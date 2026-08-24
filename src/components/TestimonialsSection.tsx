import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Star, CheckCircle2, MessageSquarePlus, Sparkles, Trash2, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MACEDONIAN_CITIES } from '../data/initialData';

export const TestimonialsSection: React.FC = () => {
  const { reviews, addReview, isEditMode, deleteReview } = useStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('Скопје');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    addReview({
      authorName: name.trim(),
      city,
      rating,
      comment: comment.trim(),
      verifiedPurchase: true,
    });

    setName('');
    setComment('');
    setRating(5);
    setIsFormOpen(false);
  };

  return (
    <section className="py-16 md:py-24 bg-[#F7FAFC] relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#EBF7FC] text-[#0E5472] text-xs font-extrabold uppercase tracking-wider mb-3 shadow-2xs border border-[#BCE1F1]">
              <Sparkles className="w-3.5 h-3.5 text-[#2B96CB]" />
              <span>Искуства на нашите купувачи</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Што велат за Д1 Маркет?
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-1 max-w-xl">
              Прочитајте автентични впечатоци од наши задоволни корисници низ цела Македонија.
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-[#EBF7FC] hover:bg-[#2B96CB] text-[#0E5472] hover:text-white px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 self-start md:self-auto shadow-2xs group border border-[#BCE1F1] hover:border-[#2B96CB]"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#2B96CB] group-hover:text-white transition-colors" />
            <span>Остави Рецензија</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-[#2B96CB] shadow-2xs hover:shadow-xl hover:shadow-[#2B96CB]/10 transition-all duration-300 flex flex-col justify-between relative group"
            >
              {isEditMode && (
                <button
                  onClick={() => {
                    if (window.confirm('Дали сакате да ја избришете оваа рецензија?')) {
                      deleteReview(rev.id);
                    }
                  }}
                  className="absolute top-4 right-4 p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs transition-colors"
                  title="Избриши рецензија"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}

              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
                </div>

                {/* Comment */}
                <p className="text-slate-700 text-sm leading-relaxed mb-4 italic">
                  „{rev.comment}“
                </p>
              </div>

              {/* Author and Product Tag */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <span>{rev.authorName}</span>
                    {rev.verifiedPurchase && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" title="Потврден купувач" />
                    )}
                  </div>
                  <div className="text-xs text-slate-400">{rev.city}</div>
                </div>

                {rev.productName && (
                  <span className="text-[10px] bg-[#EBF7FC] text-[#0E5472] px-2.5 py-1 rounded-lg font-bold max-w-[120px] truncate border border-[#BCE1F1]/50">
                    {rev.productName}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Споделете го вашето искуство
                </h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Rating */}
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
                        onClick={() => setRating(star)}
                        className="p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= (hoverRating || rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-2">
                      {rating} / 5
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ваше име и презиме:
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="пр. Игор Петровски"
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#2B96CB] focus:bg-white"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Град:
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#2B96CB] focus:bg-white"
                  >
                    {MACEDONIAN_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ваш коментар:
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Напишете ваши впечатоци за производите, брзината на достава, пакувањето..."
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#2B96CB] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1E7497] hover:bg-[#14536D] text-white py-3.5 rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Објави рецензија</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
