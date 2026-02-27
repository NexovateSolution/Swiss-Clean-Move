'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import toast from 'react-hot-toast'

export type ServiceSlug =
  | 'house-cleaning' | 'apartment-cleaning' | 'stairwell-cleaning'
  | 'office-cleaning' | 'final-cleaning' | 'window-cleaning'
  | 'relocation' | 'disposal' | 'gastronomy-cleaning'
  | 'medical-cleaning' | 'construction-cleaning' | 'property-maintenance'
  | 'special-cleaning' | 'combo-service'

type FormType = 'cleaning' | 'relocation' | 'disposal'

type StepId =
  | 'property' | 'date_frequency' | 'additional' | 'hygiene'
  | 'moving_old' | 'moving_new' | 'moving_details'
  | 'special_bg' | 'contact'

interface WizardData {
  salutation?: 'Mister' | 'Woman' | 'Other'
  firstName: string; name: string; emailAddress: string; telephone: string
  postalCodeAndCity: string; streetAndNumber: string
  contactPreferredVia?: 'E-mail' | 'Phone'
  viewingIsWelcome?: 'And' | 'No'; remark?: string
  propertyType?: string; livingAreaM2?: string; roomCount?: string
  bathroomCount?: string; floorCount?: string; hasElevator?: string
  frequency?: string; desiredDate?: string; message?: string
  hasPets?: string; specialFeatures?: string[]; serviceFrequency?: string
  windowCleaningOpt?: boolean; kitchenExtra?: boolean; carpetCare?: boolean; gardenMaintenance?: boolean
  hasBasement?: boolean; hasAttic?: boolean; hasBalcony?: boolean
  rentalHandover?: string; windowsInsideOutside?: boolean
  kitchenAppliances?: boolean; bulkyWasteDisposal?: boolean
  buildingType?: string; stairwellArea?: string; unitCount?: string
  handrailsExtra?: boolean; lightSwitchesMailboxes?: boolean; windowCleaningStairwell?: boolean
  officeAreaM2?: string; workstationCount?: string; sanitaryFacilityCount?: string
  kitchenetteCount?: string; disinfectionWCKitchen?: boolean
  carpetCareOffice?: boolean; windowCleaningOffice?: boolean
  practiceType?: string; treatmentRoomCount?: string
  disinfectionTreatment?: boolean; medicalWasteDisposal?: boolean
  gastronomyAreaM2?: string; hasKitchen?: string; seatsCount?: string; staffRoomCount?: string
  greaseFilterCleaning?: boolean; intensiveFloorCleaning?: boolean; windowsGastro?: boolean
  constructionAreaM2?: string; constructionType?: string; constructionCondition?: string
  fineCleaningOpt?: boolean; dustProtection?: boolean; windowCleaningConstruction?: boolean
  specialRequestType?: string; areaQuantity?: string; specialFrequency?: string
  specialPeriod?: string; specialRequirements?: string
  windowCount?: string; windowFloors?: string; insideOutsideBoth?: string; balconyGlazing?: string
  oldAddress?: string; oldFloor?: string; oldElevator?: string; oldAccess?: string
  newAddress?: string; newFloor?: string; newElevator?: string; newAccess?: string
  movingRoomCount?: string; bulkySpecialItems?: string; packingService?: string
  furnitureAssembly?: string; movingDate?: string
  disposalAddress?: string; itemType?: string; volumeM3?: string
  preferredDate?: string; preferredTime?: string
  pmBuildingType?: string; pmUnitCount?: string; pmAreaM2?: string
  winterService?: string; minorRepairs?: string; gardenMaintenancePM?: string; contractType?: string
  comboCleaningType?: string; comboCleaningArea?: string; comboCleaningRooms?: string
}

/* ─── helpers ─── */
function getFormType(s: ServiceSlug): FormType {
  if (s === 'relocation' || s === 'combo-service') return 'relocation'
  if (s === 'disposal') return 'disposal'
  return 'cleaning'
}

function getSteps(s: ServiceSlug): StepId[] {
  switch (s) {
    case 'house-cleaning': case 'apartment-cleaning': case 'final-cleaning':
    case 'stairwell-cleaning': case 'office-cleaning':
    case 'gastronomy-cleaning': case 'construction-cleaning':
      return ['property', 'date_frequency', 'additional', 'contact']
    case 'medical-cleaning':
      return ['property', 'date_frequency', 'hygiene', 'contact']
    case 'special-cleaning':
      return ['special_bg', 'date_frequency', 'contact']
    case 'window-cleaning': case 'disposal': case 'property-maintenance':
      return ['property', 'date_frequency', 'contact']
    case 'relocation':
      return ['moving_old', 'moving_new', 'moving_details', 'date_frequency', 'contact']
    case 'combo-service':
      return ['moving_old', 'moving_new', 'moving_details', 'additional', 'date_frequency', 'contact']
    default:
      return ['property', 'date_frequency', 'contact']
  }
}

/* ─── Stable field components (outside render to prevent focus loss) ─── */
const ic = 'w-full px-3 py-2.5 border border-swiss-border rounded-lg focus:outline-none focus:ring-2 focus:ring-swiss-red/40 focus:border-swiss-red bg-white text-swiss-text transition-colors'

function FI({ label, value, onChange, required, type = 'text', placeholder }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string; placeholder?: string }) {
  return (<div><label className="block text-sm font-semibold text-swiss-text mb-1.5">{label}{required && <span className="text-swiss-red ml-0.5">*</span>}</label><input type={type} value={value} onChange={e => onChange(e.target.value)} className={ic} placeholder={placeholder} /></div>)
}

function FS({ label, value, onChange, required, options, placeholder, selectLabel }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; options: { value: string; label: string }[]; placeholder?: string; selectLabel?: string }) {
  return (<div><label className="block text-sm font-semibold text-swiss-text mb-1.5">{label}{required && <span className="text-swiss-red ml-0.5">*</span>}</label><select value={value} onChange={e => onChange(e.target.value)} className={ic}><option value="">{placeholder || selectLabel || 'Please select...'}</option>{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>)
}

function FYN({ label, value, onChange, required, yesLabel = 'Yes', noLabel = 'No', selectLabel }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; yesLabel?: string; noLabel?: string; selectLabel?: string }) {
  return <FS label={label} value={value} onChange={onChange} required={required} selectLabel={selectLabel} options={[{ value: 'yes', label: yesLabel }, { value: 'no', label: noLabel }]} />
}

function FC({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (<label className="flex items-center gap-3 p-3 rounded-lg border border-swiss-border hover:border-swiss-red/30 hover:bg-swiss-softRed/30 transition-colors cursor-pointer"><input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="w-4 h-4 rounded border-swiss-border text-swiss-red focus:ring-swiss-red" /><span className="text-sm text-swiss-text">{label}</span></label>)
}

function FTA({ label, value, onChange, placeholder, rows = 4 }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (<div><label className="block text-sm font-semibold text-swiss-text mb-1.5">{label}</label><textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className={ic} placeholder={placeholder} /></div>)
}

function SH({ children }: { children: string }) {
  return <h3 className="text-base font-bold text-swiss-text border-b border-swiss-border pb-2 mb-4">{children}</h3>
}

const roomNumbers = [
  { value: '1', label: '1' }, { value: '1.5', label: '1.5' }, { value: '2', label: '2' },
  { value: '2.5', label: '2.5' }, { value: '3', label: '3' }, { value: '3.5', label: '3.5' },
  { value: '4', label: '4' }, { value: '4.5', label: '4.5' }, { value: '5', label: '5' },
  { value: '5.5', label: '5.5' }, { value: '6', label: '6' }, { value: '6.5', label: '6.5' },
  { value: '7', label: '7' }
]

/* ═══ COMPONENT ═══ */
export default function ServiceFormWizard({ service, serviceName, locale }: { service: ServiceSlug; serviceName: string; locale: string }) {
  const t = useTranslations('serviceForm')
  const router = useRouter()
  const steps = useMemo(() => getSteps(service), [service])
  const formType = useMemo(() => getFormType(service), [service])
  const [step, setStep] = useState(0)
  const [busy, setBusy] = useState(false)
  const [d, setD] = useState<WizardData>({ salutation: 'Mister', firstName: '', name: '', emailAddress: '', telephone: '', postalCodeAndCity: '', streetAndNumber: '', contactPreferredVia: 'E-mail', viewingIsWelcome: 'And', remark: '', specialFeatures: [] })

  const cur = steps[step]
  const isFirst = step === 0
  const isLast = step === steps.length - 1
  const set = <K extends keyof WizardData>(k: K, v: WizardData[K]) => setD(p => ({ ...p, [k]: v }))
  const v = (k: keyof WizardData) => (d[k] as string) ?? ''
  const b = (k: keyof WizardData) => !!d[k]
  const toggleArr = (key: keyof WizardData, val: string) => { const a = (d[key] as string[] | undefined) ?? []; const s = new Set(a); if (s.has(val)) s.delete(val); else s.add(val); set(key, Array.from(s) as any) }

  // Translated common labels
  const yesLabel = t('wizard.options.common.yes')
  const noLabel = t('wizard.options.common.no')
  const selectLabel = t('wizard.options.common.select')

  // Translated frequency options
  const freqOpts = useMemo(() => [{ value: 'one-time', label: t('wizard.options.frequency.one-time') }, { value: 'weekly', label: t('wizard.options.frequency.weekly') }, { value: 'bi-weekly', label: t('wizard.options.frequency.bi-weekly') }, { value: 'monthly', label: t('wizard.options.frequency.monthly') }], [t])
  const freqExt = useMemo(() => [{ value: 'daily', label: t('wizard.options.frequency.daily') }, { value: '2-3x-week', label: t('wizard.options.frequency.2-3x-week') }, ...freqOpts], [t, freqOpts])

  // Translated room options
  const roomOptions = useMemo(() => [...roomNumbers, { value: 'more', label: t('wizard.options.common.more') }], [t])

  // Translated special features
  const specialFeatureItems = useMemo(() => [
    { key: 'Large Windows', label: t('wizard.additional.largeWindows') },
    { key: 'Terrace', label: t('wizard.additional.terrace') },
    { key: 'Garage', label: t('wizard.additional.garage') },
    { key: 'Garden', label: t('wizard.additional.garden') },
    { key: 'Balcony', label: t('wizard.additional.balcony') },
    { key: 'Fireplace', label: t('wizard.additional.fireplace') },
  ], [t])

  const validate = (): boolean => {
    const fail = () => { toast.error(t('wizard.validation.required')); return false }
    switch (cur) {
      case 'property':
        if (service === 'house-cleaning') return !!d.propertyType && !!d.livingAreaM2 ? true : fail()
        if (service === 'apartment-cleaning' || service === 'final-cleaning') return !!d.livingAreaM2 && !!d.roomCount ? true : fail()
        if (service === 'stairwell-cleaning') return !!d.buildingType && !!d.floorCount ? true : fail()
        if (service === 'office-cleaning') return !!d.officeAreaM2 ? true : fail()
        if (service === 'medical-cleaning') return !!d.practiceType && !!d.livingAreaM2 ? true : fail()
        if (service === 'gastronomy-cleaning') return !!d.gastronomyAreaM2 ? true : fail()
        if (service === 'construction-cleaning') return !!d.propertyType && !!d.constructionAreaM2 ? true : fail()
        if (service === 'window-cleaning') return !!d.windowCount ? true : fail()
        if (service === 'disposal') return !!d.disposalAddress && !!d.itemType ? true : fail()
        if (service === 'property-maintenance') return !!d.pmBuildingType ? true : fail()
        return true
      case 'moving_old': return !!d.oldAddress ? true : fail()
      case 'moving_new': return !!d.newAddress ? true : fail()
      case 'special_bg': return !!d.specialRequestType ? true : fail()
      case 'contact': return (!!d.firstName && !!d.name && !!d.emailAddress && !!d.telephone && !!d.postalCodeAndCity && !!d.streetAndNumber) ? true : fail()
      default: return true
    }
  }

  const goNext = () => { if (validate()) setStep(i => Math.min(i + 1, steps.length - 1)) }
  const goBack = () => setStep(i => Math.max(i - 1, 0))
  const submit = async () => {
    if (!validate()) return
    setBusy(true)
    try {
      const res = await fetch('/api/service-forms', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ serviceName, formType, ...d }) })
      if (!res.ok) throw new Error('fail')
      toast.success(t('toasts.submitted'))
      router.push(`/${locale}`)
    } catch { toast.error(t('toasts.submitFailedRetry')) } finally { setBusy(false) }
  }

  const stepTitle = (s: StepId) => t(`wizard.stepTitles.${s}`)

  return (
    <div className="card p-6 md:p-8">
      <div className="flex items-start justify-between gap-6"><div className="space-y-2">
        <div className="inline-flex items-center bg-blue-50 text-swiss-blue rounded-full px-4 py-2 text-[11px] font-semibold tracking-wider uppercase border border-swiss-blue/20">{t('wizard.badge')}</div>
        <h1 className="text-2xl md:text-3xl font-bold text-swiss-text">{serviceName}</h1>
        <p className="text-swiss-body">{t('wizard.stepCounter', { current: step + 1, total: steps.length })}</p>
      </div></div>
      <div className="mt-4 flex gap-1.5">{steps.map((_, i) => (<div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? 'bg-swiss-red' : 'bg-swiss-border'}`} />))}</div>

      <div className="mt-6 border-t border-swiss-border pt-6">
        <h2 className="text-xl font-semibold text-swiss-text mb-6">{stepTitle(cur)}</h2>

        {/* ═══ PROPERTY ═══ */}
        {cur === 'property' && <div className="space-y-6">
          {service === 'house-cleaning' && <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FS selectLabel={selectLabel} label={t('wizard.labels.propertyType')} value={v('propertyType')} onChange={x => set('propertyType', x)} required options={[{ value: 'single-family', label: t('wizard.options.propertyTypes.single-family') }, { value: 'row-house', label: t('wizard.options.propertyTypes.row-house') }, { value: 'apartment-building', label: t('wizard.options.propertyTypes.apartment-building') }]} />
              <FI label={t('wizard.labels.livingArea')} value={v('livingAreaM2')} onChange={x => set('livingAreaM2', x)} required type="number" placeholder={t('wizard.placeholders.areaM2')} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FS selectLabel={selectLabel} label={t('wizard.labels.roomCount')} value={v('roomCount')} onChange={x => set('roomCount', x)} options={roomOptions} />
              <FI label={t('wizard.labels.bathroomCount')} value={v('bathroomCount')} onChange={x => set('bathroomCount', x)} type="number" placeholder="e.g. 2" />
              <FYN selectLabel={selectLabel} yesLabel={yesLabel} noLabel={noLabel} label={t('wizard.labels.hasPets')} value={v('hasPets')} onChange={x => set('hasPets', x)} />
            </div>
            <div><label className="block text-sm font-semibold text-swiss-text mb-2">{t('wizard.labels.specialFeatures')}</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">{specialFeatureItems.map(f => (
                <label key={f.key} className="flex items-center gap-2 p-2.5 rounded-lg border border-swiss-border hover:border-swiss-red/30 hover:bg-swiss-softRed/30 transition-colors cursor-pointer text-sm">
                  <input type="checkbox" checked={(d.specialFeatures ?? []).includes(f.key)} onChange={() => toggleArr('specialFeatures', f.key)} className="w-4 h-4 rounded border-swiss-border text-swiss-red focus:ring-swiss-red" />{f.label}
                </label>))}</div></div>
          </>}

          {(service === 'apartment-cleaning' || service === 'final-cleaning') && <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FI label={t('wizard.labels.livingArea')} value={v('livingAreaM2')} onChange={x => set('livingAreaM2', x)} required type="number" placeholder={t('wizard.placeholders.areaM2')} />
              <FS label={t('wizard.labels.roomCount')} value={v('roomCount')} onChange={x => set('roomCount', x)} required options={roomOptions} />
              <FI label={t('wizard.labels.bathroomCount')} value={v('bathroomCount')} onChange={x => set('bathroomCount', x)} type="number" placeholder="e.g. 1" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <FC label={t('wizard.additional.basement')} checked={b('hasBasement')} onChange={x => set('hasBasement', x)} />
              <FC label={t('wizard.additional.attic')} checked={b('hasAttic')} onChange={x => set('hasAttic', x)} />
              <FC label={t('wizard.additional.balcony')} checked={b('hasBalcony')} onChange={x => set('hasBalcony', x)} />
            </div>
            {service === 'final-cleaning' && <FYN selectLabel={selectLabel} yesLabel={yesLabel} noLabel={noLabel} label={t('wizard.additional.rentalHandover')} value={v('rentalHandover')} onChange={x => set('rentalHandover', x)} required />}
          </>}

          {service === 'stairwell-cleaning' && <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FS selectLabel={selectLabel} label={t('wizard.labels.buildingType')} value={v('buildingType')} onChange={x => set('buildingType', x)} required options={[{ value: 'commercial-building', label: t('wizard.options.buildingTypes.commercial-building') }, { value: 'apartment-building', label: t('wizard.options.propertyTypes.apartment-building') }]} />
              <FI label={t('wizard.labels.floorCount')} value={v('floorCount')} onChange={x => set('floorCount', x)} required type="number" placeholder="e.g. 4" />
              <FYN selectLabel={selectLabel} yesLabel={yesLabel} noLabel={noLabel} label={t('wizard.labels.elevator')} value={v('hasElevator')} onChange={x => set('hasElevator', x)} />
              <FI label={t('wizard.labels.stairwellArea')} value={v('stairwellArea')} onChange={x => set('stairwellArea', x)} type="number" placeholder={t('wizard.placeholders.areaM2')} />
              <FI label={t('wizard.labels.units')} value={v('unitCount')} onChange={x => set('unitCount', x)} type="number" placeholder="e.g. 8" />
            </div>
          </>}

          {service === 'office-cleaning' && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FI label={t('wizard.labels.officeArea')} value={v('officeAreaM2')} onChange={x => set('officeAreaM2', x)} required type="number" placeholder="e.g. 200" />
            <FI label={t('wizard.labels.workstations')} value={v('workstationCount')} onChange={x => set('workstationCount', x)} type="number" placeholder="e.g. 15" />
            <FI label={t('wizard.labels.sanitary')} value={v('sanitaryFacilityCount')} onChange={x => set('sanitaryFacilityCount', x)} type="number" placeholder="e.g. 2" />
            <FI label={t('wizard.labels.kitchenettes')} value={v('kitchenetteCount')} onChange={x => set('kitchenetteCount', x)} type="number" placeholder="e.g. 1" />
          </div>}

          {service === 'medical-cleaning' && <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FS selectLabel={selectLabel} label={t('wizard.labels.practiceType')} value={v('practiceType')} onChange={x => set('practiceType', x)} required options={[{ value: 'doctor', label: t('wizard.options.practiceTypes.doctor') }, { value: 'dentist', label: t('wizard.options.practiceTypes.dentist') }, { value: 'therapy', label: t('wizard.options.practiceTypes.therapy') }, { value: 'laboratory', label: t('wizard.options.practiceTypes.laboratory') }]} />
              <FI label={t('wizard.labels.livingArea')} value={v('livingAreaM2')} onChange={x => set('livingAreaM2', x)} required type="number" placeholder="e.g. 150" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FI label={t('wizard.labels.treatmentRooms')} value={v('treatmentRoomCount')} onChange={x => set('treatmentRoomCount', x)} type="number" placeholder="e.g. 4" />
              <FI label={t('wizard.labels.sanitary')} value={v('sanitaryFacilityCount')} onChange={x => set('sanitaryFacilityCount', x)} type="number" placeholder="e.g. 2" />
            </div>
          </>}

          {service === 'gastronomy-cleaning' && <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FI label={t('wizard.labels.gastroArea')} value={v('gastronomyAreaM2')} onChange={x => set('gastronomyAreaM2', x)} required type="number" placeholder={t('wizard.placeholders.areaM2')} />
              <FYN selectLabel={selectLabel} yesLabel={yesLabel} noLabel={noLabel} label={t('wizard.labels.hasKitchen')} value={v('hasKitchen')} onChange={x => set('hasKitchen', x)} />
              <FI label={t('wizard.labels.seats')} value={v('seatsCount')} onChange={x => set('seatsCount', x)} type="number" placeholder="e.g. 50" />
            </div>
          </>}

          {service === 'construction-cleaning' && <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FS selectLabel={selectLabel} label={t('wizard.labels.propertyType')} value={v('propertyType')} onChange={x => set('propertyType', x)} required options={[{ value: 'residential', label: t('wizard.options.propertyTypes.residential') }, { value: 'commercial', label: t('wizard.options.propertyTypes.commercial') }, { value: 'mixed', label: t('wizard.options.propertyTypes.mixed') }]} />
              <FI label={t('wizard.labels.constructionArea')} value={v('constructionAreaM2')} onChange={x => set('constructionAreaM2', x)} required type="number" placeholder={t('wizard.placeholders.areaM2')} />
              <FS selectLabel={selectLabel} label={t('wizard.labels.constructionType')} value={v('constructionType')} onChange={x => set('constructionType', x)} options={[{ value: 'new-build', label: t('wizard.options.constructionTypes.new-build') }, { value: 'renovation', label: t('wizard.options.constructionTypes.renovation') }]} />
              <FS selectLabel={selectLabel} label={t('wizard.labels.soiling')} value={v('constructionCondition')} onChange={x => set('constructionCondition', x)} options={[{ value: 'light', label: t('wizard.options.soiling.light') }, { value: 'medium', label: t('wizard.options.soiling.medium') }, { value: 'heavy', label: t('wizard.options.soiling.heavy') }]} />
            </div>
          </>}

          {service === 'window-cleaning' && <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FS selectLabel={selectLabel} label={t('wizard.labels.propertyType')} value={v('propertyType')} onChange={x => set('propertyType', x)} options={[{ value: 'apartment', label: t('wizard.options.propertyTypes.apartment') }, { value: 'house', label: t('wizard.options.propertyTypes.house') }, { value: 'commercial', label: t('wizard.options.propertyTypes.commercial') }]} />
              <FI label={t('wizard.labels.windowCount')} value={v('windowCount')} onChange={x => set('windowCount', x)} required type="number" placeholder="e.g. 10" />
              <FI label={t('wizard.labels.windowFloors')} value={v('windowFloors')} onChange={x => set('windowFloors', x)} type="number" placeholder="e.g. 2" />
              <FS selectLabel={selectLabel} label={t('wizard.labels.cleaningScope')} value={v('insideOutsideBoth')} onChange={x => set('insideOutsideBoth', x)} options={[{ value: 'inside', label: t('wizard.options.cleaningScope.inside') }, { value: 'outside', label: t('wizard.options.cleaningScope.outside') }, { value: 'both', label: t('wizard.options.cleaningScope.both') }]} />
              <FYN selectLabel={selectLabel} yesLabel={yesLabel} noLabel={noLabel} label={t('wizard.labels.balconyGlazing')} value={v('balconyGlazing')} onChange={x => set('balconyGlazing', x)} />
            </div>
          </>}

          {service === 'disposal' && <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FI label={t('wizard.labels.pickupAddress')} value={v('disposalAddress')} onChange={x => set('disposalAddress', x)} required placeholder={t('wizard.placeholders.address')} />
              <FI label={t('wizard.labels.itemType')} value={v('itemType')} onChange={x => set('itemType', x)} required placeholder={t('wizard.placeholders.specialRequest')} />
              <FI label={t('wizard.labels.volume')} value={v('volumeM3')} onChange={x => set('volumeM3', x)} type="number" placeholder="e.g. 5" />
            </div>
          </>}

          {service === 'property-maintenance' && <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FS selectLabel={selectLabel} label={t('wizard.labels.buildingType')} value={v('pmBuildingType')} onChange={x => set('pmBuildingType', x)} required options={[{ value: 'apartment-building', label: t('wizard.options.propertyTypes.apartment-building') }, { value: 'commercial-building', label: t('wizard.options.buildingTypes.commercial-building') }]} />
              <FI label={t('wizard.labels.unitCount')} value={v('pmUnitCount')} onChange={x => set('pmUnitCount', x)} type="number" placeholder="e.g. 12" />
              <FYN selectLabel={selectLabel} yesLabel={yesLabel} noLabel={noLabel} label={t('wizard.labels.winterService')} value={v('winterService')} onChange={x => set('winterService', x)} />
              <FYN selectLabel={selectLabel} yesLabel={yesLabel} noLabel={noLabel} label={t('wizard.labels.minorRepairs')} value={v('minorRepairs')} onChange={x => set('minorRepairs', x)} />
            </div>
            <FYN selectLabel={selectLabel} yesLabel={yesLabel} noLabel={noLabel} label={t('wizard.labels.gardenMaintenance')} value={v('gardenMaintenancePM')} onChange={x => set('gardenMaintenancePM', x)} />
          </>}
        </div>}

        {/* ═══ SPECIAL BG ═══ */}
        {cur === 'special_bg' && <div className="space-y-4">
          <FI label={t('wizard.labels.specialRequestType')} value={v('specialRequestType')} onChange={x => set('specialRequestType', x)} required placeholder={t('wizard.placeholders.specialRequest')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FI label={t('wizard.labels.areaQuantity')} value={v('areaQuantity')} onChange={x => set('areaQuantity', x)} placeholder="e.g. 50m² or 3 pieces" />
            <FS selectLabel={selectLabel} label={t('wizard.labels.frequency')} value={v('specialFrequency')} onChange={x => set('specialFrequency', x)} options={freqOpts} />
          </div>
        </div>}

        {/* ═══ DATE & FREQUENCY ═══ */}
        {cur === 'date_frequency' && <div className="space-y-6">
          {service === 'house-cleaning' && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FI label={t('wizard.labels.startDate')} value={v('desiredDate')} onChange={x => set('desiredDate', x)} type="date" />
            <FS selectLabel={selectLabel} label={t('wizard.labels.serviceFrequency')} value={v('serviceFrequency')} onChange={x => set('serviceFrequency', x)} options={freqOpts} />
          </div>}
          {(service === 'apartment-cleaning' || service === 'final-cleaning' || service === 'construction-cleaning') && <FI label={t('wizard.labels.cleaningDate')} value={v('desiredDate')} onChange={x => set('desiredDate', x)} type="date" />}
          {(['stairwell-cleaning', 'office-cleaning', 'gastronomy-cleaning'] as ServiceSlug[]).includes(service) && <FS selectLabel={selectLabel} label={t('wizard.labels.cleaningFrequency')} value={v('frequency')} onChange={x => set('frequency', x)} required options={service === 'stairwell-cleaning' ? freqOpts.slice(1) : freqExt} />}
          {service === 'medical-cleaning' && <FS selectLabel={selectLabel} label={t('wizard.labels.cleaningFrequency')} value={v('frequency')} onChange={x => set('frequency', x)} required options={[{ value: 'daily', label: t('wizard.options.frequency.daily') }, { value: '2-3x-week', label: t('wizard.options.frequency.2-3x-week') }, { value: 'weekly', label: t('wizard.options.frequency.weekly') }]} />}
          {service === 'special-cleaning' && <FI label={t('wizard.labels.startDate')} value={v('specialPeriod')} onChange={x => set('specialPeriod', x)} type="date" />}
          {service === 'window-cleaning' && <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><FI label={t('wizard.labels.preferredDate')} value={v('desiredDate')} onChange={x => set('desiredDate', x)} type="date" /><FS selectLabel={selectLabel} label={t('wizard.labels.frequency')} value={v('frequency')} onChange={x => set('frequency', x)} options={freqOpts} /></div>}
          {(service === 'relocation' || service === 'combo-service') && <FI label={t('wizard.labels.movingDate')} value={v('movingDate')} onChange={x => set('movingDate', x)} type="date" />}
          {service === 'disposal' && <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><FI label={t('wizard.labels.preferredDate')} value={v('preferredDate')} onChange={x => set('preferredDate', x)} type="date" /><FI label={t('wizard.labels.preferredTime')} value={v('preferredTime')} onChange={x => set('preferredTime', x)} type="time" /></div>}
          {service === 'property-maintenance' && <FS selectLabel={selectLabel} label={t('wizard.labels.contractType')} value={v('contractType')} onChange={x => set('contractType', x)} options={[{ value: 'monthly', label: t('wizard.options.frequency.monthly') }, { value: 'quarterly', label: t('wizard.options.frequency.quarterly') }, { value: 'annual', label: t('wizard.options.frequency.annual') }, { value: 'on-demand', label: t('wizard.options.frequency.on-demand') }]} />}
          <div className="border-t border-swiss-border pt-4 mt-2"><FTA label={t('wizard.labels.message')} value={v('message')} onChange={x => set('message', x)} placeholder={t('wizard.placeholders.message')} /></div>
        </div>}

        {/* ═══ ADDITIONAL ═══ */}
        {cur === 'additional' && <div className="space-y-4">
          {service === 'house-cleaning' && <><SH>{t('wizard.additional.title')}</SH><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><FC label={t('wizard.additional.windowCleaning')} checked={b('windowCleaningOpt')} onChange={x => set('windowCleaningOpt', x)} /><FC label={t('wizard.additional.kitchenExtra')} checked={b('kitchenExtra')} onChange={x => set('kitchenExtra', x)} /><FC label={t('wizard.additional.carpetCare')} checked={b('carpetCare')} onChange={x => set('carpetCare', x)} /><FC label={t('wizard.additional.gardenMaintenance')} checked={b('gardenMaintenance')} onChange={x => set('gardenMaintenance', x)} /></div></>}
          {(service === 'apartment-cleaning' || service === 'final-cleaning') && <><SH>{t('wizard.additional.title')}</SH><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><FC label={t('wizard.additional.insideOutside')} checked={b('windowsInsideOutside')} onChange={x => set('windowsInsideOutside', x)} /><FC label={t('wizard.additional.kitchenExtra')} checked={b('kitchenAppliances')} onChange={x => set('kitchenAppliances', x)} /><FC label={t('wizard.additional.bulkyWaste')} checked={b('bulkyWasteDisposal')} onChange={x => set('bulkyWasteDisposal', x)} /></div></>}
          {service === 'stairwell-cleaning' && <><SH>{t('wizard.additional.title')}</SH><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><FC label={t('wizard.additional.windowCleaning')} checked={b('windowCleaningStairwell')} onChange={x => set('windowCleaningStairwell', x)} /><FC label={t('wizard.additional.handrails')} checked={b('handrailsExtra')} onChange={x => set('handrailsExtra', x)} /><FC label={t('wizard.additional.lightSwitches')} checked={b('lightSwitchesMailboxes')} onChange={x => set('lightSwitchesMailboxes', x)} /></div></>}
          {service === 'office-cleaning' && <><SH>{t('wizard.additional.title')}</SH><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><FC label={t('wizard.additional.windowCleaning')} checked={b('windowCleaningOffice')} onChange={x => set('windowCleaningOffice', x)} /><FC label={t('wizard.additional.disinfection')} checked={b('disinfectionWCKitchen')} onChange={x => set('disinfectionWCKitchen', x)} /><FC label={t('wizard.additional.carpetCare')} checked={b('carpetCareOffice')} onChange={x => set('carpetCareOffice', x)} /></div></>}
          {service === 'gastronomy-cleaning' && <><SH>{t('wizard.additional.title')}</SH><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><FC label={t('wizard.additional.greaseFilter')} checked={b('greaseFilterCleaning')} onChange={x => set('greaseFilterCleaning', x)} /><FC label={t('wizard.additional.intensiveFloor')} checked={b('intensiveFloorCleaning')} onChange={x => set('intensiveFloorCleaning', x)} /><FC label={t('wizard.additional.insideOutside')} checked={b('windowsGastro')} onChange={x => set('windowsGastro', x)} /></div></>}
          {service === 'construction-cleaning' && <><SH>{t('wizard.additional.title')}</SH><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><FC label={t('wizard.additional.fineCleaning')} checked={b('fineCleaningOpt')} onChange={x => set('fineCleaningOpt', x)} /><FC label={t('wizard.additional.windowCleaning')} checked={b('windowCleaningConstruction')} onChange={x => set('windowCleaningConstruction', x)} /><FC label={t('wizard.additional.dustProtection')} checked={b('dustProtection')} onChange={x => set('dustProtection', x)} /></div></>}
          {service === 'combo-service' && <><SH>{t('wizard.additional.cleaningType')}</SH><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><FS selectLabel={selectLabel} label={t('wizard.additional.cleaningType')} value={v('comboCleaningType')} onChange={x => set('comboCleaningType', x)} options={[{ value: 'final-cleaning', label: t('wizard.options.propertyTypes.apartment') }, { value: 'apartment-cleaning', label: t('wizard.options.propertyTypes.apartment') }, { value: 'house-cleaning', label: t('wizard.options.propertyTypes.house') }]} /><FI label={t('wizard.labels.livingArea')} value={v('comboCleaningArea')} onChange={x => set('comboCleaningArea', x)} type="number" placeholder="e.g. 80" /><FS selectLabel={selectLabel} label={t('wizard.labels.roomCount')} value={v('comboCleaningRooms')} onChange={x => set('comboCleaningRooms', x)} options={roomOptions} /></div><div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3"><FC label={t('wizard.additional.insideOutside')} checked={b('windowsInsideOutside')} onChange={x => set('windowsInsideOutside', x)} /><FC label={t('wizard.additional.kitchenExtra')} checked={b('kitchenAppliances')} onChange={x => set('kitchenAppliances', x)} /><FC label={t('wizard.additional.bulkyWaste')} checked={b('bulkyWasteDisposal')} onChange={x => set('bulkyWasteDisposal', x)} /></div></>}
        </div>}

        {/* ═══ HYGIENE ═══ */}
        {cur === 'hygiene' && <div className="space-y-4"><SH>{t('wizard.additional.hygieneTitle')}</SH><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><FC label={t('wizard.additional.disinfectionTreatment')} checked={b('disinfectionTreatment')} onChange={x => set('disinfectionTreatment', x)} /><FC label={t('wizard.additional.medicalWaste')} checked={b('medicalWasteDisposal')} onChange={x => set('medicalWasteDisposal', x)} /></div></div>}

        {/* ═══ MOVING OLD ═══ */}
        {cur === 'moving_old' && <div className="space-y-4">
          <FI label={t('wizard.labels.currentAddress')} value={v('oldAddress')} onChange={x => set('oldAddress', x)} required placeholder={t('wizard.placeholders.address')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FI label={t('wizard.labels.floor')} value={v('oldFloor')} onChange={x => set('oldFloor', x)} placeholder="e.g. 3rd floor" />
            <FYN selectLabel={selectLabel} yesLabel={yesLabel} noLabel={noLabel} label={t('wizard.labels.elevator')} value={v('oldElevator')} onChange={x => set('oldElevator', x)} />
            <FI label={t('wizard.labels.accessNotes')} value={v('oldAccess')} onChange={x => set('oldAccess', x)} placeholder="e.g. Narrow staircase" />
          </div>
        </div>}

        {/* ═══ MOVING NEW ═══ */}
        {cur === 'moving_new' && <div className="space-y-4">
          <FI label={t('wizard.labels.newAddress')} value={v('newAddress')} onChange={x => set('newAddress', x)} required placeholder={t('wizard.placeholders.address')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FI label={t('wizard.labels.floor')} value={v('newFloor')} onChange={x => set('newFloor', x)} placeholder="e.g. 2nd floor" />
            <FYN selectLabel={selectLabel} yesLabel={yesLabel} noLabel={noLabel} label={t('wizard.labels.elevator')} value={v('newElevator')} onChange={x => set('newElevator', x)} />
            <FI label={t('wizard.labels.accessNotes')} value={v('newAccess')} onChange={x => set('newAccess', x)} placeholder="e.g. Loading zone available" />
          </div>
        </div>}

        {/* ═══ MOVING DETAILS ═══ */}
        {cur === 'moving_details' && <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FS selectLabel={selectLabel} label={t('wizard.labels.roomCount')} value={v('movingRoomCount')} onChange={x => set('movingRoomCount', x)} options={roomOptions} />
            <FI label={t('wizard.labels.bulkyItems')} value={v('bulkySpecialItems')} onChange={x => set('bulkySpecialItems', x)} placeholder="e.g. Piano, safe, artwork" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FYN selectLabel={selectLabel} yesLabel={yesLabel} noLabel={noLabel} label={t('wizard.labels.packingService')} value={v('packingService')} onChange={x => set('packingService', x)} />
            <FYN selectLabel={selectLabel} yesLabel={yesLabel} noLabel={noLabel} label={t('wizard.labels.assemblyService')} value={v('furnitureAssembly')} onChange={x => set('furnitureAssembly', x)} />
          </div>
        </div>}

        {/* ═══ CONTACT ═══ */}
        {cur === 'contact' && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2"><p className="text-sm font-semibold text-swiss-text mb-2">{t('wizard.labels.salutation')}</p>
            <div className="flex flex-wrap gap-4">
              {(['Mister', 'Woman', 'Other'] as const).map(s => (
                <label key={s} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="salutation" checked={d.salutation === s} onChange={() => set('salutation', s)} className="w-4 h-4 text-swiss-red focus:ring-swiss-red" />
                  <span className="text-sm text-swiss-text">{s === 'Mister' ? t('wizard.options.salutations.mister') : s === 'Woman' ? t('wizard.options.salutations.woman') : t('wizard.options.salutations.other')}</span>
                </label>
              ))}
            </div>
          </div>
          <FI label={t('wizard.labels.firstName')} value={d.firstName} onChange={x => set('firstName', x)} required placeholder={t('wizard.placeholders.firstName') ?? 'Your first name'} />
          <FI label={t('wizard.labels.lastName')} value={d.name} onChange={x => set('name', x)} required placeholder={t('wizard.placeholders.lastName') ?? 'Your last name'} />
          <FI label={t('wizard.labels.phone')} value={d.telephone} onChange={x => set('telephone', x)} required type="tel" placeholder={t('wizard.placeholders.phone')} />
          <FI label={t('wizard.labels.email')} value={d.emailAddress} onChange={x => set('emailAddress', x)} required type="email" placeholder={t('wizard.placeholders.email')} />
          <FI label={t('wizard.labels.address')} value={d.streetAndNumber} onChange={x => set('streetAndNumber', x)} required placeholder={t('wizard.placeholders.address')} />
          <FI label={t('wizard.labels.zipCity')} value={d.postalCodeAndCity} onChange={x => set('postalCodeAndCity', x)} required placeholder={t('wizard.placeholders.zipCity')} />
          <FS selectLabel={selectLabel} label={t('wizard.labels.preferredContact')} value={v('contactPreferredVia')} onChange={x => set('contactPreferredVia', x as any)} options={[{ value: 'E-mail', label: t('wizard.options.contactVia.email') }, { value: 'Phone', label: t('wizard.options.contactVia.phone') }]} />
          <FYN selectLabel={selectLabel} yesLabel={yesLabel} noLabel={noLabel} label={t('wizard.labels.siteViewing')} value={v('viewingIsWelcome')} onChange={x => set('viewingIsWelcome', x as any)} />
          <div className="md:col-span-2"><FTA label={t('wizard.labels.remarks')} value={v('remark')} onChange={x => set('remark', x)} placeholder={t('wizard.placeholders.message')} /></div>
        </div>}
      </div>

      {/* ═══ NAV ═══ */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <button type="button" onClick={goBack} disabled={isFirst} className="px-6 py-3 rounded-lg border border-swiss-border bg-white text-swiss-text disabled:opacity-40 hover:bg-gray-50 transition-colors">← {t('wizard.buttons.back')}</button>
        {!isLast ? (
          <button type="button" onClick={goNext} className="btn-secondary px-8 py-3">{t('wizard.buttons.next')} →</button>
        ) : (
          <button type="button" onClick={submit} disabled={busy} className="btn-primary px-8 py-3 disabled:opacity-50">{busy ? t('wizard.buttons.submitting') : `✓ ${t('wizard.buttons.submit')}`}</button>
        )}
      </div>
    </div>
  )
}
