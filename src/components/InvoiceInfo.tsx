import type { Invoice } from '../types/invoice'

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

function Address({ street, city, postCode, country }: Invoice['senderAddress']) {
    return (
        <address className="text-muted-2 not-italic">
            <p>{street}</p>
            <p>{city}</p>
            <p>{postCode}</p>
            <p>{country}</p>
        </address>
    )
}

export default function InvoiceInfo({ invoice }: { invoice: Invoice }) {
    return (
        <section className="p-8">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-[15px] font-bold dark:text-white">
                        <span className="text-muted-2">#</span>
                        {invoice.id}
                    </h2>
                    <p className="mt-1 text-muted-2">{invoice.description}</p>
                </div>
                <Address {...invoice.senderAddress} />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-8">
                <div className="flex flex-col gap-8">
                    <div>
                        <p className="text-muted-2">Invoice Date</p>
                        <p className="mt-3 text-[15px] font-bold dark:text-white">{formatDate(invoice.createdAt)}</p>
                    </div>
                    <div>
                        <p className="text-muted-2">Payment Due</p>
                        <p className="mt-3 text-[15px] font-bold dark:text-white">{formatDate(invoice.paymentDue)}</p>
                    </div>
                </div>

                <div>
                    <p className="text-muted-2">Bill To</p>
                    <p className="mt-3 text-[15px] font-bold dark:text-white">{invoice.clientName}</p>
                    <div className="mt-2">
                        <Address {...invoice.clientAddress} />
                    </div>
                </div>

                <div>
                    <p className="text-muted-2">Sent to</p>
                    <p className="mt-3 text-[15px] font-bold dark:text-white">{invoice.clientEmail}</p>
                </div>
            </div>

            {/* الجدول*/}
        </section>
    )
}