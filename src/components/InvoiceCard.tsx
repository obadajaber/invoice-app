import { Link } from 'react-router'
import type { Invoice } from '../types/invoice'
import StatusBadge from './StatusBadge'
import arrowRight from '../assets/icon-arrow-right.svg'

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

function formatMoney(value: number) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    }).format(value)
}

export default function InvoiceCard({ invoice }: { invoice: Invoice }) {
    return (
        <Link
            to={`/invoices/${invoice.id}`}
            className="flex items-center rounded-lg bg-white px-8 py-4 shadow-sm hover:outline hover:outline-primary dark:bg-dark-1 dark:shadow-none">
            <h3 className="w-20 font-bold">
                <span className="text-muted-2">#</span>
                {invoice.id}
            </h3>
            <p className="w-32.5 text-muted">Due {formatDate(invoice.paymentDue)}</p>
            <p className="flex-1 text-muted">{invoice.clientName}</p>
            <p className="mr-10 text-[15px] font-bold">{formatMoney(invoice.total)}</p>
            <StatusBadge status={invoice.status} />
            <img src={arrowRight} alt="" className="ml-5" />
        </Link>
    )
}