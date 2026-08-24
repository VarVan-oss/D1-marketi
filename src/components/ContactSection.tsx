import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Edit3,
} from 'lucide-react';
import { motion } from 'motion/react';

export const ContactSection: React.FC = () => {
  const { siteContent, showToast, isEditMode, setIsAdminModalOpen } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      showToast('Вашата порака е успешно испратена! Ќе ве контактираме наскоро.', 'success');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <section className="py-16 md:py-24 bg-[#F7FAFC] relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#EBF7FC] text-[#0E5472] text-xs font-extrabold uppercase tracking-wider mb-3 shadow-2xs border border-[#BCE1F1]">
            <Sparkles className="w-3.5 h-3.5 text-[#2B96CB]" />
            <span>Контактирајте нè</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Тука сме за сите ваши прашања
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Имате прашање за производ, нарачка или соработка? Пишете ни или јавете се директно.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Info Cards & Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-lg text-slate-900">
                  Информации за контакт
                </h3>
                {isEditMode && (
                  <button
                    onClick={() => setIsAdminModalOpen(true)}
                    className="text-xs text-amber-900 bg-amber-100 px-3 py-1 rounded-xl font-bold flex items-center gap-1 shadow-2xs"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Уреди</span>
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#EBF7FC] text-[#1E7497] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Телефон за нарачки
                    </div>
                    <a
                      href={`tel:${siteContent.contactPhone.replace(/\s+/g, '')}`}
                      className="text-sm sm:text-base font-extrabold text-slate-800 hover:text-[#1E7497] transition-colors"
                    >
                      {siteContent.contactPhone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#EBF7FC] text-[#1E7497] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Email адреса
                    </div>
                    <a
                      href={`mailto:${siteContent.contactEmail}`}
                      className="text-sm sm:text-base font-extrabold text-slate-800 hover:text-[#1E7497] transition-colors"
                    >
                      {siteContent.contactEmail}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#EBF7FC] text-[#1E7497] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Локација / Продавница
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      {siteContent.contactAddress}
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4 pt-2 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-2xl bg-[#EBF7FC] text-[#1E7497] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-xs space-y-1 text-slate-600">
                    <div className="font-bold text-slate-900 text-sm">Работно време</div>
                    <div>{siteContent.workingHoursWeekdays}</div>
                    <div>{siteContent.workingHoursSaturday}</div>
                    <div className="text-slate-400">{siteContent.workingHoursSunday}</div>
                  </div>
                </div>
              </div>

              {/* Instant Chat Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${siteContent.contactPhone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`viber://chat?number=${siteContent.contactViber.replace(/\D/g, '')}`}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Viber</span>
                </a>
              </div>
            </div>

            {/* Map Frame / Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 aspect-16/9 relative group shadow-2xs">
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965.082531608933!2d21.415!3d41.996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDU5JzQ1LjYiTiAyMcKwMjQnNTQuMCJF!5e0!3m2!1smk!2smk!4v1620000000000!5m2!1smk!2smk"
                className="w-full h-full border-0 filter grayscale-20 contrast-105"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-800 shadow-2xs flex items-center gap-1.5 pointer-events-none border border-white">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Скопје, Македонија</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-2xs">
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">
              Испратете ни директна порака
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Ќе ви одговориме во најкраток можен рок во текот на работниот ден.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Ваше име и презиме *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="пр. Стефан Трајковски"
                    className="w-full text-xs sm:text-sm p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2B96CB] focus:ring-2 focus:ring-[#2B96CB]/10 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Телефонски број *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="070 123 456"
                    className="w-full text-xs sm:text-sm p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2B96CB] focus:ring-2 focus:ring-[#2B96CB]/10 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email адреса (опционално)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vashiot.email@primer.mk"
                  className="w-full text-xs sm:text-sm p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2B96CB] focus:ring-2 focus:ring-[#2B96CB]/10 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Вашата порака или прашање *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Напишете овде што ве интересира..."
                  className="w-full text-xs sm:text-sm p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2B96CB] focus:ring-2 focus:ring-[#2B96CB]/10 focus:bg-white transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-gradient-to-r from-[#218EB9] to-[#389CBF] hover:from-[#1A7C9F] hover:to-[#2B86A9] text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-md shadow-[#2B96CB]/20 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Се испраќа...' : 'Испрати Порака'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
