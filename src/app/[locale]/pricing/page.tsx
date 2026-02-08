'use client';

import { useTranslations } from 'next-intl';
import Layout from '@/components/Layout';
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
      <section className="relative bg-swiss-red text-white overflow-hidden">
        {/* Swiss-flag inspired overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-700/60 via-red-600/60 to-red-700/60"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-8 bg-white/15 rounded-sm"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[60%] bg-white/15 rounded-sm"></div>
        </div>
        <div className="relative container-max py-20">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>{t('pricing.title')}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              {t('pricing.title')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('pricing.choosePlan')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('pricing.priceDisclaimer')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-lg border-2 ${plan.popular ? 'border-green-500 scale-105' : 'border-gray-200'} overflow-hidden`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      {t('pricing.mostPopular')}
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-2">{plan.unit}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
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
      <section className="py-20">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('pricing.additionalServices')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('pricing.enhancePackage')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {additionalServices.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">{item.service}</h3>
                  <span className="text-blue-600 font-bold">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factors Affecting Price */}
      <section className="py-20 bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('pricing.factorsAffecting')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('pricing.factorsInfluence')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('pricing.timeRequired')}</h3>
              <p className="text-gray-600 text-sm">{t('pricing.timeRequiredDesc')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('pricing.serviceType')}</h3>
              <p className="text-gray-600 text-sm">{t('pricing.serviceTypeDesc')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('pricing.location')}</h3>
              <p className="text-gray-600 text-sm">{t('pricing.locationDesc')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('pricing.urgency')}</h3>
              <p className="text-gray-600 text-sm">{t('pricing.urgencyDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-swiss-red text-white overflow-hidden">
        {/* Swiss-flag inspired overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-700/60 via-red-600/60 to-red-700/60"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-8 bg-white/15 rounded-sm"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[60%] bg-white/15 rounded-sm"></div>
        </div>
        <div className="container-max relative">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('pricing.readyQuote')}
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {t('pricing.contactToday')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`/${locale}/free-offer`}
                className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <Calendar className="w-5 h-5" />
                <span>{t('pricing.getFreeQuote')}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="tel:+41123456789"
                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 border border-white/20"
              >
                <Phone className="w-5 h-5" />
                <span>+41 12 345 67 89</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
