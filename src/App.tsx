import { Routes, Route } from 'react-router'
import Sidebar from './components/Sidebar'
import InvoicesPage from './pages/InvoicesPage'
import InvoiceDetailPage from './pages/InvoiceDetailPage'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (

    <div className="min-h-screen bg-page dark:bg-dark-bg">
      <Sidebar theme={theme} onToggleTheme={toggleTheme} />
      <main className="mx-auto w-full max-w-194.5 px-6 pt-24 pb-16 md:px-12 md:pt-32 lg:px-6 lg:py-16">
        <Routes>
          <Route path="/" element={<InvoicesPage />} />
          <Route path="/invoices/:id" element={<InvoiceDetailPage />} />
        </Routes>
      </main>
    </div>
  )
}