import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  CheckCircle2,
  Truck,
  CreditCard,
  Banknote,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MACEDONIAN_CITIES } from '../data/initialData';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    siteContent,
    placeOrder,
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Скопје');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'card'>('cash_on_delivery');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const shippingCost = cartTotal >= siteContent.freeShippingThreshold ? 0 : 150;
  const grandTotal = cartTotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) return;

    const newOrder = placeOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      city,
      address: address.trim(),
      note: note.trim() || undefined,
      items: [...cart],
      subtotal: cartTotal,
      shippingCost,
      totalPrice: grandTotal,
      paymentMethod,
    });

    setCompletedOrder(newOrder);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  return (
    <AnimatePresence>
      <div
        id="checkout-modal-backdrop"
        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-slate-100 relative p-6 sm:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-xl"
            aria-label="Затвори"
          >
            <X className="w-5 h-5" />
          </button>

          {!completedOrder ? (
            <div>
              <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-[#EBF7FC] text-[#1E7497] flex items-center justify-center font-bold">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Завршување на нарачката
                  </h3>
                  <p className="text-xs text-slate-500">
                    Внесете ги вашите податоци за брза достава до вашиот праг.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Contact & Delivery Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Име и Презиме *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="пр. Ана Стојановска"
                      className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#2B96CB] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Телефонски број *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="07X XXX XXX"
                      className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#2B96CB] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Град за достава *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#2B96CB] focus:bg-white"
                    >
                      {MACEDONIAN_CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Точна адреса (улица и број) *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="пр. бул. Партизански Одреди бр. 12/3"
                      className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#2B96CB] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Забелешка за достава (опционално)
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="пр. Ѕвонете на интерфон бр. 4 или доставете по 16:00ч"
                    className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#2B96CB] focus:bg-white"
                  />
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Начин на плаќање
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setPaymentMethod('cash_on_delivery')}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-center gap-3 transition-all ${
                        paymentMethod === 'cash_on_delivery'
                          ? 'border-[#2B96CB] bg-[#EBF7FC]'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Banknote className="w-5 h-5 text-[#1E7497]" />
                      <div className="text-left">
                        <div className="text-xs font-bold text-slate-900">
                          Плаќање при достава
                        </div>
                        <div className="text-[10px] text-slate-500">Во готово на курирот</div>
                      </div>
                    </div>

                    <div
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-center gap-3 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#2B96CB] bg-[#EBF7FC]'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-[#1E7497]" />
                      <div className="text-left">
                        <div className="text-xs font-bold text-slate-900">
                          Плаќање со картичка
                        </div>
                        <div className="text-[10px] text-slate-500">Сигурно онлајн процесирање</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary Box */}
                <div className="bg-[#F7FAFC] p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs shadow-2xs">
                  <div className="font-bold text-slate-900 mb-1">Преглед на нарачка:</div>
                  <div className="flex justify-between text-slate-600">
                    <span>Производи ({cart.reduce((s, i) => s + i.quantity, 0)}):</span>
                    <span className="font-bold text-slate-800">{cartTotal} ден.</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Достава:</span>
                    <span className="font-bold text-slate-800">
                      {shippingCost === 0 ? (
                        <span className="text-emerald-600 font-bold">БЕСПЛАТНА</span>
                      ) : (
                        '150 ден.'
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-[#0E5472] pt-2 border-t border-slate-200">
                    <span>Вкупно за плаќање:</span>
                    <span>{grandTotal} ден.</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#218EB9] to-[#389CBF] hover:from-[#1A7C9F] hover:to-[#2B86A9] text-white py-4 rounded-2xl font-bold text-sm shadow-md shadow-[#2B96CB]/20 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Потврди и Испрати Нарачка ({grandTotal} ден.)</span>
                </button>
              </form>
            </div>
          ) : (
            /* Completed Order View */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#2B96CB]">
                  Нарачката е примена!
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                  Ви благодариме, {completedOrder.customerName}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Број на вашата нарачка: <strong className="text-[#0E5472] font-mono text-base">#{completedOrder.id}</strong>
                </p>
              </div>

              <div className="bg-[#F8FBFC] p-5 rounded-2xl border border-[#E1F1F7] text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Град и адреса:</span>
                  <span className="font-bold text-slate-800 text-right">
                    {completedOrder.city}, {completedOrder.address}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Телефон за контакт:</span>
                  <span className="font-bold text-slate-800">{completedOrder.phone}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Начин на плаќање:</span>
                  <span className="font-bold text-slate-800">
                    {completedOrder.paymentMethod === 'cash_on_delivery'
                      ? 'Плаќање во готово при достава'
                      : 'Плаќање со картичка'}
                  </span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-extrabold text-[#0E5472]">
                  <span>Вкупно:</span>
                  <span>{completedOrder.totalPrice} ден.</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Нашиот оператор ќе ве контактира на вашиот телефонски број за потврда пред испраќање на пратката (доставата е за 24-48 часа).
              </p>

              <button
                onClick={handleClose}
                className="bg-[#1E7497] hover:bg-[#14536D] text-white px-8 py-3.5 rounded-2xl font-bold text-xs shadow-md transition-colors"
              >
                Продолжи со купување
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
