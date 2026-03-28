'use client'

import { useMemo, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import toast from 'react-hot-toast'
import { Upload, X } from 'lucide-react'

export type ServiceSlug =
  | 'house-cleaning' | 'apartment-cleaning' | 'stairwell-cleaning'
  | 'office-cleaning' | 'final-cleaning' | 'window-cleaning'
  | 'relocation' | 'disposal' | 'gastronomy-cleaning'
  | 'medical-cleaning' | 'construction-cleaning' | 'property-maintenance'
  | 'special-cleaning' | 'combo-service' | 'household-helping'

type FormCategory = 'cleaning' | 'relocation' | 'disposal' | 'household-helping' | 'other'

function getFormCategory(s: ServiceSlug): FormCategory {
  if (s === 'relocation' || s === 'combo-service') return 'relocation'
  if (s === 'disposal') return 'disposal'
  if (s === 'household-helping') return 'household-helping'
  if (['house-cleaning', 'apartment-cleaning', 'stairwell-cleaning', 'office-cleaning', 'final-cleaning', 'window-cleaning'].includes(s)) return 'cleaning'
  return 'other'
}

function getStepCount(s: ServiceSlug): number {
  const cat = getFormCategory(s)
  if (cat === 'cleaning') return 5
  if (cat === 'relocation') return 5
  if (cat === 'disposal') return 4
  if (cat === 'household-helping') return 3
  return 3
}

/* ΓöÇΓöÇΓöÇ Stable field components ΓöÇΓöÇΓöÇ */
const ic = 'w-full px-4 py-3 border-2 border-[#a8c8e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]/40 focus:border-[#003366] bg-white text-[#003366] transition-colors text-sm'

function FI({ label, value, onChange, required, type = 'text', placeholder, hint, min, max, step }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string; placeholder?: string; hint?: string; min?: string; max?: string; step?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-[#003366] mb-2">{label}</label>
      <input type={type} min={min} max={max} step={step} value={value} onChange={e => onChange(e.target.value)} className={ic} placeholder={placeholder} />
      {hint && <p className="text-xs text-[#5a7a9a] mt-1">{hint}</p>}
    </div>
  )
}

function FS({ label, value, onChange, options, placeholder, hint }: {
  label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string; hint?: string
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-[#003366] mb-2">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} className={ic}>
        <option value="">{placeholder || '---'}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {hint && <p className="text-xs text-[#5a7a9a] mt-1 flex items-center gap-1">
        <span className="text-[#cc0000]">Γôÿ</span> {hint}
      </p>}
    </div>
  )
}

function FR({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-[#003366] mb-2">{label}</label>
      <div className="space-y-2">
        {options.map(o => (
          <label key={o.value} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio" name={label} value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="w-4 h-4 text-[#003366] border-[#a8c8e8] focus:ring-[#003366]"
            />
            <span className="text-sm text-[#003366]">{o.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function FC({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 py-1.5 cursor-pointer group">
      <input
        type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-[#a8c8e8] text-[#003366] focus:ring-[#003366]"
      />
      <span className="text-sm text-[#003366] group-hover:text-[#001a33]">{label}</span>
    </label>
  )
}

function FTA({ label, value, onChange, placeholder, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-[#003366] mb-2">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className={ic} placeholder={placeholder} />
    </div>
  )
}

function SH({ children }: { children: string }) {
  return <h3 className="text-base font-bold text-[#003366] mb-4">{children}</h3>
}

const getFloorOptions = (t: any) => [
  { value: 'ground', label: t('wizard.common.floorOptions.ground') },
  { value: '1', label: t('wizard.common.floorOptions.1') },
  { value: '2', label: t('wizard.common.floorOptions.2') },
  { value: '3', label: t('wizard.common.floorOptions.3') },
  { value: '4', label: t('wizard.common.floorOptions.4') },
  { value: '5', label: t('wizard.common.floorOptions.5') },
  { value: '6+', label: t('wizard.common.floorOptions.6plus') }
]

const roomNumbers = [
  { value: '1', label: '1' }, { value: '1.5', label: '1.5' }, { value: '2', label: '2' },
  { value: '2.5', label: '2.5' }, { value: '3', label: '3' }, { value: '3.5', label: '3.5' },
  { value: '4', label: '4' }, { value: '4.5', label: '4.5' }, { value: '5', label: '5' },
  { value: '5.5', label: '5.5' }, { value: '6', label: '6' }, { value: '6.5', label: '6.5' },
  { value: '7', label: '7' }, { value: '7+', label: '7+' }
]

const livingSpaceOptions = [
  { value: '<40', label: '< 40 m┬▓' }, { value: '40-60', label: '40 - 60 m┬▓' },
  { value: '60-80', label: '60 - 80 m┬▓' }, { value: '80-100', label: '80 - 100 m┬▓' },
  { value: '100-120', label: '100 - 120 m┬▓' }, { value: '120-150', label: '120 - 150 m┬▓' },
  { value: '150-200', label: '150 - 200 m┬▓' }, { value: '>200', label: '> 200 m┬▓' }
]

const peopleOptions = [
  { value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' },
  { value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6+', label: '6+' }
]

const boxOptions = [
  { value: '0-10', label: '0 - 10' }, { value: '10-20', label: '10 - 20' },
  { value: '20-30', label: '20 - 30' }, { value: '30-40', label: '30 - 40' },
  { value: '40-50', label: '40 - 50' }, { value: '50+', label: '50+' }
]

/* ΓòÉΓòÉΓòÉ COMPONENT ΓòÉΓòÉΓòÉ */
export default function ServiceFormWizard({ service, serviceName, locale }: { service: ServiceSlug; serviceName: string; locale: string }) {
  const t = useTranslations('serviceForm')
  const router = useRouter()
  const category = useMemo(() => getFormCategory(service), [service])
  const totalSteps = useMemo(() => getStepCount(service), [service])
  const [step, setStep] = useState(0)
  const [busy, setBusy] = useState(false)
  const [d, setD] = useState<Record<string, any>>({
    specialFeatures: [], cleaningAreas: [], wasteItems: [], otherAreas: [],
    additionalAreas: [], movingSupplies: [], additionalOptions: [], desiredServices: [],
    blinds: [], windowSpecialFeatures: []
  })
  const [images, setImages] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isFirst = step === 0
  const isLast = step === totalSteps - 1
  const needsFrequency = ['office-cleaning', 'gastronomy-cleaning', 'medical-cleaning', 'property-maintenance'].includes(service)

  const set = (k: string, v: any) => setD(p => ({ ...p, [k]: v }))
  const v = (k: string) => (d[k] as string) ?? ''
  const b = (k: string) => !!d[k]
  const toggleArr = (key: string, val: string) => {
    const a = (d[key] as string[] | undefined) ?? []
    const s = new Set(a); if (s.has(val)) s.delete(val); else s.add(val)
    set(key, Array.from(s))
  }
  const arrHas = (key: string, val: string) => ((d[key] as string[]) ?? []).includes(val)

  // Use translated labels - with fallback pattern
  const tl = (key: string) => { try { return t(key) } catch { return key } }

  const validate = (): boolean => {
    const fail = () => { toast.error(tl('wizard.validation.required')); return false }

    if (category === 'cleaning') {
      if (step === 0) return !!d.objectType ? true : fail()
      if (step === 4) return (!!d.nameFirstName && !!d.emailAddress && !!d.telephone && !!d.zipCity && !!d.streetNo) ? true : fail()
    } else if (category === 'relocation') {
      if (step === 0) return (!!d.movingFromAddress && !!d.currentLiving && !!d.currentFloor) ? true : fail()
      if (step === 1) return (!!d.movingToType && !!d.movingToAddress) ? true : fail()
      if (step === 4) return (!!d.nameFirstName && !!d.emailAddress && !!d.telephone && !!d.zipCity && !!d.streetNo) ? true : fail()
    } else if (category === 'disposal') {
      if (step === 0) return (!!d.disposalType && !!d.objectType && !!d.location) ? true : fail()
      if (step === 3) return (!!d.nameFirstName && !!d.emailAddress && !!d.telephone && !!d.zipCity && !!d.streetNo) ? true : fail()
    } else if (category === 'household-helping') {
      if (step === 0) return (!!d.floors && !!d.livingArea) ? true : fail()
      if (step === 1) return (!!d.desiredFrequency && !!d.desiredHours) ? true : fail()
      if (step === 2) return (!!d.nameFirstName && !!d.emailAddress && !!d.telephone && !!d.zipCity && !!d.streetNo) ? true : fail()
    } else {
      // other services: simplified validation
      if (isLast) return (!!d.nameFirstName && !!d.emailAddress && !!d.telephone && !!d.zipCity && !!d.streetNo) ? true : fail()
    }
    return true
  }

  const goNext = () => { if (validate()) setStep(i => Math.min(i + 1, totalSteps - 1)) }
  const goBack = () => setStep(i => Math.max(i - 1, 0))
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(prev => [...prev, ...Array.from(e.target.files!)])
    }
  }
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const ImageUpload = () => (
    <div className="mt-6 border-t-2 border-[#a8c8e8] pt-6">
      <h3 className="text-[#003366] font-semibold mb-2">{tl('upload.title') || 'Upload Pictures (Optional)'}</h3>
      <p className="text-sm text-[#5a7a9a] mb-4">{tl('upload.description') || 'Attach photos of your property to help us provide a more accurate quote.'}</p>

      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-[#003366] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-white/50 transition-colors"
      >
        <Upload className="w-8 h-8 text-[#003366] mb-2" />
        <span className="text-sm font-medium text-[#003366]">{tl('upload.button') || 'Click to select images'}</span>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*"
          className="hidden"
        />
      </div>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative group">
              <div className="w-full h-20 bg-white rounded-lg border border-[#a8c8e8] flex items-center justify-center overflow-hidden">
                <span className="text-xs text-center px-2 truncate block w-full text-gray-600">{img.name}</span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const submit = async () => {
    if (!validate()) return
    setBusy(true)
    try {
      const formType = category === 'other' ? 'cleaning' : category
      const payload = {
        serviceName, formType,
        firstName: d.nameFirstName?.split(' ').slice(1).join(' ') || d.nameFirstName || '',
        name: d.nameFirstName?.split(' ')[0] || '',
        emailAddress: d.emailAddress || '',
        telephone: d.telephone || '',
        streetAndNumber: d.streetNo || '',
        postalCodeAndCity: d.zipCity || '',
        salutation: d.salutation || 'Other',
        remark: d.furtherRequests || d.furtherWishes || d.otherTasks || '',
        ...d
      }

      const formData = new FormData()
      formData.append('data', JSON.stringify(payload))
      images.forEach((file) => {
        formData.append('images', file)
      })

      const res = await fetch('/api/service-forms', {
        method: 'POST',
        body: formData
      })
      if (!res.ok) throw new Error('fail')
      toast.success(tl('toasts.submitted'))
      router.push(`/${locale}`)
    } catch { toast.error(tl('toasts.submitFailedRetry')) } finally { setBusy(false) }
  }

  /* ΓöÇΓöÇΓöÇ STEP RENDERERS ΓöÇΓöÇΓöÇ */
  const renderCleaningStep = () => {
    switch (step) {
      case 0: // Service & Object Type
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
            <FS
              label={tl('wizard.cleaning.objectType')}
              value={v('objectType')}
              onChange={v => set('objectType', v)}
              options={[
                { value: 'apartment', label: tl('wizard.cleaning.objectTypes.apartment') },
                { value: 'house', label: tl('wizard.cleaning.objectTypes.house') },
                { value: 'wg-room', label: tl('wizard.cleaning.objectTypes.wgRoom') },
                { value: 'office', label: tl('wizard.cleaning.objectTypes.office') },
                { value: 'storage-cellar', label: tl('wizard.cleaning.objectTypes.storageCellar') }
              ]}
            />
            {needsFrequency && (
              <FS
                label={tl('wizard.frequency.label') || 'Desired deployment frequency *'}
                value={v('deploymentFrequency')}
                onChange={v => set('deploymentFrequency', v)}
                options={[
                  { value: 'Unique', label: tl('wizard.frequency.options.unique') || 'Unique' },
                  { value: 'Every other week', label: tl('wizard.frequency.options.everyOtherWeek') || 'Every other week' },
                  { value: 'Weekly', label: tl('wizard.frequency.options.weekly') || 'Weekly' },
                  { value: 'Several times a week', label: tl('wizard.frequency.options.severalTimesWeek') || 'Several times a week' },
                  { value: 'Daily', label: tl('wizard.frequency.options.daily') || 'Daily' }
                ]}
              />
            )}
          </div>
        )
      case 1: // Floors, Rooms, Space
        return (
          <div>
            <FS label={tl('wizard.cleaning.floors')} value={v('floors')} onChange={v => set('floors', v)} options={getFloorOptions(tl)} />
            <FS label={tl('wizard.cleaning.numberOfRooms')} value={v('numberOfRooms')} onChange={v => set('numberOfRooms', v)} options={roomNumbers} />
            <FI label={tl('wizard.cleaning.livingSpace')} value={v('livingSpace')} onChange={v => set('livingSpace', v)} type="text" placeholder="e.g. 120" />
          </div>
        )
      case 2: // Areas
        return (
          <div>
            <SH>{tl('wizard.cleaning.areasTitle')}</SH>
            {Object.entries({
              completeAll: tl('wizard.cleaning.areas.completeAll'),
              cellar: tl('wizard.cleaning.areas.cellar'),
              atticScreed: tl('wizard.cleaning.areas.atticScreed'),
              garage: tl('wizard.cleaning.areas.garage'),
              conservatory: tl('wizard.cleaning.areas.conservatory'),
              individualRooms: tl('wizard.cleaning.areas.individualRooms'),
            }).map(([key, label]) => (
              <FC key={key} label={label} checked={arrHas('cleaningAreas', key)} onChange={() => toggleArr('cleaningAreas', key)} />
            ))}
          </div>
        )
      case 3: // Windows & Glass
        return (
          <div>
            <SH>{tl('wizard.cleaning.windowsTitle')}</SH>
            <FI label={tl('wizard.cleaning.normalWindows')} value={v('normalWindows')} onChange={v => set('normalWindows', v)} type="number" />
            <FI label={tl('wizard.cleaning.frenchDoors')} value={v('frenchDoors')} onChange={v => set('frenchDoors', v)} type="number" />
            <FI label={tl('wizard.cleaning.otherGlassSurfaces')} value={v('otherGlassSurfaces')} onChange={v => set('otherGlassSurfaces', v)} type="number" />
            <FI label={tl('wizard.cleaning.panoramicHint')} value={v('panoramicWindows')} onChange={v => set('panoramicWindows', v)} type="number" />

            <SH>{tl('wizard.cleaning.blindsTitle')}</SH>
            {Object.entries({
              venetian: tl('wizard.cleaning.blinds.venetian'),
              rollerShutters: tl('wizard.cleaning.blinds.rollerShutters'),
              shutters: tl('wizard.cleaning.blinds.shutters'),
              slat: tl('wizard.cleaning.blinds.slat'),
              adjustable: tl('wizard.cleaning.blinds.adjustable'),
              windowShutters: tl('wizard.cleaning.blinds.windowShutters'),
              blinds: tl('wizard.cleaning.blinds.blinds'),
              otherSpecial: tl('wizard.cleaning.blinds.otherSpecial'),
              no: tl('wizard.cleaning.blinds.no'),
            }).map(([key, label]) => (
              <FC key={key} label={label} checked={arrHas('blinds', key)} onChange={() => toggleArr('blinds', key)} />
            ))}

            <SH>{tl('wizard.cleaning.specialFeaturesTitle')}</SH>
            {Object.entries({
              heavilySoiled: tl('wizard.cleaning.specialFeatures.heavilySoiled'),
              moldFrames: tl('wizard.cleaning.specialFeatures.moldFrames'),
              smallCasement: tl('wizard.cleaning.specialFeatures.smallCasement'),
              roofWindow: tl('wizard.cleaning.specialFeatures.roofWindow'),
              safetyFilm: tl('wizard.cleaning.specialFeatures.safetyFilm'),
              noSpecial: tl('wizard.cleaning.specialFeatures.noSpecial'),
            }).map(([key, label]) => (
              <FC key={key} label={label} checked={arrHas('windowSpecialFeatures', key)} onChange={() => toggleArr('windowSpecialFeatures', key)} />
            ))}
          </div>
        )
      case 4: // Contact & Dates
        return (
          <div>
            <FTA label={tl('wizard.cleaning.furtherRequests')} value={v('furtherRequests')} onChange={v => set('furtherRequests', v)} />
            <FI label={tl('wizard.cleaning.desiredCleaningDate')} value={v('desiredCleaningDate')} onChange={v => set('desiredCleaningDate', v)} type="datetime-local" />
            <FI label={tl('wizard.cleaning.deliveryHandoverDate')} value={v('deliveryHandoverDate')} onChange={v => set('deliveryHandoverDate', v)} type="datetime-local" required />
            <FI label={tl('wizard.cleaning.nameFirstName')} value={v('nameFirstName')} onChange={v => set('nameFirstName', v)} required />
            <FI label={tl('wizard.cleaning.emailAddress')} value={v('emailAddress')} onChange={v => set('emailAddress', v)} type="email" required />
            <FI label={tl('wizard.cleaning.telephoneNumber')} value={v('telephone')} onChange={v => set('telephone', v)} type="tel" required />
            <FI label={tl('wizard.cleaning.zipCity')} value={v('zipCity')} onChange={v => set('zipCity', v)} required />
            <FI label={tl('wizard.cleaning.streetNo')} value={v('streetNo')} onChange={v => set('streetNo', v)} required />
            <ImageUpload />
          </div>
        )
      default: return null
    }
  }

  const renderRelocationStep = () => {
    switch (step) {
      case 0: // Moving FROM
        return (
          <div>
            <FI label={tl('wizard.relocation.movingFrom')} value={v('movingFromAddress')} onChange={v => set('movingFromAddress', v)} required />
            <FS label={tl('wizard.relocation.currentLiving')} value={v('currentLiving')} onChange={v => set('currentLiving', v)}
              options={Object.entries({
                apartment: tl('wizard.relocation.currentLivingOptions.apartment'),
                house: tl('wizard.relocation.currentLivingOptions.house'),
                wgRoom: tl('wizard.relocation.currentLivingOptions.wgRoom'),
                studio: tl('wizard.relocation.currentLivingOptions.studio'),
                office: tl('wizard.relocation.currentLivingOptions.office'),
              }).map(([value, label]) => ({ value, label }))}
            />
            <FS label={tl('wizard.relocation.currentFloor')} value={v('currentFloor')} onChange={v => set('currentFloor', v)} options={getFloorOptions(tl)} />
            <FR label={tl('wizard.relocation.elevatorAvailable')} value={v('currentElevator')} onChange={v => set('currentElevator', v)}
              options={[{ value: 'yes', label: tl('wizard.relocation.yes') }, { value: 'no', label: tl('wizard.relocation.no') }]}
            />
            <FS label={tl('wizard.relocation.currentLivingSpace')} value={v('currentLivingSpace')} onChange={v => set('currentLivingSpace', v)} options={livingSpaceOptions} />
            <FS label={tl('wizard.relocation.currentRooms')} value={v('currentRooms')} onChange={v => set('currentRooms', v)} options={roomNumbers} />
            <FI label={tl('wizard.relocation.parkingDistance')} value={v('parkingDistance')} onChange={v => set('parkingDistance', v)} type="number" placeholder="Distance in meters (e.g. 10)" />
          </div>
        )
      case 1: // Moving TO
        return (
          <div>
            <FS label={tl('wizard.relocation.movingTo')} value={v('movingToType')} onChange={v => set('movingToType', v)}
              hint={tl('wizard.validation.selectOption')}
              options={Object.entries({
                apartment: tl('wizard.relocation.movingToOptions.apartment'),
                house: tl('wizard.relocation.movingToOptions.house'),
                wgRoom: tl('wizard.relocation.movingToOptions.wgRoom'),
                studio: tl('wizard.relocation.movingToOptions.studio'),
                office: tl('wizard.relocation.movingToOptions.office'),
                storage: tl('wizard.relocation.movingToOptions.storage'),
              }).map(([value, label]) => ({ value, label }))}
            />
            <FI label={tl('wizard.relocation.movingToAddress')} value={v('movingToAddress')} onChange={v => set('movingToAddress', v)} required />
            <FR label={tl('wizard.relocation.newElevator')} value={v('newElevator')} onChange={v => set('newElevator', v)}
              options={[{ value: 'yes', label: tl('wizard.relocation.yes') }, { value: 'no', label: tl('wizard.relocation.no') }]}
            />
            <FS label={tl('wizard.relocation.newLivingSpace')} value={v('newLivingSpace')} onChange={v => set('newLivingSpace', v)} options={livingSpaceOptions} />
            <FS label={tl('wizard.relocation.newRooms')} value={v('newRooms')} onChange={v => set('newRooms', v)} options={roomNumbers}
              hint={tl('wizard.validation.selectOption')}
            />
            <FS label={tl('wizard.relocation.peopleMoving')} value={v('peopleMoving')} onChange={v => set('peopleMoving', v)} options={peopleOptions}
              hint={tl('wizard.relocation.peopleMovingHint')}
            />
          </div>
        )
      case 2: // Moving Boxes & Supplies
        return (
          <div>
            <FI label={tl('wizard.relocation.movingBoxes')} value={v('movingBoxes')} onChange={v => set('movingBoxes', v)} type="number" min="0" placeholder="e.g. 20"
              hint={tl('wizard.relocation.movingBoxesHint')}
            />
            <SH>{tl('wizard.relocation.additionalSuppliesTitle')}</SH>
            {Object.entries({
              movingBox: tl('wizard.relocation.supplies.movingBox'),
              wardrobeBox: tl('wizard.relocation.supplies.wardrobeBox'),
              bottleCarton: tl('wizard.relocation.supplies.bottleCarton'),
              adhesiveTape: tl('wizard.relocation.supplies.adhesiveTape'),
            }).map(([key, label]) => (
              <FC key={key} label={label} checked={arrHas('movingSupplies', key)} onChange={() => toggleArr('movingSupplies', key)} />
            ))}
          </div>
        )
      case 3: // Cleaning Areas
        return (
          <div>
            <SH>{tl('wizard.relocation.areasCleaningTitle')}</SH>
            {Object.entries({
              completeAll: tl('wizard.cleaning.areas.completeAll'),
              cellar: tl('wizard.cleaning.areas.cellar'),
              atticScreed: tl('wizard.cleaning.areas.atticScreed'),
              garage: tl('wizard.cleaning.areas.garage'),
              conservatory: tl('wizard.cleaning.areas.conservatory'),
              individualRooms: tl('wizard.cleaning.areas.individualRooms'),
            }).map(([key, label]) => (
              <FC key={key} label={label} checked={arrHas('cleaningAreas', key)} onChange={() => toggleArr('cleaningAreas', key)} />
            ))}

            <SH>{tl('wizard.relocation.otherAreasTitle')}</SH>
            {Object.entries({
              cellar: tl('wizard.relocation.otherAreas.cellar'),
              atticScreed: tl('wizard.relocation.otherAreas.atticScreed'),
              garageParkingSpace: tl('wizard.relocation.otherAreas.garageParkingSpace'),
              conservatoryBalcony: tl('wizard.relocation.otherAreas.conservatoryBalcony'),
            }).map(([key, label]) => (
              <FC key={key} label={label} checked={arrHas('otherAreas', key)} onChange={() => toggleArr('otherAreas', key)} />
            ))}

            <SH>{tl('wizard.relocation.additionalAreasTitle')}</SH>
            {Object.entries({
              parking: tl('wizard.relocation.additionalAreas.parking'),
              stairs: tl('wizard.relocation.additionalAreas.stairs'),
              corridor: tl('wizard.relocation.additionalAreas.corridor'),
            }).map(([key, label]) => (
              <FC key={key} label={label} checked={arrHas('additionalAreas', key)} onChange={() => toggleArr('additionalAreas', key)} />
            ))}
          </div>
        )
      case 4: // Contact
        return (
          <div>
            <FTA label={tl('wizard.relocation.furtherRequests')} value={v('furtherRequests')} onChange={v => set('furtherRequests', v)} />
            <FI label={tl('wizard.relocation.preferredMoveDate')} value={v('preferredMoveDate')} onChange={v => set('preferredMoveDate', v)} type="datetime-local" />
            <FI label={tl('wizard.relocation.nameFirstName')} value={v('nameFirstName')} onChange={v => set('nameFirstName', v)} required />
            <FI label={tl('wizard.relocation.company')} value={v('company')} onChange={v => set('company', v)} />
            <FI label={tl('wizard.relocation.emailAddress')} value={v('emailAddress')} onChange={v => set('emailAddress', v)} type="email" required />
            <FI label={tl('wizard.relocation.telephoneNumber')} value={v('telephone')} onChange={v => set('telephone', v)} type="tel" required />
            <FI label={tl('wizard.relocation.zipCity')} value={v('zipCity')} onChange={v => set('zipCity', v)} required />
            <FI label={tl('wizard.relocation.streetNo')} value={v('streetNo')} onChange={v => set('streetNo', v)} required />
            <ImageUpload />
          </div>
        )
      default: return null
    }
  }

  const renderDisposalStep = () => {
    switch (step) {
      case 0: // Type & Location
        return (
          <div>
            <FR label={tl('wizard.disposal.pleaseChoose')} value={v('disposalType')} onChange={v => set('disposalType', v)}
              options={[
                { value: 'disposal', label: tl('wizard.disposal.disposalTypes.disposal') },
                { value: 'eviction', label: tl('wizard.disposal.disposalTypes.eviction') },
                { value: 'disposal-clearance', label: tl('wizard.disposal.disposalTypes.disposalClearance') },
              ]}
            />
            <FS label={tl('wizard.disposal.objectType')} value={v('objectType')} onChange={v => set('objectType', v)}
              options={[
                { value: 'apartment', label: tl('wizard.cleaning.objectTypes.apartment') },
                { value: 'house', label: tl('wizard.cleaning.objectTypes.house') },
                { value: 'office', label: tl('wizard.cleaning.objectTypes.office') },
                { value: 'storage-cellar', label: tl('wizard.cleaning.objectTypes.storageCellar') },
              ]}
            />
            <FI label={tl('wizard.disposal.location')} value={v('location')} onChange={v => set('location', v)} required />
            <FS label={tl('wizard.disposal.floor')} value={v('floor')} onChange={v => set('floor', v)} options={getFloorOptions(tl)} />
            <FR label={tl('wizard.disposal.elevatorAvailable')} value={v('elevator')} onChange={v => set('elevator', v)}
              options={[{ value: 'yes', label: tl('wizard.disposal.yes') }, { value: 'no', label: tl('wizard.disposal.no') }]}
            />
          </div>
        )
      case 1: // Waste Details
        return (
          <div>
            <SH>{tl('wizard.disposal.wasteTitle')}</SH>
            {Object.entries({
              furniture: tl('wizard.disposal.wasteItems.furniture'),
              electrical: tl('wizard.disposal.wasteItems.electrical'),
              cardboard: tl('wizard.disposal.wasteItems.cardboard'),
              construction: tl('wizard.disposal.wasteItems.construction'),
              garden: tl('wizard.disposal.wasteItems.garden'),
              textiles: tl('wizard.disposal.wasteItems.textiles'),
            }).map(([key, label]) => (
              <FC key={key} label={label} checked={arrHas('wasteItems', key)} onChange={() => toggleArr('wasteItems', key)} />
            ))}
            <FI label={tl('wizard.disposal.otherDisposalItems')} value={v('otherDisposalItems')} onChange={v => set('otherDisposalItems', v)} />
            <FR label={tl('wizard.disposal.disassemblyNeeded')} value={v('disassemblyNeeded')} onChange={v => set('disassemblyNeeded', v)}
              options={[{ value: 'yes', label: tl('wizard.disposal.yes') }, { value: 'no', label: tl('wizard.disposal.no') }]}
            />
            <FR label={tl('wizard.disposal.materialAmount')} value={v('materialAmount')} onChange={v => set('materialAmount', v)}
              options={[
                { value: 'little', label: tl('wizard.disposal.materialAmounts.little') },
                { value: 'medium', label: tl('wizard.disposal.materialAmounts.medium') },
                { value: 'lots', label: tl('wizard.disposal.materialAmounts.lots') },
              ]}
            />
          </div>
        )
      case 2: // Additional Options
        return (
          <div>
            <SH>{tl('wizard.disposal.additionalOptionsTitle')}</SH>
            {Object.entries({
              cleaningAfter: tl('wizard.disposal.additionalOptions.cleaningAfter'),
              broomCleaning: tl('wizard.disposal.additionalOptions.broomCleaning'),
              basicCleaning: tl('wizard.disposal.additionalOptions.basicCleaning'),
              adhesiveTape: tl('wizard.disposal.additionalOptions.adhesiveTape'),
            }).map(([key, label]) => (
              <FC key={key} label={label} checked={arrHas('additionalOptions', key)} onChange={() => toggleArr('additionalOptions', key)} />
            ))}

            <SH>{tl('wizard.disposal.movingSuppliesTitle')}</SH>
            {Object.entries({
              movingBox: tl('wizard.relocation.supplies.movingBox'),
              wardrobeBox: tl('wizard.relocation.supplies.wardrobeBox'),
              bottleCarton: tl('wizard.relocation.supplies.bottleCarton'),
              adhesiveTape: tl('wizard.relocation.supplies.adhesiveTape'),
            }).map(([key, label]) => (
              <FC key={key} label={label} checked={arrHas('movingSupplies', key)} onChange={() => toggleArr('movingSupplies', key)} />
            ))}
          </div>
        )
      case 3: // Contact
        return (
          <div>
            <FTA label={tl('wizard.disposal.furtherWishes')} value={v('furtherWishes')} onChange={v => set('furtherWishes', v)} />
            <FI label={tl('wizard.disposal.desiredDate')} value={v('desiredDate')} onChange={v => set('desiredDate', v)} type="date" required />
            <FI label={tl('wizard.disposal.nameFirstName')} value={v('nameFirstName')} onChange={v => set('nameFirstName', v)} required />
            <FI label={tl('wizard.disposal.company')} value={v('company')} onChange={v => set('company', v)} />
            <FI label={tl('wizard.disposal.emailAddress')} value={v('emailAddress')} onChange={v => set('emailAddress', v)} type="email" required />
            <FI label={tl('wizard.disposal.telephoneNumber')} value={v('telephone')} onChange={v => set('telephone', v)} type="tel" required />
            <FI label={tl('wizard.disposal.zipCity')} value={v('zipCity')} onChange={v => set('zipCity', v)} required />
            <FI label={tl('wizard.disposal.streetNo')} value={v('streetNo')} onChange={v => set('streetNo', v)} required />
            <ImageUpload />
          </div>
        )
      default: return null
    }
  }

  const renderHouseholdStep = () => {
    switch (step) {
      case 0: // Property & Household
        return (
          <div>
            <FS label={tl('wizard.householdHelping.floors')} value={v('floors')} onChange={v => set('floors', v)} options={getFloorOptions(tl)} />
            <FR label={tl('wizard.householdHelping.elevatorAvailable')} value={v('elevator')} onChange={v => set('elevator', v)}
              options={[{ value: 'yes', label: tl('wizard.householdHelping.yes') }, { value: 'no', label: tl('wizard.householdHelping.no') }]}
            />
            <FS label={tl('wizard.householdHelping.livingArea')} value={v('livingArea')} onChange={v => set('livingArea', v)} options={livingSpaceOptions} />
            <SH>{tl('wizard.householdHelping.householdSituation')}</SH>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <FI label={tl('wizard.householdHelping.numberOfAdults')} value={v('numberOfAdults')} onChange={v => set('numberOfAdults', v)} type="number" placeholder={tl('wizard.householdHelping.numberOfAdults')} />
              <FI label={tl('wizard.householdHelping.numberOfChildren')} value={v('numberOfChildren')} onChange={v => set('numberOfChildren', v)} type="number" placeholder={tl('wizard.householdHelping.numberOfChildren')} />
            </div>
            <FR label={tl('wizard.householdHelping.hasPets')} value={v('hasPets')} onChange={v => set('hasPets', v)}
              options={[{ value: 'yes', label: tl('wizard.householdHelping.yes') }, { value: 'no', label: tl('wizard.householdHelping.no') }]}
            />
          </div>
        )
      case 1: // Services & Frequency
        return (
          <div>
            <FS label={tl('wizard.householdHelping.desiredFrequency')} value={v('desiredFrequency')} onChange={v => set('desiredFrequency', v)}
              hint={tl('wizard.validation.selectOption')}
              options={Object.entries({
                weekly: tl('wizard.householdHelping.frequencyOptions.weekly'),
                biweekly: tl('wizard.householdHelping.frequencyOptions.biweekly'),
                monthly: tl('wizard.householdHelping.frequencyOptions.monthly'),
                onDemand: tl('wizard.householdHelping.frequencyOptions.onDemand'),
              }).map(([value, label]) => ({ value, label }))}
            />
            <FI label={tl('wizard.householdHelping.desiredHours')} value={v('desiredHours')} onChange={v => set('desiredHours', v)} required />
            <SH>{tl('wizard.householdHelping.desiredServicesTitle')}</SH>
            {Object.entries({
              routineCleaning: tl('wizard.householdHelping.desiredServices.routineCleaning'),
              ironing: tl('wizard.householdHelping.desiredServices.ironing'),
              laundry: tl('wizard.householdHelping.desiredServices.laundry'),
              shopping: tl('wizard.householdHelping.desiredServices.shopping'),
              dishwashing: tl('wizard.householdHelping.desiredServices.dishwashing'),
              cooking: tl('wizard.householdHelping.desiredServices.cooking'),
              plantCare: tl('wizard.householdHelping.desiredServices.plantCare'),
              smallTasks: tl('wizard.householdHelping.desiredServices.smallTasks'),
              petCare: tl('wizard.householdHelping.desiredServices.petCare'),
              seniorCare: tl('wizard.householdHelping.desiredServices.seniorCare'),
              errands: tl('wizard.householdHelping.desiredServices.errands'),
            }).map(([key, label]) => (
              <FC key={key} label={label} checked={arrHas('desiredServices', key)} onChange={() => toggleArr('desiredServices', key)} />
            ))}
            <FI label={tl('wizard.householdHelping.otherTasks')} value={v('otherTasks')} onChange={v => set('otherTasks', v)} />
          </div>
        )
      case 2: // Contact
        return (
          <div>
            <FTA label={tl('wizard.householdHelping.furtherRequests')} value={v('furtherRequests')} onChange={v => set('furtherRequests', v)} />
            <div className="grid grid-cols-2 gap-4">
              <FI label={tl('wizard.householdHelping.wishDay')} value={v('wishDay')} onChange={v => set('wishDay', v)} type="date" required />
              <FI label={tl('wizard.householdHelping.preferredTime')} value={v('preferredTime')} onChange={v => set('preferredTime', v)} type="time" />
            </div>
            <FI label={tl('wizard.householdHelping.nameFirstName')} value={v('nameFirstName')} onChange={v => set('nameFirstName', v)} required />
            <FI label={tl('wizard.householdHelping.company')} value={v('company')} onChange={v => set('company', v)} />
            <FI label={tl('wizard.householdHelping.emailAddress')} value={v('emailAddress')} onChange={v => set('emailAddress', v)} type="email" required />
            <FI label={tl('wizard.householdHelping.telephoneNumber')} value={v('telephone')} onChange={v => set('telephone', v)} type="tel" required />
            <FI label={tl('wizard.householdHelping.zipCity')} value={v('zipCity')} onChange={v => set('zipCity', v)} required />
            <FI label={tl('wizard.householdHelping.streetNo')} value={v('streetNo')} onChange={v => set('streetNo', v)} required />
          </div>
        )
      default: return null
    }
  }

  const renderOtherStep = () => {
    // Generic form for gastronomy, medical, construction, special, property maintenance, combo
    switch (step) {
      case 0:
        return (
          <div>
            <FS label={tl('wizard.cleaning.objectType')} value={v('objectType')} onChange={v => set('objectType', v)}
              options={[
                { value: 'apartment', label: tl('wizard.cleaning.objectTypes.apartment') },
                { value: 'house', label: tl('wizard.cleaning.objectTypes.house') },
                { value: 'office', label: tl('wizard.cleaning.objectTypes.office') },
                { value: 'storage-cellar', label: tl('wizard.cleaning.objectTypes.storageCellar') },
              ]}
            />
            {needsFrequency && (
              <FS
                label={tl('wizard.frequency.label') || 'Desired deployment frequency *'}
                value={v('deploymentFrequency')}
                onChange={v => set('deploymentFrequency', v)}
                options={[
                  { value: 'Unique', label: tl('wizard.frequency.options.unique') || 'Unique' },
                  { value: 'Every other week', label: tl('wizard.frequency.options.everyOtherWeek') || 'Every other week' },
                  { value: 'Weekly', label: tl('wizard.frequency.options.weekly') || 'Weekly' },
                  { value: 'Several times a week', label: tl('wizard.frequency.options.severalTimesWeek') || 'Several times a week' },
                  { value: 'Daily', label: tl('wizard.frequency.options.daily') || 'Daily' }
                ]}
              />
            )}
            <FI label={tl('wizard.disposal.location')} value={v('location')} onChange={v => set('location', v)} />
            <FS label={tl('wizard.disposal.floor')} value={v('floor')} onChange={v => set('floor', v)} options={getFloorOptions(tl)} />
            <FI label={tl('wizard.cleaning.livingSpace')} value={v('livingSpace')} onChange={v => set('livingSpace', v)} placeholder="m┬▓" />
            <FS label={tl('wizard.cleaning.numberOfRooms')} value={v('numberOfRooms')} onChange={v => set('numberOfRooms', v)} options={roomNumbers} />
          </div>
        )
      case 1:
        return (
          <div>
            <FTA label={tl('wizard.cleaning.furtherRequests')} value={v('furtherRequests')} onChange={v => set('furtherRequests', v)} />
            <FI label={tl('wizard.cleaning.desiredCleaningDate')} value={v('desiredCleaningDate')} onChange={v => set('desiredCleaningDate', v)} type="date" />
          </div>
        )
      case 2:
        return (
          <div>
            <FI label={tl('wizard.cleaning.nameFirstName')} value={v('nameFirstName')} onChange={v => set('nameFirstName', v)} required />
            <FI label={tl('wizard.cleaning.emailAddress')} value={v('emailAddress')} onChange={v => set('emailAddress', v)} type="email" required />
            <FI label={tl('wizard.cleaning.telephoneNumber')} value={v('telephone')} onChange={v => set('telephone', v)} type="tel" required />
            <FI label={tl('wizard.cleaning.zipCity')} value={v('zipCity')} onChange={v => set('zipCity', v)} required />
            <FI label={tl('wizard.cleaning.streetNo')} value={v('streetNo')} onChange={v => set('streetNo', v)} required />
            <ImageUpload />
          </div>
        )
      default: return null
    }
  }

  const renderCurrentStep = () => {
    switch (category) {
      case 'cleaning': return renderCleaningStep()
      case 'relocation': return renderRelocationStep()
      case 'disposal': return renderDisposalStep()
      case 'household-helping': return renderHouseholdStep()
      default: return renderOtherStep()
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-[#003366]">{serviceName}</h2>
          <span className="text-sm font-medium text-[#5a7a9a]">
            {`${step + 1} / ${totalSteps}`}
          </span>
        </div>
        <div className="w-full bg-[#d4e4f4] rounded-full h-2">
          <div
            className="bg-[#003366] h-2 rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-[#dce9f5] rounded-2xl p-6 md:p-8 border border-[#b8d4eb]">
        {renderCurrentStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {!isFirst ? (
          <button onClick={goBack} className="px-6 py-2.5 bg-[#003366] text-white font-semibold rounded-lg hover:bg-[#002244] transition-colors text-sm">
            {tl('wizard.buttons.back')}
          </button>
        ) : <div />}
        {isLast ? (
          <button onClick={submit} disabled={busy}
            className="px-8 py-2.5 bg-[#003366] text-white font-semibold rounded-lg hover:bg-[#002244] transition-colors disabled:opacity-50 text-sm">
            {busy ? tl('wizard.buttons.submitting') : tl('wizard.buttons.submit')}
          </button>
        ) : (
          <button onClick={goNext} className="px-6 py-2.5 bg-[#003366] text-white font-semibold rounded-lg hover:bg-[#002244] transition-colors text-sm">
            {tl('wizard.buttons.next')}
          </button>
        )}
      </div>
    </div>
  )
}
