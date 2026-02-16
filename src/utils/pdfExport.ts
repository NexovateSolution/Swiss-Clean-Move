import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Extend jsPDF type
declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: any) => jsPDF;
    }
}

// Company information
const COMPANY_INFO = {
    name: 'SwissCleanMove',
    tagline: 'Umzug & Reinigung',
    address: 'Orpundstrasse 31',
    city: '2504 Biel/Bienne',
    phone: '+41 76 488 36 89',
    email: 'info@swisscleanmove.ch',
    website: 'swisscleanmove.ch',
    uid: 'CHE-123.456.789'
};

// Add professional header to PDF (matching FinishExpress style)
function addProfessionalHeader(doc: jsPDF) {
    // Green background box for logo and company name (left side)
    doc.setFillColor(0, 153, 51); // Green color
    doc.roundedRect(10, 10, 100, 20, 3, 3, 'F');
    
    // House icon (white)
    doc.setFillColor(255, 255, 255);
    // House roof
    doc.triangle(18, 17, 23, 12, 28, 17, 'F');
    // House body
    doc.rect(20, 17, 6, 8, 'F');
    // Door
    doc.setFillColor(0, 153, 51);
    doc.rect(22, 21, 2, 4, 'F');
    
    // Company name (white text on green)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('SwissCleanMove', 32, 18);
    
    // Tagline (white text on green)
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('REINIGUNG • UMZUG • ENTSORGUNG', 32, 26);
    
    // Company details (right side) - matching FinishExpress layout
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(9);
    const rightX = 200;
    let rightY = 12;
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('SwissCleanMove', rightX, rightY, { align: 'right' });
    rightY += 5;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(COMPANY_INFO.address, rightX, rightY, { align: 'right' });
    rightY += 4;
    doc.text(COMPANY_INFO.city, rightX, rightY, { align: 'right' });
    rightY += 5;
    doc.text(COMPANY_INFO.email, rightX, rightY, { align: 'right' });
    rightY += 4;
    doc.text(`Tel: ${COMPANY_INFO.phone}`, rightX, rightY, { align: 'right' });
    rightY += 4;
    doc.text(`UID: ${COMPANY_INFO.uid}`, rightX, rightY, { align: 'right' });
    
    // Horizontal line separator
    doc.setDrawColor(0, 153, 51);
    doc.setLineWidth(0.8);
    doc.line(10, 35, 200, 35);
    
    // Reset text color
    doc.setTextColor(0, 0, 0);
    
    return 42; // Return starting Y position for content
}

interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: string;
    createdAt: string;
}

interface QuoteSubmission {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    details: string;
    status: string;
    createdAt: string;
}

export function exportContactToPDF(contact: ContactSubmission) {
    const doc = new jsPDF();

    // Add professional header
    let yPos = addProfessionalHeader(doc);

    // Document title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 102, 204);
    doc.text('Contact Message', 14, yPos);
    doc.setTextColor(0, 0, 0);
    yPos += 12;

    // Helper function to add a section header
    const addSectionHeader = (title: string, icon: string) => {
        if (yPos > 260) {
            doc.addPage();
            yPos = 20;
        }
        
        doc.setFillColor(240, 248, 255);
        doc.roundedRect(12, yPos - 5, 186, 10, 2, 2, 'F');
        
        doc.setFillColor(0, 102, 204);
        doc.circle(17, yPos, 2.5, 'F');
        
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(icon, 17, yPos + 1, { align: 'center' });
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 102, 204);
        doc.text(title, 22, yPos + 2);
        doc.setTextColor(0, 0, 0);
        yPos += 12;
    };

    const addField = (label: string, value: any, indent: number = 14) => {
        if (!value || value === '') return;
        
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(100, 100, 100);
        doc.text(label.toUpperCase(), indent, yPos);
        yPos += 5;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        const textLines = doc.splitTextToSize(String(value), 180);
        doc.text(textLines, indent, yPos);
        yPos += 5 * textLines.length + 3;
    };

    // Contact Information Section
    addSectionHeader('Contact Information', 'i');
    addField('Name', contact.name);
    addField('Email', contact.email);
    addField('Phone', contact.phone);
    addField('Submitted', new Date(contact.createdAt).toLocaleString());
    addField('Status', contact.status);
    yPos += 3;

    // Message Section
    addSectionHeader('Message Details', '@');
    addField('Subject', contact.subject);
    addField('Message', contact.message);

    doc.save(`contact-${contact.id}.pdf`);
}

export function exportQuoteToPDF(quote: QuoteSubmission) {
    const doc = new jsPDF();

    // Add professional header
    let yPos = addProfessionalHeader(doc);

    // Document title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 102, 204);
    doc.text('Quote Request', 14, yPos);
    doc.setTextColor(0, 0, 0);
    yPos += 12;

    // Helper function to add a section header
    const addSectionHeader = (title: string, icon: string) => {
        if (yPos > 260) {
            doc.addPage();
            yPos = 20;
        }
        
        doc.setFillColor(240, 248, 255);
        doc.roundedRect(12, yPos - 5, 186, 10, 2, 2, 'F');
        
        doc.setFillColor(0, 102, 204);
        doc.circle(17, yPos, 2.5, 'F');
        
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(icon, 17, yPos + 1, { align: 'center' });
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 102, 204);
        doc.text(title, 22, yPos + 2);
        doc.setTextColor(0, 0, 0);
        yPos += 12;
    };

    const addField = (label: string, value: any, indent: number = 14) => {
        if (!value || value === '') return;
        
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(100, 100, 100);
        doc.text(label.toUpperCase(), indent, yPos);
        yPos += 5;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        const textLines = doc.splitTextToSize(String(value), 180);
        doc.text(textLines, indent, yPos);
        yPos += 5 * textLines.length + 3;
    };

    // Contact Information Section
    addSectionHeader('Contact Information', 'i');
    addField('Name', quote.name);
    addField('Email', quote.email);
    addField('Phone', quote.phone);
    addField('Submitted', new Date(quote.createdAt).toLocaleString());
    addField('Status', quote.status);
    yPos += 3;

    // Service Details Section
    addSectionHeader('Service Details', 'S');
    addField('Service Type', quote.service);

    // Parse and display details
    try {
        const details = JSON.parse(quote.details);

        addField('Address', details.address);
        addField('City', details.city);
        addField('Postal Code', details.postalCode);
        addField('Property Type', details.propertyType);
        addField('Number of Rooms', details.rooms);
        addField('Area (m²)', details.area);
        addField('Preferred Date', details.preferredDate);
        addField('Urgency', details.urgency);

        if (details.additionalServices && details.additionalServices.length > 0) {
            addField('Additional Services', details.additionalServices.join(', '));
        }

        if (details.message) {
            yPos += 3;
            addSectionHeader('Additional Notes', '!');
            addField('Message', details.message);
        }
    } catch (error) {
        console.error('Error parsing quote details:', error);
    }

    doc.save(`quote-${quote.id}.pdf`);
}

export function exportServiceFormToPDF(submission: any) {
    const doc = new jsPDF();

    // Add professional header
    let yPos = addProfessionalHeader(doc);

    // Document title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 102, 204); // Blue color
    doc.text('Service Form Submission', 14, yPos);
    doc.setTextColor(0, 0, 0); // Reset to black
    yPos += 12;

    // Helper function to add a section header
    const addSectionHeader = (title: string, icon: string) => {
        if (yPos > 260) {
            doc.addPage();
            yPos = 20;
        }
        
        // Background box for section header
        doc.setFillColor(240, 248, 255); // Light blue background
        doc.roundedRect(12, yPos - 5, 186, 10, 2, 2, 'F');
        
        // Draw icon circle
        doc.setFillColor(0, 102, 204); // Blue color
        doc.circle(17, yPos, 2.5, 'F');
        
        // Icon text (white on blue circle)
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(icon, 17, yPos + 1, { align: 'center' });
        
        // Section title
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 102, 204);
        doc.text(title, 22, yPos + 2);
        doc.setTextColor(0, 0, 0);
        yPos += 12;
    };

    // Helper function to add a field
    const addField = (label: string, value: any, indent: number = 14) => {
        if (!value || value === 'Not specified' || value === 'None specified' || value === '') return;
        
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(100, 100, 100);
        doc.text(label.toUpperCase(), indent, yPos);
        yPos += 5;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        const textLines = doc.splitTextToSize(String(value), 180);
        doc.text(textLines, indent, yPos);
        yPos += 5 * textLines.length + 3;
    };

    // Helper function to add checkbox items
    const addCheckbox = (label: string, value: any, indent: number = 14) => {
        if (value === true || value === 'And' || value === 'Yes' || value === 'yes') {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 153, 51); // Green color
            doc.text('✓', indent, yPos);
            doc.setTextColor(0, 0, 0);
            doc.text(label, indent + 5, yPos);
            yPos += 6;
        }
    };

    // Basic Information Section
    addSectionHeader('Basic Information', 'i');
    addField('Service Name', submission.serviceName);
    addField('Form Type', submission.formType);
    addField('Salutation', submission.salutation);
    addField('First Name', submission.firstName);
    addField('Last Name', submission.name);
    yPos += 3;

    // Contact Details Section
    addSectionHeader('Contact Details', '@');
    addField('Email Address', submission.emailAddress);
    addField('Telephone', submission.telephone);
    addField('Preferred Contact Method', submission.contactPreferredVia);
    yPos += 3;

    // Address Information Section
    addSectionHeader('Address Information', '#');
    addField('Street & Number', submission.streetAndNumber);
    addField('Postal Code & City', submission.postalCodeAndCity);
    if (submission.unloadingStreetAndNumber) {
        addField('Unloading Street & Number', submission.unloadingStreetAndNumber);
    }
    if (submission.unloadingPostalCodeAndCity) {
        addField('Unloading Postal Code & City', submission.unloadingPostalCodeAndCity);
    }
    yPos += 3;

    // Service Details Section
    addSectionHeader('Service Details', 'S');
    
    if (submission.formType === 'relocation') {
        addField('Moving Date', submission.movingDate);
        addField('Viewing Welcome', submission.viewingIsWelcome === 'And' ? 'Yes' : submission.viewingIsWelcome);
        addField('Number of Floors', submission.floors);
        addField('Number of Rooms', submission.numberOfRooms);
        addField('Living Space (m²)', submission.livingSpaceInM2);
        yPos += 3;
    } else if (submission.formType === 'cleaning') {
        addField('Number of Rooms', submission.numberOfRoomsApartment);
        addField('Apartment Type', submission.apartmentType);
        addField('Area (m²)', submission.areaInM2);
        addField('Awning Type', submission.awningType);
        addField('Cleaning Date', submission.cleaningAppointment);
        addField('Submission Deadline', submission.submissionDeadline);
        yPos += 3;
    } else if (submission.formType === 'disposal') {
        addField('Disposal Type', submission.disposalType);
        addField('Volume', submission.volume);
        addField('Collection Date', submission.collectionDate);
        addField('Special Items', submission.specialItems);
        yPos += 3;
    } else if (submission.formType === 'storage') {
        addField('Storage Duration', submission.storageDuration);
        addField('Storage Size', submission.storageSize);
        addField('Start Date', submission.storageStartDate);
        addField('Special Requirements', submission.specialRequirements);
        yPos += 3;
    }

    // Additional Services Section
    const hasAdditionalServices = 
        submission.pack || submission.garage || submission.screed || 
        submission.unpacking || submission.cleaning || submission.disposal ||
        submission.assembly || submission.lift || submission.heavyLoad ||
        submission.cellarCleaning || submission.garageCleaning || 
        submission.carpetShampooing || submission.conservatory;

    if (hasAdditionalServices) {
        addSectionHeader('Additional Services', '+');
        
        // Relocation services
        addCheckbox('Packing Service', submission.pack);
        addCheckbox('Garage', submission.garage);
        addCheckbox('Screed Protection', submission.screed);
        addCheckbox('Unpacking Service', submission.unpacking);
        addCheckbox('Cleaning Service', submission.cleaning);
        addCheckbox('Disposal Service', submission.disposal);
        
        // Assembly and logistics
        addField('Assembly Required', submission.assembly);
        addField('Lift Available', submission.lift);
        addField('Lift Disassembly', submission.liftDisassembly);
        addField('Path to Front Door', submission.pathToFrontDoor);
        addField('Path Distance (m)', submission.pathToFrontDoorM);
        addField('Heavy Load', submission.heavyLoad);
        
        // Cleaning services
        addCheckbox('Cellar Cleaning', submission.cellarCleaning);
        addCheckbox('Garage Cleaning', submission.garageCleaning);
        addCheckbox('Carpet Shampooing', submission.carpetShampooing);
        addCheckbox('Conservatory', submission.conservatory);
        addCheckbox('Outdoor Seating', submission.outdoorSeating);
        addCheckbox('Parquet', submission.parquet);
        addCheckbox('Stair Polish', submission.stairpolish);
        
        yPos += 3;
    }

    // Notes & Remarks Section
    if (submission.remark) {
        addSectionHeader('Notes & Remarks', '!');
        addField('Additional Remarks', submission.remark);
    }

    doc.save(`service-form-${submission.id}.pdf`);
}
