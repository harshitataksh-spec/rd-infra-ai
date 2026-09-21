import React, { useState } from 'react';
import { Search, MapPin, Home, DollarSign, Bed, Maximize2, CheckSquare, Sparkles, Filter, X } from 'lucide-react';
import { PropertyType, TransactionType } from '../types';

interface PropertySearchProps {
  onSearch: (filters: SearchFilters) => void;
  onSelectTab: (tab: TransactionType) => void;
  activeTab: TransactionType;
}

export interface SearchFilters {
  transactionType: TransactionType;
  location: string;
  propertyType: string;
  budget: string;
  bedrooms: string;
  area: string;
  furnishing: string;
  possessionStatus: string;
}

export const PropertySearch: React.FC<PropertySearchProps> = ({
  onSearch,
  onSelectTab,
  activeTab,
}) => {
  const [location, setLocation] = useState('All');
  const [propertyType, setPropertyType] = useState('All');
  const [budget, setBudget] = useState('All');
  const [bedrooms, setBedrooms] = useState('All');
  const [area, setArea] = useState('All');
  const [furnishing, setFurnishing] = useState('All');
  const [possessionStatus, setPossessionStatus] = useState('All');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleTabChange = (tab: TransactionType) => {
    onSelectTab(tab);
  };

  const handleExecuteSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSearch({
      transactionType: activeTab,
      location,
      propertyType,
      budget,
      bedrooms,
      area,
      furnishing,
      possessionStatus,
    });
  };

  const handleResetFilters = () => {
    setLocation('All');
    setPropertyType('All');
    setBudget('All');
    setBedrooms('All');
    setArea('All');
    setFurnishing('All');
    setPossessionStatus('All');
    onSearch({
      transactionType: activeTab,
      location: 'All',
      propertyType: 'All',
      budget: 'All',
      bedrooms: 'All',
      area: 'All',
      furnishing: 'All',
      possessionStatus: 'All',
    });
  };

  return (
    <section id="search" className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/80 p-6 lg:p-8 backdrop-blur-sm">
        {/* Search Mode Tabs: Buy | Rent | Sell */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 pb-5 mb-6">
          <div className="flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200">
            {(['Buy', 'Rent', 'Sell'] as TransactionType[]).map((tab) => (
              <button
                key={tab}
                id={`tab-${tab.toLowerCase()}`}
                type="button"
                onClick={() => handleTabChange(tab)}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#0A4D92] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tab === 'Buy' && 'Buy Property'}
                {tab === 'Rent' && 'Rent Property'}
                {tab === 'Sell' && 'Sell / List Property'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A4D92] hover:text-blue-800 transition-colors cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>{showAdvanced ? 'Fewer Filters' : 'More Filters'}</span>
            </button>

            {(location !== 'All' || propertyType !== 'All' || budget !== 'All' || bedrooms !== 'All') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Primary Filter Grid */}
        <form onSubmit={handleExecuteSearch}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Location */}
            <div>
              <label htmlFor="search-location" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0A4D92]" />
                  Location
                </span>
              </label>
              <select
                id="search-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
              >
                <option value="All">All Gurugram & NCR Corridors</option>
                <option value="Sohna Road">Sohna Road & Aravalis</option>
                <option value="Golf Course Ext">Golf Course Extension Rd</option>
                <option value="NH-48">NH-48 Delhi–Jaipur Belt</option>
                <option value="Delhi–Mumbai Expressway">Delhi–Mumbai Expressway</option>
                <option value="Cyber City">Cyber City & DLF Hub</option>
                <option value="Vrindavan">Vrindavan Sacred Corridor</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label htmlFor="search-type" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                <span className="flex items-center gap-1">
                  <Home className="w-3.5 h-3.5 text-[#0A4D92]" />
                  Property Type
                </span>
              </label>
              <select
                id="search-type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
              >
                <option value="All">All Property Types</option>
                <option value="Apartments">Apartments / Penthouses</option>
                <option value="Villas">Villas</option>
                <option value="Independent Houses">Independent Houses / Kothis</option>
                <option value="Farmhouses">Farmhouses</option>
                <option value="Plots">Residential Plots</option>
                <option value="Commercial Properties">Commercial & Logistics</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="search-budget" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-[#0A4D92]" />
                  Budget Range
                </span>
              </label>
              <select
                id="search-budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
              >
                <option value="All">Any Budget</option>
                <option value="Under 50 Lac">Under ₹ 50 Lac</option>
                <option value="50 Lac - 1 Cr">₹ 50 Lac - ₹ 1 Cr</option>
                <option value="1 Cr - 2.5 Cr">₹ 1 Cr - ₹ 2.5 Cr</option>
                <option value="2.5 Cr - 5 Cr">₹ 2.5 Cr - ₹ 5 Cr</option>
                <option value="5 Cr+">₹ 5 Cr and Above</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label htmlFor="search-bedrooms" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                <span className="flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-[#0A4D92]" />
                  Bedrooms
                </span>
              </label>
              <select
                id="search-bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
              >
                <option value="All">Any Bedrooms</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
                <option value="5">5+ BHK</option>
              </select>
            </div>
          </div>

          {/* Advanced Collapsible Filters */}
          {showAdvanced && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 mb-4 animate-in fade-in duration-200">
              {/* Area Range */}
              <div>
                <label htmlFor="search-area" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  <span className="flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-[#0A4D92]" />
                    Area / Size
                  </span>
                </label>
                <select
                  id="search-area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
                >
                  <option value="All">Any Size</option>
                  <option value="500-1000">500 - 1,000 sq.ft</option>
                  <option value="1000-2500">1,000 - 2,500 sq.ft</option>
                  <option value="2500-5000">2,500 - 5,000 sq.ft</option>
                  <option value="1-2-acres">1 - 2 Acres Farmstead</option>
                  <option value="2-plus-acres">2+ Acres Land</option>
                </select>
              </div>

              {/* Furnishing */}
              <div>
                <label htmlFor="search-furnishing" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  <span className="flex items-center gap-1">
                    <CheckSquare className="w-3.5 h-3.5 text-[#0A4D92]" />
                    Furnishing
                  </span>
                </label>
                <select
                  id="search-furnishing"
                  value={furnishing}
                  onChange={(e) => setFurnishing(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
                >
                  <option value="All">Any Furnishing</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>

              {/* Possession Status */}
              <div>
                <label htmlFor="search-possession" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#0A4D92]" />
                    Possession Status
                  </span>
                </label>
                <select
                  id="search-possession"
                  value={possessionStatus}
                  onChange={(e) => setPossessionStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
                >
                  <option value="All">Any Possession Status</option>
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Immediate Registry">Immediate Freehold Registry</option>
                </select>
              </div>
            </div>
          )}

          {/* Search Button */}
          <div className="flex justify-end pt-2">
            <button
              id="search-properties-btn"
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0A4D92] hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search Properties</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
