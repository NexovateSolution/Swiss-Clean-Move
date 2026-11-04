import RegionLandingPage from '@/components/RegionLandingPage';
import type { RegionPageData } from '@/components/RegionLandingPage';
import type { Metadata } from 'next';

const D: Record<string, RegionPageData> = {
  de: {
    slug: 'basel',
    regionName: 'Basel',
    seoTitle: 'Umzugsfirma Basel – Privatumzug, Firmenumzug & Transport | SwissCleanMove',
    metaDescription: 'Zuverlässige Umzugsfirma in Basel und Umgebung. SwissCleanMove bietet professionelle Privatumzüge, Firmenumzüge, Möbeltransporte und Umzugsreinigung mit Abnahmegarantie. Jetzt kostenlose Offerte anfordern!',
    h1: 'Ihre professionelle Umzugsfirma in Basel und Umgebung',
    highSeoKeywords: [
      'Umzugsfirma Basel',
      'Umzug Basel',
      'Privatumzug Basel',
      'Firmenumzug Basel',
      'Möbeltransport Basel',
      'Umzugsreinigung Basel'
    ],
    localKeywords: [
      'Basel-Stadt',
      'Basel-Landschaft',
      'Allschwil',
      'Binningen',
      'Bottmingen',
      'Muttenz',
      'Münchenstein',
      'Reinach',
      'Pratteln',
      'Riehen'
    ],
    introHeading: 'Ihr Umzugsunternehmen für Basel und Umgebung',
    introParagraphs: [
      'Ein Wohnungs- oder Firmenwechsel in Basel und der umliegenden Region erfordert eine eingespielte Organisation, verlässliche Helfer und das richtige Transportequipment. SwissCleanMove unterstützt Privatpersonen, Familien und Unternehmen in Basel-Stadt sowie im gesamten Kanton Basel-Landschaft mit durchdachten Umzugsdienstleistungen.',
      'Ob kompakter Möbeltransport innerhalb eines Stadtquartiers, kompletter Privatumzug in eine Etagenwohnung oder strukturierter Firmenumzug: Wir planen Ihren Umzug vorausschauend, gehen sorgsam mit Ihrem Inventar um und bieten Ihnen auf Wunsch alle ergänzenden Leistungen wie Möbelmontage, Verpackungsservice und Umzugsreinigung mit Abnahmegarantie aus einer Hand.'
    ],
    servicesSection: {
      heading: 'Unsere Umzugsleistungen in Basel',
      intro: 'Wählen Sie genau die Leistungen, die Sie für Ihren Umzug in Basel und Umgebung benötigen – flexibel kombinierbar und transparent kalkuliert.',
      items: [
        {
          key: 'privatumzug',
          title: 'Privatumzug',
          description: 'Sorgfältige Durchführung von Wohnungsumzügen jeder Grösse – vom Studio bis zum Einfamilienhaus in Basel und der Agglomeration.',
          href: '/de/umzug-basel',
          badge: 'Beliebt'
        },
        {
          key: 'firmenumzug',
          title: 'Firmenumzug',
          description: 'Effiziente Standortwechsel und Büroumzüge für Basler Betriebe mit minimierten Ausfallzeiten und strukturierter Arbeitsplatzlogistik.',
          href: '/de/umzug-basel'
        },
        {
          key: 'moebeltransport',
          title: 'Möbeltransport',
          description: 'Fachgerechter Transport einzelner Möbelstücke, schwerer Einrichtungsgegenstände oder neuer Anschaffungen direkt zu Ihnen nach Hause.',
          href: '/de/umzug-basel'
        },
        {
          key: 'verpackungsservice',
          title: 'Verpackungsservice',
          description: 'Fachgerechtes Ein- und Auspacken von Hausrat, Glaswaren und empfindlichen Wertsachen mit strapazierfähigen Umzugskartons und Schutzmaterial.',
          href: '/de/free-offer'
        },
        {
          key: 'montage',
          title: 'Möbelmontage und Demontage',
          description: 'Routinierte Demontage grosser Schränke und Betten am Auszugsort sowie passgenauer, sicherer Wiederaufbau am neuen Wohnort in Basel.',
          href: '/de/free-offer'
        },
        {
          key: 'reinigung',
          title: 'Umzugsreinigung mit Abnahmegarantie',
          description: 'Gründliche Endreinigung Ihrer alten Wohnung nach kantonalen Richtlinien inklusive persönlicher Übergabebegleitung vor Ort.',
          href: '/de/umzugsreinigung-schweiz',
          badge: 'Garantie'
        },
        {
          key: 'entsorgung',
          title: 'Entsorgung und Räumung',
          description: 'Umweltgerechte Räumung und Entsorgung nicht mehr benötigter Möbel, Haushaltsgegenstände oder Altlasten aus Keller und Estrich.',
          href: '/de/services/disposal'
        }
      ]
    },
    localInfoSection: {
      heading: 'Umzüge in Basel-Stadt und der Region',
      intro: 'Jedes Quartier und jede Gemeinde in der Region Basel hat spezifische Gegebenheiten – von historischen Altstadtstrassen bis zu Hanglagen. SwissCleanMove bedient Kunden in folgenden Gebieten mit fundierter Vorbereitung:',
      areas: [
        {
          name: 'Basel-Stadt',
          description: 'In Quartieren wie Grossbasel, Kleinbasel, Gundeldingen und St. Johann prägen historische Altbauten, schmale Strassenzüge und Parkraumbeschränkungen den Umzugstag. Wir berücksichtigen Treppenhäuser, Haltezonen und Laufwege vorab.'
        },
        {
          name: 'Basel-Landschaft',
          description: 'In den Gemeinden des Baselbiets stehen oft Ein- und Mehrfamilienhäuser im Fokus. Eine vorausschauende Routen- und Ladeflächenplanung sorgt hier für kurze Wege und effiziente Be- und Entladevorgänge.'
        },
        {
          name: 'Allschwil',
          description: 'Die unmittelbare Nähe zu Basel mit historischem Dorfkern und modernen Wohngebieten verlangt eine präzise Abstimmung von Anfahrtszeiten und Fahrzeuggrössen.'
        },
        {
          name: 'Binningen',
          description: 'Beliebte Hanglagen und verwinkelte Zugangswege machen eine genaue Klärung von Treppen, Rampen und Stellflächen vor dem Umzugstag besonders wichtig.'
        },
        {
          name: 'Bottmingen',
          description: 'Ruhige Wohnzonen erfordern umsichtiges Rangieren, den Schutz von Vorplätzen und eine leise, rücksichtsvolle Durchführung.'
        },
        {
          name: 'Muttenz',
          description: 'Als verkehrsreicher Knotenpunkt zwischen Stadt und Agglomeration ist hier eine exakte Zeitfensterplanung für reibungsloses Be- und Entladen entscheidend.'
        },
        {
          name: 'Münchenstein',
          description: 'Vielfältige Wohn- und Gewerbequartiere im Birstal profitieren von einer passenden Fahrzeugdisposition und zügiger Transportkoordination.'
        },
        {
          name: 'Reinach',
          description: 'In der grössten Gemeinde des Birsecks begleiten wir Haus- und Wohnungsumzüge mit passenden Teams und strukturierter Möbelmontage.'
        },
        {
          name: 'Pratteln',
          description: 'Dichte Überbauungen und belebte Quartiere erfordern die rechtzeitige Organisation von Halteverbotszonen und eingespielte Tragehilfen.'
        }
      ]
    },
    whyChooseUsSection: {
      heading: 'Warum SwissCleanMove für Ihren Umzug?',
      intro: 'Wir setzen auf überprüfbare Qualität, Zuverlässigkeit und persönliche Betreuung. Das zeichnet unsere Arbeit aus:',
      points: [
        {
          title: 'Verbindliche Festpreise',
          description: 'Nach Durchsprache Ihrer Umzugsdetails erhalten Sie eine klare Offerte ohne versteckte Gebühren oder überraschende Nachforderungen.'
        },
        {
          title: 'Sorgsamer Umgang mit Ihrem Eigentum',
          description: 'Wir schützen empfindliche Möbelstücke mit Polstervlies, Gurten und Schutzfolien und schonen Böden sowie Türrahmen in beiden Liegenschaften.'
        },
        {
          title: 'Alles aus einer Hand',
          description: 'Umzug, Möbelmontage, Entsorgung und Umzugsreinigung mit Abnahmegarantie können nahtlos in einem Gesamtauftrag koordiniert werden.'
        },
        {
          title: 'Persönliche Erreichbarkeit',
          description: 'Sie erreichen unser Team direkt via Telefon (+41 78 215 80 30) oder WhatsApp für rasche Abstimmungen vor und während des Umzugs.'
        }
      ]
    },
    processSection: {
      heading: 'So funktioniert Ihre Umzugsofferte',
      intro: 'In fünf einfachen Schritten von Ihrer Anfrage zum reibungslosen Umzug in Basel:',
      steps: [
        {
          step: 1,
          title: 'Anfrage einreichen',
          description: 'Übermitteln Sie Ihre Eckdaten online über das Formular, rufen Sie uns an oder schreiben Sie uns unkompliziert via WhatsApp.'
        },
        {
          step: 2,
          title: 'Prüfung durch unser Team',
          description: 'Wir analysieren Zimmeranzahl, Umzugsvolumen, Distanz, Etagen und gewünschte Zusatzleistungen.'
        },
        {
          step: 3,
          title: 'Klärung offener Details',
          description: 'Besonderheiten wie Parkplatzsituation, Möbelliftbedarf oder Montageaufwand werden bei Bedarf kurz telefonisch geklärt.'
        },
        {
          step: 4,
          title: 'Individuelle Offerte erhalten',
          description: 'Sie erhalten ein massgeschneidertes, transparentes Angebot mit fairen und nachvollziehbaren Konditionen.'
        },
        {
          step: 5,
          title: 'Umzug durchführen',
          description: 'Nach Ihrer Bestätigung reservieren wir Ihren Wunschtermin und führen den Umzug pünktlich und sorgfältig durch.'
        }
      ]
    },
    customFaqTitle: 'Häufige Fragen zum Umzug in Basel',
    faqs: [
      {
        question: 'Was kostet ein Umzug in Basel?',
        answer: 'Die Kosten für einen Umzug in Basel hängen von der Wohnungsgrösse, dem Umzugsvolumen, den Stockwerken sowie gewünschten Zusatzleistungen wie Möbelmontage oder Endreinigung ab. Kleinere Wohnungsumzüge (1 bis 2 Zimmer) starten in der Regel bei ca. CHF 600.– bis CHF 900.–, während 3- bis 4.5-Zimmer-Wohnungen je nach Distanz und Aufwand ab CHF 1\'200.– bis CHF 2\'200.– kalkuliert werden. Für eine verlässliche Kostenübersicht erstellen wir Ihnen gerne ein unverbindliches Festpreisangebot.'
      },
      {
        question: 'Wie kann ich eine Offerte für meinen Umzug in Basel anfordern?',
        answer: 'Sie können Ihre Anfrage direkt über unser Online-Offertformular einreichen, uns unter +41 78 215 80 30 anrufen oder eine WhatsApp-Nachricht senden. Nach Prüfung Ihrer Angaben erhalten Sie zeitnah ein individuelles und transparentes Angebot.'
      },
      {
        question: 'Stellt SwissCleanMove Verpackungsmaterial zur Verfügung?',
        answer: 'Ja. Auf Wunsch stellen wir Ihnen stabiles Verpackungsmaterial wie Umzugskartons, Kleiderboxen, Seidenpapier für Glaswaren sowie Schutz- und Stretchfolie zur Verfügung. Gerne übernimmt unser Team auch das komplette Ein- und Auspacken für Sie.'
      },
      {
        question: 'Können Möbel vor dem Umzug demontiert und am Zielort wieder montiert werden?',
        answer: 'Ja, unsere Mitarbeiter verfügen über das passende Werkzeug und Erfahrung bei der Demontage und Wiedermontage von Schränken, Bettsystemen, Tischen und Regalen am neuen Wohnort in Basel oder der Umgebung.'
      },
      {
        question: 'Kann der Umzug mit einer Umzugsreinigung inklusive Abnahmegarantie kombiniert werden?',
        answer: 'Ja, das ist eine unserer gefragtesten Kombinationen. Wir führen Ihren Umzug durch und reinigen im Anschluss die alte Wohnung gründlich nach den Standards der Schweizer Immobilienverwaltungen. Bei der Wohnungsübergabe ist unser Team persönlich anwesend.'
      },
      {
        question: 'Welche Orte in der Region Basel werden bedient?',
        answer: 'SwissCleanMove bedient die gesamte Stadt Basel (u.a. Grossbasel, Kleinbasel, Gundeldingen, St. Johann, Riehen) sowie das gesamte Baselbiet (u.a. Allschwil, Binningen, Bottmingen, Muttenz, Münchenstein, Reinach, Pratteln und Liestal).'
      },
      {
        question: 'Wie ist mein Umzugsgut während des Transports geschützt?',
        answer: 'Unser Team behandelt jedes Möbelstück und jede Kiste mit grösster Sorgfalt. Im Transportfahrzeug werden Möbel mit Decken, Polstervlies und Spanngurten fachgerecht gesichert. Sollte trotz aller Vorsicht eine Unregelmässigkeit auftreten, wird diese sofort im Übergabeprotokoll festgehalten und von unserer Kundenbetreuung lösungsorientiert und umgehend bearbeitet.'
      }
    ],
    finalCtaSection: {
      title: 'Kostenlose Umzugsofferte für Basel anfordern',
      subtitle: 'Planen Sie Ihren Umzug in Basel-Stadt oder Basel-Landschaft mit einem zuverlässigen Partner. Holen Sie sich jetzt Ihr unverbindliches Festpreisangebot.',
      buttonText: 'Kostenlose Offerte anfordern'
    },
    mapQuery: 'Basel, Switzerland',
    showGoogleReviews: true
  },
  en: {
    slug: 'basel',
    regionName: 'Basel',
    seoTitle: 'Moving Company Basel – Private Move, Office Move & Transport | SwissCleanMove',
    metaDescription: 'Reliable moving company in Basel and surrounding areas. SwissCleanMove offers private moves, office relocations, furniture transport and move-out cleaning with guarantee.',
    h1: 'Your Professional Moving Company in Basel and Surroundings',
    highSeoKeywords: [
      'Moving company Basel',
      'Moving Basel',
      'Private move Basel',
      'Office move Basel',
      'Furniture transport Basel',
      'Move-out cleaning Basel'
    ],
    localKeywords: [
      'Basel-Stadt',
      'Basel-Landschaft',
      'Allschwil',
      'Binningen',
      'Bottmingen',
      'Muttenz',
      'Münchenstein',
      'Reinach',
      'Pratteln',
      'Riehen'
    ],
    introHeading: 'Your Moving Partner for Basel and Surrounding Regions',
    introParagraphs: [
      'Relocating a home or business in Basel requires experienced coordination, reliable helpers and modern transport equipment. SwissCleanMove serves clients across Basel-City and Basel-Country with transparent, professional moving services.',
      'From compact single-item transports to complete apartment relocations and commercial moves, we plan every detail carefully. We also provide furniture assembly, packing services and move-out cleaning with handover guarantee.'
    ],
    servicesSection: {
      heading: 'Our Moving Services in Basel',
      intro: 'Select the moving services tailored to your needs in Basel and the surrounding area:',
      items: [
        {
          key: 'privatumzug',
          title: 'Private Relocations',
          description: 'Careful relocation services for apartments and houses across Basel and the agglomeration.',
          href: '/en/umzug-basel',
          badge: 'Popular'
        },
        {
          key: 'firmenumzug',
          title: 'Office Relocations',
          description: 'Structured corporate and commercial moves in Basel with minimal downtime.',
          href: '/en/umzug-basel'
        },
        {
          key: 'moebeltransport',
          title: 'Furniture Transport',
          description: 'Safe transportation of individual furniture items and bulky equipment directly to your destination.',
          href: '/en/umzug-basel'
        },
        {
          key: 'verpackungsservice',
          title: 'Packing Service',
          description: 'Professional packing of household goods, fragile items and valuables using sturdy boxes.',
          href: '/en/free-offer'
        },
        {
          key: 'montage',
          title: 'Furniture Assembly & Dismantling',
          description: 'Expert disassembly at your old home and precise reassembly at your new address in Basel.',
          href: '/en/free-offer'
        },
        {
          key: 'reinigung',
          title: 'Move-out Cleaning with Guarantee',
          description: 'Thorough cleaning with 100% handover guarantee and personal accompaniment during handover.',
          href: '/en/umzugsreinigung-schweiz',
          badge: 'Guaranteed'
        },
        {
          key: 'entsorgung',
          title: 'Disposal & Clearance',
          description: 'Eco-friendly clearance and disposal of unneeded furniture and household belongings.',
          href: '/en/services/disposal'
        }
      ]
    },
    localInfoSection: {
      heading: 'Relocations Across Basel-Stadt and the Region',
      intro: 'We serve all key districts and municipalities in the Basel area with local logistics planning:',
      areas: [
        {
          name: 'Basel-Stadt',
          description: 'Careful navigation through historic city streets in Grossbasel, Kleinbasel and Gundeldingen with advance parking and loading zone planning.'
        },
        {
          name: 'Basel-Landschaft',
          description: 'Serving residential communities with optimized route planning for detached homes and apartment buildings.'
        },
        {
          name: 'Allschwil',
          description: 'Bordering Basel directly, requiring coordinated truck sizing for historic town roads and new quarters.'
        },
        {
          name: 'Binningen',
          description: 'Hillside properties and terraced access points managed with dedicated loading arrangements.'
        },
        {
          name: 'Bottmingen',
          description: 'Quiet residential quarters handled with care for driveway surfaces and quiet equipment.'
        },
        {
          name: 'Muttenz',
          description: 'Important regional traffic hub with punctual loading window coordination.'
        },
        {
          name: 'Münchenstein',
          description: 'Diverse residential and commercial quarters served with flexible transport capacities.'
        },
        {
          name: 'Reinach',
          description: 'Comprehensive moving and assembly assistance in the largest municipality of Birseck.'
        },
        {
          name: 'Pratteln',
          description: 'High-density residential areas organized with designated parking permits and efficient loading.'
        }
      ]
    },
    whyChooseUsSection: {
      heading: 'Why Choose SwissCleanMove for Your Basel Move?',
      intro: 'Verified service quality, transparent pricing and responsive communication:',
      points: [
        {
          title: 'Guaranteed Fixed Quotes',
          description: 'Clear pricing without hidden surcharges after discussing your moving details.'
        },
        {
          title: 'Careful Cargo Handling',
          description: 'Every item is secured with protective fleece, straps and foil to preserve furniture and floors.'
        },
        {
          title: 'All-in-One Service',
          description: 'Combine your relocation with packing, furniture assembly, disposal and move-out cleaning.'
        },
        {
          title: 'Direct Personal Contact',
          description: 'Reach our team directly by phone (+41 78 215 80 30) or WhatsApp for prompt support.'
        }
      ]
    },
    processSection: {
      heading: 'How Your Moving Quote Works',
      intro: 'Five simple steps from enquiry to your moving day in Basel:',
      steps: [
        {
          step: 1,
          title: 'Submit Enquiry',
          description: 'Send us your move details online, call us or message us on WhatsApp.'
        },
        {
          step: 2,
          title: 'Details Review',
          description: 'We evaluate room count, volume, distance, floors and special requirements.'
        },
        {
          step: 3,
          title: 'Clarification',
          description: 'Specifics such as parking access or furniture assembly are clarified promptly.'
        },
        {
          step: 4,
          title: 'Receive Custom Offer',
          description: 'You receive a detailed, transparent offer with fair terms.'
        },
        {
          step: 5,
          title: 'Smooth Execution',
          description: 'Upon confirmation, we reserve your date and carry out your move punctually.'
        }
      ]
    },
    customFaqTitle: 'Frequently Asked Questions About Moving in Basel',
    faqs: [
      {
        question: 'How much does a move in Basel cost?',
        answer: 'Costs depend on apartment size, moving volume, floors, distance and additional services such as packing or cleaning. Smaller relocations (1–2 rooms) typically start between CHF 600.– and CHF 900.–, while larger 3- to 4.5-room apartments range from CHF 1\'200.– to CHF 2\'200.–. We provide non-binding fixed-price quotes tailored to your exact needs.'
      },
      {
        question: 'How can I request a moving quote for Basel?',
        answer: 'You can submit your enquiry via our online form, call us at +41 78 215 80 30 or contact us on WhatsApp. We review your details and send you a transparent offer promptly.'
      },
      {
        question: 'Does SwissCleanMove provide packing materials?',
        answer: 'Yes, we provide sturdy moving boxes, wardrobe cartons, bubble wrap, packing paper and stretch film. Our team can also manage complete packing and unpacking upon request.'
      },
      {
        question: 'Can furniture be dismantled and reassembled?',
        answer: 'Yes. Our experienced assemblers handle the professional dismantling of wardrobes, beds and shelving at your departure address and reassemble them at your new home in Basel.'
      },
      {
        question: 'Can I combine moving with move-out cleaning?',
        answer: 'Yes, this is one of our most popular combinations. We handle the move and perform end-of-tenancy cleaning with a 100% handover guarantee, accompanying you during the landlord inspection.'
      },
      {
        question: 'Which locations in the Basel region are served?',
        answer: 'We serve Basel-Stadt (Grossbasel, Kleinbasel, Gundeldingen, St. Johann, Riehen) as well as the entire Canton of Basel-Landschaft including Allschwil, Binningen, Bottmingen, Muttenz, Münchenstein, Reinach and Pratteln.'
      },
      {
        question: 'How are my belongings protected during transport?',
        answer: 'Our team treats every item with the utmost care, utilizing padded blankets, straps and protective covers inside our transport vehicles. In the unlikely event of any incident, it is recorded immediately on the handover protocol and resolved promptly by our customer service.'
      }
    ],
    finalCtaSection: {
      title: 'Request a Free Moving Quote for Basel',
      subtitle: 'Plan your relocation in Basel-Stadt or Basel-Landschaft with a reliable Swiss partner. Get your custom fixed-price quote today.',
      buttonText: 'Request Free Quote'
    },
    mapQuery: 'Basel, Switzerland',
    showGoogleReviews: true
  },
  fr: {
    slug: 'basel',
    regionName: 'Bâle',
    seoTitle: 'Entreprise de déménagement Bâle – Déménagement privé, d\'entreprise & transport | SwissCleanMove',
    metaDescription: 'Entreprise de déménagement fiable à Bâle et environs. SwissCleanMove propose déménagement privé, déménagement d\'entreprise, transport de meubles et nettoyage de remise de bail.',
    h1: 'Votre entreprise de déménagement professionnelle à Bâle et environs',
    highSeoKeywords: [
      'Entreprise de déménagement Bâle',
      'Déménagement Bâle',
      'Déménagement privé Bâle',
      'Déménagement d\'entreprise Bâle',
      'Transport de meubles Bâle',
      'Nettoyage de fin de bail Bâle'
    ],
    localKeywords: [
      'Bâle-Ville',
      'Bâle-Campagne',
      'Allschwil',
      'Binningen',
      'Bottmingen',
      'Muttenz',
      'Münchenstein',
      'Reinach',
      'Pratteln',
      'Riehen'
    ],
    introHeading: 'Votre partenaire de déménagement pour Bâle et sa région',
    introParagraphs: [
      'Déménager un logement ou des bureaux à Bâle et dans ses environs nécessite une organisation rigoureuse, des déménageurs qualifiés et un matériel de transport adapté. SwissCleanMove accompagne particuliers et entreprises à Bâle-Ville et Bâle-Campagne.',
      'Du transport de meubles individuels au déménagement complet d\'habitation ou d\'entreprise, nous planifions chaque étape avec soin. Nous proposons également le montage de meubles, le service d\'emballage et le nettoyage de fin de bail avec garantie de remise.'
    ],
    servicesSection: {
      heading: 'Nos prestations de déménagement à Bâle',
      intro: 'Découvrez des services adaptés à votre déménagement à Bâle et dans sa périphérie :',
      items: [
        {
          key: 'privatumzug',
          title: 'Déménagement privé',
          description: 'Prise en charge complète de votre déménagement d\'appartement ou de maison à Bâle et dans l\'agglomération.',
          href: '/fr/umzug-basel',
          badge: 'Populaire'
        },
        {
          key: 'firmenumzug',
          title: 'Déménagement d\'entreprise',
          description: 'Transferts d\'entreprises et de bureaux avec interruption d\'activité minimale.',
          href: '/fr/umzug-basel'
        },
        {
          key: 'moebeltransport',
          title: 'Transport de meubles',
          description: 'Acheminement soigné de meubles encombrants ou d\'objets lourds directement à votre domicile.',
          href: '/fr/umzug-basel'
        },
        {
          key: 'verpackungsservice',
          title: 'Service d\'emballage',
          description: 'Emballage professionnel de votre vaisselle, objets fragiles et effets personnels.',
          href: '/fr/free-offer'
        },
        {
          key: 'montage',
          title: 'Montage et démontage de mobilier',
          description: 'Démontage soigné au départ et réinstallation précise de vos meubles à votre nouvelle adresse.',
          href: '/fr/free-offer'
        },
        {
          key: 'reinigung',
          title: 'Nettoyage de fin de bail avec garantie',
          description: 'Nettoyage complet avec garantie de remise et présence lors de l\'état des lieux.',
          href: '/fr/umzugsreinigung-schweiz',
          badge: 'Garantie'
        },
        {
          key: 'entsorgung',
          title: 'Débarras et évacuation',
          description: 'Évacuation et recyclage écologique des meubles et objets dont vous ne souhaitez plus.',
          href: '/fr/services/disposal'
        }
      ]
    },
    localInfoSection: {
      heading: 'Déménagements à Bâle-Ville et dans la région',
      intro: 'Nous intervenons dans tous les quartiers et communes de la région bâloise avec une logistique adaptée :',
      areas: [
        {
          name: 'Bâle-Ville',
          description: 'Accès aux ruelles historiques du Grand-Bâle et Petit-Bâle avec gestion préalable des zones de stationnement et des étages sans ascenseur.'
        },
        {
          name: 'Bâle-Campagne',
          description: 'Organisation efficace pour villas et immeubles résidentiels dans tout le canton du Jura bâlois.'
        },
        {
          name: 'Allschwil',
          description: 'Proximité immédiate de la ville nécessitant un dimensionnement adapté des camions.'
        },
        {
          name: 'Binningen',
          description: 'Quartiers en pente et accès étagés gérés avec anticipation logistique.'
        },
        {
          name: 'Bottmingen',
          description: 'Zones résidentielles calmes respectées avec protection des abords.'
        },
        {
          name: 'Muttenz',
          description: 'Axe de transit dynamique avec coordination précise des créneaux de chargement.'
        },
        {
          name: 'Münchenstein',
          description: 'Secteurs mixtes résidentiels et commerciaux desservis avec flexibilité.'
        },
        {
          name: 'Reinach',
          description: 'Prise en charge complète pour appartements et maisons familiales.'
        },
        {
          name: 'Pratteln',
          description: 'Quartiers à forte densité gérés avec organisation rigoureuse du stationnement.'
        }
      ]
    },
    whyChooseUsSection: {
      heading: 'Pourquoi choisir SwissCleanMove pour votre déménagement ?',
      intro: 'Transparence, qualité suisse et service personnalisé :',
      points: [
        {
          title: 'Prix fixes transparents',
          description: 'Devis clair et détaillé sans frais dissimulés après examen de vos besoins.'
        },
        {
          title: 'Soin rigoureux du mobilier',
          description: 'Protection intégrale avec couvertures molletonnées, sangles et housses adaptées.'
        },
        {
          title: 'Prestation globale',
          description: 'Déménagement, montage, débarras et nettoyage de fin de bail avec garantie en un seul contrat.'
        },
        {
          title: 'Contact direct et réactif',
          description: 'Équipe joignable directement par téléphone (+41 78 215 80 30) ou WhatsApp.'
        }
      ]
    },
    processSection: {
      heading: 'Comment obtenir votre devis de déménagement',
      intro: 'Cinq étapes simples pour organiser votre déménagement à Bâle :',
      steps: [
        {
          step: 1,
          title: 'Demande en ligne',
          description: 'Remplissez le formulaire en ligne, appelez-nous ou écrivez-nous sur WhatsApp.'
        },
        {
          step: 2,
          title: 'Analyse des données',
          description: 'Nous vérifions le volume, les étages, la distance et vos besoins particuliers.'
        },
        {
          step: 3,
          title: 'Clarification des détails',
          description: 'Les conditions d\'accès ou de stationnement sont précisées rapidement.'
        },
        {
          step: 4,
          title: 'Réception du devis',
          description: 'Vous recevez une proposition personnalisée et sans engagement.'
        },
        {
          step: 5,
          title: 'Réalisation du déménagement',
          description: 'Après confirmation, nous réalisons votre déménagement avec ponctualité et soin.'
        }
      ]
    },
    customFaqTitle: 'Questions fréquentes sur le déménagement à Bâle',
    faqs: [
      {
        question: 'Quel est le coût d\'un déménagement à Bâle ?',
        answer: 'Le tarif varie selon le volume à transporter, les étages, la distance et les prestations annexes. Un déménagement de 1 à 2 pièces commence généralement entre CHF 600.– et CHF 900.–, tandis qu\'un appartement de 3 à 4.5 pièces se situe entre CHF 1\'200.– et CHF 2\'200.–. Nous établissons un devis à prix fixe adapté à votre situation.'
      },
      {
        question: 'Comment obtenir un devis de déménagement pour Bâle ?',
        answer: 'Vous pouvez déposer une demande via notre formulaire en ligne, nous appeler au +41 78 215 80 30 ou nous écrire sur WhatsApp. Nous vous répondrons dans les meilleurs délais.'
      },
      {
        question: 'SwissCleanMove fournit-il les cartons et emballages ?',
        answer: 'Oui, nous fournissons cartons renforcés, penderies pour vêtements, papier de protection et film étirable. Nous pouvons aussi réaliser l\'emballage complet sur demande.'
      },
      {
        question: 'Les meubles peuvent-ils être démontés et remontés ?',
        answer: 'Oui, nos monteurs expérimentés démontent vos armoires et lits avec précaution et les remontent à l\'identique à votre nouvelle adresse.'
      },
      {
        question: 'Peut-on combiner déménagement et nettoyage de fin de bail ?',
        answer: 'Oui, nous proposons une formule combinée incluant le déménagement et le nettoyage complet avec garantie de remise des clés lors de l\'état des lieux.'
      },
      {
        question: 'Quelles communes de la région de Bâle desservez-vous ?',
        answer: 'Nous intervenons à Bâle-Ville ainsi que dans tout le canton de Bâle-Campagne (Allschwil, Binningen, Bottmingen, Muttenz, Münchenstein, Reinach, Pratteln, Liestal, etc.).'
      },
      {
        question: 'Comment mes biens sont-ils protégés pendant le transport ?',
        answer: 'Chaque meuble est emballé et arrimé soigneusement dans notre véhicule avec couvertures et sangles. En cas d\'imprévu, un protocole contradictoire est rédigé et traité immédiatement par notre service client.'
      }
    ],
    finalCtaSection: {
      title: 'Demander un devis gratuit pour Bâle',
      subtitle: 'Planifiez votre déménagement à Bâle-Ville ou Bâle-Campagne en toute sérénité. Obtenez dès maintenant votre devis gratuit.',
      buttonText: 'Demander un devis gratuit'
    },
    mapQuery: 'Basel, Switzerland',
    showGoogleReviews: true
  },
  it: {
    slug: 'basel',
    regionName: 'Basilea',
    seoTitle: 'Ditta di traslochi Basilea – Traslochi privati, aziendali e trasporti | SwissCleanMove',
    metaDescription: 'Ditta di traslochi affidabile a Basilea e dintorni. SwissCleanMove offre traslochi per privati, traslochi aziendali, trasporto mobili e pulizie di fine locazione con garanzia.',
    h1: 'La vostra ditta di traslochi professionale a Basilea e dintorni',
    highSeoKeywords: [
      'Ditta di traslochi Basilea',
      'Traslochi Basilea',
      'Trasloco privato Basilea',
      'Trasloco aziendale Basilea',
      'Trasporto mobili Basilea',
      'Pulizia di trasloco Basilea'
    ],
    localKeywords: [
      'Basilea Città',
      'Basilea Campagna',
      'Allschwil',
      'Binningen',
      'Bottmingen',
      'Muttenz',
      'Münchenstein',
      'Reinach',
      'Pratteln',
      'Riehen'
    ],
    introHeading: 'Il vostro partner per i traslochi a Basilea e dintorni',
    introParagraphs: [
      'Cambiare casa o sede aziendale a Basilea richiede organizzazione, personale esperto e veicoli di trasporto moderni. SwissCleanMove supporta privati e aziende a Basilea Città e Basilea Campagna con soluzioni trasparenti ed efficienti.',
      'Dal trasporto di singoli arredi fino a traslochi completi di case e uffici: pianifichiamo ogni dettaglio con cura e offriamo servizi aggiuntivi di smontaggio, imballaggio e pulizia di fine locazione con garanzia di consegna.'
    ],
    servicesSection: {
      heading: 'I nostri servizi di trasloco a Basilea',
      intro: 'Scegliete i servizi di cui avete bisogno per il vostro trasloco a Basilea e provincia:',
      items: [
        {
          key: 'privatumzug',
          title: 'Trasloco privato',
          description: 'Gestione attenta di appartamenti e case di ogni dimensione a Basilea e nell\'agglomerato.',
          href: '/it/umzug-basel',
          badge: 'Popolare'
        },
        {
          key: 'firmenumzug',
          title: 'Trasloco aziendale',
          description: 'Traslochi di uffici e aziende con tempi di inattività minimi e pianificazione accurata.',
          href: '/it/umzug-basel'
        },
        {
          key: 'moebeltransport',
          title: 'Trasporto mobili',
          description: 'Trasporto accurato di singoli elementi d\'arredo e oggetti pesanti direttamente a destinazione.',
          href: '/it/umzug-basel'
        },
        {
          key: 'verpackungsservice',
          title: 'Servizio di imballaggio',
          description: 'Imballaggio professionale di stoviglie, oggetti fragili e beni personali con scatole robuste.',
          href: '/it/free-offer'
        },
        {
          key: 'montage',
          title: 'Montaggio e smontaggio mobili',
          description: 'Smontaggio accurato e rimontaggio a regola d\'arte nella nuova abitazione a Basilea.',
          href: '/it/free-offer'
        },
        {
          key: 'reinigung',
          title: 'Pulizia di trasloco con garanzia',
          description: 'Pulizia finale completa con garanzia di consegna e assistenza alla consegna dell\'immobile.',
          href: '/it/umzugsreinigung-schweiz',
          badge: 'Garanzia'
        },
        {
          key: 'entsorgung',
          title: 'Smaltimento e sgombero',
          description: 'Sgombero e smaltimento ecologico di mobili e oggetti inutilizzati da cantine o solai.',
          href: '/it/services/disposal'
        }
      ]
    },
    localInfoSection: {
      heading: 'Traslochi a Basilea Città e nella regione',
      intro: 'Operiamo in tutti i quartieri e i comuni dell\'area di Basilea con logistica dedicata:',
      areas: [
        {
          name: 'Basilea Città',
          description: 'Navigazione esperta nei quartieri storici di Grossbasel e Kleinbasel con pianificazione di permessi di sosta e accessi a vani scale.'
        },
        {
          name: 'Basilea Campagna',
          description: 'Pianificazione per case e complessi residenziali con percorsi e aree di carico ottimizzate.'
        },
        {
          name: 'Allschwil',
          description: 'Accesso calibrato tra il nucleo antico del paese e i quartieri moderni confinanti con la città.'
        },
        {
          name: 'Binningen',
          description: 'Gestione logistica di strade collinari, rampe e accessi ripidi.'
        },
        {
          name: 'Bottmingen',
          description: 'Quartieri residenziali tranquilli gestiti con cura per pavimentazioni e vialetti.'
        },
        {
          name: 'Muttenz',
          description: 'Coordinamento preciso degli orari di carico in un importante snodo di traffico.'
        },
        {
          name: 'Münchenstein',
          description: 'Aree miste residenziali e industriali servite con flessibilità di mezzi.'
        },
        {
          name: 'Reinach',
          description: 'Supporto a traslochi di grandi abitazioni nel comune più esteso del Birseck.'
        },
        {
          name: 'Pratteln',
          description: 'Organizzazione puntuale di aree di sosta in quartieri ad alta densità abitativa.'
        }
      ]
    },
    whyChooseUsSection: {
      heading: 'Perché scegliere SwissCleanMove per il vostro trasloco?',
      intro: 'Qualità verificata, prezzi trasparenti e contatto diretto:',
      points: [
        {
          title: 'Preventivi a prezzo fisso',
          description: 'Prezzo chiaro e vincolante senza costi nascosti dopo aver esaminato le vostre esigenze.'
        },
        {
          title: 'Cura massima dei mobili',
          description: 'Protezione con coperte morbide, cinghie e pellicole per salvaguardare arredi e pavimenti.'
        },
        {
          title: 'Tutto da un unico fornitore',
          description: 'Possibilità di combinare trasloco, montaggio, sgombero e pulizia finale con garanzia.'
        },
        {
          title: 'Contatto diretto e veloce',
          description: 'Potete contattarci direttamente via telefono (+41 78 215 80 30) o tramite WhatsApp.'
        }
      ]
    },
    processSection: {
      heading: 'Come funziona il preventivo per il trasloco',
      intro: 'Cinque semplici passaggi dalla richiesta al giorno del trasloco a Basilea:',
      steps: [
        {
          step: 1,
          title: 'Inviare la richiesta',
          description: 'Compilate il modulo online, telefonateci o scriveteci su WhatsApp.'
        },
        {
          step: 2,
          title: 'Valutazione dei dettagli',
          description: 'Analizziamo numero di stanze, volume, distanza, piani e servizi richiesti.'
        },
        {
          step: 3,
          title: 'Chiarimento dei particolari',
          description: 'Definiamo rapidamente disponibilità di parcheggio e necessità di montaggio.'
        },
        {
          step: 4,
          title: 'Ricezione dell\'offerta',
          description: 'Ricevete un preventivo trasparente, personalizzato e senza impegno.'
        },
        {
          step: 5,
          title: 'Esecuzione del trasloco',
          description: 'Confermata la data, eseguiamo il vostro trasloco con puntualità e massima cura.'
        }
      ]
    },
    customFaqTitle: 'Domande frequenti sui traslochi a Basilea',
    faqs: [
      {
        question: 'Quanto costa un trasloco a Basilea?',
        answer: 'Il prezzo dipende dalle dimensioni dell\'abitazione, dal volume degli arredi, dai piani e dai servizi accessori. Traslochi compatti (1–2 locali) partono generalmente da CHF 600.– a CHF 900.–, mentre appartamenti da 3 a 4.5 locali si attestano tra CHF 1\'200.– e CHF 2\'200.–. Prepariamo volentieri un preventivo personalizzato a prezzo fisso.'
      },
      {
        question: 'Come posso richiedere un preventivo per Basilea?',
        answer: 'Potete inviare la richiesta tramite il nostro modulo online, telefonare al +41 78 215 80 30 o inviarci un messaggio WhatsApp.'
      },
      {
        question: 'SwissCleanMove fornisce materiale per l\'imballaggio?',
        answer: 'Sì, forniamo scatole robuste, bauli appendiabiti, pluriball, carta da imballo e pellicole estensibili. Su richiesta eseguiamo anche l\'imballaggio completo.'
      },
      {
        question: 'I mobili possono essere smontati e rimontati?',
        answer: 'Certamente. I nostri montatori esperti smontano armadi, letti e librerie al punto di partenza e li rimontano con precisione nella nuova casa a Basilea.'
      },
      {
        question: 'È possibile combinare trasloco e pulizia finale?',
        answer: 'Sì, è una soluzione molto richiesta. Ci occupiamo del trasloco e successivamente eseguiamo la pulizia di fine locazione con garanzia al 100%, assistendo alla consegna delle chiavi.'
      },
      {
        question: 'Quali località della regione di Basilea servite?',
        answer: 'Copriamo l\'intera città di Basilea (Grossbasel, Kleinbasel, Gundeldingen, St. Johann, Riehen) e l\'intero Canton Basilea Campagna (Allschwil, Binningen, Bottmingen, Muttenz, Münchenstein, Reinach, Pratteln e Liestal).'
      },
      {
        question: 'Come sono protetti i miei beni durante il trasporto?',
        answer: 'Ogni oggetto viene movimentato con la massima cura e fissato con coperte e cinghie nel furgone. Nel caso eccezionale di un imprevisto, viene redatto un verbale e gestito tempestivamente dal nostro servizio clienti.'
      }
    ],
    finalCtaSection: {
      title: 'Richiedi un preventivo gratuito per Basilea',
      subtitle: 'Pianificate il vostro trasloco a Basilea Città o Basilea Campagna con un partner affidabile. Richiedete subito la vostra offerta a prezzo fisso.',
      buttonText: 'Richiedi preventivo gratuito'
    },
    mapQuery: 'Basel, Switzerland',
    showGoogleReviews: true
  }
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const d = D[locale] || D.de;
  return {
    title: d.seoTitle,
    description: d.metaDescription,
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/basel`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/basel',
        en: 'https://www.swisscleanmove.ch/en/basel',
        fr: 'https://www.swisscleanmove.ch/fr/basel',
        it: 'https://www.swisscleanmove.ch/it/basel',
        'x-default': 'https://www.swisscleanmove.ch/de/basel'
      }
    },
    openGraph: {
      title: d.seoTitle,
      description: d.metaDescription,
      url: `https://www.swisscleanmove.ch/${locale}/basel`,
      locale: locale === 'en' ? 'en_US' : locale === 'fr' ? 'fr_CH' : locale === 'it' ? 'it_CH' : 'de_CH',
      type: 'website'
    }
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <RegionLandingPage data={D[locale] || D.de} locale={locale} />;
}
