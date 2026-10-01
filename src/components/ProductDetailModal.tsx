import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Product, LightingMode } from '../types';
import { 
  X, 
  ShoppingBag, 
  Heart, 
  Ruler, 
  Sun, 
  Lamp, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  MapPin, 
  RotateCcw,
  CheckCircle2,
  Clock,
  Feather,
  Info,
  Star,
  UserCheck,
  Send
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    setIsScaleModalOpen,
    setIsProcessModalOpen,
    artisans,
    setSelectedArtisan,
    setIsStoriesModalOpen,
    showToast
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lighting, setLighting] = useState<LightingMode>('sunlight');
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Custom commission form modal state if item is limited or customized
  const [isCommissionOpen, setIsCommissionOpen] = useState(false);
  const [commissionForm, setCommissionForm] = useState({
    name: '',
    phone: '',
    notes: 'Please commission a similar authentic piece with the master artisan.'
  });

  if (!selectedProduct) return null;

  const artisan = artisans.find((a) => a.id === selectedProduct.artisanId) || artisans[0];
  const isWishlisted = wishlist.includes(selectedProduct.id);

  const images = [
    selectedProduct.mainImage,
    selectedProduct.secondaryImage,
    selectedProduct.detailImage
  ].filter(Boolean);

  // Mouse move for 4x high-resolution magnifying inspection
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPosition({ x, y });
  };

  // Optical filters for Real-Lighting Photography Toggle
  const getLightingStyle = () => {
    switch (lighting) {
      case 'indoor':
        return 'sepia-[0.25] saturate-[1.15] brightness-[0.98] contrast-[1.02]';
      case 'gallery':
        return 'brightness-[1.04] contrast-[1.05] saturate-[0.95]';
      case 'sunlight':
      default:
        return 'brightness-[1.02] contrast-[1.02]';
    }
  };

  const handleCommissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Custom commission request forwarded to ${artisan.name} in ${artisan.town}. Our guild representative will WhatsApp you shortly.`);
    setIsCommissionOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-5xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E6DECE] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DECE] bg-[#FAF8F5] sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-[#7A6F68]">
            <span className="font-semibold text-[#9C4127] uppercase tracking-wider">{selectedProduct.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#9C4127]" />
              <span>{selectedProduct.artisanTown} Origin</span>
            </span>
          </div>

          <button
            onClick={() => setSelectedProduct(null)}
            className="p-1.5 text-[#554D47] hover:text-[#201D1C] hover:bg-[#F1EAE0] rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* LEFT: Multi-Angle Gallery & 4x Inspection Module (Col 12 -> 7) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Lighting Mode Switcher Bar (Solving Color Accuracy Friction Point) */}
              <div className="flex items-center justify-between bg-[#F1EAE0] p-1.5 rounded-lg border border-[#E0D7C6] text-xs">
                <span className="text-[#6A605A] font-medium pl-2 hidden sm:inline">
                  Lighting Simulation:
                </span>
                <div className="flex items-center gap-1 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setLighting('sunlight')}
                    className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      lighting === 'sunlight' 
                        ? 'bg-white text-[#9C4127] shadow-xs font-semibold' 
                        : 'text-[#6A605A] hover:text-[#201D1C]'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Sunlight 5500K</span>
                  </button>
                  <button
                    onClick={() => setLighting('indoor')}
                    className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      lighting === 'indoor' 
                        ? 'bg-white text-[#9C4127] shadow-xs font-semibold' 
                        : 'text-[#6A605A] hover:text-[#201D1C]'
                    }`}
                  >
                    <Lamp className="w-3.5 h-3.5" />
                    <span>Warm Indoor 2700K</span>
                  </button>
                  <button
                    onClick={() => setLighting('gallery')}
                    className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      lighting === 'gallery' 
                        ? 'bg-white text-[#9C4127] shadow-xs font-semibold' 
                        : 'text-[#6A605A] hover:text-[#201D1C]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Gallery 4000K</span>
                  </button>
                </div>
              </div>

              {/* Main Interactive Stage with 4x Hover Loupe Inspection */}
              <div
                ref={imageContainerRef}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
                className="relative aspect-4/3 sm:aspect-1/1 bg-[#F3EFEA] rounded-xl overflow-hidden border border-[#D8CFBE] cursor-crosshair group select-none"
              >
                <img
                  src={images[activeImageIndex] || selectedProduct.mainImage}
                  alt={selectedProduct.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-all duration-300 ${getLightingStyle()}`}
                />

                {/* Magnifier Loupe Overlay (4x Zoom Inspection for Fabric Grain & Tanka Stitching) */}
                {isZooming && (
                  <div
                    className="pointer-events-none absolute w-48 h-48 rounded-full border-2 border-white shadow-2xl overflow-hidden hidden md:block"
                    style={{
                      left: `calc(${zoomPosition.x}% - 96px)`,
                      top: `calc(${zoomPosition.y}% - 96px)`,
                      backgroundImage: `url(${images[activeImageIndex] || selectedProduct.mainImage})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundSize: '400%',
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                )}

                {/* Visual Scale Button Overlay */}
                <button
                  onClick={() => setIsScaleModalOpen(true)}
                  className="absolute bottom-4 left-4 px-3 py-2 bg-black/75 hover:bg-black/90 text-white rounded-lg text-xs font-medium backdrop-blur-md flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                >
                  <Ruler className="w-4 h-4 text-[#C59B4D]" />
                  <span>Interactive Scale & Bed Sizing</span>
                </button>

                {/* 4x Zoom Instruction Kicker */}
                <div className="absolute top-4 right-4 bg-black/60 text-white text-[10px] font-mono px-2 py-1 rounded backdrop-blur-md hidden sm:block">
                  Hover for 4x Grain Zoom
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 pt-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#9C4127] shadow-sm scale-102'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Angle ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Fabric & Natural Dye Authenticity Certification Box */}
              <div className="bg-[#FAF3E8] border border-[#E2D2BC] rounded-xl p-4.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#872323] uppercase tracking-wide">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Guild Authenticity Guarantee</span>
                  </div>
                  <button
                    onClick={() => setIsProcessModalOpen(true)}
                    className="text-xs text-[#9C4127] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View 14 Stages</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-[#554D47] leading-relaxed">
                  Certified pure natural dye using wild Indigofera tinctoria, madder root, and mineral mordants. Zero synthetic screen-prints, certified by the Sindh Indigenous Artisan Board.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedProduct.dyeIngredients.map((ing, i) => (
                    <span key={i} className="text-[11px] bg-white/80 text-[#5C4F47] px-2 py-0.5 rounded border border-[#E0D2C0]">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT: Contiguous Purchase Module & Artisan Bio (Col 12 -> 5) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                
                {/* Title & Sindhi Name */}
                <div>
                  <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#201D1C] leading-snug">
                    {selectedProduct.title}
                  </h2>
                  <p className="text-sm text-[#9C4127] font-serif italic mt-1" dir="rtl">
                    {selectedProduct.sindhiName}
                  </p>
                  <p className="text-xs text-[#665D56] mt-1 font-medium">
                    {selectedProduct.subtitle}
                  </p>
                </div>

                {/* Price & Stock Status */}
                <div className="flex items-baseline justify-between py-3 border-y border-[#E6DECE]">
                  <div>
                    <span className="text-2xl font-bold font-mono text-[#201D1C] tabular-nums">
                      {formatPrice(selectedProduct.pricePKR)}
                    </span>
                    {selectedProduct.originalPricePKR && (
                      <span className="ml-3 text-sm text-[#998E87] line-through font-mono tabular-nums">
                        {formatPrice(selectedProduct.originalPricePKR)}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-semibold text-[#872323] bg-[#872323]/10 px-2.5 py-1 rounded-md">
                      {selectedProduct.stockQuantity > 0 ? `Only ${selectedProduct.stockQuantity} Remaining` : 'Sold Out'}
                    </span>
                  </div>
                </div>

                {/* Physical Dimensions Summary with Scale Drawer Link */}
                <div className="bg-[#F1EAE0] rounded-lg p-3 text-xs text-[#554D47] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium text-[#201D1C]">Dimensions:</p>
                    <p className="font-mono tabular-nums">
                      {selectedProduct.dimensions.lengthInches}" × {selectedProduct.dimensions.widthInches}" ({selectedProduct.dimensions.lengthCm} × {selectedProduct.dimensions.widthCm} cm)
                    </p>
                  </div>
                  <button
                    onClick={() => setIsScaleModalOpen(true)}
                    className="px-2.5 py-1 text-xs font-medium text-[#9C4127] hover:text-[#83341E] bg-white rounded border border-[#D8CFBE] cursor-pointer flex items-center gap-1"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Scale Guide</span>
                  </button>
                </div>

                {/* Provenance Description */}
                <div>
                  <h4 className="text-xs font-semibold text-[#7A6F68] uppercase tracking-wider">Provenance & Lore</h4>
                  <p className="text-xs sm:text-sm text-[#554D47] mt-1.5 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                  <p className="text-xs text-[#7A6F68] mt-2 italic border-l-2 border-[#C59B4D] pl-3">
                    {selectedProduct.provenanceDetails}
                  </p>
                </div>

                {/* Artisan Profile Card (Cultural Authenticity Requirement) */}
                <div className="bg-white rounded-xl p-4 border border-[#E0D7C6] shadow-xs space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={artisan.avatarUrl}
                      alt={artisan.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border border-[#C59B4D]"
                    />
                    <div>
                      <h4 className="font-serif-heading text-sm font-bold text-[#201D1C]">
                        {artisan.name}
                      </h4>
                      <p className="text-[11px] text-[#7A6F68]">
                        {artisan.generationCount}th Generation · {artisan.town}, Sindh
                      </p>
                      <p className="text-[11px] text-[#9C4127] font-semibold mt-0.5">
                        {artisan.cooperativeSharePercentage}% Direct Guild Payout
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-[#665D56] italic">
                    "{artisan.quote}"
                  </p>
                  <button
                    onClick={() => {
                      setSelectedArtisan(artisan);
                      setIsStoriesModalOpen(true);
                    }}
                    className="text-xs text-[#9C4127] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read {artisan.name}'s Heritage Story</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Care Instructions Accordion Preview */}
                <div className="text-xs text-[#665D56] bg-[#FAF8F5] border border-[#E6DECE] rounded-lg p-3">
                  <span className="font-semibold text-[#201D1C] block mb-1">Textile Care:</span>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {selectedProduct.careInstructions.map((care, i) => (
                      <li key={i}>{care}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action Buttons: Add to Bag or Commission Custom Piece */}
              <div className="space-y-2 pt-2 border-t border-[#E6DECE]">
                {selectedProduct.stockQuantity > 0 ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 py-3 px-4 text-sm font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag · {formatPrice(selectedProduct.pricePKR)}</span>
                    </button>
                    
                    <button
                      onClick={() => toggleWishlist(selectedProduct.id)}
                      className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                        isWishlisted
                          ? 'border-[#872323] bg-[#872323] text-white'
                          : 'border-[#D8CFBE] bg-white text-[#4A433F] hover:bg-[#F1EAE0]'
                      }`}
                      title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                      aria-label="Wishlist toggle"
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => setIsCommissionOpen(true)}
                      className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#1B2B4C] hover:bg-[#15233E] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Feather className="w-4 h-4 text-[#C59B4D]" />
                      <span>Request Similar Custom Piece</span>
                    </button>
                    <p className="text-[11px] text-center text-[#7A6F68]">
                      Commissioned directly with master artisan ({artisan.town}). Approx 3–4 weeks crafting.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Customer Reviews Section */}
          <div className="mt-12 pt-8 border-t border-[#E6DECE]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif-heading text-xl font-bold text-[#201D1C]">
                  Patron Reviews & Proof of Craft
                </h3>
                <p className="text-xs text-[#7A6F68] mt-0.5">
                  Verified reviews from collectors worldwide ({selectedProduct.reviewCount} total ratings)
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-[#FAF3E8] px-3 py-1.5 rounded-lg border border-[#E2D2BC]">
                <Star className="w-4 h-4 fill-[#C59B4D] text-[#C59B4D]" />
                <span className="font-mono font-bold text-sm text-[#201D1C] tabular-nums">
                  {selectedProduct.rating.toFixed(1)} / 5.0
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedProduct.reviews.map((rev) => (
                <div key={rev.id} className="bg-white p-4.5 rounded-xl border border-[#E4DDD0] space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#201D1C] flex items-center gap-1.5">
                        <span>{rev.userName}</span>
                        {rev.verifiedBuyer && (
                          <span className="text-[10px] text-[#1B2B4C] font-semibold flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3 text-[#1B2B4C]" />
                            <span>Verified Buyer</span>
                          </span>
                        )}
                      </p>
                      <p className="text-[11px] text-[#8C827A]">{rev.userCity}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#C59B4D] text-[#C59B4D]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#554D47] leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Custom Piece Commission Modal */}
      {isCommissionOpen && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 border border-[#E6DECE] shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-heading text-lg font-bold text-[#201D1C]">
                Commission Similar Piece
              </h3>
              <button
                onClick={() => setIsCommissionOpen(false)}
                className="text-[#7A6F68] hover:text-[#201D1C] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-[#665D56]">
              Because genuine Ajrak and Rilli are handcrafted in small artisanal batches, we connect you directly with <strong>{artisan.name}</strong> to craft a piece matching these dimensions and motifs.
            </p>
            <form onSubmit={handleCommissionSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#4A433F] mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={commissionForm.name}
                  onChange={(e) => setCommissionForm({ ...commissionForm, name: e.target.value })}
                  placeholder="e.g. Asif Ali"
                  className="w-full bg-[#FAF8F5] border border-[#D8CFBE] rounded-md px-3 py-2 text-xs focus:outline-none focus:border-[#9C4127]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4A433F] mb-1">Phone / WhatsApp (For Craft Updates)</label>
                <input
                  type="tel"
                  required
                  value={commissionForm.phone}
                  onChange={(e) => setCommissionForm({ ...commissionForm, phone: e.target.value })}
                  placeholder="+92 300 1234567"
                  className="w-full bg-[#FAF8F5] border border-[#D8CFBE] rounded-md px-3 py-2 text-xs focus:outline-none focus:border-[#9C4127]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4A433F] mb-1">Custom Requests / Dimensions</label>
                <textarea
                  rows={3}
                  value={commissionForm.notes}
                  onChange={(e) => setCommissionForm({ ...commissionForm, notes: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#D8CFBE] rounded-md px-3 py-2 text-xs focus:outline-none focus:border-[#9C4127]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCommissionOpen(false)}
                  className="px-4 py-2 text-xs text-[#554D47] hover:bg-[#F1EAE0] rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Commission</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
