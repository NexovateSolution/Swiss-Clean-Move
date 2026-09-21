'use client'

import { useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Layout from '@/components/Layout'
import SwissHero from '@/components/SwissHero'
import UniversalQuoteForm from '@/components/universal-form/UniversalQuoteForm'

function FormContent({ locale }: { locale: string }) {
  const t = useTranslations()
  const searchParams = useSearchParams()

  const preselectedService = useMemo(() => {
    return searchParams.get('service') || undefined
  }, [searchParams])

  const title = t('universalForm.title')
  const subtitle = t('universalForm.subtitle')

  return (
    <Layout>
      <section className="bg-swiss-section pb-12 pt-4">
        <div className="container-max">
          <UniversalQuoteForm 
            locale={locale} 
            preselectedService={preselectedService} 
            renderHeader={(stepsNode) => (
              <SwissHero
                badge={title}
                title={title}
                subtitle={subtitle}
                className="mb-8"
                right={stepsNode}
              />
            )}
          />
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
