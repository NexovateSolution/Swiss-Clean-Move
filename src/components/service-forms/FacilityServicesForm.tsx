import React from 'react';
import { FormStepProps, FI, FR, FC, SH } from '../FormControls';

export function FacilityServicesForm({ step, d, set, tl, v, arrHas, toggleArr, ImageUpload }: FormStepProps) {
  const selectedService = v('facilityServiceType');

  switch (step) {
    case 0:
      return (
        <div>
          <SH>{tl('wizard.facilityServices.step1Title')}</SH>

          {/* Which service do you need? */}
          <FR
            label={tl('wizard.facilityServices.whichService')}
            value={v('facilityServiceType')}
            onChange={v => set('facilityServiceType', v)}
            options={[
              { value: 'maintenanceCleaning', label: tl('wizard.facilityServices.serviceTypes.maintenanceCleaning') },
              { value: 'propertyMaintenance', label: tl('wizard.facilityServices.serviceTypes.propertyMaintenance') },
              { value: 'facilityServices', label: tl('wizard.facilityServices.serviceTypes.facilityServices') },
              { value: 'constructionCleaning', label: tl('wizard.facilityServices.serviceTypes.constructionCleaning') },
              { value: 'specialCleaning', label: tl('wizard.facilityServices.serviceTypes.specialCleaning') },
              { value: 'gastronomyCleaning', label: tl('wizard.facilityServices.serviceTypes.gastronomyCleaning') },
              { value: 'pharmacyMedical', label: tl('wizard.facilityServices.serviceTypes.pharmacyMedical') },
              { value: 'shopRetail', label: tl('wizard.facilityServices.serviceTypes.shopRetail') },
              { value: 'combination', label: tl('wizard.facilityServices.serviceTypes.combination') },
            ]}
          />

          {/* Preferred start / appointment */}
          <SH>{tl('wizard.facilityServices.preferredStart')}</SH>
          <div className="grid grid-cols-2 gap-4">
            <FI label={tl('wizard.facilityServices.date')} value={v('preferredDate')} onChange={v => set('preferredDate', v)} type="date" required />
            <FI label={tl('wizard.facilityServices.time')} value={v('preferredTime')} onChange={v => set('preferredTime', v)} type="time" />
          </div>

          {/* Cleaning frequency */}
          <SH>{tl('wizard.facilityServices.frequencyTitle')}</SH>
          <FR
            label={tl('wizard.facilityServices.frequencyTitle')}
            value={v('cleaningFrequency')}
            onChange={v => set('cleaningFrequency', v)}
            options={[
              { value: 'oneTime', label: tl('wizard.facilityServices.frequency.oneTime') },
              { value: 'daily', label: tl('wizard.facilityServices.frequency.daily') },
              { value: 'weekly', label: tl('wizard.facilityServices.frequency.weekly') },
              { value: 'twoThreePerWeek', label: tl('wizard.facilityServices.frequency.twoThreePerWeek') },
              { value: 'monthly', label: tl('wizard.facilityServices.frequency.monthly') },
              { value: 'custom', label: tl('wizard.facilityServices.frequency.custom') },
            ]}
          />

          {/* Flexibility */}
          <SH>{tl('wizard.facilityServices.flexibilityTitle')}</SH>
          <FR
            label={tl('wizard.facilityServices.flexibilityTitle')}
            value={v('flexibility')}
            onChange={v => set('flexibility', v)}
            options={[
              { value: 'fixed', label: tl('wizard.facilityServices.flexibility.fixed') },
              { value: 'flexible', label: tl('wizard.facilityServices.flexibility.flexible') },
            ]}
          />
        </div>
      );

    case 1:
      return (
        <div>
          <SH>{tl('wizard.facilityServices.step2Title')}</SH>

          {/* Address */}
          <div className="grid grid-cols-2 gap-4">
            <FI label={tl('wizard.facilityServices.zipCity')} value={v('zipCity')} onChange={v => set('zipCity', v)} required />
            <FI label={tl('wizard.facilityServices.streetNo')} value={v('streetNo')} onChange={v => set('streetNo', v)} required />
          </div>

          {/* Property type */}
          <SH>{tl('wizard.facilityServices.propertyTypeTitle')}</SH>
          <FR
            label={tl('wizard.facilityServices.propertyTypeTitle')}
            value={v('propertyType')}
            onChange={v => set('propertyType', v)}
            options={[
              { value: 'apartment', label: tl('wizard.facilityServices.propertyTypes.apartment') },
              { value: 'house', label: tl('wizard.facilityServices.propertyTypes.house') },
              { value: 'office', label: tl('wizard.facilityServices.propertyTypes.office') },
              { value: 'medicalPractice', label: tl('wizard.facilityServices.propertyTypes.medicalPractice') },
              { value: 'pharmacy', label: tl('wizard.facilityServices.propertyTypes.pharmacy') },
              { value: 'restaurant', label: tl('wizard.facilityServices.propertyTypes.restaurant') },
              { value: 'shopRetail', label: tl('wizard.facilityServices.propertyTypes.shopRetail') },
              { value: 'commercial', label: tl('wizard.facilityServices.propertyTypes.commercial') },
              { value: 'constructionSite', label: tl('wizard.facilityServices.propertyTypes.constructionSite') },
              { value: 'other', label: tl('wizard.facilityServices.propertyTypes.other') },
            ]}
          />
          {v('propertyType') === 'other' && (
            <FI label={tl('wizard.facilityServices.propertyTypes.otherSpecify')} value={v('propertyTypeOther')} onChange={v => set('propertyTypeOther', v)} />
          )}

          {/* Area / Rooms / Floor / Elevator */}
          <div className="grid grid-cols-2 gap-4">
            <FI label={tl('wizard.facilityServices.area')} value={v('area')} onChange={v => set('area', v)} type="number" placeholder="m²" />
            <FI label={tl('wizard.facilityServices.rooms')} value={v('rooms')} onChange={v => set('rooms', v)} type="number" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FI label={tl('wizard.facilityServices.floor')} value={v('floor')} onChange={v => set('floor', v)} type="number" />
            <div className="mb-4">
              <FR
                label={tl('wizard.facilityServices.elevator')}
                value={v('elevator')}
                onChange={v => set('elevator', v)}
                options={[
                  { value: 'yes', label: tl('wizard.facilityServices.yes') },
                  { value: 'no', label: tl('wizard.facilityServices.no') },
                ]}
              />
            </div>
          </div>

          {/* ===== CONDITIONAL CHECKBOX SECTIONS ===== */}

          {/* General cleaning (Facility services) */}
          {(selectedService === 'facilityServices' || selectedService === 'combination') && (
            <>
              <SH>{tl('wizard.facilityServices.generalCleaning.title')}</SH>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { k: 'floors', l: tl('wizard.facilityServices.generalCleaning.floors') },
                  { k: 'sanitary', l: tl('wizard.facilityServices.generalCleaning.sanitary') },
                  { k: 'kitchenBreakRoom', l: tl('wizard.facilityServices.generalCleaning.kitchenBreakRoom') },
                  { k: 'windowsInsideOutside', l: tl('wizard.facilityServices.generalCleaning.windowsInsideOutside') },
                  { k: 'windowFrames', l: tl('wizard.facilityServices.generalCleaning.windowFrames') },
                  { k: 'blindsShutters', l: tl('wizard.facilityServices.generalCleaning.blindsShutters') },
                  { k: 'doorsFrames', l: tl('wizard.facilityServices.generalCleaning.doorsFrames') },
                  { k: 'wallsCeilings', l: tl('wizard.facilityServices.generalCleaning.wallsCeilings') },
                  { k: 'staircaseEntrance', l: tl('wizard.facilityServices.generalCleaning.staircaseEntrance') },
                  { k: 'elevatorCleaning', l: tl('wizard.facilityServices.generalCleaning.elevatorCleaning') },
                  { k: 'basementAtticGarage', l: tl('wizard.facilityServices.generalCleaning.basementAtticGarage') },
                  { k: 'balconyTerrace', l: tl('wizard.facilityServices.generalCleaning.balconyTerrace') },
                ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('generalCleaningItems', s.k)} onChange={() => toggleArr('generalCleaningItems', s.k)} /> ))}
              </div>
            </>
          )}

          {/* Maintenance cleaning (regular) */}
          {(selectedService === 'maintenanceCleaning' || selectedService === 'combination') && (
            <>
              <SH>{tl('wizard.facilityServices.maintenanceCleaningSection.title')}</SH>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { k: 'officeCleaning', l: tl('wizard.facilityServices.maintenanceCleaningSection.officeCleaning') },
                  { k: 'practiceCleaning', l: tl('wizard.facilityServices.maintenanceCleaningSection.practiceCleaning') },
                  { k: 'staircaseCleaning', l: tl('wizard.facilityServices.maintenanceCleaningSection.staircaseCleaning') },
                  { k: 'commercialCleaning', l: tl('wizard.facilityServices.maintenanceCleaningSection.commercialCleaning') },
                  { k: 'wasteDisposal', l: tl('wizard.facilityServices.maintenanceCleaningSection.wasteDisposal') },
                  { k: 'refillConsumables', l: tl('wizard.facilityServices.maintenanceCleaningSection.refillConsumables') },
                ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('maintenanceCleaningItems', s.k)} onChange={() => toggleArr('maintenanceCleaningItems', s.k)} /> ))}
              </div>
            </>
          )}

          {/* Pharmacy / medical practice (hygiene) */}
          {(selectedService === 'pharmacyMedical' || selectedService === 'combination') && (
            <>
              <SH>{tl('wizard.facilityServices.pharmacyMedicalSection.title')}</SH>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { k: 'surfaceDisinfection', l: tl('wizard.facilityServices.pharmacyMedicalSection.surfaceDisinfection') },
                  { k: 'hygieneRegulations', l: tl('wizard.facilityServices.pharmacyMedicalSection.hygieneRegulations') },
                  { k: 'receptionCounter', l: tl('wizard.facilityServices.pharmacyMedicalSection.receptionCounter') },
                  { k: 'treatmentRooms', l: tl('wizard.facilityServices.pharmacyMedicalSection.treatmentRooms') },
                  { k: 'floorDisinfection', l: tl('wizard.facilityServices.pharmacyMedicalSection.floorDisinfection') },
                  { k: 'medicalAreas', l: tl('wizard.facilityServices.pharmacyMedicalSection.medicalAreas') },
                ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('pharmacyMedicalItems', s.k)} onChange={() => toggleArr('pharmacyMedicalItems', s.k)} /> ))}
              </div>
            </>
          )}

          {/* Restaurant / gastronomy */}
          {(selectedService === 'gastronomyCleaning' || selectedService === 'combination') && (
            <>
              <SH>{tl('wizard.facilityServices.gastronomySection.title')}</SH>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { k: 'intensiveKitchen', l: tl('wizard.facilityServices.gastronomySection.intensiveKitchen') },
                  { k: 'appliances', l: tl('wizard.facilityServices.gastronomySection.appliances') },
                  { k: 'extractorHoodFilters', l: tl('wizard.facilityServices.gastronomySection.extractorHoodFilters') },
                  { k: 'greaseRemoval', l: tl('wizard.facilityServices.gastronomySection.greaseRemoval') },
                  { k: 'diningAreaFloors', l: tl('wizard.facilityServices.gastronomySection.diningAreaFloors') },
                  { k: 'toilets', l: tl('wizard.facilityServices.gastronomySection.toilets') },
                  { k: 'storageBackRooms', l: tl('wizard.facilityServices.gastronomySection.storageBackRooms') },
                ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('gastronomyItems', s.k)} onChange={() => toggleArr('gastronomyItems', s.k)} /> ))}
              </div>
            </>
          )}

          {/* Retail areas */}
          {(selectedService === 'shopRetail' || selectedService === 'combination') && (
            <>
              <SH>{tl('wizard.facilityServices.retailSection.title')}</SH>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { k: 'salesFloor', l: tl('wizard.facilityServices.retailSection.salesFloor') },
                  { k: 'shopWindows', l: tl('wizard.facilityServices.retailSection.shopWindows') },
                  { k: 'shelvesDisplays', l: tl('wizard.facilityServices.retailSection.shelvesDisplays') },
                  { k: 'checkoutArea', l: tl('wizard.facilityServices.retailSection.checkoutArea') },
                  { k: 'storageBackRooms', l: tl('wizard.facilityServices.retailSection.storageBackRooms') },
                ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('retailItems', s.k)} onChange={() => toggleArr('retailItems', s.k)} /> ))}
              </div>
            </>
          )}

          {/* Construction cleaning */}
          {(selectedService === 'constructionCleaning' || selectedService === 'combination') && (
            <>
              <SH>{tl('wizard.facilityServices.constructionSection.title')}</SH>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { k: 'roughCleaning', l: tl('wizard.facilityServices.constructionSection.roughCleaning') },
                  { k: 'intermediateCleaning', l: tl('wizard.facilityServices.constructionSection.intermediateCleaning') },
                  { k: 'finalConstructionCleaning', l: tl('wizard.facilityServices.constructionSection.finalConstructionCleaning') },
                ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('constructionItems', s.k)} onChange={() => toggleArr('constructionItems', s.k)} /> ))}
              </div>
            </>
          )}

          {/* Special cleaning */}
          {(selectedService === 'specialCleaning' || selectedService === 'combination') && (
            <>
              <SH>{tl('wizard.facilityServices.specialSection.title')}</SH>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { k: 'highPressure', l: tl('wizard.facilityServices.specialSection.highPressure') },
                  { k: 'carpetCleaning', l: tl('wizard.facilityServices.specialSection.carpetCleaning') },
                  { k: 'hardToReachWindows', l: tl('wizard.facilityServices.specialSection.hardToReachWindows') },
                  { k: 'disinfection', l: tl('wizard.facilityServices.specialSection.disinfection') },
                  { k: 'nicotineCleaning', l: tl('wizard.facilityServices.specialSection.nicotineCleaning') },
                  { k: 'glassFacade', l: tl('wizard.facilityServices.specialSection.glassFacade') },
                  { k: 'other', l: tl('wizard.facilityServices.specialSection.other') },
                ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('specialCleaningItems', s.k)} onChange={() => toggleArr('specialCleaningItems', s.k)} /> ))}
              </div>
              {arrHas('specialCleaningItems', 'other') && (
                <FI label={tl('wizard.facilityServices.specialSection.otherSpecify')} value={v('specialCleaningOther')} onChange={v => set('specialCleaningOther', v)} />
              )}
            </>
          )}

          {/* ===== ACCESS & LOGISTICS ===== */}
          <SH>{tl('wizard.facilityServices.accessLogistics.title')}</SH>

          {/* Access to the property */}
          <FR
            label={tl('wizard.facilityServices.accessLogistics.accessProperty')}
            value={v('accessType')}
            onChange={v => set('accessType', v)}
            options={[
              { value: 'keyInPerson', label: tl('wizard.facilityServices.accessLogistics.keyInPerson') },
              { value: 'keyMailbox', label: tl('wizard.facilityServices.accessLogistics.keyMailbox') },
              { value: 'propertyManagement', label: tl('wizard.facilityServices.accessLogistics.propertyManagement') },
              { value: 'other', label: tl('wizard.facilityServices.accessLogistics.other') },
            ]}
          />
          {v('accessType') === 'other' && (
            <FI label={tl('wizard.facilityServices.accessLogistics.otherSpecify')} value={v('accessTypeOther')} onChange={v => set('accessTypeOther', v)} />
          )}

          {/* Parking available */}
          <FR
            label={tl('wizard.facilityServices.accessLogistics.parkingAvailable')}
            value={v('parkingAvailable')}
            onChange={v => set('parkingAvailable', v)}
            options={[
              { value: 'yes', label: tl('wizard.facilityServices.yes') },
              { value: 'no', label: tl('wizard.facilityServices.no') },
            ]}
          />

          {/* Parking / access checkboxes */}
          <SH>{tl('wizard.facilityServices.accessLogistics.parkingAccess')}</SH>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'mustReserve', l: tl('wizard.facilityServices.accessLogistics.mustReserve') },
              { k: 'assistReservation', l: tl('wizard.facilityServices.accessLogistics.assistReservation') },
              { k: 'noParkingZone', l: tl('wizard.facilityServices.accessLogistics.noParkingZone') },
              { k: 'restrictedAccess', l: tl('wizard.facilityServices.accessLogistics.restrictedAccess') },
            ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('parkingOptions', s.k)} onChange={() => toggleArr('parkingOptions', s.k)} /> ))}
          </div>

          {/* Distance parking → entrance */}
          <FI label={tl('wizard.facilityServices.accessLogistics.distance')} value={v('parkingDistance')} onChange={v => set('parkingDistance', v)} type="number" placeholder="m" />

          {/* Upload */}
          <SH>{tl('wizard.facilityServices.upload.title')}</SH>
          <p className="text-sm text-[#5a7a9a] mb-3">{tl('wizard.facilityServices.upload.hint')}</p>
          <ImageUpload />

          {/* Special Notes */}
          <SH>{tl('wizard.facilityServices.specialNotes')}</SH>
          <div className="mb-6">
            <textarea
              className="w-full px-4 py-3 border-2 border-[#a8c8e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]/40 focus:border-[#003366] bg-white text-[#003366] transition-colors text-sm"
              rows={4}
              placeholder={tl('wizard.facilityServices.specialNotes')}
              value={v('specialNotes')}
              onChange={e => set('specialNotes', e.target.value)}
            />
          </div>

          {/* Contact info */}
          <SH>{tl('wizard.facilityServices.contact.title')}</SH>
          <FI label={tl('wizard.facilityServices.contact.name')} value={v('nameFirstName')} onChange={v => set('nameFirstName', v)} required />
          <FI label={tl('wizard.facilityServices.contact.email')} value={v('emailAddress')} onChange={v => set('emailAddress', v)} type="email" required />
          <FI label={tl('wizard.facilityServices.contact.phone')} value={v('telephone')} onChange={v => set('telephone', v)} type="tel" required />
        </div>
      );

    default:
      return null;
  }
}
