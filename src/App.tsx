import { Routes, Route } from 'react-router'
import Sidebar from './components/Sidebar'
import InvoicesPage from './pages/InvoicesPage'
import InvoiceDetailPage from './pages/InvoiceDetailPage'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (

    <div className="flex min-h-screen bg-page dark:bg-dark-bg">
      <Sidebar theme={theme} onToggleTheme={toggleTheme} />
      <main className="mx-auto w-full max-w-182.5 px-6 py-16">
        <Routes>
          <Route path="/" element={<InvoicesPage />} />
          <Route path="/invoices/:id" element={<InvoiceDetailPage />} />
        </Routes>
      </main>
    </div>
  )
}