import React, { useState } from 'react';
import { MessageSquareQuote, Star, Plus, Trash2, Edit2, CheckCircle2 } from 'lucide-react';
import { Testimonial } from '../types';

interface AdminTestimonialsViewProps {
  testimonials: Testimonial[];
  onUpdateTestimonials: (testimonials: Testimonial[]) => void;
  onAddActivityLog: (action: string, record: string) => void;
}

export const AdminTestimonialsView: React.FC<AdminTestimonialsViewProps> = ({
  testimonials,
  onUpdateTestimonials,
  onAddActivityLog,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [propertyType, setPropertyType] = useState('Farmhouse Asset');

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setName('');
    setRole('');
    setComment('');
    setRating(5);
    setPropertyType('Farmhouse Asset');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (idx: number) => {
    const t = testimonials[idx];
    setEditingIndex(idx);
    setName(t.name || t.customer_name || '');
    setRole(t.role || t.location_tag || '');
    setComment(t.comment || t.testimonial || '');
    setRating(t.rating || 5);
    setPropertyType(t.propertyType || 'Residential');
    setIsFormOpen(true);
  };

  const handleDelete = (idx: number) => {
    const t = testimonials[idx];
    const clientName = t.name || t.customer_name || 'Client';
    if (confirm(`Remove testimonial from "${clientName}"?`)) {
      const next = testimonials.filter((_, i) => i !== idx);
      onUpdateTestimonials(next);
      onAddActivityLog('Deleted Testimonial', `Testimonial by ${clientName} removed`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newTestimonial: Testimonial = {
      id: editingIndex !== null ? testimonials[editingIndex].id : Date.now(),
      customer_name: name.trim(),
      name: name.trim(),
      role: role.trim() || 'Valued Client',
      location_tag: role.trim() || 'Valued Client',
      testimonial: comment.trim(),
      comment: comment.trim(),
      rating,
      propertyType,
      status: 'published',
    };

    let next: Testimonial[];
    if (editingIndex !== null) {
      next = testimonials.map((item, i) => (i === editingIndex ? newTestimonial : item));
      onAddActivityLog('Updated Testimonial', `Testimonial by ${newTestimonial.name} updated`);
    } else {
      next = [newTestimonial, ...testimonials];
      onAddActivityLog('Added Testimonial', `New testimonial from ${newTestimonial.name} published`);
    }

    onUpdateTestimonials(next);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
            <MessageSquareQuote className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 font-heading">
              Client Testimonials & Executive Endorsements
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified client reviews displayed on public website homepage and credibility panels.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#0A4D92] hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              {editingIndex !== null ? 'Edit Testimonial' : 'Add Client Testimonial'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Client Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Alok Mathur"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Designation / Organization</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. HNWI Investor / Senior Director"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                  >
                    <option value={5}>5 Stars (Exceptional)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Average)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Property Focus</label>
                  <input
                    type="text"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    placeholder="e.g. Luxury Farmhouse"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Testimonial Comment</label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Client feedback, experience with Mr. Ravinder Deshwal, and transaction advisory."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0A4D92] hover:bg-blue-800 text-white font-bold rounded-xl shadow-xs"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t, idx) => (
          <div
            key={t.id || idx}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {t.propertyType || 'Real Estate'}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{t.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900">{t.name}</div>
                <div className="text-[11px] text-slate-500">{t.role}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(idx)}
                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  title="Edit testimonial"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(idx)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete testimonial"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
