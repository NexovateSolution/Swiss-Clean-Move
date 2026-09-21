// Force recompile
'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import toast from 'react-hot-toast'
import { trackConversion } from '@/lib/gtag'

import CustomerDetailsSlice from './slices/CustomerDetailsSlice'
import ServiceSelectionSlice from './slices/ServiceSelectionSlice'
import PropertyLocationSlice from './slices/PropertyLocationSlice'
import DateContactSlice from './slices/DateContactSlice'
import CleaningDetailsSlice from './slices/CleaningDetailsSlice'
import MovingDetailsSlice from './slices/MovingDetailsSlice'
import ReviewSubmitSlice from './slices/ReviewSubmitSlice'
import AdminPricingSlice from './slices/AdminPricingSlice'
import { SectionTitle } from './SectionTitle'

import {
  UniversalFormData,
  initialUniversalFormData,
  FormSliceProps,
  hasCleaningService,
  hasMovingService
} from './types'

// Map URL ?service= slugs to internal service keys
const SERVICE_SLUG_MAP: Record<string, string[]> = {
  'house-cleaning': ['maintenanceCleaning'],
  'window-cleaning': ['windowCleaning'],
  'relocation': ['movingTransport'],
  'umzug': ['movingTransport'],
  'disposal': ['disposalClearance'],
  'household-helping': ['maintenanceCleaning'],
  'facility-services': ['caretaking'],
  'stairwell-cleaning': ['stairwellCleaning'],
  'final-cleaning': ['movingOutCleaning'],
  'endreinigung': ['movingOutCleaning'],
  'gastronomy-cleaning': ['restaurantCleaning'],
  'medical-cleaning': ['officeCleaning'],
  'construction-cleaning': ['constructionCleaning'],
  'special-cleaning': ['specialistCleaning'],
  'reinigung': ['maintenanceCleaning'],
  'hauswartung': ['caretaking'],
  'entsorgung': ['disposalClearance']
};

interface UniversalQuoteFormProps {
  locale: string;
  preselectedService?: string;
  renderHeader?: (stepsNode: React.ReactNode) => React.ReactNode;
  isAdmin?: boolean;
}

export default function UniversalQuoteForm({ locale, preselectedService, renderHeader, isAdmin }: UniversalQuoteFormProps) {
  const t = useTranslations()
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [images, setImages] = useState<File[]>([])

  const [data, setData] = useState<UniversalFormData>(() => {
    const initial = { ...initialUniversalFormData };
    if (preselectedService && SERVICE_SLUG_MAP[preselectedService]) {
      initial.services = [...SERVICE_SLUG_MAP[preselectedService]];
    }
    return initial;
  });

  const updateData = useCallback((updates: Partial<UniversalFormData>) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);

  const tl = (key: string, values?: any) => {
    try { return t(key, values); } catch { return key; }
  };

  // Build dynamic steps based on selected services
  const steps = useMemo(() => {
    const base = [
      { key: 'customer', label: tl('universalForm.steps.customer'), num: '1' },
      { key: 'services', label: tl('universalForm.steps.services'), num: '2' },
      { key: 'property', label: tl('universalForm.steps.property'), num: '3' },
      { key: 'dateContact', label: tl('universalForm.steps.dateContact'), num: '4' }
    ];

    if (hasCleaningService(data.services)) {
      base.push({ key: 'cleaning', label: tl('universalForm.steps.cleaning'), num: '5' });
    }
    if (hasMovingService(data.services)) {
      base.push({ key: 'moving', label: tl('universalForm.steps.moving'), num: hasCleaningService(data.services) ? '6' : '5' });
    }

    if (isAdmin) {
      base.push({ key: 'adminPricing', label: 'Admin Pricing', num: `${base.length + 1}` });
    } else {
      base.push({ key: 'review', label: tl('universalForm.steps.review'), num: '' });
    }

    return base;
  }, [data.services, tl, isAdmin, locale]);

  const sliceProps: FormSliceProps = { data, updateData, t: tl };

  // Validation per step
  const validateAll = (): boolean => {
    if (!data.firstName && !data.name) {
      toast.error(tl('universalForm.validation.name') || 'Bitte Name angeben / Please provide your name');
      return false;
    }
    if (!data.emailAddress) {
      toast.error(tl('universalForm.validation.email') || 'Bitte E-Mail angeben / Please provide your email');
      return false;
    }
    if (!data.telephone) {
      toast.error(tl('universalForm.validation.phone') || 'Bitte Telefon angeben / Please provide your phone');
      return false;
    }
    if (data.services.length === 0) {
      toast.error(tl('universalForm.validation.services') || 'Bitte mindestens eine Dienstleistung wählen / Please select at least one service');
      return false;
    }
    if (!isAdmin && !data.agreeToTerms) {
      toast.error(tl('universalForm.validation.terms') || 'Bitte Einwilligung bestätigen / Please confirm consent');
      return false;
    }
    return true;
  };

  // Build the submission payload mapped to existing API structure
  const buildPayload = () => {
    // Compute a serviceName from the selected services
    const serviceNames = data.services.map(s => {
      try { return t(`universalForm.services.${s}`); } catch { return s; }
    });
    const serviceName = serviceNames.join(' + ') || 'Universal Quote';

    // Determine formType for backward compat
    let formType = 'universal';
    if (hasMovingService(data.services) && hasCleaningService(data.services)) {
      formType = 'moving-and-cleaning';
    } else if (hasMovingService(data.services)) {
      formType = 'relocation';
    } else if (hasCleaningService(data.services)) {
      formType = 'cleaning';
    }

    // Combine firstName + name for legacy "nameFirstName" field
    const nameFirstName = `${data.name} ${data.firstName}`.trim();

    return {
      ...data,
      serviceName,
      formType,
      locale,
      firstName: data.firstName,
      name: data.name,
      nameFirstName,
      emailAddress: data.emailAddress,
      telephone: data.telephone,
      streetAndNumber: data.streetAndNumber,
      postalCodeAndCity: data.postalCodeAndCity,
      contactPreferredVia: data.contactPreferredVia,
      viewingIsWelcome: data.viewingIsWelcome,
      remark: data.remark || data.additionalDetails,
      // Remove File objects from JSON (they go in FormData separately)
      images: undefined
    };
  };

  const submit = async () => {
    if (!validateAll()) return;
    setBusy(true);
    try {
      if (isAdmin) {
        // Admin submission logic
        const rawZipCity = data.postalCodeAndCity || '';
        const finalZip = rawZipCity.split(' ')[0] || '';
        const finalCity = rawZipCity.split(' ').slice(1).join(' ') || '';

        const serviceNames = data.services.map(s => {
          try { return tl(`universalForm.services.${s}`) || s; } catch { return s; }
        });
        const mappedServiceType = serviceNames.join(', ') || 'Service';
        const mappedBuildingType = data.propertyType || 'Other';

        const nameParts = (data.name || '').trim().split(' ');
        const fName = data.firstName || (nameParts.length > 1 ? nameParts[0] : '') || '';
        const lName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : (data.name || '');

        const payload = {
            firstName: fName,
            lastName: lName,
            email: data.emailAddress || '',
            phone: data.telephone || '',
            address: data.streetAndNumber || '',
            postalCode: finalZip,
            location: finalCity,
            squareMeters: Number(data.livingSpaceInM2) || 0,
            serviceType: mappedServiceType,
            buildingType: mappedBuildingType.charAt(0).toUpperCase() + mappedBuildingType.slice(1),
            fromDate: data.fromDate,
            untilDate: data.untilDate,
            totalPrice: data.totalPrice || '0.00',
            paidAmount: data.paidAmount || 0,
            remarks1: data.remark || data.additionalDetails || '',
            numberOfRooms: data.numberOfRooms || '',
            floor: data.floors || '',
            elevator: data.lift === 'yes' ? 'Yes' : (data.lift === 'no' ? 'No' : ''),
            deploymentFrequency: data.recurringFrequency || '',
            data: data
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
        // Client submission logic
        const payload = buildPayload();

        const formData = new FormData();
        formData.append('data', JSON.stringify(payload));
        formData.append('locale', locale);
        images.forEach(file => {
          formData.append('images', file);
        });

        const res = await fetch('/api/service-forms', {
          method: 'POST',
          body: formData
        });

        if (!res.ok) throw new Error('Submit failed');

        // ✅ Conversion fires ONLY after successful submission
        await trackConversion('QUOTE_WIZARD_COMPLETE');

        // Redirect to localized thank-you page
        const thankYouPaths: Record<string, string> = {
          de: '/de/danke',
          en: '/en/thank-you',
          fr: '/fr/merci',
          it: '/it/grazie'
        };
        router.push(thankYouPaths[locale] || '/de/danke');
      }
    } catch {
      toast.error('Fehler beim Senden. Bitte erneut versuchen. / Submission failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const stepsNode = (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
      {steps.map(step => (
        <button
          key={step.key}
          onClick={() => {
            const el = document.getElementById(step.key);
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }}
          className="bg-[#fdf3f5] border border-red-50 rounded-xl p-3 text-center hover:bg-red-50 transition-colors flex flex-col justify-center items-center min-h-[70px]"
        >
          {step.num ? (
            <>
              <div className="text-swiss-red font-bold text-lg mb-0.5">{step.num}</div>
              <div className="text-[#4A5568] text-xs font-medium leading-tight">{step.label}</div>
            </>
          ) : (
            <div className="text-swiss-red font-bold text-xs">{step.label}</div>
          )}
        </button>
      ))}
    </div>
  );

  const formContent = (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 mt-4">
      <div className="bg-white p-2 md:p-4 flex flex-col gap-12">


        <div id="customer">
          <SectionTitle number="1" title={tl('universalForm.steps.customer')} />
          <CustomerDetailsSlice {...sliceProps} />
        </div>
        
        <div id="services">
          <SectionTitle number="2" title={tl('universalForm.steps.services')} />
          <ServiceSelectionSlice {...sliceProps} />
        </div>

        <div id="property">
          <SectionTitle number="3A" title={tl('universalForm.steps.property')} />
          <PropertyLocationSlice {...sliceProps} />
        </div>

        <div id="dateContact">
          <SectionTitle number="3B" title={tl('universalForm.steps.dateContact')} />
          <DateContactSlice {...sliceProps} />
        </div>

        {hasCleaningService(data.services) && (
          <div id="cleaning">
            <CleaningDetailsSlice {...sliceProps} />
          </div>
        )}

        {hasMovingService(data.services) && (
          <div id="moving">
            <MovingDetailsSlice {...sliceProps} />
          </div>
        )}

        {isAdmin && (
          <div id="adminPricing">
            <SectionTitle number="5" title="Admin Pricing & Setup" />
            <AdminPricingSlice {...sliceProps} />
          </div>
        )}

        {!isAdmin && (
          <div id="review">
            <SectionTitle number="5" title={tl('universalForm.steps.review')} />
            <ReviewSubmitSlice {...sliceProps} images={images} onImagesChange={setImages} />
          </div>
        )}

      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={submit}
          disabled={busy}
          className="bg-swiss-red hover:bg-red-700 text-white font-bold px-12 py-3 rounded-sm disabled:opacity-50 text-base transition-colors"
        >
          {busy 
            ? tl('wizard.buttons.submitting') 
            : (isAdmin ? 'Create Project' : tl('universalForm.buttons.submitRequest', 'Submit Request'))
          }
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {renderHeader ? renderHeader(stepsNode) : (
        <div className="max-w-4xl mx-auto mt-8 mb-4 px-2 md:px-4">
          {stepsNode}
        </div>
      )}
      {formContent}
    </div>
  );
}
