const fs = require('fs');
const path = require('path');

const dePath = path.join(__dirname, 'messages', 'de.json');
const data = JSON.parse(fs.readFileSync(dePath, 'utf8'));

// 9. hauswartungBiel
const oldHauswartungBiel = data.seoPages.hauswartungBiel;
if (oldHauswartungBiel) {
  data.seoPages.hauswartungBiel = {
    ...oldHauswartungBiel,
    intro: "Die professionelle Hauswartung ist der Schlüssel zum langfristigen Werterhalt Ihrer Immobilie und sorgt für zufriedene Mieter. Suchen Sie einen zuverlässigen Hauswart in Biel/Bienne oder im Seeland? SwissCleanMove übernimmt die vollumfängliche Betreuung von Wohn- und Gewerbeliegenschaften. Wir entlasten Liegenschaftsverwaltungen und Eigentümer, indem wir als direkter Ansprechpartner vor Ort agieren. Unser Leistungsspektrum umfasst die regelmässige Treppenhausreinigung (ab CHF 120), die technische Überwachung der Haustechnik, das Auswechseln von Leuchtmitteln, die fachgerechte Pflege der Grünanlagen (Rasenmähen, Heckenschnitt) sowie den gesetzlich vorgeschriebenen Winterdienst. Wir zeichnen uns durch proaktives Handeln aus: Unsere Hauswarte erkennen kleine Mängel, bevor sie zu teuren Schäden werden, und melden diese umgehend. Durch unseren Hauptsitz in Biel sind wir bei Notfällen (wie Heizungsausfällen oder Wasserrohrbrüchen) rasch zur Stelle und können erste Massnahmen einleiten. Verlassen Sie sich auf Schweizer Qualität und massgeschneiderte Hauswartungsverträge, die genau auf die Bedürfnisse Ihrer Immobilie abgestimmt sind.",
    sections: [
      {
        "heading": "Sauberkeit im Innenbereich",
        "body": "Das Treppenhaus ist die Visitenkarte jedes Gebäudes. Unsere Hauswarte reinigen Treppen, Eingangsbereiche, Liftkabinen und Waschküchen. Wir wischen feucht auf, entfernen Spinnweben und sorgen dafür, dass sich die Mieter in Ihren Bieler Liegenschaften stets willkommen fühlen."
      },
      {
        "heading": "Technische Kontrollen (Haustechnik)",
        "body": "Ein Ausfall der Heizung im Winter ist ärgerlich. Wir kontrollieren regelmässig den Wasserdruck der Heizanlagen, überprüfen die Einstellungen der Lüftungen und ersetzen defekte Leuchtmittel im Treppenhaus und in der Einstellhalle. Wir fungieren als Bindeglied zu Handwerkern."
      },
      {
        "heading": "Gartenpflege und Umgebungsarbeiten",
        "body": "Die Grünanlage rund um Ihre Liegenschaft wertet das Objekt auf. Wir übernehmen das Rasenmähen, das Jäten von Unkraut, den saisonalen Heckenschnitt und die Laubbeseitigung im Herbst. Wir halten die Zugangswege in Biel sauber und gepflegt."
      },
      {
        "heading": "Pikettdienst und Winterdienst",
        "body": "Im Winter sorgen wir für Sicherheit. Wir räumen Gehwege, Zufahrten und Treppenanlagen vor Ihren Objekten in Biel von Schnee und Eis und bringen Streusalz aus. Bei Notfällen wie Rohrbrüchen ist unser Pikettdienst schnell erreichbar, um grössere Wasserschäden zu verhindern."
      }
    ],
    serviceBulletsHeading: "Vorteile der SwissCleanMove Hauswartung",
    serviceBullets: [
      "Alles aus einer Hand (Reinigung, Garten, Technik)",
      "Proaktive Mängelkontrolle und Rapport an die Verwaltung",
      "Pünktliche Treppenhausreinigung (Pauschalen ab CHF 120)",
      "Zuverlässiger Winterdienst und Pikettdienst in Biel",
      "Fest angestellte, vertrauenswürdige Hauswarte vor Ort",
      "Massgeschneiderte Pflichtenhefte für jede Immobilie"
    ],
    faqs: [
      {
        question: "Was kostet die Hauswartung einer Liegenschaft in Biel?",
        "answer": "Die Kosten hängen vom gewünschten Pflichtenheft ab. Für eine einfache Treppenhausreinigung starten wir bei CHF 120. Für ein Komplettpaket (mit Garten- und Winterdienst) erstellen wir nach Besichtigung eine faire Pauschalofferte."
      },
      {
        question: "Ist der Winterdienst im Hauswartungsvertrag inklusive?",
        "answer": "Das entscheiden Sie. Der Winterdienst kann modular hinzugebucht werden. Wir empfehlen dies dringend, da Eigentümer in Biel für die Sicherheit (Schneeräumung, Salzen) auf den Gehwegen ihrer Liegenschaft haftbar sind."
      },
      {
        question: "Führen Ihre Hauswarte auch Reparaturen aus?",
        "answer": "Kleine Reparaturen (wie Glühbirnenersatz, Einstellen von Türschliessern oder Dichtungswechsel) erledigen wir direkt. Bei grösseren Defekten (z.B. Sanitär/Elektro) informieren wir die Verwaltung und ziehen nach Freigabe Fachfirmen hinzu."
      }
    ]
  };
}

// 10. baureinigungBiel
const oldBaureinigungBiel = data.seoPages.baureinigungBiel;
if (oldBaureinigungBiel) {
  data.seoPages.baureinigungBiel = {
    ...oldBaureinigungBiel,
    intro: "Ein Bauprojekt, sei es ein Neubau oder eine umfassende Renovation, hinterlässt unweigerlich viel Schmutz, Zementschleier und hartnäckigen Baustaub. Suchen Sie nach einer professionellen Baureinigung in Biel/Bienne oder im Seeland? SwissCleanMove ist Ihr Partner für die fachgerechte Baugrob- und Baufeinreinigung. Wir unterstützen Architekten, Bauleitungen und private Bauherren dabei, Immobilien termingerecht und in einem makellosen, bezugsbereiten Zustand zu übergeben. Unser geschultes Reinigungspersonal weiss genau, wie empfindliche neue Oberflächen (wie geölter Parkett oder polierter Naturstein) schonend gereinigt werden, ohne Kratzer zu hinterlassen. Wir entfernen Farbspritzer, Klebereste an neuen Fenstern und saugen feinen Baustaub aus jeder Ritze. Da es auf Baustellen oft zu zeitlichen Verzögerungen kommt, arbeiten wir extrem flexibel und können unsere Teams in Biel bei Bedarf auch sehr kurzfristig – sogar an Wochenenden – einsetzen. Wir arbeiten mit Fixpreisen, sodass Sie als Bauleiter volle Kostenkontrolle über das Projekt haben.",
    sections: [
      {
        "heading": "Baugrobreinigung während der Bauphase",
        "body": "Noch während Handwerker im Haus sind, sorgen wir für Sicherheit und Ordnung. Bei der Baugrobreinigung entfernen wir Bauschutt, Verpackungsmaterial und groben Schmutz. Dies minimiert die Unfallgefahr auf der Baustelle in Biel und ermöglicht einen reibungslosen Ablauf für nachfolgende Handwerker."
      },
      {
        "heading": "Baufeinreinigung vor der Übergabe",
        "body": "Bevor der Eigentümer oder Mieter einzieht, erfolgt die Baufeinreinigung. Wir entfernen den letzten, feinen Baustaub, polieren die neuen Sanitäranlagen, reinigen alle Küchengeräte und putzen die Fenster (inkl. Entfernung von Schutzfolien) komplett streifenfrei. Die Wohnung in Biel wird schlüsselfertig übergeben."
      },
      {
        "heading": "Schonende Reinigung neuer Materialien",
        "body": "Baureinigung erfordert Fachwissen. Falsche Chemikalien können teure Schäden an neuem Parkett oder Armaturen verursachen. Wir verwenden spezielle, materialschonende Reinigungsmittel zur schonenden Entfernung von Zementschleiern und Kleberesten auf empfindlichen Oberflächen."
      },
      {
        "heading": "Hohe Flexibilität für Bauleiter",
        "body": "Bauprojekte in Biel verzögern sich oft. Wir sind es gewohnt, flexibel zu reagieren. Wenn der Maler später fertig wird, passen wir unseren Reinigungsplan an und arbeiten bei Termindruck auch abends oder am Wochenende, um die Übergabefrist sicherzustellen."
      }
    ],
    serviceBulletsHeading: "Ihre Vorteile bei der Baureinigung in Biel",
    serviceBullets: [
      "Bezugsfertige Übergabe (Baufeinreinigung)",
      "Fachgerechte Entfernung von Zementschleier und Farbresten",
      "Schonende Reinigung von empfindlichen Neubau-Materialien",
      "Absolute Termintreue und Flexibilität bei Bauverzögerungen",
      "Kostenlose Objektbesichtigung und Festpreis-Offerte",
      "Einsatzbereit für private Umbauten und grosse Neubauprojekte"
    ],
    faqs: [
      {
        question: "Was ist der Unterschied zwischen Baugrob- und Baufeinreinigung?",
        "answer": "Die Baugrobreinigung findet während der Bauphase statt (Entfernung von Schutt und grobem Schmutz). Die Baufeinreinigung ist der letzte Schritt vor der Schlüsselübergabe in Biel, bei der alles staubfrei und bezugsbereit geputzt wird."
      },
      {
        question: "Entfernen Sie auch Zementschleier von neuen Fliesen?",
        "answer": "Ja, wir verfügen über die nötigen Spezialreiniger und Maschinen, um hartnäckige Zementschleier schonend von neuen Plattenböden oder aus Badezimmern in Biel zu entfernen, ohne die Fugen anzugreifen."
      },
      {
        question: "Sind Sie flexibel, wenn sich der Baufortschritt verzögert?",
        "answer": "Absolut. Wir wissen, dass Termine am Bau oft rutschen. Wir stehen in engem Kontakt mit der Bauleitung in Biel und können unsere Einsätze flexibel und kurzfristig an den tatsächlichen Baufortschritt anpassen."
      }
    ]
  };
}

// 11. gastronomieReinigungBiel
const oldGastronomieReinigungBiel = data.seoPages.gastronomieReinigungBiel;
if (oldGastronomieReinigungBiel) {
  data.seoPages.gastronomieReinigungBiel = {
    ...oldGastronomieReinigungBiel,
    intro: "Die Hygiene in der Gastronomie ist nicht nur ein Qualitätsmerkmal für Ihre Gäste, sondern auch gesetzlich strikt vorgeschrieben. Suchen Sie nach einer verlässlichen Reinigungsfirma für Ihr Restaurant, Ihr Café oder Ihre Grossküche in Biel/Bienne oder im Seeland? SwissCleanMove ist auf die strengen Anforderungen der Gastronomiereinigung spezialisiert. Wir entlasten Ihr Küchen- und Servicepersonal, indem wir nach Betriebsschluss oder am frühen Morgen die tiefengründliche Reinigung übernehmen. Unser Leistungsspektrum umfasst das Entfetten von Abzugsanlagen, die hygienische Desinfektion von Arbeitsflächen und Kühlräumen, die streifenfreie Fensterreinigung sowie die intensive Bodenpflege (inkl. Fugenreinigung) im Gastraum und in der Küche. Wir arbeiten streng nach HACCP-Richtlinien und setzen professionelle Fettlöser sowie lebensmittelechte Desinfektionsmittel ein. Ob tägliche Unterhaltsreinigung oder eine intensive Grundreinigung nach einer anstrengenden Saison – wir schnüren für Ihren Gastronomiebetrieb in Biel ein massgeschneidertes Paket zu fairen Pauschal- oder Stundenpreisen (ab CHF 45-65/h).",
    sections: [
      {
        "heading": "Hygiene in Grossküchen (HACCP)",
        "body": "In der Küche duldet das Lebensmittelinspektorat keine Kompromisse. Wir reinigen und desinfizieren Chromstahloberflächen, entfetten Fritteusen-Umgebungen und Dunstabzugshauben (Brandschutz!) und sorgen dafür, dass Bodenfugen frei von Schmutzrückständen sind. Wir arbeiten strikt nach den gesetzlichen Hygienevorgaben (HACCP)."
      },
      {
        "heading": "Pflege des Gastraums und der Sanitäranlagen",
        "body": "Der erste Eindruck entscheidet. Wir reinigen den Gastraum in Ihrem Bieler Restaurant, saugen und wischen Böden, putzen Tische und Tresen und sorgen für kristallklare Fenster. Die Kundentoiletten werden tiefenhygienisch gereinigt und desinfiziert, damit sich Ihre Gäste rundum wohlfühlen."
      },
      {
        "heading": "Reinigung ausserhalb der Öffnungszeiten",
        "body": "Wir wissen, dass der laufende Betrieb nicht gestört werden darf. Deshalb arbeiten unsere Reinigungsteams flexibel nach Ihren Schliesszeiten (spätnachts) oder in den frühen Morgenstunden, bevor die erste Küchenschicht in Biel beginnt."
      },
      {
        "heading": "Intensive Grundreinigungen (Saisonstart)",
        "body": "Zusätzlich zur täglichen Unterhaltsreinigung bieten wir für die Bieler Gastronomie intensive Grundreinigungen an. Dies umfasst das maschinelle Schrubben von rutschfesten Küchenböden, die Reinigung schwer zugänglicher Kühlzellen oder das Waschen von Vorhängen – ideal vor einem Saisonstart."
      }
    ],
    serviceBulletsHeading: "Vorteile unserer Gastronomiereinigung in Biel",
    serviceBullets: [
      "Strikte Einhaltung der HACCP-Hygienestandards",
      "Tiefengründliche Entfettung von Küchen und Abzügen",
      "Flexible Reinigungszeiten (nachts oder frühmorgens)",
      "Einsatz von lebensmittelechten Reinigungschemikalien",
      "Tägliche Unterhaltsreinigung oder punktuelle Grundreinigung",
      "Kostenlose Besichtigung und massgeschneiderte Offerten"
    ],
    faqs: [
      {
        question: "Arbeiten Sie nach den HACCP-Richtlinien?",
        "answer": "Ja, absolut. Unsere Reinigungskräfte sind im Umgang mit lebensmittelverarbeitenden Betrieben geschult. Wir verwenden spezifische Desinfektionsmittel und reinigen konsequent nach dem Zwei-Eimer-System (Farbcode), um Kreuzkontaminationen im Restaurant in Biel zu vermeiden."
      },
      {
        question: "Können Sie unser Restaurant auch nachts reinigen?",
        "answer": "Ja, die meisten unserer Gastronomiekunden in Biel werden ausserhalb der Öffnungszeiten gereinigt. Wir übernehmen die Reinigung spät abends nach dem Service oder früh morgens, bevor Ihre Küche wieder öffnet."
      },
      {
        question: "Reinigen Sie auch die Dunstabzugsanlagen in der Küche?",
        "answer": "Ja. Das Entfetten der Abzugshauben und der umliegenden Wandfliesen ist ein kritischer Punkt für den Brandschutz in Grossküchen und fester Bestandteil unserer Gastronomiereinigung."
      },
      {
        question: "Wie berechnen Sie die Kosten für ein Restaurant in Biel?",
        "answer": "Aufgrund der unterschiedlichen Anforderungen (Küche vs. Gastraum) besichtigen wir Ihr Objekt in Biel stets kostenlos. Anschliessend vereinbaren wir eine feste Monatspauschale oder arbeiten nach einem fixen Stundenansatz (meist CHF 45-65/h)."
      }
    ]
  };
}

// 12. reinigungsfirmaSchweiz
const oldReinigungsfirmaSchweiz = data.seoPages.reinigungsfirmaSchweiz;
if (oldReinigungsfirmaSchweiz) {
  data.seoPages.reinigungsfirmaSchweiz = {
    ...oldReinigungsfirmaSchweiz,
    intro: "Suchen Sie eine schweizweit tätige, professionelle Reinigungsfirma? SwissCleanMove ist Ihr Premium-Partner für Reinigungsdienstleistungen auf höchstem Schweizer Niveau. Wir verbinden regionale Nähe mit nationaler Reichweite und betreuen Privathaushalte, Liegenschaften sowie grosse Filialnetze von Unternehmen in der ganzen Schweiz. Unser Anspruch ist es, landesweit eine einheitlich hohe Reinigungsqualität zu garantieren. Wir bieten das gesamte Spektrum: Von der regelmässigen Unterhalts- und Büroreinigung über komplexe Baureinigungen bis hin zur Endreinigung mit 100% Abnahmegarantie (ab CHF 350). Wir verzichten bewusst auf den Einsatz von Subunternehmen. All unsere Reinigungskräfte sind fest angestellt, bestens geschult und vollumfänglich versichert. Wir setzen auf moderne Maschinen und umweltfreundliche Reinigungschemikalien, um nachhaltige Sauberkeit zu erzielen. Ob Sie als Privatperson in Zürich eine Haushaltshilfe benötigen oder als Firma in Genf, Bern und Basel einheitliche Sauberkeitsstandards für Ihre Büros wünschen – wir erstellen Ihnen massgeschneiderte Reinigungskonzepte zu transparenten Konditionen.",
    sections: [
      {
        "heading": "Nationale Unterhaltsreinigung für Filialbetriebe",
        "body": "Für Unternehmen mit mehreren Standorten in der Schweiz bieten wir den Vorteil eines einzigen Ansprechpartners. Wir garantieren an allen Standorten (z.B. in Zürich, Bern oder Genf) den gleichen hohen Sauberkeitsstandard in Ihren Büros und Ladenlokalen. Wir arbeiten mit zentralisierten Qualitätskontrollen und einheitlichen Pflichtenheften."
      },
      {
        "heading": "Endreinigungen mit Abnahmegarantie",
        "body": "Wer in der Schweiz umzieht, kennt die strengen Anforderungen der Verwaltungen. Wir führen Endreinigungen nach Auszug durch und garantieren vertraglich die reibungslose Übergabe. Diesen Service bieten wir kantonsübergreifend an, inklusive kostenloser Nachreinigung bei eventuellen Beanstandungen vor Ort."
      },
      {
        "heading": "Umweltbewusste Reinigungsprozesse",
        "body": "Nachhaltigkeit ist uns wichtig. Als Schweizer Reinigungsfirma setzen wir bei all unseren nationalen Einsätzen auf biologisch abbaubare und ökologisch verträgliche Reinigungsmittel. Dies schont die Umwelt, schützt das Material Ihrer Möbel und sorgt für ein gesundes Raumklima für Ihre Mitarbeiter und Familie."
      },
      {
        "heading": "Festanstellung garantiert Schweizer Qualität",
        "body": "Um Qualität landesweit sicherzustellen, verzichten wir auf Freelancer. Jede Reinigungskraft, die für SwissCleanMove in der Schweiz im Einsatz ist, ist fest angestellt. Wir zahlen faire Löhne, führen alle Sozialabgaben ab und garantieren durch unsere Betriebshaftpflichtversicherung vollen Schutz bei eventuellen Schäden."
      }
    ],
    serviceBulletsHeading: "Darum SwissCleanMove schweizweit",
    serviceBullets: [
      "Einheitlich hohe Reinigungsqualität in der ganzen Schweiz",
      "Fest angestelltes und voll versichertes Reinigungspersonal",
      "Ein zentraler Ansprechpartner für Filialbetriebe",
      "Umweltfreundliche, ökologische Reinigungskonzepte",
      "Transparente Preisgestaltung ohne versteckte Gebühren",
      "Breites Portfolio (Büro-, Bau-, Umzugs- und Spezialreinigung)"
    ],
    faqs: [
      {
        question: "In welchen Schweizer Kantonen sind Sie tätig?",
        "answer": "Wir bieten unsere Dienstleistungen landesweit an. Dank unseres dezentralen Netzwerks an fest angestellten Mitarbeitern können wir Reinigungen in der Deutschschweiz, der Romandie und auf Anfrage auch im Tessin durchführen."
      },
      {
        question: "Bieten Sie Rahmenverträge für national tätige Unternehmen?",
        "answer": "Ja. Für Firmen mit mehreren Standorten in der Schweiz (z.B. Detailhandel, Banken, Versicherungen) schnüren wir zentrale Rahmenverträge. Sie profitieren von einheitlichen Preisen und haben nur einen administrativen Ansprechpartner."
      },
      {
        question: "Was kostet eine Endreinigung bei SwissCleanMove?",
        "answer": "Die Preise für eine Umzugsreinigung mit 100% Abnahmegarantie beginnen schweizweit ab CHF 350 (für kleine Wohnungen). Nach einer (häufig digitalen oder telefonischen) Besichtigung erhalten Sie einen verbindlichen Fixpreis."
      },
      {
        question: "Setzen Sie Subunternehmer ein?",
        "answer": "Nein. Um unsere hohen Schweizer Qualitätsstandards und die Zuverlässigkeit zu garantieren, arbeiten wir ausschliesslich mit unserem eigenen, fest angestellten und geschulten Personal."
      }
    ]
  };
}

// 13. umzugsreinigungSchweiz
const oldUmzugsreinigungSchweiz = data.seoPages.umzugsreinigungSchweiz;
if (oldUmzugsreinigungSchweiz) {
  data.seoPages.umzugsreinigungSchweiz = {
    ...oldUmzugsreinigungSchweiz,
    intro: "Der Umzug ist meist schon stressig genug – ersparen Sie sich die kräftezehrende Endreinigung. SwissCleanMove ist Ihr Schweizer Experte für professionelle Umzugsreinigungen mit 100% Abnahmegarantie. Die Immobilienverwaltungen in der Schweiz sind bei der Wohnungsübergabe notorisch streng. Ein übersehener Kalkfleck im Bad oder staubige Fensterfälze können dazu führen, dass die Kaution blockiert wird. Mit uns gehen Sie kein Risiko ein, ganz gleich, in welchem Kanton Sie wohnen. Wir reinigen Ihre Wohnung tiefengründig nach Schweizer Branchenstandards. In unseren transparenten Fixpreisen (ab CHF 350) sind sämtliche Reinigungsmittel, die Fenster- und Storenreinigung sowie die kostenlose Anwesenheit unseres Personals bei der offiziellen Abnahme inbegriffen. Sollte der Verwalter doch ein Detail bemängeln, bessern wir sofort und kostenlos vor Ort nach. Wir sind schweizweit für Sie im Einsatz und koordinieren auf Wunsch auch den Möbeltransport für einen nahtlosen Ablauf aus einer Hand.",
    sections: [
      {
        "heading": "Die 100% Abnahmegarantie in der ganzen Schweiz",
        "body": "Unsere Garantie ist Ihr Schutzschild. Wir kennen die hohen Anforderungen der Schweizer Verwaltungen (von Zürich über Bern bis Genf). Wir garantieren vertraglich, dass Ihre Wohnung abgenommen wird. Falls nicht, übernimmt unser anwesendes Team die Nachreinigung sofort – ohne Zusatzkosten für Sie. Ihre Kaution ist sicher."
      },
      {
        "heading": "Komplettpaket ohne versteckte Kosten",
        "body": "Eine Umzugsreinigung bei uns ist ein All-inclusive-Paket. Wir reinigen den Backofen, entkalken Badarmaturen, putzen Fenster innen und aussen streifenfrei, reinigen die Fensterfälze und Storen und übergeben Balkone sowie Kellerabteile besenrein. Sie erhalten vorab einen garantierten Fixpreis, der nicht überschritten wird."
      },
      {
        "heading": "Kombination: Umzug und Reinigung",
        "body": "SwissCleanMove bietet als nationale Agentur auch Umzüge an. Wenn Sie bei uns den Transport Ihres Hausrats und die anschliessende Endreinigung buchen, profitieren Sie von einer perfekten terminlichen Abstimmung. Die Reinigung beginnt, sobald der letzte Karton verladen ist. Zudem bieten wir oft attraktive Kombi-Rabatte."
      },
      {
        "heading": "Umweltfreundlich und materialschonend",
        "body": "Wir entfernen hartnäckigen Schmutz, ohne die Oberflächen in Ihrer Mietwohnung zu beschädigen. Wir verwenden materialschonende, ökologische Reinigungsmittel, die Kalkablagerungen in Schweizer Badezimmern effektiv lösen, aber die Fugen und Dichtungen intakt lassen."
      }
    ],
    serviceBulletsHeading: "Vorteile unserer Umzugsreinigung Schweiz",
    serviceBullets: [
      "Schriftliche 100% Abnahmegarantie für jede Wohnung",
      "Kostenlose Anwesenheit bei der Wohnungsübergabe",
      "Fixe Pauschalpreise ab CHF 350 (keine Stundenlöhne)",
      "Fenster, Storen und Keller immer im Preis inbegriffen",
      "Schweizweiter Service in allen Kantonen",
      "Perfekt kombinierbar mit unserem Umzugsservice"
    ],
    faqs: [
      {
        question: "Was genau beinhaltet die Abnahmegarantie?",
        "answer": "Wir garantieren, dass die Immobilienverwaltung in der Schweiz die Reinigung akzeptiert. Wenn bei der Begehung ein Detail bemängelt wird, reinigt unser anwesendes Personal diesen sofort nach – absolut kostenlos für Sie."
      },
      {
        question: "Wie berechnen Sie die Kosten für die Endreinigung?",
        "answer": "Wir bieten schweizweit Pauschalpreise an (ab CHF 350 für kleine Wohnungen). Eine Standard-3.5-Zimmer-Wohnung kostet meist ab CHF 490. Wir klären die Details (wie Anzahl Fenster) im Vorfeld ab, um Ihnen einen Fixpreis zu garantieren."
      },
      {
        question: "Sind die Fenster und Storen inbegriffen?",
        "answer": "Ja, unsere Endreinigung ist ein Komplettpaket. Das beidseitige Putzen der Fenster, das Reinigen der Fälze sowie das Reinigen der Rollläden und Lamellenstoren sind immer im Pauschalpreis enthalten."
      },
      {
        question: "Muss die Wohnung für die Reinigung komplett leer sein?",
        "answer": "Ja. Damit wir die strengen Schweizer Abnahmestandards erfüllen und alle Fussleisten und Böden erreichen können, muss die Wohnung am Reinigungstag komplett von Möbeln und Hausrat geräumt sein."
      }
    ]
  };
}

// 14. facilityServiceSchweiz
const oldFacilityServiceSchweiz = data.seoPages.facilityServiceSchweiz;
if (oldFacilityServiceSchweiz) {
  data.seoPages.facilityServiceSchweiz = {
    ...oldFacilityServiceSchweiz,
    intro: "Das Management und der Unterhalt von Immobilien-Portfolios erfordern eine zentrale Koordination und hohe Zuverlässigkeit vor Ort. SwissCleanMove ist Ihr nationaler Partner für integrales Facility Management in der Schweiz. Wir entlasten überregionale Liegenschaftsverwaltungen, Pensionskassen und Unternehmen mit Filialnetzen durch professionelle infrastrukturelle und technische Dienstleistungen aus einer Hand. Egal, ob Ihre Objekte in Genf, Bern, Basel oder Zürich liegen – wir garantieren landesweit einheitliche Schweizer Qualitätsstandards und transparente Prozesse. Unser Facility Service umfasst die Gebäudereinigung (Unterhalt, Treppenhäuser), die Überwachung und Wartung der Haustechnik, die Grünanlagenpflege sowie den rechtlich bindenden Winterdienst. Der grosse Vorteil für nationale Kunden: Sie haben nur noch einen zentralen Ansprechpartner für Ihr gesamtes Schweizer Portfolio. Wir agieren proaktiv, erkennen Schäden an der Bausubstanz frühzeitig und helfen so, den langfristigen Wert Ihrer Immobilien zu sichern und Ihre administrativen Kosten drastisch zu senken.",
    sections: [
      {
        "heading": "Zentrales Management für nationale Portfolios",
        "body": "Verwalten Sie Immobilien in verschiedenen Kantonen? Mit SwissCleanMove reduzieren Sie Ihre Lieferantenanzahl auf eins. Wir schnüren nationale Rahmenverträge mit einheitlichen Leistungsverzeichnissen. Ihr zentraler Account Manager koordiniert alle Hauswarteinsätze in der gesamten Schweiz und liefert Ihnen transparente Reportings."
      },
      {
        "heading": "Infrastrukturelles Facility Management",
        "body": "Der erste Eindruck entscheidet. Wir sorgen für makellose Sauberkeit in Treppenhäusern, Einstellhallen und Bürogebäuden. Unsere Reinigungskräfte arbeiten nach standardisierten, hohen Schweizer Hygienevorgaben und setzen umweltschonende Mittel ein, um die Bausubstanz langfristig zu schützen."
      },
      {
        "heading": "Technischer Hauswartdienst und Pikett",
        "body": "Unsere lokalen Hauswarte prüfen regelmässig Heizungs- und Lüftungsanlagen, tauschen Leuchtmittel und führen kleine Reparaturen sofort aus. Für Störfälle (z.B. Heizungsausfall im Winter oder Liftstörungen) bieten wir einen nationalen Pikettdienst, der Schäden schnell eingrenzt und Fachfirmen koordiniert."
      },
      {
        "heading": "Umgebungspflege und Winterdienst",
        "body": "Die Pflege der Grünanlagen (Rasenmähen, Hecken schneiden) übernehmen wir ebenso wie den gesetzlich vorgeschriebenen Winterdienst. Sobald in der Schweiz Schnee fällt, sorgen unsere lokalen Teams früh am Morgen für schneefreie und gesalzene Zugangswege, um Sie als Eigentümer vor Haftpflichtansprüchen zu schützen."
      }
    ],
    serviceBulletsHeading: "Ihre Vorteile mit Facility Service Schweiz",
    serviceBullets: [
      "Ein zentraler Ansprechpartner für das ganze Schweizer Portfolio",
      "Landesweit einheitliche Qualitäts- und Servicestandards",
      "Kombination aus Reinigung, Technik und Aussenpflege",
      "Zuverlässiger Winterdienst zur Abwendung von Haftungsrisiken",
      "Proaktive Mängelmeldung zur Sicherung des Immobilienwerts",
      "Reduzierter administrativer Aufwand durch Rahmenverträge"
    ],
    faqs: [
      {
        question: "Bieten Sie Facility Management in allen Kantonen an?",
        "answer": "Ja. Wir betreuen Immobilienportfolios in der ganzen Schweiz. Durch unser dezentrales Netzwerk an Mitarbeitern können wir Objekte in der Deutschschweiz, der Romandie und auf Anfrage im Tessin zuverlässig unterhalten."
      },
      {
        question: "Was beinhaltet der technische Dienst?",
        "answer": "Der technische Dienst umfasst regelmässige Rundgänge zur Überwachung der Haustechnik (Heizung, Licht, Lüftung), das Ausführen kleinerer Reparaturen vor Ort und die Alarmierung sowie Begleitung von Fachhandwerkern bei grösseren Defekten."
      },
      {
        question: "Übernehmen Sie die rechtliche Verantwortung beim Winterdienst?",
        "answer": "Ja, im Rahmen unseres Winterdienst-Vertrages übernehmen wir die Pflicht zur Schneeräumung und Eisbekämpfung nach kantonalen Vorgaben und schützen Sie somit vor rechtlichen Ansprüchen bei Unfällen."
      },
      {
        question: "Können die Leistungen individuell angepasst werden?",
        "answer": "Absolut. Wir analysieren jedes Objekt Ihres Portfolios in der Schweiz und erstellen massgeschneiderte Pflichtenhefte – von der reinen Treppenhausreinigung bis hin zum Voll-Service-Paket."
      }
    ]
  };
}

// 15. hauswartungSchweiz
const oldHauswartungSchweiz = data.seoPages.hauswartungSchweiz;
if (oldHauswartungSchweiz) {
  data.seoPages.hauswartungSchweiz = {
    ...oldHauswartungSchweiz,
    intro: "Ein professioneller Hauswart ist die gute Seele jeder Liegenschaft. Er sorgt nicht nur für Sauberkeit, sondern ist auch der erste Ansprechpartner für Mieter und der Garant für den Werterhalt des Gebäudes. Suchen Sie nach einer zuverlässigen Hauswartungslösung für Ihre Immobilien in der Schweiz? SwissCleanMove bietet massgeschneiderte Hauswartungen für Wohn- und Gewerbeliegenschaften im ganzen Land. Wir entlasten Eigentümer und Verwaltungen durch einen proaktiven und integralen Service. Zu unseren Kernaufgaben gehören die wöchentliche Treppenhausreinigung, die Kontrolle der Haustechnik, das Auswechseln von Namensschildern und Leuchtmitteln, die Gartenpflege sowie der Winterdienst (Schneeräumung). Durch unsere nationale Abdeckung können wir Liegenschaftsportfolios in verschiedenen Kantonen mit einheitlichen Qualitätsstandards betreuen. Sie profitieren von unserem zentralen Reporting: Wir melden Mängel oder Reparaturbedarf umgehend digital an die Verwaltung. Unsere fest angestellten Hauswarte sind lokal verankert, sprechen die jeweilige Landessprache und sind bei Notfällen schnell vor Ort. Vertrauen Sie auf SwissCleanMove für eine sorgenfreie Bewirtschaftung.",
    sections: [
      {
        "heading": "Saubere Liegenschaften im Innenbereich",
        "body": "Ein sauberes Treppenhaus ist essenziell für die Zufriedenheit der Mieterschaft. Unsere Schweizer Hauswarte reinigen Treppen, Eingangsbereiche, Liftkabinen und Waschküchen regelmässig. Wir wischen feucht auf, entfernen Spinnweben und sorgen dafür, dass sich die Bewohner in der Liegenschaft stets wohlfühlen."
      },
      {
        "heading": "Technischer Kontrollgang und kleine Reparaturen",
        "body": "Wir kontrollieren regelmässig den Wasserdruck der Heizanlagen, überprüfen die Einstellungen der Lüftungen und ersetzen defekte Leuchtmittel. Bei Ein- oder Auszügen übernehmen wir das Auswechseln der Namensschilder an Briefkasten und Sonnerie. Wir fungieren als Bindeglied zwischen Mietern, Handwerkern und der Verwaltung."
      },
      {
        "heading": "Fachgerechte Garten- und Umgebungspflege",
        "body": "Die Grünanlage rund um Ihre Liegenschaft wertet das Objekt optisch auf. Wir übernehmen das Rasenmähen, das Jäten von Unkraut, den saisonalen Heckenschnitt und die Laubbeseitigung im Herbst. Wir halten Zugangswege, Containerplätze und Einstellhallen in der ganzen Schweiz sauber."
      },
      {
        "heading": "Winterdienst und Pikett in der Schweiz",
        "body": "Im Winter sorgen wir für Sicherheit. Wir räumen Gehwege, Zufahrten und Treppenanlagen rechtzeitig von Schnee und Eis und bringen Streusalz aus. Bei Notfällen (wie Heizungsausfällen im Winter) ist unser lokaler Pikettdienst schnell erreichbar, um erste Massnahmen einzuleiten und Fachfirmen zu alarmieren."
      }
    ],
    serviceBulletsHeading: "Die Vorteile unserer Schweizer Hauswarte",
    serviceBullets: [
      "Alles aus einer Hand: Reinigung, Technik und Garten",
      "Zentrales Reporting von Mängeln an die Verwaltung",
      "Zuverlässiger Winterdienst in allen Schweizer Regionen",
      "Lokale, fest angestellte Hauswarte (keine Subunternehmer)",
      "Einheitliche Qualitätsstandards für nationale Portfolios",
      "Massgeschneiderte Verträge (von Teil- bis Vollwartung)"
    ],
    faqs: [
      {
        question: "Bieten Sie Hauswartungen in der ganzen Schweiz an?",
        "answer": "Ja, SwissCleanMove betreut Liegenschaften landesweit. Unser dezentrales Netzwerk ermöglicht es uns, lokale, fest angestellte Hauswarte in der Deutschschweiz und der Romandie einzusetzen, die mit den örtlichen Gegebenheiten vertraut sind."
      },
      {
        question: "Was kostet die Hauswartung einer Liegenschaft?",
        "answer": "Die Kosten hängen vom gewünschten Pflichtenheft ab. Für eine einfache Treppenhausreinigung bieten wir günstige Pauschalen (ab CHF 120). Für Komplettpakete erstellen wir nach einer Objektbesichtigung eine massgeschneiderte, transparente Offerte."
      },
      {
        question: "Übernehmen Sie auch die Kommunikation mit den Mietern?",
        "answer": "Ja. Der Hauswart ist oft der erste Ansprechpartner vor Ort. Wir nehmen Anliegen der Mieter auf, beheben kleine Probleme direkt und leiten grössere Vorfälle professionell an die Immobilienverwaltung weiter."
      },
      {
        question: "Ist der Winterdienst obligatorisch?",
        "answer": "Nein, unser Service ist modular. Wir empfehlen den Winterdienst jedoch dringend, da Liegenschaftseigentümer in der Schweiz bei Unfällen auf vereisten privaten Gehwegen haftbar gemacht werden können. Wir übernehmen diese Verantwortung für Sie."
      }
    ]
  };
}

fs.writeFileSync(dePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated final 7 service pages in messages/de.json');
