'use client'

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import { 
  Trash2, 
  CheckCircle, 
  Clock, 
  Shield, 
  Star,
  Phone,
  Mail,
  Recycle,
  Leaf
} from 'lucide-react';

export default function DisposalPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();

  const features = (t.raw('services.features.disposal') as string[]) || [];

  const benefits = [
    {
      icon: Shield,
      title: t('services.benefits.guarantee.title'),
      description: t('services.benefits.guarantee.description')
    },
    {
      icon: Clock,
      title: t('services.benefits.punctual.title'),
      description: t('services.benefits.punctual.description')
    },
    {
      icon: Star,
      title: t('services.benefits.professional.title'),
      description: t('services.benefits.professional.description')
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <SwissHero
        badge={t('home.services.disposal.title')}
        title={t('home.services.disposal.title')}
        subtitle={t('home.services.disposal.description')}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-start">
            <Link href={`/${locale}/form?service=disposal`} className="btn-secondary text-lg px-8 py-4">
              {t('servicesPages.common.requestQuote')}
            </Link>
            <a
              href="tel:+41764883689"
              className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5 text-swiss-red" />
              <span>{t('servicesPages.common.callNow')}</span>
            </a>
          </div>
        }
        right={
          <div className="w-full h-[340px] md:h-[420px] bg-swiss-section flex items-center justify-center">
            <div className="w-20 h-20 bg-swiss-softRed rounded-3xl flex items-center justify-center mx-auto border border-swiss-border shadow-subtle">
              <Trash2 className="w-10 h-10 text-swiss-red" />
            </div>
          </div>
        }
      />

      {/* Service Details */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-swiss-gray-800">
                {t('home.services.disposal.title')}
              </h2>
              <p className="text-lg text-swiss-gray-700">
                {t('home.services.disposal.description')}
              </p>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-swiss-gray-800">{t('servicesPages.common.ourServicesInclude')}</h3>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-swiss-green flex-shrink-0" />
                    <span className="text-swiss-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="bg-swiss-blue/10 p-6 rounded-lg">
                <div className="text-2xl font-bold text-swiss-blue mb-2">{t('services.pricing.disposal')}</div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-swiss-gray-200 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Trash2 className="w-16 h-16 text-swiss-blue mx-auto" />
                  <p className="text-swiss-gray-600">{t('home.services.disposal.title')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-swiss-gray-50">
        <div className="container-max">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-gray-800">
              {t('services.benefitsSection.title')}
            </h2>
            <p className="text-xl text-swiss-gray-600">
              {t('services.benefitsSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="card p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-swiss-softRed border border-swiss-border rounded-full flex items-center justify-center mx-auto">
                    <IconComponent className="w-8 h-8 text-swiss-red" />
                  </div>
                  <h3 className="text-xl font-semibold text-swiss-gray-800">
                    {benefit.title}
                  </h3>
                  <p className="text-swiss-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-10 bg-swiss-softRed border border-swiss-border text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
                {t('servicesCta.title')}
              </h2>
              <p className="text-xl text-swiss-body">
                {t('servicesCta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/form?service=disposal`} className="btn-secondary text-lg px-8 py-4">
                  {t('common.freeQuote')}
                </Link>
                <a
                  href={`mailto:info@swisscleanmove.ch`}
                  className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center space-x-2"
                >
                  <Mail className="w-5 h-5 text-swiss-red" />
                  <span>{t('servicesPages.common.emailUs')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
