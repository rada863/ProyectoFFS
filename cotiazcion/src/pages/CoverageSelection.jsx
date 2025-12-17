import { Box, Heading } from '@chakra-ui/react'
import CoverageOptions from '../components/CoverageOptions'

const CoverageSelection = () => {
  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        Selecciona tu Cobertura
      </Heading>
      <CoverageOptions />
    </Box>
  )
}

export default CoverageSelection