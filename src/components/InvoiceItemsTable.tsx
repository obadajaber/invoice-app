import type { InvoiceItem } from '../types/invoice'

function formatMoney(value: number) {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value)
}

type Props = { items: InvoiceItem[]; total: number }

export default function InvoiceItemsTable({ items, total }: Props) {
    return (
        <div className="mt-10 overflow-hidden rounded-lg">
            <div className="bg-[#F9FAFE] p-8 dark:bg-dark-2">
                <div className="grid grid-cols-[1fr_60px_100px_100px] gap-4 text-muted-2">
                    <span>Item Name</span>
                    <span className="text-center">QTY.</span>
                    <span className="text-right">Price</span>
                    <span className="text-right">Total</span>
                </div>

                <ul className="mt-8 flex flex-col gap-8">
                    {items.map((item) => (
                        <li
                            key={item.name}
                            className="grid grid-cols-[1fr_60px_100px_100px] items-center gap-4 font-bold"
                        >
                            <span className="dark:text-white">{item.name}</span>
                            <span className="text-center text-muted-2">{item.quantity}</span>
                            <span className="text-right text-muted-2">{formatMoney(item.price)}</span>
                            <span className="text-right dark:text-white">{formatMoney(item.total)}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex items-center justify-between bg-sidebar px-8 py-6 text-white dark:bg-black">
                <span>Amount Due</span>
                <span className="text-[24px] leading-8 font-bold tracking-[-0.5px]">
                    {formatMoney(total)}
                </span>
            </div>
        </div>
    )
}