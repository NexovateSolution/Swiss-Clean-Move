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

        const { clientId, language = 'de' } = await request.json()

        if (!clientId) {
            return NextResponse.json({ error: 'Client ID is required' }, { status: 400 })
        }

        // Fetch client data
        const client = await prisma.client.findUnique({
            where: { id: clientId }
        })

        if (!client) {
            return NextResponse.json({ error: 'Client not found' }, { status: 404 })
        }
        
        // Use client.data if available, otherwise fallback to flat Client properties
        let subData: any = {};
        if (client.data && typeof client.data === 'object') {
           subData = client.data;
        }

        const customer = {
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
            locale: language,
            ...subData,
            ...(subData.data || {})
        };

        let quoteRes = subData.quoteResult;
        if (!quoteRes || !quoteRes.lineItems) {
           quoteRes = {
              totalEstimatedPrice: client.totalPrice || 0,
              isFallback: false,
              lineItems: [
                 { id: client.serviceType || 'Reinigung', price: client.totalPrice || 0 }
              ]
           };
        }

        const html = generateQuoteHtml(quoteRes, customer, 'contract');

        return new NextResponse(html, {
            headers: {
                'Content-Type': 'text/html',
                'Content-Disposition': `inline; filename="invoice-${client.firstName}-${client.lastName}.html"`
            }
        })
    } catch (error) {
        console.error('Error generating invoice:', error)
        return NextResponse.json({ error: 'Failed to generate invoice' }, { status: 500 })
    }
}
