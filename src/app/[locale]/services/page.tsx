import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/Layout';
import PriceCalculator from '@/components/PriceCalculator';
import {
  Home as HomeIcon,
  Building2,
  UtensilsCrossed,
  Briefcase,
  Wrench,
  Trash2,
  Truck,
  CheckCircle,
  Clock,
  Shield,
  Star,
  ArrowRight,
  Euro
} from 'lucide-react';

export default function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();

  const services = [
    {
      id: 'houseCleaning',
      icon: HomeIcon,
      title: t('home.services.houseCleaning.title'),
      description: t('home.services.houseCleaning.description'),
      features: t.raw('services.features.houseCleaning'),
      pricing: 'CHF 45/hr',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'apartmentCleaning',
      icon: Building2,
      title: t('home.services.apartmentCleaning.title'),
      description: t('home.services.apartmentCleaning.description'),
      features: t.raw('services.features.apartmentCleaning'),
      pricing: 'CHF 45/hr',
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'stairwellCleaning',
      icon: Building2,
      title: t('home.services.stairwellCleaning.title'),
      description: t('home.services.stairwellCleaning.description'),
      features: t.raw('services.features.stairwellCleaning'),
      pricing: 'CHF 190/month',
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'officeCleaning',
      icon: Briefcase,
      title: t('home.services.officeCleaning.title'),
      description: t('home.services.officeCleaning.description'),
      features: t.raw('services.features.officeCleaning'),
      pricing: 'CHF 48/hr',
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'finalCleaning',
      icon: CheckCircle,
      title: t('home.services.finalCleaning.title'),
      description: t('home.services.finalCleaning.description'),
      features: t.raw('services.features.finalCleaning'),
      pricing: 'from CHF 390',
      color: 'bg-teal-500',
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      id: 'windowCleaning',
      icon: HomeIcon,
      title: t('home.services.windowCleaning.title'),
      description: t('home.services.windowCleaning.description'),
      features: t.raw('services.features.windowCleaning'),
      pricing: 'from CHF 120',
      color: 'bg-cyan-500',
      gradient: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 'relocation',
      icon: Truck,
      title: t('home.services.relocation.title'),
      description: t('home.services.relocation.description'),
      features: t.raw('services.features.relocation'),
      pricing: 'CHF 150/hr',
      color: 'bg-indigo-500',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'disposal',
      icon: Trash2,
      title: t('home.services.disposal.title'),
      description: t('home.services.disposal.description'),
      features: t.raw('services.features.disposal'),
      pricing: 'from CHF 350',
      color: 'bg-red-500',
      gradient: 'from-red-500 to-red-600'
    }
  ];

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
    },
    {
      icon: CheckCircle,
      title: t('services.benefits.insured.title'),
      description: t('services.benefits.insured.description')
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-swiss-blue to-swiss-green text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-max py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              {t('services.title')}
            </h1>
            <p className="text-xl text-blue-100">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={service.id} id={service.id} className="card overflow-hidden">
                  {/* Service Header */}
                  <div className={`bg-gradient-to-r ${service.gradient} text-white p-6`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{service.title}</h3>
                        <div className="flex items-center space-x-2 text-sm opacity-90">
                          <Euro className="w-4 h-4" />
                          <span>{service.pricing}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-6 space-y-6">
                    <p className="text-swiss-gray-700">{service.description}</p>

                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-swiss-gray-800 mb-3">{t('services.featuresTitle')}:</h4>
                      <ul className="space-y-2">
                        {Array.isArray(service.features) ? service.features.map((feature: string, featureIndex: number) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-swiss-green flex-shrink-0" />
                            <span className="text-swiss-gray-600">{feature}</span>
                          </li>
                        )) : (
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-swiss-green flex-shrink-0" />
                            <span className="text-swiss-gray-600">Professional service features</span>
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="pt-4 border-t border-swiss-gray-200">
                      <Link
                        href={`/${locale}/free-offer`}
                        className="inline-flex items-center space-x-2 text-swiss-blue hover:text-swiss-blue/80 font-medium transition-colors"
                      >
                        <span>{t('common.requestFreeQuote')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Price Calculator Section */}
      <section className="section-padding bg-swiss-gray-50">
        <div className="container-max">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-gray-800">
              Calculate Your Price
            </h2>
            <p className="text-xl text-swiss-gray-600">
              Get an instant estimate for all our services
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <PriceCalculator />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-swiss-gray-50">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-gray-800">
              {t('services.benefitsSection.title')}
            </h2>
            <p className="text-xl text-swiss-gray-600">
              {t('services.benefitsSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-swiss-blue rounded-full flex items-center justify-center mx-auto">
                    <IconComponent className="w-8 h-8 text-white" />
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
      <section className="section-padding bg-swiss-blue text-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('home.servicesCta.title')}
            </h2>
            <p className="text-xl text-blue-100">
              {t('home.servicesCta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/free-offer`} className="btn-secondary text-lg px-8 py-4">
                {t('common.freeQuote')}
              </Link>
              <a
                href="tel:+41123456789"
                className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 border border-white/20"
              >
                <span>+41 12 345 67 89</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
