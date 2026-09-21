import React from 'react';
import { MapPin, Navigation, Sparkles, ArrowRight } from 'lucide-react';
import { UpcomingProject } from '../types';

interface UpcomingProjectsSectionProps {
  upcomingProjects: UpcomingProject[];
  onRegisterInterest: (project: UpcomingProject) => void;
}

export const UpcomingProjectsSection: React.FC<UpcomingProjectsSectionProps> = ({
  upcomingProjects,
  onRegisterInterest,
}) => {
  return (
    <section id="upcoming" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100/80 border border-blue-200 text-[#0A4D92] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Future Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Upcoming & Pre-Launch Corridors
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl">
              Be the first to access early-stage plotted developments and boutique farm enclaves across North India's foremost transit corridors.
            </p>
          </div>

          <div className="shrink-0">
            <span className="inline-block px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-700">
              Corridor Focus: NH-48 • Sohna KMP • Delhi–Mumbai • Vrindavan
            </span>
          </div>
        </div>

        {/* Upcoming Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image and Coming Soon Badge */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.project_name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-slate-900 text-white border border-white/20 shadow-xs">
                      {project.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#0A4D92]/90 backdrop-blur-xs text-white">
                      {project.project_category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-[#0A4D92] font-semibold mb-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0A4D92] transition-colors mb-2 leading-snug">
                    {project.project_name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Connectivity Highlights */}
                  <div className="space-y-1.5 border-t border-slate-100 pt-3">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500 flex items-center gap-1">
                      <Navigation className="w-3 h-3 text-[#0A4D92]" />
                      Connectivity Focus
                    </p>
                    {project.connectivity_highlights.map((conn, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#0A4D92] shrink-0 mt-1"></span>
                        <span className="line-clamp-1">{conn}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0 mt-4">
                <button
                  onClick={() => onRegisterInterest(project)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#0A4D92] hover:bg-blue-800 transition-colors shadow-xs"
                >
                  <span>Register Interest</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
