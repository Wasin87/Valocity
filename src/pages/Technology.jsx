import React, { useState, useEffect } from 'react';
import { getProductsFromStore } from '../services/marketplaceService';
import TechCard from '../components/products/TechCard';
import { Search, SlidersHorizontal, RefreshCcw, Smartphone, Cpu, ShieldCheck } from 'lucide-react';

const TECH_CATEGORIES = [
  { id: 'All', label: 'All Technology' },
  { id: 'Smartphones', label: 'Smartphones' },
  { id: 'Laptops', label: 'Laptops & Workstations' },
  { id: 'Cameras', label: 'Medium Format & Cameras' },
  { id: 'Smartwatches', label: 'Smartwatches' },
  { id: 'Accessories', label: 'Audiophile & Audio' }
];

export default function Technology({ onNavigate }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const data = await getProductsFromStore();
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSortBy('featured');
  };

  const filteredProducts = products.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (selectedBrand !== 'All' && p.brand !== selectedBrand) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return b.featured ? 1 : -1;
  });

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F5F4F0] pt-28 pb-24 selection:bg-[#C5A878]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Luxury Editorial Header */}
        <div className="relative pt-6 pb-8 border-b border-[#242426]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A878]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A878] font-bold">
                  VELOCITY TECHNOLOGY DIVISION
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#F5F4F0]">
                Premier Hardware & Acoustics
              </h1>
              <p className="text-sm text-[#A7A9AC] mt-2 max-w-xl font-light">
                Flagship smartphones, Apple M4 Max workstations, Hasselblad medium format optics, and precision titanium wearables.
              </p>
            </div>

            <div className="px-3.5 py-1.5 rounded-full bg-[#171719] border border-[#242426] text-xs font-mono text-[#A7A9AC]">
              Showing <span className="text-[#C5A878] font-bold">{filteredProducts.length}</span> flagship hardware items
            </div>
          </div>

          {/* Quick Category Pill Bar */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
            {TECH_CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#171719] text-[#C5A878] border border-[#C5A878]/60 shadow-[0_0_20px_rgba(197,168,120,0.15)] font-bold'
                      : 'bg-[#171719]/40 text-[#A7A9AC] border border-[#242426] hover:text-[#F5F4F0] hover:border-[#A7A9AC]/40'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <aside className="space-y-6 bg-[#171719]/80 backdrop-blur-xl p-6 rounded-2xl border border-[#242426] h-fit sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-[#242426]">
              <div className="flex items-center gap-2 text-[#F5F4F0] font-bold text-sm tracking-wide">
                <SlidersHorizontal className="w-4 h-4 text-[#C5A878]" /> Filter Technology
              </div>
              <button 
                onClick={resetFilters}
                className="text-[11px] font-mono text-[#C5A878] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Search */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#A7A9AC] mb-2">Search Hardware</label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#A7A9AC]/60 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. iPhone, Hasselblad, Leica..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#0B0B0D] border border-[#242426] rounded-xl text-xs text-[#F5F4F0] placeholder-[#A7A9AC]/40 outline-none focus:border-[#C5A878] transition-colors"
                />
              </div>
            </div>

            {/* Manufacturer Brand */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#A7A9AC] mb-2">Manufacturer</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-3 py-2.5 text-xs text-[#F5F4F0] outline-none focus:border-[#C5A878] transition-colors cursor-pointer"
              >
                <option value="All">All Manufacturers</option>
                <option value="Apple">Apple</option>
                <option value="Hasselblad">Hasselblad</option>
                <option value="Sony">Sony</option>
                <option value="Leica">Leica</option>
                <option value="Bang & Olufsen">Bang & Olufsen</option>
              </select>
            </div>

            {/* Official Warranty Badge */}
            <div className="p-4 rounded-xl bg-[#0B0B0D] border border-[#242426] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C5A878] font-bold">
                <ShieldCheck className="w-4 h-4" /> 12-Month Official Warranty
              </div>
              <p className="text-[11px] text-[#A7A9AC] leading-relaxed">
                Brand-new factory sealed units backed by direct manufacturer warranty and VELOCITY VIP swap protection.
              </p>
            </div>
          </aside>

          {/* Main List */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#171719]/60 border border-[#242426]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#A7A9AC]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#0B0B0D] border border-[#242426] text-xs text-[#F5F4F0] rounded-lg px-3 py-1.5 outline-none focus:border-[#C5A878] cursor-pointer"
                >
                  <option value="featured">Featured Priority</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                </select>
              </div>

              <div className="text-xs font-mono text-[#A7A9AC]">
                Tamper-Evident Forensic Shipping
              </div>
            </div>

            {/* Tech Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-72 rounded-2xl bg-[#171719] border border-[#242426] animate-pulse" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="p-16 text-center bg-[#171719]/40 rounded-2xl border border-[#242426] space-y-4">
                <Smartphone className="w-12 h-12 text-[#A7A9AC]/40 mx-auto" />
                <h3 className="text-lg font-bold text-[#F5F4F0] font-display">No tech hardware found</h3>
                <p className="text-xs text-[#A7A9AC] max-w-sm mx-auto">
                  Adjust your search keyword or reset category filters.
                </p>
                <button 
                  onClick={resetFilters} 
                  className="px-5 py-2.5 bg-[#171719] hover:bg-[#242426] text-[#C5A878] border border-[#C5A878]/30 rounded-xl font-bold text-xs uppercase cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(p => (
                  <TechCard key={p.id} product={p} onNavigate={onNavigate} />
                ))}
              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
}
