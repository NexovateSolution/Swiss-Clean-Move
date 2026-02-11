'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'

interface ServiceFormProps {
  serviceName: string
  isOpen: boolean
  onClose: () => void
  formType: 'cleaning' | 'relocation' | 'disposal' | 'storage'
}

interface FormData {
  // Common fields
  salutation: 'Mister' | 'Woman'
  name: string
  firstName: string
  streetAndNumber: string
  postalCodeAndCity: string
  telephone: string
  emailAddress: string
  contactPreferredVia: 'E-mail' | 'Phone'
  viewingIsWelcome: 'And' | 'No'
  remark: string

  // Relocation specific fields
  unloadingStreetAndNumber?: string
  unloadingPostalCodeAndCity?: string
  floors?: string
  assembly?: string
  pathToFrontDoor?: string
  lift?: string
  unpacking?: 'And' | 'No'
  cleaning?: 'And' | 'No'
  disposal?: 'And' | 'No'
  movingDate?: string
  numberOfRooms?: string
  heavyLoad?: string
  pack?: boolean
  cellar?: boolean
  garage?: boolean
  screed?: boolean
  craftRoom?: boolean
  livingSpaceInM2?: string
  liftDisassembly?: string
  pathToFrontDoorM?: string

  // Cleaning specific fields
  numberOfRoomsApartment?: string
  apartmentType?: string
  areaInM2?: string
  awningType?: string
  cellarCleaning?: boolean
  garageCleaning?: boolean
  cleaningAppointment?: string
  submissionDeadline?: string
  carpetShampooing?: boolean
  conservatory?: boolean
  outdoorSeating?: boolean
  parquet?: boolean
  stairpolish?: boolean
}

export default function ServiceForm({ serviceName, isOpen, onClose, formType }: ServiceFormProps) {
  const t = useTranslations('serviceForm')
  const [formData, setFormData] = useState<FormData>({
    salutation: 'Mister',
    name: '',
    firstName: '',
    streetAndNumber: '',
    postalCodeAndCity: '',
    telephone: '',
    emailAddress: '',
    contactPreferredVia: 'E-mail',
    viewingIsWelcome: 'And',
    remark: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/service-forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceName,
          formType,
          ...formData
        }),
      })

      if (response.ok) {
        toast.success(t('toasts.submitted'))
        onClose()
        // Reset form
        setFormData({
          salutation: 'Mister',
          name: '',
          firstName: '',
          streetAndNumber: '',
          postalCodeAndCity: '',
          telephone: '',
          emailAddress: '',
          contactPreferredVia: 'E-mail',
          viewingIsWelcome: 'And',
          remark: ''
        })
      } else {
        throw new Error(t('toasts.submitFailed'))
      }
    } catch (error) {
      toast.error(t('toasts.submitFailedRetry'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 capitalize">
            {serviceName}{' '}
            {formType === 'relocation' ? t('title.quote') : t('title.offer')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Address Section */}
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-800 mb-4">
                  {formType === 'relocation' ? t('sections.chargingAddress') : t('sections.address')}
                </h3>
                
                {/* Salutation */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('fields.salutation.label')}
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="salutation"
                        value="Mister"
                        checked={formData.salutation === 'Mister'}
                        onChange={(e) => handleInputChange('salutation', e.target.value as 'Mister' | 'Woman')}
                        className="mr-2"
                      />
                      {t('fields.salutation.options.mister')}
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="salutation"
                        value="Woman"
                        checked={formData.salutation === 'Woman'}
                        onChange={(e) => handleInputChange('salutation', e.target.value as 'Mister' | 'Woman')}
                        className="mr-2"
                      />
                      {t('fields.salutation.options.woman')}
                    </label>
                  </div>
                </div>

                {/* Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('fields.name.label')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('fields.name.placeholder')}
                  />
                </div>

                {/* First Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('fields.firstName.label')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('fields.firstName.placeholder')}
                  />
                </div>

                {/* Street and Number */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('fields.streetAndNumber.label')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.streetAndNumber}
                    onChange={(e) => handleInputChange('streetAndNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('fields.streetAndNumber.placeholder')}
                  />
                </div>

                {/* Postal Code and City */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('fields.postalCodeAndCity.label')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCodeAndCity}
                    onChange={(e) => handleInputChange('postalCodeAndCity', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('fields.postalCodeAndCity.placeholder')}
                  />
                </div>

                {/* Telephone */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('fields.telephone.label')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telephone}
                    onChange={(e) => handleInputChange('telephone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('fields.telephone.placeholder')}
                  />
                </div>

                {/* Email Address */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('fields.emailAddress.label')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.emailAddress}
                    onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('fields.emailAddress.placeholder')}
                  />
                </div>

                {/* Moving Date for Relocation */}
                {formType === 'relocation' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('fields.movingDate.label')} *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.movingDate || ''}
                      onChange={(e) => handleInputChange('movingDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>

              {/* Relocation Unloading Address */}
              {formType === 'relocation' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-800 mb-4">{t('sections.unloadingAddress')}</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('fields.streetAndNumber.label')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.unloadingStreetAndNumber || ''}
                      onChange={(e) => handleInputChange('unloadingStreetAndNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t('fields.streetAndNumber.placeholder')}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('fields.postalCodeAndCity.label')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.unloadingPostalCodeAndCity || ''}
                      onChange={(e) => handleInputChange('unloadingPostalCodeAndCity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t('fields.postalCodeAndCity.placeholder')}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('fields.floors.label')}</label>
                      <select
                        value={formData.floors || 'UF'}
                        onChange={(e) => handleInputChange('floors', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="UF">UF</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5+">5+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('fields.assembly.label')}</label>
                      <select
                        value={formData.assembly || 'no'}
                        onChange={(e) => handleInputChange('assembly', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="no">{t('common.no')}</option>
                        <option value="yes">{t('common.yes')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('fields.pathToFrontDoor.label')}</label>
                      <select
                        value={formData.pathToFrontDoor || 'no'}
                        onChange={(e) => handleInputChange('pathToFrontDoor', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="no">{t('common.no')}</option>
                        <option value="yes">{t('common.yes')}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('fields.lift.label')}</label>
                      <select
                        value={formData.lift || 'no'}
                        onChange={(e) => handleInputChange('lift', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="no">{t('common.no')}</option>
                        <option value="yes">{t('common.yes')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('fields.numberOfRooms.label')}</label>
                    <select
                      value={formData.numberOfRooms || '1'}
                      onChange={(e) => handleInputChange('numberOfRooms', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6+">6+</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('fields.heavyLoad.label')}</label>
                      <select
                        value={formData.heavyLoad || 'No'}
                        onChange={(e) => handleInputChange('heavyLoad', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="No">{t('common.no')}</option>
                        <option value="Yes">{t('common.yes')}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('fields.livingSpaceInM2.label')}</label>
                      <select
                        value={formData.livingSpaceInM2 || 'approx. 10 m2'}
                        onChange={(e) => handleInputChange('livingSpaceInM2', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="approx. 10 m2">approx. 10 m2</option>
                        <option value="approx. 25 m2">approx. 25 m2</option>
                        <option value="approx. 50 m2">approx. 50 m2</option>
                        <option value="approx. 75 m2">approx. 75 m2</option>
                        <option value="approx. 100 m2">approx. 100 m2</option>
                        <option value="approx. 150 m2">approx. 150 m2</option>
                        <option value="approx. 200+ m2">approx. 200+ m2</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('fields.liftDisassembly.label')}</label>
                      <select
                        value={formData.liftDisassembly || 'no'}
                        onChange={(e) => handleInputChange('liftDisassembly', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="no">{t('common.no')}</option>
                        <option value="yes">{t('common.yes')}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('fields.pathToFrontDoorM.label')}</label>
                      <select
                        value={formData.pathToFrontDoorM || 'no'}
                        onChange={(e) => handleInputChange('pathToFrontDoorM', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="no">{t('common.no')}</option>
                        <option value="yes">{t('common.yes')}</option>
                      </select>
                    </div>
                  </div>

                  {/* Checkboxes for additional services */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="pack"
                        checked={formData.pack || false}
                        onChange={(e) => handleInputChange('pack', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="pack" className="text-sm text-gray-700">{t('fields.pack.label')}</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="cellar"
                        checked={formData.cellar || false}
                        onChange={(e) => handleInputChange('cellar', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="cellar" className="text-sm text-gray-700">{t('fields.cellar.label')}</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="garage"
                        checked={formData.garage || false}
                        onChange={(e) => handleInputChange('garage', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="garage" className="text-sm text-gray-700">{t('fields.garage.label')}</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="screed"
                        checked={formData.screed || false}
                        onChange={(e) => handleInputChange('screed', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="screed" className="text-sm text-gray-700">{t('fields.screed.label')}</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="craftRoom"
                        checked={formData.craftRoom || false}
                        onChange={(e) => handleInputChange('craftRoom', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="craftRoom" className="text-sm text-gray-700">{t('fields.craftRoom.label')}</label>
                    </div>
                  </div>

                  {/* Service options */}
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('fields.unpacking.label')}</label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="unpacking"
                            value="And"
                            checked={formData.unpacking === 'And'}
                            onChange={(e) => handleInputChange('unpacking', e.target.value as 'And' | 'No')}
                            className="mr-2"
                          />
                          {t('common.yes')}
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="unpacking"
                            value="No"
                            checked={formData.unpacking === 'No'}
                            onChange={(e) => handleInputChange('unpacking', e.target.value as 'And' | 'No')}
                            className="mr-2"
                          />
                          {t('common.no')}
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('fields.cleaning.label')}</label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="cleaning"
                            value="And"
                            checked={formData.cleaning === 'And'}
                            onChange={(e) => handleInputChange('cleaning', e.target.value as 'And' | 'No')}
                            className="mr-2"
                          />
                          {t('common.yes')}
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="cleaning"
                            value="No"
                            checked={formData.cleaning === 'No'}
                            onChange={(e) => handleInputChange('cleaning', e.target.value as 'And' | 'No')}
                            className="mr-2"
                          />
                          {t('common.no')}
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('fields.disposal.label')}</label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="disposal"
                            value="And"
                            checked={formData.disposal === 'And'}
                            onChange={(e) => handleInputChange('disposal', e.target.value as 'And' | 'No')}
                            className="mr-2"
                          />
                          {t('common.yes')}
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="disposal"
                            value="No"
                            checked={formData.disposal === 'No'}
                            onChange={(e) => handleInputChange('disposal', e.target.value as 'And' | 'No')}
                            className="mr-2"
                          />
                          {t('common.no')}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Apartment Details for Cleaning */}
              {formType === 'cleaning' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-800 mb-4">{t('sections.apartmentDetails')}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('fields.apartment.numberOfRooms.label')}</label>
                      <select
                        value={formData.numberOfRoomsApartment || '1 Zimmer'}
                        onChange={(e) => handleInputChange('numberOfRoomsApartment', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="1 Zimmer">1 Zimmer</option>
                        <option value="2 Zimmer">2 Zimmer</option>
                        <option value="3 Zimmer">3 Zimmer</option>
                        <option value="4 Zimmer">4 Zimmer</option>
                        <option value="5+ Zimmer">5+ Zimmer</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('fields.apartment.type.label')}</label>
                      <select
                        value={formData.apartmentType || 'Rental apartment'}
                        onChange={(e) => handleInputChange('apartmentType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Rental apartment">{t('fields.apartment.type.options.rentalApartment')}</option>
                        <option value="Own apartment">{t('fields.apartment.type.options.ownApartment')}</option>
                        <option value="House">{t('fields.apartment.type.options.house')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('fields.apartment.areaInM2.label')}</label>
                      <select
                        value={formData.areaInM2 || 'ca 10 m2'}
                        onChange={(e) => handleInputChange('areaInM2', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="ca 10 m2">ca 10 m2</option>
                        <option value="ca 25 m2">ca 25 m2</option>
                        <option value="ca 50 m2">ca 50 m2</option>
                        <option value="ca 75 m2">ca 75 m2</option>
                        <option value="ca 100 m2">ca 100 m2</option>
                        <option value="ca 150 m2">ca 150 m2</option>
                        <option value="ca 200+ m2">ca 200+ m2</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('fields.apartment.awningType.label')}</label>
                      <select
                        value={formData.awningType || 'no'}
                        onChange={(e) => handleInputChange('awningType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="no">{t('common.no')}</option>
                        <option value="yes">{t('common.yes')}</option>
                      </select>
                    </div>
                  </div>

                  {/* Checkboxes for cellar and garage */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="cellarCleaning"
                        checked={formData.cellarCleaning || false}
                        onChange={(e) => handleInputChange('cellarCleaning', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="cellarCleaning" className="text-sm text-gray-700">{t('fields.apartment.cellar.label')}</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="garageCleaning"
                        checked={formData.garageCleaning || false}
                        onChange={(e) => handleInputChange('garageCleaning', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="garageCleaning" className="text-sm text-gray-700">{t('fields.apartment.garage.label')}</label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('fields.cleaningAppointment.label')} *</label>
                      <input
                        type="date"
                        required
                        value={formData.cleaningAppointment || ''}
                        onChange={(e) => handleInputChange('cleaningAppointment', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('fields.submissionDeadline.label')} *</label>
                      <input
                        type="date"
                        required
                        value={formData.submissionDeadline || ''}
                        onChange={(e) => handleInputChange('submissionDeadline', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Special/Additional Services */}
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-800 mb-4">
                  {formType === 'cleaning' ? t('sections.special') : t('sections.miscellaneous')}
                </h3>

                {/* Cleaning Special Services */}
                {formType === 'cleaning' && (
                  <div className="space-y-3 mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.carpetShampooing || false}
                        onChange={(e) => handleInputChange('carpetShampooing', e.target.checked)}
                        className="mr-3"
                      />
                      {t('fields.carpetShampooing.label')}
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.conservatory || false}
                        onChange={(e) => handleInputChange('conservatory', e.target.checked)}
                        className="mr-3"
                      />
                      {t('fields.conservatory.label')}
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.outdoorSeating || false}
                        onChange={(e) => handleInputChange('outdoorSeating', e.target.checked)}
                        className="mr-3"
                      />
                      {t('fields.outdoorSeating.label')}
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.parquet || false}
                        onChange={(e) => handleInputChange('parquet', e.target.checked)}
                        className="mr-3"
                      />
                      {t('fields.parquet.label')}
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.stairpolish || false}
                        onChange={(e) => handleInputChange('stairpolish', e.target.checked)}
                        className="mr-3"
                      />
                      {t('fields.stairpolish.label')}
                    </label>
                  </div>
                )}

                {/* Contact Preference */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('fields.contactPreferredVia.label')}
                  </label>
                  <select
                    value={formData.contactPreferredVia}
                    onChange={(e) => handleInputChange('contactPreferredVia', e.target.value as 'E-mail' | 'Phone')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="E-mail">{t('fields.contactPreferredVia.options.email')}</option>
                    <option value="Phone">{t('fields.contactPreferredVia.options.phone')}</option>
                  </select>
                </div>

                {/* Viewing Welcome */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('fields.viewingIsWelcome.label')}
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="viewingIsWelcome"
                        value="And"
                        checked={formData.viewingIsWelcome === 'And'}
                        onChange={(e) => handleInputChange('viewingIsWelcome', e.target.value as 'And' | 'No')}
                        className="mr-2"
                      />
                      {t('fields.viewingIsWelcome.options.and')}
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="viewingIsWelcome"
                        value="No"
                        checked={formData.viewingIsWelcome === 'No'}
                        onChange={(e) => handleInputChange('viewingIsWelcome', e.target.value as 'And' | 'No')}
                        className="mr-2"
                      />
                      {t('common.no')}
                    </label>
                  </div>
                </div>

                {/* Remarks */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('fields.remark.label')}
                  </label>
                  <textarea
                    value={formData.remark}
                    onChange={(e) => handleInputChange('remark', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('fields.remark.placeholder')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              {t('buttons.close')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? t('buttons.submitting') : t('buttons.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
