import React, { useState } from 'react';
import {
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Send,
  Calendar,
  Clock,
  MapPin,
  IndianRupee,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { Lead } from '../types';

interface LeadGenerationSectionProps {
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status' | 'assignedTo'>) => Promise<boolean>;
  phone: string;
}

export const LeadGenerationSection: React.FC<LeadGenerationSectionProps> = ({
  onAddLead,
  phone,
}) => {
  // Recommendation Form State
  const [recName, setRecName] = useState('');
  const [recPhone, setRecPhone] = useState('');
  const [recEmail, setRecEmail] = useState('');
  const [recLocation, setRecLocation] = useState('Gurugram / Sohna Road');
  const [recType, setRecType] = useState<'Buy' | 'Rent'>('Buy');
  const [recBudget, setRecBudget] = useState('₹ 1 Cr - ₹ 2.5 Cr');
  const [recSubmitted, setRecSubmitted] = useState(false);
  const [recLoading, setRecLoading] = useState(false);

  // Callback Form State
  const [callName, setCallName] = useState('');
  const [callPhone, setCallPhone] = useState('');
  const [callTime, setCallTime] = useState('Morning (10 AM - 1 PM)');
  const [callSubmitted, setCallSubmitted] = useState(false);
  const [callLoading, setCallLoading] = useState(false);

  const handleRecommendationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recName.trim() || !recPhone.trim()) return;

    setRecLoading(true);
    try {
      await onAddLead({
        name: recName.trim(),
        phone: recPhone.trim(),
        email: recEmail.trim(),
        requirement: `${recType} property in ${recLocation}`,
        transactionType: recType,
        location: recLocation,
        budget: recBudget,
        message: `Requested property recommendations for ${recType} in ${recLocation} (Budget: ${recBudget}).`,
      });
      setRecSubmitted(true);
      setRecName('');
      setRecPhone('');
      setRecEmail('');
    } catch {
      // error handled
    } finally {
      setRecLoading(false);
    }
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callName.trim() || !callPhone.trim()) return;

    setCallLoading(true);
    try {
      await onAddLead({
        name: callName.trim(),
        phone: callPhone.trim(),
        email: '',
        requirement: `Callback requested for: ${callTime}`,
        transactionType: 'General',
        location: 'Delhi-NCR',
        budget: 'Not Specified',
        message: `Priority callback requested by client for ${callTime}.`,
      });
      setCallSubmitted(true);
      setCallName('');
      setCallPhone('');
    } catch {
      // error handled
    } finally {
      setCallLoading(false);
    }
  };

  return (
    <section id="recommendations" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Section A: Get Property Recommendations */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0A4D92] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Personalized Matching</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Get Property Recommendations
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tell us your preferences. Our acquisition team will evaluate off-market and listed portfolios to send you tailored matches.
              </p>

              {recSubmitted ? (
                <div className="my-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="font-heading text-base font-bold text-emerald-900">
                    Recommendations Requested!
                  </div>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                    Our corridor advisor is preparing your tailored property dossier and will reach out shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setRecSubmitted(false)}
                    className="mt-2 text-xs font-bold text-emerald-800 underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRecommendationSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="rec-name" className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="rec-name"
                        type="text"
                        required
                        value={recName}
                        onChange={(e) => setRecName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                      />
                    </div>
                    <div>
                      <label htmlFor="rec-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="rec-phone"
                        type="tel"
                        required
                        value={recPhone}
                        onChange={(e) => setRecPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="rec-email" className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="rec-email"
                        type="email"
                        value={recEmail}
                        onChange={(e) => setRecEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                      />
                    </div>

                    <div>
                      <label htmlFor="rec-pref-location" className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Location
                      </label>
                      <select
                        id="rec-pref-location"
                        value={recLocation}
                        onChange={(e) => setRecLocation(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                      >
                        <option value="Gurugram / Sohna Road">Gurugram / Sohna Road</option>
                        <option value="Golf Course Extension">Golf Course Extension Road</option>
                        <option value="NH-48 Delhi-Jaipur Corridor">NH-48 Delhi-Jaipur Corridor</option>
                        <option value="Delhi-Mumbai Expressway">Delhi-Mumbai Expressway</option>
                        <option value="Cyber City / MG Road">Cyber City / MG Road</option>
                        <option value="Vrindavan Spiritual Hub">Vrindavan Spiritual Corridor</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Purpose
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setRecType('Buy')}
                          className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                            recType === 'Buy'
                              ? 'bg-[#0A4D92] text-white border-[#0A4D92]'
                              : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          Buy Property
                        </button>
                        <button
                          type="button"
                          onClick={() => setRecType('Rent')}
                          className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                            recType === 'Rent'
                              ? 'bg-[#0A4D92] text-white border-[#0A4D92]'
                              : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          Rent Property
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="rec-budget" className="block text-xs font-semibold text-slate-700 mb-1">
                        Target Budget
                      </label>
                      <select
                        id="rec-budget"
                        value={recBudget}
                        onChange={(e) => setRecBudget(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                      >
                        <option value="Under ₹ 50 Lac">Under ₹ 50 Lac</option>
                        <option value="₹ 50 Lac - ₹ 1 Cr">₹ 50 Lac - ₹ 1 Cr</option>
                        <option value="₹ 1 Cr - ₹ 2.5 Cr">₹ 1 Cr - ₹ 2.5 Cr</option>
                        <option value="₹ 2.5 Cr - ₹ 5 Cr">₹ 2.5 Cr - ₹ 5 Cr</option>
                        <option value="₹ 5 Cr+">₹ 5 Cr and Above</option>
                      </select>
                    </div>
                  </div>

                  <button
                    id="get-recommendations-btn"
                    type="submit"
                    disabled={recLoading}
                    className="w-full py-3 bg-[#0A4D92] hover:bg-blue-800 disabled:bg-slate-400 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{recLoading ? 'Processing Request...' : 'Get Recommendations'}</span>
                  </button>
                </form>
              )}
            </div>

            <div className="mt-4 text-[11px] text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
              <span>100% Privacy Guaranteed. We never spam or share your contact info.</span>
            </div>
          </div>

          {/* Section B: Request a Callback */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#0A4D92] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-wider mb-3">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Direct Access</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Request a Callback
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-blue-100 leading-relaxed">
                Prefer to speak on the phone? Leave your details and convenient time for an executive consultation.
              </p>

              {callSubmitted ? (
                <div className="my-8 p-6 rounded-2xl bg-white/10 border border-white/20 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="font-heading text-base font-bold text-white">
                    Callback Scheduled!
                  </div>
                  <p className="text-xs text-blue-100 max-w-xs mx-auto">
                    We have queued your callback request for {callTime}. An RD INFRA advisor will call you promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setCallSubmitted(false)}
                    className="mt-2 text-xs font-bold text-blue-300 underline"
                  >
                    Schedule another call
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="call-name" className="block text-xs font-semibold text-blue-100 mb-1">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="call-name"
                      type="text"
                      required
                      value={callName}
                      onChange={(e) => setCallName(e.target.value)}
                      placeholder="e.g. Vikramaditya"
                      className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder:text-blue-200/50 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="call-phone" className="block text-xs font-semibold text-blue-100 mb-1">
                      Phone Number <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="call-phone"
                      type="tel"
                      required
                      value={callPhone}
                      onChange={(e) => setCallPhone(e.target.value)}
                      placeholder="+91 97170 77699"
                      className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder:text-blue-200/50 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="call-time-select" className="block text-xs font-semibold text-blue-100 mb-1">
                      Preferred Time
                    </label>
                    <select
                      id="call-time-select"
                      value={callTime}
                      onChange={(e) => setCallTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-800 border border-white/20 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <option value="Morning (10 AM - 1 PM)">Morning (10:00 AM - 1:00 PM)</option>
                      <option value="Afternoon (1 PM - 4 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                      <option value="Evening (4 PM - 7 PM)">Evening (4:00 PM - 7:00 PM)</option>
                      <option value="Immediate / As soon as possible">Immediate / ASAP</option>
                    </select>
                  </div>

                  <button
                    id="request-callback-btn"
                    type="submit"
                    disabled={callLoading}
                    className="w-full py-3 bg-white hover:bg-blue-50 text-[#0A4D92] font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{callLoading ? 'Submitting...' : 'Request Call'}</span>
                  </button>
                </form>
              )}
            </div>

            <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs text-blue-200">
              <span>Direct Desk Line:</span>
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="font-bold text-white hover:underline">
                {phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
