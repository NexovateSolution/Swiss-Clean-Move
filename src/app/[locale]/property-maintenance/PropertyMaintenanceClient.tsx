'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import FacilityPricingOnly from '@/components/FacilityPricingOnly';
import { trackPhoneClick, trackWhatsAppClick } from '@/lib/gtag';
import {
  Wrench,
  CheckCircle,
  ArrowRight,
  Phone,
  MessageCircle,
  ShieldCheck,
  Building2,
  Trees,
  Snowflake,
  Trash2,
  Clock,
  Star,
  ChevronDown,
  Eye,
  FileCheck,
  Sparkles
} from 'lucide-react';

interface PropertyMaintenanceClientProps {
  locale: string;
}

export default function PropertyMaintenanceClient({ locale }: PropertyMaintenanceClientProps) {
  const t = useTranslations();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const isEn = locale === 'en';
  const isFr = locale === 'fr';
  const isIt = locale === 'it';

  const localizedContent = {
    badge: isEn
      ? 'Property Maintenance & Caretaking'
      : isFr
      ? 'Conciergerie & Gestion Immobilière'
      : isIt
      ? 'Manutenzione Immobili & Custodia'
      : 'Hauswartung & Liegenschaftsservice',
    title: isEn
      ? 'Reliable Property Maintenance in Switzerland'
      : isFr
      ? 'Gestion et conciergerie immobilière en Suisse'
      : isIt
      ? 'Manutenzione e custodia immobili in Svizzera'
      : 'Professionelle Hauswartung & Gebäudeunterhalt in der Schweiz',
    subtitle: isEn
      ? 'Comprehensive caretaking, stairwell cleaning, grounds maintenance and technical supervision for residential and commercial properties.'
      : isFr
      ? 'Conciergerie complète, nettoyage des parties communes, entretien des extérieurs et suivi technique pour résidences et immeubles commerciaux.'
      : isIt
      ? 'Servizio completo di custodia, pulizia scale, cura delle aree verdi e supervisione tecnica per condomini e immobili commerciali.'
      : 'Umfassende Liegenschaftsbetreuung, Treppenhausreinigung, Umgebungspflege und Haustechnik für Wohn- und Gewerbeimmobilien.',
    servicesTitle: isEn
      ? 'Our Complete Maintenance Services'
      : isFr
      ? 'Nos prestations de conciergerie complètes'
      : isIt
      ? 'I nostri servizi completi di manutenzione'
      : 'Unser Leistungsumfang im Gebäudeunterhalt',
    servicesSubtitle: isEn
      ? 'Everything required to protect the value and pristine appearance of your real estate.'
      : isFr
      ? 'Tout le nécessaire pour préserver la valeur et la propreté irréprochable de vos biens immobiliers.'
      : isIt
      ? 'Tutto il necessario per preservare il valore e l’aspetto impeccabile del vostro immobile.'
      : 'Alles für den langfristigen Werterhalt und die einwandfreie Funktion Ihrer Immobilie.',
    ctaCall: isEn ? 'Call Now' : isFr ? 'Appeler' : isIt ? 'Chiama ora' : 'Jetzt anrufen',
    ctaQuote: isEn ? 'Request Free Quote' : isFr ? 'Demander un devis' : isIt ? 'Richiedi preventivo' : 'Kostenlose Offerte anfordern',
    trustReview: isEn ? 'Google Verified 4.6★' : isFr ? 'Vérifié Google 4.6★' : isIt ? 'Verificato Google 4.6★' : 'Google Verifiziert 4.6★',
    trustSubtitle: isEn ? 'Official SwissCleanMove Partner' : isFr ? 'Partenaire officiel SwissCleanMove' : isIt ? 'Partner ufficiale SwissCleanMove' : 'Offizieller SwissCleanMove Partner',
    whyTitle: isEn ? 'Why Choose SwissCleanMove?' : isFr ? 'Pourquoi choisir SwissCleanMove ?' : isIt ? 'Perché scegliere SwissCleanMove?' : 'Warum SwissCleanMove für Ihre Liegenschaft?',
    whySubtitle: isEn
      ? 'Professional standards, experienced caretakers, and seamless digital communication.'
      : isFr
      ? 'Standards d’excellence suisses, concierges qualifiés et communication transparente.'
      : isIt
      ? 'Standard svizzeri di eccellenza, custodi qualificati e comunicazione trasparente.'
      : 'Schweizer Qualitätsstandards, geschultes Fachpersonal und lückenlose Dokumentation.',
    faqTitle: isEn ? 'Frequently Asked Questions' : isFr ? 'Questions fréquentes' : isIt ? 'Domande frequenti' : 'Häufig gestellte Fragen zur Hauswartung',
    bottomHeading: isEn
      ? 'Looking for a Tailored Caretaking Offer?'
      : isFr
      ? 'Besoin d’une offre de conciergerie sur mesure ?'
      : isIt
      ? 'Desiderate un preventivo personalizzato di custodia?'
      : 'Individuelle Hauswartungsofferte anfordern',
    bottomBody: isEn
      ? 'Schedule a free on-site property inspection. We will design a custom maintenance schedule tailored to your building.'
      : isFr
      ? 'Planifiez une visite gratuite de votre immeuble. Nous établissons un cahier des charges sur mesure adapté à vos besoins.'
      : isIt
      ? 'Prenotate un sopralluogo gratuito. Creiamo un piano di manutenzione personalizzato per il vostro immobile.'
      : 'Vereinbaren Sie eine kostenlose Liegenschaftsbesichtigung. Wir erstellen ein transparentes Pflichtenheft exakt nach Ihren Wünschen.',
  };

  const serviceCategories = [
    {
      icon: Sparkles,
      title: isEn ? 'Stairwell & Common Areas' : isFr ? 'Nettoyage des parties communes' : isIt ? 'Pulizia scale e aree comuni' : 'Treppenhaus- & Innenreinigung',
      desc: isEn
        ? 'Weekly thorough cleaning of entrances, hallways, elevators, laundry rooms, and window sills.'
        : isFr
        ? 'Nettoyage régulier et soigné des entrées, cages d’escalier, ascenseurs, buanderies et vitrages intérieurs.'
        : isIt
        ? 'Pulizia accurata e periodica di ingressi, scale, ascensori, lavanderie e vetrate interne.'
        : 'Regelmässige Reinigung von Eingangsbereichen, Treppenhäusern, Liften, Waschküchen und Allgemeinflächen.',
    },
    {
      icon: Trees,
      title: isEn ? 'Grounds & Garden Care' : isFr ? 'Entretien des espaces extérieurs' : isIt ? 'Cura giardini e spazi esterni' : 'Umgebungspflege & Gartenarbeit',
      desc: isEn
        ? 'Lawn mowing, hedge cutting, pathway weeding, leaf clearing, and overall exterior property care.'
        : isFr
        ? 'Tonte des pelouses, taille des haies, désherbage des allées et ramassage des feuilles mortes.'
        : isIt
        ? 'Taglio erba, potatura siepi, diserbo sentieri, raccolta foglie e manutenzione giardini.'
        : 'Rasenmähen, Heckenschneiden, Rabattenpflege, Unkrautbeseitigung und Laubentfernung.',
    },
    {
      icon: Wrench,
      title: isEn ? 'Minor Repairs & Technical Care' : isFr ? 'Petites réparations & Technique' : isIt ? 'Piccole riparazioni & Impianti' : 'Haustechnik & Kleinreparaturen',
      desc: isEn
        ? 'Light bulb replacements, door closer adjustments, basic plumbing fixes, and maintenance monitoring.'
        : isFr
        ? 'Remplacement d’ampoules, réglage des portes, petites interventions sanitaires et contrôle visuel des installations.'
        : isIt
        ? 'Sostituzione lampadine, regolazione serrature, piccoli interventi idraulici e controllo impianti.'
        : 'Leuchtmittelwechsel, Türschliesser einstellen, Kleinreparaturen und laufende Funktionsüberprüfungen.',
    },
    {
      icon: Snowflake,
      title: isEn ? 'Winter Snow & De-icing' : isFr ? 'Service hivernal & Déneigement' : isIt ? 'Servizio invernale & Spazzaneve' : 'Winterdienst & Glatteisbekämpfung',
      desc: isEn
        ? 'Early morning snow removal and salt spreading ensuring safe access to building entrances and parking lots.'
        : isFr
        ? 'Déneigement matinal et salage des accès piétons, trottoirs et parkings pour une sécurité totale.'
        : isIt
        ? 'Sgombero neve mattutino e spargimento sale per accessi e parcheggi sempre sicuri.'
        : 'Zuverlässige Schneeräumung und Salzen ab den frühen Morgenstunden gemäss Schweizer Vorschriften.',
    },
    {
      icon: Trash2,
      title: isEn ? 'Waste & Container Management' : isFr ? 'Gestion des conteneurs & Déchets' : isIt ? 'Gestione rifiuti & Cassonetti' : 'Abfall- & Containerdienst',
      desc: isEn
        ? 'Timely placement of waste and recycling bins on collection days, plus periodic washing of container areas.'
        : isFr
        ? 'Sortie et rentrée des conteneurs selon le calendrier communal, avec nettoyage périodique du local poubelles.'
        : isIt
        ? 'Esposizione cassonetti nei giorni di raccolta e igienizzazione periodica delle aree ecologiche.'
        : 'Pünktliches Bereitstellen der Container an Abfuhrtagen sowie regelmässige Reinigung der Sammelstellen.',
    },
    {
      icon: Eye,
      title: isEn ? 'Inspections & Caretaker Reporting' : isFr ? 'Surveillance & Contrôle périodique' : isIt ? 'Supervisione & Rapporti' : 'Objektüberwachung & Vertretung',
      desc: isEn
        ? 'Regular walk-throughs, tenant check-ins, coordination of specialized contractors, and holiday coverage.'
        : isFr
        ? 'Contrôles visuels réguliers, lien avec les locataires, coordination des artisans et remplacement vacances.'
        : isIt
        ? 'Sopralluoghi periodici, contatto con inquilini, coordinamento ditte esterne e sostituzione ferie.'
        : 'Periodische Kontrollgänge, Ansprechpartner für Mieter, Handwerkerkoordination und Ferienvertretung.',
    },
  ];

  const whyPoints = [
    {
      icon: ShieldCheck,
      title: isEn ? 'Fully Insured & Certified' : isFr ? 'Assurance RC complète' : isIt ? 'Copertura assicurativa totale' : 'Vollumfänglich versichert',
      desc: isEn
        ? 'Liability protection for all building interventions and operations.'
        : isFr
        ? 'Couverture responsabilité civile complète pour toutes les interventions sur votre immeuble.'
        : isIt
        ? 'Copertura assicurativa completa per qualsiasi intervento sul vostro immobile.'
        : 'Umfassende Haftpflichtversicherung für alle Einsätze an Ihrer Liegenschaft.',
    },
    {
      icon: Clock,
      title: isEn ? '24/7 Emergency Support' : isFr ? 'Piquet d’urgence 24/7' : isIt ? 'Pronto intervento 24/7' : '24/7 Notfalldienst & Pikett',
      desc: isEn
        ? 'Fast intervention during water leaks, heating outages, or lockouts.'
        : isFr
        ? 'Intervention rapide en cas de fuite d’eau, panne de chauffage ou problème d’accès.'
        : isIt
        ? 'Intervento rapido in caso di perdite d’acqua, guasti al riscaldamento o urgenze.'
        : 'Schnelle Reaktion bei Wasserschäden, Heizungsausfällen und akuten Problemen.',
    },
    {
      icon: FileCheck,
      title: isEn ? 'Clear Transparent Retainers' : isFr ? 'Forfaits clairs sans surprise' : isIt ? 'Tariffe chiare e trasparenti' : 'Transparente Pauschalen',
      desc: isEn
        ? 'Fixed monthly contracts or hourly billing with detailed service reports.'
        : isFr
        ? 'Contrats mensuels fixes ou facturation à l’heure avec compte-rendu détaillé.'
        : isIt
        ? 'Contratti mensili fissi o a ore con rendicontazione precisa di ogni attività.'
        : 'Verlässliche Monatspauschalen oder Stundenabrechnung mit detailliertem Leistungsnachweis.',
    },
  ];

  const faqs = [
    {
      question: isEn
        ? 'How often do your caretakers visit the property?'
        : isFr
        ? 'À quelle fréquence vos concierges interviennent-ils ?'
        : isIt
        ? 'Con quale frequenza intervengono i custodi?'
        : 'Wie oft ist der Hauswart vor Ort an der Liegenschaft?',
      answer: isEn
        ? 'We tailor the schedule to your exact needs — typically 1 to 3 times per week for residential properties, and daily or multiple times daily for commercial properties.'
        : isFr
        ? 'Le rythme est défini selon vos exigences : généralement de 1 à 3 fois par semaine pour un immeuble résidentiel, et quotidiennement pour les surfaces commerciales.'
        : isIt
        ? 'La frequenza viene concordata su misura: solitamente da 1 a 3 volte a settimana per i condomini, o quotidiana per gli immobili commerciali.'
        : 'Die Einsatzfrequenz stimmen wir exakt auf Ihre Liegenschaft ab: meist 1 bis 3 Mal wöchentlich bei Wohnliegenschaften und täglich bei gewerblichen Objekten.',
    },
    {
      question: isEn
        ? 'Do you provide temporary caretaker replacement (holiday coverage)?'
        : isFr
        ? 'Proposez-vous des remplacements de conciergerie (vacances, maladie) ?'
        : isIt
        ? 'Fornite sostituzioni temporanee per ferie o malattia del custode?'
        : 'Übernehmen Sie auch Ferienvertretungen für bestehende Hauswarte?',
      answer: isEn
        ? 'Yes, we regularly provide reliable holiday and sick leave replacements to ensure seamless property maintenance without interruption.'
        : isFr
        ? 'Oui, nous assurons des remplacements fiables pendant les vacances ou congés maladie afin de garantir la continuité de l’entretien.'
        : isIt
        ? 'Sì, effettuiamo sostituzioni per ferie e malattie garantendo la continuità dell’assistenza allo stabile senza interruzioni.'
        : 'Ja, wir bieten flexible Ferien- und Krankheitsvertretungen an, damit die Liegenschaftspflege lückenlos gewährleistet bleibt.',
    },
    {
      question: isEn
        ? 'Are winter snow clearing services guaranteed in the early morning?'
        : isFr
        ? 'Le déneigement est-il garanti tôt le matin ?'
        : isIt
        ? 'Il servizio sgombero neve è garantito la mattina presto?'
        : 'Erfolgt der Winterdienst zuverlässig in den frühen Morgenstunden?',
      answer: isEn
        ? 'Yes, our winter teams monitor weather forecasts around the clock and clear sidewalks and entrances before morning traffic starts (usually before 07:00 AM).'
        : isFr
        ? 'Oui, nos équipes surveillent les alertes météo 24h/24 et sécurisent les accès avant 07h00 du matin, conformément aux normes de sécurité.'
        : isIt
        ? 'Sì, i nostri operatori intervengono fin dalle prime ore del mattino (di norma prima delle 07:00) per garantire la massima sicurezza.'
        : 'Ja, unser Winterdienst überwacht die Wetterlage rund um die Uhr und räumt Gehwege und Hauseingänge zuverlässig vor 07:00 Uhr morgens.',
    },
    {
      question: isEn
        ? 'How do we receive a free property maintenance proposal?'
        : isFr
        ? 'Comment obtenir un devis gratuit pour notre immeuble ?'
        : isIt
        ? 'Come possiamo ricevere un preventivo gratuito per il nostro condominio?'
        : 'Wie erhalten wir eine kostenlose Offerte für unsere Liegenschaft?',
      answer: isEn
        ? 'Simply submit your request online or give us a call. We will visit the building free of charge, inspect all areas, and provide a clear, competitive quote within 24–48 hours.'
        : isFr
        ? 'Remplissez simplement notre formulaire en ligne ou contactez-nous par téléphone. Nous organisons une visite gratuite et vous remettons une offre détaillée sous 24 à 48 heures.'
        : isIt
        ? 'Basta compilare il modulo online o chiamarci. Effettuiamo un sopralluogo gratuito e inviamo un’offerta chiara entro 24-48 ore.'
        : 'Füllen Sie einfach unser Online-Formular aus oder rufen Sie uns an. Wir besichtigen das Objekt unverbindlich vor Ort und senden Ihnen innert 24–48 Stunden ein massgeschneidertes Angebot.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <SwissHero
        badge={localizedContent.badge}
        title={localizedContent.title}
        subtitle={localizedContent.subtitle}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-start">
            <Link
              href={`/${locale}/form?service=facility-services`}
              className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2"
            >
              <span>{localizedContent.ctaQuote}</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
            <a
              href="tel:+41782158030"
              onClick={trackPhoneClick}
              className="btn-secondary text-lg px-6 py-4 inline-flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5 text-swiss-red" />
              <span>+41 78 215 80 30</span>
            </a>
            <a
              href="https://wa.me/41782158030"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
              className="btn-secondary text-lg px-6 py-4 inline-flex items-center justify-center space-x-2 border-[#25D366]/40 hover:bg-[#25D366]/10 text-swiss-text"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>
        }
        right={
          <div className="w-full h-[340px] md:h-[420px] bg-swiss-section flex items-center justify-center relative rounded-2xl overflow-hidden shadow-subtle border border-swiss-border">
            <Image
              src="/Gallary/after/22.jpeg"
              alt={localizedContent.title}
              fill
              className="object-cover opacity-90"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="w-20 h-20 bg-white/95 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto border border-white/60 shadow-soft relative z-10">
              <Wrench className="w-10 h-10 text-swiss-red" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/90 backdrop-blur-md rounded-xl p-3 border border-white/60 shadow-sm flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-semibold text-swiss-text">
                <ShieldCheck className="w-4 h-4 text-swiss-green" />
                <span>
                  {isEn
                    ? 'Certified Swiss Caretakers'
                    : isFr
                    ? 'Conciergerie suisse certifiée'
                    : isIt
                    ? 'Custodia svizzera certificata'
                    : 'Zertifizierter Liegenschaftsservice'}
                </span>
              </div>
              <span className="text-xs font-bold text-swiss-red">24/7 Notfalldienst</span>
            </div>
          </div>
        }
      />

      {/* Google Reviews Trust Strip */}
      <section className="section-padding bg-swiss-softRed border-y border-swiss-border/50">
        <div className="container-max">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-subtle hover:shadow-soft transition-all duration-300 border border-swiss-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-swiss-text ml-1.5">4.6 / 5.0</span>
                  </div>
                  <p className="font-semibold text-swiss-text text-sm mt-0.5">{localizedContent.trustReview}</p>
                  <p className="text-xs text-swiss-body">{localizedContent.trustSubtitle}</p>
                </div>
              </div>
              <Link
                href={`/${locale}/form?service=facility-services`}
                className="btn-primary text-sm px-5 py-2.5 rounded-full whitespace-nowrap"
              >
                <span>{localizedContent.ctaQuote}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text mb-4">
              {localizedContent.servicesTitle}
            </h2>
            <p className="text-lg text-swiss-body">
              {localizedContent.servicesSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="card p-6 bg-white border border-swiss-border hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-swiss-softRed rounded-2xl flex items-center justify-center border border-swiss-border">
                      <Icon className="w-6 h-6 text-swiss-red" />
                    </div>
                    <h3 className="text-xl font-bold text-swiss-text">{item.title}</h3>
                    <p className="text-swiss-body text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="pt-6 mt-4 border-t border-swiss-border/60">
                    <Link
                      href={`/${locale}/form?service=facility-services`}
                      className="inline-flex items-center text-sm font-semibold text-swiss-red hover:underline"
                    >
                      <span>{localizedContent.ctaQuote}</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dedicated Facility Pricing Section */}
      <FacilityPricingOnly
        locale={locale}
        formService="facility-services"
        handleCtaClick={() => {}}
      />

      {/* Why SwissCleanMove */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text mb-4">
              {localizedContent.whyTitle}
            </h2>
            <p className="text-lg text-swiss-body">
              {localizedContent.whySubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div key={index} className="card p-8 bg-white border border-swiss-border text-center space-y-4">
                  <div className="w-14 h-14 bg-swiss-softRed rounded-2xl flex items-center justify-center mx-auto border border-swiss-border">
                    <Icon className="w-7 h-7 text-swiss-red" />
                  </div>
                  <h3 className="text-xl font-bold text-swiss-text">{point.title}</h3>
                  <p className="text-swiss-body text-sm leading-relaxed">{point.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-swiss-text mb-4">
                {localizedContent.faqTitle}
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="card bg-white border border-swiss-border overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-swiss-text hover:text-swiss-red transition-colors"
                    >
                      <span className="text-base md:text-lg">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-swiss-body transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? 'rotate-180 text-swiss-red' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-swiss-body text-sm md:text-base leading-relaxed border-t border-swiss-border/50 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <div className="card p-8 md:p-10 bg-swiss-softRed border border-swiss-border text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
                {localizedContent.bottomHeading}
              </h2>
              <p className="text-lg text-swiss-body">
                {localizedContent.bottomBody}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/form?service=facility-services`}
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2"
                >
                  <span>{localizedContent.ctaQuote}</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
                <a
                  href="tel:+41782158030"
                  onClick={trackPhoneClick}
                  className="btn-secondary text-lg px-6 py-4 inline-flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5 text-swiss-red" />
                  <span>+41 78 215 80 30</span>
                </a>
                <a
                  href="https://wa.me/41782158030"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppClick}
                  className="btn-secondary text-lg px-6 py-4 inline-flex items-center justify-center space-x-2 border-[#25D366]/40 hover:bg-[#25D366]/10 text-swiss-text"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
