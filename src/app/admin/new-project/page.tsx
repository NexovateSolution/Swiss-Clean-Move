'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Calendar,
  User,
  Building,
  CreditCard,
  FileText
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import toast from 'react-hot-toast'
import AdminLayout from '@/components/admin/AdminLayout'

interface ProjectData {
  // Step 1: Service Selection
  serviceType: string
  
  // Step 2: Schedule
  fromDate: string
  untilDate: string
  
  // Step 3: Building Information
  buildingType: string
  rooms: string
  floor: string
  squareMeters: string
  hasElevator: string
  
  // Step 4: Customer Information
  prefix: string
  firstName: string
  lastName: string
  address: string
  phone: string
  location: string
  postalCode: string
  email: string
  
  // Step 5: Pricing
  totalPrice: string
  advancePayment: string
  remarks1: string
  remarks2: string
  remarks3: string
}

const initialData: ProjectData = {
  serviceType: '',
  fromDate: '',
  untilDate: '',
  buildingType: '',
  rooms: '',
  floor: '',
  squareMeters: '',
  hasElevator: '',
  prefix: '',
  firstName: '',
  lastName: '',
  address: '',
  phone: '',
  location: '',
  postalCode: '',
  email: '',
  totalPrice: '',
  advancePayment: '',
  remarks1: '',
  remarks2: '',
  remarks3: ''
}

export default function NewProjectPage() {
  const t = useTranslations('admin.newProject')
  const [currentStep, setCurrentStep] = useState(1)
  const [projectData, setProjectData] = useState<ProjectData>(initialData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const locale = useLocale()

  const steps = [
    { id: 1, name: t('steps.service'), icon: FileText },
    { id: 2, name: t('steps.schedule'), icon: Calendar },
    { id: 3, name: t('steps.building'), icon: Building },
    { id: 4, name: t('steps.customer'), icon: User },
    { id: 5, name: t('steps.pricing'), icon: CreditCard }
  ]

  const updateData = (field: keyof ProjectData, value: string) => {
    setProjectData(prev => ({ ...prev, [field]: value }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!projectData.serviceType
      case 2:
        return !!projectData.fromDate && !!projectData.untilDate
      case 3:
        return !!(projectData.buildingType && projectData.rooms && projectData.floor && 
                 projectData.squareMeters && projectData.hasElevator)
      case 4:
        return !!(projectData.firstName && projectData.lastName && projectData.phone && 
                 projectData.address && projectData.location && projectData.postalCode)
      case 5:
        return !!projectData.totalPrice
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1)
      }
    } else {
      toast.error(t('toast.fillRequired'))
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: projectData.firstName,
          lastName: projectData.lastName,
          email: projectData.email,
          phone: projectData.phone,
          address: projectData.address,
          postalCode: projectData.postalCode,
          location: projectData.location,
          squareMeters: parseInt(projectData.squareMeters) || 0,
          serviceType: projectData.serviceType,
          buildingType: projectData.buildingType,
          fromDate: projectData.fromDate,
          untilDate: projectData.untilDate,
          totalPrice: parseFloat(projectData.totalPrice) || 0,
          paidAmount: parseFloat(projectData.advancePayment) || 0,
          balance: (parseFloat(projectData.totalPrice) || 0) - (parseFloat(projectData.advancePayment) || 0)
        })
      })

      if (response.ok) {
        toast.success(t('toast.created'))
        router.push(`/${locale}/admin`)
      } else {
        toast.error(t('toast.createFailed'))
      }
    } catch (error) {
      toast.error(t('toast.errorOccurred'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 data={projectData} updateData={updateData} />
      case 2:
        return <Step2 data={projectData} updateData={updateData} />
      case 3:
        return <Step3 data={projectData} updateData={updateData} />
      case 4:
        return <Step4 data={projectData} updateData={updateData} />
      case 5:
        return <Step5 data={projectData} updateData={updateData} />
      default:
        return null
    }
  }

  return (
    <AdminLayout>
      <div className="w-full max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-gray-600 mt-2">{t('subtitle')}</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-lg border-2 transition-colors ${
                  currentStep === step.id
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : currentStep > step.id
                    ? 'border-green-600 bg-green-600 text-white'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <div className="ml-3 text-sm">
                  <p className={`font-medium ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {t('stepLabel', { step: step.id })}
                  </p>
                  <p className={`${
                    currentStep >= step.id ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ml-6 ${
                    currentStep > step.id ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('actions.previous')}</span>
          </button>

          {currentStep === 5 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !validateStep(5)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                validateStep(5) && !isSubmitting
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-400 text-gray-200'
              }`}
            >
              <span>{isSubmitting ? t('actions.creating') : t('actions.createProject')}</span>
              <Check className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={!validateStep(currentStep)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                validateStep(currentStep)
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-400 text-gray-200'
              }`}
            >
              <span>{t('actions.next')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

// Step Components
function Step1({ data, updateData }: { data: ProjectData; updateData: (field: keyof ProjectData, value: string) => void }) {
  const t = useTranslations('admin.newProject')

  const services: Array<{ value: string; label: string }> = [
    { value: 'Maintenance Cleaning', label: t('services.maintenanceCleaning') },
    { value: 'House Cleaning', label: t('services.houseCleaning') },
    { value: 'Apartment Cleaning', label: t('services.apartmentCleaning') },
    { value: 'Stairwell Cleaning', label: t('services.stairwellCleaning') },
    { value: 'Office Cleaning', label: t('services.officeCleaning') },
    { value: 'Final Cleaning', label: t('services.finalCleaning') },
    { value: 'Window Cleaning', label: t('services.windowCleaning') },
    { value: 'Relocation', label: t('services.relocation') },
    { value: 'Disposal', label: t('services.disposal') },
    { value: 'Gastronomy Cleaning', label: t('services.gastronomyCleaning') },
    { value: 'Medical Cleaning', label: t('services.medicalCleaning') },
    { value: 'Construction Cleaning', label: t('services.constructionCleaning') },
    { value: 'Property Maintenance', label: t('services.propertyMaintenance') },
    { value: 'Special Cleaning', label: t('services.specialCleaning') },
    { value: 'Combo Service', label: t('services.comboService') }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">{t('step1.title')}</h2>
        <p className="text-gray-600 mt-2">{t('step1.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <button
            key={service.value}
            onClick={() => updateData('serviceType', service.value)}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              data.serviceType === service.value
                ? 'border-blue-600 bg-blue-50 text-blue-900'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-medium">{service.label}</div>
          </button>
        ))}
      </div>

      {data.serviceType ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-medium text-green-900">{t('step1.selectedTitle')}</h3>
          <p className="text-green-700">{data.serviceType}</p>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-medium text-red-900">{t('step1.requiredTitle')}</h3>
          <p className="text-red-700">{t('step1.requiredText')}</p>
        </div>
      )}
    </div>
  )
}

function Step2({ data, updateData }: { data: ProjectData; updateData: (field: keyof ProjectData, value: string) => void }) {
  const t = useTranslations('admin.newProject')

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">{t('step2.title')}</h2>
        <p className="text-gray-600 mt-2">{t('step2.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('step2.fromDate')} <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            value={data.fromDate}
            onChange={(e) => updateData('fromDate', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              !data.fromDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          />
          {!data.fromDate && (
            <p className="text-red-500 text-xs mt-1">{t('validation.required')}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('step2.untilDate')} <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            value={data.untilDate}
            onChange={(e) => updateData('untilDate', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              !data.untilDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          />
          {!data.untilDate && (
            <p className="text-red-500 text-xs mt-1">{t('validation.required')}</p>
          )}
        </div>
      </div>

      {data.fromDate && data.untilDate && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-medium text-green-900">{t('step2.confirmedTitle')}</h3>
          <p className="text-green-700">
            {t('step2.summaryFrom')}: {new Date(data.fromDate).toLocaleString()} <br />
            {t('step2.summaryUntil')}: {new Date(data.untilDate).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  )
}

function Step3({ data, updateData }: { data: ProjectData; updateData: (field: keyof ProjectData, value: string) => void }) {
  const t = useTranslations('admin.newProject')

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">{t('step3.title')}</h2>
        <p className="text-gray-600 mt-2">{t('step3.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('step3.buildingType')} *
          </label>
          <select
            value={data.buildingType}
            onChange={(e) => updateData('buildingType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{t('step3.selectBuildingType')}</option>
            <option value="Apartment">{t('buildingTypes.apartment')}</option>
            <option value="House">{t('buildingTypes.house')}</option>
            <option value="Office">{t('buildingTypes.office')}</option>
            <option value="Restaurant">{t('buildingTypes.restaurant')}</option>
            <option value="Commercial">{t('buildingTypes.commercial')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('step3.rooms')} *
          </label>
          <select
            value={data.rooms}
            onChange={(e) => updateData('rooms', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{t('step3.selectRooms')}</option>
            <option value="1">{t('roomsOptions.one')}</option>
            <option value="2">{t('roomsOptions.two')}</option>
            <option value="3">{t('roomsOptions.three')}</option>
            <option value="4">{t('roomsOptions.four')}</option>
            <option value="5+">{t('roomsOptions.fivePlus')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('step3.floor')} *
          </label>
          <select
            value={data.floor}
            onChange={(e) => updateData('floor', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{t('step3.selectFloor')}</option>
            <option value="Ground floor">{t('floorOptions.ground')}</option>
            <option value="1st floor">{t('floorOptions.first')}</option>
            <option value="2nd floor">{t('floorOptions.second')}</option>
            <option value="3rd floor">{t('floorOptions.third')}</option>
            <option value="4th floor">{t('floorOptions.fourth')}</option>
            <option value="5+ floor">{t('floorOptions.fivePlus')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('step3.squareMeters')} *
          </label>
          <input
            type="number"
            value={data.squareMeters}
            onChange={(e) => updateData('squareMeters', e.target.value)}
            placeholder={t('step3.squareMetersPlaceholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('step3.elevator')} *
          </label>
          <div className="flex space-x-4">
            <button
              onClick={() => updateData('hasElevator', 'yes')}
              className={`px-6 py-3 border-2 rounded-lg transition-colors ${
                data.hasElevator === 'yes'
                  ? 'border-blue-600 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {t('common.yes')}
            </button>
            <button
              onClick={() => updateData('hasElevator', 'no')}
              className={`px-6 py-3 border-2 rounded-lg transition-colors ${
                data.hasElevator === 'no'
                  ? 'border-blue-600 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {t('common.no')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Step4({ data, updateData }: { data: ProjectData; updateData: (field: keyof ProjectData, value: string) => void }) {
  const t = useTranslations('admin.newProject')

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">{t('step4.title')}</h2>
        <p className="text-gray-600 mt-2">{t('step4.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('step4.prefix')} *
          </label>
          <select
            value={data.prefix}
            onChange={(e) => updateData('prefix', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{t('step4.selectPrefix')}</option>
            <option value="Mr.">{t('prefixOptions.mr')}</option>
            <option value="Mrs.">{t('prefixOptions.mrs')}</option>
            <option value="Ms.">{t('prefixOptions.ms')}</option>
            <option value="Dr.">{t('prefixOptions.dr')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('step4.firstName')} *
          </label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => updateData('firstName', e.target.value)}
            placeholder={t('step4.firstNamePlaceholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('step4.lastName')} *
          </label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => updateData('lastName', e.target.value)}
            placeholder={t('step4.lastNamePlaceholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('step4.address')} *
        </label>
        <input
          type="text"
          value={data.address}
          onChange={(e) => updateData('address', e.target.value)}
          placeholder={t('step4.addressPlaceholder')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('step4.phone')} *
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateData('phone', e.target.value)}
            placeholder={t('step4.phonePlaceholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('step4.email')}
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateData('email', e.target.value)}
            placeholder={t('step4.emailPlaceholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('step4.location')} *
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => updateData('location', e.target.value)}
            placeholder={t('step4.locationPlaceholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('step4.postalCode')} *
          </label>
          <input
            type="text"
            value={data.postalCode}
            onChange={(e) => updateData('postalCode', e.target.value)}
            placeholder={t('step4.postalCodePlaceholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  )
}

function Step5({ data, updateData }: { data: ProjectData; updateData: (field: keyof ProjectData, value: string) => void }) {
  const t = useTranslations('admin.newProject')
  const totalPrice = parseFloat(data.totalPrice) || 0
  const advancePayment = parseFloat(data.advancePayment) || 0
  const remainingBalance = totalPrice - advancePayment

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">{t('step5.title')}</h2>
        <p className="text-gray-600 mt-2">{t('step5.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('step5.totalPrice')} *
          </label>
          <input
            type="number"
            step="0.01"
            value={data.totalPrice}
            onChange={(e) => updateData('totalPrice', e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('step5.advancePayment')}
          </label>
          <input
            type="number"
            step="0.01"
            value={data.advancePayment}
            onChange={(e) => updateData('advancePayment', e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {totalPrice > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">{t('step5.summaryTitle')}</h3>
          <div className="space-y-1 text-sm text-blue-700">
            <div className="flex justify-between">
              <span>{t('step5.summaryTotal')}:</span>
              <span>CHF {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('step5.summaryAdvance')}:</span>
              <span>CHF {advancePayment.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium border-t border-blue-200 pt-1">
              <span>{t('step5.summaryRemaining')}:</span>
              <span>CHF {remainingBalance.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('step5.remarks1')}
          </label>
          <textarea
            value={data.remarks1}
            onChange={(e) => updateData('remarks1', e.target.value)}
            placeholder={t('step5.remarksPlaceholder')}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('step5.remarks2')}
          </label>
          <textarea
            value={data.remarks2}
            onChange={(e) => updateData('remarks2', e.target.value)}
            placeholder={t('step5.remarksPlaceholder')}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('step5.remarks3')}
          </label>
          <textarea
            value={data.remarks3}
            onChange={(e) => updateData('remarks3', e.target.value)}
            placeholder={t('step5.remarksPlaceholder')}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Project Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-medium text-gray-900 mb-4">{t('step5.projectSummaryTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">{t('step5.summaryService')}:</span>
            <span className="ml-2 text-gray-600">{data.serviceType || t('common.notSelected')}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">{t('step5.summaryBuilding')}:</span>
            <span className="ml-2 text-gray-600">{data.buildingType || t('common.notSelected')}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">{t('step5.summaryCustomer')}:</span>
            <span className="ml-2 text-gray-600">{data.firstName} {data.lastName}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">{t('step5.summaryTotalLabel')}:</span>
            <span className="ml-2 text-gray-600">CHF {totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
