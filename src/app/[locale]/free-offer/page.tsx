'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Layout from '@/components/Layout';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Home,
  Building2,
  UtensilsCrossed,
  Briefcase,
  Wrench,
  Trash2,
  Truck,
  CheckCircle,
  Send,
  FileText
} from 'lucide-react';

export default function FreeOfferPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',

    // Service Details
    serviceType: '',
    propertyType: '',
    rooms: '',
    area: '',
    preferredDate: '',
    urgency: '',

    // Additional Info
    additionalServices: [] as string[],
    message: '',

    // Agreement
    agreement: false,
    newsletter: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceTypes = [
    { value: 'house-cleaning', label: t('home.services.houseCleaning.title'), icon: Home },
    { value: 'apartment-cleaning', label: t('home.services.apartmentCleaning.title'), icon: Building2 },
    { value: 'final-cleaning', label: t('home.services.finalCleaning.title'), icon: CheckCircle },
    { value: 'office-cleaning', label: t('home.services.officeCleaning.title'), icon: Briefcase },
    { value: 'stairwell-cleaning', label: t('home.services.stairwellCleaning.title'), icon: Building2 },
    { value: 'window-cleaning', label: t('home.services.windowCleaning.title'), icon: Home },
    { value: 'relocation', label: t('home.services.relocation.title'), icon: Truck },
    { value: 'disposal', label: t('home.services.disposal.title'), icon: Trash2 }
  ];

  const propertyTypes = [
    { value: 'apartment', label: t('freeOffer.form.propertyTypes.apartment') },
    { value: 'house', label: t('freeOffer.form.propertyTypes.house') },
    { value: 'office', label: t('freeOffer.form.propertyTypes.office') },
    { value: 'restaurant', label: t('freeOffer.form.propertyTypes.restaurant') },
    { value: 'other', label: t('freeOffer.form.propertyTypes.other') }
  ];

  const additionalServiceOptions = [
    t('freeOffer.form.additionalServices.windowCleaning'),
    t('freeOffer.form.additionalServices.carpetCleaning'),
    t('freeOffer.form.additionalServices.furnitureTransport'),
    t('freeOffer.form.additionalServices.packingService'),
    t('freeOffer.form.additionalServices.disposal'),
    t('freeOffer.form.additionalServices.emergencyCleaning')
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleServiceTypeChange = (serviceType: string) => {
    setFormData(prev => ({ ...prev, serviceType }));
  };

  const handleAdditionalServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter(s => s !== service)
        : [...prev.additionalServices, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-max">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div className="w-20 h-20 bg-swiss-green rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-swiss-gray-800">
                {t('freeOffer.success.title')}
              </h1>
              <p className="text-xl text-swiss-gray-600">
                {t('freeOffer.success.subtitle')}
              </p>
              <div className="bg-swiss-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-swiss-gray-800">{t('freeOffer.success.nextSteps.title')}</h3>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-swiss-green" />
                    <span>{t('freeOffer.success.nextSteps.step1')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-swiss-green" />
                    <span>{t('freeOffer.success.nextSteps.step2')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-swiss-green" />
                    <span>{t('freeOffer.success.nextSteps.step3')}</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`/${locale}`} className="btn-primary">
                  {t('freeOffer.success.actions.homepage')}
                </a>
                <a href="tel:+41123456789" className="btn-secondary">
                  {t('freeOffer.success.actions.call')}
                </a>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-swiss-blue to-swiss-green text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-max py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              {t('freeOffer.title')}
            </h1>
            <p className="text-xl text-blue-100">
              {t('freeOffer.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-swiss-gray-800 mb-6 flex items-center space-x-2">
                  <User className="w-6 h-6 text-swiss-blue" />
                  <span>{t('freeOffer.form.personalInfo')}</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-swiss-gray-700 mb-2">
                      {t('freeOffer.form.fields.firstName')} *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-swiss-gray-300 rounded-lg focus:ring-2 focus:ring-swiss-blue focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-swiss-gray-700 mb-2">
                      {t('freeOffer.form.fields.lastName')} *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-swiss-gray-300 rounded-lg focus:ring-2 focus:ring-swiss-blue focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-swiss-gray-700 mb-2">
                      {t('contact.form.email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-swiss-gray-300 rounded-lg focus:ring-2 focus:ring-swiss-blue focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-swiss-gray-700 mb-2">
                      {t('contact.form.phone')} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-swiss-gray-300 rounded-lg focus:ring-2 focus:ring-swiss-blue focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-swiss-gray-700 mb-2">
                      {t('freeOffer.form.fields.address')} *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-swiss-gray-300 rounded-lg focus:ring-2 focus:ring-swiss-blue focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-swiss-gray-700 mb-2">
                      {t('freeOffer.form.fields.postalCode')} *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-swiss-gray-300 rounded-lg focus:ring-2 focus:ring-swiss-blue focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-swiss-gray-700 mb-2">
                      {t('freeOffer.form.fields.city')} *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-swiss-gray-300 rounded-lg focus:ring-2 focus:ring-swiss-blue focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Service Selection */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-swiss-gray-800 mb-6 flex items-center space-x-2">
                  <Briefcase className="w-6 h-6 text-swiss-blue" />
                  <span>{t('freeOffer.form.serviceDetails')}</span>
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-swiss-gray-700 mb-4">
                      {t('freeOffer.form.serviceType')} *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {serviceTypes.map((service) => {
                        const IconComponent = service.icon;
                        return (
                          <button
                            key={service.value}
                            type="button"
                            onClick={() => handleServiceTypeChange(service.value)}
                            className={`p-4 border-2 rounded-lg transition-all duration-200 ${formData.serviceType === service.value
                                ? 'border-swiss-blue bg-swiss-blue/5'
                                : 'border-swiss-gray-300 hover:border-swiss-blue/50'
                              }`}
                          >
                            <div className="flex flex-col items-center space-y-2">
                              <IconComponent className={`w-8 h-8 ${formData.serviceType === service.value ? 'text-swiss-blue' : 'text-swiss-gray-500'
                                }`} />
                              <span className={`text-sm font-medium ${formData.serviceType === service.value ? 'text-swiss-blue' : 'text-swiss-gray-700'
                                }`}>
                                {service.label}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-swiss-gray-700 mb-2">
                        {t('freeOffer.form.propertyType')} *
                      </label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-swiss-gray-300 rounded-lg focus:ring-2 focus:ring-swiss-blue focus:border-transparent"
                      >
                        <option value="">{t('freeOffer.form.fields.selectPlaceholder')}</option>
                        {propertyTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-swiss-gray-700 mb-2">
                        {t('freeOffer.form.rooms')}
                      </label>
                      <input
                        type="number"
                        name="rooms"
                        value={formData.rooms}
                        onChange={handleInputChange}
                        min="1"
                        max="20"
                        className="w-full px-4 py-3 border border-swiss-gray-300 rounded-lg focus:ring-2 focus:ring-swiss-blue focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-swiss-gray-700 mb-2">
                        {t('freeOffer.form.area')}
                      </label>
                      <input
                        type="number"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full px-4 py-3 border border-swiss-gray-300 rounded-lg focus:ring-2 focus:ring-swiss-blue focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-swiss-gray-700 mb-2">
                        {t('freeOffer.form.date')}
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-swiss-gray-300 rounded-lg focus:ring-2 focus:ring-swiss-blue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-swiss-gray-700 mb-4">
                      {t('freeOffer.form.fields.additionalServices')}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {additionalServiceOptions.map((service) => (
                        <label key={service} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.additionalServices.includes(service)}
                            onChange={() => handleAdditionalServiceChange(service)}
                            className="w-4 h-4 text-swiss-blue border-swiss-gray-300 rounded focus:ring-swiss-blue"
                          />
                          <span className="text-sm text-swiss-gray-700">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-swiss-gray-800 mb-6 flex items-center space-x-2">
                  <FileText className="w-6 h-6 text-swiss-blue" />
                  <span>{t('freeOffer.form.additionalInfo')}</span>
                </h2>

                <div>
                  <label className="block text-sm font-medium text-swiss-gray-700 mb-2">
                    {t('freeOffer.form.fields.specialRequests')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-swiss-gray-300 rounded-lg focus:ring-2 focus:ring-swiss-blue focus:border-transparent"
                    placeholder={t('freeOffer.form.fields.placeholder')}
                  />
                </div>
              </div>

              {/* Agreement & Submit */}
              <div className="card p-8">
                <div className="space-y-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreement"
                      checked={formData.agreement}
                      onChange={handleInputChange}
                      required
                      className="w-5 h-5 text-swiss-blue border-swiss-gray-300 rounded focus:ring-swiss-blue mt-0.5"
                    />
                    <span className="text-sm text-swiss-gray-700">
                      {t('freeOffer.form.agreement.privacy')}{' '}
                      <a href={`/${locale}/legal#datenschutz`} className="text-swiss-blue hover:underline">
                        {t('freeOffer.form.agreement.privacyLink')}
                      </a>{' '}
                      {t('freeOffer.form.agreement.contact')} *
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-swiss-blue border-swiss-gray-300 rounded focus:ring-swiss-blue mt-0.5"
                    />
                    <span className="text-sm text-swiss-gray-700">
                      {t('freeOffer.form.agreement.newsletter')}
                    </span>
                  </label>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.agreement}
                    className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>{t('freeOffer.form.submitting')}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t('freeOffer.form.submit')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
