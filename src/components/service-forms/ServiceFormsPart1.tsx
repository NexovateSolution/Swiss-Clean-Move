import React from 'react';
import { FormStepProps, FI, FS, FR, FC, FTA, SH, getFloorOptions, roomNumbers, livingSpaceOptions } from '../FormControls';

export function PropertyMaintenanceForm({ step, d, set, tl, v, arrHas, toggleArr, ImageUpload }: FormStepProps) {
  switch (step) {
    case 0:
      return (
        <div>
          <SH>{tl('wizard.propertyMaintenance.property')}</SH>
          <FI label={tl('wizard.propertyMaintenance.address')} value={v('address')} onChange={v => set('address', v)} required />
          <FS label={tl('wizard.propertyMaintenance.propertyType')} value={v('propertyType')} onChange={v => set('propertyType', v)}
            options={[
              { value: 'apartmentBuilding', label: tl('wizard.propertyMaintenance.types.apartmentBuilding') },
              { value: 'commercialProperty', label: tl('wizard.propertyMaintenance.types.commercialProperty') },
              { value: 'residentialComplex', label: tl('wizard.propertyMaintenance.types.residentialComplex') },
              { value: 'officeBuilding', label: tl('wizard.propertyMaintenance.types.officeBuilding') }
            ]}
          />
          <div className="grid grid-cols-2 gap-4">
            <FI label={tl('wizard.propertyMaintenance.units')} value={v('units')} onChange={v => set('units', v)} type="number" />
            <FI label={tl('wizard.propertyMaintenance.floors')} value={v('floors')} onChange={v => set('floors', v)} type="number" />
            <FI label={tl('wizard.propertyMaintenance.area')} value={v('area')} onChange={v => set('area', v)} type="number" />
          </div>
          
          <SH>{tl('wizard.propertyMaintenance.propertyDetails')}</SH>
          <div className="grid grid-cols-2 gap-4">
            <FI label={tl('wizard.propertyMaintenance.details.staircases')} value={v('staircases')} onChange={v => set('staircases', v)} type="number" />
            <FI label={tl('wizard.propertyMaintenance.details.elevators')} value={v('elevators')} onChange={v => set('elevators', v)} type="number" />
            <FI label={tl('wizard.propertyMaintenance.details.entrances')} value={v('entrances')} onChange={v => set('entrances', v)} type="number" />
            <FI label={tl('wizard.propertyMaintenance.details.parkingSpaces')} value={v('parkingSpaces')} onChange={v => set('parkingSpaces', v)} type="number" />
          </div>
          <FI label={tl('wizard.propertyMaintenance.details.specialReqs')} value={v('specialReqs')} onChange={v => set('specialReqs', v)} />
        </div>
      );
    case 1:
      return (
        <div>
          <SH>{tl('wizard.propertyMaintenance.cleaningMaintenance')}</SH>
          {[
            { k: 'stairwell', l: tl('wizard.propertyMaintenance.services.stairwell') },
            { k: 'elevator', l: tl('wizard.propertyMaintenance.services.elevator') },
            { k: 'garage', l: tl('wizard.propertyMaintenance.services.garage') },
            { k: 'basement', l: tl('wizard.propertyMaintenance.services.basement') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('cleaningServices', s.k)} onChange={() => toggleArr('cleaningServices', s.k)} /> ))}

          <SH>{tl('wizard.propertyMaintenance.outdoorSurroundings')}</SH>
          {[
            { k: 'outdoorMaintenance', l: tl('wizard.propertyMaintenance.services.outdoorMaintenance') },
            { k: 'landscaping', l: tl('wizard.propertyMaintenance.services.landscaping') },
            { k: 'outdoorCleaning', l: tl('wizard.propertyMaintenance.services.outdoorCleaning') },
            { k: 'parking', l: tl('wizard.propertyMaintenance.services.parking') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('outdoorServices', s.k)} onChange={() => toggleArr('outdoorServices', s.k)} /> ))}

          <SH>{tl('wizard.propertyMaintenance.winterService')}</SH>
          {[
            { k: 'snowRemoval', l: tl('wizard.propertyMaintenance.services.snowRemoval') },
            { k: 'grittingService', l: tl('wizard.propertyMaintenance.services.grittingService') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('winterServices', s.k)} onChange={() => toggleArr('winterServices', s.k)} /> ))}

          <SH>{tl('wizard.propertyMaintenance.caretakingTitle')}</SH>
          {[
            { k: 'regInspection', l: tl('wizard.propertyMaintenance.services.regInspection') },
            { k: 'techMonitoring', l: tl('wizard.propertyMaintenance.services.techMonitoring') },
            { k: 'minorRepairsBase', l: tl('wizard.propertyMaintenance.services.minorRepairsBase') },
            { k: 'faultManagement', l: tl('wizard.propertyMaintenance.services.faultManagement') },
            { k: 'keyManagement', l: tl('wizard.propertyMaintenance.services.keyManagement') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('techServices', s.k)} onChange={() => toggleArr('techServices', s.k)} /> ))}
          
          <SH>{tl('wizard.propertyMaintenance.wasteManagement')}</SH>
          {[
            { k: 'wasteHandling', l: tl('wizard.propertyMaintenance.services.wasteHandling') },
            { k: 'containerCleaning', l: tl('wizard.propertyMaintenance.services.containerCleaning') },
            { k: 'disposalRecycling', l: tl('wizard.propertyMaintenance.services.disposalRecycling') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('wasteServices', s.k)} onChange={() => toggleArr('wasteServices', s.k)} /> ))}
        </div>
      );
    case 2:
      return (
        <div>
          <SH>{tl('wizard.propertyMaintenance.frequency')}</SH>
          <FS label={tl('wizard.propertyMaintenance.frequency')} value={v('frequency')} onChange={v => set('frequency', v)}
            options={[
              { value: 'weekly', label: tl('wizard.propertyMaintenance.frequencies.weekly') },
              { value: 'biweekly', label: tl('wizard.propertyMaintenance.frequencies.biweekly') },
              { value: 'monthly', label: tl('wizard.propertyMaintenance.frequencies.monthly') },
              { value: 'custom', label: tl('wizard.propertyMaintenance.frequencies.custom') }
            ]}
          />
          <FS label={tl('wizard.propertyMaintenance.serviceTimes')} value={v('serviceTimes')} onChange={v => set('serviceTimes', v)}
            options={[
              { value: 'daytime', label: tl('wizard.propertyMaintenance.times.daytime') },
              { value: 'earlyMorning', label: tl('wizard.propertyMaintenance.times.earlyMorning') },
              { value: 'flexible', label: tl('wizard.propertyMaintenance.times.flexible') }
            ]}
          />
          
          <SH>{tl('wizard.propertyMaintenance.orgAndAccess')}</SH>
          {[
            { k: 'houseRules', l: tl('wizard.propertyMaintenance.org.houseRules') },
            { k: 'keyAvailable', l: tl('wizard.propertyMaintenance.org.keyAvailable') },
            { k: 'contactOnSite', l: tl('wizard.propertyMaintenance.org.contactOnSite') },
            { k: 'serviceSpecs', l: tl('wizard.propertyMaintenance.org.serviceSpecs') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('orgServices', s.k)} onChange={() => toggleArr('orgServices', s.k)} /> ))}
          
          <FS label={tl('wizard.propertyMaintenance.access')} value={v('accessType')} onChange={v => set('accessType', v)}
            options={[
              { value: 'free', label: tl('wizard.propertyMaintenance.accessTypes.free') },
              { value: 'key', label: tl('wizard.propertyMaintenance.accessTypes.key') },
              { value: 'code', label: tl('wizard.propertyMaintenance.accessTypes.code') }
            ]}
          />
          
          <SH>{tl('wizard.propertyMaintenance.additionalServices')}</SH>
          <FC label={tl('wizard.propertyMaintenance.additional.emergency')} checked={arrHas('additional', 'emergency')} onChange={() => toggleArr('additional', 'emergency')} />
          <FC label={tl('wizard.propertyMaintenance.additional.availability24h')} checked={arrHas('additional', 'availability24h')} onChange={() => toggleArr('additional', 'availability24h')} />
          <FC label={tl('wizard.propertyMaintenance.additional.reports')} checked={arrHas('additional', 'reports')} onChange={() => toggleArr('additional', 'reports')} />
          <FC label={tl('wizard.propertyMaintenance.additional.photoDoc')} checked={arrHas('additional', 'photoDoc')} onChange={() => toggleArr('additional', 'photoDoc')} />
        </div>
      );
    case 3:
      return (
        <div>
          <FI label={tl('wizard.propertyMaintenance.desiredStart')} value={v('desiredStart')} onChange={v => set('desiredStart', v)} type="date" required />
          <FS label={tl('wizard.propertyMaintenance.contractType')} value={v('contractType')} onChange={v => set('contractType', v)}
            options={[
              { value: 'ongoing', label: tl('wizard.propertyMaintenance.contracts.ongoing') },
              { value: 'trial', label: tl('wizard.propertyMaintenance.contracts.trial') },
              { value: 'oneTime', label: tl('wizard.propertyMaintenance.contracts.oneTime') }
            ]}
          />
          <FTA label={tl('wizard.propertyMaintenance.notes')} value={v('notes')} onChange={v => set('notes', v)} />
          <FI label={tl('wizard.propertyMaintenance.companyOrManagement')} value={v('company')} onChange={v => set('company', v)} required />
          <FI label={tl('wizard.propertyMaintenance.contactPerson')} value={v('nameFirstName')} onChange={v => set('nameFirstName', v)} required />
          <FI label={tl('wizard.propertyMaintenance.email')} value={v('emailAddress')} onChange={v => set('emailAddress', v)} type="email" required />
          <FI label={tl('wizard.propertyMaintenance.phone')} value={v('telephone')} onChange={v => set('telephone', v)} type="tel" required />
          <ImageUpload />
        </div>
      );
    default: return null;
  }
}

export function FinalCleaningForm({ step, d, set, tl, v, arrHas, toggleArr, ImageUpload }: FormStepProps) {
  switch (step) {
    case 0:
      return (
        <div>
          <FR
            label={tl('wizard.cleaning.desiredService')}
            value={v('desiredService')}
            onChange={v => set('desiredService', v)}
            options={[
              { value: 'cleaning-only', label: tl('wizard.cleaning.cleaningOnly') },
              { value: 'moving-and-cleaning', label: tl('wizard.cleaning.movingAndCleaning') }
            ]}
          />
          <FI label={tl('wizard.cleaning.cleaningLocation')} value={v('cleaningLocation')} onChange={v => set('cleaningLocation', v)} />
          
          <SH>{tl('wizard.sharedCleaning.propertyLocation')}</SH>
          <FI label={tl('wizard.sharedCleaning.location.streetZipCity')} value={v('address')} onChange={v => set('address', v)} required />
          
          <SH>{tl('wizard.sharedCleaning.propertyType')}</SH>
          <FS label={tl('wizard.sharedCleaning.propertyType')} value={v('propertyType')} onChange={v => set('propertyType', v)}
            options={[
              { value: 'multiFamily', label: tl('wizard.sharedCleaning.types.multiFamily') },
              { value: 'residentialComplex', label: tl('wizard.sharedCleaning.types.residentialComplex') },
              { value: 'officeBuilding', label: tl('wizard.sharedCleaning.types.officeBuilding') },
              { value: 'commercialProperty', label: tl('wizard.sharedCleaning.types.commercialProperty') },
              { value: 'industrialProperty', label: tl('wizard.sharedCleaning.types.industrialProperty') },
              { value: 'practiceClinic', label: tl('wizard.sharedCleaning.types.practiceClinic') },
              { value: 'specialProperty', label: tl('wizard.sharedCleaning.types.specialProperty') },
            ]}
          />
          
          <SH>{tl('wizard.sharedCleaning.propertyInformation')}</SH>
          <div className="grid grid-cols-2 gap-4">
            <FI label={tl('wizard.sharedCleaning.info.units')} value={v('units')} onChange={v => set('units', v)} type="number" />
            <FI label={tl('wizard.sharedCleaning.info.floors')} value={v('floorsCount')} onChange={v => set('floorsCount', v)} type="number" />
            <FI label={tl('wizard.sharedCleaning.info.totalArea')} value={v('totalArea')} onChange={v => set('totalArea', v)} type="number" />
            <FI label={tl('wizard.sharedCleaning.info.outdoorArea')} value={v('outdoorArea')} onChange={v => set('outdoorArea', v)} type="number" />
            <FS label={tl('wizard.cleaning.numberOfRooms')} value={v('numberOfRooms')} onChange={v => set('numberOfRooms', v)} options={roomNumbers} />
          </div>
          
          <SH>{tl('wizard.finalCleaning.layout')}</SH>
          <div className="grid grid-cols-2 gap-4">
            <FI label={tl('wizard.finalCleaning.bedrooms')} value={v('bedrooms')} onChange={v => set('bedrooms', v)} type="number" />
            <FI label={tl('wizard.finalCleaning.livingRooms')} value={v('livingRooms')} onChange={v => set('livingRooms', v)} type="number" />
            <FI label={tl('wizard.finalCleaning.bathrooms')} value={v('bathrooms')} onChange={v => set('bathrooms', v)} type="number" />
            <FI label={tl('wizard.finalCleaning.separateWc')} value={v('separateWc')} onChange={v => set('separateWc', v)} type="number" />
            <FI label={tl('wizard.finalCleaning.kitchens')} value={v('kitchens')} onChange={v => set('kitchens', v)} type="number" />
          </div>
        </div>
      );
    case 1:
      return (
        <div>
          <SH>{tl('wizard.cleaning.areasTitle')}</SH>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'completeAll', l: tl('wizard.cleaning.areas.completeAll') },
              { k: 'cellar', l: tl('wizard.cleaning.areas.cellar') },
              { k: 'atticScreed', l: tl('wizard.cleaning.areas.atticScreed') },
              { k: 'garage', l: tl('wizard.cleaning.areas.garage') },
              { k: 'conservatory', l: tl('wizard.cleaning.areas.conservatory') },
              { k: 'individualRooms', l: tl('wizard.cleaning.areas.individualRooms') },
              { k: 'balcony', l: tl('wizard.finalCleaning.otherRoomItems.balcony') },
              { k: 'terrace', l: tl('wizard.finalCleaning.otherRoomItems.terrace') },
            ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('cleaningAreas', s.k)} onChange={() => toggleArr('cleaningAreas', s.k)} /> ))}
          </div>


          <SH>{tl('wizard.finalCleaning.kitchen')}</SH>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'oven', l: tl('wizard.finalCleaning.kitchenItems.oven') },
              { k: 'cooktop', l: tl('wizard.finalCleaning.kitchenItems.cooktop') },
              { k: 'refrigerator', l: tl('wizard.finalCleaning.kitchenItems.refrigerator') },
              { k: 'freezer', l: tl('wizard.finalCleaning.kitchenItems.freezer') },
              { k: 'dishwasher', l: tl('wizard.finalCleaning.kitchenItems.dishwasher') },
              { k: 'extractorHood', l: tl('wizard.finalCleaning.kitchenItems.extractorHood') }
            ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('kitchenFeatures', s.k)} onChange={() => toggleArr('kitchenFeatures', s.k)} /> ))}
          </div>

          <SH>{tl('wizard.cleaning.windowsTitle')}</SH>
          <div className="grid grid-cols-2 gap-4">
             <FI label={tl('wizard.cleaning.normalWindows')} value={v('normalWindows')} onChange={v => set('normalWindows', v)} type="number" />
             <FI label={tl('wizard.cleaning.frenchDoors')} value={v('frenchDoors')} onChange={v => set('frenchDoors', v)} type="number" />
             <FI label={tl('wizard.cleaning.otherGlassSurfaces')} value={v('otherGlassSurfaces')} onChange={v => set('otherGlassSurfaces', v)} type="number" />
             <FI label={tl('wizard.cleaning.panoramicHint')} value={v('panoramicWindows')} onChange={v => set('panoramicWindows', v)} type="number" />
             <FI label={tl('wizard.finalCleaning.windowsInfo')} value={v('windowsCount')} onChange={v => set('windowsCount', v)} type="number" />
          </div>
          <FS label={tl('wizard.finalCleaning.windowTypes.standard')} value={v('windowType')} onChange={v => set('windowType', v)}
            options={[
              { value: 'standard', label: tl('wizard.finalCleaning.windowTypes.standard') },
              { value: 'floorToCeiling', label: tl('wizard.finalCleaning.windowTypes.floorToCeiling') },
              { value: 'roofWindows', label: tl('wizard.finalCleaning.windowTypes.roofWindows') },
              { value: 'largeSurfaces', label: tl('wizard.finalCleaning.windowTypes.largeSurfaces') },
              { value: 'hardToAccess', label: tl('wizard.finalCleaning.windowTypes.hardToAccess') },
            ]}
          />
          <FS label={tl('wizard.finalCleaning.shading')} value={v('shadingType')} onChange={v => set('shadingType', v)}
            options={[
              { value: 'venetian', label: tl('wizard.finalCleaning.shadingTypes.venetian') },
              { value: 'rollerShutters', label: tl('wizard.finalCleaning.shadingTypes.rollerShutters') },
              { value: 'windowShutters', label: tl('wizard.finalCleaning.shadingTypes.windowShutters') }
            ]}
          />

          <SH>{tl('wizard.cleaning.blindsTitle')}</SH>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'venetian', l: tl('wizard.cleaning.blinds.venetian') },
              { k: 'rollerShutters', l: tl('wizard.cleaning.blinds.rollerShutters') },
              { k: 'shutters', l: tl('wizard.cleaning.blinds.shutters') },
              { k: 'slat', l: tl('wizard.cleaning.blinds.slat') },
              { k: 'adjustable', l: tl('wizard.cleaning.blinds.adjustable') },
              { k: 'windowShutters', l: tl('wizard.cleaning.blinds.windowShutters') },
              { k: 'blinds', l: tl('wizard.cleaning.blinds.blinds') },
              { k: 'otherSpecial', l: tl('wizard.cleaning.blinds.otherSpecial') },
              { k: 'no', l: tl('wizard.cleaning.blinds.no') }
            ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('blinds', s.k)} onChange={() => toggleArr('blinds', s.k)} /> ))}
          </div>
          
          <SH>{tl('wizard.cleaning.specialFeaturesTitle')}</SH>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'heavilySoiled', l: tl('wizard.cleaning.specialFeatures.heavilySoiled') },
              { k: 'moldFrames', l: tl('wizard.cleaning.specialFeatures.moldFrames') },
              { k: 'smallCasement', l: tl('wizard.cleaning.specialFeatures.smallCasement') },
              { k: 'roofWindow', l: tl('wizard.cleaning.specialFeatures.roofWindow') },
              { k: 'safetyFilm', l: tl('wizard.cleaning.specialFeatures.safetyFilm') },
              { k: 'noSpecial', l: tl('wizard.cleaning.specialFeatures.noSpecial') }
            ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('windowSpecialFeatures', s.k)} onChange={() => toggleArr('windowSpecialFeatures', s.k)} /> ))}
          </div>
        </div>
      );
    case 2:
      return (
        <div>
          <SH>{tl('wizard.finalCleaning.floorTypes')}</SH>
          {[
            { k: 'parquet', l: tl('wizard.finalCleaning.floors.parquet') },
            { k: 'laminate', l: tl('wizard.finalCleaning.floors.laminate') },
            { k: 'tiles', l: tl('wizard.finalCleaning.floors.tiles') },
            { k: 'stone', l: tl('wizard.finalCleaning.floors.stone') },
            { k: 'carpet', l: tl('wizard.finalCleaning.floors.carpet') },
            { k: 'pvc', l: tl('wizard.finalCleaning.floors.pvc') },
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('floorTypes', s.k)} onChange={() => toggleArr('floorTypes', s.k)} /> ))}
          <SH>{tl('wizard.sharedCleaning.workingHours')}</SH>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'earlyMorning', l: tl('wizard.sharedCleaning.hours.earlyMorning') },
              { k: 'morning', l: tl('wizard.sharedCleaning.hours.morning') },
              { k: 'afternoon', l: tl('wizard.sharedCleaning.hours.afternoon') },
              { k: 'evening', l: tl('wizard.sharedCleaning.hours.evening') },
              { k: 'duringBusinessHours', l: tl('wizard.sharedCleaning.hours.duringBusinessHours') },
              { k: 'afterBusinessHours', l: tl('wizard.sharedCleaning.hours.afterBusinessHours') },
              { k: 'flexible', l: tl('wizard.sharedCleaning.hours.flexible') }
            ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('workingHours', s.k)} onChange={() => toggleArr('workingHours', s.k)} /> ))}
          </div>
          <SH>{tl('wizard.sharedCleaning.accessAndOrg')}</SH>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'keysAvailable', l: tl('wizard.sharedCleaning.access.keysAvailable') },
              { k: 'accessSystemCode', l: tl('wizard.sharedCleaning.access.accessSystemCode') },
              { k: 'caretakerOnSite', l: tl('wizard.sharedCleaning.access.caretakerOnSite') },
              { k: 'adminOnSite', l: tl('wizard.sharedCleaning.access.adminOnSite') },
              { k: 'alarmSystem', l: tl('wizard.sharedCleaning.access.alarmSystem') },
              { k: 'houseRulesAvailable', l: tl('wizard.sharedCleaning.access.houseRulesAvailable') },
              { k: 'cleaningPlanAvailable', l: tl('wizard.sharedCleaning.access.cleaningPlanAvailable') }
            ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('accessAndOrg', s.k)} onChange={() => toggleArr('accessAndOrg', s.k)} /> ))}
          </div>
          <SH>{tl('wizard.finalCleaning.condition')}</SH>
          <FS label={tl('wizard.finalCleaning.condition')} value={v('condition')} onChange={v => set('condition', v)}
            options={[
              { value: 'normal', label: tl('wizard.finalCleaning.conditions.normal') },
              { value: 'heavilySoiled', label: tl('wizard.finalCleaning.conditions.heavilySoiled') },
              { value: 'nicotine', label: tl('wizard.finalCleaning.conditions.nicotine') },
              { value: 'construction', label: tl('wizard.finalCleaning.conditions.construction') },
            ]}
          />
          <FI label={tl('wizard.finalCleaning.pets')} value={v('pets')} onChange={v => set('pets', v)} placeholder="e.g. Dog, Cat" />
        </div>
      );
    case 3:
      return (
        <div>
          <SH>{tl('wizard.finalCleaning.handoverManagement')}</SH>
          <div className="grid grid-cols-2 gap-4">
            <FI label={tl('wizard.finalCleaning.handoverDate')} value={v('handoverDate')} onChange={v => set('handoverDate', v)} type="date" required />
            <FI label={tl('wizard.cleaning.deliveryHandoverDate')} value={v('deliveryHandoverDate')} onChange={v => set('deliveryHandoverDate', v)} type="datetime-local" />
            <FI label={tl('wizard.finalCleaning.cleaningDate')} value={v('cleaningDate')} onChange={v => set('cleaningDate', v)} type="date" required />
            <FI label={tl('wizard.cleaning.desiredCleaningDate')} value={v('desiredCleaningDate')} onChange={v => set('desiredCleaningDate', v)} type="datetime-local" />
          </div>
          <FC label={tl('wizard.finalCleaning.handoverOptions.inspection')} checked={arrHas('handoverOptions', 'inspection')} onChange={() => toggleArr('handoverOptions', 'inspection')} />
          <FC label={tl('wizard.finalCleaning.handoverOptions.guarantee')} checked={arrHas('handoverOptions', 'guarantee')} onChange={() => toggleArr('handoverOptions', 'guarantee')} />
          <FI label={tl('wizard.finalCleaning.managementContact')} value={v('managementContact')} onChange={v => set('managementContact', v)} />

          <SH>{tl('wizard.finalCleaning.keyHandover')}</SH>
          <FS label={tl('wizard.finalCleaning.keyHandover')} value={v('keyHandover')} onChange={v => set('keyHandover', v)}
            options={[
              { value: 'inPerson', label: tl('wizard.finalCleaning.keyOptions.inPerson') },
              { value: 'mailbox', label: tl('wizard.finalCleaning.keyOptions.mailbox') },
              { value: 'management', label: tl('wizard.finalCleaning.keyOptions.management') },
              { value: 'keyBox', label: tl('wizard.finalCleaning.keyOptions.keyBox') },
            ]}
          />

          <SH>{tl('wizard.finalCleaning.contact')}</SH>
          <FI label={tl('wizard.finalCleaning.nameCompany')} value={v('nameFirstName')} onChange={v => set('nameFirstName', v)} required />
          <FI label={tl('wizard.finalCleaning.email')} value={v('emailAddress')} onChange={v => set('emailAddress', v)} type="email" required />
          <FI label={tl('wizard.finalCleaning.phone')} value={v('telephone')} onChange={v => set('telephone', v)} type="tel" required />
          <FTA label={tl('wizard.finalCleaning.notes')} value={v('furtherRequests')} onChange={v => set('furtherRequests', v)} />
          <ImageUpload />
        </div>
      );
    default: return null;
  }
}

export function MaintenanceCleaningForm({ step, d, set, tl, v, arrHas, toggleArr, ImageUpload, service }: FormStepProps) {
  switch (step) {
    case 0:
      return (
        <div>
          <FR
            label={tl('wizard.cleaning.desiredService')}
            value={v('desiredService')}
            onChange={v => set('desiredService', v)}
            options={[
              { value: 'cleaning-only', label: tl('wizard.cleaning.cleaningOnly') },
              { value: 'moving-and-cleaning', label: tl('wizard.cleaning.movingAndCleaning') }
            ]}
          />
          <FI label={tl('wizard.cleaning.cleaningLocation')} value={v('cleaningLocation')} onChange={v => set('cleaningLocation', v)} />
          
          <SH>{tl('wizard.sharedCleaning.propertyLocation')}</SH>
          <FI label={tl('wizard.sharedCleaning.location.streetZipCity')} value={v('address')} onChange={v => set('address', v)} required />
          
          <SH>{tl('wizard.sharedCleaning.propertyType')}</SH>
          <FS label={tl('wizard.sharedCleaning.propertyType')} value={v('propertyType')} onChange={v => set('propertyType', v)}
            options={[
              { value: 'multiFamily', label: tl('wizard.sharedCleaning.types.multiFamily') },
              { value: 'residentialComplex', label: tl('wizard.sharedCleaning.types.residentialComplex') },
              { value: 'officeBuilding', label: tl('wizard.sharedCleaning.types.officeBuilding') },
              { value: 'commercialProperty', label: tl('wizard.sharedCleaning.types.commercialProperty') },
              { value: 'industrialProperty', label: tl('wizard.sharedCleaning.types.industrialProperty') },
              { value: 'practiceClinic', label: tl('wizard.sharedCleaning.types.practiceClinic') },
              { value: 'specialProperty', label: tl('wizard.sharedCleaning.types.specialProperty') },
            ]}
          />
          
          <SH>{tl('wizard.sharedCleaning.propertyInformation')}</SH>
          <div className="grid grid-cols-2 gap-4">
            <FI label={tl('wizard.sharedCleaning.info.units')} value={v('units')} onChange={v => set('units', v)} type="number" />
            <FI label={tl('wizard.sharedCleaning.info.floors')} value={v('floorsCount')} onChange={v => set('floorsCount', v)} type="number" />
            <FI label={tl('wizard.sharedCleaning.info.totalArea')} value={v('totalArea')} onChange={v => set('totalArea', v)} type="number" />
            <FI label={tl('wizard.sharedCleaning.info.outdoorArea')} value={v('outdoorArea')} onChange={v => set('outdoorArea', v)} type="number" />
            <FS label={tl('wizard.cleaning.numberOfRooms')} value={v('numberOfRooms')} onChange={v => set('numberOfRooms', v)} options={roomNumbers} />
          </div>
        </div>
      );
    case 1:
      return (
        <div>
          <SH>{tl('wizard.cleaning.areasTitle')}</SH>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'completeAll', l: tl('wizard.cleaning.areas.completeAll') },
              { k: 'cellar', l: tl('wizard.cleaning.areas.cellar') },
              { k: 'atticScreed', l: tl('wizard.cleaning.areas.atticScreed') },
              { k: 'garage', l: tl('wizard.cleaning.areas.garage') },
              { k: 'conservatory', l: tl('wizard.cleaning.areas.conservatory') },
              { k: 'individualRooms', l: tl('wizard.cleaning.areas.individualRooms') },
            ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('cleaningAreas', s.k)} onChange={() => toggleArr('cleaningAreas', s.k)} /> ))}
          </div>
          
          <SH>{tl('wizard.maintenanceCleaning.floorTypes')}</SH>
          <div className="grid grid-cols-2 gap-2">
          {[
            { k: 'parquet', l: tl('wizard.maintenanceCleaning.floors.parquet') },
            { k: 'laminate', l: tl('wizard.maintenanceCleaning.floors.laminate') },
            { k: 'tiles', l: tl('wizard.maintenanceCleaning.floors.tiles') },
            { k: 'stone', l: tl('wizard.maintenanceCleaning.floors.stone') },
            { k: 'carpet', l: tl('wizard.maintenanceCleaning.floors.carpet') },
            { k: 'pvc', l: tl('wizard.maintenanceCleaning.floors.pvc') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('floorTypes', s.k)} onChange={() => toggleArr('floorTypes', s.k)} /> ))}
          </div>
          
          {service === 'stairwell-cleaning' && (
            <>
              <SH>{tl('wizard.maintenanceCleaning.cleaningUpkeep')}</SH>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { k: 'stairwellClean', l: tl('wizard.maintenanceCleaning.services.stairwellClean') },
                  { k: 'elevatorClean', l: tl('wizard.maintenanceCleaning.services.elevatorClean') },
                  { k: 'basementClean', l: tl('wizard.maintenanceCleaning.services.basementClean') },
                  { k: 'garageClean', l: tl('wizard.maintenanceCleaning.services.garageClean') },
                  { k: 'windowClean', l: tl('wizard.maintenanceCleaning.services.windowClean') },
                  { k: 'deepClean', l: tl('wizard.maintenanceCleaning.services.deepClean') },
                ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('cleaningUpkeep', s.k)} onChange={() => toggleArr('cleaningUpkeep', s.k)} /> ))}
              </div>
            </>
          )}

          <SH>{tl('wizard.maintenanceCleaning.scopeOfServices')}</SH>
          {[
            { k: 'vacuuming', l: tl('wizard.maintenanceCleaning.services.vacuuming') },
            { k: 'wetMopping', l: tl('wizard.maintenanceCleaning.services.wetMopping') },
            { k: 'dusting', l: tl('wizard.maintenanceCleaning.services.dusting') },
            { k: 'kitchen', l: tl('wizard.maintenanceCleaning.services.kitchen') },
            { k: 'officesRooms', l: tl('wizard.maintenanceCleaning.services.officesRooms') },
            { k: 'windows', l: tl('wizard.maintenanceCleaning.services.windows') },
            { k: 'waste', l: tl('wizard.maintenanceCleaning.services.waste') },
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('cleaningServices', s.k)} onChange={() => toggleArr('cleaningServices', s.k)} /> ))}

          <SH>{tl('wizard.cleaning.windowsTitle')}</SH>
          <div className="grid grid-cols-2 gap-4">
             <FI label={tl('wizard.cleaning.normalWindows')} value={v('normalWindows')} onChange={v => set('normalWindows', v)} type="number" />
             <FI label={tl('wizard.cleaning.frenchDoors')} value={v('frenchDoors')} onChange={v => set('frenchDoors', v)} type="number" />
             <FI label={tl('wizard.cleaning.otherGlassSurfaces')} value={v('otherGlassSurfaces')} onChange={v => set('otherGlassSurfaces', v)} type="number" />
             <FI label={tl('wizard.cleaning.panoramicHint')} value={v('panoramicWindows')} onChange={v => set('panoramicWindows', v)} type="number" />
          </div>

          <SH>{tl('wizard.cleaning.blindsTitle')}</SH>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'venetian', l: tl('wizard.cleaning.blinds.venetian') },
              { k: 'rollerShutters', l: tl('wizard.cleaning.blinds.rollerShutters') },
              { k: 'shutters', l: tl('wizard.cleaning.blinds.shutters') },
              { k: 'slat', l: tl('wizard.cleaning.blinds.slat') },
              { k: 'adjustable', l: tl('wizard.cleaning.blinds.adjustable') },
              { k: 'windowShutters', l: tl('wizard.cleaning.blinds.windowShutters') },
              { k: 'blinds', l: tl('wizard.cleaning.blinds.blinds') },
              { k: 'otherSpecial', l: tl('wizard.cleaning.blinds.otherSpecial') },
              { k: 'no', l: tl('wizard.cleaning.blinds.no') }
            ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('blinds', s.k)} onChange={() => toggleArr('blinds', s.k)} /> ))}
          </div>
          
          <SH>{tl('wizard.cleaning.specialFeaturesTitle')}</SH>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'heavilySoiled', l: tl('wizard.cleaning.specialFeatures.heavilySoiled') },
              { k: 'moldFrames', l: tl('wizard.cleaning.specialFeatures.moldFrames') },
              { k: 'smallCasement', l: tl('wizard.cleaning.specialFeatures.smallCasement') },
              { k: 'roofWindow', l: tl('wizard.cleaning.specialFeatures.roofWindow') },
              { k: 'safetyFilm', l: tl('wizard.cleaning.specialFeatures.safetyFilm') },
              { k: 'noSpecial', l: tl('wizard.cleaning.specialFeatures.noSpecial') }
            ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('windowSpecialFeatures', s.k)} onChange={() => toggleArr('windowSpecialFeatures', s.k)} /> ))}
          </div>
        </div>
      );
    case 2:
      return (
        <div>
          <SH>{tl('wizard.maintenanceCleaning.frequency')}</SH>

          <FS label={tl('wizard.maintenanceCleaning.frequency')} value={v('frequency')} onChange={v => set('frequency', v)}
            options={[
              { value: 'daily', label: tl('wizard.maintenanceCleaning.frequencies.daily') },
              { value: 'twoThreeTimes', label: tl('wizard.maintenanceCleaning.frequencies.twoThreeTimes') },
              { value: 'weekly', label: tl('wizard.maintenanceCleaning.frequencies.weekly') },
              { value: 'biweekly', label: tl('wizard.maintenanceCleaning.frequencies.biweekly') },
              { value: 'monthly', label: tl('wizard.maintenanceCleaning.frequencies.monthly') },
              { value: 'custom', label: tl('wizard.maintenanceCleaning.frequencies.custom') }
            ]}
          />
          
          <SH>{tl('wizard.sharedCleaning.workingHours')}</SH>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'earlyMorning', l: tl('wizard.sharedCleaning.hours.earlyMorning') },
              { k: 'morning', l: tl('wizard.sharedCleaning.hours.morning') },
              { k: 'afternoon', l: tl('wizard.sharedCleaning.hours.afternoon') },
              { k: 'evening', l: tl('wizard.sharedCleaning.hours.evening') },
              { k: 'duringBusinessHours', l: tl('wizard.sharedCleaning.hours.duringBusinessHours') },
              { k: 'afterBusinessHours', l: tl('wizard.sharedCleaning.hours.afterBusinessHours') },
              { k: 'flexible', l: tl('wizard.sharedCleaning.hours.flexible') }
            ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('workingHours', s.k)} onChange={() => toggleArr('workingHours', s.k)} /> ))}
          </div>
          <SH>{tl('wizard.sharedCleaning.accessAndOrg')}</SH>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'keysAvailable', l: tl('wizard.sharedCleaning.access.keysAvailable') },
              { k: 'accessSystemCode', l: tl('wizard.sharedCleaning.access.accessSystemCode') },
              { k: 'caretakerOnSite', l: tl('wizard.sharedCleaning.access.caretakerOnSite') },
              { k: 'adminOnSite', l: tl('wizard.sharedCleaning.access.adminOnSite') },
              { k: 'alarmSystem', l: tl('wizard.sharedCleaning.access.alarmSystem') },
              { k: 'houseRulesAvailable', l: tl('wizard.sharedCleaning.access.houseRulesAvailable') },
              { k: 'cleaningPlanAvailable', l: tl('wizard.sharedCleaning.access.cleaningPlanAvailable') }
            ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('accessAndOrg', s.k)} onChange={() => toggleArr('accessAndOrg', s.k)} /> ))}
          </div>

          <FS label={tl('wizard.maintenanceCleaning.cleaningDuration')} value={v('cleaningDuration')} onChange={v => set('cleaningDuration', v)}
            options={[
              { value: 'hours12', label: tl('wizard.maintenanceCleaning.durations.hours12') },
              { value: 'hours23', label: tl('wizard.maintenanceCleaning.durations.hours23') },
              { value: 'hours35', label: tl('wizard.maintenanceCleaning.durations.hours35') },
              { value: 'halfDay', label: tl('wizard.maintenanceCleaning.durations.halfDay') }
            ]}
          />

          <SH>{tl('wizard.maintenanceCleaning.special')}</SH>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'pets', l: tl('wizard.maintenanceCleaning.specialItems.pets') },
              { k: 'children', l: tl('wizard.maintenanceCleaning.specialItems.children') },
              { k: 'alarmSystem', l: tl('wizard.maintenanceCleaning.specialItems.alarmSystem') }
            ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('specialItems', s.k)} onChange={() => toggleArr('specialItems', s.k)} /> ))}
          </div>
        </div>
      );
    case 3:
      return (
        <div>
          <FI label={tl('wizard.maintenanceCleaning.startDate')} value={v('startDate')} onChange={v => set('startDate', v)} type="date" required />
          <FI label={tl('wizard.cleaning.deliveryHandoverDate')} value={v('deliveryHandoverDate')} onChange={v => set('deliveryHandoverDate', v)} type="datetime-local" />
          <SH>{tl('wizard.maintenanceCleaning.contact')}</SH>
          <FI label={tl('wizard.maintenanceCleaning.nameCompany')} value={v('nameFirstName')} onChange={v => set('nameFirstName', v)} required />
          <FI label={tl('wizard.maintenanceCleaning.email')} value={v('emailAddress')} onChange={v => set('emailAddress', v)} type="email" required />
          <FI label={tl('wizard.maintenanceCleaning.phone')} value={v('telephone')} onChange={v => set('telephone', v)} type="tel" required />
          <FTA label={tl('wizard.maintenanceCleaning.notes')} value={v('notes')} onChange={v => set('notes', v)} />
          <ImageUpload />
        </div>
      );
    default: return null;
  }
}
