'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import toast from 'react-hot-toast'

export type ServiceSlug =
  | 'house-cleaning'
  | 'apartment-cleaning'
  | 'stairwell-cleaning'
  | 'office-cleaning'
  | 'final-cleaning'
  | 'window-cleaning'
  | 'relocation'
  | 'disposal'
  | 'gastronomy-cleaning'
  | 'medical-cleaning'
  | 'construction-cleaning'
  | 'property-maintenance'
  | 'special-cleaning'
  | 'combo-service'

type FormType = 'cleaning' | 'relocation' | 'disposal'

type CleaningAreaKey =
  | 'complete'
  | 'cellar'
  | 'attic'
  | 'garage'
  | 'conservatory'
  | 'individualRooms'

type DisposalWasteKey =
  | 'furniture'
  | 'electrical'
  | 'cardboard'
  | 'constructionDebris'
  | 'gardenWaste'
  | 'textiles'

type WindowBlindKey = 'venetian' | 'roller' | 'shutters' | 'other' | 'none'

type WindowFeatureKey =
  | 'heavilySoiled'
  | 'mold'
  | 'manySmall'
  | 'roofWindow'
  | 'safetyFilm'
  | 'none'

interface WizardData {
  // Common contact
  salutation?: 'Mister' | 'Woman'
  firstName: string
  name: string
  emailAddress: string
  telephone: string
  postalCodeAndCity: string
  streetAndNumber: string
  contactPreferredVia?: 'E-mail' | 'Phone'
  viewingIsWelcome?: 'And' | 'No'
  remark?: string

  // Common request
  location?: string
  comments?: string

  // Cleaning
  objectType?: 'apartment' | 'house' | 'office'
  floorsCount?: string
  roomsCount?: string
  livingSpaceM2?: string
  cleaningAreas?: CleaningAreaKey[]
  desiredCleaningDate?: string
  handoverDate?: string

  // Legacy cleaning (modal ServiceForm)
  numberOfRoomsApartment?: string
  apartmentType?: string
  areaInM2?: string
  awningType?: string
  cellarCleaning?: boolean
  garageCleaning?: boolean
  cleaningAppointment?: string
  submissionDeadline?: string
  carpetShampooing?: boolean
  conservatory?: boolean
  outdoorSeating?: boolean
  parquet?: boolean
  stairpolish?: boolean

  // Window
  normalWindows?: string
  frenchDoors?: string
  otherGlass?: string
  blindsAndShutters?: WindowBlindKey
  windowFeatures?: WindowFeatureKey

  // Relocation
  movingFromAddress?: string
  currentHomeType?: string
  currentFloor?: string
  currentElevator?: 'yes' | 'no'
  currentLivingSpace?: string
  currentRooms?: string

  movingToPlace?: string
  movingToAddress?: string
  destinationElevator?: 'yes' | 'no'
  destinationLivingSpace?: string
  destinationRooms?: string
  movingPeople?: string

  boxesCount?: string
  movingSupplies?: string[]

  // Legacy relocation (modal ServiceForm)
  unloadingStreetAndNumber?: string
  unloadingPostalCodeAndCity?: string
  floors?: string
  assembly?: string
  pathToFrontDoor?: string
  lift?: string
  unpacking?: 'And' | 'No'
  cleaning?: 'And' | 'No'
  disposal?: 'And' | 'No'
  movingDate?: string
  numberOfRooms?: string
  heavyLoad?: string
  pack?: boolean
  cellar?: boolean
  garage?: boolean
  screed?: boolean
  craftRoom?: boolean
  livingSpaceInM2?: string
  liftDisassembly?: string
  pathToFrontDoorM?: string

  // Disposal
  disposalType?: 'disposal' | 'eviction' | 'disposalClearance'
  disposalObjectType?: string
  disposalLocation?: string
  disposalFloor?: string
  disposalElevator?: 'yes' | 'no'
  disposalWaste?: DisposalWasteKey[]
  otherItems?: string
  disassemblyNeeded?: 'yes' | 'no'
  disposalAmount?: 'little' | 'medium' | 'lots'

  // Legacy disposal fields used in admin dashboard
  volume?: string
  collectionDate?: string
  specialItems?: string
}

type StepId =
  | 'cleaning_service'
  | 'cleaning_dates'
  | 'cleaning_apartment'
  | 'cleaning_special'
  | 'window_details'
  | 'relocation_from'
  | 'relocation_to'
  | 'relocation_boxes'
  | 'relocation_details'
  | 'relocation_services'
  | 'disposal_basic'
  | 'disposal_waste'
  | 'disposal_schedule'
  | 'contact'

const cleaningBaseSteps: StepId[] = [
  'cleaning_service',
  'cleaning_apartment',
  'cleaning_special',
  'cleaning_dates',
  'contact'
]

function getFormType(service: ServiceSlug): FormType {
  if (service === 'relocation') return 'relocation'
  if (service === 'disposal') return 'disposal'
  return 'cleaning'
}

function getSteps(service: ServiceSlug): StepId[] {
  if (service === 'relocation') return ['relocation_from', 'relocation_details', 'relocation_services', 'relocation_to', 'relocation_boxes', 'contact']
  if (service === 'disposal') return ['disposal_basic', 'disposal_waste', 'disposal_schedule', 'contact']
  if (service === 'window-cleaning') {
    return ['cleaning_service', 'cleaning_apartment', 'cleaning_special', 'window_details', 'cleaning_dates', 'contact']
  }
  return cleaningBaseSteps
}

export default function ServiceFormWizard({
  service,
  serviceName,
  locale
}: {
  service: ServiceSlug
  serviceName: string
  locale: string
}) {
  const t = useTranslations('serviceForm')
  const router = useRouter()

  const steps = useMemo(() => getSteps(service), [service])
  const formType = useMemo(() => getFormType(service), [service])

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [data, setData] = useState<WizardData>({
    salutation: 'Mister',
    firstName: '',
    name: '',
    emailAddress: '',
    telephone: '',
    postalCodeAndCity: '',
    streetAndNumber: '',
    contactPreferredVia: 'E-mail',
    viewingIsWelcome: 'And',
    remark: '',
    unpacking: 'No',
    cleaning: 'No',
    disposal: 'No',
    cleaningAreas: [],
    disposalWaste: [],
    movingSupplies: []
  })

  const currentStep = steps[currentStepIndex]
  const isFirst = currentStepIndex === 0
  const isLast = currentStepIndex === steps.length - 1

  const setField = <K extends keyof WizardData>(key: K, value: WizardData[K]) => {
    setData(prev => ({ ...prev, [key]: value }))
  }

  const toggleInArray = <T,>(arr: T[] | undefined, value: T) => {
    const next = new Set(arr ?? [])
    if (next.has(value)) next.delete(value)
    else next.add(value)
    return Array.from(next)
  }

  const validateStep = () => {
    const requiredError = t('wizard.validation.required')

    const require = (ok: boolean) => {
      if (!ok) {
        toast.error(requiredError)
        return false
      }
      return true
    }

    switch (currentStep) {
      case 'cleaning_service':
        return require(!!data.location)
      case 'cleaning_apartment':
        return require(!!data.numberOfRoomsApartment && !!data.apartmentType && !!data.areaInM2)
      case 'cleaning_special':
        return true
      case 'cleaning_dates':
        return require(!!data.cleaningAppointment && !!data.submissionDeadline)
      case 'window_details':
        return require(!!data.normalWindows && !!data.frenchDoors && !!data.otherGlass)
      case 'relocation_from':
        return require(!!data.movingFromAddress)
      case 'relocation_details':
        return require(!!data.movingDate && !!data.unloadingStreetAndNumber && !!data.unloadingPostalCodeAndCity)
      case 'relocation_services':
        return true
      case 'relocation_to':
        return require(!!data.movingToAddress)
      case 'relocation_boxes':
        return require(!!data.boxesCount)
      case 'disposal_basic':
        return require(!!data.disposalType && !!data.disposalLocation && !!data.disposalElevator)
      case 'disposal_waste':
        return require(!!data.disposalWaste && data.disposalWaste.length > 0)
      case 'disposal_schedule':
        return true
      case 'contact':
        return require(
          !!data.firstName &&
            !!data.name &&
            !!data.emailAddress &&
            !!data.telephone &&
            !!data.postalCodeAndCity &&
            !!data.streetAndNumber
        )
      default:
        return true
    }
  }

  const goNext = () => {
    if (!validateStep()) return
    setCurrentStepIndex(i => Math.min(i + 1, steps.length - 1))
  }

  const goBack = () => {
    setCurrentStepIndex(i => Math.max(i - 1, 0))
  }

  const submit = async () => {
    if (!validateStep()) return
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/service-forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceName,
          formType,
          ...data
        })
      })

      if (!response.ok) throw new Error('submit_failed')

      toast.success(t('toasts.submitted'))
      setCurrentStepIndex(0)
      setData({
        salutation: 'Mister',
        firstName: '',
        name: '',
        emailAddress: '',
        telephone: '',
        postalCodeAndCity: '',
        streetAndNumber: '',
        contactPreferredVia: 'E-mail',
        viewingIsWelcome: 'And',
        remark: '',
        unpacking: 'No',
        cleaning: 'No',
        disposal: 'No',
        cleaningAreas: [],
        disposalWaste: [],
        movingSupplies: []
      })

      router.push(`/${locale}`)
    } catch {
      toast.error(t('toasts.submitFailedRetry'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const stepTitle = (step: StepId) => {
    switch (step) {
      case 'cleaning_service':
        return t('wizard.steps.cleaningService')
      case 'cleaning_apartment':
        return t('sections.apartmentDetails')
      case 'cleaning_special':
        return t('sections.special')
      case 'cleaning_dates':
        return t('wizard.steps.datesAndRequests')
      case 'window_details':
        return t('wizard.steps.windowDetails')
      case 'relocation_from':
        return t('wizard.steps.relocationFrom')
      case 'relocation_details':
        return t('modal.relocationDetails')
      case 'relocation_services':
        return t('fields.services')
      case 'relocation_to':
        return t('wizard.steps.relocationTo')
      case 'relocation_boxes':
        return t('wizard.steps.boxesAndSupplies')
      case 'disposal_basic':
        return t('wizard.steps.disposalBasic')
      case 'disposal_waste':
        return t('wizard.steps.disposalWaste')
      case 'disposal_schedule':
        return t('modal.disposalDetails')
      case 'contact':
        return t('wizard.steps.contact')
      default:
        return ''
    }
  }

  return (
    <div className="card p-6 md:p-8">
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center bg-swiss-softRed text-swiss-red rounded-full px-4 py-2 text-[11px] font-semibold tracking-wider uppercase">
            {t('wizard.badge')}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-swiss-text">{serviceName}</h1>
          <p className="text-swiss-body">
            {t('wizard.stepCounter', { current: currentStepIndex + 1, total: steps.length })}
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-swiss-border pt-6">
        <h2 className="text-xl font-semibold text-swiss-text mb-4">{stepTitle(currentStep)}</h2>

        {currentStep === 'cleaning_service' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">
                {t('wizard.fields.location.label')} *
              </label>
              <input
                value={data.location ?? ''}
                onChange={e => setField('location', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                placeholder={t('wizard.fields.location.placeholder')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">
                {t('wizard.fields.objectType.label')} *
              </label>
              <select
                value={data.objectType ?? ''}
                onChange={e => setField('objectType', e.target.value as any)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              >
                <option value="">{t('wizard.common.select')}</option>
                <option value="apartment">{t('wizard.fields.objectType.options.apartment')}</option>
                <option value="house">{t('wizard.fields.objectType.options.house')}</option>
                <option value="office">{t('wizard.fields.objectType.options.office')}</option>
              </select>
            </div>
          </div>
        )}

        {currentStep === 'cleaning_apartment' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('fields.apartment.numberOfRooms.label')} *</label>
              <input
                value={data.numberOfRoomsApartment ?? ''}
                onChange={e => setField('numberOfRoomsApartment', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('fields.apartment.type.label')} *</label>
              <input
                value={data.apartmentType ?? ''}
                onChange={e => setField('apartmentType', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('fields.apartment.areaInM2.label')} *</label>
              <input
                value={data.areaInM2 ?? ''}
                onChange={e => setField('areaInM2', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              />
            </div>
          </div>
        )}

        {currentStep === 'cleaning_special' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('fields.apartment.awningType.label')}</label>
              <input
                value={data.awningType ?? ''}
                onChange={e => setField('awningType', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={!!data.cellarCleaning} onChange={e => setField('cellarCleaning', e.target.checked)} />
                <span className="text-swiss-text">{t('fields.apartment.cellar.label')}</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={!!data.garageCleaning} onChange={e => setField('garageCleaning', e.target.checked)} />
                <span className="text-swiss-text">{t('fields.apartment.garage.label')}</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={!!data.carpetShampooing} onChange={e => setField('carpetShampooing', e.target.checked)} />
                <span className="text-swiss-text">{t('fields.carpetShampooing.label')}</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={!!data.conservatory} onChange={e => setField('conservatory', e.target.checked)} />
                <span className="text-swiss-text">{t('fields.conservatory.label')}</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={!!data.outdoorSeating} onChange={e => setField('outdoorSeating', e.target.checked)} />
                <span className="text-swiss-text">{t('fields.outdoorSeating.label')}</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={!!data.parquet} onChange={e => setField('parquet', e.target.checked)} />
                <span className="text-swiss-text">{t('fields.parquet.label')}</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={!!data.stairpolish} onChange={e => setField('stairpolish', e.target.checked)} />
                <span className="text-swiss-text">{t('fields.stairpolish.label')}</span>
              </label>
            </div>
          </div>
        )}

        {currentStep === 'window_details' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">
                  {t('wizard.fields.window.normalWindows.label')} *
                </label>
                <input
                  value={data.normalWindows ?? ''}
                  onChange={e => setField('normalWindows', e.target.value)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">
                  {t('wizard.fields.window.frenchDoors.label')} *
                </label>
                <input
                  value={data.frenchDoors ?? ''}
                  onChange={e => setField('frenchDoors', e.target.value)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">
                  {t('wizard.fields.window.otherGlass.label')} *
                </label>
                <input
                  value={data.otherGlass ?? ''}
                  onChange={e => setField('otherGlass', e.target.value)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">
                  {t('wizard.fields.window.blindsAndShutters.label')}
                </label>
                <select
                  value={data.blindsAndShutters ?? ''}
                  onChange={e => setField('blindsAndShutters', e.target.value as any)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                >
                  <option value="">{t('wizard.common.select')}</option>
                  <option value="venetian">{t('wizard.fields.window.blindsAndShutters.options.venetian')}</option>
                  <option value="roller">{t('wizard.fields.window.blindsAndShutters.options.roller')}</option>
                  <option value="shutters">{t('wizard.fields.window.blindsAndShutters.options.shutters')}</option>
                  <option value="other">{t('wizard.fields.window.blindsAndShutters.options.other')}</option>
                  <option value="none">{t('wizard.fields.window.blindsAndShutters.options.none')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">
                  {t('wizard.fields.window.windowFeatures.label')}
                </label>
                <select
                  value={data.windowFeatures ?? ''}
                  onChange={e => setField('windowFeatures', e.target.value as any)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                >
                  <option value="">{t('wizard.common.select')}</option>
                  <option value="heavilySoiled">{t('wizard.fields.window.windowFeatures.options.heavilySoiled')}</option>
                  <option value="mold">{t('wizard.fields.window.windowFeatures.options.mold')}</option>
                  <option value="manySmall">{t('wizard.fields.window.windowFeatures.options.manySmall')}</option>
                  <option value="roofWindow">{t('wizard.fields.window.windowFeatures.options.roofWindow')}</option>
                  <option value="safetyFilm">{t('wizard.fields.window.windowFeatures.options.safetyFilm')}</option>
                  <option value="none">{t('wizard.fields.window.windowFeatures.options.none')}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'cleaning_dates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">
                {t('wizard.fields.desiredCleaningDate.label')} *
              </label>
              <input
                type="date"
                value={data.desiredCleaningDate ?? ''}
                onChange={e => setField('desiredCleaningDate', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('fields.cleaningAppointment.label')} *</label>
              <input
                type="date"
                value={data.cleaningAppointment ?? ''}
                onChange={e => setField('cleaningAppointment', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              />
            </div>
            {service === 'final-cleaning' ? (
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">
                  {t('wizard.fields.handoverDate.label')}
                </label>
                <input
                  type="date"
                  value={data.handoverDate ?? ''}
                  onChange={e => setField('handoverDate', e.target.value)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                />
              </div>
            ) : null}
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('fields.submissionDeadline.label')} *</label>
              <input
                type="date"
                value={data.submissionDeadline ?? ''}
                onChange={e => setField('submissionDeadline', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('wizard.fields.comments.label')}</label>
              <textarea
                value={data.comments ?? ''}
                onChange={e => setField('comments', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                placeholder={t('wizard.fields.comments.placeholder')}
              />
            </div>
          </div>
        )}

        {currentStep === 'relocation_from' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">
                {t('wizard.fields.relocation.movingFromAddress.label')} *
              </label>
              <input
                value={data.movingFromAddress ?? ''}
                onChange={e => setField('movingFromAddress', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                placeholder={t('wizard.fields.relocation.movingFromAddress.placeholder')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">
                  {t('wizard.fields.relocation.currentFloor.label')} *
                </label>
                <input
                  value={data.currentFloor ?? ''}
                  onChange={e => setField('currentFloor', e.target.value)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">
                  {t('wizard.fields.relocation.currentElevator.label')} *
                </label>
                <select
                  value={data.currentElevator ?? ''}
                  onChange={e => setField('currentElevator', e.target.value as any)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                >
                  <option value="">{t('wizard.common.select')}</option>
                  <option value="yes">{t('wizard.common.yes')}</option>
                  <option value="no">{t('wizard.common.no')}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'relocation_details' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">{t('fields.movingDate.label')} *</label>
                <input
                  type="date"
                  value={data.movingDate ?? ''}
                  onChange={e => setField('movingDate', e.target.value)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">{t('fields.heavyLoad.label')}</label>
                <input
                  value={data.heavyLoad ?? ''}
                  onChange={e => setField('heavyLoad', e.target.value)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('fields.unloadingStreetAndNumber.label')} *</label>
              <input
                value={data.unloadingStreetAndNumber ?? ''}
                onChange={e => setField('unloadingStreetAndNumber', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('fields.unloadingPostalCodeAndCity.label')} *</label>
              <input
                value={data.unloadingPostalCodeAndCity ?? ''}
                onChange={e => setField('unloadingPostalCodeAndCity', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">{t('fields.numberOfRooms.label')}</label>
                <input
                  value={data.numberOfRooms ?? ''}
                  onChange={e => setField('numberOfRooms', e.target.value)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">{t('fields.livingSpaceInM2.label')}</label>
                <input
                  value={data.livingSpaceInM2 ?? ''}
                  onChange={e => setField('livingSpaceInM2', e.target.value)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">{t('fields.pathToFrontDoorM.label')}</label>
                <input
                  value={data.pathToFrontDoorM ?? ''}
                  onChange={e => setField('pathToFrontDoorM', e.target.value)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 'relocation_services' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={!!data.pack} onChange={e => setField('pack', e.target.checked)} />
                <span className="text-swiss-text">{t('fields.pack.label')}</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={!!data.cellar} onChange={e => setField('cellar', e.target.checked)} />
                <span className="text-swiss-text">{t('fields.cellar.label')}</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={!!data.garage} onChange={e => setField('garage', e.target.checked)} />
                <span className="text-swiss-text">{t('fields.garage.label')}</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={!!data.screed} onChange={e => setField('screed', e.target.checked)} />
                <span className="text-swiss-text">{t('fields.screed.label')}</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={!!data.craftRoom} onChange={e => setField('craftRoom', e.target.checked)} />
                <span className="text-swiss-text">{t('fields.craftRoom.label')}</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">{t('fields.unpacking.label')}</label>
                <select
                  value={data.unpacking ?? 'No'}
                  onChange={e => setField('unpacking', e.target.value as any)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                >
                  <option value="And">{t('wizard.common.yes')}</option>
                  <option value="No">{t('wizard.common.no')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">{t('fields.cleaning.label')}</label>
                <select
                  value={data.cleaning ?? 'No'}
                  onChange={e => setField('cleaning', e.target.value as any)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                >
                  <option value="And">{t('wizard.common.yes')}</option>
                  <option value="No">{t('wizard.common.no')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">{t('fields.disposal.label')}</label>
                <select
                  value={data.disposal ?? 'No'}
                  onChange={e => setField('disposal', e.target.value as any)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                >
                  <option value="And">{t('wizard.common.yes')}</option>
                  <option value="No">{t('wizard.common.no')}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'relocation_to' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">
                {t('wizard.fields.relocation.movingToAddress.label')} *
              </label>
              <input
                value={data.movingToAddress ?? ''}
                onChange={e => setField('movingToAddress', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                placeholder={t('wizard.fields.relocation.movingToAddress.placeholder')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">
                  {t('wizard.fields.relocation.destinationElevator.label')} *
                </label>
                <select
                  value={data.destinationElevator ?? ''}
                  onChange={e => setField('destinationElevator', e.target.value as any)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                >
                  <option value="">{t('wizard.common.select')}</option>
                  <option value="yes">{t('wizard.common.yes')}</option>
                  <option value="no">{t('wizard.common.no')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">
                  {t('wizard.fields.relocation.movingPeople.label')}
                </label>
                <input
                  value={data.movingPeople ?? ''}
                  onChange={e => setField('movingPeople', e.target.value)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 'relocation_boxes' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">
                {t('wizard.fields.relocation.boxesCount.label')} *
              </label>
              <select
                value={data.boxesCount ?? ''}
                onChange={e => setField('boxesCount', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              >
                <option value="">{t('wizard.common.select')}</option>
                <option value="1-10">1 - 10</option>
                <option value="10-20">10 - 20</option>
                <option value="20-40">20 - 40</option>
                <option value="40+">40+</option>
              </select>
            </div>
            <div>
              <p className="text-swiss-body">{t('wizard.fields.relocation.movingSupplies.label')}</p>
              {(
                [
                  { key: 'movingBox', label: t('wizard.fields.relocation.movingSupplies.options.movingBox') },
                  { key: 'wardrobeBox', label: t('wizard.fields.relocation.movingSupplies.options.wardrobeBox') },
                  { key: 'bottleCarton', label: t('wizard.fields.relocation.movingSupplies.options.bottleCarton') },
                  { key: 'tapeDispenser', label: t('wizard.fields.relocation.movingSupplies.options.tapeDispenser') }
                ] as { key: string; label: string }[]
              ).map(item => (
                <label key={item.key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={(data.movingSupplies ?? []).includes(item.key)}
                    onChange={() => setField('movingSupplies', toggleInArray(data.movingSupplies, item.key))}
                  />
                  <span className="text-swiss-text">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'disposal_basic' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">
                {t('wizard.fields.disposal.disposalType.label')} *
              </label>
              <div className="space-y-2">
                {(
                  [
                    { key: 'disposal', label: t('wizard.fields.disposal.disposalType.options.disposal') },
                    { key: 'eviction', label: t('wizard.fields.disposal.disposalType.options.eviction') },
                    { key: 'disposalClearance', label: t('wizard.fields.disposal.disposalType.options.disposalClearance') }
                  ] as { key: WizardData['disposalType']; label: string }[]
                ).map(item => (
                  <label key={item.key} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="disposalType"
                      checked={data.disposalType === item.key}
                      onChange={() => setField('disposalType', item.key)}
                    />
                    <span className="text-swiss-text">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">
                  {t('wizard.fields.disposal.location.label')} *
                </label>
                <input
                  value={data.disposalLocation ?? ''}
                  onChange={e => setField('disposalLocation', e.target.value)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">
                  {t('wizard.fields.disposal.elevator.label')} *
                </label>
                <select
                  value={data.disposalElevator ?? ''}
                  onChange={e => setField('disposalElevator', e.target.value as any)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                >
                  <option value="">{t('wizard.common.select')}</option>
                  <option value="yes">{t('wizard.common.yes')}</option>
                  <option value="no">{t('wizard.common.no')}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'disposal_waste' && (
          <div className="space-y-4">
            <div>
              <p className="text-swiss-body">{t('wizard.fields.disposal.waste.label')} *</p>
              {(
                [
                  { key: 'furniture', label: t('wizard.fields.disposal.waste.options.furniture') },
                  { key: 'electrical', label: t('wizard.fields.disposal.waste.options.electrical') },
                  { key: 'cardboard', label: t('wizard.fields.disposal.waste.options.cardboard') },
                  { key: 'constructionDebris', label: t('wizard.fields.disposal.waste.options.constructionDebris') },
                  { key: 'gardenWaste', label: t('wizard.fields.disposal.waste.options.gardenWaste') },
                  { key: 'textiles', label: t('wizard.fields.disposal.waste.options.textiles') }
                ] as { key: DisposalWasteKey; label: string }[]
              ).map(item => (
                <label key={item.key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={(data.disposalWaste ?? []).includes(item.key)}
                    onChange={() => setField('disposalWaste', toggleInArray(data.disposalWaste, item.key))}
                  />
                  <span className="text-swiss-text">{item.label}</span>
                </label>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">
                {t('wizard.fields.disposal.otherItems.label')}
              </label>
              <input
                value={data.otherItems ?? ''}
                onChange={e => setField('otherItems', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">
                  {t('wizard.fields.disposal.disassemblyNeeded.label')}
                </label>
                <select
                  value={data.disassemblyNeeded ?? ''}
                  onChange={e => setField('disassemblyNeeded', e.target.value as any)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                >
                  <option value="">{t('wizard.common.select')}</option>
                  <option value="yes">{t('wizard.common.yes')}</option>
                  <option value="no">{t('wizard.common.no')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-swiss-text mb-2">
                  {t('wizard.fields.disposal.amount.label')}
                </label>
                <select
                  value={data.disposalAmount ?? ''}
                  onChange={e => setField('disposalAmount', e.target.value as any)}
                  className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                >
                  <option value="">{t('wizard.common.select')}</option>
                  <option value="little">{t('wizard.fields.disposal.amount.options.little')}</option>
                  <option value="medium">{t('wizard.fields.disposal.amount.options.medium')}</option>
                  <option value="lots">{t('wizard.fields.disposal.amount.options.lots')}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'disposal_schedule' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('fields.volume.label')}</label>
              <input
                value={data.volume ?? ''}
                onChange={e => setField('volume', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('fields.collectionDate.label')}</label>
              <input
                type="date"
                value={data.collectionDate ?? ''}
                onChange={e => setField('collectionDate', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('fields.specialItems.label')}</label>
              <textarea
                value={data.specialItems ?? ''}
                onChange={e => setField('specialItems', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              />
            </div>
          </div>
        )}

        {currentStep === 'contact' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <p className="text-swiss-body mb-2">{t('wizard.fields.contact.salutation.label')}</p>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="salutation"
                    value="Mister"
                    checked={(data.salutation ?? 'Mister') === 'Mister'}
                    onChange={() => setField('salutation', 'Mister')}
                  />
                  <span className="text-swiss-text">{t('wizard.fields.contact.salutation.options.mister')}</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="salutation"
                    value="Woman"
                    checked={data.salutation === 'Woman'}
                    onChange={() => setField('salutation', 'Woman')}
                  />
                  <span className="text-swiss-text">{t('wizard.fields.contact.salutation.options.woman')}</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('wizard.fields.contact.firstName.label')} *</label>
              <input
                value={data.firstName}
                onChange={e => setField('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('wizard.fields.contact.lastName.label')} *</label>
              <input
                value={data.name}
                onChange={e => setField('name', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('wizard.fields.contact.email.label')} *</label>
              <input
                type="email"
                value={data.emailAddress}
                onChange={e => setField('emailAddress', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('wizard.fields.contact.phone.label')} *</label>
              <input
                value={data.telephone}
                onChange={e => setField('telephone', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('wizard.fields.contact.postalCodeAndCity.label')} *</label>
              <input
                value={data.postalCodeAndCity}
                onChange={e => setField('postalCodeAndCity', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('wizard.fields.contact.streetAndNumber.label')} *</label>
              <input
                value={data.streetAndNumber}
                onChange={e => setField('streetAndNumber', e.target.value)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('wizard.fields.contact.contactPreferredVia.label')}</label>
              <select
                value={data.contactPreferredVia ?? 'E-mail'}
                onChange={e => setField('contactPreferredVia', e.target.value as any)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              >
                <option value="E-mail">{t('wizard.fields.contact.contactPreferredVia.options.email')}</option>
                <option value="Phone">{t('wizard.fields.contact.contactPreferredVia.options.phone')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('wizard.fields.contact.viewingIsWelcome.label')}</label>
              <select
                value={data.viewingIsWelcome ?? 'And'}
                onChange={e => setField('viewingIsWelcome', e.target.value as any)}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
              >
                <option value="And">{t('wizard.fields.contact.viewingIsWelcome.options.yes')}</option>
                <option value="No">{t('wizard.fields.contact.viewingIsWelcome.options.no')}</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-swiss-text mb-2">{t('wizard.fields.contact.remark.label')}</label>
              <textarea
                value={data.remark ?? ''}
                onChange={e => setField('remark', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-swiss-border rounded-md focus:outline-none focus:ring-2 focus:ring-swiss-red"
                placeholder={t('wizard.fields.contact.remark.placeholder')}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={goBack}
          disabled={isFirst}
          className="px-6 py-3 rounded-lg border border-swiss-border bg-white text-swiss-text disabled:opacity-50"
        >
          {t('wizard.buttons.back')}
        </button>

        {!isLast ? (
          <button type="button" onClick={goNext} className="btn-secondary px-8 py-3">
            {t('wizard.buttons.next')}
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={isSubmitting}
            className="btn-primary px-8 py-3 disabled:opacity-50"
          >
            {isSubmitting ? t('buttons.submitting') : t('wizard.buttons.submit')}
          </button>
        )}
      </div>
    </div>
  )
}
