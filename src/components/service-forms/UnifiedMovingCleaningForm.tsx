import React, { useEffect } from 'react';
import { FormStepProps, FI, FS, FR, FC, FTA, SH, getFloorOptions, roomNumbers, livingSpaceOptions, peopleOptions } from '../FormControls';

export function UnifiedMovingCleaningForm({ step, d, set, tl, v, arrHas, toggleArr, ImageUpload, service }: FormStepProps) {
  // Initialize default requestType based on the URL context if it hasn't been set yet
  useEffect(() => {
    if (!v('requestType')) {
      if (service === 'relocation') set('requestType', 'moving');
      else if (service === 'combo-service') set('requestType', 'combo');
      else set('requestType', 'cleaning'); // Default to cleaning for 'final-cleaning'
    }
  }, [service, v, set]);

  const reqType = v('requestType') || 'cleaning';

  // Determine the dynamic step order
  // Mapping logic:
  // step 0 -> Service & Appt
  // step 1 -> Shared Property Details
  // Based on reqType:
  // - "moving": step 2=Moving, step 3=Upload, step 4=Contact
  // - "cleaning": step 2=Cleaning, step 3=Access, step 4=Upload, step 5=Contact
  // - "combo": step 2=Moving, step 3=Cleaning, step 4=Access, step 5=Upload, step 6=Contact

  let currentView = '';
  if (step === 0) currentView = 'serviceType';
  else if (step === 1) currentView = 'propertyDetails';
  else {
    if (reqType === 'moving') {
      if (step === 2) currentView = 'movingDetails';
      if (step === 3) currentView = 'upload';
      if (step === 4) currentView = 'contact';
    } 
    else if (reqType === 'cleaning') {
      if (step === 2) currentView = 'cleaningDetails';
      if (step === 3) currentView = 'access';
      if (step === 4) currentView = 'upload';
      if (step === 5) currentView = 'contact';
    }
    else if (reqType === 'combo') {
      if (step === 2) currentView = 'movingDetails';
      if (step === 3) currentView = 'cleaningDetails';
      if (step === 4) currentView = 'access';
      if (step === 5) currentView = 'upload';
      if (step === 6) currentView = 'contact';
    }
  }

  switch (currentView) {
    case 'serviceType':
      return (
        <div className="animate-in fade-in duration-300">
          <SH>{tl('wizard.unified.step1.title')}</SH>
          <FR
            label={tl('wizard.unified.step1.requestType')}
            value={reqType}
            onChange={val => set('requestType', val)}
            options={[
              { value: 'moving', label: tl('wizard.unified.step1.options.moving') },
              { value: 'cleaning', label: tl('wizard.unified.step1.options.cleaning') },
              { value: 'combo', label: tl('wizard.unified.step1.options.combo') }
            ]}
          />
          <SH>{tl('wizard.unified.step1.preferredDateTitle')}</SH>
          <div className="grid grid-cols-2 gap-4">
             <FI label={tl('wizard.unified.step1.date')} value={v('preferredDate')} onChange={val => set('preferredDate', val)} type="date" required />
             <FI label={tl('wizard.unified.step1.time')} value={v('preferredTime')} onChange={val => set('preferredTime', val)} type="time" />
          </div>
          <div className="mt-4">
            <FC label={tl('wizard.unified.step1.flexible')} checked={v('isFlexible') === 'true'} onChange={() => set('isFlexible', v('isFlexible') === 'true' ? 'false' : 'true')} />
            <FC label={tl('wizard.unified.step1.express')} checked={v('isExpress') === 'true'} onChange={() => set('isExpress', v('isExpress') === 'true' ? 'false' : 'true')} />
          </div>
        </div>
      );

    case 'propertyDetails':
      return (
        <div>
          <SH>{tl('wizard.stepTitles.property') || 'Property Details'}</SH>
          <div className="grid grid-cols-2 gap-4">
            <FS label={tl('wizard.unified.step2.propertyType')} value={v('sharedPropertyType')} onChange={val => set('sharedPropertyType', val)}
              options={[
                { value: 'apartment', label: tl('wizard.unified.step2.types.apartment') },
                { value: 'house', label: tl('wizard.unified.step2.types.house') },
                { value: 'studio', label: tl('wizard.unified.step2.types.studio') },
                { value: 'wgRoom', label: tl('wizard.unified.step2.types.wgRoom') },
                { value: 'office', label: tl('wizard.unified.step2.types.office') },
                { value: 'commercial', label: tl('wizard.unified.step2.types.commercial') }
              ]}
            />
            <FI label={tl('wizard.unified.step2.rooms')} value={v('sharedRooms')} onChange={val => set('sharedRooms', val)} type="number" required />
            <FI label={tl('wizard.unified.step2.livingArea')} value={v('sharedLivingArea')} onChange={val => set('sharedLivingArea', val)} type="number" />
            <FS label={tl('wizard.unified.step2.floor')} value={v('sharedFloor')} onChange={val => set('sharedFloor', val)}
              options={[
                 { value: 'ground', label: tl('wizard.unified.step2.floors.ground') },
                 { value: 'f1_2', label: tl('wizard.unified.step2.floors.f1_2') },
                 { value: 'f3_4', label: tl('wizard.unified.step2.floors.f3_4') },
                 { value: 'f5_6', label: tl('wizard.unified.step2.floors.f5_6') },
                 { value: 'f7plus', label: tl('wizard.unified.step2.floors.f7plus') }
              ]}
            />
          </div>
          <div className="mt-4 border-t border-gray-200 pt-4">
             <FR label={tl('wizard.unified.step2.elevator')} value={v('sharedElevator')} onChange={val => set('sharedElevator', val)}
               options={[
                 { value: 'yes', label: tl('wizard.unified.step2.yes') },
                 { value: 'no', label: tl('wizard.unified.step2.no') }
               ]}
             />
          </div>
          <div className="mt-4 border-t border-gray-200 pt-4">
             <SH>{tl('wizard.unified.step2.parkingTitle')}</SH>
             <FR label={tl('wizard.unified.step2.available')} value={v('sharedParking')} onChange={val => set('sharedParking', val)}
               options={[
                 { value: 'yes', label: tl('wizard.unified.step2.yes') },
                 { value: 'no', label: tl('wizard.unified.step2.no') }
               ]}
             />
             {v('sharedParking') === 'yes' && (
                <FS label={tl('wizard.unified.step2.distance')} value={v('sharedParkingDistance')} onChange={val => set('sharedParkingDistance', val)}
                  options={[
                    { value: 'direct', label: tl('wizard.unified.step2.distances.direct') },
                    { value: 'd0_20', label: tl('wizard.unified.step2.distances.d0_20') },
                    { value: 'd20_50', label: tl('wizard.unified.step2.distances.d20_50') },
                    { value: 'd50plus', label: tl('wizard.unified.step2.distances.d50plus') }
                  ]}
                />
             )}
          </div>
        </div>
      );

    case 'movingDetails':
      return (
        <div>
          <SH>{tl('wizard.unified.moving.fromTitle')}</SH>
          <FI label={tl('wizard.unified.moving.streetNo')} value={v('moveFromStreet')} onChange={val => set('moveFromStreet', val)} />
          <FI label={tl('wizard.unified.moving.zipCity')} value={v('moveFromZipCity')} onChange={val => set('moveFromZipCity', val)} required />
          <div className="mt-2 text-sm font-semibold text-[#003366]">{tl('wizard.unified.moving.accessParkingTitle')} (FROM)</div>
          <div className="grid grid-cols-2 gap-2 mt-2">
             <FC label={tl('wizard.unified.step2.distances.direct')} checked={arrHas('moveFromAccess', 'direct')} onChange={() => toggleArr('moveFromAccess', 'direct')} />
             <FC label={tl('wizard.unified.step2.distances.d0_20')} checked={arrHas('moveFromAccess', 'd0_20')} onChange={() => toggleArr('moveFromAccess', 'd0_20')} />
             <FC label={tl('wizard.unified.step2.distances.d20_50')} checked={arrHas('moveFromAccess', 'd20_50')} onChange={() => toggleArr('moveFromAccess', 'd20_50')} />
             <FC label={tl('wizard.unified.step2.distances.d50plus')} checked={arrHas('moveFromAccess', 'd50plus')} onChange={() => toggleArr('moveFromAccess', 'd50plus')} />
          </div>
          <div className="mt-2 text-sm font-semibold text-[#003366]">{tl('wizard.unified.moving.specialConditions')}</div>
          <div className="grid grid-cols-2 gap-2 mt-2 border-b border-gray-200 pb-4">
             <FC label={tl('wizard.unified.moving.conditions.narrowStairs')} checked={arrHas('moveFromConditions', 'narrowStairs')} onChange={() => toggleArr('moveFromConditions', 'narrowStairs')} />
             <FC label={tl('wizard.unified.moving.conditions.noElevator')} checked={arrHas('moveFromConditions', 'noElevator')} onChange={() => toggleArr('moveFromConditions', 'noElevator')} />
             <FC label={tl('wizard.unified.moving.conditions.longDistances')} checked={arrHas('moveFromConditions', 'longDistances')} onChange={() => toggleArr('moveFromConditions', 'longDistances')} />
             <FC label={tl('wizard.unified.moving.conditions.limitedAccess')} checked={arrHas('moveFromConditions', 'limitedAccess')} onChange={() => toggleArr('moveFromConditions', 'limitedAccess')} />
          </div>

          <div className="mt-6"><SH>{tl('wizard.unified.moving.toTitle')}</SH></div>
          <FI label={tl('wizard.unified.moving.streetNo')} value={v('moveToStreet')} onChange={val => set('moveToStreet', val)} />
          <FI label={tl('wizard.unified.moving.zipCity')} value={v('moveToZipCity')} onChange={val => set('moveToZipCity', val)} required />
          <div className="mt-2 text-sm font-semibold text-[#003366]">{tl('wizard.unified.moving.accessParkingTitle')} (TO)</div>
          <div className="grid grid-cols-2 gap-2 mt-2">
             <FC label={tl('wizard.unified.step2.distances.direct')} checked={arrHas('moveToAccess', 'direct')} onChange={() => toggleArr('moveToAccess', 'direct')} />
             <FC label={tl('wizard.unified.step2.distances.d0_20')} checked={arrHas('moveToAccess', 'd0_20')} onChange={() => toggleArr('moveToAccess', 'd0_20')} />
             <FC label={tl('wizard.unified.step2.distances.d20_50')} checked={arrHas('moveToAccess', 'd20_50')} onChange={() => toggleArr('moveToAccess', 'd20_50')} />
             <FC label={tl('wizard.unified.step2.distances.d50plus')} checked={arrHas('moveToAccess', 'd50plus')} onChange={() => toggleArr('moveToAccess', 'd50plus')} />
          </div>
          <div className="mt-2 text-sm font-semibold text-[#003366]">{tl('wizard.unified.moving.specialConditions')}</div>
          <div className="grid grid-cols-2 gap-2 mt-2 border-b border-gray-200 pb-4">
             <FC label={tl('wizard.unified.moving.conditions.narrowStairs')} checked={arrHas('moveToConditions', 'narrowStairs')} onChange={() => toggleArr('moveToConditions', 'narrowStairs')} />
             <FC label={tl('wizard.unified.moving.conditions.noElevator')} checked={arrHas('moveToConditions', 'noElevator')} onChange={() => toggleArr('moveToConditions', 'noElevator')} />
             <FC label={tl('wizard.unified.moving.conditions.longDistances')} checked={arrHas('moveToConditions', 'longDistances')} onChange={() => toggleArr('moveToConditions', 'longDistances')} />
             <FC label={tl('wizard.unified.moving.conditions.limitedAccess')} checked={arrHas('moveToConditions', 'limitedAccess')} onChange={() => toggleArr('moveToConditions', 'limitedAccess')} />
          </div>

          <div className="mt-6"><SH>{tl('wizard.unified.moving.volumeTitle')}</SH></div>
          <FR label={''} value={v('moveVolume')} onChange={val => set('moveVolume', val)}
            options={[
              { value: 'small', label: tl('wizard.unified.moving.volumes.small') },
              { value: 'medium', label: tl('wizard.unified.moving.volumes.medium') },
              { value: 'large', label: tl('wizard.unified.moving.volumes.large') }
            ]}
          />

          <SH>{tl('wizard.unified.moving.inventoryTitle')}</SH>
          <FS label={tl('wizard.unified.moving.boxesTitle')} value={v('moveBoxes')} onChange={val => set('moveBoxes', val)}
             options={[
               { value: 'b0_20', label: tl('wizard.unified.moving.boxes.b0_20') },
               { value: 'b20_50', label: tl('wizard.unified.moving.boxes.b20_50') },
               { value: 'b50_100', label: tl('wizard.unified.moving.boxes.b50_100') },
               { value: 'b100plus', label: tl('wizard.unified.moving.boxes.b100plus') }
             ]}
          />
          <div className="mt-2 text-sm font-semibold text-[#003366]">{tl('wizard.unified.moving.furnitureTitle')}</div>
          <div className="grid grid-cols-2 gap-2">
             {['sofa','bed','wardrobe','tableChairs','tv','washingMachine','refrigerator'].map(k => (
                <FC key={k} label={tl(`wizard.unified.moving.furniture.${k}`)} checked={arrHas('moveFurniture', k)} onChange={() => toggleArr('moveFurniture', k)} />
             ))}
          </div>

          <SH>{tl('wizard.unified.moving.specialItemsTitle')}</SH>
          <div className="grid grid-cols-2 gap-2">
             {['piano','safe','aquarium','fitness','fragile'].map(k => (
                <FC key={k} label={tl(`wizard.unified.moving.specialItems.${k}`)} checked={arrHas('moveSpecialItems', k)} onChange={() => toggleArr('moveSpecialItems', k)} />
             ))}
          </div>

          <SH>{tl('wizard.unified.moving.servicesTitle')}</SH>
          <div className="grid grid-cols-2 gap-2">
             {['assembly','packingService','packingMaterials','disposal','storage','cleaningRequested'].map(k => (
                <FC key={k} label={tl(`wizard.unified.moving.services.${k}`)} checked={arrHas('moveServices', k)} onChange={() => toggleArr('moveServices', k)} />
             ))}
          </div>

        </div>
      );

    case 'cleaningDetails':
      return (
        <div>
          <SH>{tl('wizard.unified.cleaning.title')}</SH>
          <FI label={tl('wizard.unified.moving.streetNo')} value={v('cleanStreet')} onChange={val => set('cleanStreet', val)} />
          <FI label={tl('wizard.unified.moving.zipCity')} value={v('cleanZipCity')} onChange={val => set('cleanZipCity', val)} required />

          <SH>{tl('wizard.unified.cleaning.sanitaryTitle')}</SH>
          <div className="grid grid-cols-2 gap-4">
             <FI label={tl('wizard.unified.cleaning.bathrooms')} value={v('cleanBathrooms')} onChange={val => set('cleanBathrooms', val)} type="number" />
             <FI label={tl('wizard.unified.cleaning.toilets')} value={v('cleanToilets')} onChange={val => set('cleanToilets', val)} type="number" />
          </div>

          <SH>{tl('wizard.unified.cleaning.kitchenTitle')}</SH>
          <FR label={tl('wizard.unified.cleaning.available')} value={v('cleanKitchen')} onChange={val => set('cleanKitchen', val)}
             options={[
               { value: 'yes', label: tl('wizard.unified.step2.yes') },
               { value: 'no', label: tl('wizard.unified.step2.no') }
             ]}
          />
          {v('cleanKitchen') === 'yes' && (
             <FR label={''} value={v('cleanKitchenState')} onChange={val => set('cleanKitchenState', val)}
               options={[
                 { value: 'normal', label: tl('wizard.unified.cleaning.kitchenState.normal') },
                 { value: 'heavilySoiled', label: tl('wizard.unified.cleaning.kitchenState.heavilySoiled') }
               ]}
             />
          )}

          <SH>{tl('wizard.unified.cleaning.windowsTitle')}</SH>
          <div className="grid grid-cols-2 gap-4">
             <FI label={tl('wizard.unified.cleaning.windowsCount')} value={v('cleanWindowsCount')} onChange={val => set('cleanWindowsCount', val)} type="number" />
             <FS label={tl('wizard.unified.cleaning.balconyDoorsTitle')} value={v('cleanBalconyDoors')} onChange={val => set('cleanBalconyDoors', val)}
                options={[
                   { value: 'd0', label: tl('wizard.unified.cleaning.balconyDoors.d0') },
                   { value: 'd1_2', label: tl('wizard.unified.cleaning.balconyDoors.d1_2') },
                   { value: 'd3_5', label: tl('wizard.unified.cleaning.balconyDoors.d3_5') },
                   { value: 'd5plus', label: tl('wizard.unified.cleaning.balconyDoors.d5plus') }
                ]}
             />
          </div>
          <div className="mt-2 text-sm font-semibold text-[#003366]">{tl('wizard.unified.cleaning.windowTypes')}</div>
          <div className="grid grid-cols-2 gap-2 mt-2">
             <FC label={tl('wizard.unified.cleaning.types.standard')} checked={arrHas('cleanWindowTypes', 'standard')} onChange={() => toggleArr('cleanWindowTypes', 'standard')} />
             <FC label={tl('wizard.unified.cleaning.types.floorToCeiling')} checked={arrHas('cleanWindowTypes', 'floorToCeiling')} onChange={() => toggleArr('cleanWindowTypes', 'floorToCeiling')} />
             <FC label={tl('wizard.unified.cleaning.types.roof')} checked={arrHas('cleanWindowTypes', 'roof')} onChange={() => toggleArr('cleanWindowTypes', 'roof')} />
          </div>
          <div className="mt-4 text-sm font-semibold text-[#003366]">{tl('wizard.unified.cleaning.specialGlass')}</div>
          <div className="grid grid-cols-2 gap-2 mt-2">
             <FC label={tl('wizard.unified.cleaning.specialGlassTypes.sliding')} checked={arrHas('cleanSpecialGlass', 'sliding')} onChange={() => toggleArr('cleanSpecialGlass', 'sliding')} />
             <FC label={tl('wizard.unified.cleaning.specialGlassTypes.glassFront')} checked={arrHas('cleanSpecialGlass', 'glassFront')} onChange={() => toggleArr('cleanSpecialGlass', 'glassFront')} />
             <FC label={tl('wizard.unified.cleaning.specialGlassTypes.winterGarden')} checked={arrHas('cleanSpecialGlass', 'winterGarden')} onChange={() => toggleArr('cleanSpecialGlass', 'winterGarden')} />
          </div>

          <SH>{tl('wizard.unified.cleaning.conditionTitle')}</SH>
          <div className="grid grid-cols-2 gap-2 mt-2">
             {['normal','heavilySoiled','nicotine','afterRenovation'].map(k => (
                <FC key={k} label={tl(`wizard.unified.cleaning.conditions.${k}`)} checked={arrHas('cleanCondition', k)} onChange={() => toggleArr('cleanCondition', k)} />
             ))}
          </div>

          <SH>{tl('wizard.unified.cleaning.petsTitle')}</SH>
          <FR label={''} value={v('cleanPets')} onChange={val => set('cleanPets', val)}
             options={[
               { value: 'no', label: tl('wizard.unified.step2.no') },
               { value: 'yes', label: tl('wizard.unified.step2.yes') }
             ]}
          />

          <SH>{tl('wizard.unified.cleaning.additionalAreasTitle')}</SH>
          <div className="grid grid-cols-2 gap-2 mt-2">
             {['balcony','basement','garage','attic'].map(k => (
                <FC key={k} label={tl(`wizard.unified.cleaning.areas.${k}`)} checked={arrHas('cleanAreas', k)} onChange={() => toggleArr('cleanAreas', k)} />
             ))}
          </div>

        </div>
      );

    case 'access':
      return (
        <div>
          <SH>{tl('wizard.unified.access.keyTitle')}</SH>
          <FS label={''} value={v('accessKey')} onChange={val => set('accessKey', val)}
             options={[
                { value: 'personal', label: tl('wizard.unified.access.keys.personal') },
                { value: 'mailbox', label: tl('wizard.unified.access.keys.mailbox') },
                { value: 'keySafe', label: tl('wizard.unified.access.keys.keySafe') },
                { value: 'caretaker', label: tl('wizard.unified.access.keys.caretaker') },
                { value: 'undecided', label: tl('wizard.unified.access.keys.undecided') }
             ]}
          />
          
          <SH>{tl('wizard.unified.access.independentAccess')}</SH>
          <FR label={''} value={v('accessIndependent')} onChange={val => set('accessIndependent', val)}
             options={[
                { value: 'yes', label: tl('wizard.unified.access.independent.yes') },
                { value: 'no', label: tl('wizard.unified.access.independent.no') },
                { value: 'undecided', label: tl('wizard.unified.access.independent.undecided') }
             ]}
          />

          <SH>{tl('wizard.unified.access.handoverTitle')}</SH>
          <FI label={tl('wizard.unified.access.handoverDate')} value={v('accessHandoverDate')} onChange={val => set('accessHandoverDate', val)} type="date" required />
          <div className="mt-4">
             <FC label={tl('wizard.unified.access.options.inspection')} checked={arrHas('accessOptions', 'inspection')} onChange={() => toggleArr('accessOptions', 'inspection')} />
             <FC label={tl('wizard.unified.access.options.guarantee')} checked={arrHas('accessOptions', 'guarantee')} onChange={() => toggleArr('accessOptions', 'guarantee')} />
          </div>
        </div>
      );

    case 'upload':
      return (
        <div>
          <ImageUpload />
        </div>
      );

    case 'contact':
      return (
        <div>
          <SH>{tl('wizard.unified.contact.detailsTitle')}</SH>
          <FI label={tl('wizard.unified.contact.nameCompany')} value={v('nameFirstName')} onChange={val => set('nameFirstName', val)} required />
          <FI label={tl('wizard.unified.contact.phone')} value={v('telephone')} onChange={val => set('telephone', val)} required type="tel" />
          <FI label={tl('wizard.unified.contact.email')} value={v('emailAddress')} onChange={val => set('emailAddress', val)} required type="email" />

          <SH>{tl('wizard.unified.contact.methodTitle')}</SH>
          <div className="grid grid-cols-2 gap-2 mt-2 border-b border-gray-200 pb-4">
             <FC label={tl('wizard.unified.contact.methods.phone')} checked={arrHas('contactMethods', 'phone')} onChange={() => toggleArr('contactMethods', 'phone')} />
             <FC label={tl('wizard.unified.contact.methods.whatsapp')} checked={arrHas('contactMethods', 'whatsapp')} onChange={() => toggleArr('contactMethods', 'whatsapp')} />
             <FC label={tl('wizard.unified.contact.methods.email')} checked={arrHas('contactMethods', 'email')} onChange={() => toggleArr('contactMethods', 'email')} />
          </div>

          <div className="mt-6">
            <FTA label={tl('wizard.unified.contact.notes')} value={v('furtherRequests')} onChange={val => set('furtherRequests', val)} />
          </div>

          <SH>{tl('wizard.unified.contact.privacy')}</SH>
          <FC label={tl('wizard.unified.contact.acceptPrivacy')} checked={v('acceptPrivacy') === 'true'} onChange={() => set('acceptPrivacy', v('acceptPrivacy') === 'true' ? 'false' : 'true')} />
          {v('acceptPrivacy') !== 'true' && (
            <p className="text-red-500 text-xs mt-1">Please accept the data protection policy to proceed.</p>
          )}
        </div>
      );

    default:
      return null;
  }
}
