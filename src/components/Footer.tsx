'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const quickLinks = [
    { name: t('navigation.home'), href: `/${locale}` },
    { name: t('navigation.about'), href: `/${locale}/about` },
    { name: t('navigation.services'), href: `/${locale}/services` },
    { name: t('navigation.regions'), href: `/${locale}/regions` },
    { name: t('navigation.pricing'), href: `/${locale}/pricing` },
    { name: t('navigation.faq'), href: `/${locale}/faq` },
    { name: t('navigation.contact'), href: `/${locale}/contact` },
  ];

  const services = [
    { name: t('home.services.houseCleaning.title'), href: `/${locale}/services#houseCleaning` },
    { name: t('home.services.apartmentCleaning.title'), href: `/${locale}/services#apartmentCleaning` },
    { name: t('home.services.stairwellCleaning.title'), href: `/${locale}/services#stairwellCleaning` },
    { name: t('home.services.officeCleaning.title'), href: `/${locale}/services#officeCleaning` },
    { name: t('home.services.finalCleaning.title'), href: `/${locale}/services#finalCleaning` },
    { name: t('home.services.windowCleaning.title'), href: `/${locale}/services#windowCleaning` },
    { name: t('home.services.relocation.title'), href: `/${locale}/services#relocation` },
    { name: t('home.services.disposal.title'), href: `/${locale}/services#disposal` },
    { name: t('home.services.gastronomyCleaning.title'), href: `/${locale}/services#gastronomyCleaning` },
    { name: t('home.services.medicalCleaning.title'), href: `/${locale}/services#medicalCleaning` },
    { name: t('home.services.constructionCleaning.title'), href: `/${locale}/services#constructionCleaning` },
    { name: t('home.services.propertyMaintenance.title'), href: `/${locale}/services#propertyMaintenance` },
    { name: t('home.services.specialCleaning.title'), href: `/${locale}/services#specialCleaning` },
    { name: t('home.services.comboService.title'), href: `/${locale}/services#comboService` },
  ];

  const legalLinks = [
    { name: t('navigation.legal'), href: `/${locale}/legal` },
    { name: t('legal.datenschutz'), href: `/${locale}/legal#datenschutz` },
  ];

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/c/41782158030',
      Icon: MessageCircle,
      className: 'bg-[#25D366] hover:bg-[#25D366]/80'
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/16e3oArupP/',
      Icon: Facebook,
      className: 'bg-[#1877F2] hover:bg-[#1877F2]/80'
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/swisscleanmove?igsh=MTlzdDBuMTB6YWlvNg==',
      Icon: Instagram,
      className: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] hover:opacity-90'
    }
  ] as const;

  return (
    <footer className="bg-swiss-gray-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-swiss-red rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">+</span>
              </div>
              <h3 className="text-xl font-bold">{t('footer.company')}</h3>
            </div>
            <p className="text-swiss-gray-300 text-sm">
              {t('footer.description')}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-swiss-blue" />
                <span>Orpundstrasse 31, 2504 Biel/Bienne</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-swiss-blue" />
                <div className="flex flex-col leading-relaxed">
                  <a href="tel:+41764883689" className="hover:text-swiss-blue transition-colors">
                    +41 76 488 36 89
                  </a>
                  <a href="tel:+41782158030" className="hover:text-swiss-blue transition-colors">
                    +41 78 215 80 30
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-swiss-blue" />
                <a href="mailto:info@swisscleanmove.ch" className="hover:text-swiss-blue transition-colors">
                  info@swisscleanmove.ch
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-swiss-gray-300 hover:text-swiss-blue transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('footer.services')}</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-swiss-gray-300 hover:text-swiss-blue transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('footer.legal')}</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-swiss-gray-300 hover:text-swiss-blue transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="pt-4">
              <h5 className="font-semibold mb-3">{t('footer.followUs')}</h5>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ name, href, Icon, className }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    title={name}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-subtle focus:outline-none focus:ring-2 focus:ring-white/40 ${className}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-swiss-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-swiss-gray-400 text-sm">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
            <div className="flex items-center space-x-4 text-sm text-swiss-gray-400">
              <span>🇨🇭 {t('footer.madeInSwitzerland')}</span>
              <span>•</span>
              <span>{t('footer.acceptanceGuarantee')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
