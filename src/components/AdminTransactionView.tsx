import React, { useState } from 'react';
import {
  Building,
  Mail,
  Home,
  Tag,
  PhoneCall,
  TrendingUp,
  Plus,
  Search,
  CheckCircle,
  Clock,
  Phone,
  User,
  ArrowUpRight,
} from 'lucide-react';
import { Property, Lead } from '../types';

interface AdminTransactionViewProps {
  type: 'buy' | 'sell' | 'rent' | 'investment';
  properties: Property[];
  leads: Lead[];
  onOpenAddProperty: () => void;
  onUpdateLeadStatus: (leadId: string, status: Lead['status']) => void;
}

export const AdminTransactionView: React.FC<AdminTransactionViewProps> = ({
  type,
  properties,
  leads,
  onOpenAddProperty,
  onUpdateLeadStatus,
}) => {
  const [search, setSearch] = useState('');

  const config = {
    buy: {
      title: 'Buy & Acquisition Inquiries',
      description: 'Prospective buyers looking for premium residences, farmhouses, and strategic plots.',
      transactionKey: 'Buy',
      icon: Home,
      accent: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    sell: {
      title: 'Sell & Owner Listings Submissions',
      description: 'Property owners and sellers requesting valuations and exclusive listing representation.',
      transactionKey: 'Sell',
      icon: Tag,
      accent: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    rent: {
      title: 'Rental & Tenancy Inquiries',
      description: 'Corporate and luxury rental requests for farmsteads and prime residences.',
      transactionKey: 'Rent',
      icon: PhoneCall,
      accent: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    investment: {
      title: 'Strategic Investment & Land Corridors',
      description: 'High-net-worth investors evaluating NH-48, Dwarka Expressway, and Northern Haryana acreage.',
      transactionKey: 'Investment',
      icon: TrendingUp,
      accent: 'text-purple-600 bg-purple-50 border-purple-200',
    },
  }[type];

  const Icon = config.icon;

  // Filter leads matching this transaction type
  const matchedLeads = leads.filter((l) => {
    const matchesType =
      type === 'investment'
        ? l.transactionType === 'Buy' && (l.budget?.includes('Cr') || l.requirement?.toLowerCase().includes('land') || l.requirement?.toLowerCase().includes('invest'))
        : l.transactionType.toLowerCase() === config.transactionKey.toLowerCase();

    if (!matchesType) return false;
    if (!search) return true;
    return (
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      (l.location && l.location.toLowerCase().includes(search.toLowerCase()))
    );
  });

  // Filter properties matching this transaction type
  const matchedProperties = properties.filter((p) => {
    if (type === 'buy') return p.transactionType === 'Buy';
    if (type === 'rent') return p.transactionType === 'Rent';
    if (type === 'sell') return p.transactionType === 'Sell';
    if (type === 'investment') return p.category === 'Commercial' || p.category === 'Farmhouse' || p.category === 'Plot';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${config.accent}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 font-heading">{config.title}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{config.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAddProperty}
            className="px-4 py-2.5 bg-[#0A4D92] hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add {config.transactionKey} Listing</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Inquiries</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{matchedLeads.length}</div>
          <div className="text-[10px] text-slate-500 mt-1">Direct pipeline submissions</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Available Inventories</div>
          <div className="text-2xl font-black text-[#0A4D92] mt-1">{matchedProperties.length}</div>
          <div className="text-[10px] text-slate-500 mt-1">Curated property assets</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pending Action</div>
          <div className="text-2xl font-black text-amber-600 mt-1">
            {matchedLeads.filter((l) => l.status === 'New' || l.status === 'Contacted').length}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Awaiting advisor response</div>
        </div>
      </div>

      {/* Leads Table for this category */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              {config.transactionKey} Inquiries & Client Leads ({matchedLeads.length})
            </h3>
            <p className="text-xs text-slate-500">Contact information, budget, and follow-up status.</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client or phone..."
              className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
            />
          </div>
        </div>

        {matchedLeads.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            No inquiries recorded for this category yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Phone & Email</th>
                  <th className="py-3 px-4">Requirement / Location</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Quick Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {matchedLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">{lead.name}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{lead.phone}</div>
                      {lead.email && <div className="text-[11px] text-slate-500">{lead.email}</div>}
                    </td>
                    <td className="py-3 px-4">
                      <div>{lead.requirement || 'General'}</div>
                      {lead.location && <div className="text-[11px] text-slate-400">{lead.location}</div>}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{lead.budget || 'On Request'}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#0A4D92] border border-blue-200">
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as any)}
                        className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-medium"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                        <option value="Under Negotiation">Under Negotiation</option>
                        <option value="Closed">Closed</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Associated Properties Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Current {config.transactionKey} Portfolios ({matchedProperties.length})
            </h3>
            <p className="text-xs text-slate-500">Live property assets published under this classification.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matchedProperties.slice(0, 6).map((prop) => (
            <div key={prop.id} className="border border-slate-200 rounded-2xl p-3 flex gap-3 hover:border-blue-300 transition-colors">
              <img
                src={prop.imageUrl}
                alt={prop.title}
                className="w-20 h-20 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="font-bold text-xs text-slate-900 truncate">{prop.title}</div>
                <div className="text-[11px] text-[#0A4D92] font-semibold mt-0.5">{prop.priceLabel}</div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">{prop.location}</div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 font-medium text-slate-600">
                    {prop.category}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">
                    {prop.published ? '● Live' : '○ Draft'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
