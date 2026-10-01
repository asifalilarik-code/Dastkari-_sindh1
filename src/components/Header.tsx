import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  Globe, 
  ShieldCheck, 
  Sparkles,
  Layers,
  BookOpen,
  Menu,
  X
} from 'lucide-react';
import { CurrencyCode, UserRole } from '../types';

export const Header: React.FC = () => {
  const {
    currentCurrency,
    setCurrentCurrency,
    cartItemCount,
    setIsCartOpen,
    wishlist,
    setIsAccountModalOpen,
    setIsAuthModalOpen,
    setIsProcessModalOpen,
    setIsStoriesModalOpen,
    currentRole,
    setCurrentRole,
    searchQuery,
    setSearchQuery,
    reservationSecondsLeft
  } = useApp();

  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const currencies: { code: CurrencyCode; label: string; flag: string }[] = [
    { code: 'PKR', label: 'PKR (₨)', flag: '🇵🇰' },
    { code: 'USD', label: 'USD ($)', flag: '🇺🇸' },
    { code: 'GBP', label: 'GBP (£)', flag: '🇬🇧' },
    { code: 'EUR', label: 'EUR (€)', flag: '🇪🇺' },
    { code: 'AED', label: 'AED (د.إ)', flag: '🇦🇪' }
  ];

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top micro-announcement banner */}
      <div className="bg-[#201D1C] text-[#E8DFD3] text-xs py-1.5 px-4 text-center tracking-wide border-b border-[#352F2D] flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C59B4D] animate-pulse"></span>
          <span>Preserving 4,000 Years of Indus Craft</span>
        </span>
        <span className="text-[#8E837D] hidden sm:inline">·</span>
        <span className="text-[#D8CFBE] hidden sm:inline">Direct Guild Payout: 70%+ to Artisans</span>
        <span className="text-[#8E837D] hidden md:inline">·</span>
        <span className="text-[#D8CFBE] hidden md:inline">Insured Worldwide Courier (TCS / DHL)</span>
      </div>

      {/* Main Navigation (Adheres strictly to the 3-Zone Top Bar Contract) */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E6DECE] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* ZONE 1: Brand Wordmark (Single text element in high-character display face) */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group focus:outline-none"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-serif-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#201D1C] group-hover:text-[#9C4127] transition-colors">
                  Dastkari Sindh
                </span>
                <span className="text-xs text-[#9C4127] font-medium font-serif italic tracking-wider hidden sm:inline">
                  دستڪاري سنڌ
                </span>
              </div>
            </button>
          </div>

          {/* ZONE 2: 4 Clean Nav Links (Single line, text with subtle hover effect) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#4A433F]">
            <button 
              onClick={() => scrollToSection('heritage-collections')}
              className="hover:text-[#9C4127] transition-colors whitespace-nowrap cursor-pointer"
            >
              Heritage Collections
            </button>
            <button 
              onClick={() => setIsStoriesModalOpen(true)}
              className="hover:text-[#9C4127] transition-colors whitespace-nowrap cursor-pointer"
            >
              Artisan Guilds
            </button>
            <button 
              onClick={() => setIsProcessModalOpen(true)}
              className="hover:text-[#9C4127] transition-colors whitespace-nowrap cursor-pointer"
            >
              14-Stage Dye Craft
            </button>
            <button 
              onClick={() => scrollToSection('craft-journal')}
              className="hover:text-[#9C4127] transition-colors whitespace-nowrap cursor-pointer"
            >
              Documentary Journal
            </button>
          </nav>

          {/* ZONE 3: 1-2 Primary Action Groups (Currency, Search, Wishlist, Bag, Role/Account) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Currency Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#4A433F] hover:text-[#201D1C] bg-[#F1EAE0] hover:bg-[#E8DFC9] rounded-md transition-colors whitespace-nowrap cursor-pointer"
                title="Change currency"
                aria-label="Currency Selector"
              >
                <Globe className="w-3.5 h-3.5 text-[#9C4127]" />
                <span className="font-mono">{currentCurrency}</span>
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-[#E0D7C6] rounded-lg shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-[#8C827A] uppercase tracking-wider border-b border-[#F0EBE1]">
                    Select Currency
                  </div>
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        setCurrentCurrency(curr.code);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#FAF6F0] transition-colors cursor-pointer ${
                        currentCurrency === curr.code ? 'font-semibold text-[#9C4127] bg-[#FDF9F3]' : 'text-[#3E3834]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{curr.flag}</span>
                        <span>{curr.label}</span>
                      </span>
                      {currentCurrency === curr.code && <span className="text-[#9C4127]">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#4A433F] hover:text-[#9C4127] hover:bg-[#F1EAE0] rounded-md transition-colors cursor-pointer"
              title="Search catalog"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="p-2 text-[#4A433F] hover:text-[#9C4127] hover:bg-[#F1EAE0] rounded-md transition-colors relative cursor-pointer"
              title="View wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4.5 h-4.5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#872323] text-white text-[10px] font-semibold flex items-center justify-center rounded-full font-mono">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-md transition-colors shadow-xs whitespace-nowrap cursor-pointer group"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-105" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-[#FAF8F5]/25 px-1.5 py-0.5 rounded text-[11px] font-mono">
                {cartItemCount}
              </span>
            </button>

            {/* Role Switcher & Account Profile */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className={`p-1.5 rounded-md border flex items-center gap-1.5 transition-colors cursor-pointer text-xs ${
                  currentRole === 'admin'
                    ? 'border-[#9C4127] bg-[#9C4127]/10 text-[#9C4127]'
                    : currentRole === 'artisan'
                    ? 'border-[#1B2B4C] bg-[#1B2B4C]/10 text-[#1B2B4C]'
                    : 'border-[#E0D7C6] bg-[#F1EAE0] text-[#4A433F] hover:text-[#201D1C]'
                }`}
                title="Account & Role Switcher"
              >
                <User className="w-4 h-4" />
                <span className="capitalize font-medium hidden md:inline text-[11px]">
                  {currentRole}
                </span>
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E0D7C6] rounded-lg shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 border-b border-[#F0EBE1]">
                    <p className="text-[11px] font-semibold text-[#8C827A] uppercase tracking-wider">
                      Active User View
                    </p>
                    <p className="text-xs text-[#201D1C] font-medium mt-0.5 truncate">
                      {currentRole === 'admin' ? 'Admin / Guild Manager' : currentRole === 'artisan' ? 'Master Artisan View' : 'Buyer (Patron)'}
                    </p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setCurrentRole('buyer');
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#FAF6F0] cursor-pointer ${
                        currentRole === 'buyer' ? 'font-semibold text-[#9C4127] bg-[#FDF9F3]' : 'text-[#3E3834]'
                      }`}
                    >
                      <span>Buyer Portal (Patron)</span>
                      {currentRole === 'buyer' && <span className="text-[#9C4127]">✓</span>}
                    </button>
                    <button
                      onClick={() => {
                        setCurrentRole('admin');
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#FAF6F0] cursor-pointer ${
                        currentRole === 'admin' ? 'font-semibold text-[#9C4127] bg-[#FDF9F3]' : 'text-[#3E3834]'
                      }`}
                    >
                      <span>Admin & Catalog Console</span>
                      {currentRole === 'admin' && <span className="text-[#9C4127]">✓</span>}
                    </button>
                    <button
                      onClick={() => {
                        setCurrentRole('artisan');
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#FAF6F0] cursor-pointer ${
                        currentRole === 'artisan' ? 'font-semibold text-[#9C4127] bg-[#FDF9F3]' : 'text-[#3E3834]'
                      }`}
                    >
                      <span>Artisan / Vendor Guild View</span>
                      {currentRole === 'artisan' && <span className="text-[#9C4127]">✓</span>}
                    </button>
                  </div>

                  <div className="border-t border-[#F0EBE1] pt-1 mt-1">
                    <button
                      onClick={() => {
                        setIsRoleDropdownOpen(false);
                        setIsAccountModalOpen(true);
                      }}
                      className="w-full px-3 py-1.5 text-left text-xs text-[#4A433F] hover:bg-[#FAF6F0] flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>My Orders & Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsRoleDropdownOpen(false);
                        setIsAuthModalOpen(true);
                      }}
                      className="w-full px-3 py-1.5 text-left text-xs text-[#9C4127] hover:bg-[#FAF6F0] flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Switch Account / Phone OTP</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#4A433F] hover:text-[#201D1C] rounded-md cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Live Search Bar Overlay if toggled */}
        {isSearchOpen && (
          <div className="bg-[#FAF8F5] border-t border-[#E6DECE] px-4 py-3 animate-in fade-in duration-150">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-[#8C827A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search authentic crafts (e.g., Teli Ajrak, Tuk Rilli, Bhit Shah, Hala pottery)..."
                className="w-full bg-transparent text-sm text-[#201D1C] placeholder-[#8C827A] focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-[#8C827A] hover:text-[#201D1C] cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-[#8C827A] hover:text-[#201D1C] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-t border-[#E6DECE] px-6 py-4 space-y-3 animate-in slide-in-from-top-4 duration-200">
            <button
              onClick={() => scrollToSection('heritage-collections')}
              className="block w-full text-left py-2 text-sm font-medium text-[#201D1C] hover:text-[#9C4127]"
            >
              Heritage Collections
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsStoriesModalOpen(true);
              }}
              className="block w-full text-left py-2 text-sm font-medium text-[#201D1C] hover:text-[#9C4127]"
            >
              Artisan Guilds
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsProcessModalOpen(true);
              }}
              className="block w-full text-left py-2 text-sm font-medium text-[#201D1C] hover:text-[#9C4127]"
            >
              14-Stage Natural Dye Craft
            </button>
            <button
              onClick={() => scrollToSection('craft-journal')}
              className="block w-full text-left py-2 text-sm font-medium text-[#201D1C] hover:text-[#9C4127]"
            >
              Documentary Journal
            </button>
            <div className="pt-2 border-t border-[#E6DECE] flex justify-between items-center text-xs text-[#6A605A]">
              <span>Active Role: <strong className="capitalize text-[#201D1C]">{currentRole}</strong></span>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="text-[#9C4127] font-semibold"
              >
                Change Role
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
