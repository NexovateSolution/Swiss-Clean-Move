'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Phone, Globe, ChevronDown, LogIn } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Memoize navigation array to prevent recreation on every render
  const navigation = useMemo(() => [
    { name: t('navigation.home'), href: `/${locale}` },
    { name: t('navigation.about'), href: `/${locale}/about` },
    { name: t('navigation.services'), href: `/${locale}/services` },
    { name: t('navigation.regions'), href: `/${locale}/regions` },
    { name: t('navigation.pricing'), href: `/${locale}/pricing` },
    { name: t('navigation.faq'), href: `/${locale}/faq` },
    { name: t('navigation.freeOffer'), href: `/${locale}/free-offer` },
    { name: t('navigation.contact'), href: `/${locale}/contact` },
  ], [locale, t]);

  // Memoize locale switch function
  const switchLocale = useCallback((newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${currentPath}`);
  }, [pathname, locale, router]);

  return (
    <header className="bg-white shadow-lg fixed top-0 w-full z-50 border-b border-swiss-red/15">
      <div className="container-max">
        <div className={`flex justify-between items-center py-1.5 px-4 ${locale === 'de' ? 'lg:px-4 gap-2' : 'lg:px-6 gap-4'
          }`}>
          {/* Logo (image only) */}
          <Link href={`/${locale}`} className="flex items-center flex-shrink-0 min-w-fit" prefetch={true}>
            <img
              src="/images/logo.jpg"
              alt="SwissCleanMove Logo"
              width={200}
              height={64}
              className="h-16 w-auto object-contain drop-shadow-sm bg-transparent"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                if (!img.dataset.fallback) {
                  img.dataset.fallback = 'jpg';
                  img.src = '/images/logo.jpg';
                }
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center flex-1 justify-center ml-4 ${locale === 'de'
            ? 'space-x-0.5 xl:space-x-1 2xl:space-x-1.5 max-w-4xl'
            : 'space-x-0.5 lg:space-x-1 xl:space-x-1.5 2xl:space-x-2 max-w-5xl'
            }`}>
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  className={`relative py-1.5 rounded-lg transition-all duration-150 whitespace-nowrap group font-medium ${locale === 'de'
                    ? 'px-1.5 lg:px-2 text-xs'
                    : 'px-1.5 lg:px-2 xl:px-2.5 text-xs lg:text-sm'
                    } ${isActive
                      ? 'text-swiss-red bg-swiss-red/10 shadow-sm'
                      : 'text-swiss-gray-700 hover:text-swiss-red hover:bg-swiss-red/5'
                    }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Hover effect background */}
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-swiss-red/5 to-swiss-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ${isActive ? 'opacity-100' : ''
                    }`}></div>
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-swiss-red rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className={`hidden lg:flex items-center ${locale === 'de' ? 'space-x-1.5' : 'space-x-1.5 xl:space-x-2'
            }`}>
            {/* Phone */}
            <a
              href="tel:+41123456789"
              className={`flex items-center space-x-1 xl:space-x-2 bg-swiss-red/5 hover:bg-swiss-red/10 text-swiss-red hover:text-swiss-red/90 rounded-lg transition-all duration-150 whitespace-nowrap group ${locale === 'de' ? 'px-2 py-1' : 'px-2 xl:px-3 py-1 xl:py-1.5'
                }`}
            >
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className={`font-medium ${locale === 'de' ? 'text-xs' : 'text-xs xl:text-sm'}`}>+41 12 345 67 89</span>
            </a>

            {/* Language Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className={`flex items-center space-x-1 xl:space-x-2 bg-swiss-gray-50 hover:bg-swiss-gray-100 border border-swiss-gray-200 hover:border-swiss-gray-300 rounded-lg transition-all duration-150 group ${locale === 'de' ? 'px-2 py-1' : 'px-2 xl:px-3 py-1 xl:py-1.5'
                  }`}
              >
                <Globe className="w-4 h-4 text-swiss-gray-500" />
                <span className="text-xs xl:text-sm font-medium text-swiss-gray-700 uppercase">{locale}</span>
                <ChevronDown className={`w-4 h-4 text-swiss-gray-500 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 transform -translate-x-4">
                  <button
                    onClick={() => {
                      switchLocale('en');
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${locale === 'en' ? 'text-swiss-blue font-medium' : 'text-gray-700'
                      }`}
                  >
                    🇺🇸 English
                  </button>
                  <button
                    onClick={() => {
                      switchLocale('de');
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${locale === 'de' ? 'text-swiss-blue font-medium' : 'text-gray-700'
                      }`}
                  >
                    🇩🇪 Deutsch
                  </button>
                  <button
                    onClick={() => {
                      switchLocale('fr');
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${locale === 'fr' ? 'text-swiss-blue font-medium' : 'text-gray-700'
                      }`}
                  >
                    🇫🇷 Français
                  </button>
                </div>
              )}
            </div>

            {/* Admin Login Button */}
            <Link
              href="/admin/login"
              className={`flex items-center space-x-1 xl:space-x-2 bg-swiss-red/10 hover:bg-swiss-red/20 text-swiss-red hover:text-swiss-red/90 rounded-lg transition-all duration-150 whitespace-nowrap group ${locale === 'de' ? 'px-2 py-1' : 'px-2 xl:px-3 py-1 xl:py-1.5'
                }`}
              title="Admin Login"
            >
              <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className={`font-medium ${locale === 'de' ? 'text-xs' : 'text-xs xl:text-sm'}`}>Admin</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-swiss-gray-50 hover:bg-swiss-gray-100 text-swiss-gray-700 hover:text-swiss-blue transition-all duration-300 border border-swiss-gray-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-swiss-gray-200 bg-white">
            <nav className="flex flex-col space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    prefetch={true}
                    className={`relative font-medium py-3 px-4 rounded-xl transition-all duration-150 group ${isActive
                      ? 'text-swiss-blue bg-gradient-to-r from-swiss-blue/10 to-swiss-blue/5 shadow-sm border-l-4 border-swiss-blue'
                      : 'text-swiss-gray-700 hover:text-swiss-blue hover:bg-gradient-to-r hover:from-swiss-blue/5 hover:to-transparent'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {/* Mobile hover effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-swiss-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
                  </Link>
                );
              })}

              {/* Mobile Language Switcher */}
              <div className="py-3 px-4">
                <div className="flex items-center mb-3">
                  <Globe className="w-4 h-4 text-swiss-gray-500 mr-2" />
                  <span className="text-sm font-medium text-swiss-gray-700">Language</span>
                </div>
                <div className="flex items-center space-x-2 bg-swiss-gray-50 rounded-lg p-1">
                  <button
                    onClick={() => {
                      switchLocale('en');
                      setIsMenuOpen(false);
                    }}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${locale === 'en'
                      ? 'bg-swiss-blue text-white shadow-sm'
                      : 'text-swiss-gray-600 hover:text-swiss-blue hover:bg-white'
                      }`}
                  >
                    🇺🇸 EN
                  </button>
                  <button
                    onClick={() => {
                      switchLocale('de');
                      setIsMenuOpen(false);
                    }}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${locale === 'de'
                      ? 'bg-swiss-blue text-white shadow-sm'
                      : 'text-swiss-gray-600 hover:text-swiss-blue hover:bg-white'
                      }`}
                  >
                    🇩🇪 DE
                  </button>
                  <button
                    onClick={() => {
                      switchLocale('fr');
                      setIsMenuOpen(false);
                    }}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${locale === 'fr'
                      ? 'bg-swiss-blue text-white shadow-sm'
                      : 'text-swiss-gray-600 hover:text-swiss-blue hover:bg-white'
                      }`}
                  >
                    🇫🇷 FR
                  </button>
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="flex flex-col space-y-3 pt-4 px-4 border-t border-swiss-gray-200">
                <a
                  href="tel:+41123456789"
                  className="flex items-center space-x-2 text-swiss-blue hover:text-swiss-blue/80 py-2"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">+41 12 345 67 89</span>
                </a>
                <Link
                  href="/admin/login"
                  className="flex items-center space-x-2 text-swiss-red hover:text-swiss-red/80 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  <span className="font-medium">Admin Login</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
