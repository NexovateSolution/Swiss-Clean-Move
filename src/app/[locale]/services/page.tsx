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
      pricing: 'CHF 45–65 / hour / staff',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'apartmentCleaning',
      icon: Building2,
      title: t('home.services.apartmentCleaning.title'),
      description: t('home.services.apartmentCleaning.description'),
      features: t.raw('services.features.apartmentCleaning'),
      pricing: 'CHF 45–65 / hour / staff',
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'stairwellCleaning',
      icon: Building2,
      title: t('home.services.stairwellCleaning.title'),
      description: t('home.services.stairwellCleaning.description'),
      features: t.raw('services.features.stairwellCleaning'),
      pricing: 'flat rate from CHF 120',
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'officeCleaning',
      icon: Briefcase,
      title: t('home.services.officeCleaning.title'),
      description: t('home.services.officeCleaning.description'),
      features: t.raw('services.features.officeCleaning'),
      pricing: 'CHF 0.80–1.50 / m²',
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'finalCleaning',
      icon: CheckCircle,
      title: t('home.services.finalCleaning.title'),
      description: t('home.services.finalCleaning.description'),
      features: t.raw('services.features.finalCleaning'),
      pricing: 'from CHF 250',
      color: 'bg-teal-500',
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      id: 'windowCleaning',
      icon: HomeIcon,
      title: t('home.services.windowCleaning.title'),
      description: t('home.services.windowCleaning.description'),
      features: t.raw('services.features.windowCleaning'),
      pricing: 'CHF 8–15 / window',
      color: 'bg-cyan-500',
      gradient: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 'relocation',
      icon: Truck,
      title: t('home.services.relocation.title'),
      description: t('home.services.relocation.description'),
      features: t.raw('services.features.relocation'),
      pricing: 'from CHF 160 / hour',
      color: 'bg-indigo-500',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'disposal',
      icon: Trash2,
      title: t('home.services.disposal.title'),
      description: t('home.services.disposal.description'),
      features: t.raw('services.features.disposal'),
      pricing: 'from CHF 30 / m³',
      color: 'bg-red-500',
      gradient: 'from-red-500 to-red-600'
    }
    ,
    {
      id: 'gastronomyCleaning',
      icon: UtensilsCrossed,
      title: t('home.services.gastronomyCleaning.title'),
      description: t('home.services.gastronomyCleaning.description'),
      features: t.raw('services.features.gastronomyCleaning'),
      pricing: 'CHF 400–1,200',
      color: 'bg-rose-500',
      gradient: 'from-rose-500 to-rose-600'
    },
    {
      id: 'medicalCleaning',
      icon: Shield,
      title: t('home.services.medicalCleaning.title'),
      description: t('home.services.medicalCleaning.description'),
      features: t.raw('services.features.medicalCleaning'),
      pricing: 'CHF 0.80–1.50 / m²',
      color: 'bg-emerald-500',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'constructionCleaning',
      icon: Building2,
      title: t('home.services.constructionCleaning.title'),
      description: t('home.services.constructionCleaning.description'),
      features: t.raw('services.features.constructionCleaning'),
      pricing: 'from CHF 5–8 / m²',
      color: 'bg-yellow-500',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'propertyMaintenance',
      icon: Wrench,
      title: t('home.services.propertyMaintenance.title'),
      description: t('home.services.propertyMaintenance.description'),
      features: t.raw('services.features.propertyMaintenance'),
      pricing: 'from CHF 250 / month',
      color: 'bg-sky-500',
      gradient: 'from-sky-500 to-sky-600'
    },
    {
      id: 'specialCleaning',
      icon: Star,
      title: t('home.services.specialCleaning.title'),
      description: t('home.services.specialCleaning.description'),
      features: t.raw('services.features.specialCleaning'),
      pricing: 'Price on request',
      color: 'bg-fuchsia-500',
      gradient: 'from-fuchsia-500 to-fuchsia-600'
    },
    {
      id: 'comboService',
      icon: Truck,
      title: t('home.services.comboService.title'),
      description: t('home.services.comboService.description'),
      features: t.raw('services.features.comboService'),
      pricing: 'from CHF 650',
      color: 'bg-indigo-700',
      gradient: 'from-indigo-700 to-indigo-800'
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
      <section className="relative bg-swiss-red text-white overflow-hidden">
        {/* Swiss-flag inspired overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-700/60 via-red-600/60 to-red-700/60"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-8 bg-white/15 rounded-sm"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[60%] bg-white/15 rounded-sm"></div>
        </div>
        <div className="relative container-max py-20">
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
                        <div className="text-sm opacity-90">
                          {service.pricing}
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
      <section className="relative py-20 bg-swiss-red text-white overflow-hidden">
        {/* Swiss-flag inspired overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-700/60 via-red-600/60 to-red-700/60"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-8 bg-white/15 rounded-sm"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[60%] bg-white/15 rounded-sm"></div>
        </div>
        <div className="container-max relative">
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
