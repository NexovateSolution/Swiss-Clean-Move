const fs = require('fs');
const path = require('path');

const dePath = path.join(__dirname, 'messages', 'de.json');
const data = JSON.parse(fs.readFileSync(dePath, 'utf8'));

// 1. reinigungLyss (Template A)
const oldReinigungLyss = data.seoPages.reinigungLyss;
if (oldReinigungLyss) {
  data.seoPages.reinigungLyss = {
    "meta": oldReinigungLyss.meta,
    "badge": oldReinigungLyss.badge,
    "h1": oldReinigungLyss.h1,
    "heroSubtitle": oldReinigungLyss.heroSubtitle,
    "ctaSoft": oldReinigungLyss.ctaSoft,
    "intro": "Eine saubere und gepflegte Umgebung trägt massgeblich zu unserem Wohlbefinden bei. Ob zu Hause in Lyss oder am Arbeitsplatz – Sauberkeit ist das Aushängeschild jedes Gebäudes. SwissCleanMove ist Ihr verlässlicher, lokaler Partner für professionelle Reinigungsdienstleistungen in Lyss und der gesamten Region Seeland. Unser engagiertes Team unterstützt Privathaushalte, Unternehmen und Hausverwaltungen mit massgeschneiderten Reinigungslösungen. Wir setzen auf Diskretion, Zuverlässigkeit und höchste Schweizer Qualitätsstandards. Von der wöchentlichen Wohnungsreinigung über die tägliche Unterhaltsreinigung in Büros bis hin zur anspruchsvollen Bau- und Fensterreinigung – wir übernehmen die schwere Arbeit für Sie. Bei uns gibt es keine versteckten Kosten: Sie profitieren von transparenten Pauschal- oder fairen Stundenpreisen. Dank unserer lokalen Verankerung im Seeland sind wir schnell vor Ort, extrem flexibel und können auch auf kurzfristige Anfragen (oft innerhalb von 24 Stunden) reagieren. Lehnen Sie sich zurück und geniessen Sie mehr Freizeit – wir sorgen für makellose Sauberkeit.",
    "sections": [
      {
        "heading": "Warum SwissCleanMove die beste Wahl für Lyss ist",
        "body": "Die Auswahl an Reinigungsfirmen ist gross, doch oft mangelt es an Beständigkeit und Transparenz. Wir bei SwissCleanMove arbeiten anders. Wir sind lokal in der Region verwurzelt und betreuen unsere Kunden in Lyss persönlich und direkt. Bei uns erhalten Sie eine feste, vertraute Reinigungskraft, die Ihre Räumlichkeiten und Ihre individuellen Wünsche genau kennt. Das ständige Einlernen von neuem Personal entfällt. Zudem legen wir grossen Wert auf Nachhaltigkeit: Unsere Fachkräfte verwenden umweltfreundliche, schonende Reinigungsmittel, die effektiv gegen Schmutz wirken, aber Ihre Möbel, Böden und die Umwelt schützen. Durch unsere absolute Preistransparenz wissen Sie nach einer kostenlosen Besichtigung in Lyss genau, mit welchen Kosten Sie rechnen müssen – ohne versteckte Gebühren oder starre Knebelverträge."
      },
      {
        "heading": "Unsere Reinigungs-Dienstleistungen in der Übersicht",
        "body": "Unser Service-Portfolio ist breit gefächert, um all Ihre Reinigungsbedürfnisse aus einer Hand zu bedienen. Nachfolgend finden Sie eine detaillierte Übersicht unserer Leistungen in Lyss."
      },
      {
        "heading": "Unterhaltsreinigung für Gewerbe und Büros",
        "body": "Ein gepflegtes Büro fördert die Motivation Ihrer Mitarbeiter und hinterlässt bei Kunden in Lyss einen perfekten ersten Eindruck. Unsere Unterhaltsreinigung umfasst das Leeren der Papierkörbe, das feuchte Abwischen der Schreibtische, die hygienische Reinigung der Sanitäranlagen sowie die Pflege der Böden und der Teeküche. Wir desinfizieren Tastaturen, Türklinken und Telefone, um Krankheitserreger zu minimieren. Dieser Service richtet sich an lokale KMU, Praxen, Kanzleien und Ladenbesitzer. Geschäftskunden schätzen unsere Flexibilität, da wir die Reinigung auch früh am Morgen oder spät am Abend durchführen können, ohne den laufenden Betrieb zu stören."
      },
      {
        "heading": "Haushaltshilfe und private Wohnungsreinigung",
        "body": "Geniessen Sie Ihre Abende, anstatt zu putzen. Unsere Wohnungsreinigung nimmt Ihnen das lästige Staubsaugen, Bodenaufnehmen und die gründliche Reinigung von Bad und Küche ab. Auf Wunsch kümmern wir uns auch um Ihre Wäsche und bügeln diese direkt bei Ihnen zu Hause in Lyss. Wir vereinbaren feste Wochentage, an denen unsere vertrauenswürdige Reinigungskraft zu Ihnen kommt. Dieser Service ist ideal für Familien, Paare und Singles. Unsere Kunden sind dankbar für die gewonnene Zeit und schätzen die absolute Diskretion unserer Mitarbeiter in ihren privaten Räumen."
      },
      {
        "heading": "Streifenfreie Fenster- und Glasreinigung",
        "body": "Das Putzen von Fenstern, besonders von grossen Glasfronten oder hochgelegenen Dachfenstern, ist mühsam und teilweise gefährlich. Unsere Fensterprofis reinigen in Lyss sämtliche Fenster (innen und aussen) streifenfrei. Dabei vergessen wir auch die oft schmutzigen Fensterrahmen, Fenstersimse und Storen nicht. Dieser Service richtet sich sowohl an Privathaushalte (z.B. im Rahmen des Frühlingsputzes) als auch an Geschäfte mit grossen Schaufenstern. Kunden buchen diese Leistung, da unsere Ausrüstung und Technik schnelle, perfekte Ergebnisse garantieren, die mit herkömmlichen Haushaltsmitteln kaum zu erreichen sind."
      },
      {
        "heading": "Professionelle Baureinigung",
        "body": "Nach einem Hausbau oder einer Renovation in Lyss ist die Immobilie meist stark durch Baustaub, Farbreste und Zementrückstände verschmutzt. Wir bieten Ihnen die Grob- und Feinreinigung an, damit Sie termingerecht und ohne Verzögerung einziehen können. Unsere Spezialisten reinigen schonend neue Oberflächen, entstauben alle Ritzen und entfernen hartnäckige Bauspuren. Dieser Service richtet sich an Bauherren, Architekten und private Eigentümer. Die Beauftragung von SwissCleanMove stellt sicher, dass das Bauprojekt mit einer makellosen, schlüsselfertigen Übergabe abgeschlossen wird."
      },
      {
        "heading": "Liegenschaftsservice und Hauswartung",
        "body": "Wir kümmern uns um den Werterhalt ganzer Mehrfamilienhäuser in Lyss. Unser Service umfasst die regelmässige Treppenhausreinigung, die Kontrolle der Haustechnik, das Auswechseln defekter Glühbirnen und die Pflege der Aussen- und Grünanlagen (inklusive Winterdienst). Dieser Service ist perfekt für Immobilienverwaltungen und Stockwerkeigentümergemeinschaften konzipiert. Verwaltungen delegieren diese Aufgaben gerne an uns, weil wir als kompetenter Ansprechpartner vor Ort agieren und durch proaktives Handeln teure Folgeschäden an den Immobilien verhindern."
      },
      {
        "heading": "Intensive Spezialreinigungen",
        "body": "Ein- bis zweimal im Jahr empfehlen wir eine intensive Grund- oder Spezialreinigung. Wir reinigen Teppiche fasertief, polieren Parkettböden und waschen Vorhänge. Dieser Service wird in Lyss oft von Privatpersonen für den traditionellen Frühlingsputz oder von Restaurants nach der Saison gebucht. Wir setzen dafür starke Industriesauger und Einscheibenmaschinen ein, um tiefsitzenden Schmutz zu entfernen, an den Sie bei der normalen Unterhaltsreinigung nicht herankommen."
      },
      {
        "heading": "Der Ablauf unserer Reinigungs-Partnerschaft (Ratgeber)",
        "body": "Die Zusammenarbeit mit uns in Lyss ist einfach und transparent. Im ersten Schritt kontaktieren Sie uns für eine kostenlose Objektbesichtigung. Dabei besprechen wir Ihre Wünsche (z.B. wöchentliche oder tägliche Reinigung, spezieller Fokus auf bestimmte Räume) und definieren ein klares Pflichtenheft. Anschliessend erhalten Sie unsere verbindliche Offerte. Sobald wir starten, weisen wir Ihnen eine feste Reinigungskraft zu, die von uns auf Ihr Objekt eingearbeitet wird. Sollten sich Ihre Bedürfnisse ändern (z.B. wegen Urlaub oder wenn ein Zimmer temporär nicht gereinigt werden soll), können Sie uns das flexibel mitteilen. Wir verzichten bewusst auf langfristige, starre Knebelverträge, denn wir möchten, dass Sie aufgrund unserer exzellenten Dienstleistung bei uns bleiben."
      }
    ],
    "serviceBulletsHeading": "Unsere Qualitätsversprechen für Lyss",
    "serviceBullets": [
      "Persönliche, feste Reinigungskraft für Ihr Objekt",
      "Kostenlose Besichtigung und transparente Offerte",
      "Ökologisch nachhaltige Reinigungsmittel",
      "Vollständige Betriebshaftpflichtversicherung",
      "Flexible Reinigungszeiten (auch abends/wochenends)",
      "Kurze Kündigungsfristen ohne versteckte Gebühren"
    ],
    "trustPoints": oldReinigungLyss.trustPoints || ["Lokale Firma", "Feste Mitarbeiter", "Schweizer Qualität"],
    "ctaMidHeading": oldReinigungLyss.ctaMidHeading,
    "ctaMidBody": oldReinigungLyss.ctaMidBody,
    "ctaMid": oldReinigungLyss.ctaMid,
    "serviceAreaHeading": "Unterwegs in Lyss und im ganzen Seeland",
    "serviceAreaBody": "Als Reinigungsfirma mit starken Wurzeln im Seeland sind wir täglich in Lyss im Einsatz. Wir betreuen nicht nur das Zentrum von Lyss, sondern auch umliegende Gemeinden wie Aarberg, Worben, Kappelen, Busswil und Studen. Unsere lokale Präsenz garantiert Ihnen in Notfällen schnelle Hilfe (z.B. bei einem kleinen Wasserschaden) und sichert ab, dass wir Termine stets pünktlich wahrnehmen, ohne im langen Pendelverkehr festzustecken.",
    "internalLinksHeading": oldReinigungLyss.internalLinksHeading,
    "internalLinks": oldReinigungLyss.internalLinks,
    "ctaStrongHeading": oldReinigungLyss.ctaStrongHeading,
    "ctaStrongBody": oldReinigungLyss.ctaStrongBody,
    "ctaStrong": oldReinigungLyss.ctaStrong,
    "testimonial": oldReinigungLyss.testimonial || { "quote": "Endlich eine Reinigungsfirma in Lyss, auf die man sich verlassen kann. Unsere Haushaltshilfe ist fantastisch.", "author": "Claudia R.", "trust": "Stammkundin" },
    "faqs": [
      {
        "question": "Bieten Sie Reinigungen für Privat und Gewerbe in Lyss an?",
        "answer": "Ja, unser Angebot richtet sich an beide Bereiche. Wir stellen Privathaushalten in Lyss zuverlässige Haushaltshilfen zur Verfügung und übernehmen für Gewerbekunden (Büros, Ladenlokale, Praxen) die professionelle tägliche oder wöchentliche Unterhaltsreinigung."
      },
      {
        "question": "Muss ich mich um die Reinigungsmittel kümmern?",
        "answer": "Das bleibt Ihnen überlassen. Bei privaten Wohnungsreinigungen in Lyss nutzen wir oft die Mittel des Kunden. Auf Wunsch (und standardmässig bei Büro- und Spezialreinigungen) bringen wir jedoch unsere eigenen, professionellen und umweltfreundlichen Reinigungsmittel sowie Maschinen mit."
      },
      {
        "question": "Ist meine Wohnung / mein Büro in Lyss gegen Schäden versichert?",
        "answer": "Absolut. SwissCleanMove ist im Besitz einer vollumfänglichen Betriebshaftpflichtversicherung. Sollte unserer Reinigungskraft trotz grösster Vorsicht ein Fehler unterlaufen (z.B. ein Kratzer auf dem Parkett oder ein umgestossener Gegenstand), sind Sie finanziell zu 100% abgesichert."
      },
      {
        "question": "Werde ich immer von derselben Person betreut?",
        "answer": "Ja, das ist unser Prinzip. Sie erhalten für Ihre regelmässigen Reinigungen in Lyss eine feste Bezugsperson. Das schafft Vertrauen und sorgt dafür, dass die Reinigungskraft die speziellen Anforderungen Ihres Objekts im Schlaf kennt."
      },
      {
        "question": "Sind Ihre Mitarbeiter fest angestellt oder Freelancer?",
        "answer": "Wir distanzieren uns von Schwarzarbeit und Tagelöhner-Strukturen. Alle unsere Reinigungskräfte sind fest bei SwissCleanMove angestellt, werden fair entlöhnt und wir führen sämtliche gesetzlichen Sozialversicherungsbeiträge (AHV, IV, etc.) für sie ab."
      },
      {
        "question": "Was passiert bei Urlaub oder Krankheit meiner Reinigungskraft?",
        "answer": "Sollte Ihre reguläre Reinigungskraft in Lyss ausfallen, informieren wir Sie frühzeitig. Wenn Sie es wünschen, organisieren wir umgehend eine qualifizierte und ebenfalls fest angestellte Vertretung, die dank unseres detaillierten Pflichtenhefts genau weiss, was zu tun ist."
      },
      {
        "question": "Können die Büroreinigungen nach Geschäftsschluss stattfinden?",
        "answer": "Ja. Um den Arbeitsfluss in Ihrem Unternehmen in Lyss nicht zu stören, sind unsere Reinigungsteams flexibel einsetzbar. Wir reinigen gerne früh morgens vor Bürobeginn, am Abend nach Feierabend oder sogar am Wochenende."
      },
      {
        "question": "Gibt es langfristige Vertragsbindungen?",
        "answer": "Nein, wir setzen auf Zufriedenheit statt auf Zwang. Unsere Reinigungsverträge für Lyss haben in der Regel eine sehr kundenfreundliche Kündigungsfrist von nur einem Monat auf das Ende eines Monats."
      },
      {
        "question": "Reinigen Sie auch schwer erreichbare Schaufenster oder Wintergärten?",
        "answer": "Ja, unsere Fensterspezialisten verfügen über das nötige Fachwissen, Verlängerungsstangen und sichere Leitern, um auch anspruchsvolle Glasflächen, Dachfenster oder grosse Schaufenster in Lyss absolut streifenfrei zu reinigen."
      },
      {
        "question": "Führen Sie auch Event- oder Baureinigungen in Lyss durch?",
        "answer": "Ja, wir übernehmen auch einmalige Sondereinsätze. Egal, ob Sie eine umfassende Baufeinreinigung nach einer Hausrenovation benötigen oder Ihre gemietete Location nach einer grossen Feierlichkeit wieder besenrein übergeben wollen – wir sind für Sie da."
      }
    ]
  };
}

// 2. umzugBruegg (Template B)
const oldUmzugBruegg = data.seoPages.umzugBruegg;
if (oldUmzugBruegg) {
  data.seoPages.umzugBruegg = {
    "meta": oldUmzugBruegg.meta,
    "badge": oldUmzugBruegg.badge,
    "h1": oldUmzugBruegg.h1,
    "heroSubtitle": oldUmzugBruegg.heroSubtitle,
    "ctaSoft": oldUmzugBruegg.ctaSoft,
    "intro": "Planen Sie einen Umzug in, nach oder von Brügg? Ein Ortswechsel erfordert viel Zeit, Kraft und logistisches Geschick. Als Ihre lokale Umzugsfirma aus dem Seeland steht Ihnen SwissCleanMove bei jedem Schritt zur Seite. Wir bieten Ihnen professionelle Umzüge für private Haushalte und Firmen – zuverlässig, sorgfältig und zu absolut fairen Preisen. Wir kennen die Region Brügg und das gesamte Seeland bestens und gewährleisten dadurch kurze Anfahrtswege und eine effiziente Durchführung. Versteckte Kosten gibt es bei uns nicht: Sie erhalten transparente Pauschalpreise ab CHF 490, die bereits den Zügelwagen (3.5t oder 7.5t), 2 bis 4 erfahrene Zügelhelfer und eine vollumfängliche Transportversicherung beinhalten. Ganz gleich, ob Sie ein Einfamilienhaus räumen, eine kleine Wohnung wechseln oder mit Ihrem Büro umziehen – wir bringen Ihr Hab und Gut sicher ans Ziel. Wir sind nicht nur erfahren, sondern auch ausserordentlich flexibel: Bei dringendem Bedarf können wir in Brügg oft schon innerhalb von 24 Stunden für Sie im Einsatz sein.",
    "sections": [
      {
        "heading": "Professioneller Umzugsservice in Brügg",
        "body": "Brügg mit seiner charmanten Lage an der Aare ist ein beliebter Wohn- und Arbeitsort im Seeland. Als regionales Unternehmen wissen wir, dass jeder Umzug in Brügg seine eigenen Herausforderungen mit sich bringt – von schmalen Quartierstrassen bis hin zu Neubauten. Wir bieten Ihnen eine persönliche und kostenlose Beratung vor Ort an, um den genauen Umfang Ihres Umzugs zu erfassen. Darauf basierend erstellen wir eine verbindliche Pauschalofferte, sodass Sie Ihr Umzugsbudget exakt planen können. Wir setzen ausschliesslich fest angestellte, geschulte Zügelhelfer ein, die täglich wertvolles Mobiliar sicher verpacken, transportieren und montieren. Unser Ziel ist es, Ihnen den kompletten Umzugsstress abzunehmen."
      },
      {
        "heading": "Für wen wir in Brügg arbeiten",
        "body": "Unser Service richtet sich an ein breites Publikum. Wir unterstützen junge Familien beim Einzug ins Eigenheim, Senioren beim Wechsel in eine barrierefreie Wohnung, Singles beim Umzug in die Stadt sowie lokale Unternehmen in Brügg bei der Relocation ihrer Büroräumlichkeiten. Wir haben für jedes Bedürfnis die passende Lösung."
      },
      {
        "heading": "Sorgfältige Privatumzüge",
        "body": "Ein Privatumzug ist oft emotional. Wir transportieren Ihre Möbel, Kartons und persönlichen Gegenstände mit grösster Sorgfalt. Unsere Mitarbeiter nutzen professionelles Schutzmaterial (Zügeldecken, Folien) und sichern die Ladung im LKW fachgerecht. Egal, ob Sie innerhalb von Brügg umziehen oder in einen anderen Kanton – wir sorgen dafür, dass alles unbeschadet ankommt. Kunden wählen uns, weil wir zuverlässig sind und ihnen den Rücken (im wahrsten Sinne des Wortes) freihalten."
      },
      {
        "heading": "Gewerbe- und Firmenumzüge",
        "body": "Bei einem Firmenumzug in Brügg ist Zeit Geld. Wir planen die Verlagerung Ihrer Büros präzise, um Ausfallzeiten minimal zu halten. Der sichere Transport von schweren Aktenschränken, IT-Geräten und sensiblen Datenarchiven gehört zu unserem Alltag. Wir bieten Firmenkunden auch Wochenend-Termine an. Dieser Service ist perfekt für KMU, da wir den Umzug so strukturieren, dass der Betrieb am Montag reibungslos am neuen Standort weitergehen kann."
      },
      {
        "heading": "Professioneller Ein- und Auspackservice",
        "body": "Das Verpacken von Büchern, Kleidern und empfindlichem Geschirr kostet enorm viel Zeit. Wenn Sie diese Zeit nicht haben, übernehmen unsere Spezialisten das Einpacken für Sie in Brügg. Wir bringen professionelle Umzugskartons, Seidenpapier und Luftpolsterfolie mit. Am Zielort räumen wir auf Wunsch auch wieder alles ein. Kunden buchen diesen Service, weil er den Umzugsstress vor dem eigentlichen Zügeltag fast komplett eliminiert."
      },
      {
        "heading": "Möbelmontage durch unsere Handwerker",
        "body": "Moderne Schränke und Regalsysteme lassen sich meistens nicht im Ganzen transportieren. Wir übernehmen die fachgerechte Demontage am Auszugsort und den stabilen Aufbau am neuen Standort in Brügg. Das nötige Werkzeug haben wir stets dabei. Dieser Service richtet sich an Kunden, die sich den Ärger mit verlorenen Schrauben und komplizierten Anleitungen ersparen wollen."
      },
      {
        "heading": "Möbellifteinsatz in Brügg",
        "body": "In Häusern ohne Lift oder mit verwinkelten Treppenhäusern in Brügg stösst reines Tragen an seine Grenzen. Hier setzen wir unseren Aussenaufzug (Möbellift) ein, um schwere Sofas, Kühlschränke oder Schränke direkt über den Balkon oder das Fenster zu transportieren. Das schont Ihre Möbel und das Treppenhaus der Immobilie massgeblich."
      },
      {
        "heading": "Entsorgung und Räumung",
        "body": "Alte Möbel und defekte Geräte, die nicht mit in die neue Wohnung sollen, nehmen wir am Umzugstag gleich mit und entsorgen diese fachmännisch beim lokalen Werkhof in der Region Brügg. Dieser Service ist extrem praktisch für Kunden, die sich verkleinern oder Altlasten bequem und ohne eigenen Transporter loswerden möchten."
      },
      {
        "heading": "Kundenbetreuung und Vorbereitungstipps (Ratgeber)",
        "body": "Um Ihren Umzug in Brügg reibungslos zu gestalten, empfehlen wir, Umzugskartons nie zu schwer zu bepacken – schwere Gegenstände wie Bücher gehören in kleinere Boxen, leichte Dinge in grosse. Beschriften Sie die Kartons nicht nur auf dem Deckel, sondern auch seitlich mit dem Zielraum (z.B. \"Wohnzimmer\"). Klären Sie frühzeitig, ob am Auszugs- und Einzugsort ausreichend Parkraum für unseren Zügelwagen vorhanden ist. Sollte dies in einer engen Strasse in Brügg ein Problem sein, informieren Sie uns rechtzeitig, damit wir bei der zuständigen Gemeinde ein offizielles Halteverbot organisieren können."
      }
    ],
    "serviceBulletsHeading": "Ihre Vorteile bei Umzügen in Brügg",
    "serviceBullets": [
      "Transparente Pauschalpreise ab CHF 490 (keine versteckten Kosten)",
      "Vollständige Transport- und Betriebshaftpflichtversicherung",
      "Kostenlose, unverbindliche Objektbesichtigung vor Ort",
      "Erfahrene, kräftige und freundliche Zügelmänner",
      "Demontage, Montage und Einpackservice verfügbar",
      "Moderne 3.5t und 7.5t Zügel-Fahrzeuge"
    ],
    "trustPoints": oldUmzugBruegg.trustPoints || ["Fixpreise", "Versichert", "Lokal in Brügg"],
    "ctaMidHeading": oldUmzugBruegg.ctaMidHeading,
    "ctaMidBody": oldUmzugBruegg.ctaMidBody,
    "ctaMid": oldUmzugBruegg.ctaMid,
    "serviceAreaHeading": "Unser regionales Einsatzgebiet im Seeland",
    "serviceAreaBody": "Wir sind als lokales Umzugsunternehmen stark im Seeland vertreten. Brügg gehört zu unserem direkten Kerngebiet. Wir führen wöchentlich Umzüge in Brügg, Biel/Bienne, Nidau, Port, Aegerten und Orpund durch. Dank unserer Nähe garantieren wir kurze Anfahrtswege, hohe Pünktlichkeit und die Möglichkeit, bei Notfällen auch extrem kurzfristig einzuspringen.",
    "internalLinksHeading": oldUmzugBruegg.internalLinksHeading,
    "internalLinks": oldUmzugBruegg.internalLinks,
    "ctaStrongHeading": oldUmzugBruegg.ctaStrongHeading,
    "ctaStrongBody": oldUmzugBruegg.ctaStrongBody,
    "ctaStrong": oldUmzugBruegg.ctaStrong,
    "testimonial": oldUmzugBruegg.testimonial || { "quote": "Ein wirklich stressfreier Umzug in Brügg. Die Helfer waren pünktlich, schnell und sehr achtsam.", "author": "Stefan L.", "trust": "Zufriedener Kunde" },
    "faqs": [
      {
        "question": "Was kostet ein Umzug in Brügg?",
        "answer": "Wir arbeiten mit fairen und transparenten Pauschalpreisen ab CHF 490. Die genauen Kosten hängen von der Grösse Ihrer Wohnung, dem Transportvolumen und allfälligen Zusatzleistungen ab. Nach einer kostenlosen Besichtigung Ihres Objekts in Brügg erhalten Sie von uns eine verbindliche Fixpreis-Offerte."
      },
      {
        "question": "Sind meine Sachen während des Umzugs versichert?",
        "answer": "Ja, absolut. Jeder von SwissCleanMove durchgeführte Umzug ist durch eine umfassende Transport- und Betriebshaftpflichtversicherung vollumfänglich geschützt. Egal ob ein Möbelstück Schaden nimmt oder ein Kratzer im Treppenhaus in Brügg entsteht, wir übernehmen die volle Haftung."
      },
      {
        "question": "Wie gross sind die Zügelwagen, die Sie in Brügg einsetzen?",
        "answer": "Unsere Flotte besteht aus modernen und luftgefederten Fahrzeugen verschiedener Grössen. Wir setzen wendige 3.5-Tonnen-Transporter für kleine Quartierstrassen in Brügg ein und grosse 7.5-Tonnen-LKW für geräumige Einfamilienhäuser oder Firmenumzüge."
      },
      {
        "question": "Demontieren und montieren Sie meine Möbel?",
        "answer": "Ja, der fachgerechte Abbau von grossen Möbelstücken (wie z.B. Schiebetürenschränken, Betten, Regalen) am Auszugsort und der anschliessende Wiederaufbau am neuen Wohnort in Brügg gehören zu unseren täglichen Routinen. Das nötige Werkzeug bringen wir selbstverständlich mit."
      },
      {
        "question": "Kann ich in Brügg auch Umzugskartons bei Ihnen beziehen?",
        "answer": "Ja, wir können Ihnen im Vorfeld stabile Umzugskartons, Kleiderboxen, Seidenpapier für Geschirr und Luftpolsterfolie direkt nach Brügg liefern. Sie können entscheiden, ob Sie das Material kaufen oder (bei Kartons) für den Umzug mieten möchten."
      },
      {
        "question": "Werden auch Halteverbotszonen in Brügg von Ihnen organisiert?",
        "answer": "Wenn vor Ihrem alten oder neuen Wohnort in Brügg nicht ausreichend Parkfläche für unseren Zügelwagen vorhanden ist, kümmern wir uns auf Wunsch gerne um die Beantragung eines offiziellen Halteverbots bei der Gemeinde und das Aufstellen der entsprechenden Verkehrsschilder."
      },
      {
        "question": "Führen Sie Umzüge auch am Wochenende durch?",
        "answer": "Ja, wir wissen, dass viele Menschen unter der Woche wenig Zeit haben. Deshalb sind wir auf Voranmeldung auch freitags und samstags für Umzüge in Brügg im Einsatz. Wir empfehlen für Wochenendtermine jedoch eine möglichst frühzeitige Reservierung."
      },
      {
        "question": "Kann ich die Endreinigung meiner alten Wohnung ebenfalls bei Ihnen buchen?",
        "answer": "Selbstverständlich. Als Full-Service-Agentur bieten wir Ihnen auch die professionelle Endreinigung mit 100% Abnahmegarantie an. Kunden, die Umzug und Reinigung in Brügg bei uns bündeln, profitieren von einem stressfreien Ablauf aus einer Hand und einem Kombi-Rabatt."
      },
      {
        "question": "Entsorgen Sie alte Möbel direkt am Umzugstag?",
        "answer": "Ja, wenn Sie beim Umzug ausmisten, nehmen wir unerwünschte Möbel, Sperrgut oder alte Matratzen am Umzugstag mit und entsorgen diese fachgerecht und umweltfreundlich auf dem lokalen Werkhof in der Region Brügg."
      },
      {
        "question": "Wie lange dauert ein durchschnittlicher Wohnungsumzug in Brügg?",
        "answer": "Die Dauer hängt vom Volumen ab. Der Umzug einer Standard-3.5-Zimmer-Wohnung innerhalb des Seelands ist meistens in weniger als einem Arbeitstag erledigt. Wir fangen früh an, damit Sie am späten Nachmittag in Ihrem neuen Zuhause in Brügg entspannen können."
      }
    ]
  };
}

// 3. endreinigungBruegg (Template C)
const oldEndreinigungBruegg = data.seoPages.endreinigungBruegg;
if (oldEndreinigungBruegg) {
  data.seoPages.endreinigungBruegg = {
    "meta": oldEndreinigungBruegg.meta,
    "badge": oldEndreinigungBruegg.badge,
    "h1": oldEndreinigungBruegg.h1,
    "heroSubtitle": oldEndreinigungBruegg.heroSubtitle,
    "ctaSoft": oldEndreinigungBruegg.ctaSoft,
    "intro": "Ein Auszug ist anstrengend genug – überlassen Sie die nervenaufreibende Wohnungsreinigung den Profis von SwissCleanMove. Wir sind Ihr regionaler Spezialist für Endreinigungen mit 100% Abnahmegarantie in Brügg und dem gesamten Seeland. Die Anforderungen der Schweizer Immobilienverwaltungen bei der Wohnungsübergabe sind extrem hoch. Ein übersehener Fleck im Backofen oder verkalkte Duschfugen können schnell zur Blockierung Ihrer Kaution führen. Mit unserer Abnahmegarantie sind Sie auf der sicheren Seite: Wir reinigen Ihr Objekt tiefgründig und garantieren, dass es bei der Verwaltung anstandslos abgenommen wird. Findet die Verwaltung doch einen kleinen Mangel, reinigen wir sofort vor Ort kostenlos nach. Wir bieten Ihnen absolute Kostensicherheit durch feste Pauschalpreise ab CHF 350. Es gibt keine versteckten Stundenlöhne oder Anfahrtskosten. Eine typische Wohnung ist durch unser eingespieltes Team in 4 bis 8 Stunden blitzsauber. Dank unserer starken lokalen Präsenz in Brügg können wir bei Notfällen auch kurzfristig (oft innert 24h) einspringen.",
    "sections": [
      {
        "heading": "Reinigungslösungen für einen reibungslosen Auszug in Brügg",
        "body": "Brügg verfügt über zahlreiche Mietwohnungen und Gewerbeobjekte. Als lokal ansässige Reinigungsfirma kennen wir die spezifischen Anforderungen der Hausverwaltungen in dieser Region genau. Wir arbeiten nach einem strengen, standardisierten Pflichtenheft, das jeden Raum und jedes Detail abdeckt. Vorab führen wir gerne eine kostenlose Besichtigung in Brügg durch, um Ihnen einen verbindlichen Pauschalpreis zu garantieren. Unser Team bringt sämtliches professionelles Equipment sowie umweltfreundliche, aber hochwirksame Reinigungsmittel mit. Wir übergeben Ihre alte Wohnung in einem Zustand, der Vermieter und Nachmieter gleichermassen begeistert."
      },
      {
        "heading": "Die am häufigsten nachgefragten Leistungen bei der Endreinigung",
        "body": "Eine Endreinigung mit Abnahmegarantie ist ein Komplettpaket. Entdecken Sie, welche Bereiche wir in Brügg besonders intensiv bearbeiten, um eine erfolgreiche Übergabe zu gewährleisten."
      },
      {
        "heading": "Küchen-Tiefenreinigung",
        "body": "Die Küche ist der anspruchsvollste Raum bei jeder Abnahme. Wir reinigen sämtliche Schränke (innen und aussen), entfetten den Dampfabzug und waschen den Filter, reinigen den Backofen und Kochfelder intensiv und entkalken die Spüle. Auch der Kühlschrank wird abgetaut, ausgewaschen und desinfiziert. Dieser Service richtet sich an jeden Mieter in Brügg. Kunden vertrauen auf unsere starken Spezialreiniger, die selbst eingebrannte Rückstände im Backofen mühelos beseitigen."
      },
      {
        "heading": "Badezimmer und Sanitärbereiche",
        "body": "Kalk ist in vielen Regionen ein grosses Problem. Wir entkalken Armaturen, Duschkabinen, Badewannen und Waschbecken bis tief in die Fugen. Toiletten werden hygienisch gereinigt und desinfiziert. Abluftgitter, Spiegel und Badezimmerschränke werden staub- und streifenfrei geputzt. Dieser Service garantiert, dass die Hygiene bei der Abnahme in Brügg nicht bemängelt wird. Kunden schätzen, dass wir Kalkränder entfernen, ohne die empfindlichen Armaturen zu zerkratzen."
      },
      {
        "heading": "Professionelle Fensterreinigung",
        "body": "Eine klare Sicht ist ein Muss. Wir reinigen in Brügg sämtliche Fenster (innen und aussen) streifenfrei. Besonders wichtig bei der Abnahme: Wir putzen auch die Fensterrahmen, die verschmutzten Fensterfälze sowie die Storen, Rollläden und Jalousien intensiv. Dieser Service richtet sich an alle, die sich die gefährliche Arbeit auf Leitern ersparen wollen."
      },
      {
        "heading": "Boden- und Teppichpflege",
        "body": "Jeder Boden verlangt andere Reinigungsmittel. Wir saugen alle Böden gründlich, befreien Fussleisten von Staub und wischen Fliesen, Parkett oder Laminat nebelfeucht oder feucht auf. Bei Teppichen entfernen wir Flecken professionell. Dieser Service ist entscheidend, da der Bodenbelag in Brügg beim Betreten der Wohnung als Erstes begutachtet wird. Kunden wählen uns für unsere materialgerechte Pflege."
      },
      {
        "heading": "Wände, Türen und Decken entstauben",
        "body": "Spinnweben oder Staubansammlungen an den Wänden werden oft vergessen. Wir entstauben Wände, Decken und reinigen sämtliche Türrahmen, Türklinken sowie Lichtschalter und Steckdosen feucht. Heizkörper werden ebenfalls von angesammeltem Staub befreit. Dieser Service richtet sich an Mieter, die in der Wohnung gelebt haben und alle Gebrauchsspuren in Brügg beseitigen wollen."
      },
      {
        "heading": "Nebenräume, Balkon und Keller",
        "body": "Wir fegen und wischen den Balkon, reinigen das Balkongeländer und übergeben auch Nebenräume wie Kellerabteile, Estriche oder Garagen in Brügg besenrein und frei von Spinnweben. Dieser Service ist enorm hilfreich, da diese Räume am Schluss oft vergessen gehen, von der Verwaltung jedoch mitgeprüft werden."
      },
      {
        "heading": "Warum professionelle Reinigung die Kaution sichert (Ratgeber)",
        "body": "Viele Mieter in Brügg unterschätzen die Anforderungen der Schweizer Immobilienverwaltungen bei der Wohnungsübergabe. Ein selbst durchgeführter Putztag reicht oft nicht aus, um eingebranntes Fett im Backofen oder hartnäckigen Kalk im Bad restlos zu entfernen. Die Verwaltungen rufen in solchen Fällen eine professionelle Reinigungsfirma an, was Ihnen nachträglich von der Kaution (meist zu sehr hohen Regiepreisen) abgezogen wird. Mit SwissCleanMove umgehen Sie dieses finanzielle Risiko komplett. Durch unsere vertragliche 100% Abnahmegarantie wissen Sie genau, dass die Pauschalkosten der Reinigung die einzige Investition sind, die Sie tätigen müssen. Wir empfehlen unseren Kunden, die Wohnung vor unserem Eintreffen vollständig zu leeren und allfällige kleine Mieter-Reparaturen (wie das Auswechseln kaputter Glühbirnen) bereits vorab zu erledigen."
      }
    ],
    "serviceBulletsHeading": "Ihre Vorteile mit SwissCleanMove",
    "serviceBullets": [
      "Schriftlich garantierte Wohnungsabnahme",
      "Kostenlose Nachreinigung bei Mängeln",
      "Transparente, fixe Pauschalpreise ab CHF 350",
      "Sämtliche Putzmittel und Geräte inklusive",
      "Lokale Verankerung und kurzfristig in Brügg verfügbar",
      "Auf Wunsch Anwesenheit bei der Übergabe"
    ],
    "trustPoints": oldEndreinigungBruegg.trustPoints || ["100% Abnahmegarantie", "Kaution zurück", "Lokal in Brügg"],
    "ctaMidHeading": oldEndreinigungBruegg.ctaMidHeading,
    "ctaMidBody": oldEndreinigungBruegg.ctaMidBody,
    "ctaMid": oldEndreinigungBruegg.ctaMid,
    "serviceAreaHeading": "Unser regionales Einsatzgebiet",
    "serviceAreaBody": "Wir sind als lokales Reinigungsunternehmen stark in der Region Seeland verankert. Unser Einzugsgebiet umfasst primär Brügg, Biel/Bienne, Nidau, Aegerten, Orpund, Port und Studen. Diese geografische Nähe zu Brügg bedeutet für Sie, dass wir pünktlich vor Ort sind, keine langen Anfahrtswege berechnen und bei Bedarf sehr kurzfristig reagieren können.",
    "internalLinksHeading": oldEndreinigungBruegg.internalLinksHeading,
    "internalLinks": oldEndreinigungBruegg.internalLinks,
    "ctaStrongHeading": oldEndreinigungBruegg.ctaStrongHeading,
    "ctaStrongBody": oldEndreinigungBruegg.ctaStrongBody,
    "ctaStrong": oldEndreinigungBruegg.ctaStrong,
    "testimonial": oldEndreinigungBruegg.testimonial || { "quote": "Die Endreinigung in Brügg war sensationell. Die Verwaltung hat keinen einzigen Fehler gefunden. Sehr empfehlenswert!", "author": "Nina H.", "trust": "Kunde aus Brügg" },
    "faqs": [
      {
        "question": "Was versteht man unter der 100% Abnahmegarantie in Brügg?",
        "answer": "Unsere Abnahmegarantie bedeutet, dass wir die Verantwortung für die Sauberkeit bei der Wohnungsübergabe übernehmen. Findet der Vermieter in Brügg trotz unserer gründlichen Reinigung einen Mangel (z.B. Staub auf einem Türrahmen), putzt unser anwesendes Team diesen sofort kostenlos nach, bis die Verwaltung das Abnahmeprotokoll unterschreibt."
      },
      {
        "question": "Wie hoch sind die Kosten für eine Endreinigung in Brügg?",
        "answer": "Wir arbeiten mit fixen Pauschalpreisen, sodass Sie keine bösen Überraschungen erleben. Eine kleine Wohnung reinigen wir ab CHF 350. Eine durchschnittliche 3.5-Zimmer-Wohnung kostet ab CHF 490, eine 4.5-Zimmer-Wohnung ab CHF 690. Nach einer kostenlosen Besichtigung in Brügg garantieren wir Ihnen einen genauen Fixpreis."
      },
      {
        "question": "Muss ich eigene Reinigungsmittel zur Verfügung stellen?",
        "answer": "Nein, Sie müssen die Wohnung in Brügg komplett leer hinterlassen. Wir bringen alle benötigten Reinigungsutensilien mit, einschliesslich professioneller Staubsauger, Leitern und umweltfreundlichen, aber stark wirksamen Reinigungsmitteln für Küche und Bad."
      },
      {
        "question": "Sind Fenster und Balkon im Fixpreis inbegriffen?",
        "answer": "Ja, unsere Endreinigung ist ein sorgenfreies Komplettpaket. Sämtliche Fenster (innen und aussen), Fensterrahmen, Fenstersimse, Storen und Jalousien sind im Preis inbegriffen. Ebenso fegen wir Ihren Balkon, Keller und Ihre Garage in Brügg besenrein."
      },
      {
        "question": "Muss die Wohnung in Brügg am Tag der Reinigung leer sein?",
        "answer": "Ja. Damit wir alle Böden, Wände und Fussleisten nach den hohen Schweizer Standards reinigen können, muss die Wohnung am Reinigungstag komplett von Möbeln, Hausrat und Müll befreit sein."
      },
      {
        "question": "Sind Sie bei der offiziellen Wohnungsübergabe anwesend?",
        "answer": "Ja, auf Ihren Wunsch ist ein Vertreter von SwissCleanMove bei der Wohnungsabnahme in Brügg anwesend. Dies ist ein kostenloser Service von uns. So können wir sofort eingreifen, falls die Verwaltung noch eine kleine Nachbesserung verlangt."
      },
      {
        "question": "Füllen Sie auch Dübellöcher in Brügg auf?",
        "answer": "Das Auffüllen von Bohrlöchern gehört klassischerweise zu den handwerklichen Aufgaben des Mieters. Wir können diese Arbeit jedoch gerne in Brügg für Sie übernehmen, wenn Sie uns im Vorfeld der Offertstellung darauf hinweisen (gegen einen kleinen Aufpreis)."
      },
      {
        "question": "Wie lange im Voraus sollte ich die Endreinigung reservieren?",
        "answer": "An den offiziellen Zügelterminen (insbesondere am Monatsende) sind unsere Teams schnell ausgebucht. Wir empfehlen eine Buchung 3 bis 4 Wochen im Voraus. Da wir lokal in der Region Brügg agieren, können wir in Notfällen aber oft auch innerhalb von 24 bis 48 Stunden einspringen."
      },
      {
        "question": "Bieten Sie auch Umzüge in Brügg an?",
        "answer": "Ja, SwissCleanMove ist eine professionelle Full-Service-Agentur. Wir bieten Ihnen den Umzug (inkl. Möbeltransport) und die Endreinigung aus einer Hand an. Wenn Sie beides in Brügg buchen, erhalten Sie einen attraktiven Kombi-Rabatt."
      },
      {
        "question": "Sind Ihre Mitarbeiter in Brügg versichert?",
        "answer": "Absolut. Alle unsere Reinigungskräfte sind bei uns fest angestellt, werden fair bezahlt und sind gegen Unfälle und Haftpflichtschäden versichert. Bei einem versehentlichen Schaden in Ihrer Wohnung in Brügg kommt unsere Betriebshaftpflicht vollumfänglich auf."
      }
    ]
  };
}

// 4. reinigungBruegg (Template D)
const oldReinigungBruegg = data.seoPages.reinigungBruegg;
if (oldReinigungBruegg) {
  data.seoPages.reinigungBruegg = {
    "meta": oldReinigungBruegg.meta,
    "badge": oldReinigungBruegg.badge,
    "h1": oldReinigungBruegg.h1,
    "heroSubtitle": oldReinigungBruegg.heroSubtitle,
    "ctaSoft": oldReinigungBruegg.ctaSoft,
    "intro": "Eine makellos saubere Umgebung steigert nicht nur das Wohlbefinden zu Hause, sondern auch die Produktivität am Arbeitsplatz. SwissCleanMove ist Ihr lokaler, zuverlässiger Partner für sämtliche Reinigungsdienstleistungen in Brügg und dem gesamten Seeland. Wir betreuen Privathaushalte, Unternehmen, Praxen und Immobilienverwaltungen mit massgeschneiderten Reinigungslösungen auf höchstem Schweizer Qualitätsniveau. Seit 2024 stehen wir in der Region für Diskretion, Gründlichkeit und umweltbewusstes Handeln. Egal, ob Sie eine regelmässige Haushaltshilfe wünschen, Ihr Büro täglich gereinigt werden muss oder Sie eine anspruchsvolle Baureinigung planen – wir bieten Ihnen den passenden Service zu transparenten Pauschal- oder Stundenpreisen, ganz ohne versteckte Kosten. Unsere erfahrenen, fest angestellten und versicherten Mitarbeiter arbeiten effizient und passen sich flexibel Ihrem Zeitplan an (Einsätze auch am frühen Morgen oder späten Abend sind problemlos möglich). Mit SwissCleanMove gewinnen Sie in Brügg wertvolle Zeit zurück – überlassen Sie das Putzen einfach uns.",
    "sections": [
      {
        "heading": "Ihr verlässlicher Reinigungs-Partner in Brügg",
        "body": "Brügg ist ein attraktiver Wohn- und Wirtschaftsstandort. Jedes Gebäude, sei es eine moderne Wohnung, ein Geschäftslokal oder ein Mehrfamilienhaus, hat spezifische Anforderungen an die Pflege. Als lokal verankerte Reinigungsfirma bieten wir Ihnen keine Standardverträge, sondern kommen für eine kostenlose Besichtigung zu Ihnen nach Brügg. Gemeinsam erstellen wir ein Pflichtenheft, das genau auf Ihre Bedürfnisse zugeschnitten ist. Das Wichtigste für uns ist Vertrauen: Bei regelmässigen Aufträgen setzen wir immer dieselbe, Ihnen vertraute Reinigungskraft ein. So müssen Sie nicht ständig neue Personen in Ihre privaten oder geschäftlichen Räumlichkeiten einweisen. Wir nutzen umweltfreundliche Reinigungsprodukte, die Ihre Möbel und die Gesundheit Ihrer Familie oder Mitarbeiter schonen, aber kompromisslos gegen Schmutz und Bakterien wirken."
      },
      {
        "heading": "Branchen, die wir in Brügg betreuen",
        "body": "Wir sind vielseitig aufgestellt und bieten spezialisierte Dienstleistungen für Familien, Singles, lokale KMU, Kanzleien, Praxen, Ladenlokale sowie für Immobilienverwaltungen und Architekten in Brügg und dem Seeland."
      },
      {
        "heading": "Regelmässige Büro- und Gewerbereinigung",
        "body": "Ein gepflegtes Geschäftslokal in Brügg ist entscheidend für den ersten Eindruck Ihrer Kunden. Unsere Unterhaltsreinigung umfasst die Pflege der Arbeitsplätze, die hygienische Reinigung der Sanitäranlagen und der Pausenräume, das Entleeren der Abfalleimer sowie die Desinfektion von Tastaturen und Türgriffen. Dieser Service richtet sich an alle Gewerbetreibenden. Kunden vertrauen uns, weil wir flexibel ausserhalb der regulären Arbeitszeiten reinigen, um den Betriebsablauf nicht zu stören."
      },
      {
        "heading": "Zuverlässige private Haushaltshilfe",
        "body": "Verbringen Sie Ihr Wochenende lieber an der Aare oder am Bielersee als mit Putzen. Unsere Haushaltshilfe in Brügg übernimmt das Saugen und Wischen der Böden, die intensive Bad- und Küchenreinigung und auf Wunsch auch das Bügeln Ihrer Wäsche. Wir kommen im wöchentlichen oder zweiwöchentlichen Rhythmus. Dieser Service ist ideal für Berufstätige und Familien. Unsere Kunden schätzen die Diskretion und die Zuweisung einer festen Reinigungskraft."
      },
      {
        "heading": "Streifenfreie Fenster- und Storenreinigung",
        "body": "Klare Sicht und mehr Tageslicht durch professionell gereinigte Fenster. Wir putzen Glasfronten, Fensterrahmen, Fenstersimse und Storen in Brügg streifenfrei und sicher. Auch Dachfenster oder schwer zugängliche Schaufenster stellen für uns dank moderner Ausrüstung kein Problem dar. Dieser Service richtet sich an Privat- und Gewerbekunden, die sich die anstrengende Fensterreinigung ersparen und gleichzeitig ein brillantes Ergebnis erzielen möchten."
      },
      {
        "heading": "Gründliche Bau- und Umbaureinigung",
        "body": "Nach handwerklichen Arbeiten hinterlassen Staub und Schmutz ihre Spuren. Wir bieten in Brügg Bau-Grobreinigungen und Bau-Feinreinigungen an. Wir entfernen Zementreste, Farbspritzer und den feinen Baustaub schonend von allen Oberflächen. Dieser Service wird von Architekten, Bauleitern und Hausbesitzern gebucht. Kunden wählen uns, da wir eine pünktliche und schlüsselfertige Übergabe des Neubaus oder der renovierten Wohnung garantieren."
      },
      {
        "heading": "Professionelle Hauswartung",
        "body": "Wir übernehmen die Betreuung von Liegenschaften und Mehrfamilienhäusern in Brügg. Unser Hauswartungsservice beinhaltet die regelmässige Treppenhausreinigung, das Warten der Haustechnik, die Umgebungspflege und den Winterdienst. Dieser Service richtet sich an Stockwerkeigentümer und Liegenschaftsverwaltungen. Durch unsere regelmässigen Kontrollen vor Ort erkennen wir Mängel frühzeitig und entlasten die Verwaltungen signifikant."
      },
      {
        "heading": "Spezialreinigungen für besondere Ansprüche",
        "body": "Für hartnäckige Verschmutzungen bieten wir Spezialreinigungen an, wie das Shampoonieren von Teppichen, das Polieren von Parkettböden oder die intensive Frühlingsreinigung. Dieser Service ist in Brügg besonders beliebt bei Mietern vor grossen Festen oder bei Gastronomiebetrieben, die eine hygienische Grundreinigung ihrer Räumlichkeiten benötigen. Wir bringen spezielle Einscheibenmaschinen und Industriesauger mit."
      },
      {
        "heading": "Schweizer Qualitätsstandards für Ihre Reinigung (Ratgeber)",
        "body": "Hygiene und Sauberkeit sind Vertrauenssache. In der Reinigungsbranche gibt es leider viele unzuverlässige Anbieter oder Schwarzarbeit. Bei SwissCleanMove haben Sie die Garantie, dass alle Reinigungskräfte in Brügg fest angestellt, fair entlöhnt und gegen Unfälle (SUVA) sowie Haftpflichtschäden versichert sind. Ein guter Reinigungsvertrag sollte sich Ihrem Leben anpassen: Wenn Sie in den Urlaub fahren, können Sie die wöchentliche Haushaltshilfe problemlos aussetzen. Wenn Sie als Firma eine Sonderreinigung nach einer Weihnachtsfeier benötigen, organisieren wir dies flexibel für Sie. Wir empfehlen unseren Neukunden immer, bei der Besichtigung offen über spezielle Materialien (z.B. geöltes Parkett, Naturstein) zu sprechen, damit wir von Anfang an die exakt passenden, schonenden Reinigungsmittel einsetzen können."
      }
    ],
    "serviceBulletsHeading": "Unsere Garantien für Kunden in Brügg",
    "serviceBullets": [
      "Feste und diskrete Bezugsperson für Ihr Objekt",
      "Kostenlose Beratung und Pflichtenheft-Erstellung",
      "Ökologisch abbaubare Reinigungsmittel",
      "Vollständige Betriebshaftpflichtversicherung",
      "Flexible Reinigungszeiten (früh morgens, abends)",
      "Transparente Preise und kurze Kündigungsfristen"
    ],
    "trustPoints": oldReinigungBruegg.trustPoints || ["Zuverlässig", "Versichert", "Lokal in Brügg"],
    "ctaMidHeading": oldReinigungBruegg.ctaMidHeading,
    "ctaMidBody": oldReinigungBruegg.ctaMidBody,
    "ctaMid": oldReinigungBruegg.ctaMid,
    "serviceAreaHeading": "Unser Einsatzgebiet im Seeland",
    "serviceAreaBody": "Wir sind fest in der Region verankert. Unser primäres Einsatzgebiet als Reinigungsfirma umfasst Brügg, Biel/Bienne, Nidau, Aegerten, Studen, Port und Orpund. Diese regionale Nähe ermöglicht es uns, pünktlich in Brügg zu sein, keine langen Anfahrtskosten zu berechnen und bei Notfällen (wie z.B. bei der Reinigung nach einem kleinen Wasserschaden) schnellstmöglich vor Ort zu sein.",
    "internalLinksHeading": oldReinigungBruegg.internalLinksHeading,
    "internalLinks": oldReinigungBruegg.internalLinks,
    "ctaStrongHeading": oldReinigungBruegg.ctaStrongHeading,
    "ctaStrongBody": oldReinigungBruegg.ctaStrongBody,
    "ctaStrong": oldReinigungBruegg.ctaStrong,
    "testimonial": oldReinigungBruegg.testimonial || { "quote": "Unsere Büros in Brügg werden jeden Abend perfekt gereinigt. Die Firma ist sehr zuverlässig und professionell.", "author": "Geschäftsführer aus Brügg", "trust": "Gewerbekunde" },
    "faqs": [
      {
        "question": "Bieten Sie Reinigungen für Privat und Gewerbe in Brügg an?",
        "answer": "Ja, SwissCleanMove betreut sowohl private Haushalte (als Haushaltshilfe oder für den Frühlingsputz) als auch Gewerbekunden wie Büros, Praxen und Ladenlokale in Brügg. Für beide Bereiche setzen wir spezialisierte Mitarbeiter ein."
      },
      {
        "question": "Muss ich die Reinigungsmittel für mein Zuhause selbst kaufen?",
        "answer": "Das ist Ihnen überlassen. Bei Privathaushalten in Brügg verwenden wir oft die vorhandenen Mittel und Staubsauger der Kunden. Bei Gewerbe-, Bau- und Spezialreinigungen bringen wir sämtliche professionellen Reinigungsmittel und Maschinen selbst mit."
      },
      {
        "question": "Ist immer dieselbe Reinigungskraft bei mir in Brügg im Einsatz?",
        "answer": "Ja. Uns ist bewusst, dass eine Reinigung Vertrauenssache ist. Daher weisen wir Ihnen für regelmässige Unterhaltsreinigungen immer eine feste Bezugsperson zu. Nur bei Krankheit oder Ferien setzen wir nach Rücksprache eine qualifizierte Vertretung ein."
      },
      {
        "question": "Welche Reinigungsmittel setzen Sie ein?",
        "answer": "Nachhaltigkeit liegt uns am Herzen. Wir verwenden in Brügg fast ausschliesslich ökologisch abbaubare und umweltschonende Reinigungsmittel. Diese sind effektiv gegen Bakterien und Schmutz, hinterlassen aber keine beiissenden chemischen Dämpfe in Ihren Räumen."
      },
      {
        "question": "Können Büroreinigungen ausserhalb der Öffnungszeiten erfolgen?",
        "answer": "Ja, das ist unser Standard bei Gewerbekunden. Um Ihren Betriebsablauf in Brügg nicht zu stören, arbeiten unsere Teams flexibel – gerne auch früh morgens vor Bürobeginn, am späten Abend oder am Wochenende."
      },
      {
        "question": "Wer haftet, wenn während der Reinigung etwas kaputt geht?",
        "answer": "In dem seltenen Fall, dass unserer Reinigungskraft ein Missgeschick passiert, sind Sie in Brügg voll abgesichert. SwissCleanMove verfügt über eine umfassende Betriebshaftpflichtversicherung, die für sämtliche entstandenen Schäden an Ihrem Eigentum aufkommt."
      },
      {
        "question": "Wie werden die Preise für die Unterhaltsreinigung berechnet?",
        "answer": "Wir besichtigen Ihr Objekt in Brügg kostenlos und kalkulieren den Aufwand anhand der Grösse, der Anzahl der Sanitäranlagen und Ihrer Wünsche. Danach erhalten Sie von uns eine transparente Offerte mit einem fairen Pauschal- oder Stundenpreis ohne versteckte Gebühren."
      },
      {
        "question": "Gibt es lange Kündigungsfristen für Reinigungsverträge?",
        "answer": "Nein. Wir binden Kunden durch unsere exzellente Qualität, nicht durch Knebelverträge. Die Kündigungsfrist für regelmässige Reinigungsaufträge in Brügg beträgt in der Regel nur einen Monat auf das Ende eines Kalendermonats."
      },
      {
        "question": "Bieten Sie auch Eventreinigungen in Brügg an?",
        "answer": "Ja, wir übernehmen auch einmalige Sondereinsätze. Wenn Sie nach einer grossen Firmenfeier, einer Hochzeit oder einem Jubiläum in Brügg eine schnelle und gründliche Reinigung der Location benötigen, können Sie uns flexibel buchen."
      },
      {
        "question": "Sind Ihre Mitarbeiter fest angestellt?",
        "answer": "Ja, wir distanzieren uns von Schwarzarbeit. Alle Reinigungskräfte von SwissCleanMove sind fest angestellt, werden fair entlöhnt und sind gegen Unfälle (SUVA) versichert. Wir setzen auf Qualität und Verlässlichkeit durch eigenes Personal."
      }
    ]
  };
}

fs.writeFileSync(dePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated reinigungLyss, umzugBruegg, endreinigungBruegg, reinigungBruegg in messages/de.json');
