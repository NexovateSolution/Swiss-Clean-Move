'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/Layout';
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
      href: `/${locale}/services#houseCleaning`,
      color: 'bg-blue-500'
    },
    {
      icon: Building2,
      title: t('home.services.apartmentCleaning.title'),
      description: t('home.services.apartmentCleaning.description'),
      href: `/${locale}/services#apartmentCleaning`,
      color: 'bg-green-500'
    },
    {
      icon: Building2,
      title: t('home.services.stairwellCleaning.title'),
      description: t('home.services.stairwellCleaning.description'),
      href: `/${locale}/services#stairwellCleaning`,
      color: 'bg-purple-500'
    },
    {
      icon: Briefcase,
      title: t('home.services.officeCleaning.title'),
      description: t('home.services.officeCleaning.description'),
      href: `/${locale}/services#officeCleaning`,
      color: 'bg-orange-500'
    },
    {
      icon: CheckCircle,
      title: t('home.services.finalCleaning.title'),
      description: t('home.services.finalCleaning.description'),
      href: `/${locale}/services#finalCleaning`,
      color: 'bg-teal-500'
    },
    {
      icon: HomeIcon,
      title: t('home.services.windowCleaning.title'),
      description: t('home.services.windowCleaning.description'),
      href: `/${locale}/services#windowCleaning`,
      color: 'bg-cyan-500'
    },
    {
      icon: Truck,
      title: t('home.services.relocation.title'),
      description: t('home.services.relocation.description'),
      href: `/${locale}/services#relocation`,
      color: 'bg-indigo-500'
    },
    {
      icon: Trash2,
      title: t('home.services.disposal.title'),
      description: t('home.services.disposal.description'),
      href: `/${locale}/services#disposal`,
      color: 'bg-red-500'
    },
    {
      icon: UtensilsCrossed,
      title: t('home.services.gastronomyCleaning.title'),
      description: t('home.services.gastronomyCleaning.description'),
      href: `/${locale}/services#gastronomyCleaning`,
      color: 'bg-rose-500'
    },
    {
      icon: Shield,
      title: t('home.services.medicalCleaning.title'),
      description: t('home.services.medicalCleaning.description'),
      href: `/${locale}/services#medicalCleaning`,
      color: 'bg-emerald-500'
    },
    {
      icon: Building2,
      title: t('home.services.constructionCleaning.title'),
      description: t('home.services.constructionCleaning.description'),
      href: `/${locale}/services#constructionCleaning`,
      color: 'bg-yellow-500'
    },
    {
      icon: Wrench,
      title: t('home.services.propertyMaintenance.title'),
      description: t('home.services.propertyMaintenance.description'),
      href: `/${locale}/services#propertyMaintenance`,
      color: 'bg-sky-500'
    },
    {
      icon: Star,
      title: t('home.services.specialCleaning.title'),
      description: t('home.services.specialCleaning.description'),
      href: `/${locale}/services#specialCleaning`,
      color: 'bg-fuchsia-500'
    },
    {
      icon: Truck,
      title: t('home.services.comboService.title'),
      description: t('home.services.comboService.description'),
      href: `/${locale}/services#comboService`,
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
      <section className="relative min-h-screen bg-swiss-red text-white overflow-hidden">
        {/* Swiss flag inspired background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-700/60 via-red-600/60 to-red-700/60"></div>
          {/* Swiss cross */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-8 bg-white/15 rounded-sm"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[60%] bg-white/15 rounded-sm"></div>
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative container-max flex items-center min-h-screen py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="space-y-8 text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>{t('home.hero.badge')}</span>
                </div>
                
                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    {t('home.hero.title')}
                  </span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-2xl">
                  {t('home.hero.subtitle')}
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link 
                    href={`/${locale}/free-offer`} 
                    className="group relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>{t('home.hero.cta')}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>
                  
                  <a 
                    href="tel:+41123456789" 
                    className="group flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40"
                  >
                    <Phone className="w-5 h-5 group-hover:animate-pulse" />
                    <span>+41 12 345 67 89</span>
                  </a>
                </div>
                
                {/* Enhanced Trust Indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                  <div className="flex flex-col items-center lg:items-start space-y-2">
                    <div className="flex items-center space-x-2 text-green-400">
                      <Shield className="w-5 h-5" />
                      <span className="font-semibold">100%</span>
                    </div>
                    <span className="text-sm text-blue-100">{t('home.hero.trust.guarantee')}</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start space-y-2">
                    <div className="flex items-center space-x-2 text-green-400">
                      <MapPin className="w-5 h-5" />
                      <span className="font-semibold">26</span>
                    </div>
                    <span className="text-sm text-blue-100">{t('home.hero.trust.cantons')}</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start space-y-2">
                    <div className="flex items-center space-x-2 text-green-400">
                      <Users className="w-5 h-5" />
                      <span className="font-semibold">5000+</span>
                    </div>
                    <span className="text-sm text-blue-100">{t('home.hero.trust.happyClients')}</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start space-y-2">
                    <div className="flex items-center space-x-2 text-green-400">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">24/7</span>
                    </div>
                    <span className="text-sm text-blue-100">{t('home.hero.trust.support')}</span>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Image Slideshow */}
              <div className="relative lg:block hidden">
                <div className="relative">
                  {/* Slideshow Container */}
                  <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Image Display */}
                    <div className="relative h-96 w-full">
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
                      
                      {/* Slide Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="font-bold text-xl mb-2">
                          {slideImages[currentSlide]?.title}
                        </h3>
                        <p className="text-blue-100 text-sm">
                          {slideImages[currentSlide]?.description}
                        </p>
                      </div>
                      
                      {/* Navigation Arrows */}
                      <button
                        onClick={() => setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300"
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                      
                      <button
                        onClick={() => setCurrentSlide((prev) => (prev + 1) % slideImages.length)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300"
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    
                    {/* Slide Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {slideImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide 
                              ? 'bg-white scale-110' 
                              : 'bg-white/50 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Service Quality Card */}
                  <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
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
                  
                  {/* Floating Award Badge */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Slideshow */}
            <div className="lg:hidden mt-12">
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl mx-4">
                <div className="relative h-64 w-full">
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
                  
                  {/* Mobile Slide Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg mb-1">
                      {slideImages[currentSlide]?.title}
                    </h3>
                    <p className="text-blue-100 text-xs">
                      {slideImages[currentSlide]?.description}
                    </p>
                  </div>
                  
                  {/* Mobile Navigation */}
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length)}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-1.5 transition-all duration-300"
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                  
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % slideImages.length)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-1.5 transition-all duration-300"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
                
                {/* Mobile Indicators */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
                  {slideImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-white scale-110' 
                          : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-max">
          {/* Section Header */}
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Our Premium Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              {t('home.services.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('home.services.subtitle')}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Link key={index} href={service.href} className="group">
                  <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color.replace('bg-', 'from-')} to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Content */}
                    <div className="relative space-y-4">
                      {/* Icon */}
                      <div className="relative">
                        <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        <div className={`absolute inset-0 w-14 h-14 ${service.color} rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                      
                      {/* CTA */}
                      <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                        <span className="text-sm">{t('common.learnMore')}</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-500"></div>
                  </div>
                </Link>
              );
            })}
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-6">{t('home.services.customSolution')}</p>
            <Link 
              href={`/${locale}/services`} 
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>{t('home.services.viewAll')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative py-20 bg-swiss-red text-white overflow-hidden">
        {/* Swiss-flag inspired overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-700/60 via-red-600/60 to-red-700/60"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-8 bg-white/15 rounded-sm"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[60%] bg-white/15 rounded-sm"></div>
        </div>

        <div className="container-max relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>{t('home.numbers.badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('home.numbers.title')}</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">{t('home.numbers.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">5000+</div>
                <div className="text-blue-100 font-medium">{t('home.numbers.items.happyClients')}</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">15000+</div>
                <div className="text-blue-100 font-medium">{t('home.numbers.items.projectsCompleted')}</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">26</div>
                <div className="text-blue-100 font-medium">{t('home.numbers.items.swissCantons')}</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">10+</div>
                <div className="text-blue-100 font-medium">{t('home.numbers.items.yearsExperience')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container-max">
          {/* Section Header */}
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 rounded-full px-4 py-2 text-sm font-medium">
              <Heart className="w-4 h-4" />
              <span>{t('home.testimonials.badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              {t('home.testimonials.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('home.testimonials.subtitle')}
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100 relative overflow-hidden">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-6xl text-gray-100 font-serif">"</div>
                  
                  <div className="relative space-y-6">
                    {/* Stars */}
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    {/* Testimonial Text */}
                    <p className="text-gray-700 leading-relaxed text-lg italic">
                      "{testimonial.text}"
                    </p>
                    
                    {/* Customer Info */}
                    <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{testimonial.name}</p>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
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
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('home.trustBadges.title')}</h3>
              <p className="text-gray-600">{t('home.trustBadges.subtitle')}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              <div className="text-center group">
                <div className="bg-gray-50 rounded-xl p-6 group-hover:bg-blue-50 transition-colors duration-300">
                  <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">{t('home.trustBadges.iso.title')}</p>
                  <p className="text-sm text-gray-600">{t('home.trustBadges.iso.subtitle')}</p>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-gray-50 rounded-xl p-6 group-hover:bg-green-50 transition-colors duration-300">
                  <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">{t('home.trustBadges.swissQuality.title')}</p>
                  <p className="text-sm text-gray-600">{t('home.trustBadges.swissQuality.subtitle')}</p>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-gray-50 rounded-xl p-6 group-hover:bg-purple-50 transition-colors duration-300">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">{t('home.trustBadges.trainedStaff.title')}</p>
                  <p className="text-sm text-gray-600">{t('home.trustBadges.trainedStaff.subtitle')}</p>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-gray-50 rounded-xl p-6 group-hover:bg-orange-50 transition-colors duration-300">
                  <CheckCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">{t('home.trustBadges.insured.title')}</p>
                  <p className="text-sm text-gray-600">{t('home.trustBadges.insured.subtitle')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-20 bg-swiss-red text-white overflow-hidden">
        {/* Swiss-flag inspired overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-700/60 via-red-600/60 to-red-700/60"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-8 bg-white/15 rounded-sm"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[60%] bg-white/15 rounded-sm"></div>
        </div>
        
        <div className="container-max relative">
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
                className="group relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{t('home.cta.button')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <a 
                href="tel:+41123456789" 
                className="group flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <Phone className="w-5 h-5 group-hover:animate-pulse" />
                <span>+41 12 345 67 89</span>
              </a>
            </div>
            
            {/* Trust Elements */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">{t('home.cta.trust.freeQuote')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">{t('home.cta.trust.noHiddenFees')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">{t('home.cta.trust.sameDayResponse')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
