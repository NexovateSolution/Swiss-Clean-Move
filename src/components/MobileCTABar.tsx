'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Phone, MessageCircle, ClipboardList } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MobileCTABar() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up (optional UX enhancement, keeping it sticky for now)
      // if (currentScrollY > lastScrollY) {
      //   setIsVisible(false);
      // } else {
      //   setIsVisible(true);
      // }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const phoneNumber = '41782158030';
    const message = encodeURIComponent(t('contact.whatsapp.prefill') || 'Hello! I am interested in your services.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-[9998] bg-white border-t border-swiss-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex justify-around items-center p-2 pb-safe">
        {/* Call Button */}
        <a 
          href="tel:+41782158030"
          className="flex flex-col items-center justify-center p-2 w-1/3 text-swiss-text hover:text-swiss-red transition-colors"
        >
          <Phone className="w-5 h-5 mb-1 text-swiss-red" />
          <span className="text-[10px] font-semibold">{t('contact.quickContact.call')}</span>
        </a>

        {/* WhatsApp Button */}
        <button 
          onClick={handleWhatsAppClick}
          className="flex flex-col items-center justify-center p-2 w-1/3 text-swiss-text hover:text-[#25D366] transition-colors relative"
        >
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 pointer-events-none w-10 h-10 top-1 left-1/2 -translate-x-1/2"></div>
          <MessageCircle className="w-5 h-5 mb-1 text-[#25D366] relative z-10" />
          <span className="text-[10px] font-semibold relative z-10">WhatsApp</span>
        </button>

        {/* Offer Button */}
        <Link 
          href={`/${locale}/free-offer`}
          className="flex flex-col items-center justify-center p-2 w-1/3 text-swiss-text hover:text-swiss-red transition-colors"
        >
          <ClipboardList className="w-5 h-5 mb-1 text-swiss-red" />
          <span className="text-[10px] font-semibold">{t('home.cta.button')}</span>
        </Link>
      </div>
    </div>
  );
}
