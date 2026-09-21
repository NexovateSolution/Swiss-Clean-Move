'use client'

import { FormSliceProps, hasMovingService } from '../types'

const PROPERTY_TYPES = ['apartment', 'house', 'office', 'commercial', 'restaurant', 'other'] as const;
const FLOOR_OPTIONS = ['UG', 'EG', '1', '2', '3', '4', '5', '6', '7', '8+'] as const;

export default function PropertyLocationSlice({ data, updateData, t }: FormSliceProps) {
  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-sm bg-white focus:ring-1 focus:ring-swiss-red focus:border-swiss-red outline-none text-sm";
  const labelClass = "block text-sm font-semibold text-[#0A1C3E] mb-1";
  const checkboxClass = "accent-swiss-red w-4 h-4 rounded-sm border-gray-300 cursor-pointer flex-shrink-0";

  const showDeliveryAddress = hasMovingService(data.services);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-swiss-text mb-2">
          {t('universalForm.steps.property')}
        </h3>
        <p className="text-sm text-swiss-body mb-6">
          {showDeliveryAddress
            ? t('universalForm.property.subtitleMoving')
            : t('universalForm.property.subtitleSingle')}
        </p>
      </div>

      {/* Collection / Service address */}
      {showDeliveryAddress && (
        <h4 className="text-base font-semibold text-swiss-text border-b border-swiss-border pb-2">
          📍 {t('universalForm.moving.collectionAddress')}
        </h4>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            {t('universalForm.property.streetNo')}
          </label>
          <input
            type="text"
            value={data.streetAndNumber}
            onChange={e => updateData({ streetAndNumber: e.target.value })}
            className={inputClass}
            placeholder="Musterstrasse 12"
          />
        </div>
        <div>
          <label className={labelClass}>
            {t('universalForm.property.postcodeCity')}
          </label>
          <input
            type="text"
            value={data.postalCodeAndCity}
            onChange={e => updateData({ postalCodeAndCity: e.target.value })}
            className={inputClass}
            placeholder="3000 Bern"
          />
        </div>
      </div>

      {/* Property type */}
      <div>
        <label className={labelClass}>
          {t('universalForm.property.type')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PROPERTY_TYPES.map(type => (
            <button
              key={type}
              type="button"
              onClick={() => updateData({ propertyType: type })}
              className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                data.propertyType === type
                  ? 'border-swiss-red bg-swiss-softRed text-swiss-red'
                  : 'border-swiss-border bg-white text-swiss-text hover:border-swiss-red/40'
              }`}
            >
              {t(`universalForm.property.types.${type}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Rooms, Area, Floor, Lift */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className={labelClass}>
            {t('universalForm.property.rooms')}
          </label>
          <input
            type="text"
            value={data.numberOfRooms}
            onChange={e => updateData({ numberOfRooms: e.target.value })}
            className={inputClass}
            placeholder="3.5"
          />
        </div>
        <div>
          <label className={labelClass}>
            {t('universalForm.property.area')}
          </label>
          <input
            type="text"
            value={data.livingSpaceInM2}
            onChange={e => updateData({ livingSpaceInM2: e.target.value })}
            className={inputClass}
            placeholder="75"
          />
        </div>
        <div>
          <label className={labelClass}>
            {t('universalForm.property.floor')}
          </label>
          <select
            value={data.floors}
            onChange={e => updateData({ floors: e.target.value })}
            className={inputClass}
          >
            <option value="">—</option>
            {FLOOR_OPTIONS.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>
            {t('universalForm.property.lift')}
          </label>
          <select
            value={data.lift}
            onChange={e => updateData({ lift: e.target.value })}
            className={inputClass}
          >
            <option value="">—</option>
            <option value="yes">{t('universalForm.common.yes')}</option>
            <option value="no">{t('universalForm.common.no')}</option>
          </select>
        </div>
      </div>

      {/* Parking / Access */}
      <div>
        <label className={labelClass}>
          {t('universalForm.property.parking')}
        </label>
        <input
          type="text"
          value={data.parking}
          onChange={e => updateData({ parking: e.target.value })}
          className={inputClass}
          placeholder={t("universalForm.placeholders.parking")}
        />
      </div>

      {/* Delivery address (only for Moving) */}
      {showDeliveryAddress && (
        <>
          <h4 className="text-base font-semibold text-swiss-text border-b border-swiss-border pb-2 mt-8">
            📍 {t('universalForm.moving.deliveryAddress')}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                {t('universalForm.property.streetNo')}
              </label>
              <input
                type="text"
                value={data.unloadingStreetAndNumber}
                onChange={e => updateData({ unloadingStreetAndNumber: e.target.value })}
                className={inputClass}
                placeholder="Zielstrasse 5"
              />
            </div>
            <div>
              <label className={labelClass}>
                {t('universalForm.property.postcodeCity')}
              </label>
              <input
                type="text"
                value={data.unloadingPostalCodeAndCity}
                onChange={e => updateData({ unloadingPostalCodeAndCity: e.target.value })}
                className={inputClass}
                placeholder="8000 Zürich"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>
                {t('universalForm.moving.floorDelivery')}
              </label>
              <select
                value={data.unloadingFloors}
                onChange={e => updateData({ unloadingFloors: e.target.value })}
                className={inputClass}
              >
                <option value="">—</option>
                {FLOOR_OPTIONS.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>
                {t('universalForm.moving.liftDelivery')}
              </label>
              <select
                value={data.unloadingLift}
                onChange={e => updateData({ unloadingLift: e.target.value })}
                className={inputClass}
              >
                <option value="">—</option>
                <option value="yes">{t('universalForm.common.yes')}</option>
                <option value="no">{t('universalForm.common.no')}</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>
                {t('universalForm.moving.distanceDelivery')}
              </label>
              <input
                type="text"
                value={data.unloadingParking}
                onChange={e => updateData({ unloadingParking: e.target.value })}
                className={inputClass}
                placeholder={t("universalForm.placeholders.distance")}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
