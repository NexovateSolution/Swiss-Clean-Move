'use client'

import { useTranslations } from 'next-intl';
import Layout from '@/components/Layout';
import ServiceForm from '@/components/ServiceForm';
import { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Shield, 
  Star,
  Phone,
  Mail,
  Award,
  Home
} from 'lucide-react';

export default function FinalCleaningPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();
  const [showForm, setShowForm] = useState(false);

  const features = [
    'End-of-tenancy cleaning',
    'Kitchen and bathroom deep clean',
    'Windows inside and outside',
    'Floor cleaning and polishing',
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
      title: 'Quick Turnaround',
      description: 'Fast service to meet your moving deadlines'
    },
    {
      icon: Star,
      title: 'Professional Results',
      description: 'Thorough cleaning that meets landlord standards'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-500 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-max py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <CheckCircle className="w-16 h-16 mx-auto text-teal-100" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Final Cleaning Services
            </h1>
            <p className="text-xl text-teal-100">
              End-of-tenancy cleaning with 100% deposit guarantee for apartments and houses
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
                Get Your Deposit Back Guaranteed
              </h2>
              <p className="text-lg text-swiss-gray-700">
                Our final cleaning service ensures your property meets the highest 
                standards required by landlords. We guarantee you'll receive your 
                full deposit back or we'll return to fix any issues at no extra cost.
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
                <div className="text-2xl font-bold text-swiss-blue mb-2">from CHF 250</div>
                <p className="text-swiss-gray-600">Professional final cleaning with guarantee</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-swiss-gray-200 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Home className="w-16 h-16 text-swiss-blue mx-auto" />
                  <p className="text-swiss-gray-600">Final Cleaning Service</p>
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
              Why Choose Our Final Cleaning?
            </h2>
            <p className="text-xl text-swiss-gray-600">
              Guaranteed results for your move-out
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

      {/* CTA Section */}
      <section className="section-padding bg-swiss-blue text-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready for Your Final Cleaning?
            </h2>
            <p className="text-xl text-blue-100">
              Get your deposit back with our guaranteed service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowForm(true)}
                className="btn-secondary text-lg px-8 py-4"
              >
                Get Guarantee Quote
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
        serviceName="Final Cleaning"
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        formType="cleaning"
      />
    </Layout>
  );
}
