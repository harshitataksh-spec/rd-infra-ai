import React, { useState } from 'react';
import { Property, TransactionType } from '../types';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Phone,
  MessageSquare,
  Eye,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  X,
  Share2,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

interface PropertiesSectionProps {
  properties: Property[];
  onSelectProperty?: (property: Property) => void;
  onEnquireProperty?: (property: Property) => void;
  onContactAdvisor?: (property: Property) => void;
  whatsappNumber: string;
  controlledFilter?: 'Featured' | 'Buy' | 'Rent' | 'All';
  onFilterChange?: (filter: 'Featured' | 'Buy' | 'Rent' | 'All') => void;
}

export const PropertiesSection: React.FC<PropertiesSectionProps> = ({
  properties,
  onSelectProperty,
  onEnquireProperty,
  onContactAdvisor,
  whatsappNumber,
  controlledFilter,
  onFilterChange,
}) => {
  const [internalFilter, setInternalFilter] = useState<'Featured' | 'Buy' | 'Rent' | 'All'>('Featured');
  const activeFilter = controlledFilter !== undefined ? controlledFilter : internalFilter;

  const handleFilterSelect = (filter: 'Featured' | 'Buy' | 'Rent' | 'All') => {
    setInternalFilter(filter);
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  const [selectedModalProperty, setSelectedModalProperty] = useState<Property | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter properties based on active filter
  const displayedProperties = properties.filter((item) => {
    if (!item.published) return false;
    if (activeFilter === 'Featured') return item.featured;
    if (activeFilter === 'Buy') return item.transactionType === 'Buy';
    if (activeFilter === 'Rent') return item.transactionType === 'Rent';
    return true;
  });

  const handleOpenDetails = (prop: Property) => {
    setSelectedModalProperty(prop);
    if (onSelectProperty) onSelectProperty(prop);
  };

  const handleShare = (prop: Property) => {
    if (navigator.share) {
      navigator.share({
        title: `${prop.title} | RD INFRA`,
        text: `Check out this verified property in ${prop.location}: ${prop.title} (${prop.price})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section id="properties" className="py-20 bg-slate-50 border-t border-slate-200/60 relative">
      {/* Anchor targets for direct Buy and Rent navigation */}
      <div id="buy" className="absolute -top-24 left-0 w-full h-1 pointer-events-none" />
      <div id="rent" className="absolute -top-24 left-0 w-full h-1 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0A4D92] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Portfolios</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Properties & Portfolios
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Explore handpicked residential apartments, luxury country villas, strategic land corridors, and commercial assets curated by RD INFRA.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
            {(['Featured', 'Buy', 'Rent', 'All'] as const).map((filter) => (
              <button
                key={filter}
                id={`filter-${filter.toLowerCase()}`}
                onClick={() => handleFilterSelect(filter)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#0A4D92] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {filter === 'Featured' && 'Featured'}
                {filter === 'Buy' && 'For Sale (Buy)'}
                {filter === 'Rent' && 'For Rent'}
                {filter === 'All' && 'All Listings'}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        {displayedProperties.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-slate-500 font-medium">No properties match this selection.</p>
            <button
              onClick={() => handleFilterSelect('All')}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A4D92] hover:underline"
            >
              View all listings
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProperties.map((prop) => {
              const whatsappMsg = encodeURIComponent(
                `Hello RD INFRA, I am interested in "${prop.title}" (${prop.price}) located in ${prop.location}. Please share the detailed brochure and schedule a site visit.`
              );

              return (
                <div
                  key={prop.id}
                  id={`property-card-${prop.id}`}
                  className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
                >
                  {/* Property Image & Status Badges */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={prop.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

                    {/* Transaction Badge */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-[#0A4D92] text-white shadow-sm">
                        {prop.transactionType}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/90 backdrop-blur-sm text-slate-800 shadow-sm">
                        {prop.type}
                      </span>
                    </div>

                    {/* Possession Badge */}
                    <div className="absolute bottom-3.5 left-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/90 text-white backdrop-blur-sm shadow-sm">
                        <CheckCircle2 className="w-3 h-3" />
                        {prop.possessionStatus}
                      </span>
                    </div>

                    {/* Quick Price Tag */}
                    <div className="absolute bottom-3.5 right-3.5">
                      <span className="font-heading text-lg font-bold text-white tracking-tight drop-shadow-md">
                        {prop.price}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#0A4D92] shrink-0" />
                        <span className="truncate">{prop.location}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-[#0A4D92] transition-colors line-clamp-1 mb-2">
                        {prop.title}
                      </h3>

                      {/* Description Excerpt */}
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {prop.description}
                      </p>

                      {/* Key Attributes Bar */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs text-slate-700 mb-4 bg-slate-50/60 rounded-lg px-2">
                        {prop.bedrooms > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <Bed className="w-3.5 h-3.5 text-slate-400" />
                            <span className="font-semibold">{prop.bedrooms} BHK</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                            <span className="font-semibold">{prop.type}</span>
                          </div>
                        )}

                        {prop.bathrooms > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <Bath className="w-3.5 h-3.5 text-slate-400" />
                            <span className="font-semibold">{prop.bathrooms} Baths</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                            <span className="font-semibold">Freehold</span>
                          </div>
                        )}

                        <div className="flex items-center gap-1.5 truncate">
                          <Maximize2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-semibold truncate">{prop.area}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions: View Details | Contact | WhatsApp */}
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        id={`view-details-${prop.id}`}
                        type="button"
                        onClick={() => handleOpenDetails(prop)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-[#0A4D92] text-slate-800 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>

                      <button
                        id={`enquire-${prop.id}`}
                        type="button"
                        onClick={() => onEnquireProperty(prop)}
                        className="inline-flex items-center justify-center gap-1 px-3 py-2.5 bg-blue-50 hover:bg-blue-100 text-[#0A4D92] border border-blue-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                        title="Enquire Now"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Enquire</span>
                      </button>

                      <a
                        id={`whatsapp-${prop.id}`}
                        href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl transition-all cursor-pointer"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4 text-emerald-600" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Property Details Modal */}
      {selectedModalProperty && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0A4D92]">
                  {selectedModalProperty.type} • {selectedModalProperty.transactionType}
                </span>
                <h3 className="font-heading text-xl font-bold text-slate-900 line-clamp-1">
                  {selectedModalProperty.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleShare(selectedModalProperty)}
                  className="p-2 rounded-xl text-slate-600 hover:text-[#0A4D92] hover:bg-slate-100 transition-colors"
                  title="Share Property"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedModalProperty(null)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Image Gallery */}
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={selectedModalProperty.images[0]}
                  alt={selectedModalProperty.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Price & Location Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Estimated Price</div>
                  <div className="font-heading text-3xl font-extrabold text-[#0A4D92]">
                    {selectedModalProperty.price}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Status</div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {selectedModalProperty.status}
                  </div>
                </div>
              </div>

              {/* Specification Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <div className="text-xs text-slate-500">Area</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{selectedModalProperty.area}</div>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <div className="text-xs text-slate-500">Bedrooms</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{selectedModalProperty.bedrooms || 'Plot / Comm.'}</div>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <div className="text-xs text-slate-500">Furnishing</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{selectedModalProperty.furnishing}</div>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <div className="text-xs text-slate-500">Possession</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{selectedModalProperty.possessionStatus}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-heading text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Property Overview
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedModalProperty.description}
                </p>
              </div>

              {/* Amenities */}
              {selectedModalProperty.amenities && selectedModalProperty.amenities.length > 0 && (
                <div>
                  <h4 className="font-heading text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Features & Amenities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedModalProperty.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Verified Trust Note */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-3 text-xs text-slate-700 leading-relaxed">
                <ShieldCheck className="w-5 h-5 text-[#0A4D92] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-bold block mb-0.5">RD INFRA Legal & Physical Verification:</strong>
                  Every listing has verified land revenue records, clear demarcation, and physical road access checked by our in-house corridor specialists.
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-3">
              <div className="text-xs text-slate-500 hidden sm:block">
                Ref ID: RD-PROP-{selectedModalProperty.id}
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `Hello RD INFRA, I am viewing "${selectedModalProperty.title}" on rd-infra.in. Please connect me with a representative.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Specialist</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const prop = selectedModalProperty;
                    setSelectedModalProperty(null);
                    onEnquireProperty(prop);
                  }}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0A4D92] hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  <span>Book Site Visit</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
