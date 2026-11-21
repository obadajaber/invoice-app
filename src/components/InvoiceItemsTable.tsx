import type { InvoiceItem } from "../types/invoice";

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

type Props = { items: InvoiceItem[]; total: number };

export default function InvoiceItemsTable({ items, total }: Props) {
  return (
    <div className="mt-8 overflow-hidden rounded-lg md:mt-10">
      <div className="bg-[#F9FAFE] p-6 md:p-8 dark:bg-dark-2">
        <div className="hidden grid-cols-[1fr_60px_100px_100px] gap-4 text-muted-2 md:grid">
          <span>Item Name</span>
          <span className="text-center">QTY.</span>
          <span className="text-right">Price</span>
          <span className="text-right">Total</span>
        </div>

        <ul className="flex flex-col gap-6 md:mt-8 md:gap-8">
          {items.map((item) => (
            <li
              key={item.name}
              className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 font-bold md:grid-cols-[1fr_60px_100px_100px]"
            >
              <span className="dark:text-white">{item.name}</span>
              <span className="col-start-1 row-start-2 text-muted-2 md:col-auto md:row-auto md:text-center">
                <span className="md:hidden">
                  {item.quantity} x {formatMoney(item.price)}
                </span>
                <span className="hidden md:inline">{item.quantity}</span>
              </span>
              <span className="hidden text-right text-muted-2 md:block">
                {formatMoney(item.price)}
              </span>
              <span className="col-start-2 row-span-2 row-start-1 text-right dark:text-white md:col-auto md:row-auto">
                {formatMoney(item.total)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between bg-sidebar px-6 py-6 text-white md:px-8 dark:bg-black">
        <span>Amount Due</span>
        <span className="text-[24px] leading-8 font-bold tracking-[-0.5px]">
          {formatMoney(total)}
        </span>
      </div>
    </div>
  );
}
