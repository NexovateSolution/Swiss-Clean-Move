import { NextIntlClientProvider } from 'next-intl'
import messages from '../../../messages/en.json'

export const dynamic = 'force-dynamic'

export default function AdminRootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <NextIntlClientProvider locale="en" messages={messages as any}>
      {children}
    </NextIntlClientProvider>
  )
}
