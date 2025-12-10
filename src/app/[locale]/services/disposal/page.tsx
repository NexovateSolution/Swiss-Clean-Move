'use client'

import { useTranslations } from 'next-intl';
import Layout from '@/components/Layout';
import ServiceForm from '@/components/ServiceForm';
import { useState } from 'react';
import { 
  Trash2, 
  CheckCircle, 
  Clock, 
  Shield, 
  Star,
  Phone,
  Mail,
  Recycle,
  Leaf
} from 'lucide-react';

export default function DisposalPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();
  const [showForm, setShowForm] = useState(false);

  const features = [
    'Furniture and household items',
    'Electronic devices',
    'Bulky waste',
    'Professional disposal',
    'Environmentally friendly'
  ];

  const benefits = [
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Environmentally responsible disposal and recycling'
    },
    {
      icon: Clock,
      title: 'Quick Service',
      description: 'Fast and efficient disposal service'
    },
    {
      icon: Recycle,
      title: 'Proper Recycling',
      description: 'Items are sorted and recycled appropriately'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-500 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-max py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Trash2 className="w-16 h-16 mx-auto text-red-100" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Professional Disposal Services
            </h1>
            <p className="text-xl text-red-100">
              Professional disposal services for furniture, household items, and waste materials
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
                Responsible Waste Disposal
              </h2>
              <p className="text-lg text-swiss-gray-700">
                Our professional disposal service handles all types of household items, 
                furniture, and waste materials. We ensure environmentally responsible 
                disposal and proper recycling of all materials.
              </p>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-swiss-gray-800">We Dispose Of:</h3>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-swiss-green flex-shrink-0" />
                    <span className="text-swiss-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="bg-swiss-blue/10 p-6 rounded-lg">
                <div className="text-2xl font-bold text-swiss-blue mb-2">By Volume</div>
                <p className="text-swiss-gray-600">Fair pricing based on the volume of items</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-swiss-gray-200 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Trash2 className="w-16 h-16 text-swiss-blue mx-auto" />
                  <p className="text-swiss-gray-600">Professional Disposal Services</p>
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
              Why Choose Our Disposal Service?
            </h2>
            <p className="text-xl text-swiss-gray-600">
              Responsible and professional waste management
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
              Our Disposal Process
            </h2>
            <p className="text-xl text-swiss-gray-600">
              Efficient and environmentally responsible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Assessment', description: 'We evaluate the items to be disposed of' },
              { step: '2', title: 'Collection', description: 'Professional collection from your location' },
              { step: '3', title: 'Sorting', description: 'Items are sorted for recycling and disposal' },
              { step: '4', title: 'Disposal', description: 'Environmentally responsible disposal and recycling' }
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
              Need Professional Disposal Service?
            </h2>
            <p className="text-xl text-blue-100">
              Get your disposal quote today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowForm(true)}
                className="btn-secondary text-lg px-8 py-4"
              >
                Get Disposal Quote
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
        serviceName="Disposal"
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        formType="disposal"
      />
    </Layout>
  );
}
