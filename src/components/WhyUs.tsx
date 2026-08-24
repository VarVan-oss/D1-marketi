import React from 'react';
import { useStore } from '../context/StoreContext';
import { Truck, ShieldCheck, HeartHandshake, Award, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const WhyUs: React.FC = () => {
  const { siteContent } = useStore();

  const benefits = [
    {
      icon: <Truck className="w-7 h-7 text-[#2B96CB]" />,
      number: '24-48ч',
      title: 'Експресна Достава',
      desc: 'Брза и сигурна достава до секоја адреса во сите градови и населени места во Македонија.',
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#2B96CB]" />,
      number: '100%',
      title: 'Оригинални Брендови',
      desc: 'Директен увоз од сертифицирани европски производители со гарантиран рок и квалитет.',
    },
    {
      icon: <HeartHandshake className="w-7 h-7 text-[#2B96CB]" />,
      number: '1.000+',
      title: 'Задоволни Клиенти',
      desc: 'Илјадници семејства кои секојдневно ни ја доверуваат својата хигиена и убавина.',
    },
    {
      icon: <Award className="w-7 h-7 text-[#2B96CB]" />,
      number: '4.9 ★',
      title: 'Врвна Оценка',
      desc: 'Просечна оцена од реални купувачи благодарение на нашата посветеност и љубезна поддршка.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#EBF7FC] text-[#0E5472] text-xs font-extrabold uppercase tracking-wider mb-3 shadow-2xs border border-[#BCE1F1]">
            <Sparkles className="w-3.5 h-3.5 text-[#2B96CB]" />
            <span>Зошто Д1 Маркет</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Стандарди на кои можете да им верувате
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Секој пакет од Д1 Маркет е спакуван со грижа и внимание, токму како за нашето семејство.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-[#2B96CB] shadow-2xs hover:shadow-xl hover:shadow-[#2B96CB]/10 transition-all duration-300 text-center flex flex-col items-center group transform hover:-translate-y-1.5"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#EBF7FC] group-hover:bg-[#2B96CB] text-[#1E7497] group-hover:text-white flex items-center justify-center mb-4 transition-colors">
                <span className="group-hover:text-white transition-colors">{item.icon}</span>
              </div>
              <div className="text-2xl font-extrabold text-[#0E5472] mb-1">
                {item.number}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
