'use client'

import React from 'react'
import { TrendingUp, TrendingDown, Zap } from 'lucide-react'

interface EfficiencyComparisonProps {
  consumption: number
}

const vehicleTypes = [
  { type: 'Compact Car', avgConsumption: 6.5, icon: '🚗' },
  { type: 'Sedan', avgConsumption: 8.0, icon: '🚙' },
  { type: 'SUV', avgConsumption: 10.5, icon: '🚐' },
  { type: 'Pickup Truck', avgConsumption: 12.0, icon: '🛻' },
  { type: 'Hybrid', avgConsumption: 4.5, icon: '🔋' },
  { type: 'Electric (equiv.)', avgConsumption: 2.0, icon: '⚡' },
]

export default function FuelEfficiencyComparison({ consumption }: EfficiencyComparisonProps) {
  if (!consumption || consumption <= 0) return null

  const getComparisonData = () => {
    return vehicleTypes.map(vehicle => {
      const difference = consumption - vehicle.avgConsumption
      const percentDiff = ((difference / vehicle.avgConsumption) * 100)
      
      return {
        ...vehicle,
        difference,
        percentDiff,
        isEfficient: difference < 0
      }
    }).sort((a, b) => Math.abs(a.difference) - Math.abs(b.difference))
  }

  const comparisonData = getComparisonData()
  const closest = comparisonData[0]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mt-8">
      <div className="flex items-center mb-6">
        <Zap className="h-6 w-6 text-yellow-500 mr-2" />
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Fuel Efficiency Comparison
        </h3>
      </div>

      <div className="mb-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 rounded-xl">
        <p className="text-gray-800 dark:text-white font-medium">
          Your vehicle&apos;s consumption ({consumption} L/100km) is closest to a <strong>{closest.type}</strong>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {closest.isEfficient ? (
            <span className="text-green-600 dark:text-green-400 flex items-center">
              <TrendingDown className="h-4 w-4 mr-1" />
              {Math.abs(closest.percentDiff).toFixed(1)}% more efficient than average
            </span>
          ) : (
            <span className="text-red-600 dark:text-red-400 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              {Math.abs(closest.percentDiff).toFixed(1)}% less efficient than average
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comparisonData.map((vehicle, index) => (
          <div
            key={vehicle.type}
            className={`p-4 rounded-lg border-2 transition-all ${
              index === 0 
                ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' 
                : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{vehicle.icon}</span>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {vehicle.avgConsumption} L/100km
                </div>
              </div>
            </div>
            
            <div className="text-sm font-medium text-gray-800 dark:text-white mb-1">
              {vehicle.type}
            </div>
            
            <div className="flex items-center text-xs">
              {vehicle.isEfficient ? (
                <span className="text-green-600 dark:text-green-400 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  {Math.abs(vehicle.percentDiff).toFixed(0)}% better
                </span>
              ) : vehicle.difference === 0 ? (
                <span className="text-gray-500 dark:text-gray-400">
                  Same efficiency
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {Math.abs(vehicle.percentDiff).toFixed(0)}% worse
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
          💡 Improve Your Fuel Efficiency
        </h4>
        <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <p>• Remove excess weight from your vehicle</p>
          <p>• Keep windows closed at highway speeds</p>
          <p>• Use cruise control on highways</p>
          <p>• Regular maintenance keeps your engine efficient</p>
        </div>
      </div>
    </div>
  )
}