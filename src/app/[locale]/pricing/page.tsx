'use client';

import { useTranslations } from 'next-intl';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import { 
  CheckCircle, 
  Star, 
  Phone, 
  Calendar,
  ArrowRight,
  Shield,
  Clock,
  Award
} from 'lucide-react';

export default function PricingPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();

  const pricingPlans = [
    {
      name: t('pricing.plans.basic.title'),
      price: t('pricing.plans.basic.price'),
      unit: '',
      description: t('pricing.plans.basic.description'),
      features: t.raw('pricing.plans.basic.features') || [],
      popular: false,
      color: 'blue'
    },
    {
      name: t('pricing.plans.standard.title'),
      price: t('pricing.plans.standard.price'),
      unit: '',
      description: t('pricing.plans.standard.description'),
      features: t.raw('pricing.plans.standard.features') || [],
      popular: true,
      color: 'green'
    },
    {
      name: t('pricing.plans.premium.title'),
      price: t('pricing.plans.premium.price'),
      unit: '',
      description: t('pricing.plans.premium.description'),
      features: t.raw('pricing.plans.premium.features') || [],
      popular: false,
      color: 'purple'
    }
  ];

  const additionalServices = [
    { service: t('pricing.additionalServicesList.windowCleaning'), price: t('pricing.additionalPrices.windowCleaning') },
    { service: t('pricing.additionalServicesList.carpetCleaning'), price: t('pricing.additionalPrices.carpetCleaning') },
    { service: t('pricing.additionalServicesList.applianceCleaning'), price: t('pricing.additionalPrices.applianceCleaning') },
    { service: t('pricing.additionalServicesList.garageBasement'), price: t('pricing.additionalPrices.garageBasement') },
    { service: t('pricing.additionalServicesList.disposalServices'), price: t('pricing.additionalPrices.disposalServices') },
    { service: t('pricing.additionalServicesList.storageSolutions'), price: t('pricing.additionalPrices.storageSolutions') }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <SwissHero
        badge={t('pricing.title')}
        title={t('pricing.title')}
        subtitle={t('pricing.subtitle')}
        right={
          <img
            src="/images/transportation.png"
            alt={t('pricing.title')}
            className="w-full h-[340px] md:h-[420px] object-cover"
          />
        }
      />

      {/* Pricing Plans */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text mb-4">
              {t('pricing.choosePlan')}
            </h2>
            <p className="text-xl text-swiss-body">
              {t('pricing.priceDisclaimer')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-subtle hover:shadow-soft transition-all duration-200 border ${plan.popular ? 'border-swiss-red/40' : 'border-swiss-border'} overflow-visible`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-swiss-softRed text-swiss-text border border-swiss-border px-4 py-1 rounded-full text-sm font-medium">
                      {t('pricing.mostPopular')}
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-swiss-text mb-2">{plan.name}</h3>
                    <p className="text-swiss-body mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-swiss-text">{plan.price}</span>
                      <span className="text-swiss-body ml-2">{plan.unit}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-swiss-red flex-shrink-0" />
                        <span className="text-swiss-body">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-swiss-red hover:bg-swiss-red/90 text-white' 
                      : 'bg-white hover:bg-swiss-gray-50 text-swiss-text border border-swiss-border'
                  }`}>
                    {t('pricing.getQuote')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text mb-4">
              {t('pricing.additionalServices')}
            </h2>
            <p className="text-xl text-swiss-body">
              {t('pricing.enhancePackage')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {additionalServices.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-subtle border border-swiss-border">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-swiss-text">{item.service}</h3>
                  <span className="text-swiss-red font-bold">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factors Affecting Price */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text mb-4">
              {t('pricing.factorsAffecting')}
            </h2>
            <p className="text-xl text-swiss-body">
              {t('pricing.factorsInfluence')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white border border-swiss-border rounded-full flex items-center justify-center mx-auto mb-4 shadow-subtle">
                <Clock className="w-8 h-8 text-swiss-body" />
              </div>
              <h3 className="font-semibold text-swiss-text mb-2">{t('pricing.timeRequired')}</h3>
              <p className="text-swiss-body text-sm">{t('pricing.timeRequiredDesc')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white border border-swiss-border rounded-full flex items-center justify-center mx-auto mb-4 shadow-subtle">
                <Shield className="w-8 h-8 text-swiss-body" />
              </div>
              <h3 className="font-semibold text-swiss-text mb-2">{t('pricing.serviceType')}</h3>
              <p className="text-swiss-body text-sm">{t('pricing.serviceTypeDesc')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white border border-swiss-border rounded-full flex items-center justify-center mx-auto mb-4 shadow-subtle">
                <Star className="w-8 h-8 text-swiss-body" />
              </div>
              <h3 className="font-semibold text-swiss-text mb-2">{t('pricing.location')}</h3>
              <p className="text-swiss-body text-sm">{t('pricing.locationDesc')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white border border-swiss-border rounded-full flex items-center justify-center mx-auto mb-4 shadow-subtle">
                <Calendar className="w-8 h-8 text-swiss-body" />
              </div>
              <h3 className="font-semibold text-swiss-text mb-2">{t('pricing.urgency')}</h3>
              <p className="text-swiss-body text-sm">{t('pricing.urgencyDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {t('pricing.readyQuote')}
            </h2>
            <p className="text-xl text-swiss-body max-w-2xl mx-auto">
              {t('pricing.contactToday')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`/${locale}/free-offer`}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>{t('pricing.getFreeQuote')}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="tel:+41764883689"
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <Phone className="w-5 h-5 text-swiss-red" />
                <span>+41 76 488 36 89</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
