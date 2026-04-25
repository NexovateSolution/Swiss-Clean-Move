'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import {
  Home as HomeIcon,
  Building2,
  UtensilsCrossed,
  Briefcase,
  Wrench,
  Trash2,
  Truck,
  Star,
  CheckCircle,
  Shield,
  Heart,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export default function FreeOfferPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();
  const [expandedCategory, setExpandedCategory] = useState<string | null>('cleaning');

  const serviceCategories = [
    {
      id: 'cleaning',
      icon: Sparkles,
      title: t('home.serviceCategories.cleaning.title'),
      description: t('home.serviceCategories.cleaning.description'),
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      services: [
        { title: t('home.services.houseCleaning.title'), description: t('home.services.houseCleaning.description'), formHref: `/${locale}/form?service=house-cleaning`, href: `/${locale}/services/house-cleaning`, icon: HomeIcon },
        { title: t('home.services.windowCleaning.title'), description: t('home.services.windowCleaning.description'), formHref: `/${locale}/form?service=window-cleaning`, href: `/${locale}/services/window-cleaning`, icon: HomeIcon },
        { title: t('home.services.facilityServices.title'), description: t('home.services.facilityServices.description'), formHref: `/${locale}/form?service=facility-services`, href: `/${locale}/services#facilityServices`, icon: Building2 },
      ]
    },
    {
      id: 'moving',
      icon: Truck,
      title: t('home.serviceCategories.moving.title'),
      description: t('home.serviceCategories.moving.description'),
      color: 'from-indigo-500 to-indigo-700',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      iconColor: 'text-indigo-600',
      services: [
        { title: t('home.services.relocation.title'), description: t('home.services.relocation.description'), formHref: `/${locale}/form?service=relocation`, href: `/${locale}/services/relocation`, icon: Truck },
      ]
    },
    {
      id: 'disposal',
      icon: Trash2,
      title: t('home.serviceCategories.disposal.title'),
      description: t('home.serviceCategories.disposal.description'),
      color: 'from-red-500 to-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-600',
      services: [
        { title: t('home.services.disposal.title'), description: t('home.services.disposal.description'), formHref: `/${locale}/form?service=disposal`, href: `/${locale}/services/disposal`, icon: Trash2 },
      ]
    },
    {
      id: 'household',
      icon: Heart,
      title: t('home.serviceCategories.household.title'),
      description: t('home.serviceCategories.household.description'),
      color: 'from-emerald-500 to-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      iconColor: 'text-emerald-600',
      services: [
        { title: t('home.services.householdHelping.title'), description: t('home.services.householdHelping.description'), formHref: `/${locale}/form?service=household-helping`, href: `/${locale}/services/household-helping`, icon: Heart },
      ]
    }
  ];

  return (
    <Layout>
      <SwissHero
        badge={t('freeOffer.title')}
        title={t('freeOffer.title')}
        subtitle={t('freeOffer.subtitle')}
        right={
          <img
            src="/Gallary/4.jpeg"
            alt={t('freeOffer.title')}
            className="w-full h-[340px] md:h-[420px] object-cover"
          />
        }
      />

      <section className="section-padding bg-swiss-section min-h-screen">
        <div className="container-max">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {t('freeOffer.servicesTitle')}
            </h2>
            <p className="text-lg text-swiss-body max-w-3xl mx-auto">
              {t('freeOffer.servicesDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {serviceCategories.map((category) => {
              const CategoryIcon = category.icon;
              const isExpanded = expandedCategory === category.id;
              
              return (
                <div key={category.id} className="relative">
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                    className={`w-full text-left bg-white rounded-2xl p-8 shadow-subtle hover:shadow-soft transition-all duration-300 border ${isExpanded ? category.borderColor : 'border-swiss-border'} overflow-hidden group`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center transition-all duration-300`}>
                          <CategoryIcon className={`w-8 h-8 ${category.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-swiss-text">{category.title}</h3>
                          <p className="text-swiss-body text-sm mt-1">{category.description}</p>
                          <span className="text-xs text-swiss-body mt-2 inline-block">{category.services.length} {category.services.length === 1 ? 'service' : 'services'}</span>
                        </div>
                      </div>
                      <ChevronDown className={`w-6 h-6 text-swiss-body transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className={`mt-3 bg-white rounded-2xl border ${category.borderColor} overflow-hidden shadow-soft animate-in fade-in duration-300`}>
                      {category.services.map((svc, svcIdx) => {
                        const SvcIcon = svc.icon;
                        return (
                          <div key={svcIdx} className={`p-5 ${svcIdx > 0 ? 'border-t border-swiss-border' : ''} hover:bg-swiss-section transition-colors`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-swiss-gray-50 rounded-xl flex items-center justify-center border border-swiss-border">
                                  <SvcIcon className="w-5 h-5 text-swiss-body" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-swiss-text">{svc.title}</h4>
                                </div>
                              </div>
                              <div className="flex items-center ml-4 flex-shrink-0">
                                <Link href={svc.formHref} className="text-xs font-semibold text-white bg-swiss-red rounded-full px-5 py-2 hover:bg-swiss-red/90 transition-colors whitespace-nowrap shadow-sm">
                                  {t('common.formLink')}
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
