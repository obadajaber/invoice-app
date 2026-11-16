import IconPlus from "../assets/icon-plus.svg";
import FilterDropdown from "./FilterDropdown";
import type { InvoiceStatus } from "../types/invoice";

type Props = {
  count: number;
  filters: InvoiceStatus[];
  onFilterChange: (filters: InvoiceStatus[]) => void;
  onNew: () => void;
};

export default function Header({
  count,
  filters,
  onFilterChange,
  onNew,
}: Props) {
  return (
    <header className="flex items-center justify-between">
      {/* جهة اليسار : العنوان و النص الصغير تحتيه */}
      <div>
        <h1 className="text-[36px] leading-8.25 font-bold tracking-[-1px] text-ink dark:text-white">
          Invoices
        </h1>
        <p className="mt-1 text-muted">
          {count === 0 ? "No invoices" : `There are ${count} total invoices`}
        </p>
      </div>

      {/* جهة اليمين : الفلتر و زر الفاتورة الجديد */}
      <div className="flex items-center gap-10">
        <FilterDropdown selected={filters} onChange={onFilterChange} />

        <button
          type="button"
          onClick={onNew}
          className="flex h-12 items-center gap-4 rounded-full bg-primary p-2 pr-4 font-bold text-white hover:bg-primary-light"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <img src={IconPlus} alt="" className="h-2.5 w-2.5" />
          </span>
          New Invoice
        </button>
      </div>
    </header>
  );
}
