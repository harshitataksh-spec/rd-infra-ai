import React, { useState } from 'react';
import { Building2, MapPin, Factory, TrendingUp, Navigation, Trees, Compass, Heart, ArrowRight } from 'lucide-react';
import { investmentCorridors } from '../data/initialData';

interface CorridorsSectionProps {
  onExploreCorridorProjects: (corridorName: string) => void;
}

export const CorridorsSection: React.FC<CorridorsSectionProps> = ({
  onExploreCorridorProjects,
}) => {
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>('sohna-wpr');

  const iconMap: Record<string, React.ElementType> = {
    Building2,
    MapPin,
    Factory,
    TrendingUp,
    Navigation,
    Trees,
    Compass,
    Heart,
  };

  const activeCorridor =
    investmentCorridors.find((c) => c.id === selectedCorridorId) ||
    investmentCorridors[0];

  const ActiveIcon = iconMap[activeCorridor.icon] || MapPin;

  return (
    <section id="corridors" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-[#0A4D92] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Regional Presence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Key Real Estate & Investment Corridors
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Markets and transit corridors where RD INFRA brings deep underwriting familiarity, transaction history, and active project focus.
          </p>
        </div>

        {/* Corridor Quick Selector Pills / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-10">
          {investmentCorridors.map((corridor) => {
            const Icon = iconMap[corridor.icon] || MapPin;
            const isSelected = corridor.id === selectedCorridorId;
            return (
              <button
                key={corridor.id}
                onClick={() => setSelectedCorridorId(corridor.id)}
                className={`p-3 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-[#0A4D92] text-white shadow-md scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-white' : 'text-[#0A4D92]'}`} />
                <span className="text-xs font-bold leading-tight line-clamp-1">{corridor.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Corridor Deep-Dive Visual Showcase */}
        <div className="bg-slate-900 text-white rounded-3xl overflow-hidden shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Details Panel */}
            <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-blue-600/30 border border-blue-400/30 text-blue-300">
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-blue-300">
                      {activeCorridor.type}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {activeCorridor.name}
                    </h3>
                  </div>
                </div>

                <p className="text-sm font-semibold text-slate-300 mb-4 italic">
                  “{activeCorridor.tagline}”
                </p>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                  {activeCorridor.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 mb-8">
                  <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                    Corridor Fundamentals
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {activeCorridor.highlights.map((h, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-200">
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verified Corridor Notice */}
              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-[11px] text-slate-400 leading-normal max-w-md">
                  *Disclaimer: These corridors represent areas where RD INFRA actively operates and evaluates opportunities. No guaranteed returns or appreciation rates are implied.
                </p>
                <button
                  onClick={() => onExploreCorridorProjects(activeCorridor.name)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#0A4D92] hover:bg-blue-600 transition-colors shrink-0"
                >
                  <span>View Projects in Corridor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Map/Landscape Representation */}
            <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full bg-slate-800 flex items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              {/* Regional Schematic Card */}
              <div className="relative z-10 w-full max-w-sm p-6 rounded-2xl bg-slate-900/90 border border-slate-700 backdrop-blur-md text-center">
                <div className="h-14 w-14 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 mx-auto flex items-center justify-center mb-4">
                  <ActiveIcon className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{activeCorridor.name} Corridor</h4>
                <p className="text-xs text-slate-400 mb-4">Active Underwriting & Development</p>
                
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-left space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Target Asset Class:</span>
                    <span className="font-semibold text-white">Farmhouses & Land</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Advisory Since:</span>
                    <span className="font-semibold text-white">2014</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Title Verification:</span>
                    <span className="font-semibold text-emerald-400">100% Physical Check</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
