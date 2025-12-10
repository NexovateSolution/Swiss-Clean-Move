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

  const features = [
    'Complete moving service',
    'Packing and transport',
    'Furniture assembly',
    'Insurance coverage',
    'Switzerland-wide moves'
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Fully Insured',
      description: 'Complete insurance coverage for your belongings'
    },
    {
      icon: Users,
      title: 'Experienced Team',
      description: 'Professional movers with years of experience'
    },
    {
      icon: Package,
      title: 'Full Service',
      description: 'From packing to unpacking, we handle everything'
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
              Professional Relocation Services
            </h1>
            <p className="text-xl text-indigo-100">
              Complete relocation services with experienced team and professional equipment
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
                Stress-Free Moving Experience
              </h2>
              <p className="text-lg text-swiss-gray-700">
                Moving doesn't have to be stressful. Our professional relocation team 
                handles every aspect of your move, from careful packing to safe transport 
                and setup in your new location.
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
                <div className="text-2xl font-bold text-swiss-blue mb-2">By Effort</div>
                <p className="text-swiss-gray-600">Customized pricing based on your specific needs</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-swiss-gray-200 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Truck className="w-16 h-16 text-swiss-blue mx-auto" />
                  <p className="text-swiss-gray-600">Professional Moving Services</p>
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
              Why Choose Our Relocation Service?
            </h2>
            <p className="text-xl text-swiss-gray-600">
              Professional moving you can trust
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
              Our Moving Process
            </h2>
            <p className="text-xl text-swiss-gray-600">
              Organized, efficient, and careful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Planning & Survey', description: 'We assess your moving requirements and create a plan' },
              { step: '2', title: 'Packing', description: 'Professional packing with quality materials' },
              { step: '3', title: 'Transport', description: 'Safe and secure transportation to your new location' },
              { step: '4', title: 'Setup', description: 'Unpacking and furniture assembly at destination' }
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
              Ready to Move with Professionals?
            </h2>
            <p className="text-xl text-blue-100">
              Get your personalized moving quote today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowForm(true)}
                className="btn-secondary text-lg px-8 py-4"
              >
                Get Moving Quote
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
        serviceName="Relocation"
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        formType="relocation"
      />
    </Layout>
  );
}
