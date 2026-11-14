import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import SwissHero from '@/components/SwissHero'
import { Sparkles, CheckCircle, ArrowRight, Home as HomeIcon, Building2, Briefcase, Phone } from 'lucide-react'

export default function CleaningPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()

  const cleaningServices = [
    { key: 'facilityServices', icon: CheckCircle },
    { key: 'houseCleaning', icon: HomeIcon },
    { key: 'windowCleaning', icon: Building2 },
  ] as const

  return (
    <Layout>
      <SwissHero
        badge={t('services.title')}
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-start">
            <Link
              href={`/${locale}/free-offer`}
              className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2"
            >
              <span>{t('common.getFreeQuote')}</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
            <a
              href="tel:+41782158030"
              className="btn-secondary text-lg px-6 py-4 inline-flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5 text-swiss-red" />
              <span>+41 78 215 80 30</span>
            </a>
          </div>
        }
        right={
          <div className="w-full h-[340px] md:h-[420px] bg-swiss-section flex items-center justify-center relative rounded-2xl overflow-hidden shadow-subtle border border-swiss-border">
            <Image
              src="/Gallary/2.jpeg"
              alt={t('services.title')}
              fill
              className="object-cover opacity-90"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="w-20 h-20 bg-white/95 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto border border-white/60 shadow-soft relative z-10">
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
