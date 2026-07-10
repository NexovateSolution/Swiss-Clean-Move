'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/Layout';
import {
  Package,
  Sparkles,
  Truck,
  Building2,
  Trash2,
  UtensilsCrossed,
  Heart,
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle,
  Shield,
  Tag,
  Umbrella,
  Plus,
  ArrowRight,
  Home
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function FreeOfferPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();
  
  const services = [
    {
      id: 'combo',
      icon: (
        <div className="flex -space-x-2">
          <Package className="w-10 h-10 lg:w-12 lg:h-12 text-[#003366]" strokeWidth={1.5} />
          <Sparkles className="w-7 h-7 lg:w-8 lg:h-8 text-[#003366] bg-white rounded-full p-1 relative top-5 lg:top-6" strokeWidth={1.5} />
        </div>
      ),
      title: t('home.services.comboService.title'),
      description: t('home.services.comboService.description'),
      formHref: `/${locale}/form?service=house-cleaning`
    },
    {
      id: 'moving',
      icon: <Truck className="w-12 h-12 lg:w-14 lg:h-14 text-[#003366]" strokeWidth={1.5} />,
      title: t('home.services.relocation.title'),
      description: t('home.services.relocation.description'),
      formHref: `/${locale}/form?service=relocation`
    },
    {
      id: 'facility',
      icon: <Building2 className="w-12 h-12 lg:w-14 lg:h-14 text-[#003366]" strokeWidth={1.5} />,
      title: t('home.services.facilityServices.title'),
      description: t('home.services.facilityServices.description'),
      formHref: `/${locale}/form?service=facility-services`
    },
    {
      id: 'disposal',
      icon: <Trash2 className="w-12 h-12 lg:w-14 lg:h-14 text-[#003366]" strokeWidth={1.5} />,
      title: t('home.services.disposal.title'),
      description: t('home.services.disposal.description'),
      formHref: `/${locale}/form?service=disposal`
    },
    {
      id: 'gastronomy',
      icon: (
        <div className="relative">
          <UtensilsCrossed className="w-12 h-12 lg:w-14 lg:h-14 text-[#003366]" strokeWidth={1.5} />
        </div>
      ),
      title: t('home.services.gastronomyCleaning.title'),
      description: t('home.services.gastronomyCleaning.description'),
      formHref: `/${locale}/form?service=house-cleaning`
    },
    {
      id: 'household',
      icon: (
        <div className="relative">
          <Heart className="w-12 h-12 lg:w-14 lg:h-14 text-swiss-red" strokeWidth={1.5} />
          <Home className="w-6 h-6 lg:w-7 lg:h-7 text-[#003366] absolute bottom-1 right-1 bg-white rounded-full p-0.5" strokeWidth={2} />
        </div>
      ),
      title: t('home.services.householdHelping.title'),
      description: t('home.services.householdHelping.description'),
      formHref: `/${locale}/form?service=household-helping`
    }
  ];

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen pb-16 pt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <div className="flex-1">
              <span className="text-swiss-red font-bold uppercase tracking-wider text-sm mb-3 block">
                {t('freeOffer.title')}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#001f3f] mb-4 tracking-tight">
                {t('freeOffer.layout.mainTitle')}
              </h1>
              <p className="text-gray-600 text-lg max-w-xl">
                {t('freeOffer.layout.mainSubtitle')}
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-gray-700 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-bold text-[#001f3f] leading-tight">{t('freeOffer.layout.guarantees.abnahme.title')}</p>
                  <p className="text-xs text-gray-500">{t('freeOffer.layout.guarantees.abnahme.subtitle')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Tag className="w-6 h-6 text-gray-700 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-bold text-[#001f3f] leading-tight">{t('freeOffer.layout.guarantees.festpreis.title')}</p>
                  <p className="text-xs text-gray-500">{t('freeOffer.layout.guarantees.festpreis.subtitle')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Umbrella className="w-6 h-6 text-gray-700 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-bold text-[#001f3f] leading-tight">{t('freeOffer.layout.guarantees.haftpflicht.title')}</p>
                  <p className="text-xs text-gray-500">{t('freeOffer.layout.guarantees.haftpflicht.subtitle')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Plus className="w-6 h-6 text-swiss-red flex-shrink-0" strokeWidth={2} />
                <div>
                  <p className="text-sm font-bold text-[#001f3f] leading-tight">{t('freeOffer.layout.guarantees.schweizweit.title')}</p>
                  <p className="text-xs text-gray-500">{t('freeOffer.layout.guarantees.schweizweit.subtitle')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="mb-12 border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center max-w-4xl mx-auto relative">
              <div className="absolute top-6 left-[10%] right-[10%] h-[2px] bg-gray-200 -z-10"></div>
              
              <div className="flex flex-col items-center gap-3 bg-gray-50 px-2">
                <div className="w-12 h-12 rounded-full border-2 border-[#0056b3] text-[#0056b3] font-bold text-xl flex items-center justify-center bg-white">1</div>
                <span className="text-xs font-bold text-[#0056b3] uppercase tracking-wider">{t('freeOffer.layout.steps.service')}</span>
              </div>
              <div className="flex flex-col items-center gap-3 bg-gray-50 px-2">
                <div className="w-12 h-12 rounded-full border border-gray-300 text-gray-400 font-bold text-xl flex items-center justify-center bg-white">2</div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('freeOffer.layout.steps.adresse')}</span>
              </div>
              <div className="flex flex-col items-center gap-3 bg-gray-50 px-2">
                <div className="w-12 h-12 rounded-full border border-gray-300 text-gray-400 font-bold text-xl flex items-center justify-center bg-white">3</div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('freeOffer.layout.steps.details')}</span>
              </div>
              <div className="flex flex-col items-center gap-3 bg-gray-50 px-2">
                <div className="w-12 h-12 rounded-full border border-gray-300 text-gray-400 font-bold text-xl flex items-center justify-center bg-white">4</div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('freeOffer.layout.steps.extras')}</span>
              </div>
              <div className="flex flex-col items-center gap-3 bg-gray-50 px-2">
                <div className="w-12 h-12 rounded-full border border-gray-300 text-gray-400 font-bold text-xl flex items-center justify-center bg-white">5</div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('freeOffer.layout.steps.offerte')}</span>
              </div>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 2).map((svc) => (
              <ServiceCard key={svc.id} service={svc} />
            ))}
            
            {/* Personal Consultation Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <p className="text-swiss-red text-xs font-bold mb-1">{t('freeOffer.layout.consultation.title')}</p>
                <h3 className="text-xl font-bold text-[#001f3f] mb-4">{t('freeOffer.layout.consultation.subtitle')}</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-[#001f3f] font-medium">
                    <CheckCircle className="w-4 h-4 text-swiss-red flex-shrink-0" /> {t('freeOffer.layout.consultation.free')}
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#001f3f] font-medium">
                    <CheckCircle className="w-4 h-4 text-swiss-red flex-shrink-0" /> {t('freeOffer.layout.consultation.fast')}
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#001f3f] font-medium">
                    <CheckCircle className="w-4 h-4 text-swiss-red flex-shrink-0" /> {t('freeOffer.layout.consultation.custom')}
                  </li>
                </ul>
              </div>
              <a href="tel:+41782158030" className="w-full bg-[#cc0000] hover:bg-[#a30000] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                <Phone className="w-5 h-5 fill-current" />
                {t('freeOffer.layout.consultation.callNow')}
              </a>
            </div>

            {services.slice(2, 6).map((svc) => (
              <ServiceCard key={svc.id} service={svc} />
            ))}

            {/* Google Reviews Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(i => (
                  <StarIcon key={i} className="w-6 h-6 text-[#fbbc04] fill-current" />
                ))}
              </div>
              <h3 className="text-3xl font-extrabold text-[#001f3f] mb-2 flex items-center gap-2">
                {t('freeOffer.layout.reviews.rating')} <span className="text-lg text-gray-400 font-semibold">{t('freeOffer.layout.reviews.outOf')}</span>
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium whitespace-pre-line leading-snug">
                <GoogleGIcon className="w-8 h-8" />
                <span className="text-left">{t('freeOffer.layout.reviews.text')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar (Moved from fixed position to the end of the page) */}
      <div className="bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-gray-200 mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Desktop only bottom guarantees */}
            <div className="hidden lg:flex items-center gap-8 text-xs">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-700" />
                <div><span className="font-bold text-[#001f3f]">{t('freeOffer.layout.guarantees.abnahme.title')}</span><br/><span className="text-gray-500">{t('freeOffer.layout.guarantees.abnahme.subtitle')}</span></div>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-gray-700" />
                <div><span className="font-bold text-[#001f3f]">{t('freeOffer.layout.guarantees.festpreis.title')}</span><br/><span className="text-gray-500">{t('freeOffer.layout.guarantees.festpreis.subtitle')}</span></div>
              </div>
              <div className="flex items-center gap-2">
                <Umbrella className="w-5 h-5 text-gray-700" />
                <div><span className="font-bold text-[#001f3f]">{t('freeOffer.layout.guarantees.haftpflicht.title')}</span><br/><span className="text-gray-500">{t('freeOffer.layout.guarantees.haftpflicht.subtitle')}</span></div>
              </div>
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-swiss-red" />
                <div><span className="font-bold text-[#001f3f]">{t('freeOffer.layout.guarantees.schweizweit.title')}</span><br/><span className="text-gray-500">{t('freeOffer.layout.guarantees.schweizweit.subtitle')}</span></div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex w-full lg:w-auto items-center justify-center gap-2 sm:gap-4">
              <a href="tel:+41782158030" className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#001f3f] text-white py-3 px-4 sm:px-6 rounded-xl hover:bg-[#003366] transition-colors font-medium">
                <Phone className="w-5 h-5" />
                <div className="text-left leading-tight hidden sm:block">
                  <div className="text-[10px] uppercase tracking-wider text-gray-300">{t('freeOffer.layout.bottomBar.call')}</div>
                  <div className="text-sm font-bold">+41 78 215 80 30</div>
                </div>
                <span className="sm:hidden text-sm font-bold">{t('freeOffer.layout.bottomBar.call')}</span>
              </a>
              <a href="https://wa.me/41782158030" className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-4 sm:px-6 rounded-xl hover:bg-[#1ebd5a] transition-colors font-medium">
                <MessageCircle className="w-5 h-5" />
                <div className="text-left leading-tight hidden sm:block">
                  <div className="text-[10px] uppercase tracking-wider text-green-100">{t('freeOffer.layout.bottomBar.whatsapp')}</div>
                  <div className="text-sm font-bold">{t('freeOffer.layout.bottomBar.message')}</div>
                </div>
                <span className="sm:hidden text-sm font-bold">{t('freeOffer.layout.bottomBar.whatsapp')}</span>
              </a>
              <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#cc0000] text-white py-3 px-4 sm:px-6 rounded-xl hover:bg-[#a30000] transition-colors font-medium">
                <Calendar className="w-5 h-5" />
                <div className="text-left leading-tight hidden sm:block">
                  <div className="text-[10px] uppercase tracking-wider text-red-100">{t('freeOffer.layout.bottomBar.freeQuote')}</div>
                  <div className="text-sm font-bold">{t('freeOffer.layout.bottomBar.requestNow')}</div>
                </div>
                <span className="sm:hidden text-sm font-bold">{t('freeOffer.layout.bottomBar.freeQuote')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
}

function ServiceCard({ service }: { service: any }) {
  return (
    <Link href={service.formHref} className="block group">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full flex flex-col transition-all duration-300 hover:shadow-md hover:border-gray-200 relative">
        <div className="mb-6">
          {service.icon}
        </div>
        <h3 className="text-xl font-bold text-[#001f3f] mb-3 group-hover:text-swiss-red transition-colors">{service.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">{service.description}</p>
        
        <div className="absolute bottom-6 right-6">
          <div className="w-10 h-10 rounded-full border-2 border-swiss-red flex items-center justify-center text-swiss-red group-hover:bg-swiss-red group-hover:text-white transition-colors">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function StarIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}

function GoogleGIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
