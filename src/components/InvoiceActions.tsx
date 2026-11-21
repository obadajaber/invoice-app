import type { InvoiceStatus } from "../types/invoice";
import StatusBadge from "./StatusBadge";

type Props = {
  status: InvoiceStatus;
  onEdit?: () => void;
  onDelete?: () => void;
  onMarkPaid?: () => void;
};

export default function InvoiceActions({
  status,
  onEdit,
  onDelete,
  onMarkPaid,
}: Props) {
  return (
    <section className="mt-8 flex h-22.75 items-center justify-between rounded-lg bg-white px-6 shadow-sm md:h-auto md:px-8 md:py-5 dark:bg-dark-1 dark:shadow-none">
      <div className="flex w-full items-center justify-between md:w-auto md:justify-start md:gap-5">
        <span className="text-muted-2">Status</span>
        <StatusBadge status={status} />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 flex h-22.75 items-center justify-center gap-2 bg-white px-6 shadow-sm md:static md:z-auto md:h-auto md:justify-end md:bg-transparent md:p-0 md:shadow-none dark:bg-dark-1">
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
        {status === "pending" && (
          <button
            type="button"
            onClick={onMarkPaid}
            className="h-12 rounded-full bg-primary px-8 font-bold text-white hover:bg-primary-light md:px-6"
          >
            Mark as Paid
          </button>
        )}
      </div>
    </section>
  );
}
