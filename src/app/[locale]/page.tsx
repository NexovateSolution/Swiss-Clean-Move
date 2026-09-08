'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';
import {
  Home as HomeIcon,
  Building2,
  Trash2,
  Truck,
  Star,
  CheckCircle,
  Phone,
  ArrowRight,
  MapPin,
  Heart,
  Droplets,
  MousePointerClick,
  ClipboardEdit,
  CheckCircle2,
  MessageCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();
  const tNew = (key: string) => t(`home.newDesign.${key}`);

  const [currentSlide, setCurrentSlide] = useState(0);

  const slideImages = [
    { url: '/images/transportation.jpg' },
    { url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
    { url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
    { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
    { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slideImages.length]);

  const services = [
    {
      id: 'cleaning',
      title: tNew('services.reinigung_title'),
      desc: tNew('services.reinigung'),
      icon: Droplets,
      href: `/${locale}/form?service=house-cleaning`,
      color: 'text-blue-500'
    },
    {
      id: 'moving',
      title: tNew('services.umzug_title'),
      desc: tNew('services.umzug'),
      icon: Truck,
      href: `/${locale}/form?service=relocation`,
      color: 'text-red-500'
    },
    {
      id: 'disposal',
      title: tNew('services.entsorgung_title'),
      desc: tNew('services.entsorgung'),
      icon: Trash2,
      href: `/${locale}/form?service=disposal`,
      color: 'text-green-500'
    },
    {
      id: 'facility',
      title: tNew('services.facility_title'),
      desc: tNew('services.facility'),
      icon: Building2,
      href: `/${locale}/form?service=facility-services`,
      color: 'text-indigo-500'
    },
    {
      id: 'household',
      title: tNew('services.haushalt_title'),
      desc: tNew('services.haushalt'),
      icon: HomeIcon,
      href: `/${locale}/form?service=household-helping`,
      color: 'text-orange-500'
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
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-swiss-section pb-12 pt-4 lg:pt-0">
        <div className="absolute inset-0 z-0">
          {slideImages.map((slide, index) => (
            <img 
              key={index}
              src={slide.url} 
              alt="Background" 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? 'opacity-30 md:opacity-40' : 'opacity-0'}`}
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
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70 md:via-white/90 md:to-transparent"></div>
        </div>
        
        <div className="container-max relative z-10 pt-8 md:pt-16 lg:pt-24 pb-8 md:pb-12">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Content */}
            <div className="w-full lg:w-3/5 space-y-4 md:space-y-6">
              <div className="flex items-center space-x-2 mb-2 md:mb-0">
                <div className="w-8 h-1 bg-swiss-red"></div>
                <span className="text-xs md:text-sm font-bold text-black tracking-widest uppercase">
                  Saubere Lösungen. Einfacher Leben.
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight">
                {tNew('hero.title')}
              </h1>
              <p className="text-base md:text-lg text-black font-medium max-w-2xl leading-relaxed">
                {tNew('hero.subtitle')}
              </p>
              
              {/* Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 md:pt-6">
                {[
                  tNew('hero.badges.guarantee'),
                  tNew('hero.badges.insurance'),
                  tNew('hero.badges.contact'),
                  tNew('hero.badges.transparent')
                ].map((badge, i) => (
                  <div key={i} className="flex items-center space-x-3 bg-white/50 md:bg-transparent p-2 rounded-lg md:p-0 md:rounded-none">
                    <div className="w-6 h-6 rounded-full bg-swiss-red flex items-center justify-center flex-shrink-0">
                      {i < 2 ? <CheckCircle className="w-4 h-4 text-white" /> : <span className="text-white font-bold text-sm">+</span>}
                    </div>
                    <span className="text-sm font-bold text-black">{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image Placeholder (If they provide team photo later) */}
            <div className="hidden lg:block w-full lg:w-2/5 relative h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="SwissCleanMove Team" 
                className="w-full h-full object-cover rounded-2xl shadow-xl border-4 border-white opacity-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="section-padding bg-gray-50 border-t border-swiss-border">
        <div className="container-max">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-black text-center md:text-left">
              {tNew('services.header')}
            </h2>
            <div className="mx-auto md:mx-0 flex items-center space-x-2 mt-4 md:mt-0 text-gray-800 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-bold">{tNew('services.freeObligation')}</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-swiss-border hover:shadow-soft hover:border-swiss-red/30 transition-all group">
                  <div>
                    <div className="mb-6 flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform">
                        <Icon className={`w-8 h-8 ${svc.color}`} />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-center text-black mb-3">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-center text-gray-700 mb-6 font-medium">
                      {svc.desc}
                    </p>
                  </div>
                  <Link href={svc.href} className="w-full py-3 bg-swiss-red text-white text-center font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 shadow-sm">
                    <span>{tNew('services.offerteBtn')} {svc.title.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS SECTION */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
            {/* Left Google Stats */}
            <div className="lg:col-span-1 flex flex-col items-center lg:items-center text-center space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-[#4285F4]">G</span>
                <span className="text-2xl font-bold text-[#EA4335]">o</span>
                <span className="text-2xl font-bold text-[#FBBC05]">o</span>
                <span className="text-2xl font-bold text-[#4285F4]">g</span>
                <span className="text-2xl font-bold text-[#34A853]">l</span>
                <span className="text-2xl font-bold text-[#EA4335]">e</span>
                <span className="text-2xl font-bold text-black ml-1">Bewertungen</span>
              </div>
              <div className="flex space-x-1 py-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-[#FBBC05] fill-current" />
                ))}
              </div>
              <div className="text-4xl font-bold text-black">4.9<span className="text-lg font-medium text-gray-600"> {locale === 'en' ? 'out of 5' : locale === 'fr' ? 'sur 5' : locale === 'it' ? 'su 5' : 'von 5'}</span></div>
              <p className="text-sm font-medium text-gray-600">{tNew('reviews.count')}</p>
            </div>

            {/* Right Reviews */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 relative shadow-sm">
                  <div className="absolute top-4 left-4 opacity-10">
                    <MessageCircle className="w-12 h-12 text-[#4285F4]" />
                  </div>
                  <div className="flex space-x-1 mb-3 relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#FBBC05] fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-800 font-medium italic mb-4 relative z-10 min-h-[80px]">"{t.text}"</p>
                  <p className="text-sm font-bold text-black relative z-10">{t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="section-padding bg-gray-50 border-t border-swiss-border">
        <div className="container-max">
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-10 md:mb-12 text-center md:text-left">
            {tNew('process.title')}
          </h2>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gray-300 z-0"></div>
            
            {/* Step 1 */}
            <div className="relative z-10 flex flex-col md:items-center text-left md:text-center w-full md:w-1/3">
              <div className="flex items-center space-x-4 md:space-x-0 md:flex-col">
                <div className="w-16 h-16 flex-shrink-0 rounded-full bg-swiss-red flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white">
                  1
                </div>
                <div className="hidden md:flex w-16 h-16 mt-4 rounded-xl bg-white border border-gray-200 items-center justify-center text-swiss-red shadow-sm">
                  <MousePointerClick className="w-8 h-8" />
                </div>
                <div className="mt-0 md:mt-6">
                  <h3 className="text-lg font-bold text-black">{tNew('process.step1.title')}</h3>
                  <p className="text-sm text-gray-700 font-medium mt-2">{tNew('process.step1.desc')}</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col md:items-center text-left md:text-center w-full md:w-1/3">
              <div className="flex items-center space-x-4 md:space-x-0 md:flex-col">
                <div className="w-16 h-16 flex-shrink-0 rounded-full bg-swiss-red flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white">
                  2
                </div>
                <div className="hidden md:flex w-16 h-16 mt-4 rounded-xl bg-white border border-gray-200 items-center justify-center text-swiss-red shadow-sm">
                  <ClipboardEdit className="w-8 h-8" />
                </div>
                <div className="mt-0 md:mt-6">
                  <h3 className="text-lg font-bold text-black">{tNew('process.step2.title')}</h3>
                  <p className="text-sm text-gray-700 font-medium mt-2">{tNew('process.step2.desc')}</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col md:items-center text-left md:text-center w-full md:w-1/3">
              <div className="flex items-center space-x-4 md:space-x-0 md:flex-col">
                <div className="w-16 h-16 flex-shrink-0 rounded-full bg-white flex items-center justify-center text-swiss-red font-bold text-xl shadow-lg border-4 border-swiss-red">
                  3
                </div>
                <div className="hidden md:flex w-16 h-16 mt-4 rounded-xl bg-white border border-gray-200 items-center justify-center text-swiss-red shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="mt-0 md:mt-6">
                  <h3 className="text-lg font-bold text-black">{tNew('process.step3.title')}</h3>
                  <p className="text-sm text-gray-700 font-medium mt-2">{tNew('process.step3.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REGIONS SECTION */}
      <section className="py-12 bg-white">
        <div className="container-max">
          <div className="flex items-center space-x-3 mb-6">
            <MapPin className="w-6 h-6 text-swiss-red" />
            <h2 className="text-xl md:text-2xl font-bold text-black">
              Lokal in Biel/Bienne & Seeland – schweizweit im Einsatz
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              'Biel/Bienne', 'Nidau', 'Brügg', 'Ipsach', 'Port', 'Lyss', 'Bern', 'Solothurn', 'Zürich', 'Basel', 'Neuchâtel', 'Fribourg'
            ].map((city, i) => (
              <Link key={i} href={`/${locale}/regions`} className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-full text-sm font-bold text-black transition-colors shadow-sm">
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="relative overflow-hidden bg-gray-900 py-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Swiss Mountains Dark" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="container-max relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                {tNew('cta.title')}
              </h2>
              <p className="text-base md:text-lg text-gray-200 font-medium">
                {tNew('cta.subtitle')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Link href={`/${locale}/free-offer`} className="btn-primary py-3 px-8 text-center text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center space-x-2 font-bold">
                <span>{tNew('services.freeObligation').split(' ')[0]} Offerte</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+41782158030" className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-white/20 rounded-lg text-white font-bold hover:bg-white/10 transition-colors text-lg">
                <Phone className="w-5 h-5" />
                <div className="text-left leading-tight">
                  <div className="text-sm font-medium text-gray-300">Mo-Sa 7-20 Uhr</div>
                  <div>+41 78 215 80 30</div>
                </div>
              </a>
              <a href="https://wa.me/41782158030" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#25D366]/10 border-2 border-[#25D366] rounded-lg text-white font-bold hover:bg-[#25D366]/20 transition-colors text-lg">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <div className="text-left leading-tight">
                  <div className="text-sm font-medium text-[#25D366]">{tNew('cta.whatsapp')}</div>
                  <div>WhatsApp</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
