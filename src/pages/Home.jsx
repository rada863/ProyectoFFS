import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Home = () => {
  return (
    <Box textAlign="center" py={10}>
      <VStack spacing={6}>
        <Heading as="h1" size="2xl">
          Simulador de Seguros para Hogar
        </Heading>
        <Text fontSize="xl" color="gray.600" maxW="2xl">
          Obtén una cotización personalizada en minutos. Protege tu hogar con la mejor cobertura.
        </Text>

        {/* Botón para iniciar nueva cotización */}
        <Button
          as={RouterLink}
          to="/form"
          colorScheme="blue"
          size="lg"
        >
          Comenzar Cotización
        </Button>

        {/* 👇 Nuevo botón para ver historial */}
        <Button
          as={RouterLink}
          to="/history"
          colorScheme="teal"
          size="lg"
        >
          Ver Historial de Cotizaciones
        </Button>
      </VStack>
    </Box>
  )
}

export default Home