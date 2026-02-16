import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Layout from '@/components/Layout'
import SwissHero from '@/components/SwissHero'
import { Truck, CheckCircle, ArrowRight } from 'lucide-react'

export default function MovingPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()
  const features = (t.raw('services.features.relocation') as string[]) || []

  return (
    <Layout>
      <SwissHero
        badge={t('home.services.relocation.title')}
        title={t('home.services.relocation.title')}
        subtitle={t('home.services.relocation.description')}
        right={
          <div className="w-full h-[340px] md:h-[420px] bg-swiss-section flex items-center justify-center">
            <div className="w-20 h-20 bg-swiss-softRed rounded-3xl flex items-center justify-center mx-auto border border-swiss-border shadow-subtle">
              <Truck className="w-10 h-10 text-swiss-red" />
            </div>
          </div>
        }
      />

      <section className="section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-swiss-gray-800 mb-4">{t('services.benefitsSection.title')}</h2>
                <ul className="space-y-3">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center space-x-2 text-swiss-gray-700">
                      <CheckCircle className="w-5 h-5 text-swiss-red" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-3">{t('pricing.title')}</h3>
                <p className="text-swiss-gray-600 mb-4">{t('pricing.subtitle')}</p>
                <Link href={`/${locale}/free-offer`} className="btn-primary w-full inline-flex items-center justify-center">
                  <span>{t('common.getFreeQuote')}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
