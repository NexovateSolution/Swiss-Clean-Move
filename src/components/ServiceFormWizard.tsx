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

export default function ServiceFormWizard({ service, serviceName, locale, isAdmin }: { service: ServiceSlug; serviceName: string; locale: string; isAdmin?: boolean }) {
  const t = useTranslations('serviceForm')
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [busy, setBusy] = useState(false)
  const [d, setD] = useState<Record<string, any>>({})
  const [images, setImages] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const isCombo = d.desiredService === 'moving-and-cleaning';
  const comboExtraSteps = isCombo ? 3 : 0;
  const totalSteps = useMemo(() => getStepCount(service) + (isAdmin ? 1 : 0) + comboExtraSteps, [service, isAdmin, comboExtraSteps])
  
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
    if (isAdmin && step === totalSteps - 1) {
      if (!d.totalPrice || !d.fromDate || !d.untilDate) {
        toast.error('Admin details missing (Price, Dates)');
        return false;
      }
    } else if (isAdmin ? (step === totalSteps - 2) : isLast) {
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
      if (isAdmin) {
        // Attempt to extract street, zip, and city from a solitary 'address' string if distinct fields are not present
        let finalAddress = d.streetNo || d.address || '';
        let finalZip = d.postalCode || d.zipCity?.split(' ')[0] || '';
        let finalCity = d.location || d.zipCity?.split(' ').slice(1).join(' ') || '';
        
        if (d.address && !d.streetNo && !d.postalCode && !d.location) {
           const match = d.address.match(/(.+?)(?:,\s*|\s+)(\d{4})\s+(.+)/);
           if (match) {
               finalAddress = match[1].trim();
               finalZip = match[2];
               finalCity = match[3].trim();
           }
        }

        const payload = {
            firstName: d.nameFirstName?.split(' ').slice(1).join(' ') || d.nameFirstName || '',
            lastName: d.nameFirstName?.split(' ')[0] || '',
            email: d.emailAddress || '',
            phone: d.telephone || '',
            address: finalAddress,
            postalCode: finalZip,
            location: finalCity,
            squareMeters: d.livingSpace || d.area || 0,
            serviceType: serviceName,
            buildingType: d.objectType || d.currentLiving || 'Other',
            fromDate: d.fromDate,
            untilDate: d.untilDate,
            totalPrice: d.totalPrice,
            paidAmount: d.paidAmount || 0,
            remarks1: Object.entries(d).filter(([k]) => !['totalPrice', 'paidAmount', 'fromDate', 'untilDate', 'nameFirstName', 'emailAddress', 'telephone', 'streetNo', 'zipCity', 'address'].includes(k)).map(([k,v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join(' | '),
            data: d
        }
        
        const res = await fetch('/api/admin/clients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        if (!res.ok) throw new Error('fail')
        toast.success('Project stored successfully')
        router.push('/admin/clients')
      } else {
        let finalAddress = d.streetNo || d.address || '';
        let finalZipCity = d.zipCity || '';
        if (d.address && !d.streetNo && !d.zipCity) {
           const match = d.address.match(/(.+?)(?:,\s*|\s+)(\d{4})\s+(.+)/);
           if (match) {
               finalAddress = match[1].trim();
               finalZipCity = `${match[2]} ${match[3].trim()}`;
           }
        }

        const payload = {
          serviceName, formType: service, locale,
          firstName: d.nameFirstName?.split(' ').slice(1).join(' ') || d.nameFirstName || '',
          name: d.nameFirstName?.split(' ')[0] || '',
          emailAddress: d.emailAddress || '',
          telephone: d.telephone || '',
          streetAndNumber: finalAddress,
          postalCodeAndCity: finalZipCity,
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
      }
    } catch { toast.error(tl('toasts.submitFailedRetry')) } finally { setBusy(false) }
  }

  const formProps: FormStepProps = { step, d, set, tl, v, arrHas, toggleArr, ImageUpload, service }

  const renderCurrentStep = () => {
    if (isAdmin && step === totalSteps - 1) {
      return (
        <div>
          <h3 className="text-xl font-bold text-[#003366] mb-6">Admin Dashboard: Finalizing Project Setup</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="mb-2">
                <label className="block text-sm font-bold text-[#003366] mb-2">Total Price (CHF) *</label>
                <input type="number" step="0.01" value={v('totalPrice')} onChange={e => set('totalPrice', e.target.value)} className="w-full px-4 py-3 border-2 border-[#a8c8e8] rounded-lg bg-white" placeholder="0.00" required />
             </div>
             <div className="mb-2">
                <label className="block text-sm font-bold text-[#003366] mb-2">Paid Amount (CHF)</label>
                <input type="number" step="0.01" value={v('paidAmount')} onChange={e => set('paidAmount', e.target.value)} className="w-full px-4 py-3 border-2 border-[#a8c8e8] rounded-lg bg-white" placeholder="0.00" />
             </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
             <div className="mb-2">
                <label className="block text-sm font-bold text-[#003366] mb-2">Project Execution Start *</label>
                <input type="datetime-local" value={v('fromDate')} onChange={e => set('fromDate', e.target.value)} className="w-full px-4 py-3 border-2 border-[#a8c8e8] rounded-lg bg-white" required />
             </div>
             <div className="mb-2">
                <label className="block text-sm font-bold text-[#003366] mb-2">Project Execution End *</label>
                <input type="datetime-local" value={v('untilDate')} onChange={e => set('untilDate', e.target.value)} className="w-full px-4 py-3 border-2 border-[#a8c8e8] rounded-lg bg-white" required />
             </div>
          </div>
        </div>
      )
    }

    const baseSteps = getStepCount(service);
    
    // Determine which step and form to render
    let actualFormProps = { ...formProps };
    
    if (isCombo) {
      if (step < baseSteps - 1) {
         // Clean steps
         actualFormProps.step = step;
      } else if (step >= baseSteps - 1 && step < baseSteps - 1 + 3) {
         // Relocation step 0, 1, 2
         actualFormProps.step = step - (baseSteps - 1);
         return <RelocationForm {...actualFormProps} />;
      } else if (step === baseSteps - 1 + 3) {
         // The contact step (last step of base form)
         actualFormProps.step = baseSteps - 1;
      }
    }

    switch (service) {
      case 'property-maintenance': return <PropertyMaintenanceForm {...actualFormProps} />
      case 'final-cleaning': return <FinalCleaningForm {...actualFormProps} />
      case 'house-cleaning': 
      case 'apartment-cleaning': 
      case 'stairwell-cleaning': 
      case 'office-cleaning': 
      case 'window-cleaning': 
      case 'medical-cleaning': 
        return <MaintenanceCleaningForm {...actualFormProps} />
      case 'disposal': return <DisposalForm {...actualFormProps} />
      case 'construction-cleaning': return <ConstructionCleaningForm {...actualFormProps} />
      case 'gastronomy-cleaning': return <GastronomyCleaningForm {...actualFormProps} />
      case 'relocation': return <RelocationForm {...actualFormProps} />
      case 'household-helping': return <HouseholdHelpingForm {...actualFormProps} />
      case 'combo-service': return <ComboServiceForm {...actualFormProps} />
      case 'special-cleaning': return <SpecialCleaningForm {...actualFormProps} />
      default: return <FinalCleaningForm {...actualFormProps} />
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

// force refresh wizard
