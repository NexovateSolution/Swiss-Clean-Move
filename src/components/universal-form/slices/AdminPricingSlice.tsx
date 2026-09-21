import React from 'react'
import { FormSliceProps } from '../types'
import { SectionTitle } from '../SectionTitle'
import toast from 'react-hot-toast'

export default function AdminPricingSlice({ data, updateData, t }: FormSliceProps) {
  const set = (key: keyof typeof data, value: any) => updateData({ [key]: value })
  const v = (key: keyof typeof data) => data[key] as string

  // Simple pricing rules ported from the old wizard
  const PRICING_RULES = {
    household: {
      regular: 42,
      fourteenDays: 45,
      oneTime: 50
    }
  }

  const isHouseholdHelping = data.services.includes('caretaking') || data.services.includes('maintenanceCleaning')

  return (
    <div className="space-y-6 bg-white">
      <h3 className="text-xl font-bold text-[#003366] mb-6">
        {t('admin.finalizingProjectSetup', 'Finalizing Project Setup & Pricing')}
      </h3>

      {isHouseholdHelping && (
        <div className="mb-6 p-4 border-2 border-blue-200 bg-blue-50 rounded-lg">
          <h4 className="font-bold text-[#003366] mb-4 flex items-center gap-2">
            <span className="text-lg">🧮</span> Household Price Calculator
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold text-[#003366] mb-2">Frequency</label>
              <select 
                value={v('calcFrequency') || ''} 
                onChange={e => set('calcFrequency', e.target.value)} 
                className="w-full px-4 py-3 border-2 border-[#a8c8e8] rounded-lg bg-white"
              >
                <option value="">Select frequency...</option>
                <option value="oneTime">One-time</option>
                <option value="weekly">Weekly</option>
                <option value="twoThreePerWeek">2-3 times per week</option>
                <option value="everyTwoWeeks">Every two weeks</option>
                <option value="monthly">Monthly</option>
                <option value="3months">3 Months</option>
                <option value="6months">6 Months</option>
                <option value="1year">1 Year</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#003366] mb-2">Estimated Hours / Visit</label>
              <input 
                type="number" 
                step="0.5" 
                min="2"
                value={v('calcHours') || ''} 
                onChange={e => set('calcHours', e.target.value)} 
                className="w-full px-4 py-3 border-2 border-[#a8c8e8] rounded-lg bg-white" 
                placeholder="e.g. 3" 
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const freq = v('calcFrequency');
              const hours = parseFloat(v('calcHours') || '0');
              if (!freq || hours <= 0) {
                toast.error("Please select a frequency and enter valid hours.");
                return;
              }
              
              let rate = 45;
              let multiplier = 1;

              if (freq === 'weekly' || freq === 'twoThreePerWeek') {
                rate = PRICING_RULES.household.regular;
              } else if (freq === 'everyTwoWeeks') {
                rate = PRICING_RULES.household.fourteenDays;
              } else if (freq === 'oneTime' || freq === 'monthly' || freq === 'custom') {
                rate = PRICING_RULES.household.oneTime;
              } else if (freq === '3months') {
                rate = PRICING_RULES.household.regular;
                multiplier = 12;
              } else if (freq === '6months') {
                rate = PRICING_RULES.household.regular;
                multiplier = 24;
              } else if (freq === '1year') {
                rate = PRICING_RULES.household.regular;
                multiplier = 52;
              }
              
              const total = rate * hours * multiplier;
              set('totalPrice', total.toFixed(2));
              toast.success(`Calculated: ${hours} hours @ ${rate} CHF/hr ${multiplier > 1 ? 'x ' + multiplier + ' weeks' : ''}`);
            }}
            className="w-full sm:w-auto px-6 py-2 bg-[#003366] text-white font-bold rounded-lg hover:bg-blue-800 transition-colors"
          >
            Calculate & Set Total Price
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-2">
            <label className="block text-sm font-bold text-[#003366] mb-2">Total Price (CHF) *</label>
            <input type="number" step="0.01" value={v('totalPrice') || ''} onChange={e => set('totalPrice', e.target.value)} className="w-full px-4 py-3 border-2 border-[#a8c8e8] rounded-lg bg-white" placeholder="0.00" />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-bold text-[#003366] mb-2">Paid Amount (CHF)</label>
            <input type="number" step="0.01" value={v('paidAmount') || ''} onChange={e => set('paidAmount', e.target.value)} className="w-full px-4 py-3 border-2 border-[#a8c8e8] rounded-lg bg-white" placeholder="0.00" />
          </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <div className="mb-2">
            <label className="block text-sm font-bold text-[#003366] mb-2">Project Execution Start</label>
            <input type="datetime-local" value={v('fromDate') || ''} onChange={e => set('fromDate', e.target.value)} className="w-full px-4 py-3 border-2 border-[#a8c8e8] rounded-lg bg-white" />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-bold text-[#003366] mb-2">Project Execution End</label>
            <input type="datetime-local" value={v('untilDate') || ''} onChange={e => set('untilDate', e.target.value)} className="w-full px-4 py-3 border-2 border-[#a8c8e8] rounded-lg bg-white" />
          </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <div className="mb-2">
            <label className="block text-sm font-bold text-[#003366] mb-2">Handover Date</label>
            <input type="date" value={v('accessHandoverDate') || ''} onChange={e => set('accessHandoverDate', e.target.value)} className="w-full px-4 py-3 border-2 border-[#a8c8e8] rounded-lg bg-white" />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-bold text-[#003366] mb-2">Handover Time</label>
            <input type="time" value={v('accessHandoverTime') || ''} onChange={e => set('accessHandoverTime', e.target.value)} className="w-full px-4 py-3 border-2 border-[#a8c8e8] rounded-lg bg-white" />
          </div>
      </div>
    </div>
  )
}
