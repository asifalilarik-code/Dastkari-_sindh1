import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Ruler, Bed, User, Frame, Sparkles, Check } from 'lucide-react';

export const VisualScaleModal: React.FC = () => {
  const { selectedProduct, isScaleModalOpen, setIsScaleModalOpen } = useApp();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [scene, setScene] = useState<'bed' | 'body' | 'wall'>('bed');
  const [bedSize, setBedSize] = useState<'single' | 'queen' | 'king'>('queen');

  if (!isScaleModalOpen || !selectedProduct) return null;

  const { dimensions } = selectedProduct;

  const bedDimensions = {
    single: { wInches: 38, lInches: 75, wCm: 97, lCm: 191, label: 'Single / Twin Bed' },
    queen: { wInches: 60, lInches: 80, wCm: 152, lCm: 203, label: 'Queen Bed' },
    king: { wInches: 76, lInches: 80, wCm: 193, lCm: 203, label: 'King Bed' }
  };

  const activeBed = bedDimensions[bedSize];

  return (
    <div className="fixed inset-0 z-60 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E6DECE] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DECE] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#9C4127]" />
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-[#201D1C]">
                Interactive Scale & Fit Inspector
              </h3>
              <p className="text-xs text-[#7A6F68]">
                Real-world scale comparison for <strong className="text-[#201D1C]">{selectedProduct.title}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsScaleModalOpen(false)}
            className="p-1.5 text-[#554D47] hover:text-[#201D1C] rounded-full hover:bg-[#F1EAE0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Controls: Unit toggle & Scene selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-[#F1EAE0] p-3 rounded-xl border border-[#E0D7C6]">
            
            {/* Scene Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-[#665D56] mr-1 hidden sm:inline">Reference:</span>
              <button
                onClick={() => setScene('bed')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  scene === 'bed'
                    ? 'bg-white text-[#9C4127] shadow-xs font-semibold'
                    : 'text-[#554D47] hover:text-[#201D1C]'
                }`}
              >
                <Bed className="w-3.5 h-3.5" />
                <span>Bed Sizing</span>
              </button>
              <button
                onClick={() => setScene('body')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  scene === 'body'
                    ? 'bg-white text-[#9C4127] shadow-xs font-semibold'
                    : 'text-[#554D47] hover:text-[#201D1C]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Human Drape</span>
              </button>
              <button
                onClick={() => setScene('wall')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  scene === 'wall'
                    ? 'bg-white text-[#9C4127] shadow-xs font-semibold'
                    : 'text-[#554D47] hover:text-[#201D1C]'
                }`}
              >
                <Frame className="w-3.5 h-3.5" />
                <span>Wall & Sofa Scale</span>
              </button>
            </div>

            {/* Metric / Imperial Unit Toggle */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-[#D8CFBE] text-xs">
              <button
                onClick={() => setUnit('inches')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  unit === 'inches' ? 'bg-[#201D1C] text-white font-medium' : 'text-[#665D56]'
                }`}
              >
                Inches (in)
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  unit === 'cm' ? 'bg-[#201D1C] text-white font-medium' : 'text-[#665D56]'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>

          </div>

          {/* Dimension Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-white p-3 rounded-lg border border-[#E0D7C6]">
              <p className="text-[11px] text-[#7A6F68] uppercase font-mono">Length</p>
              <p className="font-mono text-base font-bold text-[#201D1C] mt-0.5">
                {unit === 'inches' ? `${dimensions.lengthInches} in` : `${dimensions.lengthCm} cm`}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-[#E0D7C6]">
              <p className="text-[11px] text-[#7A6F68] uppercase font-mono">Width</p>
              <p className="font-mono text-base font-bold text-[#201D1C] mt-0.5">
                {unit === 'inches' ? `${dimensions.widthInches} in` : `${dimensions.widthCm} cm`}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-[#E0D7C6]">
              <p className="text-[11px] text-[#7A6F68] uppercase font-mono">Total Area</p>
              <p className="font-mono text-base font-bold text-[#201D1C] mt-0.5">
                {unit === 'inches' 
                  ? `${Math.round((dimensions.lengthInches * dimensions.widthInches) / 144)} sq ft` 
                  : `${((dimensions.lengthCm * dimensions.widthCm) / 10000).toFixed(2)} m²`}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-[#E0D7C6]">
              <p className="text-[11px] text-[#7A6F68] uppercase font-mono">Net Weight</p>
              <p className="font-mono text-base font-bold text-[#201D1C] mt-0.5">
                {dimensions.weightGrams >= 1000 
                  ? `${(dimensions.weightGrams / 1000).toFixed(1)} kg` 
                  : `${dimensions.weightGrams} g`}
              </p>
            </div>
          </div>

          {/* Interactive Visual Canvas */}
          <div className="bg-[#EFE9DF] rounded-2xl p-6 border border-[#D8CFBE] flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden select-none">
            
            {/* SCENE 1: BED COMPARISON */}
            {scene === 'bed' && (
              <div className="w-full flex flex-col items-center space-y-4">
                {/* Bed size radio */}
                <div className="flex gap-2">
                  {(['single', 'queen', 'king'] as const).map((b) => (
                    <button
                      key={b}
                      onClick={() => setBedSize(b)}
                      className={`px-3 py-1 rounded text-xs capitalize cursor-pointer transition-colors ${
                        bedSize === b
                          ? 'bg-[#9C4127] text-white font-semibold'
                          : 'bg-white text-[#554D47] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      {b} Bed ({bedDimensions[b].wInches}×{bedDimensions[b].lInches}")
                    </button>
                  ))}
                </div>

                {/* Scaled Top-Down Bed Graphic */}
                <div className="relative w-64 h-72 sm:w-80 sm:h-88 bg-white rounded-xl shadow-lg border-2 border-[#C59B4D]/40 flex flex-col items-center p-3">
                  {/* Pillow indicators */}
                  <div className="w-full flex justify-around mb-2">
                    <div className="w-20 h-8 bg-[#E6DECE] rounded-md border border-[#D0C5B4] text-[9px] text-[#7A6F68] flex items-center justify-center">
                      Pillow
                    </div>
                    {bedSize !== 'single' && (
                      <div className="w-20 h-8 bg-[#E6DECE] rounded-md border border-[#D0C5B4] text-[9px] text-[#7A6F68] flex items-center justify-center">
                        Pillow
                      </div>
                    )}
                  </div>

                  {/* Bed Frame Area */}
                  <div className="w-full flex-1 border border-dashed border-[#B8AC9C] rounded-lg relative flex items-center justify-center bg-[#FAF8F5]/80 overflow-hidden">
                    <span className="text-[11px] text-[#8C827A] font-mono">
                      {activeBed.label} Surface
                    </span>

                    {/* Product Drape Overlay */}
                    <div 
                      className="absolute bg-[#9C4127]/85 text-white text-[11px] font-medium rounded shadow-md flex items-center justify-center p-2 text-center border border-white/60 transition-all duration-300"
                      style={{
                        width: `${Math.min(100, Math.max(30, (dimensions.widthInches / activeBed.wInches) * 100))}%`,
                        height: `${Math.min(100, Math.max(30, (dimensions.lengthInches / activeBed.lInches) * 100))}%`
                      }}
                    >
                      <div className="leading-tight">
                        <p className="font-semibold truncate">{selectedProduct.title}</p>
                        <p className="text-[10px] opacity-90 font-mono mt-0.5">
                          {unit === 'inches' 
                            ? `${dimensions.widthInches}" × ${dimensions.lengthInches}"` 
                            : `${dimensions.widthCm} × ${dimensions.lengthCm} cm`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#665D56] text-center max-w-md">
                  {dimensions.widthInches >= activeBed.wInches
                    ? '✨ Full overhang: This textile generously drapes over both sides of the bed with traditional elegance.'
                    : '✨ Accent runner / top throw: Perfect for laying across the foot of the bed or as an accent tapestry.'}
                </p>
              </div>
            )}

            {/* SCENE 2: HUMAN DRAPE SCALE */}
            {scene === 'body' && (
              <div className="w-full flex flex-col items-center space-y-4">
                <div className="flex items-end justify-center gap-12 sm:gap-16 pt-4">
                  
                  {/* Human Figure Reference */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#352F2D] text-white flex items-center justify-center font-mono text-xs">
                      Head
                    </div>
                    <div className="w-20 h-44 bg-[#4A433F] rounded-t-lg mt-1 flex items-center justify-center text-white text-[11px] text-center p-1 font-mono">
                      5 ft 8 in<br/>(173 cm)
                    </div>
                    <div className="w-16 h-28 flex justify-between">
                      <div className="w-6 h-full bg-[#352F2D] rounded-b" />
                      <div className="w-6 h-full bg-[#352F2D] rounded-b" />
                    </div>
                    <span className="text-[11px] text-[#665D56] font-medium mt-2">Patron Silhouette</span>
                  </div>

                  {/* Textile Length Reference Bar */}
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-20 bg-[#9C4127] rounded-lg shadow-lg flex flex-col items-center justify-center text-white p-2 text-center border-2 border-white/50"
                      style={{
                        height: `${Math.min(320, (dimensions.lengthInches / 70) * 220)}px`
                      }}
                    >
                      <p className="text-xs font-bold leading-tight truncate w-full">{selectedProduct.title}</p>
                      <p className="text-[10px] font-mono mt-1 opacity-90">
                        {dimensions.lengthInches}" ({dimensions.lengthCm} cm)
                      </p>
                      <span className="text-[9px] uppercase tracking-wider bg-black/30 px-1 py-0.5 rounded mt-2">
                        {selectedProduct.category === 'Ajrak' ? 'Traditional 2.5m Chaddar' : 'Full Length'}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#665D56] font-medium mt-2">Drape Span</span>
                  </div>

                </div>

                <p className="text-xs text-[#665D56] text-center max-w-md pt-2">
                  Authentic Sindhi Ajraks are cut to traditional 2.5m length (approx 100 inches), designed to drape majestically over both shoulders with ample fabric for formal turban folds or prayer wrap.
                </p>
              </div>
            )}

            {/* SCENE 3: WALL & LIVING ROOM SOFA SCALE */}
            {scene === 'wall' && (
              <div className="w-full flex flex-col items-center space-y-4">
                <div className="w-full max-w-md bg-white rounded-xl p-5 border border-[#C59B4D]/30 shadow-md flex flex-col items-center">
                  
                  {/* Wall Section */}
                  <div className="w-full h-32 flex items-center justify-center border-b border-[#D8CFBE] pb-4">
                    <div 
                      className="bg-[#1B2B4C] text-white rounded p-2 text-center shadow-md border border-white flex flex-col items-center justify-center transition-all"
                      style={{
                        width: `${Math.min(90, Math.max(30, (dimensions.widthInches / 84) * 100))}%`,
                        height: `${Math.min(100, Math.max(40, (dimensions.lengthInches / 60) * 80))}%`
                      }}
                    >
                      <p className="text-[11px] font-semibold truncate w-full">{selectedProduct.title}</p>
                      <p className="text-[9px] font-mono opacity-90">
                        {dimensions.widthInches}" × {dimensions.lengthInches}"
                      </p>
                    </div>
                  </div>

                  {/* 3-Seater Sofa Graphic Baseline */}
                  <div className="w-full pt-3 flex flex-col items-center">
                    <div className="w-4/5 h-14 bg-[#554D47] rounded-t-xl text-white text-[10px] flex items-center justify-center font-mono shadow-xs">
                      Standard 3-Seater Sofa (84 in / 213 cm)
                    </div>
                    <div className="w-4/5 flex justify-between">
                      <div className="w-3 h-2 bg-[#201D1C]" />
                      <div className="w-3 h-2 bg-[#201D1C]" />
                    </div>
                  </div>

                </div>

                <p className="text-xs text-[#665D56] text-center max-w-md">
                  Whether mounted as an acoustic wall tapestry or casually draped across an armchair, its geometric proportions create an immediate artisanal focal point.
                </p>
              </div>
            )}

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E6DECE] bg-[#FAF8F5] flex items-center justify-between">
          <span className="text-xs text-[#7A6F68]">
            Need bespoke custom dimensions? Message our artisan coordinator.
          </span>
          <button
            onClick={() => setIsScaleModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-md transition-colors cursor-pointer"
          >
            Done Inspecting
          </button>
        </div>

      </div>
    </div>
  );
};
