'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);
  const t = useTranslations();

  const handleWhatsAppClick = () => {
    const phoneNumber = '41123456789'; // WhatsApp number without + or spaces (site-wide number)
    const message = encodeURIComponent('Hello! I am interested in your services and would like to know more about it. Could you send me more information? Thank you!');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <div className="relative">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-swiss-gray-600 text-white rounded-full flex items-center justify-center hover:bg-swiss-gray-700 transition-colors z-10"
        >
          <X className="w-3 h-3" />
        </button>

        {/* WhatsApp button */}
        <button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group relative z-20"
          aria-label="WhatsApp kontaktieren"
        >
          <MessageCircle className="w-6 h-6" />

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-swiss-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            WhatsApp Chat
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-swiss-gray-800"></div>
          </div>
        </button>

        {/* Pulse animation */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75 pointer-events-none"></div>
      </div>
    </div>
  );
}
