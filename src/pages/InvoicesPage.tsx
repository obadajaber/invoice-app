import { useState } from "react";
import Header from "../components/Header";
import EmptyState from "../components/EmptyState";
import InvoiceCard from "../components/InvoiceCard";
import InvoiceForm from "../components/InvoiceForm";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import { useInvoicesQuery, useCreateInvoice } from "../hooks/useInvoicesApi";
import type { Invoice, InvoiceStatus } from "../types/invoice";

export default function InvoicesPage() {
  const {
    data: invoices = [],
    isPending,
    isError,
    refetch,
    isRefetching,
  } = useInvoicesQuery();
  const createInvoice = useCreateInvoice();
  const [filters, setFilters] = useState<InvoiceStatus[]>([]);
  const [showForm, setShowForm] = useState(false);

  function handleAddInvoice(newInvoice: Invoice, clearDraft: () => void) {
    createInvoice.mutate(newInvoice, {
      onSuccess: () => {
        clearDraft();
        setShowForm(false);
      },
    });
  }

  const visible =
    filters.length === 0
      ? invoices
      : invoices.filter((inv) => filters.includes(inv.status));

  return (
    <>
      <Header
        count={visible.length}
        filters={filters}
        onFilterChange={setFilters}
        onNew={() => setShowForm(true)}
      />

      {isPending ? (
        <Loader label="Loading invoices…" />
      ) : isError ? (
        <ErrorState
          title="Couldn't load invoices"
          onRetry={() => refetch()}
          isRetrying={isRefetching}
        />
      ) : visible.length === 0 ? (
        <div className="-mb-16 lg:-mb-32">
          <EmptyState />
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-4 md:mt-16">
          {visible.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      )}

      {showForm && (
        <InvoiceForm
          onClose={() => setShowForm(false)}
          onSave={handleAddInvoice}
        />
      )}
    </>
  );
}
