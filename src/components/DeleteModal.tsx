import { useEffect } from "react";
import ErrorBanner from "./ErrorBanner";

type Props = {
  invoiceId: string;
  onCancel: () => void;
  onConfirm: () => void;
  error?: string | null;
  isDeleting?: boolean;
};

export default function DeleteModal({
  invoiceId,
  onCancel,
  onConfirm,
  error,
  isDeleting = false,
}: Props) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onCancel]);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        className="w-full max-w-120 rounded-lg bg-white p-8 shadow-xl md:p-12 dark:bg-dark-1"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="delete-title"
          className="text-[24px] leading-8 font-bold tracking-[-0.5px] text-ink dark:text-white"
        >
          Confirm Deletion
        </h2>

        <p className="mt-2 text-muted-2 md:mt-3">
          Are you sure you want to delete invoice #{invoiceId}? This action
          cannot be undone.
        </p>

        {error && (
          <div className="mt-4">
            <ErrorBanner message={error} />
          </div>
        )}

        <div className="mt-3 flex justify-end gap-2 md:mt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="h-12 rounded-full bg-[#F9FAFE] px-6 font-bold text-muted-2 hover:bg-light-1 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-dark-2 dark:text-light-1 dark:hover:bg-white dark:hover:text-muted-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="h-12 rounded-full bg-danger px-6 font-bold text-white hover:bg-danger-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
