'use client'

import { FormSliceProps } from '../types'
import { CheckSquare, Square } from 'lucide-react'
import { SectionTitle } from '../SectionTitle'

const SCOPE_OPTIONS = ['transport', 'packing', 'unpacking', 'dismantling', 'assembly', 'boxes', 'disposal', 'clearance', 'storage'] as const;
const INVENTORY_KEYS = ['boxes', 'wardrobes', 'beds', 'sofas', 'tables', 'chairs', 'dressers', 'largeAppliances'] as const;
const SPECIAL_ITEM_OPTIONS = ['piano', 'safe', 'aquarium', 'antiques', 'heavy', 'none'] as const;

export default function MovingDetailsSlice({ data, updateData, t }: FormSliceProps) {
  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-sm bg-white focus:ring-1 focus:ring-swiss-red focus:border-swiss-red outline-none text-sm";
  const labelClass = "block text-sm font-semibold text-[#0A1C3E] mb-1";
  const checkboxClass = "accent-swiss-red w-4 h-4 rounded-sm border-gray-300 cursor-pointer flex-shrink-0";

  const toggleScope = (item: string) => {
    const set = new Set(data.movingScope);
    set.has(item) ? set.delete(item) : set.add(item);
    updateData({ movingScope: Array.from(set) });
  };

  const toggleSpecialItem = (key: string) => {
    const set = new Set(data.specialItems);
    if (key === 'none') {
      // "none" clears all
      updateData({ specialItems: set.has('none') ? [] : ['none'] });
      return;
    }
    set.delete('none');
    set.has(key) ? set.delete(key) : set.add(key);
    updateData({ specialItems: Array.from(set) });
  };

  const inventoryFieldMap: Record<string, keyof typeof data> = {
    boxes: 'inventoryBoxes',
    wardrobes: 'inventoryWardrobes',
    beds: 'inventoryBeds',
    sofas: 'inventorySofas',
    tables: 'inventoryTables',
    chairs: 'inventoryChairs',
    dressers: 'inventoryDressers',
    largeAppliances: 'inventoryLargeAppliances'
  };

  return (
    <div className="space-y-8">
      {/* 4B: Umfang & gewünschte Leistungen */}
      <SectionTitle number="4B" title={t('universalForm.sectionTitles.moving4B')} />

      {/* Scope / requested services */}
      <div>
        <label className={labelClass}>
          {t('universalForm.moving.scope')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SCOPE_OPTIONS.map(scope => {
            const selected = data.movingScope.includes(scope);
            return (
              <button
                key={scope}
                type="button"
                onClick={() => toggleScope(scope)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                  selected
                    ? 'border-swiss-red bg-swiss-softRed text-swiss-red'
                    : 'border-swiss-border bg-white text-swiss-text hover:border-swiss-red/40'
                }`}
              >
                {selected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-swiss-body/40" />}
                {t(`universalForm.moving.scopes.${scope}`)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Inventory */}
      <div className="bg-swiss-section rounded-xl p-4 border border-swiss-border">
        <h4 className="text-sm font-semibold text-swiss-text mb-3">
          📦 {t('universalForm.moving.inventory')}
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {INVENTORY_KEYS.map(key => (
            <div key={key}>
              <label className="block text-xs text-swiss-body mb-1">
                {t(`universalForm.moving.inventories.${key}`)}
              </label>
              <input
                type="number"
                min="0"
                value={data[inventoryFieldMap[key]] as string}
                onChange={e => updateData({ [inventoryFieldMap[key]]: e.target.value } as any)}
                className="w-full px-3 py-2 border border-swiss-border rounded-lg bg-white text-sm focus:ring-2 focus:ring-swiss-red/20 focus:border-swiss-red"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Additional inventory list */}
      <div>
        <label className={labelClass}>
          {t('universalForm.moving.additionalInventory')}
        </label>
        <textarea
          value={data.additionalInventory}
          onChange={e => updateData({ additionalInventory: e.target.value })}
          rows={2}
          className={inputClass}
          placeholder={t("universalForm.placeholders.movingItems")}
        />
      </div>

      {/* 4C: Spezialgut, Entsorgung & Organisation */}
      <SectionTitle number="4C" title={t('universalForm.sectionTitles.moving4C')} />

      {/* Special items */}
      <div>
        <label className={labelClass}>
          {t('universalForm.moving.specialItems')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SPECIAL_ITEM_OPTIONS.map(item => {
            const selected = data.specialItems.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleSpecialItem(item)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                  selected
                    ? 'border-swiss-red bg-swiss-softRed text-swiss-red'
                    : 'border-swiss-border bg-white text-swiss-text hover:border-swiss-red/40'
                }`}
              >
                {selected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-swiss-body/40" />}
                {t(`universalForm.moving.specialItemTypes.${item}`)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Special items details */}
      {data.specialItems.length > 0 && !data.specialItems.includes('none') && (
        <div>
          <label className={labelClass}>
            {t('universalForm.moving.specialItemsDetails')}
          </label>
          <textarea
            value={data.specialItemsDetails}
            onChange={e => updateData({ specialItemsDetails: e.target.value })}
            rows={2}
            className={inputClass}
            placeholder="Gewicht, Masse, besondere Hinweise..."
          />
        </div>
      )}

      {/* No-parking zones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={data.noParkingCollection} onChange={e => updateData({ noParkingCollection: e.target.checked })} className="accent-swiss-red w-4 h-4" />
          <span className="text-sm text-swiss-text">{t('universalForm.moving.noParkingCollection')}</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={data.noParkingDelivery} onChange={e => updateData({ noParkingDelivery: e.target.checked })} className="accent-swiss-red w-4 h-4" />
          <span className="text-sm text-swiss-text">{t('universalForm.moving.noParkingDelivery')}</span>
        </label>
      </div>

      {/* Moving date & flexibility & staff */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>
            {t('universalForm.moving.preferredDate')}
          </label>
          <input
            type="date"
            value={data.preferredDate}
            onChange={e => updateData({ preferredDate: e.target.value })}
            className={inputClass}
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer pb-3">
            <input type="checkbox" checked={data.movingDateFlexible} onChange={e => updateData({ movingDateFlexible: e.target.checked })} className="accent-swiss-red w-4 h-4" />
            <span className="text-sm text-swiss-text">{t('universalForm.moving.dateFlexible')}</span>
          </label>
        </div>
        <div>
          <label className={labelClass}>
            {t('universalForm.moving.staffCount')}
          </label>
          <input
            type="number"
            min="1"
            value={data.staffCount}
            onChange={e => updateData({ staffCount: e.target.value })}
            className={inputClass}
            placeholder={t("universalForm.placeholders.number")}
          />
        </div>
      </div>
    </div>
  );
}
