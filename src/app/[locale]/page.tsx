'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import { useState, useEffect } from 'react';
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
  Phone,
  ArrowRight,
  Shield,
  Clock,
  Users,
  Award,
  Sparkles,
  MapPin,
  Calendar,
  Heart,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Play,
  Pause
} from 'lucide-react';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();

  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Slideshow images data
  const slideImages = [
    {
      url: '/images/transportation.jpg',
      title: t('home.hero.slides.transport.title'),
      description: t('home.hero.slides.transport.description')
    },
    {
      url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: t('home.hero.slides.houseCleaning.title'),
      description: t('home.hero.slides.houseCleaning.description')
    },
    {
      url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: t('home.hero.slides.expertMoving.title'),
      description: t('home.hero.slides.expertMoving.description')
    },
    {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: t('home.hero.slides.office.title'),
      description: t('home.hero.slides.office.description')
    },
    {
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: t('home.hero.slides.final.title'),
      description: t('home.hero.slides.final.description')
    }
  ];

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slideImages.length]);

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
        { title: t('home.services.facilityServices.title'), description: t('home.services.facilityServices.description'), formHref: `/${locale}/form?service=facility-services`, href: `/${locale}/hauswartung-biel`, icon: Building2 },
        { title: t('home.services.windowCleaning.title'), description: t('home.services.windowCleaning.description'), formHref: `/${locale}/form?service=window-cleaning`, href: `/${locale}/services/window-cleaning`, icon: HomeIcon },
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

  const testimonials = locale === 'fr' ? [
    {
      name: 'Nazret Bahram',
      rating: 5,
      text: 'Excellente expérience avec SwissCleanMove. Communication rapide, équipe ponctuelle et travail très soigné. L\'appartement a été parfaitement nettoyé avec garantie de remise des clés. Merci beaucoup à toute l\'équipe.',
    },
    {
      name: 'Boran Aris',
      rating: 5,
      text: 'Rien à dire le boulot est impeccables, je recommande à 100%.',
    },
    {
      name: 'Pedro All',
      rating: 5,
      text: 'Service de nettoyage parfait en cas de déménagement, impeccable tout est propre, l\'équipe est très aimable et professionnel je n\'hésiterai pas à rappeler. Merci beaucoup',
    }
  ] : locale === 'en' ? [
    {
      name: 'Nazret Bahram',
      rating: 5,
      text: 'Excellent experience with SwissCleanMove. Fast communication, punctual team, and very thorough work. The apartment was perfectly cleaned with key handover guarantee. Thank you very much to the whole team.',
    },
    {
      name: 'Boran Aris',
      rating: 5,
      text: 'Nothing to say, the work is impeccable. I recommend 100%.',
    },
    {
      name: 'Pedro All',
      rating: 5,
      text: 'Perfect cleaning service for moving, impeccable — everything is clean. The team is very friendly and professional. I won\'t hesitate to call again. Thank you very much!',
    }
  ] : [
    {
      name: 'Nazret Bahram',
      rating: 5,
      text: 'Ausgezeichnete Erfahrung mit SwissCleanMove. Schnelle Kommunikation, pünktliches Team und sehr sorgfältige Arbeit. Die Wohnung wurde perfekt gereinigt mit Schlüsselübergabe-Garantie. Vielen Dank an das gesamte Team.',
    },
    {
      name: 'Boran Aris',
      rating: 5,
      text: 'Nichts zu beanstanden, die Arbeit ist einwandfrei. Ich empfehle zu 100%.',
    },
    {
      name: 'Pedro All',
      rating: 5,
      text: 'Perfekter Reinigungsservice beim Umzug, tadellos — alles ist sauber. Das Team ist sehr freundlich und professionell. Ich werde nicht zögern, wieder anzurufen. Vielen Dank!',
    }
  ];

  return (
    <Layout>
      {/* Swiss-themed Hero Section */}
      <SwissHero
        badge={t('home.hero.badge')}
        title={
          <>
            <span style={{ color: '#CC0000' }}>Swiss</span>
            <span style={{ color: '#1B2A4A' }}>CleanMove</span>
            <br />
            <span className="text-[16px] md:text-[20px] font-semibold text-swiss-body">{t('home.hero.title')}</span>
            <br />
            <span className="text-[13px] md:text-[15px] font-medium text-swiss-body">{t('home.hero.subtitle')}</span>
            <br />
            <span className="text-[13px] md:text-[15px] font-medium text-swiss-body">{t('home.hero.subtitle2')}</span>
          </>
        }
        cta={
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <Link
                href={`/${locale}/free-offer`}
                className="btn-primary inline-flex items-center justify-center"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{t('home.hero.cta')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <a
                href="tel:+41782158030"
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5 text-swiss-red" />
                <span>+41 78 215 80 30</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {[
                { de: '✓ Abnahmegarantie', en: '✓ Handover Guarantee', fr: '✓ Garantie de remise' },
                { de: '✓ Haftpflichtversichert', en: '✓ Liability Insured', fr: '✓ Assurance responsabilité civile' },
                { de: '✓ Schweizweiter Service', en: '✓ Nationwide Service Across Switzerland', fr: '✓ Service dans toute la Suisse' },
                { de: '✓ Transparente Preise', en: '✓ Transparent Pricing', fr: '✓ Prix transparents' },
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-swiss-red flex-shrink-0" />
                  <span className="text-sm font-medium text-swiss-text">{item[locale as 'de' | 'en' | 'fr'] || item.de}</span>
                </div>
              ))}
            </div>
          </div>
        }
        right={
          <div className="relative">
            <div className="relative h-[340px] md:h-[420px] w-full">
              {slideImages.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  <img
                    src={slide.url}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      if (!img.dataset.fallback) {
                        img.dataset.fallback = 'png';
                        img.src = '/images/transportation.png';
                        return;
                      }
                      img.onerror = null;
                      img.src = 'https://images.unsplash.com/photo-1569152811536-7f17e9f1c989?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              ))}

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-bold text-xl mb-2">{slideImages[currentSlide]?.title}</h3>
                <p className="text-swiss-body text-sm">{slideImages[currentSlide]?.description}</p>
              </div>

              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-300 shadow-subtle"
              >
                <ChevronLeft className="w-5 h-5 text-swiss-text" />
              </button>

              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slideImages.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-300 shadow-subtle"
              >
                <ChevronRight className="w-5 h-5 text-swiss-text" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slideImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/70'
                      }`}
                  />
                ))}
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-soft border border-swiss-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-swiss-softRed rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-swiss-red" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t('home.hero.qualityBadge.title')}</p>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-swiss-red fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-soft border border-swiss-border">
              <Award className="w-6 h-6 text-swiss-red" />
            </div>
          </div>
        }
      />

      {/* Enhanced Services Section */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          {/* Section Header */}
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-swiss-text">
              {t('home.services.title')}
            </h2>
            <p className="text-xl text-swiss-body max-w-3xl mx-auto leading-relaxed">
              {t('home.services.subtitle')}
            </p>
          </div>

          {/* Service Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceCategories.map((category) => {
              const CategoryIcon = category.icon;
              const isExpanded = expandedCategory === category.id;
              return (
                <div key={category.id} className="relative">
                  {/* Category Card */}
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

                  {/* Expanded Sub-services */}
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
                                  <p className="text-xs text-swiss-body line-clamp-1 mt-0.5">{svc.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                                <Link href={svc.href} className="text-xs font-medium text-swiss-red hover:underline hidden sm:inline">{t('common.learnMore')}</Link>
                                <Link href={svc.formHref} className="text-xs font-semibold text-white bg-swiss-red rounded-full px-4 py-1.5 hover:bg-swiss-red/90 transition-colors whitespace-nowrap">
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

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-swiss-body mb-6">{t('home.services.customSolution')}</p>
            <Link
              href={`/${locale}/services`}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>{t('home.services.viewAll')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Haushaltshilfe & Privatreinigung – Premium Highlight */}
      <section className="section-padding bg-white border-b border-swiss-border">
        <div className="container-max">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Facility Service & Hauswartung – Premium Highlight */}
            <div className="card p-8 md:p-10 bg-swiss-section border border-swiss-border relative overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-swiss-red via-swiss-red/60 to-transparent"></div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Icon */}
                <div className="w-16 h-16 bg-swiss-softRed border border-swiss-border rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-8 h-8 text-swiss-red" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
                    {locale === 'en' ? 'Property Maintenance Biel/Bienne & Facility Service' : locale === 'fr' ? 'Entretien de Propriétés Bienne/Bienne' : 'Hauswartung Reinigung Biel/Bienne'}
                  </h2>
                  <p className="text-swiss-body leading-relaxed">
                    {locale === 'en'
                      ? 'Professional property maintenance, facility services, and building cleaning for B2B clients in Biel/Bienne & Seeland — technical building services, stairwell cleaning, and winter service.'
                      : locale === 'fr'
                        ? 'Entretien professionnel de propriétés, facility services et nettoyage de bâtiments pour les clients B2B à Bienne & Seeland — service technique, nettoyage des escaliers et service hivernal.'
                        : 'Professionelle Hauswartung Reinigung und Facility Services für B2B-Kunden in Biel/Bienne & Seeland — technischer Hausdienst, Treppenhausreinigung und Winterdienst.'}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex-shrink-0">
                  <Link
                    href={`/${locale}/hauswartung-biel`}
                    className="btn-primary inline-flex items-center space-x-2 whitespace-nowrap"
                  >
                    <span>{locale === 'en' ? 'Learn More' : locale === 'fr' ? 'En savoir plus' : 'Mehr erfahren'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Haushaltshilfe & Privatreinigung – Premium Highlight */}
            <div className="card p-8 md:p-10 bg-swiss-section border border-swiss-border relative overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-swiss-red via-swiss-red/60 to-transparent"></div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Icon */}
                <div className="w-16 h-16 bg-swiss-softRed border border-swiss-border rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-8 h-8 text-swiss-red" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
                    {locale === 'en' ? 'Household Help & Private Cleaning' : locale === 'fr' ? 'Aide ménagère & Nettoyage privé' : 'Haushaltshilfe & Privatreinigung'}
                  </h2>
                  <p className="text-swiss-body leading-relaxed">
                    {locale === 'en'
                      ? 'Professional household help and regular apartment cleaning for private clients in Biel & Seeland — flexible, reliable, and to Swiss quality standards.'
                      : locale === 'fr'
                        ? 'Aide ménagère professionnelle et nettoyage régulier d\'appartement pour les particuliers à Bienne & Seeland — flexible, fiable et selon les standards de qualité suisses.'
                        : 'Professionelle Haushaltshilfe und regelmässige Wohnungsreinigung für Privatkunden in Biel & Seeland — flexibel, zuverlässig und nach Schweizer Qualitätsstandard.'}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex-shrink-0">
                  <Link
                    href={`/${locale}/haushaltshilfe-biel`}
                    className="btn-primary inline-flex items-center space-x-2 whitespace-nowrap"
                  >
                    <span>{locale === 'en' ? 'Learn More' : locale === 'fr' ? 'En savoir plus' : 'Mehr erfahren'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Locations Section */}
      <section className="section-padding bg-white border-b border-swiss-border">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-swiss-text">
              {t('home.regional.title')}
            </h2>
            <p className="text-xl text-swiss-body max-w-2xl mx-auto">
              {t('home.regional.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center mb-12">
            {[
              { city: 'Biel/Bienne', slug: 'biel' },
              { city: 'Nidau', slug: 'nidau' },
              { city: 'Lyss', slug: 'lyss' },
              { city: 'Brügg', slug: 'bruegg' },
              { city: 'Ipsach', slug: 'ipsach' },
              { city: 'Aarberg', slug: 'aarberg' },
              { city: 'Pieterlen', slug: 'pieterlen' }
            ].map((loc) => (
              <div key={loc.slug} className="group">
                <Link href={`/${locale}/regions`} className="block p-4 rounded-xl border border-swiss-border hover:border-swiss-red hover:shadow-soft transition-all duration-300">
                  <MapPin className="w-6 h-6 text-swiss-red mx-auto mb-2 group-hover:-translate-y-1 transition-transform" />
                  <span className="font-semibold text-swiss-text group-hover:text-swiss-red transition-colors">
                    {loc.city}
                  </span>
                </Link>
              </div>
            ))}
          </div>

          {/* Switzerland-wide Einsatzgebiete */}
          <div className="max-w-4xl mx-auto space-y-6 text-center pt-12 border-t border-swiss-border">
            <h3 className="text-2xl font-bold text-swiss-text">
              {locale === 'en' ? 'Operational Throughout Switzerland' : locale === 'fr' ? 'Opérationnel dans toute la Suisse' : 'Schweizweit im Einsatz'}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: 'Bern', slug: 'bern' },
                { name: 'Zürich', slug: 'zuerich' },
                { name: 'Solothurn', slug: 'solothurn' },
                { name: 'Neuchâtel', slug: 'neuchatel' },
                { name: 'Fribourg', slug: 'fribourg' },
                { name: 'Basel', slug: 'basel' },
                { name: 'Aargau', slug: 'aargau' },
                { name: 'Ganze Schweiz', slug: '' },
              ].map((loc, i) =>
                loc.slug ? (
                  <Link key={i} href={`/${locale}/${loc.slug}`} className="px-5 py-2.5 bg-swiss-section border border-swiss-border rounded-xl shadow-subtle font-medium text-swiss-text flex items-center space-x-2 hover:border-swiss-red/40 hover:shadow-medium transition-all cursor-pointer">
                    <MapPin className="w-4 h-4 text-swiss-red" />
                    <span>{loc.name}</span>
                  </Link>
                ) : (
                  <span key={i} className="px-5 py-2.5 bg-swiss-section border border-swiss-border rounded-xl shadow-subtle font-medium text-swiss-text flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-swiss-red" />
                    <span>{loc.name}</span>
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section - COMMENTED OUT
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-swiss-softRed border border-swiss-border rounded-full px-4 py-2 text-sm font-medium mb-6 text-swiss-text">
              <Award className="w-4 h-4 text-swiss-red" />
              <span>{t('home.numbers.badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-swiss-text">{t('home.numbers.title')}</h2>
            <p className="text-xl text-swiss-body max-w-2xl mx-auto">{t('home.numbers.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center px-6 py-8">
              <div className="text-4xl font-bold text-swiss-text">50+</div>
              <div className="mx-auto mt-3 h-0.5 w-10 bg-swiss-red rounded-full"></div>
              <div className="mt-4 text-swiss-body font-medium">{t('home.numbers.items.happyClients')}</div>
            </div>
            <div className="text-center px-6 py-8 md:border-l md:border-swiss-border">
              <div className="text-4xl font-bold text-swiss-text">50+</div>
              <div className="mx-auto mt-3 h-0.5 w-10 bg-swiss-red rounded-full"></div>
              <div className="mt-4 text-swiss-body font-medium">{t('home.numbers.items.projectsCompleted')}</div>
            </div>
            <div className="text-center px-6 py-8 md:border-l md:border-swiss-border">
              <div className="text-4xl font-bold text-swiss-text">{t('home.hero.trust.all')}</div>
              <div className="mx-auto mt-3 h-0.5 w-10 bg-swiss-red rounded-full"></div>
              <div className="mt-4 text-swiss-body font-medium">{t('home.numbers.items.swissCantons')}</div>
            </div>
            <div className="text-center px-6 py-8 md:border-l md:border-swiss-border">
              <div className="text-4xl font-bold text-swiss-text">5+</div>
              <div className="mx-auto mt-3 h-0.5 w-10 bg-swiss-red rounded-full"></div>
              <div className="mt-4 text-swiss-body font-medium">{t('home.numbers.items.yearsExperience')}</div>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Enhanced Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          {/* Section Header */}
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center space-x-2 bg-swiss-softRed text-swiss-text rounded-full px-4 py-2 text-sm font-medium border border-swiss-border">
              <Heart className="w-4 h-4 text-swiss-red" />
              <span>{t('home.testimonials.badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-swiss-text">
              {t('home.testimonials.title')}
            </h2>
            <p className="text-xl text-swiss-body max-w-3xl mx-auto leading-relaxed">
              {t('home.testimonials.subtitle')}
            </p>
          </div>

          {/* Google Reviews Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
            {/* Google Reviews Summary Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-subtle border border-swiss-border h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-swiss-border shadow-sm flex items-center justify-center bg-white">
                  <img src="/images/logo.png" alt="SwissCleanMove" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-swiss-text text-lg">SwissCleanMove</h3>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    <span className="text-lg font-bold text-[#e7711b]">4.4</span>
                    <div className="flex space-x-0.5">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-[#e7711b] fill-current" />
                      ))}
                      <Star className="w-5 h-5 text-[#e7711b]" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                    </div>
                  </div>
                  <p className="text-sm text-swiss-body mt-1">
                    {locale === 'en' ? 'Based on 10 reviews' : locale === 'fr' ? 'Basé sur 10 avis' : 'Basierend auf 10 Bewertungen'}
                  </p>
                  <p className="text-xs text-swiss-body mt-1">
                    powered by <span className="text-blue-600 font-semibold">Google</span>
                  </p>
                </div>
                <a
                  href="https://g.page/r/CaR3s0KCpz1O/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-white border-2 border-swiss-border rounded-full px-5 py-2.5 text-sm font-semibold text-swiss-text hover:shadow-md hover:border-blue-300 transition-all"
                >
                  <span>{locale === 'en' ? 'review us on' : locale === 'fr' ? 'évaluez-nous sur' : 'Bewerten Sie uns auf'}</span>
                  <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Testimonial Review Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="group">
                  <div className="bg-white rounded-2xl p-6 shadow-subtle hover:shadow-soft transition-all duration-300 border border-swiss-border relative h-full">
                    {/* Google icon */}
                    <div className="absolute top-4 right-4">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 opacity-60" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>

                    <div className="space-y-4">
                      {/* Customer Info - Top */}
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-swiss-softRed rounded-full flex items-center justify-center text-swiss-red font-bold text-base flex-shrink-0">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-swiss-text text-sm">{testimonial.name}</p>
                          <p className="text-xs text-swiss-body">
                            {index === 0
                              ? (locale === 'en' ? '3 months ago' : locale === 'fr' ? 'il y a 3 mois' : 'vor 3 Monaten')
                              : index === 1
                              ? (locale === 'en' ? '1 month ago' : locale === 'fr' ? 'il y a 1 mois' : 'vor 1 Monat')
                              : (locale === 'en' ? '2 weeks ago' : locale === 'fr' ? 'il y a 2 semaines' : 'vor 2 Wochen')}
                          </p>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center space-x-0.5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-swiss-body text-sm leading-relaxed">
                        {testimonial.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="bg-swiss-section rounded-2xl p-8 shadow-subtle border border-swiss-border">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-swiss-text mb-2">{t('home.trustBadges.title')}</h3>
              <p className="text-swiss-body">{t('home.trustBadges.subtitle')}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              <div className="text-center group">
                <div className="bg-white rounded-xl p-6 transition-all duration-300 border border-swiss-border shadow-subtle group-hover:shadow-soft">
                  <Shield className="w-8 h-8 text-swiss-red mx-auto mb-2" />
                  <p className="font-semibold text-swiss-text">{t('home.trustBadges.iso.title')}</p>
                  <p className="text-sm text-swiss-body">{t('home.trustBadges.iso.subtitle')}</p>
                </div>
              </div>

              <div className="text-center group">
                <div className="bg-white rounded-xl p-6 transition-all duration-300 border border-swiss-border shadow-subtle group-hover:shadow-soft">
                  <Award className="w-8 h-8 text-swiss-red mx-auto mb-2" />
                  <p className="font-semibold text-swiss-text">{t('home.trustBadges.swissQuality.title')}</p>
                  <p className="text-sm text-swiss-body">{t('home.trustBadges.swissQuality.subtitle')}</p>
                </div>
              </div>

              <div className="text-center group">
                <div className="bg-white rounded-xl p-6 transition-all duration-300 border border-swiss-border shadow-subtle group-hover:shadow-soft">
                  <Users className="w-8 h-8 text-swiss-red mx-auto mb-2" />
                  <p className="font-semibold text-swiss-text">{t('home.trustBadges.trainedStaff.title')}</p>
                  <p className="text-sm text-swiss-body">{t('home.trustBadges.trainedStaff.subtitle')}</p>
                </div>
              </div>

              <div className="text-center group">
                <div className="bg-white rounded-xl p-6 transition-all duration-300 border border-swiss-border shadow-subtle group-hover:shadow-soft">
                  <CheckCircle className="w-8 h-8 text-swiss-red mx-auto mb-2" />
                  <p className="font-semibold text-swiss-text">{t('home.trustBadges.insured.title')}</p>
                  <p className="text-sm text-swiss-body">{t('home.trustBadges.insured.subtitle')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="section-padding bg-swiss-section text-swiss-text border-y border-swiss-border">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-swiss-softRed border border-swiss-border text-swiss-text rounded-full px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-swiss-red" />
              <span>{t('home.cta.badge')}</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              {t('home.cta.title')}
            </h2>

            {/* Subtitle */}
            <p className="text-xl text-swiss-body max-w-2xl mx-auto leading-relaxed">
              {t('home.cta.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={`/${locale}/free-offer`}
                className="inline-flex items-center justify-center btn-primary px-8 py-4"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{t('home.cta.button')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <a
                href="tel:+41782158030"
                className="inline-flex items-center justify-center space-x-2 btn-secondary px-8 py-4"
              >
                <Phone className="w-5 h-5 group-hover:animate-pulse" />
                <span>+41 78 215 80 30</span>
              </a>
            </div>

            {/* Trust Elements */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-swiss-body">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-swiss-red" />
                <span className="text-sm">{t('home.cta.trust.freeQuote')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-swiss-red" />
                <span className="text-sm">{t('home.cta.trust.noHiddenFees')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-swiss-red" />
                <span className="text-sm">{t('home.cta.trust.sameDayResponse')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
