import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/Layout';
import PriceCalculator from '@/components/PriceCalculator';
import SwissHero from '@/components/SwissHero';
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
  Calendar,
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
      pricing: t('services.pricing.houseCleaning'),
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'apartmentCleaning',
      icon: Building2,
      title: t('home.services.apartmentCleaning.title'),
      description: t('home.services.apartmentCleaning.description'),
      features: t.raw('services.features.apartmentCleaning'),
      pricing: t('services.pricing.apartmentCleaning'),
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'stairwellCleaning',
      icon: Building2,
      title: t('home.services.stairwellCleaning.title'),
      description: t('home.services.stairwellCleaning.description'),
      features: t.raw('services.features.stairwellCleaning'),
      pricing: t('services.pricing.stairwellCleaning'),
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'officeCleaning',
      icon: Briefcase,
      title: t('home.services.officeCleaning.title'),
      description: t('home.services.officeCleaning.description'),
      features: t.raw('services.features.officeCleaning'),
      pricing: t('services.pricing.officeCleaning'),
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'finalCleaning',
      icon: CheckCircle,
      title: t('home.services.finalCleaning.title'),
      description: t('home.services.finalCleaning.description'),
      features: t.raw('services.features.finalCleaning'),
      pricing: t('services.pricing.finalCleaning'),
      color: 'bg-teal-500',
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      id: 'windowCleaning',
      icon: HomeIcon,
      title: t('home.services.windowCleaning.title'),
      description: t('home.services.windowCleaning.description'),
      features: t.raw('services.features.windowCleaning'),
      pricing: t('services.pricing.windowCleaning'),
      color: 'bg-cyan-500',
      gradient: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 'relocation',
      icon: Truck,
      title: t('home.services.relocation.title'),
      description: t('home.services.relocation.description'),
      features: t.raw('services.features.relocation'),
      pricing: t('services.pricing.relocation'),
      color: 'bg-indigo-500',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'disposal',
      icon: Trash2,
      title: t('home.services.disposal.title'),
      description: t('home.services.disposal.description'),
      features: t.raw('services.features.disposal'),
      pricing: t('services.pricing.disposal'),
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
      pricing: t('services.pricingUnits.byArrangement'),
      color: 'bg-rose-500',
      gradient: 'from-rose-500 to-rose-600'
    },
    {
      id: 'medicalCleaning',
      icon: Shield,
      title: t('home.services.medicalCleaning.title'),
      description: t('home.services.medicalCleaning.description'),
      features: t.raw('services.features.medicalCleaning'),
      pricing: t('services.pricing.officeCleaning'),
      color: 'bg-emerald-500',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'constructionCleaning',
      icon: Building2,
      title: t('home.services.constructionCleaning.title'),
      description: t('home.services.constructionCleaning.description'),
      features: t.raw('services.features.constructionCleaning'),
      pricing: t('services.pricingUnits.byArrangement'),
      color: 'bg-yellow-500',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'propertyMaintenance',
      icon: Wrench,
      title: t('home.services.propertyMaintenance.title'),
      description: t('home.services.propertyMaintenance.description'),
      features: t.raw('services.features.propertyMaintenance'),
      pricing: t('services.pricingUnits.byArrangement'),
      color: 'bg-sky-500',
      gradient: 'from-sky-500 to-sky-600'
    },
    {
      id: 'specialCleaning',
      icon: Star,
      title: t('home.services.specialCleaning.title'),
      description: t('home.services.specialCleaning.description'),
      features: t.raw('services.features.specialCleaning'),
      pricing: t('services.pricingUnits.byArrangement'),
      color: 'bg-fuchsia-500',
      gradient: 'from-fuchsia-500 to-fuchsia-600'
    },
    {
      id: 'comboService',
      icon: Truck,
      title: t('home.services.comboService.title'),
      description: t('home.services.comboService.description'),
      features: t.raw('services.features.comboService'),
      pricing: t('services.pricingUnits.byArrangement'),
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
      <SwissHero
        badge={t('services.title')}
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        right={
          <img
            src="/images/transportation.png"
            alt={t('services.title')}
            className="w-full h-[340px] md:h-[420px] object-cover"
          />
        }
      />

      {/* Services Grid */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={service.id} id={service.id} className="card overflow-hidden">
                  {/* Service Header */}
                  <div className="bg-white p-6 border-b border-swiss-border">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-swiss-gray-50 border border-swiss-border rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-swiss-body" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-swiss-text">{service.title}</h3>
                        <div className="inline-flex mt-2 bg-swiss-softRed text-swiss-text border border-swiss-border px-3 py-1 rounded-full text-sm font-medium">
                          {service.pricing}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-6 space-y-6">
                    <p className="text-swiss-body">{service.description}</p>

                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-swiss-text mb-3">{t('services.featuresTitle')}:</h4>
                      <ul className="space-y-2">
                        {Array.isArray(service.features) ? service.features.map((feature: string, featureIndex: number) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-swiss-red flex-shrink-0" />
                            <span className="text-swiss-body">{feature}</span>
                          </li>
                        )) : (
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-swiss-red flex-shrink-0" />
                            <span className="text-swiss-body">{t('services.featuresFallback')}</span>
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="pt-4 border-t border-swiss-border">
                      <Link
                        href={`/${locale}/free-offer`}
                        className="inline-flex items-center space-x-2 text-swiss-red hover:text-swiss-red/80 font-medium transition-colors"
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
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {t('services.priceCalculator.title')}
            </h2>
            <p className="text-xl text-swiss-body">
              {t('services.priceCalculator.subtitle')}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <PriceCalculator />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {t('services.benefitsSection.title')}
            </h2>
            <p className="text-xl text-swiss-body">
              {t('services.benefitsSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-white border border-swiss-border rounded-full flex items-center justify-center mx-auto shadow-subtle">
                    <IconComponent className="w-8 h-8 text-swiss-body" />
                  </div>
                  <h3 className="text-xl font-semibold text-swiss-text">
                    {benefit.title}
                  </h3>
                  <p className="text-swiss-body">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-swiss-red text-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('home.servicesCta.title')}
            </h2>
            <p className="text-xl text-white/80">
              {t('home.servicesCta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/free-offer`}
                className="inline-flex items-center justify-center bg-white text-swiss-red font-semibold py-3.5 px-6 rounded-xl transition-all duration-150 shadow-soft hover:shadow-soft"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{t('common.freeQuote')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <a
                href="tel:+41764883689"
                className="flex items-center justify-center space-x-2 bg-transparent hover:bg-white/10 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-150 border border-white/40"
              >
                <span>+41 76 488 36 89</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
