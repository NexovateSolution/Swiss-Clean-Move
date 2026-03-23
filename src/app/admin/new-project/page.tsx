'use client'

import { useLocale } from 'next-intl'
import AdminLayout from '@/components/admin/AdminLayout'
import ServiceFormWizard, { ServiceSlug } from '@/components/ServiceFormWizard'
import { useState } from 'react'

const SERVICES: { slug: ServiceSlug; label: string }[] = [
  { slug: 'house-cleaning', label: 'House Cleaning' },
  { slug: 'apartment-cleaning', label: 'Apartment Cleaning' },
  { slug: 'stairwell-cleaning', label: 'Stairwell Cleaning' },
  { slug: 'office-cleaning', label: 'Office Cleaning' },
  { slug: 'final-cleaning', label: 'Final Cleaning' },
  { slug: 'window-cleaning', label: 'Window Cleaning' },
  { slug: 'relocation', label: 'Relocation' },
  { slug: 'disposal', label: 'Disposal' },
  { slug: 'gastronomy-cleaning', label: 'Gastronomy Cleaning' },
  { slug: 'medical-cleaning', label: 'Medical Cleaning' },
  { slug: 'construction-cleaning', label: 'Construction Cleaning' },
  { slug: 'property-maintenance', label: 'Property Maintenance' },
  { slug: 'special-cleaning', label: 'Special Cleaning' },
  { slug: 'combo-service', label: 'Combo Service' },
  { slug: 'household-helping', label: 'Household Helping' },
]

export default function NewProjectPage() {
  const locale = useLocale()
  const [selected, setSelected] = useState<ServiceSlug | null>(null)

  return (
    <AdminLayout>
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">New Project</h1>
          <p className="text-gray-600 mt-2">
            Fill out the same form the client sees on the website
          </p>
        </div>

        {!selected ? (
          /* Service selector */
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Select a Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => setSelected(s.slug)}
                  className="p-4 border-2 border-gray-200 rounded-lg text-left hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">{s.label}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ServiceFormWizard — same form the client uses */
          <div>
            <button
              onClick={() => setSelected(null)}
              className="mb-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              ← Change service
            </button>
            <ServiceFormWizard
              service={selected}
              serviceName={SERVICES.find(s => s.slug === selected)?.label || selected}
              locale={locale}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
