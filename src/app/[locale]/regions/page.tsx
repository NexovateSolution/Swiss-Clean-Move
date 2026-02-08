'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle,
  Star,
  Users
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
    { id: 'houseCleaning', icon: '🏠' },
    { id: 'apartmentCleaning', icon: '🏢' },
    { id: 'officeCleaning', icon: '💼' },
    { id: 'finalCleaning', icon: '✨' },
    { id: 'windowCleaning', icon: '🪟' },
    { id: 'relocation', icon: '📦' },
    { id: 'disposal', icon: '♻️' },
    { id: 'stairwellCleaning', icon: '🪜' }
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
            <MapPin className="w-16 h-16 mx-auto text-blue-100" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {t('regions.title')}
            </h1>
            <p className="text-xl text-blue-100">
              {t('regions.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Overview */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-gray-800">
              {t('regions.coverageAreas')}
            </h2>
            <p className="text-xl text-swiss-gray-600">
              {t('regions.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="card p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-swiss-blue rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-swiss-gray-800">{t('regions.citiesCount')}</h3>
              <p className="text-swiss-gray-600">{t('regions.citiesDesc')}</p>
            </div>
            <div className="card p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-swiss-green rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-swiss-gray-800">{t('regions.sameDayService')}</h3>
              <p className="text-swiss-gray-600">{t('regions.sameDayDesc')}</p>
            </div>
            <div className="card p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-swiss-red rounded-full flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-swiss-gray-800">{t('regions.localTeams')}</h3>
              <p className="text-swiss-gray-600">{t('regions.localTeamsDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Services */}
      <section className="section-padding bg-swiss-gray-50">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-gray-800">
              {t('regions.ourRegions')}
            </h2>
            <p className="text-xl text-swiss-gray-600">
              {t('regions.professionalServices')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {regions.map((region, index) => (
              <div key={index} className="card p-8 space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-swiss-gray-800 mb-2">
                      {t(`regions.regionData.${region.id}.name`)}
                    </h3>
                    <p className="text-swiss-gray-600">
                      {t(`regions.regionData.${region.id}.description`)}
                    </p>
                  </div>
                  <MapPin className="w-8 h-8 text-swiss-blue flex-shrink-0" />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-swiss-gray-800 mb-2">{t('regions.serviceAreas')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {(t.raw(`regions.regionData.${region.id}.areas`) as string[]).map((area, areaIndex) => (
                        <span 
                          key={areaIndex}
                          className="bg-swiss-blue/10 text-swiss-blue px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-swiss-blue" />
                      <div>
                        <p className="text-sm font-medium text-swiss-gray-800">{t('regions.phone')}</p>
                        <p className="text-sm text-swiss-gray-600">{region.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-swiss-green" />
                      <div>
                        <p className="text-sm font-medium text-swiss-gray-800">{t('regions.coverage')}</p>
                        <p className="text-sm text-swiss-gray-600">
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
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-gray-800">
              {t('regions.servicesAvailable')}
            </h2>
            <p className="text-xl text-swiss-gray-600">
              {t('regions.completeRange')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="card p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
                <div className="text-4xl">{service.icon}</div>
                <h3 className="font-semibold text-swiss-gray-800">
                  {t(`regions.services.${service.id}`)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
              {t('regions.notSureArea')}
            </h2>
            <p className="text-xl text-blue-100">
              {t('regions.contactCheck')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`} className="btn-secondary text-lg px-8 py-4">
                {t('regions.contactUs')}
              </Link>
              <a href="tel:+41123456789" className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 border border-white/20">
                <Phone className="w-5 h-5" />
                <span>{t('regions.callNow')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
