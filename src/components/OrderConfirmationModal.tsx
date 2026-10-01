import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  X, 
  Printer, 
  Truck, 
  Package, 
  MapPin, 
  Download, 
  FileText, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const { 
    activeOrderConfirmation, 
    setActiveOrderConfirmation, 
    formatPrice, 
    setIsAccountModalOpen,
    showToast
  } = useApp();

  const [isInvoiceView, setIsInvoiceView] = useState(false);

  if (!activeOrderConfirmation) return null;

  const order = activeOrderConfirmation;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    showToast(`Invoice for Order #${order.id} downloaded.`);
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E6DECE] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DECE] bg-[#FAF8F5]">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-[#2E6F40] flex items-center gap-1 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Order Confirmed & Locked</span>
            </span>
            <span className="text-[#A3968C]">·</span>
            <span className="font-mono font-bold text-[#201D1C]">Order #{order.id}</span>
          </div>

          <button
            onClick={() => setActiveOrderConfirmation(null)}
            className="p-1.5 text-[#554D47] hover:text-[#201D1C] rounded-full hover:bg-[#F1EAE0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          
          {!isInvoiceView ? (
            <>
              {/* Order Placed Success Banner */}
              <div className="text-center space-y-2 pb-2">
                <div className="w-14 h-14 bg-[#2E6F40]/10 text-[#2E6F40] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-heading text-2xl font-bold text-[#201D1C]">
                  Thank You, {order.customerName}
                </h3>
                <p className="text-xs text-[#665D56] max-w-md mx-auto leading-relaxed">
                  Your authentic Sindhi heirloom order has been transmitted directly to our regional artisan cooperative. A confirmation receipt has been sent to <strong className="text-[#201D1C]">{order.customerEmail}</strong>.
                </p>
              </div>

              {/* Airway Bill & Courier Tracking Box */}
              <div className="bg-white p-5 rounded-xl border border-[#E0D7C6] shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EBE1] pb-3">
                  <div>
                    <span className="text-[11px] text-[#7A6F68] uppercase font-mono">Assigned Airway Bill (AWB)</span>
                    <p className="font-mono text-base font-bold text-[#9C4127] mt-0.5">
                      {order.trackingNumber}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-[#FAF3E8] text-[#872323] px-2.5 py-1 rounded font-medium border border-[#E2D2BC]">
                      {order.courier}
                    </span>
                    <button
                      onClick={() => setIsInvoiceView(true)}
                      className="px-3 py-1 text-xs font-medium text-[#4A433F] hover:text-[#201D1C] bg-[#F1EAE0] hover:bg-[#E8DFC9] rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View PDF Invoice</span>
                    </button>
                  </div>
                </div>

                {/* Live Order Tracking Timeline */}
                <div className="space-y-3 pt-1">
                  <h4 className="text-xs font-bold text-[#201D1C] uppercase tracking-wider">
                    Live Dispatch & Packaging Timeline
                  </h4>
                  <div className="relative pl-6 space-y-5 border-l-2 border-[#D8CFBE]">
                    {order.trackingSteps.map((step, idx) => (
                      <div key={idx} className="relative">
                        {/* Dot indicator */}
                        <div className={`absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                          idx === order.trackingSteps.length - 1 ? 'bg-[#9C4127] ring-2 ring-[#9C4127]/20' : 'bg-[#2E6F40]'
                        }`} />
                        <div>
                          <div className="flex items-baseline justify-between text-xs">
                            <span className="font-bold text-[#201D1C]">{step.description}</span>
                            <span className="font-mono text-[11px] text-[#8C827A]">{step.timestamp}</span>
                          </div>
                          <p className="text-[11px] text-[#7A6F68] mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#9C4127]" />
                            <span>{step.location}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Purchased Items List */}
              <div className="bg-white p-5 rounded-xl border border-[#E0D7C6] space-y-3">
                <h4 className="text-xs font-bold text-[#201D1C] uppercase tracking-wider">
                  Itemized Order Receipt
                </h4>
                <div className="divide-y divide-[#F0EBE1]">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.productImage}
                          alt={item.productTitle}
                          className="w-12 h-12 object-cover rounded-lg border border-[#E6DECE]"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#201D1C]">{item.productTitle}</p>
                          <p className="text-[11px] text-[#7A6F68] font-mono">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#201D1C]">
                        {formatPrice(item.pricePKR * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#E6DECE] space-y-1 text-xs text-[#554D47]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono">{formatPrice(order.subtotalPKR)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insured Shipping Fee</span>
                    <span className="font-mono">{order.shippingFeePKR === 0 ? 'FREE' : formatPrice(order.shippingFeePKR)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#201D1C] pt-2 border-t border-[#F0EBE1]">
                    <span>Total ({order.paymentMethod})</span>
                    <span className="font-mono text-[#9C4127]">{formatPrice(order.totalPKR)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address Card */}
              <div className="bg-[#FAF3E8] p-4 rounded-xl border border-[#E2D2BC] text-xs text-[#554D47] flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#9C4127] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#201D1C] block">Shipping Destination:</span>
                  <p>{order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                  <p className="text-[11px] text-[#7A6F68] mt-1">Recipient Phone: {order.customerPhone}</p>
                </div>
              </div>
            </>
          ) : (
            /* Printable PDF Invoice Simulation */
            <div className="bg-white p-8 rounded-xl border border-[#D8CFBE] shadow-md space-y-6 print:border-none print:shadow-none text-xs text-[#201D1C]">
              
              {/* Invoice Header */}
              <div className="flex items-start justify-between border-b border-[#D8CFBE] pb-6">
                <div>
                  <h2 className="font-serif-heading text-2xl font-bold text-[#201D1C]">Dastkari Sindh</h2>
                  <p className="text-[11px] text-[#7A6F68] mt-0.5">Indigenous Artisanal Cooperative & Guild Registry</p>
                  <p className="text-[11px] text-[#7A6F68]">Bhit Shah · Hala · Matiari · Tharparkar, Sindh</p>
                  <p className="text-[11px] text-[#7A6F68]">NTN: 894102-3 · UNESCO Intangible Cultural Heritage Affiliate</p>
                </div>

                <div className="text-right">
                  <span className="font-mono text-sm font-bold text-[#9C4127] block">INVOICE #{order.id}</span>
                  <p className="text-[11px] text-[#7A6F68] mt-1">Date: {order.createdAt.substring(0, 10)}</p>
                  <p className="text-[11px] text-[#7A6F68]">AWB: {order.trackingNumber}</p>
                  <span className="mt-1 inline-block px-2 py-0.5 bg-[#2E6F40]/10 text-[#2E6F40] rounded font-bold uppercase text-[10px]">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Billed To / Shipped To */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="font-bold text-[#7A6F68] uppercase text-[10px] block mb-1">Billed & Delivered To:</span>
                  <p className="font-bold text-sm">{order.customerName}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                  <p>{order.shippingAddress.country}</p>
                  <p className="mt-1 text-[#7A6F68]">Phone: {order.customerPhone}</p>
                </div>

                <div>
                  <span className="font-bold text-[#7A6F68] uppercase text-[10px] block mb-1">Dispatch Logistics:</span>
                  <p><strong>Courier:</strong> {order.courier}</p>
                  <p><strong>Tracking No:</strong> {order.trackingNumber}</p>
                  <p><strong>Payment Mode:</strong> {order.paymentMethod}</p>
                  <p><strong>Guild Guarantee:</strong> 100% Verified Natural Dye</p>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-y border-[#D8CFBE] text-[#7A6F68] text-[10px] uppercase font-mono">
                    <th className="py-2">Item Description</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Unit Price</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EBE1]">
                  {order.items.map((it, i) => (
                    <tr key={i}>
                      <td className="py-3 pr-2">
                        <span className="font-semibold block">{it.productTitle}</span>
                        <span className="text-[10px] text-[#7A6F68]">Authentic Handmade Sindhi Craft</span>
                      </td>
                      <td className="py-3 text-center font-mono">{it.quantity}</td>
                      <td className="py-3 text-right font-mono">{formatPrice(it.pricePKR)}</td>
                      <td className="py-3 text-right font-mono font-semibold">{formatPrice(it.pricePKR * it.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total Calculation */}
              <div className="flex justify-end pt-3">
                <div className="w-64 space-y-1.5 text-right">
                  <div className="flex justify-between text-[#554D47]">
                    <span>Subtotal:</span>
                    <span className="font-mono">{formatPrice(order.subtotalPKR)}</span>
                  </div>
                  <div className="flex justify-between text-[#554D47]">
                    <span>Shipping ({order.courier}):</span>
                    <span className="font-mono">{order.shippingFeePKR === 0 ? 'FREE' : formatPrice(order.shippingFeePKR)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#201D1C] pt-2 border-t border-[#D8CFBE]">
                    <span>Total Amount:</span>
                    <span className="font-mono text-[#9C4127]">{formatPrice(order.totalPKR)}</span>
                  </div>
                </div>
              </div>

              {/* Footer Stamp & Barcode simulation */}
              <div className="pt-6 border-t border-[#D8CFBE] flex items-center justify-between text-[#7A6F68]">
                <div>
                  <p className="font-serif italic text-xs text-[#201D1C]">Dastkari Sindh Artisan Cooperative Seal</p>
                  <p className="text-[10px]">Over 70% of this invoice directly funds the weaver guild families.</p>
                </div>
                <div className="font-mono text-[9px] tracking-widest text-[#201D1C] bg-[#FAF8F5] p-2 border border-[#D8CFBE] rounded">
                  ||| | |||| || ||||| ||| ||||
                  <span className="block text-center mt-0.5">{order.trackingNumber}</span>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setIsInvoiceView(false)}
                  className="px-4 py-2 bg-[#F1EAE0] hover:bg-[#E8DFC9] rounded text-xs font-medium cursor-pointer"
                >
                  ← Back to Tracking View
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={handleDownloadInvoice}
                    className="px-4 py-2 bg-[#FAF8F5] border border-[#D8CFBE] rounded text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-[#201D1C] text-white rounded text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Invoice</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#E6DECE] bg-[#FAF8F5] flex items-center justify-between">
          <button
            onClick={() => {
              setActiveOrderConfirmation(null);
              setIsAccountModalOpen(true);
            }}
            className="text-xs text-[#9C4127] hover:underline font-semibold cursor-pointer"
          >
            View in My Orders History →
          </button>
          <button
            onClick={() => setActiveOrderConfirmation(null)}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-md transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};
