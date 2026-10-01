import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CraftArticle } from '../types';
import { BookOpen, Clock, ArrowRight, X } from 'lucide-react';

export const CraftJournal: React.FC = () => {
  const { articles } = useApp();
  const [selectedArticle, setSelectedArticle] = useState<CraftArticle | null>(null);

  return (
    <section id="craft-journal" className="py-16 bg-[#F3EFEA] border-b border-[#E6DECE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9C4127]">
            <span>Documentary Archive</span>
            <span aria-hidden="true" className="text-[#D0C5B4]">·</span>
            <span>Anthropology of Indus Craft</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#201D1C] mt-1 tracking-tight">
            The Living Heritage Journal
          </h2>
          <p className="text-sm text-[#665D56] mt-1.5 leading-relaxed">
            Curated field notes, oral histories, and technical dye chemistry documented with village elders in Bhit Shah, Hala, and Tharparkar.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl overflow-hidden border border-[#E0D7C6] hover:border-[#C59B4D] transition-all flex flex-col justify-between group shadow-xs cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#201D1C]/80 backdrop-blur-xs text-[#FAF8F5] text-[10px] font-mono uppercase px-2 py-0.5 rounded">
                    {article.category}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-[#7A6F68]">
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#9C4127]" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-serif-heading text-lg font-bold text-[#201D1C] group-hover:text-[#9C4127] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#665D56] line-clamp-2 leading-relaxed">
                    {article.subtitle}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs text-[#9C4127] font-semibold border-t border-[#F0EBE1]">
                <span>Read Full Essay</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-60 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E6DECE] overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DECE] bg-[#FAF8F5]">
              <span className="text-xs font-mono text-[#9C4127] uppercase tracking-wider">
                {selectedArticle.category} · {selectedArticle.readTime}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 text-[#554D47] hover:text-[#201D1C] rounded-full hover:bg-[#F1EAE0] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 md:p-8 space-y-5">
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#201D1C] leading-tight">
                {selectedArticle.title}
              </h2>
              <p className="text-xs text-[#7A6F68] italic border-b border-[#E6DECE] pb-3">
                By {selectedArticle.author} · Published {selectedArticle.date}
              </p>

              <div className="aspect-16/9 rounded-xl overflow-hidden border border-[#D8CFBE]">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-xs sm:text-sm text-[#4A433F] leading-relaxed whitespace-pre-line space-y-4">
                {selectedArticle.content}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#E6DECE]">
                {selectedArticle.tags.map((tag, i) => (
                  <span key={i} className="text-[11px] bg-[#F1EAE0] text-[#554D47] px-2.5 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#E6DECE] bg-[#FAF8F5] flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#201D1C] hover:bg-[#352F2D] rounded-md transition-colors cursor-pointer"
              >
                Close Essay
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
