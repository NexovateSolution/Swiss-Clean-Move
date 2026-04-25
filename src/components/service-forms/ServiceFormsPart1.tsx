import React from 'react';
import { FormStepProps, FI, FS, FR, FC, FTA, SH, getFloorOptions, roomNumbers, livingSpaceOptions } from '../FormControls';





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
