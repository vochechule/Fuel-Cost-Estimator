'use client'

import { useState } from 'react'

interface FuelSettings {
  distance: string
  consumption: string
  fuelPrice: string
  tripsPerWeek: string
}

const DEFAULT_SETTINGS: FuelSettings = {
  distance: '',
  consumption: '',
  fuelPrice: '',
  tripsPerWeek: ''
}

export function useLocalStorage() {
  const [settings, setSettings] = useState<FuelSettings>(DEFAULT_SETTINGS)

  const saveSettings = (newSettings: FuelSettings) => {
    setSettings(newSettings)
    if (typeof window !== 'undefined') {
      localStorage.setItem('fuelCalculatorSettings', JSON.stringify(newSettings))
    }
  }

  const loadSettings = () => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('fuelCalculatorSettings')
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings)
          setSettings(parsed)
          return parsed
        } catch (error) {
          console.error('Error parsing saved settings:', error)
        }
      }
    }
    return DEFAULT_SETTINGS
  }

  const clearSettings = () => {
    setSettings(DEFAULT_SETTINGS)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fuelCalculatorSettings')
    }
  }

  return {
    settings,
    saveSettings,
    clearSettings,
    loadSettings
  }
}