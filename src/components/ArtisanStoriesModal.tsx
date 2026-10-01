import React from 'react';
import { useApp } from '../context/AppContext';
import { X, MapPin, Award, HeartHandshake, Compass, ArrowRight } from 'lucide-react';
import { Artisan } from '../types';

export const ArtisanStoriesModal: React.FC = () => {
  const { 
    isStoriesModalOpen, 
    setIsStoriesModalOpen, 
    artisans, 
    selectedArtisan, 
    setSelectedArtisan,
    setSelectedTown,
    setSelectedCategory
  } = useApp();

  if (!isStoriesModalOpen) return null;

  const activeArtisan: Artisan = selectedArtisan || artisans[0];

  const handleFilterByArtisanTown = (town: any) => {
    setSelectedTown(town);
    setIsStoriesModalOpen(false);
    const el = document.getElementById('heritage-collections');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E6DECE] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DECE] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-[#9C4127]" />
            <div>
              <h3 className="font-serif-heading text-xl font-bold text-[#201D1C]">
                Custodians of Indus Heritage
              </h3>
              <p className="text-xs text-[#7A6F68]">
                Meet the master artisan guilds preserving Sindh's ancestral arts
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsStoriesModalOpen(false)}
            className="p-1.5 text-[#554D47] hover:text-[#201D1C] rounded-full hover:bg-[#F1EAE0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* Artisan Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {artisans.map((art) => (
              <button
                key={art.id}
                onClick={() => setSelectedArtisan(art)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  activeArtisan.id === art.id
                    ? 'border-[#9C4127] bg-[#FAF3E8] shadow-xs'
                    : 'border-[#E0D7C6] bg-white hover:border-[#C59B4D]'
                }`}
              >
                <div>
                  <p className="font-serif-heading text-sm font-bold text-[#201D1C] line-clamp-1">
                    {art.name}
                  </p>
                  <p className="text-[11px] text-[#7A6F68] mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#9C4127]" />
                    <span>{art.town}</span>
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#9C4127] font-semibold mt-2">
                  {art.generationCount}th Gen
                </span>
              </button>
            ))}
          </div>

          {/* Featured Artisan Detailed Story Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E0D7C6] shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Portrait & Guild Details */}
              <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
                <div className="relative w-36 h-36 rounded-full overflow-hidden border-3 border-[#C59B4D] shadow-md">
                  <img
                    src={activeArtisan.avatarUrl}
                    alt={activeArtisan.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif-heading text-xl font-bold text-[#201D1C]">
                    {activeArtisan.name}
                  </h4>
                  <p className="text-xs text-[#9C4127] font-medium mt-0.5">
                    {activeArtisan.honorific}
                  </p>
                  <p className="text-xs text-[#7A6F68] mt-1">
                    {activeArtisan.town}, Sindh ({activeArtisan.region})
                  </p>
                </div>

                <div className="bg-[#FAF3E8] px-3 py-1.5 rounded-lg border border-[#E2D2BC] text-[11px] font-mono text-[#872323] font-semibold">
                  {activeArtisan.cooperativeSharePercentage}% Direct Cooperative Payout
                </div>
              </div>

              {/* Narrative & Craft Lineage */}
              <div className="md:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-xs text-[#7A6F68]">
                  <Award className="w-4 h-4 text-[#C59B4D]" />
                  <span>Mastery: <strong className="text-[#201D1C]">{activeArtisan.craftSpecialty}</strong></span>
                </div>

                <p className="text-sm text-[#4A433F] leading-relaxed">
                  {activeArtisan.bio}
                </p>

                <blockquote className="border-l-3 border-[#9C4127] pl-4 py-1 text-sm font-serif italic text-[#665D56] bg-[#FAF8F5] rounded-r-lg">
                  "{activeArtisan.quote}"
                </blockquote>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-[#7A6F68]">
                    <span className="block font-medium text-[#201D1C]">Ancestral Workshop:</span>
                    <span>{activeArtisan.workshopLocation}</span>
                  </div>

                  <button
                    onClick={() => handleFilterByArtisanTown(activeArtisan.town)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>View {activeArtisan.town} Works</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Social Impact & Economic Fairness Pledge */}
          <div className="bg-[#FAF3E8] rounded-xl p-5 border border-[#E2D2BC] space-y-2">
            <h5 className="font-serif-heading text-base font-bold text-[#201D1C]">
              The Dastkari Fair Trade Guarantee
            </h5>
            <p className="text-xs text-[#554D47] leading-relaxed">
              Traditional intermediaries take upwards of 80% of artisan profits in commercial bazaars. Dastkari Sindh operates as an open cooperative: over 70% of every transaction flows directly into the verified bank or mobile wallets of artisan guild leaders in Bhit Shah, Hala, Matiari, and Tharparkar.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E6DECE] bg-[#FAF8F5] flex justify-end">
          <button
            onClick={() => setIsStoriesModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#201D1C] hover:bg-[#352F2D] rounded-md transition-colors cursor-pointer"
          >
            Close Guild Profiles
          </button>
        </div>

      </div>
    </div>
  );
};
