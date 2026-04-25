'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import ServiceFormWizard, { ServiceSlug } from '@/components/ServiceFormWizard'
import { useState, useEffect } from 'react'

const SERVICES: { slug: ServiceSlug; tKey: string }[] = [
  { slug: 'house-cleaning', tKey: 'houseCleaning' },
  { slug: 'window-cleaning', tKey: 'windowCleaning' },
  { slug: 'relocation', tKey: 'relocation' },
  { slug: 'disposal', tKey: 'disposal' },
  { slug: 'household-helping', tKey: 'householdHelping' },
  { slug: 'facility-services', tKey: 'facilityServices' },
]

export default function NewProjectPage() {
  const t = useTranslations('admin.newProjectPage')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  // Persist selected service in sessionStorage so language changes don't reset it
  const [selected, setSelected] = useState<ServiceSlug | null>(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('admin-new-project-service')
    if (saved) {
      setSelected(saved as ServiceSlug)
    }
  }, [])

  const handleSelect = (slug: ServiceSlug) => {
    setSelected(slug)
    sessionStorage.setItem('admin-new-project-service', slug)
  }

  const handleClear = () => {
    setSelected(null)
    sessionStorage.removeItem('admin-new-project-service')
  }

  // Redirect to locale-prefixed path if not already there
  useEffect(() => {
    if (pathname === '/admin/new-project') {
      router.replace(`/${locale}/admin/new-project`)
    }
  }, [pathname, locale, router])

  return (
    <AdminLayout>
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('subtitle')}
          </p>
        </div>

        {!selected ? (
          /* Service selector */
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">{t('selectService')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => handleSelect(s.slug)}
                  className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg text-left hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-gray-100">{t(`services.${s.tKey}` as any)}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ServiceFormWizard ΓÇö same form the client uses */
          <div>
            <button
              onClick={handleClear}
              className="mb-4 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center gap-1"
            >
              ΓåÉ {t('changeService')}
            </button>
            <ServiceFormWizard
              service={selected}
              serviceName={
                SERVICES.find(s => s.slug === selected)
                  ? t(`services.${SERVICES.find(s => s.slug === selected)!.tKey}` as any)
                  : selected
              }
              locale={locale}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
