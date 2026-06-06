const fs = require('fs');
let sendContent = fs.readFileSync('src/app/api/admin/send-invoice/route.ts', 'utf-8');

const replacement = `                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        })

        // Email subjects and messages
        const subjects: any = {
            en: \`Invoice - SwissCleanMove - \${client.firstName} \${client.lastName}\`,
            de: \`Rechnung - SwissCleanMove - \${client.firstName} \${client.lastName}\`,
            fr: \`Facture - SwissCleanMove - \${client.firstName} \${client.lastName}\`
        }

        const messages: any = {
            en: \`Dear \${client.firstName} \${client.lastName},\\n\\nPlease find attached your invoice from SwissCleanMove.\\n\\nThank you for your business!\\n\\nBest regards,\\nSwissCleanMove Team\`,
            de: \`Sehr geehrte/r \${client.firstName} \${client.lastName},\\n\\nAnbei finden Sie Ihre Rechnung von SwissCleanMove.\\n\\nVielen Dank für Ihr Vertrauen!\\n\\nMit freundlichen Grüßen,\\nSwissCleanMove Team\`,
            fr: \`Cher/Chère \${client.firstName} \${client.lastName},\\n\\nVeuillez trouver ci-joint votre facture de SwissCleanMove.\\n\\nMerci pour votre confiance!\\n\\nCordialement,\\nÉquipe SwissCleanMove\`
        }

        // Send email
        await transporter.sendMail({
            from: \`"SwissCleanMove" <\${process.env.GMAIL_USER}>\`,
            to: client.email,
            subject: subjects[language] || subjects.en,
            text: messages[language] || messages.en,
            html: \`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://swisscleanmove.ch/images/logo.png" alt="SwissCleanMove" style="height: 100px; width: auto;">
          </div>
          <h2 style="color: #555;">Rechnung / Invoice</h2>
          <p>\${(messages[language] || messages.en).replace(/\\n/g, '<br>')}</p>
          <div style="margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 20px; font-size: 12px; color: #666;">
            <strong>SwissCleanMove</strong><br>
            Orpundstrasse 31, 2504 Biel/Bienne<br>
            info@swisscleanmove.ch
          </div>
        </div>
      \`,
            attachments: [
                {
                    filename: pdfFilename,
                    content: invoicePdf,
                    contentType: 'application/pdf'
                }
            ]
        })

        return NextResponse.json({
            success: true,
            message: 'Invoice sent successfully'
        })
    } catch (error: any) {
        console.error('Error sending invoice:', error)
        return NextResponse.json({
            error: 'Failed to send invoice',
            details: error.message
        }, { status: 500 })
    }
}
`;

// Replace from 'auth: {' until 'async function renderPdfFromHtml'
sendContent = sendContent.replace(/auth: \{\s*\}\s*\}/, 'auth: {\n' + replacement);

fs.writeFileSync('src/app/api/admin/send-invoice/route.ts', sendContent);
console.log('Restored email code');
