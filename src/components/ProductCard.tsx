import React from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { Heart, ShoppingBag, Eye, Star, Edit3, Trash2, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit }) => {
  const {
    addToCart,
    toggleWishlist,
    isProductInWishlist,
    setSelectedProduct,
    isEditMode,
    deleteProduct,
    categories,
  } = useStore();

  const isFavorite = isProductInWishlist(product.id);
  const categoryName = categories.find((c) => c.id === product.categoryId)?.name || 'Козметика';

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Дали сте сигурни дека сакате да го избришете производот „${product.name}“?`)) {
      deleteProduct(product.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-3xl p-4 border border-slate-200/80 hover:border-[#2B96CB] shadow-2xs hover:shadow-xl hover:shadow-[#2B96CB]/10 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5"
    >
      {/* Edit Mode Controls Overlay */}
      {isEditMode && (
        <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 bg-amber-500/90 backdrop-blur-md p-1.5 rounded-2xl shadow-md">
          <button
            onClick={handleEdit}
            className="p-1.5 bg-white text-amber-900 hover:bg-amber-100 rounded-xl transition-colors text-xs font-bold"
            title="Уреди производ"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 bg-rose-600 text-white hover:bg-rose-700 rounded-xl transition-colors text-xs"
            title="Избриши производ"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Image Container with Badges */}
      <div
        className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 cursor-pointer mb-3.5"
        onClick={() => setSelectedProduct(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transform group-hover:scale-106 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discountPercent && product.discountPercent > 0 ? (
            <span className="bg-[#FF7F50] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-2xs tracking-tight">
              -{product.discountPercent}%
            </span>
          ) : null}
          {product.isNew && (
            <span className="bg-[#2B96CB] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs uppercase tracking-wide">
              Ново
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isFavorite
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/90 hover:bg-white text-slate-600 hover:text-rose-500 shadow-2xs backdrop-blur-xs border border-white'
          }`}
          aria-label="Омилено"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex justify-center z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="w-full bg-white/95 backdrop-blur-md text-[#0E5472] hover:bg-[#0E5472] hover:text-white py-2 rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5 border border-slate-100"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Брз преглед</span>
          </button>
        </div>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider">
            Распродадено
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Brand */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1">
            <span className="uppercase tracking-wider text-[#2B96CB] font-bold">{categoryName}</span>
            {product.brand && <span className="text-slate-400 font-medium">{product.brand}</span>}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="font-bold text-sm sm:text-base text-slate-800 hover:text-[#1E7497] cursor-pointer line-clamp-2 transition-colors min-h-[2.5rem]"
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5 mb-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-slate-700">{product.rating}</span>
            <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
            {product.volumeOrWeight && (
              <span className="text-[11px] text-slate-500 ml-auto bg-slate-100 px-2 py-0.5 rounded-lg font-medium">
                {product.volumeOrWeight}
              </span>
            )}
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between mt-1">
          <div>
            <div className="text-base sm:text-lg font-extrabold text-[#0E5472] tracking-tight">
              {product.price} <span className="text-xs font-bold">ден.</span>
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs text-slate-400 line-through">
                {product.originalPrice} ден.
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
            className="bg-[#EBF7FC] hover:bg-[#2B96CB] text-[#0E5472] hover:text-white px-3.5 py-2.5 rounded-2xl font-bold text-xs transition-all duration-300 shadow-2xs hover:shadow-md flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed group/btn border border-[#BCE1F1] hover:border-[#2B96CB]"
            title="Додај во кошничка"
          >
            <ShoppingBag className="w-4 h-4 text-[#1E7497] group-hover/btn:text-white transition-colors" />
            <span className="hidden sm:inline">Додај</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
