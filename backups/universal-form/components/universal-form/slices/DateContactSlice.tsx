'use client'

import { FormSliceProps } from '../types'

export default function DateContactSlice({ data, updateData, t }: FormSliceProps) {
  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-sm bg-white focus:ring-1 focus:ring-swiss-red focus:border-swiss-red outline-none text-sm";
  const labelClass = "block text-sm font-semibold text-[#0A1C3E] mb-1";
  const checkboxClass = "accent-swiss-red w-4 h-4 rounded-sm border-gray-300 cursor-pointer flex-shrink-0";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-swiss-text mb-2">
          {t('universalForm.steps.dateContact')}
        </h3>
        <p className="text-sm text-swiss-body mb-6">
          Terminwünsche und bevorzugte Kontaktart / Schedule preferences and preferred contact method
        </p>
      </div>

      {/* Preferred date & time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            {t('universalForm.dateContact.preferredDate')}
          </label>
          <input
            type="date"
            value={data.preferredDate}
            onChange={e => updateData({ preferredDate: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            {t('universalForm.dateContact.timeWindow')}
          </label>
          <div className="flex gap-2">
            <input
              type="time"
              onChange={e => updateData({ timeWindow: e.target.value })}
              className={`${inputClass} w-[110px] shrink-0 cursor-pointer`}
              title={t('universalForm.dateContact.selectTime') || 'Select exact time'}
            />
            <input
              type="text"
              value={data.timeWindow}
              onChange={e => updateData({ timeWindow: e.target.value })}
              className={inputClass}
              placeholder={t("universalForm.placeholders.timeWindow")}
            />
          </div>
        </div>
      </div>

      {/* Property handover */}
      <div>
        <label className={labelClass}>
          {t('universalForm.dateContact.handover')}
        </label>
        <input
          type="date"
          value={data.propertyHandover}
          onChange={e => updateData({ propertyHandover: e.target.value })}
          className={inputClass}
        />
      </div>

      {/* Preferred contact method */}
      <div>
        <label className={labelClass}>
          {t('universalForm.dateContact.preferredContact')}
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['phone', 'email', 'whatsapp'] as const).map(method => (
            <button
              key={method}
              type="button"
              onClick={() => updateData({ contactPreferredVia: method === 'phone' ? 'Phone' : method === 'email' ? 'E-mail' : 'WhatsApp' })}
              className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                data.contactPreferredVia === (method === 'phone' ? 'Phone' : method === 'email' ? 'E-mail' : 'WhatsApp')
                  ? 'border-swiss-red bg-swiss-softRed text-swiss-red'
                  : 'border-swiss-border bg-white text-swiss-text hover:border-swiss-red/40'
              }`}
            >
              {t(`universalForm.dateContact.contactOptions.${method}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Photos sent via */}
      <div>
        <label className={labelClass}>
          {t('universalForm.dateContact.photosVia')}
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['email', 'whatsapp', 'none'] as const).map(method => (
            <button
              key={method}
              type="button"
              onClick={() => updateData({ photosVia: method === 'email' ? 'E-mail' : method === 'whatsapp' ? 'WhatsApp' : 'None' })}
              className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                data.photosVia === (method === 'email' ? 'E-mail' : method === 'whatsapp' ? 'WhatsApp' : 'None')
                  ? 'border-swiss-red bg-swiss-softRed text-swiss-red'
                  : 'border-swiss-border bg-white text-swiss-text hover:border-swiss-red/40'
              }`}
            >
              {t(`universalForm.dateContact.photosOptions.${method}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Viewing welcome (legacy compat) */}
      <div>
        <label className={labelClass}>
          Besichtigung erwünscht? / Viewing welcome?
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="viewingIsWelcome"
              value="And"
              checked={data.viewingIsWelcome === 'And'}
              onChange={() => updateData({ viewingIsWelcome: 'And' })}
              className={checkboxClass}
            />
            <span className="text-sm">{t('universalForm.common.yes')}</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="viewingIsWelcome"
              value="No"
              checked={data.viewingIsWelcome === 'No'}
              onChange={() => updateData({ viewingIsWelcome: 'No' })}
              className={checkboxClass}
            />
            <span className="text-sm">{t('universalForm.common.no')}</span>
          </label>
        </div>
      </div>
    </div>
  );
}
