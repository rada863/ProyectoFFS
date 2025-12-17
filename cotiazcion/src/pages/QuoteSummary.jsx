import { Box, Heading } from '@chakra-ui/react'
import Summary from '../components/Summary'

const QuoteSummary = () => {
  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        Resumen de tu Cotización
      </Heading>
      <Summary />
    </Box>
  )
}

export default QuoteSummary