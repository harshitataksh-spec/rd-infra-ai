import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Enquiry } from '../types';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
  onSuccess: (enquiry: Enquiry) => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  projectName = 'General Portfolio Advisory',
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project: projectName,
    requirement: 'Farmhouse / Land Investment',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newEnquiry: Enquiry = {
        id: Date.now(),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        project: formData.project,
        requirement: formData.requirement,
        message: formData.message,
        status: 'new',
        created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
      };
      onSuccess(newEnquiry);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              RD INFRA • Direct Advisory
            </span>
            <h3 className="text-xl font-extrabold mt-0.5">Project Enquiry & Consultation</h3>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-6 text-center space-y-4 animate-in fade-in duration-200">
              <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Enquiry Successfully Logged</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                Thank you for your interest in <strong>{formData.project}</strong>. Our senior corridor specialist will connect with you on <strong>{formData.phone}</strong>.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="w-full py-3 bg-[#0A4D92] text-white text-xs font-bold rounded-xl hover:bg-blue-800 transition-colors"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-slate-700">
                <span className="font-bold text-[#0A4D92]">Selected Interest: </span>
                <span className="font-semibold">{formData.project}</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Contact Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 97170 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Requirement
                </label>
                <select
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                >
                  <option value="Farmhouse / Land Investment">Farmhouse / Land Investment</option>
                  <option value="Exclusive 1-2 Acre Farm Plot">Exclusive 1-2 Acre Farm Plot</option>
                  <option value="Plotted Residential Land">Plotted Residential Land</option>
                  <option value="High-Growth Corridor Land">High-Growth Corridor Land</option>
                  <option value="Commercial Frontage">Commercial Frontage</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Specific Query or Preferred Site Inspection Date
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention any preferred plot dimensions or inspection schedule..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-xs text-white bg-[#0A4D92] hover:bg-blue-800 disabled:opacity-50 transition-colors shadow-xs"
                >
                  {isSubmitting ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Project Enquiry</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-slate-400 text-center">
                *Your personal information is handled in strict compliance with RD INFRA privacy guidelines.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
