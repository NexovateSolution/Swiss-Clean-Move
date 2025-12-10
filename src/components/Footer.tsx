'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const quickLinks = [
    { name: t('navigation.home'), href: `/${locale}` },
    { name: t('navigation.about'), href: `/${locale}/about` },
    { name: t('navigation.services'), href: `/${locale}/services` },
    { name: 'Regions', href: `/${locale}/regions` },
    { name: 'Pricing', href: `/${locale}/pricing` },
    { name: 'FAQ', href: `/${locale}/faq` },
    { name: t('navigation.contact'), href: `/${locale}/contact` },
  ];

  const services = [
    { name: t('home.services.houseCleaning.title'), href: `/${locale}/services/house-cleaning` },
    { name: t('home.services.apartmentCleaning.title'), href: `/${locale}/services/apartment-cleaning` },
    { name: t('home.services.finalCleaning.title'), href: `/${locale}/services/final-cleaning` },
    { name: t('home.services.officeCleaning.title'), href: `/${locale}/services/office-cleaning` },
    { name: t('home.services.stairwellCleaning.title'), href: `/${locale}/services/stairwell-cleaning` },
    { name: t('home.services.windowCleaning.title'), href: `/${locale}/services/window-cleaning` },
    { name: t('home.services.relocation.title'), href: `/${locale}/services/relocation` },
    { name: t('home.services.disposal.title'), href: `/${locale}/services/disposal` },
  ];

  const legalLinks = [
    { name: t('navigation.legal'), href: `/${locale}/legal` },
    { name: t('legal.datenschutz'), href: `/${locale}/legal#datenschutz` },
  ];

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
                <span>Schweiz, Bern</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-swiss-blue" />
                <a href="tel:+41123456789" className="hover:text-swiss-blue transition-colors">
                  +41 12 345 67 89
                </a>
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
              <div className="flex space-x-3">
                <a
                  href="https://facebook.com/swisscleanmove"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-swiss-blue rounded-lg flex items-center justify-center hover:bg-swiss-blue/80 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/swisscleanmove"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-swiss-blue rounded-lg flex items-center justify-center hover:bg-swiss-blue/80 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/company/swisscleanmove"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-swiss-blue rounded-lg flex items-center justify-center hover:bg-swiss-blue/80 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-swiss-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-swiss-gray-400 text-sm">
              © {new Date().getFullYear()} SwissCleanMove. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center space-x-4 text-sm text-swiss-gray-400">
              <span>🇨🇭 Made in Switzerland</span>
              <span>•</span>
              <span>100% Abnahmegarantie</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
