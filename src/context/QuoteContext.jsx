import React, { createContext, useState, useContext } from 'react'

const QuoteContext = createContext()

export const useQuote = () => useContext(QuoteContext)

export const QuoteProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    nombre: '',
    edad: '',
    tipoPropiedad: 'casa',
    ubicacion: 'urbana',
    metrosCuadrados: '',
    historialReclamaciones: 'ninguno',
    valorPropiedad: '',
    yearConstruccion: new Date().getFullYear() - 10,
    sistemaSeguridad: 'basico'
  })

  const [coverageOptions, setCoverageOptions] = useState([])
  const [selectedCoverage, setSelectedCoverage] = useState(null)

  const updateUserData = (data) => {
    setUserData(prev => ({ ...prev, ...data }))
  }

  const calculateInsuranceOptions = (data) => {
    const basePrice = 200
    
    const propertyTypeFactors = {
      casa: 1.2,
      apartamento: 1.0,
      condominio: 1.1,
      duplex: 1.3
    }
    
    const locationFactors = {
      urbana: 1.3,
      suburbana: 1.1,
      rural: 1.5
    }
    
    const claimHistoryFactors = {
      ninguno: 1.0,
      uno: 1.2,
      varios: 1.5
    }
    
    const securityFactors = {
      basico: 1.2,
      avanzado: 0.9,
      premium: 0.8
    }
    
    const currentYear = new Date().getFullYear()
    const propertyAge = currentYear - parseInt(data.yearConstruccion || currentYear - 10)
    let ageFactor = 1.0
    if (propertyAge > 50) ageFactor = 1.8
    else if (propertyAge > 30) ageFactor = 1.5
    else if (propertyAge > 10) ageFactor = 1.2
    
    const propertyValue = parseFloat(data.valorPropiedad) || 200000
    let valueFactor = propertyValue / 200000
    
    const adjustedBasePrice = basePrice * 
      propertyTypeFactors[data.tipoPropiedad] *
      locationFactors[data.ubicacion] *
      claimHistoryFactors[data.historialReclamaciones] *
      securityFactors[data.sistemaSeguridad] *
      ageFactor *
      Math.min(valueFactor, 3)
    
    const options = [
      {
        id: 1,
        name: "Cobertura Básica",
        description: "Protección contra incendios, robos y daños por agua",
        monthlyPrice: adjustedBasePrice * 0.8,
        yearlyPrice: adjustedBasePrice * 0.8 * 12 * 0.9,
        coverage: [
          "Incendios",
          "Robos",
          "Daños por agua",
          "Responsabilidad civil básica"
        ],
        deductible: 1000,
        color: "#48BB78"
      },
      {
        id: 2,
        name: "Cobertura Estándar",
        description: "Protección completa más daños por fenómenos naturales",
        monthlyPrice: adjustedBasePrice,
        yearlyPrice: adjustedBasePrice * 12 * 0.85,
        coverage: [
          "Todo lo de la cobertura básica",
          "Fenómenos naturales",
          "Vandalismo",
          "Responsabilidad civil extendida",
          "Gastos de reubicación temporal"
        ],
        deductible: 500,
        color: "#4299E1"
      },
      {
        id: 3,
        name: "Cobertura Premium",
        description: "Protección total con valor de reposición y cobertura mundial",
        monthlyPrice: adjustedBasePrice * 1.5,
        yearlyPrice: adjustedBasePrice * 1.5 * 12 * 0.8,
        coverage: [
          "Todo lo de la cobertura estándar",
          "Valor de reposición total",
          "Cobertura para objetos de valor",
          "Protección jurídica",
          "Cobertura mundial",
          "Servicio de emergencia 24/7"
        ],
        deductible: 250,
        color: "#9F7AEA"
      }
    ]

    setCoverageOptions(options)
    return options
  }

  
  const saveQuoteToHistory = (quote) => {
    const storedQuotes = JSON.parse(localStorage.getItem("quotesHistory")) || []

    const newQuote = {
      id: storedQuotes.length + 1,
      nombre: userData.nombre || "No proporcionado",
      edad: userData.edad || "No proporcionado",
      tipoPropiedad: userData.tipoPropiedad,
      valorPropiedad: userData.valorPropiedad,
      coverage: quote.name,
      monthlyPrice: quote.monthlyPrice,
      yearlyPrice: quote.yearlyPrice,
      deductible: quote.deductible,
      fecha: new Date().toLocaleString()
    }

    storedQuotes.push(newQuote)
    localStorage.setItem("quotesHistory", JSON.stringify(storedQuotes))
  }

  return (
    <QuoteContext.Provider value={{
      userData,
      coverageOptions,
      selectedCoverage,
      setSelectedCoverage,
      updateUserData,
      calculateInsuranceOptions,
      saveQuoteToHistory  
    }}>
      {children}
    </QuoteContext.Provider>
  )
}