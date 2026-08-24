import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Truck,
  Plus,
  Minus,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    siteContent,
    setIsCheckoutOpen,
    setActivePage,
  } = useStore();

  if (!isCartOpen) return null;

  const threshold = siteContent.freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, threshold - cartTotal);
  const progressPercent = Math.min(100, Math.round((cartTotal / threshold) * 100));

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      <div
        id="cart-drawer-backdrop"
        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end"
        onClick={() => setIsCartOpen(false)}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#EBF7FC] text-[#1E7497] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900">
                Вашата кошничка ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
              aria-label="Затвори"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Meter */}
          <div className="p-4 bg-[#F7FAFC] border-b border-slate-200/80">
            <div className="flex items-center justify-between text-xs font-bold text-[#0E5472] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#2B96CB]" />
                {remainingForFreeShipping > 0 ? (
                  <span>
                    Додај уште <strong>{remainingForFreeShipping} ден.</strong> за БЕСПЛАТНА достава
                  </span>
                ) : (
                  <span className="text-emerald-700 font-extrabold">
                    🎉 Честитки! Остваривте БЕСПЛАТНА достава!
                  </span>
                )}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#2B96CB] to-[#5AB8D9] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 divide-y divide-slate-100">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-2xl object-cover border border-slate-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800 line-clamp-2">
                        {item.product.name}
                      </h4>
                      <div className="text-xs font-extrabold text-[#0E5472] mt-1">
                        {item.product.price} ден.
                      </div>
                    </div>

                    {/* Quantity Modifiers */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, -1)}
                          className="px-2 py-1 text-slate-600 hover:text-slate-900 font-bold text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, 1)}
                          className="px-2 py-1 text-slate-600 hover:text-slate-900 font-bold text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                        title="Отстрани"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-slate-400">
                <ShoppingBag className="w-14 h-14 mx-auto text-slate-200 mb-3" />
                <p className="font-bold text-sm text-slate-700">Кошничката е празна</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Разгледајте ја нашата колекција и одберете нешто за вашата убавина.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActivePage('products');
                  }}
                  className="mt-4 bg-[#1E7497] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm"
                >
                  Разгледај каталог
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer / Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-100 space-y-4">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Вкупно производи:</span>
                  <span className="font-bold text-slate-800">{cartTotal} ден.</span>
                </div>
                <div className="flex justify-between">
                  <span>Достава низ Македонија:</span>
                  <span className="font-bold text-slate-800">
                    {cartTotal >= threshold ? (
                      <span className="text-emerald-600">БЕСПЛАТНА</span>
                    ) : (
                      '150 ден.'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Вкупно за плаќање:</span>
                  <span className="text-[#0E5472] text-base">
                    {cartTotal >= threshold ? cartTotal : cartTotal + 150} ден.
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-[#218EB9] to-[#45ACD2] hover:from-[#1A7C9F] hover:to-[#389CBF] text-white py-4 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all group"
              >
                <span>Продолжи кон нарачка</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
