import React, { useState } from 'react';
import { PropertyType } from '../types';
import {
  Upload,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Users,
  PhoneCall,
  MessageSquare,
  Sparkles,
  Home,
  MapPin,
  IndianRupee,
  AlertCircle,
} from 'lucide-react';

interface SellPropertyFormProps {
  onSubmitProperty: (data: SellSubmissionData) => Promise<boolean>;
  whatsappNumber: string;
  phone: string;
}

export interface SellSubmissionData {
  ownerName: string;
  phone: string;
  email: string;
  propertyType: PropertyType;
  location: string;
  expectedPrice: string;
  details: string;
  images: string[];
}

export const SellPropertyForm: React.FC<SellPropertyFormProps> = ({
  onSubmitProperty,
  whatsappNumber,
  phone,
}) => {
  const [ownerName, setOwnerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('Apartments');
  const [location, setLocation] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [details, setDetails] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesCount = e.target.files.length;
      const simulatedUrls = Array.from({ length: filesCount }).map(
        (_, i) => `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80`
      );
      setUploadedFiles(simulatedUrls);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!ownerName.trim() || !phoneNumber.trim() || !location.trim() || !expectedPrice.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Phone, Location, Price).');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await onSubmitProperty({
        ownerName,
        phone: phoneNumber,
        email,
        propertyType,
        location,
        expectedPrice,
        details,
        images: uploadedFiles.length > 0 ? uploadedFiles : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'],
      });

      if (success) {
        setIsSuccess(true);
        setOwnerName('');
        setPhoneNumber('');
        setEmail('');
        setLocation('');
        setExpectedPrice('');
        setDetails('');
        setUploadedFiles([]);
      }
    } catch {
      setErrorMessage('Failed to submit listing. Please try again or reach out on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="sell" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Benefits of listing with RD INFRA */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0A4D92] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sell With Confidence</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                List Your Property with RD INFRA
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Connect directly with pre-verified high-net-worth buyers, investors, and corporate tenants across Delhi-NCR and North India.
              </p>
            </div>

            {/* Value Pillars */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-blue-100/80 text-[#0A4D92] shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-slate-900">Reach Genuine Buyers</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Tap into an active network of private investors, builders, and verified corporate professionals seeking prime real estate.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-blue-100/80 text-[#0A4D92] shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-slate-900">Professional Marketing</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    High-definition digital positioning, targeted investor showcases, and high-visibility digital campaigns.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-blue-100/80 text-[#0A4D92] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-slate-900">Transparent Process</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Zero hidden terms, verified registry facilitation, and fair-market valuation guidance without unnecessary intermediaries.
                  </p>
                </div>
              </div>
            </div>

            {/* Immediate Assistance Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0A4D92] text-white shadow-lg">
              <h3 className="font-heading text-base font-bold mb-1">Need Immediate Assistance?</h3>
              <p className="text-xs text-blue-100 mb-4 leading-relaxed">
                Talk directly to our senior property listing specialist for an instant valuation or urgent divestment advice.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-slate-900 hover:bg-blue-50 rounded-xl text-xs font-bold transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#0A4D92]" />
                  <span>Call {phone}</span>
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hello%20RD%20INFRA,%20I%20would%20like%20to%20list%20my%20property%20for%20sale/rent.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Specialist</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Listing Submission Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-1">
                Property Listing Form
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Fill in your property details below. Our listing advisory desk will review and contact you within 24 hours.
              </p>

              {isSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-emerald-900">
                    Property Submitted Successfully!
                  </h4>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold">{ownerName}</span>. Your property details have been recorded in the RD INFRA registry. Our corridor valuation specialist will connect with you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="mt-2 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Submit Another Property
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Owner Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="owner-name" className="block text-xs font-semibold text-slate-700 mb-1">
                        Owner Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="owner-name"
                        type="text"
                        required
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="e.g. Ravinder Singh"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="owner-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="owner-phone"
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Property Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="owner-email" className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="owner-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="property-type" className="block text-xs font-semibold text-slate-700 mb-1">
                        Property Type <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="property-type"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
                      >
                        <option value="Apartments">Apartments / Penthouses</option>
                        <option value="Villas">Villas</option>
                        <option value="Independent Houses">Independent Houses / Kothis</option>
                        <option value="Farmhouses">Farmhouse Projects</option>
                        <option value="Plots">Residential Plots</option>
                        <option value="Commercial Properties">Commercial Properties</option>
                      </select>
                    </div>
                  </div>

                  {/* Location & Expected Price */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="property-location" className="block text-xs font-semibold text-slate-700 mb-1">
                        Location / Sector <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          id="property-location"
                          type="text"
                          required
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Golf Course Ext Rd, Gurgaon"
                          className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="expected-price" className="block text-xs font-semibold text-slate-700 mb-1">
                        Expected Price / Rent <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          id="expected-price"
                          type="text"
                          required
                          value={expectedPrice}
                          onChange={(e) => setExpectedPrice(e.target.value)}
                          placeholder="e.g. ₹ 3.50 Cr or ₹ 75,000 / mo"
                          className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Property Details / Description */}
                  <div>
                    <label htmlFor="property-details" className="block text-xs font-semibold text-slate-700 mb-1">
                      Property Details & Specifications
                    </label>
                    <textarea
                      id="property-details"
                      rows={3}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Mention super area, carpet area, facing direction, furnishing status, floor number, or any specific amenities..."
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Upload Images */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Upload Property Photographs (Optional)
                    </label>
                    <label className="border-2 border-dashed border-slate-300 hover:border-[#0A4D92] bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
                      <Upload className="w-6 h-6 text-slate-400 mb-1.5" />
                      <span className="text-xs font-bold text-[#0A4D92]">Click to choose photos</span>
                      <span className="text-[11px] text-slate-500 mt-0.5">JPEG, PNG up to 10MB</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleSimulatedFileUpload}
                        className="hidden"
                      />
                    </label>
                    {uploadedFiles.length > 0 && (
                      <div className="mt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{uploadedFiles.length} photo(s) selected for listing upload</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      id="submit-property-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-[#0A4D92] hover:bg-blue-800 disabled:bg-slate-400 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Processing Submission...</span>
                      ) : (
                        <span>Submit Property for Review</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
