import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  useToast,
  Radio,
  RadioGroup,
  Stack,
  Badge,
  Divider,
  List,
  ListItem,
  ListIcon,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useQuote } from '../context/QuoteContext'

const CoverageOptions = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const { coverageOptions, selectedCoverage, setSelectedCoverage } = useQuote()

  const handleCoverageSelect = (value) => {
    const selected = coverageOptions.find(opt => opt.id.toString() === value)
    setSelectedCoverage(selected)
  }

  const handleContinue = () => {
    if (!selectedCoverage) {
      toast({
        title: 'Seleccione una cobertura',
        description: 'Por favor, seleccione una opción de cobertura para continuar',
        status: 'warning',
        duration: 3000,
        isClosable: true
      })
      return
    }
    navigate('/summary')
  }

  const handleBack = () => {
    navigate('/form')
  }

  if (coverageOptions.length === 0) {
    return (
      <Alert status="info" borderRadius="md">
        <AlertIcon />
        <Box>
          <Heading size="md">No hay opciones de cobertura</Heading>
          <Text>Complete primero el formulario de datos para calcular las opciones disponibles.</Text>
        </Box>
        <Button
          ml="auto"
          colorScheme="blue"
          onClick={handleBack}
          leftIcon={<ChevronLeftIcon />}
        >
          Volver al Formulario
        </Button>
      </Alert>
    )
  }

  return (
    <Box>
      <RadioGroup onChange={handleCoverageSelect} value={selectedCoverage?.id?.toString()}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {coverageOptions.map((option) => (
            <Card
              key={option.id}
              border="2px"
              borderColor={selectedCoverage?.id === option.id ? 'blue.500' : 'gray.200'}
              cursor="pointer"
              onClick={() => handleCoverageSelect(option.id.toString())}
            >
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Box>
                    <HStack justify="space-between" align="start">
                      <Heading size="md">{option.name}</Heading>
                      <Badge colorScheme={option.id === 1 ? 'green' : option.id === 2 ? 'blue' : 'purple'}>
                        {option.id === 1 ? 'Económico' : option.id === 2 ? 'Recomendado' : 'Premium'}
                      </Badge>
                    </HStack>
                    <Text color="gray.600" fontSize="sm" mt={2}>
                      {option.description}
                    </Text>
                  </Box>

                  <Radio value={option.id.toString()} colorScheme="blue">
                    <Text ml={2} fontWeight="bold">Seleccionar esta opción</Text>
                  </Radio>

                  <Divider />

                  <Box>
                    <Text fontWeight="bold" fontSize="2xl" color="blue.600">
                      ${option.monthlyPrice.toFixed(2)}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      por mes | Anual: ${option.yearlyPrice.toFixed(2)}
                    </Text>
                  </Box>

                  <Box>
                    <Text fontWeight="medium">Deducible:</Text>
                    <Text fontWeight="bold" fontSize="lg">${option.deductible}</Text>
                  </Box>

                  <Box>
                    <Text fontWeight="medium" mb={2}>Coberturas:</Text>
                    <List spacing={1}>
                      {option.coverage.slice(0, 3).map((item, index) => (
                        <ListItem key={index} fontSize="sm">
                          <ListIcon as={CheckCircleIcon} color="green.500" />
                          {item}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </RadioGroup>

      {selectedCoverage && (
        <Alert status="info" borderRadius="md" mt={6}>
          <AlertIcon />
          <Box>
            <Text fontWeight="bold">Cobertura Seleccionada: {selectedCoverage.name}</Text>
            <Text>Precio mensual: ${selectedCoverage.monthlyPrice.toFixed(2)} | Deducible: ${selectedCoverage.deductible}</Text>
          </Box>
        </Alert>
      )}

      <HStack justify="space-between" mt={8}>
        <Button
          leftIcon={<ChevronLeftIcon />}
          variant="outline"
          onClick={handleBack}
        >
          Volver al Formulario
        </Button>
        
        <Button
          rightIcon={<ChevronRightIcon />}
          colorScheme="blue"
          onClick={handleContinue}
          isDisabled={!selectedCoverage}
        >
          Ver Resumen
        </Button>
      </HStack>
    </Box>
  )
}

export default CoverageOptions