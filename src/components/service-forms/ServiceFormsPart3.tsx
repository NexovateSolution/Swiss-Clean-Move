import React from 'react';
import { FormStepProps, FI, FS, FR, FC, FTA, SH, getFloorOptions, roomNumbers, livingSpaceOptions, peopleOptions, boxOptions } from '../FormControls';

export function RelocationForm({ step, d, set, tl, v, arrHas, toggleArr, ImageUpload }: FormStepProps) {
  switch (step) {
    case 0:
      return (
        <div>
          <SH>{tl('wizard.relocation.movingFrom')}</SH>
          <FI label={tl('wizard.relocation.address')} value={v('movingFromAddress')} onChange={v => set('movingFromAddress', v)} required />
          <div className="grid grid-cols-2 gap-4">
             <FS label={tl('wizard.relocation.currentLiving')} value={v('currentLiving')} onChange={v => set('currentLiving', v)}
               options={[
                 { value: 'apartment', label: tl('wizard.relocation.currentLivingOptions.apartment') },
                 { value: 'house', label: tl('wizard.relocation.currentLivingOptions.house') },
                 { value: 'wgRoom', label: tl('wizard.relocation.currentLivingOptions.wgRoom') },
                 { value: 'studio', label: tl('wizard.relocation.currentLivingOptions.studio') },
                 { value: 'office', label: tl('wizard.relocation.currentLivingOptions.office') }
               ]}
             />
             <FS label={tl('wizard.relocation.currentFloor')} value={v('currentFloor')} onChange={v => set('currentFloor', v)} options={getFloorOptions(tl)} />
             <FR label={tl('wizard.relocation.elevatorAvailable')} value={v('currentElevator')} onChange={v => set('currentElevator', v)}
               options={[{ value: 'yes', label: tl('wizard.relocation.yes') }, { value: 'no', label: tl('wizard.relocation.no') }]}
             />
             <FS label={tl('wizard.relocation.currentLivingSpace')} value={v('currentLivingSpace')} onChange={v => set('currentLivingSpace', v)} options={livingSpaceOptions} />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <FS label={tl('wizard.relocation.currentRooms')} value={v('currentRooms')} onChange={v => set('currentRooms', v)} options={roomNumbers} />
             <FI label={tl('wizard.relocation.parkingDistance')} value={v('parkingDistance')} onChange={v => set('parkingDistance', v)} type="number" placeholder="Distance in meters (e.g. 10)" />
          </div>
          
          <SH>{tl('wizard.relocation.movingTo')}</SH>
          <FI label={tl('wizard.relocation.address')} value={v('movingToAddress')} onChange={v => set('movingToAddress', v)} required />
          <div className="grid grid-cols-2 gap-4">
             <FS label={tl('wizard.relocation.movingTo')} value={v('movingToType')} onChange={v => set('movingToType', v)}
               options={[
                 { value: 'apartment', label: tl('wizard.relocation.movingToOptions.apartment') },
                 { value: 'house', label: tl('wizard.relocation.movingToOptions.house') },
                 { value: 'wgRoom', label: tl('wizard.relocation.movingToOptions.wgRoom') },
                 { value: 'studio', label: tl('wizard.relocation.movingToOptions.studio') },
                 { value: 'office', label: tl('wizard.relocation.movingToOptions.office') },
                 { value: 'storage', label: tl('wizard.relocation.movingToOptions.storage') },
               ]}
             />
             <FS label={tl('wizard.relocation.floor')} value={v('toFloor')} onChange={v => set('toFloor', v)} options={getFloorOptions(tl)} />
             <FR label={tl('wizard.relocation.newElevator')} value={v('newElevator')} onChange={v => set('newElevator', v)}
               options={[{ value: 'yes', label: tl('wizard.relocation.yes') }, { value: 'no', label: tl('wizard.relocation.no') }]}
             />
             <FS label={tl('wizard.relocation.newLivingSpace')} value={v('newLivingSpace')} onChange={v => set('newLivingSpace', v)} options={livingSpaceOptions} />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <FS label={tl('wizard.relocation.newRooms')} value={v('newRooms')} onChange={v => set('newRooms', v)} options={roomNumbers} />
             <FS label={tl('wizard.relocation.peopleMoving')} value={v('peopleMoving')} onChange={v => set('peopleMoving', v)} options={peopleOptions} hint={tl('wizard.relocation.peopleMovingHint')} />
          </div>
        </div>
      );
    case 1:
      return (
        <div>
          <SH>{tl('wizard.relocation.inventory')}</SH>
          <FS label={tl('wizard.relocation.volume')} value={v('volume')} onChange={v => set('volume', v)}
            options={[
              { value: 'small', label: tl('wizard.relocation.volumes.small') },
              { value: 'medium', label: tl('wizard.relocation.volumes.medium') },
              { value: 'large', label: tl('wizard.relocation.volumes.large') },
              { value: 'veryLarge', label: tl('wizard.relocation.volumes.veryLarge') },
              { value: 'dontKnow', label: tl('wizard.relocation.volumes.dontKnow') }
            ]}
          />
          <FI label={tl('wizard.relocation.movingBoxes')} value={v('movingBoxes')} onChange={v => set('movingBoxes', v)} type="number" min="0" placeholder="e.g. 20" hint={tl('wizard.relocation.movingBoxesHint')} />
          
          <SH>{tl('wizard.relocation.additionalSuppliesTitle')}</SH>
          {[
            { k: 'movingBox', l: tl('wizard.relocation.supplies.movingBox') },
            { k: 'wardrobeBox', l: tl('wizard.relocation.supplies.wardrobeBox') },
            { k: 'bottleCarton', l: tl('wizard.relocation.supplies.bottleCarton') },
            { k: 'adhesiveTape', l: tl('wizard.relocation.supplies.adhesiveTape') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('movingSupplies', s.k)} onChange={() => toggleArr('movingSupplies', s.k)} /> ))}

          <SH>{tl('wizard.relocation.heavyItems')}</SH>
          {[
            { k: 'piano', l: tl('wizard.relocation.heavy.piano') },
            { k: 'safe', l: tl('wizard.relocation.heavy.safe') },
            { k: 'fitness', l: tl('wizard.relocation.heavy.fitness') },
            { k: 'aquarium', l: tl('wizard.relocation.heavy.aquarium') },
            { k: 'none', l: tl('wizard.relocation.heavy.none') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('heavyItems', s.k)} onChange={() => toggleArr('heavyItems', s.k)} /> ))}
        </div>
      );
    case 2:
      return (
        <div>
          <SH>{tl('wizard.relocation.services')}</SH>
          {[
            { k: 'packing', l: tl('wizard.relocation.serviceOptions.packing') },
            { k: 'unpacking', l: tl('wizard.relocation.serviceOptions.unpacking') },
            { k: 'dismantling', l: tl('wizard.relocation.serviceOptions.dismantling') },
            { k: 'assembly', l: tl('wizard.relocation.serviceOptions.assembly') },
            { k: 'lampInstallation', l: tl('wizard.relocation.serviceOptions.lampInstallation') },
            { k: 'furnitureLift', l: tl('wizard.relocation.serviceOptions.furnitureLift') },
            { k: 'storage', l: tl('wizard.relocation.serviceOptions.storage') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('services', s.k)} onChange={() => toggleArr('services', s.k)} /> ))}
          
          <SH>{tl('wizard.relocation.areasCleaningTitle')}</SH>
          {[
            { k: 'completeAll', l: tl('wizard.cleaning.areas.completeAll') },
            { k: 'cellar', l: tl('wizard.cleaning.areas.cellar') },
            { k: 'atticScreed', l: tl('wizard.cleaning.areas.atticScreed') },
            { k: 'garage', l: tl('wizard.cleaning.areas.garage') },
            { k: 'conservatory', l: tl('wizard.cleaning.areas.conservatory') },
            { k: 'individualRooms', l: tl('wizard.cleaning.areas.individualRooms') },
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('cleaningAreas', s.k)} onChange={() => toggleArr('cleaningAreas', s.k)} /> ))}

          <SH>{tl('wizard.relocation.otherAreasTitle')}</SH>
          {[
            { k: 'cellar', l: tl('wizard.relocation.otherAreas.cellar') },
            { k: 'atticScreed', l: tl('wizard.relocation.otherAreas.atticScreed') },
            { k: 'garageParkingSpace', l: tl('wizard.relocation.otherAreas.garageParkingSpace') },
            { k: 'conservatoryBalcony', l: tl('wizard.relocation.otherAreas.conservatoryBalcony') },
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('otherAreas', s.k)} onChange={() => toggleArr('otherAreas', s.k)} /> ))}

          <SH>{tl('wizard.relocation.additionalAreasTitle')}</SH>
          {[
            { k: 'parking', l: tl('wizard.relocation.additionalAreas.parking') },
            { k: 'stairs', l: tl('wizard.relocation.additionalAreas.stairs') },
            { k: 'corridor', l: tl('wizard.relocation.additionalAreas.corridor') },
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('additionalAreas', s.k)} onChange={() => toggleArr('additionalAreas', s.k)} /> ))}

          <ImageUpload />
        </div>
      );
    case 3:
      return (
        <div>
          <FI label={tl('wizard.relocation.preferredMoveDate')} value={v('preferredMoveDate')} onChange={v => set('preferredMoveDate', v)} type="datetime-local" />
          <FI label={tl('wizard.relocation.desiredDate')} value={v('desiredDate')} onChange={v => set('desiredDate', v)} type="date" required />
          <FS label={tl('wizard.relocation.flexibility')} value={v('flexibility')} onChange={v => set('flexibility', v)}
            options={[
              { value: 'exact', label: tl('wizard.relocation.flexibilities.exact') },
              { value: 'plusMinus1Day', label: tl('wizard.relocation.flexibilities.plusMinus1Day') },
              { value: 'plusMinus3Days', label: tl('wizard.relocation.flexibilities.plusMinus3Days') },
              { value: 'plusMinus1Week', label: tl('wizard.relocation.flexibilities.plusMinus1Week') }
            ]}
          />
          <FTA label={tl('wizard.relocation.notes')} value={v('notes')} onChange={v => set('notes', v)} />

          <SH>{tl('wizard.relocation.contact')}</SH>
          <FI label={tl('wizard.relocation.nameFirstName')} value={v('nameFirstName')} onChange={v => set('nameFirstName', v)} required />
          <FI label={tl('wizard.relocation.company')} value={v('company')} onChange={v => set('company', v)} />
          <FI label={tl('wizard.relocation.emailAddress')} value={v('emailAddress')} onChange={v => set('emailAddress', v)} type="email" required />
          <FI label={tl('wizard.relocation.telephoneNumber')} value={v('telephone')} onChange={v => set('telephone', v)} type="tel" required />
        </div>
      );
    default: return null;
  }
}

export function HouseholdHelpingForm({ step, d, set, tl, v, arrHas, toggleArr, ImageUpload }: FormStepProps) {
  switch (step) {
    case 0:
      return (
        <div>
          <SH>{tl('wizard.householdHelp.services')}</SH>
          {[
            { k: 'routineCleaning', l: tl('wizard.householdHelp.serviceItems.routineCleaning') },
            { k: 'ironing', l: tl('wizard.householdHelp.serviceItems.ironing') },
            { k: 'laundry', l: tl('wizard.householdHelp.serviceItems.laundry') },
            { k: 'shopping', l: tl('wizard.householdHelp.serviceItems.shopping') },
            { k: 'dishwashing', l: tl('wizard.householdHelp.serviceItems.dishwashing') },
            { k: 'cooking', l: tl('wizard.householdHelp.serviceItems.cooking') },
            { k: 'plantCare', l: tl('wizard.householdHelp.serviceItems.plantCare') },
            { k: 'smallTasks', l: tl('wizard.householdHelp.serviceItems.smallTasks') },
            { k: 'petCare', l: tl('wizard.householdHelp.serviceItems.petCare') },
            { k: 'seniorCare', l: tl('wizard.householdHelp.serviceItems.seniorCare') },
            { k: 'errands', l: tl('wizard.householdHelp.serviceItems.errands') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('desiredServices', s.k)} onChange={() => toggleArr('desiredServices', s.k)} /> ))}
          <FI label={tl('wizard.householdHelp.otherTasks')} value={v('otherTasks')} onChange={v => set('otherTasks', v)} />

          <SH>{tl('wizard.householdHelp.property')}</SH>
          <FI label={tl('wizard.householdHelp.address')} value={v('address')} onChange={v => set('address', v)} required />
          <FS label={tl('wizard.householdHelp.propertyType')} value={v('propertyType')} onChange={v => set('propertyType', v)}
            options={[
              { value: 'apartment', label: tl('wizard.householdHelp.types.apartment') },
              { value: 'house', label: tl('wizard.householdHelp.types.house') }
            ]}
          />
          <div className="grid grid-cols-2 gap-4">
             <FI label={tl('wizard.householdHelp.area')} value={v('area')} onChange={v => set('area', v)} type="number" required />
             <FI label={tl('wizard.householdHelp.rooms')} value={v('rooms')} onChange={v => set('rooms', v)} type="number" />
          </div>
        </div>
      );
    case 1:
      return (
        <div>
          <SH>{tl('wizard.householdHelp.frequency')}</SH>
          <FS label={tl('wizard.householdHelp.desiredFrequency')} value={v('desiredFrequency')} onChange={v => set('desiredFrequency', v)}
            options={[
              { value: 'weekly', label: tl('wizard.householdHelp.frequencies.weekly') },
              { value: 'biweekly', label: tl('wizard.householdHelp.frequencies.biweekly') },
              { value: 'monthly', label: tl('wizard.householdHelp.frequencies.monthly') },
              { value: 'onDemand', label: tl('wizard.householdHelp.frequencies.onDemand') }
            ]}
          />
          <FI label={tl('wizard.householdHelp.desiredHours')} value={v('desiredHours')} onChange={v => set('desiredHours', v)} type="number" />
          
          <SH>{tl('wizard.householdHelp.householdDetails')}</SH>
          <FS label={tl('wizard.householdHelp.persons')} value={v('persons')} onChange={v => set('persons', v)}
            options={[
              { value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' },
              { value: '4', label: '4' }, { value: '5+', label: '5+' }
            ]}
          />
          <FR label={tl('wizard.householdHelp.hasPets')} value={v('hasPets')} onChange={v => set('hasPets', v)}
            options={[{ value: 'yes', label: tl('wizard.householdHelp.yes') }, { value: 'no', label: tl('wizard.householdHelp.no') }]}
          />

          <SH>{tl('wizard.householdHelp.equipment')}</SH>
          <FS label={tl('wizard.householdHelp.equipment')} value={v('equipment')} onChange={v => set('equipment', v)}
            options={[
              { value: 'clientProvides', label: tl('wizard.householdHelp.equipments.clientProvides') },
              { value: 'agencyProvides', label: tl('wizard.householdHelp.equipments.agencyProvides') }
            ]}
          />
        </div>
      );
    case 2:
      return (
        <div>
          <SH>{tl('wizard.householdHelp.schedule')}</SH>
          <FI label={tl('wizard.householdHelp.wishDay')} value={v('wishDay')} onChange={v => set('wishDay', v)} type="date" />
          <FI label={tl('wizard.householdHelp.preferredTime')} value={v('preferredTime')} onChange={v => set('preferredTime', v)} type="time" />
          <FI label={tl('wizard.householdHelp.desiredStart')} value={v('desiredStart')} onChange={v => set('desiredStart', v)} type="date" required />
          <FTA label={tl('wizard.householdHelp.notes')} value={v('notes')} onChange={v => set('notes', v)} />

          <SH>{tl('wizard.householdHelp.contact')}</SH>
          <FI label={tl('wizard.householdHelp.nameContact')} value={v('nameFirstName')} onChange={v => set('nameFirstName', v)} required />
          <FI label={tl('wizard.householdHelp.email')} value={v('emailAddress')} onChange={v => set('emailAddress', v)} type="email" required />
          <FI label={tl('wizard.householdHelp.phone')} value={v('telephone')} onChange={v => set('telephone', v)} type="tel" required />
        </div>
      );
    default: return null;
  }
}

export function ComboServiceForm({ step, d, set, tl, v, arrHas, toggleArr, ImageUpload }: FormStepProps) {
  switch (step) {
    case 0:
      return (
        <div>
          <SH>{tl('wizard.comboService.movingFrom')}</SH>
          <FI label={tl('wizard.comboService.addressFrom')} value={v('addressFrom')} onChange={v => set('addressFrom', v)} required />
          <div className="grid grid-cols-2 gap-4">
            <FI label={tl('wizard.comboService.roomsFrom')} value={v('roomsFrom')} onChange={v => set('roomsFrom', v)} type="number" />
            <FI label={tl('wizard.comboService.floorFrom')} value={v('floorFrom')} onChange={v => set('floorFrom', v)} type="number" />
          </div>

          <SH>{tl('wizard.comboService.movingTo')}</SH>
          <FI label={tl('wizard.comboService.addressTo')} value={v('addressTo')} onChange={v => set('addressTo', v)} required />
          <div className="grid grid-cols-2 gap-4">
            <FI label={tl('wizard.comboService.floorTo')} value={v('floorTo')} onChange={v => set('floorTo', v)} type="number" />
          </div>

          <SH>{tl('wizard.comboService.cleaningDetails')}</SH>
           <FS label={tl('wizard.comboService.cleaningScope')} value={v('cleaningScope')} onChange={v => set('cleaningScope', v)}
            options={[
              { value: 'oldApartmentOnly', label: tl('wizard.comboService.scopes.oldApartmentOnly') },
              { value: 'newApartmentOnly', label: tl('wizard.comboService.scopes.newApartmentOnly') },
              { value: 'both', label: tl('wizard.comboService.scopes.both') }
            ]}
          />
          <FC label={tl('wizard.comboService.handoverGuarantee')} checked={arrHas('guarantees', 'handover')} onChange={() => toggleArr('guarantees', 'handover')} />
        </div>
      );
    case 1:
      return (
        <div>
          <SH>{tl('wizard.comboService.services')}</SH>
          {[
            { k: 'packing', l: tl('wizard.comboService.serviceItems.packing') },
            { k: 'dismantling', l: tl('wizard.comboService.serviceItems.dismantling') },
            { k: 'disposal', l: tl('wizard.comboService.serviceItems.disposal') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('services', s.k)} onChange={() => toggleArr('services', s.k)} /> ))}

          <SH>{tl('wizard.comboService.volume')}</SH>
          <FS label={tl('wizard.comboService.inventory')} value={v('inventory')} onChange={v => set('inventory', v)}
            options={[
              { value: 'small', label: tl('wizard.comboService.volumes.small') },
              { value: 'medium', label: tl('wizard.comboService.volumes.medium') },
              { value: 'large', label: tl('wizard.comboService.volumes.large') }
            ]}
          />
          <ImageUpload />
        </div>
      );
    case 2:
      return (
        <div>
          <SH>{tl('wizard.comboService.schedule')}</SH>
          <FI label={tl('wizard.comboService.desiredMoveDate')} value={v('desiredMoveDate')} onChange={v => set('desiredMoveDate', v)} type="date" required />
          <FI label={tl('wizard.comboService.desiredCleaningDate')} value={v('desiredCleaningDate')} onChange={v => set('desiredCleaningDate', v)} type="date" required />
          <FTA label={tl('wizard.comboService.notes')} value={v('notes')} onChange={v => set('notes', v)} />

          <SH>{tl('wizard.comboService.contact')}</SH>
          <FI label={tl('wizard.comboService.nameContact')} value={v('nameFirstName')} onChange={v => set('nameFirstName', v)} required />
          <FI label={tl('wizard.comboService.email')} value={v('emailAddress')} onChange={v => set('emailAddress', v)} type="email" required />
          <FI label={tl('wizard.comboService.phone')} value={v('telephone')} onChange={v => set('telephone', v)} type="tel" required />
        </div>
      );
    default: return null;
  }
}


