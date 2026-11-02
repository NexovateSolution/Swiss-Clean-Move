'use client';

import { trackPhoneClick, trackEmailClick, trackWhatsAppClick } from '@/lib/gtag';
import React from 'react';
import Link from 'next/link';
import { CheckCircle, Star, Phone, Mail, MessageCircle, AlertCircle } from 'lucide-react';
import { PRICING_RULES } from '@/lib/pricingRules';

interface HaushaltshilfePricingProps {
  locale: string;
  formService: string;
  handleCtaClick: (ctaName: string) => void;
}

export default function HaushaltshilfePricing({ locale, formService, handleCtaClick }: HaushaltshilfePricingProps) {
  const L = (en: string, fr: string, de: string) => locale === 'en' ? en : locale === 'fr' ? fr : de;
  const r = PRICING_RULES.household;

  // Confirmed prices: regular weekly CHF 42/h, min order CHF 120 (Premium option removed per owner instructions)
  const prices = [
    { en: 'Regular Household Help (weekly)', fr: 'Aide ménagère régulière (hebdomadaire)', de: 'Regelmässige Haushaltshilfe (wöchentlich)', price: `CHF ${r.regular}.–`, it: `Aiuto domestico regolare (settimanale)` },
    { en: 'Household Help (every 2 weeks)', fr: 'Aide ménagère (toutes les 2 semaines)', de: 'Haushaltshilfe (14-täglich)', price: `CHF ${r.fourteenDays}.–`, it: `Aiuto domestico (ogni 2 settimane)` },
    { en: 'One-Time Household Help', fr: 'Aide ménagère ponctuelle', de: 'Einmalige Haushaltshilfe', price: `CHF ${r.oneTime}.–`, it: `Aiuto domestico una tantum` },
    { en: 'Deep Cleaning / Spring Cleaning', fr: 'Nettoyage en profondeur / Nettoyage de printemps', de: 'Grundreinigung / Frühlingsputz', price: `CHF ${r.deepCleaning}.–`, it: `Pulizie profonde / pulizie di primavera` },
    { en: 'Ironing Service', fr: 'Service de repassage', de: 'Bügelservice', price: `CHF ${r.ironing}.–`, it: `Servizio stireria` },
    { en: 'Window Cleaning', fr: 'Nettoyage de vitres', de: 'Fensterreinigung', price: L(`from CHF ${r.windowPerSqm}.– / m²`, `à partir de CHF ${r.windowPerSqm}.– / m²`, `ab CHF ${r.windowPerSqm}.– / m²`), it: `Pulizia delle finestre` },
    { en: 'Minimum Order', fr: 'Commande minimum', de: 'Mindestauftrag', price: `CHF ${r.minOrder}.–`, it: `Ordine minimo` },
  ];

  const included = [
    { en: 'Vacuuming and floor mopping', fr: 'Passage de l\'aspirateur et lavage des sols', de: 'Staubsaugen und Bodenwischen', it: `Aspirazione e lavaggio dei pavimenti` },
    { en: 'Kitchen and bathroom surface cleaning', fr: 'Nettoyage des surfaces cuisine et salle de bain', de: 'Oberflächenreinigung in Küche und Bad', it: `Pulizia superfici cucina e bagno` },
    { en: 'Toilet cleaning and sanitization', fr: 'Nettoyage et désinfection des sanitaires', de: 'WC-Reinigung und Desinfektion', it: `Pulizia e disinfezione dei servizi igienici` },
    { en: 'Dusting accessible surfaces', fr: 'Dépoussiérage des surfaces accessibles', de: 'Abstauben erreichbarer Oberflächen', it: `Spolveratura delle superfici accessibili` },
    { en: 'Bed making and changing linens', fr: 'Faire les lits et changer les draps', de: 'Betten machen und frisch beziehen', it: `Rifacimento letti e cambio biancheria` },
    { en: 'Laundry washing and hanging (on request)', fr: 'Lavage et étendage du linge (sur demande)', de: 'Wäsche waschen und aufhängen (auf Wunsch)', it: `Lavaggio e stesura biancheria (su richiesta)` },
    { en: 'Ironing service (on request)', fr: 'Service de repassage (sur demande)', de: 'Bügelservice (auf Wunsch)', it: `Servizio stireria (su richiesta)` },
    { en: 'Basic tidying and organization', fr: 'Rangement et aide au ménage', de: 'Alltägliches Aufräumen und Ordnung', it: `Riordino quotidiano e organizzazione` },
  ];

  const benefits = [
    { en: 'Cleaning materials & equipment provided by SwissCleanMove', fr: 'Matériel et produits de nettoyage fournis par SwissCleanMove', de: 'Reinigungsmittel & Arbeitsgeräte von SwissCleanMove gestellt', it: `Prodotti e attrezzature di pulizia forniti da SwissCleanMove` },
    { en: 'Free travel within Biel/Bienne and Seeland', fr: 'Déplacement gratuit à Bienne et dans le Seeland', de: 'Kostenlose Anfahrt in Biel/Bienne und im gesamten Seeland', it: `Trasferta gratuita a Biel/Bienne e nel Seeland` },
    { en: 'Minimum order CHF 120.– without contractual hour lock-in', fr: 'Commande minimum CHF 120.– sans engagement d\'heures fixes', de: 'Mindestauftrag CHF 120.– ohne starre Stundenbindung', it: `Ordine minimo CHF 120.– senza vincolo orario fisso` },
    { en: 'Transparent hourly rates with no hidden fees', fr: 'Tarifs horaires transparents sans frais cachés', de: 'Transparente Stundensätze ohne versteckte Kosten', it: `Tariffe orarie trasparenti senza costi nascosti` },
    { en: 'Flexible scheduling (weekly, bi-weekly, or as needed)', fr: 'Fréquence flexible (hebdomadaire, bimensuelle ou ponctuelle)', de: 'Flexible Einsätze (wöchentlich, 14-täglich oder nach Bedarf)', it: `Pianificazione flessibile (settimanale, quindicinale o secondo necessità)` },
    { en: 'Personal coordination tailored to your household', fr: 'Coordination personnalisée selon vos priorités', de: 'Persönliche Aufgabenabstimmung nach Ihren Prioritäten', it: `Coordinamento personalizzato in base alle vostre priorità` },
  ];

  const perHour = L('/ hour', '/ heure', '/ Stunde');

  return (
    <section className="section-padding bg-white">
      <div className="container-max max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-swiss-text">
            {L('Household Help & Cleaning Rates', 'Tarifs aide ménagère et entretien', 'Haushaltshilfe & Reinigungspreise')}
          </h2>
          <p className="text-swiss-body max-w-2xl mx-auto">
            {L(
              'Reliable household support for private households in Biel/Bienne and Seeland. Transparent hourly rates, cleaning supplies provided, and free travel in the region.',
              'Aide ménagère de confiance pour ménages privés à Bienne et dans le Seeland. Tarifs transparents, produits inclus et déplacement gratuit dans la région.',
              'Verlässliche Unterstützung für Privathaushalte in Biel/Bienne und im Seeland. Transparente Stundensätze, Material inklusive und kostenlose Anfahrt in der Region.'
            )}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-swiss-gray-50 rounded-xl overflow-hidden shadow-subtle border border-swiss-border">
            <thead>
              <tr className="bg-swiss-softRed">
                <th className="p-4 border-b border-swiss-border font-bold text-swiss-text">{L('Service', 'Prestation', 'Dienstleistung')}</th>
                <th className="p-4 border-b border-swiss-border font-bold text-swiss-text">{L('Price from', 'Prix dès', 'Preis ab')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-swiss-border">
              {prices.map((row, i) => (
                <tr key={i} className="hover:bg-white transition-colors">
                  <td className="p-4 text-swiss-text font-medium">{row[locale as 'en'|'fr'|'de'] || row.de}</td>
                  <td className="p-4 text-swiss-text">{row.price.includes('CHF') && !row.price.includes('m²') && row.price !== `CHF ${r.minOrder}.–` ? `${row.price} ${perHour}` : row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Essential Disclosure on Tasks & Duration */}
        <div className="p-4 bg-swiss-gray-50 rounded-xl border border-swiss-border flex items-start space-x-3 text-sm text-swiss-body">
          <AlertCircle className="w-5 h-5 text-swiss-red flex-shrink-0 mt-0.5" />
          <p>
            <span className="font-semibold text-swiss-text">
              {L('Scope of Services: ', 'Étendue des prestations : ', 'Hinweis zum Leistungsumfang: ')}
            </span>
            {L(
              'Which tasks are completed during an appointment depends on the agreed duration, priorities, and condition of the premises. We coordinate the exact scope in advance with you.',
              'Les tâches effectuées lors d\'une intervention dépendent de la durée convenue, des priorités et de l\'état des lieux. Nous convenons de l\'étendue exacte au préalable avec vous.',
              'Welche Aufgaben bei einem Einsatz erledigt werden, hängt von der vereinbarten Einsatzdauer, den Prioritäten und dem Zustand der Räume ab. Wir stimmen den Umfang vorab mit Ihnen ab.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-swiss-text">{L('Included Tasks (By Agreement)', 'Tâches incluses (selon accord)', 'Inbegriffene Aufgaben (nach Absprache)')}</h3>
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
            <h3 className="text-xl font-bold text-swiss-text">{L('Your Benefits with SwissCleanMove', 'Vos avantages avec SwissCleanMove', 'Ihre Vorteile bei SwissCleanMove')}</h3>
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
              'Submit your inquiry online, call us directly, or reach out via WhatsApp. We will coordinate the right schedule for your household.',
              'Envoyez votre demande en ligne, appelez-nous ou écrivez-nous sur WhatsApp. Nous organiserons la formule adaptée à votre domicile.',
              'Senden Sie uns Ihre Anfrage online, rufen Sie uns direkt an oder schreiben Sie uns per WhatsApp. Wir stimmen den passenden Reinigungsrhythmus mit Ihnen ab.'
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
              onClick={() => { handleCtaClick('pricing_phone_btn'); trackPhoneClick(); }}
            >
              <Phone className="w-4 h-4 text-swiss-red" />
              <span>+41 78 215 80 30</span>
            </a>
            <a
              href="https://wa.me/41782158030"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center justify-center space-x-2 border-[#25D366]/40 hover:bg-[#25D366]/10 text-swiss-text"
              onClick={() => { handleCtaClick('pricing_whatsapp_btn'); trackWhatsAppClick(); }}
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>
          <div className="pt-4 flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-medium text-swiss-body">
            <a onClick={trackEmailClick} href="mailto:info@swisscleanmove.ch" className="flex items-center space-x-2 hover:text-swiss-red transition-colors">
              <Mail className="w-4 h-4" />
              <span>info@swisscleanmove.ch</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
