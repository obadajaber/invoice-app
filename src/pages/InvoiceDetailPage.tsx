import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router";
import {
  useInvoiceQuery,
  useDeleteInvoice,
  useMarkPaid,
  useUpdateInvoice,
} from "../hooks/useInvoicesApi";
import InvoiceActions from "../components/InvoiceActions";
import InvoiceInfo from "../components/InvoiceInfo";
import InvoiceItemsTable from "../components/InvoiceItemsTable";
import DeleteModal from "../components/DeleteModal";
import InvoiceForm from "../components/InvoiceForm";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import ErrorBanner from "../components/ErrorBanner";
import { ApiError } from "../api/invoices";

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const deletedIdRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (deletedIdRef.current) {
        queryClient.removeQueries({
          queryKey: ["invoices", deletedIdRef.current],
        });
      }
    };
  }, [queryClient]);
  const {
    data: invoice,
    isPending,
    isError,
    error,
    refetch,
    isRefetching,
  } = useInvoiceQuery(id);
  const deleteInvoice = useDeleteInvoice();
  const markPaid = useMarkPaid();
  const updateInvoice = useUpdateInvoice();
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  function handleCloseDelete() {
    deleteInvoice.reset();
    setShowDelete(false);
  }

  function handleCloseEdit() {
    updateInvoice.reset();
    setShowEdit(false);
  }
  if (isPending) {
    return (
      <div>
        <Link to="/" className="font-bold dark:text-white">
          Go back
        </Link>
        <Loader label="Loading invoice…" />
      </div>
    );
  }

  if (isError) {
    const notFound = error instanceof ApiError && error.status === 404;
    return (
      <div>
        <Link to="/" className="font-bold dark:text-white">
          Go back
        </Link>
        {notFound ? (
          <ErrorState
            title="Invoice not found"
            message="This invoice doesn't exist or may have been deleted."
          />
        ) : (
          <ErrorState
            title="Couldn't load invoice"
            onRetry={() => refetch()}
            isRetrying={isRefetching}
          />
        )}
      </div>
    );
  }

  return (
    <div className="pb-20 md:-mx-2 md:-mt-3 md:pb-0 lg:mx-0 lg:mt-0">
      <Link
        to="/"
        className="flex w-fit items-center gap-5 font-bold hover:text-muted-2 lg:gap-6 dark:text-white dark:hover:text-muted-2"
      >
        <svg
          width="7"
          height="10"
          viewBox="0 0 7 10"
          fill="none"
          aria-hidden="true"
        >
          <path d="M6 1L2 5l4 4" stroke="#7C5DFA" strokeWidth="2" />
        </svg>
        Go back
      </Link>

      <InvoiceActions
        status={invoice.status}
        onEdit={() => setShowEdit(true)}
        onDelete={() => setShowDelete(true)}
        onMarkPaid={() => markPaid.mutate(invoice.id)}
        isMarkingPaid={markPaid.isPending}
      />

      {markPaid.isError && (
        <div className="mt-4">
          <ErrorBanner message="Couldn't mark the invoice as paid. Please try again." />
        </div>
      )}

      <div className="mt-4 rounded-lg bg-white shadow-sm md:mt-6 lg:mt-4 dark:bg-dark-1 dark:shadow-none">
        <InvoiceInfo invoice={invoice} />
        <div className="px-6 pb-6 md:px-8 md:pb-8">
          <InvoiceItemsTable items={invoice.items} total={invoice.total} />
        </div>
      </div>

      {showDelete && (
        <DeleteModal
          invoiceId={invoice.id}
          onCancel={handleCloseDelete}
          error={
            deleteInvoice.isError
              ? "Couldn't delete the invoice. Please try again."
              : null
          }
          isDeleting={deleteInvoice.isPending}
          onConfirm={() => {
            deleteInvoice.mutate(invoice.id, {
              onSuccess: () => {
                deletedIdRef.current = invoice.id;
                navigate("/");
              },
            });
          }}
        />
      )}

      {showEdit && (
        <InvoiceForm
          invoice={invoice}
          onClose={handleCloseEdit}
          error={
            updateInvoice.isError
              ? "Couldn't save the changes. Please try again."
              : null
          }
          isSaving={updateInvoice.isPending}
          onSave={(updated, clearDraft) => {
            updateInvoice.mutate(updated, {
              onSuccess: () => {
                clearDraft();
                setShowEdit(false);
              },
            });
          }}
        />
      )}
    </div>
  );
}
