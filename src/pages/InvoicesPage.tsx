import { useEffect, useState } from "react";
import Header from "../components/Header";
import EmptyState from "../components/EmptyState";
import InvoiceCard from "../components/InvoiceCard";
import InvoiceForm from "../components/InvoiceForm";
import { invoices } from "../data/invoices";
import type { Invoice, InvoiceStatus } from "../types/invoice";

export default function InvoicesPage() {
  const [filters, setFilters] = useState<InvoiceStatus[]>([]);
  const [showForm, setShowForm] = useState(() => {
    return localStorage.getItem("showInvoiceForm") === "true";
  });

  useEffect(() => {
    localStorage.setItem("showInvoiceForm", String(showForm));
  }, [showForm]);

  const [invoiceList, setInvoiceList] = useState<Invoice[]>(() => {
    const savedInvoices = localStorage.getItem("invoices");

    return savedInvoices ? JSON.parse(savedInvoices) : invoices;
  });

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoiceList));
  }, [invoiceList]);

  function handleAddInvoice(newInvoice: Invoice) {
    setInvoiceList((prev) => [newInvoice, ...prev]);
    setShowForm(false);
  }

  const visible =
    filters.length === 0
      ? invoiceList
      : invoiceList.filter((inv) => filters.includes(inv.status));

  return (
    <>
      <Header
        count={visible.length}
        filters={filters}
        onFilterChange={setFilters}
        onNew={() => setShowForm(true)}
      />

      {visible.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-16 flex flex-col gap-4">
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
