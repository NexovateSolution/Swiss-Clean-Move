import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { Wrench, CheckCircle, ArrowRight } from 'lucide-react'

export default function PropertyMaintenancePage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()
  const features = (t.raw('services.features.propertyMaintenance') as string[]) || []

  return (
    <Layout>
      <section className="relative bg-gradient-to-br from-swiss-blue to-swiss-green text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-max py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Wrench className="w-16 h-16 mx-auto text-blue-100" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {t('home.services.propertyMaintenance.title')}
            </h1>
            <p className="text-xl text-blue-100">
              {t('home.services.propertyMaintenance.description')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-swiss-gray-800 mb-4">{t('services.benefitsSection.title')}</h2>
                <ul className="space-y-3">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center space-x-2 text-swiss-gray-700">
                      <CheckCircle className="w-5 h-5 text-swiss-green" />
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
