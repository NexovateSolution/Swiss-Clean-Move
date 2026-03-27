import React from 'react';
import { FormStepProps, FI, FS, FR, FC, FTA, SH, getFloorOptions, roomNumbers, boxOptions } from '../FormControls';

export function DisposalForm({ step, d, set, tl, v, arrHas, toggleArr, ImageUpload }: FormStepProps) {
  switch (step) {
    case 0:
      return (
        <div>
          <FR label={tl('wizard.disposal.pleaseChoose')} value={v('disposalType')} onChange={v => set('disposalType', v)}
            options={[
              { value: 'disposal', label: tl('wizard.disposal.disposalTypes.disposal') },
              { value: 'eviction', label: tl('wizard.disposal.disposalTypes.eviction') },
              { value: 'disposal-clearance', label: tl('wizard.disposal.disposalTypes.disposalClearance') },
            ]}
          />
          <SH>{tl('wizard.disposal.property')}</SH>
           <FS label={tl('wizard.disposal.objectType')} value={v('objectType')} onChange={v => set('objectType', v)}
              options={[
                { value: 'apartment', label: tl('wizard.cleaning.objectTypes.apartment') },
                { value: 'house', label: tl('wizard.cleaning.objectTypes.house') },
                { value: 'office', label: tl('wizard.cleaning.objectTypes.office') },
                { value: 'storage-cellar', label: tl('wizard.cleaning.objectTypes.storageCellar') },
              ]}
            />
          <FI label={tl('wizard.disposal.address')} value={v('address')} onChange={v => set('address', v)} required />
          <div className="grid grid-cols-2 gap-4">
             <FS label={tl('wizard.disposal.floor')} value={v('floor')} onChange={v => set('floor', v)} options={getFloorOptions(tl)} />
             <FS label={tl('wizard.cleaning.numberOfRooms')} value={v('rooms')} onChange={v => set('rooms', v)} options={roomNumbers} />
          </div>
          <FR label={tl('wizard.disposal.elevatorAvailable')} value={v('elevator')} onChange={v => set('elevator', v)}
            options={[{ value: 'yes', label: tl('wizard.disposal.yes') }, { value: 'no', label: tl('wizard.disposal.no') }]}
          />

          <SH>{tl('wizard.disposal.accessibility')}</SH>
          {[
            { k: 'elevator', l: tl('wizard.disposal.access.elevator') },
            { k: 'directAccess', l: tl('wizard.disposal.access.directAccess') },
            { k: 'narrowStairs', l: tl('wizard.disposal.access.narrowStairs') },
            { k: 'parkingAvailable', l: tl('wizard.disposal.access.parkingAvailable') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('access', s.k)} onChange={() => toggleArr('access', s.k)} /> ))}
        </div>
      );
    case 1:
      return (
        <div>
          <SH>{tl('wizard.disposal.volume')}</SH>
          <FS label={tl('wizard.disposal.estimatedVolume')} value={v('estimatedVolume')} onChange={v => set('estimatedVolume', v)}
            options={[
              { value: 'small', label: tl('wizard.disposal.volumes.small') },
              { value: 'medium', label: tl('wizard.disposal.volumes.medium') },
              { value: 'large', label: tl('wizard.disposal.volumes.large') },
              { value: 'veryLarge', label: tl('wizard.disposal.volumes.veryLarge') },
              { value: 'dontKnow', label: tl('wizard.disposal.volumes.dontKnow') }
            ]}
          />
          <FR label={tl('wizard.disposal.materialAmount')} value={v('materialAmount')} onChange={v => set('materialAmount', v)}
            options={[
              { value: 'little', label: tl('wizard.disposal.materialAmounts.little') },
              { value: 'medium', label: tl('wizard.disposal.materialAmounts.medium') },
              { value: 'lots', label: tl('wizard.disposal.materialAmounts.lots') },
            ]}
          />

          <SH>{tl('wizard.disposal.materials')}</SH>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'furniture', l: tl('wizard.disposal.materialTypes.furniture') },
              { k: 'electronic', l: tl('wizard.disposal.materialTypes.electronic') },
              { k: 'wood', l: tl('wizard.disposal.materialTypes.wood') },
              { k: 'metal', l: tl('wizard.disposal.materialTypes.metal') },
              { k: 'paper', l: tl('wizard.disposal.materialTypes.paper') },
              { k: 'garden', l: tl('wizard.disposal.materialTypes.garden') },
              { k: 'hazardous', l: tl('wizard.disposal.materialTypes.hazardous') }
            ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('materials', s.k)} onChange={() => toggleArr('materials', s.k)} /> ))}
          </div>
          
          <SH>{tl('wizard.disposal.wasteTitle')}</SH>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'furniture', l: tl('wizard.disposal.wasteItems.furniture') },
              { k: 'electrical', l: tl('wizard.disposal.wasteItems.electrical') },
              { k: 'cardboard', l: tl('wizard.disposal.wasteItems.cardboard') },
              { k: 'construction', l: tl('wizard.disposal.wasteItems.construction') },
              { k: 'garden', l: tl('wizard.disposal.wasteItems.garden') },
              { k: 'textiles', l: tl('wizard.disposal.wasteItems.textiles') },
            ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('wasteItems', s.k)} onChange={() => toggleArr('wasteItems', s.k)} /> ))}
          </div>
          <FI label={tl('wizard.disposal.otherDisposalItems')} value={v('otherDisposalItems')} onChange={v => set('otherDisposalItems', v)} />

          <SH>{tl('wizard.disposal.heavyItems')}</SH>
          {[
            { k: 'piano', l: tl('wizard.disposal.heavy.piano') },
            { k: 'safe', l: tl('wizard.disposal.heavy.safe') },
            { k: 'fitness', l: tl('wizard.disposal.heavy.fitness') },
            { k: 'none', l: tl('wizard.disposal.heavy.none') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('heavyItems', s.k)} onChange={() => toggleArr('heavyItems', s.k)} /> ))}
        </div>
      );
    case 2:
      return (
        <div>
          <SH>{tl('wizard.disposal.extraServices')}</SH>
          <FR label={tl('wizard.disposal.disassemblyNeeded')} value={v('disassemblyNeeded')} onChange={v => set('disassemblyNeeded', v)}
            options={[{ value: 'yes', label: tl('wizard.disposal.yes') }, { value: 'no', label: tl('wizard.disposal.no') }]}
          />
          {[
            { k: 'demolition', l: tl('wizard.disposal.services.demolition') },
            { k: 'packing', l: tl('wizard.disposal.services.packing') },
            { k: 'cleaning', l: tl('wizard.disposal.services.cleaning') },
            { k: 'painting', l: tl('wizard.disposal.services.painting') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('extraServices', s.k)} onChange={() => toggleArr('extraServices', s.k)} /> ))}
          <FC label={tl('wizard.disposal.additionalOptions.broomCleaning')} checked={arrHas('extraServices', 'broomCleaning')} onChange={() => toggleArr('extraServices', 'broomCleaning')} />

          <SH>{tl('wizard.disposal.urgency')}</SH>
          <FS label={tl('wizard.disposal.urgency')} value={v('urgency')} onChange={v => set('urgency', v)}
            options={[
              { value: 'immediate', label: tl('wizard.disposal.urgencies.immediate') },
              { value: 'thisWeek', label: tl('wizard.disposal.urgencies.thisWeek') },
              { value: 'thisMonth', label: tl('wizard.disposal.urgencies.thisMonth') },
              { value: 'flexible', label: tl('wizard.disposal.urgencies.flexible') }
            ]}
          />
          
          <SH>{tl('wizard.disposal.photos')}</SH>
          <ImageUpload />
        </div>
      );
    case 3:
      return (
        <div>
          <FI label={tl('wizard.disposal.desiredDate')} value={v('desiredDate')} onChange={v => set('desiredDate', v)} type="date" required />
          <FTA label={tl('wizard.disposal.notes')} value={v('notes')} onChange={v => set('notes', v)} />

          <SH>{tl('wizard.disposal.contact')}</SH>
          <FI label={tl('wizard.disposal.nameCompany')} value={v('nameFirstName')} onChange={v => set('nameFirstName', v)} required />
          <FI label={tl('wizard.disposal.email')} value={v('emailAddress')} onChange={v => set('emailAddress', v)} type="email" required />
          <FI label={tl('wizard.disposal.phone')} value={v('telephone')} onChange={v => set('telephone', v)} type="tel" required />
        </div>
      );
    default: return null;
  }
}

export function ConstructionCleaningForm({ step, d, set, tl, v, arrHas, toggleArr, ImageUpload }: FormStepProps) {
  switch (step) {
    case 0:
      return (
        <div>
          <SH>{tl('wizard.constructionCleaning.project')}</SH>
          <FI label={tl('wizard.constructionCleaning.address')} value={v('address')} onChange={v => set('address', v)} required />
          <FS label={tl('wizard.constructionCleaning.propertyType')} value={v('propertyType')} onChange={v => set('propertyType', v)}
            options={[
              { value: 'apartment', label: tl('wizard.constructionCleaning.types.apartment') },
              { value: 'house', label: tl('wizard.constructionCleaning.types.house') },
              { value: 'commercial', label: tl('wizard.constructionCleaning.types.commercial') },
              { value: 'industrial', label: tl('wizard.constructionCleaning.types.industrial') },
              { value: 'public', label: tl('wizard.constructionCleaning.types.public') }
            ]}
          />
          <div className="grid grid-cols-2 gap-4">
            <FI label={tl('wizard.constructionCleaning.area')} value={v('area')} onChange={v => set('area', v)} type="number" required />
            <FI label={tl('wizard.constructionCleaning.rooms')} value={v('rooms')} onChange={v => set('rooms', v)} type="number" />
            <FI label={tl('wizard.constructionCleaning.floors')} value={v('floors')} onChange={v => set('floors', v)} type="number" />
            <FI label={tl('wizard.constructionCleaning.sanitary')} value={v('sanitary')} onChange={v => set('sanitary', v)} type="number" />
          </div>

          <SH>{tl('wizard.constructionCleaning.projectPhase')}</SH>
          <FS label={tl('wizard.constructionCleaning.phase')} value={v('phase')} onChange={v => set('phase', v)}
            options={[
              { value: 'rough', label: tl('wizard.constructionCleaning.phases.rough') },
              { value: 'intermediate', label: tl('wizard.constructionCleaning.phases.intermediate') },
              { value: 'fine', label: tl('wizard.constructionCleaning.phases.fine') },
              { value: 'handover', label: tl('wizard.constructionCleaning.phases.handover') }
            ]}
          />
        </div>
      );
    case 1:
      return (
        <div>
          <SH>{tl('wizard.constructionCleaning.floorTypes')}</SH>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'parquet', l: tl('wizard.constructionCleaning.floors.parquet') },
              { k: 'laminate', l: tl('wizard.constructionCleaning.floors.laminate') },
              { k: 'tiles', l: tl('wizard.constructionCleaning.floors.tiles') },
              { k: 'stone', l: tl('wizard.constructionCleaning.floors.stone') },
              { k: 'carpet', l: tl('wizard.constructionCleaning.floors.carpet') },
              { k: 'concrete', l: tl('wizard.constructionCleaning.floors.concrete') },
              { k: 'epoxy', l: tl('wizard.constructionCleaning.floors.epoxy') }
            ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('floorTypes', s.k)} onChange={() => toggleArr('floorTypes', s.k)} /> ))}
          </div>

          <SH>{tl('wizard.constructionCleaning.windows')}</SH>
          <div className="grid grid-cols-2 gap-4">
            <FI label={tl('wizard.constructionCleaning.windowsCount')} value={v('windowsCount')} onChange={v => set('windowsCount', v)} type="number" />
          </div>
          <FS label={tl('wizard.constructionCleaning.windowTypes')} value={v('windowTypes')} onChange={v => set('windowTypes', v)}
            options={[
              { value: 'standard', label: tl('wizard.constructionCleaning.windowsSpecs.standard') },
              { value: 'large', label: tl('wizard.constructionCleaning.windowsSpecs.large') },
              { value: 'skylights', label: tl('wizard.constructionCleaning.windowsSpecs.skylights') },
              { value: 'facade', label: tl('wizard.constructionCleaning.windowsSpecs.facade') }
            ]}
          />
          <FC label={tl('wizard.constructionCleaning.windowsSpecs.paintSpoils')} checked={arrHas('windowIssues', 'paintSpoils')} onChange={() => toggleArr('windowIssues', 'paintSpoils')} />
          <FC label={tl('wizard.constructionCleaning.windowsSpecs.stickers')} checked={arrHas('windowIssues', 'stickers')} onChange={() => toggleArr('windowIssues', 'stickers')} />

          <SH>{tl('wizard.constructionCleaning.specialContamination')}</SH>
          {[
            { k: 'paint', l: tl('wizard.constructionCleaning.contamination.paint') },
            { k: 'cement', l: tl('wizard.constructionCleaning.contamination.cement') },
            { k: 'glue', l: tl('wizard.constructionCleaning.contamination.glue') },
            { k: 'dust', l: tl('wizard.constructionCleaning.contamination.dust') },
            { k: 'silicone', l: tl('wizard.constructionCleaning.contamination.silicone') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('contamination', s.k)} onChange={() => toggleArr('contamination', s.k)} /> ))}
        </div>
      );
    case 2:
      return (
        <div>
          <SH>{tl('wizard.constructionCleaning.additionalServices')}</SH>
          {[
            { k: 'wasteDisposal', l: tl('wizard.constructionCleaning.services.wasteDisposal') },
            { k: 'container', l: tl('wizard.constructionCleaning.services.container') },
            { k: 'facade', l: tl('wizard.constructionCleaning.services.facade') },
            { k: 'highPressure', l: tl('wizard.constructionCleaning.services.highPressure') },
            { k: 'sealing', l: tl('wizard.constructionCleaning.services.sealing') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('additionalServices', s.k)} onChange={() => toggleArr('additionalServices', s.k)} /> ))}

          <SH>{tl('wizard.constructionCleaning.onSiteContext')}</SH>
          <FC label={tl('wizard.constructionCleaning.site.water')} checked={arrHas('siteConditions', 'water')} onChange={() => toggleArr('siteConditions', 'water')} />
          <FC label={tl('wizard.constructionCleaning.site.electricity')} checked={arrHas('siteConditions', 'electricity')} onChange={() => toggleArr('siteConditions', 'electricity')} />
          <FC label={tl('wizard.constructionCleaning.site.elevator')} checked={arrHas('siteConditions', 'elevator')} onChange={() => toggleArr('siteConditions', 'elevator')} />
          
          <SH>{tl('wizard.constructionCleaning.photos')}</SH>
          <ImageUpload />
        </div>
      );
    case 3:
      return (
        <div>
          <FI label={tl('wizard.constructionCleaning.desiredStart')} value={v('desiredStart')} onChange={v => set('desiredStart', v)} type="date" required />
          <FI label={tl('wizard.constructionCleaning.deadline')} value={v('deadline')} onChange={v => set('deadline', v)} type="date" />
          <FTA label={tl('wizard.constructionCleaning.notes')} value={v('notes')} onChange={v => set('notes', v)} />

          <SH>{tl('wizard.constructionCleaning.contact')}</SH>
          <FI label={tl('wizard.constructionCleaning.company')} value={v('company')} onChange={v => set('company', v)} />
          <FI label={tl('wizard.constructionCleaning.nameContact')} value={v('nameFirstName')} onChange={v => set('nameFirstName', v)} required />
          <FI label={tl('wizard.constructionCleaning.email')} value={v('emailAddress')} onChange={v => set('emailAddress', v)} type="email" required />
          <FI label={tl('wizard.constructionCleaning.phone')} value={v('telephone')} onChange={v => set('telephone', v)} type="tel" required />
        </div>
      );
    default: return null;
  }
}

export function GastronomyCleaningForm({ step, d, set, tl, v, arrHas, toggleArr, ImageUpload }: FormStepProps) {
  switch (step) {
    case 0:
      return (
        <div>
          <SH>{tl('wizard.gastronomyCleaning.facility')}</SH>
          <FI label={tl('wizard.gastronomyCleaning.address')} value={v('address')} onChange={v => set('address', v)} required />
          <FS label={tl('wizard.gastronomyCleaning.facilityType')} value={v('facilityType')} onChange={v => set('facilityType', v)}
            options={[
              { value: 'restaurant', label: tl('wizard.gastronomyCleaning.types.restaurant') },
              { value: 'cafe', label: tl('wizard.gastronomyCleaning.types.cafe') },
              { value: 'bar', label: tl('wizard.gastronomyCleaning.types.bar') },
              { value: 'canteen', label: tl('wizard.gastronomyCleaning.types.canteen') },
              { value: 'hotel', label: tl('wizard.gastronomyCleaning.types.hotel') },
              { value: 'takeaway', label: tl('wizard.gastronomyCleaning.types.takeaway') },
              { value: 'club', label: tl('wizard.gastronomyCleaning.types.club') }
            ]}
          />
          <div className="grid grid-cols-2 gap-4">
            <FI label={tl('wizard.gastronomyCleaning.area')} value={v('area')} onChange={v => set('area', v)} type="number" required />
            <FI label={tl('wizard.gastronomyCleaning.kitchenArea')} value={v('kitchenArea')} onChange={v => set('kitchenArea', v)} type="number" />
            <FI label={tl('wizard.gastronomyCleaning.diningArea')} value={v('diningArea')} onChange={v => set('diningArea', v)} type="number" />
            <FI label={tl('wizard.gastronomyCleaning.seating')} value={v('seating')} onChange={v => set('seating', v)} type="number" />
          </div>

          <SH>{tl('wizard.gastronomyCleaning.sanitary')}</SH>
          <FI label={tl('wizard.gastronomyCleaning.restrooms')} value={v('restrooms')} onChange={v => set('restrooms', v)} type="number" />
          <FI label={tl('wizard.gastronomyCleaning.staffRestrooms')} value={v('staffRestrooms')} onChange={v => set('staffRestrooms', v)} type="number" />
        </div>
      );
    case 1:
      return (
        <div>
          <SH>{tl('wizard.gastronomyCleaning.kitchenDetails')}</SH>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'extractorHoods', l: tl('wizard.gastronomyCleaning.kitchen.extractorHoods') },
              { k: 'greaseTraps', l: tl('wizard.gastronomyCleaning.kitchen.greaseTraps') },
              { k: 'ovens', l: tl('wizard.gastronomyCleaning.kitchen.ovens') },
              { k: 'deepFryers', l: tl('wizard.gastronomyCleaning.kitchen.deepFryers') },
              { k: 'coolingUnits', l: tl('wizard.gastronomyCleaning.kitchen.coolingUnits') },
              { k: 'drains', l: tl('wizard.gastronomyCleaning.kitchen.drains') },
              { k: 'walls', l: tl('wizard.gastronomyCleaning.kitchen.walls') }
            ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('kitchenItems', s.k)} onChange={() => toggleArr('kitchenItems', s.k)} /> ))}
          </div>

          <SH>{tl('wizard.gastronomyCleaning.diningDetails')}</SH>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'floors', l: tl('wizard.gastronomyCleaning.dining.floors') },
              { k: 'furniture', l: tl('wizard.gastronomyCleaning.dining.furniture') },
              { k: 'windows', l: tl('wizard.gastronomyCleaning.dining.windows') },
              { k: 'bar', l: tl('wizard.gastronomyCleaning.dining.bar') },
              { k: 'decorations', l: tl('wizard.gastronomyCleaning.dining.decorations') },
              { k: 'lighting', l: tl('wizard.gastronomyCleaning.dining.lighting') }
            ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('diningItems', s.k)} onChange={() => toggleArr('diningItems', s.k)} /> ))}
          </div>

          <SH>{tl('wizard.gastronomyCleaning.specialAreas')}</SH>
          {[
            { k: 'coldStorage', l: tl('wizard.gastronomyCleaning.special.coldStorage') },
            { k: 'storage', l: tl('wizard.gastronomyCleaning.special.storage') },
            { k: 'staffRooms', l: tl('wizard.gastronomyCleaning.special.staffRooms') },
            { k: 'outdoor', l: tl('wizard.gastronomyCleaning.special.outdoor') },
            { k: 'smoking', l: tl('wizard.gastronomyCleaning.special.smoking') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('specialAreas', s.k)} onChange={() => toggleArr('specialAreas', s.k)} /> ))}
        </div>
      );
    case 2:
      return (
        <div>
          <SH>{tl('wizard.gastronomyCleaning.frequency')}</SH>
          <FS label={tl('wizard.gastronomyCleaning.frequency')} value={v('frequency')} onChange={v => set('frequency', v)}
            options={[
              { value: 'daily', label: tl('wizard.gastronomyCleaning.frequencies.daily') },
              { value: 'severalTimes', label: tl('wizard.gastronomyCleaning.frequencies.severalTimes') },
              { value: 'weekly', label: tl('wizard.gastronomyCleaning.frequencies.weekly') },
              { value: 'biweekly', label: tl('wizard.gastronomyCleaning.frequencies.biweekly') },
              { value: 'monthly', label: tl('wizard.gastronomyCleaning.frequencies.monthly') },
              { value: 'onDemand', label: tl('wizard.gastronomyCleaning.frequencies.onDemand') },
              { value: 'deepCleaning', label: tl('wizard.gastronomyCleaning.frequencies.deepCleaning') }
            ]}
          />
          <FS label={tl('wizard.gastronomyCleaning.times')} value={v('times')} onChange={v => set('times', v)}
            options={[
              { value: 'earlyMorning', label: tl('wizard.gastronomyCleaning.times.earlyMorning') },
              { value: 'morning', label: tl('wizard.gastronomyCleaning.times.morning') },
              { value: 'afternoon', label: tl('wizard.gastronomyCleaning.times.afternoon') },
              { value: 'evening', label: tl('wizard.gastronomyCleaning.times.evening') },
              { value: 'night', label: tl('wizard.gastronomyCleaning.times.night') }
            ]}
          />

          <SH>{tl('wizard.gastronomyCleaning.additionalServices')}</SH>
          {[
            { k: 'pestControl', l: tl('wizard.gastronomyCleaning.services.pestControl') },
            { k: 'wasteDisposal', l: tl('wizard.gastronomyCleaning.services.wasteDisposal') },
            { k: 'laundry', l: tl('wizard.gastronomyCleaning.services.laundry') },
            { k: 'consumables', l: tl('wizard.gastronomyCleaning.services.consumables') },
            { k: 'haccp', l: tl('wizard.gastronomyCleaning.services.haccp') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('additionalServices', s.k)} onChange={() => toggleArr('additionalServices', s.k)} /> ))}

          <ImageUpload />
        </div>
      );
    case 3:
      return (
        <div>
          <FI label={tl('wizard.gastronomyCleaning.desiredStart')} value={v('desiredStart')} onChange={v => set('desiredStart', v)} type="date" required />
          <FTA label={tl('wizard.gastronomyCleaning.notes')} value={v('notes')} onChange={v => set('notes', v)} />

          <SH>{tl('wizard.gastronomyCleaning.contact')}</SH>
          <FI label={tl('wizard.gastronomyCleaning.company')} value={v('company')} onChange={v => set('company', v)} required />
          <FI label={tl('wizard.gastronomyCleaning.nameContact')} value={v('nameFirstName')} onChange={v => set('nameFirstName', v)} required />
          <FI label={tl('wizard.gastronomyCleaning.email')} value={v('emailAddress')} onChange={v => set('emailAddress', v)} type="email" required />
          <FI label={tl('wizard.gastronomyCleaning.phone')} value={v('telephone')} onChange={v => set('telephone', v)} type="tel" required />
        </div>
      );
    default: return null;
  }
}
