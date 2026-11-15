import type { InvoiceStatus } from '../types/invoice'

const styles: Record<InvoiceStatus, string> = {
    paid: 'bg-[#33D69F]/10 text-[#33D69F]',
    pending: 'bg-[#FF8F00]/10 text-[#FF8F00]',
    draft: 'bg-[#373B53]/10 text-[#373B53] dark:bg-[#DFE3FA]/10 dark:text-[#DFE3FA]',
}

const labels: Record<InvoiceStatus, string> = {
    paid: 'Paid',
    pending: 'Pending',
    draft: 'Draft',
}

export default function StatusBadge({ status }: { status: InvoiceStatus }) {
    return (
        <span
            className={`flex h-10 w-26 items-center justify-center gap-2 rounded-md font-bold ${styles[status]}`}
        >
            <span className="h-2 w-2 rounded-full bg-current" />
            {labels[status]}
        </span>
    )
}