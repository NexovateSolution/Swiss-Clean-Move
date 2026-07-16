const fs = require('fs');
const path = require('path');

const dePath = path.join(__dirname, 'messages', 'de.json');
const data = JSON.parse(fs.readFileSync(dePath, 'utf8'));

// Helper to preserve original text but expand it for SEO.

// 1. haushaltshilfeBiel
const oldHaushaltshilfeBiel = data.seoPages.haushaltshilfeBiel;
if (oldHaushaltshilfeBiel) {
  data.seoPages.haushaltshilfeBiel = {
    ...oldHaushaltshilfeBiel,
    intro: "Suchen Sie eine zuverlässige und vertrauenswürdige Haushaltshilfe in Biel/Bienne oder im Seeland? SwissCleanMove bietet Ihnen professionelle Unterstützung für Ihren Privathaushalt. Wir wissen, dass der Spagat zwischen Beruf, Familie und Freizeit oft kaum Zeit für die Hausarbeit lässt. Unsere erfahrenen und fest angestellten Reinigungskräfte nehmen Ihnen die lästigen Aufgaben ab, damit Sie Ihre freie Zeit wieder geniessen können. Ab CHF 35 pro Stunde erhalten Sie bei uns einen erstklassigen Service, der exakt auf Ihre Bedürfnisse zugeschnitten ist. Egal ob regelmässiges Staubsaugen, Bodenwischen, das gründliche Reinigen von Bad und Küche oder das Erledigen der Bügelwäsche – wir richten uns ganz nach Ihnen. Unsere Mitarbeiterinnen und Mitarbeiter sind im Raum Biel/Bienne und dem Seeland verwurzelt, wodurch wir kurze Anfahrtswege garantieren. Überlassen Sie die Sauberkeit den Profis und erleben Sie ein stets gepflegtes und strahlendes Zuhause.",
    sections: [
      {
        heading: "Warum eine professionelle Haushaltshilfe in Biel?",
        body: "Die Suche nach einer guten Putzfrau oder Haushaltshilfe in Biel ist oft Vertrauenssache. Bei SwissCleanMove arbeiten wir ausschliesslich mit fest angestellten Mitarbeitern. Das bedeutet für Sie: Keine Schwarzarbeit, keine Probleme mit AHV-Abrechnungen oder Unfallversicherungen. Wir übernehmen sämtliche administrativen Aufgaben als Arbeitgeber. Sie erhalten zudem eine feste Bezugsperson, die Ihre Wohnräume und spezifischen Wünsche genau kennt."
      },
      {
        heading: "Unsere Leistungen für Ihren Haushalt",
        body: "Unsere Dienstleistungen in der Haushaltsreinigung sind modular und flexibel. Zu unseren Standardaufgaben gehören das Saugen und Feuchtwischen aller Böden, die hygienische Reinigung der Sanitäranlagen (WC, Dusche, Badewanne) sowie die Pflege der Küche inklusive Arbeitsflächen und Spülbecken. Auf Wunsch übernehmen wir auch das Fensterputzen, das Wechseln der Bettwäsche oder das Bügeln Ihrer Kleidung. Sie bestimmen das Pflichtenheft."
      },
      {
        heading: "Flexibilität und Zuverlässigkeit im Seeland",
        body: "Wir passen uns Ihrem Rhythmus an. Ob Sie eine wöchentliche Reinigung, einen zweiwöchentlichen Rhythmus oder nur sporadische Hilfe (z.B. für den Frühlingsputz) benötigen – wir sind in Biel und dem gesamten Seeland für Sie da. Sollte Ihre reguläre Haushaltshilfe krankheitsbedingt oder wegen Urlaub ausfallen, organisieren wir auf Wunsch umgehend eine qualifizierte Vertretung, sodass Ihre Wohnung stets sauber bleibt."
      },
      {
        heading: "Umweltfreundliche Reinigungsmittel",
        body: "Die Gesundheit Ihrer Familie und Haustiere liegt uns am Herzen. Deshalb verwenden unsere Haushaltshilfen in Biel bevorzugt biologisch abbaubare und schonende Reinigungsmittel, die Schmutz effektiv entfernen, aber die Raumluft nicht mit aggressiven Chemikalien belasten."
      },
      {
        heading: "Transparente Kosten ohne Überraschungen",
        body: "Bei uns gibt es keine versteckten Gebühren oder langfristigen Knebelverträge. Sie zahlen einen fairen Stundenansatz ab CHF 35. In diesem Preis sind alle Sozialabgaben, Versicherungen und die Anfahrt im Raum Biel/Bienne bereits inkludiert."
      }
    ],
    serviceBulletsHeading: "Vorteile unserer Haushaltshilfe",
    serviceBullets: [
      "Feste Bezugsperson für Ihr Zuhause",
      "Fairer Stundenansatz ab CHF 35",
      "Kein administrativer Aufwand (inkl. AHV & Versicherungen)",
      "Regionale Fachkräfte aus Biel und dem Seeland",
      "Flexible Einsatzintervalle (wöchentlich, zweiwöchentlich)",
      "Auf Wunsch inklusive Bügelservice und Fensterreinigung"
    ],
    faqs: [
      {
        question: "Was kostet eine Haushaltshilfe in Biel bei Ihnen?",
        "answer": "Unser transparenter Stundenansatz für Haushaltshilfen in Biel und dem Seeland beginnt bei CHF 35. Darin sind alle Arbeitgeberabgaben und Versicherungen bereits enthalten."
      },
      {
        question: "Ist immer dieselbe Reinigungskraft bei mir?",
        "answer": "Ja, wir legen grossen Wert auf Vertrauen. Sie erhalten eine feste Bezugsperson. Nur bei Ferien oder Krankheit organisieren wir (in Absprache mit Ihnen) eine Vertretung."
      },
      {
        question: "Werden die Reinigungsmittel von Ihnen gestellt?",
        "answer": "Bei privaten Haushaltshilfen nutzen wir in der Regel Ihre eigenen, bevorzugten Reinigungsmittel und Geräte (z.B. Staubsauger). Auf Wunsch können wir gegen einen kleinen Aufpreis aber auch alles mitbringen."
      },
      {
        question: "Was passiert, wenn etwas in meiner Wohnung kaputt geht?",
        "answer": "Alle unsere fest angestellten Mitarbeiter sind durch eine vollumfängliche Betriebshaftpflichtversicherung abgedeckt. Im seltenen Fall eines Schadens übernehmen wir die Verantwortung."
      },
      {
        question: "Bügeln Sie auch?",
        "answer": "Ja. Das Bügeln von Kleidung und Heimtextilien ist ein beliebter Zusatzservice unserer Haushaltshilfen in Biel, den wir im Rahmen der gebuchten Stunden gerne für Sie übernehmen."
      }
    ]
  };
}

// 2. reinigungsfirmaBiel
const oldReinigungsfirmaBiel = data.seoPages.reinigungsfirmaBiel;
if (oldReinigungsfirmaBiel) {
  data.seoPages.reinigungsfirmaBiel = {
    ...oldReinigungsfirmaBiel,
    intro: "Suchen Sie eine professionelle Reinigungsfirma in Biel/Bienne oder im Seeland? SwissCleanMove ist Ihr verlässlicher, lokaler Partner für sämtliche Reinigungsdienstleistungen. Ob für Privathaushalte, Gewerbebetriebe, Büros oder Liegenschaften – wir garantieren höchste Schweizer Sauberkeitsstandards. Seit unserer Gründung haben wir uns durch Pünktlichkeit, Diskretion und transparente Preise einen exzellenten Ruf in der Region erarbeitet. Wir bieten ein breites Spektrum an Services: Von der regelmässigen Unterhaltsreinigung über die spezialisierte Fenster- und Baureinigung bis hin zur anspruchsvollen Endreinigung mit Abnahmegarantie (ab CHF 350). Wir setzen auf geschultes, fest angestelltes Personal, das Ihre Räumlichkeiten mit grösster Sorgfalt behandelt. Dank unseres Standorts direkt am Bielersee können wir schnell reagieren, kurze Anfahrtswege garantieren und sind in Notfällen sogar innerhalb von 24 Stunden für Sie da.",
    sections: [
      {
        heading: "Umfassende Reinigungsdienste aus einer Hand",
        body: "Als Full-Service-Reinigungsfirma in Biel decken wir jeden Bedarf ab. Privatpersonen schätzen unsere diskreten Haushaltshilfen und Umzugsreinigungen. Geschäftskunden aus Biel und Nidau vertrauen auf unsere effizienten Büro- und Unterhaltsreinigungen, die wir flexibel ausserhalb der Geschäftszeiten durchführen."
      },
      {
        heading: "Qualität und Umweltbewusstsein",
        body: "Wir reinigen nicht nur oberflächlich, sondern hygienisch tiefenrein. Dabei setzen wir auf moderne Reinigungstechniken und bevorzugen umweltfreundliche, biologisch abbaubare Reinigungsmittel. So schützen wir nicht nur Ihre Oberflächen und Böden, sondern auch das Ökosystem rund um den Bielersee."
      },
      {
        heading: "Fest angestelltes Personal statt Subunternehmer",
        body: "Viele Vermittlungsplattformen arbeiten mit Freelancern. Wir nicht. SwissCleanMove beschäftigt ausschliesslich fest angestelltes Personal. Dies garantiert faire Löhne, umfassende Sozialversicherungen und eine kontinuierliche Qualitätskontrolle für unsere Kunden in Biel."
      },
      {
        heading: "Transparenz bei den Kosten",
        body: "Böse Überraschungen auf der Rechnung gibt es bei uns nicht. Wir arbeiten mit klaren Stundenansätzen (z.B. Haushaltshilfe ab CHF 35/h) oder festen Pauschalpreisen (Endreinigung ab CHF 350). Vor jedem grösseren Auftrag in Biel führen wir gerne eine kostenlose Besichtigung durch."
      }
    ],
    serviceBulletsHeading: "Warum SwissCleanMove in Biel wählen?",
    serviceBullets: [
      "Breites Portfolio (Büro-, Wohnungs-, End- und Baureinigung)",
      "Transparente Preise (z.B. Endreinigungen ab CHF 350)",
      "Ausschliesslich fest angestelltes, versichertes Personal",
      "Regionale Verankerung in Biel/Bienne und dem Seeland",
      "Einsatz umweltschonender Reinigungsmittel",
      "Hohe Flexibilität (Notfalleinsätze innert 24h möglich)"
    ],
    faqs: [
      {
        question: "Bieten Sie Ihre Reinigungsdienste nur in Biel an?",
        "answer": "Unser Hauptfokus liegt auf Biel/Bienne und dem gesamten Seeland (Nidau, Lyss, Brügg, Aarberg, etc.). Für grössere Aufträge oder Firmenkunden sind wir aber auch kantonsweit tätig."
      },
      {
        question: "Welche Art von Reinigungen führen Sie durch?",
        "answer": "Wir bieten Endreinigungen mit Abnahmegarantie, regelmässige Unterhalts- und Büroreinigungen, Haushaltshilfe, Fensterreinigungen, Baureinigungen und Spezialreinigungen (z.B. Teppiche) an."
      },
      {
        question: "Ist eine Besichtigung vor Ort kostenlos?",
        "answer": "Ja, für Unterhaltsreinigungen oder komplexe Endreinigungen kommen wir gerne kostenlos zu Ihnen nach Biel, um das Objekt zu besichtigen und Ihnen eine verbindliche Offerte zu erstellen."
      },
      {
        question: "Was kostet eine Endreinigung mit Abnahmegarantie?",
        "answer": "In Biel starten unsere Pauschalpreise für Endreinigungen mit 100% Abnahmegarantie bei CHF 350 für kleine Wohnungen. Der Preis beinhaltet Material und die Anwesenheit bei der Übergabe."
      },
      {
        question: "Arbeiten Sie mit eigenen Reinigungsmitteln?",
        "answer": "Bei Endreinigungen, Bau- und Büroreinigungen bringen wir unser eigenes, professionelles Material mit. Bei privaten Haushaltshilfen verwenden wir auf Wunsch auch Ihre bevorzugten Reinigungsmittel."
      }
    ]
  };
}

// 3. umzugsfirmaBiel
const oldUmzugsfirmaBiel = data.seoPages.umzugsfirmaBiel;
if (oldUmzugsfirmaBiel) {
  data.seoPages.umzugsfirmaBiel = {
    ...oldUmzugsfirmaBiel,
    intro: "Der Wohnungswechsel in, nach oder aus Biel/Bienne steht an und Sie suchen eine kompetente Umzugsfirma? SwissCleanMove ist Ihr starker Logistikpartner direkt aus der Region Seeland. Ein Umzug ist mit viel Stress, Zeitdruck und körperlicher Belastung verbunden – wir nehmen Ihnen diese Arbeit komplett ab. Ob Sie eine kleine Stadtwohnung in der Bieler Altstadt räumen, ein Einfamilienhaus in Evilard beziehen oder mit Ihrem Unternehmen neue Büros in Nidau beziehen, wir sind die richtige Wahl. Wir überzeugen mit absolut transparenten Pauschalpreisen bereits ab CHF 490, in denen 2 bis 4 kräftige Zügelhelfer, ein moderner Transportwagen und eine umfassende Transportversicherung inkludiert sind. Keine versteckten Kosten. Mit über 50 erfolgreich durchgeführten Umzügen im Raum Biel und Seeland verfügen wir über die nötige Erfahrung, um Ihr Hab und Gut sicher, speditiv (Dauer meist 1-2 Tage) und schadenfrei an den neuen Bestimmungsort zu bringen. In dringenden Fällen können wir sogar innert 24 Stunden reagieren.",
    sections: [
      {
        heading: "Ihr lokaler Umzugsspezialist in Biel/Bienne",
        "body": "Biel, mit seiner Zweisprachigkeit, den engen Altstadtgassen und den Quartieren am Hang, erfordert Ortskenntnis. Als lokale Umzugsfirma kennen wir die Verkehrswege und wissen, wo das Parkieren von LKWs schwierig ist. Wir übernehmen bei Bedarf die Einholung von Halteverbotsbewilligungen bei der Stadt Biel."
      },
      {
        heading: "Privat- und Firmenumzüge aus einer Hand",
        "body": "Wir transportieren nicht nur private Möbel und Hausrat sicher. SwissCleanMove ist auch auf Firmenumzüge spezialisiert. Wir verlagern Büros, Praxen und Archive effizient, auf Wunsch auch an Wochenenden, um Ihre geschäftlichen Ausfallzeiten in Biel so gering wie möglich zu halten."
      },
      {
        heading: "Zusatzdienste: Demontage und Packservice",
        "body": "Unser Service endet nicht beim Tragen von Kartons. Unsere Zügelmänner sind handwerklich versiert und bauen grosse Schränke und Betten am alten Ort ab und am neuen Ort wieder stabil auf. Wer gar keine Zeit hat, bucht unseren VIP-Einpackservice, bei dem wir Hausrat und Geschirr professionell verpacken."
      },
      {
        heading: "Die perfekte Kombination: Umzug und Reinigung",
        "body": "Da wir als Full-Service-Agentur in Biel tätig sind, bieten wir Ihnen das Komplettpaket: Den sicheren Möbeltransport und anschliessend die gründliche Endreinigung der alten Wohnung mit 100% Abnahmegarantie. Buchen Sie beides zusammen, profitieren Sie von einem reibungslosen Ablauf und oft von Kombi-Rabatten."
      }
    ],
    serviceBulletsHeading: "Darum SwissCleanMove für Ihren Umzug",
    serviceBullets: [
      "Faire Pauschalpreise ab CHF 490 (inkl. Helfer & Fahrzeug)",
      "Vollständige Transport- und Betriebshaftpflichtversicherung",
      "Kostenlose Vor-Ort-Besichtigung in Biel und Umgebung",
      "Professionelle Demontage und Montage von Möbeln",
      "Notfalleinsätze innert 24 Stunden möglich",
      "Alles aus einer Hand: Umzug und anschliessende Reinigung"
    ],
    faqs: [
      {
        question: "Wie berechnen Sie die Umzugskosten für Biel?",
        "answer": "Wir arbeiten mit Pauschalpreisen ab CHF 490. Der exakte Preis richtet sich nach dem Volumen (Zimmeranzahl), der Distanz und allfälligen Zusatzleistungen (wie Packservice oder Möbellift). Nach einer Besichtigung in Biel erhalten Sie eine Festpreis-Offerte."
      },
      {
        question: "Ist mein Hausrat während des Umzugs versichert?",
        "answer": "Ja, absolut. Jeder Transport von SwissCleanMove ist durch eine lückenlose Transportversicherung abgedeckt. Auch für Schäden am Gebäude (z.B. im Treppenhaus) sind wir haftpflichtversichert."
      },
      {
        question: "Stellen Sie auch Umzugskartons zur Verfügung?",
        "answer": "Wir können Ihnen im Vorfeld des Umzugs professionelle, stabile Zügelkartons, Kleiderboxen für hängende Garderobe und Packmaterial direkt zu Ihnen nach Hause in Biel liefern."
      },
      {
        question: "Führen Sie auch Firmenumzüge in Biel durch?",
        "answer": "Ja, Relocation-Services für Gewerbekunden sind eine unserer Spezialitäten. Wir transportieren Büromöbel, IT-Infrastruktur und Akten sicher und führen diese Einsätze auf Wunsch auch am Wochenende durch."
      },
      {
        question: "Was geschieht, wenn es vor meinem Haus keinen Parkplatz gibt?",
        "answer": "Wir kennen die Parksituation in Biel. Wenn nötig, beantragen wir bei der Stadtpolizei Biel im Voraus ein offizielles Halteverbot, damit unser Zügelwagen am Umzugstag optimal positioniert werden kann."
      }
    ]
  };
}

fs.writeFileSync(dePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated haushaltshilfe, reinigungsfirma, umzugsfirma Biel in messages/de.json');
