import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { UserAccountModal } from './components/UserAccountModal';
import { Toast } from './components/Toast';
import { WhatsAppButton } from './components/WhatsAppButton';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductDetail } from './pages/ProductDetail';
import { CartPage } from './pages/CartPage';
import { Checkout } from './pages/Checkout';
import { About } from './pages/About';
import { CustomGifts } from './pages/CustomGifts';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { LegalPage } from './pages/LegalPage';

const AppContent: React.FC = () => {
  const { currentPage } = useNavigation();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'inicio':
        return <Home />;
      case 'tienda':
        return <Shop />;
      case 'categorias':
        return <CategoriesPage />;
      case 'producto':
        return <ProductDetail />;
      case 'carrito':
        return <CartPage />;
      case 'checkout':
        return <Checkout />;
      case 'nosotros':
        return <About />;
      case 'personalizados':
        return <CustomGifts />;
      case 'ofertas':
        return <LegalPage type="ofertas" />;
      case 'blog':
        return <Blog />;
      case 'contacto':
        return <Contact />;
      case 'faq':
        return <LegalPage type="faq" />;
      case 'politicas':
        return <LegalPage type="politicas" />;
      case 'terminos':
        return <LegalPage type="terminos" />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F9] text-stone-800 font-sans">
      {/* Primary Header */}
      <Header onOpenUserModal={() => setIsUserModalOpen(true)} />

      {/* Main Dynamic View */}
      <main className="flex-1">{renderCurrentPage()}</main>

      {/* Footer */}
      <Footer />

      {/* Drawers, Modals & Floating Tools */}
      <CartDrawer />
      <WishlistModal />
      <UserAccountModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
      />
      <Toast />
      <WhatsAppButton />
    </div>
  );
};

export default function App() {
  return (
    <NavigationProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </NavigationProvider>
  );
}
