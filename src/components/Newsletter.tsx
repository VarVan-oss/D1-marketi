import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribed(true);
    showToast('Успешно се претплативте за попусти во Д1 Маркет!', 'success');
  };

  return (
    <section className="py-16 bg-gradient-to-r from-[#AEE3F0]/20 via-[#F7FAFC] to-[#AEE3F0]/20 border-y border-slate-200/80 relative overflow-hidden bg-dot-pattern">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-[#0E5472] text-xs font-extrabold uppercase tracking-wider mb-3 shadow-2xs border border-[#BCE1F1]">
          <Sparkles className="w-3.5 h-3.5 text-[#2B96CB]" />
          <span>Ексклузивни Поволности</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Претплатете се и добијте 10% попуст на вашата прва нарачка
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto">
          Бидете први што ќе дознаат за новите козметички колекции, неделни промоции и специјални подароци.
        </p>

        {isSubscribed ? (
          <div className="mt-6 inline-flex items-center gap-2 bg-white text-emerald-800 px-6 py-3 rounded-2xl font-bold text-sm border border-emerald-200 shadow-2xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Ви благодариме! Вашиот промо код за 10% попуст е: <strong>D1START10</strong></span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row gap-2.5"
          >
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Внесете ја вашата email адреса..."
                className="w-full pl-11 pr-4 py-3.5 bg-white rounded-2xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-[#2B96CB] shadow-2xs focus:ring-2 focus:ring-[#2B96CB]/10"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#218EB9] to-[#389CBF] hover:from-[#1A7C9F] hover:to-[#2B86A9] text-white px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-[#2B96CB]/20 transition-all whitespace-nowrap"
            >
              Претплати се
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
