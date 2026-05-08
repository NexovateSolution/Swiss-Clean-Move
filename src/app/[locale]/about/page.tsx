import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import {
  Award,
  Clock,
  Shield,
  Heart,
  Leaf,
  Target,
  CheckCircle,
  Layers,
  ShieldCheck,
  Star,
  DollarSign,
  Zap,
  MapPin,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();

  const values = [
    {
      icon: Shield,
      title: t('about.values.reliability.title'),
      description: t('about.values.reliability.description')
    },
    {
      icon: Heart,
      title: t('about.values.customerFocus.title'),
      description: t('about.values.customerFocus.description')
    },
    {
      icon: Leaf,
      title: t('about.values.sustainability.title'),
      description: t('about.values.sustainability.description')
    },
    {
      icon: Target,
      title: t('about.values.quality.title'),
      description: t('about.values.quality.description')
    }
  ];

  const stats = [
    { number: '500+', label: t('about.stats.satisfiedCustomers') },
    { number: '5+', label: t('about.stats.yearsExperience') },
    { number: '24h', label: t('about.stats.responseTime') }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <SwissHero
        badge={t('about.title')}
        title={t('about.title')}
        subtitle={t('about.subtitle')}
        right={
          <img
            src="/Gallary/7.jpeg"
            alt={t('about.title')}
            className="w-full h-[340px] md:h-[420px] object-cover"
          />
        }
      />

      {/* Company Story */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-swiss-text">
                  {t('about.story.title')}
                </h2>
                <p className="text-lg text-swiss-body">
                  {t('about.story.description')}
                </p>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-swiss-red" />
                  <span className="font-semibold text-swiss-text">{t('about.story.qualityBadge')}</span>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden h-96 relative shadow-soft border border-swiss-border">
                  <img
                    src="/Gallary/8.jpeg"
                    alt={t('about.story.teamImage')}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {t('about.statsSection.title')}
            </h2>
            <p className="text-xl text-swiss-body">
              {t('about.statsSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-swiss-text">
                  {stat.number}
                </div>
                <div className="mx-auto h-0.5 w-10 bg-swiss-red rounded-full"></div>
                <div className="text-swiss-body font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Customers Choose SwissCleanMove Section */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-swiss-border shadow-sm">
              <Sparkles className="w-4 h-4 text-swiss-red" />
              <span className="text-sm font-semibold text-swiss-red tracking-wide uppercase">
                {t('about.whyChoose.badge')}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {t('about.whyChoose.title')}
            </h2>
          </div>

          {/* 6 Benefit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Layers, key: 'oneSource' },
              { icon: ShieldCheck, key: 'handoverGuarantee' },
              { icon: Star, key: 'swissQuality' },
              { icon: DollarSign, key: 'transparentPricing' },
              { icon: Zap, key: 'fastQuote' },
              { icon: MapPin, key: 'flexible' }
            ].map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 border border-swiss-border shadow-sm hover:shadow-lg hover:border-swiss-red/20 transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-swiss-red to-swiss-red/60 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-14 h-14 bg-swiss-red/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-swiss-red/20 transition-colors duration-300">
                    <IconComp className="w-7 h-7 text-swiss-red" />
                  </div>
                  <h3 className="text-lg font-bold text-swiss-text mb-3">
                    {t(`about.whyChoose.benefits.${item.key}.title`)}
                  </h3>
                  <p className="text-swiss-body leading-relaxed">
                    {t(`about.whyChoose.benefits.${item.key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Our Services Strip */}
          <div className="bg-white rounded-2xl border border-swiss-border p-8 md:p-10 mb-12 shadow-sm">
            <h3 className="text-2xl font-bold text-swiss-text mb-6 text-center">
              {t('about.whyChoose.servicesTitle')}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'moving', 'moveOutCleaning', 'maintenanceCleaning', 'facilityServices',
                'propertyMaintenance', 'constructionCleaning', 'restaurantCleaning',
                'disposal', 'windowCleaning'
              ].map((serviceKey, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-swiss-section border border-swiss-border text-sm font-medium text-swiss-text hover:bg-swiss-red/5 hover:border-swiss-red/30 transition-colors duration-200"
                >
                  {t(`about.whyChoose.services.${serviceKey}`)}
                </span>
              ))}
            </div>
          </div>

          {/* Closing Tagline & CTA */}
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-xl font-semibold text-swiss-text">
              {t('about.whyChoose.tagline')}
            </p>
            <p className="text-lg text-swiss-body leading-relaxed">
              {t('about.whyChoose.closingText')}
            </p>
            <Link
              href={`/${locale}/free-offer`}
              className="inline-flex items-center gap-2 btn-primary px-8 py-4 text-lg"
            >
              {t('about.whyChoose.ctaButton')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {t('about.valuesSection.title')}
            </h2>
            <p className="text-xl text-swiss-body">
              {t('about.valuesSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="card p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-swiss-gray-50 border border-swiss-border rounded-full flex items-center justify-center mx-auto">
                    <IconComponent className="w-8 h-8 text-swiss-body" />
                  </div>
                  <h3 className="text-xl font-semibold text-swiss-text">
                    {value.title}
                  </h3>
                  <p className="text-swiss-body">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {t('about.mission.title')}
            </h2>
            <p className="text-xl text-swiss-body">
              {t('about.mission.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-4">
                <Award className="w-12 h-12 text-swiss-red mx-auto" />
                <h3 className="text-lg font-semibold text-swiss-text">{t('about.mission.values.excellence.title')}</h3>
                <p className="text-swiss-body">{t('about.mission.values.excellence.description')}</p>
              </div>
              <div className="space-y-4">
                <Clock className="w-12 h-12 text-swiss-red mx-auto" />
                <h3 className="text-lg font-semibold text-swiss-text">{t('about.mission.values.efficiency.title')}</h3>
                <p className="text-swiss-body">{t('about.mission.values.efficiency.description')}</p>
              </div>
              <div className="space-y-4">
                <Heart className="w-12 h-12 text-swiss-red mx-auto" />
                <h3 className="text-lg font-semibold text-swiss-text">{t('about.mission.values.trust.title')}</h3>
                <p className="text-swiss-body">{t('about.mission.values.trust.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-swiss-section text-swiss-text border-y border-swiss-border">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('about.cta.title')}
            </h2>
            <p className="text-xl text-swiss-body">
              {t('about.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/free-offer`} className="inline-flex items-center justify-center btn-primary px-8 py-4">
                {t('about.cta.freeOffer')}
              </Link>
              <Link href={`/${locale}/contact`} className="flex items-center justify-center space-x-2 btn-secondary px-8 py-4">
                {t('about.cta.contact')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
