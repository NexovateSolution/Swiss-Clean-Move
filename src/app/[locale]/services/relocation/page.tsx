'use client'

import { useTranslations } from 'next-intl';
import Layout from '@/components/Layout';
import ServiceForm from '@/components/ServiceForm';
import { useState } from 'react';
import { 
  Truck, 
  CheckCircle, 
  Clock, 
  Shield, 
  Star,
  Phone,
  Mail,
  Package,
  Users
} from 'lucide-react';

export default function RelocationPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();
  const [showForm, setShowForm] = useState(false);

  const features = t.raw('services.features.relocation') as string[];

  const benefits = [
    {
      icon: Shield,
      title: t('servicesPages.relocation.benefits.fullyInsured.title'),
      description: t('servicesPages.relocation.benefits.fullyInsured.description')
    },
    {
      icon: Users,
      title: t('servicesPages.relocation.benefits.experiencedTeam.title'),
      description: t('servicesPages.relocation.benefits.experiencedTeam.description')
    },
    {
      icon: Package,
      title: t('servicesPages.relocation.benefits.fullService.title'),
      description: t('servicesPages.relocation.benefits.fullService.description')
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-max py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Truck className="w-16 h-16 mx-auto text-indigo-100" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {t('servicesPages.relocation.hero.title')}
            </h1>
            <p className="text-xl text-indigo-100">
              {t('servicesPages.relocation.hero.subtitle')}
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
                {t('servicesPages.relocation.details.title')}
              </h2>
              <p className="text-lg text-swiss-gray-700">
                {t('servicesPages.relocation.details.description')}
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
                <div className="text-2xl font-bold text-swiss-blue mb-2">{t('services.pricingUnits.byEffort')}</div>
                <p className="text-swiss-gray-600">{t('servicesPages.relocation.details.rateNote')}</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-swiss-gray-200 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Truck className="w-16 h-16 text-swiss-blue mx-auto" />
                  <p className="text-swiss-gray-600">{t('servicesPages.relocation.details.imageLabel')}</p>
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
              {t('servicesPages.relocation.benefitsSection.title')}
            </h2>
            <p className="text-xl text-swiss-gray-600">
              {t('servicesPages.relocation.benefitsSection.subtitle')}
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

      {/* Process Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-gray-800">
              {t('servicesPages.relocation.processSection.title')}
            </h2>
            <p className="text-xl text-swiss-gray-600">
              {t('servicesPages.relocation.processSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: t('servicesPages.relocation.processSection.steps.planning.title'), description: t('servicesPages.relocation.processSection.steps.planning.description') },
              { step: '2', title: t('servicesPages.relocation.processSection.steps.packing.title'), description: t('servicesPages.relocation.processSection.steps.packing.description') },
              { step: '3', title: t('servicesPages.relocation.processSection.steps.transport.title'), description: t('servicesPages.relocation.processSection.steps.transport.description') },
              { step: '4', title: t('servicesPages.relocation.processSection.steps.setup.title'), description: t('servicesPages.relocation.processSection.steps.setup.description') }
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-swiss-blue text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-swiss-gray-800">{item.title}</h3>
                <p className="text-swiss-gray-600">{item.description}</p>
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
              {t('servicesPages.relocation.cta.title')}
            </h2>
            <p className="text-xl text-blue-100">
              {t('servicesPages.relocation.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowForm(true)}
                className="btn-secondary text-lg px-8 py-4"
              >
                {t('servicesPages.relocation.cta.primaryButton')}
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
        serviceName={t('home.services.relocation.title')}
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        formType="relocation"
      />
    </Layout>
  );
}
