const fs = require('fs');
const path = require('path');

const dePath = path.join(__dirname, 'messages', 'de.json');
const data = JSON.parse(fs.readFileSync(dePath, 'utf8'));

// 1. umzugIpsach (Template A)
const oldUmzugIpsach = data.seoPages.umzugIpsach;
if (oldUmzugIpsach) {
  data.seoPages.umzugIpsach = {
    "meta": oldUmzugIpsach.meta,
    "badge": oldUmzugIpsach.badge,
    "h1": oldUmzugIpsach.h1,
    "heroSubtitle": oldUmzugIpsach.heroSubtitle,
    "ctaSoft": oldUmzugIpsach.ctaSoft,
    "intro": "Ein Umzug ist ein emotionales Ereignis – und logistisch eine echte Herausforderung. Ob Sie in ein neues Haus mit Seeblick ziehen oder Ipsach aus beruflichen Gründen verlassen, SwissCleanMove steht Ihnen als starke, lokale Umzugsfirma verlässlich zur Seite. Mit unserem Sitz in unmittelbarer Nähe betreuen wir Familien, Paare und Firmen im gesamten Seeland und sorgen dafür, dass Ihr Wohnungswechsel so stressfrei wie möglich abläuft. Seit 2024 organisieren wir Umzüge aller Grössenordnungen. Wir bieten Ihnen transparente Fixpreise ab CHF 490 an, in denen unsere kräftigen Zügelhelfer, geräumige Transportwagen und eine lückenlose Transportversicherung bereits enthalten sind. Sie müssen keine versteckten Kosten oder bösen Überraschungen fürchten. Die meisten unserer Umzüge in Ipsach sind dank präziser Planung innerhalb von 1–2 Tagen abgeschlossen. Dank unserer lokalen Verankerung reagieren wir extrem flexibel und können in Notfällen oft schon innerhalb von 24 Stunden für Sie da sein. Verlassen Sie sich auf Schweizer Pünktlichkeit, Sorgfalt und höchste Professionalität.",
    "sections": [
      {
        "heading": "Warum SwissCleanMove die beste Wahl für Ipsach ist",
        "body": "Ipsach bietet eine hohe Lebensqualität, bringt aber bei Umzügen – etwa an Hanglagen oder in engen Quartierstrassen – spezifische Herausforderungen mit sich. Wir kennen die Gegebenheiten vor Ort und wissen, worauf es ankommt. Wenn Sie uns kontaktieren, haben Sie es nicht mit einem anonymen Callcenter zu tun, sondern mit einem direkten Ansprechpartner aus der Region. Wir besichtigen Ihr Zuhause in Ipsach kostenlos, schätzen das Umzugsvolumen exakt ein und planen den Zügeltag minutiös. Unser Team besteht aus erfahrenen Festangestellten, die täglich mit sensiblen Möbeln, schweren Geräten und empfindlichem Geschirr hantieren. Ihre absolute Zufriedenheit und der Schutz Ihres Eigentums sind unsere oberste Priorität."
      },
      {
        "heading": "Unser umfassendes Serviceangebot für Ihren Umzug",
        "body": "Wir sind eine Full-Service-Agentur, was bedeutet, dass wir Ihnen von der ersten Umzugskiste bis zur finalen Möbelmontage alles aus einer Hand bieten können. Wählen Sie genau die Module, die Sie benötigen."
      },
      {
        "heading": "Zuverlässige Privatumzüge",
        "body": "Ihr Zuhause ist Ihr Rückzugsort, und wir behandeln Ihre persönlichen Gegenstände mit grösstem Respekt. Wir verpacken Ihre Möbel in spezielle Decken, nutzen Stretchfolie für empfindliche Oberflächen und transportieren alles sicher in luftgefederten Fahrzeugen von der alten zur neuen Adresse in Ipsach oder schweizweit. Dieser Service ist ideal für Familien und Berufstätige, die ihren Umzug sicher und ohne körperliche Überanstrengung meistern wollen. Kunden vertrauen uns, weil wir den Umzugstag durch Ruhe und Struktur deutlich entspannen."
      },
      {
        "heading": "Firmen- und Büroumzüge",
        "body": "Ein Firmenumzug erfordert striktes Timing, damit der Betriebsunterbruch in Ihrem Unternehmen so kurz wie möglich ausfällt. Wir transportieren schwere Schreibtische, komplexe IT-Infrastruktur und Archive sicher und systematisch. Wir arbeiten auf Wunsch auch am Wochenende. Dieser Service richtet sich an Gewerbebetriebe in Ipsach, die auf eine pünktliche und ausfallminimierende Relocation angewiesen sind. Geschäftskunden schätzen unsere Termintreue und unsere hohe Flexibilität."
      },
      {
        "heading": "Sorgfältiger Ein- und Auspackservice",
        "body": "Packen ist die zeitaufwendigste Phase jedes Umzugs. Unser Team bringt professionelle Kartons mit, verpackt Ihr Geschirr bruchsicher und verstaut Ihre Kleidung hängend in speziellen Kleiderboxen. Am Zielort räumen wir auf Wunsch alles wieder exakt in die Schränke. Dieser Service richtet sich an Personen, denen schlicht die Zeit oder die Energie für die Vorbereitung fehlt. Unsere Kunden lieben es, wenn sie abends in eine bereits fertig eingerichtete Wohnung zurückkehren können."
      },
      {
        "heading": "Fachgerechte Möbelmontage",
        "body": "Das Demontieren grosser Kleiderschränke oder Betten am alten Wohnort in Ipsach und das anschliessende Montieren im neuen Zuhause erfordert handwerkliches Geschick. Unsere Profis bringen das richtige Werkzeug mit und stellen sicher, dass Ihre Möbel am neuen Standort wieder absolut stabil stehen. Dieser Service ist entscheidend für jeden, der keine Lust auf komplizierte Bauanleitungen oder fehlende Schrauben hat."
      },
      {
        "heading": "Einsatz unseres Möbellifts",
        "body": "In Häusern ohne Lift oder mit engen Treppenaufgängen setzen wir unseren hauseigenen Möbellift ein. Schwere Klaviere, massive Sofas oder unhandliche Kühlschränke transportieren wir so sicher über den Balkon oder das Fenster. Dies schützt das Treppenhaus der Immobilie vor Kratzern und beschleunigt den Umzugsprozess in Ipsach massiv."
      },
      {
        "heading": "Bequeme Entsorgung von Altmöbeln",
        "body": "Oft trennt man sich beim Umzug von alten Möbeln oder defekten Elektrogeräten. Wir übernehmen die fach- und umweltgerechte Entsorgung direkt am Umzugstag. Wir bringen das Sperrgut zu den lokalen Recyclinghöfen. Dieser Service richtet sich an alle, die den Platz in der neuen Wohnung optimal nutzen wollen und sich den mühsamen Weg zum Werkhof ersparen möchten."
      },
      {
        "heading": "So bereiten Sie Ihren Umzug in Ipsach optimal vor (Ratgeber)",
        "body": "Eine gründliche Planung ist das Fundament eines stressfreien Umzugs. Beginnen Sie in Ipsach frühzeitig damit, ungenutzte Gegenstände in den Kellerabteilen auszusortieren. Beschriften Sie jeden gepackten Karton deutlich auf der Ober- und Seite mit dem jeweiligen Zielraum (z.B. \"Küche / Gläser\"), damit unsere Helfer wissen, wohin die Kisten gehören und wie empfindlich sie sind. Wichtig: Eine gute Parkmöglichkeit für den Zügelwagen am Ein- und Auszugsort ist entscheidend für einen effizienten Zeitplan. Falls an Ihrer Strasse in Ipsach Parkplätze Mangelware sind, geben Sie uns rechtzeitig Bescheid. Wir beantragen dann bei der Gemeinde eine temporäre Halteverbotszone, damit unsere Mitarbeiter keine langen Strecken mit schweren Möbeln zurücklegen müssen. Halten Sie zudem am Umzugstag etwas Bargeld, Dokumente und Snacks in einer separaten Tasche bereit."
      }
    ],
    "serviceBulletsHeading": "Ihre Umzugs-Vorteile in Ipsach",
    "serviceBullets": [
      "Kostenlose Wohnungsbesichtigung in Ipsach",
      "Garantierte Pauschalpreise ohne Überraschungen",
      "Vollständige Transport- und Betriebshaftpflicht",
      "Moderne, luftgefederte Zügelwagen",
      "Demontage, Montage und Einpackservice möglich",
      "Schnell, flexibel und regional verankert"
    ],
    "trustPoints": oldUmzugIpsach.trustPoints || ["Fixpreise", "Versichert", "Lokal im Seeland"],
    "ctaMidHeading": oldUmzugIpsach.ctaMidHeading,
    "ctaMidBody": oldUmzugIpsach.ctaMidBody,
    "ctaMid": oldUmzugIpsach.ctaMid,
    "serviceAreaHeading": "Unser Einsatzgebiet im Seeland",
    "serviceAreaBody": "Wir sind als lokales Umzugsunternehmen im gesamten Seeland für Sie unterwegs. Wir betreuen täglich Kunden in Ipsach, Nidau, Biel/Bienne, Port, Bellmund, Sutz-Lattrigen und Täuffelen. Dank unserer geografischen Nähe können wir kurze Anfahrtswege garantieren und auch sehr kurzfristig auf Terminanfragen reagieren.",
    "internalLinksHeading": oldUmzugIpsach.internalLinksHeading,
    "internalLinks": oldUmzugIpsach.internalLinks,
    "ctaStrongHeading": oldUmzugIpsach.ctaStrongHeading,
    "ctaStrongBody": oldUmzugIpsach.ctaStrongBody,
    "ctaStrong": oldUmzugIpsach.ctaStrong,
    "testimonial": oldUmzugIpsach.testimonial || { "quote": "Ein fantastisches Team! Sie haben unseren Umzug in Ipsach ruhig und professionell gemeistert. Sehr zu empfehlen.", "author": "Familie G.", "trust": "Zufriedene Kunden aus Ipsach" },
    "faqs": [
      {
        "question": "Was kostet ein durchschnittlicher Umzug in Ipsach?",
        "answer": "Wir bieten Umzüge in Ipsach bereits ab einem Pauschalpreis von CHF 490 an. Dieser Fixpreis beinhaltet den Zügelwagen, die Helfer und die Versicherung. Um Ihnen eine exakte und verbindliche Offerte zu stellen, kommen wir gerne für eine kurze, kostenlose Besichtigung bei Ihnen vorbei."
      },
      {
        "question": "Sind meine Einrichtungsgegenstände versichert?",
        "answer": "Ja, absolut. Jeder von SwissCleanMove durchgeführte Umzug ist über unsere umfassende Transport- und Betriebshaftpflichtversicherung abgedeckt. Sollte trotz unserer Vorsicht ein Gegenstand oder das Treppenhaus beschädigt werden, übernehmen wir die volle Verantwortung."
      },
      {
        "question": "Wie lange im Voraus muss ich den Termin buchen?",
        "answer": "Wir raten unseren Kunden in Ipsach, den Umzug etwa 3 bis 4 Wochen im Voraus zu reservieren, da besonders Monatsenden sehr beliebt sind. Da wir jedoch lokal ansässig sind, können wir in dringenden Fällen auch kurzfristig innerhalb von 24 bis 48 Stunden einspringen."
      },
      {
        "question": "Bieten Sie auch die Endreinigung mit Abnahmegarantie an?",
        "answer": "Ja. SwissCleanMove ist Ihr Partner für das komplette Paket. Wir führen nach dem Auszug in Ipsach gerne auch die professionelle Endreinigung mit 100% Abnahmegarantie durch. Bei einer Kombi-Buchung profitieren Sie von einem attraktiven Preisnachlass."
      },
      {
        "question": "Muss ich das Verpackungsmaterial selbst besorgen?",
        "answer": "Sie können sich entscheiden, ob Sie die Kartons selbst besorgen oder unser hochwertiges Material nutzen möchten. Wir liefern stabile Zügelkartons, Kleiderboxen und Luftpolsterfolie nach Ipsach und nehmen dieses Material nach dem Umzug auf Wunsch auch wieder zurück."
      },
      {
        "question": "Zerlegen Sie auch meine Möbel?",
        "answer": "Ja, das ist ein fester Bestandteil unserer Dienstleistung. Grosse Schränke (z.B. von IKEA oder Pfister) werden von unseren Mitarbeitern am alten Wohnort fachgerecht demontiert und am neuen Standort in Ipsach wieder sicher zusammengebaut."
      },
      {
        "question": "Führen Sie Umzüge auch am Wochenende durch?",
        "answer": "Ja, viele unserer Kunden bevorzugen einen Umzug am Wochenende, um die Arbeitswoche nicht zu stören. Auf Voranmeldung sind wir auch freitags und samstags für Sie in Ipsach im Einsatz."
      },
      {
        "question": "Können Sie auch alte Möbel entsorgen?",
        "answer": "Ja, wir übernehmen die Entsorgung von unerwünschten Möbeln, alten Teppichen oder defekten Geräten. Wir laden das Sperrgut am Umzugstag auf und bringen es direkt zu den zuständigen Recyclinghöfen im Seeland."
      },
      {
        "question": "Organisieren Sie die Absperrung für den Zügelwagen?",
        "answer": "Wenn vor Ihrer Wohnung in Ipsach keine geeigneten Parkmöglichkeiten bestehen, übernehmen wir nach Rücksprache gerne die Organisation eines temporären Halteverbots und stellen die Schilder in Absprache mit der Gemeinde auf."
      },
      {
        "question": "Wie gross sind Ihre Fahrzeuge?",
        "answer": "Wir verfügen über moderne, luftgefederte Zügelwagen (3.5t) für kleinere Wohnungen und enge Strassen sowie grössere LKWs (7.5t) für Einfamilienhäuser. So stellen wir sicher, dass wir für jedes Umzugsvolumen in Ipsach das passende Transportmittel haben."
      }
    ]
  };
}

// 2. endreinigungIpsach (Template B)
const oldEndreinigungIpsach = data.seoPages.endreinigungIpsach;
if (oldEndreinigungIpsach) {
  data.seoPages.endreinigungIpsach = {
    "meta": oldEndreinigungIpsach.meta,
    "badge": oldEndreinigungIpsach.badge,
    "h1": oldEndreinigungIpsach.h1,
    "heroSubtitle": oldEndreinigungIpsach.heroSubtitle,
    "ctaSoft": oldEndreinigungIpsach.ctaSoft,
    "intro": "Die Kisten sind gepackt, das neue Zuhause wartet – doch die alte Wohnung in Ipsach muss noch in einen abnahmebereiten Zustand versetzt werden. Überlassen Sie diese anspruchsvolle und zeitintensive Aufgabe den Profis von SwissCleanMove. Wir sind Ihre regionale Reinigungsfirma für professionelle Endreinigungen mit 100% Abnahmegarantie im Seeland. Schweizer Immobilienverwaltungen prüfen bei der Wohnungsübergabe jedes kleinste Detail, von den Fensterfälzen bis zu Kalkrückständen in der Dusche. Mit unserer Abnahmegarantie garantieren wir Ihnen eine reibungslose Übergabe: Sollte die Verwaltung wider Erwarten einen Mangel feststellen, reinigen wir sofort vor Ort und völlig kostenlos nach, bis das Protokoll unterschrieben ist. So sichern Sie sich Ihre volle Mietkaution ohne Diskussionen. Wir bieten Ihnen transparente Fixpreise ab CHF 350, ohne versteckte Zuschläge oder hohe Anfahrtskosten. Unsere erfahrenen Teams reinigen Ihre Wohnung in Ipsach typischerweise innerhalb von 4 bis 8 Stunden tiefgründig und sind bei Notfällen auch innerhalb von 24 Stunden für Sie verfügbar.",
    "sections": [
      {
        "heading": "Ihre Sorgenfreie Wohnungsübergabe in Ipsach",
        "body": "In Ipsach treffen moderne Neubauten auf charmante ältere Immobilien. Jede Wohnung erfordert eine gezielte Reinigung, um die spezifischen Vorgaben der Hausverwaltungen zu erfüllen. SwissCleanMove kennt die hohen Erwartungen im Seeland genau. Wir arbeiten nicht mit unvorhersehbaren Stundenlöhnen, sondern besichtigen Ihre Wohnung kostenlos und geben Ihnen eine verbindliche Pauschalofferte. Unsere fest angestellten Reinigungsteams verwenden umweltfreundliche Hochleistungsreiniger, die selbst hartnäckigsten Schmutz lösen, aber das Material (wie edles Parkett oder sensible Armaturen) schützen. Wenn Sie uns buchen, entscheiden Sie sich für Pünktlichkeit, Schweizer Qualität und maximale Stressreduktion."
      },
      {
        "heading": "Für wen wir in Ipsach arbeiten",
        "body": "Unser Service richtet sich an Mieter, die ihre Wohnung für die Abgabe vorbereiten müssen, an Immobilienkäufer, die eine saubere Übergabe wünschen, und an Hausverwaltungen in Ipsach, die eine zuverlässige Reinigungsfirma für Mieterwechsel benötigen."
      },
      {
        "heading": "Intensive Küchenreinigung",
        "body": "Die Küche ist das Herzstück der Wohnung, aber auch der kritischste Bereich bei der Abnahme. Wir reinigen sämtliche Einbauschränke innen und aussen, entfetten den Dampfabzug (inkl. Filter) und waschen den Backofen und den Kühlschrank intensiv aus. Selbst hartnäckige Eingebranntes wird restlos entfernt. Dieser Service ist entscheidend für jeden Mieter. Kunden vertrauen uns, weil wir die Küche wieder in den hygienischen Urzustand versetzen."
      },
      {
        "heading": "Hygienische Reinigung von Bad & WC",
        "body": "Kalkablagerungen an Duschwänden und Armaturen sind oft ein K.o.-Kriterium bei der Übergabe. Wir entkalken das komplette Badezimmer, reinigen die Toilette und desinfizieren alle Fugen. Auch Spiegel und Lüftungsschlitze werden streifenfrei geputzt. Dieser Service richtet sich an alle Ausziehenden in Ipsach, da wir Kalkflecken sicher entfernen, ohne die empfindlichen Oberflächen anzugreifen."
      },
      {
        "heading": "Streifenfreie Fenster- und Storenreinigung",
        "body": "Wir putzen alle Fensterscheiben in Ipsach von innen und aussen. Wichtig für die Verwaltung: Wir reinigen auch die Fensterrahmen, die verschmutzten Fensterfälze sowie die Sonnenstoren (Rollläden) und deren Führungsschienen. Dieser Service erspart Ihnen gefährliche Arbeiten auf der Leiter und liefert ein professionelles, streifenfreies Resultat."
      },
      {
        "heading": "Bodenpflege auf höchstem Niveau",
        "body": "Jeder Bodenbelag in Ihrer Wohnung in Ipsach wird fachgerecht gepflegt. Wir saugen und wischen Parkett, Laminat oder Fliesen nebelfeucht auf und befreien auch die oft vernachlässigten Fussleisten von Staub und Spinnweben. Da der Boden beim Eintreten den ersten Eindruck vermittelt, legen wir hier grössten Wert auf Sauberkeit."
      },
      {
        "heading": "Reinigung der Nebenräume",
        "body": "Der Balkon, das Kellerabteil, der Estrich und die Garagenbox werden bei der Abnahme ebenfalls kontrolliert. Wir fegen diese Bereiche besenrein, wischen das Balkongeländer ab und entfernen Spinnweben. Kunden schätzen dies sehr, da diese Räume beim Umzug oft als Zwischenlager dienen und stark verschmutzen."
      },
      {
        "heading": "Ratgeber für eine reibungslose Übergabe in Ipsach",
        "body": "Damit wir unsere 100% Abnahmegarantie in Ipsach gewährleisten können, ist es wichtig, dass Ihre Wohnung am Reinigungstag komplett geräumt ist. Jeglicher Müll und Hausrat muss entfernt sein. Kontrollieren Sie zudem Ihren Mietvertrag auf kleine Instandsetzungspflichten. Oft müssen Mieter defekte Glühbirnen auswechseln oder gebohrte Dübellöcher in den Wänden fachmännisch schliessen. Wir empfehlen unseren Kunden, am Tag der offiziellen Wohnungsabnahme gemeinsam mit uns und der Verwaltung den Rundgang zu machen. Wenn der Verwalter ein noch so kleines Staubkörnchen findet, greift unser Mitarbeiter sofort zum Tuch und korrigiert den Mangel an Ort und Stelle. So verlassen Sie Ipsach mit dem sicheren Gefühl, Ihre Kaution vollständig zurückzuerhalten."
      }
    ],
    "serviceBulletsHeading": "Ihre Kunden-Vorteile in Ipsach",
    "serviceBullets": [
      "Schriftlich garantierte 100% Abnahmegarantie",
      "Kostenlose Mängelbeseitigung bei der Übergabe",
      "Verbindliche Pauschalpreise ab CHF 350",
      "Umweltfreundliche, effektive Putzmittel",
      "Sämtliche Geräte (Staubsauger etc.) inklusive",
      "Kurze Anfahrtswege und sehr flexibel"
    ],
    "trustPoints": oldEndreinigungIpsach.trustPoints || ["100% Abnahmegarantie", "Kaution sicher", "Regional im Seeland"],
    "ctaMidHeading": oldEndreinigungIpsach.ctaMidHeading,
    "ctaMidBody": oldEndreinigungIpsach.ctaMidBody,
    "ctaMid": oldEndreinigungIpsach.ctaMid,
    "serviceAreaHeading": "Unser regionales Einsatzgebiet",
    "serviceAreaBody": "Wir sind als lokales Reinigungsunternehmen stark im Seeland verankert. Unser primäres Einsatzgebiet umfasst Ipsach, Nidau, Biel/Bienne, Port, Bellmund, Sutz-Lattrigen und Täuffelen. Durch diese regionale Nähe können wir bei Notfällen oder kurzfristigen Stornierungen anderer Firmen in Ipsach oft sehr schnell einspringen, ohne hohe Anfahrtskosten zu berechnen.",
    "internalLinksHeading": oldEndreinigungIpsach.internalLinksHeading,
    "internalLinks": oldEndreinigungIpsach.internalLinks,
    "ctaStrongHeading": oldEndreinigungIpsach.ctaStrongHeading,
    "ctaStrongBody": oldEndreinigungIpsach.ctaStrongBody,
    "ctaStrong": oldEndreinigungIpsach.ctaStrong,
    "testimonial": oldEndreinigungIpsach.testimonial || { "quote": "Die Wohnung in Ipsach war nach der Reinigung blitzsauber. Die Abnahme dauerte keine 10 Minuten. Perfekter Service!", "author": "Sabrina M.", "trust": "Zufriedene Kundin aus Ipsach" },
    "faqs": [
      {
        "question": "Wie funktioniert die 100% Abnahmegarantie in Ipsach genau?",
        "answer": "Unsere Abnahmegarantie sichert Sie vor bösen Überraschungen bei der Übergabe ab. Sollte die Verwaltung in Ipsach wider Erwarten einen Mangel feststellen (z.B. einen Fleck im Backofen), reinigt unser anwesendes Personal sofort und kostenlos nach, bis das Protokoll anstandslos unterschrieben wird."
      },
      {
        "question": "Was kostet eine Endreinigung in Ipsach?",
        "answer": "Wir arbeiten ausschliesslich mit transparenten Pauschalpreisen. Für eine kleine Wohnung starten wir ab CHF 350. Eine reguläre 3.5-Zimmer-Wohnung kostet ab CHF 490, eine 4.5-Zimmer-Wohnung ab CHF 690. Nach einer kostenlosen Besichtigung erhalten Sie einen verbindlichen Fixpreis."
      },
      {
        "question": "Muss die Wohnung für die Endreinigung komplett leer sein?",
        "answer": "Ja. Um jeden Winkel, alle Fussleisten und Böden nach Schweizer Standards reinigen zu können, muss die Wohnung am Reinigungstag komplett von Möbeln und persönlichem Hausrat geräumt sein."
      },
      {
        "question": "Ist die Fenster- und Storenreinigung im Preis inbegriffen?",
        "answer": "Ja, unsere Endreinigung in Ipsach ist ein Komplettpaket. Wir reinigen sämtliche Fenster innen und aussen, alle Fensterrahmen, Fälze, Jalousien sowie die zugehörigen Führungsschienen ohne zusätzliche Kosten."
      },
      {
        "question": "Ist SwissCleanMove bei der Wohnungsübergabe anwesend?",
        "answer": "Ja, auf Ihren ausdrücklichen Wunsch ist ein Vertreter von uns bei der offiziellen Abnahme mit der Verwaltung in Ipsach anwesend. Dieser Service ist für Sie kostenlos und stellt sicher, dass allfällige kleine Mängel direkt behoben werden."
      },
      {
        "question": "Füllen Sie in Ipsach auch Bohrlöcher auf?",
        "answer": "Das Auffüllen von Dübellöchern ist eine handwerkliche Pflicht des Mieters. Wir können diese Aufgabe jedoch auf Voranmeldung und gegen einen kleinen Aufpreis gerne fachmännisch für Sie übernehmen, um Diskussionen bei der Abnahme zu vermeiden."
      },
      {
        "question": "Muss ich Putzmittel oder einen Staubsauger bereitstellen?",
        "answer": "Nein, Sie können die Wohnung besenrein und komplett leer verlassen. Unser Team bringt sämtliche professionellen Staubsauger, Leitern und umweltfreundlichen, aber hochwirksamen Putzmittel für Küche und Bad selbst mit."
      },
      {
        "question": "Wie lange im Voraus muss ich den Termin buchen?",
        "answer": "Wir empfehlen, die Endreinigung in Ipsach etwa 3 bis 4 Wochen im Voraus zu reservieren, da Monatsenden schnell ausgebucht sind. Dank unserer lokalen Nähe können wir in dringenden Fällen jedoch oft auch sehr kurzfristig (innert 24-48 Stunden) helfen."
      },
      {
        "question": "Bieten Sie auch Umzüge in Ipsach an?",
        "answer": "Ja, SwissCleanMove ist eine Full-Service-Agentur. Wir übernehmen sehr gerne auch den kompletten Umzug (inkl. Transport und Möbelmontage). Wenn Sie Umzug und Endreinigung zusammen buchen, erhalten Sie in der Regel einen attraktiven Kombi-Preis."
      },
      {
        "question": "Sind Ihre Mitarbeiter versichert?",
        "answer": "Absolut. Alle unsere Reinigungskräfte sind bei SwissCleanMove fest angestellt und fair bezahlt. Zudem verfügen wir über eine vollumfängliche Betriebshaftpflichtversicherung. Sollte während der Reinigung versehentlich ein Schaden am Eigentum entstehen, sind Sie komplett abgesichert."
      }
    ]
  };
}

// 3. reinigungIpsach (Template C)
const oldReinigungIpsach = data.seoPages.reinigungIpsach;
if (oldReinigungIpsach) {
  data.seoPages.reinigungIpsach = {
    "meta": oldReinigungIpsach.meta,
    "badge": oldReinigungIpsach.badge,
    "h1": oldReinigungIpsach.h1,
    "heroSubtitle": oldReinigungIpsach.heroSubtitle,
    "ctaSoft": oldReinigungIpsach.ctaSoft,
    "intro": "Eine saubere Wohn- oder Arbeitsumgebung ist die Basis für Lebensqualität und geschäftlichen Erfolg. SwissCleanMove ist Ihre verlässliche Reinigungsfirma für Ipsach und das gesamte angrenzende Seeland. Wir bieten Privathaushalten, kleinen und mittleren Unternehmen sowie Liegenschaftsverwaltungen ein breites Spektrum an professionellen Reinigungslösungen. Unsere Expertise reicht von der wöchentlichen Haushaltshilfe über die tägliche Unterhaltsreinigung in Büros bis hin zu anspruchsvollen Spezialaufgaben wie Fenster- oder Baureinigungen. Seit 2024 stehen wir für Diskretion, Schweizer Gründlichkeit und umweltbewusste Arbeitsweisen. Bei SwissCleanMove profitieren Sie von absoluter Kostentransparenz durch feste Pauschal- oder faire Stundenpreise, ohne versteckte Zusatzgebühren. Unsere gut geschulten, fest angestellten Reinigungskräfte passen sich flexibel Ihrem Terminplan an – egal, ob Sie die Reinigung am frühen Morgen, am späten Abend oder an Wochenenden wünschen. Übergeben Sie uns das Putzen und geniessen Sie Ihre freie Zeit am schönen Bielersee.",
    "sections": [
      {
        "heading": "Ihr lokaler Reinigungspartner für Ipsach",
        "body": "Als lokales Unternehmen sind wir in Ipsach stark verwurzelt. Wir kennen die Vielfalt der hiesigen Immobilien, vom Einfamilienhaus in Seenähe bis zum modernen Gewerbebetrieb, und passen unsere Dienstleistungen exakt an Ihre Bedürfnisse an. Nach einer kostenlosen Besichtigung vor Ort erstellen wir ein detailliertes Pflichtenheft, das sicherstellt, dass kein Detail übersehen wird. Das Wichtigste in unserer Branche ist Vertrauen: Bei regelmässigen Aufträgen setzen wir immer dieselbe, feste Reinigungskraft bei Ihnen ein. So müssen Sie sich nicht ständig an neue Gesichter gewöhnen. Wir verwenden ausschliesslich nachhaltige, biologisch abbaubare Reinigungsmittel, die schonend zu Ihren Oberflächen sind und die Raumluft nicht mit aggressiver Chemie belasten."
      },
      {
        "heading": "Die am häufigsten gebuchten Reinigungsdienste in Ipsach",
        "body": "Wir sind ein Full-Service-Reinigungsunternehmen. Entdecken Sie, mit welchen Dienstleistungen wir unseren Kunden in Ipsach den Alltag erleichtern."
      },
      {
        "heading": "Unterhaltsreinigung für Gewerbe und Büros",
        "body": "Ein sauberes Büro hinterlässt bei Kunden einen perfekten Eindruck und reduziert nachweislich den Krankenstand der Mitarbeiter. Wir leeren die Papierkörbe, reinigen Böden, Tische und Kaffeeküchen und desinfizieren hochfrequentierte Bereiche wie Türklinken und Sanitäranlagen hygienisch rein. Dieser Service richtet sich an Praxen, Kanzleien und KMU in Ipsach. Gewerbekunden vertrauen auf unsere Flexibilität, da wir die Reinigung ausserhalb der regulären Arbeitszeiten durchführen, um den Betrieb nicht zu stören."
      },
      {
        "heading": "Wohnungsreinigung und private Haushaltshilfe",
        "body": "Geniessen Sie Ihre Abende ohne Staubsauger und Wischmopp. Unsere Haushaltshilfe übernimmt die gründliche Reinigung von Bad, Küche und Böden in Ihrem Zuhause. Auf Wunsch waschen und bügeln wir auch Ihre Wäsche. Dieser Service richtet sich an Familien, Paare und Berufstätige in Ipsach, die Wert auf Diskretion und eine feste, vertrauenswürdige Bezugsperson legen."
      },
      {
        "heading": "Professionelle Fensterreinigung",
        "body": "Glänzende Fenster bringen mehr Licht in Ihre Räume. Wir reinigen sämtliche Fenster, Rahmen und Storen streifenfrei und sicher. Durch moderne Teleskopstangen erreichen wir auch Dachfenster oder schwer zugängliche Schaufenster in Ipsach problemlos. Dieser Service ist ideal für Privathaushalte beim Frühlingsputz oder für Gewerbebetriebe, die ihre Sichtbarkeit verbessern wollen."
      },
      {
        "heading": "Baureinigung für Neu- und Umbauten",
        "body": "Nach handwerklichen Arbeiten ist die Immobilie stark verschmutzt. Wir übernehmen die Baugrobreinigung und die finale Baufeinreinigung. Wir entfernen Zementreste, Farbspritzer und feinen Baustaub schonend von neuen Böden und Armaturen. Architekten und Eigentümer in Ipsach buchen uns für diesen Service, um eine schlüsselfertige, makellose Übergabe zu garantieren."
      },
      {
        "heading": "Hauswartung und Liegenschaftsservice",
        "body": "Wir pflegen Mehrfamilienhäuser in Ipsach von A bis Z. Unser Service umfasst die regelmässige Treppenhausreinigung, die Kontrolle der Beleuchtung und Heizung, die Gartenpflege sowie den Winterdienst (Schneeräumen). Liegenschaftsverwaltungen schätzen uns als zuverlässigen Ansprechpartner vor Ort, der durch proaktive Kontrollen teure Folgeschäden verhindert."
      },
      {
        "heading": "Warum eine professionelle Reinigung den Werterhalt sichert (Ratgeber)",
        "body": "Die Beauftragung einer professionellen Reinigungsfirma wie SwissCleanMove bringt neben der optischen Sauberkeit noch einen weiteren, oft unterschätzten Vorteil: den langfristigen Werterhalt Ihrer Immobilie in Ipsach. Falsche Reinigungsmittel können edles Parkett, teure Natursteinböden oder empfindliche Sanitärarmaturen irreparabel beschädigen. Unsere geschulten Fachkräfte wissen genau, welche pH-Werte und Pflegemittel für welches Material geeignet sind. Zudem arbeiten wir ohne unübersichtliche Vertragslaufzeiten. Bei SwissCleanMove profitieren Sie von kurzen Kündigungsfristen und maximaler Flexibilität. Wenn Sie im Urlaub sind, pausieren wir die Haushaltshilfe problemlos oder nutzen die Zeit für eine gründliche Spezialreinigung Ihrer Teppiche. Bei uns stehen Transparenz, rechtliche Absicherung (alle Mitarbeiter sind versichert) und exzellenter Service im Vordergrund."
      }
    ],
    "serviceBulletsHeading": "Unsere Qualitätsversprechen für Sie in Ipsach",
    "serviceBullets": [
      "Feste, vertrauenswürdige Reinigungskraft",
      "Kostenlose Beratung und transparentes Pflichtenheft",
      "Ökologische, schonende Reinigungsprodukte",
      "Betriebshaftpflichtversicherung für alle Schäden",
      "Einsätze ausserhalb der Öffnungszeiten möglich",
      "Faire Preise ohne versteckte Gebühren"
    ],
    "trustPoints": oldReinigungIpsach.trustPoints || ["Zuverlässig", "Diskret", "Schweizer Qualität"],
    "ctaMidHeading": oldReinigungIpsach.ctaMidHeading,
    "ctaMidBody": oldReinigungIpsach.ctaMidBody,
    "ctaMid": oldReinigungIpsach.ctaMid,
    "serviceAreaHeading": "Unser regionales Einsatzgebiet",
    "serviceAreaBody": "Wir sind als lokales Reinigungsunternehmen stark im Seeland verankert. Unser primärer Aktionsradius umfasst Ipsach, Nidau, Biel/Bienne, Port, Bellmund, Sutz-Lattrigen und Täuffelen. Dank unserer geografischen Nähe können wir kurze Anfahrtswege garantieren, sind bei Notfällen (wie z.B. bei der Reinigung nach kleinen Wasserschäden) extrem schnell vor Ort und bieten höchste Pünktlichkeit.",
    "internalLinksHeading": oldReinigungIpsach.internalLinksHeading,
    "internalLinks": oldReinigungIpsach.internalLinks,
    "ctaStrongHeading": oldReinigungIpsach.ctaStrongHeading,
    "ctaStrongBody": oldReinigungIpsach.ctaStrongBody,
    "ctaStrong": oldReinigungIpsach.ctaStrong,
    "testimonial": oldReinigungIpsach.testimonial || { "quote": "Unsere Büros in Ipsach werden stets einwandfrei gereinigt. Die Firma arbeitet sehr diskret und professionell.", "author": "Geschäftsführer aus Ipsach", "trust": "Gewerbekunde" },
    "faqs": [
      {
        "question": "Bieten Sie Reinigungen für Privat und Gewerbe in Ipsach an?",
        "answer": "Ja, SwissCleanMove betreut beide Segmente. Wir bieten Familien in Ipsach regelmässige Haushaltshilfen an und übernehmen für Gewerbekunden (Büros, Praxen, Ladenlokale) die professionelle tägliche oder wöchentliche Unterhaltsreinigung."
      },
      {
        "question": "Muss ich die Reinigungsmittel selbst zur Verfügung stellen?",
        "answer": "Das entscheiden Sie. In Privathaushalten in Ipsach nutzen wir oft die Mittel und Staubsauger des Kunden. Auf Wunsch, sowie standardmässig bei Büro-, Bau- und Spezialreinigungen, bringen wir eigene, professionelle Reinigungsmittel und Maschinen mit."
      },
      {
        "question": "Ist meine Wohnung in Ipsach gegen Schäden versichert?",
        "answer": "Absolut. SwissCleanMove ist vollständig betriebshaftpflichtversichert. Sollte unserer Reinigungskraft trotz grösster Vorsicht ein Fehler unterlaufen (z.B. ein zerbrochener Gegenstand), sind Sie finanziell zu 100% abgesichert."
      },
      {
        "question": "Wird immer dieselbe Reinigungskraft zu mir geschickt?",
        "answer": "Ja, Vertrauen ist für uns das Wichtigste. Deshalb weisen wir Ihnen für regelmässige Unterhaltsreinigungen in Ipsach immer eine feste Bezugsperson zu. Nur bei Krankheit oder Ferien organisieren wir nach Absprache eine kompetente Vertretung."
      },
      {
        "question": "Welche Reinigungsmittel verwenden Sie?",
        "answer": "Wir legen grossen Wert auf Nachhaltigkeit und die Gesundheit unserer Kunden. Wir verwenden in Ipsach fast ausschliesslich ökologisch abbaubare Reinigungsmittel, die stark gegen Schmutz sind, aber die Umwelt und Ihre Gesundheit schonen."
      },
      {
        "question": "Können Büroreinigungen ausserhalb der Geschäftszeiten erfolgen?",
        "answer": "Ja, das ist bei Gewerbekunden unser Standard. Um den Arbeitsfluss in Ihrem Unternehmen in Ipsach nicht zu stören, arbeiten unsere Teams flexibel am frühen Morgen, am späten Abend oder auf Wunsch sogar am Wochenende."
      },
      {
        "question": "Wie lange sind die Kündigungsfristen für einen Vertrag?",
        "answer": "Wir binden unsere Kunden durch hervorragende Qualität und nicht durch starre Verträge. Die Kündigungsfrist für regelmässige Reinigungsaufträge in Ipsach beträgt in der Regel kundenfreundliche 30 Tage auf das Ende eines Kalendermonats."
      },
      {
        "question": "Sind Ihre Mitarbeiter fest angestellt oder Freelancer?",
        "answer": "Wir verzichten komplett auf Schwarzarbeit oder Tagelöhner. Alle unsere Reinigungskräfte sind bei SwissCleanMove fest angestellt, werden fair entlöhnt und wir führen alle gesetzlichen Sozial- und Versicherungsbeiträge (AHV, SUVA) für sie ab."
      },
      {
        "question": "Wie werden die Preise für die Unterhaltsreinigung berechnet?",
        "answer": "Nach einer kostenlosen Besichtigung Ihres Objekts in Ipsach kalkulieren wir den Aufwand anhand der Grösse, der Böden und Ihrer Wünsche. Daraufhin erhalten Sie eine transparente Offerte mit einem festen Pauschal- oder Stundenpreis ohne versteckte Kosten."
      },
      {
        "question": "Bieten Sie auch Frühlingsputz oder Fensterreinigungen an?",
        "answer": "Ja, wir übernehmen in Ipsach auch einmalige Aufträge wie die intensive Frühlingsreinigung, das streifenfreie Fensterputzen (inklusive Rahmen und Storen) oder das fachgerechte Shampoonieren von verschmutzten Teppichen."
      }
    ]
  };
}

// 4. umzugAarberg (Template D)
const oldUmzugAarberg = data.seoPages.umzugAarberg;
if (oldUmzugAarberg) {
  data.seoPages.umzugAarberg = {
    "meta": oldUmzugAarberg.meta,
    "badge": oldUmzugAarberg.badge,
    "h1": oldUmzugAarberg.h1,
    "heroSubtitle": oldUmzugAarberg.heroSubtitle,
    "ctaSoft": oldUmzugAarberg.ctaSoft,
    "intro": "Planen Sie einen Umzug in das historische Städtchen Aarberg oder in die Region Seeland? Ein Wohnungswechsel erfordert viel Zeit, starke Nerven und logistisches Geschick. SwissCleanMove ist Ihre vertrauenswürdige, lokale Umzugsfirma für Aarberg. Wir nehmen Ihnen die schwere Arbeit komplett ab, damit Sie sich entspannt auf Ihr neues Zuhause freuen können. Seit 2024 unterstützen wir Familien, Einzelpersonen und Unternehmen zuverlässig bei jedem Schritt ihres Umzugs. Egal, ob Sie innerhalb von Aarberg umziehen, ins nahegelegene Lyss wechseln oder einen Transport quer durch die Schweiz planen – unser erfahrenes Team sorgt für einen reibungslosen Ablauf. Wir bieten Ihnen absolute Kostensicherheit durch feste Pauschalpreise ab CHF 490. In unseren Offerten sind die kräftigen Zügelhelfer, die modernen Transportfahrzeuge und eine lückenlose Transportversicherung immer inkludiert. Dank zahlreicher erfolgreicher Umzüge in der Region wissen wir genau, worauf es ankommt. Wir arbeiten extrem speditiv und bieten bei Notfällen eine schnelle Verfügbarkeit, oft sogar innerhalb von 24 Stunden. Vertrauen Sie auf Schweizer Umzugsqualität aus Ihrer Region.",
    "sections": [
      {
        "heading": "Ihr verlässlicher Umzugspartner in Aarberg",
        "body": "Aarberg, mit seinem wunderschönen historischen Stadtkern und den modernen Wohnquartieren, stellt Umzugsfirmen oft vor besondere Herausforderungen bezüglich Zufahrt und Platzverhältnissen. Als regionale Umzugsfirma kennen wir diese Gegebenheiten bestens. Wir bieten keine Standardlösungen, sondern beraten Sie individuell nach einer kostenlosen Besichtigung vor Ort in Aarberg. Sie bestimmen den Umfang unseres Einsatzes: vom bequemen Komplettumzug inklusive Einpackservice bis hin zum reinen Transport schwerer Möbelstücke. Unser oberstes Ziel ist es, Ihren Umzug stressfrei und schadenfrei abzuwickeln. Dies gewährleisten wir durch unser fest angestelltes, geschultes Personal und modernstes Umzugsequipment."
      },
      {
        "heading": "Zielgruppen, die wir in Aarberg unterstützen",
        "body": "Wir sind stolz darauf, ein breites Spektrum an Kunden in Aarberg zu betreuen: junge Familien, die sich vergrössern, Senioren, die in barrierefreie Wohnungen wechseln, sowie lokale KMU und Praxen, die einen schnellen und ausfallfreien Firmenumzug benötigen."
      },
      {
        "heading": "Sorgfältige Privatumzüge",
        "body": "Wir verlagern Ihren kompletten Hausrat sicher in Ihr neues Zuhause. Unsere Mitarbeiter verpacken empfindliche Möbelstücke mit Stretchfolie und Zügeldecken und sichern diese professionell in unseren modernen Zügelwagen. Dieser Service richtet sich an alle Privatpersonen in Aarberg. Kunden buchen uns, weil wir äusserst sorgfältig mit ihren persönlichen Erinnerungsstücken umgehen und durch unsere routinierte Arbeitsweise den Stress am Umzugstag massiv reduzieren."
      },
      {
        "heading": "Büro- und Geschäftsumzüge",
        "body": "Für Unternehmen in Aarberg bieten wir effiziente Relocation-Services. Wir transportieren schwere Aktenschränke, IT-Infrastruktur und Büromöbel. Um den Betriebsablauf nicht zu stören, führen wir Firmenumzüge auf Wunsch auch am Wochenende durch. Dieser Service ist perfekt für lokale Gewerbebetriebe. Geschäftskunden schätzen unsere Termintreue und die präzise Planung, die Ausfallzeiten auf ein absolutes Minimum beschränkt."
      },
      {
        "heading": "Professioneller Ein- und Auspackservice",
        "body": "Wenn Ihnen die Zeit zum Kistenpacken fehlt, übernehmen wir das für Sie. Unser Team bringt professionelles Packmaterial mit und verpackt Geschirr, Bücher und Kleidung absolut bruchsicher. Am Zielort in Aarberg räumen wir auf Wunsch alles wieder in Ihre Schränke ein. Dieser Service ist ideal für Vielbeschäftigte. Kunden sind begeistert, weil sich ihr persönlicher Aufwand für den Umzug auf nahezu null reduziert."
      },
      {
        "heading": "Fachgerechte Möbelmontage",
        "body": "Grosse Schränke und Betten lassen sich oft nicht am Stück transportieren. Unsere handwerklich versierten Zügelhelfer demontieren Ihre Möbel am alten Wohnort in Aarberg und montieren sie am neuen Standort wieder absolut stabil. Wir bringen sämtliches Werkzeug mit. Dieser Service richtet sich an Kunden, die sich den Ärger mit Anleitungen und fehlenden Schrauben ersparen wollen und sofort wieder wohnlich eingerichtet sein möchten."
      },
      {
        "heading": "Einsatz von Möbelliften",
        "body": "In Altbauten mit engen Treppenhäusern in Aarberg stossen auch kräftige Träger an ihre Grenzen. Wir setzen unseren Möbellift ein, um schwerste Sofas oder Klaviere sicher über den Balkon oder durch grosse Fenster zu transportieren. Dieser Service schützt das Treppenhaus vor Kratzern und das Mobiliar vor Beschädigungen und beschleunigt den Transport enorm."
      },
      {
        "heading": "Entsorgung und Räumung",
        "body": "Ein Umzug ist die ideale Gelegenheit, sich von alten Dingen zu trennen. Defekte Geräte oder unerwünschte Möbel nehmen wir am Umzugstag direkt mit und entsorgen diese fachgerecht bei den Recyclingstationen in der Region Aarberg. Dieser Service richtet sich an alle, die Platz schaffen wollen. Kunden schätzen es, sich nicht selbst um einen Transporter für den Weg zum Werkhof kümmern zu müssen."
      },
      {
        "heading": "Umzugs-Ratgeber für Aarberg: So gelingt der Wechsel",
        "body": "Eine sorgfältige Planung verhindert Stress. Wir raten unseren Kunden in Aarberg, Umzugskartons nicht zu schwer zu beladen (Bücher in kleine Kisten, Kleidung in grosse) und diese an der Seite deutlich mit dem Zielraum zu beschriften. Wertsachen und wichtige Dokumente sollten Sie immer persönlich transportieren. Da das Parkieren des LKW direkt vor dem Haus entscheidend für einen speditiven Umzug ist, sollten Sie frühzeitig prüfen, ob Parkplätze vorhanden sind. Ist dies in Aarberg (z.B. in der Altstadt) nicht der Fall, informieren Sie uns rechtzeitig. Wir können dann bei der Gemeinde ein offizielles Halteverbot beantragen. Denken Sie auch daran, den Zählerstand (Strom/Wasser) am Umzugstag abzulesen und rechtzeitig Nachsendeaufträge bei der Post einzurichten. Mit SwissCleanMove haben Sie zudem den Vorteil, dass Ihre Helfer voll haftpflichtversichert sind – anders als bei privaten Zügelhilfen durch Freunde, wo Schäden oft nicht gedeckt sind."
      }
    ],
    "serviceBulletsHeading": "Ihre Vorteile bei Umzügen in Aarberg",
    "serviceBullets": [
      "Feste Pauschalpreise ab CHF 490 ohne Überraschungen",
      "Kostenlose Vor-Ort-Besichtigung und Beratung",
      "Kräftiges, erfahrenes und fest angestelltes Personal",
      "Vollständige Transport- und Betriebshaftpflicht",
      "Moderne, luftgefederte Zügelwagen (3.5t und 7.5t)",
      "Montage, Demontage und Entsorgung verfügbar"
    ],
    "trustPoints": oldUmzugAarberg.trustPoints || ["Fixpreise", "Voll versichert", "Regional in Aarberg"],
    "ctaMidHeading": oldUmzugAarberg.ctaMidHeading,
    "ctaMidBody": oldUmzugAarberg.ctaMidBody,
    "ctaMid": oldUmzugAarberg.ctaMid,
    "serviceAreaHeading": "Unterwegs in Aarberg und im Seeland",
    "serviceAreaBody": "Wir sind tief im Seeland verwurzelt und täglich in Aarberg sowie den umliegenden Gemeinden im Einsatz. Wir betreuen Umzüge in Aarberg, Lyss, Radelfingen, Seedorf, Walperswil und Kallnach. Dank unserer regionalen Präsenz fallen für Sie keine langen Anfahrtskosten an, und wir können stets Pünktlichkeit und Zuverlässigkeit garantieren. Auch Umzüge in die gesamte restliche Schweiz führen wir gerne für Sie durch.",
    "internalLinksHeading": oldUmzugAarberg.internalLinksHeading,
    "internalLinks": oldUmzugAarberg.internalLinks,
    "ctaStrongHeading": oldUmzugAarberg.ctaStrongHeading,
    "ctaStrongBody": oldUmzugAarberg.ctaStrongBody,
    "ctaStrong": oldUmzugAarberg.ctaStrong,
    "testimonial": oldUmzugAarberg.testimonial || { "quote": "Ein reibungsloser Umzug in Aarberg. Die Mitarbeiter waren pünktlich, schnell und sehr sorgfältig.", "author": "Familie B.", "trust": "Zufriedene Kunden aus Aarberg" },
    "faqs": [
      {
        "question": "Wie hoch sind die Kosten für einen Umzug in Aarberg?",
        "answer": "Wir bieten in Aarberg faire und transparente Pauschalpreise ab CHF 490 an. Die genauen Kosten hängen von der Menge Ihrer Möbel, der Wohnungsgrösse und der Distanz ab. Nach einer kostenlosen Besichtigung erhalten Sie von uns eine verbindliche Offerte, in der Zügelwagen, Helfer und Versicherungen bereits enthalten sind."
      },
      {
        "question": "Ist mein Mobiliar während des Transports versichert?",
        "answer": "Ja. Bei SwissCleanMove ist jeder Umzug in Aarberg standardmässig durch eine umfassende Transport- und Betriebshaftpflichtversicherung abgedeckt. Sollte trotz grösster Sorgfalt ein Schaden an Ihren Möbeln oder am Treppenhaus entstehen, übernimmt unsere Versicherung die Kosten vollumfänglich."
      },
      {
        "question": "Führen Sie auch Büroumzüge in Aarberg durch?",
        "answer": "Ja, wir übernehmen professionelle Relocation-Services für Gewerbekunden. Wir transportieren IT-Equipment, Archive und schwere Büromöbel sicher. Um Ihren Geschäftsbetrieb in Aarberg nicht zu unterbrechen, bieten wir Firmenumzüge auch gerne ausserhalb der Öffnungszeiten oder am Wochenende an."
      },
      {
        "question": "Bauen Sie meine Schränke ab und wieder auf?",
        "answer": "Ja, unsere Zügelhelfer sind mit Werkzeug ausgerüstet und sehr erfahren in der fachgerechten Demontage und Montage von gängigen Möbeln (z.B. Kleiderschränke, Boxspringbetten). Wir sorgen dafür, dass alles am neuen Wohnort in Aarberg wieder einwandfrei und stabil steht."
      },
      {
        "question": "Können Sie auch alte Möbel für mich entsorgen?",
        "answer": "Ja, wenn Sie beim Umzug ausmisten, nehmen wir alte, unerwünschte Möbel, Teppiche oder defekte Elektrogeräte am Umzugstag direkt mit und entsorgen diese fach- und umweltgerecht bei den lokalen Recyclinghöfen in der Region Aarberg."
      },
      {
        "question": "Wie lange im Voraus muss ich den Umzugstermin buchen?",
        "answer": "Besonders die Termine am Monatsende sind schnell ausgebucht. Wir raten Ihnen, den Umzug in Aarberg etwa 3 bis 4 Wochen im Voraus zu reservieren. Da wir jedoch in der Nähe ansässig sind, können wir bei kurzfristigen Anfragen oft innert 24 bis 48 Stunden einspringen."
      },
      {
        "question": "Bieten Sie auch die Endreinigung der alten Wohnung an?",
        "answer": "Ja, SwissCleanMove ist Ihr Partner für das gesamte Umzugsprojekt. Wir bieten in Aarberg auch professionelle Endreinigungen mit 100% Abnahmegarantie an. Kunden, die Umzug und Reinigung bei uns bündeln, profitieren von einem stressfreien Ablauf und oft von einem Kombi-Rabatt."
      },
      {
        "question": "Organisieren Sie die Absperrung für den Zügelwagen in Aarberg?",
        "answer": "Wenn vor Ihrem alten oder neuen Wohnort (z.B. im Zentrum von Aarberg) nicht ausreichend Parkfläche für unseren Zügelwagen vorhanden ist, können wir nach Rücksprache gerne ein offizielles Halteverbot bei der Gemeinde beantragen und die Schilder aufstellen."
      },
      {
        "question": "Kann ich bei Ihnen Umzugskartons kaufen oder mieten?",
        "answer": "Ja, wir liefern Ihnen im Vorfeld des Umzugs gerne hochwertiges Verpackungsmaterial wie stabile Zügelkartons, Kleiderkisten, Seidenpapier und Luftpolsterfolie direkt nach Aarberg. Sie haben die Wahl, das Material zu kaufen oder teilweise zu mieten."
      },
      {
        "question": "Führen Sie Umzüge auch am Wochenende durch?",
        "answer": "Ja, um Ihnen grösstmögliche Flexibilität zu bieten, sind unsere Zügelteams auf Voranmeldung auch an Freitagen und Samstagen für Umzüge in Aarberg im Einsatz. Buchen Sie diese beliebten Termine jedoch bitte frühzeitig."
      }
    ]
  };
}

fs.writeFileSync(dePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated umzugIpsach, endreinigungIpsach, reinigungIpsach, umzugAarberg in messages/de.json');
