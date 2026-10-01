import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Package, 
  MapPin, 
  Heart, 
  FileText, 
  ShoppingBag, 
  Truck, 
  Trash2, 
  Plus, 
  LogOut, 
  Check, 
  Shield 
} from 'lucide-react';

export const UserAccountModal: React.FC = () => {
  const {
    isAccountModalOpen,
    setIsAccountModalOpen,
    currentUser,
    orders,
    wishlist,
    products,
    formatPrice,
    addToCart,
    toggleWishlist,
    setActiveOrderConfirmation,
    currentRole,
    logout,
    setIsAuthModalOpen,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses'>('orders');

  if (!isAccountModalOpen) return null;

  // Filter orders matching current buyer
  const userOrders = orders;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-60 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E6DECE] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E6DECE] bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#9C4127] text-white flex items-center justify-center font-bold text-sm">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-[#201D1C]">
                {currentUser.name}
              </h3>
              <p className="text-xs text-[#7A6F68]">
                {currentUser.email} · <span className="capitalize font-semibold text-[#9C4127]">{currentRole} Portal</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAccountModalOpen(false)}
            className="p-1.5 text-[#554D47] hover:text-[#201D1C] rounded-full hover:bg-[#F1EAE0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex border-b border-[#E6DECE] bg-[#F1EAE0] px-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'orders' ? 'border-[#9C4127] text-[#9C4127] bg-white' : 'border-transparent text-[#665D56]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Order History ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'wishlist' ? 'border-[#9C4127] text-[#9C4127] bg-white' : 'border-transparent text-[#665D56]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Heritage Wishlist ({wishlistedProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'addresses' ? 'border-[#9C4127] text-[#9C4127] bg-white' : 'border-transparent text-[#665D56]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Saved Addresses</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {userOrders.length === 0 ? (
                <div className="py-12 text-center text-[#7A6F68] text-xs">
                  No orders placed yet.
                </div>
              ) : (
                userOrders.map((ord) => (
                  <div key={ord.id} className="bg-white rounded-xl p-5 border border-[#E0D7C6] shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EBE1] pb-3">
                      <div>
                        <span className="font-mono text-sm font-bold text-[#201D1C]">Order #{ord.id}</span>
                        <p className="text-[11px] text-[#7A6F68] mt-0.5">
                          Placed on {ord.createdAt.substring(0, 10)} · Courier: {ord.courier} ({ord.trackingNumber})
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded ${
                          ord.status === 'Delivered' 
                            ? 'bg-[#2E6F40]/10 text-[#2E6F40]' 
                            : 'bg-[#9C4127]/10 text-[#9C4127]'
                        }`}>
                          {ord.status}
                        </span>

                        <button
                          onClick={() => {
                            setActiveOrderConfirmation(ord);
                            setIsAccountModalOpen(false);
                          }}
                          className="px-3 py-1 bg-[#F1EAE0] hover:bg-[#E8DFC9] text-xs font-medium rounded transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Invoice & Tracking</span>
                        </button>
                      </div>
                    </div>

                    <div className="divide-y divide-[#F0EBE1]">
                      {ord.items.map((it, i) => (
                        <div key={i} className="py-2 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <img src={it.productImage} alt={it.productTitle} className="w-10 h-10 object-cover rounded border border-[#E6DECE]" />
                            <div>
                              <p className="font-semibold text-[#201D1C]">{it.productTitle}</p>
                              <p className="text-[#7A6F68]">Qty: {it.quantity}</p>
                            </div>
                          </div>
                          <span className="font-mono font-semibold">{formatPrice(it.pricePKR * it.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#F0EBE1] flex justify-between items-center text-xs">
                      <span className="text-[#7A6F68]">Payment: {ord.paymentMethod} ({ord.paymentStatus})</span>
                      <span className="font-mono font-bold text-[#9C4127] text-sm">
                        Total: {formatPrice(ord.totalPKR)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              {wishlistedProducts.length === 0 ? (
                <div className="py-12 text-center text-[#7A6F68] text-xs">
                  Your heritage wishlist is currently empty. Click the heart icon on any textile in the catalog.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistedProducts.map((p) => (
                    <div key={p.id} className="bg-white p-4 rounded-xl border border-[#E0D7C6] flex gap-3 shadow-xs">
                      <img src={p.mainImage} alt={p.title} className="w-20 h-20 object-cover rounded-lg border border-[#E6DECE]" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-[#201D1C] line-clamp-1">{p.title}</h4>
                          <p className="text-[11px] text-[#7A6F68]">{p.artisanTown} · {p.technique}</p>
                          <p className="font-mono text-xs font-bold text-[#9C4127] mt-1">{formatPrice(p.pricePKR)}</p>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <button
                            onClick={() => addToCart(p)}
                            className="px-3 py-1 bg-[#9C4127] hover:bg-[#83341E] text-white text-[11px] font-semibold rounded flex items-center gap-1 cursor-pointer"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Add to Bag</span>
                          </button>
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="p-1 text-[#8C827A] hover:text-[#872323] cursor-pointer"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentUser.savedAddresses.map((addr) => (
                  <div key={addr.id} className="bg-white p-4.5 rounded-xl border border-[#E0D7C6] relative space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#201D1C]">{addr.label}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-[#FAF3E8] text-[#872323] px-2 py-0.5 rounded font-mono font-semibold">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#554D47] leading-relaxed">
                      {addr.street}<br/>
                      {addr.city}, {addr.postalCode}<br/>
                      {addr.country}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E6DECE] bg-[#FAF8F5] flex items-center justify-between">
          <button
            onClick={() => {
              setIsAccountModalOpen(false);
              setIsAuthModalOpen(true);
            }}
            className="text-xs text-[#9C4127] hover:underline font-semibold cursor-pointer"
          >
            Switch Account / Portal Mode →
          </button>
          <button
            onClick={() => setIsAccountModalOpen(false)}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#201D1C] hover:bg-[#352F2D] rounded-md transition-colors cursor-pointer"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
