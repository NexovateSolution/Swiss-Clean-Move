'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  User,
  Building2,
  Facebook,
  Instagram,
  MessageCircle
} from 'lucide-react';

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(t('contact.errors.submitFailed'));
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(t('contact.errors.submitFailedRetry'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.info.address'),
      details: ['Orpundstrasse 31', '2504 Biel/Bienne', 'Switzerland'],
      color: 'text-red-500'
    },
    {
      icon: Phone,
      title: t('contact.info.phone'),
      details: ['+41 76 488 36 89', '+41 78 215 80 30'],
      color: 'text-blue-500',
      action: 'tel:+41764883689'
    },
    {
      icon: Mail,
      title: t('contact.info.email'),
      details: ['info@swisscleanmove.ch'],
      color: 'text-green-500',
      action: 'mailto:info@swisscleanmove.ch'
    },
    {
      icon: Clock,
      title: t('contact.info.hours'),
      details: [`${t('contact.businessHours.mondayFriday')}: 07:00 - 19:00`, `${t('contact.businessHours.saturday')}: 08:00 - 16:00`, `${t('contact.businessHours.sunday')}: ${t('contact.businessHours.emergencyOnly')}`],
      color: 'text-orange-500'
    }
  ];

  const serviceAreas = [
    'Bern', 'Zürich', 'Basel', 'Genf', 'Lausanne', 'Winterthur',
    'Luzern', 'St. Gallen', 'Lugano', 'Biel/Bienne', 'Thun', 'Köniz'
  ];

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/c/41782158030',
      Icon: MessageCircle,
      className: 'bg-[#25D366] hover:bg-[#25D366]/80'
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/16e3oArupP/',
      Icon: Facebook,
      className: 'bg-[#1877F2] hover:bg-[#1877F2]/80'
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/swisscleanmove?igsh=MTlzdDBuMTB6YWlvNg==',
      Icon: Instagram,
      className: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] hover:opacity-90'
    }
  ] as const;

  if (isSubmitted) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-max">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div className="w-20 h-20 bg-swiss-softRed border border-swiss-border rounded-full flex items-center justify-center mx-auto shadow-subtle">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-swiss-gray-800">
                {t('contact.success.title')}
              </h1>
              <p className="text-xl text-swiss-gray-600">
                {t('contact.success.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`/${locale}`} className="btn-primary">
                  {t('contact.success.actions.homepage')}
                </a>
                <a href="tel:+41764883689" className="btn-secondary">
                  {t('contact.success.actions.call')}
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
      <SwissHero
        badge={t('contact.title')}
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
        right={
          <img
            src="/images/story.png"
            alt={t('contact.title')}
            className="w-full h-[340px] md:h-[420px] object-cover"
          />
        }
      />

      {/* Contact Info Cards */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="card p-6 text-center space-y-4">
                  <div className={`w-12 h-12 ${info.color} bg-current bg-opacity-10 rounded-full flex items-center justify-center mx-auto`}>
                    <IconComponent className={`w-6 h-6 ${info.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-swiss-text">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-swiss-body">
                        {info.action && detailIndex === 0 ? (
                          <a href={info.action} className="hover:text-swiss-text transition-colors">
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-swiss-text mb-4">
                  {t('contact.form.title')}
                </h2>
                <p className="text-swiss-body">
                  {t('contact.form.subtitle')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-swiss-gray-700 mb-2">
                    {t('contact.form.name')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-swiss-border rounded-lg focus:ring-2 focus:ring-swiss-red/20 focus:border-swiss-red"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className="w-full px-4 py-3 border border-swiss-border rounded-lg focus:ring-2 focus:ring-swiss-red/20 focus:border-swiss-red"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-swiss-gray-700 mb-2">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-swiss-border rounded-lg focus:ring-2 focus:ring-swiss-red/20 focus:border-swiss-red"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-swiss-gray-700 mb-2">
                    {t('contact.form.subject')} *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-swiss-border rounded-lg focus:ring-2 focus:ring-swiss-red/20 focus:border-swiss-red"
                  >
                    <option value="">{t('contact.form.selectPlaceholder')}</option>
                    <option value="quote">{t('contact.form.subjects.quote')}</option>
                    <option value="cleaning">{t('contact.form.subjects.cleaning')}</option>
                    <option value="moving">{t('contact.form.subjects.moving')}</option>
                    <option value="maintenance">{t('contact.form.subjects.maintenance')}</option>
                    <option value="emergency">{t('contact.form.subjects.emergency')}</option>
                    <option value="other">{t('contact.form.subjects.other')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-swiss-gray-700 mb-2">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-swiss-border rounded-lg focus:ring-2 focus:ring-swiss-red/20 focus:border-swiss-red"
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>{t('contact.form.submitting')}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t('contact.form.submit')}</span>
                    </>
                  )}
                </button>
              </form>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-swiss-text mb-3">{t('footer.followUs')}</h3>
                <p className="text-sm text-swiss-body mb-4">{t('contact.whatsapp.message')}</p>
                <div className="flex items-center gap-3">
                  {socialLinks.map(({ name, href, Icon, className }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      title={name}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-subtle focus:outline-none focus:ring-2 focus:ring-swiss-red/30 ${className}`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Google Maps */}
              <div>
                <h3 className="text-xl font-semibold text-swiss-gray-800 mb-4">
                  {t('contact.location.title')}
                </h3>
                <div className="rounded-2xl overflow-hidden h-64 shadow-soft border border-swiss-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2712.3!2d7.2474!3d47.1391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e39c0d43a1b77%3A0x9b5b5b5b5b5b5b5b!2sOrpundstrasse%2031%2C%202504%20Biel%2C%20Switzerland!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Service Areas */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-swiss-gray-800 mb-4 flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-swiss-red" />
                  <span>{t('contact.serviceAreas.title')}</span>
                </h3>
                <p className="text-swiss-gray-600 mb-4">
                  {t('contact.serviceAreas.subtitle')}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {serviceAreas.map((area, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-swiss-red" />
                      <span className="text-sm text-swiss-gray-700">{area}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-swiss-gray-500 mt-4">
                  {t('contact.serviceAreas.notListed')}
                </p>
              </div>

              {/* Emergency Contact */}
              <div className="card p-6 bg-swiss-softRed border border-swiss-border">
                <h3 className="text-xl font-semibold text-swiss-text mb-4">
                  {t('contact.emergency.title')}
                </h3>
                <p className="text-swiss-body">
                  {t('contact.emergency.subtitle')}
                </p>
                <a
                  href="tel:+41764883689"
                  className="inline-flex items-center space-x-2 bg-swiss-red text-white px-6 py-3 rounded-xl hover:bg-swiss-red/90 transition-colors shadow-subtle"
                >
                  <Phone className="w-5 h-5" />
                  <span>{t('contact.emergency.callNow')}</span>
                </a>
              </div>

              {/* Business Hours */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-swiss-gray-800 mb-4 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-swiss-red" />
                  <span>{t('contact.businessHours.title')}</span>
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-swiss-gray-700">{t('contact.businessHours.mondayFriday')}</span>
                    <span className="font-medium">07:00 - 19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-swiss-gray-700">{t('contact.businessHours.saturday')}</span>
                    <span className="font-medium">08:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-swiss-gray-700">{t('contact.businessHours.sunday')}</span>
                    <span className="font-medium">{t('contact.businessHours.emergencyOnly')}</span>
                  </div>
                </div>
                <p className="text-sm text-swiss-gray-500 mt-4">
                  {t('contact.businessHours.note')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
