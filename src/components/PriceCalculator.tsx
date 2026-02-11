'use client'

import { useState, useEffect } from 'react'
import { Calculator } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function PriceCalculator() {
    const t = useTranslations('priceCalculator')
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
            { id: 'endOfTenancyApartment', name: t('services.cleaning.endOfTenancyApartment'), unit: 'rooms' },
            { id: 'endOfTenancyHouse', name: t('services.cleaning.endOfTenancyHouse'), unit: 'fixed' },
            { id: 'apartmentHouseCleaning', name: t('services.cleaning.apartmentHouseCleaning'), unit: 'hourlyRange' },
            { id: 'deepCleaning', name: t('services.cleaning.deepCleaning'), unit: 'sqmRange' },
            { id: 'constructionCleaning', name: t('services.cleaning.constructionCleaning'), unit: 'construction' },
            { id: 'gastronomyKitchenDeep', name: t('services.cleaning.gastronomyKitchenDeep'), unit: 'fixedRange' },
            { id: 'gastronomyRegular', name: t('services.cleaning.gastronomyRegular'), unit: 'fixedFrom' },
            { id: 'gastronomySanitary', name: t('services.cleaning.gastronomySanitary'), unit: 'fixedFrom' },
            { id: 'windowCleaning', name: t('services.cleaning.windowCleaning'), unit: 'perWindowRange' }
        ],
        moving: [
            { id: 'movingAssistant', name: t('services.moving.movingAssistant'), unit: 'hourlyRangePerPerson' },
            { id: 'movingTeam2', name: t('services.moving.movingTeam2'), unit: 'hourlyFrom' },
            { id: 'vanWithDriver', name: t('services.moving.vanWithDriver'), unit: 'hourlyFrom' },
            { id: 'assembly', name: t('services.moving.assembly'), unit: 'hourlyRange' }
        ],
        maintenance: [
            { id: 'residentialBuildings', name: t('services.maintenance.residentialBuildings'), unit: 'sqmRange' },
            { id: 'officesPractices', name: t('services.maintenance.officesPractices'), unit: 'sqmRange' },
            { id: 'stairwellsFlat', name: t('services.maintenance.stairwellsFlat'), unit: 'fixedFrom' },
            { id: 'hourlyRate', name: t('services.maintenance.hourlyRate'), unit: 'hourlyRange' }
        ],
        disposal: [
            { id: 'disposalPerM3', name: t('services.disposal.disposalPerM3'), unit: 'perM3From' }
        ],
        combo: [
            { id: 'comboApartment', name: t('services.combo.comboApartment'), unit: 'rooms' },
            { id: 'comboHouse', name: t('services.combo.comboHouse'), unit: 'fixed' }
        ]
    }

    // Add-on options (optional extras)
    const addOnOptions = [
        { id: 'addonBasementAttic', label: t('addons.basementAttic'), priceFrom: 80 },
        { id: 'addonBalconyTerrace', label: t('addons.balconyTerrace'), priceFrom: 70 },
        { id: 'addonDisposalM3', label: t('addons.disposalPerM3'), priceFrom: 30 },
    ] as const

    // Price calculation logic
    const calculatePrice = () => {
        let basePriceMin = 0
        let display: string | null = null

        if (serviceCategory === 'cleaning') {
            switch (serviceType) {
                case 'endOfTenancyApartment': {
                    if (rooms <= 1) { basePriceMin = 250; display = t('display.fromChf', { amount: 250 }) }
                    else if (rooms <= 2) { basePriceMin = 350; display = t('display.fromChf', { amount: 350 }) }
                    else if (rooms <= 3) { basePriceMin = 480; display = t('display.fromChf', { amount: 480 }) }
                    else if (rooms <= 4) { basePriceMin = 620; display = t('display.fromChf', { amount: 620 }) }
                    else if (rooms <= 5) { basePriceMin = 780; display = t('display.fromChf', { amount: 780 }) }
                    else { display = t('display.priceOnRequest') }
                    break
                }
                case 'endOfTenancyHouse':
                    basePriceMin = 900
                    display = t('display.fromChf', { amount: 900 })
                    break
                case 'apartmentHouseCleaning':
                    basePriceMin = 45 * hours
                    display = t('display.hourlyRangePerStaff', { min: 45, max: 65, base: basePriceMin })
                    break
                case 'deepCleaning':
                    basePriceMin = 8 * squareMeters
                    display = t('display.sqmRangeFrom', { min: 8, max: 15, base: basePriceMin })
                    break
                case 'constructionCleaning':
                    basePriceMin = 5 * squareMeters
                    display = t('display.sqmRangeFrom', { min: 5, max: 8, base: basePriceMin })
                    break
                case 'gastronomyKitchenDeep':
                    basePriceMin = 400
                    display = t('display.chfRange', { min: 400, max: 1200 })
                    break
                case 'gastronomyRegular':
                    basePriceMin = 150
                    display = t('display.fromChfPerService', { amount: 150 })
                    break
                case 'gastronomySanitary':
                    basePriceMin = 120
                    display = t('display.fromChf', { amount: 120 })
                    break
                case 'windowCleaning':
                    basePriceMin = 8
                    display = t('display.perWindow', { min: 8, max: 15, framesMin: 3, framesMax: 6 })
                    break
            }
        } else if (serviceCategory === 'moving') {
            switch (serviceType) {
                case 'movingAssistant':
                    basePriceMin = 70 * hours
                    display = t('display.hourlyRangePerPerson', { min: 70, max: 95, base: basePriceMin })
                    break
                case 'movingTeam2':
                    basePriceMin = 160 * hours
                    display = t('display.fromChfPerHourMin', { amount: 160, base: basePriceMin })
                    break
                case 'vanWithDriver':
                    basePriceMin = 140 * hours
                    display = t('display.fromChfPerHourMin', { amount: 140, base: basePriceMin })
                    break
                case 'assembly':
                    basePriceMin = 70 * hours
                    display = t('display.hourlyRange', { min: 70, max: 90, base: basePriceMin })
                    break
            }
        } else if (serviceCategory === 'maintenance') {
            switch (serviceType) {
                case 'residentialBuildings':
                    basePriceMin = 0.6 * squareMeters
                    display = t('display.sqmRange', { min: 0.6, max: 1.2, base: Math.round(basePriceMin) })
                    break
                case 'officesPractices':
                    basePriceMin = 0.8 * squareMeters
                    display = t('display.sqmRange', { min: 0.8, max: 1.5, base: Math.round(basePriceMin) })
                    break
                case 'stairwellsFlat':
                    basePriceMin = 120
                    display = t('display.flatRateFrom', { amount: 120 })
                    break
                case 'hourlyRate':
                    basePriceMin = 45 * hours
                    display = t('display.hourlyRange', { min: 45, max: 65, base: basePriceMin })
                    break
            }
        } else if (serviceCategory === 'disposal') {
            switch (serviceType) {
                case 'disposalPerM3':
                    basePriceMin = 30
                    display = t('display.fromChfPerM3', { amount: 30 })
                    break
            }
        } else if (serviceCategory === 'combo') {
            switch (serviceType) {
                case 'comboApartment': {
                    if (rooms <= 1) { basePriceMin = 650; display = t('display.fromChf', { amount: 650 }) }
                    else if (rooms <= 2) { basePriceMin = 850; display = t('display.fromChf', { amount: 850 }) }
                    else if (rooms <= 3) { basePriceMin = 1150; display = t('display.fromChf', { amount: '1,150' }) }
                    else if (rooms <= 4) { basePriceMin = 1450; display = t('display.fromChf', { amount: '1,450' }) }
                    else if (rooms <= 5) { basePriceMin = 1750; display = t('display.fromChf', { amount: '1,750' }) }
                    else { display = t('display.priceOnRequest') }
                    break
                }
                case 'comboHouse':
                    basePriceMin = 1950
                    display = t('display.fromChf', { amount: '1,950' })
                    break
            }
        }

        return { basePriceMin: Math.round(basePriceMin), display: display ?? t('display.priceOnRequest') }
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
                    <h3 className="text-2xl font-bold text-gray-900">{t('title')}</h3>
                    <p className="text-sm text-gray-600">{t('subtitle')}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
                <div className="text-center mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">{t('estimatedCost')}</p>
                    <div className="flex flex-col items-center space-y-1">
                        <div className="text-2xl md:text-3xl font-bold text-swiss-red text-center">
                            {price.display}
                        </div>
                        <div className="text-xs text-gray-500">
                            {t('addonsLine', { addOnsTotal, totalWithAddOns })}
                        </div>
                    </div>
                    {(currentService?.unit === 'hourlyRange' || currentService?.unit === 'hourlyRangePerPerson' || currentService?.unit === 'hourlyFrom') && (
                        <p className="text-xs text-gray-500 mt-2">{t('forHours', { hours })}</p>
                    )}
                    {currentService?.unit === 'monthly' && (
                        <p className="text-xs text-gray-500 mt-2">{t('perMonth')}</p>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                {/* Service Category */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('fields.serviceCategory')}
                    </label>
                    <select
                        value={serviceCategory}
                        onChange={(e) => handleCategoryChange(e.target.value as typeof serviceCategory)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg font-medium cursor-pointer hover:border-red-500 transition-colors focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                        <option value="cleaning">{t('categories.cleaning')}</option>
                        <option value="moving">{t('categories.moving')}</option>
                        <option value="maintenance">{t('categories.maintenance')}</option>
                        <option value="disposal">{t('categories.disposal')}</option>
                        <option value="combo">{t('categories.combo')}</option>
                    </select>
                </div>

                {/* Service Type */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('fields.serviceType')}
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
                            {t('fields.rooms')}
                        </label>
                        <select
                            value={rooms}
                            onChange={(e) => setRooms(parseFloat(e.target.value))}
                            className="w-full px-4 py-3 bg-swiss-red text-white rounded-lg font-medium cursor-pointer hover:bg-swiss-red/90 transition-colors"
                        >
                            <option value={1}>{t('roomsOptions.one')}</option>
                            <option value={2}>{t('roomsOptions.two')}</option>
                            <option value={3}>{t('roomsOptions.three')}</option>
                            <option value={4}>{t('roomsOptions.four')}</option>
                            <option value={5}>{t('roomsOptions.five')}</option>
                            <option value={6}>{t('roomsOptions.sixPlus')}</option>
                        </select>
                    </div>
                )}

                {(currentService?.unit === 'hourlyRange' || currentService?.unit === 'hourlyRangePerPerson' || currentService?.unit === 'hourlyFrom') && (
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-sm font-semibold text-gray-700">
                                {t('fields.estimatedHours')}
                            </label>
                            <span className="text-lg font-bold text-red-600">{t('hoursShort', { hours })}</span>
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
                                {t('fields.areaM2')}
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
                        {t('fields.addons')}
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
                                <span className="text-sm font-medium text-gray-900">{t('addonPriceFrom', { amount: a.priceFrom })}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-xs text-gray-600 text-center">
                    {t('disclaimer')}
                </p>
            </div>
        </div>
    )
}
