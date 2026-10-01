import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { CraftJournal } from './components/CraftJournal';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { VisualScaleModal } from './components/VisualScaleModal';
import { HeritageProcessModal } from './components/HeritageProcessModal';
import { ArtisanStoriesModal } from './components/ArtisanStoriesModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { AuthModal } from './components/AuthModal';
import { UserAccountModal } from './components/UserAccountModal';
import { AdminDashboard } from './components/AdminDashboard';
import { CheckCircle2, Shield, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentRole, setCurrentRole, toastMessage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#201D1C]">
      
      {/* Role Banner if currently in Admin or Artisan mode */}
      {currentRole !== 'buyer' && (
        <div className={`py-2 px-4 text-xs font-semibold flex items-center justify-between text-white ${
          currentRole === 'admin' ? 'bg-[#9C4127]' : 'bg-[#1B2B4C]'
        }`}>
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>
                You are viewing the platform as: <strong className="uppercase">{currentRole}</strong> (Live Interactive Console Active)
              </span>
            </span>
            <button
              onClick={() => setCurrentRole('buyer')}
              className="bg-white/20 hover:bg-white/30 px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer"
            >
              Switch Back to Buyer Storefront
            </button>
          </div>
        </div>
      )}

      {/* Main Header */}
      <Header />

      {/* Admin Dashboard if Admin role is selected */}
      {currentRole === 'admin' && <AdminDashboard />}

      {/* Main Storefront Experience */}
      <main className="flex-1">
        <Hero />
        <Catalog />
        <CraftJournal />
      </main>

      {/* Cultural Footer */}
      <Footer />

      {/* Modals & Slide-Overs */}
      <ProductDetailModal />
      <VisualScaleModal />
      <HeritageProcessModal />
      <ArtisanStoriesModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <AuthModal />
      <UserAccountModal />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-70 bg-[#201D1C] text-white px-4 py-3 rounded-xl shadow-2xl border border-[#4A433F] flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#C59B4D] shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
