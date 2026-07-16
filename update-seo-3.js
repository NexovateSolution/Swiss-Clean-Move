const fs = require('fs');
const path = require('path');

const dePath = path.join(__dirname, 'messages', 'de.json');
const data = JSON.parse(fs.readFileSync(dePath, 'utf8'));

// 1. endreinigungNidau (Template A)
const oldEndreinigungNidau = data.seoPages.endreinigungNidau;
if (oldEndreinigungNidau) {
  data.seoPages.endreinigungNidau = {
    "meta": oldEndreinigungNidau.meta,
    "badge": oldEndreinigungNidau.badge,
    "h1": oldEndreinigungNidau.h1,
    "heroSubtitle": oldEndreinigungNidau.heroSubtitle,
    "ctaSoft": oldEndreinigungNidau.ctaSoft,
    "intro": "Ein Auszug aus Ihrer Wohnung in Nidau steht bevor und die Endreinigung bereitet Ihnen Kopfzerbrechen? SwissCleanMove nimmt Ihnen diese Last komplett ab. Wir sind Ihr regionaler Spezialist für gründliche Endreinigungen mit 100% Abnahmegarantie in Nidau und Umgebung. Bei der Wohnungsübergabe schauen Hausverwaltungen extrem genau hin – Kalkablagerungen oder unsaubere Fensterrahmen können schnell zu Problemen führen. Mit uns sind Sie auf der sicheren Seite: Wir garantieren, dass Ihre Wohnung vom Vermieter beim ersten Termin anstandslos abgenommen wird. Falls doch ein Detail beanstandet wird, reinigt unser anwesendes Personal sofort und kostenlos nach. So ist sichergestellt, dass Sie Ihre volle Kaution ohne Diskussionen zurückerhalten. Wir bieten Ihnen transparente, fixe Pauschalpreise ab CHF 350, je nach Wohnungsgrösse. Eine typische Wohnungsreinigung dauert bei uns 4 bis 8 Stunden. Dank unserer Nähe zu Nidau profitieren Sie von kurzen Wegen, keinen versteckten Anfahrtskosten und bei Bedarf sogar von einer Verfügbarkeit innerhalb von 24 Stunden. Vertrauen Sie auf Schweizer Standards und ein erfahrenes Team aus dem Seeland.",
    "sections": [
      {
        "heading": "Warum SwissCleanMove in Nidau wählen?",
        "body": "Nidau hat viele wunderschöne Altbauten und moderne Neubauten, und jede Immobilie erfordert eine spezifische Herangehensweise bei der Reinigung. Als lokales Unternehmen kennen wir die Ansprüche der Immobilienverwaltungen im Seeland bestens. Wir arbeiten nicht nach Stundenaufwand, der unvorhersehbar teuer werden kann, sondern bieten Ihnen einen garantierten Pauschalpreis nach einer kostenlosen Besichtigung. Unser Team verwendet ausschliesslich professionelle, umweltschonende Reinigungsmittel, die hartnäckigen Schmutz entfernen, ohne die Materialien zu beschädigen. Wenn Sie SwissCleanMove wählen, entscheiden Sie sich für Stressfreiheit, Pünktlichkeit und die absolute Sicherheit, dass die Wohnungsübergabe ein voller Erfolg wird."
      },
      {
        "heading": "Unsere umfassenden Reinigungsdienste im Überblick",
        "body": "Eine Abnahme-Garantie-Reinigung umfasst weit mehr als nur Staubsaugen. Nachfolgend sehen Sie im Detail, welche Bereiche unserer Endreinigung in Nidau inkludiert sind und wieso diese für eine erfolgreiche Übergabe essenziell sind."
      },
      {
        "heading": "Tiefenreinigung der Küche",
        "body": "Die Küche ist der kritischste Punkt bei jeder Abnahme. Wir reinigen sämtliche Küchengeräte tiefgründig. Dazu gehört das Entfetten des Dampfabzugs inklusive Filterwechsel (falls vorhanden), die gründliche Innen- und Aussenreinigung des Backofens und des Kühlschranks. Wir reinigen sämtliche Küchenkästchen und Schubladen, befreien Arbeitsflächen von Flecken und entkalken die Spüle. Dieser Service richtet sich an alle Mieter, da hier die meisten Mängel bei der Übergabe beanstandet werden. Unsere Kunden vertrauen uns, weil wir selbst eingebranntes Fett und starke Kalkränder rückstandslos entfernen."
      },
      {
        "heading": "Hygienische Badezimmerreinigung",
        "body": "Badezimmer in Nidau weisen oft Kalkablagerungen auf. Wir entkalken Armaturen, Duschkabinen, Badewannen und Waschbecken bis in den letzten Winkel. Auch Toilette, Bidet und die gesamten Fugen werden hygienisch gereinigt und desinfiziert. Spiegel, Ablagen und Lüftungsgitter werden streifenfrei geputzt. Dieser Service ist für jeden Ausziehenden entscheidend. Kunden schätzen unsere Expertise, da wir mit speziellen Sanitärreinigern arbeiten, die Bakterien eliminieren und Kalk lösen, ohne die Dichtungen anzugreifen."
      },
      {
        "heading": "Professionelle Fenster- und Storenreinigung",
        "body": "Strahlende Fenster werten die gesamte Wohnung auf. Wir reinigen nicht nur die Glasscheiben innen und aussen streifenfrei, sondern putzen auch intensiv die Fensterrahmen und die oft verschmutzten Fensterfälze. Die Reinigung der Storen (Rollläden, Jalousien) inklusive der Führungsschienen ist ein fester Bestandteil unserer Abnahmereinigung. Diese Dienstleistung richtet sich an Mieter in allen Stockwerken. Wir übernehmen diesen gefährlichen und mühsamen Part sicher und effizient für Sie."
      },
      {
        "heading": "Gründliche Boden- und Teppichpflege",
        "body": "Jeder Bodenbelag benötigt eine andere Behandlung. Wir saugen alle Räume gründlich, entfernen Staub aus den Fussleisten und wischen Hartböden (Parkett, Laminat, Fliesen) nebelfeucht oder feucht auf. Auch die Fugen zwischen den Bodenfliesen werden intensiv gereinigt. Bei Teppichböden entfernen wir oberflächliche Flecken. Dieser Service ist essenziell, da der Boden das Erste ist, was die Verwaltung sieht. Wir werden dafür geschätzt, dass wir die passenden Pflegeprodukte für jeden Bodentyp verwenden."
      },
      {
        "heading": "Wände, Türen und Decken",
        "body": "Spinnweben an der Decke oder Fingerabdrücke an den Türrahmen können bei strengen Verwaltungen zu Abzügen führen. Wir entstauben Wände, reinigen sämtliche Zimmertüren inklusive Klinken und Zargen und wischen Heizkörper feucht ab. Auch Einbauschränke werden komplett gereinigt. Dieser Detail-Service richtet sich an Kunden, die in ihrer Wohnung gelebt haben und sicherstellen wollen, dass keine Gebrauchsspuren übersehen werden."
      },
      {
        "heading": "Balkone, Keller und Aussenbereiche",
        "body": "Oft vergessen, aber zwingend erforderlich: die Reinigung der Nebenräume. Wir wischen und fegen den Balkonboden in Nidau, reinigen das Geländer und beseitigen groben Schmutz. Auch Ihr zugehöriges Kellerabteil, die Garage oder der Estrich werden von uns besenrein übergeben und von Spinnweben befreit. Kunden sind froh über diese Komplettlösung, da diese Bereiche beim Auszug oft als Zwischenlager dienen und zuletzt gereinigt werden müssen."
      },
      {
        "heading": "Ratgeber: Was Verwaltungen in Nidau bei der Übergabe erwarten",
        "body": "Eine Wohnungsübergabe folgt in der Schweiz strengen Regeln. Verwaltungen erwarten nicht nur Sauberkeit, sondern auch Funktionsfähigkeit. SwissCleanMove kümmert sich um die Reinigung, aber Sie sollten vor unserem Eintreffen sicherstellen, dass alle Möbel entfernt sind. Denken Sie daran, eventuelle Dübellöcher fachgerecht zu verschliessen, sofern das im Mietvertrag vorgeschrieben ist (oder beauftragen Sie uns rechtzeitig damit). Kontrollieren Sie zudem, ob alle Schlüssel vollständig vorhanden sind und ob allfällige kleine Reparaturen (wie das Ersetzen defekter Glühbirnen oder kaputter Zahnputzbecher) erledigt wurden. Am Abgabetag sind wir gerne persönlich anwesend, um etwaige Fragen der Verwaltung zur Reinigung sofort zu beantworten."
      }
    ],
    "serviceBulletsHeading": "Unsere Qualitäts-Garantien in Nidau",
    "serviceBullets": [
      "Schriftliche 100% Abnahmegarantie",
      "Kostenlose Nachreinigung bei der Übergabe",
      "Transparenter Pauschalpreis ohne Zusatzkosten",
      "Pünktlichkeit und Zuverlässigkeit",
      "Umweltfreundliche Reinigungschemikalien",
      "Persönliche Betreuung durch lokales Team"
    ],
    "trustPoints": oldEndreinigungNidau.trustPoints || ["100% Abnahmegarantie", "Kaution zurück", "Lokales Team"],
    "ctaMidHeading": oldEndreinigungNidau.ctaMidHeading,
    "ctaMidBody": oldEndreinigungNidau.ctaMidBody,
    "ctaMid": oldEndreinigungNidau.ctaMid,
    "serviceAreaHeading": "Unser Einzugsgebiet für Endreinigungen",
    "serviceAreaBody": "Wir sind als lokales Reinigungsunternehmen stark im Seeland verankert. Unser primäres Einsatzgebiet für Endreinigungen umfasst Nidau, Port, Brügg, Aegerten, Biel/Bienne und Ipsach. Dank unserer Nähe können wir sehr schnell reagieren und bieten unsere Dienstleistungen ohne hohe Anfahrtskosten an. Die Verwaltungen in dieser Region schätzen unsere verlässliche Arbeit seit Langem.",
    "internalLinksHeading": oldEndreinigungNidau.internalLinksHeading,
    "internalLinks": oldEndreinigungNidau.internalLinks,
    "ctaStrongHeading": oldEndreinigungNidau.ctaStrongHeading,
    "ctaStrongBody": oldEndreinigungNidau.ctaStrongBody,
    "ctaStrong": oldEndreinigungNidau.ctaStrong,
    "testimonial": oldEndreinigungNidau.testimonial || { "quote": "Die Endreinigung unserer Wohnung in Nidau war perfekt. Die Verwaltung war begeistert und wir hatten unsere Kaution direkt zurück.", "author": "Familie W.", "trust": "Zufriedene Kunden aus Nidau" },
    "faqs": [
      {
        "question": "Wie läuft das mit der 100% Abnahmegarantie in Nidau genau ab?",
        "answer": "Ganz einfach: Wir garantieren vertraglich, dass die Verwaltung die Reinigung Ihrer Wohnung in Nidau akzeptiert. Wenn bei der Übergabe bemängelt wird, dass beispielsweise ein Fensterrahmen nicht sauber genug ist, reinigt unser anwesendes Personal diesen sofort nach – kostenlos. Für Sie bedeutet das absolute Sicherheit."
      },
      {
        "question": "Müssen die Möbel bereits aus der Wohnung sein?",
        "answer": "Ja, für eine gründliche Endreinigung mit Abnahmegarantie muss die Wohnung zwingend komplett leergeräumt sein. Nur so können wir alle Böden, Fussleisten und Wände erreichen und den hohen Anforderungen der Schweizer Immobilienverwaltungen gerecht werden."
      },
      {
        "question": "Ist die Anwesenheit von SwissCleanMove bei der Übergabe Pflicht?",
        "answer": "Nein, es ist keine Pflicht, aber ein kostenloser Service von uns, den wir sehr empfehlen. Wenn wir bei der Übergabe in Nidau dabei sind, können wir kleine Beanstandungen der Verwaltung direkt klären und sofort beheben, ohne dass Sie einen zweiten Termin vereinbaren müssen."
      },
      {
        "question": "Welche Kosten kommen für eine Endreinigung in Nidau auf mich zu?",
        "answer": "Wir bieten feste Pauschalpreise ab CHF 350 für kleine Wohnungen. Eine typische 3.5-Zimmer-Wohnung kostet ab CHF 490, eine 4.5-Zimmer-Wohnung ab CHF 690. Nach einer kostenlosen Besichtigung in Nidau erhalten Sie von uns einen garantierten Fixpreis – es gibt keine versteckten Kosten."
      },
      {
        "question": "Wie lange im Voraus muss ich die Endreinigung buchen?",
        "answer": "Wir empfehlen eine Buchung 3 bis 4 Wochen vor dem Übergabetermin, besonders an den stark frequentierten Zügelterminen (Ende Monat). Da wir in der Nähe von Nidau ansässig sind, können wir bei Stornierungen anderer Firmen jedoch oft auch extrem kurzfristig, manchmal innerhalb von 24 Stunden, einspringen."
      },
      {
        "question": "Sind Fenster und Balkon im Preis inklusive?",
        "answer": "Ja. Unsere Endreinigung ist ein Komplettpaket. Fenster (innen und aussen), Storen, Fenstersimse sowie der Balkon, das Kellerabteil und die Garage/der Stellplatz (besenrein) sind im Pauschalpreis immer enthalten."
      },
      {
        "question": "Werden auch Dübellöcher in Nidau von Ihnen gefüllt?",
        "answer": "Das fachgerechte Schliessen von Bohrlöchern gehört normalerweise zu den handwerklichen Mieterpflichten. Wir übernehmen diese Aufgabe jedoch gerne für Sie, wenn Sie uns im Vorfeld darauf ansprechen. Es wird dann als kleine Zusatzleistung in der Offerte ausgewiesen."
      },
      {
        "question": "Stellen Sie Putzmittel und Geräte?",
        "answer": "Ja, komplett. Sie müssen keinen Staubsauger, keine Lappen und keine Reinigungsmittel in der alten Wohnung zurücklassen. Unser Reinigungsteam bringt sämtliche professionellen Geräte und umweltfreundlichen Putzmittel mit."
      },
      {
        "question": "Ist Ihr Reinigungspersonal versichert?",
        "answer": "Selbstverständlich. Alle Mitarbeiter von SwissCleanMove sind fest angestellt, fair entlöhnt und komplett unfall- sowie haftpflichtversichert. Sollte während der Reinigung in Nidau versehentlich ein Schaden am Eigentum entstehen, sind Sie voll abgesichert."
      },
      {
        "question": "Bieten Sie Kombi-Rabatte für Umzug und Reinigung an?",
        "answer": "Ja, das ist unser beliebtestes Angebot in Nidau! Wenn Sie unseren Umzugsservice und die anschliessende Endreinigung zusammen buchen, profitieren Sie von einem reibungslosen Zeitplan aus einer Hand und einem attraktiven Kombi-Rabatt auf den Gesamtpreis."
      }
    ]
  };
}

// 2. reinigungNidau (Template B)
const oldReinigungNidau = data.seoPages.reinigungNidau;
if (oldReinigungNidau) {
  data.seoPages.reinigungNidau = {
    "meta": oldReinigungNidau.meta,
    "badge": oldReinigungNidau.badge,
    "h1": oldReinigungNidau.h1,
    "heroSubtitle": oldReinigungNidau.heroSubtitle,
    "ctaSoft": oldReinigungNidau.ctaSoft,
    "intro": "Suchen Sie eine zuverlässige Reinigungsfirma in Nidau, die höchste Schweizer Qualitätsstandards mit lokaler Flexibilität verbindet? SwissCleanMove ist Ihr Partner für alle Reinigungsanliegen. Wir betreuen Privathaushalte, Büros, Gewerbeflächen und Liegenschaften in Nidau und dem gesamten Seeland. Seit 2024 überzeugen wir durch Diskretion, Gründlichkeit und umweltbewusstes Arbeiten. Ob Sie eine wöchentliche Haushaltshilfe wünschen, eine professionelle Unterhaltsreinigung für Ihre Geschäftsräume benötigen oder eine Bauendreinigung nach einer Renovation ansteht – wir haben das richtige Personal und das passende Equipment. Wir arbeiten mit transparenten, fairen Pauschal- oder Stundenpreisen ohne versteckte Kosten. Unsere Reinigungskräfte sind fest angestellt, versichert und bringen jahrelange Erfahrung mit. Wir passen uns Ihrem Terminplan an – sei es früh am Morgen, spät am Abend oder flexibel am Wochenende. Überlassen Sie die Sauberkeit den Profis und geniessen Sie mehr Freizeit am Bielersee oder konzentrieren Sie sich auf Ihr Kerngeschäft.",
    "sections": [
      {
        "heading": "Professionelle Reinigung in Nidau",
        "body": "Nidau zeichnet sich durch eine vielfältige Gebäudestruktur aus – von historischen Altstadthäusern bis hin zu modernen Bürokomplexen. SwissCleanMove bietet für jedes Gebäude in Nidau die passende Reinigungslösung. Wir wissen, dass Sauberkeit Vertrauenssache ist. Deshalb erhalten Sie bei regelmässigen Reinigungen immer dieselbe feste Bezugsperson, die Ihre Räumlichkeiten und spezifischen Wünsche genau kennt. Vor jedem Neuauftrag führen wir eine kostenlose Besichtigung durch, um ein massgeschneidertes Pflichtenheft zu erstellen. Wir verwenden umweltschonende Reinigungsmittel, die effektiv gegen Schmutz und Bakterien wirken, aber die Raumluft nicht mit aggressiven Chemikalien belasten."
      },
      {
        "heading": "Wer von unseren Dienstleistungen profitiert",
        "body": "Unser Kundenstamm in Nidau ist breit gefächert. Wir unterstützen Familien und Berufstätige im Alltag, entlasten Unternehmen bei der Pflege ihrer Arbeitsumgebung und arbeiten eng mit Hausverwaltungen für die Instandhaltung ganzer Liegenschaften zusammen."
      },
      {
        "heading": "Unterhaltsreinigung für Gewerbe und Büros",
        "body": "Die regelmässige Büroreinigung ist das Aushängeschild Ihres Unternehmens. Wir leeren Papierkörbe, reinigen Schreibtische und IT-Geräte desinfizierend, pflegen sämtliche Bodenbeläge und sorgen für hygienisch einwandfreie Sanitäranlagen und Kaffeeküchen. Dieser Service richtet sich an KMU, Praxen, Kanzleien und Ladenbesitzer in Nidau. Gewerbekunden vertrauen uns, weil wir den Reinigungszyklus flexibel ausserhalb der regulären Öffnungszeiten durchführen, um den Betriebsablauf nicht zu stören."
      },
      {
        "heading": "Wohnungsreinigung und private Haushaltshilfe",
        "body": "Gewinnen Sie wertvolle Freizeit zurück! Unsere Haushaltshilfe übernimmt das Staubsaugen, Bodenwischen, die gründliche Bad- und Küchenreinigung sowie auf Wunsch auch das Bügeln Ihrer Wäsche. Wir richten uns nach Ihrem Rhythmus (wöchentlich oder zweiwöchentlich). Dieser Service ist perfekt für vielbeschäftigte Personen oder Familien in Nidau, die den Feierabend in einer sauberen Wohnung geniessen möchten. Kunden schätzen unsere Diskretion und die Zuweisung einer festen, vertrauten Reinigungskraft."
      },
      {
        "heading": "Spezialisierte Fensterreinigung",
        "body": "Wir sorgen für den absoluten Durchblick. Wir putzen Fenster, Glasfronten und Schaufenster streifenfrei – innen und aussen. Auch die Rahmen, Fälze und Storen werden gründlich von Strassenschmutz und Spinnweben befreit. Dank unserer professionellen Ausrüstung reinigen wir auch Wintergärten oder schwer erreichbare Dachfenster in Nidau sicher und effizient. Dieser Service richtet sich an alle, die den gefährlichen Fensterputz auslagern möchten."
      },
      {
        "heading": "Baureinigung für Neu- und Umbauten",
        "body": "Wo gehobelt wird, fallen Späne. Wir übernehmen die Baugrobreinigung sowie die Baufeinreinigung vor dem Einzug. Wir entfernen Farb- und Zementspritzer schonend, binden den feinen Bohrstaub und bringen die neu eingebauten Bäder und Küchen auf Hochglanz. Architekten, Bauherren und Immobilienbesitzer in Nidau buchen uns für diesen Service, weil wir eine bezugsbereite Übergabe garantieren und flexibel auf Verzögerungen im Bauplan reagieren."
      },
      {
        "heading": "Hauswartung und Liegenschaftsservice",
        "body": "Für Verwaltungen und Eigentümergemeinschaften in Nidau bieten wir einen umfassenden Hauswartungsservice. Wir reinigen Treppenhäuser, pflegen die Aussenanlagen, übernehmen den Winterdienst (Schneeräumen) und kontrollieren regelmässig die Haustechnik (Heizung, Licht). Dieser Service entlastet Verwaltungen enorm. Kunden wählen uns, da wir als direkter Ansprechpartner vor Ort agieren und durch proaktive Wartung langfristig Kosten sparen."
      },
      {
        "heading": "Tiefenreinigungen und Frühlingsputz",
        "body": "Ein- bis zweimal im Jahr benötigt jedes Gebäude eine intensive Grundreinigung. Wir waschen Gardinen, shampoonieren Teppiche, behandeln geölte Holzböden und reinigen die Küchenschränke auch von innen. Dieser Service ist sehr beliebt bei Privatpersonen in Nidau als klassischer \"Frühlingsputz\" oder vor grossen familiären Festen. Wir bringen den ursprünglichen Glanz der Materialien zurück."
      },
      {
        "heading": "Kundenbetreuung und höchste Flexibilität (Ratgeber)",
        "body": "Ein Reinigungsvertrag sollte Ihnen das Leben erleichtern und Sie nicht an starre Regeln binden. Bei SwissCleanMove haben wir extrem kurze Kündigungsfristen, falls sich Ihre Lebensumstände ändern. Wenn Sie im Urlaub sind, können Sie die wöchentliche Haushaltshilfe problemlos aussetzen oder uns stattdessen für eine intensive Fensterreinigung in dieser Zeit beauftragen. Kommunikation ist für uns der Schlüssel: Haben Sie einen besonderen Wunsch für die nächste Reinigung? Ein kurzer Anruf oder eine Nachricht genügt, und unsere Reinigungskraft in Nidau setzt dies sofort um."
      }
    ],
    "serviceBulletsHeading": "Ihre Kunden-Vorteile in Nidau",
    "serviceBullets": [
      "Persönliche, feste Reinigungskraft",
      "Kostenlose Besichtigung und Offerte",
      "Biologisch abbaubare Reinigungsprodukte",
      "Betriebshaftpflichtversicherung inklusive",
      "Einsätze am Morgen, Abend oder Wochenende",
      "Keine versteckten Gebühren oder Knebelverträge"
    ],
    "trustPoints": oldReinigungNidau.trustPoints || ["Lokal in Nidau", "Flexibel", "Top Qualität"],
    "ctaMidHeading": oldReinigungNidau.ctaMidHeading,
    "ctaMidBody": oldReinigungNidau.ctaMidBody,
    "ctaMid": oldReinigungNidau.ctaMid,
    "serviceAreaHeading": "Unser Servicegebiet in der Region",
    "serviceAreaBody": "Wir sind als Reinigungsfirma lokal im Herzen des Seelands verankert. Von unserem Stützpunkt aus betreuen wir täglich Kunden in Nidau, Biel/Bienne, Port, Bellmund, Aegerten, Brügg und Ipsach. Diese regionale Nähe bedeutet für unsere Kunden eine hohe Erreichbarkeit, Zuverlässigkeit und eine schnelle Reaktion bei kurzfristigen Einsätzen.",
    "internalLinksHeading": oldReinigungNidau.internalLinksHeading,
    "internalLinks": oldReinigungNidau.internalLinks,
    "ctaStrongHeading": oldReinigungNidau.ctaStrongHeading,
    "ctaStrongBody": oldReinigungNidau.ctaStrongBody,
    "ctaStrong": oldReinigungNidau.ctaStrong,
    "testimonial": oldReinigungNidau.testimonial || { "quote": "Unsere Büros in Nidau waren noch nie so sauber. Sehr diskret und extrem professionell.", "author": "KMU Nidau", "trust": "Gewerbekunde" },
    "faqs": [
      {
        "question": "Bieten Sie Reinigungen für Privat und Gewerbe in Nidau an?",
        "answer": "Ja, SwissCleanMove betreut sowohl private Haushalte (Haushaltshilfe, Wohnungsreinigung) als auch Gewerbekunden (Büroreinigung, Ladenlokale, Praxen). Für jedes Segment haben wir spezialisierte Mitarbeiter und massgeschneiderte Reinigungskonzepte."
      },
      {
        "question": "Muss ich die Reinigungsmittel für die Unterhaltsreinigung stellen?",
        "answer": "Das entscheiden Sie. In Privathaushalten nutzen wir oftmals die vorhandenen Mittel und Geräte. Bei Büro- und Gewerbereinigungen in Nidau bringen wir auf Wunsch unser eigenes, professionelles und umweltfreundliches Reinigungsmaterial sowie die nötigen Maschinen mit."
      },
      {
        "question": "Ist immer dieselbe Person für meine Wohnung in Nidau zuständig?",
        "answer": "Ja, bei regelmässigen Aufträgen weisen wir Ihnen eine feste Reinigungskraft zu. Wir wissen, dass Vertrauen wichtig ist, besonders wenn es um private Räume geht. Nur bei Ferien oder Krankheit organisieren wir nach Absprache mit Ihnen eine qualifizierte Vertretung."
      },
      {
        "question": "Was passiert, wenn bei der Reinigung etwas kaputt geht?",
        "answer": "Auch Profis passiert mal ein Missgeschick. In diesem seltenen Fall sind Sie vollständig abgesichert. SwissCleanMove ist im Besitz einer vollumfänglichen Betriebshaftpflichtversicherung, die den Schaden an Ihrem Eigentum in Nidau anstandslos reguliert."
      },
      {
        "question": "Können die Reinigungen ausserhalb der Bürozeiten stattfinden?",
        "answer": "Absolut. Um Ihren Geschäftsbetrieb in Nidau nicht zu stören, bieten wir unsere Reinigungsdienste gerne in den frühen Morgenstunden, abends nach Feierabend oder sogar am Wochenende an. Wir passen uns Ihrem Betriebsablauf an."
      },
      {
        "question": "Wie lange sind die Kündigungsfristen für einen Reinigungsvertrag?",
        "answer": "Wir möchten Kunden durch Qualität binden, nicht durch lange Verträge. Unsere Kündigungsfrist für regelmässige Unterhaltsreinigungen in Nidau beträgt in der Regel lediglich einen Monat auf das Ende eines Kalendermonats."
      },
      {
        "question": "Reinigen Sie auch schwer zugängliche Fenster?",
        "answer": "Ja, unsere spezialisierten Fensterputzer sind mit Leitern und Verlängerungssystemen ausgerüstet. Für sehr hohe Fenster oder verglaste Fassaden in Nidau können wir bei Bedarf auch entsprechende Hebebühnen organisieren, um die Arbeit sicher auszuführen."
      },
      {
        "question": "Welche Art von Baureinigung bieten Sie an?",
        "answer": "Wir bieten die Baugrobreinigung während der Bauphase sowie die Baufeinreinigung vor dem endgültigen Einzug an. Wir entfernen Zementschleier, Farbkleckse und hartnäckigen Baustaub in Neubauten oder nach Renovationen in Nidau."
      },
      {
        "question": "Sind Ihre Reinigungskräfte angemeldet und versichert?",
        "answer": "Ja, zu 100%. Bei uns gibt es keine Schwarzarbeit. Alle Reinigungskräfte sind bei SwissCleanMove fest angestellt, wir übernehmen alle Sozialabgaben (AHV, IV etc.) und sichern unsere Mitarbeiter gegen Berufs- und Nichtberufsunfälle ab."
      },
      {
        "question": "Kann ich die Häufigkeit der Haushaltshilfe flexibel ändern?",
        "answer": "Ja. Sie können mit einer zweiwöchentlichen Reinigung in Nidau beginnen und bei Bedarf auf wöchentlich umstellen – oder umgekehrt. Auch wenn Sie im Urlaub sind, können wir die Reinigung problemlos pausieren, sofern Sie uns rechtzeitig informieren."
      }
    ]
  };
}

// 3. umzugLyss (Template C)
const oldUmzugLyss = data.seoPages.umzugLyss;
if (oldUmzugLyss) {
  data.seoPages.umzugLyss = {
    "meta": oldUmzugLyss.meta,
    "badge": oldUmzugLyss.badge,
    "h1": oldUmzugLyss.h1,
    "heroSubtitle": oldUmzugLyss.heroSubtitle,
    "ctaSoft": oldUmzugLyss.ctaSoft,
    "intro": "Ein Umzug markiert einen neuen Lebensabschnitt, ist jedoch oft mit viel Stress und körperlicher Belastung verbunden. SwissCleanMove ist Ihre vertrauenswürdige Umzugsfirma für Lyss und das gesamte Seeland. Wir übernehmen die schwere Arbeit für Sie, damit Sie sich entspannt auf Ihr neues Zuhause freuen können. Seit 2024 unterstützen wir Privatpersonen und Unternehmen in Lyss bei der Planung und Durchführung von Umzügen jeder Grössenordnung. Ganz gleich, ob Sie innerhalb von Lyss umziehen, ins benachbarte Aarberg wechseln oder einen Transport quer durch die Schweiz planen – wir sind für Sie da. Unser Konzept ist einfach: Wir bieten absolute Kostentransparenz durch feste Pauschalpreise ab CHF 490. In unseren Offerten sind die kräftigen Zügelhelfer, die modernen Transportfahrzeuge und eine umfassende Transportversicherung bereits inkludiert. Dank über 50 erfolgreichen Umzügen wissen wir genau, worauf es ankommt. Wir arbeiten speditiv (Umzugsdauer meist 1-2 Tage) und bieten bei dringendem Bedarf sogar eine schnelle Verfügbarkeit innerhalb von 24 Stunden. Vertrauen Sie auf Schweizer Umzugsqualität direkt aus Ihrer Region.",
    "sections": [
      {
        "heading": "Transport- und Umzugslösungen für Lyss",
        "body": "Lyss ist ein wachsender, dynamischer Standort im Seeland. Als erfahrene, regionale Umzugsfirma kennen wir die Quartiere in Lyss – vom belebten Zentrum bis zu den ruhigeren Einfamilienhaussiedlungen – sehr gut. Wir bieten keine Dienstleistungen von der Stange, sondern beraten Sie nach einer kostenlosen Vor-Ort-Besichtigung individuell. Ob Sie einen Komplettumzug inklusive Einpackservice wünschen oder nur kräftige Helfer für den Transport schwerer Möbelstücke benötigen, Sie bestimmen den Umfang. Unser oberstes Ziel ist es, den Wohnungswechsel für Sie so angenehm und schadenfrei wie möglich zu gestalten. Das garantieren wir durch fest angestelltes, motiviertes Personal und modernste Ausrüstung."
      },
      {
        "heading": "Die am häufigsten gebuchten Umzugsdienste",
        "body": "Wir sind eine Full-Service-Agentur. Das bedeutet, wir können sämtliche Arbeitsschritte rund um Ihren Umzug abdecken. Entdecken Sie unsere Kernkompetenzen für Lyss."
      },
      {
        "heading": "Private Wohnungsumzüge",
        "body": "Wir verlagern Ihren gesamten Hausrat sicher von A nach B. Wir verpacken empfindliche Möbelstücke mit Stretchfolie und Wolldecken und fixieren diese professionell in unseren Luftfederungs-LKW. Dieser Service richtet sich an Familien, Paare und Einzelpersonen in Lyss. Kunden wählen uns für ihre Privatumzüge, weil wir sorgfältig mit ihren Erinnerungsstücken umgehen und den Umzugstag durch unsere ruhige und strukturierte Arbeitsweise deutlich entspannen."
      },
      {
        "heading": "Büro- und Geschäftsumzüge",
        "body": "Für Unternehmen in Lyss bieten wir professionelle Relocation-Services. Wir transportieren schwere Aktenschränke, IT-Infrastruktur und Konferenztische. Um den laufenden Betrieb nicht zu unterbrechen, planen wir Firmenumzüge auch gerne an Wochenenden. Dieser Service richtet sich an lokale KMU und Ladenbesitzer. Geschäftskunden schätzen unsere Termintreue und die extrem präzise Planung, die Ausfallzeiten minimiert."
      },
      {
        "heading": "Demontage und Montage von Möbeln",
        "body": "Unsere handwerklich begabten Zügelhelfer zerlegen Ihre grossen Schränke (z.B. Kleiderschränke, Boxspringbetten) am Auszugsort und montieren sie am Zielort in Lyss wieder fachgerecht. Wir bringen sämtliches Werkzeug mit. Dieser Service richtet sich an Kunden, die sich den Ärger mit fehlenden Schrauben und komplizierten Bauanleitungen ersparen wollen. Es garantiert, dass Sie in der neuen Wohnung sofort wieder komfortabel eingerichtet sind."
      },
      {
        "heading": "Ein- und Auspackservice",
        "body": "Keine Zeit zum Kistenpacken? Wir übernehmen das für Sie. Unser Team verpackt Ihr Geschirr, Bücher und Kleidung sicher in professionelle Umzugskartons, die wir mitbringen. Am neuen Ort in Lyss räumen wir auf Wunsch alles wieder ein. Dieser Service ist ideal für Vielbeschäftigte oder Senioren. Kunden sind begeistert, weil sich der Umzugsaufwand für sie auf ein absolutes Minimum reduziert."
      },
      {
        "heading": "Möbellift-Einsatz bei engen Platzverhältnissen",
        "body": "In Altbauten oder Häusern mit engen Treppenhäusern in Lyss stossen Träger oft an ihre Grenzen. Hier setzen wir unseren Möbellift ein. Er befördert schwerste Sofas oder Klaviere sicher über die Fassade durchs Fenster. Dieser Service schützt das Treppenhaus vor Kratzern und das Mobiliar vor Schäden. Kunden buchen dies, wenn grosse Möbelstücke nicht durch die Wohnungstür passen."
      },
      {
        "heading": "Entsorgung und Räumung",
        "body": "Ein Umzug ist die beste Gelegenheit zum Ausmisten. Alte Möbel, defekte Geräte oder Sperrgut nehmen wir am Umzugstag direkt mit und entsorgen sie fachgerecht bei den Recyclingstationen in der Region Lyss. Dieser Service richtet sich an alle, die sich beim Umzug verkleinern. Kunden schätzen es, sich nicht selbst um einen Transporter für den Werkhof kümmern zu müssen."
      },
      {
        "heading": "Warum professionelle Umzugshilfe den Unterschied macht (Ratgeber)",
        "body": "Viele Menschen unterschätzen den logistischen und körperlichen Aufwand eines Umzugs in Lyss. Wenn Sie mit Freunden zügeln, riskieren Sie nicht nur Rückenschmerzen, sondern auch Schäden an Möbeln oder im Treppenhaus – und private Haftpflichtversicherungen zahlen bei Freundschaftsdiensten oft nicht! Eine professionelle Umzugsfirma wie SwissCleanMove bringt hingegen das nötige Know-how, Zurrgurte, Rollböcke und vor allem eine vollumfängliche Transportversicherung mit. Zudem ist der Umzug meist in wenigen Stunden erledigt, wofür private Helfer ein ganzes Wochenende bräuchten. Wir empfehlen unseren Kunden, Wertsachen und wichtige Dokumente persönlich zu transportieren und Parkplätze vor den Wohnungen in Lyss frühzeitig zu reservieren, um Laufwege am Umzugstag so kurz wie möglich zu halten."
      }
    ],
    "serviceBulletsHeading": "Ihre Vorteile mit der SwissCleanMove",
    "serviceBullets": [
      "Faire, transparente Pauschalpreise ab CHF 490",
      "Kostenlose Besichtigung und Beratung in Lyss",
      "Kräftiges, freundliches und geschultes Personal",
      "Sicherer Transport inkl. Vollkasko-Versicherung",
      "Moderne 3.5t und 7.5t Umzugsfahrzeuge",
      "Demontage, Montage und Entsorgung aus einer Hand"
    ],
    "trustPoints": oldUmzugLyss.trustPoints || ["Garantierte Preise", "Voll versichert", "Regional in Lyss"],
    "ctaMidHeading": oldUmzugLyss.ctaMidHeading,
    "ctaMidBody": oldUmzugLyss.ctaMidBody,
    "ctaMid": oldUmzugLyss.ctaMid,
    "serviceAreaHeading": "Unser regionales Einsatzgebiet",
    "serviceAreaBody": "Wir sind tief im Seeland verwurzelt und täglich in Lyss sowie den angrenzenden Gebieten im Einsatz. Wir betreuen Umzüge in Lyss, Aarberg, Worben, Kappelen, Busswil und der gesamten Region. Da wir in der Nähe stationiert sind, fallen für Sie keine langen Anfahrtskosten an. Darüber hinaus führen wir Umzüge von Lyss in jeden anderen Schweizer Kanton zuverlässig für Sie durch.",
    "internalLinksHeading": oldUmzugLyss.internalLinksHeading,
    "internalLinks": oldUmzugLyss.internalLinks,
    "ctaStrongHeading": oldUmzugLyss.ctaStrongHeading,
    "ctaStrongBody": oldUmzugLyss.ctaStrongBody,
    "ctaStrong": oldUmzugLyss.ctaStrong,
    "testimonial": oldUmzugLyss.testimonial || { "quote": "Unser Umzug innerhalb von Lyss verlief reibungslos. Sehr freundliche Zügelmänner und ein fairer Preis.", "author": "Beat S.", "trust": "Zufriedener Kunde aus Lyss" },
    "faqs": [
      {
        "question": "Was kostet ein durchschnittlicher Umzug in Lyss?",
        "answer": "Die Kosten berechnen sich nach der Grösse der Wohnung, der Menge der Möbel und der Distanz. Bei SwissCleanMove erhalten Sie einen Umzug bereits ab CHF 490 (Pauschalpreis inkl. Fahrzeug, Helfern und Versicherung). Um einen exakten Preis zu nennen, führen wir in Lyss gerne eine kostenlose und unverbindliche Besichtigung durch."
      },
      {
        "question": "Ist eine Transportversicherung im Preis inbegriffen?",
        "answer": "Ja. Bei SwissCleanMove ist jeder Umzug umfassend durch eine Transport- und Betriebshaftpflichtversicherung gedeckt. Sollte trotz unserer extrem sorgfältigen Arbeitsweise ein Möbelstück beschädigt werden oder ein Kratzer im Treppenhaus in Lyss entstehen, übernimmt unsere Versicherung die vollen Kosten."
      },
      {
        "question": "Bieten Sie Umzüge in Lyss auch am Wochenende an?",
        "answer": "Ja, wir wissen, dass viele unserer Kunden unter der Woche arbeiten. Deshalb führen wir Umzüge auf Anfrage auch am Freitag oder Samstag durch. Wir empfehlen jedoch, Wochenendtermine frühzeitig zu reservieren, da diese sehr beliebt sind."
      },
      {
        "question": "Verkaufen oder vermieten Sie Umzugskartons?",
        "answer": "Ja, wir können Ihnen im Vorfeld des Umzugs professionelles Verpackungsmaterial wie stabile Zügelkartons, Kleiderboxen, Luftpolsterfolie und Klebeband direkt nach Lyss liefern. Sie können diese entweder kaufen oder zum Teil auch mieten."
      },
      {
        "question": "Wie lange dauert ein Umzug einer 3.5-Zimmer-Wohnung?",
        "answer": "Wenn der Umzug innerhalb von Lyss oder ins nahe Seeland stattfindet, ist ein Umzug einer 3.5-Zimmer-Wohnung in der Regel innerhalb eines Tages (oft am frühen Nachmittag) abgeschlossen. Grössere Distanzen oder komplexe Möbelmontagen können die Zeit auf 1.5 bis 2 Tage ausdehnen."
      },
      {
        "question": "Werden auch Halteverbote in Lyss von Ihnen organisiert?",
        "answer": "Das Parkieren des LKW in der Nähe des Eingangs ist essenziell. Wenn es in Lyss vor Ihrem Haus keine Parkplätze gibt, können wir im Vorfeld bei der Gemeinde Lyss ein offizielles Halteverbot beantragen und die Schilder rechtzeitig aufstellen. Bitte weisen Sie uns bei der Besichtigung darauf hin."
      },
      {
        "question": "Demontieren Sie auch komplexe Schränke?",
        "answer": "Ja, unsere Zügelhelfer bringen das nötige Werkzeug mit und sind sehr erfahren im Abbau und Wiederaufbau von gängigen Schrankmodellen, Betten und Regalsystemen (z.B. Pax-Schränke). Wir sorgen dafür, dass alles am neuen Wohnort in Lyss wieder stabil steht."
      },
      {
        "question": "Kann ich die Endreinigung gleich mitbuchen?",
        "answer": "Absolut. SwissCleanMove ist eine Full-Service-Agentur. Wir bieten in Lyss sowohl den Umzug als auch die Endreinigung mit 100% Abnahmegarantie an. Kunden, die beides buchen, profitieren von einem reibungslosen Ablauf aus einer Hand und einem attraktiven Kombi-Preis."
      },
      {
        "question": "Nehmen Sie auch alte Möbel zur Entsorgung mit?",
        "answer": "Ja, wenn Sie sich von alten Möbeln oder Elektrogeräten trennen möchten, nehmen wir diese am Umzugstag mit und entsorgen sie umweltgerecht bei den lokalen Recyclingzentren in der Umgebung von Lyss."
      },
      {
        "question": "Wie kurzfristig kann ich Sie für einen Umzug buchen?",
        "answer": "Normalerweise empfehlen wir eine Vorlaufzeit von 3 bis 4 Wochen. Da wir jedoch in der Nähe von Lyss ansässig sind, können wir in Notfällen oder bei Absagen anderer Firmen auch sehr kurzfristig reagieren – oft sogar innerhalb von 24 bis 48 Stunden."
      }
    ]
  };
}

// 4. endreinigungLyss (Template D)
const oldEndreinigungLyss = data.seoPages.endreinigungLyss;
if (oldEndreinigungLyss) {
  data.seoPages.endreinigungLyss = {
    "meta": oldEndreinigungLyss.meta,
    "badge": oldEndreinigungLyss.badge,
    "h1": oldEndreinigungLyss.h1,
    "heroSubtitle": oldEndreinigungLyss.heroSubtitle,
    "ctaSoft": oldEndreinigungLyss.ctaSoft,
    "intro": "Der Umzug ist geschafft, doch die alte Wohnung in Lyss wartet noch auf die gefürchtete Endreinigung? Sparen Sie sich Zeit, Schmutz und Nerven – übergeben Sie diese anspruchsvolle Aufgabe an die Profis von SwissCleanMove. Wir sind Ihr lokaler Experte für Wohnungsreinigungen mit 100% Abnahmegarantie in Lyss und dem umliegenden Seeland. Schweizer Immobilienverwaltungen sind bei der Übergabe extrem streng. Ein übersehener Kalkfleck im Bad oder schmutzige Fensterfälze können dazu führen, dass die Abnahme verweigert und die Kaution blockiert wird. Mit uns gehen Sie kein Risiko ein: Wir reinigen Ihre Wohnung tiefgründig und garantieren, dass sie beim ersten Termin abgenommen wird. Sollte doch etwas beanstandet werden, bessert unser Reinigungsteam vor Ort sofort und kostenlos nach. Wir bieten Ihnen transparente, fixe Pauschalpreise ab CHF 350 ohne versteckte Kosten. Eine Reinigung dauert in der Regel 4 bis 8 Stunden. Verlassen Sie sich auf ein etabliertes, régionales Team aus dem Seeland, das auch für kurzfristige Einsätze (innerhalb 24h) in Lyss zur Verfügung steht.",
    "sections": [
      {
        "heading": "Ihr Reinigungs-Partner für eine sorgenfreie Übergabe in Lyss",
        "body": "Lyss bietet eine Mischung aus historischen Gebäuden und modernen Wohnquartieren. Jede Immobilie erfordert spezielles Know-how bei der Endreinigung. SwissCleanMove kennt die hohen Anforderungen der Verwaltungen in Lyss ganz genau. Wir verzichten auf unkalkulierbare Stundenlöhne und arbeiten stattdessen mit verbindlichen Pauschalpreisen, die wir Ihnen nach einer kostenlosen Besichtigung garantieren. Unsere geschulten Reinigungskräfte setzen professionelle und umweltfreundliche Reinigungsmittel ein, die selbst hartnäckigsten Schmutz in Küche und Bad lösen, ohne empfindliche Oberflächen anzugreifen. Wir garantieren Schweizer Qualitätsstandards, Termintreue und ein makelloses Ergebnis, damit Sie sich in Lyss entspannt auf Ihr neues Zuhause konzentrieren können."
      },
      {
        "heading": "Wohnungstypen und Kunden in Lyss",
        "body": "Wir reinigen Objekte aller Grössenordnungen in Lyss. Von der kleinen 1.5-Zimmer-Wohnung für Singles über das geräumige 5.5-Zimmer-Einfamilienhaus für Familien bis hin zu Gewerbeflächen und Büros. Wir arbeiten für Mieter, Eigentümer und direkt im Auftrag von Liegenschaftsverwaltungen, die eine bezugsbereite Übergabe verlangen."
      },
      {
        "heading": "Umfassende Reinigung der Küche",
        "body": "Die Küche wird bei der Abnahme besonders kritisch geprüft. Wir entfetten den Dampfabzug (inkl. Filter), reinigen den Backofen und Kühlschrank tiefgründig und entkalken die Spüle. Alle Einbauschränke werden innen und aussen abgewaschen. Dieser Service ist entscheidend für jeden Mieter, da hier die meisten Nachreinigungen gefordert werden. Kunden vertrauen uns, weil wir selbst eingebranntes Fett entfernen."
      },
      {
        "heading": "Entkalkung und Hygiene im Badezimmer",
        "body": "Hartes Wasser sorgt oft für starke Kalkablagerungen. Wir entkalken Armaturen, Duschwände und Badewannen extrem sorgfältig. Toiletten und Fugen werden desinfiziert, Spiegel und Ablagen streifenfrei gereinigt. Dieser Service richtet sich an alle, die in Lyss umziehen. Kunden schätzen unsere professionellen Sanitärreiniger, die Kalk lösen, ohne die Dichtungen zu beschädigen."
      },
      {
        "heading": "Streifenfreie Fenster- und Storenreinigung",
        "body": "Wir putzen Fenstergläser beidseitig streifenfrei, reinigen die Fensterrahmen und die Fälze intensiv. Die Reinigung der Storen (Rollläden, Jalousien) und der Führungsschienen ist ein essenzieller Bestandteil unserer Abnahmereinigung. Dieser Service ist für Kunden in Lyss wichtig, da die Fensterreinigung mühsam ist und ohne richtiges Equipment oft unbefriedigende Ergebnisse liefert."
      },
      {
        "heading": "Schweizer Qualitätsstandards für Ihre Böden",
        "body": "Wir pflegen jeden Bodenbelag fachgerecht. Hartböden (Parkett, Laminat, Platten) werden gesaugt und nebelfeucht oder feucht gewischt, Fugen intensiv gereinigt. Bei Teppichen entfernen wir oberflächliche Flecken. Da der Boden beim Betreten der Wohnung als erstes auffällt, legen wir hier in Lyss grössten Wert auf ein makelloses Erscheinungsbild, um der Verwaltung einen perfekten ersten Eindruck zu vermitteln."
      },
      {
        "heading": "Reinigung von Nebenräumen und Aussenbereichen",
        "body": "Balkone, Terrassen, Kellerabteile und Garagenplätze gehören ebenfalls zur Mietwohnung. Wir fegen und wischen Balkonböden, befreien das Kellerabteil von Spinnweben und übergeben die Garage besenrein in Lyss. Kunden sind froh über diesen Service, da diese Bereiche oft als Umzugslager genutzt werden und die Reinigung meist bis zur letzten Minute aufgeschoben wird."
      },
      {
        "heading": "Ablauf der Wohnungsübergabe (Ratgeber)",
        "body": "Die Wohnungsabnahme ist in der Schweiz ein sehr formeller Prozess. Um Diskussionen zu vermeiden, raten wir unseren Kunden in Lyss, die Wohnung vor unserem Reinigungsbeginn komplett leerzuräumen. Alle Möbel und Abfälle müssen entfernt sein, damit wir jede Fussleiste und Ecke erreichen können. Prüfen Sie zudem vorab, ob Sie gemäss Mietvertrag kleine Reparaturen vornehmen müssen, wie das Füllen von Dübellöchern, das Ersetzen von Filtern im Dampfabzug oder das Entkalken des Boilers. Am Tag der Abnahme empfehlen wir Ihnen, pünktlich mit der Verwaltung das Protokoll durchzugehen. Wir von SwissCleanMove sind auf Wunsch anwesend. Findet der Verwalter einen Mangel, putzen wir diesen sofort nach. Sie geben die Schlüssel ab und haben die Sicherheit, dass Ihre Kaution nicht wegen Reinigungsmängeln blockiert wird."
      }
    ],
    "serviceBulletsHeading": "Unsere Qualitäts-Garantien in Lyss",
    "serviceBullets": [
      "100% Abnahmegarantie für Ihre Sicherheit",
      "Garantierte, kostenlose Nachreinigung bei Beanstandung",
      "Fixe Pauschalpreise ohne Überraschungen",
      "Komplettes Reinigungsmaterial inklusive",
      "Kostenlose Anwesenheit bei der Abnahme möglich",
      "Umweltfreundliche, schonende Reinigungsmittel"
    ],
    "trustPoints": oldEndreinigungLyss.trustPoints || ["100% Abnahmegarantie", "Kaution zurück", "Regional in Lyss"],
    "ctaMidHeading": oldEndreinigungLyss.ctaMidHeading,
    "ctaMidBody": oldEndreinigungLyss.ctaMidBody,
    "ctaMid": oldEndreinigungLyss.ctaMid,
    "serviceAreaHeading": "Unser Servicegebiet rund um Lyss",
    "serviceAreaBody": "Wir sind als lokales Reinigungsunternehmen fest im Seeland verwurzelt. Unser Hauptaktionsradius für Endreinigungen erstreckt sich über Lyss, Aarberg, Worben, Kappelen, Busswil, Studen und Aegerten. Durch diese geografische Nähe fallen für Sie in Lyss keine langen Anfahrtswege an, und wir können flexibel und pünktlich an den stark frequentierten Zügelterminen bei Ihnen vor Ort sein.",
    "internalLinksHeading": oldEndreinigungLyss.internalLinksHeading,
    "internalLinks": oldEndreinigungLyss.internalLinks,
    "ctaStrongHeading": oldEndreinigungLyss.ctaStrongHeading,
    "ctaStrongBody": oldEndreinigungLyss.ctaStrongBody,
    "ctaStrong": oldEndreinigungLyss.ctaStrong,
    "testimonial": oldEndreinigungLyss.testimonial || { "quote": "Die Endreinigung in Lyss verlief absolut problemlos. Die Wohnung sah aus wie neu und die Verwaltung war voll des Lobes.", "author": "Markus K.", "trust": "Kunde aus Lyss" },
    "faqs": [
      {
        "question": "Was genau beinhaltet die Abnahmegarantie in Lyss?",
        "answer": "Unsere Abnahmegarantie ist Ihr Schutzschild. Wir garantieren, dass die Immobilienverwaltung in Lyss die Wohnung reinigungstechnisch abnimmt. Wenn bei der Begehung doch ein Fleck bemängelt wird, wischt unser anwesendes Personal sofort nach – ohne dass für Sie zusätzliche Kosten entstehen. So ist Ihre Kaution sicher."
      },
      {
        "question": "Wie viel kostet eine Endreinigung in Lyss?",
        "answer": "Wir kalkulieren unsere Preise transparent als Pauschale. Eine kleine 2.5-Zimmer-Wohnung kostet ab CHF 350. Eine Standard-3.5-Zimmer-Wohnung kostet ab CHF 490, eine 4.5-Zimmer-Wohnung ab CHF 690. Um Ihnen einen exakten Fixpreis zu garantieren, besichtigen wir Ihr Objekt in Lyss vorab völlig kostenlos."
      },
      {
        "question": "Sind Fenster und Balkon im Preis der Endreinigung inbegriffen?",
        "answer": "Ja, unsere Endreinigung ist ein vollumfängliches Komplettpaket. Das beinhaltet das Reinigen sämtlicher Fenster (innen und aussen), der Storen und Rollläden, der Fensterrahmen sowie die besenreine Übergabe von Balkon, Keller und Garage."
      },
      {
        "question": "Muss die Wohnung für die Endreinigung komplett leer sein?",
        "answer": "Ja. Um die Wohnung in Lyss nach den hohen Branchenstandards der Verwaltungen reinigen zu können, müssen alle Möbel, Kisten und der persönliche Hausrat restlos entfernt sein. Nur so haben wir Zugang zu allen Fussleisten, Böden und Wänden."
      },
      {
        "question": "Muss ich Reinigungsmittel oder den Staubsauger bereitstellen?",
        "answer": "Nein, Sie müssen absolut nichts in der Wohnung belassen. Das Team von SwissCleanMove bringt alle benötigten professionellen Geräte (Staubsauger, Leitern) sowie sämtliche umweltschonenden und wirksamen Putzmittel selbst nach Lyss mit."
      },
      {
        "question": "Wie lange im Voraus muss ich den Termin in Lyss reservieren?",
        "answer": "Besonders an den offiziellen Zügelterminen (Ende Monat) sind wir oft stark ausgebucht. Wir empfehlen eine Buchung 3 bis 4 Wochen im Voraus. Da wir jedoch in der Nähe von Lyss operieren, können wir bei Bedarf auch sehr kurzfristige Notfalleinsätze (z.B. innert 24h) prüfen."
      },
      {
        "question": "Sind Sie bei der Wohnungsübergabe in Lyss anwesend?",
        "answer": "Auf Wunsch sind wir bei der offiziellen Abnahme mit der Verwaltung gerne vor Ort – dies ist für Sie kostenlos. Unsere Präsenz hat den Vorteil, dass wir eventuelle Beanstandungen der Verwaltung direkt klären und sofort beheben können."
      },
      {
        "question": "Füllen Sie auch Dübellöcher auf?",
        "answer": "Das Auffüllen von Bohrlöchern in den Wänden gehört rechtlich zu den Reparaturarbeiten der Mieter und nicht zur Reinigung. Wenn Sie dies wünschen, können wir diese Aufgabe jedoch in Lyss nach vorheriger Absprache und gegen einen kleinen Aufpreis fachgerecht für Sie übernehmen."
      },
      {
        "question": "Ist Ihr Reinigungspersonal in Lyss versichert?",
        "answer": "Ja. SwissCleanMove beschäftigt keine Schwarzarbeiter. All unsere Reinigungskräfte sind fest angestellt, unfallversichert und wir verfügen über eine umfassende Betriebshaftpflichtversicherung. Bei einem eventuellen Schaden während der Reinigung sind Sie vollständig geschützt."
      },
      {
        "question": "Bieten Sie auch den Umzug in Lyss an?",
        "answer": "Ja, SwissCleanMove ist eine Full-Service-Agentur. Wir bieten Ihnen sowohl den professionellen Umzug mit Zügelwagen als auch die Endreinigung an. Wenn Sie beides zusammen in Lyss buchen, erhalten Sie einen attraktiven Kombi-Preis und profitieren von einer nahtlosen Planung aus einer Hand."
      }
    ]
  };
}

fs.writeFileSync(dePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated endreinigungNidau, reinigungNidau, umzugLyss and endreinigungLyss in messages/de.json');
