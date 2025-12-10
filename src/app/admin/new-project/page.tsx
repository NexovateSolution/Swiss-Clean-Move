'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Calendar,
  MapPin,
  User,
  Building,
  CreditCard,
  FileText
} from 'lucide-react'
import { useRouter } from 'next/navigation'
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

const steps = [
  { id: 1, name: 'Service', icon: FileText },
  { id: 2, name: 'Schedule', icon: Calendar },
  { id: 3, name: 'Building', icon: Building },
  { id: 4, name: 'Customer', icon: User },
  { id: 5, name: 'Pricing', icon: CreditCard }
]

export default function NewProjectPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [projectData, setProjectData] = useState<ProjectData>(initialData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

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
      toast.error('Please fill in all required fields before proceeding')
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
        toast.success('Project created successfully!')
        router.push('/admin')
      } else {
        toast.error('Failed to create project')
      }
    } catch (error) {
      toast.error('An error occurred')
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
          <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
          <p className="text-gray-600 mt-2">Follow the steps to create a new cleaning project</p>
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
                    STEP {step.id}
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
            <span>Previous</span>
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
              <span>{isSubmitting ? 'Creating...' : 'Create Project'}</span>
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
              <span>Next</span>
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
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Service</h2>
        <p className="text-gray-600 mt-2">Select the type of cleaning service you need</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          'Maintenance cleaning',
          'Catering cleaning',
          'House cleaning',
          'Apartment cleaning',
          'Staircase cleaning',
          'Office Cleaning',
          'Window cleaning',
          'Relocation',
          'Moving during cleaning'
        ].map((service) => (
          <button
            key={service}
            onClick={() => updateData('serviceType', service)}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              data.serviceType === service
                ? 'border-blue-600 bg-blue-50 text-blue-900'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-medium">{service}</div>
          </button>
        ))}
      </div>

      {data.serviceType ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-medium text-green-900">✓ Service Selected</h3>
          <p className="text-green-700">{data.serviceType}</p>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-medium text-red-900">⚠ Service Required</h3>
          <p className="text-red-700">Please select a service to continue</p>
        </div>
      )}
    </div>
  )
}

function Step2({ data, updateData }: { data: ProjectData; updateData: (field: keyof ProjectData, value: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Schedule Service</h2>
        <p className="text-gray-600 mt-2">When would you like the service to be performed?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Date <span className="text-red-500">*</span>
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
            <p className="text-red-500 text-xs mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Until Date <span className="text-red-500">*</span>
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
            <p className="text-red-500 text-xs mt-1">This field is required</p>
          )}
        </div>
      </div>

      {data.fromDate && data.untilDate && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-medium text-green-900">Schedule Confirmed</h3>
          <p className="text-green-700">
            From: {new Date(data.fromDate).toLocaleString()} <br />
            Until: {new Date(data.untilDate).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  )
}

function Step3({ data, updateData }: { data: ProjectData; updateData: (field: keyof ProjectData, value: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Building Information</h2>
        <p className="text-gray-600 mt-2">Tell us about the property to be cleaned</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Building Type *
          </label>
          <select
            value={data.buildingType}
            onChange={(e) => updateData('buildingType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select building type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Office">Office</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Rooms *
          </label>
          <select
            value={data.rooms}
            onChange={(e) => updateData('rooms', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select rooms</option>
            <option value="1">1 Room</option>
            <option value="2">2 Rooms</option>
            <option value="3">3 Rooms</option>
            <option value="4">4 Rooms</option>
            <option value="5+">5+ Rooms</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Floor *
          </label>
          <select
            value={data.floor}
            onChange={(e) => updateData('floor', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select floor</option>
            <option value="Ground floor">Ground floor</option>
            <option value="1st floor">1st floor</option>
            <option value="2nd floor">2nd floor</option>
            <option value="3rd floor">3rd floor</option>
            <option value="4th floor">4th floor</option>
            <option value="5+ floor">5+ floor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Square Meters *
          </label>
          <input
            type="number"
            value={data.squareMeters}
            onChange={(e) => updateData('squareMeters', e.target.value)}
            placeholder="Enter square meters"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Elevator Available *
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
              Yes
            </button>
            <button
              onClick={() => updateData('hasElevator', 'no')}
              className={`px-6 py-3 border-2 rounded-lg transition-colors ${
                data.hasElevator === 'no'
                  ? 'border-blue-600 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Step4({ data, updateData }: { data: ProjectData; updateData: (field: keyof ProjectData, value: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Customer Information</h2>
        <p className="text-gray-600 mt-2">Please provide customer contact details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prefix *
          </label>
          <select
            value={data.prefix}
            onChange={(e) => updateData('prefix', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Ms.">Ms.</option>
            <option value="Dr.">Dr.</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => updateData('firstName', e.target.value)}
            placeholder="Enter first name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => updateData('lastName', e.target.value)}
            placeholder="Enter last name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address *
        </label>
        <input
          type="text"
          value={data.address}
          onChange={(e) => updateData('address', e.target.value)}
          placeholder="Enter full address"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone *
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateData('phone', e.target.value)}
            placeholder="Enter phone number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateData('email', e.target.value)}
            placeholder="Enter email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => updateData('location', e.target.value)}
            placeholder="Enter city/location"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Postal Code *
          </label>
          <input
            type="text"
            value={data.postalCode}
            onChange={(e) => updateData('postalCode', e.target.value)}
            placeholder="Enter postal code"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  )
}

function Step5({ data, updateData }: { data: ProjectData; updateData: (field: keyof ProjectData, value: string) => void }) {
  const totalPrice = parseFloat(data.totalPrice) || 0
  const advancePayment = parseFloat(data.advancePayment) || 0
  const remainingBalance = totalPrice - advancePayment

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Pricing & Final Details</h2>
        <p className="text-gray-600 mt-2">Set pricing and add any additional remarks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Price (CHF) *
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
            Advance Payment (CHF)
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
          <h3 className="font-medium text-blue-900 mb-2">Payment Summary</h3>
          <div className="space-y-1 text-sm text-blue-700">
            <div className="flex justify-between">
              <span>Total Price:</span>
              <span>CHF {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Advance Payment:</span>
              <span>CHF {advancePayment.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium border-t border-blue-200 pt-1">
              <span>Remaining Balance:</span>
              <span>CHF {remainingBalance.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Remarks 1
          </label>
          <textarea
            value={data.remarks1}
            onChange={(e) => updateData('remarks1', e.target.value)}
            placeholder="Additional notes or special instructions..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Remarks 2
          </label>
          <textarea
            value={data.remarks2}
            onChange={(e) => updateData('remarks2', e.target.value)}
            placeholder="Additional notes or special instructions..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Remarks 3
          </label>
          <textarea
            value={data.remarks3}
            onChange={(e) => updateData('remarks3', e.target.value)}
            placeholder="Additional notes or special instructions..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Project Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-medium text-gray-900 mb-4">Project Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Service:</span>
            <span className="ml-2 text-gray-600">{data.serviceType || 'Not selected'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Building:</span>
            <span className="ml-2 text-gray-600">{data.buildingType || 'Not selected'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Customer:</span>
            <span className="ml-2 text-gray-600">{data.firstName} {data.lastName}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Total:</span>
            <span className="ml-2 text-gray-600">CHF {totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
