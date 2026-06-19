import React from 'react';
import Link from 'next/link';
import { CheckCircle, Star, Phone, Mail } from 'lucide-react';

interface HaushaltshilfePricingProps {
  locale: string;
  formService: string;
  handleCtaClick: (ctaName: string) => void;
}

export default function HaushaltshilfePricing({ locale, formService, handleCtaClick }: HaushaltshilfePricingProps) {
  const L = (en: string, fr: string, de: string) => locale === 'en' ? en : locale === 'fr' ? fr : de;

  const prices = [
    { en: 'Regular Household Help (weekly)', fr: 'Aide ménagère régulière (hebdomadaire)', de: 'Regelmässige Haushaltshilfe (wöchentlich)', price: 'CHF 42.–' },
    { en: 'Household Help (every 2 weeks)', fr: 'Aide ménagère (toutes les 2 semaines)', de: 'Haushaltshilfe (14-täglich)', price: 'CHF 45.–' },
    { en: 'One-Time Household Help', fr: 'Aide ménagère ponctuelle', de: 'Einmalige Haushaltshilfe', price: 'CHF 48.–' },
    { en: 'Premium Household Help', fr: 'Aide ménagère premium', de: 'Premium Haushaltshilfe', price: 'CHF 49.–' },
    { en: 'Deep Cleaning / Spring Cleaning', fr: 'Nettoyage en profondeur / Nettoyage de printemps', de: 'Grundreinigung / Frühlingsputz', price: 'CHF 55.–' },
    { en: 'Ironing Service', fr: 'Service de repassage', de: 'Bügelservice', price: 'CHF 42.–' },
    { en: 'Window Cleaning', fr: 'Nettoyage de vitres', de: 'Fensterreinigung', price: L('from CHF 7.– / m²', 'à partir de CHF 7.– / m²', 'ab CHF 7.– / m²') },
    { en: 'Minimum Order', fr: 'Commande minimum', de: 'Mindestauftrag', price: 'CHF 120.–' },
  ];

  const included = [
    { en: 'Vacuuming and floor cleaning', fr: 'Passage de l\'aspirateur et nettoyage des sols', de: 'Staubsaugen und Bodenreinigung' },
    { en: 'Kitchen and bathroom cleaning', fr: 'Nettoyage de la cuisine et de la salle de bain', de: 'Reinigung von Küche und Badezimmer' },
    { en: 'Toilet cleaning and disinfection', fr: 'Nettoyage et désinfection des toilettes', de: 'WC-Reinigung und Desinfektion' },
    { en: 'Dusting all surfaces', fr: 'Dépoussiérage de toutes les surfaces', de: 'Abstauben aller Oberflächen' },
    { en: 'Bed making and changing linens', fr: 'Faire les lits et changer les draps', de: 'Betten beziehen' },
    { en: 'Laundry washing and hanging', fr: 'Laver et étendre le linge', de: 'Wäsche waschen und aufhängen' },
    { en: 'Ironing service upon request', fr: 'Service de repassage sur demande', de: 'Bügelservice auf Wunsch' },
    { en: 'Tidying and household assistance', fr: 'Rangement et aide au ménage', de: 'Aufräum- und Haushaltshilfe' },
    { en: 'Additional customized services as needed', fr: 'Services personnalisés supplémentaires selon les besoins', de: 'Individuelle Zusatzleistungen nach Bedarf' },
  ];

  const benefits = [
    { en: 'Reliable and experienced household helpers', fr: 'Aides ménagères fiables et expérimentées', de: 'Zuverlässige und erfahrene Haushaltshilfen' },
    { en: 'Flexible appointment scheduling', fr: 'Prise de rendez-vous flexible', de: 'Flexible Terminvereinbarung' },
    { en: 'Transparent pricing with no hidden costs', fr: 'Prix transparents sans frais cachés', de: 'Transparente Preise ohne versteckte Kosten' },
    { en: 'Environmentally friendly cleaning products', fr: 'Produits de nettoyage écologiques', de: 'Umweltfreundliche Reinigungsmittel' },
    { en: 'Personal and professional service', fr: 'Service personnel et professionnel', de: 'Persönlicher und professioneller Service' },
    { en: 'Suitable for apartments, houses, and senior households', fr: 'Convient aux appartements, maisons et ménages de personnes âgées', de: 'Für Wohnungen, Häuser und Seniorenhaushalte' },
  ];

  const perHour = L('/ hour', '/ heure', '/ Stunde');

  return (
    <section className="section-padding bg-white">
      <div className="container-max max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-swiss-text">
            {L('Household Help & Cleaning Lady Prices', 'Prix d\'aide ménagère et femme de ménage', 'Haushaltshilfe & Putzfrau Preise')}
          </h2>
          <p className="text-swiss-body max-w-2xl mx-auto">
            {L(
              'Professional household help for private households, families, seniors, and busy professionals. Transparent pricing, reliable service, and the highest quality standards.',
              'Aide ménagère professionnelle pour les ménages privés, les familles, les personnes âgées et les professionnels très occupés. Prix transparents, service fiable et les plus hauts standards de qualité.',
              'Professionelle Haushaltshilfe für Privathaushalte, Familien, Senioren und Berufstätige. Transparente Preise, zuverlässiger Service und höchste Qualitätsstandards.'
            )}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-swiss-gray-50 rounded-xl overflow-hidden shadow-subtle border border-swiss-border">
            <thead>
              <tr className="bg-swiss-softRed">
                <th className="p-4 border-b border-swiss-border font-bold text-swiss-text">{L('Service', 'Service', 'Dienstleistung')}</th>
                <th className="p-4 border-b border-swiss-border font-bold text-swiss-text">{L('Price from', 'Prix à partir de', 'Preis ab')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-swiss-border">
              {prices.map((row, i) => (
                <tr key={i} className="hover:bg-white transition-colors">
                  <td className="p-4 text-swiss-text font-medium">{row[locale as 'en'|'fr'|'de'] || row.de}</td>
                  <td className="p-4 text-swiss-text">{row.price.includes('CHF') && !row.price.includes('m²') && row.price !== 'CHF 120.–' ? `${row.price} ${perHour}` : row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-swiss-text">{L('Included Services', 'Services Inclus', 'Inbegriffen')}</h3>
            <ul className="space-y-2">
              {included.map((item, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-swiss-red flex-shrink-0 mt-0.5" />
                  <span className="text-swiss-body">{item[locale as 'en'|'fr'|'de'] || item.de}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-swiss-text">{L('Your Benefits', 'Vos Avantages', 'Ihre Vorteile')}</h3>
            <ul className="space-y-2">
              {benefits.map((item, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <Star className="w-5 h-5 text-swiss-red flex-shrink-0 mt-0.5 fill-current" />
                  <span className="text-swiss-body">{item[locale as 'en'|'fr'|'de'] || item.de}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-swiss-softRed p-6 md:p-8 rounded-2xl border border-swiss-border text-center space-y-4 mt-8">
          <h3 className="text-xl font-bold text-swiss-text">
            {L('Request a Free Quote Today', 'Demandez un devis gratuit aujourd\'hui', 'Jetzt unverbindliche Offerte anfordern')}
          </h3>
          <p className="text-swiss-body max-w-xl mx-auto">
            {L(
              'Request a non-binding quote and book your personal household helper today.',
              'Demandez un devis sans engagement et réservez votre aide ménagère personnelle dès aujourd\'hui.',
              'Jetzt unverbindliche Offerte anfordern und Ihre persönliche Haushaltshilfe buchen.'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href={`/${locale}/form?service=${formService}`}
              className="btn-primary"
              onClick={() => handleCtaClick('pricing_form_btn')}
            >
              {L('Request Quote', 'Demander un devis', 'Offerte anfordern')}
            </Link>
            <a
              href="tel:+41782158030"
              className="btn-secondary inline-flex items-center justify-center space-x-2"
              onClick={() => handleCtaClick('pricing_phone_btn')}
            >
              <Phone className="w-4 h-4 text-swiss-red" />
              <span>+41 78 215 80 30</span>
            </a>
          </div>
          <div className="pt-4 flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-medium text-swiss-body">
            <a href="mailto:info@swisscleanmove.ch" className="flex items-center space-x-2 hover:text-swiss-red transition-colors">
              <Mail className="w-4 h-4" />
              <span>info@swisscleanmove.ch</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
