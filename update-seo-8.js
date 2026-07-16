const fs = require('fs');
const path = require('path');

const dePath = path.join(__dirname, 'messages', 'de.json');
const data = JSON.parse(fs.readFileSync(dePath, 'utf8'));

// 1. umzugNeuchatel (Template A)
const oldUmzugNeuchatel = data.seoPages.umzugNeuchatel;
if (oldUmzugNeuchatel) {
  data.seoPages.umzugNeuchatel = {
    "meta": oldUmzugNeuchatel.meta,
    "badge": oldUmzugNeuchatel.badge,
    "h1": oldUmzugNeuchatel.h1,
    "heroSubtitle": oldUmzugNeuchatel.heroSubtitle,
    "ctaSoft": oldUmzugNeuchatel.ctaSoft,
    "intro": "Ein Wohnungswechsel in den wunderschönen Kanton Neuenburg (Neuchâtel), ein Umzug innerhalb der Region oder die Verlagerung Ihres Wohnsitzes aus Neuchâtel in einen anderen Kanton erfordert einen starken Logistikpartner. SwissCleanMove ist Ihre erfahrene Schweizer Umzugsfirma für den Kanton Neuchâtel. Wir kombinieren jahrelange Expertise mit absoluter Zuverlässigkeit und nehmen Ihnen die schwere körperliche Arbeit komplett ab. Ob Sie eine moderne Wohnung am Neuenburgersee beziehen, Ihr Haus in den Jura-Höhen wechseln oder mit Ihrem Unternehmen neue Büroräume in der Kantonshauptstadt beziehen – wir meistern jede topografische und logistische Herausforderung. Wir bieten Ihnen transparente Fixpreise ab CHF 490 an, in denen unsere kräftigen Zügelhelfer, modernste Transportfahrzeuge und eine lückenlose Transportversicherung (Vollkasko) bereits enthalten sind. Sie müssen keine unvorhergesehenen Kosten oder versteckten Stundenzuschläge fürchten. Unser zweisprachig geschultes Personal (Deutsch/Französisch) garantiert eine reibungslose Kommunikation vor Ort. Dank unserer effizienten Planung ist Ihr Umzug in Neuchâtel meist in ein bis zwei Tagen abgeschlossen. Verlassen Sie sich auf Schweizer Pünktlichkeit und absolute Sorgfalt.",
    "sections": [
      {
        "heading": "Warum SwissCleanMove im Kanton Neuchâtel die beste Wahl ist",
        "body": "Der Kanton Neuchâtel zeichnet sich durch seine Zweisprachigkeit, die charmanten historischen Altstädte (wie Neuchâtel oder La Chaux-de-Fonds) und teilweise steile Zufahrtswege aus. Als erfahrene Umzugsfirma kennen wir diese Gegebenheiten bestens. Wenn Sie uns kontaktieren, beraten wir Sie individuell und führen im Vorfeld gerne eine kostenlose Besichtigung oder eine präzise telefonische Schätzung Ihres Volumens durch. Unser Team besteht aus erfahrenen Festangestellten, die täglich mit sensiblen Möbeln, schweren Geräten und empfindlichem Hausrat hantieren. Ihre absolute Zufriedenheit und der Schutz Ihres Eigentums stehen bei uns an erster Stelle. Wir agieren nicht nur als Möbelspedition, sondern als Ihr persönlicher Begleiter durch die oft stressige Umzugsphase."
      },
      {
        "heading": "Unser umfassendes Serviceangebot für den Kanton Neuchâtel",
        "body": "Wir sind eine Full-Service-Agentur für die gesamte Schweiz. Das bedeutet, dass wir Ihnen von der Bereitstellung der ersten Umzugskiste bis zur finalen Möbelmontage in Neuchâtel alles aus einer Hand bieten können."
      },
      {
        "heading": "Zuverlässige und sorgfältige Privatumzüge",
        "body": "Ihr Zuhause ist Ihr Rückzugsort, und wir behandeln Ihre persönlichen Gegenstände mit grösstem Respekt. Wir verpacken Ihre Möbel, Bilder und Antiquitäten in spezielle Decken, nutzen Stretchfolie für empfindliche Oberflächen und transportieren alles sicher in luftgefederten Fahrzeugen. Ob Sie in ein Chalet im Val-de-Travers ziehen oder eine Stadtwohnung in Neuchâtel beziehen, wir passen unsere Kapazitäten flexibel an. Kunden vertrauen uns, weil wir den Umzugstag durch Ruhe und Struktur deutlich entspannen."
      },
      {
        "heading": "Firmen- und Relocation-Services",
        "body": "Ein Firmenumzug erfordert striktes Timing, damit der Betriebsunterbruch in Ihrem Unternehmen so kurz wie möglich ausfällt. Wir transportieren schwere Schreibtische, komplexe IT-Infrastruktur und Archive sicher und systematisch. Wir arbeiten auf Wunsch auch am Wochenende, was besonders für Betriebe in Neuchâtel und La Chaux-de-Fonds interessant ist. Geschäftskunden schätzen unsere Termintreue und unsere hohe Flexibilität bei komplexen Logistikprojekten."
      },
      {
        "heading": "Ein- und Auspackservice durch Profis",
        "body": "Packen ist die zeitaufwendigste Phase jedes Umzugs. Unser Team bringt professionelle Kartons mit, verpackt Ihr Geschirr bruchsicher und verstaut Ihre Kleidung hängend in speziellen Kleiderboxen. Am neuen Zielort im Kanton Neuchâtel räumen wir auf Wunsch alles wieder exakt in Ihre Schränke ein. Dieser Service richtet sich an Personen, denen schlicht die Zeit für die Vorbereitung fehlt. Unsere Kunden lieben es, wenn sie abends in eine bereits fertig eingerichtete Wohnung zurückkehren können."
      },
      {
        "heading": "Fachgerechte Möbelmontage",
        "body": "Das Demontieren grosser Kleiderschränke, massiver Tische oder Betten am alten Wohnort und das anschliessende Montieren im neuen Zuhause erfordert handwerkliches Geschick. Unsere Profis bringen das richtige Werkzeug mit und stellen sicher, dass Ihre Möbel am neuen Standort in Neuchâtel wieder absolut stabil stehen."
      },
      {
        "heading": "Einsatz unseres Möbellifts in der Altstadt",
        "body": "In historischen Gebäuden (z.B. in der Altstadt von Neuchâtel) mit engen Treppenaufgängen setzen wir unseren hauseigenen Möbellift ein. Schwere Klaviere, massive Sofas oder unhandliche Kühlschränke transportieren wir so sicher über den Balkon oder das Fenster. Dies schützt das Treppenhaus der Immobilie vor Kratzern und beschleunigt den Transport enorm."
      },
      {
        "heading": "Bequeme Entsorgung von Altmöbeln",
        "body": "Oft trennt man sich beim Umzug von alten Möbeln oder defekten Elektrogeräten. Wir übernehmen die fach- und umweltgerechte Entsorgung direkt am Umzugstag. Wir bringen das Sperrgut zu den lokalen Recyclinghöfen im Kanton Neuchâtel. Dieser Service erspart Ihnen den mühsamen Weg zum Werkhof."
      },
      {
        "heading": "So bereiten Sie Ihren Umzug in Neuchâtel optimal vor (Ratgeber)",
        "body": "Eine gründliche Planung ist das Fundament eines stressfreien Umzugs. Beginnen Sie frühzeitig damit, ungenutzte Gegenstände im Kellerabteil auszusortieren. Beschriften Sie jeden gepackten Karton deutlich auf der Ober- und Seite mit dem jeweiligen Zielraum (z.B. \"Salon / Livres\"). Wichtig: Eine gute Parkmöglichkeit für den Zügelwagen am Ein- und Auszugsort ist entscheidend für einen effizienten Zeitplan. Falls an Ihrer Strasse in Neuchâtel Parkplätze Mangelware sind, geben Sie uns rechtzeitig Bescheid. Wir beantragen dann bei der Polizei oder Gemeinde eine temporäre Halteverbotszone (Stationnement interdit), damit unsere Mitarbeiter keine langen Strecken mit schweren Möbeln zurücklegen müssen. Halten Sie zudem am Umzugstag wichtige Dokumente und Ihre Schlüssel immer persönlich bei sich."
      }
    ],
    "serviceBulletsHeading": "Ihre Umzugs-Vorteile in Neuchâtel",
    "serviceBullets": [
      "Garantierte Pauschalpreise ohne Überraschungen",
      "Vollständige Transport- und Betriebshaftpflicht",
      "Moderne, luftgefederte Zügelwagen",
      "Demontage, Montage und Einpackservice möglich",
      "Interkantonale Umzüge in der ganzen Schweiz",
      "Zweisprachiges Team (Deutsch/Französisch) verfügbar"
    ],
    "trustPoints": oldUmzugNeuchatel.trustPoints || ["Fixpreise", "Versichert", "Schweizweit"],
    "ctaMidHeading": oldUmzugNeuchatel.ctaMidHeading,
    "ctaMidBody": oldUmzugNeuchatel.ctaMidBody,
    "ctaMid": oldUmzugNeuchatel.ctaMid,
    "serviceAreaHeading": "Unser Einsatzgebiet (Neuchâtel & Schweizweit)",
    "serviceAreaBody": "Wir betreuen als national tätige Umzugsfirma den gesamten Kanton Neuchâtel, einschliesslich der Städte Neuchâtel, La Chaux-de-Fonds, Le Locle, Val-de-Travers und Boudry. Darüber hinaus sind wir Experten für Umzüge über die Kantonsgrenzen hinweg, beispielsweise von Neuchâtel nach Bern, Fribourg, Vaud oder in die Deutschschweiz.",
    "internalLinksHeading": oldUmzugNeuchatel.internalLinksHeading,
    "internalLinks": oldUmzugNeuchatel.internalLinks,
    "ctaStrongHeading": oldUmzugNeuchatel.ctaStrongHeading,
    "ctaStrongBody": oldUmzugNeuchatel.ctaStrongBody,
    "ctaStrong": oldUmzugNeuchatel.ctaStrong,
    "testimonial": oldUmzugNeuchatel.testimonial || { "quote": "Ein fantastisches Team! Sie haben unseren Umzug von Neuchâtel nach Bern ruhig und hochprofessionell gemeistert. Sehr zu empfehlen.", "author": "Familie G.", "trust": "Zufriedene Kunden" },
    "faqs": [
      {
        "question": "Führen Sie Umzüge im gesamten Kanton Neuchâtel durch?",
        "answer": "Ja. Wir betreuen Kunden im gesamten Kantonsgebiet, von den Seeufern in Neuchâtel bis hinauf in den Jura (z.B. La Chaux-de-Fonds oder Le Locle). Die topografischen Herausforderungen meistern unsere erfahrenen Fahrer mühelos."
      },
      {
        "question": "Was kostet ein durchschnittlicher Umzug in Neuchâtel?",
        "answer": "Wir bieten Umzüge ab einem Pauschalpreis von CHF 490 an. Dieser Fixpreis beinhaltet den Zügelwagen, die Helfer und die Versicherung. Um Ihnen eine exakte und verbindliche Offerte zu stellen, führen wir im Vorfeld eine Besichtigung oder Detailerfassung durch."
      },
      {
        "question": "Sind meine Einrichtungsgegenstände versichert?",
        "answer": "Ja, absolut. Jeder von SwissCleanMove durchgeführte Umzug ist über unsere umfassende Transport- und Betriebshaftpflichtversicherung abgedeckt. Sollte trotz unserer Vorsicht ein Gegenstand beschädigt werden, übernehmen wir die volle Verantwortung."
      },
      {
        "question": "Sprechen Ihre Mitarbeiter Französisch?",
        "answer": "Da wir regelmässig in der Westschweiz und insbesondere im Kanton Neuchâtel arbeiten, stellen wir sicher, dass bei Ihrem Umzug Personal vor Ort ist, das sich zweisprachig (Deutsch/Französisch) mit Ihnen und den Verwaltungen verständigen kann."
      },
      {
        "question": "Bieten Sie auch die Endreinigung mit Abnahmegarantie an?",
        "answer": "Ja. SwissCleanMove ist Ihr Partner für das komplette Paket. Wir führen nach dem Auszug in Neuchâtel gerne auch die professionelle Endreinigung durch. Bei einer Kombi-Buchung profitieren Sie von einem attraktiven Preisnachlass."
      },
      {
        "question": "Muss ich das Verpackungsmaterial selbst besorgen?",
        "answer": "Sie können entscheiden, ob Sie Kartons selbst besorgen oder unser Material nutzen möchten. Wir liefern stabile Zügelkartons, Kleiderboxen und Luftpolsterfolie nach Neuchâtel und nehmen dieses nach dem Umzug auf Wunsch auch wieder zurück."
      },
      {
        "question": "Zerlegen Sie auch meine Möbel?",
        "answer": "Ja, das ist ein fester Bestandteil unserer Dienstleistung. Grosse Schränke werden von unseren Mitarbeitern am alten Wohnort fachgerecht demontiert und am neuen Standort im Kanton Neuchâtel wieder sicher zusammengebaut."
      },
      {
        "question": "Führen Sie Umzüge auch am Wochenende durch?",
        "answer": "Ja, viele unserer Privat- und Firmenkunden bevorzugen einen Umzug am Wochenende, um die Arbeitswoche nicht zu stören. Auf Voranmeldung sind wir auch freitags und samstags für Sie in Neuchâtel im Einsatz."
      },
      {
        "question": "Organisieren Sie die Absperrung für den Zügelwagen in Neuchâtel?",
        "answer": "Wenn vor Ihrer Wohnung (insbesondere im Stadtzentrum) keine Parkmöglichkeiten bestehen, übernehmen wir nach Rücksprache gerne die Organisation eines temporären Halteverbots (Stationnement interdit) in Absprache mit der lokalen Polizei."
      },
      {
        "question": "Wie gross sind Ihre Fahrzeuge?",
        "answer": "Wir verfügen über moderne, luftgefederte Zügelwagen (3.5t) für kleinere Wohnungen und enge Strassen sowie grössere LKWs (7.5t) für Einfamilienhäuser und interkantonale Langstreckenumzüge ab Neuchâtel."
      }
    ]
  };
}

// 2. umzugFribourg (Template B)
const oldUmzugFribourg = data.seoPages.umzugFribourg;
if (oldUmzugFribourg) {
  data.seoPages.umzugFribourg = {
    "meta": oldUmzugFribourg.meta,
    "badge": oldUmzugFribourg.badge,
    "h1": oldUmzugFribourg.h1,
    "heroSubtitle": oldUmzugFribourg.heroSubtitle,
    "ctaSoft": oldUmzugFribourg.ctaSoft,
    "intro": "Der Kanton Freiburg (Fribourg), als wichtiges Bindeglied zwischen der Deutschschweiz und der Romandie, verzeichnet eine hohe Zuzugsrate. Planen Sie einen Umzug innerhalb dieses zweisprachigen Kantons oder einen Wohnungswechsel über die Kantonsgrenzen hinweg? Ein Umzug verlangt nicht nur körperlichen Einsatz, sondern auch perfekte Logistik. SwissCleanMove ist Ihr verlässlicher Umzugspartner für den gesamten Kanton Fribourg. Wir begleiten Privatpersonen, Familien und Unternehmen bei ihrem Standortwechsel. Unser erfahrenes Team nimmt Ihnen den gesamten Stress ab – von der ersten gepackten Kiste bis zum Aufbau des letzten Möbels. Wir arbeiten mit absolut transparenten und garantierten Pauschalpreisen. Bei uns sind die professionellen Zügelmänner, unsere luftgefederten Transportwagen sowie eine vollumfängliche Transport- und Betriebshaftpflichtversicherung immer im Preis inbegriffen. Egal, ob Ihr neues Zuhause im mittelalterlichen Stadtkern von Fribourg, in Bulle, Murten oder Estavayer-le-Lac liegt – wir sorgen für einen reibungslosen Ablauf. Wir reagieren flexibel auf Ihre Wünsche und bieten bei Notfällen auch schnelle Einsätze an.",
    "sections": [
      {
        "heading": "Professioneller Umzugsservice im Kanton Fribourg",
        "body": "Fribourg bietet mit seinen historischen Städten und ländlichen Bezirken (Gruyère, Seebezirk) vielfältige logistische Herausforderungen. Enge Gassen, fehlende Liftanlagen in Altbauten oder weite Wege auf dem Land meistern wir dank jahrelanger Erfahrung. Wir bieten Ihnen eine persönliche, kostenlose Beratung an, um den genauen Umfang Ihres Umzugs zu erfassen. Darauf basierend erstellen wir eine verbindliche Pauschalofferte, sodass Sie Ihr Umzugsbudget exakt planen können. Wir setzen ausschliesslich fest angestellte, geschulte Zügelhelfer ein, die täglich wertvolles Mobiliar sicher verpacken und transportieren. Unser Ziel ist es, Ihnen die Angst vor dem Umzugstag komplett zu nehmen."
      },
      {
        "heading": "Für wen wir in Fribourg arbeiten",
        "body": "Unser Service richtet sich an ein breites Publikum. Wir unterstützen junge Familien beim Einzug ins Eigenheim im Greyerzerland, Studenten beim Wechsel in eine WG in Fribourg Stadt, sowie lokale Unternehmen bei der Relocation ihrer Büroräumlichkeiten. Wir haben für jedes Bedürfnis die passende Logistik."
      },
      {
        "heading": "Sorgfältige Privatumzüge",
        "body": "Ein Privatumzug ist immer auch ein Stück Lebenswandel. Wir transportieren Ihre Möbel, Kartons und persönlichen Gegenstände mit grösster Sorgfalt. Unsere Mitarbeiter nutzen professionelles Schutzmaterial (Zügeldecken, Folien) und sichern die Ladung im LKW fachgerecht. Ob Sie innerhalb des Kantons Fribourg umziehen oder in die Waadt oder nach Bern – wir sorgen dafür, dass alles unbeschadet ankommt."
      },
      {
        "heading": "Gewerbe- und Firmenumzüge",
        "body": "Bei einem Firmenumzug in Fribourg ist Zeit Geld. Wir planen die Verlagerung Ihrer Büros präzise, um Ausfallzeiten minimal zu halten. Der sichere Transport von schweren Aktenschränken, IT-Geräten und sensiblen Datenarchiven gehört zu unserem Alltag. Wir bieten Firmenkunden auch Wochenend-Termine an. Dieser Service ist perfekt für KMU, da wir den Umzug so strukturieren, dass der Betrieb am Montag reibungslos weitergehen kann."
      },
      {
        "heading": "Professioneller Ein- und Auspackservice",
        "body": "Das Verpacken von Büchern, Kleidern und empfindlichem Geschirr kostet enorm viel Zeit. Wenn Sie diese Zeit nicht haben, übernehmen unsere Spezialisten das Einpacken für Sie in Fribourg. Wir bringen professionelle Umzugskartons, Seidenpapier und Luftpolsterfolie mit. Am Zielort räumen wir auf Wunsch auch wieder alles ein. Kunden buchen diesen Service, weil er den Umzugsstress fast komplett eliminiert."
      },
      {
        "heading": "Möbelmontage durch unsere Handwerker",
        "body": "Moderne Schränke und Regalsysteme lassen sich meistens nicht im Ganzen transportieren. Wir übernehmen die fachgerechte Demontage am Auszugsort und den stabilen Aufbau am neuen Standort im Kanton Fribourg. Das nötige Werkzeug haben wir stets dabei. Dieser Service richtet sich an Kunden, die sich den Ärger mit verlorenen Schrauben und komplizierten Anleitungen ersparen wollen."
      },
      {
        "heading": "Möbellifteinsatz in der Fribourger Altstadt",
        "body": "In Häusern ohne Lift oder mit verwinkelten Treppenhäusern, besonders in der Fribourger Altstadt, stösst reines Tragen an seine Grenzen. Hier setzen wir unseren Aussenaufzug (Möbellift) ein, um schwere Sofas, Kühlschränke oder Schränke direkt über den Balkon oder das Fenster zu transportieren. Das schont Ihre Möbel und das historische Treppenhaus."
      },
      {
        "heading": "Entsorgung und Räumung",
        "body": "Alte Möbel und defekte Geräte, die nicht mit in die neue Wohnung sollen, nehmen wir am Umzugstag gleich mit und entsorgen diese fachmännisch beim lokalen Werkhof in der Region Fribourg. Dieser Service ist extrem praktisch für Kunden, die sich verkleinern oder Altlasten bequem und ohne eigenen Transporter loswerden möchten."
      },
      {
        "heading": "Kundenbetreuung und Vorbereitungstipps (Ratgeber)",
        "body": "Um Ihren Umzug in Fribourg reibungslos zu gestalten, empfehlen wir, Umzugskartons nie zu schwer zu bepacken (Maximalgewicht ca. 20 kg). Beschriften Sie die Kartons nicht nur auf dem Deckel, sondern auch seitlich mit dem Zielraum. Klären Sie frühzeitig, ob am Auszugs- und Einzugsort ausreichend Parkraum für unseren Zügelwagen vorhanden ist. Sollte dies in einer engen Strasse in der Stadt Fribourg oder in Bulle ein Problem sein, informieren Sie uns rechtzeitig. Wir können bei der zuständigen Gemeinde ein offizielles Halteverbot organisieren. Bei interkantonalen Umzügen denken Sie zudem an die rechtzeitige Abmeldung bei der alten Gemeinde und Anmeldung am neuen Wohnort (meist innert 14 Tagen gesetzlich vorgeschrieben)."
      }
    ],
    "serviceBulletsHeading": "Ihre Vorteile bei Umzügen in Fribourg",
    "serviceBullets": [
      "Transparente Pauschalpreise (keine versteckten Kosten)",
      "Vollständige Transport- und Betriebshaftpflichtversicherung",
      "Kostenlose, unverbindliche Objektbesichtigung",
      "Erfahrene, kräftige und mehrsprachige Zügelhelfer",
      "Demontage, Montage und Einpackservice verfügbar",
      "Zweisprachige Kommunikation (Deutsch / Französisch)"
    ],
    "trustPoints": oldUmzugFribourg.trustPoints || ["Fixpreise", "Versichert", "Schweizweit"],
    "ctaMidHeading": oldUmzugFribourg.ctaMidHeading,
    "ctaMidBody": oldUmzugFribourg.ctaMidBody,
    "ctaMid": oldUmzugFribourg.ctaMid,
    "serviceAreaHeading": "Unser Einsatzgebiet (Fribourg & Schweizweit)",
    "serviceAreaBody": "Wir betreuen den gesamten Kanton Fribourg: Fribourg Stadt, Bulle, Murten, Estavayer-le-Lac, Romont und Villars-sur-Glâne. Da der Kanton an der Sprachgrenze liegt, sind interkantonale Umzüge Richtung Bern (Deutschschweiz) oder Waadt (Romandie) unser tägliches Geschäft. Wir verbinden die Schweiz zuverlässig.",
    "internalLinksHeading": oldUmzugFribourg.internalLinksHeading,
    "internalLinks": oldUmzugFribourg.internalLinks,
    "ctaStrongHeading": oldUmzugFribourg.ctaStrongHeading,
    "ctaStrongBody": oldUmzugFribourg.ctaStrongBody,
    "ctaStrong": oldUmzugFribourg.ctaStrong,
    "testimonial": oldUmzugFribourg.testimonial || { "quote": "Ein wirklich stressfreier Umzug von Fribourg nach Bern. Die Helfer waren pünktlich, zweisprachig und sehr achtsam mit unserem Hausrat.", "author": "Sophie M.", "trust": "Zufriedene Kundin" },
    "faqs": [
      {
        "question": "Führen Sie Umzüge im gesamten Kanton Fribourg durch?",
        "answer": "Ja, absolut. Wir betreuen Kunden im deutschsprachigen Seebezirk (Murten) genauso wie im französischsprachigen Greyerzbezirk (Bulle) oder in der Hauptstadt Fribourg."
      },
      {
        "question": "Sprechen Ihre Mitarbeiter vor Ort Französisch?",
        "answer": "Ja, bei Umzügen im Kanton Fribourg stellen wir sicher, dass unser Team zweisprachig (Deutsch und Französisch) kommunizieren kann, um einen reibungslosen Ablauf mit Ihnen und den Verwaltungen zu garantieren."
      },
      {
        "question": "Was kostet ein Umzug in Fribourg?",
        "answer": "Wir arbeiten mit fairen und transparenten Pauschalpreisen. Die Kosten hängen von der Grösse Ihrer Wohnung und dem Transportvolumen ab. Nach einer kostenlosen Besichtigung in Fribourg erhalten Sie von uns eine verbindliche Fixpreis-Offerte."
      },
      {
        "question": "Sind meine Sachen während des Umzugs versichert?",
        "answer": "Ja, vollumfänglich. Jeder von SwissCleanMove durchgeführte Umzug ist durch eine umfassende Transport- und Betriebshaftpflichtversicherung geschützt. Entsteht ein Schaden am Mobiliar, übernehmen wir die volle Haftung."
      },
      {
        "question": "Demontieren und montieren Sie meine Möbel?",
        "answer": "Ja, der fachgerechte Abbau von grossen Möbelstücken (wie Betten oder Regalen) am Auszugsort und der Wiederaufbau am neuen Wohnort gehören zu unseren Routinen. Das nötige Werkzeug bringen wir mit."
      },
      {
        "question": "Werden auch Halteverbotszonen in Fribourg von Ihnen organisiert?",
        "answer": "Wenn vor Ihrem Wohnort in Fribourg nicht ausreichend Parkfläche für unseren Zügelwagen vorhanden ist, kümmern wir uns auf Wunsch um die Beantragung eines offiziellen Halteverbots bei der Gemeinde oder Stadtpolizei."
      },
      {
        "question": "Kann ich in Fribourg auch Umzugskartons bei Ihnen beziehen?",
        "answer": "Ja, wir können Ihnen im Vorfeld stabile Umzugskartons, Kleiderboxen, Seidenpapier für Geschirr und Luftpolsterfolie direkt nach Hause liefern. Sie können entscheiden, ob Sie das Material kaufen oder mieten möchten."
      },
      {
        "question": "Kann ich die Endreinigung meiner alten Wohnung in Fribourg ebenfalls bei Ihnen buchen?",
        "answer": "Selbstverständlich. Als Full-Service-Agentur bieten wir Ihnen auch die professionelle Endreinigung mit 100% Abnahmegarantie an. Kunden, die Umzug und Reinigung bei uns bündeln, profitieren von einem Kombi-Rabatt."
      },
      {
        "question": "Führen Sie Firmenumzüge auch am Wochenende durch?",
        "answer": "Ja, wir wissen, dass viele KMU Ausfallzeiten vermeiden müssen. Deshalb sind wir auf Voranmeldung auch freitags und samstags für Firmenumzüge in Fribourg im Einsatz."
      },
      {
        "question": "Entsorgen Sie alte Möbel direkt am Umzugstag?",
        "answer": "Ja, wenn Sie beim Umzug ausmisten, nehmen wir unerwünschte Möbel oder Sperrgut am Umzugstag mit und entsorgen diese fachgerecht und umweltfreundlich auf dem lokalen Werkhof im Kanton Fribourg."
      }
    ]
  };
}

// 3. umzugBasel (Template C)
const oldUmzugBasel = data.seoPages.umzugBasel;
if (oldUmzugBasel) {
  data.seoPages.umzugBasel = {
    "meta": oldUmzugBasel.meta,
    "badge": oldUmzugBasel.badge,
    "h1": oldUmzugBasel.h1,
    "heroSubtitle": oldUmzugBasel.heroSubtitle,
    "ctaSoft": oldUmzugBasel.ctaSoft,
    "intro": "Die Kulturstadt Basel und die umliegenden Kantone Basel-Landschaft und Basel-Stadt bilden ein pulsierendes Zentrum im Dreiländereck. Ein Umzug in diesem dichten urbanen Gebiet, oder eine Verlagerung Ihres Wohnsitzes aus Basel in eine andere Schweizer Region, erfordert einen hochprofessionellen Logistikpartner. SwissCleanMove ist Ihre Premium-Umzugsfirma für Basel und die ganze Schweiz. Wir nehmen Ihnen die logistische Planung und die schwere körperliche Arbeit komplett ab, damit Sie sich entspannt auf Ihr neues Zuhause oder Ihr neues Büro freuen können. Egal, ob Sie in ein historisches Haus am Rhein ziehen, ein modernes Apartment im Gundeli beziehen oder Ihr Unternehmen ins Gellert-Quartier verlegen – unser erfahrenes Team sorgt für einen absolut reibungslosen Ablauf. Wir bieten Ihnen transparente, garantierte Pauschalpreise, in denen unsere kräftigen Zügelhelfer, modernste luftgefederte Transportfahrzeuge und eine lückenlose Transportversicherung bereits enthalten sind. Keine versteckten Stundenzuschläge, keine bösen Überraschungen. Wir arbeiten speditiv, zuverlässig und professionell. Vertrauen Sie auf Schweizer Umzugsqualität für Ihr Projekt in Basel.",
    "sections": [
      {
        "heading": "Transport- und Umzugslösungen für den Raum Basel",
        "body": "Basel stellt mit seinen oft engen Altstadtgassen, den stark frequentierten Strassen und dem dichten Strassenbahnnetz (Trämli) sehr spezifische Anforderungen an einen Umzug. Als erfahrene Schweizer Umzugsfirma kennen wir diese Tücken genau. Wir bieten Ihnen keine Dienstleistungen von der Stange, sondern eine massgeschneiderte Beratung nach einer kostenlosen Vor-Ort-Besichtigung oder einer detaillierten Online-Schätzung. Sie bestimmen den genauen Umfang unseres Einsatzes: vom bequemen Komplettumzug inklusive Einpackservice bis hin zum reinen Möbeltransport. Unser oberstes Ziel ist es, Ihren Wohnungswechsel in Basel absolut schadenfrei und im vereinbarten Zeitfenster zu realisieren. Dafür setzen wir auf fest angestelltes, geschultes Personal, das die Region kennt."
      },
      {
        "heading": "Die Kernkompetenzen unserer Umzugsfirma",
        "body": "Als Full-Service-Agentur decken wir alle Arbeitsschritte ab, die für einen stressfreien Umzug notwendig sind. Entdecken Sie unser umfassendes Angebot für Privat- und Geschäftskunden in Basel."
      },
      {
        "heading": "Sorgfältige Privatumzüge",
        "body": "Wir transportieren Ihren Hausrat sicher an die neue Adresse in Basel-Stadt, Baselland oder schweizweit. Wir verpacken empfindliche Möbel, Antiquitäten und Bilder in spezielle Schutzfolien und Wolldecken und fixieren diese professionell im LKW. Dieser Service richtet sich an Singles, Paare und Familien. Basler Kunden wählen uns, weil wir äusserst sorgfältig mit ihrem Eigentum umgehen und den Umzugstag durch unsere ruhige, strukturierte Arbeitsweise deutlich entspannen."
      },
      {
        "heading": "Relocation und Büroumzüge in Basel",
        "body": "Für Unternehmen (insbesondere aus den Bereichen Pharma, Finanzen und Agenturen) im Grossraum Basel bieten wir professionelle Firmenumzüge. Wir verlagern IT-Infrastruktur, Archive und Arbeitsplätze schnell und sicher. Um den Geschäftsbetrieb nicht zu stören, planen wir diese Umzüge auf Wunsch auch an Wochenenden. Geschäftskunden schätzen unsere Termintreue und die präzise Logistik, die teure Ausfallzeiten minimiert."
      },
      {
        "heading": "Demontage und Montage von Möbeln",
        "body": "Moderne Schrankwände und grossformatige Betten müssen für den Transport oft zerlegt werden. Unsere handwerklich begabten Zügelhelfer demontieren Ihre Möbel am Auszugsort in Basel und montieren sie am Zielort wieder passgenau und stabil. Wir bringen unser eigenes, professionelles Werkzeug mit. Dieser Service erspart Ihnen viel Zeit und Frust beim Wiederaufbau."
      },
      {
        "heading": "Stressfreier Ein- und Auspackservice",
        "body": "Wir bringen das nötige Packmaterial mit (Umzugskartons, Kleiderboxen) und verpacken Ihr Geschirr, Bücher und Ihre Garderobe absolut bruchsicher. Am neuen Ort in Basel räumen wir auf Wunsch alles wieder exakt in die Schränke ein. Dieser Service ist extrem beliebt bei vielbeschäftigten Berufstätigen oder Expatriates, die keine Zeit haben, sich wochenlang mit Umzugskisten zu beschäftigen."
      },
      {
        "heading": "Möbellift-Einsatz bei engen Platzverhältnissen",
        "body": "In Basler Altbauten (z.B. im Grossbasel oder Kleinbasel) sind die Treppenhäuser oft extrem eng und steil. Hier setzen wir unseren Möbellift ein. Er befördert schwerste Sofas oder Klaviere sicher über die Fassade durchs Fenster direkt in den Transportwagen. Dieser Service schützt das wertvolle Treppenhaus der Immobilie vor Kratzern und das Mobiliar vor Schäden."
      },
      {
        "heading": "Fachgerechte Entsorgung und Räumung",
        "body": "Oft trennt man sich beim Umzug von alten Möbeln oder defekten Elektrogeräten. Wir nehmen Sperrgut am Umzugstag direkt mit und entsorgen es umweltgerecht bei den lokalen Recyclinghöfen im Raum Basel. Das spart Ihnen Zeit und die Miete für einen zusätzlichen Transporter, um selbst zum Werkhof zu fahren."
      },
      {
        "heading": "Warum professionelle Umzugshilfe in Basel den Unterschied macht (Ratgeber)",
        "body": "Die städtischen Verwaltungen in Basel sind anspruchsvoll, und der dichte Verkehr in der Stadt duldet keine unvorbereitete Logistik. Wenn Sie mit Freunden zügeln, riskieren Sie oft Bussen durch falsches Parkieren (z.B. Blockieren der Tramschienen) oder Schäden am gemieteten Fahrzeug. Eine professionelle Umzugsfirma wie SwissCleanMove organisiert im Vorfeld die notwendigen Halteverbote bei der Allmendverwaltung Basel-Stadt, bringt das nötige Know-how, Rollböcke und vor allem eine vollumfängliche Transportversicherung mit. Bei einem privaten Umzug haften private Haftpflichtversicherungen bei Freundschaftsdiensten oft nicht für Schäden am Treppenhaus! Wir empfehlen unseren Kunden, sensible Dokumente und Wertsachen stets persönlich zu transportieren."
      }
    ],
    "serviceBulletsHeading": "Ihre Vorteile mit SwissCleanMove in Basel",
    "serviceBullets": [
      "Transparente, garantierte Pauschalpreise",
      "Kostenlose Beratung und Besichtigung in Basel",
      "Kräftiges, erfahrenes und fest angestelltes Personal",
      "Sicherer Transport inkl. Vollkasko-Versicherung",
      "Organisation von Allmend-Halteverboten in Basel",
      "Interkantonale Umzüge aus und nach Basel"
    ],
    "trustPoints": oldUmzugBasel.trustPoints || ["Garantierte Preise", "Voll versichert", "Schweizweit"],
    "ctaMidHeading": oldUmzugBasel.ctaMidHeading,
    "ctaMidBody": oldUmzugBasel.ctaMidBody,
    "ctaMid": oldUmzugBasel.ctaMid,
    "serviceAreaHeading": "Unser Einsatzgebiet (Basel & Schweizweit)",
    "serviceAreaBody": "Wir decken als professionelles Umzugsunternehmen sowohl Basel-Stadt als auch Baselland (Liestal, Muttenz, Pratteln, Binningen, Allschwil) ab. Ebenso sind wir spezialisiert auf nationale Umzüge aus der Region Basel in jeden anderen Kanton der Schweiz (z.B. Basel-Zürich, Basel-Bern). Unser weitreichendes Netzwerk garantiert Ihnen überall die gleiche hohe Schweizer Umzugsqualität.",
    "internalLinksHeading": oldUmzugBasel.internalLinksHeading,
    "internalLinks": oldUmzugBasel.internalLinks,
    "ctaStrongHeading": oldUmzugBasel.ctaStrongHeading,
    "ctaStrongBody": oldUmzugBasel.ctaStrongBody,
    "ctaStrong": oldUmzugBasel.ctaStrong,
    "testimonial": oldUmzugBasel.testimonial || { "quote": "Der Umzug von Basel nach Zürich verlief absolut perfekt. Sehr speditiv, hochprofessionell und das Team war sehr freundlich.", "author": "Markus K.", "trust": "Zufriedener Kunde" },
    "faqs": [
      {
        "question": "Führen Sie Umzüge in Basel-Stadt und Basel-Landschaft durch?",
        "answer": "Ja, wir betreuen Privat- und Geschäftskunden in der gesamten Region beider Basel. Dazu gehören die Stadt Basel, das Fricktal sowie umliegende Gemeinden wie Binningen, Allschwil, Riehen oder Liestal."
      },
      {
        "question": "Sind interkantonale Umzüge von/nach Basel möglich?",
        "answer": "Ja, das gehört zu unserem Tagesgeschäft. Ob Sie von Basel nach Zürich, Bern, Luzern oder ins Tessin ziehen – wir führen Transporte quer durch die gesamte Schweiz mit grösster Zuverlässigkeit durch."
      },
      {
        "question": "Wie hoch sind die Kosten für einen Umzug in Basel?",
        "answer": "Wir arbeiten mit transparenten Pauschalpreisen. Die Kosten hängen von der Menge der Möbel, der Distanz und allfälligen Zusatzleistungen ab. Nach einer kostenlosen Besichtigung in Basel erhalten Sie eine verbindliche Fixpreis-Offerte."
      },
      {
        "question": "Ist mein Mobiliar während des Transports versichert?",
        "answer": "Absolut. Bei SwissCleanMove ist jeder Umzug durch eine umfassende Transportversicherung sowie eine Betriebshaftpflichtversicherung (für Schäden z.B. am Treppenhaus) abgedeckt. Im Schadensfall übernehmen wir die Verantwortung."
      },
      {
        "question": "Organisieren Sie die Halteverbote in der Stadt Basel?",
        "answer": "Ja. Parkraum in Basel ist sehr knapp. Wir kümmern uns auf Ihren Wunsch um die Anmeldung einer temporären Parkbewilligung bei der Allmendverwaltung Basel und stellen die nötigen Schilder fristgerecht vor Ihrem Gebäude auf."
      },
      {
        "question": "Bieten Sie Umzüge in Basel auch am Wochenende an?",
        "answer": "Ja, wir führen Umzüge auf Anfrage auch am Freitag oder Samstag durch, was besonders für Berufstätige oder Firmen vorteilhaft ist. Wochenendtermine sind sehr beliebt, weshalb wir eine frühzeitige Buchung empfehlen."
      },
      {
        "question": "Demontieren Sie auch komplexe Schränke?",
        "answer": "Ja, unsere Zügelhelfer sind mit dem nötigen Werkzeug ausgestattet und sehr erfahren im Abbau und Wiederaufbau von gängigen Schränken, Betten und Regalsystemen. Wir sorgen dafür, dass alles am neuen Wohnort in Basel wieder stabil steht."
      },
      {
        "question": "Kann ich in Basel Umzugskartons bei Ihnen mieten oder kaufen?",
        "answer": "Ja, wir liefern Ihnen im Vorfeld des Umzugs gerne professionelles Verpackungsmaterial wie stabile Zügelkartons, Kleiderboxen (für den hängenden Transport) und Luftpolsterfolie direkt nach Hause."
      },
      {
        "question": "Kann ich die Endreinigung der alten Wohnung gleich mitbuchen?",
        "answer": "Selbstverständlich. SwissCleanMove ist eine Full-Service-Agentur. Wir bieten in Basel neben dem Umzug auch die professionelle Endreinigung mit 100% Abnahmegarantie an. Kunden, die beides buchen, profitieren von einem Kombi-Preis."
      },
      {
        "question": "Wie lange dauert ein durchschnittlicher Umzug in Basel?",
        "answer": "Ein Umzug einer Standard-3.5-Zimmer-Wohnung innerhalb der Region Basel ist in der Regel innerhalb eines Tages (meist bis zum frühen Nachmittag) abgeschlossen. Bei interkantonalen Zügeln kann sich die Dauer auf zwei Tage erstrecken."
      }
    ]
  };
}

// 4. umzugSchweiz (Template D)
const oldUmzugSchweiz = data.seoPages.umzugSchweiz;
if (oldUmzugSchweiz) {
  data.seoPages.umzugSchweiz = {
    "meta": oldUmzugSchweiz.meta,
    "badge": oldUmzugSchweiz.badge,
    "h1": oldUmzugSchweiz.h1,
    "heroSubtitle": oldUmzugSchweiz.heroSubtitle,
    "ctaSoft": oldUmzugSchweiz.ctaSoft,
    "intro": "Die Schweiz ist ein dynamisches Land, in dem Menschen aus beruflichen, familiären oder persönlichen Gründen oft den Wohnort wechseln. Ein Umzug quer durch die Schweiz, über Kantons- und Sprachgrenzen hinweg, erfordert ein Höchstmass an logistischer Planung und Erfahrung. SwissCleanMove ist Ihr verlässlicher, nationaler Umzugspartner für die gesamte Schweiz. Wir nehmen Ihnen die logistische Planung und das schwere Heben komplett ab, egal, ob Sie von Genf nach St. Gallen, von Basel nach Lugano oder von Zürich nach Bern ziehen. Wir unterstützen Familien, Einzelpersonen, Expatriates und Unternehmen zuverlässig bei jedem Schritt ihres nationalen Umzugs. Wir bieten Ihnen absolute Kostensicherheit durch garantierte Pauschalpreise, unabhängig von der Distanz. In unseren Offerten sind die professionellen Zügelhelfer, die modernen, luftgefederten Langstrecken-Transportfahrzeuge und eine lückenlose Vollkasko-Transportversicherung immer inkludiert. Keine versteckten Kosten, keine bösen Überraschungen. Wir arbeiten extrem speditiv und professionell. Vertrauen Sie auf echte Schweizer Umzugsqualität für Ihr nationales Umzugsprojekt.",
    "sections": [
      {
        "heading": "Ihr Schweizer Umzugspartner für nationale Transporte",
        "body": "Ein nationaler Umzug in der Schweiz bringt spezielle logistische Herausforderungen mit sich: Lange Fahrzeiten, verschiedene Verkehrsregeln in städtischen Zentren, topografische Hürden über Pässe und unterschiedliche kantonale Vorschriften für Halteverbote. Wir kennen die gesamte Schweizer Geografie bestens. Wir bieten keine Standardlösungen, sondern beraten Sie individuell nach einer detaillierten telefonischen Einschätzung oder (regional) durch eine kostenlose Besichtigung vor Ort. Sie bestimmen den Umfang unseres Einsatzes: vom bequemen Komplettumzug inklusive Ein- und Auspackservice bis hin zum sicheren Langstreckentransport Ihrer Möbel. Unser oberstes Ziel ist es, Ihren Umzug schweizweit stressfrei und schadenfrei abzuwickeln. Dies gewährleisten wir durch unsere fest angestellten, mehrsprachigen und erfahrenen Mitarbeiter."
      },
      {
        "heading": "Für wen wir in der Schweiz tätig sind",
        "body": "Wir sind stolz darauf, ein breites Spektrum an Kunden in der ganzen Schweiz zu betreuen: Familien, die aus beruflichen Gründen den Kanton wechseln, Senioren, die in den sonnigen Süden ziehen, sowie nationale und internationale Unternehmen, die Relocation-Services für ihre Mitarbeiter benötigen."
      },
      {
        "heading": "Sorgfältige nationale Privatumzüge",
        "body": "Wir verlagern Ihren kompletten Hausrat sicher von einem Ende der Schweiz zum anderen. Unsere Mitarbeiter verpacken empfindliche Möbelstücke (Antiquitäten, Kunst) mit Stretchfolie und Zügeldecken und sichern diese professionell in unseren modernen Langstrecken-LKWs. Dieser Service richtet sich an alle Privatpersonen in der Schweiz. Kunden buchen uns, weil wir äusserst sorgfältig mit ihren persönlichen Erinnerungsstücken umgehen und den Umzugstag durch perfekte Logistik entspannen."
      },
      {
        "heading": "Büro-, Geschäfts- und Relocation-Umzüge",
        "body": "Für Unternehmen mit Filialen in der ganzen Schweiz bieten wir effiziente Relocation-Services. Wir transportieren schwere Aktenschränke, Server und Büromöbel über weite Distanzen. Um den Betriebsablauf nicht zu stören, führen wir Firmenumzüge auf Wunsch auch am Wochenende durch. Dieser Service ist perfekt für Grossunternehmen und KMU. Geschäftskunden schätzen unsere Termintreue und die präzise, landesweite Planung."
      },
      {
        "heading": "Professioneller Ein- und Auspackservice",
        "body": "Wenn Ihnen die Zeit zum Kistenpacken fehlt, übernehmen wir das für Sie. Unser Team bringt professionelles Packmaterial mit und verpackt Geschirr, Bücher und Kleidung bruchsicher. Am Zielort, egal in welchem Kanton, räumen wir auf Wunsch alles wieder in Ihre Schränke ein. Dieser Service ist ideal für Vielbeschäftigte und Expatriates, da sich ihr persönlicher Aufwand für den Umzug auf nahezu null reduziert."
      },
      {
        "heading": "Fachgerechte Möbelmontage",
        "body": "Grosse Schränke und Betten lassen sich oft nicht am Stück transportieren. Unsere handwerklich versierten Zügelhelfer demontieren Ihre Möbel am alten Wohnort und montieren sie am neuen Standort, hunderte Kilometer entfernt, wieder absolut stabil. Wir bringen sämtliches Werkzeug mit. Dieser Service richtet sich an Kunden, die sich den Ärger mit Anleitungen ersparen wollen."
      },
      {
        "heading": "Einsatz von Möbelliften landesweit",
        "body": "In Altbauten (wie z.B. in den Städten Genf, Basel oder Zürich) mit engen Treppenhäusern setzen wir unseren Möbellift ein, um schwerste Sofas oder Klaviere sicher über die Fassade zu transportieren. Dieser Service schützt das Treppenhaus vor Kratzern und das Mobiliar vor Beschädigungen und beschleunigt den Transport in städtischen Gebieten enorm."
      },
      {
        "heading": "Entsorgung und Räumung",
        "body": "Ein Umzug ist die ideale Gelegenheit, sich von alten Dingen zu trennen. Defekte Geräte oder unerwünschte Möbel nehmen wir am Auszugsort direkt mit und entsorgen diese fachgerecht, bevor wir die weite Fahrt in den neuen Kanton antreten. Das spart Volumen und Kosten."
      },
      {
        "heading": "Umzugs-Ratgeber für die Schweiz: Interkantonale Besonderheiten",
        "body": "Ein Umzug über Kantonsgrenzen hinweg erfordert administrative Sorgfalt. Sie müssen sich am alten Wohnort (Gemeindeverwaltung) abmelden und sich innert der gesetzlichen Frist (meist 14 Tage) am neuen Wohnort anmelden. Denken Sie daran, dass Steuern in der Schweiz kantonal unterschiedlich sind und ein Kantonswechsel unterjährig steuerliche Auswirkungen haben kann. Melden Sie Ihre Adressänderung rechtzeitig beim Strassenverkehrsamt, um die Fahrzeugausweise und Nummernschilder bei Bedarf zu wechseln. Wir raten unseren Kunden zudem, Wertsachen, Pässe und wichtige Unterlagen bei Langstreckenumzügen stets im eigenen Fahrzeug zu transportieren. Was die Logistik betrifft: Überlassen Sie die Beantragung von Halteverboten in grossen Städten (wie Zürich, Genf oder Bern) uns. Die kantonalen Vorschriften sind sehr unterschiedlich, und wir verfügen über die nötige Erfahrung mit den jeweiligen Polizeibehörden."
      }
    ],
    "serviceBulletsHeading": "Ihre Vorteile bei Umzügen in der Schweiz",
    "serviceBullets": [
      "Nationale Pauschalpreise ohne Überraschungen",
      "Erfahrenes, mehrsprachiges Umzugspersonal",
      "Vollständige Transport- und Betriebshaftpflicht",
      "Moderne, luftgefederte Langstrecken-Fahrzeuge",
      "Interkantonale Umzüge (z.B. Zürich-Genf-Lugano)",
      "Organisation von Halteverboten in allen Kantonen"
    ],
    "trustPoints": oldUmzugSchweiz.trustPoints || ["Fixpreise", "Voll versichert", "National"],
    "ctaMidHeading": oldUmzugSchweiz.ctaMidHeading,
    "ctaMidBody": oldUmzugSchweiz.ctaMidBody,
    "ctaMid": oldUmzugSchweiz.ctaMid,
    "serviceAreaHeading": "Unterwegs in der ganzen Schweiz",
    "serviceAreaBody": "Wir decken als professionelles Umzugsunternehmen das gesamte Schweizer Territorium ab. Ob Sie vom Bodensee an den Genfersee ziehen, von Basel ins Tessin oder von Zürich ins Bündnerland – unser Logistiknetzwerk garantiert Ihnen auf jeder Distanz in der Schweiz höchste Pünktlichkeit, Sicherheit und Schweizer Qualität.",
    "internalLinksHeading": oldUmzugSchweiz.internalLinksHeading,
    "internalLinks": oldUmzugSchweiz.internalLinks,
    "ctaStrongHeading": oldUmzugSchweiz.ctaStrongHeading,
    "ctaStrongBody": oldUmzugSchweiz.ctaStrongBody,
    "ctaStrong": oldUmzugSchweiz.ctaStrong,
    "testimonial": oldUmzugSchweiz.testimonial || { "quote": "Ein reibungsloser Umzug von St. Gallen nach Genf. Die Mitarbeiter waren pünktlich, zweisprachig, schnell und sehr sorgfältig. Ich bin begeistert von SwissCleanMove.", "author": "Familie B.", "trust": "Zufriedene Kunden" },
    "faqs": [
      {
        "question": "Führen Sie Umzüge in der gesamten Schweiz durch?",
        "answer": "Ja, wir betreuen Kunden auf dem gesamten Schweizer Staatsgebiet. Ob Deutschschweiz, Romandie, Tessin oder Rätoromanisch-Graubünden – wir führen nationale Transporte und Umzüge in alle 26 Kantone zuverlässig durch."
      },
      {
        "question": "Wie hoch sind die Kosten für einen schweizweiten Umzug?",
        "answer": "Wir bieten faire und transparente Pauschalpreise an, die auf Basis des Transportvolumens und der Distanz berechnet werden. Nach einer Detailerfassung (online oder vor Ort) erhalten Sie von uns eine verbindliche Offerte, in der Fahrtkosten, Helfer und Versicherungen bereits enthalten sind."
      },
      {
        "question": "Ist mein Mobiliar während eines langen Transports versichert?",
        "answer": "Ja. Bei SwissCleanMove ist jeder Umzug, unabhängig von der Distanz, standardmässig durch eine umfassende Transport- und Betriebshaftpflichtversicherung abgedeckt. Im Falle eines Schadens auf der Langstrecke sind Sie vollumfänglich geschützt."
      },
      {
        "question": "Sprechen Ihre Mitarbeiter verschiedene Landessprachen?",
        "answer": "Ja, bei Umzügen über die Sprachgrenzen hinweg (z.B. Röstigraben) setzen wir Teams ein, die zweisprachig (Deutsch/Französisch) oder bei Bedarf auch Italienisch kommunizieren können, um mit Ihnen und lokalen Verwaltungen reibungslos zu interagieren."
      },
      {
        "question": "Wie lange dauert ein Umzug von Zürich nach Genf?",
        "answer": "Bei grossen Distanzen oder hohem Volumen planen wir nationale Umzüge oft über zwei Tage (Tag 1: Einladen am Auszugsort; Tag 2: Fahrt und Ausladen am Zielort), um die Sicherheit des Transports und die gesetzlichen Ruhezeiten der Fahrer zu gewährleisten."
      },
      {
        "question": "Führen Sie auch Büroumzüge auf nationaler Ebene durch?",
        "answer": "Ja, wir übernehmen professionelle Relocation-Services für Gewerbekunden mit Filialen in verschiedenen Kantonen. Wir transportieren IT-Equipment und Büromöbel sicher. Um Ihren Betrieb nicht zu unterbrechen, bieten wir dies auch am Wochenende an."
      },
      {
        "question": "Bauen Sie meine Schränke ab und wieder auf?",
        "answer": "Ja, unsere Zügelhelfer sind mit Werkzeug ausgerüstet und sehr erfahren in der Demontage am alten Wohnort und der fachgerechten Montage am neuen Zielort, egal in welchem Kanton dieser liegt."
      },
      {
        "question": "Bieten Sie auch die Endreinigung der alten Wohnung an?",
        "answer": "Ja, SwissCleanMove ist Ihr Partner für das gesamte Umzugsprojekt. Wir bieten in der ganzen Schweiz auch professionelle Endreinigungen mit 100% Abnahmegarantie an. Wenn Sie umziehen und die alte Wohnung reinigen lassen, bieten wir oft einen Kombi-Rabatt an."
      },
      {
        "question": "Organisieren Sie die Absperrung für den Zügelwagen in anderen Kantonen?",
        "answer": "Ja. Die kantonalen und kommunalen Vorschriften für Halteverbote unterscheiden sich in der Schweiz stark. Wir kennen diese und übernehmen auf Wunsch die Beantragung bei den entsprechenden Polizeibehörden (z.B. in Zürich, Bern, Basel oder Genf)."
      },
      {
        "question": "Kann ich bei Ihnen Umzugskartons kaufen oder mieten?",
        "answer": "Ja, wir versenden oder liefern im Vorfeld des Umzugs gerne hochwertiges Verpackungsmaterial wie stabile Zügelkartons, Kleiderkisten (für hängende Garderobe) und Luftpolsterfolie direkt zu Ihnen nach Hause in der Schweiz."
      }
    ]
  };
}

fs.writeFileSync(dePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated umzugNeuchatel, umzugFribourg, umzugBasel, umzugSchweiz in messages/de.json');
