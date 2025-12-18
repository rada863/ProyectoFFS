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
  Divider,
  Alert,
  AlertIcon,
  useToast,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import { CheckCircleIcon, ChevronLeftIcon, DownloadIcon } from '@chakra-ui/icons'
import { MdPrint } from 'react-icons/md'
import { jsPDF } from 'jspdf'
import { useQuote } from '../context/QuoteContext'
import QuoteHistory from "../components/QuoteHistory"

const Summary = () => {
  const navigate = useNavigate()
  const toast = useToast()

  // 👇 obtenemos todo del contexto
  const { userData, selectedCoverage, saveQuoteToHistory } = useQuote()

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    if (!selectedCoverage) return

    const doc = new jsPDF()

    // Título
    doc.setFontSize(18)
    doc.text('Resumen de Cotización', 20, 20)

    // Datos del cliente
    doc.setFontSize(12)
    doc.text(`Nombre: ${userData.nombre || 'No proporcionado'}`, 20, 40)
    doc.text(`Edad: ${userData.edad || 'No proporcionado'} años`, 20, 50)
    doc.text(`Tipo de Propiedad: ${userData.tipoPropiedad || 'No especificado'}`, 20, 60)
    doc.text(`Valor de la Propiedad: $${Number(userData.valorPropiedad || 0).toLocaleString()}`, 20, 70)

    // Cobertura
    doc.text(`Cobertura: ${selectedCoverage.name}`, 20, 90)
    doc.text(`Descripción: ${selectedCoverage.description}`, 20, 100)
    doc.text(`Prima Mensual: $${Number(selectedCoverage.monthlyPrice).toFixed(2)}`, 20, 110)
    doc.text(`Prima Anual: $${Number(selectedCoverage.yearlyPrice).toFixed(2)}`, 20, 120)
    doc.text(`Deducible: $${Number(selectedCoverage.deductible).toLocaleString()}`, 20, 130)

    // Lista de coberturas incluidas
    doc.text('Coberturas Incluidas:', 20, 150)
    selectedCoverage.coverage.forEach((item, index) => {
      doc.text(`- ${item}`, 25, 160 + index * 10)
    })

    // Descargar
    doc.save('cotizacion.pdf')

    toast({
      title: 'PDF generado',
      description: 'El PDF se ha descargado correctamente',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handlePurchase = () => {
    if (!selectedCoverage) return

    // 👇 Guardar en historial
    saveQuoteToHistory(selectedCoverage)

    toast({
      title: '¡Cotización contratada!',
      description: 'Pronto nos pondremos en contacto con usted para finalizar el proceso',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const handleBack = () => {
    navigate('/coverage')
  }

  if (!selectedCoverage) {
    return (
      <Alert status="warning" borderRadius="md">
        <AlertIcon />
        <Box>
          <Heading size="md">No hay cobertura seleccionada</Heading>
          <Text>Por favor, seleccione una cobertura primero.</Text>
        </Box>
        <Button ml="auto" colorScheme="blue" onClick={handleBack}>
          Seleccionar Cobertura
        </Button>
      </Alert>
    )
  }

  const tipoPropiedadMap = {
    casa: 'Casa Individual',
    apartamento: 'Apartamento',
    condominio: 'Condominio',
    duplex: 'Dúplex',
  }

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {/* Información del cliente */}
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>
              Información del Cliente
            </Heading>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="bold">Nombre:</Text>
                <Text>{userData.nombre || 'No proporcionado'}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Edad:</Text>
                <Text>{userData.edad ? `${userData.edad} años` : 'No proporcionado'}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Tipo de Propiedad:</Text>
                <Text>{tipoPropiedadMap[userData.tipoPropiedad] || 'No especificado'}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Valor de la Propiedad:</Text>
                <Text>${Number(userData.valorPropiedad || 0).toLocaleString()}</Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Resumen de cobertura */}
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>
              Resumen de Cobertura
            </Heading>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="bold" fontSize="xl">
                  {selectedCoverage.name}
                </Text>
                <Text color="gray.600">{selectedCoverage.description}</Text>
              </Box>

              <Divider />

              <Box>
                <Text fontWeight="bold">Prima Mensual:</Text>
                <Text fontSize="2xl" color="blue.600">
                  ${Number(selectedCoverage.monthlyPrice).toFixed(2)}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Prima anual: ${Number(selectedCoverage.yearlyPrice).toFixed(2)}
                </Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Deducible por Siniestro:</Text>
                <Text fontSize="xl" color="red.500">
                  ${Number(selectedCoverage.deductible).toLocaleString()}
                </Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Coberturas Incluidas:</Text>
                <List spacing={2}>
                  {selectedCoverage.coverage.map((item, index) => (
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
      </SimpleGrid>

      {/* Aviso importante */}
      <Alert status="warning" variant="left-accent" mt={8}>
        <AlertIcon />
        <Box>
          <Text fontWeight="bold">Importante</Text>
          <Text fontSize="sm">
            Esta cotización es una estimación basada en la información proporcionada. La prima final puede variar después de una evaluación completa.
          </Text>
        </Box>
      </Alert>

      {/* Botones de acción */}
      <HStack spacing={4} justify="space-between" mt={8}>
        <Button leftIcon={<ChevronLeftIcon />} variant="outline" onClick={handleBack}>
          Cambiar Cobertura
        </Button>

        <HStack spacing={4}>
          <Button leftIcon={<MdPrint />} variant="outline" onClick={handlePrint}>
            Imprimir
          </Button>

          <Button leftIcon={<DownloadIcon />} variant="outline" onClick={handleDownloadPDF}>
            Descargar PDF
          </Button>

          <Button colorScheme="blue" onClick={handlePurchase}>
            Contratar Ahora
          </Button>

          <Button colorScheme="teal" onClick={() => navigate('/history')}>
            Ver Historial
          </Button>
        </HStack>
      </HStack>

      {/* 👇 Mostrar historial directamente debajo del resumen */}
      <Box mt={10}>
        <Heading size="md" mb={4}>Historial de Cotizaciones</Heading>
        <QuoteHistory />
      </Box>
    </Box>
  )
}

export default Summary