const fs = require('fs');
const path = require('path');

const dePath = path.join(__dirname, 'messages', 'de.json');
const data = JSON.parse(fs.readFileSync(dePath, 'utf8'));

// 4. unterhaltsreinigungBiel
const oldUnterhaltsreinigungBiel = data.seoPages.unterhaltsreinigungBiel;
if (oldUnterhaltsreinigungBiel) {
  data.seoPages.unterhaltsreinigungBiel = {
    ...oldUnterhaltsreinigungBiel,
    intro: "Ein gepflegtes Erscheinungsbild Ihrer Geschäftsräume oder Ihrer Liegenschaft ist die beste Visitenkarte. Suchen Sie nach einer zuverlässigen Unterhaltsreinigung in Biel/Bienne oder im Seeland? SwissCleanMove sorgt dafür, dass Ihr Arbeitsplatz oder Ihr Treppenhaus stets in einwandfreiem Zustand ist. Die regelmässige Unterhaltsreinigung schützt nicht nur den Wert Ihrer Immobilie, sondern fördert auch das Wohlbefinden Ihrer Mitarbeiter und hinterlässt bei Ihren Kunden einen professionellen Eindruck. Wir betreuen Büros, Arztpraxen, Kanzleien, Ladenlokale und ganze Mehrfamilienhäuser. Unser geschultes Personal arbeitet diskret, zügig und nach einem massgeschneiderten Pflichtenheft, das wir gemeinsam mit Ihnen bei einer kostenlosen Besichtigung in Biel definieren. Wir passen uns Ihrem Betriebsablauf an: Ob früh morgens, tagsüber oder abends nach Büroschluss – unsere Einsätze erfolgen flexibel. Wir setzen moderne Maschinen und umweltschonende Reinigungschemikalien ein, um eine hygienische Tiefenreinigung (insbesondere in Sanitärbereichen) zu gewährleisten. Profitieren Sie von unserer lokalen Präsenz am Bielersee und unserem hervorragenden Preis-Leistungs-Verhältnis ab CHF 120 (Treppenhäuser) bzw. günstigen Quadratmeterpreisen für Büros.",
    sections: [
      {
        "heading": "Büroreinigung und Gewerbe in Biel",
        "body": "Für Unternehmen in Biel bieten wir einen Komplettservice: Wir leeren Abfalleimer, reinigen Schreibtische und IT-Equipment desinfizierend, pflegen sämtliche Bodenbeläge und sorgen für strahlend saubere Kaffeeküchen und Toilettenanlagen. Die Frequenz (täglich, wöchentlich) passen wir exakt an Ihre Unternehmensgrösse an."
      },
      {
        "heading": "Treppenhausreinigung für Verwaltungen",
        "body": "Für Immobilienverwaltungen und Stockwerkeigentümer übernehmen wir die regelmässige Treppenhausreinigung. Ein sauberes Entree beugt Konflikten unter Mietern vor. Wir reinigen die Treppenstufen, putzen das Geländer, wischen den Lift feucht aus und sorgen für saubere Eingangstüren und Briefkastenanlagen."
      },
      {
        "heading": "Feste Ansprechpartner und hohe Diskretion",
        "body": "Gerade in Büros oder Praxen in Biel werden sensible Daten verarbeitet. Unser Personal ist fest angestellt, geschult und absolute Diskretion ist vertraglich zugesichert. Sie erhalten ein festes Reinigungsteam, sodass Sie stets wissen, wer sich in Ihren Geschäftsräumen aufhält."
      },
      {
        "heading": "Umweltfreundliche Hygiene-Standards",
        "body": "Häufiges Reinigen erfordert sanfte Mittel. Wir verwenden in der Unterhaltsreinigung biologisch abbaubare und materialschonende Produkte. Diese beseitigen Schmutz und Bakterien effektiv, schützen aber Ihre Einrichtung und verhindern eine starke chemische Geruchsbelastung in Ihren Räumen."
      }
    ],
    serviceBulletsHeading: "Ihre Vorteile bei der Unterhaltsreinigung",
    serviceBullets: [
      "Massgeschneidertes Pflichtenheft nach kostenloser Besichtigung",
      "Flexible Reinigungszeiten ausserhalb der Bürozeiten",
      "Feste, vertrauenswürdige Reinigungsteams für Ihr Objekt",
      "Einsatz von umweltfreundlichen, materialschonenden Mitteln",
      "Spezialisiert auf Büros, Praxen und Liegenschaften in Biel",
      "Faire Preise (ab CHF 120 für Treppenhäuser, günstige m2-Preise)"
    ],
    faqs: [
      {
        question: "Was ist in der regelmässigen Büroreinigung in Biel enthalten?",
        "answer": "Das Pflichtenheft wird individuell erstellt. Standardmässig umfasst es das Leeren der Abfalleimer, feuchtes Abwischen der Tische, Saugen/Wischen der Böden sowie die hygienische Reinigung der Küche und WCs."
      },
      {
        question: "Bieten Sie Reinigungen nach Geschäftsschluss an?",
        "answer": "Ja, absolut. Um Ihren Arbeitsablauf nicht zu unterbrechen, reinigen wir Ihr Büro in Biel gerne früh am Morgen vor Betriebsbeginn oder am Abend nach Büroschluss."
      },
      {
        question: "Stellen Sie die Reinigungsmittel und Maschinen?",
        "answer": "Ja. Bei gewerblichen Unterhaltsreinigungen bringen wir unser gesamtes professionelles Equipment (Staubsauger, Reinigungswagen, Mittel) selbst nach Biel mit."
      },
      {
        question: "Wie berechnen sich die Kosten für die Unterhaltsreinigung?",
        "answer": "Bei Treppenhäusern bieten wir Pauschalen (ab CHF 120) an. Bei Büros berechnen wir die Kosten meist pro Quadratmeter (CHF 0.80 - 1.50/m2) oder nach fest vereinbarten Stundenansätzen."
      }
    ]
  };
}

// 5. fensterreinigungBiel
const oldFensterreinigungBiel = data.seoPages.fensterreinigungBiel;
if (oldFensterreinigungBiel) {
  data.seoPages.fensterreinigungBiel = {
    ...oldFensterreinigungBiel,
    intro: "Strahlend saubere Fenster werten jede Immobilie sofort auf und lassen Räume heller und freundlicher wirken. Suchen Sie professionelle Hilfe für eine streifenfreie Fensterreinigung in Biel/Bienne oder im Seeland? Das Putzen von grossflächigen Fenstern, Wintergärten oder schwer zugänglichen Dachfenstern ist oft anstrengend, zeitraubend und auf Leitern nicht ungefährlich. Überlassen Sie diese Arbeit den Spezialisten von SwissCleanMove. Wir reinigen Fenster für Privathaushalte, Büros und Ladenlokale in Biel. Unser geschultes Team bringt modernstes Equipment, Spezialreiniger und das nötige Know-how mit, um Glasflächen jeder Art absolut streifenfrei zu putzen – von innen und aussen. Doch wir reinigen nicht nur das Glas: Auch die Fensterrahmen, die Fensterfälze, die Fenstersimse sowie Storen und Rollläden werden von uns auf Wunsch tiefengereinigt und von Strassenschmutz oder Spinnweben befreit. Wir bieten transparente Preise ab CHF 8 bis 15 pro Fenster. Mit unserer lokalen Präsenz am Bielersee garantieren wir kurze Anfahrtswege, Pünktlichkeit und in Notfällen sogar eine schnelle Verfügbarkeit innert 24 Stunden.",
    sections: [
      {
        "heading": "Streifenfreie Reinigung für Privathaushalte",
        "body": "Ob Frühlingsputz oder regelmässige Pflege – wir bringen den Durchblick in Ihr Zuhause. Wir putzen normale Wohnungsfenster, Balkonverglasungen und Dachfenster in Biel. Mit speziellen Abziehern und Mikrofasertüchern verhindern wir Schlierenbildung, sodass Sie eine makellose Aussicht auf den Bielersee oder den Jura geniessen können."
      },
      {
        "heading": "Schaufenster- und Glasfassaden für Gewerbe",
        "body": "Ein sauberes Schaufenster ist die Einladung in Ihr Geschäft. Für Boutiquen, Restaurants und Büros in Biel bieten wir die regelmässige Reinigung von Schaufenstern, Glaswänden und Eingangstüren an. Diesen Service führen wir flexibel auch ausserhalb Ihrer Öffnungszeiten durch."
      },
      {
        "heading": "Inklusive Storen- und Rahmenreinigung",
        "body": "Eine professionelle Fensterreinigung umfasst mehr als nur das Glas. Der Schmutz setzt sich oft in den Rahmen und Fälzen fest. Wir wischen die Rahmen feucht ab, reinigen die Führungsschienen der Storen und befreien Lamellenstoren oder Rollläden schonend von tiefsitzendem Staub und Pollen."
      },
      {
        "heading": "Sicheres Arbeiten in der Höhe",
        "body": "Das Reinigen von Treppenhausverglasungen oder hohen Fenstern an Fassaden ist ohne richtiges Werkzeug gefährlich. Unsere Fensterputzer sind mit professionellen Leitern, Verlängerungsstangen (Teleskopsystemen) und Sicherungen ausgestattet, um auch schwer erreichbare Fenster in Biel sicher und effizient zu putzen."
      }
    ],
    serviceBulletsHeading: "Ihre Vorteile bei der Fensterreinigung in Biel",
    serviceBullets: [
      "Absolut streifenfreie Fenster (innen und aussen)",
      "Inklusive Reinigung von Fensterrahmen und Fälzen",
      "Fachmännische Reinigung von Storen und Rollläden",
      "Transparente Preisgestaltung (ab CHF 8-15 pro Fenster)",
      "Sicheres Equipment für hohe und schwer erreichbare Fenster",
      "Flexibel buchbar für Privat- und Gewerbekunden in Biel"
    ],
    faqs: [
      {
        question: "Wie wird der Preis für die Fensterreinigung berechnet?",
        "answer": "Wir berechnen in der Regel CHF 8 bis 15 pro Fenster, abhängig von der Grösse (z.B. Standardfenster vs. raumhohe Balkontür) und dem Verschmutzungsgrad. Für eine grosse Anzahl oder gewerbliche Schaufenster in Biel vereinbaren wir oft Pauschalen."
      },
      {
        question: "Sind die Fensterrahmen in der Reinigung inbegriffen?",
        "answer": "Ja. Eine fachgerechte Fensterreinigung bei SwissCleanMove beinhaltet standardmässig auch das feuchte Abwischen der Rahmen, der Fenstersimse und das Reinigen der Fälze."
      },
      {
        question: "Reinigen Sie auch Storen und Rollläden?",
        "answer": "Ja, wir reinigen Lamellenstoren, Klappläden und Rollläden. Da dies sehr aufwendig ist, bieten wir dies oft als zubuchbaren Zusatzservice an oder schnüren für Sie in Biel ein attraktives Komplettpaket."
      },
      {
        question: "Bringen Sie Leitern und Putzmittel mit?",
        "answer": "Selbstverständlich. Unser Team bringt sämtliches professionelle Equipment wie Abzieher, Teleskopstangen, Leitern und spezielle Glasreiniger direkt zu Ihnen nach Biel mit."
      }
    ]
  };
}

// 6. transportfirmaBiel
const oldTransportfirmaBiel = data.seoPages.transportfirmaBiel;
if (oldTransportfirmaBiel) {
  data.seoPages.transportfirmaBiel = {
    ...oldTransportfirmaBiel,
    intro: "Suchen Sie eine zuverlässige Transportfirma in Biel/Bienne oder im Seeland für den sicheren Transfer Ihrer Güter? SwissCleanMove ist nicht nur auf komplette Umzüge spezialisiert, sondern auch Ihr kompetenter Partner für Einzeltransporte, Kurierfahrten und den Transport von schweren oder empfindlichen Möbelstücken. Ob Sie ein über Ricardo oder Tutti gekauftes Sofa abholen müssen, Baumaterial für Ihr neues Projekt benötigen oder als lokales KMU in Biel eine sichere Auslieferung an Ihre Kunden wünschen – wir stehen Ihnen mit unserer modernen, luftgefederten Fahrzeugflotte zur Verfügung. Wir bieten faire und transparente Stundenansätze ab CHF 160 (inkl. Fahrzeug und Helfer) oder berechnen Ihnen für regelmässige Fahrten feste Pauschalen. Unser fest angestelltes, kräftiges Personal sorgt dafür, dass Ihr Transportgut (vom antiken Schrank bis zum sensiblen IT-Server) professionell gesichert, verpackt und schadenfrei am Zielort in Biel oder der gesamten Schweiz ankommt. Durch unseren regionalen Standort garantieren wir höchste Flexibilität und können Eiltransporte oft auch innerhalb von 24 Stunden durchführen.",
    sections: [
      {
        "heading": "Einzeltransporte und Möbel-Taxi in Biel",
        "body": "Haben Sie ein grosses Möbelstück gekauft, das nicht in Ihr Auto passt? Unser Möbeltaxi-Service ist die Lösung. Wir holen das Sofa, den Kleiderschrank oder die Waschmaschine für Sie in Biel ab und transportieren es sicher bis in Ihre Wohnung – bei Bedarf helfen wir auch direkt bei der Montage."
      },
      {
        "heading": "Kurierfahrten und Warentransport für KMU",
        "body": "Lokale Unternehmen im Seeland profitieren von unseren Logistikdienstleistungen. Wir übernehmen regelmässige Auslieferungen, Kurierfahrten oder den sicheren Transport von empfindlichen Geräten (z.B. für Medizintechnik oder IT) für Firmenkunden. Diskretion und Pünktlichkeit sind dabei für uns selbstverständlich."
      },
      {
        "heading": "Sicherheit und Transportversicherung",
        "body": "Ihr Gut ist bei uns in sicheren Händen. Unsere Fahrzeuge verfügen über professionelle Zurrschienen und Luftfederung. Unsere Mitarbeiter sichern die Ladung mit Spanngurten und Zügeldecken. Zudem ist jeder Transport durch eine umfassende Transportversicherung (Vollkasko) vollumfänglich geschützt."
      },
      {
        "heading": "Flexibel, lokal und schnell verfügbar",
        "body": "Da wir direkt am Bielersee stationiert sind, profitieren Sie von kurzen Anfahrtswegen und entfallenden hohen Spesen. Wir sind extrem flexibel und können bei dringenden Logistikproblemen in Biel oft noch am selben Tag oder spätestens innert 24 Stunden einspringen."
      }
    ],
    serviceBulletsHeading: "Ihre Vorteile mit unserer Transportfirma",
    serviceBullets: [
      "Faire Stundenansätze (ab CHF 160) oder Pauschalen",
      "Vollständige Transportversicherung für Ihr Gut",
      "Möbeltaxi für Einzeltansporte (Tutti, Ricardo, Möbelhaus)",
      "Moderne, luftgefederte und saubere Transportfahrzeuge",
      "Zuverlässige Kurier- und Logistikdienste für KMU",
      "Schnelle Eiltransporte im Raum Biel innert 24h möglich"
    ],
    faqs: [
      {
        question: "Wie berechnen sich die Transportkosten in Biel?",
        "answer": "Für Einzeltransporte berechnen wir meist nach Aufwand ab einem Stundenansatz von CHF 160 (dies beinhaltet in der Regel den Transporter und zwei kräftige Helfer). Für planbare, längere Transporte bieten wir Fixpreise an."
      },
      {
        question: "Transportieren Sie auch Einzelstücke, die ich online gekauft habe?",
        "answer": "Ja, das ist unser Möbeltaxi-Service. Wenn Sie ein Sofa oder einen Schrank auf Ricardo, Tutti oder in einem Möbelhaus in Biel gekauft haben, holen wir dieses ab und tragen es sicher in Ihre Wohnung."
      },
      {
        question: "Ist mein Transportgut versichert?",
        "answer": "Absolut. Sämtliche Güter, die wir transportieren, sind während der Fahrt und beim Be- und Entladen durch unsere umfassende Transportversicherung geschützt."
      },
      {
        question: "Bieten Sie Ihre Transporte auch über die Kantonsgrenzen hinaus an?",
        "answer": "Ja. Auch wenn unser Hauptsitz in Biel/Bienne ist, führen wir Warentransporte, Möbeltransporte und Kurierfahrten von Biel aus in die gesamte Schweiz durch."
      }
    ]
  };
}

// 7. entsorgungBiel
const oldEntsorgungBiel = data.seoPages.entsorgungBiel;
if (oldEntsorgungBiel) {
  data.seoPages.entsorgungBiel = {
    ...oldEntsorgungBiel,
    intro: "Der Keller ist voll, eine Wohnungsräumung steht an oder Sie möchten sich vor einem Umzug von alten Möbeln trennen? SwissCleanMove ist Ihr professioneller Partner für Räumungen und fachgerechte Entsorgung in Biel/Bienne und im Seeland. Das Entsorgen von Sperrgut, alten Elektrogeräten oder Matratzen ist oft mühsam, zeitaufwendig und erfordert ein passendes Fahrzeug. Wir nehmen Ihnen die gesamte körperliche und logistische Arbeit ab. Unser Team kommt direkt zu Ihnen nach Hause in Biel, trägt die unerwünschten Gegenstände aus der Wohnung oder dem Estrich und verlädt sie in unsere Transportwagen. Wir garantieren eine umwelt- und fachgerechte Entsorgung auf den offiziellen Recyclinghöfen in der Region, bei der Werkstoffe wie Holz, Metall und Elektroschrott sauber getrennt werden. Wir bieten unsere Entsorgungsdienste zu transparenten Preisen an (ab CHF 30 pro Kubikmeter Volumen). Ob es sich um ein einzelnes altes Sofa handelt oder um die komplette Räumung einer Messi-Wohnung – wir arbeiten diskret, schnell und übergeben die Räumlichkeiten auf Wunsch anschliessend besenrein.",
    sections: [
      {
        "heading": "Stressfreie Möbel- und Sperrgutentsorgung",
        "body": "Befreien Sie sich von Altlasten. Wir demontieren auf Wunsch Ihre alten Kleiderschränke, tragen schwere Sofas durch enge Treppenhäuser in Biel und entsorgen Matratzen, Teppiche und Sperrgut aller Art. Sie müssen keinen eigenen Transporter mieten oder schwer heben."
      },
      {
        "heading": "Fachgerechtes Recycling von Elektrogeräten",
        "body": "Alte Kühlschränke, defekte Fernseher oder veraltete IT-Infrastruktur aus Büros dürfen nicht in den normalen Müll. Wir holen Elektroschrott bei Ihnen in Biel ab und garantieren, dass dieser den offiziellen Recyclingkanälen zugeführt wird, wo wertvolle Rohstoffe zurückgewonnen werden."
      },
      {
        "heading": "Komplette Wohnungs- und Hausräumungen",
        "body": "Nach einem Todesfall, bei einem Auszug ins Altersheim oder bei Mietnomaden muss oft eine komplette Wohnung geräumt werden. Wir übernehmen Räumungen in Biel pietätvoll, schnell und absolut diskret. Anschliessend übergeben wir das Haus, den Keller oder den Estrich besenrein."
      },
      {
        "heading": "Transparente Kosten nach Volumen",
        "body": "Bei uns zahlen Sie nur für das, was Sie auch entsorgen. Wir berechnen die Entsorgungskosten fair nach Volumen (ab CHF 30 pro Kubikmeter) plus den Arbeitsaufwand. Für umfangreiche Räumungen in Biel besichtigen wir das Objekt im Vorfeld kostenlos und erstellen Ihnen eine Fixpreis-Offerte."
      }
    ],
    serviceBulletsHeading: "Darum SwissCleanMove für Ihre Entsorgung",
    serviceBullets: [
      "Faire Preise nach Volumen (ab CHF 30 / m3)",
      "Tragen und Demontage der alten Möbel durch uns",
      "Fachgerechtes, umweltschonendes Recycling auf Werkhöfen",
      "Spezialisiert auf Sperrgut, Elektroschrott und Hausräumungen",
      "Besenreine Übergabe bei kompletten Räumungen",
      "Diskrete und pietätvolle Abwicklung in Biel und dem Seeland"
    ],
    faqs: [
      {
        question: "Wie berechnen sich die Kosten für eine Entsorgung in Biel?",
        "answer": "Der Preis setzt sich aus unserem Arbeitsaufwand (Tragen, Demontage, Transport) und den Entsorgungsgebühren auf dem Werkhof zusammen. Letztere berechnen wir fair nach Volumen (ab CHF 30 pro Kubikmeter Sperrgut)."
      },
      {
        question: "Muss ich die alten Möbel selbst nach draussen tragen?",
        "answer": "Nein, ganz im Gegenteil. Unser Service beinhaltet, dass unsere kräftigen Mitarbeiter die Gegenstände direkt aus Ihrer Wohnung, Ihrem Keller oder Estrich in Biel heraustragen und verladen."
      },
      {
        question: "Demontieren Sie alte Möbel vor der Entsorgung?",
        "answer": "Ja, wenn ein alter Schrank oder ein riesiges Regal nicht durch die Tür passt, demontieren unsere Mitarbeiter das Möbelstück fachgerecht vor Ort in Biel, bevor es verladen wird."
      },
      {
        question: "Führen Sie auch komplette Wohnungsräumungen durch?",
        "answer": "Ja. Wir räumen nach Todesfällen, Zwangsräumungen oder bei Umzügen ins Altersheim komplette Wohnungen und Häuser im Seeland diskret. Auf Wunsch führen wir danach direkt die Endreinigung durch."
      }
    ]
  };
}

// 8. facilityServiceBiel
const oldFacilityServiceBiel = data.seoPages.facilityServiceBiel;
if (oldFacilityServiceBiel) {
  data.seoPages.facilityServiceBiel = {
    ...oldFacilityServiceBiel,
    intro: "Ein reibungsloser Betrieb Ihrer Immobilien und Geschäftsräume erfordert professionelle Betreuung im Hintergrund. Suchen Sie einen ganzheitlichen Facility Service Partner in Biel/Bienne oder dem Seeland? SwissCleanMove bietet Immobilienverwaltungen, Stockwerkeigentümergemeinschaften und Unternehmen ein umfassendes infrastrukturelles Facility Management aus einer Hand. Unser Ziel ist der langfristige Werterhalt Ihrer Liegenschaft und die Entlastung Ihrer Verwaltung. Unser Dienstleistungsportfolio umfasst die regelmässige Treppenhaus- und Unterhaltsreinigung, die Überwachung der Haustechnik, das Auswechseln von Leuchtmitteln, kleinere Reparaturen sowie die Pflege der Aussen- und Grünanlagen. Auch den zuverlässigen Winterdienst (Schneeräumung und Salzen) übernehmen wir für Ihre Objekte in Biel. Durch unsere lokale Präsenz am Bielersee agieren wir als direkter, kompetenter Ansprechpartner vor Ort, der bei Störungen oder Notfällen extrem schnell reagieren kann. Wir garantieren Kostentransparenz und erstellen für jede Liegenschaft in Biel ein massgeschneidertes, effizientes Pflichtenheft.",
    sections: [
      {
        "heading": "Umfassender Liegenschaftsservice in Biel",
        "body": "Für Immobilienverwaltungen übernehmen wir die Rolle des Hauswarts. Wir reinigen die Treppenhäuser, wischen die Lifts, überprüfen die Funktion der Eingangstüren und sorgen für Sauberkeit in den Waschküchen und Trockenräumen. Ein gepflegtes Entree ist massgeblich für die Zufriedenheit der Mieter in Ihren Bieler Objekten."
      },
      {
        "heading": "Technische Kontrollen und kleine Reparaturen",
        "body": "Unsere Mitarbeiter prüfen regelmässig die Heizungsanlagen (z.B. Wasserdruckkontrolle), die Funktion der Beleuchtung im Treppenhaus und der Einstellhalle. Defekte Glühbirnen oder kaputte Lichtschalter werden von unserem Facility Service umgehend repariert, um die Sicherheit im Gebäude zu gewährleisten."
      },
      {
        "heading": "Umgebungspflege und Grünanlagen",
        "body": "Die Aussenwirkung einer Immobilie ist entscheidend. Wir mähen den Rasen, schneiden Hecken, befreien Wege von Herbstlaub und reinigen die Parkplätze. Unser Team sorgt dafür, dass die Umgebung Ihrer Liegenschaft in Biel das ganze Jahr über repräsentativ und einladend aussieht."
      },
      {
        "heading": "Zuverlässiger Winterdienst (Pikett)",
        "body": "Sicherheit geht vor. Sobald in Biel Schnee fällt oder Frostgefahr besteht, rückt unser Winterdienst aus. Wir übernehmen die Schneeräumung auf Gehwegen, Treppen und Zufahrten und bringen Streusalz aus, um Unfälle und Haftungsansprüche gegen die Liegenschaftseigentümer zu verhindern."
      }
    ],
    serviceBulletsHeading: "Ihre Vorteile mit unserem Facility Service",
    serviceBullets: [
      "Alles aus einer Hand (Reinigung, Technik, Aussenpflege)",
      "Proaktive Mängelbehebung und Werterhalt der Liegenschaft",
      "Zuverlässiger Winterdienst und Schneeräumung in Biel",
      "Schnelle Reaktionszeiten bei Notfällen oder Störungen",
      "Massgeschneiderte Verträge für Verwaltungen und KMU",
      "Regionale Präsenz und Ortskenntnis im Seeland"
    ],
    faqs: [
      {
        question: "Welche Dienstleistungen beinhaltet der Facility Service in Biel?",
        "answer": "Unser Service ist modular aufgebaut. Er umfasst meist die Gebäudereinigung (Treppenhaus, Büro), den technischen Hauswartdienst (Leuchtmittelersatz, Heizungskontrolle), die Gartenpflege und den Winterdienst."
      },
      {
        question: "Bieten Sie einen Winterdienst für Immobilien in Biel an?",
        "answer": "Ja, wir übernehmen die rechtliche Verpflichtung zur Schneeräumung. Unser Pikettdienst sorgt bei Schneefall oder Eisglätte frühmorgens dafür, dass Gehwege, Zugänge und Parkplätze in Biel sicher begehbar sind."
      },
      {
        question: "Führen Sie auch kleine Reparaturen durch?",
        "answer": "Ja. Kleine handwerkliche Tätigkeiten (wie das Tauschen von Zylindern, das Reparieren klemmender Türen oder der Austausch von Leuchtstoffröhren) erledigen unsere Hauswarte direkt vor Ort."
      },
      {
        question: "Arbeiten Sie direkt mit Immobilienverwaltungen zusammen?",
        "answer": "Absolut. Wir sind der starke Partner im Hintergrund für viele Verwaltungen in Biel und dem Seeland. Wir übernehmen die Mieterkommunikation vor Ort und melden grössere Defekte proaktiv an die Verwaltung."
      }
    ]
  };
}

fs.writeFileSync(dePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated unterhaltsreinigung, fensterreinigung, transport, entsorgung, facility Biel in messages/de.json');
