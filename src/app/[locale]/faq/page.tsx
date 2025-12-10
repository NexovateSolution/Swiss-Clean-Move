'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Layout from '@/components/Layout';
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Shield,
  CheckCircle
} from 'lucide-react';

export default function FAQPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqCategories = [
    {
      title: t('faq.categories.general'),
      faqs: t.raw('faq.questions.general') || []
    },
    {
      title: t('faq.categories.cleaning'),
      faqs: t.raw('faq.questions.cleaning') || []
    },
    {
      title: t('faq.categories.moving'),
      faqs: t.raw('faq.questions.moving') || []
    },
    {
      title: t('faq.categories.pricing'),
      faqs: t.raw('faq.questions.pricing') || []
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="container-max">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
              <HelpCircle className="w-4 h-4 text-yellow-400" />
              <span>{t('faq.title')}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              {t('faq.title')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
                  {category.title}
                </h2>
                <div className="space-y-4">
                  {category.faqs.map((faq: any, faqIndex: number) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    return (
                      <div key={faqIndex} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                          <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                          {openFAQ === globalIndex ? (
                            <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          )}
                        </button>
                        {openFAQ === globalIndex && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-20 bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('faq.quickFacts')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('faq.keyInfo')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('faq.responseTime')}</h3>
              <p className="text-gray-600">{t('faq.responseTimeDesc')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('faq.insurance')}</h3>
              <p className="text-gray-600">{t('faq.insuranceDesc')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('faq.guarantee')}</h3>
              <p className="text-gray-600">{t('faq.guaranteeDesc')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('faq.support')}</h3>
              <p className="text-gray-600">{t('faq.supportDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="container-max">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('faq.stillQuestions')}
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {t('faq.teamHelp')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <a 
                href="tel:+41123456789"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{t('faq.callUs')}</h3>
                <p className="text-blue-100">+41 12 345 67 89</p>
              </a>
              
              <a 
                href="mailto:info@swisscleanmove.ch"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{t('faq.emailUs')}</h3>
                <p className="text-blue-100">info@swisscleanmove.ch</p>
              </a>
              
              <a 
                href={`/${locale}/contact`}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-300 transform hover:scale-105"
              >
                <MessageCircle className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{t('faq.contactForm')}</h3>
                <p className="text-blue-100">{t('faq.sendMessage')}</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
