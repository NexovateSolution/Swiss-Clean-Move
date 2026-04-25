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
          {/* Support Type */}
          <SH>{tl('wizard.householdHelping.supportType')}</SH>
          <FR
            label=""
            value={v('supportType')}
            onChange={val => set('supportType', val)}
            options={[
              { value: 'householdHelp', label: tl('wizard.householdHelping.supportTypes.householdHelp') },
              { value: 'maintenanceCleaning', label: tl('wizard.householdHelping.supportTypes.maintenanceCleaning') },
              { value: 'combination', label: tl('wizard.householdHelping.supportTypes.combination') }
            ]}
          />

          {/* Cleaning frequency */}
          <SH>{tl('wizard.householdHelping.cleaningFrequency')}</SH>
          <FR
            label=""
            value={v('cleaningFrequency')}
            onChange={val => set('cleaningFrequency', val)}
            options={[
              { value: 'oneTime', label: tl('wizard.householdHelping.frequency.oneTime') },
              { value: 'weekly', label: tl('wizard.householdHelping.frequency.weekly') },
              { value: 'twoThreePerWeek', label: tl('wizard.householdHelping.frequency.twoThreePerWeek') },
              { value: 'everyTwoWeeks', label: tl('wizard.householdHelping.frequency.everyTwoWeeks') },
              { value: 'monthly', label: tl('wizard.householdHelping.frequency.monthly') },
              { value: 'custom', label: tl('wizard.householdHelping.frequency.custom') }
            ]}
          />

          {/* Preferred Start & Flexibility */}
          <SH>{tl('wizard.householdHelping.preferredStart')}</SH>
          <div className="grid grid-cols-2 gap-4">
            <FI label={tl('wizard.householdHelping.date')} value={v('preferredDate')} onChange={val => set('preferredDate', val)} type="date" required />
            <FI label={tl('wizard.householdHelping.time')} value={v('preferredTime')} onChange={val => set('preferredTime', val)} type="time" />
          </div>

          <FR
            label={tl('wizard.householdHelping.flexibility')}
            value={v('flexibility')}
            onChange={val => set('flexibility', val)}
            options={[
              { value: 'fixed', label: tl('wizard.householdHelping.flexibilityTypes.fixed') },
              { value: 'flexible', label: tl('wizard.householdHelping.flexibilityTypes.flexible') }
            ]}
          />
        </div>
      );
    case 1:
      return (
        <div>
          {/* Address */}
          <SH>{tl('wizard.householdHelping.address')}</SH>
          <div className="grid grid-cols-2 gap-4">
            <FI label={tl('wizard.householdHelping.zipCity')} value={v('zipCity')} onChange={val => set('zipCity', val)} required />
            <FI label={tl('wizard.householdHelping.streetNo')} value={v('streetNo')} onChange={val => set('streetNo', val)} required />
          </div>

          {/* Property Type */}
          <SH>{tl('wizard.householdHelping.propertyType')}</SH>
          <FR
            label=""
            value={v('propertyType')}
            onChange={val => set('propertyType', val)}
            options={[
              { value: 'apartment', label: tl('wizard.householdHelping.propertyTypes.apartment') },
              { value: 'house', label: tl('wizard.householdHelping.propertyTypes.house') },
              { value: 'sharedRoom', label: tl('wizard.householdHelping.propertyTypes.sharedRoom') }
            ]}
          />

          {/* Size */}
          <SH>{tl('wizard.householdHelping.size')}</SH>
          <div className="grid grid-cols-2 gap-4">
            <FI label={tl('wizard.householdHelping.numberOfRooms')} value={v('rooms')} onChange={val => set('rooms', val)} />
            <FI label={tl('wizard.householdHelping.areaM2')} value={v('area')} onChange={val => set('area', val)} type="number" />
          </div>

          {/* Floor & Elevator */}
          <SH>{tl('wizard.householdHelping.floor')}</SH>
          <FI label={tl('wizard.householdHelping.floor')} value={v('floor')} onChange={val => set('floor', val)} />
          
          <FR
            label={tl('wizard.householdHelping.elevatorAvailable')}
            value={v('elevator')}
            onChange={val => set('elevator', val)}
            options={[
              { value: 'yes', label: tl('wizard.householdHelping.yes') },
              { value: 'no', label: tl('wizard.householdHelping.no') }
            ]}
          />
        </div>
      );
    case 2:
      return (
        <div>
          {/* Standard Cleaning */}
          <SH>{tl('wizard.householdHelping.standardCleaning')}</SH>
          {[
            { k: 'vacuuming', l: tl('wizard.householdHelping.standardOptions.vacuuming') },
            { k: 'moppingFloors', l: tl('wizard.householdHelping.standardOptions.moppingFloors') },
            { k: 'dusting', l: tl('wizard.householdHelping.standardOptions.dusting') },
            { k: 'cleaningKitchen', l: tl('wizard.householdHelping.standardOptions.cleaningKitchen') },
            { k: 'cleaningBathroom', l: tl('wizard.householdHelping.standardOptions.cleaningBathroom') },
            { k: 'cleaningSurfaces', l: tl('wizard.householdHelping.standardOptions.cleaningSurfaces') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('standardCleaning', s.k)} onChange={() => toggleArr('standardCleaning', s.k)} /> ))}

          {/* Additional Services */}
          <SH>{tl('wizard.householdHelping.additionalServices')}</SH>
          {[
            { k: 'windowsInside', l: tl('wizard.householdHelping.additionalOptions.windowsInside') },
            { k: 'windowsOutside', l: tl('wizard.householdHelping.additionalOptions.windowsOutside') },
            { k: 'blindsShutters', l: tl('wizard.householdHelping.additionalOptions.blindsShutters') },
            { k: 'cleaningRefrigerator', l: tl('wizard.householdHelping.additionalOptions.cleaningRefrigerator') },
            { k: 'cleaningOven', l: tl('wizard.householdHelping.additionalOptions.cleaningOven') },
            { k: 'balconyTerrace', l: tl('wizard.householdHelping.additionalOptions.balconyTerrace') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('additionalServices', s.k)} onChange={() => toggleArr('additionalServices', s.k)} /> ))}

          {/* Household Help Optional */}
          <SH>{tl('wizard.householdHelping.householdHelpOptional')}</SH>
          {[
            { k: 'laundry', l: tl('wizard.householdHelping.householdHelpOptions.laundry') },
            { k: 'ironing', l: tl('wizard.householdHelping.householdHelpOptions.ironing') },
            { k: 'changingBedLinen', l: tl('wizard.householdHelping.householdHelpOptions.changingBedLinen') },
            { k: 'tidyingUp', l: tl('wizard.householdHelping.householdHelpOptions.tidyingUp') },
            { k: 'shopping', l: tl('wizard.householdHelping.householdHelpOptions.shopping') }
          ].map(s => ( <FC key={s.k} label={s.l} checked={arrHas('householdHelpServices', s.k)} onChange={() => toggleArr('householdHelpServices', s.k)} /> ))}
        </div>
      );
    case 3:
      return (
        <div>
          {/* Access Apartment */}
          <SH>{tl('wizard.householdHelping.accessApartment')}</SH>
          <FR
            label=""
            value={v('accessApartment')}
            onChange={val => set('accessApartment', val)}
            options={[
              { value: 'inPerson', label: tl('wizard.householdHelping.accessTypes.inPerson') },
              { value: 'keyAvailable', label: tl('wizard.householdHelping.accessTypes.keyAvailable') },
              { value: 'keyMailbox', label: tl('wizard.householdHelping.accessTypes.keyMailbox') },
              { value: 'other', label: tl('wizard.householdHelping.accessTypes.other') }
            ]}
          />
          {v('accessApartment') === 'other' && (
            <FI label={tl('wizard.householdHelping.otherSpecify')} value={v('accessOtherSpec')} onChange={val => set('accessOtherSpec', val)} />
          )}

          {/* Pets */}
          <SH>{tl('wizard.householdHelping.pets')}</SH>
          <FR
            label=""
            value={v('pets')}
            onChange={val => set('pets', val)}
            options={[
              { value: 'yes', label: tl('wizard.householdHelping.yes') },
              { value: 'no', label: tl('wizard.householdHelping.no') }
            ]}
          />

          {/* Special Notes */}
          <SH>{tl('wizard.householdHelping.specialNotes')}</SH>
          <div className="mb-6">
            <textarea
              className="w-full px-4 py-3 border-2 border-[#a8c8e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]/40 focus:border-[#003366] bg-white text-[#003366] transition-colors text-sm"
              rows={4}
              placeholder={tl('wizard.householdHelping.specialNotes')}
              value={v('specialNotes')}
              onChange={e => set('specialNotes', e.target.value)}
            />
          </div>
        </div>
      );
    case 4:
      return (
        <div>
          {/* Upload Photos */}
          <SH>{tl('wizard.householdHelping.uploadPhotos')}</SH>
          <p className="text-sm text-[#5a7a9a] mb-3">{tl('wizard.householdHelping.uploadHint')}</p>
          <ImageUpload />

          {/* Contact Details */}
          <SH>{tl('wizard.householdHelping.contactDetails')}</SH>
          <FI label={tl('wizard.householdHelping.name')} value={v('nameFirstName')} onChange={val => set('nameFirstName', val)} required />
          <FI label={tl('wizard.householdHelping.email')} value={v('emailAddress')} onChange={val => set('emailAddress', val)} type="email" required />
          <FI label={tl('wizard.householdHelping.phone')} value={v('telephone')} onChange={val => set('telephone', val)} type="tel" required />
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


