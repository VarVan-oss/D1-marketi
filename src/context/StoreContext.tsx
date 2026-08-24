import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, Review, SiteContent, Order, CartItem, ToastMessage, ActivePage } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_REVIEWS, INITIAL_SITE_CONTENT } from '../data/initialData';

interface StoreContextType {
  // Navigation & View
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedCategoryFilter: string | null;
  setSelectedCategoryFilter: (catId: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (prod: Product | null) => void;

  // Data
  products: Product[];
  categories: Category[];
  reviews: Review[];
  siteContent: SiteContent;
  orders: Order[];
  
  // Cart & Wishlist
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isProductInWishlist: (productId: string) => boolean;
  cartTotal: number;
  cartCount: number;

  // Checkout
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;

  // Edit / Admin Mode
  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  editingProduct: Product | null;
  setEditingProduct: (prod: Product | null) => void;

  // CRUD Operations
  addProduct: (productData: Omit<Product, 'id' | 'dateAdded' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addCategory: (categoryData: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (categoryId: string) => void;
  updateSiteContent: (content: SiteContent) => void;
  addReview: (reviewData: Omit<Review, 'id' | 'date'>) => void;
  deleteReview: (reviewId: string) => void;
  resetToDefaults: () => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'd1_market_products_v1',
  CATEGORIES: 'd1_market_categories_v1',
  REVIEWS: 'd1_market_reviews_v1',
  SITE_CONTENT: 'd1_market_site_content_v1',
  ORDERS: 'd1_market_orders_v1',
  WISHLIST: 'd1_market_wishlist_v1',
  CART: 'd1_market_cart_v1',
  EDIT_MODE: 'd1_market_edit_mode_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Core Data with LocalStorage Persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SITE_CONTENT);
      return saved ? JSON.parse(saved) : INITIAL_SITE_CONTENT;
    } catch {
      return INITIAL_SITE_CONTENT;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EDIT_MODE);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SITE_CONTENT, JSON.stringify(siteContent));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [siteContent]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EDIT_MODE, String(isEditMode));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [isEditMode]);

  // Toast System
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`„${product.name}“ е додаден во кошничката!`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Производот е отстранет од кошничката.', 'info');
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Отстрането од омилени.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Додадено во листата на омилени ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  const isProductInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `D1-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Нарачката #${newOrder.id} е успешно креирана! Ви благодариме.`, 'success');
    return newOrder;
  };

  // CRUD for Products
  const addProduct = (productData: Omit<Product, 'id' | 'dateAdded' | 'rating' | 'reviewCount'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0],
      rating: 5.0,
      reviewCount: 0,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast('Новиот производ е успешно додаден на сајтот!', 'success');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedProduct?.id === updated.id) {
      setSelectedProduct(updated);
    }
    showToast('Податоците за производот се успешно ажурирани!', 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    if (selectedProduct?.id === productId) {
      setSelectedProduct(null);
    }
    showToast('Производот е избришан.', 'info');
  };

  // CRUD for Categories
  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...categoryData,
      id: `cat-${Date.now()}`,
    };
    setCategories((prev) => [...prev, newCat]);
    showToast('Новата категорија е креирана!', 'success');
  };

  const updateCategory = (updated: Category) => {
    setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    showToast('Категоријата е ажурирана!', 'success');
  };

  const deleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    showToast('Категоријата е избришана.', 'info');
  };

  // Site Content
  const updateSiteContent = (content: SiteContent) => {
    setSiteContent(content);
    showToast('Содржината на сајтот е зачувана!', 'success');
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews((prev) => [newReview, ...prev]);

    // Recalculate product rating if associated with a product
    if (reviewData.productId) {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === reviewData.productId) {
            const productReviews = reviews.filter((r) => r.productId === p.id);
            const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0) + reviewData.rating;
            const count = productReviews.length + 1;
            const newRating = Number((totalRating / count).toFixed(1));
            return { ...p, rating: newRating, reviewCount: count };
          }
          return p;
        })
      );
    }

    showToast('Ви благодариме за вашата рецензија!', 'success');
  };

  const deleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    showToast('Рецензијата е отстранета.', 'info');
  };

  // Reset demo data
  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setReviews(INITIAL_REVIEWS);
    setSiteContent(INITIAL_SITE_CONTENT);
    setOrders([]);
    setCart([]);
    setWishlist([]);
    showToast('Податоците се ресетирани на оригиналната фабричка состојба.', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        setSelectedProduct,
        products,
        categories,
        reviews,
        siteContent,
        orders,
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isProductInWishlist,
        cartTotal,
        cartCount,
        isCheckoutOpen,
        setIsCheckoutOpen,
        placeOrder,
        isEditMode,
        setIsEditMode,
        isAdminModalOpen,
        setIsAdminModalOpen,
        editingProduct,
        setEditingProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        updateSiteContent,
        addReview,
        deleteReview,
        resetToDefaults,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
