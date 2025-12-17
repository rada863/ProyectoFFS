import { Box, Container, Flex, Heading, Link, useColorModeValue } from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
  const location = useLocation()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Box as="header" bg={bgColor} borderBottom="1px" borderColor={borderColor} py={4}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Heading size="lg" color="blue.600">
              <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
                Seguros Hogar
              </Link>
            </Heading>
            <Flex gap={6}>
              <Link as={RouterLink} to="/" fontWeight={location.pathname === '/' ? 'bold' : 'normal'}>
                Inicio
              </Link>
              <Link as={RouterLink} to="/form" fontWeight={location.pathname === '/form' ? 'bold' : 'normal'}>
                Nueva Cotización
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box as="main" flex="1" py={8}>
        <Container maxW="container.xl">
          {children}
        </Container>
      </Box>

      <Box as="footer" bg={bgColor} borderTop="1px" borderColor={borderColor} py={6}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Box>
             
            </Box>
            <Flex gap={6}>
              <Link as={RouterLink} to="/" color="blue.500" fontSize="sm">
                Términos
              </Link>
              <Link as={RouterLink} to="/" color="blue.500" fontSize="sm">
                Privacidad
              </Link>
              <Link as={RouterLink} to="/" color="blue.500" fontSize="sm">
                Contacto
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout