import { useEffect, useState } from "react"
import {
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, Badge
} from "@chakra-ui/react"

const QuoteHistory = () => {
  const [quotes, setQuotes] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("quotesHistory")) || []
    setQuotes(stored)
  }, [])

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="blue">
        <Thead>
          <Tr>
            <Th>Cliente</Th>
            <Th>Cobertura</Th>
            <Th>Mensual</Th>
            <Th>Anual</Th>
            <Th>Deducible</Th>
            <Th>Fecha</Th>
          </Tr>
        </Thead>
        <Tbody>
          {quotes.map((q, i) => (
            <Tr key={i}>
              <Td>{q.nombre}</Td>
              <Td><Badge colorScheme="blue">{q.coverage}</Badge></Td>
              <Td>${Number(q.monthlyPrice || 0).toFixed(2)}</Td>
              <Td>${Number(q.yearlyPrice || 0).toFixed(2)}</Td>
              <Td>${Number(q.deductible || 0).toLocaleString()}</Td>
              <Td>{q.fecha}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default QuoteHistory