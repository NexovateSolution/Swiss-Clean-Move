'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/Layout';
import {
  Package,
  Sparkles,
  Truck,
  Key,
  Building2,
  Trash2,
  UtensilsCrossed,
  Home,
  Wrench,
  Heart,
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle,
  Shield,
  Tag,
  Umbrella,
  Plus,
  ArrowRight
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function FreeOfferPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();
  
  const services = [
    {
      id: 'combo',
      icon: (
        <div className="flex -space-x-2">
          <Package className="w-8 h-8 text-[#003366]" strokeWidth={1.5} />
          <Sparkles className="w-6 h-6 text-[#003366] bg-white rounded-full p-1 relative top-4" strokeWidth={1.5} />
        </div>
      ),
      title: t('home.services.comboService.title'),
      description: t('home.services.comboService.description'),
      formHref: `/${locale}/form?service=house-cleaning` // Link to house cleaning (or relocation) for combo
    },
    {
      id: 'moving',
      icon: <Truck className="w-10 h-10 text-[#003366]" strokeWidth={1.5} />,
      title: t('home.services.relocation.title'),
      description: t('home.services.relocation.description'),
      formHref: `/${locale}/form?service=relocation`
    },
    {
      id: 'cleaning',
      icon: (
        <div className="flex -space-x-2">
          <Sparkles className="w-6 h-6 text-[#003366] relative -top-2" strokeWidth={1.5} />
          <div className="w-8 h-8 border-2 border-[#003366] rounded-b-lg border-t-0 relative">
            <div className="absolute -top-3 left-1 w-6 h-2 border-2 border-[#003366] rounded-t-lg"></div>
          </div>
        </div>
      ),
      title: t('home.services.umzugsreinigung.title') || t('home.services.finalCleaning.title'),
      description: t('home.services.umzugsreinigung.description') || t('home.services.finalCleaning.description'),
      formHref: `/${locale}/form?service=house-cleaning`
    },
    {
      id: 'apartment-cleaning',
      icon: (
        <div className="relative">
          <Key className="w-10 h-10 text-[#003366] -rotate-45" strokeWidth={1.5} />
          <Sparkles className="w-5 h-5 text-swiss-red absolute top-0 right-0" strokeWidth={2} />
        </div>
      ),
      title: t('home.services.apartmentCleaning.title'),
      description: t('home.services.apartmentCleaning.description'),
      formHref: `/${locale}/form?service=house-cleaning`
    },
    {
      id: 'facility',
      icon: <Building2 className="w-10 h-10 text-[#003366]" strokeWidth={1.5} />,
      title: t('home.services.facilityServices.title'),
      description: t('home.services.facilityServices.description'),
      formHref: `/${locale}/form?service=facility-services`
    },
    {
      id: 'disposal',
      icon: <Trash2 className="w-10 h-10 text-[#003366]" strokeWidth={1.5} />,
      title: t('home.services.disposal.title'),
      description: t('home.services.disposal.description'),
      formHref: `/${locale}/form?service=disposal`
    },
    {
      id: 'gastronomy',
      icon: (
        <div className="relative">
          <UtensilsCrossed className="w-10 h-10 text-[#003366]" strokeWidth={1.5} />
        </div>
      ),
      title: t('home.services.gastronomyCleaning.title'),
      description: t('home.services.gastronomyCleaning.description'),
      formHref: `/${locale}/form?service=house-cleaning`
    },
    {
      id: 'maintenance',
      icon: <Home className="w-10 h-10 text-[#003366]" strokeWidth={1.5} />,
      title: t('home.services.propertyMaintenance.title'),
      description: t('home.services.propertyMaintenance.description'),
      formHref: `/${locale}/form?service=facility-services`
    },
    {
      id: 'assembly',
      icon: <Wrench className="w-10 h-10 text-[#003366]" strokeWidth={1.5} />,
      title: 'Möbelmontage', // Will be added to translation later, or fallback
      description: 'Demontage und Montage aller Möbel, IKEA, Schränke und Büromöbel.',
      formHref: `/${locale}/form?service=relocation`
    },
    {
      id: 'household',
      icon: (
        <div className="relative">
          <Heart className="w-10 h-10 text-swiss-red" strokeWidth={1.5} />
          <Home className="w-5 h-5 text-[#003366] absolute bottom-1 right-1 bg-white rounded-full p-0.5" strokeWidth={2} />
        </div>
      ),
      title: t('home.services.householdHelping.title'),
      description: t('home.services.householdHelping.description'),
      formHref: `/${locale}/form?service=household-helping`
    }
  ];

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen pb-32 pt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <div className="flex-1">
              <span className="text-swiss-red font-bold uppercase tracking-wider text-sm mb-3 block">
                {t('freeOffer.title')}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#001f3f] mb-4 tracking-tight">
                Was benötigen Sie?
              </h1>
              <p className="text-gray-600 text-lg max-w-xl">
                Wählen Sie den passenden Service und erhalten Sie in wenigen Schritten Ihre unverbindliche Offerte.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-gray-700 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-bold text-[#001f3f] leading-tight">100% Abnahmegarantie</p>
                  <p className="text-xs text-gray-500">Bei Wohnungsübergabe</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Tag className="w-6 h-6 text-gray-700 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-bold text-[#001f3f] leading-tight">Transparente Festpreise</p>
                  <p className="text-xs text-gray-500">Keine versteckten Kosten</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Umbrella className="w-6 h-6 text-gray-700 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-bold text-[#001f3f] leading-tight">Haftpflichtversichert</p>
                  <p className="text-xs text-gray-500">Für Ihre Sicherheit</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Plus className="w-6 h-6 text-swiss-red flex-shrink-0" strokeWidth={2} />
                <div>
                  <p className="text-sm font-bold text-[#001f3f] leading-tight">Schweizweit für Sie da</p>
                  <p className="text-xs text-gray-500">Schnell & zuverlässig</p>
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
                <span className="text-xs font-bold text-[#0056b3] uppercase tracking-wider">Service</span>
              </div>
              <div className="flex flex-col items-center gap-3 bg-gray-50 px-2">
                <div className="w-12 h-12 rounded-full border border-gray-300 text-gray-400 font-bold text-xl flex items-center justify-center bg-white">2</div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Adresse</span>
              </div>
              <div className="flex flex-col items-center gap-3 bg-gray-50 px-2">
                <div className="w-12 h-12 rounded-full border border-gray-300 text-gray-400 font-bold text-xl flex items-center justify-center bg-white">3</div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Details</span>
              </div>
              <div className="flex flex-col items-center gap-3 bg-gray-50 px-2">
                <div className="w-12 h-12 rounded-full border border-gray-300 text-gray-400 font-bold text-xl flex items-center justify-center bg-white">4</div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Extras</span>
              </div>
              <div className="flex flex-col items-center gap-3 bg-gray-50 px-2">
                <div className="w-12 h-12 rounded-full border border-gray-300 text-gray-400 font-bold text-xl flex items-center justify-center bg-white">5</div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Offerte</span>
              </div>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 3).map((svc) => (
              <ServiceCard key={svc.id} service={svc} />
            ))}
            
            {services.slice(3, 9).map((svc) => (
              <ServiceCard key={svc.id} service={svc} />
            ))}
            
            {services.slice(9, 10).map((svc) => (
              <ServiceCard key={svc.id} service={svc} />
            ))}

            {/* Personal Consultation Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <p className="text-swiss-red text-xs font-bold mb-1">Persönliche Beratung</p>
                <h3 className="text-xl font-bold text-[#001f3f] mb-4">Wir sind für Sie da!</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-[#001f3f] font-medium">
                    <CheckCircle className="w-4 h-4 text-swiss-red flex-shrink-0" /> Kostenlos & unverbindlich
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#001f3f] font-medium">
                    <CheckCircle className="w-4 h-4 text-swiss-red flex-shrink-0" /> Schnelle Antwort
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#001f3f] font-medium">
                    <CheckCircle className="w-4 h-4 text-swiss-red flex-shrink-0" /> Individuelle Lösung
                  </li>
                </ul>
              </div>
              <a href="tel:+41782158030" className="w-full bg-[#cc0000] hover:bg-[#a30000] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                <Phone className="w-5 h-5 fill-current" />
                Jetzt anrufen
              </a>
            </div>

            {/* Google Reviews Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(i => (
                  <StarIcon key={i} className="w-6 h-6 text-swiss-red fill-current" />
                ))}
              </div>
              <h3 className="text-3xl font-extrabold text-[#001f3f] mb-1">5.0<span className="text-lg text-gray-400 font-semibold">/5</span></h3>
              <p className="text-sm text-gray-600 font-medium">100+ Bewertungen<br/>auf Google</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Desktop only bottom guarantees */}
            <div className="hidden lg:flex items-center gap-8 text-xs">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-700" />
                <div><span className="font-bold text-[#001f3f]">100% Abnahmegarantie</span><br/><span className="text-gray-500">Bei Wohnungsübergabe</span></div>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-gray-700" />
                <div><span className="font-bold text-[#001f3f]">Transparente Festpreise</span><br/><span className="text-gray-500">Keine versteckten Kosten</span></div>
              </div>
              <div className="flex items-center gap-2">
                <Umbrella className="w-4 h-4 text-gray-700" />
                <div><span className="font-bold text-[#001f3f]">Haftpflichtversichert</span><br/><span className="text-gray-500">Für Ihre Sicherheit</span></div>
              </div>
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-swiss-red" />
                <div><span className="font-bold text-[#001f3f]">Schweizweit für Sie da</span><br/><span className="text-gray-500">Schnell & zuverlässig</span></div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex w-full lg:w-auto items-center justify-center gap-2 sm:gap-4">
              <a href="tel:+41782158030" className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#001f3f] text-white py-3 px-4 sm:px-6 rounded-xl hover:bg-[#003366] transition-colors font-medium">
                <Phone className="w-5 h-5" />
                <div className="text-left leading-tight hidden sm:block">
                  <div className="text-[10px] uppercase tracking-wider text-gray-300">Anrufen</div>
                  <div className="text-sm font-bold">+41 78 215 80 30</div>
                </div>
                <span className="sm:hidden text-sm font-bold">Anrufen</span>
              </a>
              <a href="https://wa.me/41782158030" className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-4 sm:px-6 rounded-xl hover:bg-[#1ebd5a] transition-colors font-medium">
                <MessageCircle className="w-5 h-5" />
                <div className="text-left leading-tight hidden sm:block">
                  <div className="text-[10px] uppercase tracking-wider text-green-100">WhatsApp</div>
                  <div className="text-sm font-bold">Nachricht senden</div>
                </div>
                <span className="sm:hidden text-sm font-bold">WhatsApp</span>
              </a>
              <a href="#top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#cc0000] text-white py-3 px-4 sm:px-6 rounded-xl hover:bg-[#a30000] transition-colors font-medium">
                <Calendar className="w-5 h-5" />
                <div className="text-left leading-tight hidden sm:block">
                  <div className="text-[10px] uppercase tracking-wider text-red-100">Kostenlose Offerte</div>
                  <div className="text-sm font-bold">Jetzt anfordern</div>
                </div>
                <span className="sm:hidden text-sm font-bold">Offerte</span>
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
