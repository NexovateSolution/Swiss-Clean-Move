const fs = require('fs');
const path = require('path');

const locales = ['en', 'de', 'fr', 'nl'];

const newSeoData = {
    // 1) HOME - /
    home: {
        metadata: {
            title: "Moving Company Biel, Bern & Zurich | End-of-Lease Cleaning Switzerland – SwissCleanMove",
            description: "SwissCleanMove is your professional moving and cleaning company in Biel/Bienne, Bern, Zurich and across Switzerland. Moving services, end-of-lease cleaning with guarantee, maintenance cleaning, facility service, gastronomy cleaning, construction cleaning and clearance. Request your free quote within 24 hours."
        },
        h1: "Professional Moving & Cleaning Company in Switzerland – Biel, Bern & Zurich",
        seoText: "SwissCleanMove is your professional moving company in Biel/Bienne (Canton of Bern) and your reliable relocation partner in Bern and Zurich – operating throughout Switzerland. We organize private moves, corporate relocations, office moves and furniture transport, including packing services, dismantling and assembly, and punctual execution according to Swiss quality standards. For a stress-free apartment handover, we provide end-of-lease cleaning with a 100% handover guarantee. We thoroughly clean kitchens, bathrooms, windows, floors, doors and all required areas following strict quality guidelines. For companies, property managers and businesses, we offer maintenance cleaning, office cleaning, stairwell cleaning and commercial cleaning – reliable, discreet and professionally managed. Additionally, we provide full facility service and property maintenance (regular inspections, minor repairs, winter service, green area maintenance), professional gastronomy cleaning for restaurants, hotels and commercial kitchens, construction cleaning (rough, detailed and final cleaning), as well as clearance and disposal services with environmentally responsible waste separation. SwissCleanMove stands for clear processes, transparent quotations, 24-hour response time and visible results – in Biel, Bern, Zurich, Basel, Solothurn, Aargau, Neuchâtel, Fribourg, Jura, Lucerne and across Switzerland."
    },
    // 2) ABOUT US - /about
    about: {
        metadata: {
            title: "About SwissCleanMove | Moving & Cleaning Company Switzerland",
            description: "SwissCleanMove represents Swiss quality in moving services, end-of-lease cleaning with guarantee, maintenance cleaning, gastronomy cleaning and facility service – active in Biel, Bern, Zurich and across Switzerland."
        },
        h1: "About SwissCleanMove – Swiss Quality & Reliability",
        seoText: "SwissCleanMove is a professional Swiss company specializing in moving services, professional cleaning and facility management. We support private clients, companies, property managers and gastronomy businesses with structured processes and high-quality standards. Our strength lies in combining moving services, end-of-lease cleaning with guarantee, maintenance cleaning, gastronomy cleaning and facility service – all from one trusted partner. Every project is carried out with precision, modern equipment and trained staff to ensure smooth execution and reliable results. SwissCleanMove stands for transparency, fast communication, professional service and Swiss quality standards – in Biel/Bienne, Bern, Zurich and across Switzerland."
    },
    // 3) SERVICES - /services
    services: {
        metadata: {
            title: "Services | Moving, End-of-Lease Cleaning & Facility Service – SwissCleanMove",
            description: "All services by SwissCleanMove: Private & corporate moving, end-of-lease cleaning with guarantee, maintenance cleaning, office cleaning, facility service, gastronomy cleaning, construction cleaning and clearance – Switzerland-wide."
        },
        h1: "Our Services – Complete Professional Solutions in Switzerland",
        seoText: "SwissCleanMove provides professional moving and cleaning services throughout Switzerland. We plan and execute private and corporate relocations, including secure furniture transport and structured organization. For property handovers, we offer end-of-lease cleaning with a full guarantee. We also provide regular maintenance cleaning, office cleaning and facility services for businesses and property managers. Our portfolio is completed by gastronomy cleaning, construction cleaning and professional clearance services – ensuring all services are delivered with Swiss precision and reliability."
    },
    // 4) SERVICE AREAS - /regions
    regions: {
        metadata: {
            title: "Service Areas | Moving & Cleaning Services in Switzerland – SwissCleanMove",
            description: "SwissCleanMove operates across Switzerland: Biel, Bern, Zurich, Basel, Solothurn, Aargau, Neuchâtel, Fribourg, Jura and more."
        },
        h1: "Our Service Areas Across Switzerland"
    },
    // 5) PRICES - /pricing
    pricing: {
        metadata: {
            title: "Prices | Moving & End-of-Lease Cleaning Switzerland – SwissCleanMove",
            description: "Transparent pricing for moving, end-of-lease cleaning, maintenance cleaning and facility services. Free and non-binding quotation."
        },
        h1: "Prices & Estimates – Transparent and Fair",
        seoText: "The cost of moving and end-of-lease cleaning depends on property size, distance, floor level, elevator availability and preferred date. Maintenance cleaning, gastronomy cleaning and facility services are calculated individually based on scope and property requirements. SwissCleanMove provides a free and transparent quotation without hidden costs – for private relocations, corporate moves, cleaning services and clearance across Switzerland."
    },
    // 6) FAQ - /faq
    faq: {
        metadata: {
            title: "FAQ | Moving & Cleaning Services – SwissCleanMove Switzerland",
            description: "Frequently asked questions about moving services, end-of-lease cleaning, maintenance cleaning, facility service and pricing."
        },
        h1: "FAQ – Frequently Asked Questions"
    },
    // 7) FREE QUOTE - /free-offer
    freeQuote: {
        metadata: {
            title: "Free Quote | Moving & Cleaning Switzerland – SwissCleanMove",
            description: "Request your free quote for moving, end-of-lease cleaning, maintenance cleaning or facility service. Fast response within 24 hours."
        },
        h1: "Request a Free Quote – Fast & Non-Binding"
    },
    // 8) CONTACT - /contact
    contact: {
        metadata: {
            title: "Contact | Moving & Cleaning Company Switzerland – SwissCleanMove",
            description: "Contact SwissCleanMove for professional moving and cleaning services across Switzerland."
        },
        h1: "Contact & Consultation"
    },
    // 9) GALLERY - /gallery
    gallery: {
        metadata: {
            title: "Gallery | Moving & Cleaning Projects – SwissCleanMove",
            description: "Explore our moving projects, end-of-lease cleaning, maintenance cleaning, gastronomy cleaning and construction cleaning results across Switzerland."
        },
        h1: "Gallery – Our Work & Quality Standards",
        seoText: "Explore examples of our professional moving services, detailed end-of-lease cleaning with guarantee, structured maintenance cleaning, hygienic gastronomy cleaning and precise construction cleaning. SwissCleanMove represents Swiss quality, reliability and visible results in Biel, Bern, Zurich and throughout Switzerland."
    }
};

locales.forEach(locale => {
    const filePath = path.join(__dirname, 'messages', `${locale}.json`);
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf8');
    let data;
    try {
        data = JSON.parse(content);
    } catch (e) {
        console.error(`Error parsing ${filePath}`);
        return;
    }

    // Inject seo metadata node
    data.seo = {
        home: newSeoData.home.metadata,
        about: newSeoData.about.metadata,
        services: newSeoData.services.metadata,
        regions: newSeoData.regions.metadata,
        pricing: newSeoData.pricing.metadata,
        faq: newSeoData.faq.metadata,
        freeQuote: newSeoData.freeQuote.metadata,
        contact: newSeoData.contact.metadata,
        gallery: newSeoData.gallery.metadata
    };

    // Inject H1s and Texts into their respective page categories if they exist

    // Home
    if (data.home && data.home.hero) data.home.hero.title = newSeoData.home.h1;
    if (data.home) data.home.seoText = newSeoData.home.seoText;

    // About
    if (data.aboutPage && data.aboutPage.hero) data.aboutPage.hero.title = newSeoData.about.h1;
    if (data.aboutPage) data.aboutPage.seoText = newSeoData.about.seoText;

    // Services Page
    if (data.servicesPages && data.servicesPages.common) {
        data.servicesPages.common.title = newSeoData.services.h1;
    } else if (!data.servicesPages) {
        data.servicesPages = { common: { title: newSeoData.services.h1 } };
    } else {
        data.servicesPages.common = { ...data.servicesPages.common, title: newSeoData.services.h1 };
    }
    if (data.servicesPages) data.servicesPages.seoText = newSeoData.services.seoText;

    // Regions
    if (data.regions && data.regions.hero) data.regions.hero.title = newSeoData.regions.h1;

    // Pricing
    if (data.pricing && data.pricing.hero) data.pricing.hero.title = newSeoData.pricing.h1;
    if (data.pricing) data.pricing.seoText = newSeoData.pricing.seoText;

    // FAQ
    if (data.faq && data.faq.hero) data.faq.hero.title = newSeoData.faq.h1;

    // Free Quote (usually freeOffer)
    if (data.freeOffer && data.freeOffer.hero) data.freeOffer.hero.title = newSeoData.freeQuote.h1;

    // Contact
    if (data.contact && data.contact.hero) data.contact.hero.title = newSeoData.contact.h1;

    // Gallery
    if (data.galleryPage) {
        data.galleryPage.title = newSeoData.gallery.h1;
        data.galleryPage.seoText = newSeoData.gallery.seoText;
    } else {
        data.galleryPage = { title: newSeoData.gallery.h1, description: newSeoData.gallery.seoText, seoText: newSeoData.gallery.seoText };
    }

    // Convert updated JSON object back to a string and write it over the content
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated SEO metadata in ${locale}.json`);
});
