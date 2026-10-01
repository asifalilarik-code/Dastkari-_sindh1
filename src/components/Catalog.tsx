import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Product, ArtisanTown, CraftTechnique } from '../types';
import { 
  SlidersHorizontal, 
  Eye, 
  ShoppingBag, 
  Heart, 
  Ruler, 
  MapPin, 
  Sparkles,
  Check,
  Search,
  RotateCcw
} from 'lucide-react';

export const Catalog: React.FC = () => {
  const {
    products,
    formatPrice,
    addToCart,
    setSelectedProduct,
    setIsScaleModalOpen,
    wishlist,
    toggleWishlist,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTown,
    setSelectedTown,
    selectedTechnique,
    setSelectedTechnique
  } = useApp();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [naturalDyeOnly, setNaturalDyeOnly] = useState(false);
  const [oneOfAKindOnly, setOneOfAKindOnly] = useState(false);

  const categories = ['All', 'Ajrak', 'Rilli', 'Kashi Pottery'];
  const towns: (ArtisanTown | 'All')[] = ['All', 'Bhit Shah', 'Hala', 'Matiari', 'Tharparkar'];
  const techniques: (CraftTechnique | 'All')[] = [
    'All',
    'Natural Veg-dye (Teli)',
    'Hand-stitched Appliqué (Tuk)',
    'Hand-block printed',
    'Cobalt Kashi Glaze'
  ];

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Town filter
      if (selectedTown !== 'All' && item.artisanTown !== selectedTown) {
        return false;
      }
      // Technique filter
      if (selectedTechnique !== 'All' && item.technique !== selectedTechnique) {
        return false;
      }
      // Natural dye certified filter
      if (naturalDyeOnly && !item.isNaturalDyeCertified) {
        return false;
      }
      // One of a kind filter
      if (oneOfAKindOnly && !item.isOneOfAKind) {
        return false;
      }
      // Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesSubtitle = item.subtitle.toLowerCase().includes(query);
        const matchesTown = item.artisanTown.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesSindhi = item.sindhiName.toLowerCase().includes(query);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesSubtitle && !matchesTown && !matchesCategory && !matchesSindhi && !matchesTags) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePKR - b.pricePKR;
      if (sortBy === 'price-desc') return b.pricePKR - a.pricePKR;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured
    });
  }, [products, selectedCategory, selectedTown, selectedTechnique, naturalDyeOnly, oneOfAKindOnly, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedTown('All');
    setSelectedTechnique('All');
    setNaturalDyeOnly(false);
    setOneOfAKindOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters = 
    selectedCategory !== 'All' || 
    selectedTown !== 'All' || 
    selectedTechnique !== 'All' || 
    naturalDyeOnly || 
    oneOfAKindOnly || 
    searchQuery.trim() !== '';

  return (
    <section id="heritage-collections" className="py-14 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E6DECE]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9C4127]">
              <span>Ancestral Masterpieces</span>
              <span aria-hidden="true" className="text-[#D0C5B4]">·</span>
              <span>Direct From Guilds</span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#201D1C] mt-1 tracking-tight">
              Curated Heritage Catalog
            </h2>
            <p className="text-sm text-[#665D56] mt-1 max-w-xl">
              Each textile and vessel is crafted by hand using multi-generational techniques. Guaranteed 100% authentic and non-machine printed.
            </p>
          </div>

          {/* Quick Sort & Result Count */}
          <div className="flex items-center gap-4 text-xs">
            <span className="text-[#7A6F68] font-mono tabular-nums">
              Showing {filteredProducts.length} heirloom pieces
            </span>
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-[#554D47] font-medium">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F1EAE0] border border-[#D8CFBE] text-[#201D1C] rounded-md px-2.5 py-1.5 focus:outline-none focus:border-[#9C4127] cursor-pointer"
              >
                <option value="featured">Curator's Choice</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Interactive Filter Bar */}
        <div className="pt-6 pb-8 space-y-4">
          
          {/* Category Tabs (Segmented control style) */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F1EAE0] rounded-lg border border-[#E6DECE]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white text-[#9C4127] shadow-xs font-semibold'
                      : 'text-[#554D47] hover:text-[#201D1C]'
                  }`}
                >
                  {cat === 'All' ? 'All Collections' : cat}
                </button>
              ))}
            </div>

            {/* Quick Toggle Controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                onClick={() => setNaturalDyeOnly(!naturalDyeOnly)}
                className={`px-3 py-1.5 rounded-md border flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  naturalDyeOnly
                    ? 'border-[#9C4127] bg-[#9C4127]/10 text-[#9C4127] font-semibold'
                    : 'border-[#D8CFBE] bg-white text-[#554D47] hover:bg-[#FAF8F5]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Natural Dye Certified</span>
              </button>

              <button
                onClick={() => setOneOfAKindOnly(!oneOfAKindOnly)}
                className={`px-3 py-1.5 rounded-md border flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  oneOfAKindOnly
                    ? 'border-[#1B2B4C] bg-[#1B2B4C]/10 text-[#1B2B4C] font-semibold'
                    : 'border-[#D8CFBE] bg-white text-[#554D47] hover:bg-[#FAF8F5]'
                }`}
              >
                <span>One-of-a-Kind Pieces</span>
              </button>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="px-2.5 py-1.5 text-xs text-[#9C4127] hover:text-[#83341E] flex items-center gap-1 transition-colors cursor-pointer font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Granular Town and Technique Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#554D47]">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#7A6F68]">Artisan Town:</span>
              <div className="flex flex-wrap gap-1">
                {towns.map((town) => (
                  <button
                    key={town}
                    onClick={() => setSelectedTown(town)}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      selectedTown === town
                        ? 'bg-[#201D1C] text-white font-medium'
                        : 'bg-[#F1EAE0] text-[#554D47] hover:bg-[#E8DFC9]'
                    }`}
                  >
                    {town}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center bg-white rounded-xl border border-[#E6DECE] p-8">
            <p className="font-serif-heading text-2xl font-bold text-[#201D1C]">No Heirloom Pieces Match Your Filter</p>
            <p className="text-sm text-[#7A6F68] mt-2 max-w-md mx-auto">
              Our pieces are handmade in limited batches. Try resetting your town or technique filters to view other available artisanal treasures.
            </p>
            <button
              onClick={resetFilters}
              className="mt-5 px-5 py-2 text-xs font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-md transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Product Cards Grid: 3-column desktop layout with generous whitespace */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-white rounded-xl overflow-hidden border border-[#E4DDD0] hover:border-[#C59B4D] hover:shadow-md transition-all duration-300"
              >
                
                {/* Product Image Stage (65-75% visual presence) */}
                <div 
                  className="relative aspect-4/3 bg-[#F3EFEA] overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.mainImage}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient Scrim on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Quick Scale Indicator Trigger Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                      setIsScaleModalOpen(true);
                    }}
                    className="absolute bottom-3 left-3 px-2.5 py-1.5 bg-black/70 hover:bg-black/90 text-white rounded text-[11px] font-medium backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 cursor-pointer"
                    title="Inspect scale vs bed / wall"
                  >
                    <Ruler className="w-3.5 h-3.5 text-[#E6DECE]" />
                    <span>Visual Scale</span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                      isWishlisted 
                        ? 'bg-[#872323] text-white' 
                        : 'bg-white/80 hover:bg-white text-[#4A433F] hover:text-[#872323]'
                    }`}
                    title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    aria-label="Wishlist toggle"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Stock or Authenticity Status Indicator (Subtle unboxed badge) */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.isOneOfAKind && (
                      <span className="bg-[#201D1C]/85 text-[#FAF8F5] text-[10px] uppercase font-mono px-2 py-0.5 rounded backdrop-blur-xs">
                        1 of 1 Heirloom
                      </span>
                    )}
                    {product.isNaturalDyeCertified && (
                      <span className="bg-[#1B2B4C]/85 text-[#FAF8F5] text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-xs">
                        100% Veg-Dye
                      </span>
                    )}
                  </div>
                </div>

                {/* Content & Metadata */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Clean unboxed metadata with bullet separators (anti-slop rule) */}
                    <div className="flex items-center gap-2 text-xs text-[#7A6F68] font-medium">
                      <span className="flex items-center gap-1 text-[#9C4127]">
                        <MapPin className="w-3 h-3" />
                        <span>{product.artisanTown}</span>
                      </span>
                      <span aria-hidden="true" className="text-[#D8CFBE]">·</span>
                      <span>{product.technique}</span>
                      <span aria-hidden="true" className="text-[#D8CFBE]">·</span>
                      <span>{product.baseMaterial}</span>
                    </div>

                    {/* Product Name */}
                    <h3 
                      onClick={() => setSelectedProduct(product)}
                      className="font-serif-heading text-lg font-bold text-[#201D1C] mt-2 line-clamp-1 hover:text-[#9C4127] cursor-pointer transition-colors"
                    >
                      {product.title}
                    </h3>

                    {/* Sindhi Native Callout */}
                    <p className="text-xs text-[#9C4127] font-serif italic mt-0.5" dir="rtl">
                      {product.sindhiName}
                    </p>

                    <p className="text-xs text-[#665D56] mt-1.5 line-clamp-2 leading-relaxed">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Price and Action Row */}
                  <div className="pt-4 mt-4 border-t border-[#F0EBE1] flex items-center justify-between">
                    <div>
                      <span className="text-base font-bold font-mono text-[#201D1C] tabular-nums">
                        {formatPrice(product.pricePKR)}
                      </span>
                      {product.originalPricePKR && (
                        <span className="ml-2 text-xs text-[#998E87] line-through font-mono tabular-nums">
                          {formatPrice(product.originalPricePKR)}
                        </span>
                      )}
                      <p className="text-[10px] text-[#7A6F68] font-mono">
                        {product.stockQuantity <= 3 ? `Only ${product.stockQuantity} available` : 'In Artisan Guild Stock'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="px-3 py-1.5 text-xs font-medium text-[#4A433F] hover:text-[#201D1C] bg-[#F1EAE0] hover:bg-[#E8DFC9] rounded-md transition-colors cursor-pointer"
                        title="View details and craftsmanship"
                      >
                        Inspect
                      </button>
                      
                      <button
                        onClick={() => addToCart(product)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
                        title="Add to shopping bag"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
