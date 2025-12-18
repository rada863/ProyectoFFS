import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import QuoteForm from '../pages/QuoteForm'
import CoverageSelection from '../pages/CoverageSelection'
import QuoteSummary from '../pages/QuoteSummary'
import Layout from '../components/Layout'
import { QuoteProvider } from '../context/QuoteContext'
import QuoteHistory from "../components/QuoteHistory"


const AppRoutes = () => {
  return (
    <QuoteProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<QuoteForm />} />
          <Route path="/coverage" element={<CoverageSelection />} />
          <Route path="/summary" element={<QuoteSummary />} />
          <Route path="/history" element={<QuoteHistory />} />
          {/* Ruta por defecto para manejar rutas no encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </Layout>
    </QuoteProvider>
  )
}

export default AppRoutes