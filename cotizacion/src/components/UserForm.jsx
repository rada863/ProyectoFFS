import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  HStack,
  Text,
  Alert,
  AlertIcon,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
  SimpleGrid,
  Card,
  CardBody,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useQuote } from '../context/QuoteContext'

const UserForm = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const { updateUserData, calculateInsuranceOptions } = useQuote()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
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

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleNumberChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    const currentYear = new Date().getFullYear()

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres'
    }

    const edad = parseInt(formData.edad)
    if (!formData.edad) {
      newErrors.edad = 'La edad es requerida'
    } else if (isNaN(edad)) {
      newErrors.edad = 'La edad debe ser un número'
    } else if (edad < 18) {
      newErrors.edad = 'Debe ser mayor de 18 años'
    } else if (edad > 100) {
      newErrors.edad = 'La edad máxima es 100 años'
    }

    const metros = parseInt(formData.metrosCuadrados)
    if (!formData.metrosCuadrados) {
      newErrors.metrosCuadrados = 'Los metros cuadrados son requeridos'
    } else if (isNaN(metros)) {
      newErrors.metrosCuadrados = 'Debe ser un número'
    } else if (metros < 20) {
      newErrors.metrosCuadrados = 'Mínimo 20 m²'
    }

    const valor = parseFloat(formData.valorPropiedad)
    if (!formData.valorPropiedad) {
      newErrors.valorPropiedad = 'El valor de la propiedad es requerido'
    } else if (isNaN(valor)) {
      newErrors.valorPropiedad = 'Debe ser un número'
    } else if (valor < 10000) {
      newErrors.valorPropiedad = 'Mínimo $10,000'
    }

    const year = parseInt(formData.yearConstruccion)
    if (!formData.yearConstruccion) {
      newErrors.yearConstruccion = 'El año de construcción es requerido'
    } else if (isNaN(year)) {
      newErrors.yearConstruccion = 'Debe ser un número'
    } else if (year < 1900) {
      newErrors.yearConstruccion = 'El año debe ser mayor a 1900'
    } else if (year > currentYear) {
      newErrors.yearConstruccion = `El año no puede ser mayor a ${currentYear}`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast({
        title: 'Formulario incompleto',
        description: 'Por favor, corrige los errores en el formulario',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
      return
    }

    setIsSubmitting(true)
    try {
      updateUserData(formData)
      calculateInsuranceOptions(formData)
      
      toast({
        title: 'Formulario validado',
        description: 'Calculando opciones de cobertura...',
        status: 'success',
        duration: 3000,
        isClosable: true
      })

      setTimeout(() => {
        navigate('/coverage')
      }, 1000)

    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error al procesar el formulario',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        <Box>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              <Card>
                <CardBody>
                  <Text fontWeight="bold" fontSize="lg" mb={4} color="blue.600">
                    Información Personal
                  </Text>
                  
                  <VStack spacing={4}>
                    <FormControl isInvalid={!!errors.nombre}>
                      <FormLabel>Nombre Completo *</FormLabel>
                      <Input
                        name="nombre"
                        placeholder="Ingrese su nombre completo"
                        value={formData.nombre}
                        onChange={handleChange}
                      />
                      <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.edad}>
                      <FormLabel>Edad *</FormLabel>
                      <NumberInput
                        min={18}
                        max={100}
                        value={formData.edad}
                        onChange={(value) => handleNumberChange('edad', value)}
                      >
                        <NumberInputField placeholder="Ej: 35" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormErrorMessage>{errors.edad}</FormErrorMessage>
                    </FormControl>
                  </VStack>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <Text fontWeight="bold" fontSize="lg" mb={4} color="blue.600">
                    Información de la Propiedad
                  </Text>
                  
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel>Tipo de Propiedad *</FormLabel>
                      <Select
                        name="tipoPropiedad"
                        value={formData.tipoPropiedad}
                        onChange={handleChange}
                      >
                        <option value="casa">Casa Individual</option>
                        <option value="apartamento">Apartamento</option>
                        <option value="condominio">Condominio</option>
                        <option value="duplex">Dúplex</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Ubicación *</FormLabel>
                      <Select
                        name="ubicacion"
                        value={formData.ubicacion}
                        onChange={handleChange}
                      >
                        <option value="urbana">Zona Urbana</option>
                        <option value="suburbana">Zona Suburbana</option>
                        <option value="rural">Zona Rural</option>
                      </Select>
                    </FormControl>

                    <HStack spacing={4}>
                      <FormControl isInvalid={!!errors.metrosCuadrados}>
                        <FormLabel>Metros Cuadrados *</FormLabel>
                        <NumberInput
                          min={20}
                          max={10000}
                          value={formData.metrosCuadrados}
                          onChange={(value) => handleNumberChange('metrosCuadrados', value)}
                        >
                          <NumberInputField placeholder="Ej: 120" />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <FormErrorMessage>{errors.metrosCuadrados}</FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={!!errors.valorPropiedad}>
                        <FormLabel>Valor (USD) *</FormLabel>
                        <NumberInput
                          min={10000}
                          max={10000000}
                          step={1000}
                          value={formData.valorPropiedad}
                          onChange={(value) => handleNumberChange('valorPropiedad', value)}
                        >
                          <NumberInputField placeholder="Ej: 250000" />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <FormErrorMessage>{errors.valorPropiedad}</FormErrorMessage>
                      </FormControl>
                    </HStack>

                    <FormControl isInvalid={!!errors.yearConstruccion}>
                      <FormLabel>Año de Construcción *</FormLabel>
                      <NumberInput
                        min={1900}
                        max={new Date().getFullYear()}
                        value={formData.yearConstruccion}
                        onChange={(value) => handleNumberChange('yearConstruccion', value)}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormErrorMessage>{errors.yearConstruccion}</FormErrorMessage>
                    </FormControl>
                  </VStack>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <Text fontWeight="bold" fontSize="lg" mb={4} color="blue.600">
                    Historial y Seguridad
                  </Text>
                  
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel>Historial de Reclamaciones *</FormLabel>
                      <Select
                        name="historialReclamaciones"
                        value={formData.historialReclamaciones}
                        onChange={handleChange}
                      >
                        <option value="ninguno">Ninguna reclamación</option>
                        <option value="uno">1 reclamación en los últimos 5 años</option>
                        <option value="varios">Varias reclamaciones</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Sistema de Seguridad *</FormLabel>
                      <Select
                        name="sistemaSeguridad"
                        value={formData.sistemaSeguridad}
                        onChange={handleChange}
                      >
                        <option value="basico">Básico (cerraduras estándar)</option>
                        <option value="avanzado">Avanzado (alarma + cámaras)</option>
                        <option value="premium">Premium (sistema monitoreado 24/7)</option>
                      </Select>
                    </FormControl>
                  </VStack>
                </CardBody>
              </Card>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                isLoading={isSubmitting}
                loadingText="Procesando..."
                rightIcon={<ArrowForwardIcon />}
              >
                Ver Opciones de Cobertura
              </Button>
            </VStack>
          </form>
        </Box>

        <Box>
          <Card position="sticky" top="24">
            <CardBody>
              <VStack spacing={6} align="stretch">
                <Text fontWeight="bold" fontSize="lg" color="blue.600">
                  Resumen de Entrada
                </Text>

                <Alert status="info" borderRadius="md">
                  <AlertIcon />
                  <Box>
                    <Text fontWeight="bold">Estimación:</Text>
                    <Text fontSize="sm" color="gray.600">
                      Complete el formulario para ver una estimación
                    </Text>
                  </Box>
                </Alert>

                <Box>
                  <Text fontWeight="medium" mb={2}>Validación de Campos:</Text>
                  <VStack align="stretch" spacing={2}>
                    {['nombre', 'edad', 'metrosCuadrados', 'valorPropiedad', 'yearConstruccion'].map((field) => {
                      const isValid = formData[field] && !errors[field]
                      return (
                        <HStack key={field}>
                          <Box
                            w="6"
                            h="6"
                            borderRadius="full"
                            bg={isValid ? 'green.400' : errors[field] ? 'red.400' : 'gray.300'}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            color="white"
                            fontSize="sm"
                          >
                            {isValid ? '✓' : errors[field] ? '✗' : ''}
                          </Box>
                          <Text fontSize="sm">
                            {field === 'nombre' && 'Nombre completo'}
                            {field === 'edad' && 'Edad válida'}
                            {field === 'metrosCuadrados' && 'Metros cuadrados'}
                            {field === 'valorPropiedad' && 'Valor de propiedad'}
                            {field === 'yearConstruccion' && 'Año construcción'}
                          </Text>
                        </HStack>
                      )
                    })}
                  </VStack>
                </Box>

                <Alert status="warning" variant="left-accent">
                  <AlertIcon />
                  <Box fontSize="sm">
                    <Text fontWeight="bold">Importante:</Text>
                    <Text>
                      Todos los campos marcados con * son obligatorios.
                    </Text>
                  </Box>
                </Alert>

                {Object.keys(errors).length > 0 && (
                  <Alert status="error" borderRadius="md">
                    <AlertIcon />
                    <Box>
                      <Text fontWeight="bold">Errores encontrados:</Text>
                      {Object.entries(errors).map(([key, error]) => 
                        error && <Text key={key} fontSize="sm">• {error}</Text>
                      )}
                    </Box>
                  </Alert>
                )}
              </VStack>
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default UserForm