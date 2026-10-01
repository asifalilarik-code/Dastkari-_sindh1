import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Truck, 
  Check, 
  Lock, 
  Clock, 
  Banknote,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { CourierService } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotalPKR,
    formatPrice,
    freeShippingThresholdPKR,
    reservationSecondsLeft,
    createOrder,
    currentUser,
    currentCurrency
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState({
    name: currentUser.name || 'Asif Ali Larik',
    email: currentUser.email || 'asifalilarik51@gmail.com',
    phone: currentUser.phone || '+92 300 8274192',
    street: currentUser.savedAddresses[0]?.street || 'House 42, Street 7, Phase 6, DHA',
    city: currentUser.savedAddresses[0]?.city || 'Karachi',
    postalCode: currentUser.savedAddresses[0]?.postalCode || '75500',
    country: 'Pakistan'
  });

  const [courier, setCourier] = useState<CourierService>('TCS Express');
  const [paymentMethod, setPaymentMethod] = useState<'Stripe Card' | 'JazzCash' | 'EasyPaisa' | 'Cash on Delivery'>('JazzCash');

  // Simulated Payment Form Details
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('892');
  const [mobileWalletNumber, setMobileWalletNumber] = useState('03008274192');

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen || cart.length === 0) return null;

  // Courier Rates
  const courierFees: Record<CourierService, number> = {
    'TCS Express': cartTotalPKR >= freeShippingThresholdPKR ? 0 : 650,
    'Leopards Domestic': cartTotalPKR >= freeShippingThresholdPKR ? 0 : 450,
    'DHL Express Worldwide': 4500
  };

  const activeShippingFee = courierFees[courier];
  const grandTotalPKR = cartTotalPKR + activeShippingFee;

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderItems = cart.map((c) => ({
        productId: c.product.id,
        productTitle: c.product.title,
        productImage: c.product.mainImage,
        pricePKR: c.product.pricePKR,
        quantity: c.quantity
      }));

      createOrder({
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country
        },
        items: orderItems,
        subtotalPKR: cartTotalPKR,
        shippingFeePKR: activeShippingFee,
        totalPKR: grandTotalPKR,
        currencyPaid: currentCurrency,
        paymentMethod,
        paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending Cash Collection' : 'Paid',
        status: 'Pending',
        courier
      });

      setIsSubmitting(false);
      setIsCheckoutOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E6DECE] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header with 10-Minute Lock Status */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DECE] bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-[#9C4127]" />
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-[#201D1C]">
                Artisanal Checkout & Lock
              </h3>
              <p className="text-xs text-[#7A6F68]">
                One-of-a-kind pieces reserved for: <strong className="font-mono text-[#872323]">{formatTimer(reservationSecondsLeft)}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-[#554D47] hover:text-[#201D1C] rounded-full hover:bg-[#F1EAE0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="grid grid-cols-3 border-b border-[#E6DECE] bg-[#F1EAE0] text-xs font-semibold text-center">
          <div className={`py-2.5 transition-colors ${step === 1 ? 'bg-white text-[#9C4127] border-b-2 border-[#9C4127]' : 'text-[#7A6F68]'}`}>
            1. Shipping Address
          </div>
          <div className={`py-2.5 transition-colors ${step === 2 ? 'bg-white text-[#9C4127] border-b-2 border-[#9C4127]' : 'text-[#7A6F68]'}`}>
            2. Courier Dispatch
          </div>
          <div className={`py-2.5 transition-colors ${step === 3 ? 'bg-white text-[#9C4127] border-b-2 border-[#9C4127]' : 'text-[#7A6F68]'}`}>
            3. Payment & Place
          </div>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* STEP 1: SHIPPING INFORMATION */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif-heading text-base font-bold text-[#201D1C]">
                  Delivery Address & Courier SMS Details
                </h4>
                <span className="text-[11px] text-[#7A6F68]">
                  Guest Checkout Enabled
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#9C4127]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">Email (For Invoice PDF)</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#9C4127]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">Mobile / WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#9C4127]"
                  />
                  <span className="text-[10px] text-[#8C827A]">Used for courier OTP & real-time delivery SMS</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">Destination Country</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-white border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#9C4127]"
                  >
                    <option value="Pakistan">Pakistan (Domestic)</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">Street Address, Suite / Apartment</label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full bg-white border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#9C4127]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#9C4127]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-white border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#9C4127]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: COURIER METHOD */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-serif-heading text-base font-bold text-[#201D1C]">
                Select Verified Insured Courier Service
              </h4>
              <p className="text-xs text-[#7A6F68]">
                Every parcel is packaged in breathable organic unbleached cotton pouches with wax seal provenance certificate.
              </p>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setCourier('TCS Express')}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                    courier === 'TCS Express'
                      ? 'border-[#9C4127] bg-[#FAF3E8] shadow-xs'
                      : 'border-[#E0D7C6] bg-white hover:border-[#C59B4D]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-[#9C4127]" />
                    <div>
                      <p className="font-bold text-xs text-[#201D1C]">TCS Express Priority (Next-Day Air / Ground)</p>
                      <p className="text-[11px] text-[#7A6F68]">Overnight to all major Pakistani cities directly from Sindh hubs</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#201D1C]">
                    {courierFees['TCS Express'] === 0 ? 'FREE' : formatPrice(courierFees['TCS Express'])}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setCourier('Leopards Domestic')}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                    courier === 'Leopards Domestic'
                      ? 'border-[#9C4127] bg-[#FAF3E8] shadow-xs'
                      : 'border-[#E0D7C6] bg-white hover:border-[#C59B4D]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-[#1B2B4C]" />
                    <div>
                      <p className="font-bold text-xs text-[#201D1C]">Leopards Courier Service (Standard Domestic)</p>
                      <p className="text-[11px] text-[#7A6F68]">2–3 Business days to urban & rural regions</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#201D1C]">
                    {courierFees['Leopards Domestic'] === 0 ? 'FREE' : formatPrice(courierFees['Leopards Domestic'])}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setCourier('DHL Express Worldwide')}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                    courier === 'DHL Express Worldwide'
                      ? 'border-[#9C4127] bg-[#FAF3E8] shadow-xs'
                      : 'border-[#E0D7C6] bg-white hover:border-[#C59B4D]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-[#872323]" />
                    <div>
                      <p className="font-bold text-xs text-[#201D1C]">DHL Express Worldwide (Air Freight Insured)</p>
                      <p className="text-[11px] text-[#7A6F68]">3–5 Business days to UK, US, UAE, and 120+ countries</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#201D1C]">
                    {formatPrice(courierFees['DHL Express Worldwide'])}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="font-serif-heading text-base font-bold text-[#201D1C]">
                Select Payment Method
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('JazzCash')}
                  className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${
                    paymentMethod === 'JazzCash'
                      ? 'border-[#9C4127] bg-[#FAF3E8] text-[#9C4127] font-semibold'
                      : 'border-[#E0D7C6] bg-white text-[#554D47]'
                  }`}
                >
                  <Smartphone className="w-4 h-4 mx-auto mb-1 text-[#9C4127]" />
                  <span className="text-xs block">JazzCash</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('EasyPaisa')}
                  className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${
                    paymentMethod === 'EasyPaisa'
                      ? 'border-[#2E6F40] bg-[#FAFDF9] text-[#2E6F40] font-semibold'
                      : 'border-[#E0D7C6] bg-white text-[#554D47]'
                  }`}
                >
                  <Smartphone className="w-4 h-4 mx-auto mb-1 text-[#2E6F40]" />
                  <span className="text-xs block">EasyPaisa</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Stripe Card')}
                  className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${
                    paymentMethod === 'Stripe Card'
                      ? 'border-[#1B2B4C] bg-[#F5F8FC] text-[#1B2B4C] font-semibold'
                      : 'border-[#E0D7C6] bg-white text-[#554D47]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1 text-[#1B2B4C]" />
                  <span className="text-xs block">Debit / Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Cash on Delivery')}
                  className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${
                    paymentMethod === 'Cash on Delivery'
                      ? 'border-[#201D1C] bg-[#F1EAE0] text-[#201D1C] font-semibold'
                      : 'border-[#E0D7C6] bg-white text-[#554D47]'
                  }`}
                >
                  <Banknote className="w-4 h-4 mx-auto mb-1 text-[#201D1C]" />
                  <span className="text-xs block">COD (Cash)</span>
                </button>
              </div>

              {/* Dynamic Payment Field Details */}
              <div className="bg-white p-4.5 rounded-xl border border-[#E0D7C6] space-y-3">
                {paymentMethod === 'JazzCash' && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[#9C4127]">
                      JazzCash Mobile Wallet Instant Debit
                    </p>
                    <p className="text-xs text-[#7A6F68]">
                      Enter your JazzCash registered mobile number. You will receive an instant approval MPIN prompt on your handset.
                    </p>
                    <input
                      type="tel"
                      value={mobileWalletNumber}
                      onChange={(e) => setMobileWalletNumber(e.target.value)}
                      placeholder="0300 1234567"
                      className="w-full bg-[#FAF8F5] border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs font-mono"
                    />
                  </div>
                )}

                {paymentMethod === 'EasyPaisa' && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[#2E6F40]">
                      EasyPaisa Direct Checkout
                    </p>
                    <p className="text-xs text-[#7A6F68]">
                      Approve payment in your EasyPaisa app within 5 minutes of placing your order.
                    </p>
                    <input
                      type="tel"
                      value={mobileWalletNumber}
                      onChange={(e) => setMobileWalletNumber(e.target.value)}
                      placeholder="0345 1234567"
                      className="w-full bg-[#FAF8F5] border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs font-mono"
                    />
                  </div>
                )}

                {paymentMethod === 'Stripe Card' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#1B2B4C]">
                      <span>Stripe PCI-DSS Card Verification</span>
                      <span className="text-[11px] text-[#7A6F68]">Visa · Mastercard · Amex</span>
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#554D47] mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#554D47] mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#554D47] mb-1">CVC Code</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Cash on Delivery' && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-[#201D1C]">
                      Cash on Delivery (Pakistan Only)
                    </p>
                    <p className="text-xs text-[#7A6F68]">
                      Pay the courier upon physical delivery at your doorstep. Please have exact cash ready in PKR.
                    </p>
                  </div>
                )}
              </div>

              {/* Order Review Breakdown */}
              <div className="bg-[#FAF3E8] p-4 rounded-xl border border-[#E2D2BC] space-y-2 text-xs">
                <div className="flex justify-between text-[#554D47]">
                  <span>Items Subtotal ({cart.length} textiles)</span>
                  <span className="font-mono font-semibold tabular-nums">{formatPrice(cartTotalPKR)}</span>
                </div>
                <div className="flex justify-between text-[#554D47]">
                  <span>Courier ({courier})</span>
                  <span className="font-mono tabular-nums">{activeShippingFee === 0 ? 'FREE' : formatPrice(activeShippingFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#201D1C] pt-2 border-t border-[#E6DECE]">
                  <span>Total Amount Due</span>
                  <span className="font-mono tabular-nums text-base text-[#9C4127]">{formatPrice(grandTotalPKR)}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className="px-6 py-4 border-t border-[#E6DECE] bg-[#FAF8F5] flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((prev) => (prev - 1) as any)}
              className="px-4 py-2 text-xs font-medium text-[#554D47] hover:text-[#201D1C] flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((prev) => (prev + 1) as any)}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Continue to {step === 1 ? 'Courier Selection' : 'Payment'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Authenticating Order...' : `Confirm & Place Order · ${formatPrice(grandTotalPKR)}`}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
