'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Layout from '@/components/Layout'
import SwissHero from '@/components/SwissHero'
import ServiceFormWizard, { ServiceSlug } from '@/components/ServiceFormWizard'

const allowedServices: ServiceSlug[] = [
  'house-cleaning',
  'apartment-cleaning',
  'stairwell-cleaning',
  'office-cleaning',
  'final-cleaning',
  'window-cleaning',
  'relocation',
  'disposal',
  'gastronomy-cleaning',
  'medical-cleaning',
  'construction-cleaning',
  'property-maintenance',
  'special-cleaning',
  'combo-service'
]

function isServiceSlug(value: string | null): value is ServiceSlug {
  if (!value) return false
  return (allowedServices as string[]).includes(value)
}

function getServiceName(t: ReturnType<typeof useTranslations>, service: ServiceSlug): string {
  switch (service) {
    case 'house-cleaning':
      return t('home.services.houseCleaning.title')
    case 'apartment-cleaning':
      return t('home.services.apartmentCleaning.title')
    case 'stairwell-cleaning':
      return t('home.services.stairwellCleaning.title')
    case 'office-cleaning':
      return t('home.services.officeCleaning.title')
    case 'final-cleaning':
      return t('home.services.finalCleaning.title')
    case 'window-cleaning':
      return t('home.services.windowCleaning.title')
    case 'relocation':
      return t('home.services.relocation.title')
    case 'disposal':
      return t('home.services.disposal.title')
    case 'gastronomy-cleaning':
      return t('home.services.gastronomyCleaning.title')
    case 'medical-cleaning':
      return t('home.services.medicalCleaning.title')
    case 'construction-cleaning':
      return t('home.services.constructionCleaning.title')
    case 'property-maintenance':
      return t('home.services.propertyMaintenance.title')
    case 'special-cleaning':
      return t('home.services.specialCleaning.title')
    case 'combo-service':
      return t('home.services.comboService.title')
    default:
      return t('services.title')
  }
}

export default function FormPage({ params: { locale } }: { params: { locale: string } }) {
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
        badge={t('servicesPages.common.requestQuote')}
        title={t('servicesPages.common.requestQuote')}
        subtitle={t('servicesCta.subtitle')}
        right={
          <div className="grid grid-cols-2 gap-4 p-6">
            <div className="card p-4 bg-swiss-softRed border border-swiss-border text-center">
              <div className="text-swiss-red font-bold text-lg">1</div>
              <div className="text-swiss-body text-sm">{t('serviceForm.wizard.steps.cleaningService')}</div>
            </div>
            <div className="card p-4 bg-swiss-softRed border border-swiss-border text-center">
              <div className="text-swiss-red font-bold text-lg">2</div>
              <div className="text-swiss-body text-sm">{t('serviceForm.wizard.steps.propertyDetails')}</div>
            </div>
            <div className="card p-4 bg-swiss-softRed border border-swiss-border text-center">
              <div className="text-swiss-red font-bold text-lg">3</div>
              <div className="text-swiss-body text-sm">{t('serviceForm.wizard.steps.contact')}</div>
            </div>
            <div className="card p-4 bg-swiss-softRed border border-swiss-border text-center">
              <div className="text-swiss-red font-bold text-lg">4</div>
              <div className="text-swiss-body text-sm">{t('serviceForm.wizard.buttons.submit')}</div>
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
