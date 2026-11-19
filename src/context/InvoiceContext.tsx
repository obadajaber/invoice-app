import { useEffect, useState, type ReactNode } from "react";
import type { Invoice } from "../types/invoice";
import { invoices as seed } from "../data/invoices";
import { InvoiceContext, type InvoiceContextType } from "./invoiceContextValue";

const STORAGE_KEY = "invoices";

function load(): Invoice[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Invoice[];
  } catch (error) {
    console.warn("Could not read invoices", error);
  }
  return seed;
}

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoices, setInvoices] = useState<Invoice[]>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
    } catch (error) {
      console.warn("Could not save invoices", error);
    }
  }, [invoices]);

  const value: InvoiceContextType = {
    invoices,
    addInvoice: (invoice) => setInvoices((list) => [invoice, ...list]),
    updateInvoice: (invoice) =>
      setInvoices((list) =>
        list.map((i) => (i.id === invoice.id ? invoice : i)),
      ),
    deleteInvoice: (id) =>
      setInvoices((list) => list.filter((i) => i.id !== id)),
    markPaid: (id) =>
      setInvoices((list) =>
        list.map((i) => (i.id === id ? { ...i, status: "paid" } : i)),
      ),
  };

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
}
