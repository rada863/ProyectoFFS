
import { Box, Container, HStack, Heading, Button } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/form', label: 'Cotizar' },
    { path: '/coverage', label: 'Coberturas' },
    { path: '/summary', label: 'Resumen' }
  ]

  return (
    <Box as="header" bg="blue.700" color="white" py={4}>
      <Container maxW="container.xl">
        <HStack justify="space-between" align="center">
          <Heading as="h1" size="lg">
            <Link to="/">Seguros Hogar</Link>
          </Heading>
          <HStack spacing={4}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                as={Link}
                to={item.path}
                variant="ghost"
                colorScheme="whiteAlpha"
                isActive={location.pathname === item.path}
              >
                {item.label}
              </Button>
            ))}
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}

export default Header