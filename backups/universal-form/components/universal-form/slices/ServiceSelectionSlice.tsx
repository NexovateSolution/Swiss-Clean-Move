'use client'

import { FormSliceProps } from '../types'
import { CheckSquare, Square } from 'lucide-react'

const SERVICE_OPTIONS = [
  // Col 1
  { key: 'movingOutCleaning' },
  { key: 'restaurantCleaning' },
  { key: 'caretaking' },
  { key: 'furnitureAssembly' },
  { key: 'stairwellCleaning' },
  // Col 2
  { key: 'maintenanceCleaning' },
  { key: 'windowCleaning' },
  { key: 'movingTransport' },
  { key: 'disposalClearance' },
  { key: 'specialistCleaning' },
  // Col 3
  { key: 'officeCleaning' },
  { key: 'constructionCleaning' },
  { key: 'packingService' },
  { key: 'highPressureCleaning' },
  { key: 'otherService' }
] as const;

export default function ServiceSelectionSlice({ data, updateData, t }: FormSliceProps) {
  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-sm bg-white focus:ring-1 focus:ring-swiss-red focus:border-swiss-red outline-none text-sm";
  const labelClass = "block text-sm font-semibold text-[#0A1C3E] mb-1";
  const checkboxClass = "accent-swiss-red w-4 h-4 rounded-sm border-gray-300 cursor-pointer flex-shrink-0";

  const toggleService = (key: string) => {
    const current = new Set(data.services);
    if (current.has(key)) {
      current.delete(key);
    } else {
      current.add(key);
    }
    updateData({ services: Array.from(current) });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-swiss-text mb-2">
          {t('universalForm.steps.services')}
        </h3>
        <p className="text-sm text-swiss-body mb-6">
          {t('universalForm.services.subtitle')}
        </p>
      </div>

      <div className="bg-[#f4f8fb] rounded-xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
          {SERVICE_OPTIONS.map(({ key }) => {
            const selected = data.services.includes(key);
            return (
              <label
                key={key}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleService(key)}
                  className="w-4 h-4 rounded-sm border-blue-200 bg-blue-100 text-blue-400 focus:ring-blue-300 accent-[#7BA3D5]"
                />
                <span className="text-sm font-medium text-[#4A5568] group-hover:text-swiss-red transition-colors">
                  {t(`universalForm.services.${key}`)}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {data.services.length > 0 && (
        <div className="bg-swiss-softRed border border-swiss-border rounded-lg p-4 mt-4">
          <p className="text-sm text-swiss-text font-medium">
            ✅ {t('universalForm.services.selectedCount', { count: data.services.length })}
          </p>
        </div>
      )}
    </div>
  );
}
