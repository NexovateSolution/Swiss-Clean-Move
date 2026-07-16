const fs = require('fs');

const replaces = [
  {
    file: 'src/app/[locale]/dashboard/page.tsx',
    find: '>Schnellaktionen<',
    replace: '>{t("dashboard.quickActions", { fallback: "Schnellaktionen" })}<'
  },
  {
    file: 'src/app/[locale]/dashboard/page.tsx',
    find: '>Neuen Auftrag erstellen<',
    replace: '>{t("dashboard.createNewOrder", { fallback: "Neuen Auftrag erstellen" })}<'
  },
  {
    file: 'src/app/[locale]/dashboard/page.tsx',
    find: '>Dokument hochladen<',
    replace: '>{t("dashboard.uploadDocument", { fallback: "Dokument hochladen" })}<'
  },
  {
    file: 'src/app/[locale]/dashboard/page.tsx',
    find: '>Termin buchen<',
    replace: '>{t("dashboard.bookAppointment", { fallback: "Termin buchen" })}<'
  },
  {
    file: 'src/app/[locale]/dashboard/page.tsx',
    find: '>Meine Verträge<',
    replace: '>{t("dashboard.myContracts", { fallback: "Meine Verträge" })}<'
  },
  {
    file: 'src/app/[locale]/dashboard/page.tsx',
    find: '>Signieren<',
    replace: '>{t("dashboard.sign", { fallback: "Signieren" })}<'
  },
  {
    file: 'src/app/[locale]/dashboard/page.tsx',
    find: '>Rechnungen<',
    replace: '>{t("dashboard.invoices", { fallback: "Rechnungen" })}<'
  },
  {
    file: 'src/app/[locale]/dashboard/page.tsx',
    find: '>Rechnung<',
    replace: '>{t("dashboard.invoice", { fallback: "Rechnung" })}<'
  },
  {
    file: 'src/app/[locale]/dashboard/page.tsx',
    find: '>Betrag<',
    replace: '>{t("dashboard.amount", { fallback: "Betrag" })}<'
  },
  {
    file: 'src/app/[locale]/dashboard/page.tsx',
    find: '>Datum<',
    replace: '>{t("dashboard.date", { fallback: "Datum" })}<'
  },
  {
    file: 'src/app/[locale]/dashboard/page.tsx',
    find: '>Status<',
    replace: '>{t("dashboard.status", { fallback: "Status" })}<'
  },
  {
    file: 'src/app/[locale]/dashboard/page.tsx',
    find: '>Aktionen<',
    replace: '>{t("dashboard.actions", { fallback: "Aktionen" })}<'
  },
  {
    file: 'src/app/[locale]/dashboard/page.tsx',
    find: '>Digitale Verträge<',
    replace: '>{t("dashboard.digitalContracts", { fallback: "Digitale Verträge" })}<'
  },
  {
    file: 'src/app/[locale]/dashboard/page.tsx',
    find: '>Verträge online signieren und verwalten<',
    replace: '>{t("dashboard.signAndManage", { fallback: "Verträge online signieren und verwalten" })}<'
  },
  {
    file: 'src/app/[locale]/dashboard/page.tsx',
    find: '>Dokument Upload<',
    replace: '>{t("dashboard.documentUpload", { fallback: "Dokument Upload" })}<'
  },
  {
    file: 'src/app/[locale]/dashboard/page.tsx',
    find: '>Fotos und Dokumente sicher hochladen<',
    replace: '>{t("dashboard.uploadPhotosSecurely", { fallback: "Fotos und Dokumente sicher hochladen" })}<'
  },
  {
    file: 'src/app/[locale]/dashboard/page.tsx',
    find: '>Online Zahlung<',
    replace: '>{t("dashboard.onlinePayment", { fallback: "Online Zahlung" })}<'
  },
  {
    file: 'src/app/[locale]/dashboard/page.tsx',
    find: '>Rechnungen online bezahlen<',
    replace: '>{t("dashboard.payInvoicesOnline", { fallback: "Rechnungen online bezahlen" })}<'
  },
  // RegionLandingPage ternaries
  {
    file: 'src/components/RegionLandingPage.tsx',
    find: "locale === 'en' ? '📋 Request Free Quote' : locale === 'fr' ? '📋 Demander un devis' : '📋 Kostenlose Offerte anfordern'",
    replace: "t('regionLanding.requestQuote', { fallback: '📋 Kostenlose Offerte anfordern' })"
  },
  {
    file: 'src/components/RegionLandingPage.tsx',
    find: "locale === 'en' ? `Our Services in ${data.regionName}` : locale === 'fr' ? `Nos services à ${data.regionName}` : `Unsere Leistungen in ${data.regionName}`",
    replace: "t('regionLanding.ourServicesIn', { region: data.regionName, fallback: `Unsere Leistungen in ${data.regionName}` })"
  },
  {
    file: 'src/components/RegionLandingPage.tsx',
    find: "locale === 'en' ? 'Our Service Areas' : locale === 'fr' ? 'Nos zones d\\'intervention' : 'Unsere Einsatzgebiete'",
    replace: "t('regionLanding.ourServiceAreas', { fallback: 'Unsere Einsatzgebiete' })"
  },
  {
    file: 'src/components/RegionLandingPage.tsx',
    find: "locale === 'en' ? `SwissCleanMove Services in ${data.regionName}` : locale === 'fr' ? `Services SwissCleanMove à ${data.regionName}` : `SwissCleanMove Dienstleistungen in ${data.regionName}`",
    replace: "t('regionLanding.scmServicesIn', { region: data.regionName, fallback: `SwissCleanMove Dienstleistungen in ${data.regionName}` })"
  },
  {
    file: 'src/components/RegionLandingPage.tsx',
    find: "locale === 'en' ? 'Get Started Today' : locale === 'fr' ? 'Commencez aujourd\\'hui' : 'Jetzt starten'",
    replace: "t('regionLanding.getStartedToday', { fallback: 'Jetzt starten' })"
  },
  {
    file: 'src/components/RegionLandingPage.tsx',
    find: "locale === 'en' ? `${data.regionName} on the Map` : locale === 'fr' ? `${data.regionName} sur la carte` : `${data.regionName} auf der Karte`",
    replace: "t('regionLanding.onTheMap', { region: data.regionName, fallback: `${data.regionName} auf der Karte` })"
  },
  {
    file: 'src/components/RegionLandingPage.tsx',
    find: "locale === 'en' ? 'Frequently Asked Questions' : locale === 'fr' ? 'Questions fréquentes' : 'Häufig gestellte Fragen (FAQ)'",
    replace: "t('regionLanding.faq', { fallback: 'Häufig gestellte Fragen (FAQ)' })"
  },
  {
    file: 'src/components/RegionLandingPage.tsx',
    find: "locale === 'en' ? 'More from SwissCleanMove' : locale === 'fr' ? 'Plus de SwissCleanMove' : 'Mehr von SwissCleanMove'",
    replace: "t('regionLanding.moreFromScm', { fallback: 'Mehr von SwissCleanMove' })"
  },
  {
    file: 'src/components/RegionLandingPage.tsx',
    find: "locale === 'en' ? `Your Partner in ${data.regionName}` : locale === 'fr' ? `Votre partenaire à ${data.regionName}` : `Ihr Partner in ${data.regionName}`",
    replace: "t('regionLanding.yourPartnerIn', { region: data.regionName, fallback: `Ihr Partner in ${data.regionName}` })"
  },
  {
    file: 'src/components/RegionLandingPage.tsx',
    find: "locale === 'en' ? 'Contact us now for a free, no-obligation quote.' : locale === 'fr' ? 'Contactez-nous maintenant pour un devis gratuit et sans engagement.' : 'Kontaktieren Sie uns jetzt für eine kostenlose und unverbindliche Offerte.'",
    replace: "t('regionLanding.contactUsNow', { fallback: 'Kontaktieren Sie uns jetzt für eine kostenlose und unverbindliche Offerte.' })"
  },
  {
    file: 'src/components/RegionLandingPage.tsx',
    find: "locale === 'en' ? 'Request Free Quote' : locale === 'fr' ? 'Demander un devis' : 'Kostenlose Offerte anfordern'",
    replace: "t('regionLanding.requestQuoteBtn', { fallback: 'Kostenlose Offerte anfordern' })"
  },
  // SeoLandingPage ternaries
  {
    file: 'src/components/SeoLandingPage.tsx',
    find: "locale === 'en' ? 'Operational Areas' : locale === 'fr' ? 'Zones d\\'intervention' : 'Einsatzgebiete'",
    replace: "t('seoLanding.operationalAreas', { fallback: 'Einsatzgebiete' })"
  },
  {
    file: 'src/components/SeoLandingPage.tsx',
    find: "locale === 'en' ? 'Our teams are in daily operation in:' : locale === 'fr' ? 'Nos équipes interviennent quotidiennement à :' : 'Unsere Teams sind täglich im Einsatz in:'",
    replace: "t('seoLanding.teamsDailyOperation', { fallback: 'Unsere Teams sind täglich im Einsatz in:' })"
  },
  {
    file: 'src/components/SeoLandingPage.tsx',
    find: "locale === 'en' ? `Fast availability in the ${city} region` : locale === 'fr' ? `Disponibilité rapide dans la région de ${city}` : `Schnelle Verfügbarkeit in der Region ${city}`",
    replace: "t('seoLanding.fastAvailability', { city, fallback: `Schnelle Verfügbarkeit in der Region ${city}` })"
  },
  {
    file: 'src/components/SeoLandingPage.tsx',
    find: "locale === 'en' ? `${city} on the Map` : locale === 'fr' ? `${city} sur la carte` : `${city} auf der Karte`",
    replace: "t('seoLanding.onTheMap', { city, fallback: `${city} auf der Karte` })"
  },
  {
    file: 'src/components/SeoLandingPage.tsx',
    find: "locale === 'en' ? 'Frequently Asked Questions' : locale === 'fr' ? 'Questions Fréquentes' : 'Häufig gestellte Fragen (FAQ)'",
    replace: "t('seoLanding.faq', { fallback: 'Häufig gestellte Fragen (FAQ)' })"
  },
  {
    file: 'src/components/SeoLandingPage.tsx',
    find: "locale === 'en' ? 'Service throughout Switzerland' : locale === 'fr' ? 'Service dans toute la Suisse' : 'Service schweizweit'",
    replace: "t('seoLanding.serviceThroughoutCh', { fallback: 'Service schweizweit' })"
  },
  {
    file: 'src/components/SeoLandingPage.tsx',
    find: "locale === 'en' ? 'FAQ' : locale === 'fr' ? 'FAQ' : 'Häufige Fragen (FAQ)'",
    replace: "t('seoLanding.faqShort', { fallback: 'Häufige Fragen (FAQ)' })"
  },
  {
    file: 'src/components/SeoLandingPage.tsx',
    find: "locale === 'en' ? 'All Regions' : locale === 'fr' ? 'Toutes les Régions' : 'Alle Regionen'",
    replace: "t('seoLanding.allRegions', { fallback: 'Alle Regionen' })"
  }
];

for (const r of replaces) {
  if (fs.existsSync(r.file)) {
    let content = fs.readFileSync(r.file, 'utf8');
    
    // Auto-inject useTranslations if missing
    if (!content.includes('const t = useTranslations') && !content.includes('const tl = useTranslations')) {
      if (content.includes("export default function") || content.includes("export function")) {
         content = content.replace(/(export (?:default )?function\s+\w+\s*\([^)]*\)\s*\{)/, `$1\n  const t = useTranslations('dynamic');\n`);
         if (!content.includes("useTranslations")) {
             content = "import { useTranslations } from 'next-intl';\n" + content;
         }
      } else if (content.includes("const ") && content.includes(" = ({")) {
         content = content.replace(/(const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*\{)/, `$1\n  const t = useTranslations('dynamic');\n`);
         if (!content.includes("useTranslations")) {
             content = "import { useTranslations } from 'next-intl';\n" + content;
         }
      }
    }
    
    content = content.split(r.find).join(r.replace);
    fs.writeFileSync(r.file, content);
  }
}

console.log("Fixed UI files.");
