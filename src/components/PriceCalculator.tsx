'use client'

import { useState, useEffect } from 'react'
import { Calculator } from 'lucide-react'

export default function PriceCalculator() {
    const [mounted, setMounted] = useState(false)
    const [serviceCategory, setServiceCategory] = useState<'cleaning' | 'moving' | 'maintenance' | 'disposal' | 'combo'>('cleaning')
    const [serviceType, setServiceType] = useState('endOfTenancyApartment')
    const [squareMeters, setSquareMeters] = useState(50)
    const [rooms, setRooms] = useState(1)
    const [hours, setHours] = useState(4)
    const [selectedAddOns, setSelectedAddOns] = useState<Record<string, boolean>>({})

    useEffect(() => {
        setMounted(true)
    }, [])

    // Service options by category
    const serviceOptions = {
        cleaning: [
            { id: 'endOfTenancyApartment', name: 'End-of-Tenancy Cleaning (Apartment)', unit: 'rooms' },
            { id: 'endOfTenancyHouse', name: 'End-of-Tenancy Cleaning (House)', unit: 'fixed' },
            { id: 'apartmentHouseCleaning', name: 'Apartment & House Cleaning (Maintenance)', unit: 'hourlyRange' },
            { id: 'deepCleaning', name: 'Apartment & House Cleaning (Deep Cleaning)', unit: 'sqmRange' },
            { id: 'constructionCleaning', name: 'Construction Cleaning', unit: 'construction' },
            { id: 'gastronomyKitchenDeep', name: 'Gastronomy Cleaning (Kitchen Deep Cleaning)', unit: 'fixedRange' },
            { id: 'gastronomyRegular', name: 'Gastronomy Cleaning (Regular)', unit: 'fixedFrom' },
            { id: 'gastronomySanitary', name: 'Gastronomy Cleaning (Sanitary Facilities)', unit: 'fixedFrom' },
            { id: 'windowCleaning', name: 'Window Cleaning', unit: 'perWindowRange' }
        ],
        moving: [
            { id: 'movingAssistant', name: 'Moving assistant', unit: 'hourlyRangePerPerson' },
            { id: 'movingTeam2', name: 'Moving team (2 people)', unit: 'hourlyFrom' },
            { id: 'vanWithDriver', name: 'Van incl. driver', unit: 'hourlyFrom' },
            { id: 'assembly', name: 'Furniture assembly / disassembly', unit: 'hourlyRange' }
        ],
        maintenance: [
            { id: 'residentialBuildings', name: 'Residential buildings (per area)', unit: 'sqmRange' },
            { id: 'officesPractices', name: 'Offices / practices (per area)', unit: 'sqmRange' },
            { id: 'stairwellsFlat', name: 'Stairwells (flat rate)', unit: 'fixedFrom' },
            { id: 'hourlyRate', name: 'Hourly rate', unit: 'hourlyRange' }
        ],
        disposal: [
            { id: 'disposalPerM3', name: 'Disposal services', unit: 'perM3From' }
        ],
        combo: [
            { id: 'comboApartment', name: 'Combo (Moving + End-of-Tenancy) - Apartment', unit: 'rooms' },
            { id: 'comboHouse', name: 'Combo (Moving + End-of-Tenancy) - House', unit: 'fixed' }
        ]
    }

    // Add-on options (optional extras)
    const addOnOptions = [
        { id: 'addonBasementAttic', label: 'Basement / attic (from CHF 80)', priceFrom: 80 },
        { id: 'addonBalconyTerrace', label: 'Balcony / terrace (from CHF 70)', priceFrom: 70 },
        { id: 'addonDisposalM3', label: 'Disposal (from CHF 30 / m³)', priceFrom: 30 },
    ] as const

    // Price calculation logic
    const calculatePrice = () => {
        let basePriceMin = 0
        let display: string | null = null

        if (serviceCategory === 'cleaning') {
            switch (serviceType) {
                case 'endOfTenancyApartment': {
                    if (rooms <= 1) { basePriceMin = 250; display = 'from CHF 250' }
                    else if (rooms <= 2) { basePriceMin = 350; display = 'from CHF 350' }
                    else if (rooms <= 3) { basePriceMin = 480; display = 'from CHF 480' }
                    else if (rooms <= 4) { basePriceMin = 620; display = 'from CHF 620' }
                    else if (rooms <= 5) { basePriceMin = 780; display = 'from CHF 780' }
                    else { display = 'Price on request' }
                    break
                }
                case 'endOfTenancyHouse':
                    basePriceMin = 900
                    display = 'from CHF 900'
                    break
                case 'apartmentHouseCleaning':
                    basePriceMin = 45 * hours
                    display = `CHF 45–65 / hour / staff (min: CHF ${basePriceMin})`
                    break
                case 'deepCleaning':
                    basePriceMin = 8 * squareMeters
                    display = `from CHF 8–15 / m² (min: CHF ${basePriceMin})`
                    break
                case 'constructionCleaning':
                    basePriceMin = 5 * squareMeters
                    display = `from CHF 5–8 / m² (min: CHF ${basePriceMin})`
                    break
                case 'gastronomyKitchenDeep':
                    basePriceMin = 400
                    display = 'CHF 400–1,200'
                    break
                case 'gastronomyRegular':
                    basePriceMin = 150
                    display = 'from CHF 150 per service'
                    break
                case 'gastronomySanitary':
                    basePriceMin = 120
                    display = 'from CHF 120'
                    break
                case 'windowCleaning':
                    basePriceMin = 8
                    display = 'CHF 8–15 per window (+ CHF 3–6 frames & shutters)'
                    break
            }
        } else if (serviceCategory === 'moving') {
            switch (serviceType) {
                case 'movingAssistant':
                    basePriceMin = 70 * hours
                    display = `CHF 70–95 / hour / person (min: CHF ${basePriceMin})`
                    break
                case 'movingTeam2':
                    basePriceMin = 160 * hours
                    display = `from CHF 160 / hour (min: CHF ${basePriceMin})`
                    break
                case 'vanWithDriver':
                    basePriceMin = 140 * hours
                    display = `from CHF 140 / hour (min: CHF ${basePriceMin})`
                    break
                case 'assembly':
                    basePriceMin = 70 * hours
                    display = `CHF 70–90 / hour (min: CHF ${basePriceMin})`
                    break
            }
        } else if (serviceCategory === 'maintenance') {
            switch (serviceType) {
                case 'residentialBuildings':
                    basePriceMin = 0.6 * squareMeters
                    display = `CHF 0.60–1.20 / m² (min: CHF ${Math.round(basePriceMin)})`
                    break
                case 'officesPractices':
                    basePriceMin = 0.8 * squareMeters
                    display = `CHF 0.80–1.50 / m² (min: CHF ${Math.round(basePriceMin)})`
                    break
                case 'stairwellsFlat':
                    basePriceMin = 120
                    display = 'flat rate from CHF 120'
                    break
                case 'hourlyRate':
                    basePriceMin = 45 * hours
                    display = `CHF 45–65 / hour (min: CHF ${basePriceMin})`
                    break
            }
        } else if (serviceCategory === 'disposal') {
            switch (serviceType) {
                case 'disposalPerM3':
                    basePriceMin = 30
                    display = 'from CHF 30 / m³'
                    break
            }
        } else if (serviceCategory === 'combo') {
            switch (serviceType) {
                case 'comboApartment': {
                    if (rooms <= 1) { basePriceMin = 650; display = 'from CHF 650' }
                    else if (rooms <= 2) { basePriceMin = 850; display = 'from CHF 850' }
                    else if (rooms <= 3) { basePriceMin = 1150; display = 'from CHF 1,150' }
                    else if (rooms <= 4) { basePriceMin = 1450; display = 'from CHF 1,450' }
                    else if (rooms <= 5) { basePriceMin = 1750; display = 'from CHF 1,750' }
                    else { display = 'Price on request' }
                    break
                }
                case 'comboHouse':
                    basePriceMin = 1950
                    display = 'from CHF 1,950'
                    break
            }
        }

        return { basePriceMin: Math.round(basePriceMin), display: display ?? 'Price on request' }
    }

    const price = calculatePrice()
    const addOnsTotal = addOnOptions.reduce((sum, a) => sum + (selectedAddOns[a.id] ? a.priceFrom : 0), 0)
    const totalWithAddOns = price.basePriceMin + addOnsTotal
    const currentService = serviceOptions[serviceCategory].find(s => s.id === serviceType)

    // Reset service type when category changes
    const handleCategoryChange = (category: typeof serviceCategory) => {
        setServiceCategory(category)
        setServiceType(serviceOptions[category][0].id)
        setSelectedAddOns({})
    }

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 shadow-xl border border-blue-100">
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-swiss-red"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 shadow-xl border border-blue-100">
            <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-swiss-red rounded-full flex items-center justify-center">
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
                    <div className="flex flex-col items-center space-y-1">
                        <div className="text-2xl md:text-3xl font-bold text-swiss-red text-center">
                            {price.display}
                        </div>
                        <div className="text-xs text-gray-500">
                            + add-ons (min) CHF {addOnsTotal} = <span className="font-semibold text-gray-700">CHF {totalWithAddOns}</span>
                        </div>
                    </div>
                    {(currentService?.unit === 'hourlyRange' || currentService?.unit === 'hourlyRangePerPerson' || currentService?.unit === 'hourlyFrom') && (
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
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg font-medium cursor-pointer hover:border-red-500 transition-colors focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                        <option value="cleaning">Cleaning Services</option>
                        <option value="moving">Moving & Transport</option>
                        <option value="maintenance">Facility Management</option>
                        <option value="disposal">Disposal & Clearance</option>
                        <option value="combo">Combo Service</option>
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
                        className="w-full px-4 py-3 bg-swiss-red text-white rounded-lg font-medium cursor-pointer hover:bg-swiss-red/90 transition-colors"
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
                            className="w-full px-4 py-3 bg-swiss-red text-white rounded-lg font-medium cursor-pointer hover:bg-swiss-red/90 transition-colors"
                        >
                            <option value={1}>1 room</option>
                            <option value={2}>2 rooms</option>
                            <option value={3}>3 rooms</option>
                            <option value={4}>4 rooms</option>
                            <option value={5}>5 rooms</option>
                            <option value={6}>6+ rooms / maisonette</option>
                        </select>
                    </div>
                )}

                {(currentService?.unit === 'hourlyRange' || currentService?.unit === 'hourlyRangePerPerson' || currentService?.unit === 'hourlyFrom') && (
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-sm font-semibold text-gray-700">
                                Estimated Hours
                            </label>
                            <span className="text-lg font-bold text-red-600">{hours} hrs</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="12"
                            value={hours}
                            onChange={(e) => setHours(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                        />
                    </div>
                )}

                {(currentService?.unit === 'sqmRange' || currentService?.unit === 'construction') && (
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-sm font-semibold text-gray-700">
                                Area in m²
                            </label>
                            <span className="text-lg font-bold text-red-600">{squareMeters} m²</span>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="300"
                            value={squareMeters}
                            onChange={(e) => setSquareMeters(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                        />
                    </div>
                )}

                {/* Add-ons */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Add-ons
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {addOnOptions.map(a => (
                            <label key={a.id} className="flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={!!selectedAddOns[a.id]}
                                        onChange={(e) => setSelectedAddOns(prev => ({ ...prev, [a.id]: e.target.checked }))}
                                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                                    />
                                    <span className="text-sm text-gray-700">{a.label}</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">+ from CHF {a.priceFrom}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-xs text-gray-600 text-center">
                    * This is an estimated price. Final price may vary based on specific requirements and conditions.
                </p>
            </div>
        </div>
    )
}
