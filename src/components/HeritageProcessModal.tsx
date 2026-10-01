import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, ShieldCheck, Droplets, Sun, Flame, Check, AlertTriangle, Layers } from 'lucide-react';
import { FOURTEEN_STAGES } from '../data/mockData';

export const HeritageProcessModal: React.FC = () => {
  const { isProcessModalOpen, setIsProcessModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'stages' | 'comparison' | 'ingredients'>('stages');
  const [selectedStageIndex, setSelectedStageIndex] = useState(3); // default to Teli stage (stage 4)

  if (!isProcessModalOpen) return null;

  const currentStage = FOURTEEN_STAGES[selectedStageIndex];

  return (
    <div className="fixed inset-0 z-60 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E6DECE] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DECE] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#9C4127]" />
            <div>
              <h3 className="font-serif-heading text-xl font-bold text-[#201D1C]">
                The Alchemy of 14-Stage Teli Ajrak
              </h3>
              <p className="text-xs text-[#7A6F68]">
                28-day indigenous riverbed dye cycle practiced unchanged since 2500 BCE
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsProcessModalOpen(false)}
            className="p-1.5 text-[#554D47] hover:text-[#201D1C] rounded-full hover:bg-[#F1EAE0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E6DECE] bg-[#F1EAE0] px-6 text-xs font-medium">
          <button
            onClick={() => setActiveTab('stages')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'stages'
                ? 'border-[#9C4127] text-[#9C4127] font-semibold bg-white'
                : 'border-transparent text-[#665D56] hover:text-[#201D1C]'
            }`}
          >
            Interactive 14 Stages
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'comparison'
                ? 'border-[#9C4127] text-[#9C4127] font-semibold bg-white'
                : 'border-transparent text-[#665D56] hover:text-[#201D1C]'
            }`}
          >
            Authentic vs Screen-Print Comparison
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'ingredients'
                ? 'border-[#9C4127] text-[#9C4127] font-semibold bg-white'
                : 'border-transparent text-[#665D56] hover:text-[#201D1C]'
            }`}
          >
            Sacred Forest & River Ingredients
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: 14 STAGES EXPLORER */}
          {activeTab === 'stages' && (
            <div className="space-y-6">
              
              {/* Stage Progress Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#7A6F68]">
                  <span>Stage {currentStage.stage} of 14</span>
                  <span className="font-mono font-semibold text-[#9C4127]">{currentStage.duration}</span>
                </div>
                
                {/* Visual Stepper Pills */}
                <div className="grid grid-cols-7 sm:grid-cols-14 gap-1">
                  {FOURTEEN_STAGES.map((s, idx) => (
                    <button
                      key={s.stage}
                      onClick={() => setSelectedStageIndex(idx)}
                      className={`h-9 rounded flex items-center justify-center text-xs font-mono font-bold transition-all cursor-pointer ${
                        selectedStageIndex === idx
                          ? 'bg-[#9C4127] text-white shadow-sm scale-105'
                          : 'bg-[#EAE2D5] text-[#554D47] hover:bg-[#DDD3C2]'
                      }`}
                      title={s.name}
                    >
                      {s.stage}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Stage Detail Card */}
              <div className="bg-white rounded-2xl p-6 border border-[#E0D7C6] shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EBE1] pb-3">
                  <div>
                    <span className="text-[11px] font-mono text-[#9C4127] uppercase tracking-wider">
                      Stage {currentStage.stage}
                    </span>
                    <h4 className="font-serif-heading text-2xl font-bold text-[#201D1C] mt-0.5">
                      {currentStage.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#554D47] bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#E6DECE] w-fit">
                    <Droplets className="w-3.5 h-3.5 text-[#1B2B4C]" />
                    <span>Duration: <strong className="font-mono">{currentStage.duration}</strong></span>
                  </div>
                </div>

                <p className="text-sm text-[#4A433F] leading-relaxed">
                  {currentStage.description}
                </p>

                {/* Cultural Context Note */}
                <div className="p-3.5 bg-[#F9F5EC] rounded-xl border border-[#E6DECE] text-xs text-[#665D56] space-y-1">
                  <span className="font-bold text-[#201D1C] block">Master Guild Observation:</span>
                  <p>
                    {currentStage.stage === 4 && 'The Teli stage requires rubbing mustard oil into every square inch of the cotton fibers under the morning sun until the fabric turns a deep golden hue and becomes fully receptive to the wild madder root.'}
                    {currentStage.stage === 10 && 'When the cloth is pulled from the underground indigo vat, it appears pale chartreuse green. As air hits the textile, oxygen instantly converts the liquid into majestic Indus Valley indigo blue before your eyes.'}
                    {currentStage.stage === 12 && 'The copper cauldron boils at the riverbank with madder roots (majith). The alum mordant stamped in stage 9 acts as an anchor, reacting with heat to turn the stamped areas into indelible crimson brick red.'}
                    {currentStage.stage !== 4 && currentStage.stage !== 10 && currentStage.stage !== 12 && 'Every repeat is hand-stamped with wooden blocks carved from seasoned Shisham wood, tuned to the heartbeat rhythm of the master artisan.'}
                  </p>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    disabled={selectedStageIndex === 0}
                    onClick={() => setSelectedStageIndex((prev) => Math.max(0, prev - 1))}
                    className="px-3.5 py-1.5 text-xs text-[#554D47] bg-[#F1EAE0] hover:bg-[#E8DFC9] rounded-md disabled:opacity-40 cursor-pointer"
                  >
                    ← Previous Stage
                  </button>
                  <button
                    disabled={selectedStageIndex === 13}
                    onClick={() => setSelectedStageIndex((prev) => Math.min(13, prev + 1))}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-md disabled:opacity-40 cursor-pointer"
                  >
                    Next Stage →
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: AUTHENTIC VS SCREEN PRINT COMPARISON */}
          {activeTab === 'comparison' && (
            <div className="space-y-4">
              <p className="text-xs text-[#665D56]">
                Over 95% of commercial "Ajraks" sold in fast-fashion bazaars are synthetic polyester fabrics screen-printed with petrochemical inks. Learn how to identify authentic artisanal Ajrak:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* True Artisanal Box */}
                <div className="bg-[#FAFDF9] rounded-xl p-5 border-2 border-[#2E6F40]/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#2E6F40] uppercase">
                    <Check className="w-4 h-4" />
                    <span>Authentic Dastkari Teli Ajrak</span>
                  </div>
                  <ul className="text-xs text-[#334D3A] space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#2E6F40] font-bold">✓</span>
                      <span><strong>Two-Sided Registration:</strong> Motifs appear identically rich on both sides (Bhedi Ajrak) because natural dye permeates through the fibers.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#2E6F40] font-bold">✓</span>
                      <span><strong>Earthy Natural Aroma:</strong> Distinct sweet fragrance of fermented mustard oil, wild madder root, and sun-baked river clay.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#2E6F40] font-bold">✓</span>
                      <span><strong>Ages With Beauty:</strong> Natural indigo softens with every wash, becoming richer and more supple over decades.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#2E6F40] font-bold">✓</span>
                      <span><strong>Human Rhythm:</strong> Micro-variations in block alignment revealing the artisan's hand stamping rather than mechanical repetition.</span>
                    </li>
                  </ul>
                </div>

                {/* Counterfeit Screen-Print Box */}
                <div className="bg-[#FDF8F7] rounded-xl p-5 border-2 border-[#872323]/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#872323] uppercase">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Commercial Synthetic Knock-Off</span>
                  </div>
                  <ul className="text-xs text-[#5C3232] space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#872323] font-bold">✗</span>
                      <span><strong>Blank Backside:</strong> White or pale faded back because cheap ink is simply rolled on top of the front surface.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#872323] font-bold">✗</span>
                      <span><strong>Chemical Stench:</strong> Pungent chemical odor from petroleum solvents, toxic vinyl binders, and azo dyes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#872323] font-bold">✗</span>
                      <span><strong>Cracks & Bleeds:</strong> Surface ink flakes, bleeds into grey mush, and suffocates the skin in summer heat.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#872323] font-bold">✗</span>
                      <span><strong>Zero Artisan Benefit:</strong> Manufactured in industrial mills in minutes, displacing centuries of village guilds.</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: INGREDIENTS */}
          {activeTab === 'ingredients' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-[#E0D7C6] space-y-1">
                <span className="text-[11px] font-mono text-[#1B2B4C] font-semibold">Indigofera Tinctoria</span>
                <h5 className="font-serif-heading text-base font-bold text-[#201D1C]">Wild Sindh Indigo (Neel)</h5>
                <p className="text-xs text-[#554D47]">
                  Cultivated in southern Sindh, fermented in earthen underground vats with lime and molasses. Imparts the deep celestial blue that gives Ajrak its name (from Arabic <em>Azrak</em>, meaning blue).
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E0D7C6] space-y-1">
                <span className="text-[11px] font-mono text-[#872323] font-semibold">Rubia Tinctorum</span>
                <h5 className="font-serif-heading text-base font-bold text-[#201D1C]">Madder Root (Majith)</h5>
                <p className="text-xs text-[#554D47]">
                  Crushed mountain madder roots provide natural alizarin dye. When boiled in copper cauldrons with alum mordant, it yields the deep brick red terracotta hues.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E0D7C6] space-y-1">
                <span className="text-[11px] font-mono text-[#4A433F] font-semibold">Ferrous Acetate</span>
                <h5 className="font-serif-heading text-base font-bold text-[#201D1C]">Fermented Iron Slag (Syahi)</h5>
                <p className="text-xs text-[#554D47]">
                  Rusted iron horseshoe scrap, fermented with raw jaggery (gur) and tamarind water for 21 days to form permanent jet black outline ink.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E0D7C6] space-y-1">
                <span className="text-[11px] font-mono text-[#C59B4D] font-semibold">Terminalia Chebula</span>
                <h5 className="font-serif-heading text-base font-bold text-[#201D1C]">Myrobalan Nut (Harda)</h5>
                <p className="text-xs text-[#554D47]">
                  A tannic wild nut essential for mordanting the cloth and preventing insect rot, giving Ajrak its anti-fungal and skin-soothing properties.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E6DECE] bg-[#FAF8F5] flex items-center justify-between">
          <span className="text-xs text-[#7A6F68]">
            Every Dastkari piece arrives with an individual wax seal verification certificate.
          </span>
          <button
            onClick={() => setIsProcessModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-md transition-colors cursor-pointer"
          >
            Close Explorer
          </button>
        </div>

      </div>
    </div>
  );
};
