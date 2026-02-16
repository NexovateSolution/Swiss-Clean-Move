'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import { 
  MapPin, 
  Phone, 
  Clock,
  CheckCircle,
  Star,
  Users,
  Home as HomeIcon,
  Building2,
  Briefcase,
  Sparkles,
  Truck,
  Trash2,
  UtensilsCrossed,
  Shield,
  HardHat,
  Wrench,
  RotateCcw,
  Layers
} from 'lucide-react';

export default function RegionsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();

  const regions = [
    {
      id: 'zurich',
      phone: '+41 44 123 45 67',
    },
    {
      id: 'basel',
      phone: '+41 61 123 45 67',
    },
    {
      id: 'bern',
      phone: '+41 31 123 45 67',
    },
    {
      id: 'geneva',
      phone: '+41 22 123 45 67',
    },
    {
      id: 'lausanne',
      phone: '+41 21 123 45 67',
    },
    {
      id: 'lucerne',
      phone: '+41 41 123 45 67',
    },
    {
      id: 'biel',
      phone: '+41 32 123 45 67',
    },
    {
      id: 'solothurn',
      phone: '+41 32 234 56 78',
    },
    {
      id: 'jura',
      phone: '+41 32 345 67 89',
    }
  ];

  const services = [
    { id: 'houseCleaning', icon: HomeIcon, href: `/${locale}/services/house-cleaning` },
    { id: 'apartmentCleaning', icon: Building2, href: `/${locale}/services/apartment-cleaning` },
    { id: 'officeCleaning', icon: Briefcase, href: `/${locale}/services/office-cleaning` },
    { id: 'finalCleaning', icon: Sparkles, href: `/${locale}/services/final-cleaning` },
    { id: 'windowCleaning', icon: Layers, href: `/${locale}/services/window-cleaning` },
    { id: 'stairwellCleaning', icon: Building2, href: `/${locale}/services/stairwell-cleaning` },
    { id: 'relocation', icon: Truck, href: `/${locale}/services/relocation` },
    { id: 'disposal', icon: Trash2, href: `/${locale}/services/disposal` },
    { id: 'gastronomyCleaning', icon: UtensilsCrossed, href: `/${locale}/services#gastronomyCleaning` },
    { id: 'medicalCleaning', icon: Shield, href: `/${locale}/services#medicalCleaning` },
    { id: 'constructionCleaning', icon: HardHat, href: `/${locale}/services#constructionCleaning` },
    { id: 'propertyMaintenance', icon: Wrench, href: `/${locale}/services#propertyMaintenance` },
    { id: 'specialCleaning', icon: Star, href: `/${locale}/services#specialCleaning` },
    { id: 'comboService', icon: RotateCcw, href: `/${locale}/services#comboService` }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <SwissHero
        badge={t('regions.title')}
        title={t('regions.title')}
        subtitle={t('regions.subtitle')}
        right={
          <img
            src="/images/transportation.png"
            alt={t('regions.title')}
            className="w-full h-[340px] md:h-[420px] object-cover"
          />
        }
      />

      {/* Coverage Overview */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {t('regions.coverageAreas')}
            </h2>
            <p className="text-xl text-swiss-body">
              {t('regions.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="card p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-swiss-gray-50 border border-swiss-border rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-swiss-body" />
              </div>
              <h3 className="text-xl font-semibold text-swiss-text">{t('regions.citiesCount')}</h3>
              <p className="text-swiss-body">{t('regions.citiesDesc')}</p>
            </div>
            <div className="card p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-swiss-gray-50 border border-swiss-border rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-swiss-body" />
              </div>
              <h3 className="text-xl font-semibold text-swiss-text">{t('regions.sameDayService')}</h3>
              <p className="text-swiss-body">{t('regions.sameDayDesc')}</p>
            </div>
            <div className="card p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-swiss-gray-50 border border-swiss-border rounded-full flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 text-swiss-body" />
              </div>
              <h3 className="text-xl font-semibold text-swiss-text">{t('regions.localTeams')}</h3>
              <p className="text-swiss-body">{t('regions.localTeamsDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Services */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {t('regions.ourRegions')}
            </h2>
            <p className="text-xl text-swiss-body">
              {t('regions.professionalServices')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {regions.map((region, index) => (
              <div key={index} className="card p-8 space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-swiss-text mb-2">
                      {t(`regions.regionData.${region.id}.name`)}
                    </h3>
                    <p className="text-swiss-body">
                      {t(`regions.regionData.${region.id}.description`)}
                    </p>
                  </div>
                  <MapPin className="w-8 h-8 text-swiss-red flex-shrink-0" />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-swiss-text mb-2">{t('regions.serviceAreas')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {(t.raw(`regions.regionData.${region.id}.areas`) as string[]).map((area, areaIndex) => (
                        <span 
                          key={areaIndex}
                          className="bg-white border border-swiss-border text-swiss-body px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-swiss-red" />
                      <div>
                        <p className="text-sm font-medium text-swiss-text">{t('regions.phone')}</p>
                        <p className="text-sm text-swiss-body">{region.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-swiss-red" />
                      <div>
                        <p className="text-sm font-medium text-swiss-text">{t('regions.coverage')}</p>
                        <p className="text-sm text-swiss-body">
                          {t(`regions.regionData.${region.id}.coverage`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Services */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {t('regions.servicesAvailable')}
            </h2>
            <p className="text-xl text-swiss-body">
              {t('regions.completeRange')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              (() => {
                const IconComponent = service.icon;
                return (
              <Link
                key={index}
                href={service.href}
                className="card p-6 text-center space-y-4 group focus:outline-none focus:ring-2 focus:ring-swiss-red/20"
              >
                <div className="w-14 h-14 bg-swiss-gray-50 border border-swiss-border rounded-2xl flex items-center justify-center mx-auto">
                  <IconComponent className="w-7 h-7 text-swiss-body group-hover:text-swiss-red transition-colors" />
                </div>
                <h3 className="font-semibold text-swiss-text group-hover:text-swiss-red transition-colors">
                  {t(`regions.services.${service.id}`)}
                </h3>
              </Link>
                );
              })()
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {t('regions.notSureArea')}
            </h2>
            <p className="text-xl text-swiss-body">
              {t('regions.contactCheck')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`} className="btn-primary text-lg px-8 py-4">
                {t('regions.contactUs')}
              </Link>
              <a href="tel:+41764883689" className="flex items-center justify-center space-x-2 bg-white hover:bg-swiss-gray-50 text-swiss-text font-semibold py-3.5 px-6 rounded-xl transition-all duration-150 border border-swiss-border shadow-subtle">
                <Phone className="w-5 h-5 text-swiss-red" />
                <span>{t('regions.callNow')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
