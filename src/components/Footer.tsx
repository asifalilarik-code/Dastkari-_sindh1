import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, HeartHandshake, MapPin, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const { 
    setSelectedCategory, 
    setIsProcessModalOpen, 
    setIsStoriesModalOpen, 
    setCurrentRole,
    showToast 
  } = useApp();

  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast(`Subscribed ${newsletterEmail} to the seasonal Sindh Guild Gazette.`);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#201D1C] text-[#E8DFD3] pt-16 pb-12 border-t border-[#352F2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-xs">
          
          {/* Col 1: Wordmark & Ethos */}
          <div className="space-y-4">
            <div>
              <span className="font-serif-heading text-2xl font-bold tracking-tight text-white block">
                Dastkari Sindh
              </span>
              <span className="text-xs text-[#C59B4D] font-serif italic">
                دستڪاري سنڌ · Indigenous Craft Registry
              </span>
            </div>
            <p className="text-[#A89D96] leading-relaxed">
              An open artisanal cooperative directly empowering 40+ master dyer and weaver families in Bhit Shah, Hala, Matiari, and Tharparkar. Over 70% of every purchase directly sustains the village guilds.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#C59B4D]">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified 100% Non-Chemical Natural Dye</span>
            </div>
          </div>

          {/* Col 2: Heritage Towns & Guilds */}
          <div className="space-y-3">
            <h4 className="font-serif-heading text-sm font-bold text-white uppercase tracking-wider">
              Artisan Guild Hubs
            </h4>
            <ul className="space-y-2 text-[#A89D96]">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#9C4127]" />
                <span><strong>Bhit Shah</strong> — Teli Ajrak & Sacred Shisham Blocks</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#1B2B4C]" />
                <span><strong>Hala Old</strong> — Glazed Blue Cobalt Kashi Ceramics</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C59B4D]" />
                <span><strong>Matiari</strong> — Bhedi Double-Sided Khaddar Weaves</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#872323]" />
                <span><strong>Tharparkar</strong> — Hand-Stitched Tuk Rilli Quilts</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Curatorial & Craft Lore */}
          <div className="space-y-3">
            <h4 className="font-serif-heading text-sm font-bold text-white uppercase tracking-wider">
              Curatorial Index
            </h4>
            <ul className="space-y-2 text-[#A89D96]">
              <li>
                <button
                  onClick={() => setIsProcessModalOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  The 14 Sacred Stages of Teli Ajrak
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsStoriesModalOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Master Artisan Biographies & Lineages
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Rilli');
                    const el = document.getElementById('heritage-collections');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Thar Desert Tessellations & Quilt Sizing
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentRole('admin')}
                  className="text-[#C59B4D] hover:underline cursor-pointer font-medium"
                >
                  Admin Console & Schema Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Season Releases */}
          <div className="space-y-3">
            <h4 className="font-serif-heading text-sm font-bold text-white uppercase tracking-wider">
              The Sindh Gazette
            </h4>
            <p className="text-[#A89D96] leading-relaxed">
              Quarterly dispatches announcing fresh winter Khaddar weaves and limited one-of-a-kind museum commissions.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#2C2726] border border-[#3E3836] rounded-md px-3 py-2 text-xs text-white placeholder-[#7A6F68] focus:outline-none focus:border-[#C59B4D]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#9C4127] hover:bg-[#83341E] text-white rounded-md transition-colors cursor-pointer flex items-center justify-center shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[10px] text-[#7A6F68] block">No spam. Only authentic craft documentation.</span>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#352F2D] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C827A]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Dastkari Sindh Artisanal Collective.</span>
            <span>·</span>
            <span>Honoring 4,000 Years of Indus Civilization Textile Heritage.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Payments: Stripe · JazzCash · EasyPaisa · COD</span>
            <span>·</span>
            <span>Insured Couriers: TCS · DHL</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
