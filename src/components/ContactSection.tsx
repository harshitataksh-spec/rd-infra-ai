import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { SiteSettings, Project } from '../types';

interface ContactSectionProps {
  settings: SiteSettings;
  projects: Project[];
  prefilledProject?: string;
  onEnquirySubmitted: (enquiry: any) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  settings,
  projects,
  prefilledProject = '',
  onEnquirySubmitted,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project: prefilledProject || 'General Enquiry / Portfolio',
    requirement: 'Farmhouse / Land Investment',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onEnquirySubmitted({
        ...formData,
        id: Date.now(),
        status: 'new',
        created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        project: 'General Enquiry / Portfolio',
        requirement: 'Farmhouse / Land Investment',
        message: '',
      });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-[#0A4D92] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Connect with the RD INFRA Advisory Team
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Schedule a personalized site consultation, enquire about upcoming parcels, or visit our strategic office in Gurgaon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Details & Quick Action Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Cards */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-5">
              <h3 className="text-lg font-bold text-slate-900">Direct Contact Channels</h3>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#0A4D92] flex items-center justify-center shrink-0 border border-blue-100">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone & Inquiries</p>
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                    className="text-base font-bold text-[#0A4D92] hover:underline"
                  >
                    {settings.phone}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Mon – Sun, 9:00 AM – 8:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#0A4D92] flex items-center justify-center shrink-0 border border-blue-100">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Official Email</p>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-base font-bold text-slate-900 hover:text-[#0A4D92] hover:underline break-all"
                  >
                    {settings.email}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Expect response within 4 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#0A4D92] flex items-center justify-center shrink-0 border border-blue-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Corporate Hub</p>
                  <p className="text-sm font-bold text-slate-900">{settings.office_location}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Serving Gurgaon, NH-48, Sohna, & Vrindavan</p>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Official Social Media</p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-slate-400 transition-colors"
                  >
                    <span>Instagram (@gurgaonluxuryfarms)</span>
                  </a>
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-slate-400 transition-colors"
                  >
                    <span>Facebook Profile</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Instant Action Call & WhatsApp Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 py-3.5 px-4 bg-[#0A4D92] hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>

              <a
                href={`https://wa.me/${settings.whatsapp}?text=Hello%20RD%20INFRA,%20I%20am%20interested%20in%20discussing%20land%20investment%20and%20farmhouse%20opportunities.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Office / Map Card */}
            <div className="p-5 bg-slate-900 text-white rounded-2xl relative overflow-hidden border border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <h4 className="text-sm font-bold">Office & Corridor Visits</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prior appointment is recommended for guided corridor visits and on-site parcel inspections. Chauffeured site inspections depart weekly from Gurgaon.
              </p>
            </div>
          </div>

          {/* Right Column: Complete Enquiry / Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Send an Official Enquiry</h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Fill in your details below and an authorized RD INFRA corridor specialist will contact you with verified documentation.
            </p>

            {isSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3 animate-in fade-in duration-300">
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Enquiry Received Successfully</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out to RD INFRA. Our team has received your enquiry and will connect with you on your phone shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Interested Project / Corridor
                    </label>
                    <select
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
                    >
                      <option value="General Enquiry / Portfolio">General Portfolio Advisory</option>
                      {projects.map((p) => (
                        <option key={p.id} value={p.project_name}>
                          {p.project_name} ({p.project_type})
                        </option>
                      ))}
                      <option value="NH-48 Delhi–Jaipur Corridor">NH-48 Delhi–Jaipur Corridor</option>
                      <option value="Sohna / Western Peripheral Corridor">Sohna / Western Peripheral Corridor</option>
                      <option value="Delhi–Mumbai Expressway Corridor">Delhi–Mumbai Expressway Corridor</option>
                      <option value="Vrindavan Spiritual Land">Vrindavan Spiritual Land</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Requirement Type
                    </label>
                    <select
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
                    >
                      <option value="Farmhouse Plot / Estate">Farmhouse Plot / Estate</option>
                      <option value="Land Investment / High Growth">Strategic Land Investment</option>
                      <option value="Plotted Development">Plotted Residential Plot</option>
                      <option value="Commercial Land Frontage">Commercial Land Frontage</option>
                      <option value="Site Visit Request">Schedule Site Visit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Specific Message or Questions
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Please specify any plot size preferences, timeline, or site inspection availability..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#0A4D92] hover:bg-blue-800 disabled:opacity-50 transition-all shadow-xs"
                  >
                    {isSubmitting ? (
                      <span>Processing Enquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Official Enquiry</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-slate-500 text-center pt-2">
                  *Your contact details remain strictly confidential and will never be shared with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
