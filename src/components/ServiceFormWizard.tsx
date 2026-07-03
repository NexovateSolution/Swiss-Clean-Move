'use client'

import { useMemo, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import toast from 'react-hot-toast'
import { Upload, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateQuote } from '@/utils/pricingEngine'

// Imports of the forms
import { MaintenanceCleaningForm } from './service-forms/ServiceFormsPart1'
import { DisposalForm } from './service-forms/ServiceFormsPart2'
import { RelocationForm, HouseholdHelpingForm, ComboServiceForm } from './service-forms/ServiceFormsPart3'
import { UnifiedMovingCleaningForm } from './service-forms/UnifiedMovingCleaningForm'
import { FacilityServicesForm } from './service-forms/FacilityServicesForm'
import { FormStepProps } from './FormControls'

export type ServiceSlug =
  | 'house-cleaning' | 'window-cleaning'
  | 'relocation' | 'disposal'
  | 'household-helping'
  | 'facility-services'
  // Legacy slugs that redirect to facility-services
  | 'stairwell-cleaning'
  | 'final-cleaning' | 'gastronomy-cleaning' | 'medical-cleaning'
  | 'construction-cleaning' | 'special-cleaning'

// Legacy slugs that should use facility-services form
const facilityLegacySlugs = ['stairwell-cleaning', 'final-cleaning', 'gastronomy-cleaning', 'medical-cleaning', 'construction-cleaning', 'special-cleaning'];

function isFacilityService(s: ServiceSlug): boolean {
  return s === 'facility-services' || facilityLegacySlugs.includes(s);
}

function getStepCount(s: ServiceSlug): number {
  if (isFacilityService(s)) return 2
  if (['house-cleaning', 'window-cleaning'].includes(s)) return 4
  if (s === 'disposal') return 4
  if (s === 'relocation') return 4
  if (s === 'household-helping') return 5
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
  
  const isUnified = ['relocation', 'house-cleaning'].includes(service);
  const reqType = (d.requestType as string) || (['relocation'].includes(service) ? 'moving' : 'cleaning');
  
  const baseSteps = useMemo(() => {
    if (isUnified) {
      if (reqType === 'moving') return 5;
      if (reqType === 'cleaning') return 6;
      if (reqType === 'combo') return 7;
      if (reqType === 'transport') return 5;
    }
    // old logic fallback:
    const isCombo = d.desiredService === 'moving-and-cleaning';
    return getStepCount(service) + (isCombo ? 3 : 0);
  }, [isUnified, reqType, service, d.desiredService]);

  const totalSteps = useMemo(() => baseSteps + (isAdmin ? 1 : 0), [baseSteps, isAdmin])
  
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
    <div className="mt-6 border-t border-swiss-border pt-6">
      <h3 className="text-swiss-text font-semibold mb-2">{tl('upload.title') || 'Upload Pictures, Floorplans or Documents'}</h3>
      <p className="text-sm text-swiss-body mb-4">{tl('upload.description') || 'Attach photos, floorplans, or handover documents to help us provide a more accurate quote.'}</p>
      <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-swiss-border rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-swiss-gray-50 hover:border-swiss-red transition-all">
        <Upload className="w-8 h-8 text-swiss-red mb-2" />
        <span className="text-sm font-medium text-swiss-text">{tl('upload.button') || 'Click to select files (Images/PDFs)'}</span>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple accept="image/*,.pdf" className="hidden" />
      </div>
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative group">
              <div className="w-full h-20 bg-white rounded-lg border border-swiss-border flex items-center justify-center overflow-hidden relative">
                {img.type.startsWith('image/') ? (
                  <img src={URL.createObjectURL(img)} alt={img.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-center px-2 truncate block w-full text-swiss-body">{img.name}</span>
                )}
              </div>
              <button onClick={(e) => { e.stopPropagation(); removeImage(i); }} className="absolute -top-2 -right-2 bg-swiss-red text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
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
        let rawZipCity = d.moveFromZipCity || d.cleanZipCity || d.zipCity || '';
        let finalAddress = d.moveFromStreet || d.cleanStreet || d.streetNo || d.address || '';
        let finalZip = d.postalCode || rawZipCity.split(' ')[0] || '';
        let finalCity = d.location || rawZipCity.split(' ').slice(1).join(' ') || '';
        
        if (d.address && !d.moveFromStreet && !d.cleanStreet && !d.streetNo && !d.postalCode && !d.location) {
           const match = d.address.match(/(.+?)(?:,\s*|\s+)(\d{4})\s+(.+)/);
           if (match) {
               finalAddress = match[1].trim();
               finalZip = match[2];
               finalCity = match[3].trim();
           }
        }

        let mappedServiceType = serviceName;
        if (d.unifiedRequestType) {
            mappedServiceType = d.unifiedRequestType === 'combo' ? 'Moving + Cleaning' :
                                d.unifiedRequestType === 'moving' ? 'Moving' : 'Moving cleaning';
        }

        let rawBuildingType = d.sharedPropertyType || d.objectType || d.currentLiving || 'Other';
        let mappedBuildingType = typeof rawBuildingType === 'string' ? rawBuildingType.charAt(0).toUpperCase() + rawBuildingType.slice(1) : 'Other';

        const payload = {
            firstName: d.nameFirstName?.split(' ').slice(1).join(' ') || d.nameFirstName || '',
            lastName: d.nameFirstName?.split(' ')[0] || '',
            email: d.emailAddress || '',
            phone: d.telephone || '',
            address: finalAddress,
            postalCode: finalZip,
            location: finalCity,
            squareMeters: Number(d.sharedLivingArea) || Number(d.livingSpace) || Number(d.area) || 0,
            serviceType: mappedServiceType,
            buildingType: mappedBuildingType,
            fromDate: d.fromDate,
            untilDate: d.untilDate,
            totalPrice: d.totalPrice,
            paidAmount: d.paidAmount || 0,
            remarks1: Object.entries(d).filter(([k]) => !['totalPrice', 'paidAmount', 'fromDate', 'untilDate', 'nameFirstName', 'emailAddress', 'telephone', 'streetNo', 'zipCity', 'address', 'moveFromStreet', 'cleanStreet', 'moveFromZipCity', 'cleanZipCity'].includes(k)).map(([k,v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join(' | '),
            data: d
        }
        
        const formData = new FormData()
        formData.append('data', JSON.stringify(payload))
        images.forEach((file) => {
          formData.append('images', file)
        })

        const res = await fetch('/api/admin/clients', {
          method: 'POST',
          body: formData
        })
        if (!res.ok) throw new Error('fail')
        toast.success('Project stored successfully')
        router.push('/admin/clients')
      } else {
        let rawZipCity = d.moveFromZipCity || d.cleanZipCity || d.zipCity || '';
        let finalAddress = d.moveFromStreet || d.cleanStreet || d.streetNo || d.address || '';
        let finalZipCity = rawZipCity || '';
        if (d.address && !d.moveFromStreet && !d.cleanStreet && !d.streetNo && !rawZipCity) {
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
        
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', {
            event_category: 'form_submission',
            event_label: serviceName,
            value: 1
          });
        }

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

    // Determine which step and form to render
    let actualFormProps = { ...formProps };
    
    // Facility Services form (new unified form + legacy redirects)
    if (isFacilityService(service)) {
       return <FacilityServicesForm {...actualFormProps} />;
    }

    // Unified form logic
    if (isUnified) {
       return <UnifiedMovingCleaningForm {...actualFormProps} />;
    }

    // Legacy old logic fallback for other services
    const oldIsCombo = d.desiredService === 'moving-and-cleaning';
    if (oldIsCombo) {
      if (step < getStepCount(service) - 1) {
         // Clean steps
         actualFormProps.step = step;
      } else if (step >= getStepCount(service) - 1 && step < getStepCount(service) - 1 + 3) {
         // Relocation step 0, 1, 2
         actualFormProps.step = step - (getStepCount(service) - 1);
         return <RelocationForm {...actualFormProps} />;
      } else if (step === getStepCount(service) - 1 + 3) {
         // The contact step (last step of base form)
         actualFormProps.step = getStepCount(service) - 1;
      }
    }

    switch (service) {
      case 'house-cleaning': 
      case 'window-cleaning': 
        return <MaintenanceCleaningForm {...actualFormProps} />
      case 'disposal': return <DisposalForm {...actualFormProps} />
      case 'household-helping': return <HouseholdHelpingForm {...actualFormProps} />
      default: return <MaintenanceCleaningForm {...actualFormProps} />
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-swiss-text">{serviceName}</h2>
          <span className="text-sm font-medium text-swiss-body">{`${step + 1} / ${totalSteps}`}</span>
        </div>
        <div className="w-full bg-swiss-gray-100 rounded-full h-2">
          <div className="bg-swiss-red h-2 rounded-full transition-all duration-500" style={{ width: `${((step + 1) / totalSteps) * 100}%` }} />
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-swiss-border shadow-subtle relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentStep()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex justify-between mt-6">
        {!isFirst ? (
          <button onClick={goBack} className="px-6 py-2.5 bg-swiss-section border border-swiss-border text-swiss-text font-semibold rounded-lg hover:bg-swiss-gray-50 transition-colors text-sm">{tl('wizard.buttons.back') || 'Zurück'}</button>
        ) : <div />}
        {isLast ? (
          <button onClick={submit} disabled={busy} className="btn-primary px-8 py-2.5 disabled:opacity-50 text-sm">
            {busy ? tl('wizard.buttons.submitting') : tl('wizard.buttons.submit')}
          </button>
        ) : (
          <button onClick={goNext} className="btn-primary px-6 py-2.5 text-sm">{tl('wizard.buttons.next') || 'Weiter'}</button>
        )}
      </div>
    </div>
  )
}

// force refresh wizard
