import { NextIntlClientProvider } from 'next-intl'
import messages from '../../../messages/en.json'
import { Toaster } from 'react-hot-toast'

export const dynamic = 'force-dynamic'

export default function AdminRootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <NextIntlClientProvider locale="en" messages={messages as any}>
      {children}
      <Toaster position="top-right" />
    </NextIntlClientProvider>
  )
}

// force refresh

// force refresh fix

// force refresh arrays
