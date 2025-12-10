'use client'

import { useState, useEffect } from 'react'
import { Calculator } from 'lucide-react'

export default function PriceCalculator() {
    const [mounted, setMounted] = useState(false)
    const [serviceCategory, setServiceCategory] = useState<'cleaning' | 'moving' | 'maintenance' | 'disposal'>('cleaning')
    const [serviceType, setServiceType] = useState('moveOutCleaning')
    const [squareMeters, setSquareMeters] = useState(50)
    const [rooms, setRooms] = useState(1)
    const [hours, setHours] = useState(4)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Service options by category
    const serviceOptions = {
        cleaning: [
            { id: 'moveOutCleaning', name: 'Move-out Cleaning', unit: 'rooms' },
            { id: 'apartmentCleaning', name: 'Apartment/House Cleaning', unit: 'hourly' },
            { id: 'officeCleaning', name: 'Office Cleaning', unit: 'hourly' },
            { id: 'medicalCleaning', name: 'Medical Practice Cleaning', unit: 'hourly' },
            { id: 'gastronomyCleaning', name: 'Gastronomy Cleaning', unit: 'fixed' },
            { id: 'maintenanceCleaning', name: 'Maintenance Cleaning', unit: 'hourly' },
            { id: 'windowCleaning', name: 'Window & Glass Cleaning', unit: 'fixed' },
            { id: 'carpetCleaning', name: 'Carpet Cleaning', unit: 'sqm' },
            { id: 'sofaCleaning', name: 'Sofa Cleaning', unit: 'fixed' },
            { id: 'constructionCleaning', name: 'Construction Cleaning', unit: 'sqm' },
            { id: 'specialCleaning', name: 'Special Cleaning', unit: 'fixed' }
        ],
        moving: [
            { id: 'twoManTeam', name: '2-man team + van', unit: 'hourly' },
            { id: 'threeManTeam', name: '3-man team', unit: 'hourly' },
            { id: 'flatRate35', name: 'Flat rate 3.5-room', unit: 'fixed' },
            { id: 'flatRate45', name: 'Flat rate 4.5-room', unit: 'fixed' }
        ],
        maintenance: [
            { id: 'staircaseCleaning', name: 'Staircase cleaning', unit: 'monthly' },
            { id: 'fullService', name: 'Full service', unit: 'monthly' }
        ],
        disposal: [
            { id: 'smallBasement', name: 'Small basement', unit: 'fixed' },
            { id: 'apartment25', name: '2.5-room apartment', unit: 'fixed' },
            { id: 'apartment35', name: '3.5-room apartment', unit: 'fixed' }
        ]
    }

    // Price calculation logic
    const calculatePrice = () => {
        let basePrice = 0

        if (serviceCategory === 'cleaning') {
            switch (serviceType) {
                case 'moveOutCleaning':
                    if (rooms <= 1.5) basePrice = 390
                    else if (rooms <= 2.5) basePrice = 590
                    else if (rooms <= 3.5) basePrice = 790
                    else if (rooms <= 4.5) basePrice = 990
                    else basePrice = 1190
                    break
                case 'apartmentCleaning':
                    basePrice = 45 * hours
                    break
                case 'officeCleaning':
                    basePrice = 48 * hours
                    break
                case 'medicalCleaning':
                    basePrice = 52 * hours
                    break
                case 'gastronomyCleaning':
                    basePrice = 290
                    break
                case 'maintenanceCleaning':
                    basePrice = 45 * hours
                    break
                case 'windowCleaning':
                    basePrice = 120
                    break
                case 'carpetCleaning':
                    basePrice = 10 * squareMeters
                    break
                case 'sofaCleaning':
                    basePrice = 150
                    break
                case 'constructionCleaning':
                    basePrice = 5 * squareMeters
                    break
                case 'specialCleaning':
                    basePrice = 180
                    break
            }
        } else if (serviceCategory === 'moving') {
            switch (serviceType) {
                case 'twoManTeam':
                    basePrice = 150 * hours
                    break
                case 'threeManTeam':
                    basePrice = 210 * hours
                    break
                case 'flatRate35':
                    basePrice = 890
                    break
                case 'flatRate45':
                    basePrice = 1250
                    break
            }
        } else if (serviceCategory === 'maintenance') {
            switch (serviceType) {
                case 'staircaseCleaning':
                    basePrice = 190
                    break
                case 'fullService':
                    basePrice = 350
                    break
            }
        } else if (serviceCategory === 'disposal') {
            switch (serviceType) {
                case 'smallBasement':
                    basePrice = 350
                    break
                case 'apartment25':
                    basePrice = 450
                    break
                case 'apartment35':
                    basePrice = 950
                    break
            }
        }

        return Math.round(basePrice)
    }

    const estimatedPrice = calculatePrice()
    const currentService = serviceOptions[serviceCategory].find(s => s.id === serviceType)

    // Reset service type when category changes
    const handleCategoryChange = (category: typeof serviceCategory) => {
        setServiceCategory(category)
        setServiceType(serviceOptions[category][0].id)
    }

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 shadow-xl border border-blue-100">
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 shadow-xl border border-blue-100">
            <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Price Calculator</h3>
                    <p className="text-sm text-gray-600">Get an instant estimate</p>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
                <div className="text-center mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">Estimated Cost</p>
                    <div className="flex items-baseline justify-center space-x-2">
                        <span className="text-sm text-gray-500">Amount</span>
                        <span className="text-5xl font-bold text-blue-600">{estimatedPrice}</span>
                        <span className="text-xl text-gray-600">CHF</span>
                    </div>
                    {currentService?.unit === 'hourly' && (
                        <p className="text-xs text-gray-500 mt-2">for {hours} hour{hours > 1 ? 's' : ''}</p>
                    )}
                    {currentService?.unit === 'monthly' && (
                        <p className="text-xs text-gray-500 mt-2">per month</p>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                {/* Service Category */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Service Category
                    </label>
                    <select
                        value={serviceCategory}
                        onChange={(e) => handleCategoryChange(e.target.value as typeof serviceCategory)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg font-medium cursor-pointer hover:border-blue-500 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="cleaning">Cleaning Services</option>
                        <option value="moving">Moving & Transport</option>
                        <option value="maintenance">Facility Management</option>
                        <option value="disposal">Disposal & Clearance</option>
                    </select>
                </div>

                {/* Service Type */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Service Type
                    </label>
                    <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-medium cursor-pointer hover:bg-blue-600 transition-colors"
                    >
                        {serviceOptions[serviceCategory].map(service => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </select>
                </div>

                {/* Conditional inputs based on service unit type */}
                {currentService?.unit === 'rooms' && (
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Rooms
                        </label>
                        <select
                            value={rooms}
                            onChange={(e) => setRooms(parseFloat(e.target.value))}
                            className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-medium cursor-pointer hover:bg-blue-600 transition-colors"
                        >
                            <option value={1}>1 room</option>
                            <option value={1.5}>1.5 rooms</option>
                            <option value={2}>2 rooms</option>
                            <option value={2.5}>2.5 rooms</option>
                            <option value={3}>3 rooms</option>
                            <option value={3.5}>3.5 rooms</option>
                            <option value={4}>4 rooms</option>
                            <option value={4.5}>4.5 rooms</option>
                            <option value={5}>5 rooms</option>
                            <option value={5.5}>5.5 rooms</option>
                        </select>
                    </div>
                )}

                {currentService?.unit === 'hourly' && (
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-sm font-semibold text-gray-700">
                                Estimated Hours
                            </label>
                            <span className="text-lg font-bold text-blue-600">{hours} hrs</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="12"
                            value={hours}
                            onChange={(e) => setHours(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>
                )}

                {currentService?.unit === 'sqm' && (
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-sm font-semibold text-gray-700">
                                Area in m²
                            </label>
                            <span className="text-lg font-bold text-blue-600">{squareMeters} m²</span>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="300"
                            value={squareMeters}
                            onChange={(e) => setSquareMeters(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>
                )}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-gray-600 text-center">
                    * This is an estimated price. Final price may vary based on specific requirements and conditions.
                </p>
            </div>
        </div>
    )
}
