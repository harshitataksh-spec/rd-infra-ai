import React, { useState } from 'react';
import { MapPin, CheckCircle2, ArrowRight, Eye } from 'lucide-react';
import { Project, ProjectType } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onEnquireProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
  onEnquireProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Farmhouse Projects',
    'Land Investment Projects',
    'Residential Projects',
    'Commercial Projects',
    'Plotted Developments',
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.project_type === selectedCategory);

  return (
    <section id="projects" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-[#0A4D92] text-xs font-bold uppercase tracking-wider mb-3">
              <span>Current Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Real Estate & Farmhouse Projects
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl">
              Carefully vetted land parcels, boutique country farmhouses, and planned plotted layouts positioned in high-velocity infrastructure corridors.
            </p>
          </div>

          <div className="shrink-0 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg p-3">
            <span className="font-semibold text-slate-700">Project Notice:</span> All dimensions & boundary demarcations are subject to physical verification.
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0A4D92] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Project Image & Badge */}
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.project_name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0A4D92] text-white shadow-sm">
                      {project.project_type}
                    </span>
                  </div>

                  {project.status && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-xs text-slate-800 border border-slate-200">
                        {project.status}
                      </span>
                    </div>
                  )}

                  {project.plot_size && (
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="px-3 py-1.5 rounded-lg bg-slate-950/75 backdrop-blur-xs text-white text-xs flex justify-between items-center">
                        <span className="text-slate-300">Plot Dimensions:</span>
                        <span className="font-semibold text-white">{project.plot_size}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-[#0A4D92] font-semibold mb-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-[#0A4D92]" />
                    <span className="truncate">{project.location}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0A4D92] transition-colors mb-2 leading-snug">
                    {project.project_name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 border-t border-slate-100 pt-4 mb-2">
                    <p className="text-[11px] uppercase tracking-wider font-bold text-slate-500">Key Highlights</p>
                    {project.highlights.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0A4D92] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-3 border-t border-slate-100 mt-4">
                <button
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>

                <button
                  onClick={() => onEnquireProject(project)}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#0A4D92] hover:bg-blue-800 transition-colors shadow-xs"
                >
                  <span>Enquire Now</span>
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
