import type { InvoiceStatus } from '../types/invoice'
import StatusBadge from './StatusBadge'

type Props = {
    status: InvoiceStatus
    onEdit?: () => void
    onDelete?: () => void
    onMarkPaid?: () => void
}

export default function InvoiceActions({ status, onEdit, onDelete, onMarkPaid }: Props) {
    return (
        <section className="mt-8 flex items-center justify-between rounded-lg bg-white px-8 py-5 shadow-sm dark:bg-dark-1 dark:shadow-none">
            <div className="flex items-center gap-5">
                <span className="text-muted-2">Status</span>
                <StatusBadge status={status} />
            </div>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={onEdit}
                    className="h-12 rounded-full bg-[#F9FAFE] px-6 font-bold text-muted-2 hover:bg-light-1 dark:bg-dark-2 dark:text-light-1 dark:hover:bg-white"
                >
                    Edit
                </button>
                <button
                    type="button"
                    onClick={onDelete}
                    className="h-12 rounded-full bg-danger px-6 font-bold text-white hover:bg-danger-light"
                >
                    Delete
                </button>
                {status === 'pending' && (
                    <button
                        type="button"
                        onClick={onMarkPaid}
                        className="h-12 rounded-full bg-primary px-6 font-bold text-white hover:bg-primary-light"
                    >
                        Mark as Paid
                    </button>
                )}
            </div>
        </section>
    )
}