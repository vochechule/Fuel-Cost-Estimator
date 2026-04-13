'use client'

import { useState } from 'react'
import { Calculator, Fuel, TrendingUp, Save, RotateCcw } from 'lucide-react'
import FuelEfficiencyComparison from '@/components/FuelEfficiencyComparison'
import CostSavingsCalculator from '@/components/CostSavingsCalculator'

interface FuelCalculation {
  costPerTrip: number
  weeklyCost: number
  monthlyCost: number
  fuelNeeded: number
}

export default function Home() {
  // Initialize with client-side storage to avoid hydration mismatch
  const [distance, setDistance] = useState<string>('')
  const [consumption, setConsumption] = useState<string>('')
  const [fuelPrice, setFuelPrice] = useState<string>('')
  const [tripsPerWeek, setTripsPerWeek] = useState<string>('')
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false)

  // Load settings once component mounts
  /*
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('fuelCalculatorSettings')
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings)
          setDistance(parsed.distance || '')
          setConsumption(parsed.consumption || '')
          setFuelPrice(parsed.fuelPrice || '')
          setTripsPerWeek(parsed.tripsPerWeek || '')
        } catch (error) {
          console.error('Error loading settings:', error)
        }
      }
    }
  }, [])
  */

  // Save settings function
  const saveCurrentSettings = () => {
    if (typeof window !== 'undefined') {
      const settings = { distance, consumption, fuelPrice, tripsPerWeek }
      localStorage.setItem('fuelCalculatorSettings', JSON.stringify(settings))
    }
  }

  const calculateCosts = (): FuelCalculation | null => {
    const distanceNum = parseFloat(distance)
    const consumptionNum = parseFloat(consumption)
    const fuelPriceNum = parseFloat(fuelPrice)
    const tripsNum = tripsPerWeek ? parseFloat(tripsPerWeek) : 0

    if (isNaN(distanceNum) || isNaN(consumptionNum) || isNaN(fuelPriceNum) || 
        distanceNum <= 0 || consumptionNum <= 0 || fuelPriceNum <= 0) {
      return null
    }

    const fuelNeeded = (distanceNum * consumptionNum) / 100
    const costPerTrip = fuelNeeded * fuelPriceNum
    const weeklyCost = tripsNum > 0 ? costPerTrip * tripsNum : 0
    const monthlyCost = weeklyCost * 4.33 // Average weeks per month

    return {
      costPerTrip,
      weeklyCost,
      monthlyCost,
      fuelNeeded
    }
  }

  const calculation = calculateCosts()

  const resetForm = () => {
    setDistance('')
    setConsumption('')
    setFuelPrice('')
    setTripsPerWeek('')
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fuelCalculatorSettings')
    }
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Fuel className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                Fuel Cost Estimator
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Calculate how much you spend on fuel for your trips and discover potential savings
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Input Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Calculator className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Trip Details
                  </h2>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={saveCurrentSettings}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                    title="Save current settings"
                  >
                    <Save className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    {showAdvanced ? 'Hide' : 'Show'} Analysis
                  </button>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Distance (km)
                  </label>
                  <input
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="Enter distance in kilometers"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             dark:bg-gray-700 dark:text-white transition-colors"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fuel Consumption (L/100 km)
                  </label>
                  <input
                    type="number"
                    value={consumption}
                    onChange={(e) => setConsumption(e.target.value)}
                    placeholder="Enter fuel consumption"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             dark:bg-gray-700 dark:text-white transition-colors"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fuel Price (CZK/L)
                  </label>
                  <input
                    type="number"
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(e.target.value)}
                    placeholder="Enter fuel price per liter"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             dark:bg-gray-700 dark:text-white transition-colors"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Trips per Week (optional)
                  </label>
                  <input
                    type="number"
                    value={tripsPerWeek}
                    onChange={(e) => setTripsPerWeek(e.target.value)}
                    placeholder="How many times per week?"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             dark:bg-gray-700 dark:text-white transition-colors"
                    min="0"
                    step="0.1"
                  />
                </div>

                <button
                  onClick={resetForm}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 
                           rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Reset Form
                </button>
              </div>
            </div>

            {/* Results Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center mb-6">
                <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Cost Summary
                </h2>
              </div>

              {calculation ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4">
                    <h3 className="text-lg font-semibold mb-2">Cost per Trip</h3>
                    <p className="text-3xl font-bold">{formatCurrency(calculation.costPerTrip)}</p>
                    <p className="text-blue-100 text-sm mt-1">
                      {calculation.fuelNeeded.toFixed(2)} L needed
                    </p>
                  </div>

                  {tripsPerWeek && parseFloat(tripsPerWeek) > 0 && (
                    <>
                      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-4">
                        <h3 className="text-lg font-semibold mb-2">Weekly Cost</h3>
                        <p className="text-2xl font-bold">{formatCurrency(calculation.weeklyCost)}</p>
                        <p className="text-green-100 text-sm mt-1">
                          {tripsPerWeek} trips per week
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-4">
                        <h3 className="text-lg font-semibold mb-2">Monthly Cost</h3>
                        <p className="text-2xl font-bold">{formatCurrency(calculation.monthlyCost)}</p>
                        <p className="text-purple-100 text-sm mt-1">
                          Estimated monthly expense
                        </p>
                      </div>
                    </>
                  )}

                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                      Trip Breakdown
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex justify-between">
                        <span>Distance:</span>
                        <span className="font-medium">{distance} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Consumption:</span>
                        <span className="font-medium">{consumption} L/100km</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fuel Price:</span>
                        <span className="font-medium">{formatCurrency(parseFloat(fuelPrice))}/L</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fuel Needed:</span>
                        <span className="font-medium">{calculation.fuelNeeded.toFixed(2)} L</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Fuel className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    Enter your trip details to see the cost breakdown
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Advanced Features */}
          {showAdvanced && consumption && parseFloat(consumption) > 0 && (
            <>
              <FuelEfficiencyComparison consumption={parseFloat(consumption)} />
              
              {calculation && tripsPerWeek && parseFloat(tripsPerWeek) > 0 && (
                <CostSavingsCalculator 
                  currentCostPerTrip={calculation.costPerTrip}
                  tripsPerWeek={parseFloat(tripsPerWeek)}
                />
              )}
            </>
          )}

          {/* Tips Section */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              💡 Fuel-Saving Tips
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Maintain steady speeds and avoid aggressive acceleration</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Keep tires properly inflated for better fuel efficiency</span>
              </div>
              <div className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Plan routes to avoid heavy traffic and combine trips</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
