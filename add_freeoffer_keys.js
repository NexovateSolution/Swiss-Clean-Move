const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fr'];
const newKeys = {
  de: {
    mainTitle: "Was benötigen Sie?",
    mainSubtitle: "Wählen Sie den passenden Service und erhalten Sie in wenigen Schritten Ihre unverbindliche Offerte.",
    guarantees: {
      abnahme: { title: "100% Abnahmegarantie", subtitle: "Bei Wohnungsübergabe" },
      festpreis: { title: "Transparente Festpreise", subtitle: "Keine versteckten Kosten" },
      haftpflicht: { title: "Haftpflichtversichert", subtitle: "Für Ihre Sicherheit" },
      schweizweit: { title: "Schweizweit für Sie da", subtitle: "Schnell & zuverlässig" }
    },
    steps: {
      service: "Service",
      adresse: "Adresse",
      details: "Details",
      extras: "Extras",
      offerte: "Offerte"
    },
    consultation: {
      title: "Persönliche Beratung",
      subtitle: "Wir sind für Sie da!",
      free: "Kostenlos & unverbindlich",
      fast: "Schnelle Antwort",
      custom: "Individuelle Lösung",
      callNow: "Jetzt anrufen"
    },
    reviews: {
      rating: "5.0",
      outOf: "/5",
      text: "100+ Bewertungen\\nauf Google"
    },
    bottomBar: {
      call: "Anrufen",
      whatsapp: "WhatsApp",
      message: "Nachricht senden",
      freeQuote: "Kostenlose Offerte",
      requestNow: "Jetzt anfordern"
    }
  },
  en: {
    mainTitle: "What do you need?",
    mainSubtitle: "Choose the appropriate service and receive your free quote in just a few steps.",
    guarantees: {
      abnahme: { title: "100% Handover Guarantee", subtitle: "For apartment handover" },
      festpreis: { title: "Transparent Fixed Prices", subtitle: "No hidden costs" },
      haftpflicht: { title: "Liability Insured", subtitle: "For your safety" },
      schweizweit: { title: "Available Nationwide", subtitle: "Fast & reliable" }
    },
    steps: {
      service: "Service",
      adresse: "Address",
      details: "Details",
      extras: "Extras",
      offerte: "Quote"
    },
    consultation: {
      title: "Personal Consultation",
      subtitle: "We are here for you!",
      free: "Free & non-binding",
      fast: "Fast response",
      custom: "Custom solution",
      callNow: "Call now"
    },
    reviews: {
      rating: "5.0",
      outOf: "/5",
      text: "100+ Reviews\\non Google"
    },
    bottomBar: {
      call: "Call",
      whatsapp: "WhatsApp",
      message: "Send message",
      freeQuote: "Free Quote",
      requestNow: "Request now"
    }
  },
  fr: {
    mainTitle: "De quoi avez-vous besoin ?",
    mainSubtitle: "Choisissez le service approprié et recevez votre devis gratuit en quelques étapes.",
    guarantees: {
      abnahme: { title: "Garantie de remise 100%", subtitle: "Pour la remise d'appartement" },
      festpreis: { title: "Prix fixes transparents", subtitle: "Pas de frais cachés" },
      haftpflicht: { title: "Assurance responsabilité civile", subtitle: "Pour votre sécurité" },
      schweizweit: { title: "Disponible dans toute la Suisse", subtitle: "Rapide et fiable" }
    },
    steps: {
      service: "Service",
      adresse: "Adresse",
      details: "Détails",
      extras: "Extras",
      offerte: "Devis"
    },
    consultation: {
      title: "Consultation personnelle",
      subtitle: "Nous sommes là pour vous !",
      free: "Gratuit & sans engagement",
      fast: "Réponse rapide",
      custom: "Solution sur mesure",
      callNow: "Appelez maintenant"
    },
    reviews: {
      rating: "5.0",
      outOf: "/5",
      text: "100+ Avis\\nsur Google"
    },
    bottomBar: {
      call: "Appeler",
      whatsapp: "WhatsApp",
      message: "Envoyer un message",
      freeQuote: "Devis Gratuit",
      requestNow: "Demander maintenant"
    }
  }
};

locales.forEach(loc => {
  const filePath = path.join(__dirname, 'messages', `${loc}.json`);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/"takeaway"/g, '"takeaway2"');
  const data = JSON.parse(content);
  
  if (!data.freeOffer) data.freeOffer = {};
  data.freeOffer.layout = newKeys[loc];
  
  // Re-serialize, taking care not to mess up the file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated ${loc}.json`);
});
