'use client'

import { FormSliceProps } from '../types'
import { CheckSquare, Square } from 'lucide-react'
import { SectionTitle } from '../SectionTitle'

const CLEANING_TYPE_OPTIONS = [
  'movingOutCleaning',
  'maintenanceCleaning',
  'officeCleaning',
  'restaurantCleaning',
  'windowCleaning',
  'constructionCleaning',
  'stairwellCleaning',
  'specialistCleaning',
  'highPressureCleaning',
  'caretaking'
] as const;

const FREQUENCY_OPTIONS = ['daily', 'weekly', 'twiceWeekly', 'threeWeekly', 'fiveWeekly', 'monthly', 'other'] as const;
const WINDOW_TYPES = ['standard', 'floorToCeiling', 'roof', 'glassDoors'] as const;
const BLIND_TYPES = ['venetian', 'roller', 'shutters', 'awnings'] as const;
const SANITARY_TYPES = ['toilets', 'bathtubs', 'showers', 'washbasins', 'kitchens'] as const;
const FLOOR_TYPE_OPTIONS = ['parquet', 'laminate', 'tiles', 'carpet', 'pvc', 'naturalStone'] as const;
const CONDITION_OPTIONS = ['empty', 'furnished', 'petHair', 'nicotine', 'heavilySoiled', 'mould'] as const;

export default function CleaningDetailsSlice({ data, updateData, t }: FormSliceProps) {
  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-sm bg-white focus:ring-1 focus:ring-swiss-red focus:border-swiss-red outline-none text-sm";
  const labelClass = "block text-sm font-semibold text-[#0A1C3E] mb-1";
  const checkboxClass = "accent-swiss-red w-4 h-4 rounded-sm border-gray-300 cursor-pointer flex-shrink-0";

  const toggleCleaningType = (type: string) => {
    const set = new Set(data.cleaningTypes);
    set.has(type) ? set.delete(type) : set.add(type);
    updateData({ cleaningTypes: Array.from(set) });
  };

  const toggleFloorType = (type: string) => {
    const set = new Set(data.floorTypes);
    set.has(type) ? set.delete(type) : set.add(type);
    updateData({ floorTypes: Array.from(set) });
  };

  const toggleCondition = (cond: string) => {
    const set = new Set(data.propertyCondition);
    set.has(cond) ? set.delete(cond) : set.add(cond);
    updateData({ propertyCondition: Array.from(set) });
  };

  return (
    <div className="space-y-8">
      {/* 4A: Art und Bereiche */}
      <SectionTitle number="4A" title={t('universalForm.sectionTitles.cleaning4A')} />

      {/* Cleaning types */}
      <div>
        <label className={labelClass}>
          {t('universalForm.cleaning.typeSubtitle')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CLEANING_TYPE_OPTIONS.map(type => {
            const selected = data.cleaningTypes.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleCleaningType(type)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                  selected
                    ? 'border-swiss-red bg-swiss-softRed text-swiss-red'
                    : 'border-swiss-border bg-white text-swiss-text hover:border-swiss-red/40'
                }`}
              >
                {selected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-swiss-body/40" />}
                {t(`universalForm.services.${type}`)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recurring frequency */}
      <div>
        <label className={labelClass}>
          {t('universalForm.cleaning.frequency')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {FREQUENCY_OPTIONS.map(freq => (
            <button
              key={freq}
              type="button"
              onClick={() => updateData({ recurringFrequency: freq })}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                data.recurringFrequency === freq
                  ? 'border-swiss-red bg-swiss-softRed text-swiss-red'
                  : 'border-swiss-border bg-white text-swiss-text hover:border-swiss-red/40'
              }`}
            >
              {t(`universalForm.cleaning.frequencies.${freq}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Areas to clean */}
      <div>
        <label className={labelClass}>
          {t('universalForm.cleaning.areas')}
        </label>
        <textarea
          value={data.areasToClean}
          onChange={e => updateData({ areasToClean: e.target.value })}
          rows={2}
          className={inputClass}
          placeholder={t("universalForm.placeholders.cleaningRooms")}
        />
      </div>

      {/* 4B: Fenster, Storen & Sanitär */}
      <SectionTitle number="4B" title={t('universalForm.sectionTitles.cleaning4B')} />

      {/* Windows */}
      <div className="bg-swiss-section rounded-xl p-4 border border-swiss-border">
        <h4 className="text-sm font-semibold text-swiss-text mb-3">
          🪟 {t('universalForm.cleaning.windows')}
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {WINDOW_TYPES.map(wt => (
            <div key={wt}>
              <label className="block text-xs text-swiss-body mb-1">
                {t(`universalForm.cleaning.windowTypes.${wt}`)}
              </label>
              <input
                type="number"
                min="0"
                value={(data as any)[`window${wt.charAt(0).toUpperCase() + wt.slice(1)}`] || ''}
                onChange={e => updateData({ [`window${wt.charAt(0).toUpperCase() + wt.slice(1)}`]: e.target.value } as any)}
                className="w-full px-3 py-2 border border-swiss-border rounded-lg bg-white text-sm focus:ring-2 focus:ring-swiss-red/20 focus:border-swiss-red"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Blinds */}
      <div className="bg-swiss-section rounded-xl p-4 border border-swiss-border">
        <h4 className="text-sm font-semibold text-swiss-text mb-3">
          {t('universalForm.cleaning.blinds')}
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BLIND_TYPES.map(bt => (
            <div key={bt}>
              <label className="block text-xs text-swiss-body mb-1">
                {t(`universalForm.cleaning.blindTypes.${bt}`)}
              </label>
              <input
                type="number"
                min="0"
                value={(data as any)[`blind${bt.charAt(0).toUpperCase() + bt.slice(1)}`] || ''}
                onChange={e => updateData({ [`blind${bt.charAt(0).toUpperCase() + bt.slice(1)}`]: e.target.value } as any)}
                className="w-full px-3 py-2 border border-swiss-border rounded-lg bg-white text-sm focus:ring-2 focus:ring-swiss-red/20 focus:border-swiss-red"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Sanitary */}
      <div className="bg-swiss-section rounded-xl p-4 border border-swiss-border">
        <h4 className="text-sm font-semibold text-swiss-text mb-3">
          🚿 {t('universalForm.cleaning.sanitary')}
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SANITARY_TYPES.map(st => (
            <div key={st}>
              <label className="block text-xs text-swiss-body mb-1">
                {t(`universalForm.cleaning.sanitaryTypes.${st}`)}
              </label>
              <input
                type="number"
                min="0"
                value={(data as any)[`sanitary${st.charAt(0).toUpperCase() + st.slice(1)}`] || ''}
                onChange={e => updateData({ [`sanitary${st.charAt(0).toUpperCase() + st.slice(1)}`]: e.target.value } as any)}
                className="w-full px-3 py-2 border border-swiss-border rounded-lg bg-white text-sm focus:ring-2 focus:ring-swiss-red/20 focus:border-swiss-red"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4C: Böden, Aussenbereiche & Zusatzarbeiten */}
      <SectionTitle number="4C" title={t('universalForm.sectionTitles.cleaning4C')} />

      {/* Floor types */}
      <div>
        <label className={labelClass}>
          {t('universalForm.cleaning.floors')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {FLOOR_TYPE_OPTIONS.map(ft => {
            const selected = data.floorTypes.includes(ft);
            return (
              <button
                key={ft}
                type="button"
                onClick={() => toggleFloorType(ft)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${
                  selected
                    ? 'border-swiss-red bg-swiss-softRed text-swiss-red'
                    : 'border-swiss-border bg-white text-swiss-text hover:border-swiss-red/40'
                }`}
              >
                {selected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-swiss-body/40" />}
                {t(`universalForm.cleaning.floorTypes.${ft}`)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Carpet & Balcony & Pressure & Holes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={data.vacuumCarpetOnly} onChange={e => updateData({ vacuumCarpetOnly: e.target.checked })} className="accent-swiss-red w-4 h-4" />
          <span className="text-sm text-swiss-text">{t('universalForm.cleaning.vacuumCarpetOnly')}</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={data.deepCarpetCleaning} onChange={e => updateData({ deepCarpetCleaning: e.target.checked })} className="accent-swiss-red w-4 h-4" />
          <span className="text-sm text-swiss-text">{t('universalForm.cleaning.deepCarpetCleaning')}</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={data.balconyCleaning} onChange={e => updateData({ balconyCleaning: e.target.checked })} className="accent-swiss-red w-4 h-4" />
          <span className="text-sm text-swiss-text">{t('universalForm.cleaning.balconyCleaning')}</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={data.highPressureCleaning} onChange={e => updateData({ highPressureCleaning: e.target.checked })} className="accent-swiss-red w-4 h-4" />
          <span className="text-sm text-swiss-text">{t('universalForm.cleaning.highPressure')}</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={data.repairWallHoles} onChange={e => updateData({ repairWallHoles: e.target.checked })} className="accent-swiss-red w-4 h-4" />
          <span className="text-sm text-swiss-text">{t('universalForm.cleaning.repairWallHoles')}</span>
        </label>
      </div>

      {data.balconyCleaning && (
        <div>
          <label className={labelClass}>
            {t('universalForm.cleaning.balconyArea')}
          </label>
          <input
            type="text"
            value={data.balconyArea}
            onChange={e => updateData({ balconyArea: e.target.value })}
            className={inputClass}
            placeholder={t("universalForm.placeholders.number")}
          />
        </div>
      )}

      {data.repairWallHoles && (
        <div>
          <label className={labelClass}>
            {t('universalForm.cleaning.holesCount')}
          </label>
          <input
            type="number"
            min="0"
            value={data.holesCount}
            onChange={e => updateData({ holesCount: e.target.value })}
            className={inputClass}
            placeholder={t("universalForm.placeholders.number")}
          />
        </div>
      )}

      {/* 4D: Zustand & Besonderheiten */}
      <SectionTitle number="4D" title={t('universalForm.sectionTitles.cleaning4D')} />

      {/* Condition */}
      <div>
        <label className={labelClass}>
          {t('universalForm.cleaning.condition')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CONDITION_OPTIONS.map(cond => {
            const selected = data.propertyCondition.includes(cond);
            return (
              <button
                key={cond}
                type="button"
                onClick={() => toggleCondition(cond)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${
                  selected
                    ? 'border-swiss-red bg-swiss-softRed text-swiss-red'
                    : 'border-swiss-border bg-white text-swiss-text hover:border-swiss-red/40'
                }`}
              >
                {selected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-swiss-body/40" />}
                {t(`universalForm.cleaning.conditions.${cond}`)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Additional details */}
      <div>
        <label className={labelClass}>
          {t('universalForm.cleaning.additionalDetails')}
        </label>
        <textarea
          value={data.additionalDetails}
          onChange={e => updateData({ additionalDetails: e.target.value })}
          rows={3}
          className={inputClass}
          placeholder="Weitere Angaben..."
        />
      </div>
    </div>
  );
}
