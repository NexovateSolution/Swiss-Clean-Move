const fs = require('fs');

const translations = {
  de: {
    meta: {
      title: "Reinigungsfirma Solothurn — Ihre professionelle Reinigungsfirma im Kanton Solothurn | SwissCleanMove",
      description: "Professionelle Reinigungsfirma in Solothurn: Endreinigung, Unterhaltsreinigung, Büroreinigung, Fensterreinigung, Baureinigung und Gastronomie-Reinigung. Solothurn, Grenchen, Olten, Zuchwil & Umgebung. Jetzt kostenlose Offerte anfordern."
    },
    badge: "REINIGUNGSFIRMA SOLOTHURN",
    h1: "Reinigungsfirma Solothurn — Ihre professionelle Reinigungsfirma im Kanton Solothurn",
    heroSubtitle: "SwissCleanMove ist Ihre lokale Reinigungsfirma in Solothurn. Zuverlässig, professionell und nach Schweizer Qualitätsstandard — für Privatkunden, Unternehmen und Verwaltungen im gesamten Kanton Solothurn.",
    ctaSoft: "Kostenlose Offerte anfordern",
    sections: [
      {
        heading: "Professionelle Reinigungsdienstleistungen in Solothurn und Umgebung",
        body: "SwissCleanMove ist Ihre erfahrene und zuverlässige Reinigungsfirma für den gesamten Kanton Solothurn. Ob Privatkunde, KMU, Hausverwaltung oder öffentliche Institution — wir bieten ein komplettes Spektrum an professionellen Reinigungsdienstleistungen, die exakt auf Ihre individuellen Bedürfnisse zugeschnitten sind.",
        bullets: [
          "Endreinigung (Umzugsreinigung) mit 100% Abnahmegarantie",
          "Regelmässige Unterhaltsreinigung für Treppenhäuser & Gemeinschaftsräume",
          "Professionelle Büro- und Gewerbereinigung",
          "Fensterreinigung (innen & aussen, inkl. Rahmen & Rollläden)",
          "Baureinigung (Grob- und Feinreinigung nach Renovation/Neubau)",
          "Gastronomie-Reinigung (Küchen, Abzugshauben, HACCP-konform)",
          "Grundreinigung & Spezialreinigung (Steinböden, Parkett, Teppich)",
          "Saisonreinigung (Frühjahrsputz, Herbstreinigung)"
        ]
      },
      {
        heading: "Unsere Einsatzgebiete im Kanton Solothurn",
        body: "SwissCleanMove ist im gesamten Kanton Solothurn aktiv. Unsere Teams sind in folgenden Gemeinden und Städten regelmässig im Einsatz:",
        bullets: [
          "Solothurn (Stadt) — Hauptsitz unserer regionalen Einsatzleitung",
          "Grenchen — Industriestadt mit hohem Bedarf an Gewerbereinigung",
          "Olten — Verkehrsknotenpunkt mit Büro- und Geschäftsreinigungen",
          "Zuchwil — Wohngebiet mit regelmässiger Unterhaltsreinigung",
          "Derendingen — Wohn- und Gewerbezone",
          "Bettlach, Luterbach, Langendorf, Bellach, Selzach",
          "Oensingen, Balsthal, Trimbach, Dulliken, Wangen bei Olten"
        ]
      },
      {
        heading: "Warum SwissCleanMove als Ihre Reinigungsfirma in Solothurn?",
        body: "Unsere Kunden im Kanton Solothurn schätzen unsere Kombination aus lokaler Präsenz, Schweizer Qualität und transparenter Preisgestaltung. Wir setzen ausschliesslich auf fest angestelltes, geschultes Personal und verwenden nur umweltschonende, professionelle Reinigungsmittel.",
        bullets: [
          "Lokale Reinigungsfirma mit Einsatzteams direkt im Kanton Solothurn",
          "Fest angestelltes, geschultes und geprüftes Personal",
          "Umfassende Betriebs- und Berufshaftpflichtversicherung",
          "Transparente Festpreise ohne versteckte Kosten",
          "Kostenlose Vor-Ort-Besichtigung und verbindliche Offerte",
          "Flexible Einsatzzeiten (Abend, Wochenende, Notfalleinsätze)",
          "Persönlicher Ansprechpartner für alle Anliegen"
        ]
      }
    ],
    serviceBulletsHeading: "Ihre Premium-Vorteile für professionelle Reinigungsdienstleistungen in Solothurn",
    serviceBullets: [
      "Kostenlose Vor-Ort-Besichtigung und transparente, verbindliche Offerten",
      "Ausschliesslich fest angestelltes, geschultes und geprüftes Personal",
      "Umfassende Betriebshaftpflichtversicherung für maximale Sicherheit",
      "Einsatz modernster, umweltschonender Maschinen und Reinigungsmittel",
      "Lokale Verankerung und Expertise im Kanton Solothurn",
      "Massgeschneiderte Pflichtenhefte, perfekt auf Ihre Bedürfnisse abgestimmt",
      "Flexible Einsatzzeiten (Abend, Wochenende, Notfälle innert 24h)",
      "Ein einziger, persönlicher Ansprechpartner für alle Belange",
      "Lückenlose Qualitätskontrolle durch unsere erfahrenen Teamleiter",
      "Keine versteckten Gebühren, keine unklaren Zuschläge, kein administrativer Aufwand"
    ],
    trustPoints: [
      "Lokale Reinigungsfirma mit Schweizer Qualität",
      "Haftpflichtversichert und zuverlässig",
      "Transparente Preise ohne versteckte Kosten"
    ],
    ctaMidHeading: "Reinigungsfirma in Solothurn gesucht?",
    ctaMidBody: "Fordern Sie jetzt Ihre kostenlose und unverbindliche Offerte an. Wir melden uns innerhalb von 24 Stunden.",
    ctaMid: "Kostenlose Offerte anfordern",
    internalLinksHeading: "Weitere Dienstleistungen in Solothurn",
    internalLinks: [
      { label: "Umzug & Transport in Solothurn", href: "umzug-solothurn" },
      { label: "Endreinigung & Umzugsreinigung Solothurn", href: "solothurn" },
      { label: "Hauswartung & Gebäudeunterhalt Schweiz", href: "hauswartung-schweiz" },
      { label: "Facility Service Schweiz", href: "facility-service-schweiz" },
      { label: "Reinigungsfirma Schweiz — Übersicht", href: "reinigungsfirma-schweiz" }
    ],
    ctaStrongHeading: "Ihre Reinigungsfirma in Solothurn — jetzt kontaktieren",
    ctaStrongBody: "Rufen Sie uns an oder füllen Sie unser Formular aus. Wir erstellen Ihnen innert 24 Stunden eine transparente Offerte für Ihre Reinigung in Solothurn.",
    ctaStrong: "Offerte anfordern",
    testimonial: {
      quote: "SwissCleanMove ist unsere Reinigungsfirma des Vertrauens in Solothurn. Zuverlässig, gründlich und immer pünktlich.",
      author: "Unternehmen in Solothurn",
      trust: "Vertrauen durch Schweizer Qualität"
    },
    faqs: [
      {
        question: "Wie wird der Preis für professionelle Reinigungsdienstleistungen in Solothurn berechnet?",
        answer: "Die Berechnung ist bei SwissCleanMove stets transparent und fair. Abhängig vom spezifischen Service arbeiten wir entweder mit Fixpreisen (z.B. bei Endreinigungen ab CHF 350 oder Umzügen ab CHF 490), mit fixen Stundenansätzen (z.B. Haushaltshilfe ab CHF 35/h) oder Quadratmeterpreisen. Wir empfehlen immer eine kostenlose Besichtigung vor Ort im Kanton Solothurn, um Ihnen eine exakte und verbindliche Offerte ausstellen zu können."
      },
      {
        question: "Arbeiten Sie mit eigenem Equipment?",
        answer: "In den allermeisten Fällen bringen wir alles selbst mit. Für gewerbliche Reinigungen, Baureinigungen, Endreinigungen und Umzüge sind unsere Fahrzeuge komplett ausgestattet mit Profi-Staubsaugern, Einscheibenmaschinen, Reinigungsmitteln, Leitern und Werkzeugen."
      },
      {
        question: "Wie schnell können Sie in Solothurn vor Ort sein?",
        answer: "Dank unserer regionalen Struktur im Kanton Solothurn sind wir extrem reaktionsschnell. In Notfällen können wir oft innerhalb von 24 bis 48 Stunden ein professionelles Einsatzteam mobilisieren. Für planbare Arbeiten empfehlen wir eine Vorlaufzeit von 1-2 Wochen."
      },
      {
        question: "Was passiert, wenn während der Arbeit etwas beschädigt wird?",
        answer: "Sicherheit hat bei uns oberste Priorität. Wir verfügen über eine sehr weitreichende Betriebs- und Berufshaftpflichtversicherung, die Schäden an Ihrem Eigentum anstandslos reguliert."
      },
      {
        question: "Setzen Sie Subunternehmer oder Freelancer ein?",
        answer: "Nein, ganz bewusst nicht. Um unsere hohen Qualitätsstandards zu halten, vertrauen wir ausschliesslich auf unser eigenes, fest angestelltes Personal."
      },
      {
        question: "Welche Reinigungsmittel verwenden Sie?",
        answer: "Wir verwenden professionelle, biologisch abbaubare und ökozertifizierte Schweizer Reinigungsmittel, die effektiv gegen Schmutz und Bakterien vorgehen, aber die Oberflächen Ihrer Immobilie schonen."
      },
      {
        question: "Bieten Sie Garantien auf Ihre Arbeit in Solothurn?",
        answer: "Ja. Bei Endreinigungen nach einem Auszug gewähren wir eine 100% Abnahmegarantie. Auch bei allen anderen Dienstleistungen garantieren wir, dass das vereinbarte Pflichtenheft fehlerfrei umgesetzt wird."
      },
      {
        question: "In welchen Gemeinden im Kanton Solothurn sind Sie aktiv?",
        answer: "Wir sind im gesamten Kanton Solothurn aktiv, insbesondere in Solothurn Stadt, Grenchen, Olten, Zuchwil, Derendingen, Bettlach, Luterbach, Langendorf, Bellach, Selzach, Oensingen, Balsthal, Trimbach, Dulliken und Wangen bei Olten."
      }
    ]
  },
  en: {
    meta: {
      title: "Cleaning Company Solothurn — Your Professional Cleaning Company in Canton Solothurn | SwissCleanMove",
      description: "Professional cleaning company in Solothurn: end-of-tenancy cleaning, maintenance cleaning, office cleaning, window cleaning, construction cleaning and restaurant cleaning. Solothurn, Grenchen, Olten, Zuchwil & surroundings. Request your free quote now."
    },
    badge: "CLEANING COMPANY SOLOTHURN",
    h1: "Cleaning Company Solothurn — Your Professional Cleaning Company in Canton Solothurn",
    heroSubtitle: "SwissCleanMove is your local cleaning company in Solothurn. Reliable, professional and to Swiss quality standards — for private customers, businesses and property managers throughout Canton Solothurn.",
    ctaSoft: "Request Free Quote",
    sections: [
      {
        heading: "Professional Cleaning Services in Solothurn and Surroundings",
        body: "SwissCleanMove is your experienced and reliable cleaning company for the entire Canton of Solothurn. Whether you are a private customer, SME, property management or public institution — we offer a complete range of professional cleaning services tailored to your individual needs.",
        bullets: [
          "End-of-tenancy cleaning (move-out cleaning) with 100% handover guarantee",
          "Regular maintenance cleaning for stairwells & common areas",
          "Professional office and commercial cleaning",
          "Window cleaning (interior & exterior, incl. frames & shutters)",
          "Construction cleaning (rough and fine cleaning after renovation/new build)",
          "Restaurant cleaning (kitchens, exhaust hoods, HACCP-compliant)",
          "Deep cleaning & specialist cleaning (stone floors, parquet, carpets)",
          "Seasonal cleaning (spring cleaning, autumn cleaning)"
        ]
      },
      {
        heading: "Our Service Areas in Canton Solothurn",
        body: "SwissCleanMove operates throughout the entire Canton of Solothurn. Our teams regularly serve the following municipalities and cities:",
        bullets: [
          "Solothurn (City) — Base of our regional operations",
          "Grenchen — Industrial city with high demand for commercial cleaning",
          "Olten — Transport hub with office and commercial cleaning",
          "Zuchwil — Residential area with regular maintenance cleaning",
          "Derendingen — Residential and commercial zone",
          "Bettlach, Luterbach, Langendorf, Bellach, Selzach",
          "Oensingen, Balsthal, Trimbach, Dulliken, Wangen bei Olten"
        ]
      },
      {
        heading: "Why Choose SwissCleanMove as Your Cleaning Company in Solothurn?",
        body: "Our customers in Canton Solothurn appreciate our combination of local presence, Swiss quality and transparent pricing. We exclusively employ permanent, trained staff and use only eco-friendly, professional cleaning products.",
        bullets: [
          "Local cleaning company with teams based directly in Canton Solothurn",
          "Permanently employed, trained and vetted staff",
          "Comprehensive business and professional liability insurance",
          "Transparent fixed prices with no hidden costs",
          "Free on-site inspection and binding quote",
          "Flexible scheduling (evenings, weekends, emergency deployments)",
          "Personal contact person for all matters"
        ]
      }
    ],
    serviceBulletsHeading: "Your Premium Benefits for Professional Cleaning Services in Solothurn",
    serviceBullets: [
      "Free on-site inspection and transparent, binding quotes",
      "Exclusively permanent, trained and vetted staff",
      "Comprehensive liability insurance for maximum security",
      "Use of state-of-the-art, eco-friendly machines and cleaning products",
      "Local expertise and presence in Canton Solothurn",
      "Customised cleaning specifications tailored to your needs",
      "Flexible scheduling (evenings, weekends, emergencies within 24h)",
      "A single, personal contact person for all matters",
      "Continuous quality control by our experienced team leaders",
      "No hidden fees, no unclear surcharges, no administrative burden"
    ],
    trustPoints: [
      "Local cleaning company with Swiss quality",
      "Fully insured and reliable",
      "Transparent prices with no hidden costs"
    ],
    ctaMidHeading: "Looking for a Cleaning Company in Solothurn?",
    ctaMidBody: "Request your free, no-obligation quote now. We will get back to you within 24 hours.",
    ctaMid: "Request Free Quote",
    internalLinksHeading: "More Services in Solothurn",
    internalLinks: [
      { label: "Moving & Transport in Solothurn", href: "umzug-solothurn" },
      { label: "End-of-Tenancy Cleaning Solothurn", href: "solothurn" },
      { label: "Property Maintenance Switzerland", href: "hauswartung-schweiz" },
      { label: "Facility Services Switzerland", href: "facility-service-schweiz" },
      { label: "Cleaning Company Switzerland — Overview", href: "reinigungsfirma-schweiz" }
    ],
    ctaStrongHeading: "Your Cleaning Company in Solothurn — Contact Us Now",
    ctaStrongBody: "Call us or fill out our form. We will provide you with a transparent quote for your cleaning in Solothurn within 24 hours.",
    ctaStrong: "Request Quote",
    testimonial: {
      quote: "SwissCleanMove is our trusted cleaning company in Solothurn. Reliable, thorough and always on time.",
      author: "Company in Solothurn",
      trust: "Trust through Swiss quality"
    },
    faqs: [
      {
        question: "How is the price for professional cleaning services in Solothurn calculated?",
        answer: "Pricing at SwissCleanMove is always transparent and fair. Depending on the specific service, we work either with fixed prices (e.g. end-of-tenancy cleaning from CHF 350 or moves from CHF 490), fixed hourly rates (e.g. household help from CHF 35/h) or per-square-metre rates. We always recommend a free on-site inspection in Canton Solothurn to provide you with an exact and binding quote."
      },
      {
        question: "Do you work with your own equipment?",
        answer: "In most cases, we bring everything ourselves. For commercial cleaning, construction cleaning, end-of-tenancy cleaning and moves, our vehicles are fully equipped with professional vacuum cleaners, single-disc machines, cleaning products, ladders and tools."
      },
      {
        question: "How quickly can you be on site in Solothurn?",
        answer: "Thanks to our regional structure in Canton Solothurn, we are extremely responsive. In emergencies, we can often mobilise a professional team within 24 to 48 hours. For planned work, we recommend a lead time of 1-2 weeks."
      },
      {
        question: "What happens if something gets damaged during the work?",
        answer: "Safety is our top priority. We have comprehensive business and professional liability insurance that covers damage to your property without any issues."
      },
      {
        question: "Do you use subcontractors or freelancers?",
        answer: "No, absolutely not. To maintain our high quality standards, we rely exclusively on our own permanent staff."
      },
      {
        question: "What cleaning products do you use?",
        answer: "We use professional, biodegradable and eco-certified Swiss cleaning products that are effective against dirt and bacteria while protecting the surfaces of your property."
      },
      {
        question: "Do you offer guarantees on your work in Solothurn?",
        answer: "Yes. For end-of-tenancy cleaning after a move-out, we offer a 100% handover guarantee. For all other services, we guarantee that the agreed specifications are implemented flawlessly."
      },
      {
        question: "In which municipalities in Canton Solothurn are you active?",
        answer: "We are active throughout the entire Canton of Solothurn, particularly in Solothurn City, Grenchen, Olten, Zuchwil, Derendingen, Bettlach, Luterbach, Langendorf, Bellach, Selzach, Oensingen, Balsthal, Trimbach, Dulliken and Wangen bei Olten."
      }
    ]
  },
  fr: {
    meta: {
      title: "Entreprise de nettoyage Soleure — Votre entreprise de nettoyage professionnelle dans le canton de Soleure | SwissCleanMove",
      description: "Entreprise de nettoyage professionnelle à Soleure : nettoyage de fin de bail, nettoyage d'entretien, nettoyage de bureaux, nettoyage de vitres, nettoyage de chantier et nettoyage de restaurant. Soleure, Granges, Olten, Zuchwil & environs. Demandez votre devis gratuit."
    },
    badge: "ENTREPRISE DE NETTOYAGE SOLEURE",
    h1: "Entreprise de nettoyage Soleure — Votre entreprise de nettoyage professionnelle dans le canton de Soleure",
    heroSubtitle: "SwissCleanMove est votre entreprise de nettoyage locale à Soleure. Fiable, professionnelle et conforme aux standards de qualité suisses — pour les particuliers, les entreprises et les régies immobilières dans tout le canton de Soleure.",
    ctaSoft: "Demander un devis gratuit",
    sections: [
      {
        heading: "Services de nettoyage professionnels à Soleure et environs",
        body: "SwissCleanMove est votre entreprise de nettoyage expérimentée et fiable pour l'ensemble du canton de Soleure. Que vous soyez particulier, PME, régie immobilière ou institution publique — nous offrons une gamme complète de services de nettoyage professionnels adaptés à vos besoins individuels.",
        bullets: [
          "Nettoyage de fin de bail avec garantie de remise à 100%",
          "Nettoyage d'entretien régulier pour cages d'escalier et espaces communs",
          "Nettoyage professionnel de bureaux et locaux commerciaux",
          "Nettoyage de vitres (intérieur et extérieur, cadres et volets inclus)",
          "Nettoyage de chantier (nettoyage grossier et fin après rénovation/construction neuve)",
          "Nettoyage de restaurant (cuisines, hottes, conforme HACCP)",
          "Nettoyage en profondeur et nettoyage spécial (sols en pierre, parquet, tapis)",
          "Nettoyage saisonnier (nettoyage de printemps, nettoyage d'automne)"
        ]
      },
      {
        heading: "Nos zones d'intervention dans le canton de Soleure",
        body: "SwissCleanMove intervient dans l'ensemble du canton de Soleure. Nos équipes sont régulièrement en mission dans les communes et villes suivantes :",
        bullets: [
          "Soleure (Ville) — Siège de notre direction opérationnelle régionale",
          "Granges — Ville industrielle avec forte demande en nettoyage commercial",
          "Olten — Nœud de transport avec nettoyage de bureaux et commerces",
          "Zuchwil — Zone résidentielle avec nettoyage d'entretien régulier",
          "Derendingen — Zone résidentielle et commerciale",
          "Bettlach, Luterbach, Langendorf, Bellach, Selzach",
          "Oensingen, Balsthal, Trimbach, Dulliken, Wangen bei Olten"
        ]
      },
      {
        heading: "Pourquoi choisir SwissCleanMove comme entreprise de nettoyage à Soleure ?",
        body: "Nos clients dans le canton de Soleure apprécient notre combinaison de présence locale, de qualité suisse et de prix transparents. Nous employons exclusivement du personnel permanent, formé et vérifié, et utilisons uniquement des produits de nettoyage professionnels et écologiques.",
        bullets: [
          "Entreprise de nettoyage locale avec des équipes basées dans le canton de Soleure",
          "Personnel permanent, formé et vérifié",
          "Assurance responsabilité civile professionnelle complète",
          "Prix fixes transparents sans coûts cachés",
          "Inspection gratuite sur place et devis contraignant",
          "Horaires flexibles (soirs, week-ends, interventions d'urgence)",
          "Interlocuteur personnel pour toutes vos demandes"
        ]
      }
    ],
    serviceBulletsHeading: "Vos avantages premium pour des services de nettoyage professionnels à Soleure",
    serviceBullets: [
      "Inspection gratuite sur place et devis transparents et contraignants",
      "Personnel exclusivement permanent, formé et vérifié",
      "Assurance responsabilité civile complète pour une sécurité maximale",
      "Utilisation de machines et produits de nettoyage modernes et écologiques",
      "Expertise locale et présence dans le canton de Soleure",
      "Cahiers des charges sur mesure, parfaitement adaptés à vos besoins",
      "Horaires flexibles (soirs, week-ends, urgences sous 24h)",
      "Un seul interlocuteur personnel pour toutes vos demandes",
      "Contrôle qualité continu par nos chefs d'équipe expérimentés",
      "Aucun frais caché, aucun supplément flou, aucune charge administrative"
    ],
    trustPoints: [
      "Entreprise de nettoyage locale avec qualité suisse",
      "Assurée et fiable",
      "Prix transparents sans coûts cachés"
    ],
    ctaMidHeading: "Vous cherchez une entreprise de nettoyage à Soleure ?",
    ctaMidBody: "Demandez maintenant votre devis gratuit et sans engagement. Nous vous répondons dans les 24 heures.",
    ctaMid: "Demander un devis gratuit",
    internalLinksHeading: "Autres services à Soleure",
    internalLinks: [
      { label: "Déménagement et transport à Soleure", href: "umzug-solothurn" },
      { label: "Nettoyage de fin de bail Soleure", href: "solothurn" },
      { label: "Conciergerie et maintenance Suisse", href: "hauswartung-schweiz" },
      { label: "Facility Services Suisse", href: "facility-service-schweiz" },
      { label: "Entreprise de nettoyage Suisse — Aperçu", href: "reinigungsfirma-schweiz" }
    ],
    ctaStrongHeading: "Votre entreprise de nettoyage à Soleure — contactez-nous maintenant",
    ctaStrongBody: "Appelez-nous ou remplissez notre formulaire. Nous vous fournirons un devis transparent pour votre nettoyage à Soleure dans les 24 heures.",
    ctaStrong: "Demander un devis",
    testimonial: {
      quote: "SwissCleanMove est notre entreprise de nettoyage de confiance à Soleure. Fiable, minutieuse et toujours ponctuelle.",
      author: "Entreprise à Soleure",
      trust: "La confiance par la qualité suisse"
    },
    faqs: [
      {
        question: "Comment le prix des services de nettoyage professionnels à Soleure est-il calculé ?",
        answer: "Chez SwissCleanMove, les prix sont toujours transparents et équitables. Selon le service spécifique, nous travaillons soit avec des prix fixes (p. ex. nettoyage de fin de bail dès CHF 350 ou déménagements dès CHF 490), des tarifs horaires fixes (p. ex. aide ménagère dès CHF 35/h) ou des prix au mètre carré. Nous recommandons toujours une inspection gratuite sur place dans le canton de Soleure."
      },
      {
        question: "Travaillez-vous avec votre propre équipement ?",
        answer: "Dans la plupart des cas, nous apportons tout nous-mêmes. Pour les nettoyages commerciaux, les nettoyages de chantier, les nettoyages de fin de bail et les déménagements, nos véhicules sont entièrement équipés d'aspirateurs professionnels, de monobrosses, de produits de nettoyage, d'échelles et d'outils."
      },
      {
        question: "En combien de temps pouvez-vous intervenir à Soleure ?",
        answer: "Grâce à notre structure régionale dans le canton de Soleure, nous sommes extrêmement réactifs. En cas d'urgence, nous pouvons souvent mobiliser une équipe professionnelle dans les 24 à 48 heures. Pour les travaux planifiés, nous recommandons un délai de 1 à 2 semaines."
      },
      {
        question: "Que se passe-t-il si quelque chose est endommagé pendant les travaux ?",
        answer: "La sécurité est notre priorité absolue. Nous disposons d'une assurance responsabilité civile professionnelle très étendue qui couvre les dommages à votre propriété sans aucun problème."
      },
      {
        question: "Faites-vous appel à des sous-traitants ou des freelances ?",
        answer: "Non, absolument pas. Pour maintenir nos standards de qualité élevés, nous comptons exclusivement sur notre propre personnel permanent."
      },
      {
        question: "Quels produits de nettoyage utilisez-vous ?",
        answer: "Nous utilisons des produits de nettoyage suisses professionnels, biodégradables et éco-certifiés, efficaces contre la saleté et les bactéries tout en protégeant les surfaces de votre bien immobilier."
      },
      {
        question: "Offrez-vous des garanties sur votre travail à Soleure ?",
        answer: "Oui. Pour le nettoyage de fin de bail après un déménagement, nous offrons une garantie de remise à 100%. Pour tous les autres services, nous garantissons que le cahier des charges convenu est exécuté sans défaut."
      },
      {
        question: "Dans quelles communes du canton de Soleure êtes-vous actifs ?",
        answer: "Nous sommes actifs dans tout le canton de Soleure, notamment à Soleure Ville, Granges, Olten, Zuchwil, Derendingen, Bettlach, Luterbach, Langendorf, Bellach, Selzach, Oensingen, Balsthal, Trimbach, Dulliken et Wangen bei Olten."
      }
    ]
  },
  it: {
    meta: {
      title: "Impresa di pulizie Soletta — La vostra impresa di pulizie professionale nel Canton Soletta | SwissCleanMove",
      description: "Impresa di pulizie professionale a Soletta: pulizia di fine locazione, pulizia di manutenzione, pulizia uffici, pulizia vetri, pulizia cantieri e pulizia ristoranti. Soletta, Grenchen, Olten, Zuchwil e dintorni. Richiedete il vostro preventivo gratuito."
    },
    badge: "IMPRESA DI PULIZIE SOLETTA",
    h1: "Impresa di pulizie Soletta — La vostra impresa di pulizie professionale nel Canton Soletta",
    heroSubtitle: "SwissCleanMove è la vostra impresa di pulizie locale a Soletta. Affidabile, professionale e conforme agli standard di qualità svizzeri — per clienti privati, aziende e amministrazioni immobiliari in tutto il Canton Soletta.",
    ctaSoft: "Richiedi preventivo gratuito",
    sections: [
      {
        heading: "Servizi di pulizia professionali a Soletta e dintorni",
        body: "SwissCleanMove è la vostra impresa di pulizie esperta e affidabile per l'intero Canton Soletta. Che siate clienti privati, PMI, amministrazioni immobiliari o istituzioni pubbliche — offriamo una gamma completa di servizi di pulizia professionali su misura per le vostre esigenze individuali.",
        bullets: [
          "Pulizia di fine locazione con garanzia di consegna al 100%",
          "Pulizia di manutenzione regolare per scale e spazi comuni",
          "Pulizia professionale di uffici e locali commerciali",
          "Pulizia vetri (interni ed esterni, inclusi telai e persiane)",
          "Pulizia cantieri (pulizia grossa e fine dopo ristrutturazione/nuova costruzione)",
          "Pulizia ristoranti (cucine, cappe aspiranti, conforme HACCP)",
          "Pulizia profonda e pulizia speciale (pavimenti in pietra, parquet, tappeti)",
          "Pulizia stagionale (pulizia di primavera, pulizia autunnale)"
        ]
      },
      {
        heading: "Le nostre zone di intervento nel Canton Soletta",
        body: "SwissCleanMove opera in tutto il Canton Soletta. I nostri team intervengono regolarmente nei seguenti comuni e città:",
        bullets: [
          "Soletta (Città) — Sede della nostra direzione operativa regionale",
          "Grenchen — Città industriale con forte domanda di pulizia commerciale",
          "Olten — Nodo di trasporti con pulizia di uffici e commerci",
          "Zuchwil — Zona residenziale con pulizia di manutenzione regolare",
          "Derendingen — Zona residenziale e commerciale",
          "Bettlach, Luterbach, Langendorf, Bellach, Selzach",
          "Oensingen, Balsthal, Trimbach, Dulliken, Wangen bei Olten"
        ]
      },
      {
        heading: "Perché scegliere SwissCleanMove come impresa di pulizie a Soletta?",
        body: "I nostri clienti nel Canton Soletta apprezzano la nostra combinazione di presenza locale, qualità svizzera e prezzi trasparenti. Impieghiamo esclusivamente personale fisso, formato e verificato, e utilizziamo solo prodotti di pulizia professionali ed ecologici.",
        bullets: [
          "Impresa di pulizie locale con team basati direttamente nel Canton Soletta",
          "Personale assunto stabilmente, formato e verificato",
          "Assicurazione di responsabilità civile professionale completa",
          "Prezzi fissi trasparenti senza costi nascosti",
          "Sopralluogo gratuito e preventivo vincolante",
          "Orari flessibili (sera, fine settimana, interventi di emergenza)",
          "Referente personale per tutte le questioni"
        ]
      }
    ],
    serviceBulletsHeading: "I vostri vantaggi premium per servizi di pulizia professionali a Soletta",
    serviceBullets: [
      "Sopralluogo gratuito e preventivi trasparenti e vincolanti",
      "Esclusivamente personale fisso, formato e verificato",
      "Assicurazione di responsabilità civile completa per la massima sicurezza",
      "Utilizzo di macchinari e prodotti di pulizia moderni ed ecologici",
      "Competenza locale e presenza nel Canton Soletta",
      "Capitolati personalizzati, perfettamente adattati alle vostre esigenze",
      "Orari flessibili (sera, fine settimana, emergenze entro 24 ore)",
      "Un unico referente personale per tutte le questioni",
      "Controllo qualità continuo da parte dei nostri capi squadra esperti",
      "Nessun costo nascosto, nessun supplemento poco chiaro, nessun onere amministrativo"
    ],
    trustPoints: [
      "Impresa di pulizie locale con qualità svizzera",
      "Assicurata e affidabile",
      "Prezzi trasparenti senza costi nascosti"
    ],
    ctaMidHeading: "Cercate un'impresa di pulizie a Soletta?",
    ctaMidBody: "Richiedete ora il vostro preventivo gratuito e senza impegno. Vi risponderemo entro 24 ore.",
    ctaMid: "Richiedi preventivo gratuito",
    internalLinksHeading: "Altri servizi a Soletta",
    internalLinks: [
      { label: "Traslochi e trasporti a Soletta", href: "umzug-solothurn" },
      { label: "Pulizia di fine locazione Soletta", href: "solothurn" },
      { label: "Manutenzione immobiliare Svizzera", href: "hauswartung-schweiz" },
      { label: "Facility Services Svizzera", href: "facility-service-schweiz" },
      { label: "Impresa di pulizie Svizzera — Panoramica", href: "reinigungsfirma-schweiz" }
    ],
    ctaStrongHeading: "La vostra impresa di pulizie a Soletta — contattateci ora",
    ctaStrongBody: "Chiamateci o compilate il nostro modulo. Vi forniremo un preventivo trasparente per la vostra pulizia a Soletta entro 24 ore.",
    ctaStrong: "Richiedi preventivo",
    testimonial: {
      quote: "SwissCleanMove è la nostra impresa di pulizie di fiducia a Soletta. Affidabile, accurata e sempre puntuale.",
      author: "Azienda a Soletta",
      trust: "Fiducia attraverso la qualità svizzera"
    },
    faqs: [
      {
        question: "Come viene calcolato il prezzo dei servizi di pulizia professionali a Soletta?",
        answer: "I prezzi di SwissCleanMove sono sempre trasparenti e corretti. A seconda del servizio specifico, lavoriamo con prezzi fissi (es. pulizia di fine locazione da CHF 350 o traslochi da CHF 490), tariffe orarie fisse (es. aiuto domestico da CHF 35/h) o prezzi al metro quadro. Raccomandiamo sempre un sopralluogo gratuito nel Canton Soletta per fornirvi un preventivo esatto e vincolante."
      },
      {
        question: "Lavorate con la vostra attrezzatura?",
        answer: "Nella maggior parte dei casi portiamo tutto noi. Per le pulizie commerciali, le pulizie di cantiere, le pulizie di fine locazione e i traslochi, i nostri veicoli sono completamente attrezzati con aspirapolvere professionali, monospazzole, prodotti di pulizia, scale e utensili."
      },
      {
        question: "Quanto velocemente potete intervenire a Soletta?",
        answer: "Grazie alla nostra struttura regionale nel Canton Soletta, siamo estremamente reattivi. In caso di emergenza, possiamo spesso mobilitare un team professionale entro 24-48 ore. Per lavori pianificati, raccomandiamo un preavviso di 1-2 settimane."
      },
      {
        question: "Cosa succede se qualcosa viene danneggiato durante il lavoro?",
        answer: "La sicurezza è la nostra massima priorità. Disponiamo di un'assicurazione di responsabilità civile professionale molto ampia che copre i danni alla vostra proprietà senza problemi."
      },
      {
        question: "Utilizzate subappaltatori o freelance?",
        answer: "No, assolutamente no. Per mantenere i nostri elevati standard di qualità, ci affidiamo esclusivamente al nostro personale fisso."
      },
      {
        question: "Quali prodotti di pulizia utilizzate?",
        answer: "Utilizziamo prodotti di pulizia svizzeri professionali, biodegradabili e certificati ecologicamente, efficaci contro sporco e batteri, proteggendo al contempo le superfici del vostro immobile."
      },
      {
        question: "Offrite garanzie sul vostro lavoro a Soletta?",
        answer: "Sì. Per la pulizia di fine locazione dopo un trasloco, offriamo una garanzia di consegna al 100%. Per tutti gli altri servizi, garantiamo che il capitolato concordato venga eseguito senza difetti."
      },
      {
        question: "In quali comuni del Canton Soletta siete attivi?",
        answer: "Siamo attivi in tutto il Canton Soletta, in particolare a Soletta Città, Grenchen, Olten, Zuchwil, Derendingen, Bettlach, Luterbach, Langendorf, Bellach, Selzach, Oensingen, Balsthal, Trimbach, Dulliken e Wangen bei Olten."
      }
    ]
  }
};

// Inject translations into all 4 language files
const files = [
  { file: 'messages/de.json', lang: 'de' },
  { file: 'messages/en.json', lang: 'en' },
  { file: 'messages/fr.json', lang: 'fr' },
  { file: 'messages/it.json', lang: 'it' }
];

for (const { file, lang } of files) {
  console.log(`Injecting into ${file}...`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  if (!data.seoPages) {
    data.seoPages = {};
  }
  
  data.seoPages.reinigungsfirmaSolothurn = translations[lang];
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`  ✅ Added seoPages.reinigungsfirmaSolothurn to ${file}`);
}

console.log('\nDone! All 4 languages injected.');
