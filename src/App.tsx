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
      <main className="mx-auto w-full max-w-182.5 px-6 pt-24 pb-16 pl-6 md:pt-26 lg:py-16 lg:pl-31.75">
        <Routes>
          <Route path="/" element={<InvoicesPage />} />
          <Route path="/invoices/:id" element={<InvoiceDetailPage />} />
        </Routes>
      </main>
    </div>
  )
}