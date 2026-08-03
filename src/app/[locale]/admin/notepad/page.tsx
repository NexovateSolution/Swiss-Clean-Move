import LetterheadNotepad from '@/components/admin/LetterheadNotepad'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'admin' })
  
  return {
    title: `Notepad | ${t('dashboard')} - SwissCleanMove`,
    description: 'SwissCleanMove Admin Notepad',
  }
}

export default function AdminNotepadPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <LetterheadNotepad />
    </div>
  )
}
