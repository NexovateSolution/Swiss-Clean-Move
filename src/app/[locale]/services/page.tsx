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
      id: 'facilityServices',
      icon: Building2,
      title: t('home.services.facilityServices.title'),
      description: t('home.services.facilityServices.description'),
      features: t.raw('services.features.facilityServices'),
      pricing: t('services.pricingUnits.byArrangement'),
      color: 'bg-emerald-500',
      gradient: 'from-emerald-500 to-emerald-600'
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
    },
    {
      id: 'householdHelping',
      icon: Wrench,
      title: t('home.services.householdHelping.title'),
      description: t('home.services.householdHelping.description'),
      features: t.raw('services.features.householdHelping'),
      pricing: t('services.pricing.householdHelping'),
      color: 'bg-emerald-500',
      gradient: 'from-emerald-500 to-emerald-600'
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
            src="/Gallary/1.jpeg"
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
      <section className="section-padding bg-gradient-to-br from-blue-400/80 via-blue-500/70 to-blue-600/80 text-white">
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
                  <span>{t('servicesPages.common.requestQuote')}</span>
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
