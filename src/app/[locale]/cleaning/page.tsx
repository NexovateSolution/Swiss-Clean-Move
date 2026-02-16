import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Layout from '@/components/Layout'
import SwissHero from '@/components/SwissHero'
import { Sparkles, CheckCircle, ArrowRight, Home as HomeIcon, Building2, Briefcase } from 'lucide-react'

export default function CleaningPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()

  const cleaningServices = [
    { key: 'finalCleaning', icon: CheckCircle },
    { key: 'houseCleaning', icon: HomeIcon },
    { key: 'apartmentCleaning', icon: Building2 },
    { key: 'officeCleaning', icon: Briefcase },
  ] as const

  return (
    <Layout>
      <SwissHero
        badge={t('services.title')}
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        right={
          <div className="w-full h-[340px] md:h-[420px] bg-swiss-section flex items-center justify-center">
            <div className="w-20 h-20 bg-swiss-softRed rounded-3xl flex items-center justify-center mx-auto border border-swiss-border shadow-subtle">
              <Sparkles className="w-10 h-10 text-swiss-red" />
            </div>
          </div>
        }
      />

      <section className="section-padding">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-8">
            {cleaningServices.map(({ key, icon: Icon }) => (
              <div key={key} className="card p-8">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-swiss-gray-50 border border-swiss-border rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-swiss-body" />
                  </div>
                  <h3 className="text-xl font-semibold text-swiss-text">{t(`home.services.${key}.title`)}</h3>
                </div>
                <p className="text-swiss-body mb-4">{t(`home.services.${key}.description`)}</p>
                <Link href={`/${locale}/free-offer`} className="inline-flex items-center text-swiss-red font-medium">
                  <span>{t('common.getFreeQuote')}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
