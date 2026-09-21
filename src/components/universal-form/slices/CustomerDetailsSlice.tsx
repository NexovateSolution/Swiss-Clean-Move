'use client'

import { FormSliceProps } from '../types'

export default function CustomerDetailsSlice({ data, updateData, t }: FormSliceProps) {
  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-sm bg-white focus:ring-1 focus:ring-swiss-red focus:border-swiss-red outline-none text-sm";
  const labelClass = "block text-sm font-semibold text-[#0A1C3E] mb-1";

  return (
    <div className="space-y-6">
      {/* Name & Company fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label className={labelClass}>
            {t('universalForm.customer.firstName')}
          </label>
          <input
            type="text"
            value={data.name}
            onChange={e => updateData({ name: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            {t('universalForm.customer.company')}
          </label>
          <input
            type="text"
            value={data.company}
            onChange={e => updateData({ company: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label className={labelClass}>
            {t('universalForm.customer.email')}
          </label>
          <input
            type="email"
            value={data.emailAddress}
            onChange={e => updateData({ emailAddress: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            {t('universalForm.customer.phone')}
          </label>
          <input
            type="tel"
            value={data.telephone}
            onChange={e => updateData({ telephone: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  )
}
