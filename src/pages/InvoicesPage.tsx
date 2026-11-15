import { useState } from 'react'
import Header from '../components/Header'
import EmptyState from '../components/EmptyState'
import InvoiceCard from '../components/InvoiceCard'
import InvoiceForm from '../components/InvoiceForm'
import { invoices } from '../data/invoices'
import type { InvoiceStatus } from '../types/invoice'

export default function InvoicesPage() {
    const [filters, setFilters] = useState<InvoiceStatus[]>([])
    const [showForm, setShowForm] = useState(false)

    const visible =
        filters.length === 0
            ? invoices
            : invoices.filter((inv) => filters.includes(inv.status))

    return (
        <>
            <Header
                count={visible.length}
                filters={filters}
                onFilterChange={setFilters}
                onNew={() => setShowForm(true)}
            />

            {visible.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="mt-16 flex flex-col gap-4">
                    {visible.map((invoice) => (
                        <InvoiceCard key={invoice.id} invoice={invoice} />
                    ))}
                </div>
            )}

            {showForm && <InvoiceForm onClose={() => setShowForm(false)} />}
        </>
    )
}