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
  Users,
  ArrowUpDown
} from 'lucide-react';

export default function StairwellCleaningPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();
  const [showForm, setShowForm] = useState(false);

  const features = [
    'Stairwell and hallway cleaning',
    'Common area maintenance',
    'Floor cleaning and mopping',
    'Window and glass cleaning',
    'Regular service schedules'
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Regular Service',
      description: 'Scheduled cleaning to maintain building standards'
    },
    {
      icon: Users,
      title: 'Professional Team',
      description: 'Experienced in commercial building maintenance'
    },
    {
      icon: Shield,
      title: 'Reliable Service',
      description: 'Consistent quality and dependable scheduling'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-500 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-max py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Building2 className="w-16 h-16 mx-auto text-purple-100" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Stairwell Cleaning Services
            </h1>
            <p className="text-xl text-purple-100">
              Regular maintenance and thorough cleaning of building stairwells and common areas
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
                Professional Building Maintenance
              </h2>
              <p className="text-lg text-swiss-gray-700">
                Clean stairwells and common areas create a positive first impression 
                and maintain property value. Our regular cleaning service ensures 
                your building always looks professional and welcoming.
              </p>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-swiss-gray-800">Our Services Include:</h3>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-swiss-green flex-shrink-0" />
                    <span className="text-swiss-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="bg-swiss-blue/10 p-6 rounded-lg">
                <div className="text-2xl font-bold text-swiss-blue mb-2">flat rate from CHF 120</div>
                <p className="text-swiss-gray-600">Professional building maintenance rates</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-swiss-gray-200 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Building2 className="w-16 h-16 text-swiss-blue mx-auto" />
                  <p className="text-swiss-gray-600">Professional Stairwell Cleaning</p>
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
              Why Choose Our Stairwell Cleaning?
            </h2>
            <p className="text-xl text-swiss-gray-600">
              Professional building maintenance you can trust
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

      {/* Service Areas */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-gray-800">
              Complete Building Cleaning
            </h2>
            <p className="text-xl text-swiss-gray-600">
              We clean all common areas to maintain your building's standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Stairwells', description: 'Steps, railings, and landings', icon: '🪜' },
              { title: 'Hallways', description: 'Corridors and common walkways', icon: '🚪' },
              { title: 'Entrance Areas', description: 'Lobbies and reception areas', icon: '🏢' },
              { title: 'Elevators', description: 'Interior cleaning and maintenance', icon: '🛗' }
            ].map((area, index) => (
              <div key={index} className="card p-6 text-center space-y-4">
                <div className="text-4xl mb-4">{area.icon}</div>
                <h3 className="text-xl font-semibold text-swiss-gray-800">{area.title}</h3>
                <p className="text-swiss-gray-600">{area.description}</p>
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
              Ready for Professional Building Maintenance?
            </h2>
            <p className="text-xl text-blue-100">
              Keep your building looking professional with regular cleaning
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowForm(true)}
                className="btn-secondary text-lg px-8 py-4"
              >
                Get Maintenance Quote
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
        serviceName="Stairwell Cleaning"
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        formType="cleaning"
      />
    </Layout>
  );
}
