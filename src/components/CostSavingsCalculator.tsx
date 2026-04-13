'use client'

import React from 'react'
import { PiggyBank, Target, Calendar } from 'lucide-react'

interface CostSavingsCalculatorProps {
  currentCostPerTrip: number
  tripsPerWeek: number
}

export default function CostSavingsCalculator({ 
  currentCostPerTrip, 
  tripsPerWeek 
}: CostSavingsCalculatorProps) {
  
  if (!currentCostPerTrip || !tripsPerWeek) return null

  const weeklyCost = currentCostPerTrip * tripsPerWeek
  const monthlyCost = weeklyCost * 4.33
  const yearlyCost = weeklyCost * 52

  const improvementScenarios = [
    {
      title: '5% Better Efficiency',
      description: 'Better driving habits',
      savings: 0.05,
      icon: '🚗',
      color: 'from-green-500 to-green-600'
    },
    {
      title: '10% Better Efficiency', 
      description: 'Regular maintenance',
      savings: 0.10,
      icon: '🔧',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: '20% Better Efficiency',
      description: 'Route optimization',
      savings: 0.20,
      icon: '🗺️',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Switch to Hybrid',
      description: 'Upgrade vehicle',
      savings: 0.40,
      icon: '🔋',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mt-8">
      <div className="flex items-center mb-6">
        <PiggyBank className="h-6 w-6 text-green-600 mr-2" />
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Potential Savings
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {improvementScenarios.map((scenario, index) => {
          const weeklySavings = weeklyCost * scenario.savings
          const monthlySavings = monthlyCost * scenario.savings
          const yearlySavings = yearlyCost * scenario.savings

          return (
            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{scenario.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    {scenario.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {scenario.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className={`bg-gradient-to-r ${scenario.color} text-white rounded-lg p-3`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Yearly Savings</span>
                    <Target className="h-4 w-4" />
                  </div>
                  <div className="text-xl font-bold">
                    {formatCurrency(yearlySavings)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded p-2">
                    <div className="text-gray-600 dark:text-gray-300">Weekly</div>
                    <div className="font-medium text-gray-800 dark:text-white">
                      {formatCurrency(weeklySavings)}
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded p-2">
                    <div className="text-gray-600 dark:text-gray-300">Monthly</div>
                    <div className="font-medium text-gray-800 dark:text-white">
                      {formatCurrency(monthlySavings)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 rounded-xl">
        <div className="flex items-center mb-2">
          <Calendar className="h-5 w-5 text-yellow-600 mr-2" />
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
            Your Current Annual Fuel Cost
          </h4>
        </div>
        <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
          {formatCurrency(yearlyCost)}
        </p>
        <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
          Based on {tripsPerWeek} trips per week at {formatCurrency(currentCostPerTrip)} per trip
        </p>
      </div>
    </div>
  )
}