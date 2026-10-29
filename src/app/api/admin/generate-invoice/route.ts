import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/db'
import { generateQuoteHtml } from '@/utils/pdfGenerator'

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('auth-token')?.value
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { clientId, submissionId, language = 'de', format = 'html' } = await request.json()
        const targetId = clientId || submissionId

        if (!targetId) {
            return NextResponse.json({ error: 'Client or Submission ID is required' }, { status: 400 })
        }

        // Fetch client data
        let client = await prisma.client.findUnique({
            where: { id: targetId }
        })

        let clientInfo: { id: string; firstName: string; lastName: string; email: string };
        let subData: any = {};
        let customer: any = {};
        let quoteRes: any = null;

        if (client) {
            clientInfo = {
                id: client.id,
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email || ''
            };

            // Use client.data if available, otherwise fallback to flat Client properties
            if (client.data && typeof client.data === 'object') {
               subData = client.data;
            }

            const cleanServiceType = (client.serviceType ? client.serviceType.trim() : '');
            const isPureCleaning = Boolean(
                cleanServiceType &&
                (cleanServiceType.toLowerCase().includes('reinigung') || cleanServiceType.toLowerCase().includes('clean')) &&
                !cleanServiceType.toLowerCase().includes('umzug') &&
                !cleanServiceType.toLowerCase().includes('transport') &&
                !cleanServiceType.toLowerCase().includes('entsorgung') &&
                !cleanServiceType.toLowerCase().includes('disposal')
            );

            customer = {
                ...subData,
                ...(subData.data || {}),
                serviceType: cleanServiceType,
                serviceName: cleanServiceType,
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email || '',
                phone: client.phone || '',
                streetAndNumber: client.address || '',
                postalCodeAndCity: `${client.postalCode || ''} ${client.location || ''}`.trim(),
                propertyType: client.buildingType,
                apartmentType: client.buildingType,
                cleaningAreaInM2: client.squareMeters,
                areaInM2: client.squareMeters,
                livingSpaceInM2: client.squareMeters,
                cleaningApartmentType: client.buildingType,
                cleaningTypes: isPureCleaning ? cleanServiceType : (subData.cleaningTypes || undefined),
                cleaningAppointment: client.fromDate ? new Date(client.fromDate).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '',
                movingDate: client.fromDate ? new Date(client.fromDate).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '',
                numberOfRooms: client.numberOfRooms,
                elevator: client.elevator,
                floor: client.floor,
                locale: language,
            };

            quoteRes = subData.quoteResult;
            if (!quoteRes || !quoteRes.lineItems) {
               let fallbackId = cleanServiceType || 'Service';
               if (cleanServiceType === 'Household Helping' && subData.supportType) {
                  fallbackId = subData.supportType;
               }
               quoteRes = {
                  totalEstimatedPrice: client.totalPrice || 0,
                  isFallback: false,
                  lineItems: [
                     { id: fallbackId, price: client.totalPrice || 0 }
                  ]
               };
            }
        } else {
            // Check in ServiceFormSubmission table
            const submission = await prisma.serviceFormSubmission.findUnique({
                where: { id: targetId }
            });

            if (!submission) {
                return NextResponse.json({ error: 'Client or submission not found' }, { status: 404 })
            }

            clientInfo = {
               id: submission.id,
               firstName: submission.firstName,
               lastName: submission.name,
               email: submission.emailAddress || ''
            };

            if (submission.data && typeof submission.data === 'object') {
               subData = submission.data;
            }

            const cleanSubService = (submission.serviceName ? submission.serviceName.trim() : '');
            const isSubCleaning = Boolean(
                cleanSubService &&
                (cleanSubService.toLowerCase().includes('reinigung') || cleanSubService.toLowerCase().includes('clean')) &&
                !cleanSubService.toLowerCase().includes('umzug') &&
                !cleanSubService.toLowerCase().includes('transport') &&
                !cleanSubService.toLowerCase().includes('entsorgung') &&
                !cleanSubService.toLowerCase().includes('disposal')
            );

            customer = {
                ...submission,
                ...subData,
                ...(subData.data || {}),
                serviceType: cleanSubService,
                serviceName: cleanSubService,
                firstName: submission.firstName,
                lastName: submission.name,
                email: submission.emailAddress || '',
                phone: submission.telephone || '',
                streetAndNumber: submission.streetAndNumber || '',
                postalCodeAndCity: submission.postalCodeAndCity || '',
                cleaningTypes: isSubCleaning ? cleanSubService : (subData.cleaningTypes || undefined),
                locale: language,
            };

            quoteRes = subData.quoteResult;
            if (!quoteRes || !quoteRes.lineItems) {
               quoteRes = {
                  totalEstimatedPrice: submission.estimatedPrice || subData.estimatedPrice || 0,
                  isFallback: false,
                  quoteNumber: 'Q-000',
                  lineItems: Array.isArray(subData.lineItems) ? subData.lineItems : [
                     { id: cleanSubService || 'Service', price: submission.estimatedPrice || subData.estimatedPrice || 0 }
                  ]
               };
            }
        }

        if (format === 'pdf') {
            console.log(`Generating PDF for client ${targetId}...`);
            const { generateQuotePdf } = await import('@/utils/pdfGenerator');
            try {
                const pdfBuffer = await generateQuotePdf(quoteRes, customer, 'contract');
                console.log(`PDF generated successfully, size: ${pdfBuffer.length} bytes`);
                return new NextResponse(new Uint8Array(pdfBuffer), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/pdf',
                        'Content-Disposition': `attachment; filename="invoice-${clientInfo.firstName}-${clientInfo.lastName}.pdf"`
                    }
                });
            } catch (err: any) {
                console.error(`Error generating PDF for ${targetId}:`, err);
                return NextResponse.json({ error: 'Failed to generate PDF', details: err?.message || String(err) }, { status: 500 });
            }
        }

        const html = generateQuoteHtml(quoteRes, customer, 'contract');

        return new NextResponse(html, {
            headers: {
                'Content-Type': 'text/html',
                'Content-Disposition': `inline; filename="invoice-${clientInfo.firstName}-${clientInfo.lastName}.html"`
            }
        })
    } catch (error: any) {
        console.error('Error generating invoice:', error)
        return NextResponse.json({ error: 'Failed to generate invoice', details: error?.message || String(error) }, { status: 500 })
    }
}
