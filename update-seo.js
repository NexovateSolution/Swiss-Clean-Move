const fs = require('fs');
const path = require('path');

const dePath = path.join(__dirname, 'messages', 'de.json');
const data = JSON.parse(fs.readFileSync(dePath, 'utf8'));

// Preserving the EXACT meta, badge, h1, etc. as instructed
const oldUmzug = data.seoPages.umzugBiel;

data.seoPages.umzugBiel = {
  "meta": oldUmzug.meta,
  "badge": oldUmzug.badge,
  "h1": oldUmzug.h1,
  "heroSubtitle": oldUmzug.heroSubtitle,
  "ctaSoft": oldUmzug.ctaSoft,
  "intro": "Sie planen einen Umzug in Biel/Bienne oder in die Region Seeland? Ein Wohnungswechsel ist oft mit Stress, logistischen Herausforderungen und viel Zeitaufwand verbunden. SwissCleanMove ist Ihre bewährte und lokale Umzugsfirma mit Sitz direkt in Biel an der Orpundstrasse 31. Seit 2024 unterstützen wir Privatpersonen, Familien und Unternehmen bei ihrem Umzug – sei es innerhalb der Stadt Biel, in die umliegenden Gemeinden oder schweizweit. Unser erfahrenes Team sorgt dafür, dass Ihr Umzug stressfrei, termingerecht und zu einem absolut transparenten Preis abläuft. Mit über 50 erfolgreich durchgeführten Umzügen im Raum Biel und Seeland verfügen wir über die nötige Erfahrung, um jeden Auftrag präzise zu meistern. Ob Sie aus einer engen Altstadtwohnung in Biel ziehen, Ihr Familienhaus im Seeland wechseln oder als Unternehmen neue Büroräumlichkeiten beziehen – wir haben die richtige Lösung. Wir bieten Ihnen faire Pauschalpreise bereits ab CHF 490, setzen je nach Bedarf 2–4 kräftige Zügelhelfer ein und stellen moderne Transportfahrzeuge zur Verfügung. Eine umfassende Transportversicherung ist bei uns stets inklusive, sodass Ihr wertvolles Mobiliar optimal geschützt ist. Ihr Umzug ist bei uns in der Regel innerhalb von 1–2 Tagen komplett abgeschlossen. Da wir direkt am Bielersee stationiert sind, profitieren Sie von extrem kurzen Anfahrtswegen und einer hohen Flexibilität. Wir sind für Sie sogar innerhalb von 24 Stunden verfügbar, falls es einmal besonders schnell gehen muss.",
  "sections": [
    {
      "heading": "Warum SwissCleanMove Ihre erste Wahl in Biel/Bienne ist",
      "body": "Die Wahl der richtigen Umzugsfirma ist Vertrauenssache. Wir sind keine anonyme Zügelplattform, bei der Sie nicht wissen, wer am Umzugstag vor Ihrer Tür steht. SwissCleanMove ist ein fest verankertes, lokales Unternehmen in Biel. Wenn Sie uns kontaktieren, sprechen Sie mit echten Ansprechpartnern aus der Region, die die örtlichen Gegebenheiten – von den engen Gassen der Bieler Altstadt bis zu den modernen Wohnquartieren am See – bestens kennen. Unsere Preisgestaltung ist zu 100% transparent. Sie erhalten nach einer kostenlosen Besichtigung eine Fixpreis-Offerte ohne versteckte Kosten oder böse Überraschungen am Ende des Tages. Unser Team besteht aus bestens geschulten, kräftigen und sorgfältigen Zügelhelfern, die tagtäglich Umzugsgut sicher transportieren. Mit mehr als 50 erfolgreich abgewickelten Umzügen im Seeland haben wir bewiesen, dass wir höchste Schweizer Qualitätsstandards erfüllen. Egal, ob Sie aus einer kleinen Studentenwohnung oder einem grossen Einfamilienhaus ziehen – Ihre Zufriedenheit steht für uns an erster Stelle."
    },
    {
      "heading": "Unsere umfassenden Umzugsdienstleistungen",
      "body": "Als Full-Service-Umzugsfirma decken wir jeden Aspekt Ihres Wohnungs- oder Firmenwechsels ab. Sie können genau die Dienstleistungen buchen, die Sie benötigen. Nachfolgend stellen wir Ihnen unsere einzelnen Services im Detail vor."
    },
    {
      "heading": "Privatumzüge in Biel und Umgebung",
      "body": "Ein privater Umzug ist ein grosser Schritt. Wir begleiten Sie von der ersten Planung bis zum Einzug in Ihr neues Zuhause. Unser Team übernimmt den sicheren Transport Ihrer Möbel, Kartons und persönlichen Gegenstände. Wir wissen, dass viele Objekte nicht nur einen materiellen, sondern auch einen hohen emotionalen Wert haben. Deshalb arbeiten wir mit grösster Vorsicht, nutzen professionelles Schutzmaterial wie Zügeldecken und Stretchfolie und sichern alles fachgerecht im Transportwagen. Ob Sie in ein Apartment in der Innenstadt von Biel, in ein Einfamilienhaus in Brügg oder in eine Attikawohnung in Nidau ziehen – wir meistern jede Situation, einschliesslich enger Treppenhäuser und schwieriger Parkverhältnisse. Dieser Service richtet sich an Familien, Paare und Singles, die einen reibungslosen Ablauf ohne körperliche Überlastung wünschen. Kunden wählen uns für Privatumzüge, weil sie unsere Pünktlichkeit, Sorgfalt und lokale Verankerung schätzen."
    },
    {
      "heading": "Firmenumzüge und Büroumzüge",
      "body": "Ein Firmenumzug erfordert eine akribische Planung, damit der Betriebsunterbruch so kurz wie möglich gehalten wird. Wir verlagern Ihr Büro, Ihre Praxis oder Ihr Ladenlokal effizient und systematisch an den neuen Standort. Unser Service umfasst den sicheren Transport von IT-Infrastruktur, Aktenarchiven, schweren Schreibtischen und Konferenzmöbeln. Wir arbeiten nach einem strikten Zeitplan, sodass Ihre Mitarbeiter schnellstmöglich wieder arbeitsfähig sind. Bei Bedarf führen wir Büroumzüge auch am Wochenende durch, um Ihre Geschäftsabläufe nicht zu stören. Dieser Service richtet sich an Start-ups, KMU und grosse Unternehmen im Seeland, die eine schnelle und zuverlässige Relocation benötigen. Geschäftskunden vertrauen auf SwissCleanMove, weil wir höchste Zuverlässigkeit garantieren, über eine starke Transportversicherung verfügen und als lokales Bieler Unternehmen schnell auf Planänderungen reagieren können."
    },
    {
      "heading": "Ein- und Auspackservice",
      "body": "Das Verpacken des gesamten Hausrats gehört zu den zeitaufwendigsten Aufgaben bei einem Umzug. Unser professioneller Ein- und Auspackservice nimmt Ihnen diese Last vollständig ab. Unsere erfahrenen Mitarbeiter verpacken Ihr Geschirr, Ihre Gläser, Kleider, Bücher und Dekorationsobjekte sicher in bruchsichere Umzugskartons. Wir bringen alle notwendigen Verpackungsmaterialien wie Seidenpapier, Luftpolsterfolie und Spezialkartons für Kleidung direkt mit. Am neuen Wohnort räumen wir auf Wunsch alles wieder exakt in Ihre Schränke ein. Dieser Service ist ideal für vielbeschäftigte Berufstätige, ältere Personen oder Familien, denen schlicht die Zeit für diese Vorarbeiten fehlt. Unsere Kunden schätzen diesen Service, weil er den Stressfaktor vor dem Umzugstag massiv reduziert und sicherstellt, dass auch empfindliche Gegenstände den Transport unbeschadet überstehen."
    },
    {
      "heading": "Möbelmontage und Demontage",
      "body": "Moderne Schränke, komplexe Bettsysteme oder ausladende Regale lassen sich oft nicht am Stück transportieren. Unser geschultes Personal übernimmt die fachgerechte Demontage Ihrer Grossmöbel am Auszugsort und baut diese am Zielort wieder stabil und passgenau auf. Wir bringen sämtliches benötigtes Werkzeug mit und sorgen dafür, dass keine Schrauben verloren gehen. Egal ob es sich um klassische IKEA-Möbel oder um teure Massivholzschränke handelt, wir wissen genau, wie die Konstruktionen funktionieren. Dieser Service richtet sich an alle, die keine Zeit oder nicht das richtige Werkzeug für den Möbelaufbau haben. Kunden entscheiden sich für unsere Möbelmontage, weil sie so am ersten Abend im neuen Zuhause direkt in ihrem frisch aufgebauten Bett schlafen können, ohne sich mit Bauanleitungen herumschlagen zu müssen."
    },
    {
      "heading": "Einsatz von Möbelliften",
      "body": "In vielen Gebäuden, besonders in Altbauten oder Häusern ohne Lift, ist das Tragen von schweren Möbeln durch enge Treppenhäuser riskant und zeitraubend. Hier kommt unser moderner Möbellift zum Einsatz. Wir befördern Sofas, Kühlschränke, Klaviere und schwere Schränke sicher und effizient über den Balkon oder durch grosse Fenster direkt in Ihre Wohnung. Das schont nicht nur Ihr Mobiliar, sondern auch das Treppenhaus vor Kratzern und Beschädigungen. Ausserdem beschleunigt der Lifteinsatz den Umzugsprozess enorm. Dieser Service ist für Kunden gedacht, die in oberen Stockwerken wohnen oder besonders sperrige Gegenstände transportieren müssen. Die Wahl fällt auf SwissCleanMove, weil wir die technische Ausrüstung direkt im Haus haben und den Einsatz sicher und professionell koordinieren."
    },
    {
      "heading": "Sicherer Transport und Logistik",
      "body": "Die Kernkompetenz jedes Umzugs ist der sichere Transport. Unsere Flotte aus modernen 3.5-Tonnen- und 7.5-Tonnen-Zügelwagen ist speziell für den sicheren Möbeltransport ausgestattet. Alle Fahrzeuge verfügen über Luftfederung, Hebebühnen und ausreichend Befestigungsmöglichkeiten. Wir beladen die Fahrzeuge systematisch, sodass das Gewicht optimal verteilt ist und nichts verrutschen kann. Wir garantieren einen direkten Transport ohne unnötige Zwischenstopps von der alten zur neuen Adresse, sei es innerhalb des Seelands oder quer durch die Schweiz. Dieser Service richtet sich an alle, die ihr Hab und Gut in sicheren Händen wissen wollen. Kunden vertrauen uns, weil unsere Fahrer über grosse Erfahrung verfügen und eine vollumfängliche Transportversicherung jeden potenziellen Schaden abdeckt."
    },
    {
      "heading": "Entsorgung von Altmöbeln",
      "body": "Oft stellt man beim Packen fest, dass viele Gegenstände, alte Möbel oder defekte Elektrogeräte nicht mit in die neue Wohnung sollen. Wir nehmen Ihnen die aufwendige Fahrerei zum Werkhof ab und übernehmen die umwelt- und fachgerechte Entsorgung direkt am Umzugstag. Wir trennen die Materialien (Holz, Metall, Elektronik, Sperrgut) und entsorgen sie in den entsprechenden Recyclinghöfen der Region Biel. Dieser Service ist perfekt für Personen, die sich beim Umzug verkleinern, zusammenziehen oder schlichtweg Platz für Neues schaffen wollen. Kunden schätzen diese Dienstleistung, weil sie alles aus einer Hand erhalten und den Auszugsort komplett besenrein und frei von Altlasten hinterlassen können."
    },
    {
      "heading": "So bereiten Sie sich optimal auf den Umzugstag vor (Ratgeber)",
      "body": "Eine gute Vorbereitung ist das halbe Zügeln. Wir empfehlen Ihnen, frühzeitig mit dem Aussortieren von ungenutzten Gegenständen zu beginnen – je weniger Sie transportieren müssen, desto günstiger wird der Umzug. Beschriften Sie Ihre Umzugskartons deutlich auf der Seite (nicht nur oben) mit dem Inhalt und dem Zielraum in der neuen Wohnung (z. B. \"Küche / Geschirr\"). Packen Sie schwere Dinge wie Bücher nach unten und in kleine Kartons, leichte Dinge wie Kleidung nach oben. Halten Sie ausserdem eine kleine \"Überlebensbox\" bereit. Darin sollten sich wichtige Dokumente, Schlüssel, Medikamente, ein Ladekabel, etwas Bargeld, Toilettenpapier und Snacks für den Umzugstag befinden. Kümmern Sie sich rechtzeitig um die Parkplatzreservation vor beiden Wohnungen – falls nötig, übernehmen wir bei SwissCleanMove das Einrichten von Halteverbotszonen gerne für Sie."
    }
  ],
  "serviceBulletsHeading": "Ihre Vorteile mit SwissCleanMove",
  "serviceBullets": [
    "Kostenlose Vor-Ort-Besichtigung",
    "Garantierter Pauschalpreis ohne versteckte Kosten",
    "Erfahrene, kräftige und höfliche Zügelhelfer",
    "Komplette Transportversicherung für Ihr Hab und Gut",
    "Moderne Zügelwagen (3.5t und 7.5t)",
    "Flexibel, lokal und innerhalb von 24h verfügbar"
  ],
  "trustPoints": oldUmzug.trustPoints,
  "ctaMidHeading": oldUmzug.ctaMidHeading,
  "ctaMidBody": oldUmzug.ctaMidBody,
  "ctaMid": oldUmzug.ctaMid,
  "serviceAreaHeading": "Unser umfassendes Einzugsgebiet im Seeland",
  "serviceAreaBody": "Als stark verwurzelte Umzugsfirma mit Hauptsitz in Biel/Bienne sind wir täglich im gesamten Seeland für unsere Kunden unterwegs. Unsere Teams kennen die lokalen Gegebenheiten und Verkehrswege bestens. Wir betreuen regelmässig Kunden in Biel/Bienne, Nidau, Brügg, Ipsach, Lyss, Aarberg und Pieterlen. Darüber hinaus bedienen wir sämtliche Gemeinden rund um den idyllischen Bielersee und führen Umzüge von dieser Region aus in die gesamte Schweiz durch. Egal, wo im Seeland Sie wohnen – wir sind schnell bei Ihnen.",
  "internalLinksHeading": oldUmzug.internalLinksHeading,
  "internalLinks": oldUmzug.internalLinks,
  "ctaStrongHeading": oldUmzug.ctaStrongHeading,
  "ctaStrongBody": oldUmzug.ctaStrongBody,
  "ctaStrong": oldUmzug.ctaStrong,
  "testimonial": oldUmzug.testimonial,
  "faqs": [
    {
      "question": "Was kostet ein professioneller Umzug in Biel/Bienne?",
      "answer": "Die Kosten für einen Umzug in Biel/Bienne hängen stark vom Volumen Ihres Hausrats, der Wohnungsgrösse, der Distanz zwischen den beiden Wohnorten und den gewählten Zusatzleistungen ab. Bei SwissCleanMove bieten wir Ihnen attraktive Pauschalpreise ab CHF 490 an. Darin sind der Einsatz von 2–4 Zügelhelfern, der Transportwagen sowie die Transportversicherung bereits enthalten. Wir berechnen keine versteckten Gebühren. Nach einer kostenlosen Besichtigung erhalten Sie von uns eine verbindliche Offerte."
    },
    {
      "question": "Ist mein Mobiliar während des Transports versichert?",
      "answer": "Ja, selbstverständlich. Eine umfassende Transport- und Betriebshaftpflichtversicherung ist bei jedem unserer Umzüge standardmässig im Pauschalpreis inbegriffen. Sollte wider Erwarten ein Schaden an Ihren Möbeln, dem Gebäude oder dem Treppenhaus entstehen, übernimmt unsere Versicherung die volle Haftung. Unser Personal ist jedoch intensiv geschult und verwendet professionelles Schutzmaterial, um das Schadensrisiko von vornherein zu minimieren."
    },
    {
      "question": "Bieten Sie Umzüge auch am Wochenende an?",
      "answer": "Ja, wir wissen, dass viele unserer Kunden unter der Woche stark beruflich eingebunden sind. Deshalb führen wir Umzüge auf Anfrage auch freitags und samstags durch. Wir empfehlen jedoch, Wochenendtermine möglichst frühzeitig zu reservieren, da diese besonders beliebt und oft schnell ausgebucht sind."
    },
    {
      "question": "Wie lange im Voraus sollte ich den Umzug in Biel buchen?",
      "answer": "Um Ihren Wunschtermin garantieren zu können, empfehlen wir eine Buchung etwa 4 bis 6 Wochen im Voraus, besonders wenn Ihr Umzug auf das Monatsende oder einen Freitag fällt. Da wir jedoch lokal in Biel verankert sind, können wir in Notfällen oder bei sehr dringenden Anliegen auch äusserst kurzfristig reagieren und stehen oft schon innerhalb von 24 Stunden zur Verfügung."
    },
    {
      "question": "Demontieren und montieren Sie meine Möbel?",
      "answer": "Ja, die fachgerechte Demontage und der sichere Aufbau von Möbeln gehören zu unseren Kernkompetenzen. Unsere Zügelhelfer sind mit dem passenden Werkzeug ausgerüstet und haben grosse Erfahrung mit allen gängigen Möbelsystemen (z. B. IKEA, Pfister, USM Haller). Bitte geben Sie uns bei der Besichtigung an, welche Möbelstücke demontiert werden müssen, damit wir genügend Zeit dafür einplanen können."
    },
    {
      "question": "Muss ich das Verpackungsmaterial selbst besorgen?",
      "answer": "Das bleibt ganz Ihnen überlassen. Wir stellen Ihnen gerne hochwertiges Umzugsmaterial wie stabile Zügelboxen, Kleiderkisten, Seidenpapier und Luftpolsterfolie zur Verfügung. Sie können diese entweder im Vorfeld bei uns beziehen und selbst packen, oder Sie buchen unseren kompletten Einpackservice, bei dem wir am Umzugstag das gesamte Material mitbringen und das Packen für Sie übernehmen."
    },
    {
      "question": "Wie lange dauert ein typischer Umzug?",
      "answer": "Ein durchschnittlicher Umzug einer 3.5- bis 4.5-Zimmer-Wohnung innerhalb der Region Seeland ist normalerweise an einem einzigen Tag (ca. 1-2 Tage Gesamtdauer bei grösseren Objekten) abgeschlossen. Wir beginnen meistens früh am Morgen, sodass Sie bereits am späten Nachmittag oder Abend im neuen Zuhause entspannen können. Die genaue Dauer hängt vom Volumen und den Laufwegen ab."
    },
    {
      "question": "Entsorgen Sie Möbel, die ich nicht mehr brauche?",
      "answer": "Ja, wir bieten am Umzugstag einen bequemen Entsorgungsservice an. Möbel, defekte Geräte oder Sperrgut, die nicht mit in die neue Wohnung sollen, nehmen wir gleich mit und entsorgen diese fachgerecht und umweltschonend bei den lokalen Recyclinghöfen in Biel. Die Entsorgungskosten werden transparent nach Aufwand und Volumen abgerechnet."
    },
    {
      "question": "Arbeiten Sie auch in den Nachbargemeinden von Biel?",
      "answer": "Absolut. Unser Einzugsgebiet beschränkt sich nicht auf das Stadtzentrum von Biel/Bienne. Wir sind täglich in den umliegenden Gemeinden wie Nidau, Lyss, Brügg, Ipsach, Aarberg und Pieterlen im Einsatz. Auch weiter entfernte Umzüge von oder in das Seeland sowie in die gesamte Schweiz führen wir problemlos durch."
    },
    {
      "question": "Wie organisiere ich Halteverbotszonen für den Umzugswagen?",
      "answer": "Das Parkieren des Zügelwagens so nah wie möglich am Eingang ist essenziell für einen effizienten Umzug. Wenn vor Ihrem alten oder neuen Wohnort in Biel keine ausreichenden Parkflächen vorhanden sind, können wir bei der örtlichen Polizei oder Gemeinde eine temporäre Halteverbotszone beantragen und die entsprechenden Verkehrsschilder aufstellen. Klären Sie dies am besten bei der Besichtigung mit uns ab."
    },
    {
      "question": "Kann ich die Endreinigung gleich mitbuchen?",
      "answer": "Ja, SwissCleanMove ist eine Full-Service-Agentur. Wir bieten neben dem Transport auch die professionelle Endreinigung mit 100% Abnahmegarantie an. Wenn Sie beide Dienstleistungen als Kombi-Paket bei uns buchen, profitieren Sie nicht nur von einem reibungslosen Ablauf durch denselben Ansprechpartner, sondern in der Regel auch von einem attraktiven Preisvorteil."
    },
    {
      "question": "Sind Ihre Mitarbeiter fest angestellt und versichert?",
      "answer": "Ja, wir legen grossen Wert auf Seriosität und Qualität. All unsere Reinigungskräfte und Zügelhelfer sind fest bei SwissCleanMove angestellt, fair entlöhnt und gegen Unfälle versichert. Wir verzichten auf anonyme Tagelöhner und setzen stattdessen auf ein eingespieltes, vertrauenswürdiges Team aus der Region."
    }
  ]
};

// Now we do exactly the same for endreinigungBiel
const oldEndreinigung = data.seoPages.endreinigungBiel;
data.seoPages.endreinigungBiel = {
  "meta": oldEndreinigung.meta,
  "badge": oldEndreinigung.badge,
  "h1": oldEndreinigung.h1,
  "heroSubtitle": oldEndreinigung.heroSubtitle,
  "ctaSoft": oldEndreinigung.ctaSoft,
  "intro": "Ein Wohnungswechsel in Biel/Bienne ist mit vielen Aufgaben verbunden – die anstrengendste davon ist meistens die abschliessende Reinigung. SwissCleanMove ist Ihr verlässlicher Partner für die professionelle Endreinigung mit 100% Abnahmegarantie. Wir sorgen dafür, dass Ihre alte Wohnung in Biel oder Umgebung makellos sauber wird und die Immobilienverwaltung die Abnahme ohne zu Zögern akzeptiert. Sollte es bei der Wohnungsübergabe dennoch zu Beanstandungen kommen, sind wir persönlich vor Ort und bessern sofort kostenlos nach – so erhalten Sie Ihre Mietkaution garantiert zurück. Mit unserer Erfahrung aus zahlreichen Endreinigungen im gesamten Seeland, fairen Pauschalpreisen ab CHF 350 und kurzen Reaktionszeiten (innerhalb von 24 Stunden verfügbar), nehmen wir Ihnen diesen Stressfaktor komplett ab. Eine typische Wohnungsreinigung dauert bei uns zwischen 4 und 8 Stunden, je nach Grösse und Verschmutzungsgrad. Verlassen Sie sich auf unsere Expertise direkt am Bielersee und widmen Sie sich ganz der Einrichtung Ihres neuen Zuhauses.",
  "sections": [
    {
      "heading": "Die beste Wahl für Ihre Umzugsreinigung in Biel/Bienne",
      "body": "Wenn es um die Wohnungsabnahme geht, kennen Schweizer Hausverwaltungen keine Kompromisse. Kalkablagerungen, übersehene Fugen oder staubige Storen können schnell dazu führen, dass die Abnahme verweigert wird und ein Teil Ihrer Kaution einbehalten wird. Genau hier kommt SwissCleanMove ins Spiel. Wir sind ein lokal verankertes Reinigungsunternehmen in Biel und wissen exakt, worauf die Verwaltungen in der Region Seeland bei der Übergabe achten. Wir arbeiten nicht mit Stundenlöhnen, bei denen die Kosten unkalkulierbar in die Höhe schnellen, sondern bieten Ihnen immer eine transparente Fixpreis-Offerte an. Unser eingespieltes Reinigungsteam rückt mit professionellen, umweltfreundlichen Reinigungsmitteln und modernen Geräten an. Wir hinterlassen Ihre Wohnung nicht nur oberflächlich sauber, sondern porentief rein. Vertrauen Sie auf einen lokalen Partner, der hält, was er verspricht."
    },
    {
      "heading": "Unsere spezialisierten Reinigungsdienste im Detail",
      "body": "Eine gründliche Endreinigung besteht aus vielen Puzzleteilen. Nachfolgend beschreiben wir Ihnen im Detail, was unsere Dienstleistungen in Biel/Bienne umfassen, an wen sie sich richten und weshalb unsere Kunden immer wieder auf uns zählen."
    },
    {
      "heading": "Küchenreinigung (Tiefenreinigung)",
      "body": "Die Küche ist bei jeder Wohnungsübergabe der absolute Prüfstein. Unsere Fachkräfte reinigen sämtliche Einbaugeräte wie Backofen, Herdplatten, Kühlschrank (inklusive Abtauen und Desinfizieren), Dampfabzug und Geschirrspüler extrem penibel. Selbst stark eingebranntes Fett und hartnäckige Kalkrückstände werden von uns rückstandslos entfernt. Die Küchenschränke und Schubladen werden innen und aussen ausgewaschen, und auch die schwer zugänglichen Stellen wie der Bereich hinter dem Kühlschrank oder über den Hängeschränken werden entstaubt. Dieser Service richtet sich an Mieter, die sicherstellen wollen, dass die Verwaltung bei der Inspektion der Küche nichts zu beanstanden hat. Kunden wählen uns für diesen Bereich, weil unsere Spezialreiniger auch hartnäckigsten Schmutz lösen, ohne die empfindlichen Oberflächen moderner Küchen zu beschädigen."
    },
    {
      "heading": "Badezimmer und Sanitäranlagen",
      "body": "Kalk, Schimmelansätze und Seifenreste sind die grössten Feinde bei der Abnahme des Badezimmers. Wir entkalken Armaturen, Duschwände, Badewannen und Lavabos mit grösster Sorgfalt. Besonderes Augenmerk legen wir auf die Fugen, die Toilette und den Abfluss, die wir hygienisch reinigen und desinfizieren. Auch Spiegel, Badezimmerschränkchen und Lüftungsgitter werden streifenfrei geputzt. Dieser Service ist entscheidend für alle, die in Regionen mit hartem Wasser (wie Teilen des Seelands) leben, wo Kalkablagerungen ein massives Problem darstellen. Unsere Kunden verlassen sich auf uns, weil wir selbst ältere Badezimmer wieder in einem strahlenden, hygienischen Zustand präsentieren können."
    },
    {
      "heading": "Fenster- und Storenreinigung",
      "body": "Strahlend saubere Fenster lassen die gesamte Wohnung heller und gepflegter wirken. Unser Team reinigt alle Fenstergläser streifenfrei, sowohl von innen als auch von aussen. Wichtiger noch: Wir reinigen die Fensterrahmen, die oft vernachlässigten Fenstersimse und die Fensterfälze, wo sich gerne Schmutz und Insekten sammeln. Die Reinigung der Rollläden, Jalousien und Sonnenstoren (Lamelle für Lamelle, inklusive Führungsschienen) ist ebenfalls Bestandteil dieses Services. Diese Dienstleistung richtet sich an Mieter von Wohnungen mit grossen Fensterfronten oder anspruchsvollen Verglasungen, etwa in modernen Lofts in Biel. Kunden schätzen unsere Technik, da wir auch hartnäckigen Strassenschmutz und Witterungsspuren effizient und schonend entfernen."
    },
    {
      "heading": "Bodenreinigung und Pflege",
      "body": "Jeder Bodenbelag verlangt eine spezifische Pflege. Ob echtes Holzparkett, Laminat, keramische Fliesen, PVC oder Teppichboden – wir wissen, wie man den jeweiligen Untergrund behandelt. Wir saugen alle Böden gründlich, entfernen Spinnweben an den Fussleisten und wischen die Flächen feucht auf. Bei Parkettböden sorgen wir für eine schonende Reinigung, bei Fliesenböden befreien wir auch die Fugen von festsitzendem Schmutz. Dieser Service richtet sich an jeden ausziehenden Mieter, da ein gepflegter Boden der erste Eindruck bei der Wohnungsbegehung ist. Wir werden oft gebucht, weil wir professionelle Maschinen und materialschonende Spezialreiniger einsetzen, die den Glanz der Böden zurückbringen."
    },
    {
      "heading": "Wand-, Decken- und Türenreinigung",
      "body": "Oft vergessen, aber bei der Abnahme sehr wichtig: Spinnweben an den Decken, staubige Lichtschalter, Steckdosen und Türrahmen. Wir entfernen Staub und leichte Verunreinigungen von den Wänden, reinigen sämtliche Innentüren inklusive Türklinken feucht ab und befreien Heizkörper von angesammeltem Staub. Einbauschränke werden komplett ausgeräumt und feucht ausgewischt. Dieser Service ist für alle Kunden wichtig, die in ihrer Wohnung gelebt haben und sicherstellen wollen, dass keine Gebrauchsspuren in Augenhöhe übersehen werden. Kunden loben uns für diesen Detailblick, der bei einer standardmässigen Reinigung oft vernachlässigt wird."
    },
    {
      "heading": "Balkon, Terrasse und Aussenbereiche",
      "body": "Ein gepflegter Aussenbereich gehört genauso zur Wohnung wie das Wohnzimmer. Wir fegen und wischen den Boden von Balkonen und Terrassen, reinigen die Geländer und entfernen grobe Verschmutzungen wie Vogelkot oder Moosansätze. Auch zugehörige Kellerabteile, Garagenboxen oder Estriche werden von uns besenrein gefegt und von Spinnweben befreit. Dieser Service richtet sich an Mieter mit Aussenbereichen oder zusätzlichen Nebenräumen. Kunden sind froh über diesen Service, da diese Bereiche oft bis zum Schluss als Zwischenlager genutzt werden und die Reinigung sonst im Stress untergeht."
    },
    {
      "heading": "So funktioniert die Wohnungsübergabe (Ratgeber)",
      "body": "Die Wohnungsabnahme ist der Moment der Wahrheit. Wir empfehlen Ihnen, bereits einige Tage vor unserem Reinigungstermin alle persönlichen Gegenstände und Möbel aus der Wohnung zu entfernen, damit wir ungehindert arbeiten können. Füllen Sie Dübellöcher in den Wänden rechtzeitig fachgerecht auf, sofern Ihr Mietvertrag dies verlangt (hier gibt es oft Missverständnisse mit der Verwaltung). Klären Sie mit Ihrem Vermieter im Vorfeld, ob spezielle Wartungsarbeiten (wie das Auswechseln von Filtern beim Dampfabzug oder das Entkalken des Boilers) von Ihnen als Mieter übernommen werden müssen. Am Tag der Abnahme ist ein Vertreter von SwissCleanMove auf Wunsch persönlich anwesend. Gemeinsam mit Ihnen und der Verwaltung gehen wir das Abnahmeprotokoll durch. Falls der Vermieter ein winziges Detail findet, das nicht perfekt ist, greift unser Mitarbeiter sofort zum Lappen und bessert nach. Sie können sich entspannt zurücklehnen und die Schlüssel übergeben."
    }
  ],
  "serviceBulletsHeading": "Unsere Qualitäts-Garantien für Ihre Endreinigung",
  "serviceBullets": [
    "Schriftliche 100% Abnahmegarantie",
    "Kostenlose Anwesenheit bei der Wohnungsübergabe",
    "Garantierte Nachbesserung bei Beanstandung (kostenlos)",
    "Transparente Pauschalpreise ohne Überraschungen",
    "Umweltfreundliche, effektive Reinigungsmittel",
    "Erfahrenes Reinigungsteam aus dem Seeland"
  ],
  "trustPoints": oldEndreinigung.trustPoints,
  "ctaMidHeading": oldEndreinigung.ctaMidHeading,
  "ctaMidBody": oldEndreinigung.ctaMidBody,
  "ctaMid": oldEndreinigung.ctaMid,
  "serviceAreaHeading": "Endreinigung im gesamten Seeland und Umgebung",
  "serviceAreaBody": "Unser Hauptsitz befindet sich in Biel/Bienne, doch unser Einsatzgebiet für professionelle Endreinigungen erstreckt sich über das gesamte Seeland. Wir sind rasch und flexibel in Gemeinden wie Nidau, Brügg, Lyss, Ipsach, Aarberg und Pieterlen vor Ort. Dank unserer lokalen Präsenz fallen für Sie keine langen Anfahrtskosten an. Wir kennen viele der lokalen Immobilienverwaltungen im Seeland persönlich und wissen genau, auf welche spezifischen Details diese bei der Wohnungsübergabe Wert legen.",
  "internalLinksHeading": oldEndreinigung.internalLinksHeading,
  "internalLinks": oldEndreinigung.internalLinks,
  "ctaStrongHeading": oldEndreinigung.ctaStrongHeading,
  "ctaStrongBody": oldEndreinigung.ctaStrongBody,
  "ctaStrong": oldEndreinigung.ctaStrong,
  "testimonial": oldEndreinigung.testimonial,
  "faqs": [
    {
      "question": "Was genau bedeutet die 100% Abnahmegarantie?",
      "answer": "Unsere 100% Abnahmegarantie bedeutet für Sie absolute Sicherheit und Stressfreiheit. Wir garantieren Ihnen vertraglich, dass Ihre Immobilie nach unserer Endreinigung von der Verwaltung oder dem Eigentümer anstandslos abgenommen wird. Sollte der Prüfer bei der Wohnungsbegehung dennoch einen Mangel feststellen (z.B. einen Wasserfleck auf einer Armatur), wird dieser von unserem anwesenden Personal sofort, unbürokratisch und völlig kostenlos nachgereinigt, bis die Abnahme unterschrieben ist."
    },
    {
      "question": "Muss ich bei der Endreinigung selbst anwesend sein?",
      "answer": "Nein, das ist nicht zwingend erforderlich. Sie können unserem Team am Morgen einfach die Schlüssel übergeben und den Tag für Ihren Umzug oder Ihre Arbeit nutzen. Wir arbeiten selbstständig und zuverlässig. Es reicht aus, wenn Sie (und idealerweise der Vertreter der Verwaltung) zur offiziellen Wohnungsabnahme wieder vor Ort sind, bei der wir dann ebenfalls anwesend sein können."
    },
    {
      "question": "Wie lange dauert die Reinigung einer typischen Wohnung in Biel?",
      "answer": "Die Dauer der Reinigung variiert je nach Grösse der Wohnung, Anzahl der Fenster und dem allgemeinen Verschmutzungsgrad. Als Richtwert können Sie für eine 3.5-Zimmer-Wohnung mit etwa 4 bis 8 Stunden rechnen. Wir schicken in der Regel ein eingespieltes Team von 2 bis 3 Personen, um die Arbeiten speditiv und gründlich abzuschliessen, sodass am Nachmittag die Übergabe stattfinden kann."
    },
    {
      "question": "Sind Fenster und Storen im Preis inbegriffen?",
      "answer": "Ja, bei unserer Pauschal-Endreinigung sind alle wesentlichen Bestandteile der Wohnung inklusive. Dazu gehören selbstverständlich auch die Fenster (innen und aussen), die Fensterrahmen, die Fenstersimse sowie die Storen (Rollläden oder Jalousien). Auch die gründliche Reinigung von Nebenräumen wie dem Keller oder dem Balkon wird im Vorfeld im Fixpreis berücksichtigt."
    },
    {
      "question": "Was passiert, wenn die Immobilienverwaltung extrem streng ist?",
      "answer": "Machen Sie sich keine Sorgen. Wir führen in Biel und im gesamten Seeland wöchentlich zahlreiche Wohnungsübergaben durch und kennen die hohen Ansprüche der lokalen Verwaltungen bestens. Unsere Teams reinigen nach einem detaillierten Branchenstandard. Sollte ein Verwalter aussergewöhnlich streng sein, greift unsere Abnahmegarantie – wir reinigen kostenlos nach, bis die Verwaltung das Protokoll unterzeichnet."
    },
    {
      "question": "Stellen Sie das gesamte Reinigungsmaterial zur Verfügung?",
      "answer": "Ja, Sie müssen sich um absolut nichts kümmern. SwissCleanMove bringt das komplette Equipment mit: professionelle Staubsauger, spezielle Entkalkungs- und Fettlösemittel, Mikrofasertücher, Leitern und alle weiteren benötigten Utensilien. Wir verwenden zudem umweltschonende Reinigungsmittel, die effektiv gegen Schmutz sind, aber die Oberflächen in Ihrer Wohnung schonen."
    },
    {
      "question": "Füllen Sie auch Bohrlöcher in den Wänden (Dübellöcher) auf?",
      "answer": "Das Auffüllen von Dübellöchern ist eine kleine handwerkliche Arbeit, die normalerweise nicht zur klassischen Grundreinigung gehört. Wenn Sie dies jedoch wünschen und uns im Voraus bei der Besichtigung darauf hinweisen, können wir diese Aufgabe nach Absprache und gegen einen kleinen Aufpreis gerne fachgerecht für Sie übernehmen, um Diskussionen mit der Verwaltung zu vermeiden."
    },
    {
      "question": "Kann ich die Endreinigung auch am Wochenende durchführen lassen?",
      "answer": "Ja, wir bieten auf Anfrage auch Termine an Samstagen an. Da viele Menschen am Wochenende umziehen, sind diese Termine sehr begehrt. Wir empfehlen Ihnen daher, uns so früh wie möglich zu kontaktieren, um Ihren Wunschtermin für die Endreinigung am Wochenende in Biel zu reservieren."
    },
    {
      "question": "Wie hoch sind die Kosten für eine Endreinigung in Biel?",
      "answer": "Unsere Preise sind fair, transparent und als Pauschale ohne versteckte Kosten kalkuliert. Eine 2.5-Zimmer-Wohnung reinigen wir ab CHF 350, eine 3.5-Zimmer-Wohnung ab CHF 490 und eine 4.5-Zimmer-Wohnung ab CHF 690. Für Einfamilienhäuser oder extrem verschmutzte Objekte erstellen wir Ihnen nach einer kostenlosen Besichtigung eine individuelle, verbindliche Offerte."
    },
    {
      "question": "Was tun Sie gegen hartnäckigen Schimmel im Badezimmer?",
      "answer": "Leichter, oberflächlicher Schimmel in den Fugen (wie er oft in unbelüfteten Badezimmern vorkommt) wird von uns mit speziellen, pilzabtötenden Reinigern behandelt und meist restlos entfernt. Sollte der Schimmel jedoch bereits tief in das Silikon oder das Mauerwerk eingedrungen sein, handelt es sich um einen Bauschaden, den wir durch Reinigung allein nicht beheben können. Wir weisen Sie und die Verwaltung in so einem Fall darauf hin."
    },
    {
      "question": "Wie kurzfristig kann ich eine Endreinigung bei SwissCleanMove buchen?",
      "answer": "Dank unserer lokalen Basis direkt in Biel/Bienne sind wir sehr flexibel. Oft können wir auch kurzfristige Anfragen innerhalb von 24 bis 48 Stunden bedienen, beispielsweise wenn Sie eine Reinigungsfirma dringend benötigen, weil ein anderer Anbieter abgesagt hat. Rufen Sie uns in dringenden Fällen am besten direkt an, damit wir die Kapazitäten prüfen können."
    },
    {
      "question": "Bieten Sie auch die Kombination von Umzug und Reinigung an?",
      "answer": "Ja! Viele unserer Kunden buchen das praktische Kombi-Angebot. Wenn Sie SwissCleanMove sowohl mit dem Umzug als auch mit der Endreinigung beauftragen, haben Sie nur einen Ansprechpartner für das gesamte Projekt. Die Terminplanung verläuft nahtlos (z.B. Umzug am Vormittag, Reinigung am Nachmittag oder am Folgetag), und wir können Ihnen für das Gesamtpaket oft einen attraktiven Rabatt anbieten."
    }
  ]
};

// Write it back to the file
fs.writeFileSync(dePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated umzugBiel and endreinigungBiel in messages/de.json');
