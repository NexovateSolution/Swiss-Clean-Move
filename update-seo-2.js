const fs = require('fs');
const path = require('path');

const dePath = path.join(__dirname, 'messages', 'de.json');
const data = JSON.parse(fs.readFileSync(dePath, 'utf8'));

// Update reinigungBiel
const oldReinigung = data.seoPages.reinigungBiel;
if (oldReinigung) {
  data.seoPages.reinigungBiel = {
    "meta": oldReinigung.meta,
    "badge": oldReinigung.badge,
    "h1": oldReinigung.h1,
    "heroSubtitle": oldReinigung.heroSubtitle,
    "ctaSoft": oldReinigung.ctaSoft,
    "intro": "Eine saubere Umgebung ist die Grundlage für Wohlbefinden, Produktivität und einen positiven ersten Eindruck. SwissCleanMove ist Ihre professionelle Reinigungsfirma in Biel/Bienne, spezialisiert auf massgeschneiderte Reinigungslösungen für Privathaushalte und Geschäftskunden. Seit 2024 betreuen wir zahlreiche Immobilien im Seeland – von der modernen Attikawohnung am Bielersee über das Grossraumbüro in der Innenstadt bis hin zu Geschäftsräumen in Nidau und Brügg. Wir bieten Ihnen ein umfassendes Dienstleistungsportfolio: von der regelmässigen Unterhaltsreinigung über die streifenfreie Fensterreinigung bis hin zur anspruchsvollen Baureinigung nach Umbauten. Unsere geschulten Reinigungskräfte arbeiten mit höchster Diskretion, Zuverlässigkeit und umweltfreundlichen Reinigungsmitteln. Mit flexiblen Einsatzzeiten, auch ausserhalb der regulären Bürozeiten, passen wir uns exakt Ihrem Rhythmus an. Verlassen Sie sich auf Schweizer Qualitätsstandards und transparente Pauschalpreise ohne versteckte Kosten. SwissCleanMove – Ihr lokaler Partner für makellose Sauberkeit in Biel und Umgebung.",
    "sections": [
      {
        "heading": "Reinigungslösungen für jedes Bedürfnis",
        "body": "Kein Gebäude und kein Haushalt ist wie der andere. Deshalb setzen wir bei SwissCleanMove nicht auf standardisierte Checklisten, sondern auf massgeschneiderte Reinigungskonzepte, die exakt auf Ihre Räumlichkeiten in Biel zugeschnitten sind. Wir nehmen uns die Zeit für eine gründliche, kostenlose Vor-Ort-Besichtigung, um Ihre individuellen Anforderungen zu verstehen. Egal, ob Sie eine tägliche Reinigung Ihres Ladenlokals, eine wöchentliche Haushaltshilfe für Ihr Einfamilienhaus oder eine einmalige Intensivreinigung benötigen – wir bieten Ihnen die passende Lösung. Durch den Einsatz moderner Reinigungsgeräte und umweltverträglicher Mittel erzielen wir Ergebnisse, die nicht nur optisch überzeugen, sondern auch den Werterhalt Ihrer Immobilie langfristig sichern."
      },
      {
        "heading": "Unterhaltsreinigung für Büros und Gewerbe",
        "body": "Ein gepflegtes Büro ist die Visitenkarte Ihres Unternehmens und motiviert Ihre Mitarbeiter. Unsere Unterhaltsreinigung richtet sich an Firmen, Praxen, Kanzleien und Ladenbesitzer im Seeland. Wir übernehmen das Leeren der Abfallkörbe, die fachgerechte Reinigung von Arbeitsflächen, das hygienische Putzen der Sanitäranlagen sowie die gründliche Bodenpflege. Wir reinigen Tastaturen und Telefone mit speziellen Desinfektionsmitteln, um die Keimbelastung im Büro zu senken. Um den Betriebsablauf nicht zu stören, arbeiten wir gerne in den frühen Morgenstunden oder abends nach Feierabend. Kunden schätzen unsere Unterhaltsreinigung wegen der absoluten Zuverlässigkeit und der konstanten Qualität, die wir durch regelmässige Qualitätskontrollen sicherstellen."
      },
      {
        "heading": "Wohnungsreinigung und Haushaltshilfe",
        "body": "Der moderne Alltag lässt oft wenig Zeit für die ausgiebige Pflege der eigenen vier Wände. Unsere regelmässige Wohnungsreinigung richtet sich an Familien, Paare und Singles in Biel, die ihre Freizeit lieber am Bielersee verbringen als mit dem Staubsauger. Wir saugen und wischen die Böden, reinigen das Badezimmer bis in die kleinste Fuge, putzen die Küche und übernehmen auf Wunsch auch das Bügeln Ihrer Wäsche. Wir weisen Ihnen eine feste Reinigungskraft zu, sodass immer dieselbe vertraute Person zu Ihnen nach Hause kommt. Dieses Vertrauensverhältnis ist für unsere Kunden in Biel, Nidau und Lyss entscheidend, wenn sie uns den Schlüssel zu ihrem privaten Rückzugsort überlassen."
      },
      {
        "heading": "Professionelle Fensterreinigung",
        "body": "Fenster sind die Augen eines Gebäudes. Eine professionelle Fensterreinigung sorgt nicht nur für freie Sicht, sondern lässt auch deutlich mehr Tageslicht in Ihre Räume. Wir reinigen Fenstergläser streifenfrei, befreien Fensterrahmen von Witterungsspuren und putzen Fenstersimse sowie Führungsschienen. Auch schwer zugängliche Dachfenster, grosse Schaufenster in der Bieler Innenstadt oder verglaste Wintergärten stellen für uns kein Problem dar. Dieser Service richtet sich sowohl an Privathaushalte als auch an Gewerbekunden. Unsere Kunden buchen uns oft im Frühling und Herbst für diese Aufgabe, da wir durch unsere professionelle Ausrüstung (inklusive Hebebühnen bei Bedarf) auch in grosser Höhe sicher und effizient arbeiten."
      },
      {
        "heading": "Baureinigung und Baustellenreinigung",
        "body": "Nach einem Neu- oder Umbau ist die Vorfreude gross, aber die Baustelle meist voller Bohrstaub, Farbspritzer und Zementresten. Unsere professionelle Baureinigung gliedert sich in die Baugrobreinigung (während der Bauphase) und die Baufeinreinigung (vor dem Einzug). Wir entfernen den feinen Baustaub von allen Oberflächen, befreien Fliesen von Zementschleier und reinigen neu installierte Sanitäranlagen schonsend, ohne Kratzer zu hinterlassen. Dieser Service richtet sich an Architekten, Bauherren und Eigentümer im Seeland. Kunden wählen SwissCleanMove, weil wir flexibel auf Bauverzögerungen reagieren können und die Immobilie pünktlich in einem schlüsselfertigen, bezugsbereiten Zustand übergeben."
      },
      {
        "heading": "Hauswartung und Facility Services",
        "body": "Die ganzheitliche Betreuung einer Liegenschaft erfordert Expertise in verschiedenen Bereichen. Unsere Hauswartung umfasst die regelmässige Treppenhausreinigung, die Kontrolle der Haustechnik (Heizung, Lüftung), das Auswechseln von Leuchtmitteln und die Pflege der Aussenanlagen inklusive Winterdienst (Schneeräumung und Salzen). Dieser Service richtet sich an Immobilienverwaltungen, Stockwerkeigentümergemeinschaften und Besitzer von Mehrfamilienhäusern in der Region Biel. Die Zusammenarbeit mit uns lohnt sich, weil wir durch proaktive Kontrollen kleine Mängel beheben, bevor sie zu teuren Reparaturen werden, und den Mietern als freundlicher Ansprechpartner vor Ort zur Verfügung stehen."
      },
      {
        "heading": "Tiefenreinigung und Spezialreinigungen",
        "body": "Manchmal reicht eine normale Reinigung nicht aus. Unsere Spezialreinigungen umfassen die Shampoonierung von stark beanspruchten Teppichen, die Grundreinigung von porösen Steinböden oder die Intensivreinigung nach einem Mieterwechsel (ohne Abnahmegarantie, für laufende Mietverhältnisse). Wir nutzen spezielle Industriestaubsauger und Einscheibenmaschinen, um den tief sitzenden Schmutz zu entfernen. Dieser Service wird häufig von Gastronomiebetrieben, Hotels oder von Privatpersonen vor grossen Feierlichkeiten gebucht. Unsere Expertise in der Materialkunde sorgt dafür, dass auch empfindliche Oberflächen wieder in neuem Glanz erstrahlen."
      },
      {
        "heading": "Warum professionelle Büroreinigung wichtig ist (Ratgeber)",
        "body": "Viele Unternehmen unterschätzen den Wert einer regelmässigen, professionellen Büroreinigung. Es geht dabei nicht nur um die Optik. Tastaturen, Türklinken und die Kaffeemaschine im Pausenraum sind wahre Keimschleudern. Eine gezielte Oberflächendesinfektion durch eine professionelle Reinigungsfirma wie SwissCleanMove kann den Krankenstand im Unternehmen messbar senken. Zudem hat die Arbeitsumgebung einen direkten Einfluss auf die Produktivität. Studien zeigen, dass Mitarbeiter in sauberen, aufgeräumten Büros fokussierter und motivierter arbeiten. Wenn Sie als Firma eine Reinigungsfirma beauftragen, entlasten Sie zudem Ihr Personal von ungeliebten Aufgaben wie dem Spülmaschine-Ausräumen, wodurch diese sich voll auf ihr Kerngeschäft konzentrieren können. Ein gut gepflegtes Büro hinterlässt bei Kunden und Partnern, die Sie in Biel besuchen, ausserdem einen Eindruck von Professionalität und Detailgenauigkeit."
      }
    ],
    "serviceBulletsHeading": "Ihre Vorteile bei SwissCleanMove",
    "serviceBullets": [
      "Massgeschneiderte Reinigungskonzepte für Privat & Gewerbe",
      "Feste Reinigungskräfte für maximales Vertrauen",
      "Umweltfreundliche, biologisch abbaubare Reinigungsmittel",
      "Kurzfristige Verfügbarkeit und hohe Flexibilität",
      "Transparente, faire Pauschal- oder Stundenpreise",
      "100% Haftpflichtversichert für alle Einsätze"
    ],
    "trustPoints": oldReinigung.trustPoints || ["Zuverlässig", "Diskret", "Schweizer Qualität"],
    "ctaMidHeading": oldReinigung.ctaMidHeading,
    "ctaMidBody": oldReinigung.ctaMidBody,
    "ctaMid": oldReinigung.ctaMid,
    "serviceAreaHeading": "Reinigungsfirma im gesamten Seeland",
    "serviceAreaBody": "Wir sind stolz darauf, als lokale Reinigungsfirma nicht nur das Zentrum von Biel/Bienne zu betreuen. Unsere engagierten Reinigungsteams sind täglich im gesamten Seeland unterwegs. Wir reinigen Büros in Brügg, Einfamilienhäuser in Nidau, Praxisräume in Lyss und betreuen Liegenschaften in Aarberg, Ipsach und Pieterlen. Durch unsere regionale Verankerung garantieren wir kurze Anfahrtswege, schnelle Reaktionszeiten bei Notfällen (wie z.B. Wasserschäden) und eine starke persönliche Bindung zu unseren Kunden in der Region.",
    "internalLinksHeading": oldReinigung.internalLinksHeading,
    "internalLinks": oldReinigung.internalLinks,
    "ctaStrongHeading": oldReinigung.ctaStrongHeading,
    "ctaStrongBody": oldReinigung.ctaStrongBody,
    "ctaStrong": oldReinigung.ctaStrong,
    "testimonial": oldReinigung.testimonial || { "quote": "Die beste Reinigungsfirma in Biel. Zuverlässig und extrem gründlich.", "author": "Markus T.", "trust": "Langjähriger Kunde im Seeland" },
    "faqs": [
      {
        "question": "Bieten Sie sowohl Privat- als auch Gewerbereinigungen in Biel an?",
        "answer": "Ja, wir betreuen beide Kundensegmente. Für Privathaushalte bieten wir wöchentliche oder zweiwöchentliche Unterhaltsreinigungen sowie Frühlingsputz an. Für Gewerbekunden (Büros, Praxen, Ladenlokale) erstellen wir detaillierte Pflichtenhefte für die tägliche oder wöchentliche Büroreinigung in Biel und Umgebung."
      },
      {
        "question": "Kommt bei der regelmässigen Reinigung immer dieselbe Person?",
        "answer": "Ja, das ist uns sehr wichtig. Vertrauen ist die Basis unserer Arbeit, besonders wenn es um Ihre privaten Wohnräume geht. Deshalb weisen wir jedem Kunden eine feste Reinigungskraft zu. Nur bei Krankheit oder Ferienabwesenheit setzen wir, nach vorheriger Absprache mit Ihnen, eine bestens eingearbeitete Vertretung ein."
      },
      {
        "question": "Muss ich die Reinigungsmittel selbst besorgen?",
        "answer": "Das liegt ganz bei Ihnen. Bei regelmässigen Wohnungsreinigungen (Haushaltshilfe) nutzen wir oftmals die Reinigungsmittel und Geräte des Kunden. Bei Büroreinigungen, Baureinigungen oder Fensterreinigungen bringen wir sämtliche professionellen Reinigungsmittel, Tücher und Maschinen (wie Industriesauger) selbst mit."
      },
      {
        "question": "Welche Reinigungsmittel verwenden Sie?",
        "answer": "Wir legen grossen Wert auf Nachhaltigkeit und die Gesundheit von Mensch und Tier. Deshalb verwenden wir bei SwissCleanMove vorwiegend umweltfreundliche, biologisch abbaubare Reinigungsmittel. Diese schonen nicht nur die Umwelt, sondern hinterlassen auch keine aggressiven chemischen Dämpfe in Ihren Räumlichkeiten."
      },
      {
        "question": "Können Sie die Reinigung ausserhalb unserer Bürozeiten durchführen?",
        "answer": "Selbstverständlich. Wir wissen, dass eine Reinigung während des Bürobetriebs störend sein kann. Unsere Teams sind flexibel und reinigen Ihre Geschäftsräume in Biel gerne früh morgens vor Arbeitsbeginn oder am Abend nach Büroschluss. Auch Wochenendeinsätze sind für Gewerbekunden problemlos möglich."
      },
      {
        "question": "Sind Ihre Mitarbeiter gegen Schäden versichert?",
        "answer": "Ja. Trotz grösster Sorgfalt kann einmal ein Missgeschick passieren (z.B. ein umgestossener Laptop oder eine zerkratzte Oberfläche). In solchen Fällen sind Sie vollständig abgesichert. SwissCleanMove verfügt über eine umfassende Betriebshaftpflichtversicherung, die für sämtliche Schäden aufkommt, die durch unser Personal verursacht werden."
      },
      {
        "question": "Wie werden die Preise für eine Unterhaltsreinigung berechnet?",
        "answer": "Nach einer kostenlosen Besichtigung vor Ort kalkulieren wir den Aufwand anhand der Quadratmeter, der Anzahl der Sanitäranlagen, des Bodenbelags und Ihrer spezifischen Wünsche. Sie erhalten daraufhin eine transparente Offerte mit einem monatlichen Pauschalpreis oder einem festen Stundenansatz – ganz ohne versteckte Zusatzkosten."
      },
      {
        "question": "Wie lange im Voraus muss ich eine Fensterreinigung buchen?",
        "answer": "Fensterreinigungen sind besonders im Frühjahr (Frühlingsputz) stark gefragt. Wir empfehlen Ihnen, sich etwa 2 bis 3 Wochen im Voraus bei uns zu melden. Bei Notfällen oder kurzfristigem Bedarf (z.B. nach einem Umbau) versuchen wir jedoch immer, eine schnelle Lösung für unsere Kunden in der Region Biel zu finden."
      },
      {
        "question": "Gibt es eine Kündigungsfrist für regelmässige Reinigungsverträge?",
        "answer": "Wir möchten, dass Sie wegen unserer Qualität bleiben, nicht wegen eines starren Vertrages. Deshalb bieten wir sehr flexible Kündigungsfristen an, in der Regel von nur einem Monat auf das Ende eines Kalendermonats. Die genauen Bedingungen halten wir transparent im Reinigungsvertrag fest."
      },
      {
        "question": "Reinigen Sie auch nach Veranstaltungen oder Events?",
        "answer": "Ja, wir bieten auch einmalige Einsätze wie die Eventreinigung an. Nach einer Hochzeit, einer Firmenfeier oder einem Jubiläum in der Region Seeland rücken wir an und bringen die gemieteten Räumlichkeiten oder das Zelt wieder in einen besenreinen, makellosen Zustand."
      }
    ]
  };
}

// Update umzugNidau
const oldUmzugNidau = data.seoPages.umzugNidau;
if (oldUmzugNidau) {
  data.seoPages.umzugNidau = {
    "meta": oldUmzugNidau.meta,
    "badge": oldUmzugNidau.badge,
    "h1": oldUmzugNidau.h1,
    "heroSubtitle": oldUmzugNidau.heroSubtitle,
    "ctaSoft": oldUmzugNidau.ctaSoft,
    "intro": "Willkommen bei SwissCleanMove – Ihrer regionalen Umzugsfirma direkt im Herzen des Seelands, mit starkem Fokus auf Nidau und die angrenzenden Gemeinden. Ein Wohnungswechsel oder eine Firmenverlegung ist ein bedeutendes Ereignis, das viel Organisation erfordert. Seit 2024 stehen wir Familien, Singles und Unternehmen in Nidau zur Seite, um diesen Schritt so reibungslos und stressfrei wie möglich zu gestalten. Egal, ob Sie in ein modernes Apartment direkt am Nidau-Büren-Kanal ziehen, Ihr Einfamilienhaus in der Umgebung wechseln oder mit Ihrem Büro neue Räumlichkeiten beziehen – wir sind Ihr kompetenter Partner. Unser erfahrenes Team aus kräftigen und sorgfältigen Zügelhelfern übernimmt die gesamte Logistik. Wir bieten faire, transparente Pauschalpreise ab CHF 490 an, stellen moderne Transportfahrzeuge zur Verfügung und inkludieren bei jedem Auftrag eine vollumfängliche Transportversicherung. Mit über 50 erfolgreich durchgeführten Umzügen in der Region kennen wir jeden Winkel von Nidau und dem umliegenden Seeland. Wir arbeiten speditiv, zuverlässig und sind oft auch sehr kurzfristig innerhalb von 24 Stunden verfügbar.",
    "sections": [
      {
        "heading": "Lokale Expertise für Ihren Umzug in Nidau",
        "body": "Nidau bietet mit seiner Nähe zum Bielersee und der historischen Altstadt eine wunderbare Lebensqualität. Die engen Gassen und speziellen Zufahrtswege erfordern jedoch bei einem Umzug oft besonderes logistisches Geschick. Als regional verankertes Unternehmen kennen wir die verkehrstechnischen Eigenheiten von Nidau genau. Wir wissen, wo ein Zügelwagen am besten geparkt wird und wie wir enge Treppenhäuser am effizientesten meistern. Sie profitieren von kurzen Anfahrtswegen und einer direkten, persönlichen Kommunikation. Bei SwissCleanMove erhalten Sie keine Standardlösungen, sondern eine massgeschneiderte Umzugsplanung, die exakt auf Ihr Objekt in Nidau abgestimmt ist."
      },
      {
        "heading": "Unsere Dienstleistungen rund um Ihren Wohnungswechsel",
        "body": "Wir bieten Ihnen ein flexibles Full-Service-Angebot, aus dem Sie genau die Leistungen wählen können, die Sie für Ihren Umzug in Nidau benötigen."
      },
      {
        "heading": "Sorgfältige Privatumzüge",
        "body": "Ihr privater Umzug ist bei uns in sicheren Händen. Unser geschultes Personal verpackt Ihre Möbel auf Wunsch in schützende Zügeldecken und Stretchfolie, transportiert sie sicher in unseren luftgefederten Fahrzeugen und stellt alles am neuen Wohnort in Nidau exakt an den gewünschten Platz. Dieser Service ist ideal für alle, die ihren Rücken schonen und den Umzug ohne Stress über die Bühne bringen möchten. Kunden vertrauen uns, weil wir mit grösstem Respekt vor ihrem persönlichen Eigentum arbeiten."
      },
      {
        "heading": "Effiziente Firmen- und Büroumzüge",
        "body": "Eine Standortverlagerung Ihres Unternehmens in Nidau muss effizient ablaufen. Wir transportieren Büroausstattung, IT-Hardware und Aktenarchive sicher und schnell. Unser Ziel ist es, die Ausfallzeiten für Ihren Betrieb auf ein absolutes Minimum zu reduzieren. Dieser Service richtet sich an lokale KMU, Praxen und Dienstleister. Geschäftskunden schätzen unsere Termintreue und die Möglichkeit, Umzüge auch am Wochenende oder am Abend durchzuführen."
      },
      {
        "heading": "Stressfreier Ein- und Auspackservice",
        "body": "Wer keine Zeit zum Kistenpacken hat, kann auf unseren professionellen Einpackservice zurückgreifen. Wir bringen das nötige Packmaterial mit und verpacken Ihr Geschirr, Bücher und Kleider bruchsicher. Am Zielort in Nidau räumen wir auf Wunsch alles wieder ein. Dies ist die perfekte Lösung für vielbeschäftigte Berufstätige. Unsere Kunden lieben diesen Service, weil er den zeitaufwendigsten Teil des Umzugs komplett auslagert."
      },
      {
        "heading": "Möbelmontage durch Profis",
        "body": "Unser Team übernimmt die fachgerechte Demontage Ihrer grossen Schränke, Betten und Regale am alten Wohnort und montiert diese am neuen Zielort in Nidau wieder stabil zusammen. Wir bringen sämtliches benötigtes Werkzeug selbst mit. Dieser Service richtet sich an alle, die den Umgang mit Bauanleitungen und Werkzeug lieber den Experten überlassen wollen."
      },
      {
        "heading": "Einsatz von Möbelliften in Nidau",
        "body": "Wenn Sie in einem Gebäude ohne Lift oder mit einem sehr engen Treppenhaus wohnen, setzen wir unseren Möbellift ein. Schwere Sofas oder Kühlschränke werden so sicher über den Balkon oder das Fenster transportiert. Das schont das Treppenhaus und beschleunigt den Umzug enorm. Ideal für Wohnungen im 2. oder 3. Stock in Nidau."
      },
      {
        "heading": "Sicherer Transport im Seeland",
        "body": "Mit unserer modernen Fahrzeugflotte (3.5t und 7.5t) garantieren wir einen sicheren Transport Ihres Hab und Guts. Jedes Fahrzeug ist speziell für den Möbeltransport ausgerüstet. Ob Sie innerhalb von Nidau umziehen, ins benachbarte Port oder ans andere Ende der Schweiz – wir bringen Ihre Sachen sicher ans Ziel. Eine Transportversicherung ist dabei immer inklusive."
      },
      {
        "heading": "Fachgerechte Möbelentsorgung",
        "body": "Ein Umzug ist der ideale Zeitpunkt, um sich von alten Möbeln oder Elektrogeräten zu trennen. Wir übernehmen die fachgerechte und umweltschonende Entsorgung direkt am Umzugstag bei den lokalen Recyclingzentren. Das erspart Ihnen mühsame Fahrten zum Werkhof und hinterlässt die alte Wohnung besenrein."
      },
      {
        "heading": "Wichtige Tipps für Ihren Umzug in Nidau (Ratgeber)",
        "body": "Vergessen Sie nicht, rechtzeitig Ihre Adressänderung bei der Gemeinde Nidau, bei der Post, Ihrer Bank und den Versicherungen zu melden. Wenn Sie in der Nähe der stark befahrenen Hauptstrassen in Nidau wohnen, ist es ratsam, frühzeitig mit uns über die Parkplatzsituation für den Zügelwagen zu sprechen. Wir können bei Bedarf Halteverbotszonen bei der Gemeinde beantragen, um am Umzugstag kurze Laufwege zu garantieren und den Verkehr nicht zu behindern."
      }
    ],
    "serviceBulletsHeading": "Ihre Vorteile mit SwissCleanMove",
    "serviceBullets": [
      "Kostenlose Besichtigung vor Ort in Nidau",
      "Transparente Pauschalpreise ab CHF 490",
      "Lokale Expertise und kurze Anfahrtswege",
      "Transportversicherung inklusive",
      "Aufbau und Abbau von Möbeln",
      "Kurzfristige Einsätze möglich"
    ],
    "trustPoints": oldUmzugNidau.trustPoints || ["Lokal in Nidau", "Faire Preise", "Versichert"],
    "ctaMidHeading": oldUmzugNidau.ctaMidHeading,
    "ctaMidBody": oldUmzugNidau.ctaMidBody,
    "ctaMid": oldUmzugNidau.ctaMid,
    "serviceAreaHeading": "Unser Einsatzgebiet rund um Nidau",
    "serviceAreaBody": "Wir sind als lokale Umzugsfirma im gesamten Seeland für Sie da. Unser Kerngebiet umfasst Nidau, Port, Brügg, Aegerten, Biel/Bienne, Ipsach und Bellmund. Aber auch Umzüge von Nidau in andere Schweizer Kantone führen wir mit der gleichen Zuverlässigkeit und Sorgfalt durch.",
    "internalLinksHeading": oldUmzugNidau.internalLinksHeading,
    "internalLinks": oldUmzugNidau.internalLinks,
    "ctaStrongHeading": oldUmzugNidau.ctaStrongHeading,
    "ctaStrongBody": oldUmzugNidau.ctaStrongBody,
    "ctaStrong": oldUmzugNidau.ctaStrong,
    "testimonial": oldUmzugNidau.testimonial || { "quote": "Toller Umzugsservice in Nidau! Schnell, freundlich und sehr sorgfältig mit unseren Möbeln.", "author": "Sophie M.", "trust": "Zufriedene Kundin aus Nidau" },
    "faqs": [
      {
        "question": "Was kostet ein Umzug in Nidau?",
        "answer": "Die Umzugskosten hängen von Faktoren wie der Wohnungsgrösse und der Menge der Möbel ab. Bei SwissCleanMove bieten wir faire Pauschalpreise ab CHF 490, die bereits den Zügelwagen, 2-4 erfahrene Helfer und die Transportversicherung beinhalten. Wir besichtigen Ihre Wohnung in Nidau kostenlos und erstellen Ihnen daraufhin eine verbindliche Offerte."
      },
      {
        "question": "Sind meine Möbel beim Transport in Nidau versichert?",
        "answer": "Ja, absolut. Jeder von uns durchgeführte Umzug ist durch eine umfassende Transport- und Betriebshaftpflichtversicherung gedeckt. Ihre Möbel, Elektronik und auch das Treppenhaus sind während des gesamten Umzugsprozesses in Nidau optimal geschützt."
      },
      {
        "question": "Können Sie auch sehr schwere Gegenstände transportieren?",
        "answer": "Ja, der Transport von schweren Gegenständen wie Klavieren, grossen Massivholztischen oder Tresoren gehört zu unseren Dienstleistungen. Bitte informieren Sie uns im Voraus über besonders schwere Objekte, damit wir gegebenenfalls unseren Möbellift oder spezielles Tragegeschirr einplanen können."
      },
      {
        "question": "Organisieren Sie die Parkplätze für den Zügelwagen in Nidau?",
        "answer": "Wenn vor Ihrem alten oder neuen Wohnort in Nidau keine geeigneten Parkplätze zur Verfügung stehen, übernehmen wir gerne die Organisation. Wir beantragen bei der Gemeinde rechtzeitig ein temporäres Halteverbot, damit der Umzugswagen sicher und nah am Gebäude parkiert werden kann."
      },
      {
        "question": "Wie kurzfristig können Sie einen Umzug in Nidau durchführen?",
        "answer": "Durch unsere lokale Nähe zu Nidau sind wir sehr flexibel. In Notfällen oder bei unerwarteten Terminänderungen können wir oft innerhalb von 24 bis 48 Stunden einspringen. Kontaktieren Sie uns telefonisch, um die aktuellen Kapazitäten zu prüfen."
      },
      {
        "question": "Bringen Sie das Verpackungsmaterial selbst mit?",
        "answer": "Ja, wir können Ihnen hochwertiges Verpackungsmaterial wie Umzugskartons, Kleiderboxen, Luftpolsterfolie und Klebeband zur Verfügung stellen. Entweder liefern wir dieses im Vorfeld, damit Sie selbst packen können, oder wir bringen es am Umzugstag mit, wenn Sie unseren Einpackservice gebucht haben."
      },
      {
        "question": "Ist die Endreinigung der Wohnung ebenfalls buchbar?",
        "answer": "Selbstverständlich. Als Full-Service-Agentur bieten wir Ihnen neben dem Umzug auch die professionelle Endreinigung mit Abnahmegarantie in Nidau an. Viele Kunden buchen beides zusammen, um den Wohnungswechsel so stressfrei wie möglich zu gestalten und von Kombi-Rabatten zu profitieren."
      },
      {
        "question": "Wie gross sind Ihre Zügelwagen?",
        "answer": "Wir verfügen über eine vielseitige Flotte. Für kleinere Wohnungen oder schwer zugängliche Strassen in Nidau nutzen wir wendige 3.5-Tonnen-Wagen. Für grössere Einfamilienhäuser oder Firmenumzüge setzen wir unsere geräumigen 7.5-Tonnen-LKW ein, um die Anzahl der Fahrten zu minimieren."
      },
      {
        "question": "Bauen Sie auch meine Möbel in Nidau ab und wieder auf?",
        "answer": "Ja, die Demontage und Montage von Möbeln ist ein Standardbestandteil unserer Dienstleistungen. Unsere Mitarbeiter haben das nötige Werkzeug dabei und bauen Ihre Schränke, Betten und Regale fachgerecht ab und am neuen Ort wieder stabil auf."
      },
      {
        "question": "Kann ich nicht mehr benötigte Möbel von Ihnen entsorgen lassen?",
        "answer": "Ja, wir nehmen alte Möbel, Matratzen oder defekte Haushaltsgeräte direkt am Umzugstag mit und entsorgen diese fachgerecht im lokalen Recyclinghof in der Region Nidau/Biel. So sparen Sie sich einen zusätzlichen Aufwand."
      }
    ]
  };
}

fs.writeFileSync(dePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated reinigungBiel and umzugNidau in messages/de.json');
