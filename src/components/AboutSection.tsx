import React, { useState } from 'react';
import { Target, Compass, Sparkles, BookOpen, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SiteSettings } from '../types';

interface AboutSectionProps {
  settings: SiteSettings;
  onOpenEnquiry: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  settings,
  onOpenEnquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'story' | 'vision' | 'expertise' | 'commitment'>('story');

  const aboutTabs = [
    { id: 'story', label: 'Our Story & Heritage', icon: BookOpen },
    { id: 'expertise', label: 'Our Expertise & Scope', icon: Clock },
    { id: 'vision', label: 'Vision & Mission', icon: Compass },
    { id: 'commitment', label: 'Our Commitment', icon: ShieldCheck },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-[#0A4D92] text-xs font-bold uppercase tracking-wider mb-3">
            <span>About RD INFRA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Over a Decade of Trust, Underwriting & Strategic Real Estate
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Founded in 2014, RD Infra has helped investors, end-users, and families navigate North India’s most promising real estate developments with honesty and precision.
          </p>
        </div>

        {/* Primary Company Narrative Card (Word-for-word authoritative content from prompt) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed text-base">
            <div className="p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-2xl relative shadow-xs">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#0A4D92] rounded-t-2xl"></div>
              <p className="text-base sm:text-lg font-medium text-slate-900 mb-4">
                “RD Infra is a trusted real estate company built on over a decade of industry experience. Since 2014, we have been actively involved in the real estate sector, successfully marketing and selling residential plots, floors, apartments, commercial projects, and plotted developments across Gurgaon, Karnal, Dharuhera, Bawal, and surrounding regions.”
              </p>
              <p className="text-slate-600 mb-4">
                With extensive experience in project underwriting, sales, and market analysis, we understand the dynamics of the real estate market and help our clients make informed investment decisions. Over the years, we have worked with a wide range of real estate developments, delivering value-driven opportunities to investors and end users alike.
              </p>
              <p className="text-slate-600">
                Today, RD Infra specializes in premium farmhouse and land investment projects located in some of North India's fastest-growing corridors. We are currently working on carefully selected farmhouse developments along the NH-48 Delhi–Jaipur Highway, Sohna Western Peripheral region, Delhi–Mumbai Expressway corridor, and the spiritual and rapidly developing destination of Vrindavan.
              </p>
            </div>

            <div className="p-6 bg-blue-50/70 border border-blue-200/80 rounded-2xl">
              <p className="text-slate-800 font-semibold mb-2">Strategic Location Focus & Transparency</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                At RD Infra, our focus is on identifying strategic locations with strong growth potential, excellent connectivity, and long-term investment value. We are committed to maintaining the highest standards of transparency, professionalism, and customer service, ensuring that every client receives expert guidance throughout their investment journey.
              </p>
            </div>
          </div>

          {/* Right Visual / Experience Metric Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
                alt="RD INFRA Land and Luxury Farmhouse Developments"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-blue-300">RD INFRA Flagship Focus</p>
                  <p className="text-lg font-bold text-white">Curated Luxury Farmhouses & Corridors</p>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
                <p className="text-3xl font-black text-[#0A4D92]">2014</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Year Established</p>
                <p className="text-xs text-slate-600 mt-1">Decade+ of uninterrupted market presence</p>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
                <p className="text-3xl font-black text-slate-800">8+</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Active Corridors</p>
                <p className="text-xs text-slate-600 mt-1">Gurgaon, NH-48, Sohna, Vrindavan</p>
              </div>
            </div>

            {/* CTA Box */}
            <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-md border border-slate-800">
              <h3 className="text-base font-bold mb-2">Build Your Future with Confidence</h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Whether you are looking for a premium farmhouse, a secure land investment, or a future growth opportunity, RD Infra is dedicated to helping you invest with confidence.
              </p>
              <button
                onClick={onOpenEnquiry}
                className="w-full py-2.5 px-4 bg-[#0A4D92] hover:bg-blue-600 text-white font-bold text-xs rounded-lg transition-all text-center"
              >
                Talk to Our Advisory Team
              </button>
            </div>
          </div>
        </div>

        {/* Structured About Sub-Sections: Story, Experience, Expertise, Vision, Mission, Why RD Infra, Commitment */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 mb-6">
            {aboutTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#0A4D92] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Our Story & Experience */}
          {activeTab === 'story' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-200">
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#0A4D92]"></span>
                  Our Story
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  RD Infra was conceived with a clear ethos: providing investors with verified, grounded, and transparent access to growth corridors. We began in 2014 when the National Capital Region was entering an era of mega-infrastructure expansion.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Rather than chasing short-lived market bubbles, we anchored our focus on physical connectivity, government master plans, arterial expressways, and clean title verifications.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#0A4D92]"></span>
                  Our Experience
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  With more than 10 years of continuous market activity, our team has executed plotted developments, commercial land acquisitions, and premium farmhouse layouts across Gurgaon, Karnal, Dharuhera, Bawal, and peripheral highways.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#0A4D92] shrink-0 mt-0.5" />
                    <span>In-depth project underwriting and legal registry assessment</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#0A4D92] shrink-0 mt-0.5" />
                    <span>Deep field insights into infrastructure milestones like the Delhi–Mumbai Expressway</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#0A4D92] shrink-0 mt-0.5" />
                    <span>Longstanding relationships with landowners, planners, and verified developers</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Our Expertise & Scope */}
          {activeTab === 'expertise' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
              <div className="p-5 bg-white rounded-xl border border-slate-200">
                <div className="h-10 w-10 rounded-lg bg-blue-50 text-[#0A4D92] flex items-center justify-center font-bold mb-3">
                  01
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Luxury Farmhouse Development</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Specializing in gated agricultural and leisure farm estates in the scenic Aravalis, Sohna KMP, and NH-48 belts with private roads, tree buffers, and underground utilities.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200">
                <div className="h-10 w-10 rounded-lg bg-blue-50 text-[#0A4D92] flex items-center justify-center font-bold mb-3">
                  02
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Strategic Land Underwriting</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Identifying early-stage land parcels along the Delhi–Mumbai Expressway spine and Vrindavan corridor before major connectivity upgrades drive up capital entry barriers.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200">
                <div className="h-10 w-10 rounded-lg bg-blue-50 text-[#0A4D92] flex items-center justify-center font-bold mb-3">
                  03
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Plotted Residential Communities</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Structuring orderly plotted layouts with wide blacktop roads, municipal linkages, storm drainage, and secure demarcations in emerging growth cities like Karnal and Bawal.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Our Vision & Mission */}
          {activeTab === 'vision' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-200">
              <div className="p-6 bg-white rounded-xl border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-50 text-[#0A4D92] rounded-lg">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Our Vision</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To be North India's most trusted and preferred real estate partner for premium farmhouses and land investments—renowned for unmatched integrity, spatial intelligence, and lasting client prosperity.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-50 text-[#0A4D92] rounded-lg">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To guide every investor and family with rigorous diligence, clear facts, and strategic location opportunities, empowering them to build meaningful wealth and serene country homes with complete peace of mind.
                </p>
              </div>
            </div>
          )}

          {/* Tab 4: Our Commitment */}
          {activeTab === 'commitment' && (
            <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-[#0A4D92] rounded-lg">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Our Commitment to You</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                At RD Infra, we never treat land transactions as merely commercial trades. We view every parcel as a legacy asset for your family.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="border border-slate-100 rounded-lg p-3 bg-slate-50">
                  <p className="font-bold text-slate-900 text-xs mb-1">Zero Speculation</p>
                  <p className="text-[11px] text-slate-500">We do not promise unrealistic or guaranteed returns. We present actual corridor data.</p>
                </div>
                <div className="border border-slate-100 rounded-lg p-3 bg-slate-50">
                  <p className="font-bold text-slate-900 text-xs mb-1">On-Ground Verification</p>
                  <p className="text-[11px] text-slate-500">Every project undergoes physical boundary inspection and access road verification.</p>
                </div>
                <div className="border border-slate-100 rounded-lg p-3 bg-slate-50">
                  <p className="font-bold text-slate-900 text-xs mb-1">Lifelong Partnership</p>
                  <p className="text-[11px] text-slate-500">From site selection to possession and maintenance guidance, we stand beside you.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
