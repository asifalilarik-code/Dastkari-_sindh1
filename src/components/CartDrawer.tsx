import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Clock, 
  Truck, 
  ShieldCheck 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotalPKR,
    cartItemCount,
    formatPrice,
    freeShippingThresholdPKR,
    reservationSecondsLeft,
    setIsCheckoutOpen
  } = useApp();

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(
    100,
    Math.round((cartTotalPKR / freeShippingThresholdPKR) * 100)
  );

  const amountRemainingForFreeShipping = Math.max(
    0,
    freeShippingThresholdPKR - cartTotalPKR
  );

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-Over Drawer Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E6DECE] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E6DECE] flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#9C4127]" />
              <h3 className="font-serif-heading text-xl font-bold text-[#201D1C]">
                Your Heritage Bag
              </h3>
              <span className="text-xs bg-[#F1EAE0] px-2 py-0.5 rounded font-mono text-[#554D47]">
                {cartItemCount}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#554D47] hover:text-[#201D1C] hover:bg-[#F1EAE0] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Real-Time Stock Reservation Banner (Friction point 5) */}
          {cart.length > 0 && (
            <div className="bg-[#FAF3E8] px-6 py-2.5 border-b border-[#E2D2BC] flex items-center justify-between text-xs text-[#872323]">
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-[#872323] animate-pulse" />
                <span>Reserved exclusively for:</span>
              </div>
              <span className="font-mono font-bold text-sm tabular-nums">
                {formatTimer(reservationSecondsLeft)}
              </span>
            </div>
          )}

          {/* Free Shipping Threshold Progress Meter */}
          {cart.length > 0 && (
            <div className="px-6 py-3 bg-[#F1EAE0] border-b border-[#E6DECE] text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[#554D47]">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#9C4127]" />
                  {amountRemainingForFreeShipping === 0 ? (
                    <strong className="text-[#201D1C]">Unlocked: Free Insured Domestic Shipping!</strong>
                  ) : (
                    <span>Add <strong>{formatPrice(amountRemainingForFreeShipping)}</strong> for free shipping</span>
                  )}
                </span>
                <span className="font-mono">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-[#E0D7C6] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#9C4127] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 bg-[#F1EAE0] rounded-full flex items-center justify-center mx-auto text-[#8C827A]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif-heading text-lg font-bold text-[#201D1C]">Your Bag is Empty</h4>
                <p className="text-xs text-[#7A6F68] max-w-xs mx-auto">
                  Explore our curated collections of authentic 14-stage Ajraks and hand-stitched Tuk Rillis.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-5 py-2 text-xs font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-md transition-colors cursor-pointer"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-[#E4DDD0] shadow-xs"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.mainImage}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover rounded-lg bg-[#F3EFEA] border border-[#E6DECE]"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-[#201D1C] line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#998E87] hover:text-[#872323] transition-colors p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <p className="text-[11px] text-[#7A6F68] mt-0.5">
                        {item.product.artisanTown} · {item.product.technique}
                      </p>
                      
                      <p className="font-mono text-xs font-semibold text-[#201D1C] mt-1 tabular-nums">
                        {formatPrice(item.product.pricePKR)}
                      </p>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#F0EBE1]">
                      <div className="flex items-center gap-2 bg-[#F1EAE0] rounded-md p-0.5 border border-[#D8CFBE]">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center text-[#554D47] hover:text-[#201D1C] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-semibold px-1 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-[#554D47] hover:text-[#201D1C] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-xs font-bold text-[#9C4127] tabular-nums">
                        {formatPrice(item.product.pricePKR * item.quantity)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Actions */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E6DECE] bg-[#FAF8F5] space-y-4">
              
              {/* Summary line */}
              <div className="space-y-1.5 text-xs text-[#554D47]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-[#201D1C] tabular-nums">
                    {formatPrice(cartTotalPKR)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Courier Shipping</span>
                  <span className="font-mono tabular-nums text-[#201D1C]">
                    {amountRemainingForFreeShipping === 0 ? 'FREE' : formatPrice(650)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline pt-2 border-t border-[#E6DECE]">
                <div>
                  <span className="text-xs font-bold uppercase text-[#7A6F68] block">Estimated Total</span>
                  <span className="text-[11px] text-[#998E87]">Includes artisan guild packaging</span>
                </div>
                <span className="font-mono text-xl font-bold text-[#201D1C] tabular-nums">
                  {formatPrice(cartTotalPKR + (amountRemainingForFreeShipping === 0 ? 0 : 650))}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 text-sm font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Proceed to Authentic Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7A6F68]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E6F40]" />
                <span>Direct Artisan Guarantee · Encrypted Checkout</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
