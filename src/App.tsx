import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { ToastContainer } from './components/ToastContainer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryList } from './components/CategoryList';
import { ProductGrid } from './components/ProductGrid';
import { WhyUs } from './components/WhyUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanel } from './components/AdminPanel';
import { ProductEditModal } from './components/ProductEditModal';
import { motion, AnimatePresence } from 'motion/react';

const MainContent: React.FC = () => {
  const {
    activePage,
    editingProduct,
    setEditingProduct,
    isEditMode,
  } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC] text-slate-800 selection:bg-[#AEE3F0] selection:text-[#0F3C4C]">
      {/* Toast notifications */}
      <ToastContainer />

      {/* Main Header navigation */}
      <Header />

      {/* Dynamic Page Views */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Hero />
              <CategoryList />
              <ProductGrid />
              <WhyUs />
              <TestimonialsSection />
              <Newsletter />
              <AboutSection />
              <ContactSection />
            </motion.div>
          )}

          {activePage === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pt-6"
            >
              <CategoryList />
              <ProductGrid />
              <Newsletter />
            </motion.div>
          )}

          {activePage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pt-4"
            >
              <AboutSection />
              <WhyUs />
              <TestimonialsSection />
            </motion.div>
          )}

          {activePage === 'reviews' && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pt-4"
            >
              <TestimonialsSection />
              <WhyUs />
            </motion.div>
          )}

          {activePage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pt-4"
            >
              <ContactSection />
              <WhyUs />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <AdminPanel />

      {/* Product Edit / Create Modal */}
      {editingProduct !== undefined && (
        <ProductEditModal
          product={editingProduct}
          isOpen={editingProduct !== undefined}
          onClose={() => setEditingProduct(undefined)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
