import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Layout from '@/components/Layout'
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
      <section className="relative bg-gradient-to-br from-swiss-blue to-swiss-green text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-max py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Sparkles className="w-16 h-16 mx-auto text-blue-100" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {t('services.title')}
            </h1>
            <p className="text-xl text-blue-100">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-8">
            {cleaningServices.map(({ key, icon: Icon }) => (
              <div key={key} className="card p-8">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-swiss-blue rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{t(`home.services.${key}.title`)}</h3>
                </div>
                <p className="text-swiss-gray-600 mb-4">{t(`home.services.${key}.description`)}</p>
                <Link href={`/${locale}/free-offer`} className="inline-flex items-center text-swiss-blue font-medium">
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
