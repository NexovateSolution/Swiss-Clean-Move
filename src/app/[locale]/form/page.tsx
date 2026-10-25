'use client'

import { useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Layout from '@/components/Layout'
import SwissHero from '@/components/SwissHero'
import ServiceFormWizard, { ServiceSlug } from '@/components/ServiceFormWizard'

const allowedServices: ServiceSlug[] = [
  'house-cleaning',
  'window-cleaning',
  'relocation',
  'disposal',
  'household-helping',
  'facility-services',
  // Legacy slugs
  'stairwell-cleaning',
  'final-cleaning',
  'gastronomy-cleaning',
  'medical-cleaning',
  'construction-cleaning',
  'special-cleaning'
]

function isServiceSlug(value: string | null): value is ServiceSlug {
  if (!value) return false
  return (allowedServices as string[]).includes(value)
}

function getServiceName(t: ReturnType<typeof useTranslations>, service: ServiceSlug): string {
  switch (service) {
    case 'house-cleaning':
      return t('home.services.houseCleaning.title')
    case 'window-cleaning':
      return t('home.services.windowCleaning.title')
    case 'relocation':
      return t('home.services.relocation.title')
    case 'disposal':
      return t('home.services.disposal.title')
    case 'household-helping':
      return t('home.services.householdHelping.title')
    case 'facility-services':
      return t('home.services.facilityServices.title')
    // Legacy mapping
    case 'stairwell-cleaning':
      return t('home.services.stairwellCleaning.title')
    case 'final-cleaning':
      return t('home.services.finalCleaning.title')
    case 'gastronomy-cleaning':
      return t('home.services.gastronomyCleaning.title')
    case 'medical-cleaning':
      return t('home.services.medicalCleaning.title')
    case 'construction-cleaning':
      return t('home.services.constructionCleaning.title')
    case 'special-cleaning':
      return t('home.services.specialCleaning.title')
    default:
      return t('services.title')
  }
}

function FormContent({ locale }: { locale: string }) {
  const t = useTranslations()
  const searchParams = useSearchParams()

  const service = useMemo(() => {
    const value = searchParams.get('service')
    return isServiceSlug(value) ? value : 'house-cleaning'
  }, [searchParams])

  const serviceName = useMemo(() => getServiceName(t, service), [t, service])

  return (
    <Layout>
      <SwissHero
        badge={serviceName}
        title={serviceName}
        subtitle={t('serviceForm.wizard.subtitle')}
        right={
          <div className="grid grid-cols-2 gap-4 p-6">
            <div className="card p-4 bg-swiss-softRed border border-swiss-border text-center">
              <div className="text-swiss-red font-bold text-lg">1</div>
              <div className="text-swiss-body text-sm">{t('serviceForm.wizard.stepTitles.property')}</div>
            </div>
            <div className="card p-4 bg-swiss-softRed border border-swiss-border text-center">
              <div className="text-swiss-red font-bold text-lg">2</div>
              <div className="text-swiss-body text-sm">{t('serviceForm.wizard.stepTitles.date_frequency')}</div>
            </div>
            <div className="card p-4 bg-swiss-softRed border border-swiss-border text-center">
              <div className="text-swiss-red font-bold text-lg">3</div>
              <div className="text-swiss-body text-sm">{t('serviceForm.wizard.stepTitles.contact')}</div>
            </div>
            <div className="card p-4 bg-swiss-softRed border border-swiss-border text-center flex items-center justify-center">
              <div className="text-swiss-red font-bold text-sm leading-tight">{t('serviceForm.wizard.stepTitles.fast_offer')}</div>
            </div>
          </div>
        }
      />
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <ServiceFormWizard service={service} serviceName={serviceName} locale={locale} />
        </div>
      </section>
    </Layout>
  )
}

export default function FormPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <Suspense fallback={
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 rounded-full border-4 border-swiss-red border-t-transparent animate-spin mb-4"></div>
            <div className="text-swiss-body">Loading...</div>
          </div>
        </div>
      </Layout>
    }>
      <FormContent locale={locale} />
    </Suspense>
  )
}
