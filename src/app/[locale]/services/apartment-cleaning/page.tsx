'use client'

import { useTranslations } from 'next-intl';
import Layout from '@/components/Layout';
import ServiceForm from '@/components/ServiceForm';
import { useState } from 'react';
import { 
  Building2, 
  CheckCircle, 
  Clock, 
  Shield, 
  Star,
  Phone,
  Mail,
  Award,
  Home
} from 'lucide-react';

export default function ApartmentCleaningPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();
  const [showForm, setShowForm] = useState(false);

  const features = [
    'Complete apartment cleaning',
    'Kitchen and bathroom thorough cleaning',
    'Windows inside and outside',
    'Floors and carpets',
    '100% deposit guarantee'
  ];

  const benefits = [
    {
      icon: Award,
      title: '100% Deposit Guarantee',
      description: 'We guarantee you get your full deposit back'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'We work around your schedule and availability'
    },
    {
      icon: Star,
      title: 'Professional Team',
      description: 'Experienced cleaners with high-quality equipment'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-500 to-green-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-max py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Building2 className="w-16 h-16 mx-auto text-green-100" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Apartment Cleaning Services
            </h1>
            <p className="text-xl text-green-100">
              Professional apartment cleaning services including final cleaning with deposit guarantee
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowForm(true)}
                className="btn-secondary text-lg px-8 py-4"
              >
                Request Quote
              </button>
              <a href="tel:+41123456789" className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 border border-white/20">
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
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
                Professional Apartment Cleaning
              </h2>
              <p className="text-lg text-swiss-gray-700">
                Our comprehensive apartment cleaning service covers every room and corner. 
                Perfect for regular maintenance, move-in preparation, or end-of-tenancy 
                cleaning with our 100% deposit guarantee.
              </p>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-swiss-gray-800">What's Included:</h3>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-swiss-green flex-shrink-0" />
                    <span className="text-swiss-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="bg-swiss-blue/10 p-6 rounded-lg">
                <div className="text-2xl font-bold text-swiss-blue mb-2">CHF 45–65 / hour / staff</div>
                <p className="text-swiss-gray-600">Professional apartment cleaning with guarantee</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-swiss-gray-200 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Building2 className="w-16 h-16 text-swiss-blue mx-auto" />
                  <p className="text-swiss-gray-600">Professional Apartment Cleaning</p>
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
              Why Choose Our Apartment Cleaning?
            </h2>
            <p className="text-xl text-swiss-gray-600">
              Professional service you can trust
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
              Our Cleaning Process
            </h2>
            <p className="text-xl text-swiss-gray-600">
              Systematic and thorough approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Assessment', description: 'We assess your apartment and specific requirements' },
              { step: '2', title: 'Planning', description: 'Create a detailed cleaning plan for each room' },
              { step: '3', title: 'Deep Cleaning', description: 'Thorough cleaning of all areas and surfaces' },
              { step: '4', title: 'Final Check', description: 'Quality inspection to ensure perfect results' }
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
              Ready for Professional Apartment Cleaning?
            </h2>
            <p className="text-xl text-blue-100">
              Get your free quote today and experience the difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowForm(true)}
                className="btn-secondary text-lg px-8 py-4"
              >
                Get Free Quote
              </button>
              <a href={`mailto:info@swisscleanmove.ch`} className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 border border-white/20">
                <Mail className="w-5 h-5" />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Form Modal */}
      <ServiceForm
        serviceName="Apartment Cleaning"
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        formType="cleaning"
      />
    </Layout>
  );
}
