'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'

interface Client {
  id?: string
  firstName: string
  lastName: string
  email?: string
  phone: string
  address: string
  postalCode: string
  location: string
  squareMeters: number
  serviceType: string
  buildingType: string
  fromDate: string
  untilDate: string
  totalPrice: number
  paidAmount: number
  balance: number
  status: string
}

interface ClientModalProps {
  isOpen: boolean
  onClose: () => void
  client?: Client
  onSuccess: () => void
}

export default function ClientModal({ isOpen, onClose, client, onSuccess }: ClientModalProps) {
  const t = useTranslations('admin.clients.modal')
  const tServices = useTranslations('admin.clients.services')
  const tBuilding = useTranslations('admin.newProject.buildingTypes')
  const [loading, setLoading] = useState(false)
  const isEdit = !!client

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<Client>()

  const totalPrice = watch('totalPrice') || 0
  const paidAmount = watch('paidAmount') || 0

  useEffect(() => {
    if (client) {
      // Complete mapping to catch German/French DB values and map back to English
      const serviceMap: Record<string, string[]> = {
        'House Cleaning': ['house cleaning', 'hausreinigung', 'nettoyage de maison'],
        'Apartment cleaning': ['apartment cleaning', 'wohnungsreinigung', "nettoyage d'appartement"],
        'Stairwell Cleaning': ['stairwell cleaning', 'treppenhausreinigung', "nettoyage de cage d'escalier"],
        'Office Cleaning': ['office cleaning', 'büroreinigung', 'nettoyage de bureau'],
        'Final Cleaning': ['final cleaning', 'endreinigung / umzugsreinigung', 'nettoyage de fin de bail', 'endreinigung', 'umzugsreinigung'],
        'Window Cleaning': ['window cleaning', 'fensterreinigung', 'nettoyage de vitres'],
        'Relocation': ['relocation', 'umzug', 'déménagement'],
        'Combo Service': ['combo service', 'kombi-angebot', 'offre combinée'],
        'Disposal': ['disposal', 'räumung / entsorgung', 'débarras / élimination', 'räumung', 'entsorgung'],
        'Gastronomy Cleaning': ['gastronomy cleaning', 'gastronomiereinigung', 'nettoyage gastronomique'],
        'Medical Cleaning': ['medical cleaning', 'praxisreinigung', 'nettoyage de cabinet médical'],
        'Construction Cleaning': ['construction cleaning', 'baureinigung', 'nettoyage de fin de chantier'],
        'Property Maintenance': ['property maintenance', 'hauswartung', 'conciergerie / entretien', 'conciergerie', 'entretien'],
        'Special Cleaning': ['special cleaning', 'spezialreinigung', 'nettoyage spécial'],
        'Household Helping': ['household helping', 'haushaltshilfe', 'aide ménagère'],
        'Maintenance Cleaning': ['maintenance cleaning', 'unterhaltsreinigung', "nettoyage d'entretien"],
        'Facility Services': ['facility services', 'facility services', 'services généraux']
      };

      const buildingMap: Record<string, string[]> = {
        'Apartment': ['apartment', 'wohnung', 'appartement'],
        'House': ['house', 'haus', 'maison'],
        'WG Room': ['wg room', 'wg-zimmer', 'chambre en colocation'],
        'Office': ['office', 'büro', 'bureau'],
        'Studio': ['studio', 'studio', 'studio'],
        'Storage/Cellar': ['storage/cellar', 'lager/keller', 'cave/entrepôt', 'lager', 'keller'],
        'Restaurant': ['restaurant', 'restaurant', 'restaurant'],
        'Commercial': ['commercial', 'gewerbe', 'commercial'],
        'Other': ['other', 'andere', 'sonstiges', 'autre']
      };

      let matchedService = client.serviceType;
      if (client.serviceType) {
        const lowerVal = client.serviceType.toLowerCase();
        for (const [key, variants] of Object.entries(serviceMap)) {
          if (variants.includes(lowerVal)) {
            matchedService = key;
            break;
          }
        }
      }

      let matchedBuilding = client.buildingType;
      if (client.buildingType) {
        const lowerVal = client.buildingType.toLowerCase();
        for (const [key, variants] of Object.entries(buildingMap)) {
          if (variants.includes(lowerVal)) {
            matchedBuilding = key;
            break;
          }
        }
      }

      reset({
        ...client,
        serviceType: matchedService,
        buildingType: matchedBuilding,
        location: client.location || '',
        fromDate: client.fromDate ? new Date(client.fromDate).toISOString().slice(0, 16) : '',
        untilDate: client.untilDate ? new Date(client.untilDate).toISOString().slice(0, 16) : ''
      })
    } else {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        location: '',
        squareMeters: 0,
        serviceType: 'Apartment cleaning',
        buildingType: 'Apartment',
        fromDate: '',
        untilDate: '',
        totalPrice: 0,
        paidAmount: 0,
        balance: 0,
        status: 'UNPAID'
      })
    }
  }, [client, reset])

  // Auto-calculate balance
  useEffect(() => {
    const balance = totalPrice - paidAmount
    setValue('balance', balance)
  }, [totalPrice, paidAmount, setValue])

  const onSubmit = async (data: Client) => {
    try {
      setLoading(true)
      
      const url = isEdit ? `/api/admin/clients/${client.id}` : '/api/admin/clients'
      const method = isEdit ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to save client')
      }

      toast.success(isEdit ? 'Client updated successfully' : 'Client created successfully')
      onSuccess()
      onClose()
    } catch (error) {
      toast.error('Failed to save client')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-500 bg-opacity-75"
              onClick={onClose}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {isEdit ? t('editClientTitle') : t('newClientTitle')}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto max-h-[calc(90vh-140px)]">
                <div className="p-6 space-y-8">
                  {/* Project Details */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">{t('projectDetails')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('firstName')}
                        </label>
                        <input
                          {...register('firstName', { required: 'First name is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t('firstNamePlaceholder')}
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('lastName')}
                        </label>
                        <input
                          {...register('lastName', { required: 'Last name is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t('lastNamePlaceholder')}
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('fromDate')}
                        </label>
                        <input
                          type="datetime-local"
                          {...register('fromDate', { required: 'From date is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.fromDate && (
                          <p className="mt-1 text-sm text-red-600">{errors.fromDate.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('untilDate')}
                        </label>
                        <input
                          type="datetime-local"
                          {...register('untilDate', { required: 'Until date is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.untilDate && (
                          <p className="mt-1 text-sm text-red-600">{errors.untilDate.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('mobile')}
                        </label>
                        <input
                          {...register('phone', { required: 'Phone is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t('mobilePlaceholder')}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('email')}
                        </label>
                        <input
                          type="email"
                          {...register('email')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t('emailPlaceholder')}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('squareMeters')}
                        </label>
                        <input
                          type="number"
                          {...register('squareMeters', { required: 'Square meters is required', min: 1 })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t('squareMetersPlaceholder')}
                        />
                        {errors.squareMeters && (
                          <p className="mt-1 text-sm text-red-600">{errors.squareMeters.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('address')}
                        </label>
                        <input
                          {...register('address', { required: 'Address is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t('addressPlaceholder')}
                        />
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('location')}
                        </label>
                        <input
                          {...register('location', { required: 'Location is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t('locationPlaceholder')}
                        />
                        {errors.location && (
                          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('postalCode')}
                        </label>
                        <input
                          {...register('postalCode', { required: 'Postal code is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t('postalCodePlaceholder')}
                        />
                        {errors.postalCode && (
                          <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('serviceType')}
                        </label>
                        <select
                          {...register('serviceType', { required: 'Service type is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="House Cleaning">{tServices('houseCleaning')}</option>
                          <option value="Apartment cleaning">{tServices('apartmentCleaning')}</option>
                          <option value="Stairwell Cleaning">{tServices('stairwellCleaning')}</option>
                          <option value="Office Cleaning">{tServices('officeCleaning')}</option>
                          <option value="Final Cleaning">{tServices('finalCleaning')}</option>
                          <option value="Window Cleaning">{tServices('windowCleaning')}</option>
                          <option value="Relocation">{tServices('relocation')}</option>
                          <option value="Disposal">{tServices('disposal')}</option>
                          <option value="Gastronomy Cleaning">{tServices('gastronomyCleaning')}</option>
                          <option value="Medical Cleaning">{tServices('medicalCleaning')}</option>
                          <option value="Construction Cleaning">{tServices('constructionCleaning')}</option>
                          <option value="Property Maintenance">{tServices('propertyMaintenance')}</option>
                          <option value="Special Cleaning">{tServices('specialCleaning')}</option>
                          <option value="Combo Service">{tServices('comboService')}</option>
                          <option value="Maintenance Cleaning">{tServices('maintenanceCleaning')}</option>
                          <option value="Household Helping">{tServices('householdHelping')}</option>
                          <option value="Facility Services">{tServices('facilityServices')}</option>
                        </select>
                        {errors.serviceType && (
                          <p className="mt-1 text-sm text-red-600">{errors.serviceType.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('buildingType')}
                        </label>
                        <select
                          {...register('buildingType', { required: 'Building type is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Apartment">{tBuilding('apartment')}</option>
                          <option value="House">{tBuilding('house')}</option>
                          <option value="WG Room">{tBuilding('wgRoom')}</option>
                          <option value="Office">{tBuilding('office')}</option>
                          <option value="Studio">{tBuilding('studio')}</option>
                          <option value="Storage/Cellar">{tBuilding('storageCellar')}</option>
                          <option value="Restaurant">{tBuilding('restaurant')}</option>
                          <option value="Commercial">{tBuilding('commercial')}</option>
                          <option value="Other">{tBuilding('other')}</option>
                        </select>
                        {errors.buildingType && (
                          <p className="mt-1 text-sm text-red-600">{errors.buildingType.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">{t('paymentDetails')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('totalPrice')}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          {...register('totalPrice', { required: 'Total price is required', min: 0 })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0.00"
                        />
                        {errors.totalPrice && (
                          <p className="mt-1 text-sm text-red-600">{errors.totalPrice.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('paidAmount')} (CHF)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          {...register('paidAmount', { min: 0 })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('balance')} (CHF)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          {...register('balance')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0.00"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 mr-3"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 transition-colors"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {t('saving')}
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        {t('save')}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
