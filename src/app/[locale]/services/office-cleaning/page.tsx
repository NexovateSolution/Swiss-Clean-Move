'use client'

import { useTranslations } from 'next-intl';
import Layout from '@/components/Layout';
import ServiceForm from '@/components/ServiceForm';
import { useState } from 'react';
import { 
  Briefcase, 
  CheckCircle, 
  Clock, 
  Shield, 
  Star,
  Phone,
  Mail,
  Users,
  Building
} from 'lucide-react';

export default function OfficeCleaningPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();
  const [showForm, setShowForm] = useState(false);

  const features = t.raw('services.features.officeCleaning') as string[];

  const benefits = [
    {
      icon: Users,
      title: t('servicesPages.officeCleaning.benefits.professionalTeam.title'),
      description: t('servicesPages.officeCleaning.benefits.professionalTeam.description')
    },
    {
      icon: Clock,
      title: t('servicesPages.officeCleaning.benefits.flexibleHours.title'),
      description: t('servicesPages.officeCleaning.benefits.flexibleHours.description')
    },
    {
      icon: Shield,
      title: t('servicesPages.officeCleaning.benefits.fullyInsured.title'),
      description: t('servicesPages.officeCleaning.benefits.fullyInsured.description')
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-max py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Briefcase className="w-16 h-16 mx-auto text-orange-100" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {t('servicesPages.officeCleaning.hero.title')}
            </h1>
            <p className="text-xl text-orange-100">
              {t('servicesPages.officeCleaning.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowForm(true)}
                className="btn-secondary text-lg px-8 py-4"
              >
                {t('servicesPages.common.requestQuote')}
              </button>
              <a href="tel:+41123456789" className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 border border-white/20">
                <Phone className="w-5 h-5" />
                <span>{t('servicesPages.common.callNow')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-swiss-gray-800">
                {t('servicesPages.officeCleaning.details.title')}
              </h2>
              <p className="text-lg text-swiss-gray-700">
                {t('servicesPages.officeCleaning.details.description')}
              </p>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-swiss-gray-800">{t('servicesPages.common.ourServicesInclude')}</h3>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-swiss-green flex-shrink-0" />
                    <span className="text-swiss-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="bg-swiss-blue/10 p-6 rounded-lg">
                <div className="text-2xl font-bold text-swiss-blue mb-2">{t('services.pricing.officeCleaning')}</div>
                <p className="text-swiss-gray-600">{t('servicesPages.officeCleaning.details.rateNote')}</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-swiss-gray-200 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Building className="w-16 h-16 text-swiss-blue mx-auto" />
                  <p className="text-swiss-gray-600">{t('servicesPages.officeCleaning.details.imageLabel')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-swiss-gray-50">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-gray-800">
              {t('servicesPages.officeCleaning.benefitsSection.title')}
            </h2>
            <p className="text-xl text-swiss-gray-600">
              {t('servicesPages.officeCleaning.benefitsSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="card p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-swiss-blue rounded-full flex items-center justify-center mx-auto">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-swiss-gray-800">
                    {benefit.title}
                  </h3>
                  <p className="text-swiss-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-gray-800">
              {t('servicesPages.officeCleaning.solutions.title')}
            </h2>
            <p className="text-xl text-swiss-gray-600">
              {t('servicesPages.officeCleaning.solutions.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: t('servicesPages.officeCleaning.solutions.items.dailyCleaning.title'), description: t('servicesPages.officeCleaning.solutions.items.dailyCleaning.description'), icon: '🏢' },
              { title: t('servicesPages.officeCleaning.solutions.items.deepCleaning.title'), description: t('servicesPages.officeCleaning.solutions.items.deepCleaning.description'), icon: '✨' },
              { title: t('servicesPages.officeCleaning.solutions.items.carpetCleaning.title'), description: t('servicesPages.officeCleaning.solutions.items.carpetCleaning.description'), icon: '🧽' },
              { title: t('servicesPages.officeCleaning.solutions.items.windowCleaning.title'), description: t('servicesPages.officeCleaning.solutions.items.windowCleaning.description'), icon: '🪟' },
              { title: t('servicesPages.officeCleaning.solutions.items.sanitization.title'), description: t('servicesPages.officeCleaning.solutions.items.sanitization.description'), icon: '🧴' },
              { title: t('servicesPages.officeCleaning.solutions.items.wasteManagement.title'), description: t('servicesPages.officeCleaning.solutions.items.wasteManagement.description'), icon: '♻️' }
            ].map((service, index) => (
              <div key={index} className="card p-6 text-center space-y-4">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-swiss-gray-800">{service.title}</h3>
                <p className="text-swiss-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-swiss-blue text-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('servicesPages.officeCleaning.cta.title')}
            </h2>
            <p className="text-xl text-blue-100">
              {t('servicesPages.officeCleaning.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowForm(true)}
                className="btn-secondary text-lg px-8 py-4"
              >
                {t('servicesPages.officeCleaning.cta.primaryButton')}
              </button>
              <a href={`mailto:info@swisscleanmove.ch`} className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 border border-white/20">
                <Mail className="w-5 h-5" />
                <span>{t('servicesPages.common.emailUs')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Form Modal */}
      <ServiceForm
        serviceName={t('home.services.officeCleaning.title')}
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        formType="cleaning"
      />
    </Layout>
  );
}
