import { Link } from "react-router";
import type { Invoice } from "../types/invoice";
import StatusBadge from "./StatusBadge";
import arrowRight from "../assets/icon-arrow-right.svg";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

export default function InvoiceCard({ invoice }: { invoice: Invoice }) {
  return (
    <Link
      to={`/invoices/${invoice.id}`}
      className="grid grid-cols-2 gap-y-6 rounded-lg bg-white p-6 shadow-sm hover:outline hover:outline-primary md:flex md:items-center md:gap-y-0 md:px-8 md:py-4 dark:bg-dark-1 dark:shadow-none"
    >
      <h3 className="font-bold md:w-20">
        <span className="text-muted-2">#</span>
        {invoice.id}
      </h3>
      <p className="col-start-1 row-start-2 text-muted md:w-32.5">
        Due {formatDate(invoice.paymentDue)}
      </p>
      <p className="col-start-2 row-start-1 text-right text-muted md:flex-1 md:text-left">
        {invoice.clientName}
      </p>
      <p className="col-start-1 row-start-3 -mt-4 text-[15px] font-bold md:mt-0 md:mr-10">
        {formatMoney(invoice.total)}
      </p>
      <div className="col-start-2 row-span-2 row-start-2 flex items-end justify-end">
        <StatusBadge status={invoice.status} />
      </div>
      <img src={arrowRight} alt="" className="ml-5 hidden md:block" />
    </Link>
  );
}
