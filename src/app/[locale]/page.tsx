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
        { title: t('home.services.facilityServices.title'), description: t('home.services.facilityServices.description'), formHref: `/${locale}/form?service=facility-services`, href: `/${locale}/services#facilityServices`, icon: Building2 },
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

  const testimonials = [
    {
      name: 'Lukas Meier',
      location: 'Zürich',
      rating: 5,
      text: 'Ausgezeichneter Service! Die Endreinigung war perfekt und wir haben die Kaution vollständig zurückerhalten.',
    },
    {
      name: 'Anna Müller',
      location: 'Bern',
      rating: 5,
      text: 'Service impeccable! L\'équipe était professionnelle et très efficace. Je recommande vivement.',
    },
    {
      name: 'Thomas Schmid',
      location: 'Basel',
      rating: 5,
      text: 'Schnell, zuverlässig und gründlich. Genau das, was man sich von einem professionellen Service wünscht.',
    }
  ];

  return (
    <Layout>
      {/* Swiss-themed Hero Section */}
      <SwissHero
        badge={t('home.hero.badge')}
        title={(() => {
          const full = t('home.hero.title');
          const brand = 'SwissCleanMove';
          const idx = full.indexOf(brand);
          if (idx === -1) return full;
          const rest = full.slice(idx + brand.length);
          return (
            <>
              <span style={{ color: '#CC0000' }}>Swiss</span>
              <span style={{ color: '#1B2A4A' }}>CleanMove</span>
              <br />
              <span className="text-[18px] md:text-[24px] font-semibold text-swiss-body">{rest.trimStart()}</span>
            </>
          );
        })()}
        subtitle={t('home.hero.subtitle')}
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
                href="tel:+41764883689"
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5 text-swiss-red" />
                <span>+41 76 488 36 89</span>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-2 text-swiss-text">
                  <span className="font-semibold">{t('home.hero.trust.all')}</span>
                </div>
                <span className="text-sm text-swiss-body">{t('home.hero.trust.cantons')}</span>
              </div>
              <div className="flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-2 text-swiss-text">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">50+</span>
                </div>
                <span className="text-sm text-swiss-body">{t('home.hero.trust.happyClients')}</span>
              </div>
              <div className="flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-2 text-swiss-text">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">24/7</span>
                </div>
                <span className="text-sm text-swiss-body">{t('home.hero.trust.support')}</span>
              </div>
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
                <p className="text-white/80 text-sm">{slideImages[currentSlide]?.description}</p>
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
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
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

      {/* Statistics Section */}
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

      {/* Enhanced Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          {/* Section Header */}
          <div className="text-center space-y-6 mb-20">
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

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-subtle hover:shadow-soft transition-all duration-300 transform hover:-translate-y-0.5 border border-swiss-border relative overflow-hidden">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-6xl text-swiss-gray-100 font-serif">"</div>

                  <div className="relative space-y-6">
                    {/* Stars */}
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-swiss-body leading-relaxed text-lg italic">
                      "{testimonial.text}"
                    </p>

                    {/* Customer Info */}
                    <div className="flex items-center space-x-4 pt-4 border-t border-swiss-border">
                      <div className="w-12 h-12 bg-swiss-softRed rounded-full flex items-center justify-center text-swiss-red font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-swiss-text">{testimonial.name}</p>
                        <div className="flex items-center space-x-1 text-sm text-swiss-body">
                          <MapPin className="w-3 h-3" />
                          <span>{testimonial.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
      <section className="section-padding bg-gradient-to-br from-blue-400/80 via-blue-500/70 to-blue-600/80 text-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>{t('home.cta.badge')}</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              {t('home.cta.title')}
            </h2>

            {/* Subtitle */}
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              {t('home.cta.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={`/${locale}/free-offer`}
                className="inline-flex items-center justify-center bg-white text-swiss-red font-semibold py-3.5 px-6 rounded-xl transition-all duration-150 shadow-soft hover:shadow-soft"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{t('home.cta.button')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <a
                href="tel:+41764883689"
                className="inline-flex items-center justify-center space-x-2 bg-transparent hover:bg-white/10 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-150 border border-white/40"
              >
                <Phone className="w-5 h-5 group-hover:animate-pulse" />
                <span>+41 76 488 36 89</span>
              </a>
            </div>

            {/* Trust Elements */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-white/80">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <span className="text-sm">{t('home.cta.trust.freeQuote')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <span className="text-sm">{t('home.cta.trust.noHiddenFees')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <span className="text-sm">{t('home.cta.trust.sameDayResponse')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
