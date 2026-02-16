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
  Play,
  Pause
} from 'lucide-react';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();
  
  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  
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
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(timer);
  }, [slideImages.length]);

  const services = [
    {
      icon: HomeIcon,
      title: t('home.services.houseCleaning.title'),
      description: t('home.services.houseCleaning.description'),
      href: `/${locale}/services/house-cleaning`,
      formHref: `/${locale}/form?service=house-cleaning`,
      color: 'bg-blue-500'
    },
    {
      icon: Building2,
      title: t('home.services.apartmentCleaning.title'),
      description: t('home.services.apartmentCleaning.description'),
      href: `/${locale}/services/apartment-cleaning`,
      formHref: `/${locale}/form?service=apartment-cleaning`,
      color: 'bg-green-500'
    },
    {
      icon: Building2,
      title: t('home.services.stairwellCleaning.title'),
      description: t('home.services.stairwellCleaning.description'),
      href: `/${locale}/services/stairwell-cleaning`,
      formHref: `/${locale}/form?service=stairwell-cleaning`,
      color: 'bg-purple-500'
    },
    {
      icon: Briefcase,
      title: t('home.services.officeCleaning.title'),
      description: t('home.services.officeCleaning.description'),
      href: `/${locale}/services/office-cleaning`,
      formHref: `/${locale}/form?service=office-cleaning`,
      color: 'bg-orange-500'
    },
    {
      icon: CheckCircle,
      title: t('home.services.finalCleaning.title'),
      description: t('home.services.finalCleaning.description'),
      href: `/${locale}/services/final-cleaning`,
      formHref: `/${locale}/form?service=final-cleaning`,
      color: 'bg-teal-500'
    },
    {
      icon: HomeIcon,
      title: t('home.services.windowCleaning.title'),
      description: t('home.services.windowCleaning.description'),
      href: `/${locale}/services/window-cleaning`,
      formHref: `/${locale}/form?service=window-cleaning`,
      color: 'bg-cyan-500'
    },
    {
      icon: Truck,
      title: t('home.services.relocation.title'),
      description: t('home.services.relocation.description'),
      href: `/${locale}/services/relocation`,
      formHref: `/${locale}/form?service=relocation`,
      color: 'bg-indigo-500'
    },
    {
      icon: Trash2,
      title: t('home.services.disposal.title'),
      description: t('home.services.disposal.description'),
      href: `/${locale}/services/disposal`,
      formHref: `/${locale}/form?service=disposal`,
      color: 'bg-red-500'
    },
    {
      icon: UtensilsCrossed,
      title: t('home.services.gastronomyCleaning.title'),
      description: t('home.services.gastronomyCleaning.description'),
      href: `/${locale}/services#gastronomyCleaning`,
      formHref: `/${locale}/form?service=gastronomy-cleaning`,
      color: 'bg-rose-500'
    },
    {
      icon: Shield,
      title: t('home.services.medicalCleaning.title'),
      description: t('home.services.medicalCleaning.description'),
      href: `/${locale}/services#medicalCleaning`,
      formHref: `/${locale}/form?service=medical-cleaning`,
      color: 'bg-emerald-500'
    },
    {
      icon: Building2,
      title: t('home.services.constructionCleaning.title'),
      description: t('home.services.constructionCleaning.description'),
      href: `/${locale}/services#constructionCleaning`,
      formHref: `/${locale}/form?service=construction-cleaning`,
      color: 'bg-yellow-500'
    },
    {
      icon: Wrench,
      title: t('home.services.propertyMaintenance.title'),
      description: t('home.services.propertyMaintenance.description'),
      href: `/${locale}/services#propertyMaintenance`,
      formHref: `/${locale}/form?service=property-maintenance`,
      color: 'bg-sky-500'
    },
    {
      icon: Star,
      title: t('home.services.specialCleaning.title'),
      description: t('home.services.specialCleaning.description'),
      href: `/${locale}/services#specialCleaning`,
      formHref: `/${locale}/form?service=special-cleaning`,
      color: 'bg-fuchsia-500'
    },
    {
      icon: Truck,
      title: t('home.services.comboService.title'),
      description: t('home.services.comboService.description'),
      href: `/${locale}/services#comboService`,
      formHref: `/${locale}/form?service=combo-service`,
      color: 'bg-indigo-700'
    }
  ];

  const testimonials = [
    {
      name: 'Maria Schmidt',
      location: 'Zürich',
      rating: 5,
      text: 'Ausgezeichneter Service! Die Endreinigung war perfekt und wir haben die Kaution vollständig zurückerhalten.',
    },
    {
      name: 'Jean Dubois',
      location: 'Genève',
      rating: 5,
      text: 'Service impeccable! L\'équipe était professionnelle et très efficace. Je recommande vivement.',
    },
    {
      name: 'Andreas Müller',
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
        title={t('home.hero.title')}
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-2 text-swiss-text">
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold">100%</span>
                </div>
                <span className="text-sm text-swiss-body">{t('home.hero.trust.guarantee')}</span>
              </div>
              <div className="flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-2 text-swiss-text">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">26</span>
                </div>
                <span className="text-sm text-swiss-body">{t('home.hero.trust.cantons')}</span>
              </div>
              <div className="flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-2 text-swiss-text">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">5000+</span>
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
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
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
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/70'
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
            <div className="inline-flex items-center space-x-2 bg-swiss-softRed text-swiss-text rounded-full px-4 py-2 text-sm font-medium border border-swiss-border">
              <Sparkles className="w-4 h-4 text-swiss-red" />
              <span>Our Premium Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-swiss-text">
              {t('home.services.title')}
            </h2>
            <p className="text-xl text-swiss-body max-w-3xl mx-auto leading-relaxed">
              {t('home.services.subtitle')}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 shadow-subtle hover:shadow-soft transition-all duration-300 transform hover:-translate-y-1 border border-swiss-border overflow-hidden"
                >
                  {/* Content */}
                  <div className="relative space-y-4">
                    {/* Icon */}
                    <div className="relative">
                      <div className="w-14 h-14 bg-swiss-gray-50 rounded-xl flex items-center justify-center transition-all duration-300 border border-swiss-border group-hover:border-swiss-red/30">
                        <IconComponent className="w-7 h-7 text-swiss-body group-hover:text-swiss-red transition-colors duration-300" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-swiss-text group-hover:text-swiss-text transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-swiss-body text-sm leading-relaxed line-clamp-3">{service.description}</p>

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <Link
                        href={service.href}
                        className="inline-flex items-center text-swiss-red font-medium hover:translate-x-1 transition-transform duration-300"
                      >
                        <span className="text-sm">{t('common.learnMore')}</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>

                      <Link
                        href={service.formHref}
                        className="text-sm font-semibold text-swiss-text bg-swiss-softRed border border-swiss-border rounded-full px-4 py-2 hover:bg-white transition-colors"
                      >
                        {t('common.formLink')}
                      </Link>
                    </div>
                  </div>
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
              <div className="text-4xl font-bold text-swiss-text">5000+</div>
              <div className="mx-auto mt-3 h-0.5 w-10 bg-swiss-red rounded-full"></div>
              <div className="mt-4 text-swiss-body font-medium">{t('home.numbers.items.happyClients')}</div>
            </div>
            <div className="text-center px-6 py-8 md:border-l md:border-swiss-border">
              <div className="text-4xl font-bold text-swiss-text">15000+</div>
              <div className="mx-auto mt-3 h-0.5 w-10 bg-swiss-red rounded-full"></div>
              <div className="mt-4 text-swiss-body font-medium">{t('home.numbers.items.projectsCompleted')}</div>
            </div>
            <div className="text-center px-6 py-8 md:border-l md:border-swiss-border">
              <div className="text-4xl font-bold text-swiss-text">26</div>
              <div className="mx-auto mt-3 h-0.5 w-10 bg-swiss-red rounded-full"></div>
              <div className="mt-4 text-swiss-body font-medium">{t('home.numbers.items.swissCantons')}</div>
            </div>
            <div className="text-center px-6 py-8 md:border-l md:border-swiss-border">
              <div className="text-4xl font-bold text-swiss-text">10+</div>
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
      <section className="section-padding bg-swiss-red text-white">
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
