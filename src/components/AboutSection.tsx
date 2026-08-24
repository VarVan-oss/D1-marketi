import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, CheckCircle2, Heart, Award, Shield, Edit3 } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  const { siteContent, isEditMode, setIsAdminModalOpen } = useStore();

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Collage */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-4/5 shadow-slate-200/80">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
                  alt="Д1 Маркет продавница и производи"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-3xl shadow-xl border border-slate-200/80 max-w-[200px] text-center">
                <Award className="w-8 h-8 text-[#2B96CB] mx-auto mb-1" />
                <div className="text-sm font-extrabold text-slate-900">
                  Гаранција за Квалитет
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  100% Дерматолошки сигурно
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#EBF7FC] text-[#0E5472] text-xs font-extrabold uppercase tracking-wider shadow-2xs border border-[#BCE1F1]">
                <Sparkles className="w-3.5 h-3.5 text-[#2B96CB]" />
                <span>За Компанијата</span>
              </div>
              {isEditMode && (
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="text-xs bg-amber-100 text-amber-900 font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-1 shadow-2xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Уреди Текст За Нас</span>
                </button>
              )}
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {siteContent.aboutTitle}
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              {siteContent.aboutStory}
            </p>

            <div className="bg-[#F7FAFC] p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <h3 className="font-bold text-sm text-[#0E5472] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Нашата Мисија</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {siteContent.aboutMission}
              </p>
            </div>

            {/* Core Values List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Нашите клучни вредности:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {siteContent.aboutValues.map((val, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 bg-white p-3 rounded-2xl border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2B96CB] shrink-0 mt-0.5" />
                    <span>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
