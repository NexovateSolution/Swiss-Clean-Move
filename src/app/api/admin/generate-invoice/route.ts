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

            customer = {
                ...subData,
                ...(subData.data || {}),
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email || '',
                phone: client.phone || '',
                streetAndNumber: client.address || '',
                postalCodeAndCity: `${client.postalCode || ''} ${client.location || ''}`.trim(),
                cleaningAreaInM2: client.squareMeters,
                cleaningApartmentType: client.buildingType,
                cleaningTypes: client.serviceType,
                cleaningAppointment: client.fromDate ? new Date(client.fromDate).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '',
                numberOfRooms: client.numberOfRooms,
                elevator: client.elevator,
                floor: client.floor,
                locale: language,
            };

            quoteRes = subData.quoteResult;
            if (!quoteRes || !quoteRes.lineItems) {
               let fallbackId = client.serviceType || 'Reinigung';
               if (client.serviceType === 'Household Helping' && subData.supportType) {
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

            customer = {
                ...submission,
                ...subData,
                ...(subData.data || {}),
                firstName: submission.firstName,
                lastName: submission.name,
                email: submission.emailAddress || '',
                phone: submission.telephone || '',
                streetAndNumber: submission.streetAndNumber || '',
                postalCodeAndCity: submission.postalCodeAndCity || '',
                cleaningTypes: submission.serviceName,
                locale: language,
            };

            quoteRes = subData.quoteResult;
            if (!quoteRes || !quoteRes.lineItems) {
               quoteRes = {
                  totalEstimatedPrice: submission.estimatedPrice || subData.estimatedPrice || 0,
                  isFallback: false,
                  quoteNumber: 'Q-000',
                  lineItems: Array.isArray(subData.lineItems) ? subData.lineItems : [
                     { id: submission.serviceName || 'Reinigung', price: submission.estimatedPrice || subData.estimatedPrice || 0 }
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
