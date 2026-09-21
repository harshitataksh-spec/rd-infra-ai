import React from 'react';
import { X, MapPin, CheckCircle2, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onEnquire: (project: Project) => void;
  phone: string;
  whatsapp: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onEnquire,
  phone,
  whatsapp,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-72 sm:h-80 w-full bg-slate-100">
          <img
            src={project.image}
            alt={project.project_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-[#0A4D92] text-white mb-2">
              {project.project_type}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              {project.project_name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-200 mt-1">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
            <div>
              <span className="text-slate-500 font-medium">Plot Dimensions:</span>
              <p className="font-bold text-slate-900 mt-0.5">{project.plot_size || 'Available on Request'}</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Project Status:</span>
              <p className="font-bold text-emerald-600 mt-0.5">{project.status}</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Demarcation:</span>
              <p className="font-bold text-slate-900 mt-0.5">Physical Boundary Marked</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2">
              Project Overview
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
              Key Project Highlights & Features
            </h4>
            <div className="space-y-2.5">
              {project.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#0A4D92] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {project.connectivity && (
            <div className="p-4 bg-blue-50/60 border border-blue-200/80 rounded-xl text-xs sm:text-sm text-slate-700">
              <span className="font-bold text-[#0A4D92]">Connectivity Advantage: </span>
              {project.connectivity}
            </div>
          )}

          {/* Real estate note */}
          <div className="text-[11px] text-slate-400 bg-slate-50 p-3 rounded-lg border border-slate-200">
            *Note: Project master plans, boundary coordinates, and registry records are open for verification during client site inspection.
          </div>
        </div>

        {/* Modal Footer / Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#0A4D92]" />
              <span>Call Now</span>
            </a>

            <a
              href={`https://wa.me/${whatsapp}?text=Hello%20RD%20INFRA,%20I%20would%20like%20details%20for%20${encodeURIComponent(project.project_name)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-300 rounded-xl hover:bg-emerald-100 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>

          <button
            onClick={() => {
              onClose();
              onEnquire(project);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-[#0A4D92] hover:bg-blue-800 transition-colors shadow-xs"
          >
            <span>Enquire for this Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
