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


