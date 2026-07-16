const fs = require('fs');
const path = require('path');

const dePath = path.join(__dirname, 'messages', 'de.json');
const data = JSON.parse(fs.readFileSync(dePath, 'utf8'));

// 1. umzugBern (Template B)
const oldUmzugBern = data.seoPages.umzugBern;
if (oldUmzugBern) {
  data.seoPages.umzugBern = {
    "meta": oldUmzugBern.meta,
    "badge": oldUmzugBern.badge,
    "h1": oldUmzugBern.h1,
    "heroSubtitle": oldUmzugBern.heroSubtitle,
    "ctaSoft": oldUmzugBern.ctaSoft,
    "intro": "Planen Sie einen Umzug innerhalb des Kantons Bern, ziehen Sie aus einem anderen Kanton in die Bundesstadt, oder verlagern Sie Ihren Wohnsitz von Bern in eine andere Region der Schweiz? Ein Kantonswechsel oder ein Umzug in einer weitreichenden Region wie Bern erfordert höchste logistische Präzision. SwissCleanMove ist Ihr starker, zuverlässiger Umzugspartner für den gesamten Kanton Bern. Mit jahrelanger Erfahrung in der Schweizer Umzugsbranche begleiten wir Familien, Einzelpersonen, Senioren und Unternehmen bei ihrem Standortwechsel. Unser Ziel ist es, Ihnen den Stress und die schwere körperliche Arbeit abzunehmen. Wir bieten Ihnen transparente und garantiert feste Pauschalpreise, in denen unsere modernen, gut ausgestatteten Zügelwagen, unser erfahrenes Team an Zügelmännern sowie eine vollumfängliche Transport- und Betriebshaftpflichtversicherung bereits enthalten sind. Versteckte Kosten oder unvorhergesehene Stundenzuschläge gibt es bei uns nicht. Ob Sie in die historische Altstadt von Bern ziehen, in die malerischen Gemeinden rund um den Thunersee oder ins Berner Oberland – wir meistern jeden Weg sicher und pünktlich. Bei dringenden Umzügen können wir oftmals sehr flexibel reagieren. Überlassen Sie uns die Arbeit und starten Sie entspannt in Ihren neuen Lebensabschnitt.",
    "sections": [
      {
        "heading": "Ihr Umzugsspezialist für den Kanton Bern",
        "body": "Der Kanton Bern zeichnet sich durch eine enorme geografische Vielfalt aus. Von den urbanen Zentren um die Stadt Bern über die Agglomerationstouren nach Köniz oder Ostermundigen bis hin zu den topografisch anspruchsvollen Routen im Emmental oder Berner Oberland – wir kennen die Besonderheiten der Berner Strassen. Eine unserer grössten Stärken ist die persönliche, kostenlose Besichtigung vor Ort. Wir schätzen Ihr Umzugsvolumen exakt ein, prüfen die Zufahrtswege für unsere LKWs und planen den gesamten Ablauf minutiös. Bei SwissCleanMove arbeiten wir ausschliesslich mit fest angestellten, professionell geschulten Zügelhelfern. Dies garantiert Ihnen nicht nur absolute Zuverlässigkeit, sondern auch den respektvollen und sicheren Umgang mit Ihrem wertvollen Hausrat."
      },
      {
        "heading": "Breites Dienstleistungsspektrum für Ihren Berner Umzug",
        "body": "Wir betrachten uns als Full-Service-Agentur für den Kanton Bern. Das bedeutet, dass Sie bei uns Ihren Umzug komplett individuell zusammenstellen können. Wir decken jeden Schritt von der Vorbereitung bis zum Abschluss ab."
      },
      {
        "heading": "Privatumzüge im ganzen Kanton",
        "body": "Ein Privatumzug ist stets Vertrauenssache. Wir transportieren Ihre Möbel, Kartons und liebgewonnenen Erinnerungsstücke mit grösster Sorgfalt. Unsere Mitarbeiter verpacken empfindliche Oberflächen in spezielle Zügeldecken und Stretchfolien und sichern die Ladung im LKW fachgerecht. Ob es sich um eine kleine Stadtwohnung im Breitenrain oder ein geräumiges Chalet im Berner Umland handelt, wir passen unsere Kapazitäten flexibel an. Kunden wählen uns, weil wir zuverlässig sind, den vereinbarten Zeitplan strikt einhalten und den Umzugstag für alle Beteiligten angenehm und ruhig gestalten."
      },
      {
        "heading": "Firmen- und Gewerbeumzüge in Bern",
        "body": "Die Verlagerung eines Unternehmensstandorts in Bern verlangt nach höchster Effizienz. Ausfallzeiten kosten Geld. Wir planen Firmenumzüge präzise, transportieren schwere Aktenschränke, IT-Infrastruktur und Büromöbel sicher an den neuen Standort. Um den laufenden Betrieb nicht zu stören, bieten wir Geschäftskunden in Bern auf Wunsch auch Umzüge am Wochenende oder in den Abendstunden an. Dieser Service ist perfekt für KMU, Arztpraxen oder Kanzleien. Geschäftskunden schätzen unsere strukturierte Vorgehensweise, die sicherstellt, dass am Montagmorgen der Betrieb reibungslos weiterlaufen kann."
      },
      {
        "heading": "Professioneller Ein- und Auspackservice",
        "body": "Das Verpacken von Büchern, Kleidern und empfindlichem Geschirr (z.B. Gläser, Porzellan) kostet enorm viel Zeit. Wenn Sie diese Zeit nicht haben, übernehmen unsere Spezialisten das Einpacken für Sie. Wir bringen professionelle Umzugskartons, Seidenpapier und Luftpolsterfolie direkt zu Ihnen nach Bern. Am Zielort räumen wir auf Wunsch auch alles wieder strukturiert ein. Kunden buchen diesen Service, weil er den Umzugsstress vor dem eigentlichen Zügeltag fast komplett eliminiert und Schäden durch unsachgemässes Packen verhindert."
      },
      {
        "heading": "Möbelmontage durch unsere Handwerker",
        "body": "Grosse Schränke (wie z.B. Schiebetürenschränke oder Pax-Systeme) und komplexe Betten lassen sich oft nicht im Ganzen transportieren. Wir übernehmen die fachgerechte Demontage am Auszugsort und den absolut stabilen Wiederaufbau am neuen Standort im Kanton Bern. Das nötige Werkzeug haben unsere Teams stets dabei. Dieser Service richtet sich an Kunden, die sich den Ärger mit verlorenen Schrauben, komplizierten Bauanleitungen und fehlendem Werkzeug ersparen wollen."
      },
      {
        "heading": "Möbellifteinsatz in der Berner Altstadt",
        "body": "Besonders in historischen Gebäuden (z.B. in der Berner Altstadt) oder in Häusern ohne Lift stösst das reine Tragen über schmale Treppen an seine Grenzen. Hier setzen wir unseren Aussenaufzug (Möbellift) ein, um schwere Sofas, Kühlschränke oder Schränke direkt über den Balkon oder ein breites Fenster zu transportieren. Das schont Ihre Möbel, schützt das Treppenhaus der Immobilie vor Kratzern und beschleunigt den gesamten Umzug enorm."
      },
      {
        "heading": "Entsorgung, Räumung und Einlagerung",
        "body": "Ein Umzug in Bern ist die perfekte Gelegenheit zum Ausmisten. Alte Möbel und defekte Geräte, die nicht mit in die neue Wohnung sollen, nehmen wir am Umzugstag gleich mit und entsorgen diese fachmännisch bei den lokalen Recyclinghöfen. Falls Sie vorübergehend Platz benötigen, beraten wir Sie gerne zu Einlagerungsmöglichkeiten. Dieser Service ist extrem praktisch für Kunden, die sich verkleinern oder ihre Altlasten bequem loswerden möchten, ohne einen eigenen Transporter mieten zu müssen."
      },
      {
        "heading": "Kundenbetreuung und Vorbereitungstipps (Ratgeber Bern)",
        "body": "Um Ihren Umzug im Kanton Bern reibungslos zu gestalten, empfehlen wir eine gute Vorbereitung. Packen Sie Umzugskartons nie zu schwer – das Maximalgewicht sollte 20 kg nicht überschreiten (schwere Bücher in kleine Kisten). Beschriften Sie die Kartons nicht nur auf dem Deckel, sondern auch seitlich mit dem Zielraum. Klären Sie frühzeitig, ob am Auszugs- und Einzugsort ausreichend Parkraum für unseren Zügelwagen vorhanden ist. Wenn Sie in stark frequentierten Quartieren von Bern umziehen, ist oft ein offizielles Halteverbot nötig. Wir können dieses bei der zuständigen Gemeinde oder Stadtpolizei für Sie beantragen. Denken Sie auch daran, Adressänderungen rechtzeitig beim Kanton Bern (Einwohnerkontrolle), der Post und Ihren Versicherungen zu melden. Bei Interkantonalen Umzügen (z.B. von Bern nach Zürich) ist es zudem wichtig, die Zählerstände für Strom und Wasser am Tag des Umzugs gemeinsam mit der Verwaltung zu notieren."
      }
    ],
    "serviceBulletsHeading": "Ihre Vorteile bei Umzügen in Bern",
    "serviceBullets": [
      "Transparente Fixpreise (keine versteckten Gebühren)",
      "Vollständige Transport- und Betriebshaftpflichtversicherung",
      "Kostenlose Objektbesichtigung im Kanton Bern",
      "Erfahrene, fest angestellte und freundliche Zügelmänner",
      "Demontage, Montage und Einpackservice verfügbar",
      "Interkantonale Umzüge aus und nach Bern"
    ],
    "trustPoints": oldUmzugBern.trustPoints || ["Fixpreise", "Versichert", "Schweizweit"],
    "ctaMidHeading": oldUmzugBern.ctaMidHeading,
    "ctaMidBody": oldUmzugBern.ctaMidBody,
    "ctaMid": oldUmzugBern.ctaMid,
    "serviceAreaHeading": "Unser regionales Einsatzgebiet (Kanton Bern & Schweizweit)",
    "serviceAreaBody": "Wir decken als Schweizer Umzugsunternehmen den gesamten Kanton Bern ab, von Bern Stadt über Biel/Bienne, Thun, Burgdorf bis nach Langenthal. Darüber hinaus sind wir auf Umzüge aus dem Kanton Bern in andere Kantone (wie Zürich, Basel, Solothurn, Fribourg oder die Romandie) spezialisiert. Unser weitreichendes Logistiknetzwerk garantiert Ihnen Pünktlichkeit und Zuverlässigkeit auf jeder Distanz.",
    "internalLinksHeading": oldUmzugBern.internalLinksHeading,
    "internalLinks": oldUmzugBern.internalLinks,
    "ctaStrongHeading": oldUmzugBern.ctaStrongHeading,
    "ctaStrongBody": oldUmzugBern.ctaStrongBody,
    "ctaStrong": oldUmzugBern.ctaStrong,
    "testimonial": oldUmzugBern.testimonial || { "quote": "Unser Umzug von Bern nach Zürich verlief perfekt. Die Mitarbeiter waren pünktlich, schnell und sehr achtsam. Ich kann SwissCleanMove nur empfehlen.", "author": "Stefan L.", "trust": "Zufriedener Kunde" },
    "faqs": [
      {
        "question": "Führen Sie Umzüge im gesamten Kanton Bern durch?",
        "answer": "Ja, absolut. Wir betreuen Kunden im gesamten Kantonsgebiet, einschliesslich Bern Stadt, dem Berner Oberland, dem Emmental, dem Seeland (Biel/Bienne) und dem Oberaargau. Wir kennen die Strassen und die lokalen Gegebenheiten bestens."
      },
      {
        "question": "Sind interkantonale Umzüge von Bern in andere Kantone möglich?",
        "answer": "Ja, das ist eine unserer Spezialitäten. Wir führen regelmässig Umzüge von Bern nach Zürich, Basel, Solothurn, Freiburg, Neuchâtel oder in die restliche Schweiz durch. Die Distanz spielt dabei für unsere moderne Flotte keine Rolle."
      },
      {
        "question": "Sind meine Sachen während des Umzugs versichert?",
        "answer": "Ja, vollumfänglich. Jeder von SwissCleanMove durchgeführte Umzug ist durch eine umfassende Transportversicherung sowie eine Betriebshaftpflichtversicherung geschützt. Entsteht ein Schaden am Mobiliar oder am Treppenhaus in Bern, übernehmen wir die Haftung."
      },
      {
        "question": "Wie werden die Umzugskosten für den Kanton Bern berechnet?",
        "answer": "Wir bieten transparente Pauschalpreise, die auf Basis des Transportvolumens (Grösse der Wohnung), der Distanz und allfälligen Zusatzleistungen (wie Montage oder Möbellift) berechnet werden. Nach einer kostenlosen Besichtigung erhalten Sie eine verbindliche Fixpreis-Offerte."
      },
      {
        "question": "Beantragen Sie Halteverbotszonen in der Stadt Bern?",
        "answer": "Die Parksituation in der Stadt Bern (insbesondere in der Altstadt oder in dicht besiedelten Quartieren wie dem Länggasse) kann schwierig sein. Auf Wunsch übernehmen wir die Beantragung eines offiziellen Halteverbots bei der zuständigen Polizeibehörde und stellen die Schilder fristgerecht auf."
      },
      {
        "question": "Können Sie auch schwere Gegenstände wie Klaviere in Bern transportieren?",
        "answer": "Ja. Wir haben das notwendige Equipment (Tragegurte, Rollböcke, Möbellifte) und das geschulte Personal, um Schwergüter wie Klaviere, Safes oder massive Eichentische sicher zu transportieren. Bitte geben Sie solche Objekte bei der Offertanfrage stets an."
      },
      {
        "question": "Kann ich in Bern auch Umzugskartons bei Ihnen beziehen?",
        "answer": "Ja, wir liefern Ihnen im Vorfeld des Umzugs gerne hochwertige Zügelkartons, Kleiderboxen (damit Anzüge hängend transportiert werden können) und Luftpolsterfolie direkt nach Hause im Kanton Bern. Sie können das Material mieten oder kaufen."
      },
      {
        "question": "Bieten Sie auch die Endreinigung der alten Wohnung in Bern an?",
        "answer": "Selbstverständlich. Wir sind eine Full-Service-Agentur und bieten Ihnen neben dem Transport auch die professionelle Endreinigung mit 100% Abnahmegarantie an. Buchen Sie beides zusammen, profitieren Sie von einem reibungslosen Ablauf und oft von einem Kombi-Rabatt."
      },
      {
        "question": "Entsorgen Sie alte Möbel direkt am Umzugstag?",
        "answer": "Ja. Gegenstände, Möbel oder Elektroschrott, die Sie nicht mit in die neue Wohnung nehmen möchten, laden wir auf und entsorgen diese fachgerecht und umweltfreundlich bei den offiziellen Recyclinghöfen im Kanton Bern."
      },
      {
        "question": "Führen Sie Firmenumzüge in Bern auch am Wochenende durch?",
        "answer": "Ja. Wir wissen, dass KMU und Praxen Ausfallzeiten unbedingt vermeiden müssen. Auf Anfrage planen und führen wir Firmenumzüge in Bern auch gerne an Freitagnachmittagen, Samstagen oder Sonntagen durch, damit Sie am Montag direkt weiterarbeiten können."
      },
      {
        "question": "Wie gross sind die Zügelwagen, die Sie einsetzen?",
        "answer": "Unsere Flotte umfasst moderne 3.5-Tonnen-Transporter (ideal für enge Strassen und kleinere Wohnungen in Bern) sowie grosse 7.5-Tonnen-LKW für Einfamilienhäuser, Büroumzüge oder weite Distanzen."
      },
      {
        "question": "Bauen Sie meine Schränke ab und wieder auf?",
        "answer": "Ja, die fachgerechte Demontage und die stabile Montage am Zielort gehören zu unseren Standarddienstleistungen. Unsere Zügelmänner sind handwerklich versiert und haben stets das passende Werkzeug dabei."
      }
    ]
  };
}

// 2. umzugZurich (Template C)
const oldUmzugZurich = data.seoPages.umzugZurich;
if (oldUmzugZurich) {
  data.seoPages.umzugZurich = {
    "meta": oldUmzugZurich.meta,
    "badge": oldUmzugZurich.badge,
    "h1": oldUmzugZurich.h1,
    "heroSubtitle": oldUmzugZurich.heroSubtitle,
    "ctaSoft": oldUmzugZurich.ctaSoft,
    "intro": "Der Kanton Zürich ist der wirtschaftliche Motor der Schweiz und einer der dynamischsten Wohnräume Europas. Ein Umzug in Zürich, sei es innerhalb der Stadt, in die Agglomeration oder ein Kantonswechsel nach Zürich, erfordert eine Umzugsfirma, die höchste Effizienz mit absoluter Zuverlässigkeit vereint. SwissCleanMove ist Ihr Premium-Umzugspartner für Zürich und die gesamte Schweiz. Wir nehmen Ihnen die körperliche Belastung und den Planungsstress komplett ab. Egal, ob Sie in ein modernes Loft in Zürich West ziehen, ein Haus an der Goldküste beziehen oder mit Ihrem Startup in grössere Büros wechseln – unser erfahrenes Team sorgt für einen reibungslosen Ablauf. Wir bieten Ihnen garantierte Pauschalpreise, in denen Zügelhelfer, modernste Transportfahrzeuge und eine umfassende Transportversicherung bereits enthalten sind. Keine unvorhergesehenen Stundenzuschläge, keine bösen Überraschungen. Wir arbeiten speditiv und professionell. Vertrauen Sie auf Schweizer Umzugsqualität, wenn es um Ihren Wechsel nach, von oder innerhalb von Zürich geht.",
    "sections": [
      {
        "heading": "Transport- und Umzugslösungen für den Kanton Zürich",
        "body": "Zürich stellt mit seinem dichten Verkehr, den Tramlinien in der Innenstadt und den oft steilen Wohnstrassen an den Hängen spezifische logistische Anforderungen an einen Umzug. Als erfahrene Schweizer Umzugsfirma kennen wir diese Tücken. Wir bieten Ihnen keine Dienstleistungen von der Stange, sondern eine massgeschneiderte Beratung nach einer kostenlosen Vor-Ort-Besichtigung oder einer detaillierten Online-Schätzung. Sie bestimmen, ob wir den kompletten Umzug inklusive VIP-Einpackservice übernehmen oder lediglich den sicheren Transport Ihrer schweren Möbel. Unser oberstes Ziel ist es, Ihren Wohnungswechsel in Zürich absolut schadenfrei und im vereinbarten Zeitfenster zu realisieren. Dafür setzen wir auf fest angestelltes, geschultes Personal und modernste Fahrzeuge."
      },
      {
        "heading": "Unsere Kernkompetenzen bei Umzügen in Zürich",
        "body": "Als Full-Service-Agentur decken wir alle Arbeitsschritte ab, die für einen stressfreien Umzug notwendig sind. Entdecken Sie unser umfassendes Angebot für Privat- und Geschäftskunden."
      },
      {
        "heading": "Hochwertige Privatumzüge",
        "body": "Wir transportieren Ihren Hausrat sicher an die neue Adresse in Zürich oder schweizweit. Wir verpacken empfindliche Möbel, Antiquitäten oder Designklassiker in spezielle Schutzfolien und Wolldecken und fixieren diese professionell im LKW. Dieser Service richtet sich an Singles, Paare und Familien. Zürcher Kunden wählen uns, weil wir äusserst sorgfältig mit ihrem Eigentum umgehen und den Umzugstag durch unsere ruhige, strukturierte Arbeitsweise deutlich entspannen."
      },
      {
        "heading": "Relocation und Büroumzüge",
        "body": "Für Unternehmen, Agenturen und Kanzleien im Grossraum Zürich bieten wir professionelle Firmenumzüge. Wir verlagern IT-Infrastruktur, Archive und Arbeitsplätze. Um den Geschäftsbetrieb nicht zu stören, planen wir diese Umzüge auf Wunsch auch an Wochenenden oder über Nacht. Geschäftskunden schätzen unsere Termintreue und die extrem präzise Logistik, die teure Ausfallzeiten in Zürich minimiert."
      },
      {
        "heading": "Demontage und Montage von Designermöbeln",
        "body": "Moderne Schrankwände und grossformatige Betten müssen für den Transport zerlegt werden. Unsere handwerklich begabten Zügelhelfer demontieren Ihre Möbel am Auszugsort in Zürich und montieren sie am Zielort wieder passgenau und stabil. Wir bringen unser eigenes, professionelles Werkzeug mit. Dieser Service erspart Ihnen viel Zeit und Frust beim Wiederaufbau."
      },
      {
        "heading": "Stressfreier Ein- und Auspackservice",
        "body": "Wir bringen das nötige Packmaterial mit (Umzugskartons, Kleiderboxen) und verpacken Ihr Geschirr, Bücher und Ihre Garderobe absolut bruchsicher. Am neuen Ort in Zürich räumen wir auf Wunsch alles wieder exakt in die Schränke ein. Dieser Service ist extrem beliebt bei vielbeschäftigten Berufstätigen in Zürich, die keine Zeit haben, sich wochenlang mit Umzugskisten zu umgeben."
      },
      {
        "heading": "Möbellift-Einsatz bei engen Platzverhältnissen",
        "body": "In Zürcher Altbauten (z.B. im Kreis 4 oder Seefeld) sind die Treppenhäuser oft extrem eng. Hier setzen wir unseren Möbellift ein. Er befördert schwerste Sofas oder Klaviere sicher über die Fassade durchs Fenster in den Transportwagen. Dieser Service schützt das wertvolle Treppenhaus der Immobilie vor Kratzern und das Mobiliar vor Schäden."
      },
      {
        "heading": "Fachgerechte Entsorgung und Räumung",
        "body": "Oft trennt man sich beim Umzug von alten Möbeln oder defekten Elektrogeräten. Wir nehmen Sperrgut am Umzugstag direkt mit und entsorgen es umweltgerecht bei den lokalen Zürcher Recyclinghöfen. Das spart Ihnen Zeit und die Miete für einen zusätzlichen Transporter."
      },
      {
        "heading": "Warum professionelle Umzugshilfe in Zürich den Unterschied macht (Ratgeber)",
        "body": "Die Zürcher Immobilienverwaltungen sind anspruchsvoll, und der Verkehr in der Stadt duldet keine Improvisation. Wenn Sie mit Freunden zügeln, riskieren Sie oft Strafzettel durch falsches Parkieren oder Schäden am gemieteten Fahrzeug. Eine professionelle Umzugsfirma wie SwissCleanMove organisiert im Vorfeld die notwendigen Halteverbote (Signalisationsbewilligungen) bei der Stadt Zürich (Dienstabteilung Verkehr), bringt das nötige Know-how, Rollböcke und vor allem eine vollumfängliche Transportversicherung mit. Bei einem privaten Umzug haften private Haftpflichtversicherungen bei Freundschaftsdiensten oft nicht! Zudem ist der Umzug mit uns in wenigen Stunden erledigt. Wir empfehlen unseren Zürcher Kunden, sensible Dokumente und Wertsachen persönlich zu transportieren und am alten wie am neuen Wohnort frühzeitig die Nachbarn über den Umzugstag zu informieren."
      }
    ],
    "serviceBulletsHeading": "Ihre Vorteile mit SwissCleanMove in Zürich",
    "serviceBullets": [
      "Transparente, faire Pauschalpreise",
      "Kostenlose Beratung und Besichtigung vor Ort",
      "Kräftiges, erfahrenes und fest angestelltes Personal",
      "Sicherer Transport inkl. Vollkasko-Versicherung",
      "Organisation von Halteverboten in Zürich",
      "Interkantonale Umzüge aus und nach Zürich"
    ],
    "trustPoints": oldUmzugZurich.trustPoints || ["Garantierte Preise", "Voll versichert", "Schweizweit"],
    "ctaMidHeading": oldUmzugZurich.ctaMidHeading,
    "ctaMidBody": oldUmzugZurich.ctaMidBody,
    "ctaMid": oldUmzugZurich.ctaMid,
    "serviceAreaHeading": "Unser Einsatzgebiet (Zürich & Schweizweit)",
    "serviceAreaBody": "Wir decken als professionelles Umzugsunternehmen den gesamten Kanton Zürich ab (Zürich Stadt, Winterthur, Uster, Dietikon, Wädenswil, Dübendorf etc.). Ebenso sind wir spezialisiert auf Umzüge aus Zürich in jeden anderen Kanton der Schweiz oder umgekehrt (Zürich-Bern, Zürich-Basel). Unser weitreichendes Netzwerk garantiert Ihnen überall die gleiche hohe Schweizer Qualität.",
    "internalLinksHeading": oldUmzugZurich.internalLinksHeading,
    "internalLinks": oldUmzugZurich.internalLinks,
    "ctaStrongHeading": oldUmzugZurich.ctaStrongHeading,
    "ctaStrongBody": oldUmzugZurich.ctaStrongBody,
    "ctaStrong": oldUmzugZurich.ctaStrong,
    "testimonial": oldUmzugZurich.testimonial || { "quote": "Der Umzug unseres Büros im Kreis 5 verlief absolut perfekt. Sehr speditiv, hochprofessionell und zu einem absolut fairen Preis.", "author": "Agenturleiter Z.", "trust": "Zufriedener Geschäftskunde" },
    "faqs": [
      {
        "question": "Führen Sie Umzüge im gesamten Kanton Zürich durch?",
        "answer": "Ja, wir betreuen Privat- und Geschäftskunden im gesamten Kanton Zürich. Dazu gehören die Stadt Zürich mit allen Kreisen, die Agglomeration, das Zürcher Oberland, das Zürcher Unterland sowie Winterthur."
      },
      {
        "question": "Sind interkantonale Umzüge von/nach Zürich möglich?",
        "answer": "Ja, das gehört zu unserem Tagesgeschäft. Ob Sie von Zürich nach Bern, Genf, Basel, St. Gallen oder ins Tessin ziehen – wir führen Transporte quer durch die gesamte Schweiz mit der grössten Zuverlässigkeit durch."
      },
      {
        "question": "Wie hoch sind die Kosten für einen Umzug in Zürich?",
        "answer": "Wir arbeiten mit transparenten Pauschalpreisen. Die Kosten hängen von der Menge der Möbel, der Distanz und allfälligen Zusatzleistungen (wie Einpackservice oder Möbellift) ab. Nach einer kostenlosen Besichtigung in Zürich erhalten Sie eine verbindliche Fixpreis-Offerte."
      },
      {
        "question": "Ist mein Mobiliar während des Transports versichert?",
        "answer": "Absolut. Bei SwissCleanMove ist jeder Umzug in Zürich durch eine umfassende Transportversicherung sowie eine Betriebshaftpflichtversicherung abgedeckt. Im seltenen Fall eines Schadens übernehmen wir die volle Verantwortung."
      },
      {
        "question": "Organisieren Sie die Halteverbote in der Stadt Zürich?",
        "answer": "Ja. Parkraum in Zürich ist knapp. Wir kümmern uns auf Ihren Wunsch um die Anmeldung einer temporären Park- oder Haltebewilligung (Signalisation) bei der Stadt Zürich und stellen die nötigen Schilder fristgerecht auf."
      },
      {
        "question": "Bieten Sie Umzüge in Zürich auch am Wochenende an?",
        "answer": "Ja, wir führen Umzüge auf Anfrage auch am Freitag oder Samstag durch, was besonders für Berufstätige oder Firmen vorteilhaft ist. Wochenendtermine in Zürich sind sehr beliebt, weshalb wir eine frühzeitige Buchung empfehlen."
      },
      {
        "question": "Demontieren Sie auch komplexe Schränke?",
        "answer": "Ja, unsere Zügelhelfer sind mit dem nötigen Werkzeug ausgestattet und sehr erfahren im Abbau und Wiederaufbau von gängigen Schränken, Betten und Regalsystemen. Wir sorgen dafür, dass alles am neuen Wohnort in Zürich wieder stabil steht."
      },
      {
        "question": "Kann ich in Zürich Umzugskartons bei Ihnen mieten oder kaufen?",
        "answer": "Ja, wir liefern Ihnen im Vorfeld des Umzugs gerne professionelles Verpackungsmaterial wie stabile Zügelkartons, Kleiderboxen (für hängende Garderobe) und Luftpolsterfolie direkt nach Zürich."
      },
      {
        "question": "Kann ich die Endreinigung der alten Wohnung gleich mitbuchen?",
        "answer": "Selbstverständlich. SwissCleanMove ist eine Full-Service-Agentur. Wir bieten in Zürich neben dem Umzug auch die professionelle Endreinigung mit 100% Abnahmegarantie an. Kunden, die beides buchen, profitieren von einem Kombi-Preis."
      },
      {
        "question": "Nehmen Sie alte Möbel zur Entsorgung in Zürich mit?",
        "answer": "Ja. Gegenstände, die nicht ins neue Zuhause sollen, laden wir am Umzugstag auf und entsorgen diese fachgerecht und umweltfreundlich bei den offiziellen Zürcher Recyclingzentren."
      },
      {
        "question": "Wie lange dauert ein durchschnittlicher Umzug in Zürich?",
        "answer": "Ein Umzug einer Standard-3.5-Zimmer-Wohnung innerhalb der Agglomeration Zürich ist in der Regel innerhalb eines Tages (meist bis zum frühen Nachmittag) abgeschlossen. Bei interkantonalen Zügeln kann sich die Dauer auf zwei Tage erstrecken."
      },
      {
        "question": "Können Sie auch schwere Gegenstände (z.B. Klaviere) transportieren?",
        "answer": "Ja. Der Transport von schweren Gegenständen wie Klavieren, grossen Tresoren oder Massivholztischen gehört zu unseren Dienstleistungen. Bitte informieren Sie uns im Voraus über besonders schwere Objekte in Zürich."
      }
    ]
  };
}

// 3. umzugSolothurn (Template D)
const oldUmzugSolothurn = data.seoPages.umzugSolothurn;
if (oldUmzugSolothurn) {
  data.seoPages.umzugSolothurn = {
    "meta": oldUmzugSolothurn.meta,
    "badge": oldUmzugSolothurn.badge,
    "h1": oldUmzugSolothurn.h1,
    "heroSubtitle": oldUmzugSolothurn.heroSubtitle,
    "ctaSoft": oldUmzugSolothurn.ctaSoft,
    "intro": "Ein Umzug ist mehr als nur ein Ortswechsel – es ist der Start in ein neues Kapitel. Egal, ob Sie in die wunderschöne Barockstadt Solothurn ziehen, den Kanton verlassen oder aus der restlichen Schweiz in diese lebenswerte Region am Jura-Südfuss kommen, SwissCleanMove ist Ihre vertrauenswürdige Umzugsfirma. Wir nehmen Ihnen die logistische Planung und das schwere Heben komplett ab, damit Sie sich entspannt auf Ihr neues Zuhause freuen können. Wir unterstützen Familien, Einzelpersonen und Firmen zuverlässig bei jedem Schritt ihres Umzugs im Kanton Solothurn. Wir bieten Ihnen absolute Kostensicherheit durch garantierte Pauschalpreise. In unseren Offerten sind die kräftigen Zügelhelfer, die modernen, luftgefederten Transportfahrzeuge und eine lückenlose Transportversicherung immer inkludiert – ganz ohne versteckte Stundenzuschläge. Dank zahlreicher erfolgreicher Umzüge in der Region wissen wir genau, worauf es ankommt. Wir arbeiten extrem speditiv und professionell. Vertrauen Sie auf Schweizer Umzugsqualität, wenn Sie in, nach oder von Solothurn umziehen.",
    "sections": [
      {
        "heading": "Ihr verlässlicher Umzugspartner im Kanton Solothurn",
        "body": "Der Kanton Solothurn bietet mit der Aare, den historischen Stadtzentren (wie Solothurn oder Olten) und den ländlichen Gebieten am Jura eine vielfältige Wohnlandschaft. Dies stellt Umzugsfirmen oft vor besondere Herausforderungen bezüglich Zufahrt und Platzverhältnissen, besonders in den Altstädten. Wir kennen diese Gegebenheiten bestens. Wir bieten keine Standardlösungen, sondern beraten Sie individuell nach einer kostenlosen Besichtigung vor Ort oder einer detaillierten telefonischen Einschätzung. Sie bestimmen den Umfang unseres Einsatzes: vom bequemen Komplettumzug inklusive Einpackservice bis hin zum reinen Transport von Grossmöbeln. Unser oberstes Ziel ist es, Ihren Umzug in Solothurn stressfrei und schadenfrei abzuwickeln. Dies gewährleisten wir durch unser fest angestelltes, geschultes Personal und modernstes Umzugsequipment."
      },
      {
        "heading": "Zielgruppen, die wir im Kanton Solothurn unterstützen",
        "body": "Wir sind stolz darauf, ein breites Spektrum an Kunden zu betreuen: junge Familien, die in den Kanton Solothurn ziehen, Senioren, die in barrierefreie Wohnungen wechseln, sowie lokale KMU und Praxen, die einen schnellen und ausfallfreien Firmenumzug benötigen."
      },
      {
        "heading": "Sorgfältige Privatumzüge",
        "body": "Wir verlagern Ihren kompletten Hausrat sicher in Ihr neues Zuhause. Unsere Mitarbeiter verpacken empfindliche Möbelstücke (Holztische, Glasvitrinen) mit Stretchfolie und Zügeldecken und sichern diese professionell in unseren modernen Zügelwagen. Dieser Service richtet sich an alle Privatpersonen im Kanton Solothurn. Kunden buchen uns, weil wir äusserst sorgfältig mit ihren persönlichen Erinnerungsstücken umgehen und durch unsere routinierte Arbeitsweise den Stress am Umzugstag massiv reduzieren."
      },
      {
        "heading": "Büro- und Geschäftsumzüge in Solothurn",
        "body": "Für Unternehmen in Solothurn und Olten bieten wir effiziente Relocation-Services. Wir transportieren schwere Aktenschränke, Server-Infrastruktur und Büromöbel. Um den Betriebsablauf nicht zu stören, führen wir Firmenumzüge auf Wunsch auch am Wochenende durch. Dieser Service ist perfekt für lokale Gewerbebetriebe. Geschäftskunden schätzen unsere Termintreue und die präzise Planung, die Ausfallzeiten auf ein absolutes Minimum beschränkt."
      },
      {
        "heading": "Professioneller Ein- und Auspackservice",
        "body": "Wenn Ihnen die Zeit zum Kistenpacken fehlt, übernehmen wir das in Solothurn für Sie. Unser Team bringt professionelles Packmaterial mit und verpackt Geschirr, Bücher und Kleidung absolut bruchsicher. Am Zielort räumen wir auf Wunsch alles wieder in Ihre Schränke ein. Dieser Service ist ideal für Vielbeschäftigte. Kunden sind begeistert, weil sich ihr persönlicher Aufwand für den Umzug auf nahezu null reduziert."
      },
      {
        "heading": "Fachgerechte Möbelmontage",
        "body": "Grosse Schränke und Betten lassen sich oft nicht am Stück transportieren. Unsere handwerklich versierten Zügelhelfer demontieren Ihre Möbel am alten Wohnort in Solothurn und montieren sie am neuen Standort wieder absolut stabil. Wir bringen sämtliches Werkzeug mit. Dieser Service richtet sich an Kunden, die sich den Ärger mit Anleitungen und fehlenden Schrauben ersparen wollen und sofort wieder wohnlich eingerichtet sein möchten."
      },
      {
        "heading": "Einsatz von Möbelliften in Altstädten",
        "body": "In Altbauten (wie in der Solothurner Altstadt) mit engen Treppenhäusern stossen auch kräftige Träger an ihre Grenzen. Wir setzen unseren Möbellift ein, um schwerste Sofas oder Klaviere sicher über den Balkon oder durch grosse Fenster zu transportieren. Dieser Service schützt das Treppenhaus vor Kratzern und das Mobiliar vor Beschädigungen und beschleunigt den Transport enorm."
      },
      {
        "heading": "Entsorgung und Räumung",
        "body": "Ein Umzug ist die ideale Gelegenheit, sich von alten Dingen zu trennen. Defekte Geräte oder unerwünschte Möbel nehmen wir am Umzugstag direkt mit und entsorgen diese fachgerecht bei den Recyclingstationen in der Region Solothurn. Dieser Service richtet sich an alle, die Platz schaffen wollen, ohne sich selbst um einen Transporter kümmern zu müssen."
      },
      {
        "heading": "Umzugs-Ratgeber für den Kanton Solothurn",
        "body": "Eine sorgfältige Planung verhindert Stress. Wir raten unseren Kunden in Solothurn, Umzugskartons nicht zu schwer zu beladen (Bücher in kleine Kisten, Kleidung in grosse) und diese an der Seite deutlich mit dem Zielraum zu beschriften. Wertsachen und wichtige Dokumente sollten Sie immer persönlich transportieren. Da das Parkieren des LKW direkt vor dem Haus entscheidend für einen speditiven Umzug ist, sollten Sie frühzeitig prüfen, ob Parkplätze vorhanden sind. Ist dies (z.B. in der Altstadt von Solothurn oder Olten) nicht der Fall, informieren Sie uns rechtzeitig. Wir können dann bei den lokalen Behörden ein offizielles Halteverbot beantragen. Denken Sie auch daran, den Zählerstand (Strom/Wasser) am Umzugstag abzulesen und rechtzeitig Nachsendeaufträge bei der Post einzurichten. Mit SwissCleanMove haben Sie zudem den Vorteil, dass Ihre Helfer voll haftpflichtversichert sind – anders als bei Zügelhilfen durch Freunde, wo Schäden im Treppenhaus oft nicht gedeckt sind."
      }
    ],
    "serviceBulletsHeading": "Ihre Vorteile bei Umzügen in Solothurn",
    "serviceBullets": [
      "Feste Pauschalpreise ohne Überraschungen",
      "Kostenlose Vor-Ort-Besichtigung im Kanton Solothurn",
      "Kräftiges, erfahrenes und fest angestelltes Personal",
      "Vollständige Transport- und Betriebshaftpflicht",
      "Moderne, luftgefederte Zügelwagen",
      "Interkantonale Umzüge (Solothurn - Bern/Basel/Zürich)"
    ],
    "trustPoints": oldUmzugSolothurn.trustPoints || ["Fixpreise", "Voll versichert", "Schweizweit"],
    "ctaMidHeading": oldUmzugSolothurn.ctaMidHeading,
    "ctaMidBody": oldUmzugSolothurn.ctaMidBody,
    "ctaMid": oldUmzugSolothurn.ctaMid,
    "serviceAreaHeading": "Unterwegs in Solothurn und der ganzen Schweiz",
    "serviceAreaBody": "Wir decken als professionelles Umzugsunternehmen den gesamten Kanton Solothurn ab (Solothurn, Olten, Grenchen, Oensingen, Balsthal). Durch unsere geografische Nähe zum Mittelland sind wir zudem der ideale Partner für Umzüge aus dem Kanton Solothurn in die umliegenden Kantone Bern, Basel, Aargau und die restliche Schweiz.",
    "internalLinksHeading": oldUmzugSolothurn.internalLinksHeading,
    "internalLinks": oldUmzugSolothurn.internalLinks,
    "ctaStrongHeading": oldUmzugSolothurn.ctaStrongHeading,
    "ctaStrongBody": oldUmzugSolothurn.ctaStrongBody,
    "ctaStrong": oldUmzugSolothurn.ctaStrong,
    "testimonial": oldUmzugSolothurn.testimonial || { "quote": "Ein reibungsloser Umzug von Olten nach Solothurn. Die Mitarbeiter waren pünktlich, schnell und sehr sorgfältig. Ich bin begeistert.", "author": "Familie B.", "trust": "Zufriedene Kunden aus Solothurn" },
    "faqs": [
      {
        "question": "Führen Sie Umzüge im gesamten Kanton Solothurn durch?",
        "answer": "Ja, wir betreuen Kunden im gesamten Kantonsgebiet. Egal ob Sie im Bezirk Lebern, Olten, Gösgen, Thal oder Wasseramt wohnen – wir sind überall im Kanton Solothurn für Sie im Einsatz."
      },
      {
        "question": "Sind interkantonale Umzüge von/nach Solothurn möglich?",
        "answer": "Selbstverständlich. Wir führen regelmässig Umzüge von Solothurn in angrenzende Kantone wie Bern, Basel, Aargau oder auch quer durch die Schweiz (z.B. nach Zürich oder in die Romandie) durch."
      },
      {
        "question": "Wie hoch sind die Kosten für einen Umzug in Solothurn?",
        "answer": "Wir bieten faire und transparente Pauschalpreise. Die genauen Kosten hängen von der Menge Ihrer Möbel und der Distanz ab. Nach einer kostenlosen Besichtigung in Solothurn erhalten Sie von uns eine verbindliche Offerte, in der Zügelwagen, Helfer und Versicherungen bereits enthalten sind."
      },
      {
        "question": "Ist mein Mobiliar während des Transports versichert?",
        "answer": "Ja. Bei SwissCleanMove ist jeder Umzug in Solothurn standardmässig durch eine umfassende Transport- und Betriebshaftpflichtversicherung abgedeckt. Sollte trotz grösster Sorgfalt ein Schaden entstehen, übernimmt unsere Versicherung die Kosten."
      },
      {
        "question": "Führen Sie auch Büroumzüge in Solothurn durch?",
        "answer": "Ja, wir übernehmen professionelle Relocation-Services für Gewerbekunden. Wir transportieren IT-Equipment, Archive und schwere Büromöbel sicher. Um Ihren Geschäftsbetrieb in Solothurn nicht zu unterbrechen, bieten wir Firmenumzüge auch gerne am Wochenende an."
      },
      {
        "question": "Bauen Sie meine Schränke ab und wieder auf?",
        "answer": "Ja, unsere Zügelhelfer sind mit Werkzeug ausgerüstet und sehr erfahren in der fachgerechten Demontage und Montage von gängigen Möbeln (z.B. Kleiderschränke, Boxspringbetten). Wir sorgen dafür, dass alles am neuen Wohnort in Solothurn wieder einwandfrei und stabil steht."
      },
      {
        "question": "Können Sie auch alte Möbel für mich entsorgen?",
        "answer": "Ja, wenn Sie beim Umzug ausmisten, nehmen wir alte, unerwünschte Möbel, Teppiche oder defekte Elektrogeräte am Umzugstag direkt mit und entsorgen diese fach- und umweltgerecht bei den lokalen Recyclinghöfen im Kanton Solothurn."
      },
      {
        "question": "Bieten Sie auch die Endreinigung der alten Wohnung in Solothurn an?",
        "answer": "Ja, SwissCleanMove ist Ihr Partner für das gesamte Umzugsprojekt. Wir bieten in Solothurn auch professionelle Endreinigungen mit 100% Abnahmegarantie an. Kunden, die Umzug und Reinigung bei uns bündeln, profitieren von einem stressfreien Ablauf."
      },
      {
        "question": "Organisieren Sie die Absperrung für den Zügelwagen in Solothurn?",
        "answer": "Wenn vor Ihrem alten oder neuen Wohnort (z.B. im Zentrum von Solothurn oder Olten) nicht ausreichend Parkfläche für unseren Zügelwagen vorhanden ist, können wir nach Rücksprache gerne ein offizielles Halteverbot bei der Gemeinde beantragen."
      },
      {
        "question": "Kann ich bei Ihnen Umzugskartons kaufen oder mieten?",
        "answer": "Ja, wir liefern Ihnen im Vorfeld des Umzugs gerne hochwertiges Verpackungsmaterial wie stabile Zügelkartons, Kleiderkisten (für hängende Anzüge/Kleider) und Luftpolsterfolie direkt nach Solothurn."
      },
      {
        "question": "Führen Sie Umzüge auch am Wochenende durch?",
        "answer": "Ja, um Ihnen grösstmögliche Flexibilität zu bieten, sind unsere Zügelteams auf Voranmeldung auch an Freitagen und Samstagen für Umzüge im Kanton Solothurn im Einsatz."
      },
      {
        "question": "Wie gross sind die eingesetzten Umzugswagen?",
        "answer": "Wir haben eine vielfältige, luftgefederte Flotte. Wir nutzen wendige 3.5-Tonnen-Transporter für die Altstädte und Quartiere sowie grosse 7.5-Tonnen-LKW für Einfamilienhäuser und grössere Volumina."
      }
    ]
  };
}

fs.writeFileSync(dePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated umzugBern, umzugZurich, umzugSolothurn in messages/de.json');
