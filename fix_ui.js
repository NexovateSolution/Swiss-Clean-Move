const fs = require('fs');
const path = require('path');

// Part 1: Fix CTA color
const ctaOldClasses = 'bg-gradient-to-br from-blue-400/80 via-blue-500/70 to-blue-600/80 text-white';
const ctaNewClasses = 'bg-swiss-section text-swiss-text border-y border-swiss-border';

const ctaFiles = [
    'src/app/[locale]/page.tsx',
    'src/app/[locale]/services/page.tsx',
    'src/app/[locale]/about/page.tsx',
    'src/app/[locale]/gallery/page.tsx'
];

ctaFiles.forEach(file => {
    let filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // General section replacement
        content = content.replace(ctaOldClasses, ctaNewClasses);
        
        // In gallery it's slightly different
        content = content.replace('bg-gradient-to-br from-blue-400/80 via-blue-500/70 to-blue-600/80 pt-32 pb-16 text-center text-white', 
            'bg-swiss-section text-swiss-text border-y border-swiss-border pt-32 pb-16 text-center');

        // Text color fixes for the CTA blocks
        if (file !== 'src/app/[locale]/gallery/page.tsx') {
            content = content.replace(/text-blue-100/g, 'text-swiss-body');
            content = content.replace(/text-white\/80/g, 'text-swiss-body');
            
            content = content.replace(/bg-white\/10 backdrop-blur-sm border border-white\/20/g, 'bg-swiss-softRed border border-swiss-border text-swiss-text');
            content = content.replace(/text-yellow-400/g, 'text-swiss-red');
            
            // Buttons inside CTA
            content = content.replace(/bg-white text-swiss-red font-semibold py-3\.5 px-6 rounded-xl transition-all duration-150 shadow-soft hover:shadow-soft/g, 'btn-primary px-8 py-4');
            content = content.replace(/bg-transparent hover:bg-white\/10 text-white font-semibold py-3\.5 px-6 rounded-xl transition-all duration-150 border border-white\/40/g, 'btn-secondary px-8 py-4');
            content = content.replace(/flex items-center justify-center space-x-2 bg-transparent hover:bg-white\/10 text-white font-semibold py-3\.5 px-6 rounded-xl transition-all duration-150 border border-white\/40/g, 'btn-secondary flex items-center justify-center space-x-2 px-8 py-4');
                
            // CheckCircle texts
            content = content.replace(/<CheckCircle className="w-5 h-5 text-white" \/>/g, '<CheckCircle className="w-5 h-5 text-swiss-red" />');
        }

        fs.writeFileSync(filePath, content, 'utf8');
    }
});

// Part 2: Fix Regions Page
const regionsPath = path.join(__dirname, 'src/app/[locale]/regions/page.tsx');
if (fs.existsSync(regionsPath)) {
    let regionsContent = fs.readFileSync(regionsPath, 'utf8');

    // Replace customRegions definition
    const newCustomRegions = `  const customRegions = [
    {
      id: 'biel',
      name: 'Biel / Bienne',
      keywords: 'Umzug Biel | Umzugsfirma Biel | Umzugsreinigung Biel mit Abnahmegarantie',
      desc: locale === 'en' ? 'Professional moves and cleaning in Biel and Seeland. Reliable, fast, and local.' : locale === 'fr' ? 'Déménagements et nettoyages professionnels à Bienne et dans le Seeland. Fiable, rapide et local.' : 'Professionelle Umzüge und Reinigungen in Biel und Seeland. Zuverlässig, schnell und lokal.',
      link: \`/\${locale}/umzug-biel\`
    },
    {
      id: 'seeland',
      name: 'Seeland (Nidau, Lyss, Aarberg)',
      keywords: 'Umzug Seeland | Zügelfirma Seeland | Endreinigung Seeland',
      desc: locale === 'en' ? 'We cover the entire Seeland region with our relocation and cleaning teams. Ready for action in 24h.' : locale === 'fr' ? 'Nous couvrons toute la région du Seeland avec nos équipes de déménagement et de nettoyage. Prêts à intervenir en 24h.' : 'Wir decken das gesamte Seeland mit unseren Zügel- und Reinigungsteams ab. Einsatzbereit in 24h.',
      link: \`/\${locale}/umzug-nidau\`
    },
    {
      id: 'bern',
      name: 'Kanton Bern',
      keywords: 'Umzug Bern | Reinigungsfirma Bern | Wohnungsreinigung Bern',
      desc: locale === 'en' ? 'Your partner for moves across the entire canton of Bern. Fixed prices and transport insurance included.' : locale === 'fr' ? 'Votre partenaire pour les déménagements dans tout le canton de Berne. Prix fixes et assurance transport inclus.' : 'Ihr Partner für Umzüge im gesamten Kanton Bern. Fixpreise und Transportversicherung inklusive.',
      link: \`/\${locale}/free-offer\`
    },
    {
      id: 'zurich',
      name: 'Zürich & Aargau',
      keywords: 'Umzugsfirma Zürich | Umzug Aargau | Zügelunternehmen',
      desc: locale === 'en' ? 'Long-distance moves to and from Zurich. We organize your move smoothly and safely.' : locale === 'fr' ? 'Déménagements longue distance de et vers Zurich. Nous organisons votre déménagement en douceur et en toute sécurité.' : 'Fernumzüge von und nach Zürich. Wir organisieren Ihren Umzug reibungslos und sicher.',
      link: \`/\${locale}/free-offer\`
    },
    {
      id: 'solothurn',
      name: 'Solothurn',
      keywords: 'Umzug Solothurn | Reinigungsfirma Solothurn | Zügeln',
      desc: locale === 'en' ? 'Professional moving and cleaning services in Solothurn.' : locale === 'fr' ? 'Services professionnels de déménagement et de nettoyage à Soleure.' : 'Professionelle Umzugs- und Reinigungsdienste in Solothurn.',
      link: \`/\${locale}/free-offer\`
    },
    {
      id: 'neuchatel',
      name: 'Neuchâtel',
      keywords: 'Déménagement Neuchâtel | Nettoyage Neuchâtel',
      desc: locale === 'en' ? 'Reliable relocation services in the Neuchâtel region.' : locale === 'fr' ? 'Services de déménagement fiables dans la région de Neuchâtel.' : 'Zuverlässige Umzugsdienste in der Region Neuenburg.',
      link: \`/\${locale}/free-offer\`
    },
    {
      id: 'fribourg',
      name: 'Fribourg',
      keywords: 'Umzug Fribourg | Déménagement Fribourg | Nettoyage',
      desc: locale === 'en' ? 'Your partner for moves and cleaning in Fribourg.' : locale === 'fr' ? 'Votre partenaire pour les déménagements et le nettoyage à Fribourg.' : 'Ihr Partner für Umzüge und Reinigungen in Freiburg.',
      link: \`/\${locale}/free-offer\`
    },
    {
      id: 'basel',
      name: 'Basel',
      keywords: 'Umzug Basel | Reinigungsfirma Basel | Zügelfirma',
      desc: locale === 'en' ? 'Stress-free moving and cleaning in the Basel area.' : locale === 'fr' ? 'Déménagement et nettoyage sans stress dans la région de Bâle.' : 'Stressfreier Umzug und Reinigung im Raum Basel.',
      link: \`/\${locale}/free-offer\`
    },
    {
      id: 'ganze-schweiz',
      name: 'Ganze Schweiz',
      keywords: 'Umzugsfirma Schweiz | Schweizweit umziehen | Reinigung',
      desc: locale === 'en' ? 'We operate throughout Switzerland for your moving and cleaning needs.' : locale === 'fr' ? 'Nous opérons dans toute la Suisse pour vos besoins de déménagement et de nettoyage.' : 'Wir sind schweizweit für Ihre Umzugs- und Reinigungsbedürfnisse im Einsatz.',
      link: \`/\${locale}/free-offer\`
    }
  ];`;

    regionsContent = regionsContent.replace(/const customRegions = \[\s*\{[\s\S]*?\}\s*\];/m, newCustomRegions);

    // Also remove the "Switzerland-wide Einsatzgebiete" section completely 
    // It looks like:
    // {/* Switzerland-wide Einsatzgebiete */}
    // <section className="section-padding">
    // ...
    // </section>
    
    const globalSectionRegex = /\{\/\* Switzerland-wide Einsatzgebiete \*\/\}\s*<section className="section-padding">[\s\S]*?<\/section>/g;
    regionsContent = regionsContent.replace(globalSectionRegex, '');

    fs.writeFileSync(regionsPath, regionsContent, 'utf8');
}

console.log("UI updates applied successfully.");
