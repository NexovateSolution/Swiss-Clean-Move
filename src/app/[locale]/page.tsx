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
  Users,
  Mail,
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
      <section className="relative overflow-hidden bg-white pb-12 pt-8 lg:pt-16">
        <div className="absolute inset-0 z-0">
          {slideImages.map((slide, index) => (
            <img 
              key={index}
              src={slide.url} 
              alt="Background" 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? 'opacity-10' : 'opacity-0'}`}
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
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/90"></div>
        </div>
        
        <div className="container-max relative z-10 pt-4 pb-8 md:pb-12 text-center">
          <div className="flex flex-col items-center justify-center max-w-5xl mx-auto space-y-6 md:space-y-8">
            
            {/* Top Text */}
            <div className="text-[10px] md:text-sm font-bold text-[#001f3f] tracking-[0.2em] md:tracking-[0.3em] uppercase">
              {tNew('hero.topText')}
            </div>

            {/* Main Title */}
            <h1 className="text-3xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight text-[#001f3f]">
              <span className="text-swiss-red">Swiss</span>CleanMove – {tNew('hero.title')}
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-xl text-[#001f3f]/80 font-medium max-w-3xl leading-relaxed">
              {tNew('hero.subtitle')}
            </p>

            {/* CTA Button */}
            <div className="pt-2 md:pt-4">
              <Link href={`/${locale}/free-offer`} className="inline-flex items-center justify-center space-x-2 bg-swiss-red text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl">
                <span>{tNew('services.offerteBtn')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 pt-8 w-full border-t border-gray-200 mt-8">
              {[
                { icon: CheckCircle, text: tNew('hero.badges.guarantee'), bg: 'bg-red-50', color: 'text-swiss-red' },
                { icon: ClipboardEdit, text: tNew('hero.badges.insurance'), bg: 'bg-red-50', color: 'text-swiss-red' },
                { icon: Sparkles, text: tNew('hero.badges.transparent'), bg: 'bg-red-50', color: 'text-swiss-red' },
                { icon: Users, text: tNew('hero.badges.contact'), bg: 'bg-red-50', color: 'text-swiss-red' }
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center space-y-3 mt-6">
                  <div className={`w-14 h-14 rounded-full ${badge.bg} flex items-center justify-center`}>
                    <badge.icon className={`w-7 h-7 ${badge.color}`} />
                  </div>
                  <span className="text-sm font-bold text-[#001f3f]">{badge.text}</span>
                </div>
              ))}
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
              <a 
                href="https://g.page/r/CaR3s0KCpz1O/review" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-[#4285F4]">G</span>
                  <span className="text-2xl font-bold text-[#EA4335]">o</span>
                  <span className="text-2xl font-bold text-[#FBBC05]">o</span>
                  <span className="text-2xl font-bold text-[#4285F4]">g</span>
                  <span className="text-2xl font-bold text-[#34A853]">l</span>
                  <span className="text-2xl font-bold text-[#EA4335]">e</span>
                </div>
                <span className="text-2xl font-bold text-black">{tNew('reviews.google')}</span>
              </a>
              <div className="flex space-x-1 py-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-[#FBBC05] fill-current" />
                ))}
              </div>
              <div className="text-4xl font-bold text-black">4.9<span className="text-lg font-medium text-gray-600"> {locale === 'en' ? 'out of 5' : locale === 'fr' ? 'sur 5' : locale === 'it' ? 'su 5' : 'von 5'}</span></div>
              <p className="text-sm font-medium text-gray-600 mb-4">{tNew('reviews.count')}</p>
              <a 
                href="https://g.page/r/CaR3s0KCpz1O/review" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center space-x-2 bg-white border-2 border-gray-100 rounded-full px-5 py-2.5 text-sm font-semibold text-[#001f3f] hover:shadow-md hover:border-blue-300 transition-all mt-4"
              >
                <span>{tNew('reviews.writeReview')}</span>
                <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </a>
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
              {tNew('regions.title')}
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
            
            <div className="flex flex-wrap justify-center lg:justify-end gap-4 w-full lg:w-auto">
              <Link href={`/${locale}/free-offer`} className="btn-primary py-3 px-6 text-center shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center space-x-2 font-bold">
                <span>{tNew('services.freeObligation').split(' ')[0]} Offerte</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+41782158030" className="flex items-center justify-center space-x-2 px-5 py-3 border-2 border-white/20 rounded-lg text-white font-bold hover:bg-white/10 transition-colors">
                <Phone className="w-5 h-5" />
                <div className="text-left leading-tight">
                  <div className="text-xs font-medium text-gray-300">{tNew('cta.hours')}</div>
                  <div className="text-sm">+41 78 215 80 30</div>
                </div>
              </a>
              <a href="https://wa.me/41782158030" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 px-5 py-3 bg-[#25D366]/10 border-2 border-[#25D366] rounded-lg text-white font-bold hover:bg-[#25D366]/20 transition-colors">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <div className="text-left leading-tight">
                  <div className="text-xs font-medium text-[#25D366]">{tNew('cta.whatsapp')}</div>
                  <div className="text-sm">WhatsApp</div>
                </div>
              </a>
              <Link href={`/${locale}/contact`} className="flex items-center justify-center space-x-2 px-5 py-3 border-2 border-blue-400/50 rounded-lg text-white font-bold hover:bg-blue-500/10 transition-colors">
                <Mail className="w-5 h-5 text-blue-400" />
                <div className="text-left leading-tight">
                  <div className="text-xs font-medium text-blue-300">{tNew('hero.contactBtn')}</div>
                  <div className="text-sm">Email / Form</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
