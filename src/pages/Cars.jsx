import React, { useState, useEffect } from 'react';
import { getVehiclesFromStore } from '../services/marketplaceService';
import VehicleCard from '../components/vehicles/VehicleCard';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Grid, 
  List, 
  RefreshCcw, 
  Car, 
  Sparkles,
  Zap,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const CATEGORIES = [
  { id: 'All', label: 'All Fleet' },
  { id: 'Supercar', label: 'Supercars' },
  { id: 'Sports', label: 'Sports Coupe' },
  { id: 'SUV', label: 'Luxury SUV' },
  { id: 'Luxury Sedan', label: 'Executive Sedan' },
  { id: 'Electric', label: 'Electric EV' },
  { id: 'Motorcycle', label: 'Motorcycles' }
];

export default function Cars({ onNavigate, initialCategory = '', initialSearch = '' }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [selectedTransmission, setSelectedTransmission] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [maxPrice, setMaxPrice] = useState(700000);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);

  useEffect(() => {
    async function loadVehicles() {
      setLoading(true);
      const data = await getVehiclesFromStore();
      setVehicles(data);
      setLoading(false);
    }
    loadVehicles();
  }, []);

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSelectedFuel('All');
    setSelectedTransmission('All');
    setSelectedCondition('All');
    setMaxPrice(700000);
    setSortBy('featured');
  };

  const filteredVehicles = vehicles.filter(v => {
    if (search && !v.title.toLowerCase().includes(search.toLowerCase()) && !v.brand.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedCategory && selectedCategory !== 'All' && v.category !== selectedCategory) return false;
    if (selectedBrand !== 'All' && v.brand !== selectedBrand) return false;
    if (selectedFuel !== 'All' && v.fuelType !== selectedFuel) return false;
    if (selectedTransmission !== 'All' && v.transmission !== selectedTransmission) return false;
    if (selectedCondition !== 'All' && v.condition !== selectedCondition) return false;
    if (v.price > maxPrice) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'hp-high') return b.horsepower - a.horsepower;
    if (sortBy === 'year-new') return b.year - a.year;
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
                  VELOCITY AUTOMOTIVE DIVISION
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#F5F4F0]">
                Curated Luxury Fleet
              </h1>
              <p className="text-sm text-[#A7A9AC] mt-2 max-w-xl font-light">
                Certified supercars, high-performance EVs, and prestigious executive vehicles inspected to 150-point standards.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="px-3.5 py-1.5 rounded-full bg-[#171719] border border-[#242426] text-xs font-mono text-[#A7A9AC]">
                Showing <span className="text-[#C5A878] font-bold">{filteredVehicles.length}</span> allocations
              </div>
              <button
                onClick={() => setIsFilterMobileOpen(!isFilterMobileOpen)}
                className="lg:hidden px-4 py-2 bg-[#171719] border border-[#242426] text-[#C5A878] text-xs font-bold uppercase rounded-xl flex items-center gap-2"
              >
                <Filter className="w-4 h-4" /> Filters
              </button>
            </div>
          </div>

          {/* Quick Category Pill Bar */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map(cat => {
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <aside className={`lg:block ${isFilterMobileOpen ? 'block' : 'hidden'} space-y-6 bg-[#171719]/80 backdrop-blur-xl p-6 rounded-2xl border border-[#242426] h-fit sticky top-28`}>
            <div className="flex items-center justify-between pb-4 border-b border-[#242426]">
              <div className="flex items-center gap-2 text-[#F5F4F0] font-bold text-sm tracking-wide">
                <SlidersHorizontal className="w-4 h-4 text-[#C5A878]" /> Filter Allocation
              </div>
              <button 
                onClick={resetFilters}
                className="text-[11px] font-mono text-[#C5A878] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Search filter */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#A7A9AC] mb-2">Search Fleet</label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#A7A9AC]/60 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. GT3 RS, G63, Revuelto..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#0B0B0D] border border-[#242426] rounded-xl text-xs text-[#F5F4F0] placeholder-[#A7A9AC]/40 outline-none focus:border-[#C5A878] transition-colors"
                />
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#A7A9AC] mb-2">Marque / Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-3 py-2.5 text-xs text-[#F5F4F0] outline-none focus:border-[#C5A878] transition-colors cursor-pointer"
              >
                <option value="All">All Marques</option>
                <option value="Porsche">Porsche</option>
                <option value="Ferrari">Ferrari</option>
                <option value="Lamborghini">Lamborghini</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="BMW">BMW</option>
                <option value="Tesla">Tesla</option>
                <option value="Ducati">Ducati</option>
              </select>
            </div>

            {/* Max Price Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-[#A7A9AC] mb-2">
                <span className="uppercase text-[11px] tracking-wider">Ceiling Price</span>
                <span className="text-[#C5A878] font-bold">${maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={30000}
                max={700000}
                step={10000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C5A878] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#A7A9AC]/50 mt-1">
                <span>$30k</span>
                <span>$700k+</span>
              </div>
            </div>

            {/* Fuel / Powertrain */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#A7A9AC] mb-2">Powertrain</label>
              <select
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-3 py-2.5 text-xs text-[#F5F4F0] outline-none focus:border-[#C5A878] transition-colors cursor-pointer"
              >
                <option value="All">All Powertrains</option>
                <option value="Petrol">Naturally Aspirated / Turbo Petrol</option>
                <option value="Electric">Pure Electric (EV)</option>
                <option value="Hybrid">Hybrid Performance</option>
                <option value="Diesel">Twin-Turbo Diesel</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#A7A9AC] mb-2">Transmission</label>
              <select
                value={selectedTransmission}
                onChange={(e) => setSelectedTransmission(e.target.value)}
                className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-3 py-2.5 text-xs text-[#F5F4F0] outline-none focus:border-[#C5A878] transition-colors cursor-pointer"
              >
                <option value="All">All Transmissions</option>
                <option value="Dual-Clutch">PDK / Dual-Clutch (F1)</option>
                <option value="Automatic">Automatic Transmission</option>
                <option value="Manual">6-Speed Manual</option>
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#A7A9AC] mb-2">Certification</label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-3 py-2.5 text-xs text-[#F5F4F0] outline-none focus:border-[#C5A878] transition-colors cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Brand New">Brand New Showroom Allocation</option>
                <option value="Certified Pre-Owned">Certified Pre-Owned (150-Point)</option>
                <option value="Mint Condition">Collector Grade Mint</option>
              </select>
            </div>

            {/* Guarantee badge */}
            <div className="pt-2 border-t border-[#242426] flex items-center gap-2.5 text-[11px] text-[#A7A9AC] font-mono">
              <ShieldCheck className="w-4 h-4 text-[#C5A878] shrink-0" />
              <span>Full Provenance & Clean Title Escrow</span>
            </div>

          </aside>

          {/* Vehicle Grid & Sort Header */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#171719]/60 border border-[#242426]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#A7A9AC]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#0B0B0D] border border-[#242426] text-xs text-[#F5F4F0] rounded-lg px-3 py-1.5 outline-none focus:border-[#C5A878] cursor-pointer"
                >
                  <option value="featured">Featured / Priority First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="hp-high">Horsepower: High to Low</option>
                  <option value="year-new">Model Year: Newest First</option>
                </select>
              </div>

              {/* View mode toggle */}
              <div className="flex items-center gap-1 p-1 bg-[#0B0B0D] rounded-lg border border-[#242426]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-all cursor-pointer ${
                    viewMode === 'grid' ? 'bg-[#242426] text-[#C5A878]' : 'text-[#A7A9AC] hover:text-[#F5F4F0]'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-all cursor-pointer ${
                    viewMode === 'list' ? 'bg-[#242426] text-[#C5A878]' : 'text-[#A7A9AC] hover:text-[#F5F4F0]'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Listings Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-80 rounded-2xl bg-[#171719] border border-[#242426] animate-pulse" />
                ))}
              </div>
            ) : filteredVehicles.length === 0 ? (
              <div className="p-16 text-center bg-[#171719]/40 rounded-2xl border border-[#242426] space-y-4">
                <Car className="w-12 h-12 text-[#A7A9AC]/40 mx-auto" />
                <h3 className="text-lg font-bold text-[#F5F4F0] font-display">No vehicle allocations match your criteria</h3>
                <p className="text-xs text-[#A7A9AC] max-w-md mx-auto">
                  Adjust your price ceiling or clear category constraints to explore our full inventory.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-[#171719] hover:bg-[#242426] text-[#C5A878] border border-[#C5A878]/30 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Reset Filter Parameters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-5'}>
                {filteredVehicles.map(v => (
                  <VehicleCard key={v.id} vehicle={v} onNavigate={onNavigate} layout={viewMode} />
                ))}
              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
}
