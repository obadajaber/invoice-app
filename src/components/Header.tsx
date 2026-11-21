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
        <h1 className="text-[24px] leading-5.5 font-bold tracking-[-0.75px] text-ink md:text-[36px] md:leading-8.25 md:tracking-[-1px] dark:text-white">
          Invoices
        </h1>
        <p className="mt-1 text-muted md:mt-1.5">
          <span className="md:hidden">
            {count === 0 ? "No invoices" : `${count} invoices`}
          </span>
          <span className="hidden md:inline">
            {count === 0 ? "No invoices" : `There are ${count} total invoices`}
          </span>
        </p>
      </div>

      {/* جهة اليمين : الفلتر و زر الفاتورة الجديد */}
      <div className="flex items-center gap-4.5 md:gap-10">
        <FilterDropdown selected={filters} onChange={onFilterChange} />

        <button
          type="button"
          onClick={onNew}
          className="flex h-11 items-center gap-3 rounded-full bg-primary p-1.5 pr-3.5 font-bold text-white hover:bg-primary-light md:h-12 md:gap-4 md:p-2 md:pr-4"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <img src={IconPlus} alt="" className="h-2.5 w-2.5" />
          </span>
          <span className="md:hidden">New</span>
          <span className="hidden md:inline">New Invoice</span>
        </button>
      </div>
    </header>
  );
}
