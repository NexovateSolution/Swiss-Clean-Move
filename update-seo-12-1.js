const fs = require('fs');
const path = require('path');

const dePath = path.join(__dirname, 'messages', 'de.json');
const data = JSON.parse(fs.readFileSync(dePath, 'utf8'));

// Helper function to create massive sections for SEO expansion
const expandPage = (key, title, localName, isBiel, specificServiceData) => {
  const existing = data.seoPages[key];
  if (!existing) return;

  const baseRegion = isBiel ? "Biel/Bienne und das gesamte Seeland" : "die gesamte Schweiz";
  const regionSpecifics = isBiel ? "Biel, Nidau, Lyss, Brügg, Ipsach, Aarberg, und Pieterlen" : "Zürich, Bern, Basel, Genf, Luzern, Solothurn, Fribourg, Neuchâtel und Jura";

  existing.intro = `Willkommen bei SwissCleanMove, Ihrem führenden Experten für ${title} in ${baseRegion}. Wenn Sie auf der Suche nach höchster Qualität, Schweizer Zuverlässigkeit und absolut transparenten Preisen sind, dann haben Sie den richtigen Partner gefunden. ${specificServiceData.introHook} Wir verstehen, dass Dienstleistungen im Bereich Reinigung, Umzug und Facility Management absolute Vertrauenssache sind. Deshalb setzen wir bei SwissCleanMove nicht auf anonyme Subunternehmer, sondern auf unser eigenes, fest angestelltes und bestens geschultes Personal. Dies garantiert nicht nur faire Arbeitsbedingungen, sondern auch eine gleichbleibend hohe Qualität für Sie als Kunde in ${regionSpecifics}. Ob Sie eine Privatperson sind, die eine diskrete Haushaltshilfe sucht, ein Unternehmen, das eine regelmässige Büroreinigung benötigt, oder eine Liegenschaftsverwaltung, die einen kompetenten Hauswartdienst erfordert – wir decken das gesamte Spektrum ab. Unsere Philosophie basiert auf Kundennähe, proaktiver Kommunikation und dem Einsatz modernster Arbeitsmittel. Mit unserer weitreichenden Erfahrung und unzähligen erfolgreich abgeschlossenen Aufträgen in ${baseRegion} wissen wir genau, worauf es ankommt. ${specificServiceData.introStats} Wir legen grossen Wert auf Nachhaltigkeit und verwenden, wo immer möglich, umweltschonende, biologisch abbaubare Reinigungsmittel. Entdecken Sie auf dieser Seite alles, was Sie über unsere Dienstleistungen wissen müssen, wie unser Prozess abläuft und warum sich so viele zufriedene Kunden in der Region für uns entscheiden. Zögern Sie nicht, uns für eine kostenlose und unverbindliche Besichtigung oder Offerte zu kontaktieren.`;

  existing.sections = [
    {
      "heading": `Warum ${title} in ${baseRegion}?`,
      "body": `Die Wahl des richtigen Dienstleisters für ${title} ist entscheidend für Ihre Zufriedenheit. In ${baseRegion} gibt es viele Anbieter, doch SwissCleanMove sticht durch einen kompromisslosen Fokus auf Schweizer Qualitätsstandards hervor. Wir kennen die spezifischen Anforderungen der Kunden in ${regionSpecifics} genau. Unser Personal ist lokal verankert, was kurze Anfahrtswege, schnelle Reaktionszeiten und eine hohe Flexibilität ermöglicht. ${specificServiceData.section1} Ein weiterer wesentlicher Aspekt ist unsere absolute Transparenz. Bei uns gibt es keine versteckten Kosten, keine unklaren Stundenzuschläge und keine bösen Überraschungen auf der Rechnung. Wir erstellen Ihnen detaillierte, faire Offerten, an die wir uns strikt halten. Zudem sind alle unsere Mitarbeiter umfassend versichert (Betriebshaftpflicht, Unfall), sodass Sie als Auftraggeber stets auf der sicheren Seite sind. Wir übernehmen die komplette administrative Abwicklung, was für Sie maximale Entlastung bedeutet. Lehnen Sie sich zurück und überlassen Sie die harte Arbeit den Profis.`
    },
    {
      "heading": "Unser detaillierter Arbeitsprozess",
      "body": `Ein professionelles Ergebnis bei der ${title} erfordert strukturierte Abläufe. Bei SwissCleanMove überlassen wir nichts dem Zufall. Der erste Schritt ist immer eine gründliche Bedarfsanalyse. Oft führen wir in ${baseRegion} eine kostenlose Vor-Ort-Besichtigung durch, um die genauen Gegebenheiten zu erfassen. ${specificServiceData.section2} Auf Basis dieser Besichtigung erstellen wir ein massgeschneidertes Pflichtenheft, in dem alle Aufgaben und Intervalle detailliert festgehalten werden. Am Tag der Ausführung erscheint unser Team pünktlich mit modernstem Equipment und professionellen, materialschonenden Reinigungsmitteln oder Werkzeugen. Unsere Teamleiter überwachen die Ausführung vor Ort und garantieren, dass das Pflichtenheft Punkt für Punkt abgearbeitet wird. Nach Abschluss der Arbeiten führen wir eine strenge Qualitätskontrolle durch. Erst wenn wir selbst zu 100% zufrieden sind, übergeben wir das Ergebnis an Sie. Dieser strukturierte Prozess ist das Geheimnis unseres langjährigen Erfolgs und der hohen Kundenzufriedenheit in ${baseRegion}.`
    },
    {
      "heading": "Lokale Expertise und schnelle Verfügbarkeit",
      "body": `Dank unserer starken Präsenz in ${baseRegion} können wir Dienstleistungen für ${title} nicht nur in höchster Qualität, sondern auch mit bemerkenswerter Schnelligkeit anbieten. Wir sind vertraut mit den Besonderheiten der Region, von den engen Gassen in der Altstadt bis hin zu grossen Gewerbeparks. ${specificServiceData.section3} Gerade in Notfällen, sei es ein kurzfristig ausgefallener Reinigungstermin, ein dringender Umzug oder ein Wasserschaden, der sofortige Reinigung erfordert, beweist unser Pikettdienst seine Stärke. Oft sind wir in der Lage, innerhalb von 24 Stunden ein kompetentes Team vor Ort in ${regionSpecifics} zu haben. Wir passen uns Ihrem Terminplan an und bieten Einsätze auch am Wochenende, am Abend oder in den frühen Morgenstunden an, um Ihren privaten oder geschäftlichen Ablauf nicht zu stören.`
    },
    {
      "heading": "Umweltbewusstsein und Nachhaltigkeit",
      "body": `Als modernes Schweizer Unternehmen übernehmen wir Verantwortung für unsere Umwelt. Dies gilt ganz besonders im Bereich der Reinigung. Wir haben unsere Prozesse für ${title} in den letzten Jahren konsequent auf Nachhaltigkeit ausgerichtet. ${specificServiceData.section4} Wir verwenden primär biologisch abbaubare und ökozertifizierte Reinigungsmittel, die effektiv gegen Schmutz sind, aber die Flora und Fauna rund um den Bielersee und in der Schweiz nicht belasten. Zudem dosieren wir durch moderne Mikrofasersysteme und spezielle Dosieranlagen den Wasser- und Chemikalienverbrauch exakt. Dies schont nicht nur die Umwelt, sondern schützt auch die wertvollen Oberflächen Ihrer Möbel, Böden und Immobilien. Auch im Bereich Umzug und Transport achten wir auf optimierte Routenplanung, um den CO2-Ausstoss unserer modernen Fahrzeugflotte so gering wie möglich zu halten.`
    },
    {
      "heading": "Sicherheit, Versicherung und Vertrauen",
      "body": `Wenn Sie fremden Personen Zugang zu Ihrer Wohnung oder Ihren Geschäftsräumen in ${baseRegion} gewähren, ist Vertrauen das wichtigste Gut. SwissCleanMove ist sich dieser Verantwortung bewusst. Alle unsere Mitarbeiter, die im Bereich ${title} eingesetzt werden, durchlaufen vor ihrer Festanstellung einen strengen Selektionsprozess inklusive Prüfung des Betreibungs- und Strafregisters. ${specificServiceData.section5} Darüber hinaus verfügen wir über eine umfassende Betriebs- und Berufshaftpflichtversicherung. Sollte während unserer Arbeit tatsächlich einmal ein Kratzer im Parkett entstehen oder ein Gegenstand beschädigt werden, sind Sie vollumfänglich abgesichert. Wir übernehmen die Verantwortung – ohne Diskussionen. Diese Kombination aus sorgfältiger Personalauswahl und starkem Versicherungsschutz gibt unseren Kunden in der ganzen Schweiz das beruhigende Gefühl, in den besten Händen zu sein.`
    },
    {
      "heading": "Die Vorteile einer Festanstellung",
      "body": `Im Gegensatz zu vielen Vermittlungsplattformen, die lediglich Aufträge an Freelancer oder Subunternehmer weiterreichen, sind wir ein echter Arbeitgeber. Was bedeutet das für Sie bei der Buchung von ${title}? Es bedeutet konstante Qualität. Unsere Mitarbeiter identifizieren sich mit SwissCleanMove. Sie erhalten regelmässige interne Schulungen zu neuen Reinigungstechniken, Ergonomie am Arbeitsplatz und Sicherheitsvorschriften. ${specificServiceData.section6} Zudem profitieren Sie davon, dass Sie oft dieselben vertrauten Gesichter bei sich begrüssen dürfen, was besonders bei regelmässigen Unterhaltsreinigungen oder Hauswartungen enorm wichtig ist. Für Sie entfällt jeglicher administrative Aufwand bezüglich AHV, SUVA oder Quellensteuer – all dies erledigen wir. Sie erhalten lediglich eine transparente, monatliche Rechnung.`
    },
    {
      "heading": "Massgeschneiderte Lösungen für Privat und Gewerbe",
      "body": `Jeder Kunde hat unterschiedliche Bedürfnisse. Ein Privathaushalt in Biel benötigt eine andere Herangehensweise als ein Grossraumbüro in Bern oder ein Filialbetrieb in Zürich. Im Bereich ${title} bieten wir deshalb keine starren Pakete an, sondern vollkommen flexible, modulare Lösungen. ${specificServiceData.section7} Privatkunden schätzen unsere Diskretion und die Möglichkeit, spezielle Wünsche wie das Bügeln von Wäsche oder die Reinigung von Kellerabteilen in den Vertrag aufzunehmen. Gewerbliche Kunden wiederum profitieren von unseren SLA (Service Level Agreements), festen Ansprechpartnern und der Möglichkeit, Reinigungszeiten so zu legen, dass der Geschäftsbetrieb in keiner Weise gestört wird. Wir skalieren unsere Dienstleistungen mit Ihrem Unternehmen: Wenn Sie wachsen, wächst unser Reinigungsteam einfach mit.`
    }
  ];

  existing.serviceBulletsHeading = `Ihre Premium-Vorteile für ${title}`;
  existing.serviceBullets = [
    "Kostenlose Vor-Ort-Besichtigung und transparente, verbindliche Offerten",
    "Ausschliesslich fest angestelltes, geschultes und geprüftes Personal",
    "Umfassende Betriebshaftpflichtversicherung für maximale Sicherheit",
    "Einsatz modernster, umweltschonender Maschinen und Reinigungsmittel",
    `Lokale Verankerung und Expertise in ${baseRegion}`,
    "Massgeschneiderte Pflichtenhefte, perfekt auf Ihre Bedürfnisse abgestimmt",
    "Flexible Einsatzzeiten (Abend, Wochenende, Notfälle innert 24h)",
    "Ein einziger, persönlicher Ansprechpartner für alle Belange",
    "Lückenlose Qualitätskontrolle durch unsere erfahrenen Teamleiter",
    "Keine versteckten Gebühren, keine unklaren Zuschläge, kein administrativer Aufwand"
  ];

  // Generate 12 massive FAQs
  existing.faqs = [
    {
      question: `Wie wird der Preis für ${title} genau berechnet?`,
      answer: `Die Berechnung ist bei SwissCleanMove stets transparent und fair. Abhängig vom spezifischen Service arbeiten wir entweder mit Fixpreisen (z.B. bei Endreinigungen ab CHF 350 oder Umzügen ab CHF 490), mit fixen Stundenansätzen (z.B. Haushaltshilfe ab CHF 35/h) oder Quadratmeterpreisen. Wir empfehlen immer eine kostenlose Besichtigung vor Ort in ${baseRegion}, um Ihnen eine exakte und verbindliche Offerte ausstellen zu können, in der alle Kosten inkludiert sind.`
    },
    {
      question: `Arbeiten Sie bei ${title} mit eigenem Equipment?`,
      answer: `In den allermeisten Fällen bringen wir alles selbst mit. Für gewerbliche Reinigungen, Baureinigungen, Endreinigungen und Umzüge sind unsere Fahrzeuge komplett ausgestattet mit Profi-Staubsaugern, Einscheibenmaschinen, Reinigungsmitteln, Leitern und Werkzeugen. Lediglich bei privaten Haushaltshilfen nutzen wir auf Wunsch der Kunden manchmal deren bevorzugte Geräte vor Ort.`
    },
    {
      question: `Wie schnell können Sie in ${baseRegion} vor Ort sein?`,
      answer: `Dank unserer starken regionalen Struktur sind wir extrem reaktionsschnell. In Notfällen, etwa bei Ausfall einer Putzkraft oder nach einem Wasserschaden, können wir in der Region oft innerhalb von 24 bis 48 Stunden ein professionelles Einsatzteam mobilisieren. Für planbare Arbeiten empfehlen wir eine Vorlaufzeit von 1-2 Wochen.`
    },
    {
      question: `Was passiert, wenn während der Arbeit etwas beschädigt wird?`,
      answer: `Sicherheit hat bei uns oberste Priorität. Dennoch kann auch bei grösster Vorsicht einmal etwas zu Bruch gehen. In diesem seltenen Fall sind Sie als Kunde komplett abgesichert. Wir verfügen über eine sehr weitreichende Betriebs- und Berufshaftpflichtversicherung, die Schäden an Ihrem Eigentum in der Schweiz anstandslos reguliert.`
    },
    {
      question: `Setzen Sie Subunternehmer oder Freelancer ein?`,
      answer: `Nein, ganz bewusst nicht. Um unsere hohen Qualitätsstandards bei ${title} zu halten, vertrauen wir ausschliesslich auf unser eigenes, fest angestelltes Personal. Dies garantiert nicht nur Qualität, sondern schützt Sie als Kunden auch vor jeglichen Haftungsrisiken im Zusammenhang mit Schwarzarbeit oder fehlenden Versicherungen.`
    },
    {
      question: `Sind Ihre Mitarbeiter in den Bereichen Diskretion und Datenschutz geschult?`,
      answer: `Absolut. Dies ist besonders bei der Büroreinigung und in privaten Haushalten von enormer Wichtigkeit. Jeder unserer Mitarbeiter unterzeichnet eine strenge Verschwiegenheitserklärung. Daten, Akten oder private Gegenstände werden mit absolutem Respekt und absoluter Diskretion behandelt.`
    },
    {
      question: `Welche Reinigungsmittel verwenden Sie?`,
      answer: `Wir setzen den Fokus auf Nachhaltigkeit und Materialschonung. Wir verwenden professionelle, biologisch abbaubare und ökozertifizierte Schweizer Reinigungsmittel, die effektiv gegen Schmutz und Bakterien vorgehen, aber die Oberflächen Ihrer Immobilie (wie Echtholzparkett oder Naturstein) schonen und keine giftigen Dämpfe hinterlassen.`
    },
    {
      question: `Kann ich den Termin für ${title} flexibel verschieben oder absagen?`,
      answer: `Wir legen Wert auf Flexibilität. Termine können gemäss unseren Allgemeinen Geschäftsbedingungen verschoben werden. Bei Krankheit oder Ferien können Sie Einsätze der Unterhaltsreinigung in Absprache mit uns pausieren oder verschieben, ohne dass Ihnen dabei zusätzliche Kosten entstehen.`
    },
    {
      question: `Wie erfolgt die Bezahlung der Dienstleistungen?`,
      answer: `Die Bezahlung ist unkompliziert. Nach erbrachter Leistung bei Endreinigungen oder Umzügen erhalten Sie eine detaillierte Rechnung (zahlbar innert 10-30 Tagen). Bei regelmässigen Dienstleistungen wie der Büroreinigung oder Hauswartung stellen wir am Ende des Monats eine übersichtliche Sammelrechnung aus.`
    },
    {
      question: `Bieten Sie Garantien auf Ihre Arbeit?`,
      answer: `Ja. Bei Endreinigungen nach einem Auszug gewähren wir eine 100% Abnahmegarantie, die uns vertraglich dazu verpflichtet, bei Mängeln durch die Verwaltung kostenlos nachzureinigen. Auch bei allen anderen Dienstleistungen garantieren wir, dass das vereinbarte Pflichtenheft fehlerfrei umgesetzt wird.`
    },
    {
      question: `Muss ich während der Arbeiten vor Ort in ${baseRegion} sein?`,
      answer: `Das ist nicht zwingend notwendig. Viele unserer Kunden übergeben uns den Schlüssel (oft mit einer Schlüsselquittung dokumentiert), damit wir die Arbeiten während ihrer Abwesenheit (oder ausserhalb der Bürozeiten) ausführen können. Sie können aber selbstverständlich auch gerne anwesend sein.`
    },
    {
      question: `Ist es immer dieselbe Person, die zu mir kommt?`,
      answer: `Bei wiederkehrenden Aufträgen (wie Haushaltshilfe, Hauswartung oder Unterhaltsreinigung) stellen wir sicher, dass Ihnen ein festes Team oder eine feste Bezugsperson zugewiesen wird. Nur bei Ferien oder Krankheit organisieren wir eine Vertretung, die dank des detaillierten Pflichtenhefts sofort weiss, was zu tun ist.`
    }
  ];
};

// 1. haushaltshilfeBiel
expandPage('haushaltshilfeBiel', 'private Haushaltshilfe', 'Biel', true, {
  introHook: "Das Führen eines Haushalts neben Beruf und Familie ist eine enorme Herausforderung. Wir nehmen Ihnen den Stress und schenken Ihnen wertvolle Freizeit zurück.",
  introStats: "Mit über 500 regelmässig betreuten Haushalten im Raum Biel sind wir der Marktführer für private Haushaltsdienstleistungen.",
  section1: "Das Waschen, Bügeln, Saugen und Wischen wird zur Nebensache, während Sie sich auf das konzentrieren, was wirklich zählt.",
  section2: "Wir analysieren, welche Bodenbeläge Sie haben, welche Reiniger erlaubt sind und ob Sie Haustiere haben.",
  section3: "Auch in Randgebieten wie Leubringen, Evilard oder den Seegemeinden sind wir täglich unterwegs.",
  section4: "Für private Haushalte ist ein gesundes Raumklima wichtig. Wir meiden aggressive Dämpfe.",
  section5: "Jede Putzfee wird von uns persönlich geschult.",
  section6: "Sie haben einen festen Ansprechpartner, der Ihren Haushalt in- und auswendig kennt.",
  section7: "Von wöchentlicher Basisreinigung bis zum täglichen Full-Service inklusive Einkaufen – alles ist möglich."
});

// 2. reinigungsfirmaBiel
expandPage('reinigungsfirmaBiel', 'professionelle Reinigungsdienstleistungen', 'Biel', true, {
  introHook: "Eine saubere Umgebung fördert die Produktivität im Büro und das Wohlbefinden zu Hause. Vertrauen Sie der führenden Reinigungsfirma in Biel.",
  introStats: "Täglich reinigen unsere Teams über 10'000 Quadratmeter Fläche im gesamten Seeland.",
  section1: "Ob Spezialreinigung von Fassaden, tiefengründliche Teppichreinigung oder tägliche Bürohygiene – wir meistern jede Herausforderung.",
  section2: "Wir definieren Reinigungszonen nach Hygieneanforderungen (z.B. Sanitärbereiche vs. Empfangshalle).",
  section3: "Unsere Fahrzeugflotte ist zentral in Biel stationiert, was uns extrem agil macht.",
  section4: "Als ISO-konforme Reinigungsfirma halten wir strenge Umweltschutzvorgaben ein.",
  section5: "Gerade bei der Reinigung von Anwaltskanzleien oder Arztpraxen in Biel ist unsere Diskretion sprichwörtlich.",
  section6: "Wir schulen auf das Farbcode-System, um Kreuzkontaminationen absolut zu verhindern.",
  section7: "Ein Coiffeursalon benötigt eine andere Reinigung als eine Maschinenbauhalle – wir passen uns an."
});

// 3. umzugsfirmaBiel
expandPage('umzugsfirmaBiel', 'stressfreie Umzüge', 'Biel', true, {
  introHook: "Ein Wohnungswechsel zählt zu den stressigsten Erlebnissen im Leben. Mit der richtigen Umzugsfirma aus Biel wird dieser Tag jedoch zu einem entspannten Erlebnis.",
  introStats: "Wir haben in den letzten Jahren hunderte von Familien und Unternehmen im Seeland erfolgreich und schadenfrei umgezogen.",
  section1: "Unsere Zügelmänner sind echte Kraftpakete, die auch empfindliche Klaviere oder schwere Tresore sicher transportieren.",
  section2: "Die Planung beginnt mit einer Volumenberechnung und der Einholung von Parkbewilligungen in der Stadt Biel.",
  section3: "Die engen Gassen der Bieler Altstadt oder Häuser am Jurahang meistern unsere Fahrer dank modernster Möbellifte mühelos.",
  section4: "Wir nutzen wiederverwendbare Umzugsboxen und umweltschonendes Packpapier statt Plastikfolie.",
  section5: "Die Transportversicherung ist bei jedem unserer Umzüge obligatorisch und im Preis inklusive.",
  section6: "Unsere handwerklich begabten Mitarbeiter übernehmen auch die komplexe Montage von Schränken und Betten.",
  section7: "Wir bieten auch spezielle Relocation-Services für Expats und Manager, die nach Biel ziehen."
});

// 4. unterhaltsreinigungBiel
expandPage('unterhaltsreinigungBiel', 'Gewerbliche Unterhaltsreinigung', 'Biel', true, {
  introHook: "Der erste Eindruck Ihres Unternehmens beginnt bereits im Eingangsbereich. Ein gepflegtes Büro ist Ihre beste Visitenkarte.",
  introStats: "Zahlreiche namhafte KMU und Verwaltungen im Seeland vertrauen ihre Unterhaltsreinigung täglich uns an.",
  section1: "Hygiene am Arbeitsplatz reduziert den Krankenstand Ihrer Mitarbeiter nachweislich.",
  section2: "Wir erstellen Reinigungspläne, die den Arbeitsfluss Ihrer Mitarbeiter nicht stören, oft in den frühen Morgenstunden.",
  section3: "Wir reinigen Büros in der Bieler Innenstadt ebenso zuverlässig wie Fabrikhallen in den Industriezonen.",
  section4: "Wir nutzen Dosiersysteme, um Überdosierung von Reinigungschemie in grossen Gebäuden zu vermeiden.",
  section5: "Vertrauen Sie uns die Schlüsselkarte zu Ihrem Büro beruhigt an. Unser Zugangsprotokoll ist lückenlos.",
  section6: "Unsere Qualitätsprüfer führen unangemeldete Kontrollen durch, um das hohe Niveau langfristig zu halten.",
  section7: "Wir bieten auch das Auffüllen von Verbrauchsmaterialien (Seife, WC-Papier) als bequemen Zusatzservice an."
});

// 5. fensterreinigungBiel
expandPage('fensterreinigungBiel', 'streifenfreie Fensterreinigung', 'Biel', true, {
  introHook: "Strahlender Glanz für Ihr Zuhause oder Ihre Schaufenster. Wir lassen das Licht zurück in Ihre Räume.",
  introStats: "Jährlich reinigen unsere Glas- und Gebäudereiniger tausende von Fenstern, Wintergärten und Glasfassaden in der Region.",
  section1: "Das Putzen von Glas ist eine Kunst. Wir reinigen nicht nur das Fensterglas, sondern pflegen auch Rahmen und Fälze.",
  section2: "Mit professionellen Einwaschern, Abziehern und dem Einsatz von entmineralisiertem Wasser (Osmose-Verfahren) erreichen wir perfekte Ergebnisse ohne Kalkflecken.",
  section3: "Für hohe Schaufenster oder Dachfenster bringen wir unsere eigenen Hubsteiger oder Teleskopstangen mit.",
  section4: "Das Osmose-Verfahren ermöglicht die Reinigung von Fassaden völlig ohne den Einsatz von Chemie.",
  section5: "Unsere Fensterputzer sind speziell für Arbeiten in der Höhe gesichert (SUVA-konform).",
  section6: "Wir sind schnell, leise und effizient, damit Ihre Aussicht auf den See schnellstmöglich wieder makellos ist.",
  section7: "Abonnements für Schaufensterreinigungen sind besonders bei Ladenbesitzern in der Bieler Nidaugasse beliebt."
});

fs.writeFileSync(dePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully expanded first 5 pages to massive length.');
