import React, { useState, useMemo } from 'react';
import {
  Calculator,
  IndianRupee,
  Percent,
  Calendar,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  PieChart,
  DollarSign,
  Info,
} from 'lucide-react';

export const InvestmentCalculator: React.FC = () => {
  // Input states with realistic defaults (e.g. ₹ 1.5 Crore property)
  const [propertyPrice, setPropertyPrice] = useState<number>(15000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [monthlyRent, setMonthlyRent] = useState<number>(45000);
  const [annualAppreciation, setAnnualAppreciation] = useState<number>(7.5);
  const [annualMaintenance, setAnnualMaintenance] = useState<number>(36000);

  // Derived financial calculations
  const calculations = useMemo(() => {
    const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
    const loanAmount = Math.max(0, propertyPrice - downPaymentAmount);

    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;

    // Monthly EMI calculation
    let monthlyEMI = 0;
    if (loanAmount > 0 && monthlyRate > 0) {
      const compoundFactor = Math.pow(1 + monthlyRate, totalMonths);
      monthlyEMI = (loanAmount * monthlyRate * compoundFactor) / (compoundFactor - 1);
    }

    const totalLoanRepayment = monthlyEMI * totalMonths;
    const totalInterestPayable = Math.max(0, totalLoanRepayment - loanAmount);
    const totalLoanCost = totalLoanRepayment;

    // Rental dynamics
    const annualRentalIncome = monthlyRent * 12;
    const netAnnualRentalIncome = Math.max(0, annualRentalIncome - annualMaintenance);
    const grossRentalYield = propertyPrice > 0 ? (annualRentalIncome / propertyPrice) * 100 : 0;
    const netRentalYield = propertyPrice > 0 ? (netAnnualRentalIncome / propertyPrice) * 100 : 0;

    // Capital appreciation over tenure
    const appreciationRate = annualAppreciation / 100;
    const estimatedFutureValue = propertyPrice * Math.pow(1 + appreciationRate, tenureYears);
    const totalCapitalAppreciation = estimatedFutureValue - propertyPrice;

    // Cumulative returns
    const cumulativeRentalIncome = annualRentalIncome * tenureYears;
    const totalCashOutflow = downPaymentAmount + totalLoanRepayment + (annualMaintenance * tenureYears);
    const totalCashInflow = cumulativeRentalIncome + estimatedFutureValue;
    const netTotalReturn = totalCashInflow - totalCashOutflow;

    return {
      downPaymentAmount,
      loanAmount,
      monthlyEMI,
      totalLoanCost,
      totalInterestPayable,
      annualRentalIncome,
      netAnnualRentalIncome,
      grossRentalYield,
      netRentalYield,
      estimatedFutureValue,
      totalCapitalAppreciation,
      cumulativeRentalIncome,
      netTotalReturn,
    };
  }, [
    propertyPrice,
    downPaymentPercent,
    interestRate,
    tenureYears,
    monthlyRent,
    annualAppreciation,
    annualMaintenance,
  ]);

  const formatINR = (val: number): string => {
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹ ${(val / 100000).toFixed(2)} Lac`;
    }
    return `₹ ${Math.round(val).toLocaleString('en-IN')}`;
  };

  return (
    <section id="investment" className="py-20 bg-slate-100/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0A4D92] text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#0A4D92]" />
            <span>Financial Modeling Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Real-Estate Investment Calculator
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Model loan EMIs, project rental yields, and simulate long-term capital appreciation across North India's high-growth corridors.
          </p>
        </div>

        {/* Main Grid: Inputs Left, Outputs Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <PieChart className="w-5 h-5 text-[#0A4D92]" />
              <span>Investment Parameters</span>
            </h3>

            {/* Property Price */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                <label htmlFor="price-range">Property Purchase Price</label>
                <span className="text-[#0A4D92] font-heading font-extrabold text-sm">
                  {formatINR(propertyPrice)}
                </span>
              </div>
              <input
                id="price-range"
                type="range"
                min={2000000}
                max={150000000}
                step={500000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0A4D92]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>₹ 20 Lac</span>
                <span>₹ 7.5 Cr</span>
                <span>₹ 15 Cr</span>
              </div>
            </div>

            {/* Down Payment % */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                <label htmlFor="down-payment-range">Down Payment ({downPaymentPercent}%)</label>
                <span className="text-slate-900 font-heading font-bold text-sm">
                  {formatINR(calculations.downPaymentAmount)}
                </span>
              </div>
              <input
                id="down-payment-range"
                type="range"
                min={10}
                max={80}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0A4D92]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>10% (High Leverage)</span>
                <span>20% (Standard)</span>
                <span>80% (Conservative)</span>
              </div>
            </div>

            {/* Interest Rate & Tenure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="interest-rate-input" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Interest Rate (% p.a.)
                </label>
                <div className="relative">
                  <Percent className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                  <input
                    id="interest-rate-input"
                    type="number"
                    step="0.1"
                    min="5"
                    max="16"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="loan-tenure-input" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Loan Tenure (Years)
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                  <select
                    id="loan-tenure-input"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                  >
                    <option value={5}>5 Years</option>
                    <option value={10}>10 Years</option>
                    <option value={15}>15 Years</option>
                    <option value={20}>20 Years</option>
                    <option value={25}>25 Years</option>
                    <option value={30}>30 Years</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Rental & Appreciation Projections */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label htmlFor="monthly-rent-input" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Monthly Rent (₹)
                </label>
                <input
                  id="monthly-rent-input"
                  type="number"
                  step="5000"
                  min="0"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                />
              </div>

              <div>
                <label htmlFor="annual-appreciation-input" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Annual Appreciation
                </label>
                <div className="relative">
                  <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">%</span>
                  <input
                    id="annual-appreciation-input"
                    type="number"
                    step="0.5"
                    min="1"
                    max="20"
                    value={annualAppreciation}
                    onChange={(e) => setAnnualAppreciation(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="annual-maint-input" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Annual Maint. (₹)
                </label>
                <input
                  id="annual-maint-input"
                  type="number"
                  step="5000"
                  min="0"
                  value={annualMaintenance}
                  onChange={(e) => setAnnualMaintenance(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                />
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Primary KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Monthly EMI */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm relative overflow-hidden">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Estimated Monthly EMI
                </div>
                <div className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0A4D92]">
                  {formatINR(calculations.monthlyEMI)}
                  <span className="text-xs font-medium text-slate-500 ml-1">/ mo</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  Principal: {formatINR(calculations.loanAmount)} | Interest: {interestRate}%
                </div>
                <div className="absolute right-3 bottom-3 opacity-10">
                  <Calculator className="w-16 h-16 text-[#0A4D92]" />
                </div>
              </div>

              {/* Estimated Future Value */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm relative overflow-hidden">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Value in {tenureYears} Years ({annualAppreciation}% p.a.)
                </div>
                <div className="font-heading text-2xl sm:text-3xl font-extrabold text-emerald-700">
                  {formatINR(calculations.estimatedFutureValue)}
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-2">
                  Gain: +{formatINR(calculations.totalCapitalAppreciation)}
                </div>
                <div className="absolute right-3 bottom-3 opacity-10">
                  <TrendingUp className="w-16 h-16 text-emerald-600" />
                </div>
              </div>
            </div>

            {/* Detailed Financial Breakdown Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <h4 className="font-heading text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
                Detailed Investment Projection Summary
              </h4>

              <div className="divide-y divide-slate-100 text-xs text-slate-700 space-y-2.5 pt-1">
                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-500">Loan Amount Borrowed:</span>
                  <span className="font-bold text-slate-900">{formatINR(calculations.loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-500">Total Loan Cost (Principal + Interest):</span>
                  <span className="font-bold text-slate-900">{formatINR(calculations.totalLoanCost)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-500">Total Interest Payable:</span>
                  <span className="font-semibold text-rose-600">{formatINR(calculations.totalInterestPayable)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-500">Annual Rental Income (Gross):</span>
                  <span className="font-semibold text-emerald-700">{formatINR(calculations.annualRentalIncome)} / yr</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-500">Gross Rental Yield:</span>
                  <span className="font-bold text-[#0A4D92]">{calculations.grossRentalYield.toFixed(2)}% p.a.</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-500">Cumulative Rental Over {tenureYears} Years:</span>
                  <span className="font-semibold text-emerald-700">{formatINR(calculations.cumulativeRentalIncome)}</span>
                </div>
                <div className="flex justify-between items-center pt-2.5 bg-blue-50/70 p-2.5 rounded-xl border border-blue-200/70 font-semibold">
                  <span className="text-slate-900">Estimated Net Total Investment Return:</span>
                  <span className="font-heading text-sm font-extrabold text-[#0A4D92]">
                    {formatINR(calculations.netTotalReturn)}
                  </span>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-4 rounded-2xl bg-slate-200/60 border border-slate-300/60 flex items-start gap-3 text-xs text-slate-600 leading-relaxed">
              <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <span>
                <strong>Disclaimer:</strong> Calculations are estimates for informational purposes only and should not be considered financial or investment advice. Actual loan terms, interest rates, and market appreciation vary by lender, corridor, and project.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
