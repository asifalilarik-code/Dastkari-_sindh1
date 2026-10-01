import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Compass, ShieldCheck, Sparkles, Feather } from 'lucide-react';
import heroImg from '../assets/images/hero_sindhi_ajrak_textile_1790837432010.jpg';

export const Hero: React.FC = () => {
  const { setSelectedCategory, setIsProcessModalOpen, setIsStoriesModalOpen } = useApp();

  const handleExploreAjrak = () => {
    setSelectedCategory('Ajrak');
    const el = document.getElementById('heritage-collections');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreRilli = () => {
    setSelectedCategory('Rilli');
    const el = document.getElementById('heritage-collections');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-6 pb-14 border-b border-[#E6DECE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Layout: Split visual & narrative presence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Unboxed Metadata Kicker (Anti-slop: NO pills) */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9C4127]">
              <span>Direct From Origin</span>
              <span aria-hidden="true" className="text-[#D0C5B4]">·</span>
              <span>Bhit Shah · Hala · Matiari · Tharparkar</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#201D1C] leading-[1.08] tracking-tight text-balance">
              The Soul of Sindh, Hand-Dyed in Indigo and Earth.
            </h1>

            {/* Body Prose with authentic cultural gravity */}
            <p className="text-base sm:text-lg text-[#554D47] leading-relaxed max-w-xl">
              Authentic 14-stage <strong className="text-[#201D1C] font-semibold">Teli Ajrak</strong> and hand-stitched <strong className="text-[#201D1C] font-semibold">Tuk Rilli</strong> quilts, direct from the ancestral workshops of master guilds. Zero synthetic screen-prints; 100% natural madder root, wild indigo, and pure river silt.
            </p>

            {/* Functional Call-To-Action Pair */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleExploreAjrak}
                className="px-6 py-3 text-sm font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-lg transition-all shadow-sm flex items-center gap-2 cursor-pointer group whitespace-nowrap"
              >
                <span>Explore Ajrak Textiles</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleExploreRilli}
                className="px-6 py-3 text-sm font-medium text-[#201D1C] bg-[#F1EAE0] hover:bg-[#E8DFC9] border border-[#D8CFBE] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Discover Tuk Rilli Quilts
              </button>
            </div>

            {/* Adjacent Trust & Proof Markers (Clean unboxed typography) */}
            <div className="pt-6 border-t border-[#E6DECE] grid grid-cols-3 gap-4 text-xs text-[#554D47]">
              <div>
                <p className="font-mono text-sm font-bold text-[#201D1C] tabular-nums">14 Stages</p>
                <p className="text-[11px] text-[#7A6F68] mt-0.5">Vegetable Dye Cycle</p>
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-[#201D1C] tabular-nums">70%+ Share</p>
                <p className="text-[11px] text-[#7A6F68] mt-0.5">Direct to Artisan Families</p>
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-[#201D1C] tabular-nums">4,000 Yrs</p>
                <p className="text-[11px] text-[#7A6F68] mt-0.5">Indus Heritage Lineage</p>
              </div>
            </div>

          </div>

          {/* Visual Showcase Column (16:9 or 4:3 high-fidelity image asset) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#D8CFBE] bg-[#EFE9DF] group">
              <img
                src={heroImg}
                alt="Handcrafted authentic Sindhi Ajrak textile with natural indigo and madder red dyes"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover aspect-16/9 sm:aspect-4/3 transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Measured Scrim for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

              {/* In-Image Story Badge */}
              <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#E8DFD3] font-mono">
                    Masterpiece in Focus
                  </p>
                  <p className="font-serif-heading text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                    Original 14-Stage Teli Ajrak
                  </p>
                  <p className="text-xs text-[#E8DFD3]/90 mt-1 max-w-sm">
                    Hand-stamped in Bhit Shah with hand-carved shisham wood blocks.
                  </p>
                </div>

                <button
                  onClick={() => setIsProcessModalOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E6DECE]" />
                  <span>Inspect 14 Stages</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
