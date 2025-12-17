import { Box, Heading } from '@chakra-ui/react'
import UserForm from '../components/UserForm'

const QuoteForm = () => {
  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        Formulario de Cotización
      </Heading>
      <UserForm />
    </Box>
  )
}

export default QuoteForm