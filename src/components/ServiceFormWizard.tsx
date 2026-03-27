'use client'

import { useMemo, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import toast from 'react-hot-toast'
import { Upload, X } from 'lucide-react'

// Imports of the 10 forms
import { PropertyMaintenanceForm, FinalCleaningForm, MaintenanceCleaningForm } from './service-forms/ServiceFormsPart1'
import { DisposalForm, ConstructionCleaningForm, GastronomyCleaningForm } from './service-forms/ServiceFormsPart2'
import { RelocationForm, HouseholdHelpingForm, ComboServiceForm, SpecialCleaningForm } from './service-forms/ServiceFormsPart3'
import { FormStepProps } from './FormControls'

export type ServiceSlug =
  | 'house-cleaning' | 'apartment-cleaning' | 'stairwell-cleaning'
  | 'office-cleaning' | 'final-cleaning' | 'window-cleaning'
  | 'relocation' | 'disposal' | 'gastronomy-cleaning'
  | 'medical-cleaning' | 'construction-cleaning' | 'property-maintenance'
  | 'special-cleaning' | 'combo-service' | 'household-helping'

function getStepCount(s: ServiceSlug): number {
  if (s === 'property-maintenance') return 4
  if (['final-cleaning', 'house-cleaning', 'apartment-cleaning', 'stairwell-cleaning', 'office-cleaning', 'window-cleaning', 'medical-cleaning'].includes(s)) return 4
  if (s === 'disposal') return 4
  if (s === 'construction-cleaning') return 4
  if (s === 'gastronomy-cleaning') return 4
  if (s === 'relocation') return 4
  if (s === 'household-helping') return 3
  if (s === 'combo-service') return 3
  if (s === 'special-cleaning') return 3
  return 3
}

export default function ServiceFormWizard({ service, serviceName, locale }: { service: ServiceSlug; serviceName: string; locale: string }) {
  const t = useTranslations('serviceForm')
  const router = useRouter()
  const totalSteps = useMemo(() => getStepCount(service), [service])
  const [step, setStep] = useState(0)
  const [busy, setBusy] = useState(false)
  const [d, setD] = useState<Record<string, any>>({})
  const [images, setImages] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isFirst = step === 0
  const isLast = step === totalSteps - 1

  const set = (k: string, v: any) => setD(p => ({ ...p, [k]: v }))
  const v = (k: string) => (d[k] as string) ?? ''
  const arrHas = (key: string, val: string) => ((d[key] as string[]) ?? []).includes(val)
  const toggleArr = (key: string, val: string) => {
    const a = (d[key] as string[] | undefined) ?? []
    const s = new Set(a); if (s.has(val)) s.delete(val); else s.add(val)
    set(key, Array.from(s))
  }

  const tl = (key: string) => { try { return t(key) } catch { return key } }

  const validate = (): boolean => {
    if (isLast) {
      if (!d.nameFirstName || !d.emailAddress || !d.telephone) {
        toast.error(tl('wizard.validation.required'));
        return false;
      }
    }
    return true;
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
      <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-[#003366] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-white/50 transition-colors">
        <Upload className="w-8 h-8 text-[#003366] mb-2" />
        <span className="text-sm font-medium text-[#003366]">{tl('upload.button') || 'Click to select images'}</span>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple accept="image/*" className="hidden" />
      </div>
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative group">
              <div className="w-full h-20 bg-white rounded-lg border border-[#a8c8e8] flex items-center justify-center overflow-hidden">
                <span className="text-xs text-center px-2 truncate block w-full text-gray-600">{img.name}</span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); removeImage(i); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
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
      const payload = {
        serviceName, formType: service, locale,
        firstName: d.nameFirstName?.split(' ').slice(1).join(' ') || d.nameFirstName || '',
        name: d.nameFirstName?.split(' ')[0] || '',
        emailAddress: d.emailAddress || '',
        telephone: d.telephone || '',
        streetAndNumber: d.streetNo || '',
        postalCodeAndCity: d.zipCity || '',
        ...d
      }

      const formData = new FormData()
      formData.append('data', JSON.stringify(payload))
      formData.append('locale', locale)
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

  const formProps: FormStepProps = { step, d, set, tl, v, arrHas, toggleArr, ImageUpload }

  const renderCurrentStep = () => {
    switch (service) {
      case 'property-maintenance': return <PropertyMaintenanceForm {...formProps} />
      case 'final-cleaning': return <FinalCleaningForm {...formProps} />
      case 'house-cleaning': 
      case 'apartment-cleaning': 
      case 'stairwell-cleaning': 
      case 'office-cleaning': 
      case 'window-cleaning': 
      case 'medical-cleaning': 
        return <MaintenanceCleaningForm {...formProps} />
      case 'disposal': return <DisposalForm {...formProps} />
      case 'construction-cleaning': return <ConstructionCleaningForm {...formProps} />
      case 'gastronomy-cleaning': return <GastronomyCleaningForm {...formProps} />
      case 'relocation': return <RelocationForm {...formProps} />
      case 'household-helping': return <HouseholdHelpingForm {...formProps} />
      case 'combo-service': return <ComboServiceForm {...formProps} />
      case 'special-cleaning': return <SpecialCleaningForm {...formProps} />
      default: return <FinalCleaningForm {...formProps} />
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-[#003366]">{serviceName}</h2>
          <span className="text-sm font-medium text-[#5a7a9a]">{`${step + 1} / ${totalSteps}`}</span>
        </div>
        <div className="w-full bg-[#d4e4f4] rounded-full h-2">
          <div className="bg-[#003366] h-2 rounded-full transition-all duration-500" style={{ width: `${((step + 1) / totalSteps) * 100}%` }} />
        </div>
      </div>
      <div className="bg-[#dce9f5] rounded-2xl p-6 md:p-8 border border-[#b8d4eb]">
        {renderCurrentStep()}
      </div>
      <div className="flex justify-between mt-6">
        {!isFirst ? (
          <button onClick={goBack} className="px-6 py-2.5 bg-[#003366] text-white font-semibold rounded-lg hover:bg-[#002244] transition-colors text-sm">{tl('wizard.buttons.back') || 'Zurück'}</button>
        ) : <div />}
        {isLast ? (
          <button onClick={submit} disabled={busy} className="px-8 py-2.5 bg-[#003366] text-white font-semibold rounded-lg hover:bg-[#002244] transition-colors disabled:opacity-50 text-sm">
            {busy ? tl('wizard.buttons.submitting') : tl('wizard.buttons.submit')}
          </button>
        ) : (
          <button onClick={goNext} className="px-6 py-2.5 bg-[#003366] text-white font-semibold rounded-lg hover:bg-[#002244] transition-colors text-sm">{tl('wizard.buttons.next') || 'Weiter'}</button>
        )}
      </div>
    </div>
  )
}
